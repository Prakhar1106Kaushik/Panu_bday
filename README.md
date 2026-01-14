# Aurora Birthday Website ✨

A premium, immersive birthday website with an aurora/northern lights theme. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Aurora Theme**: Beautiful color palette inspired by northern lights
- ✨ **Sophisticated Animations**: Framer Motion animations throughout
- 📸 **Photo Gallery**: 3D card flips, lazy loading, and zoom modal
- 📅 **Timeline**: Vertical timeline showcasing your journey together
- 💌 **Love Letter**: Animated text reveals with beautiful formatting
- 🎵 **Music Player**: Optional background music with toggle
- 🎤 **Voice Message**: Personal voice recording player
- 🌟 **Special Effects**: Floating particles, aurora animations, custom cursor
- 📱 **Fully Responsive**: Mobile-first design approach
- ⚡ **High Performance**: Optimized for Lighthouse scores >90

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Add your images to the `public/images/` folder:
   - `aurora-background.jpg` - **REQUIRED**: Real aurora/northern lights image for hero background (1920x1080 or larger recommended)
   - `hero.jpg` - Main hero image (profile photo)
   - `gallery1.jpg`, `gallery2.jpg`, etc. - Gallery images (up to 30)
   - `timeline1.jpg`, `timeline2.jpg`, etc. - Timeline images
   - `moment1.jpg`, `moment2.jpg`, etc. - Special moments images
   
   **Note**: You can find free high-quality aurora images on Unsplash, Pexels, or similar sites. Search for "aurora borealis" or "northern lights".

4. (Optional) Add your voice message to the `public/audio/` folder:
   - `voice-message.mp3` - Record a personal voice message (1-5 minutes recommended)
   - This will appear as a floating button on the website

4. Customize the content in `src/config/constants.ts`:
   - Update the name
   - Set the birthday date
   - Edit the love letter
   - Add your image paths and captions

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Customization Guide

### Personal Information

Edit `src/config/constants.ts`:

```typescript
export const CONFIG = {
  name: 'Beautiful', // Change to your girlfriend's name
  birthdayDate: new Date('2024-12-25'), // Set the birthday date
  heroTitle: 'Happy Birthday',
  // ... more customization options
}
```

### Adding Images

1. Place your images in `public/images/`
2. Update the image paths in `src/config/constants.ts`:

```typescript
galleryImages: [
  { src: '/images/gallery1.jpg', caption: 'Your caption', date: '2023-01-15' },
  // Add more images...
]
```

### Love Letter

Edit the `loveLetter` field in `src/config/constants.ts` with your personal message.

### Timeline Events

Add your timeline events:

```typescript
timelineEvents: [
  {
    date: '2023-01-15',
    title: 'The Beginning',
    description: 'The day our story started',
    image: '/images/timeline1.jpg',
  },
  // Add more events...
]
```

### Music

**Option 1: Background Audio File**
- Place an audio file in `public/audio/background-music.mp3`
- The file path is already configured in `constants.ts`

**Option 2: Spotify Embed**
- Get a Spotify embed URL
- Add it to `spotifyUrl` in `constants.ts`

### Voice Message

**Add a Personal Voice Recording:**
1. Record your voice message (using phone, computer, or online recorder)
2. Save it as `public/audio/voice-message.mp3`
3. The voice player will automatically appear on the website

**To Disable:**
- Set `voiceMessage: ''` in `constants.ts`

### Colors

The aurora color palette is defined in `tailwind.config.js`. You can customize:

- `aurora-dark-purple1`: #1a0b2e
- `aurora-dark-purple2`: #2d1b4e
- `aurora-teal`: #16F8B6
- `aurora-mint`: #7DF9FF
- `aurora-pink`: #FFB5E8
- `aurora-blue`: #4CC9F0

## Project Structure

```
├── public/
│   ├── images/          # Place your images here
│   └── audio/           # Optional background music
├── src/
│   ├── components/      # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Timeline.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── LoveLetter.tsx
│   │   ├── SpecialMoments.tsx
│   │   ├── BirthdayWishes.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── AuroraBackground.tsx
│   │   ├── FloatingParticles.tsx
│   │   ├── CustomCursor.tsx
│   │   └── Footer.tsx
│   ├── config/
│   │   └── constants.ts # All customization here
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   ├── useIntersectionObserver.ts
│   │   └── useParallax.ts
│   ├── utils/
│   │   └── imageOptimization.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Vite and deploy

### Netlify

1. Push your code to GitHub
2. In Netlify, create a new site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`

### Other Platforms

The `dist/` folder contains static files that can be deployed to any static hosting service.

## Performance Tips

1. **Image Optimization**: 
   - Use WebP format when possible
   - Compress images before adding them
   - Recommended sizes:
     - Hero image: 1200x1200px
     - Gallery images: 800x800px
     - Timeline images: 600x400px

2. **Audio Files**:
   - Use compressed formats (MP3, OGG)
   - Keep file size under 5MB for better loading

3. **Build Optimization**:
   - The project uses code splitting automatically
   - Images are lazy-loaded
   - Animations are optimized for 60fps

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Images not showing
- Ensure images are in `public/images/`
- Check that paths in `constants.ts` match your file names
- Use lowercase file names with no spaces

### Animations not working
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a different browser

### Music not playing
- Some browsers block autoplay
- Users need to interact with the page first
- Check that the audio file path is correct

## License

This project is created for personal use. Feel free to customize it for your special occasion!

## Credits

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Font: [Dancing Script](https://fonts.google.com/specimen/Dancing+Script) from Google Fonts

---

Made with ✨ and aurora magic for someone special 💫

