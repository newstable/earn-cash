/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'bye': 'linear-gradient(to top, #5f141e, #0E0C1D)',
        'hi': 'linear-gradient(to top, #0E0C1D, #5f141e)',
        // ... other background images
      },
      backgroundColor: {
        'glass': 'rgba(198, 190, 190, 0.1)',
      },
      // ... other theme extensions
    },
  },
  plugins: [],
};