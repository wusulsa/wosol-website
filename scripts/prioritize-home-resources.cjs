// Discover the existing responsive hero before the large document is parsed.
// Keep image candidates, layout, font files and CSS unchanged.
const fs=require('node:fs'),assert=require('node:assert/strict');
for(const page of ['index.html','en/index.html']){
 const file='content/approved-site/'+page;
 let html=fs.readFileSync(file,'utf8');
 if(html.includes('data-home-priority')) continue;
 const image=html.match(/<img class="signature-hero__art"[^>]+>/)[0];
 const attr=name=>image.match(new RegExp(' '+name+'="([^"]+)"'))[1];
 const hints=`<link data-home-priority rel="preload" as="image" href="${attr('src')}" imagesrcset="${attr('srcset')}" imagesizes="${attr('sizes')}" fetchpriority="high">`+
 (page==='index.html'?'<link data-home-priority rel="preload" as="font" href="/assets/fonts/web-13.woff2" type="font/woff2" crossorigin>':'');
 const after=html.replace(/<meta name="viewport"[^>]+>/,tag=>tag+hints);
 assert.equal(after.replace(/<link data-home-priority[^>]+>/g,''),html);
 fs.writeFileSync(file,after);
}
console.log('Prioritized existing hero on AR/EN and Arabic heading font; content/design unchanged.');
for(const page of ['index.html','en/index.html']){
 const file='content/approved-site/'+page;
 let html=fs.readFileSync(file,'utf8').replaceAll('hero-1000.webp','hero-1000-fast.webp').replaceAll('hero-1600.webp','hero-1600-fast.webp');
 const hints=html.match(/<link data-home-priority[^>]+>/g).join('');
 html=html.replace(/<link data-home-priority[^>]+>/g,'').replace(/<meta name="viewport"[^>]+>/,tag=>tag+hints);
 fs.writeFileSync(file,html);
}
const manifestFile='content/approved-site/manifest.json';
const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8'));
manifest.assets=[...new Set([...manifest.assets,'assets/profile-2026/hero-1000-fast.webp','assets/profile-2026/hero-1600-fast.webp'])];
fs.writeFileSync(manifestFile,JSON.stringify(manifest,null,2)+'\n');
