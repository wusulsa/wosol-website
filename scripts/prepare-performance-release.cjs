// Prepare a deployment overlay from production originals. Does not deploy.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),preview=path.resolve(process.argv[2]||''),out=path.resolve(process.argv[3]||'');
assert(process.argv[2]&&process.argv[3],'Usage: node prepare-performance-release.cjs PREVIEW_DIST NEW_OUTPUT');
assert(!out.startsWith(root+path.sep)&&out!==root,'Output must be outside repository');
assert(!fs.existsSync(out),'Output must be new to avoid stale deployment files');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const result=JSON.parse(fs.readFileSync(path.join(preview,'performance-preview-result.json'),'utf8'));
assert.equal(result.baseline,false);assert.equal(result.pages,36);
const oldCss='css/approved-bundle.r6b74b4565170.css',newCss=result.css.file,newImage=result.image.file;
for(const [file,bytes] of [[newCss,result.css.after],[newImage,result.image.after]]){
 assert(!file.includes('..')&&!path.isAbsolute(file));
 const b=fs.readFileSync(path.join(preview,file));assert.equal(b.length,bytes);
 assert(file.includes(hash(b).slice(0,12)),'Asset fingerprint mismatch');
}
const manifest=require('../content/approved-site/manifest.json');
const rows=[];let refs=0;
function write(dir,file,data){const target=path.join(out,dir,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);}
for(const file of manifest.pages){
 const original=fs.readFileSync(path.join(root,file),'utf8');
 assert(original.includes('/'+oldCss),file+': unexpected source CSS');
 let html=original.replaceAll('/'+oldCss,'/'+newCss)
  .replaceAll('/assets/profile-2026/hero-native.webp 1999w','/'+newImage+' 1999w')
  .replace(/(<link data-home-priority rel="preload" as="image" href=")[^"]+/, '$1/assets/profile-2026/hero-1600-fast.webp');
 assert(html.includes('name="robots" content="index,follow"'));
 assert(!/stopImmediatePropagation|performance-check-result|noindex|wosolPerfLab/.test(html),file+': test code leaked');
 // All content, links, forms, metadata and JS must match the approved source.
 const strip=h=>h.replace(/<link data-home-priority rel="preload" as="image"[^>]*>/g,'')
  .replaceAll('/'+newCss,'/'+oldCss).replaceAll('/'+newImage+' 1999w','/assets/profile-2026/hero-native.webp 1999w');
 assert.equal(strip(html),strip(original),file+': unrelated change');
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)){
  const rel=m[1].slice(1),local=path.join(root,rel);
  assert([newCss,newImage].includes(rel)||[local,local+'.html',path.join(local,'index.html')].some(fs.existsSync),file+': missing '+rel);refs++;
 }
 write('upload',file,html);write('rollback',file,original);
 rows.push({file,before:hash(original),after:hash(html)});
}
for(const file of [newCss,newImage])write('upload',file,fs.readFileSync(path.join(preview,file)));
const evidence={status:'prepared-not-deployed',pages:rows.length,localReferences:refs,assets:[newCss,newImage],productionChanged:false,formsSent:false,rows};
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(evidence,null,2));
console.log(JSON.stringify({status:evidence.status,pages:rows.length,localReferences:refs,assets:2,output:out}));
