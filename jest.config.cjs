module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
  },
};