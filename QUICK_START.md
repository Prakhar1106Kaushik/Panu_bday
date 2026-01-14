# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Images
Place your images in `public/images/`:
- `aurora-background.jpg` - **REQUIRED**: Real aurora/northern lights background image (1920x1080+ recommended)
- `hero.jpg` - Main hero section image (profile photo)
- `gallery1.jpg`, `gallery2.jpg`, etc. - Gallery images
- `timeline1.jpg`, `timeline2.jpg`, etc. - Timeline images  
- `moment1.jpg`, `moment2.jpg`, etc. - Special moments images

**Tip**: Find free aurora images on Unsplash or Pexels (search "aurora borealis")

### 3. Customize Content
Edit `src/config/constants.ts`:
- Change `name` to your girlfriend's name
- Update `birthdayDate`
- Edit `loveLetter` with your personal message
- Update image paths and captions

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your website!

## 📝 Customization Checklist

- [ ] Add aurora background image (`public/images/aurora-background.jpg`) - **REQUIRED**
- [ ] Update name in `constants.ts`
- [ ] Set birthday date
- [ ] Write your love letter
- [ ] Add hero image (`public/images/hero.jpg`)
- [ ] Add gallery images (at least 6 recommended)
- [ ] Add timeline events with images
- [ ] Add special moments images
- [ ] (Optional) Add background music to `public/audio/`
- [ ] (Optional) Add Spotify embed URL

## 🎨 Image Recommendations

- **Format**: JPG or WebP
- **Hero Image**: 1200x1200px (square)
- **Gallery Images**: 800x800px (square)
- **Timeline Images**: 600x400px (landscape)
- **Special Moments**: 1200x600px (landscape)

Compress images before adding them for better performance!

## 🚢 Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically!

### Deploy to Netlify
1. Push to GitHub
2. Create new site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

---

**Need help?** Check the full README.md for detailed documentation!

