import fg from 'fast-glob'
import fs from 'fs/promises'

const files = await fg('out/**/*.html', { dot: false })
await Promise.all(files.map(async (file) => {
  let html = await fs.readFile(file, 'utf8')
  // Turn blocking <link rel="stylesheet"> into preload+print-onload
  html = html.replace(
    /<link[^>]*rel=["']stylesheet["'][^>]*href=(["'][^"']+\.css["'])[^>]*>/g,
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
  // Ensure analytics script is present in final static HTML
  if (!html.includes('analytics.ahrefs.com/analytics.js')) {
    html = html.replace('</head>', `
<script src="https://analytics.ahrefs.com/analytics.js" data-key="X1UXlwET7usTWzPvkpBIAw" async></script>
</head>`)
  }
  if (!html.includes('www.googletagmanager.com/gtag/js?id=G-RPGYNG9Q5R')) {
    html = html.replace('</head>', `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RPGYNG9Q5R"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-RPGYNG9Q5R');
</script>
</head>`)
  }
  await fs.writeFile(file, html)
}))
console.log('Defanged CSS links in', files.length, 'HTML files.')
