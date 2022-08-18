import type {Config} from '@jest/types';
const config: Config.InitialOptions = {
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'd.ts'],
  transform: {
    "\\.[jt]s?$": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest" // Update to match your installed version
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
export default config;
