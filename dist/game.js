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
exports.Game = void 0;
var ROT = __importStar(require("rot-js"));
var rot_js_1 = require("rot-js");
var rot_js_2 = require("rot-js");
var rot_js_3 = require("rot-js");
var Global = __importStar(require("./main"));
var utils_1 = require("./utils");
var player_1 = require("./player");
var Game = /** @class */ (function () {
    function Game() {
        this.display = new rot_js_1.Display({
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
        this.player = new player_1.Player();
        this.player.position = new utils_1.Point(this.display._options.width / 2, this.display._options.height / 2);
        this.mapData = new utils_1.Array2D(this.display._options.width, this.display._options.height);
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
        this.generatorMap();
        this.updateMap();
    };
    Game.prototype.updateMap = function () {
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
    };
    Game.prototype.generatorMap = function () {
        var _this = this;
        //ROT.RNG.setSeed(1234);
        var map = new rot_js_3.Map.Digger(this.display._options.width, this.display._options.height);
        map.create(function (x, y, contents) {
            _this.mapData.set(x, y, contents);
        });
        /* var rooms = map.getRooms();
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            room.getDoors(this.drawDoor.bind(this));
        } */
    };
    //计算光照遮挡
    Game.prototype.lightPasses = function (x, y) {
        return this.mapData.get(x, y) == 0;
    };
    Game.prototype.drawMap = function (x, y, contents) {
        var color = contents == 0 ? "black" : "white";
        this.display.draw(x, y, "", "", color);
    };
    Game.prototype.drawDoor = function (x, y) {
        this.display.draw(x, y, "", "", "red");
    };
    ;
    Game.prototype.drawFov = function (x, y, r, visibility) {
        var c = rot_js_2.Color.toRGB([0, (255 - r * 20) - (1 - visibility) * 40, 0]);
        var color = (this.mapData.get(x, y) ? "gray" : c);
        this.display.draw(x, y, "", "", color);
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map