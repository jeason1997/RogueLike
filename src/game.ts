import * as ROT from 'rot-js';
import { Display } from "rot-js";
import { Color } from "rot-js";
import Canvas from 'rot-js/lib/display/canvas';
import * as Global from './main';


export class Game {

	constructor(){
	}
	
	run() {
		let d = new Display({
			layout: Global.IS_WEB ? 'rect' : 'term',
			//字体大小，在浏览器canvas模式下才有用，nodejs下是取决于终端到字体大小的
			fontSize: 36,
			//tileWidth: 50,
			//spacing: 0.8,
			fontFamily: "pix",
			//forceSquareRatio: true,
            bg: "black",
            
		});

		if (Global.IS_WEB) {
			document.body.appendChild(d.getContainer() as Node);

			//解决高分屏字体模糊
			var canvas = document.querySelector("canvas");
			if (canvas != null) {
				var context = canvas.getContext("2d");
				if (context != null) {
					canvas.style.width = canvas.width / window.devicePixelRatio + 'px';
                    canvas.style.height = canvas.height / window.devicePixelRatio + 'px';
				}
			}
		}
		else {
			//d._options.width = process.stdout.columns;
			//d._options.height = process.stdout.rows;

			// acquire some libraries we'll need
			var keypress = require("keypress");

			// when the program terminates, put the console back the way we found it
			process.on("exit", function () {
				// move cursor to the bottom left corner
				process.stdout.write("\x1b[" + (process.stdout.rows + 1) + ";1H");
				// show the cursor again
				process.stdout.write("\x1b[?25h");
			});
			// during the game, hide the cursor from display
			process.stdout.write("\x1b[?25l");

			// put the keyboard into raw mode, so we can get individual keypress events
			keypress(process.stdin);
			process.stdin.setRawMode(true);
			process.stdin.resume();

			// add a handler to listen for "quit game" commands
			process.stdin.on("keypress", function (ch, key) {
				// if the user pressed Ctrl+C or ESC
				if (ch === "\u0003" || ch === "\u001b") {
					// then quit the game
					process.exit(0);
				}
			});
		}

		for (let i = 0; i < d._options.width; i++) {
			for (let j = 0; j < d._options.height; j++) {
				if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
					d.draw(i, j, "#", "black", "gray");
				}
				else {
					d.draw(i, j, ".", "#666", "black");
				}
			}
		}

		//nodejs下颜色必须取整，因为终端无法显示浮点颜色
		let t = Math.floor(255 / d._options.height);
		for (let i = 0; i < d._options.height; i++) {
			let fg = Color.toRGB([i * t, i * t, i * t]);
			let bg = Color.toRGB([255 - i * t, 255 - i * t, 255 - i * t]);
			//d.drawText(0, i, `%c{${fg}}%b{${bg}}Hello ${i}`);
			d.drawText(0, i, '%c{rgb(255, 255, 0)}你 好 啊 小 骚 逼 ' + i.toString());
			d.draw(i, 0, '@', fg, bg);
		}


		d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "blue");
		d.drawText(10, 10, "Hello World 123 我 爱 你")
	}
}