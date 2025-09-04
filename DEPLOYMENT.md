# Deployment Guide

## Vercel'ga Deploy Qilish

1. **GitHub'ga kodni yuklang**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/school39.git
   git push -u origin main
   ```

2. **Vercel'ga ulang**:
   - [Vercel.com](https://vercel.com) ga kiring
   - "New Project" ni bosing
   - GitHub repository'ni tanlang
   - Build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Deploy**:
   - "Deploy" tugmasini bosing
   - Bir necha daqiqadan so'ng loyiha tayyor!

## Netlify'ga Deploy Qilish

1. **GitHub'ga kodni yuklang** (yuqoridagi qadamlarni takrorlang)

2. **Netlify'ga ulang**:
   - [Netlify.com](https://netlify.com) ga kiring
   - "New site from Git" ni bosing
   - GitHub repository'ni tanlang
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Deploy**:
   - "Deploy site" tugmasini bosing

## Manual Deploy (Static Server)

1. **Build yarating**:
   ```bash
   npm run build
   ```

2. **Dist papkasini server'ga yuklang**:
   - `dist/` papkasidagi barcha fayllarni server'ga yuklang
   - Apache/Nginx sozlamalarini tekshiring

## Environment Variables

Agar kerak bo'lsa, quyidagi environment variables'ni sozlang:

- `VITE_API_URL` - API URL (agar backend bor bo'lsa)
- `VITE_MAP_API_KEY` - Yandex Maps API kaliti

## Post-Deploy Checklist

- [ ] Hero fon rasm yuklangan
- [ ] Post rasmlari yuklangan
- [ ] Xarita to'g'ri ishlaydi
- [ ] Barcha linklar ishlaydi
- [ ] Mobile responsive tekshirilgan
- [ ] Performance test o'tkazilgan

## Troubleshooting

### Rasmlar ko'rinmaydi
- Rasmlar `/public/` papkasida ekanligini tekshiring
- Rasm yo'llari to'g'ri ekanligini tekshiring

### Routing ishlamaydi
- Server'da SPA routing sozlamalarini tekshiring
- Apache uchun `.htaccess` fayl qo'shing:
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

### Build xatosi
- Node.js versiyasini tekshiring (18+ kerak)
- `npm install` ni qayta ishga tushiring
- `node_modules` ni o'chirib, qayta o'rnating
