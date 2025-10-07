module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  extensionsToTreatAsEsm: ['.jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)'
  ]
};
