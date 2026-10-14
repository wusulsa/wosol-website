// Code-native SVG composition: preserve source photos and the original wordmark.
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const data = (file, mime) => `data:${mime};base64,${fs.readFileSync(path.join(root,file)).toString('base64')}`;
const logo = data('assets/profile-2026/logo-native.png','image/png');
// The original mark has two colours. Map its luminance bands to #111111
// and the approved #F1B654 while preserving the original alpha edge.
const filter = `<defs><filter id="brand-colour" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="discrete" tableValues="0.0666667 0.945098 0.945098 0.945098"/><feFuncG type="discrete" tableValues="0.0666667 0.713725 0.713725 0.713725"/><feFuncB type="discrete" tableValues="0.0666667 0.329412 0.329412 0.329412"/></feComponentTransfer></filter></defs>`;
const mark = (x,y,w,h) => `<image x="${x}" y="${y}" width="${w}" height="${h}" href="${logo}" filter="url(#brand-colour)"/>`;
fs.writeFileSync(path.join(root,'assets/profile-2026/logo-brand.svg'),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442 321" width="442" height="321">${filter}${mark(0,0,442,321)}</svg>`);
for (const [name,w,h,x,y,lw,lh] of [['yaris',1200,631,782,274,96,70],['rav4',731,411,445,202,58,42]]) {
  const photo=data(`assets/fleet/cars/${name}-white.webp`,'image/webp');
  fs.writeFileSync(path.join(root,`assets/fleet/cars/${name}-branded.svg`),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${filter}<image href="${photo}" width="${w}" height="${h}"/>${mark(x,y,lw,lh)}</svg>`);
}
