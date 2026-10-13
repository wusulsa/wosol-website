const manifest=require('../assets/fleet/hd/manifest.json');
module.exports=function fleetImage(index,alt,className='',eager=false){
 const item=manifest[String(index)];
 if(!item)throw new Error(`Missing fleet image ${index}`);
 const srcset=item.variants.map(v=>`${v.src} ${v.width}w`).join(', ');
 const escaped=String(alt).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 return `<img class="${className}" src="${item.src}" srcset="${srcset}" sizes="(max-width:768px) calc(100vw - 36px), (max-width:1200px) 46vw, 600px" width="${item.width}" height="${item.height}" alt="${escaped}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;
};
