import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "kxxzio",
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalOriginDependencies: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    // Workaround until https://github.com/SMenigat/cypress-mailhog/issues/34 gets merged and the configuration of cypress-mailhog moves as an environmental variable
    // @ts-ignore
    mailHogUrl: "http://localhost:8025",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
