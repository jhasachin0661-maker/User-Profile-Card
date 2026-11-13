/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#17251F',
          dark: '#0F1A15',
          light: '#22352C',
          surface: '#1D2E26',
        },
        ivory: {
          DEFAULT: '#F2EBDD',
          light: '#FBF8F2',
          dark: '#E5DCB',
          muted: '#E6DECE',
        },
        brass: {
          DEFAULT: '#B99A6A',
          light: '#CDB185',
          dark: '#9E8052',
          subtle: 'rgba(185, 154, 106, 0.15)',
        },
        ink: {
          DEFAULT: '#202622',
          light: '#333D36',
          dark: '#121714',
        },
        muted: {
          DEFAULT: '#68716B',
          light: '#8A948D',
          dark: '#4D554F',
        },
        charcoal: {
          DEFAULT: '#1A1D20',
          dark: '#121416',
          surface: '#24282D',
          border: '#333840',
        },
        sand: {
          DEFAULT: '#EFECE6',
          dark: '#2C2623',
          accent: '#A86542',
          border: '#DDD8CE',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card-subtle': '0 4px 20px -2px rgba(23, 37, 31, 0.08)',
        'card-elevated': '0 12px 35px -4px rgba(23, 37, 31, 0.18)',
        'card-dark': '0 15px 40px -5px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}

