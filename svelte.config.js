import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {

    kit: {
        adapter: adapter({
            runtime: 'nodejs18.x'
        }),
    },

    preprocess: [
        preprocess({
            scss: {
                prependData: '@use "src/variables.scss" as *;',
            },
        }),
    ],
};

export default config;