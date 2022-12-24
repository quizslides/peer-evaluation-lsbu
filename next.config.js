/* eslint-disable @typescript-eslint/padding-line-between-statements */

const { withSentryConfig } = require("@sentry/nextjs");
const nextSafe = require("next-safe");

const isProductionEnvironment = process.env.NODE_ENV === "production";

let permissionsPolicyForTesting = {};

let contentSecurityPolicyForTesting = {};

if (!isProductionEnvironment) {
  /**
   * This header is needed for testing tool to communicate with the site automatically during their execution.
   */
  permissionsPolicyForTesting = {
    "document-domain": "*",
  };

  /**
   * Content Security Policy for Apollo Studio for Local Development
   */
  contentSecurityPolicyForTesting = {
    "script-src-elem":
      "'unsafe-inline' https://apollo-server-landing-page.cdn.apollographql.com/_latest/static/js/main.js",
    "img-src":
      "https://apollo-server-landing-page.cdn.apollographql.com/_latest/assets/favicon.png https://apollo-server-landing-page.cdn.apollographql.com/_latest/static/media/info-icon.svg https://apollo-server-landing-page.cdn.apollographql.com/_latest/static/media/background-texture.png",
    "style-src-elem": "'unsafe-inline' https://fonts.googleapis.com",
    "font-src": "https://fonts.gstatic.com",
    "manifest-src": "https://apollo-server-landing-page.cdn.apollographql.com/_latest/manifest.json",
  };
}

const securityHeaders = nextSafe({
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
    ...contentSecurityPolicyForTesting,
  },
  isDev: !isProductionEnvironment,
});

const permissionsHeaders = [
  {
    source: "/:path*",
    headers: [
      ...securityHeaders,
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ],
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
