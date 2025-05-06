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
