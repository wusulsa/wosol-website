/* Display only: the original file input, validation and mail handler remain intact. */
document.querySelectorAll('.file-picker input[type="file"]').forEach(input=>{
 const label=input.parentElement.querySelector('.file-picker__name');
 const empty=label.textContent;
 const update=()=>{label.textContent=input.files.length?'✓ '+input.files[0].name:empty;input.parentElement.classList.toggle('has-file',!!input.files.length);label.setAttribute('aria-live','polite');};
 input.addEventListener('change',update);
 input.form.addEventListener('reset',()=>setTimeout(update,0));
});

document.querySelectorAll('#contact .contact-form').forEach(form=>{const en=document.documentElement.lang==='en';
 const validate=field=>{
  if(!field.willValidate||field.type==='file')return true;
  let message=form.querySelector('#ui-error-'+field.id);
  if(!message){message=document.createElement('small');message.id='ui-error-'+field.id;message.className='ui-field-error';field.after(message);const described=field.getAttribute('aria-describedby')||'';field.setAttribute('aria-describedby',(described+' '+message.id).trim());}
  const valid=field.checkValidity(); field.setAttribute('aria-invalid',String(!valid));message.hidden=valid;
  message.textContent=field.validity.valueMissing?(en?'! This field is required.':'! هذا الحقل مطلوب.'):(en?'! Check the value and format.':'! تحقق من القيمة والصيغة المطلوبة.');return valid;
 };
 form.querySelectorAll('input:not([type=file]),select,textarea').forEach(field=>{field.addEventListener('blur',()=>{if(field.value||field.getAttribute('aria-invalid')==='true')validate(field)});field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field)});});
});
