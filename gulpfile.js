/*
 * gulp用来监听文件变化，然后做出自动编译，自动刷新浏览器等自动化操作
 * 在VSCode里按Ctrl+F1会弹出选择默认任务，选择gulp，然后每次打开VSCode后按下Shift+Command+B运行默认任务，可也可以在终端里直接输入gulp
 * 运行gulp，若没有指定任务，会自动运行default任务
 * 参考：
 * https://blog.csdn.net/shengjmm/article/details/77748275
 */
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var process = require('child_process');


var watchedBrowserify = watchify(browserify({
	basedir: '.',
	//开启调试，会在bundle.js代码里加入map映射，然后能直接在浏览器里调试ts
	debug: true,
	//入口文件
	entries: ['src/main.ts'],
	cache: {},
	packageCache: {}
}).plugin(tsify));

//编译分2部分，一是直接调用tsc编译全部ts文件为commonjs模块，只能给nodejs使用
//然后在调用browserify将commonjs转为es并打包成一个js文件，以供浏览器运行
function compile() {
	process.exec('tsc', (error, stdout, stderr)=>{
		console.log(stdout);
	});
	return watchedBrowserify
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
}

//监听bundle.js跟index.html这两个文件，一旦有变化就刷新浏览器
gulp.task('default', () => {
	gulp.watch(['dist/bundle.js', 'index.html'], () => {
		return gulp.src('index.html')
			.pipe(connect.reload());
	});
});


//1.开启HTML服务器，服务器根目录为项目根目录
connect.server({
	root: './',
	livereload: true
});
//2.监听所有ts文件的变化，如果变化则打包并输出日志
watchedBrowserify.on("update", compile);
watchedBrowserify.on("log", gutil.log);
//3.在启动监听之前可能就已经修改过文件，因此在启动时手动编译一次
compile();