const manifest=require('../assets/fleet/hd/manifest.json');
module.exports=function fleetImage(index,alt,className='',eager=false){
 const item=manifest[String(index)];
 if(!item)throw new Error(`Missing fleet image ${index}`);
 const escaped=String(alt).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
 return `<img class="fleet-photo ${className}" style="aspect-ratio:${item.sourceWidth}/${item.sourceHeight}" src="${item.source}" width="${item.sourceWidth}" height="${item.sourceHeight}" alt="${escaped}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;
};
