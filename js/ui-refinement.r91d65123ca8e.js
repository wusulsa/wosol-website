/* Display only: the original file input, validation and mail handler remain intact. */
document.querySelectorAll('.file-picker input[type="file"]').forEach(input=>{
 const label=input.parentElement.querySelector('.file-picker__name');
 const empty=label.textContent;
 const update=()=>{label.textContent=input.files.length?'✓ '+input.files[0].name:empty;input.parentElement.classList.toggle('has-file',!!input.files.length);label.setAttribute('aria-live','polite');};
 input.addEventListener('change',update);
 input.form.addEventListener('reset',()=>setTimeout(update,0));
});

/* Shared, field-specific feedback. Uses validity state without submitting a form. */
window.WosolFormValidation=(()=>{
 const bound=new WeakSet();
 const pick=(ar,en)=>document.documentElement.lang==='en'?en:ar;
 function validate(field){
  if(!field.id||field.type==='file')return true;
  let error=document.getElementById(field.id+'-error');
  if(!field.willValidate){
   if(error)error.hidden=true;
   field.removeAttribute('aria-invalid');return true;
  }
  if(['text','textarea','email','tel'].includes(field.type)){
   field.setCustomValidity(field.required&&!field.value.trim()?pick('أكمل هذا الحقل؛ المسافات وحدها لا تكفي.','Complete this field; spaces alone are not valid.'):'');
   if(field.type==='tel'&&field.value.trim()){
    const value=field.value.replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[ ()-]/g,'');
    field.setCustomValidity(/^\+?[0-9]{8,15}$/.test(value)?'':pick('أدخل رقم جوال صحيحًا، مثل 0536060003 أو +966536060003.','Enter a valid mobile number, such as 0536060003 or +966536060003.'));
   }
  }
  const label=field.form?.querySelector('label[for="'+field.id+'"]')?.textContent.trim()||pick('هذا الحقل','this field');
  const v=field.validity;
  let message='';
  if(v.valueMissing||field.required&&typeof field.value==='string'&&!field.value.trim())
   message=field.tagName==='SELECT'?pick('اختر قيمة لحقل «'+label+'».','Select a value for '+label+'.'):pick('أدخل «'+label+'».','Enter '+label+'.');
  else if(v.customError)message=field.validationMessage;
  else if(v.typeMismatch&&field.type==='email')message=pick('أدخل بريدًا إلكترونيًا كاملًا، مثل name@example.com.','Enter a complete email address, such as name@example.com.');
  else if(v.badInput)message=pick('أدخل رقمًا صحيحًا في «'+label+'».','Enter a valid number for '+label+'.');
  else if(v.rangeUnderflow)message=field.type==='date'?pick('اختر تاريخًا في '+field.min+' أو بعده.','Choose a date on or after '+field.min+'.'):pick('يجب أن تكون قيمة «'+label+'» '+field.min+' أو أكثر.','The value for '+label+' must be '+field.min+' or more.');
  else if(v.rangeOverflow)message=pick('القيمة تتجاوز الحد المسموح: '+field.max+'.','The value exceeds the maximum: '+field.max+'.');
  else if(v.stepMismatch)message=pick('أدخل عددًا صحيحًا دون كسور في «'+label+'».','Enter a whole number for '+label+'.');
  else if(!v.valid)message=pick('راجع صيغة «'+label+'».','Check the format of '+label+'.');
  if(!error){error=document.createElement('small');error.id=field.id+'-error';error.className='ui-field-error';error.setAttribute('aria-live','polite');field.after(error);field.setAttribute('aria-describedby',((field.getAttribute('aria-describedby')||'')+' '+error.id).trim());}
  error.hidden=!message;error.textContent=message?'! '+message:'';field.setAttribute('aria-invalid',String(!!message));
  return !message;
 }
 function bind(field){
  if(bound.has(field)||field.type==='file'||!field.id)return;
  bound.add(field);
  field.addEventListener('blur',()=>validate(field));
  field.addEventListener('invalid',()=>validate(field));
  for(const type of ['input','change'])field.addEventListener(type,()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);});
 }
 return {validate,bind};
})();


document.querySelectorAll('#contact .contact-form').forEach(form=>{
 form.querySelectorAll('input:not([type=file]),select,textarea').forEach(window.WosolFormValidation.bind);
 form.addEventListener('reset',()=>setTimeout(()=>{
  form.querySelectorAll('.ui-field-error').forEach(el=>el.hidden=true);
  form.querySelectorAll('input,select,textarea').forEach(el=>{el.setCustomValidity('');el.removeAttribute('aria-invalid');});
 },0));
});
