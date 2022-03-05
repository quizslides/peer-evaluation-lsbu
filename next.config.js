const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

const isProductionEnvironment = () => {
  switch (process.env.ENVIRONMENT) {
    case "ci":
    case "local":
      return false;
    default:
      return true;
  }
};

module.exports = isProductionEnvironment()
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports;
