from pathlib import Path
import json,urllib.request,concurrent.futures,re,datetime,shutil
r=Path.cwd();out=r.parent/'wosol-aligned-release-20261124';files=json.loads((out/'files.json').read_text())
def check(rel):
 url='https://www.wosol.net/'+('' if rel=='index.html' else rel[:-10] if rel.endswith('/index.html') else rel[:-5] if rel.endswith('.html') else rel)
 with urllib.request.urlopen(url,timeout=40) as response:b=response.read();status=response.status;headers=dict(response.headers)
 local=(out/'upload'/rel).read_bytes();matches=b.replace(b'\r\n',b'\n')==local.replace(b'\r\n',b'\n')
 return {'file':rel,'url':url,'status':status,'matches':matches,'xRobots':headers.get('X-Robots-Tag'),'cacheControl':headers.get('Cache-Control'),'age':headers.get('Age')}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(check,files))
print(json.dumps(rows,indent=2));assert all(x['matches'] and x['status']==200 for x in rows),'public mismatch'
for rel in files:
 for base in [r,r/'content/approved-site']:
  dest=base/rel;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(out/'upload'/rel,dest)
(r/'docs/audits/evidence/2026-11-24-aligned-release-live.json').write_text(json.dumps({'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'files':rows},indent=2))
