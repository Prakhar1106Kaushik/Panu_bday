# Add Your Voice Message

## Instructions:

1. **Record your voice message** using:
   - Your phone's voice recorder
   - Computer recording software (Audacity, GarageBand, etc.)
   - Online voice recorder

2. **Save the recording** in this folder (`public/audio/`) with the name:
   ```
   voice-message.mp3
   ```

3. The voice message will automatically appear as a floating button on the website!

## Recording Tips:

- **Format**: MP3, WAV, or OGG
- **Duration**: 1-5 minutes recommended
- **Quality**: Clear audio, minimal background noise
- **Content**: Personal birthday message, reading the love letter, or sharing memories

## To Disable Voice Message:

Edit `src/config/constants.ts` and set:
```typescript
voiceMessage: '', // Empty string to disable
```

## File Size:

Keep the file under 5MB for best performance. Compress if needed.

