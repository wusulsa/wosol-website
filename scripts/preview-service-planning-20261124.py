from pathlib import Path
import re,json,shutil,sys
sys.stdout.reconfigure(encoding='utf-8')
root=Path.cwd(); prod=root.parents[1]/'wosol-net-production-20261123'; out=root/'dist'
css='''.service-choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin:1.25rem 0}.service-choice{padding:1.3rem;border:1px solid var(--border,#d7dee2);border-radius:12px;background:var(--surface,transparent)}.service-choice h3{font-size:1.2rem;line-height:1.5;margin:0 0 .6rem}.service-choice p{margin:0;line-height:1.85}.service-body section{scroll-margin-top:8rem}.service-route{font-weight:700}.service-choice-grid p{overflow-wrap:anywhere}@media(max-width:600px){.service-choice-grid{grid-template-columns:1fr}.service-choice{padding:1rem}}'''
(out/'css/service-planning-20261124.css').write_text(css)
def cards(title,items,id):
 return '<section id="'+id+'"><h2>'+title+'</h2><div class="service-choice-grid">'+''.join('<div class="service-choice"><h3>'+a+'</h3><p>'+b+'</p></div>' for a,b in items)+'</div></section>'
for en in [False,True]:
 for bus in [True,False]:
  slug='private-day-trips' if bus else 'umrah-visitor-transport'; name=f'en/{slug}/index.html' if en else slug+'.html'
  s=(prod/name).read_text(encoding='utf-8')
  if bus:
   intro=('Hire a bus with a driver for a single trip, a day, or a monthly or annual arrangement anywhere in Saudi Arabia. We plan transport for employees, school and centre outings, events and visiting groups around passenger numbers, routes and operating times.' if en else 'حافلة مع سائق بالمشوار أو باليوم أو بعقود شهرية وسنوية في جميع أنحاء المملكة. ننظّم نقل الموظفين ورحلات المدارس والمراكز والفعاليات والوفود، بخطة تناسب عدد الركاب والمسار ومواعيد التشغيل.')
   s=re.sub(r'(<p class="section-desc">).*?(</p>)',lambda m:m[1]+intro+m[2],s,count=1,flags=re.S)
   dur=[('Single-trip hire','For a one-way journey or a planned return trip. Share the pickup point, destination and departure times.'),('Daily hire','For an outing, visit or event. Specify the hours, stops and whether the bus should wait with the group.'),('Monthly hire','For recurring journeys over a month. Define operating days, routes, shifts and passenger numbers.'),('Annual hire','For ongoing transport needs. Agree the operating schedule, routes and service scope for the contract.')] if en else [('بالمشوار','لرحلة باتجاه واحد أو ذهاب وعودة. حدد نقطة الانطلاق والوجهة ومواعيد المغادرة.'),('باليوم','للزيارات والرحلات والفعاليات. حدد ساعات الاستخدام والمحطات وما إذا كانت الحافلة ستبقى مع المجموعة.'),('بعقد شهري','للتنقل المتكرر خلال الشهر، مع تحديد أيام التشغيل والمسارات والورديات وعدد الركاب.'),('بعقد سنوي','لاحتياجات النقل المستمرة، بخطة تحدد جدول التشغيل والمسارات ونطاق الخدمة طوال العقد.')]
   uses=[('Employee and project transport','Recurring journeys between accommodation and workplaces, with schedules suited to shifts.'),('Trips, events and visiting groups','Day trips, school and centre outings, and transport for delegates and event attendees.')] if en else [('نقل الموظفين وفرق المشاريع','تنقلات متكررة بين السكن ومواقع العمل، بمواعيد تناسب الورديات.'),('الرحلات والفعاليات والوفود','رحلات اليوم الواحد وزيارات المدارس والمراكز، وتنقلات الوفود وحضور الفعاليات.')]
   lead=cards('Choose your hire period' if en else 'اختر مدة التأجير المناسبة',dur,'rental-periods')+cards('Transport that fits your purpose' if en else 'نقل يناسب استخدامك',uses,'rental-uses')
   lead+='<section><h2>'+('Choose a bus for passengers and luggage' if en else 'اختر الحافلة وفق الركاب والأمتعة')+'</h2><p>'+('Our bus categories include 9- or 11-passenger minibuses, 21-passenger mid-size buses and 51-passenger coaches. Tell us about luggage and the route so we can recommend a suitable vehicle; seat count alone does not establish luggage capacity.' if en else 'تشمل فئات الحافلات الصغيرة 9 أو 11 راكبًا، والمتوسطة 21 راكبًا، والكبيرة 51 راكبًا. نراجع حجم الأمتعة وطبيعة المسار مع عدد الركاب لاختيار الفئة المناسبة؛ عدد المقاعد وحده لا يحدد مساحة الحقائب.')+'</p></section>'
   lead+='<section><h2>'+('What shapes your quotation?' if en else 'ما الذي يحدد عرض السعر؟')+'</h2><p>'+('The city and route, hire period, operating days and hours, vehicle size, stops, waiting time and return journeys. For monthly or annual hire, include the number of shifts and whether the route is fixed or changes between sites.' if en else 'المدينة والمسار، ومدة التأجير، وأيام وساعات التشغيل، وفئة الحافلة، والتوقفات والانتظار والعودة. وللعقود الشهرية والسنوية، أضف عدد الورديات وما إذا كان المسار ثابتًا أو متغيرًا بين المواقع.')+'</p></section>'
   s=s.replace('<article class="service-body">','<article class="service-body">'+lead)
   # Remove redundant coverage paragraph; retain scope, trip guidance and existing links.
   s=re.sub(r'<section><h2>(?:التغطية في جدة والرياض وبقية المملكة|Coverage in Jeddah, Riyadh and across Saudi Arabia)</h2>.*?</section>','',s,flags=re.S)
   q='Can I hire a bus with a driver monthly or annually?' if en else 'هل يتوفر تأجير باص مع سائق شهريًا أو سنويًا؟'
   a='Yes. We offer single-trip, daily, monthly and annual bus hire with a driver across Saudi Arabia. The quotation defines operating days, hours, routes and the agreed service scope.' if en else 'نعم، نوفر تأجير الحافلات مع سائق بالمشوار واليوم وبعقود شهرية وسنوية في جميع أنحاء المملكة. يحدد العرض أيام وساعات التشغيل والمسارات ونطاق الخدمة المتفق عليه.'
   s=s.replace('<div class="faq">','<div class="faq"><details><summary>'+q+'</summary><p>'+a+'</p></details>',1)
   def faq(m):
    d=json.loads(m[1]);
    for o in d.get('@graph',[]):
     if o.get('@type')=='FAQPage':o['mainEntity'].insert(0,{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}})
    return '<script type="application/ld+json">'+json.dumps(d,ensure_ascii=False)+'</script>'
   s=re.sub(r'<script type="application/ld\+json">(.*?)</script>',faq,s,flags=re.S)
  else:
   programs=[('Airport to your Makkah hotel','Arrival at King Abdulaziz International Airport in Jeddah, transfer to your hotel in Makkah, and an optional planned return journey. Share your flight details, hotel, passenger count and luggage.'),('Jeddah, Makkah and Madinah','A connected transport itinerary from arrival in Jeddah to Makkah, onward to Madinah and then to the departure airport. Set hotel locations and transfer dates for each leg.'),('Hotel transfers and Ziyarat visits','Journeys from hotels to permitted drop-off points serving the Grand Mosque or the Prophet’s Mosque, with return transfers and requested visits to Islamic and historical landmarks.')] if en else [('من المطار إلى فندقك في مكة المكرمة','استقبال من مطار الملك عبدالعزيز الدولي بجدة، ثم التوصيل إلى الفندق في مكة المكرمة، مع إمكانية ترتيب العودة. أرسل بيانات الرحلة الجوية والفندق وعدد الركاب والحقائب.'),('جدة ومكة المكرمة والمدينة المنورة','برنامج نقل مترابط يبدأ من الوصول إلى جدة، ثم مكة المكرمة، فالمدينة المنورة، وصولًا إلى مطار المغادرة. نحدد الفنادق ومواعيد الانتقال لكل مرحلة.'),('تنقلات الفنادق والحرمين والمزارات','تنقلات من الفنادق إلى نقاط النزول المسموح بها لخدمة الحرم المكي أو المسجد النبوي، مع العودة وزيارات المزارات والمعالم الإسلامية والتاريخية المطلوبة.')]
   lead=cards('Plan your Umrah group transport' if en else 'برامج نقل تناسب رحلة العمرة',programs,'umrah-transport-programmes')
   lead=lead.replace('<div class="service-choice-grid">','<p>'+('These are suggested transport itineraries, tailored to your group. They are not accommodation or visa packages; the agreed quotation sets out the journeys and services included.' if en else 'هذه تصورات لمسارات النقل تُخصص حسب برنامج مجموعتكم، وليست باقات إقامة أو تأشيرات. يوضح العرض المتفق عليه الرحلات والخدمات المشمولة.')+'</p><div class="service-choice-grid">',1)
   s=s.replace('<article class="service-body">','<article class="service-body">'+lead)
   s=s.replace('>رحلات اليوم الواحد</a>','>تأجير حافلة مع سائق</a>').replace('>Private day trips</a>','>Bus hire with a driver</a>')
  s=re.sub(r'(<meta name="robots" content=")[^"]*',r'\1noindex,nofollow',s)
  s=re.sub(r'<script[^>]*src="[^"]*measurement[^>]*></script>','',s)
  s=s.replace('</head>','<link rel="stylesheet" href="/css/service-planning-20261124.css"><script>document.addEventListener("submit",function(e){e.preventDefault();e.stopImmediatePropagation();},true);</script></head>')
  dest=out/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(s,encoding='utf-8')
  # Ensure all referenced local assets from current production are present.
  for asset in re.findall(r'(?:src|href)="/([^"?#]+)',s):
   src=prod/asset
   if src.is_file() and src.suffix.lower() not in ['.html','.xml']:
    d=out/asset;d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,d)
  print(name,'updated')
