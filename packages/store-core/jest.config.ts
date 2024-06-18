import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest",
  displayName: "store-core",
  testMatch: ["<rootDir>/packages/store-core/__tests__/**/*.spec.ts"],
  rootDir: "../../",
};

export default config;
