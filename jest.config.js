const fs = require('fs');

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf-8"));

module.exports = {
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
 