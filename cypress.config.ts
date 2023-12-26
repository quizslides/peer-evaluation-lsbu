import { defineConfig } from "cypress";

const { verifyDownloadTasks } = require("cy-verify-downloads");

export default defineConfig({
  projectId: "kxxzio",
  e2e: {
    trashAssetsBeforeRuns: true,
    baseUrl: "http://localhost:3000",
    experimentalOriginDependencies: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on) {
      on("task", verifyDownloadTasks);
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: {
    mailHogUrl: "http://localhost:8025",
  },
  video: true,
});
