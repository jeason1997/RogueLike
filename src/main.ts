import * as ROT from 'rot-js';
import { Display } from "rot-js";
import { Color } from "rot-js";

var WEB = typeof window != 'undefined';

export class Main {

	run() {
		let d = new Display({
			width: 80,
			height: 30,
			layout: WEB ? 'rect' : 'term',
			//bg: "gray",
		});

		if (WEB) {
			document.body.appendChild(d.getContainer() as Node);
			//d._options.width = document.body.clientHeight / d._options.fontSize;
			//d._options.height = document.body.clientWidth / d._options.fontSize;
		}
		else {
			//d._options.width = process.stdout.rows;
			//d._options.height = process.stdout.columns;
		}

		for (let i = 0; i < d._options.width; i++) {
			for (let j = 0; j < d._options.height; j++) {
				if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
					d.draw(i, j, "#", "black", "gray");
				}
				else{
					d.draw(i, j, ".", "#666", "black");
				}
			}
		}

		let t = 255 / d._options.height;
		for (let i = 0; i < d._options.height; i++) {
			let fg = Color.toRGB([i * t, i * t, i * t]);
			let bg = Color.toRGB([255 - i * t, 255 - i * t, 255 - i * t]);
			//d.drawText(0, i, `%c{${fg}}%b{${bg}}Hello ${i}`);
			d.draw(0, i, ['`', '.'], 'yellow', 'black');
		}


		d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "blakc");
	}
}

new Main().run();