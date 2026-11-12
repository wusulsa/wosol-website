const fs=require('node:fs');
(async()=>{
 const rows=[];
 for(const ua of ['Mozilla/5.0','OAI-SearchBot/1.4','bingbot/2.0','Googlebot/2.1','PerplexityBot/1.0']){
  for(const route of ['/robots.txt','/corporate-transport-saudi-arabia','/en/corporate-transport-saudi-arabia/']){
   try{const r=await fetch('https://www.wosol.net'+route,{headers:{'User-Agent':ua},signal:AbortSignal.timeout(20000)}),t=await r.text();
    rows.push({ua,route,status:r.status,url:r.url,robotsHeader:r.headers.get('x-robots-tag'),robotsMeta:t.match(/<meta name="robots"[^>]+>/)?.[0]||null,canonical:t.match(/<link rel="canonical"[^>]+>/)?.[0]||null,title:t.match(/<title>(.*?)<\/title>/)?.[1]||null,bodyBytes:Buffer.byteLength(t),robots:route==='/robots.txt'?t:undefined});
   }catch(e){rows.push({ua,route,error:e.message});}
  }
 }
 const r=await fetch('https://www.wosol.net/sitemap.xml');const s=await r.text();
 const evidence={checkedAt:new Date().toISOString(),limitation:'User-agent simulation from our network does not prove access from verified crawler IP ranges or indexing.',sitemap:{status:r.status,urls:(s.match(/<loc>/g)||[]).length},rows};
 fs.writeFileSync('docs/audits/evidence/2026-10-20-ai-crawl.json',JSON.stringify(evidence,null,2));
 console.log(JSON.stringify(evidence,null,2));
})();
