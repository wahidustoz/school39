# School 39 Website

This is the official website for School 39 - a modern, static React SPA built with Vite and deployed to GitHub Pages.

## 🚀 Features

- **Static React SPA**: Fast, modern web application built with React and Vite
- **Material Design 3 Dark Theme**: Clean, minimal design following Google's latest design guidelines
- **Markdown-Based Posts**: Easy content management with markdown files
- **Organized Image System**: Intuitive image handling with post-specific folders
- **Horizontal Post Scrolling**: Modern UI with smooth horizontal scrolling for posts
- **Automatic Deployment**: GitHub Actions automatically builds and deploys on push
- **SEO Optimized**: Automatic sitemap generation and meta tags

## 🏗️ Architecture

This is a **static site** that runs entirely in the browser - no server required!

- **Frontend**: React 19 + Vite
- **Styling**: Material-UI (MUI) with custom Material Design 3 dark theme
- **Routing**: React Router DOM
- **Content**: Markdown files with automatic JSON generation
- **Deployment**: GitHub Pages with GitHub Actions
- **Images**: Organized folder structure per post

## 📁 Project Structure

```
├── public/
│   ├── posts/                    # Post content and images
│   │   ├── {post-slug}/
│   │   │   └── images/          # Post-specific images
│   │   │       └── header.png   # Post thumbnail
│   │   └── {post-slug}.md       # Post markdown file
│   ├── img/                     # General images
│   └── sitemap.xml              # Auto-generated sitemap
├── src/
│   ├── components/              # React components
│   ├── styles/                  # Theme and styling
│   └── utils/                   # Utilities and helpers
├── scripts/                     # Build scripts
│   ├── auto-generate-posts.js   # Post metadata generator
│   └── generate-sitemap.js      # Sitemap generator
└── .github/workflows/           # GitHub Actions
    └── deploy.yml               # Auto-deployment workflow
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
git clone <repository-url>
cd school39
npm install
```

### Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate-posts` - Generate posts.json from markdown files
- `npm run generate-sitemap` - Generate sitemap.xml
- `npm run lint` - Run ESLint

## 📝 Content Management

### Adding New Posts

1. **Create the post file**: `public/posts/my-new-post.md`
2. **Add images** (optional): 
   - Create folder: `public/posts/my-new-post/images/`
   - Add header image: `header.png/jpg/webp`
   - Add content images: `image1.jpg`, `image2.png`, etc.
3. **Write content** in markdown format
4. **Commit and push** - GitHub Actions will automatically build and deploy

### Post Format
```markdown
# Post Title

First paragraph becomes the description...

![Image description](./images/image1.jpg)

More content here...
```

### Image Guidelines
- **Header images**: 1200x600px recommended
- **Content images**: Max 800px width
- **Formats**: PNG, JPG, WebP
- **Naming**: Use kebab-case (lowercase-with-dashes)

See [IMAGE_GUIDE.md](./IMAGE_GUIDE.md) for detailed image handling instructions.

## 🚀 Deployment

This site automatically deploys to GitHub Pages using GitHub Actions:

1. **Push to main branch** triggers the deployment
2. **GitHub Actions** builds the site and generates content
3. **Deploys to GitHub Pages** automatically

### Manual Deployment
If you need to deploy manually:
```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 🎨 Customization

### Theme
The site uses Material Design 3 dark theme. Customize in `src/styles/theme.js`:
- Colors, typography, component styles
- Material Design 3 principles with minimal elevation
- Dark mode optimized

### Components
- `HeroSection.jsx` - Homepage hero
- `PostList.jsx` - Horizontal scrolling post cards
- `PostRenderer.jsx` - Individual post pages with related posts
- `FeaturesSection.jsx` - Features showcase
- `ContactSection.jsx` - Contact information

## 🔧 Technical Details

### Static Site Generation
- Posts are generated from markdown files at build time
- Images are organized per post for easy management
- Sitemap is automatically generated
- No server-side rendering needed

### Performance
- Lazy loading for images
- Optimized builds with Vite
- Minimal bundle size
- Fast loading with static hosting

### SEO
- Automatic sitemap generation
- Meta tags and descriptions
- Semantic HTML structure
- Fast loading times

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.