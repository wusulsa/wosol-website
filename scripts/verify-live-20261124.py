from pathlib import Path
import urllib.request, json, re, concurrent.futures, datetime
root=Path(__file__).resolve().parents[1]
def check(url):
    with urllib.request.urlopen(url,timeout=40) as r:
        h=r.read().decode('utf-8'); status=r.status;headers=dict(r.headers)
    canonical=re.search(r'rel="canonical" href="([^"]+)"',h)
    robots=re.search(r'name="robots" content="([^"]+)"',h)
    rel=url.removeprefix('https://www.wosol.net/')
    file='index.html' if not rel else rel+'index.html' if rel.endswith('/') else rel+'.html'
    local=root/file
    return {'url':url,'status':status,'canonical':canonical.group(1) if canonical else None,'robots':robots.group(1) if robots else None,'xRobots':headers.get('X-Robots-Tag'),'matchesLocal':local.exists() and h.replace('\r\n','\n')==local.read_text('utf-8'),'previewGuard':bool(re.search(r'stopImmediatePropagation|performance-check-result',h))}
sitemap=urllib.request.urlopen('https://www.wosol.net/sitemap.xml',timeout=30).read().decode()
urls=re.findall(r'<loc>(.*?)</loc>',sitemap)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(check,urls))
robots=urllib.request.urlopen('https://www.wosol.net/robots.txt',timeout=30).read().decode()
data={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sitemapUrls':len(urls),'robotsTxt':robots,'pages':rows,'formsSent':False}
(root/'docs/audits/evidence/2026-11-24-production-live.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(rows),'http200':sum(x['status']==200 for x in rows),'localMatches':sum(x['matchesLocal'] for x in rows),'canonicalMatches':sum(x['canonical']==x['url'] for x in rows),'indexable':sum(x['robots']=='index,follow' and not x['xRobots'] for x in rows),'previewGuards':sum(x['previewGuard'] for x in rows)}))

