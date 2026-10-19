// Offline contract checks only: fetch is replaced; no email is sent.
const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const {File}=require('node:buffer');
let captured;
class FakeFormData extends FormData { constructor(form){super(); for(const [k,v] of form.entries)this.append(k,v);} }
const ctx={AbortController,setTimeout,clearTimeout,File,FormData:FakeFormData,Date,parseInt,document:{title:'Test',documentElement:{lang:'ar'}},window:{location:{origin:'https://www.wosol.net',pathname:'/'}},sessionStorage:{getItem:()=>null,setItem:()=>{}},fetch:async(url,options)=>{captured={url,options};return {ok:true,json:async()=>({success:true})};}};
vm.runInNewContext(readFileSync('js/email-submit.js','utf8'),ctx);
const api=ctx.window.WASUL_EMAIL;
function form(files=[]){return {entries:[['email','qa@example.test'],...files.map((f,i)=>['attachment_'+i,f])],elements:[],querySelector:()=>({value:'qa@example.test'}),querySelectorAll:()=>files.map(f=>({files:[f]}))};}
(async()=>{
 assert.equal(api.contactRecipient,'info@wosol.net');
 assert.equal(api.contactCc,'atef-alreemi@wosol.net,a@wosol.net');
 const file=new File(['sample'],'sample.pdf',{type:'application/pdf'});
 await api.submitForm(form([file]),'[وسل | عرض سعر] طلب جديد',{to:api.contactRecipient,cc:api.contactCc});
 assert.equal(captured.url,'https://formsubmit.co/ajax/info%40wosol.net');
 const body=captured.options.body;
 assert.equal(body.get('_cc'),api.contactCc);
 assert.equal(body.get('_replyto'),'qa@example.test');
 assert.equal(body.get('_subject'),'[وسل | عرض سعر] طلب جديد');
 assert.equal(await body.get('attachment_0').text(),'sample');
 assert.doesNotThrow(()=>api.validateAttachments(form()));
 for(const f of [new File(['x'],'x.exe',{type:'application/octet-stream'}),new File([],'x.pdf',{type:'application/pdf'}),new File([new Uint8Array(3*1024*1024+1)],'x.pdf',{type:'application/pdf'})]) assert.throws(()=>api.validateAttachments(form([f])));
 console.log('PASS: offline routing, CC, reply-to, subject, file bytes and attachment limits. No network submission.');
})().catch(e=>{console.error(e);process.exitCode=1;});
