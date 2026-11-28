import json, hashlib, urllib.request, concurrent.futures, sys
from pathlib import Path
from datetime import datetime, timezone
root=Path(__file__).resolve().parents[1]
phase=sys.argv[1]
assert phase in ('before','after')
m=json.loads((root/'docs/audits/evidence/2026-11-07-performance-release-preflight.json').read_text())
def check(row):
    f=row['file']; p=f[:-10] if f.endswith('index.html') else f[:-5] if f.endswith('.html') else f
    url='https://www.wosol.net/'+p
    try:
        with urllib.request.urlopen(url,timeout=45) as r:
            body=r.read(); status=r.status; headers={k:r.headers.get(k) for k in ('Age','Cache-Control','Content-Type','X-Cache')}
        actual=hashlib.sha256(body).hexdigest()
        return {'file':f,'url':url,'status':status,'matches':actual==row[phase],'sha256':actual,'headers':headers}
    except Exception as e:return {'file':f,'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:rows=list(pool.map(check,m['rows']))
out={'checkedAt':datetime.now(timezone.utc).isoformat(),'phase':phase,'results':rows}
(root/f'docs/audits/evidence/2026-11-07-performance-public-{phase}.json').write_text(json.dumps(out,indent=2))
print(json.dumps({'checked':len(rows),'matched':sum(x.get('matches',False) for x in rows),'failures':[x for x in rows if not x.get('matches')]}))
