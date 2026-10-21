/* Approved HTML sources are authoritative. Retain legacy generator for history,
 * but never regenerate older copy over the reviewed release.
 */
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'content/approved-site');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const urls=new Set(['https://www.wosol.net/register','https://www.wosol.net/en/register/']);
for(const file of manifest.pages){
 const html=fs.readFileSync(path.join(dir,file),'utf8');
 if(!html.includes('name="robots" content="index,follow"')||/Preview only|نسخة معاينة|ui-state-demo|stopImmediatePropagation/.test(html))throw Error('Unsafe production source: '+file);
 const dest=path.join(root,file);
 fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
 if(!canonical?.startsWith('https://www.wosol.net/'))throw Error('Invalid canonical: '+file);
 urls.add(canonical);
}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...urls].map(url=>'<url><loc>'+url+'</loc></url>').join('\n')+'\n</urlset>\n');
console.log('Built '+manifest.pages.length+' approved pages; preserved student registration.');
