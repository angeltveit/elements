const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['>= 5%']
                },
              }],
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
