# 39-sonli Maktab Landing Page

Bu loyiha React v19, MUI v7+ va Vite yordamida yaratilgan zamonaviy maktab landing page'idir.

## Xususiyatlar

- **Zamonaviy dizayn**: MUI v7+ komponentlari bilan yaratilgan responsive dizayn
- **Markdown post tizimi**: Yangi postlar qo'shish uchun markdown fayllaridan foydalanish
- **Tez yuklanish**: Vite va optimizatsiya qilingan kod
- **Responsive**: Barcha qurilmalarda mukammal ishlaydi
- **Formal Latin Uzbek**: Barcha matnlar formal Latin Uzbek tilida

## Loyiha tuzilishi

```
/public
  /posts
    posts.json          # Postlar haqida ma'lumot
    *.md               # Markdown post fayllari
    *.jpg              # Post rasmlari
  hero-bg.jpg          # Hero section uchun fon rasm
/src
  /components
    HeroSection.jsx    # Hero qismi
    PostList.jsx       # Postlar ro'yxati
    PostRenderer.jsx   # Markdown postlarni ko'rsatish
    FeaturesSection.jsx # Maktab imkoniyatlari
    ContactSection.jsx  # Aloqa ma'lumotlari
  /styles
    theme.js           # MUI mavzusi
  App.jsx              # Asosiy komponent
  main.jsx             # Kirish nuqtasi
```

## O'rnatish va ishga tushirish

1. **Dependencies o'rnatish**:
   ```bash
   npm install
   ```

2. **Development server ishga tushirish**:
   ```bash
   npm run dev
   ```

3. **Production build yaratish**:
   ```bash
   npm run build
   ```

## Yangi post qo'shish

1. `/public/posts/` papkasiga yangi markdown fayl yarating (masalan: `yangi-post.md`)
2. `/public/posts/posts.json` faylini yangilang:
   ```json
   {
     "slug": "yangi-post",
     "title": "Yangi post sarlavhasi",
     "description": "Qisqa tavsif",
     "date": "2025-01-01",
     "thumbnail": "/posts/yangi-post-1.jpg"
   }
   ```
3. Agar kerak bo'lsa, post uchun rasm qo'shing (`yangi-post-1.jpg`)

## Rasm optimizatsiyasi

- Hero fon rasm: 1920x1080px, JPG yoki WebP formatida
- Post rasmlari: 800x600px, JPG formatida
- Barcha rasmlarni WebP formatiga o'tkazish tavsiya etiladi

## Mavzu sozlash

Maktab ranglarini o'zgartirish uchun `/src/styles/theme.js` faylini tahrirlang:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#sizning-rang', // Asosiy rang
    },
    secondary: {
      main: '#ikkinchi-rang', // Ikkinchi rang
    },
  },
});
```

## Xarita sozlash

Yandex Maps xaritasini o'zgartirish uchun `/src/components/ContactSection.jsx` faylidagi iframe src'ni yangilang.

## Deploy qilish

### Vercel
1. GitHub'ga kodni yuklang
2. Vercel'ga ulang
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
1. GitHub'ga kodni yuklang
2. Netlify'ga ulang
3. Build command: `npm run build`
4. Publish directory: `dist`

## Texnik talablar

- Node.js 18+
- npm yoki yarn
- Zamonaviy brauzer

## Yordam

Agar savollar bo'lsa, loyiha muallifiga murojaat qiling.

---

**Eslatma**: Barcha matnlar formal Latin Uzbek tilida yozilgan. Agar boshqa til kerak bo'lsa, komponentlardagi matnlarni o'zgartiring.