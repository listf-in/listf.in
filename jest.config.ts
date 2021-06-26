module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).+(ts|tsx|js|jsx)"
  ],
  "transform": {
    "\\.[jt]sx?$": "babel-jest"
  },
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  }
}

