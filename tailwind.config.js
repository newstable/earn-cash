/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'bye': 'linear-gradient(63deg, rgba(43,40,83,1) 0%, rgba(66,60,122,1) 100%)',
        'hi': 'linear-gradient(to top, #5f141e, #0E0C1D)',
        'sui': 'linear-gradient(to right,  #5f141e, #0E0C1D)'


        // ... other background images
      },
      backgroundColor: {
        'glass': 'rgba(198, 190, 190, 0.1)',
      },
      // ... other theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
};