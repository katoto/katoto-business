// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "\\.less$": "identity-obj-proxy",
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
};
