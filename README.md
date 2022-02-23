克隆项目并运行：
1.确保linux系统安装了nodejs, npm, gulp  (sudo apt install ...)
2.在目录下运行终端，然后npm install初始化
3.直接在项目路径输入gulp，开始监视...


初始化项目：
1.确保linux系统安装了nodejs, npm, gulp  (sudo apt install ...)
2.在目录下运行终端，然后npm install初始化
3.安装typescript，npm install -g typescript
4.安装gulp自动打包工具，npm install -g gulp
5.配置tsconfig.json
6.配置gulpfile.js，自动打包
7.如果需要打包到浏览器运行，还需与安装Browserify模块


初始化typescript：
1.在项目根目录下 tsc --init，会初始化，生成tsconfig.json，然后每次写完代码控制台输入tsc都会编译全部文件，在tsconfig.json里可以设置输出路径，排除文件

运行项目：
注：tsc直接编译好的与ts对应的js文件，只能给nodejs用，如果放到浏览器里，会抛出export的错误，要打包成一个bundle.js文件后才能给浏览器用。
1.node运行编译后的代码，例如主入口放在./dist/main.js，则输入 node ./dist/main.js，就会开始运行
2.浏览器运行，用python -m SimpleHTTPServer启动服务，在浏览器里127.0.0.1:8000打开界面


自动编译/打包
1.输入tsc会全部编译，按菜单的‘终端-运行任务-tsc-typescript监视’，然后每次修改任何ts文件，都会自动调用tsc编译
2.或者在控制台输入gulp启动打包监视，每次修改任何ts文件，都会自动编译后打包成一个bundle.js文件


默认的tsconfig.json里，modul类型是浏commonjs，这种类型只能在nodejs里用，浏览器不兼容，浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。
module
exports
require
global
而Browserify就是用来解决这个问题的，将commonjs转换格式到浏览器支持
http://nodejs.cn/learn/differences-between-nodejs-and-the-browser


注意，不知为何在linux下npm install后，再sudo apt install gulp，直接运行gulp命令老是失败，有个解决方法就是直接运行node_module下的gulp。
sudo ln -s /home/pi/Projects/RogueLike/node_modules/gulp/bin/gulp.js /usr/local/bin/gulp       
然后直接在项目目录下gulp就行了
或者直接在vscode里ctrl+shift+b运行gulp命令
注意ln一定要绝对路径，否则链接的快捷方式是无法使用的。