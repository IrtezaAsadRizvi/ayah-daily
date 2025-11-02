import fg from 'fast-glob'
import fs from 'fs/promises'

const files = await fg('out/**/*.html', { dot: false })
await Promise.all(files.map(async (file) => {
  let html = await fs.readFile(file, 'utf8')
  // Turn blocking <link rel="stylesheet"> into preload+print-onload
  html = html.replace(
    /<link\s+rel=["']stylesheet["']\s+href=(["'][^"']+\.css["'])\s*\/?>/g,
    (m, href) => `
<link rel="preload" href=${href} as="style">
<link rel="stylesheet" href=${href} media="print" data-defanged>
<noscript><link rel="stylesheet" href=${href}></noscript>`.trim()
  )
  // Add small promoter script once per file (idempotent)
  if (!html.includes('data-defanged-promoter')) {
    html = html.replace('</head>', `
<script id="data-defanged-promoter">
(function(){var ls=document.querySelectorAll('link[data-defanged]');ls.forEach(function(l){l.addEventListener('load',function(){l.media='all'})});})();
</script></head>`)
  }
  await fs.writeFile(file, html)
}))
console.log('Defanged CSS links in', files.length, 'HTML files.')
