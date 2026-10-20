/* Service form: service-specific fields. Inactive controls are excluded from FormData. */
document.addEventListener('DOMContentLoaded', () => {
  const form=document.getElementById('quoteForm');
  if(!form)return;
  const en=document.documentElement.lang==='en', pick=(ar,eng)=>en?eng:ar;
  const service=document.getElementById('qt-service'),count=document.getElementById('qt-count');
  const grid=count.closest('.quote-field-grid');
  const notice=document.createElement('div');notice.className='ui-form-status';notice.setAttribute('role','status');notice.style.gridColumn='1 / -1';
  service.closest('.form-group').after(notice);
  const definitions=[
    ['vehicles', 'عدد المركبات المطلوبة','Number of vehicles','number'],
    ['drivers','عدد السائقين المطلوبين','Number of drivers','number'],
    ['vehicle-type','فئة المركبة','Vehicle category','text'],
    ['start','تاريخ بدء الخدمة','Service start date','date'],
    ['departure-time','وقت الانطلاق / بدء التشغيل','Departure / operating start time','time'],
    ['return-date','تاريخ العودة','Return date','date'],
    ['return-time','وقت العودة','Return time','time'],
    ['end','تاريخ انتهاء الخدمة (اختياري)','Service end date (optional)','date'],
    ['pickup','موقع الانطلاق أو الاستلام','Pickup location','text'],
    ['destination','الوجهة أو موقع الإعادة','Destination or return location','text'],
    ['schedule','الورديات وأيام العمل','Shifts and working days','text'],
    ['flight','رقم الرحلة وموعد الوصول (اختياري)','Flight number and arrival time (optional)','text'],
    ['requirements','طبيعة الاحتياج والمتطلبات الخاصة','Service needs and specific requirements','text']
  ];
  const controls={};
  for(const [key,ar,english,type] of definitions){
    const wrap=document.createElement('div');wrap.className='form-group';
    const label=document.createElement('label');label.htmlFor='qt-'+key;label.textContent=pick(ar,english);
    const input=document.createElement('input');input.id='qt-'+key;input.name='qt-'+key;input.type=type;
    if(type==='number'){input.min='1';input.step='1';} else if(type==='text')input.maxLength=250;
    wrap.append(label,input);grid.append(wrap);controls[key]={wrap,input};
  }
  function selectField(key,ar,english,options,target){
    const wrap=document.createElement('div');wrap.className='form-group';
    const label=document.createElement('label');label.htmlFor='qt-'+key;label.textContent=pick(ar,english);
    const input=document.createElement('select');input.id='qt-'+key;input.name=input.id;
    for(const [value,a,e] of options){const opt=document.createElement('option');opt.value=value;opt.textContent=pick(a,e);input.append(opt);}
    const selectWrap=document.createElement('div');selectWrap.className='select-wrap';selectWrap.append(input);
    wrap.append(label,selectWrap);target.append(wrap);return {wrap,input};
  }
  const customer=selectField('customer-type','نوع العميل','Customer type',[['','اختر فردًا أو جهة','Select individual or organisation'],['individual','فرد','Individual'],['organisation','جهة / شركة','Organisation / company']],form.querySelector('.quote-field-grid'));
  form.querySelector('.quote-field-grid').prepend(customer.wrap);
  controls.direction=selectField('direction','اتجاه الرحلة','Journey direction',[['','اختر اتجاه الرحلة','Select journey direction'],['one_way','اتجاه واحد','One-way'],['return','ذهاب وعودة','Return journey']],grid);
  controls.duration=selectField('duration','تحديد مدة الخدمة','Service duration',[['','اختر تحديد المدة','Choose duration'],['dates','تاريخ بداية ونهاية','Start / end dates'],['period','عدد الأيام أو الأشهر','Days or months']],grid);
  const durationNumber=document.createElement('div');durationNumber.className='form-group';
  durationNumber.innerHTML='<label for="qt-duration-value">'+pick('المدة المطلوبة','Required duration')+'</label><input type="number" min="1" step="1" id="qt-duration-value" name="qt-duration-value">';
  grid.append(durationNumber);controls['duration-value']={wrap:durationNumber,input:durationNumber.querySelector('input')};
  controls['duration-unit']=selectField('duration-unit','وحدة المدة','Duration unit',[['days','أيام','Days'],['months','أشهر','Months']],grid);
  // Keep date, direction and duration controls together before locations.
  for(const key of ['start','departure-time','direction','return-date','return-time','duration','duration-value','duration-unit','end'])grid.insertBefore(controls[key].wrap,controls.pickup.wrap);
  const requiredOriginal=new Map([...form.elements].map(x=>[x,x.required]));
  const notes=document.getElementById('qt-notes'),notesLabel=form.querySelector('label[for="qt-notes"]');
  grid.append(notes.closest('.form-group'));
  notesLabel.removeAttribute('data-i18n');notesLabel.textContent=pick('تفاصيل إضافية (اختياري)','Additional details (optional)');
  const legend=grid.closest('fieldset').querySelector('legend span:last-child');legend.textContent=pick('تفاصيل الخدمة','Service details');
  function update(){
    const value=service.value,students=value==='students';
    for(const el of form.elements){if(el===service||el.tagName==='FIELDSET')continue;el.disabled=students;el.required=students?false:!!requiredOriginal.get(el);}
    form.querySelector('fieldset').hidden=students;
    form.querySelector('.quote-documents').hidden=students;
    form.querySelector('button[type="submit"]').hidden=students;
    for(const id of ['qt-count','qt-region','qt-notes'])document.getElementById(id).closest('.form-group').hidden=students;
    const rental=value==='vehicle_only',driver=value==='driver_only';
    customer.input.disabled=students;customer.input.required=!students;
    const org=document.getElementById('qt-org'),isOrg=customer.input.value==='organisation';
    org.closest('.form-group').hidden=students||!isOrg;org.disabled=students||!isOrg;org.required=!org.disabled;
    count.closest('.form-group').hidden=students||rental||driver;
    count.disabled=students||rental||driver;count.required=!count.disabled;
    const keys=students||!value?[]:rental?['vehicles','vehicle-type','start','end','pickup','destination']:driver?['drivers','vehicle-type','start','end','schedule']:['start','pickup','destination',...(['employees','workforce'].includes(value)?['schedule','end']:[]),...(value==='airport'?['flight']:[]),...(value==='specialized'?['requirements']:[])];
    if(value&&!students){
      if(rental||driver){
        keys.splice(keys.indexOf('end'),1);keys.push('duration');
        if(controls.duration.input.value==='dates')keys.push('end');
        if(controls.duration.input.value==='period')keys.push('duration-value','duration-unit');
      }else{
        keys.push('departure-time','direction');
        if(controls.direction.input.value==='return')keys.push('return-date','return-time');
      }
    }
    for(const [key,{wrap,input}] of Object.entries(controls)){
      wrap.hidden=!keys.includes(key);input.disabled=wrap.hidden;input.required=!wrap.hidden&&!['end','flight'].includes(key);
      if(key==='end'&&(rental||driver))input.required=!wrap.hidden;
      input.setCustomValidity('');
      input.removeAttribute('aria-invalid');
      const error=document.getElementById(input.id+'-error');if(error)error.hidden=true;
    }
    controls.end.wrap.querySelector('label').textContent=pick((rental||driver)?'تاريخ انتهاء الخدمة':'تاريخ انتهاء الخدمة (اختياري)',(rental||driver)?'Service end date':'Service end date (optional)');
    const staff=['employees','workforce'].includes(value);
    const label=(key,ar,english)=>controls[key].wrap.querySelector('label').textContent=pick(ar,english);
    label('pickup',rental?'موقع استلام المركبات':staff?'موقع السكن أو نقطة التجمع':'موقع انطلاق الرحلة',rental?'Vehicle collection location':staff?'Accommodation or meeting point':'Journey pickup location');
    label('destination',rental?'موقع إعادة المركبات':staff?'موقع العمل أو المشروع':'وجهة الرحلة',rental?'Vehicle return location':staff?'Workplace or project location':'Journey destination');
    label('start',rental?'تاريخ استلام المركبات':driver||staff?'تاريخ بدء التشغيل':'تاريخ الرحلة',rental?'Vehicle collection date':driver||staff?'Operating start date':'Journey date');
    label('departure-time',staff?'وقت انطلاق الوردية':'وقت انطلاق الرحلة',staff?'Shift pickup time':'Journey departure time');
    label('vehicle-type',driver?'نوع المركبات التي سيقودها السائقون':'فئة المركبات المطلوبة',driver?'Type of vehicles the drivers will operate':'Required vehicle category');
    controls.pickup.input.placeholder=pick('المدينة أو اسم الموقع','City or location');
    controls.destination.input.placeholder=pick('المدينة أو اسم الموقع','City or location');
    controls.schedule.input.placeholder=pick('مثال: الأحد–الخميس، 8 صباحًا–5 مساءً','e.g. Sunday–Thursday, 8 am–5 pm');
    notice.replaceChildren();
    if(students){
      notice.append(document.createTextNode(pick('للطالبات: الاستفسار لطرح الأسئلة فقط. لطلب اشتراك، استخدمي نموذج التسجيل الحالي؛ ويُراجع الفريق الطلب قبل اعتماد الخدمة. ','For students: an enquiry is for questions only. To request a subscription, use the existing Arabic registration form; our team reviews your request before confirming service. ')));
      for(const [text,url] of [[pick('طلب تسجيل طالبة','Student registration'),en?'/en/register':'/register'],[pick('استفسار عن النقل الجامعي','Ask about university transport'),(en?'/en/':'/')+'?contactTab=inquiry#contact']]){
        const a=document.createElement('a');a.className='text-link';a.textContent=text;a.href=url;notice.append(a,document.createTextNode(' · '));
      }
    }else notice.textContent=pick(
      rental?'حدّد عدد المركبات وفئتها ومدة التأجير دون سائق.':driver?'الخدمة لتوفير سائقين لقيادة مركباتكم؛ حدّد العدد ونوع المركبات ومواعيد العمل.':value==='specialized'?'صف احتياج النقل الذي لا يندرج ضمن الخيارات الأخرى، مثل متطلبات الوصول أو تجهيز المركبة؛ يراجع الفريق ملاءمة الخدمة.':'اختر الخدمة لتظهر البيانات المناسبة لطلبك.',
      rental?'Specify vehicle quantity, category and rental dates. Drivers are not included.':driver?'Drivers operate your vehicles. Specify driver quantity, vehicle type and working schedule.':value==='specialized'?'Describe transport needs not covered by the other options, such as access or vehicle configuration requirements. Our team will review service suitability.':'Choose a service to see the relevant request fields.');
  }
  function dates(){
    const a=controls.start.input,b=controls.end.input,r=controls['return-date'].input,t=controls['return-time'].input,d=controls['departure-time'].input;
    b.min=r.min=a.value;
    b.setCustomValidity(!b.disabled&&a.value&&b.value&&b.value<a.value?pick('تاريخ الانتهاء يجب ألا يسبق تاريخ البداية.','The end date must not precede the start date.'):'');
    r.setCustomValidity(!r.disabled&&a.value&&r.value&&r.value<a.value?pick('تاريخ العودة يجب ألا يسبق تاريخ الانطلاق.','The return date must not precede departure.'):'');
    t.setCustomValidity(!t.disabled&&r.value===a.value&&t.value&&d.value&&t.value<=d.value?pick('وقت العودة يجب أن يكون بعد الانطلاق.','Return time must be after departure.'):'');
    for(const el of [b,r,t])if(el.getAttribute('aria-invalid')==='true')window.WosolFormValidation?.validate(el);
  }
  for(const {input} of [customer,...Object.values(controls)])window.WosolFormValidation?.bind(input);
  service.addEventListener('change',()=>{update();dates();});
  for(const key of ['start','end','departure-time','return-date','return-time'])controls[key].input.addEventListener('change',dates);
  for(const key of ['start','end','departure-time','return-date','return-time'])controls[key].input.addEventListener('input',dates);
  for(const item of [customer,controls.direction,controls.duration])item.input.addEventListener('change',()=>{update();dates();});
  form.addEventListener('reset',()=>setTimeout(()=>{update();dates();},0));
  update();
});
