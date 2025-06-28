import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p_gray: '#858585', 
        secondary: '#F59E0B', // Example: amber
        accent: '#10B981',    // Example: emerald
      },
      backgroundImage: {
        // 'hero-pattern': "url('/assets/hero-bg.jpg')",
        // 'footer-texture': "url('/assets/footer-texture.png')",
      },
    },
  },
  plugins: [],
};

export default config;
