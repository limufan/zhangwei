module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: 'reactUI',
      externals: {
        react: 'React'
      }
    }
  }
}
