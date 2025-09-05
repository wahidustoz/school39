import { writeFileSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'

// 1) configure your static routes here:
const staticRoutes = [
  { path: '/',     changefreq: 'daily',    priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  // → when you add new "real" routes, just push here
]

// 2) discover posts from public/posts/ directory
const postsDir = resolve(process.cwd(), 'public', 'posts')
const postRoutes = []

if (existsSync(postsDir)) {
  const files = readdirSync(postsDir)
  const markdownFiles = files.filter(file => file.endsWith('.md'))
  
  for (const file of markdownFiles) {
    const slug = file.replace('.md', '')
    postRoutes.push({
      path: `/posts/${slug}`,
      changefreq: 'weekly',
      priority: 0.7
    })
  }
  
  console.log(`✔︎ Found ${markdownFiles.length} posts:`, markdownFiles.map(f => f.replace('.md', '')))
} else {
  console.log('⚠️  No posts directory found at public/posts/')
}

// 3) combine all routes
const routes = [...staticRoutes, ...postRoutes]

// 4) compute today's date in YYYY‑MM‑DD
const today = new Date().toISOString().split('T')[0]

// 5) build XML
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(r => `
    <url>
      <loc>https://school39.vercel.app${r.path}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${r.changefreq}</changefreq>
      <priority>${r.priority}</priority>
    </url>
  `.trim()),
  '</urlset>'
].join('\n')

// 6) write to your `dist` folder
const outPath = resolve(process.cwd(), 'dist', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`✔︎ sitemap.xml generated at ${outPath}`)

// 7) also write to public folder for development
const publicPath = resolve(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(publicPath, xml, 'utf8')
console.log(`✔︎ sitemap.xml also saved to public folder for development`)
