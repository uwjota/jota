import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D00',
          foreground: '#000000',
        },
        background: '#000000',
        foreground: '#FFFFFF',
        border: '#333333',
        input: '#333333',
        ring: '#FF4D00',
        accent: {
          DEFAULT: '#222222',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#222222',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#222222',
          foreground: '#A3A3A3',
        },
        popover: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

export default config
