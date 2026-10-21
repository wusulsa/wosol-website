/* Group generated cards without duplicating service content or changing destinations. */
const fs=require('fs');const path=require('path');
module.exports=(html,lang)=>{
 const nav=fs.readFileSync(path.join(__dirname,'../content/home-paths-'+lang+'.html'),'utf8');
 const catalog=html.match(/<section[^>]*id="transport-services"[\s\S]*?<\/section>/)[0];
 const core=html.match(/<section[^>]*id="services"[\s\S]*?<\/section>/)[0];
 const article=catalog.match(/<article class="solution-card"[\s\S]*?<\/article>/)[0];
 const cards=catalog.match(/<a class="solution-card"[\s\S]*?<\/a>/g);
 const extra=core.match(/<a class="solution-card"[\s\S]*?<\/a>/g);
 if(cards.length!==10||extra.length!==3)throw Error('Review service grouping after catalog changes');
 const business=[article,...cards.filter(c=>/workforce-project-transport|vehicle-rental-without-driver|driver-only-services/.test(c)),...extra.slice(1)];
 const groups=[business,cards.filter(c=>!business.includes(c)),extra.slice(0,1)];
 const titles=[...nav.matchAll(/<h3>(.*?)<\/h3>/g)].map(m=>m[1]);
 const desc=[...nav.matchAll(/<h3>.*?<\/h3><p>(.*?)<\/p>/g)].map(m=>m[1]);
 const ids=['business-path','trips-path','university-path'];
 const directory='<section class="editorial-section home-service-directory" id="transport-services"><div class="container"><div id="services"><p class="eyebrow">'+(lang==='ar'?'خدماتنا':'OUR SERVICES')+'</p><h2>'+(lang==='ar'?'اختر الخدمة المناسبة لرحلتك':'Find the service that fits your journey')+'</h2></div>'+groups.map((g,i)=>`<section class="home-service-group" id="${ids[i]}" aria-labelledby="${ids[i]}-title"><header><span class="path-marker" aria-hidden="true">0${i+1}</span><div><h2 id="${ids[i]}-title">${titles[i]}</h2><p>${desc[i]}</p></div></header><div class="solutions-grid">${g.join('')}</div></section>`).join('')+'</div></section>';
 const start=html.indexOf('<div class="container journey-finder"');
 html=html.slice(0,start)+nav+html.slice(html.indexOf(catalog));
 return html.replace(catalog,directory).replace(core,'');
};
