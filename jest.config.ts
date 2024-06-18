import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  projects: ["<rootDir>/packages/*"],
  collectCoverage: true,
  coverageReporters: ["html"],
};
export default config;
