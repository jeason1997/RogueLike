import * as ROT from 'rot-js';
import { Display } from "rot-js";
import { Color } from "rot-js";
import { Map } from "rot-js";
import Canvas from 'rot-js/lib/display/canvas';
import * as Global from './main';


export class Game {

	private display: Display;

	constructor() {
		this.display = new Display({
			layout: Global.IS_WEB ? 'rect' : 'term',
			//字体大小，在浏览器canvas模式下才有用，nodejs下是取决于终端到字体大小的
			fontSize: 36,
			//tileWidth: 50,
			//spacing: 0.8,
			fontFamily: "pix12",
			//forceSquareRatio: true,
			bg: "black",
		});
	}

	run() {
		if (Global.IS_WEB) {
			document.body.appendChild(this.display.getContainer() as Node);

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
		this.generatorMap();
	}

	generatorMap() {
		ROT.RNG.setSeed(1234);
		var map = new Map.Digger(this.display._options.width, this.display._options.height);
		map.create(this.drawMap.bind(this));

		var rooms = map.getRooms();
		for (var i = 0; i < rooms.length; i++) {
			var room = rooms[i];
			room.getDoors(this.drawDoor.bind(this));
		}
	}

	drawMap(x: number, y: number, contents: number) {
		let color = contents == 0 ? "white" : "black";
		this.display.draw(x, y, "", "", color)
	}

	drawDoor(x: number, y: number) {
		this.display.draw(x, y, "", "", "red");
	};
}