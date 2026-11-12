const paths={people:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-4',route:'M5 5h14v5H5v9h14M3 3h4v4H3ZM17 17h4v4h-4Z',calendar:'M4 5h16v16H4ZM8 3v4m8-4v4M4 11h16',plane:'m3 15 7-3V4l2-2 2 2v8l7 3v2l-7-1v4l2 1H8l2-1v-4l-7 1Z',key:'M14 8a5 5 0 1 1-9 3L2 14v5h5v-3h3l3-3M16 7h.01',bus:'M5 17h14V6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v11ZM5 9h14M8 13h1m6 0h1M7 17v3m10-3v3',star:'m12 3 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1Z'};
const labels={
'workforce-project-transport':[['نقل فرق المشاريع','Project transport'],'people',0],
'private-day-trips':[['رحلات اليوم الواحد','Day trips'],'bus',1],
'event-conference-transport':[['نقل الفعاليات','Event transport'],'calendar',1],
'airport-hotel-transfers':[['نقل المطار والفنادق','Airport & hotel transfers'],'plane',1],
'intercity-group-transport':[['النقل بين المدن','Intercity transport'],'route',1],
'tourism-transport':[['النقل السياحي','Tourism transport'],'route',1],
'umrah-visitor-transport':[['نقل المعتمرين والزوار','Umrah & visitor transport'],'bus',1],
'executive-vip-transport':[['نقل كبار الشخصيات','Executive transport'],'star',1],
'vehicle-rental-without-driver':[['مركبات بدون سائق','Self-drive vehicle rental'],'key',2],
'driver-only-services':[['سائقون دون مركبات','Driver-only services'],'people',2]};
module.exports=({catalog,t,url,home=false})=>{
const groups=[['نقل الجهات','Business transport'],['الرحلات والضيوف','Trips & guests'],['حلول التأجير','Rental services']];
const icon=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[n]}"/></svg>`;
return `<section class="editorial-section" id="transport-services"><div class="${home?'container':''}"><p class="eyebrow">${t(['خدمات تناسب برنامجك','TRANSPORT FOR YOUR PLANS'])}</p><h2>${t(['خدمة تناسب احتياجك','Transport for your needs'])}</h2><p class="section-desc">${t(['نقل الجهات في جدة والرياض، ورحلات للمجموعات والضيوف في بقية المملكة. اختر الخدمة لتتعرف على التفاصيل.','Business transport in Jeddah and Riyadh, with group and guest travel across Saudi Arabia. Choose a service to explore.'])}</p><div class="solutions-grid"><article class="solution-card"><div class="solution-card__top">${icon('people')}<span class="service-category">${t(groups[0])}</span></div><h3>${t(['نقل منسوبي الشركات','Staff transport'])}</h3><p>${t(['للشركات والمؤسسات والهيئات، بعقود شهرية وسنوية ومسارات تناسب الورديات.','For companies, institutions and authorities. Monthly or annual contracts built around your shifts.'])}</p><div class="solution-card__link service-city-actions"><a href="${url('employee-transport-jeddah')}">${t(['جدة','Jeddah'])} ↗</a><a href="${url('employee-transport-riyadh')}">${t(['الرياض','Riyadh'])} ↗</a></div></article>${catalog.map(p=>{const [label,n,g]=labels[p.slug]||[p.h1,'bus',1];return `<a class="solution-card" href="${url(p.slug)}"><div class="solution-card__top">${icon(n)}<span class="service-category">${t(groups[g])}</span></div><h3>${t(label)}</h3><p>${t(p.eyebrow)}</p><span class="solution-card__link">${t(['تفاصيل الخدمة','View service'])} <span aria-hidden="true">↗</span></span></a>`;}).join('')}</div></div></section>`;
};
