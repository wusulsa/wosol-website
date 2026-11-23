"""Prepare only the approved page delta; preserve current runtime and hosting settings."""
from pathlib import Path
import re, json, hashlib, shutil, zipfile, subprocess
root=Path(__file__).resolve().parents[1]
preview=root.parent/'wosol-performance-preview-20261107/.sites-checkout'
out=root.parent/'wosol-net-release-20261123'
out.mkdir(exist_ok=True)
manifest=json.loads(subprocess.check_output(['git','show','HEAD:content/approved-site/manifest.json'],cwd=root))
rows=[]; assets=set()
sha=lambda b:hashlib.sha256(b).hexdigest()
for name in manifest['pages']:
    before=subprocess.check_output(['git','show','HEAD:'+name],cwd=root)
    approved=(preview/'dist'/name).read_text('utf-8')
    html=before.decode('utf-8')
    # Approved delta is editorial only. Keep current production CSS, scripts,
    # form plumbing, privacy, redirects, analytics and all service links.
    if name not in ['index.html','employee-transport-jeddah.html','employee-transport-riyadh.html','king-abdulaziz-university-transport.html','en/employee-transport-riyadh/index.html']:continue
    patterns=[r'<title>.*?</title>',r'<h1\b[^>]*>.*?</h1>',r'<script type="application/ld\+json">.*?</script>']
    for key in ['description','og:description','twitter:description','og:title','twitter:title']:
        patterns.append(r'<meta\s+(?:name|property)="'+key+r'"[^>]*>')
    cls='signature-hero__description' if name=='index.html' else 'section-desc'
    patterns.append(r'<p class="'+cls+r'">.*?</p>')
    for pattern in patterns:
        replacement=re.search(pattern,approved,re.S)
        if replacement:html=re.sub(pattern,lambda m:replacement.group(0),html,count=1,flags=re.S)
    html=html.replace('content="noindex,nofollow"','content="index,follow"')
    html=re.sub(r'<script>(?:(?!</script>).)*stopImmediatePropagation(?:(?!</script>).)*</script>','',html,flags=re.S)
    html=re.sub(r'<script>document.addEventListener\("submit",function\(e\)\{e.preventDefault\(\);e.stopImmediatePropagation\(\);\},true\);</script>','',html)
    html=re.sub(r"<script>if\(new URLSearchParams\(location.search\).has\('performance-check'\)\).*?</script>",'',html,flags=re.S)
    assert not re.search(r'noindex|stopImmediatePropagation|performance-check-result|chatgpt.site|wosoltransportation.com',html),name
    assert 'name="robots" content="index,follow"' in html,name
    assert 'href="https://www.wosol.net/' in html,name
    for asset in re.findall(r'(?:src|href)="/((?:js|css)/[^"?]+)',html):
        if not (root/asset).exists():
            assert (preview/'dist'/asset).exists(),asset
            assets.add(asset)
    # Ignore CRLF-only differences.
    if before.decode('utf-8').replace('\r\n','\n')==html: continue
    for base,data in [(out/'rollback',before),(out/'upload',html.encode())]:
        (base/name).parent.mkdir(parents=True,exist_ok=True);(base/name).write_bytes(data)
    (root/name).write_text(html,encoding='utf-8',newline='')
    (root/'content/approved-site'/name).write_text(html,encoding='utf-8',newline='')
    rows.append({'file':name,'before':sha(before),'after':sha(html.encode())})
for asset in sorted(assets):
    for base in [root,out/'upload']:
        (base/asset).parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(preview/'dist'/asset,base/asset)
    if asset not in manifest['assets']:manifest['assets'].append(asset)
(root/'content/approved-site/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
evidence={'status':'prepared-not-deployed','pages':rows,'assets':sorted(assets),'preserved':['.htaccess','robots.txt','sitemap.xml','register.html','en/register/index.html','js/measurement.js','js/measurement-config.js'],'formsSent':False}
(out/'manifest.json').write_text(json.dumps(evidence,ensure_ascii=False,indent=2),encoding='utf-8')
for group in ['upload','rollback']:
    with zipfile.ZipFile(out/(group+'.zip'),'w',zipfile.ZIP_DEFLATED) as z:
        for name in [r['file'] for r in rows]+(sorted(assets) if group=='upload' else []):
            z.write(out/group/name,name)
print(json.dumps({'changedPages':len(rows),'newAssets':sorted(assets),'output':str(out)}))
