import sveltePreprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: "src/components",
      $stores: "src/stores",
    },
  },
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
    vitePreprocess({}),
  ],
};

export default config;
