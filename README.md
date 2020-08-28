typescript编译
1.在项目根目录下 tsc --init，会初始化，生成tsconfig.json，然后每次写完代码控制台输入tsc都会编译全部文件，在tsconfig.json里可以设置输出路径，排除文件

tsc直接编译好的js文件，只能给nodejs用，如果放到浏览器里，会抛出export的错误，要打包成一个js文件后才能给浏览器用。


自动编译/打包
1.输入tsc会全部编译，按菜单的‘终端-运行任务-tsc-typescript监视’，然后每次修改任何ts文件，都会自动调用tsc编译
2.在控制台输入gulp启动打包监视，每次修改任何ts文件，都会自动打包


默认的tsconfig.json里，modul类型是浏commonjs，这种类型只能在nodejs里用，浏览器不兼容，浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。
module
exports
require
global
而Browserify就是用来解决这个问题的，将commonjs转换格式到浏览器支持
http://nodejs.cn/learn/differences-between-nodejs-and-the-browser