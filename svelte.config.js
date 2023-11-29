import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";

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
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],
};

export default config;
