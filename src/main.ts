import * as ROT from 'rot-js';
import { Test } from './test';

var WEB = typeof window != 'undefined';

export class Main {

	run() {
		let d = new ROT.Display({
			width: 11,
			height: 5,
			layout: WEB ? 'rect' : 'term'
		});

		if (WEB) {
			document.body.appendChild(d.getContainer() as Node);
		}

		for (let i = 0; i < d._options.width; i++) {
			for (let j = 0; j < d._options.height; j++) {
				if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
					d.draw(i, j, "#", "gray", "black");
					d.draw(i, j, ".", "#666", "black");
				}
			}
		}
		d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "black");
		d.drawText(0, 0, new Test().Do("fuck"));
	}
}

new Main().run();