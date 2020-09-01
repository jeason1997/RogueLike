"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var main_1 = require("./main");
var utils_1 = require("./utils");
var game_1 = require("./game");
var Player = /** @class */ (function () {
    function Player() {
        this.position = new utils_1.Point();
        if (main_1.IS_WEB) {
            window.addEventListener("keydown", this.onKeyDown.bind(this));
        }
        else {
        }
    }
    Player.prototype.onKeyDown = function (e) {
        var x = 0;
        var y = 0;
        x += (e.key == "a" || e.key == "ArrowLeft") ? -1 : 0;
        x += (e.key == "d" || e.key == "ArrowRight") ? 1 : 0;
        y += (e.key == "w" || e.key == "ArrowUp") ? -1 : 0;
        y += (e.key == "s" || e.key == "ArrowDonw") ? 1 : 0;
        var newPos = this.position.add(new utils_1.Point(x, y));
        if (game_1.Game.Instance.mapData.get(newPos.x, newPos.y) == 0) {
            this.position = newPos;
            game_1.Game.Instance.updateMap();
        }
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map