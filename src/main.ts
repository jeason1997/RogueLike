import * as ROT from 'rot-js';
import { Display } from "rot-js";
import { Color } from "rot-js";

var WEB = typeof window != 'undefined';

export class Main {

	run() {
		let d = new Display({
			layout: WEB ? 'rect' : 'term',
			//bg: "gray",
		});

		if (WEB) {
			d._options.spacing = 1.1;
			
			document.body.appendChild(d.getContainer() as Node);
			//d._options.width = document.body.clientHeight / d._options.fontSize;
			//d._options.height = document.body.clientWidth / d._options.fontSize;
		}
		else {
			d._options.width = process.stdout.columns;
			d._options.height = process.stdout.rows;

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

		let t = 255 / d._options.height;
		for (let i = 0; i < d._options.height; i++) {
			let fg = Color.toRGB([i * t, i * t, i * t]);
			let bg = Color.toRGB([255 - i * t, 255 - i * t, 255 - i * t]);
			//d.drawText(0, i, `%c{${fg}}%b{${bg}}Hello ${i}`);
			d.drawText(0, i, '%c{rgb(255, 255, 0)}HELLO' + i.toString());
			d.draw(i, 0, '@', fg, bg);
		}


		d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "blakc");
	}
}

new Main().run();