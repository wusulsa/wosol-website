/* Deterministic export of approved assets; original sources are preserved. */
const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.WOSOL_SHARP_MODULE||'sharp');
const root=path.resolve(__dirname,'..');
(async()=>{
 const report=[];
 for(const name of ['yaris','rav4','staria']){
  const src=path.join(root,`assets/fleet/cars/${name}-branded.svg`);
  const dest=path.join(root,`assets/fleet/cars/${name}-branded.webp`);
  let svg=fs.readFileSync(src,'utf8');
  // librsvg does not decode embedded WebP; normalize only its embedded photo to PNG.
  for(const match of [...svg.matchAll(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/g)]){
   const png=await sharp(Buffer.from(match[1],'base64')).png().toBuffer();
   svg=svg.replace(match[0],'data:image/png;base64,'+png.toString('base64'));
  }
  await sharp(Buffer.from(svg),{density:72}).webp({quality:92,effort:6}).toFile(dest);
  report.push({name,sourceBytes:fs.statSync(src).size,webpBytes:fs.statSync(dest).size});
 }
 const dir=path.join(root,'assets/social');fs.mkdirSync(dir,{recursive:true});
 const entries=[['home','WOSOL Transportation','hero-native.webp','وُسُل للنقل'],['king-abdulaziz-university-transport','KAU Student Transport','hero-native.webp','نقل طالبات جامعة الملك عبدالعزيز'],['employee-transport-jeddah','Employee Transport | Jeddah','operations.webp','نقل الموظفين في جدة'],['employee-transport-riyadh','Employee Transport | Riyadh','hero-native.webp','نقل الموظفين في الرياض'],['corporate-transport-saudi-arabia','Business Transport | Saudi Arabia','operations.webp','النقل المؤسسي في السعودية'],['register','Student Transport Enquiry','hero-native.webp','طلب النقل الجامعي']];
 for(const [slug,label,source,arabic] of entries){
  const photo=await sharp(path.join(root,'assets/profile-2026',source)).resize(1200,630,{fit:'contain',background:'#f6f7f8'}).toBuffer();
  for(const lang of ['ar','en']){
   const title=lang==='ar'?arabic:label;
   const overlay=Buffer.from(`<svg width="1200" height="630"><rect x="0" y="450" width="1200" height="180" fill="#191f25"/><rect x="0" y="450" width="1200" height="7" fill="#F1B654"/><text x="600" y="530" text-anchor="middle" font-family="Arial" font-size="42" fill="white">${title}</text><text x="600" y="588" text-anchor="middle" font-family="Arial" font-size="27" fill="#F1B654">wosol.net</text></svg>`);
   await sharp(photo).composite([{input:overlay}]).jpeg({quality:88}).toFile(path.join(dir,`${slug}-${lang}.jpg`));
  }
 }
 fs.writeFileSync(path.join(root,'docs/audits/2026-10-14-asset-sizes.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report));
})();
