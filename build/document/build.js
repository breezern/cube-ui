require('shelljs/global')
process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for document production...')
spinner.start()

rm(path.join(config.docBuild.assetsRoot, config.docBuild.assetsSubDirectory), err => {
  if (err) {
    throw err
  }
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) {
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan(' Document build complete.\n'))
  })
})
