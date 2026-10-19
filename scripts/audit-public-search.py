"""Read-only public audit of sitemap URLs; no form requests or Google account access."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import urllib.request, xml.etree.ElementTree as ET, json, concurrent.futures, datetime
BASE='https://www.wosol.net'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.title='';self.in_title=False;self.meta={};self.canonical=[];self.alternates={};self.h1=0;self.schema=[];self.ld=False;self.buf='';self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='title':self.in_title=True
  if tag=='h1':self.h1+=1
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='link' and a.get('hreflang'):self.alternates[a['hreflang']]=a.get('href')
  if tag=='script' and a.get('type')=='application/ld+json':self.ld=True;self.buf=''
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.ld:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script' and self.ld:self.schema.append(json.loads(self.buf));self.ld=False
def get(url):
 with urllib.request.urlopen(url,timeout=35) as r:return r.status,r.geturl(),dict(r.headers),r.read().decode('utf-8')
def check(url):
 try:
  status,final,headers,html=get(url);p=Page(html)
  path=urlsplit(url).path
  local=Path('en/'+path[4:].strip('/')+'/index.html') if path.startswith('/en/') and path!='/en/' else Path('en/index.html') if path=='/en/' else Path('index.html') if path=='/' else Path(path.lstrip('/')+'.html')
  expected=Page(local.read_text(encoding='utf-8'))
  errors=[]
  if status!=200 or final!=url:errors.append('status_or_redirect')
  if p.canonical!=[url]:errors.append('canonical')
  if p.h1!=1:errors.append('h1')
  if p.title!=expected.title or p.meta.get('description')!=expected.meta.get('description'):errors.append('stale_search_copy')
  if p.alternates!=expected.alternates:errors.append('hreflang')
  if 'noindex' in (p.meta.get('robots','')+str(headers.get('X-Robots-Tag',''))).lower():errors.append('noindex')
  if p.schema!=expected.schema:errors.append('schema_mismatch')
  return dict(url=url,status=status,title=p.title,description=p.meta.get('description'),title_length=len(p.title),description_length=len(p.meta.get('description','')),canonical=p.canonical,hreflang=p.alternates,schema_json_valid=bool(p.schema),runtime_v13='i18n.v13.js' in html,errors=errors)
 except Exception as e:return dict(url=url,errors=[str(e)])
if __name__=='__main__':
 status,_,_,sitemap=get(BASE+'/sitemap.xml');urls=[e.text for e in ET.fromstring(sitemap).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:results=list(ex.map(check,urls))
 robots=get(BASE+'/robots.txt')[3]
 result={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sitemap_status':status,'url_count':len(urls),'robots_txt':robots,'pages':results,'scope':'HTTP, metadata and JSON-LD consistency; not Google indexing or rich-result certification'}
 Path('docs/audits/evidence/2026-10-19-editorial-public-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'total':len(results),'passed':sum(not p['errors'] for p in results),'errors':[p for p in results if p['errors']]},ensure_ascii=False))
