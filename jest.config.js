/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "\\.[jt]s?$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest" // Update to match your installed version
  }
};
