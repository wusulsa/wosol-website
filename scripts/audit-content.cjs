/* Only publish supported facts; operating commitments are agreed per contract. */
exports.enrich = pages => {
  for (const p of pages) {
    if (p.kind === 'company') {
      const city=p.city==='jeddah'?'Jeddah':p.city==='riyadh'?'Riyadh':'Saudi Arabia';


      p.eyebrow[1]=`BUSINESS TRANSPORT · ${city.toUpperCase()}`;
      p.sections.push(
        [['ما الذي نحدده قبل التشغيل؟','What is agreed before operations begin?'],['يُحدد عرض الخدمة نقاط التجمع والوصول، وأيام التشغيل والورديات، والسعة المطلوبة، وتاريخ البداية ومدة العقد. تُراجع تغييرات المسار أو الأعداد مع الفريق قبل اعتمادها؛ ويحدد الاتفاق أثرها على السعر والجدول.','Your service proposal defines pickup and drop-off points, operating days and shifts, capacity, start date and contract duration. Route or headcount changes are reviewed before confirmation, including any effect on pricing and schedules.']],
        [['المتابعة والبدائل والتصعيد','Support, replacements and escalation'],['اطلب تضمين مسؤول التنسيق وقناة الإبلاغ عن التأخير وآلية التصعيد في الاتفاق. تُحدد ترتيبات المركبة البديلة بحسب الموقع والتوافر ونطاق العقد؛ ولا يُفترض زمن استجابة موحد. يُوضح كذلك من يستلم تقارير التشغيل ودوريتها وصلاحيات التتبع عند شمولها بالخدمة.','Ask for the coordination contact, delay-reporting channel and escalation process to be included in your agreement. Replacement arrangements depend on location, availability and contract scope; a standard response time is not assumed. Where reporting or tracking is included, agree recipients, reporting frequency and access permissions.']]);
      p.faq.push([['كيف أجهز طلبًا لورديات موسمية أو موقع جديد؟','How do I plan seasonal shifts or a new site?'],['أرسل تاريخ البداية والنهاية، وعدد الركاب لكل وردية وروابط مواقع التجمع والوصول. تُراجع التغطية والسعة والجدول قبل تأكيد العرض، ولا يُعد تقديم الطلب حجزًا نهائيًا.','Share start and end dates, passengers per shift and pickup and destination links. Coverage, capacity and schedules are reviewed before a quote is confirmed. An enquiry is not a confirmed booking.']]);
    } else {
      p.faq.push([['متى أطلب النقل للفصل الدراسي أو فترة الاختبارات؟','When should I enquire for a new term or exams?'],['تواصلي عند توفر جدولك وحددي الحي وفرع الجامعة وأيام الحضور ووقت الذهاب والعودة. أرسلي أي تغيير في جدول الاختبارات للفريق لمراجعة إمكانية تعديل المسار؛ لا يتأكد المقعد أو التعديل إلا بعد موافقة الفريق.','Enquire when your timetable is available. Share your neighbourhood, campus, attendance days and outbound and return times. Send exam timetable changes to the team for route review. Seats and schedule changes require confirmation.']]);
    }
  }
};
exports.schema = ({origin, canonical, slug, title, desc, lang, pages}) => {
  const org={'@type':'LocalBusiness','@id':origin+'/#organization',name:'WOSOL Transportation',alternateName:'وُسُل للنقل',url:origin+'/',logo:origin+'/assets/profile-2026/logo-brand.svg',image:origin+'/assets/profile-2026/hero-native.webp',telephone:'+966536060003',email:'info@wosol.net',foundingDate:'2013',openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Sunday','Monday','Tuesday','Wednesday','Thursday'],opens:'09:00',closes:'17:00'}],address:{'@type':'PostalAddress',streetAddress:'Al Madinah Road, Al Ruwais, Al Muhammadiyah Plaza',addressLocality:'Jeddah',addressCountry:'SA'},contactPoint:['+966536060003','+966566070705','+966501844991','920003790'].map(telephone=>({'@type':'ContactPoint',contactType:'customer service',telephone,email:'info@wosol.net',availableLanguage:['Arabic','English']})),sameAs:['https://www.instagram.com/wosoltransportations','https://x.com/wosol_net']};
  const page=pages.find(p=>p.slug===slug);
  const graph=[org,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'WOSOL',publisher:{'@id':org['@id']},inLanguage:['ar','en']},{'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description:desc,inLanguage:lang,isPartOf:{'@id':origin+'/#website'},about:{'@id':page?canonical+'#service':org['@id']}}];
  if(page)graph.push({'@type':'Service','@id':canonical+'#service',url:canonical,name:title,description:desc,provider:{'@id':org['@id']},areaServed:page.kind==='service'?[{'@type':'City',name:'Jeddah'},{'@type':'City',name:'Riyadh'},{'@type':'Country',name:'Saudi Arabia'}]:{'@type':page.slug.includes('saudi')?'Country':'City',name:page.city==='riyadh'?'Riyadh':page.slug.includes('saudi')?'Saudi Arabia':'Jeddah'},serviceType:page.kind==='service'?page.h1[lang==='ar'?0:1]:page.kind==='student'?'University student transport':'Employee transport'});
  return {'@context':'https://schema.org','@graph':graph};
};
