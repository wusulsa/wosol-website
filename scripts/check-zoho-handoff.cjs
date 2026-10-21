const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const manifest=require('../content/approved-site/manifest.json');
const file=manifest.assets.find(x=>x.startsWith('js/main.zoho.'));
const source=fs.readFileSync(file,'utf8');
const fn=source.slice(source.indexOf('function bindAsyncForm('),source.indexOf('/* ═',source.indexOf('function bindAsyncForm(')));
function setup(mode){
 const events={},classes={add(){},remove(){}},label={textContent:'Send'},button={dataset:{},disabled:false,classList:classes,querySelector:()=>label};
 const status={classList:classes,dataset:{},setAttribute(){}};
 const form={classList:classes,querySelectorAll:()=>[],querySelector:s=>s.includes('button')?button:null,reportValidity:()=>true,setAttribute(k,v){this[k]=v},addEventListener(k,f){events[k]=f},reset(){throw Error('Unexpected reset')}};
 let calls=0;
 const context={document:{getElementById:id=>id==='form'?form:status},window:{addEventListener(k,f){events[k]=f},WOSOL_ZOHO:{validateAttachments(){}}},state:{lang:'en'},Utils:{setText(el,text){el.textContent=text}},console:{warn(){}},sendSiteForm:async()=>{calls++;if(mode==='error')throw Error('Before handoff');return {navigating:true}},setTimeout(){}};
 vm.createContext(context);vm.runInContext(fn+'\nbindAsyncForm("form","status","ok","test");',context);
 return {events,form,button,calls:()=>calls};
}
(async()=>{
 const a=setup('navigate'),event={preventDefault(){}};
 await a.events.submit(event);await a.events.submit(event);
 assert.equal(a.calls(),1);assert.equal(a.button.disabled,true);assert.equal(a.form['aria-busy'],'true');
 a.events.pageshow({persisted:false});await a.events.submit(event);assert.equal(a.calls(),1);
 a.events.pageshow({persisted:true});assert.equal(a.button.disabled,false);assert.equal(a.form['aria-busy'],'false');
 await a.events.submit(event);assert.equal(a.calls(),2);
 const b=setup('error');await b.events.submit(event);assert.equal(b.button.disabled,false);assert.equal(b.form['aria-busy'],'false');
 console.log('PASS: handoff lock, duplicate submit blocked, ordinary pageshow ignored, BFCache restored, pre-handoff failure recovered. No network requests.');
})();
