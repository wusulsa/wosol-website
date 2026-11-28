const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('js/email-submit.js','utf8');
function setup(fetch){let fire;class FD extends FormData{constructor(){super();}}const ctx={File,FormData:FD,AbortController,Date,Number,parseInt,WeakSet,setTimeout:fn=>{fire=fn;return 1},clearTimeout:()=>{},document:{title:'QA',documentElement:{lang:'en'}},window:{location:{origin:'https://www.wosol.net',pathname:'/en/'}},sessionStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}},fetch};vm.runInNewContext(source,ctx);return {api:ctx.window.WASUL_EMAIL,timeout:()=>fire()};}
const form=()=>({elements:[],querySelector:()=>null,querySelectorAll:()=>[]});
(async()=>{
 for(const result of [{ok:false},{ok:true,json:async()=>({success:false})},{ok:true,json:async()=>({})},{ok:true,json:async()=>{throw Error('invalid JSON')}}]){const s=setup(async()=>result);await assert.rejects(s.api.submitForm(form(),'QA'));}
 for(const success of [true,'true']){const s=setup(async()=>({ok:true,json:async()=>({success})}));assert.equal((await s.api.submitForm(form(),'QA')).success,success);}
 let calls=0;const s=setup((url,options)=>{calls++;return new Promise((resolve,reject)=>options.signal.addEventListener('abort',()=>reject(Error('timeout'))));});const f=form(),p=s.api.submitForm(f,'QA');await assert.rejects(s.api.submitForm(f,'QA'));s.timeout();await assert.rejects(p);assert.equal(calls,1);
 console.log('PASS: HTTP/JSON/negative acceptance, blocked storage, concurrent request and abort; no network, no automatic retry.');
})().catch(e=>{console.error(e);process.exitCode=1;});
