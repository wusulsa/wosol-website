"""Read-only production metadata/JSON-LD audit; no forms or analytics events sent."""
import json, time, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

BASE = 'https://www.wosol.net/'
def fetch(url):
    start = time.monotonic()
    with urllib.request.urlopen(url, timeout=45) as r:
        return r.read().decode('utf-8'), r.status, r.url, dict(r.headers), round(time.monotonic()-start, 3)

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.canonical=[]; self.alternates={}; self.robots=[]; self.h1=0; self.lang=''; self.ld=[]; self.capture=False; self.buffer=''; self.mixed=[]
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang','')
        if tag=='h1': self.h1+=1
        if tag=='meta' and a.get('name','').lower() in ('robots','googlebot'): self.robots.append(a.get('content',''))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='link' and a.get('hreflang'): self.alternates[a['hreflang']]=a.get('href')
        if tag in ('script','img','iframe','source','link'):
            for key in ('src','href','srcset'):
                if a.get(key,'').startswith('http:'): self.mixed.append(a[key])
        if tag=='script' and a.get('type')=='application/ld+json': self.capture=True; self.buffer=''
    def handle_data(self, data):
        if self.capture:self.buffer+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.capture:
            try:self.ld.append(json.loads(self.buffer))
            except ValueError as e:self.ld.append({'parse_error':str(e)})
            self.capture=False

def types(value):
    result=[]
    if isinstance(value,dict):
        if '@type' in value: result.extend(value['@type'] if isinstance(value['@type'],list) else [value['@type']])
        for child in value.values():result.extend(types(child))
    elif isinstance(value,list):
        for child in value:result.extend(types(child))
    return sorted(set(result))

out={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'scope':'Public GET requests only; timings are not Lighthouse/Core Web Vitals; JSON parsing is not Google eligibility validation','pages':[]}
sitemap=fetch(BASE+'sitemap.xml')[0]
for loc in ET.fromstring(sitemap).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
    url=loc.text
    try:
        source,status,final,headers,seconds=fetch(url); p=Page(source)
        out['pages'].append({'url':url,'status':status,'final_url':final,'seconds':seconds,'bytes_utf8':len(source.encode()),'lang':p.lang,'h1_count':p.h1,'canonical':p.canonical,'hreflang':p.alternates,'meta_robots':p.robots,'x_robots_tag':headers.get('X-Robots-Tag'),'mixed_content_refs':p.mixed,'schema_types':types(p.ld),'json_ld':p.ld})
    except Exception as e:out['pages'].append({'url':url,'error':str(e)})
out['robots_txt']=fetch(BASE+'robots.txt')[0]
out['measurement_config']=fetch(BASE+'js/measurement-config.js')[0]
dest=Path(__file__).resolve().parent.parent/'docs/audits/evidence/2026-10-18-production-seo.json'
dest.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({**{k:v for k,v in out.items() if k!='pages'},'pages':[{k:v for k,v in p.items() if k!='json_ld'} for p in out['pages']]},ensure_ascii=False,indent=2))
