"""Conservative, non-generative image enlargement explicitly approved by the owner.

Original photos remain unchanged. Enlargement interpolates existing pixels and
does not claim to recover details absent from the source.
"""
from pathlib import Path
from PIL import Image, ImageFilter
import json

ROOT=Path(__file__).resolve().parent.parent
OUTPUT=ROOT/'assets'/'fleet'/'hd'
OUTPUT.mkdir(parents=True,exist_ok=True)
manifest={}
for index in range(1,9):
    source=ROOT/'assets'/'fleet'/f'fleet-{index}.jpg'
    with Image.open(source) as original:
        image=original.convert('RGB')
        full_width,full_height=image.width*4,image.height*4
        variants=[]
        for width in (640,1280,1920,full_width):
            height=round(width*image.height/image.width)
            resized=image.resize((width,height),Image.Resampling.LANCZOS)
            if width>image.width:
                resized=resized.filter(ImageFilter.UnsharpMask(radius=1.0,percent=55,threshold=4))
            filename=f'fleet-{index}-{width}.webp'
            resized.save(OUTPUT/filename,'WEBP',quality=96,method=6)
            variants.append({'src':'/assets/fleet/hd/'+filename,'width':width,'height':height})
        manifest[str(index)]={'source':f'/assets/fleet/fleet-{index}.jpg','sourceWidth':image.width,'sourceHeight':image.height,'width':full_width,'height':full_height,'src':variants[-1]['src'],'variants':variants,'method':'non-generative Lanczos enlargement and mild unsharp mask; no reconstructed detail'}
hero=ROOT/'assets'/'profile-2026'/'hero-native.webp'
with Image.open(hero) as source:
    for width in (1000,1600):
        image=source.resize((width,round(width*source.height/source.width)),Image.Resampling.LANCZOS)
        image.save(hero.with_name(f'hero-{width}.webp'),'WEBP',quality=97,method=6)
(OUTPUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Prepared 32 responsive fleet files from unchanged originals and 2 hero variants.')
