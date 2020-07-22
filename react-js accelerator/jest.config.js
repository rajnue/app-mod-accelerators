module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 95,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/services/',
    '/src/helpers/',
    '/src/actions/',
    '/src/models/',
    '/src/transformers/__mock__/',
  ],
};
