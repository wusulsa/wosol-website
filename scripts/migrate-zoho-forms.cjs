/* One-time migration of approved business forms; student registration remains unchanged. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),source=path.join(root,'content/approved-site');
const manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'),'utf8'));
if (manifest.assets.some(asset => asset.startsWith('js/zoho-submit.'))) {
 throw new Error('Zoho migration already applied. Edit the approved source; do not rerun this one-time migration.');
}
const replacements={};
function asset(old,base,text){
 const name=base+'.r'+crypto.createHash('sha256').update(text).digest('hex').slice(0,12)+'.js';
 fs.writeFileSync(path.join(root,name),text);replacements[old]=name;
 manifest.assets=manifest.assets.map(x=>x===old?name:x);
}
let main=fs.readFileSync(path.join(root,'js/main.v10.re1a4a5babb70.js'),'utf8');
main=main.replaceAll('window.WASUL_EMAIL','window.WOSOL_ZOHO');
main=main.replace('const result = await sendSiteForm(form, subject);','const result = await sendSiteForm(form, subject);\n      if (result?.navigating) return;');
fs.writeFileSync(path.join(root,'js/main.js'),main);
asset('js/main.v10.re1a4a5babb70.js','js/main.zoho',main);
asset('js/email-submit.r27b534786025.js','js/zoho-submit',fs.readFileSync(path.join(root,'js/zoho-submit.js'),'utf8'));
let i18n=fs.readFileSync(path.join(root,'js/i18n.v14.rcdaf582f0ad3.js'),'utf8').replaceAll('FormSubmit','Zoho Forms');
asset('js/i18n.v14.rcdaf582f0ad3.js','js/i18n.zoho',i18n);
for(const file of manifest.pages){
 let html=fs.readFileSync(path.join(source,file),'utf8').replaceAll('FormSubmit','Zoho Forms');
 for(const [from,to]of Object.entries(replacements))html=html.replaceAll('/'+from,'/'+to);
 const en=file.startsWith('en/');
 const attach=(id)=>`<div class="form-group"><label for="${id}">${en?'Supporting attachment (optional)':'مرفق توضيحي (اختياري)'}</label><div class="file-picker"><input type="file" id="${id}" name="${id}" accept=".pdf,.jpg,.jpeg,.png" aria-describedby="${id}-help"><span class="file-picker__button">${en?'Choose file':'اختيار ملف'}</span><span class="file-picker__name" aria-live="polite">${en?'No file selected':'لم يُحدد ملف'}</span></div><p id="${id}-help">${en?'PDF, JPG or PNG, up to 3 MB. Please do not include unnecessary sensitive information.':'PDF أو JPG أو PNG، حتى 3 ميجابايت. يرجى عدم إرفاق معلومات حساسة غير لازمة.'}</p></div>`;
 for(const [id,attachment]of [['contactForm','contact-attachment'],['complaintForm','cmp-attachment']]){
   const re=new RegExp('(<form[^>]*id="'+id+'"[\\s\\S]*?)(<button type="submit")');
   html=html.replace(re,(_,before,button)=>before+attach(attachment)+button);
 }
 html=html.replace(/(<input[^>]*id="cmp-phone"[^>]*>\s*<\/div>)/,`$1<div class="form-group"><label for="cmp-email">${en?'Email address':'البريد الإلكتروني'}</label><input type="email" id="cmp-email" name="cmp-email" autocomplete="email" maxlength="254" required dir="ltr"></div>`);
 fs.writeFileSync(path.join(source,file),html);
}
manifest.formsProvider='Zoho Forms';
fs.writeFileSync(path.join(source,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Updated business forms, attachments and fingerprinted assets; student sources unchanged.');
