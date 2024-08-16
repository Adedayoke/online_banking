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
        coolAsh: '#06151a'
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle, #83d13a 5%, black 70%)',
        'radial-pseudo-custom': 'radial-gradient(circle, #83d13a, transparent, transparent)',
      },
    },
  },
  plugins: [],
}

