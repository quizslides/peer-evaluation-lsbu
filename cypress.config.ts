import { defineConfig } from "cypress";

const { verifyDownloadTasks } = require("cy-verify-downloads");

export default defineConfig({
  projectId: "kxxzio",
  e2e: {
    trashAssetsBeforeRuns: true,
    baseUrl: "http://localhost:3000",
    experimentalOriginDependencies: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      on("task", verifyDownloadTasks);

      return config;
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
    },
  },
  env: {
    mailHogUrl: "http://localhost:8025",
  },
  video: true,
  injectDocumentDomain: true,
});
