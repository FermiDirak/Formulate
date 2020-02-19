module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  moduleDirectories: ['<rootDir>/src', 'node_modules', 'bower_components'],
  setupFiles: ['<rootDir>/jest.setup.js'],
}
