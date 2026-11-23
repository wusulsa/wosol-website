from pathlib import Path
import urllib.request,re,zipfile,hashlib,json,subprocess
r=Path.cwd();out=r.parent/'wosol-release-20261124';(out/'upload/en').mkdir(parents=True,exist_ok=True);(out/'rollback/en').mkdir(parents=True,exist_ok=True)
for name,url in [('index.html','https://www.wosol.net/'),('en/index.html','https://www.wosol.net/en/')]:
 b=urllib.request.urlopen(url,timeout=40).read();(out/'rollback'/name).write_bytes(b);h=b.decode();local=subprocess.check_output(['git','show','HEAD:'+name]).decode('utf8');assert h.replace('\r\n','\n')==local.replace('\r\n','\n'),name+' source mismatch'
 m=re.search(r'<link rel="stylesheet" href="([^\"]+)"[^>]*>',h);assert m,m
 print(name,m.group())
 css=urllib.request.urlopen('https://www.wosol.net'+m[1],timeout=40).read().decode();assert '</style' not in css
 h=h.replace(m.group(),'<style data-home-css="20261124">'+css+'</style>');h=re.sub(r'<link data-home-priority rel="preload" as="font"[^>]*>','',h)
 assert b.decode().split('<body',1)[1]==h.split('<body',1)[1]
 assert 'noindex' not in h and 'chatgpt.site' not in h
 for base in [out/'upload',r,r/'content/approved-site']:(base/name).write_text(h,encoding='utf8',newline='')
old=(out/'rollback/.htaccess').read_text('utf8');assert [x.strip() for x in old.splitlines() if x.strip()]==[x.strip() for x in (r/'.htaccess').read_text('utf8').splitlines() if x.strip()],'htaccess mismatch'
block='''# Approved legacy routes (2026-11-24), wosol.net only
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^about/?$ https://www.wosol.net/#about [R=301,L,NE,QSD]
RewriteRule ^my-account/?$ https://www.wosol.net/subscriber-support.html [R=301,L,QSD]
RewriteRule ^faq/?$ - [G,L]
RewriteCond %{QUERY_STRING} ^page_id=1447$
RewriteRule ^$ https://www.wosol.net/?contactTab=complaint#contact [R=301,L,NE]
</IfModule>

'''
for base in [out/'upload',r]:(base/'.htaccess').write_text(block+old,encoding='utf8',newline='')
for group in ['upload','rollback']:
 with zipfile.ZipFile(out/('wosol-'+group+'-20261124.zip'),'w',zipfile.ZIP_DEFLATED) as z:
  for name in ['index.html','en/index.html','.htaccess']:z.write(out/group/name,name)
print('Prepared 3 files; body content and current runtime retained. Backup available.')
