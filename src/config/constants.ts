// Customize these values for your birthday website
export const CONFIG = {
  // Personalization
  name: 'Beautiful', // Change to your girlfriend's name
  birthdayDate: new Date('2024-12-25'), // Change to the birthday date
  
  // Messages
  heroTitle: 'Happy Birthday',
  loveLetter: `Happiest birthday to the most gorgeous girl 💕✨
Honestly cutu, since the day you came into my life, everything just feels so much more beautiful and complete 💕 Your smile literally makes my heart skip beats, and when you laugh, I swear time just stops for me 🎶✨
You know what? You're not just my girlfriend, you're my best friend, my safe place, my everything, my wify 🌙💫 The way you understand me, the way you care, the way you love, it is exactly what my heart was searching for all along 🦋💕
Every moment with you feels like never ending joy I just wanna hold your hand and just tell you that being around you makes me the happiest 🏡✨ You've turned my ordinary life into the most beautiful love story 💑💕
 My Love 💝✨you are the sunshine that brightens my darkest days and the moonlight that guides me through every night 🌙💫 The universe knew exactly what it was doing when it brought us together, and I thank my stars every single day for you 🌟💕
Your presence in my life is the greatest blessing I could ever ask for 🦋✨ With you, I've found a love that's pure, honest, and absolutely magical 💕✨
On your special day, I promise to always make you feel loved, cherished and special 👑💕 You deserve all the happiness in this world my love, and I'll spend forever trying to give you exactly that 🌸✨
Thank you for being mine, for loving me, for making life so incredibly beautiful 💝♾️
I love you so much baby, today and always 💕🌙
Forever yours
Your Mr.H 💕✨`,

  // Image paths (place images in /public/assets/)
  heroImage: '/assets/IMG-20240220-WA0000 (1).jpg', // Hero profile image (default/fallback)
  // Multiple hero images for rotation (all in /public/assets/ folder)
  heroImages: [
    '/assets/img_1.jpg', // img_1 - shown on first render
    '/assets/img_2.png', // img_2 - shown after 3 seconds
    '/assets/img_3.png', // img_3 - shown after 6 seconds
    '/assets/img_4.jpg', // img_4 - shown after 9 seconds
    '/assets/img_5.jpg', // img_5 - shown after 12 seconds
  ],
  // Real aurora/northern lights image for hero background
  auroraBackground: '/images/Attached_image.png', // Using Attached_image.png as background
  galleryImages: [
    // 2022 Images (8 images)
    { src: '/assets/1.jpg', caption: 'Beautiful memory', year: '2022' },
    { src: '/assets/2.jpg', caption: 'Special day', year: '2022' },
    { src: '/assets/3.jpg', caption: 'Wonderful moment', year: '2022' },
    { src: '/assets/5.jpg', caption: 'Cafe time', year: '2022' },
    { src: '/assets/11.jpg', caption: 'Me Carrying My world', year: '2022' },
    { src: '/assets/7.jpg', caption: 'Autumn time', year: '2022' },
    { src: '/assets/8.jpg', caption: 'Celebrating together', year: '2022' },
    { src: '/assets/9.png', caption: 'Winter wonderland', year: '2022', zoom: 1.2 }, // Zoom in
    // 2023 Images (8 images)
    { src: '/assets/2023.1.jpg', caption: 'Our first Birthday', year: '2023' },
    { src: '/assets/2023.2.jpg', caption: 'Falling more for You', year: '2023' },
    { src: '/assets/2023.3.jpg', caption: 'Celebrating together', year: '2023' },
    { src: '/assets/2023.4.jpg', caption: 'Ethnicity', year: '2023' },
    { src: '/assets/2023.5.jpg', caption: 'Lilies For me', year: '2023' },
    { src: '/assets/2023.6.jpg', caption: 'Making memories', year: '2023' },
    { src: '/assets/2023.7.png', caption: 'Cake Facial', year: '2023' },
    { src: '/assets/2023.8.jpg', caption: 'Pizza time', year: '2023' },
    // 2024 Images (8 images)
    { src: '/assets/2024.1.jpg', caption: 'Farewell', year: '2024' },
    { src: '/assets/2024.2.jpg', caption: 'Scribble Fun', year: '2024' },
    { src: '/assets/2024.3.jpg', caption: 'Concert Lovers', year: '2024' },
    { src: '/assets/2024.4.jpg', caption: 'Autumn beauty', year: '2024' },
    { src: '/assets/2024.5.jpg', caption: 'Van Goah special', year: '2024' },
    { src: '/assets/2024.6.jpg', caption: 'Cutie Pie', year: '2024' },
    { src: '/assets/2024.7.jpg', caption: 'The formals', year: '2024' },
    { src: '/assets/2024.8.jpg', caption: 'The duo', year: '2024' },
    // 2025 Images (6 images)
    { src: '/assets/2025.1.jpeg', caption: 'Beautiful memory', year: '2025' },
    { src: '/assets/2025.2.jpeg', caption: 'Special moment', year: '2025' },
    { src: '/assets/2025.3.jpeg', caption: 'Coolers', year: '2025' },
    { src: '/assets/2025.4.jpeg', caption: 'Mr.H', year: '2025' },
    { src: '/assets/2025.5.jpeg', caption: 'Rooler Coaster Ride ', year: '2025' },
    { src: '/assets/2025.6.jpeg', caption: 'Love Birds', year: '2025' },
  ],

  // Timeline events
  timelineEvents: [
    {
      date: '2022-11-09',
      title: 'The Best Day of My Life',
      description: 'A day that changed everything',
      image: '/assets/the bestday.jpeg',
    },
    {
      date: '2023-01-15',
      title: 'Our First Birthday Together',
      description: 'Celebrating together for the first time',
      image: '/assets/first-bday.jpg',
    },
    {
      date: '2023-05-10',
      title: 'My Birthday That You Made Special',
      description: 'You made it unforgettable',
      image: '/images/timeline3.jpg', // Will be updated later
    },
    {
      date: '2024-02-14',
      title: 'Celebrating Our Love',
      description: 'Our first Valentine\'s Day together',
      image: '/images/timeline7.jpg', // Will be updated later
    },
    {
      date: '2024-12-25',
      title: 'Forever Yours',
      description: 'Our beautiful journey continues',
      image: '/images/timeline10.jpg', // Will be updated later
    },
  ],

  // Music (optional)
  spotifyUrl: '', // Add Spotify embed URL if desired
  audioFile: '/assets/birthday-song.mp3', // Optional background music

  // Voice Message (optional)
  // Record a personal voice message and save it as 'public/audio/voice-message.mp3'
  voiceMessage: '/audio/voice-message.mp3', // Personal voice message
  // Set to empty string '' to disable: voiceMessage: '',

  // Special moments carousel
  specialMoments: [
    {
      image: '/assets/art.jpeg',
      caption: 'Our art Date',
    },
    {
      image: '/assets/concert.jpg',
      caption: 'Our first concert',
    },
    {
      image: '/assets/van_goah.jpg',
      caption: 'Van Goah CLassic',
    },
    {
      image: '/assets/internship.jpg',
      caption: 'Our first internship',
    },
  ],
}

