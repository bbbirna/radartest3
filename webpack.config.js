module.exports = {
    entry: './index.js',
  
    output: {
      path: __dirname + '/build',
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    devServer:{
      historyApiFallback: true,
      contentBase: './'
    },
  
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        }
      ]
    }
  }
  