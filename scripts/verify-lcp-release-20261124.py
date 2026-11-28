import urllib.request,urllib.error,json,hashlib,concurrent.futures
from pathlib import Path
class Stop(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*a,**k):return None
op=urllib.request.build_opener(Stop())
paths=['/','/en/','/about','/about/','/my-account','/faq','/faq/','/?page_id=1447','/?page_id=14470','/?contactTab=quote','/?contactTab=complaint','/subscriber-support.html','/register','/en/register/','/?product=edu11']
def f(p):
 try:r=op.open('https://www.wosol.net'+p,timeout=40)
 except urllib.error.HTTPError as e:r=e
 b=r.read();row={'path':p,'status':r.status,'location':r.headers.get('Location'),'inline':b'data-home-css="20261124"' in b,'sha256':hashlib.sha256(b).hexdigest()}
 if p in ['/','/en/']:row['matches']=b==Path('index.html' if p=='/' else 'en/index.html').read_bytes()
 return row
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:rows=list(ex.map(f,paths))
Path('docs/audits/evidence/2026-11-24-live-redirects.json').write_text(json.dumps(rows,indent=2),encoding='utf8');print(json.dumps(rows,indent=2))
