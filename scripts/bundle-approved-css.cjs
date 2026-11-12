// Combine approved styles without altering declarations or cascade order.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'content/approved-site/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const generated = new Set();
let changed = 0;
for (const page of manifest.pages) {
  const source = path.join(root, 'content/approved-site', page);
  let html = fs.readFileSync(source, 'utf8');
  const tags = [...html.matchAll(/<link rel="stylesheet" href="(\/css\/[^"?]+)"\s*\/?>(?:\s*)/g)];
  if (tags.length < 2) continue;
  const parts = tags.map(tag => {
    const css = fs.readFileSync(path.join(root, tag[1]), 'utf8');
    if (/@import|@charset/.test(css)) throw Error('Unsupported directive in ' + tag[1]);
    return css;
  });
  // Output stays in /css/, so relative URL resolution is unchanged.
  const css = parts.join('\n');
  const digest = crypto.createHash('sha256').update(css).digest('hex').slice(0, 12);
  const file = `css/approved-bundle.r${digest}.css`;
  fs.writeFileSync(path.join(root, file), css);
  generated.add(file);
  html = html.replace(tags[0][0], `<link rel="stylesheet" href="/${file}">`);
  for (const tag of tags.slice(1)) html = html.replace(tag[0], '');
  fs.writeFileSync(source, html);
  changed++;
}
manifest.assets = [...new Set([...manifest.assets, ...generated])];
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({changed, bundles: [...generated], strategy: 'Exact concatenation; no CSS rules changed; student registration excluded'}));
