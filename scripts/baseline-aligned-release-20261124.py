from pathlib import Path
import re,json,urllib.request,concurrent.futures,zipfile,hashlib,datetime
r=Path.cwd();out=r.parent/'wosol-aligned-release-20261124';files=json.loads((out/'files.json').read_text());rows=[]
def check(rel):
 if not rel.endswith('.html'):return None
 url='https://www.wosol.net/'+('' if rel=='index.html' else rel[:-10] if rel.endswith('/index.html') else rel[:-5])
 with urllib.request.urlopen(url,timeout=45) as response:b=response.read();status=response.status
 assert b.decode('utf8').replace('\r\n','\n')==(r/rel).read_text('utf8'),rel+' LIVE SOURCE MISMATCH'
 dest=out/'rollback'/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b)
 return {'url':url,'status':status,'sourceMatched':True,'sha256':hashlib.sha256(b).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=[x for x in pool.map(check,files) if x]
for group in ['upload','rollback']:
 with zipfile.ZipFile(out/('aligned-'+group+'-20261124.zip'),'w',zipfile.ZIP_DEFLATED) as z:
  for rel in files:
   f=out/group/rel
   if f.exists():z.write(f,rel)
(out/'baseline.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'pages':rows},indent=2))
print('Matched and backed up',len(rows),'live pages. Packages ready.')
