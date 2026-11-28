const manifest=require('../assets/fleet/showcase/manifest.json');
module.exports=function fleetImage(index,alt,className='',eager=false){
 const item=manifest[String(index)];
 if(!item)throw new Error(`Missing fleet image ${index}`);
 const escaped=String(alt).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 return `<img class="fleet-photo ${className}" style="aspect-ratio:${item.width}/${item.height}" src="${item.src}" srcset="${item.variants.map(v=>`${v.src} ${v.width}w`).join(', ')}" sizes="(max-width:768px) min(440px, calc(100vw - 60px)), 520px" width="${item.width}" height="${item.height}" alt="${escaped}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;
};
