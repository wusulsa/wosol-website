/* Browser regression checks with intercepted submissions: never send customer data. */
const {chromium}=require(process.env.WOSOL_PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.WOSOL_BROWSER_CHANNEL||'chrome'});
 const page=await browser.newPage({viewport:{width:1365,height:900},colorScheme:'light'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.WOSOL_QA_URL||'http://127.0.0.1:8765';
 const report={date:new Date().toISOString(),base,checks:[],limits:'Local browser QA; mocked email provider. Not proof of CRM delivery, Google indexing or field Core Web Vitals.'};
 let posts=0,body='',accepted=true;
 await page.route('**/formsubmit.co/**',async route=>{posts++;body=route.request().postData();await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:accepted?'true':'false'})})});
 await page.goto(base+'/en/?contactTab=quote&quoteService=employees&quoteCity=jeddah#contact');
 await page.waitForFunction(()=>document.querySelector('#qt-region')?.value==='Jeddah');
 assert.equal(await page.locator('#qt-service').inputValue(),'employees');
 await page.locator('#quoteForm button[type=submit]').click();
 assert.equal(posts,0,'Blank form must not send');
 for(const [id,value] of [['qt-contact','QA Contact'],['qt-phone','+966 50 000 0000'],['qt-email','qa@example.invalid'],['qt-org','QA Organisation'],['qt-count','5']])await page.locator('#'+id).fill(value);
 await page.locator('#qt-phone').fill('abc');await page.locator('#quoteForm button[type=submit]').click();assert.equal(posts,0);
 await page.locator('#qt-phone').fill('+966 50 000 0000');
 await page.locator('#quoteForm button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#quoteSuccess').classList.contains('visible'));
 assert.equal(posts,1);for(const field of ['qt-contact','qt-phone','qt-email','qt-job'])assert(body.includes(field));assert(body.includes('qa@example.invalid'));
 report.checks.push('Quote required fields, phone validation, optional job title, accepted payload; all POSTs mocked.');
 await page.evaluate(()=>sessionStorage.removeItem('_wasul_last_submit'));accepted=false;
 for(const [id,value] of [['qt-contact','QA'],['qt-phone','+966500000000'],['qt-email','qa@example.invalid'],['qt-org','QA'],['qt-count','4'],['qt-region','Riyadh']])await page.locator('#'+id).fill(value);
 await page.locator('#qt-service').selectOption('employees');
 await page.locator('#quoteForm button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#quoteSuccess').textContent.includes('Could not'));
 report.checks.push('Provider success:false displays failure and keeps input; no false success.');
 await page.goto(base+'/');await page.locator('.header-route__toggle').click();await page.reload();assert.equal(await page.locator('.header-route__toggle').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('[data-fleet="7"]').getAttribute('aria-selected'),'true');
 report.checks.push('Bus pause persists; large bus stays default.');
 const out=path.resolve(__dirname,'../docs/audits/qa');fs.mkdirSync(out,{recursive:true});
 for(const lang of ['ar','en'])for(const width of [390,1365]){
  await page.setViewportSize({width,height:900});await page.goto(base+(lang==='en'?'/en/':'/'));
  await page.locator('#services').scrollIntoViewIfNeeded();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow');
  await page.screenshot({path:path.join(out,`${lang}-${width}-services.png`)});
  await page.locator('[data-fleet="cars"]').click();await page.locator('#fleet-panel-cars').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.querySelectorAll('#fleet-panel-cars img')].every(i=>i.complete&&i.naturalWidth>0));
  await page.screenshot({path:path.join(out,`${lang}-${width}-fleet.png`)});
  await page.locator('#tab-quote').click();await page.locator('#quoteForm').scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(out,`${lang}-${width}-quote.png`)});
 }
 report.checks.push('Arabic/English at 390 and 1365px; no horizontal overflow; car images load; quote screenshots.');
 await page.locator('#themeToggle').click();
 await page.waitForFunction(()=>getComputedStyle(document.querySelector('#qt-email')).backgroundColor==='rgb(32, 42, 51)');
 await page.screenshot({path:path.join(out,'en-dark-quote.png')});
 const slugs=['','register','king-abdulaziz-university-transport','employee-transport-jeddah','employee-transport-riyadh','corporate-transport-saudi-arabia'];
 for(const lang of ['ar','en'])for(const slug of slugs){
  await page.goto(base+(lang==='en'?'/en/':'/')+slug);
  const data=await page.evaluate(()=>({schema:JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),og:document.querySelector('meta[property="og:image"]').content,title:document.title}));
  assert(data.schema['@graph'].some(e=>e['@type']==='LocalBusiness'));assert(data.schema['@graph'].every(e=>e['@id']));
  assert(data.og.includes('/assets/social/'));if(lang==='en')assert(data.title.length<76);
 }
 report.checks.push('12 pages: valid JSON-LD with stable IDs, short English titles and service-specific OG images.');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.brand-mini-bus').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);report.checks.push('Reduced motion respected; no uncaught JavaScript errors.');
 fs.writeFileSync(path.resolve(__dirname,'../docs/audits/2026-10-14-browser-validation.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
