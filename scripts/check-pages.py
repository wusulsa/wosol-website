"""Check generated routes, language coverage and search metadata without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self, file):
        super().__init__(); self.file=file; self.ids=[]; self.links=[]; self.h1=0; self.canonical=[]; self.alternates={}; self.english=False; self.arabic=[]; self.skip=0
        self.feed(file.read_text(encoding='utf-8'))
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.english=a.get('lang')=='en'
        if self.english and a.get('lang')!='ar':
            for key in ('placeholder','alt','aria-label'):
                if re.search(r'[\u0600-\u06ff]{2,}',a.get(key,'')): self.arabic.append(key+': '+a[key])
        if tag in ('script','style'): self.skip+=1
        if 'id' in a: self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag in ('a','link') and a.get('href'): self.links.append(a['href'])
        if tag in ('img','script') and a.get('src'): self.links.append(a['src'])
        if tag=='img' and a.get('srcset'): self.links.extend(item.strip().split()[0] for item in a['srcset'].split(','))
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a['href'])
        if tag=='link' and a.get('rel')=='alternate': self.alternates[a.get('hreflang')]=a['href']
    def handle_endtag(self, tag):
        if tag in ('script','style'): self.skip-=1
    def handle_data(self, data):
        if self.english and not self.skip and re.search(r'[\u0600-\u06ff]{2,}',data): self.arabic.append(' '.join(data.split()))

files=[p for p in ROOT.glob('*.html') if '<link rel="canonical"' in p.read_text(encoding='utf-8')]+sorted((ROOT/'en').rglob('*.html'))
pages={p:Page(p) for p in files}
errors=[]
def resolve(url,current):
    u=urlsplit(url)
    if u.netloc and u.netloc!='www.wosol.net': return None,u
    if u.scheme and u.scheme not in ('https','http'): return None,u
    target=(ROOT/unquote(u.path).lstrip('/')) if u.path.startswith('/') else (current.parent/unquote(u.path) if u.path else current)
    if target.is_dir(): target=target/'index.html'
    elif not target.suffix: target=target.with_suffix('.html')
    return target,u
for file,p in pages.items():
    source=file.read_text(encoding='utf-8')
    if re.search(r'120\+|client-\d|Organizational Structure|الهيكل الإداري|عدد المركبات|9900',source): errors.append(f'{file}: excluded content or old licence found')
    if re.search(r'href="[^\"]*\.pdf',source): errors.append(f'{file}: full profile download is excluded')
    if len(p.ids)!=len(set(p.ids)):errors.append(f'{file.name}: duplicate ID')
    if p.h1!=1 or len(p.canonical)!=1:errors.append(f'{file}: H1/canonical count')
    if set(p.alternates)!={'ar','en','x-default'}:errors.append(f'{file}: hreflang missing')
    for link in p.links:
        dest,u=resolve(link,file)
        if dest is None:continue
        if not dest.exists():errors.append(f'{file}: broken target {link}')
        elif u.fragment and dest in pages and u.fragment not in pages[dest].ids:errors.append(f'{file}: broken anchor {link}')
    if p.arabic:errors.append(f'{file}: untranslated English text: {p.arabic}')
tree=ET.parse(ROOT/'sitemap.xml')
if len(tree.getroot())!=28:errors.append('Expected 28 sitemap entries')
if len(set(p.canonical[0] for p in pages.values()))!=28:errors.append('Duplicate canonical')
if errors:raise SystemExit('\n'.join(errors))
print('PASS: 28 pages; local assets/links/anchors, unique IDs/H1/canonical, hreflang, English text and sitemap.')
