"""Local-only, reproducible cold-cache transfer experiment; not Lighthouse.
Runs one visible tab sequentially. 1.6 Mbit/s shared response bandwidth,
150 ms per-request delay, gzip for text, no-store for every response.
No CPU throttling. Only GET is supported; outbound analytics are blocked.
"""
import argparse, gzip, json, mimetypes, threading, time
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

p = argparse.ArgumentParser()
p.add_argument('--baseline', required=True)
p.add_argument('--optimized', required=True)
p.add_argument('--port', type=int, default=8782)
a = p.parse_args()
roots = {'baseline': Path(a.baseline).resolve(), 'optimized': Path(a.optimized).resolve()}
lock, next_slot = threading.Lock(), 0.0

runner = r'''<script>
(() => {
const q = new URLSearchParams(location.search), entry=q.get('case');
if(entry===null)return;
const cases=[];for(const mode of ['responsive','1999'])for(const lang of ['ar','en'])for(let run=1;run<=3;run++)for(const variant of ['baseline','optimized'])cases.push({mode,lang,run,variant});
const i=Number(entry), c=cases[i];let lcp=0,lcpTag='';
new PerformanceObserver(list=>{for(const e of list.getEntries()){lcp=e.startTime;lcpTag=e.element?.tagName+':'+(e.element?.className||'')}}).observe({type:'largest-contentful-paint',buffered:true});
addEventListener('load',()=>setTimeout(()=>{
 const nav=performance.getEntriesByType('navigation')[0], hero=document.querySelector('.signature-hero__art');
 const sample={...c,width:innerWidth,lcpMs:lcp,lcpTag,fcpMs:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,loadMs:nav.loadEventEnd,hero:hero?.currentSrc,resources:performance.getEntriesByType('resource').filter(e=>e.name.includes('/assets/')||e.name.includes('/css/')).map(e=>({url:e.name,duration:e.duration,transferSize:e.transferSize}))};
 const all=JSON.parse(sessionStorage.getItem('wosolPerfLab')||'[]');all.push(sample);sessionStorage.setItem('wosolPerfLab',JSON.stringify(all));
 if(i+1===cases.length){location.replace('/lab-report');return}
 const n=cases[i+1];location.replace((n.lang==='en'?'/en/':'/')+'?case='+(i+1)+'&variant='+n.variant+'&image='+n.mode);
},4500));
})();</script>'''

report = '''<!doctype html><meta charset="utf-8"><title>WOSOL local performance comparison</title><style>body{font:16px sans-serif;margin:24px}pre{white-space:pre-wrap}</style><h1>Local comparison — 24 samples</h1><p>1.6 Mbit/s shared bandwidth, 150 ms request delay, no-store, no CPU throttling. This is not PageSpeed or real-user data.</p><pre id="lab-results"></pre><script>document.querySelector('#lab-results').textContent=JSON.stringify(JSON.parse(sessionStorage.getItem('wosolPerfLab')||'[]'),null,2)</script>'''

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        global next_slot
        req=urlparse(self.path); query=parse_qs(req.query)
        variant=query.get('variant',[None])[0]
        if variant not in roots:
            variant='optimized' if 'labvariant=optimized' in self.headers.get('Cookie','') else 'baseline'
        if req.path=='/lab-report':
            data,ctype=report.encode(),'text/html; charset=utf-8'
        elif req.path=='/lab-start':
            data=b'''<!doctype html><meta charset="utf-8"><title>Start WOSOL comparison</title><h1>Cold-cache comparison</h1><p>24 local samples. No form submissions.</p><button onclick="sessionStorage.removeItem('wosolPerfLab');location.href='/?case=0&variant=baseline&image=responsive'">Start comparison</button>'''
            ctype='text/html; charset=utf-8'
        else:
            root=roots[variant]; file=(root/unquote(req.path).lstrip('/')).resolve()
            if not file.is_relative_to(root):self.send_error(403);return
            if file.is_dir():file=file/'index.html'
            if not file.exists() and not file.suffix:file=file.with_suffix('.html')
            if not file.is_file():self.send_error(404);return
            data=file.read_bytes();ctype=mimetypes.guess_type(file.name)[0] or 'application/octet-stream'
            if file.suffix=='.html':
                html=data.decode('utf-8')
                if query.get('image')==['1999']:
                    # Explicit resource-path experiment; does NOT emulate device DPR.
                    import re
                    chosen='/assets/profile-2026/hero-native.webp' if variant=='baseline' else '/assets/profile-2026/hero-1999-preview.d651acb86c48.webp'
                    html=re.sub(r'<link data-home-priority rel="preload" as="image"[^>]*>',f'<link rel="preload" as="image" href="{chosen}" fetchpriority="high">',html)
                    html=re.sub(r'<img class="signature-hero__art"[^>]*>',lambda m:re.sub(r'\s(?:srcset|sizes)="[^"]*"','',re.sub(r'\ssrc="[^"]*"',f' src="{chosen}"',m.group())),html)
                html=html.replace('</head>',runner+'</head>');data=html.encode('utf-8')
        is_text=ctype.startswith('text/') or ctype in ['application/javascript','application/json']
        if is_text:data=gzip.compress(data,compresslevel=6,mtime=0)
        time.sleep(.150)
        self.send_response(200);self.send_header('Content-Type',ctype);self.send_header('Content-Length',str(len(data)))
        self.send_header('Cache-Control','no-store');self.send_header('Set-Cookie',f'labvariant={variant}; Path=/; SameSite=Strict; HttpOnly')
        self.send_header('Content-Security-Policy',"default-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'none'; form-action 'none'; frame-src 'none'")
        if is_text:self.send_header('Content-Encoding','gzip')
        self.end_headers()
        try:
            for i in range(0,len(data),8192):
                chunk=data[i:i+8192]
                with lock:
                    now=time.monotonic();next_slot=max(now,next_slot)+len(chunk)/200000;deadline=next_slot
                time.sleep(max(0,deadline-time.monotonic()));self.wfile.write(chunk);self.wfile.flush()
        except (BrokenPipeError,ConnectionResetError,ConnectionAbortedError):pass
    def log_message(self,*args):pass

print(f'Local lab: http://127.0.0.1:{a.port}/lab-start',flush=True)
ThreadingHTTPServer(('127.0.0.1',a.port),Handler).serve_forever()
