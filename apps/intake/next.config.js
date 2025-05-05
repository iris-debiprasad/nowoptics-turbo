const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
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
    config.plugins.push(
      new NextFederationPlugin({
        name: "intake",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./Setup": "./src/components/setup/index.tsx",
          "./MedicalForms": "./src/components/medicalforms/index.tsx",
          "./HippaForms": "./src/components/hippaforms/index.tsx",
          "./Patient": "./src/components/patient/index.tsx"
        },
        remotes: {
          host: `host@${process.env.NEXT_PUBLIC_APP_HOST}/_next/static/${isServer ? "ssr" : "chunks"
            }/remoteEntry.js`,
        },
        shared: {
          "axios": { singleton: true, requiredVersion: "^1.7.9" },
          "@mui/material": { singleton: true, requiredVersion: "^5.16.7" },
        },
      })
    );

    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        {
          loader: "ts-loader",
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