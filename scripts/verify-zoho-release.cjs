const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'..'),m=require('../content/approved-site/manifest.json');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
(async()=>{
const rows=[];
for(const file of [...m.pages,...m.assets]){
 const url='https://www.wosol.net/'+(file==='index.html'?'':file==='en/index.html'?'en/':file.endsWith('/index.html')?file.replace(/index.html$/,''):file.endsWith('.html')?file.slice(0,-5):file);
 try{
 const res=await fetch(url),body=Buffer.from(await res.arrayBuffer());
 rows.push({file,url,status:res.status,matches:hash(body)===hash(fs.readFileSync(path.join(root,file))),sha256:hash(body)});
 }catch(e){rows.push({file,url,error:e.message,matches:false});}
}
fs.writeFileSync(path.join(root,process.argv[2] || 'docs/audits/evidence/2026-10-20-zoho-release-http.json'),JSON.stringify({checkedAt:new Date().toISOString(),rows},null,2));
console.log(JSON.stringify({total:rows.length,matched:rows.filter(x=>x.matches).length,failures:rows.filter(x=>!x.matches)},null,2));
})();
