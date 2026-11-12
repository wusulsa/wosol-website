const fs=require('node:fs'),assert=require('node:assert/strict');
const additions={
 'corporate-transport-saudi-arabia':[
 ['هل التتبع والتقارير التشغيلية مشمولة؟','نعم، التتبع والتقارير التشغيلية مشمولة بخدمة نقل الجهات، مع تشغيل ومتابعة على مدار الساعة. تحدد خطة التشغيل جهة استلام التقارير ودوريتها وصلاحيات الوصول. استقبال الاستفسارات في المكتب من الأحد إلى الخميس، من 9 صباحًا إلى 5 عصرًا بتوقيت السعودية.','Are tracking and operational reports included?','Yes. Corporate transport includes tracking and operational reporting, with round-the-clock operations and monitoring. The operating plan defines report recipients, frequency and access permissions. Office enquiries are handled Sunday to Thursday, 9 am–5 pm Saudi time.'],
 ['أحتاج مركبات فقط أو سائقين فقط؛ ما الخدمة المناسبة؟','اختر تأجير مركبات بدون سائق إذا كان السائقون متوفرين لدى منشأتك، أو توفير سائقين دون مركبات إذا كانت المركبات متوفرة لديكم. أما نقل المنسوبين فيبدأ بتحديد الركاب والمسارات والورديات. لكل خيار صفحة خدمة مستقلة توضح البيانات المطلوبة لطلب العرض.','Should I request vehicles, drivers or staff transport?','Choose vehicle rental without a driver if your organisation has drivers, or driver-only services if you already have vehicles. For staff transport, start with passenger numbers, routes and shifts. Each option has a dedicated service page explaining the information needed for a quote.']
 ],
 'employee-transport-jeddah':[
 ['هل أختار نقطة تجمع واحدة أم عدة نقاط؟','ابدأ بمواقع سكن الموظفين ووقت وصولهم المطلوب إلى العمل. نقطة تجمع مشتركة تقلل عدد التوقفات، بينما قد تخدم عدة نقاط مجموعات متباعدة. نراجع توزيع الركاب والمسار لاختيار ترتيب مناسب؛ ولا توجد مدة رحلة واحدة تنطبق على جميع الأحياء.','Should we use one pickup point or several?','Start with employee accommodation locations and required arrival times. One shared pickup point reduces stops; several points may suit groups living farther apart. Passenger distribution and routing guide the arrangement; there is no single journey time for every neighbourhood.'],
 ['ما المعلومات التي تساعد على مقارنة عروض نقل الموظفين؟','قارن العروض على المسار نفسه وعدد الرحلات وأيام التشغيل والسعة ومدة العقد. راجع ما يشمله السعر، والانتظار، وآلية تعديل الجدول، وترتيبات البديل. السعر وحده لا يوضح الفرق بين نطاقَي خدمة مختلفين.','How can we compare staff transport quotes?','Compare the same route, trip frequency, operating days, capacity and contract duration. Review price inclusions, waiting time, schedule changes and replacement arrangements. Price alone does not explain differences in service scope.']
 ],
 'employee-transport-riyadh':[
 ['كيف أنظم نقل الموظفين مع اختلاف بداية الورديات؟','جهّز جدولًا لكل وردية يتضمن وقت الحضور والانصراف وعدد الركاب ونقاط التجمع والمقر المقصود. أظهر أي تداخل بين الورديات؛ فهذه البيانات تساعد على تحديد الرحلات والسعة المطلوبة لكل وقت بدل جمع الاحتياج في عدد إجمالي واحد.','How do we plan transport for different shift start times?','Prepare a schedule for each shift with arrival and departure times, passenger numbers, pickup points and destination. Show any overlap between shifts. This helps define trips and capacity for each time slot instead of relying on one total headcount.'],
 ['هل أطلب عرضًا واحدًا للفروع أم عرضًا لكل مقر؟','يمكنك إرسال طلب موحّد مع تفصيل مستقل لكل مقر. أضف مسؤول التنسيق والمواقع والأعداد والمواعيد لكل فرع، حتى يكون نطاق كل مسار قابلًا للمراجعة داخل العرض.','Should we request one quote for all branches?','You can submit one consolidated request with a separate breakdown for each workplace. Include coordination contacts, locations, passenger numbers and timings for each branch so every route has a clear scope in the proposal.']
 ],
 'employee-transport-makkah':[
 ['كيف أوضح متطلبات وصول الموظفين إلى موقع العمل؟','أرفق موقع الوصول الدقيق، واسم البوابة أو نقطة الإنزال، وأي تعليمات دخول معروفة لدى منشأتك. وضّح المواعيد التي لا يمكن تغييرها، وأي قيود على دخول المركبات، ليُدرس المسار على أساس المتطلبات الفعلية للموقع.','How should we explain access requirements at the workplace?','Share the exact destination, gate or drop-off point, and any access instructions supplied by your organisation. Identify fixed arrival times and vehicle access restrictions so route planning reflects the actual site requirements.']
 ],
 'employee-transport-madinah':[
 ['ما الذي أرفقه إذا تغير جدول الموظفين خلال الأسبوع؟','أرسل جدولًا حسب اليوم يوضح عدد الركاب وأوقات الحضور والانصراف ونقاط التجمع. ميّز الأيام الثابتة عن الاستثناءات، مثل تغطية وردية إضافية، لتجنب افتراض جدول موحّد لا يعكس احتياج المنشأة.','What if staff schedules change during the week?','Provide a day-by-day schedule with passenger numbers, arrival and departure times, and pickup points. Separate regular days from exceptions such as an additional shift, rather than assuming one timetable fits the whole week.']
 ],
 'employee-transport-dammam':[
 ['كيف أطلب النقل بين السكن وأكثر من موقع عمل؟','قسّم الطلب حسب الوجهة، مع عدد الموظفين ونقطة الانطلاق والوردية لكل مجموعة. حدّد ما إذا كان الموظفون ينتقلون مباشرة إلى موقع واحد أو بين مواقع خلال اليوم؛ فالنقل إلى مقر العمل يختلف عن التنقل التشغيلي بين المواقع.','How do we request transport from accommodation to several workplaces?','Break down the request by destination, showing passenger numbers, pickup location and shift for each group. State whether employees travel directly to one workplace or move between sites during the day; commuting and inter-site transport have different requirements.']
 ]
};
let pages=0;
for(const [slug,items] of Object.entries(additions))for(const en of [false,true]){
 const file='content/approved-site/'+(en?'en/'+slug+'/index.html':slug+'.html');
 let h=fs.readFileSync(file,'utf8');
 if(h.includes('data-business-answers'))continue;
 const start=h.indexOf('<div class="faq">');assert(start>=0,file);
 const end=h.indexOf('</div>',start);assert(end>start,file);
 const html=items.map(x=>`<details data-business-answers><summary>${x[en?2:0]}</summary><p>${x[en?3:1]}</p></details>`).join('');
 h=h.slice(0,end)+html+h.slice(end);fs.writeFileSync(file,h);pages++;
}
console.log(JSON.stringify({pages,claims:'Only existing owner-approved facts; other answers are planning guidance. No added prices, guarantees or client endorsements.'}));
