from pathlib import Path
import re,json,difflib
r=Path.cwd();p=r.parent/'wosol-performance-preview-20261107/.sites-checkout/dist';out=r.parent/'wosol-aligned-release-20261124';out.mkdir(exist_ok=True)
rows=[];diff=[]
for f in list(r.glob('*.html'))+list((r/'en').glob('*/index.html'))+[r/'en/index.html']:
 rel=f.relative_to(r);old=f.read_text('utf8')
 if '<main' not in old:continue
 s=(p/rel).read_text('utf8');robots=re.search(r'<meta name="robots"[^>]*>',old)
 s=re.sub(r'<meta name="robots"[^>]*>',lambda m:robots[0] if robots else '',s)
 s=re.sub(r'<script>document.addEventListener\("submit",function\(e\)\{e.preventDefault\(\);e.stopImmediatePropagation\(\);\},true\);</script>','',s)
 def scripts(h):return re.findall(r'<script(?![^>]*application/ld\+json)[^>]*>.*?</script>',h,re.S)
 original=scripts(old)
 for i,tag in reversed(list(enumerate(original))):
  if 'src=' in tag and 'measurement' in tag:
   nexttag=original[i+1] if i+1<len(original) else '</body>'
   assert nexttag in s
   s=s.replace(nexttag,tag+'\n'+nexttag,1)
 assert scripts(s)==original,str(rel)+' runtime changed'
 assert re.findall(r'<form\b.*?</form>',s,re.S)==re.findall(r'<form\b.*?</form>',old,re.S),str(rel)+' forms changed'
 assert re.findall(r'<link[^>]*(?:canonical|hreflang)[^>]*>',s)==re.findall(r'<link[^>]*(?:canonical|hreflang)[^>]*>',old),str(rel)+' SEO links changed'
 assert 'stopImmediatePropagation' not in s and 'chatgpt.site' not in s
 if re.sub(r'>\s+<','><',s)==re.sub(r'>\s+<','><',old):continue
 assert 'noindex' not in s
 dest=out/'upload'/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(s,encoding='utf8')
 rows.append(rel.as_posix());diff.extend(difflib.unified_diff(old.splitlines(),s.splitlines(),fromfile=str(rel),tofile=str(rel)))
css='css/service-planning-20261124.css';dest=out/'upload'/css;dest.parent.mkdir(exist_ok=True);dest.write_bytes((p/css).read_bytes())
(out/'files.json').write_text(json.dumps(rows+[css],indent=2));(out/'review.diff').write_text('\n'.join(diff),encoding='utf8')
print(json.dumps(rows,indent=2));print('All runtime, forms, canonical/hreflang retained; staged only. Diff',len(diff),'lines')
