"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var main_1 = require("./main");
var utils_1 = require("./utils");
var game_1 = require("./game");
var Player = /** @class */ (function () {
    function Player() {
        this.char = "@";
        this.fg = utils_1.MyColor.White;
        this.bg = utils_1.MyColor.Black;
        this.type = "player";
        this.occlude = false;
        this.position = new utils_1.Point();
        if (main_1.IS_WEB) {
            window.addEventListener("keydown", this.webKeyDown.bind(this));
        }
        else {
            process.stdin.on("keypress", this.ttyKeyDown.bind(this));
        }
        this.bag = new Array();
    }
    Player.prototype.webKeyDown = function (e) {
        var x = 0;
        var y = 0;
        x += (e.key == "a" || e.key == "ArrowLeft") ? -1 : 0;
        x += (e.key == "d" || e.key == "ArrowRight") ? 1 : 0;
        y += (e.key == "w" || e.key == "ArrowUp") ? -1 : 0;
        y += (e.key == "s" || e.key == "ArrowDown") ? 1 : 0;
        this.move(x, y);
    };
    Player.prototype.ttyKeyDown = function (ch, key) {
        var x = 0;
        var y = 0;
        x += (key.name == "a" || key.name == "left") ? -1 : 0;
        x += (key.name == "d" || key.name == "right") ? 1 : 0;
        y += (key.name == "w" || key.name == "up") ? -1 : 0;
        y += (key.name == "s" || key.name == "down") ? 1 : 0;
        this.move(x, y);
    };
    Player.prototype.move = function (x, y) {
        var _this = this;
        var newPos = this.position.add(new utils_1.Point(x, y));
        if (!game_1.Game.Instance.mapData.get(newPos.x, newPos.y).occlude) {
            this.position = newPos;
            this.bag.forEach(function (item) {
                item.position = _this.position;
            });
            game_1.Game.Instance.rendering();
        }
    };
    Player.prototype.give = function (obj) {
        this.bag.push(obj);
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map