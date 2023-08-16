const withBundleAnalyzer = require("@next/bundle-analyzer");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

// analyze
const shouldAnalyzeBundles = process.env.ANALYZE === "true";

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      reactStrictMode: true,
      env: {
        // @see https://github.com/facebookexperimental/Recoil/issues/2135#issuecomment-1362197710
        RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
      },

      webpack(config, { isServer }) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(
          (rule) => rule.test && rule.test.test && rule.test.test(".svg")
        );

        // Rest of the SVG rule modifications...

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        if (fileLoaderRule) {
          fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
      },
      images: {
        loader: "default",
        domains: ["localhost"],
      },
    };
  }

  return {
    /* config options for all phases except development here */

    webpack(config, { isServer }) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find(
        (rule) => rule.test && rule.test.test && rule.test.test(".svg")
      );

      // Rest of the SVG rule modifications...

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
      }

      return config;
    },
    images: {
      loader: "default",
      domains: ["localhost"],
    },
  };
};
