const withImages = require("next-images");

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 1000,
  output: "standalone",
  //* Note: Please comment the below line if you are building and running(npm run start) application for local
  basePath: process.env.NODE_ENV === "development" ? "" : "/_intake",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      }
    ],
  },
  transpilePackages: [],
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
  },
};

module.exports = withImages(nextConfig);