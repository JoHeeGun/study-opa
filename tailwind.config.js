/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  
  content: [
    "./public/**/*.html",
    "./src/**/*.{html,htm,vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // tailwind v3에서의 Color palette changes 확인하여 반영할 것.
      // 참고할 곳: https://tailwindcss.com/docs/upgrade-guide#color-palette-changes      
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        black: colors.black,
        white: colors.white,
        'vimeal-blue': {
          50: '#E0F4FF',
          100: '#B8EAFF',
          200: '#7CD2FF',
          300: '#43C0FF',
          400: '#00B3FF',
          500: '#00A5FD',
          600: '#0097EE',
          700: '#0084D9',
          800: '#0066CB',
          900: '#0151A0',
        },
        'medium-blue': '#0073C5',
        gray: {
          100: '#FCFCFC',
          150: '#F5F5F5',
          200: '#EFEFEF',
          300: '#DFDFDF',
          350: '#C8C8C8',
          400: '#B7B7B7',
          500: '#949494',
          600: '#777777',
          700: '#555555',
          800: '#303030',
        },
        pink: {
          1: '#FA7D96',
          2: '#B85165',
          3: '#7A3644',
        },
        purple: {
          1: '#8F8FFF',
          2: '#5A5ACC',
          3: '#363A7A',
        },
        mint: {
          1: '#00B8E5',
          2: '#0083A3',
          3: '#005266',
        },
        green: '#89E589',
        yellow: '#FFD700',
        orange: '#FF6E2F',
        accept: '#34C36D',
        decline: '#FA374A',
        'light-pastel-purple': '#CECCFF4D',
        'light-pastel-pink': '#F5CED566',
        'light-pastel-orange': '#F5CEA733',
        'light-pastel-yellow': '#FFD7001A',
        'light-pastel-green-1': '#BCEBC84D',
        'light-pastel-green-2': '#89E58926',
        'light-pastel-blue': '#E0F4FF',
        'light-medium-blue': '#0073C51A',
        'light-red': '#FA374A1A',
        'pastel-purple': '#CECCFF',
        'pastel-pink': '#F5CED5',
        'pastel-orange': '#F5CEA7',
        'pastel-green': '#BCEBC8',
      },
      boxShadow: {
        w1: '0px 1px 2px rgba(0, 0, 0, 0.07)',
        w2: '0px 1px 6px rgba(0, 0, 0, 0.12)',
        w3: '0px 1px 20px rgba(0, 0, 0, 0.07)',
        g1: '0px 0px 1px rgba(0, 0, 0, 0.05)',
        g2: '0px 1px 4px rgba(0, 0, 0, 0.06)',
        g3: '0px 1px 15px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        3: '3px',
        5: '5px',
        8: '8px',
        12: '12px',
      },
      fontSize: {
        '2xs': '.625rem',
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      spacing: {
        18: '4.5rem',
        38: '9.5rem',
      },
      backgroundPosition: {
        'right-4': 'right 1rem top 50%',
      },
    },

    screens: {
      xsm2:'375px',
      xsm:'480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    // require("tailwind-scrollbar-hide"),
    // require('@tailwindcss/line-clamp'), 
  ],
}
