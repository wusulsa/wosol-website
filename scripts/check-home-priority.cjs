const fs=require('node:fs'),cp=require('node:child_process'),assert=require('node:assert/strict');
for(const page of ['index.html','en/index.html']){
 const h=fs.readFileSync(page,'utf8');
 const before=cp.execFileSync('git',['show','1752f62:'+page],{encoding:'utf8'});
 const normalize=s=>s.replace(/<link data-home-priority[^>]+>/g,'').replaceAll('hero-1000-fast.webp','hero-1000.webp').replaceAll('hero-1600-fast.webp','hero-1600.webp').replace(/\r\n/g,'\n');
 assert.equal(normalize(h),normalize(before),'Unexpected content/design change');
 assert(h.indexOf('name="viewport"')<h.indexOf('data-home-priority'),'Viewport must precede responsive preload');
 const img=h.match(/<img class="signature-hero__art"[^>]+>/)[0];
 const hint=h.match(/<link data-home-priority rel="preload" as="image"[^>]+>/)[0];
 assert.equal(img.match(/ srcset="([^"]+)"/)[1],hint.match(/ imagesrcset="([^"]+)"/)[1]);
 assert.equal(img.match(/ sizes="([^"]+)"/)[1],hint.match(/ imagesizes="([^"]+)"/)[1]);
 assert.equal(h,fs.readFileSync('content/approved-site/'+page,'utf8'));
}
console.log('AR/EN design/content unchanged; responsive preload matches image and follows viewport.');
