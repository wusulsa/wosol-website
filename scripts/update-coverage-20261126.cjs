const fs=require('fs');
const coverage=JSON.parse(fs.readFileSync('content/coverage.json','utf8'));
for(const pair of [['تبوك','Tabuk'],['مدينة الملك عبدالله الاقتصادية','King Abdullah Economic City (KAEC)'],['أمالا','AMAALA']])if(!coverage.some(x=>x[0]===pair[0]))coverage.push(pair);
fs.writeFileSync('content/coverage.json',JSON.stringify(coverage,null,2)+'\n');
const changed=[];
for(const lang of [0,1]){
 const home=lang?'en/index.html':'index.html'; let s=fs.readFileSync(home,'utf8');
 const re=/<div class="coverage-cities">([\s\S]*?)<\/div>/;
 const old=s.match(re);if(!old)throw Error('coverage missing');const icon=old[1].match(/<svg[\s\S]*?<\/svg>/)[0];
 s=s.replace(re,'<div class="coverage-cities">'+coverage.map((c,i)=>`<span class="${i<2?'priority-city':''}">${icon}${c[lang]}</span>`).join('')+'</div>');
 s=s.replace(/<strong>14<\/strong>(\s*<span>(?:وجهة ونطاق تغطية|Destinations and service areas)<\/span>)/,'<strong>17</strong>$1');
 fs.writeFileSync(home,s);fs.writeFileSync('content/approved-site/'+home,s);changed.push(home);
 for(const slug of ['corporate-transport-saudi-arabia','workforce-project-transport']){
 const f=lang?`en/${slug}/index.html`:`${slug}.html`;let h=fs.readFileSync(f,'utf8');
 const intro=lang?'We welcome staff and workforce transport enquiries across the following cities, regions and project destinations:':'نستقبل طلبات نقل الموظفين وفرق العمل في المدن والمناطق ووجهات المشاريع التالية:';
 const list=coverage.map(c=>c[lang]).join(lang?', ':'، ');
 let body=`<section id="service-coverage-search"><h2>${lang?'Service areas':'نطاق الخدمة'}</h2><p>${intro}</p><p>${list}${lang?', and other regions across Saudi Arabia.':'، وبقية مناطق المملكة العربية السعودية.'}</p></section>`;
 if(slug==='workforce-project-transport')body+=lang?'<section><h2>Staff transport for AMAALA and NEOM project destinations</h2><p>Planning employee shuttles for AMAALA or NEOM starts with the specific accommodation and worksite locations, rather than the destination name alone. Share passengers per shift, pickup points, shift times and site access requirements so the transport plan can account for travel time and staff handovers.</p><p>For hospitality teams and project contractors, include operating days and the required monthly or annual contract term. Vehicle tracking and operational reports are included, with operations and follow-up available 24/7.</p></section><section><h2>Employee transport in King Abdullah Economic City</h2><p>For companies in King Abdullah Economic City (KAEC), share the exact workplace and accommodation locations and whether journeys start within the city, in Rabigh or in Jeddah. This helps define pickup routes, vehicle capacity and shift arrival times for your quotation.</p></section>':'<section><h2>نقل موظفين وفرق مشاريع في أمالا ونيوم</h2><p>تبدأ خطة نقل الموظفين في أمالا أو نيوم بتحديد موقع السكن وموقع العمل بدقة، وليس باسم الوجهة وحده. أرسل أعداد الركاب لكل وردية ونقاط التجمع ومواعيد العمل ومتطلبات دخول الموقع، لتراعي خطة النقل زمن الطريق وتبديل الورديات.</p><p>لفرق الضيافة والمقاولين وفرق المشاريع، نراجع أيام التشغيل ومدة العقد الشهرية أو السنوية المطلوبة. التتبع والتقارير التشغيلية مشمولة، مع تشغيل ومتابعة على مدار الساعة.</p></section><section><h2>نقل موظفين في مدينة الملك عبدالله الاقتصادية</h2><p>للشركات في مدينة الملك عبدالله الاقتصادية، حدد موقع العمل والسكن وما إذا كانت الرحلات تبدأ من داخل المدينة أو رابغ أو جدة. تساعد هذه التفاصيل على تحديد مسارات التجمع وسعة المركبات ومواعيد وصول الورديات ضمن عرض السعر.</p></section>';
 else body+=`<section><h2>${lang?'Transport planning for project destinations':'تخطيط النقل لوجهات المشاريع'}</h2><p>${lang?'For AMAALA, NEOM and King Abdullah Economic City, share accommodation and worksite locations, shift schedules and passenger numbers to plan employee transport around your operations.':'لنقل الموظفين في أمالا ونيوم ومدينة الملك عبدالله الاقتصادية، شارك مواقع السكن والعمل وجداول الورديات وأعداد الركاب لإعداد خطة تناسب التشغيل.'}</p><p><a href="${lang?'/en/workforce-project-transport/':'/workforce-project-transport'}">${lang?'Explore workforce and project transport':'تفاصيل نقل الموظفين وفرق المشاريع'}</a></p></section>`;
 if(!/<section id="service-coverage-search">[\s\S]*?<\/section>/.test(h))throw Error(f);
 h=h.replace(/<section id="service-coverage-search">[\s\S]*?<\/section>/,body);
 fs.writeFileSync(f,h);fs.writeFileSync('content/approved-site/'+f,h);changed.push(f);
 }
}
fs.mkdirSync('docs/audits/evidence',{recursive:true});fs.writeFileSync('docs/audits/evidence/2026-11-26-coverage-files.json',JSON.stringify({status:'prepared-not-published',files:changed,coverage},null,2));
console.log(changed);
