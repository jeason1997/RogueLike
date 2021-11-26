"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
var game_1 = require("./game");
var utils_1 = require("./utils");
var Enemy = /** @class */ (function () {
    function Enemy() {
        this.char = "E";
        this.fg = utils_1.MyColor.White;
        this.bg = utils_1.MyColor.Black;
        this.type = "enemy";
        this.occlude = false;
        this.position = new utils_1.Point();
        this.bag = new Array();
    }
    Enemy.prototype.webKeyDown = function (e) {
        var x = 0;
        var y = 0;
        x += (e.key == "a" || e.key == "ArrowLeft") ? -1 : 0;
        x += (e.key == "d" || e.key == "ArrowRight") ? 1 : 0;
        y += (e.key == "w" || e.key == "ArrowUp") ? -1 : 0;
        y += (e.key == "s" || e.key == "ArrowDown") ? 1 : 0;
        this.move(x, y);
    };
    Enemy.prototype.move = function (x, y) {
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
    Enemy.prototype.give = function (obj) {
        this.bag.push(obj);
    };
    return Enemy;
}());
exports.Enemy = Enemy;
//# sourceMappingURL=enemy.js.map