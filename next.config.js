/* eslint-disable @typescript-eslint/padding-line-between-statements */
const { withSentryConfig } = require("@sentry/nextjs");
const nextSafe = require("next-safe");

const isProductionEnvironment = () => {
  switch (process.env.ENVIRONMENT) {
    case "ci":
    case "local":
      return false;
    default:
      return true;
  }
};

let permissionsHeaders = [];

const isProductionEnvironmentBuild = isProductionEnvironment();

if (isProductionEnvironmentBuild) {
  permissionsHeaders = [
    {
      source: "/:path*",
      headers: nextSafe(),
    },
  ];
}

const moduleExports = {
  poweredByHeader: false,
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
  async headers() {
    return permissionsHeaders;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = isProductionEnvironmentBuild
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports;
