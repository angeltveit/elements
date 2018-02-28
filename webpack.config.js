const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-syntax-export-default-from",
              "transform-decorators-legacy",
              "transform-class-properties",
            ]
          }
        }
      }
    ]
}
};
