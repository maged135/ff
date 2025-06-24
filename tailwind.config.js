module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // 👈 مهم جداً
  theme: {
    extend: {
      fontFamily: {
        quran: ['"Amiri Quran"', 'serif'],
        arabic: ['"Scheherazade New"', 'serif'],
      },
      backgroundImage: {
        'custom-bg': "url('https://64.media.tumblr.com/04a24e79dc32921e0629f201750a3140/91a785af32807563-64/s1280x1920/bf01a179232f8fc11749f827b0bee43c67a15b4f.jpg')",
        'custom-bn': "url('https://th.bing.com/th/id/OIP.CVMRWzwRVrBHY6aJHrDV2AHaNK?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3')",
        'back-bn': "url('https://th.bing.com/th/id/R.dcd0fb16281e934b741f39eaea59eb4f?rik=9P4Jxc9LVesoZg&pid=ImgRaw&r=0&sres=1&sresct=1')",
        'back-bg': "url('https://th.bing.com/th/id/OIP.PVEkLHL_-QLvX-OfXA49UAHaG4?w=564&h=524&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3')"
      },
      
    }
  },
  plugins: [],
}
