// Preview-only experiment. Never writes approved production sources.
// Dependencies used: clean-css 5.3.3, sharp 0.35.5 (resolve through NODE_PATH).
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib');
const CleanCSS=require('clean-css'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),out=path.resolve(process.argv[2]||'');
if(!process.argv[2]||out===root||out.startsWith(path.join(root,'content')))throw Error('Explicit separate preview directory required');
const baseline=process.argv.includes('--baseline');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex').slice(0,12);
(async()=>{
fs.mkdirSync(out,{recursive:true});
for(const dir of ['assets','css','js'])fs.cpSync(path.join(root,dir),path.join(out,dir),{recursive:true});
for(const file of ['icon.ico','logo.png','measurement-config.js','register.html','renewal.html','subscriber-support.html'])if(fs.existsSync(path.join(root,file)))fs.copyFileSync(path.join(root,file),path.join(out,file));
const manifest=require('../content/approved-site/manifest.json');
const cssName='css/approved-bundle.r6b74b4565170.css',css=fs.readFileSync(path.join(root,cssName),'utf8');
// Level 1 only: no rule restructuring/reordering or selector merging.
const min=new CleanCSS({level:1,rebase:false}).minify(css);
if(min.errors.length||min.warnings.length)throw Error(JSON.stringify(min));
const minName=`css/approved-preview.${hash(min.styles)}.css`;
fs.writeFileSync(path.join(out,minName),min.styles);
const source=path.join(root,'assets/profile-2026/hero-native.webp');
const image=await sharp(source).webp({quality:95,alphaQuality:100,effort:6}).toBuffer();
const imgName=`assets/profile-2026/hero-1999-preview.${hash(image)}.webp`;
fs.writeFileSync(path.join(out,imgName),image);
const before=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const after=await sharp(image).ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(before.info.width!==after.info.width||before.info.height!==after.info.height)throw Error('Image dimensions changed');
let alphaEqual=true,squared=0,n=0;
for(let i=0;i<before.data.length;i+=4){if(before.data[i+3]!==after.data[i+3])alphaEqual=false;if(before.data[i+3]>0)for(let c=0;c<3;c++){squared+=(before.data[i+c]-after.data[i+c])**2;n++;}}
if(!alphaEqual)throw Error('Transparency changed');
const guard='<script>document.addEventListener("submit",function(e){e.preventDefault();e.stopImmediatePropagation();},true);</script>';
const probe=`<script>if(new URLSearchParams(location.search).has('performance-check')){let lcp=0;new PerformanceObserver(list=>{for(const e of list.getEntries())lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});addEventListener('load',()=>setTimeout(()=>{const n=performance.getEntriesByType('navigation')[0],p=performance.getEntriesByName('first-contentful-paint')[0],o=document.createElement('pre');o.id='performance-check-result';o.textContent=JSON.stringify({width:innerWidth,language:document.documentElement.lang,lcpMs:lcp,fcpMs:p?.startTime,loadMs:n.loadEventEnd,hero:document.querySelector('.signature-hero__art')?.currentSrc,resources:performance.getEntriesByType('resource').filter(x=>x.name.includes('hero-')||x.name.includes('approved-')).map(x=>({url:x.name,duration:x.duration,transferSize:x.transferSize}))});document.body.append(o)},3500))}</script>`;
for(const page of manifest.pages){let html=fs.readFileSync(path.join(root,page),'utf8');
html=html.replace('content="index,follow"','content="noindex,nofollow"').replace('</head>',guard+probe+'</head>');
// Keep structured/social metadata unchanged. Replace hero srcset/preload only.
if(!baseline){html=html.replaceAll('/'+cssName,'/'+minName);html=html.replaceAll('/assets/profile-2026/hero-native.webp 1999w','/'+imgName+' 1999w');html=html.replace(/(<link data-home-priority rel="preload" as="image" href=")[^"]+/, '$1/assets/profile-2026/hero-1600-fast.webp');}
const dst=path.join(out,page);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,html);
}
fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
const result={baseline,pages:manifest.pages.length,css:{before:Buffer.byteLength(css),after:Buffer.byteLength(min.styles),gzipBefore:zlib.gzipSync(css).length,gzipAfter:zlib.gzipSync(min.styles).length,file:minName},image:{before:fs.statSync(source).size,after:image.length,width:after.info.width,height:after.info.height,alphaEqual,psnrVisibleRGB:10*Math.log10(255**2/(squared/n)),file:imgName,lossless:false},productionChanged:false};
fs.writeFileSync(path.join(out,'performance-preview-result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
})();
