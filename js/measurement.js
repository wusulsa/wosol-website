'use strict';
(() => {
  const config=window.WOSOL_MEASUREMENT||{};
  // Preview and local QA never send analytics.
  if(!/^G-[A-Z0-9]+$/.test(config.measurementId||'') || !config.hosts?.includes(location.hostname))return;
  let enabled=false,loaded=false;
  const allowedForms=['quoteForm','contactForm','complaintForm'];
  const safePath=location.origin+location.pathname; // Never query/hash, names, phones or free text.
  function emit(name,form){
    if(!enabled)return;
    const id=allowedForms.includes(form?.id)?form.id:'none';
    const service=['students','employees','private','specialized'].includes(form?.querySelector('#qt-service')?.value)?form.querySelector('#qt-service').value:'unspecified';
    window.gtag('event',name,{form_id:id,service,language:document.documentElement.lang,page_location:safePath,page_referrer:'',page_title:document.title});
  }
  function enable(){
    enabled=true;
    if(loaded)return;loaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());
    window.gtag('config',config.measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safePath,page_referrer:''});
    const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+config.measurementId;document.head.append(script);
    emit('page_view');
  }
  const ar=document.documentElement.lang==='ar';
  const panel=document.createElement('div');panel.className='measurement-choice';panel.setAttribute('role','region');panel.setAttribute('aria-label',ar?'خيارات إحصاءات الاستخدام':'Usage analytics choices');
  const description=document.createElement('p');description.textContent=ar?'هل تسمح بإحصاءات استخدام اختيارية عبر Google Analytics لتحسين الموقع؟ لا نرسل حقول النموذج ضمن أحداث القياس.':'Allow optional Google Analytics usage statistics to improve this website? Form values are not included in our measurement events.';panel.append(description);
  const stored=()=>{try{return localStorage.getItem('wosol-analytics-choice')}catch{return null}};
  function save(choice){try{localStorage.setItem('wosol-analytics-choice',choice)}catch{}panel.hidden=true;}
  for(const [label,value] of [[ar?'السماح':'Allow','yes'],[ar?'رفض':'Decline','no']]){
    const b=document.createElement('button');b.type='button';b.textContent=label;b.className='btn btn--primary';b.addEventListener('click',()=>{save(value);if(value==='yes')enable();else if(enabled){enabled=false;location.reload();}});panel.append(b);
  }
  document.body.append(panel);panel.hidden=stored()!==null;
  const settings=document.createElement('button');settings.type='button';settings.className='analytics-settings';settings.textContent=ar?'خيارات إحصاءات الاستخدام':'Analytics choices';settings.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus()});document.querySelector('.footer__bottom')?.append(settings);
  if(stored()==='yes')enable();
  const started=new WeakSet();
  document.addEventListener('focusin',e=>{const f=e.target.closest('form');if(!allowedForms.includes(f?.id)||started.has(f)||!enabled)return;started.add(f);emit('form_start',f)});
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href');if(h.startsWith('tel:'))emit('contact_phone_click');else if(h.startsWith('https://wa.me/'))emit('contact_whatsapp_click');else if(h.startsWith('mailto:'))emit('contact_email_click')});
  window.WOSOL_METRICS={record:(name,form)=>{if(name==='email_request_accepted')emit(name,form)}};
})();
