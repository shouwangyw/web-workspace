// vue.config.js
const fs = require('fs');
const path = require('path');

function resolve (dir) {
	return path.join(__dirname, dir);
}

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	outputDir: process.env.VUE_APP_DIST,
	// baseUrl: process.env.VUE_APP_CURRENTMODE === 'production'? '/static' : '/',
	assetsDir: 'assets',
	publicPath: '',
	indexPath: 'index.html',
	// 默认在生成的静态资源文件名中包含hash以控制缓存
	filenameHashing: true,
	//  将接收ChainableConfig由webpack-chain提供支持的实例的函数。
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'));
	},

	css: {
		// extract: true,  // 是否提取css生成单独的文件 默认 true  不进行设置时，可以正常进行css热更新
		sourceMap: false, // 开启 CSS source maps
		loaderOptions: {
			sass: {
				// data: fs.readFileSync('src/assets/styles/_variables.scss', 'utf-8')//将色值定为变量
			}
		}, // css预设器配置项
		modules: false // 启用 CSS modules for all css / pre-processor files.
	},
	productionSourceMap:false,
	// productionGzip: true,
	// productionGzipExtensions: ['js','css'],
	configureWebpack: config => {
		// config.externals = { //用户自己引入需要的库 是手动引入的，webpack每次build都可以跳过这些库，节省不少时间
		// 	'vue': 'Vue',
		// 	'vue-router': 'VueRouter'
		// };
		if (!isProduction) { // 开发环境配置
			config.devtool = 'source-map'
		}
		if (isProduction) {
			config.plugins.push(
				new CompressionWebpackPlugin({
					algorithm: 'gzip',
					test: new RegExp(
						'\\.(' + productionGzipExtensions.join('|') + ')$'
					),
					threshold: 10240,
					minRatio: 0.8
				})
			);
		}
	},
	// 是否使用包含运行时编译器的Vue内核版本
	runtimeCompiler: true,
	// 反向代理
	devServer: {

	}
};
