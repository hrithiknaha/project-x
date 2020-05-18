const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './Main.js',
	output: {
		publicPath: '/',
		path: path.resolve(__dirname),
		filename: 'bundled.js'
	},
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		port: 5000,
		contentBase: path.join(__dirname),
		hot: true,
		historyApiFallback: { index: 'index.html' }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							['@babel/preset-env', { targets: { node: '12' } }]
						]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /(node_modules)/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			}
		]
	}
};
