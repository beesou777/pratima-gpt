const sveltePreprocess = require('svelte-preprocess');
const path = require('path');

module.exports = {
  preprocess: sveltePreprocess({
    scss: {
      includePaths: [path.join(__dirname, 'src')],
    },
  }),
  kit: {
    // Kit configuration (if any)
  },
};
