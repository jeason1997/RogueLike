"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.Door = exports.Floor = exports.Wall = exports.MapObject = void 0;
var ROT = __importStar(require("rot-js"));
var rot_js_1 = require("rot-js");
var rot_js_2 = require("rot-js");
var rot_js_3 = require("rot-js");
var Global = __importStar(require("./main"));
var utils_1 = require("./utils");
var player_1 = require("./player");
var ligth_1 = require("./ligth");
var MapObject = /** @class */ (function () {
    function MapObject() {
        this.char = "";
        this.fg = utils_1.MyColor.Black;
        this.bg = utils_1.MyColor.Black;
        this.type = "";
        this.occlude = false;
        this.position = new utils_1.Point();
    }
    return MapObject;
}());
exports.MapObject = MapObject;
var Wall = /** @class */ (function () {
    function Wall() {
        this.type = "wall";
        this.occlude = true;
        this.char = "#";
        this.fg = utils_1.MyColor.DarkGray;
        this.bg = utils_1.MyColor.Gray;
        this.position = new utils_1.Point();
    }
    return Wall;
}());
exports.Wall = Wall;
var Floor = /** @class */ (function () {
    function Floor() {
        this.type = "floor";
        this.occlude = false;
        this.char = ".";
        this.fg = utils_1.MyColor.Peru;
        this.bg = utils_1.MyColor.SaddleBrown;
        this.position = new utils_1.Point();
    }
    return Floor;
}());
exports.Floor = Floor;
var Door = /** @class */ (function () {
    function Door() {
        this.char = "+";
        this.fg = utils_1.MyColor.Blue;
        this.bg = utils_1.MyColor.Black;
        this.type = "door";
        this.occlude = true;
        this.position = new utils_1.Point();
        this.isOpen = false;
    }
    Door.prototype.interaction = function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.occlude = true;
            this.char = "+";
        }
        else {
            this.isOpen = true;
            this.occlude = false;
            this.char = "-";
        }
    };
    return Door;
}());
exports.Door = Door;
var Game = /** @class */ (function () {
    function Game() {
        this.display = new rot_js_1.Display({
            layout: Global.IS_WEB ? 'rect' : 'term',
            //字体大小，在浏览器canvas模式下才有用，nodejs下是取决于终端到字体大小的
            fontSize: 30,
            //tileWidth: 50,
            //spacing: 0.8,
            fontFamily: "pix16",
            forceSquareRatio: true,
            bg: "black",
            width: Global.IS_WEB ? 60 : process.stdout.columns,
            height: Global.IS_WEB ? 40 : process.stdout.rows,
        });
    }
    Object.defineProperty(Game, "Instance", {
        get: function () {
            if (this.instance == null)
                this.instance = new Game();
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.run = function () {
        if (Global.IS_WEB) {
            document.body.appendChild(this.display.getContainer());
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
    };
    Game.prototype.rendering = function () {
        var _this = this;
        var ambientLight = new utils_1.MyColor(100, 100, 100);
        var lightData = new utils_1.Array2D(utils_1.MyColor, this.display._options.width, this.display._options.height);
        var finalBgData = new utils_1.Array2D(utils_1.MyColor, this.display._options.width, this.display._options.height);
        this.lights.forEach(function (light) {
            light.update();
            var data = light.lightData;
            for (var x_1 = 0; x_1 < lightData.rows; x_1++) {
                for (var y_1 = 0; y_1 < lightData.columns; y_1++) {
                    lightData.set(x_1, y_1, lightData.get(x_1, y_1).add(data.get(x_1, y_1)));
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
        this.lights.forEach(function (light) {
            var x = light.position.x;
            var y = light.position.y;
            _this.display.draw(x, y, light.char, light.fg.string, finalBgData.get(x, y).string);
        });
        //draw fov
        //this.fov.compute(this.player.position.x, this.player.position.y, 10, this.drawFov.bind(this));
        //draw player
        {
            var x = this.player.position.x;
            var y = this.player.position.y;
            this.display.draw(x, y, this.player.char, this.player.fg.string, finalBgData.get(x, y).string);
        }
    };
    Game.prototype.generatorMap2 = function () {
        var _this = this;
        this.mapData = new utils_1.Array2D(MapObject, this.display._options.width, this.display._options.height);
        var map = new rot_js_3.Map.Cellular(this.display._options.width, this.display._options.height)
            .randomize(0.5);
        for (var i = 0; i < 4; i++)
            map.create();
        map.connect(function (x, y, contents) {
            var o = contents == 1 ? new Floor() : new Wall();
            o.position = new utils_1.Point(x, y);
            _this.mapData.set(x, y, o);
        }, 0, function () { });
    };
    /* generatorMap() {
        this.mapData = new Array2D(Number, this.display._options.width, this.display._options.height, 1);

        var map = new Map.Digger(this.display._options.width, this.display._options.height);
        map.create((x, y, contents) => {
            this.mapData.set(x, y, contents);
        });

        this.rooms = map.getRooms();
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            room.getDoors(this.drawDoor.bind(this));
        }
    } */
    Game.prototype.initPlayer = function () {
        //var room = this.rooms[0];
        //var c = room.getCenter();
        this.player = new player_1.Player();
        this.player.position = new utils_1.Point(15, 15);
        //this.player.position = new Point(c[0], c[1]);
        var flashLight = new ligth_1.Light(utils_1.MyColor.Yellow, this.player.position, 5);
        this.player.give(flashLight);
        this.lights.push(flashLight);
    };
    Game.prototype.initLight = function () {
        this.lights = new Array();
        var l1 = new ligth_1.Light(utils_1.MyColor.Green, new utils_1.Point(14, 12));
        var l2 = new ligth_1.Light(utils_1.MyColor.Red, new utils_1.Point(45, 25));
        this.lights.push(l1, l2);
    };
    Game.prototype.drawFov = function (x, y, r, visibility) {
        var c = rot_js_2.Color.toRGB([0, (255 - r * 20) - (1 - visibility) * 40, 0]);
        var color = (this.mapData.get(x, y) ? "gray" : c);
        this.display.draw(x, y, "", "", color);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map