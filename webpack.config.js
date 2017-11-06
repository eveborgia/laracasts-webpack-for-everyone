var webpack = require('webpack');
var path = require('path'); 
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var inProduction = (process.env.NODE_ENV === 'production');
var CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
	entry: {
		main:'./src/main.js', 
		vendor: ['jquery']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
		{
			test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
			loader: 'file-loader',
			options: {
				name: 'images/[name].[hash].[ext]'
			}
		},
		    { 
		    	test: /\.js$/, 
		    	exclude: /node_modules/, 
		    	loader: "babel-loader"
		     }
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose:  true,
			dry:      false,
		}),

		new webpack.LoaderOptionsPlugin({
			minimize: inProduction,
		}),
		function() {
			this.plugin('done', stats => {
				require('fs').writeFileSync(
					path.join(__dirname, 'dist/manifest.json'),
					JSON.stringify(stats.toJson().assetsByChunkName)
				);
		});
	}
		  
	]
};

if (inProduction) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
		);
}