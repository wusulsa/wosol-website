// Offline tests only: no browser, network, identities or CRM writes.
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const read=f=>fs.readFileSync(path.join(__dirname,'../js/',f),'utf8');
test('frame loads and timeouts never confirm a CRM record',async()=>{
  for(const outcome of ['load','timeout']){
    const nodes=[],timers=[];
    const document={createElement(tag){const n={tag,style:{},listeners:{},setAttribute(){},appendChild(){},remove(){},addEventListener(k,f){this.listeners[k]=f},submit(){}};nodes.push(n);return n;},getElementById(){return null},body:{append(){}}};
    const window={};vm.runInNewContext(read('crm-submit.js'),{window,document,URLSearchParams,location:{search:''},setTimeout:f=>(timers.push(f),timers.length),clearTimeout(){}});
    const pending=window.WASUL_CRM.submitToCRM();
    if(outcome==='load')nodes.find(n=>n.tag==='iframe').listeners.load();else timers[0]();
    const result=await pending;assert.equal(result.status,'unverified');assert.equal(result.reason,outcome==='load'?'frame_loaded':'timeout');
  }
});
for(const lang of ['ar','en'])test(`${lang}: uncertainty retains entries, blocks duplicates and never emails or reports success`,async()=>{
  for(const transport of [async()=>true,async()=>({status:'unverified'}),async()=>{throw Error('network')}]){
    let handler,requests=0,emails=0,resets=0;const events=[],nodes={};
    const form={addEventListener(n,f){handler=f},dispatchEvent(e){events.push(e.type)},append(n){nodes[n.id]=n},reset(){resets++}};
    nodes.regForm=form;for(const id of ['submitBtn','submitBtnText','submitArrow','submitSpinner'])nodes[id]={};
    const document={documentElement:{lang},getElementById:id=>nodes[id],createElement:()=>({setAttribute(){},focus(){}})};
    const window={WASUL_CRM:{submitToCRM:async()=>{requests++;return transport()}},WASUL_EMAIL:{submitForm:async()=>{emails++}}};
    const source=read('form.js');vm.runInNewContext(source.slice(source.indexOf('(function bindSubmit()')),{document,window,validateAll:()=>({valid:true}),CustomEvent:class{constructor(type){this.type=type}},alert(){throw Error('unexpected alert')}});
    await handler({preventDefault(){}});await handler({preventDefault(){}});
    assert.equal(requests,1);assert.equal(emails,0);assert.equal(resets,0);assert.equal(nodes.submitBtn.disabled,true);
    assert(!events.includes('submitSuccess'));assert(events.includes('submitUnverified'));assert(nodes.registrationStatus.textContent.includes('0536060003'));
  }
});
