import * as ROT from 'rot-js';
import { Display, Lighting } from "rot-js";
import { Color } from "rot-js";
import { Map } from "rot-js";
import Canvas from 'rot-js/lib/display/canvas';
import * as Global from './main';
import { Array2D, Point, MyColor } from './utils';
import { Player } from './player';
import FOV from 'rot-js/lib/fov/fov';
import { Room } from 'rot-js/lib/map/features';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import { cpuUsage } from 'process';
import { Light } from './ligth';

export class MapObject {
	char: string = "";
	fg: MyColor = MyColor.Black;
	bg: MyColor = MyColor.Black;
	type: string = "";
	occlude: boolean = false;
	position: Point = new Point();
}

export class Wall implements MapObject {
	type: string = "wall";
	occlude = true;
	char: string = "#";
	fg: MyColor = MyColor.DarkGray;
	bg: MyColor = MyColor.Gray;
	position: Point = new Point();
}

export class Floor implements MapObject {
	type: string = "floor";
	occlude = false;
	char: string = ".";
	fg: MyColor = MyColor.Peru;
	bg: MyColor = MyColor.SaddleBrown;
	position: Point = new Point();
}

export class Door implements MapObject {
	char: string = "+";
	fg: MyColor = MyColor.Blue;
	bg: MyColor = MyColor.Black;
	type: string = "door";
	occlude: boolean = true;
	position: Point = new Point();

	isOpen = false;

	interaction() {
		if (this.isOpen) {
			this.isOpen = false;
			this.occlude = true;
			this.char = "+";
		} else {
			this.isOpen = true;
			this.occlude = false;
			this.char = "-";
		}
	}
}

export class Game {

	private static instance: Game;
	public static get Instance(): Game {
		if (this.instance == null)
			this.instance = new Game();
		return this.instance;
	}

	public display: Display;
	public player!: Player;
	public lights!: Array<Light>;
	public mapData!: Array2D<MapObject>;
	public rooms!: Array<Room>;

	constructor() {
		this.display = new Display({
			layout: Global.IS_WEB ? 'rect' : 'term',
			//字体大小，在浏览器canvas模式下才有用，nodejs下是取决于终端到字体大小的
			fontSize: 30,
			//tileWidth: 50,
			//spacing: 0.8,
			fontFamily: "pix",
			forceSquareRatio: true,
			bg: "black",
			width: Global.IS_WEB ? 60 : process.stdout.columns,
			height: Global.IS_WEB ? 40 : process.stdout.rows,
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

		ROT.RNG.setSeed(12345);
		this.generatorMap2();
		this.initLight();
		this.initPlayer();
		this.rendering();
	}

	rendering() {

		var ambientLight = new MyColor(100, 100, 100);

		var lightData = new Array2D(MyColor, this.display._options.width, this.display._options.height);
		var finalBgData = new Array2D(MyColor, this.display._options.width, this.display._options.height);

		this.lights.forEach(light => {
			light.update();
			var data = light.lightData;
			for (let x = 0; x < lightData.rows; x++) {
				for (let y = 0; y < lightData.columns; y++) {
					lightData.set(x, y, lightData.get(x, y).add(data.get(x, y)));
				}
			}
		});

		// draw map
		for (var x = 0; x < this.mapData.rows; x++) {
			for (var y = 0; y < this.mapData.columns; y++) {
				var o = this.mapData.get(x, y);
				var light = ambientLight.add(lightData.get(x, y));
				var finalFg = o.fg.multiply(light);
				var finalBg = o.bg.multiply(light);
				finalBgData.set(x, y, finalBg);
				this.display.draw(x, y, o.char, finalFg.string, finalBg.string);
			}
		}

		//draw light
		this.lights.forEach(light => {
			var x = light.position.x;
			var y = light.position.y;
			this.display.draw(x, y, light.char, light.fg.string, finalBgData.get(x, y).string);
		});

		//draw fov
		//this.fov.compute(this.player.position.x, this.player.position.y, 10, this.drawFov.bind(this));

		//draw player
		{
			var x = this.player.position.x;
			var y = this.player.position.y;
			this.display.draw(x, y, this.player.char, this.player.fg.string, finalBgData.get(x, y).string);
		}
	}

	generatorMap2() {
		this.mapData = new Array2D(MapObject, this.display._options.width, this.display._options.height);

		var map = new Map.Cellular(this.display._options.width, this.display._options.height)
			.randomize(0.5);

		for (var i = 0; i < 4; i++) map.create();

		map.connect((x, y, contents) => {
			var o = contents == 1 ? new Floor() : new Wall();
			o.position = new Point(x, y);
			this.mapData.set(x, y, o);
		}, 0, () => { });
	}

	generatorMap() {
		this.mapData = new Array2D(MapObject, this.display._options.width, this.display._options.height);

		var map = new Map.Digger(this.display._options.width, this.display._options.height);
		map.create((x, y, contents) => {
			var o = contents == 0 ? new Floor() : new Wall();
			o.position = new Point(x, y);
			this.mapData.set(x, y, o);
		});

		this.rooms = map.getRooms();
		for (var i = 0; i < this.rooms.length; i++) {
			var room = this.rooms[i];
			//room.getDoors(this.drawDoor.bind(this));
		} 
	}

	initPlayer() {
		//var room = this.rooms[0];
		//var c = room.getCenter();
		this.player = new Player();
		this.player.position = new Point(15, 15);
		//this.player.position = new Point(c[0], c[1]);

		var flashLight = new Light(MyColor.Yellow, this.player.position, 5, 1);
		this.player.give(flashLight);
		this.lights.push(flashLight);
	}

	initLight() {
		this.lights = new Array<Light>();
		var l1 = new Light(MyColor.Green, new Point(14, 12));
		var l2 = new Light(MyColor.Red, new Point(45, 25));
		this.lights.push(l1, l2);
	}

	drawFov(x: number, y: number, r: number, visibility: number) {
		var c = Color.toRGB([0, (255 - r * 20) - (1 - visibility) * 40, 0]);
		var color = (this.mapData.get(x, y) ? "gray" : c);
		this.display.draw(x, y, "", "", color);
	}
}