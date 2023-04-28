import type { Config } from '@jest/types';
import { readFileSync } from 'fs';

const swcConfig = JSON.parse(readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

const config: Config.InitialOptions = {
  testMatch: [
    "**/*.test.ts",
  ],
  transform: {
    "^.+\\.ts$": [
      "@swc/jest",
      {
        ...swcConfig,
        exclude: [],
        swcrc: false,
      },
    ],
  },
  testEnvironment: 'node',
};

export default config;
