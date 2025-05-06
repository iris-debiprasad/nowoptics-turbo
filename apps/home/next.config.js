const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const withImages = require("next-images");

module.exports = withImages({
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        remotes: {
          host: `host@${process.env.NEXT_PUBLIC_APP_HOST}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        shared: {
          axios: { singleton: true, requiredVersion: "^1.7.9" },
          "@mui/material": { singleton: true, requiredVersion: "^5.16.7" },
        },
      })
    );
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });
    return config;
  }
});
