module.exports = {
    collectCoverage: true,
    coverageProvider: "v8",
    reporters: [
      "default",
      [
        "jest-junit",
        {
          "outputDirectory": "test",
          "outputName": "junit.xml"
        }
      ]
    ],
  coverageReporters: [
      "cobertura",
      "html"
    ],
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!<rootDir>/out/**",
      "!<rootDir>/.next/**",
      "!<rootDir>/*.config.js",
      "!<rootDir>/coverage/**",
    ],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    moduleNameMapper: {
      // Handle CSS imports (with CSS modules)
      // https://jestjs.io/docs/webpack#mocking-css-modules
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  
      // Handle CSS imports (without CSS modules)
      "^.+\\.(css|sass|scss)$": "identity-obj-proxy",
  
      // Handle image imports
      // https://jestjs.io/docs/webpack#handling-static-assets
      // TODO - Needed in the future for file format based mocking
      "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i": `<rootDir>/src/mocks/filename.mock.ts`,
      "^.+\\.svg$": "<rootDir>/src/mocks/svgTransform.mock.ts",
  
      // Handle module aliases
      "^@root/intake/src/components/(.*)$": "<rootDir>/src/components/$1",
      "^@/context/(.*)$": "<rootDir>/src/context/$1",
      "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
      "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
      "^@root/intake/src/constants/(.*)$": "<rootDir>/src/constants/$1",
      "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
      "^@/slices/(.*)$": "<rootDir>/src/slices/$1",
      "^@/types/(.*)$" : "<rootDir>/src/types/$1",
      "^@root/(.*)$" : "<rootDir>/../$1"

    },
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/.next/",
      "<rootDir>/dist",
      "<rootDir>/src/public",
    ],
    coveragePathIgnorePatterns: [
      "<rootDir>/src/hooks/",
      "<rootDir>/src/slices/",
      "<rootDir>/src/mocks/",
      "<rootDir>/src/types/",
      "<rootDir>/src/constants/",
      "<rootDir>/src/pages/",
      "<rootDir>/src/utils/",
      "<rootDir>/src/context/"
    ],
    testEnvironment: "jsdom",
    transform: {
      // Use babel-jest to transpile tests with the next/babel preset
      // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
      "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
    transformIgnorePatterns: [
      "/node_modules/",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
  
