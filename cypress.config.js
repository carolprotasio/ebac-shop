const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    experimentalRunAllSpecs: true,
      
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
