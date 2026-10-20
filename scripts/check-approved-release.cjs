const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),manifest=require('../content/approved-site/manifest.json');
let links=0;
for(const file of manifest.pages){
 const h=fs.readFileSync(path.join(root,file),'utf8');
 assert(h.includes('name="robots" content="index,follow"'),file+': indexable');
 assert(!/Preview only|نسخة معاينة|ui-state-demo|stopImmediatePropagation/.test(h),file+': preview guard');
 assert(h.includes('/js/measurement-config.js?v=2')&&h.includes('/js/measurement.js?v=1'),file+': analytics');
 assert(h.includes('/js/zoho-submit.r'),file+': production Zoho helper');
 assert(!h.includes('FormSubmit'),file+': outdated form provider');
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,file+': duplicate IDs');
 for(const m of h.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)){
  const local=path.join(root,m[1]);
  assert([local,local+'.html',path.join(local,'index.html')].some(fs.existsSync),file+': missing '+m[1]);links++;
 }
 for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
}
for(const file of ['index.html','en/index.html']){
 const h=fs.readFileSync(path.join(root,file),'utf8');
 const business=h.slice(h.indexOf('id="business-path"'),h.indexOf('id="trips-path"'));
 assert.equal((business.match(/class="solution-card"/g)||[]).length,4);
 for(const city of ['jeddah','riyadh'])assert.equal((business.match(new RegExp('href="/(?:en/)?employee-transport-'+city+'"','g'))||[]).length,1);
 assert(h.includes('/js/quote-service-fields.r'));
}
for(const f of manifest.assets.filter(f=>f.endsWith('.js'))){
 const text=fs.readFileSync(path.join(root,f),'utf8');new (require('node:vm').Script)(text);
 assert(!/ui-state-demo|Success appearance preview only|stopImmediatePropagation/.test(text),'preview JS '+f);
}
assert(fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('Allow: /'));
assert(fs.readFileSync(path.join(root,'js/measurement-config.js'),'utf8').includes('G-HPZB25PR24'));
assert.equal((fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').match(/<loc>/g)||[]).length,38);
console.log(JSON.stringify({pages:manifest.pages.length,localReferences:links,assets:manifest.assets.length,sitemapUrls:38,errors:0}));
