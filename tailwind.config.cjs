/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

// Rotate Y utilities
const rotateY = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  })
})

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      keyframes: {
        animateBg: {
          '0%': { backgroundImage: "url('./src/utils/pose_images/chair.png')" },
          '14%': { backgroundImage: "url('./src/utils/pose_images/dog.png')" },
          '28%': { backgroundImage: "url('./src/utils/pose_images/tree.png')" },
          '42%': { backgroundImage: "url('./src/utils/pose_images/triangle.png')" },
          '56%': { backgroundImage: "url('./src/utils/pose_images/cobra.png')" },
          '70%': { backgroundImage: "url('./src/utils/pose_images/warrior.png')" },
          '85%': { backgroundImage: "url('./src/utils/pose_images/shoulderstand.png')" },
          '100%': { backgroundImage: "url('./src/utils/pose_images/chair.png')" },
        },
      },
      animation: {
        'changeBg': 'animateBg 20s ease infinite',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    rotateY
  ],
}