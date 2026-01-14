# Aurora Background Image

## Required Image

You need to add an aurora/northern lights background image for the hero section.

## Option 1: Local Image (Recommended)

1. Find a high-quality aurora image:
   - **Unsplash**: https://unsplash.com/s/photos/aurora-borealis
   - **Pexels**: https://www.pexels.com/search/aurora/
   - **Pixabay**: https://pixabay.com/images/search/aurora/

2. Download the image and save it as:
   ```
   public/images/aurora-background.jpg
   ```

3. Recommended image specs:
   - Resolution: 1920x1080 or larger
   - Format: JPG or WebP
   - File size: Under 2MB (compress if needed)

## Option 2: Use Image URL Directly

Edit `src/config/constants.ts` and change:

```typescript
auroraBackground: 'https://your-image-url-here.jpg',
```

Example using Unsplash:
```typescript
auroraBackground: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80',
```

## Quick Test

To test with a real image immediately, you can use this Unsplash URL in `constants.ts`:

```typescript
auroraBackground: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=80',
```

Then replace it with your own image later!

