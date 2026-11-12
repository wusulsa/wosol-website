import json, hashlib, urllib.request, concurrent.futures
from pathlib import Path
from datetime import datetime, timezone
root=Path(__file__).resolve().parents[1]
m=json.loads((root/'docs/audits/evidence/2026-11-02-english-edit-files.json').read_text())
def check(f):
    p=f[:-10] if f.endswith('index.html') else f[:-5] if f.endswith('.html') else f
    url='https://www.wosol.net/'+p
    try:
        with urllib.request.urlopen(url,timeout=45) as r:
            body=r.read(); status=r.status
        return {'file':f,'url':url,'status':status,'matches':hashlib.sha256(body).digest()==hashlib.sha256((root/f).read_bytes()).digest()}
    except Exception as e: return {'file':f,'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: rows=list(pool.map(check,m['pages']+[m['asset']]))
out={'checkedAt':datetime.now(timezone.utc).isoformat(),'results':rows}
(root/'docs/audits/evidence/2026-11-02-english-live-check.json').write_text(json.dumps(out,indent=2))
print(json.dumps({'checked':len(rows),'matched':sum(x.get('matches',False) for x in rows),'failures':[x for x in rows if not x.get('matches')]}))
