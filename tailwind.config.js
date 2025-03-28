/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: '#FF06B7', // Bright pink for DJ brand
			dark: '#CC0594',
			light: '#FF5AD5',
		  },
		  secondary: {
			DEFAULT: '#06F0FF', // Bright cyan for contrast
			dark: '#04C4D1',
			light: '#67F7FF',
		  },
		  dark: {
			DEFAULT: '#0F0F10',
			light: '#1A1A1C',
			lighter: '#28282C',
		  },
		},
		fontFamily: {
		  sans: ['Inter', 'sans-serif'],
		  display: ['Montserrat', 'sans-serif'],
		},
		keyframes: {
		  shimmer: {
			'0%': { backgroundPosition: '-200% 0' },
			'100%': { backgroundPosition: '200% 0' },
		  },
		  pulse: {
			'0%, 100%': { opacity: 1 },
			'50%': { opacity: 0.5 },
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-10px)' },
		  },
		},
		animation: {
		  shimmer: 'shimmer 2s linear infinite',
		  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		  float: 'float 3s ease-in-out infinite',
		},
	  },
	},
	plugins: [],
  }