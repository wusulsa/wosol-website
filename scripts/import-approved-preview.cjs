/* One-time, explicit import of the user-approved preview into production sources.
 * Does not publish, submit forms or overwrite registration/configuration files.
 */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),preview=path.resolve(root,'../wosol-ui-preview/dist');
const read=f=>fs.readFileSync(f,'utf8');
const write=(f,s)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,s);};
const fingerprint=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,12);
const sourceDir=path.join(root,'content/approved-site');
const assets=new Map();
let main=read(path.join(root,'js/main.js'));
main=main.replaceAll('if (quoteServiceField) quoteServiceField.value = quoteService;', "if (quoteServiceField) { quoteServiceField.value = quoteService; quoteServiceField.dispatchEvent(new Event('change', { bubbles: true })); }")
 .replace("{ jeddah: 'جدة', riyadh: 'الرياض' }","{ jeddah: 'جدة', riyadh: 'الرياض', makkah: 'مكة المكرمة', madinah: 'المدينة المنورة', dammam: 'الدمام' }")
 .replace("{ jeddah: 'Jeddah', riyadh: 'Riyadh' }","{ jeddah: 'Jeddah', riyadh: 'Riyadh', makkah: 'Makkah', madinah: 'Madinah', dammam: 'Dammam' }");
write(path.join(root,'js/main.js'),main);
let ui=read(path.join(preview,'js/ui-refinement.js')).split('/* Preview-only state review.')[0].replaceAll('WosolPreviewValidation','WosolFormValidation');
ui+=`
document.querySelectorAll('#contact .contact-form').forEach(form=>{
 form.querySelectorAll('input:not([type=file]),select,textarea').forEach(window.WosolFormValidation.bind);
 form.addEventListener('reset',()=>setTimeout(()=>{
  form.querySelectorAll('.ui-field-error').forEach(el=>el.hidden=true);
  form.querySelectorAll('input,select,textarea').forEach(el=>{el.setCustomValidity('');el.removeAttribute('aria-invalid');});
 },0));
});
`;
const overrides={
 '/js/main.v10.js':main,
 '/js/ui-refinement.js':ui,
 '/js/quote-service-fields.js':read(path.join(preview,'js/quote-service-fields.js')).replaceAll('WosolPreviewValidation','WosolFormValidation').replace('/* Preview:', '/* Service form:'),
 '/js/email-submit.js':read(path.join(root,'js/email-submit.js'))
};
function asset(url){
 const original=url.split('?')[0];
 if(assets.has(original))return assets.get(original);
 let content=overrides[original]??read(path.join(preview,original));
 const ext=path.extname(original),versioned=original.slice(0,-ext.length)+'.r'+fingerprint(content)+ext;
 write(path.join(root,versioned),content);
 assets.set(original,versioned);return versioned;
}
const files=fs.readdirSync(preview).filter(f=>f.endsWith('.html')&&!['register.html','student-transport-jeddah.html'].includes(f));
files.push('en/index.html',...fs.readdirSync(path.join(preview,'en'),{withFileTypes:true}).filter(e=>e.isDirectory()&&e.name!=='register').map(e=>'en/'+e.name+'/index.html'));
const manifest={approvedPreviewCommit:'88d421d14ae770e74011ad22f7a4d6505a302b2e',pages:[],assets:[]};
for(const file of files){
 let html=read(path.join(preview,file));
 if(!html.includes('<main'))continue;
 html=html.replace(/<meta name="robots" content="[^"]*">/,'<meta name="robots" content="index,follow">')
  .replace(/<script>document\.addEventListener\('submit',function\(e\)\{[\s\S]*?<\/script>/g,'');
 // Restore the existing production mail handler before main and consent-based measurement.
 html=html.replace(/(<script src="\/js\/main\.v10\.js[^"]*" defer><\/script>)/,'<script src="/js/email-submit.js" defer></script>$1');
 html=html.replace('</body>','<script src="/js/measurement-config.js?v=2" defer></script><script src="/js/measurement.js?v=1" defer></script></body>');
 html=html.replace(/(href|src)="((?:\/css\/|\/js\/)[^"]+)"/g,(match,attr,url)=>{
  if(url.startsWith('/js/measurement'))return match; // Keep the verified production GA4 configuration.
  return `${attr}="${asset(url)}"`;
 });
 if(/noindex|Preview only|نسخة معاينة|stopImmediatePropagation/.test(html))throw Error('Preview guard remains: '+file);
 write(path.join(sourceDir,file),html);
 manifest.pages.push(file);
}
manifest.assets=[...new Set(assets.values())].map(p=>p.slice(1));
write(path.join(sourceDir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
require('./build-approved-site.cjs');
let ht=read(path.join(root,'.htaccess'));
ht=ht.replaceAll('employee-transport-riyadh|corporate-transport','employee-transport-riyadh|employee-transport-makkah|employee-transport-madinah|employee-transport-dammam|corporate-transport');
write(path.join(root,'.htaccess'),ht);
console.log(JSON.stringify({pages:manifest.pages.length,assets:manifest.assets.length,registration:'untouched'},null,2));
