/* eslint-disable @typescript-eslint/padding-line-between-statements */

const { withSentryConfig } = require("@sentry/nextjs");
const nextSafe = require("next-safe");

const isProductionEnvironment = process.env.NODE_ENV === "production";

let permissionsPolicyForTesting = {};

if (!isProductionEnvironment) {
  /**
   * This header is needed for testing tool to communicate with the site automatically during their execution.
   */
  permissionsPolicyForTesting = {
    "document-domain": "*",
  };
}

const permissionsHeaders = [
  {
    source: "/:path*",
    headers: nextSafe({
      permissionsPolicy: {
        /**
         * Allow the site to copy content to clipboard.
         */
        "clipboard-write": "'*'",
        ...permissionsPolicyForTesting,
      },
      contentSecurityPolicy: {
        /**
         * Due to libraries injecting in-line styles and using in-line styles and the bundle of Webpack these two directives need to be enabled.
         */
        "script-src": "'self' 'unsafe-eval'",
        "style-src": "'self' 'unsafe-inline'",
        /**
         * Following Sentry Documentation for reporting added an external source to make requests.
         *
         * @source: https://docs.sentry.io/product/security-policy-reporting/
         */
        "connect-src": `'self' ${process.env.SENTRY_SECURITY_HEADER_ENDPOINT}`,
      },
      isDev: !isProductionEnvironment,
    }),
  },
];

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

module.exports = isProductionEnvironment ? withSentryConfig(moduleExports, sentryWebpackPluginOptions) : moduleExports;
