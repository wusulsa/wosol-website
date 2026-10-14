const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../js/measurement.js'),'utf8');
function run(config){
 const nodes=[],scripts=[],listeners={};
 const element=()=>({children:[],listeners:{},append(...x){this.children.push(...x)},setAttribute(){},addEventListener(n,f){this.listeners[n]=f},querySelector(){return this.children.find(e=>e.type==='button')},focus(){}});
 const document={documentElement:{lang:'en'},title:'WOSOL',createElement:element,body:{append:e=>nodes.push(e)},head:{append:e=>scripts.push(e)},querySelector:()=>element(),addEventListener:(n,f)=>listeners[n]=f};
 const window={WOSOL_MEASUREMENT:config};
 const context={window,document,location:{hostname:'www.wosol.net',origin:'https://www.wosol.net',pathname:'/en/',search:'?email=private@example.com',hash:'#phone=secret',reload(){}},localStorage:{getItem:()=>null,setItem(){}}};
 vm.runInNewContext(source,context);return {window,nodes,scripts,listeners};
}
test('empty measurement ID does not load Google or show consent UI',()=>{const r=run({measurementId:'',hosts:['www.wosol.net']});assert.equal(r.scripts.length,0);assert.equal(r.nodes.length,0)});
test('preview host cannot activate an otherwise valid property',()=>{const r=run({measurementId:'G-TEST1234',hosts:['preview.invalid']});assert.equal(r.scripts.length,0);assert.equal(r.nodes.length,0)});
test('consent gates loading and events contain only allowed values',()=>{
 const r=run({measurementId:'G-TEST1234',hosts:['www.wosol.net']});assert.equal(r.scripts.length,0);
 r.nodes[0].children.find(e=>e.textContent==='Allow').listeners.click();assert.equal(r.scripts.length,1);
 const form={id:'quoteForm',querySelector:()=>({value:'employees'}),contact:'Private Person',phone:'+966500000000'};
 r.window.WOSOL_METRICS.record('email_request_accepted',form);
 r.window.WOSOL_METRICS.record('generate_lead',form);
 const events=r.window.dataLayer.map(e=>Array.from(e));
 assert.equal(events.filter(e=>e[1]==='email_request_accepted').length,1);
 assert.equal(events.filter(e=>e[1]==='generate_lead').length,0);
 const payload=JSON.stringify(events);for(const forbidden of ['private@example.com','Private Person','+966500000000','#phone','?email'])assert(!payload.includes(forbidden));
});
