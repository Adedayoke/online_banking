/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
    "./public/index.html","./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#83d13a',
        lightGreen: '#83d13a4d',
        customAsh: '#3d3f3f',
        customOverlay: '#000000b3',
        coolAsh: '#06151a',
        primary: '#83d13a',
        shadePrimary: '#83d13a4d',
        secondary: '#06151a',
        lightgray : '#f2f2f2'
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle, #83d13a 5%, black 70%)',
        'radial-pseudo-custom': 'radial-gradient(circle closest-side at 50% 50%, #83d13a 50%, transparent)',
        'radial-second-custom': 'radial-gradient(130% 55% at 10% -30%, rgba(12, 172, 241) -90%, rgba(7, 123, 139, 0) 100%), #070F15;',
      },
    },
  },
  plugins: [],
}

