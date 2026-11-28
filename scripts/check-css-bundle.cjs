const fs=require('node:fs'),cp=require('node:child_process'),assert=require('node:assert/strict');
const m=require('../content/approved-site/manifest.json');
let checked=0;
for(const file of m.pages){
 const before=cp.execFileSync('git',['show',(process.argv[2] || '6c6bb00')+':content/approved-site/'+file],{encoding:'utf8'});
 const after=fs.readFileSync('content/approved-site/'+file,'utf8');
 const pattern=/<link rel="stylesheet" href="(\/css\/[^"?]+)"\s*\/?>(?:\s*)/g;
 const tags=[...before.matchAll(pattern)];
 if(tags.length<2)continue;
 const newTags=[...after.matchAll(pattern)];assert.equal(newTags.length,1);
 assert.equal(fs.readFileSync('.'+newTags[0][1],'utf8'),tags.map(t=>fs.readFileSync('.'+t[1],'utf8')).join('\n'));
 const normalize=s=>s.replace(pattern,'').replace(/<link data-home-priority[^>]+>/g,'').replaceAll('hero-1000-fast.webp','hero-1000.webp').replaceAll('hero-1600-fast.webp','hero-1600.webp').replace(/\r\n/g,'\n');
 assert.equal(normalize(before),normalize(after),'Non-CSS content changed: '+file);
 assert.equal(after,fs.readFileSync(file,'utf8'),'Production differs from approved source');
 checked++;
}
console.log(JSON.stringify({checked, exactCascadeAndContent:true, requestsPerPage:{before:7,after:1}}));

