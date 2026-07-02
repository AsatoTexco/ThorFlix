import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
     
    },
  },
});
