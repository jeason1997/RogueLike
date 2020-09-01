import * as ROT from 'rot-js';
import { Display } from "rot-js";
import { Color } from "rot-js";
import { Map } from "rot-js";
import Canvas from 'rot-js/lib/display/canvas';
import * as Global from './main';
import { Array2D, Point } from './utils';
import { Player } from './player';
import FOV from 'rot-js/lib/fov/fov';


export class Game {

	private static instance: Game;
	public static get Instance(): Game {
		if (this.instance == null)
			this.instance = new Game();
		return this.instance;
	}

	private display: Display;
	public player: Player;
	public mapData: Array2D;

	constructor() {

		this.display = new Display({
			layout: Global.IS_WEB ? 'rect' : 'term',
			//字体大小，在浏览器canvas模式下才有用，nodejs下是取决于终端到字体大小的
			fontSize: 36,
			//tileWidth: 50,
			//spacing: 0.8,
			fontFamily: "pix16",
			forceSquareRatio: true,
			bg: "black",
			width: Global.IS_WEB ? 50 : process.stdout.columns,
			height: Global.IS_WEB ? 30 : process.stdout.rows,
		});

		this.player = new Player();
		this.player.position = new Point(this.display._options.width / 2, this.display._options.height / 2);
		this.mapData = new Array2D(this.display._options.width, this.display._options.height);
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
		this.updateMap();
	}

	updateMap() {
		//draw map
		for (var x = 0; x < this.mapData.rows; x++) {
			for (var y = 0; y < this.mapData.columns; y++) {
				this.drawMap(x, y, this.mapData.get(x, y));
			}
		}
		
		//draw fov
		var fov = new ROT.FOV.PreciseShadowcasting(this.lightPasses.bind(this));
		fov.compute(this.player.position.x, this.player.position.y, 10, this.drawFov.bind(this));

		//draw player
		this.display.draw(this.player.position.x, this.player.position.y, "@", "white", "black");
	}

	generatorMap() {
		//ROT.RNG.setSeed(1234);
		var map = new Map.Digger(this.display._options.width, this.display._options.height);
		map.create((x, y, contents) => {
			this.mapData.set(x, y, contents);
		});

		/* var rooms = map.getRooms();
		for (var i = 0; i < rooms.length; i++) {
			var room = rooms[i];
			room.getDoors(this.drawDoor.bind(this));
		} */
	}

	//计算光照遮挡
	lightPasses(x: number, y: number) {
		return this.mapData.get(x, y) == 0;
	}

	drawMap(x: number, y: number, contents: number) {
		let color = contents == 0 ? "black" : "white";
		this.display.draw(x, y, "", "", color)
	}

	drawDoor(x: number, y: number) {
		this.display.draw(x, y, "", "", "red");
	};

	drawFov(x: number, y: number, r: number, visibility: number) {
		var c = Color.toRGB([0, (255 - r * 20) - (1 - visibility) * 40, 0]);
		var color = (this.mapData.get(x, y) ? "gray" : c);
		this.display.draw(x, y, "", "", color);
	}
}