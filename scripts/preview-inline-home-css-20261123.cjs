const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const base=process.cwd();
for(const name of ['index.html','en/index.html']){
 const file=path.join(base,'dist',name);let html=fs.readFileSync(file,'utf8');
 if(html.includes('data-home-css="20261123"'))continue;
 const match=html.match(/<link rel="stylesheet" href="(\/css\/approved-preview\.[^"]+\.css)">/);assert(match,'expected homepage stylesheet');
 const css=fs.readFileSync(path.join(base,'dist',match[1]),'utf8');assert(!css.includes('</style'),'unsafe inline CSS');
 html=html.replace(match[0],'<style data-home-css="20261123">'+css+'</style>');
 html=html.replace(/<link data-home-priority rel="preload" as="font"[^>]*>/,'');
 fs.writeFileSync(file,html);
}
console.log('Homepage CSS inlined once; source stylesheet remains for other pages.');
