"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Light = void 0;
var rot_js_1 = require("rot-js");
var utils_1 = require("./utils");
var game_1 = require("./game");
var Light = /** @class */ (function () {
    function Light(color, pos, range, passes) {
        if (range === void 0) { range = 12; }
        if (passes === void 0) { passes = 2; }
        this.char = "*";
        this.fg = utils_1.MyColor.White;
        this.bg = utils_1.MyColor.Black;
        this.type = "light";
        this.occlude = false;
        this.fov = new rot_js_1.FOV.PreciseShadowcasting(this.lightPasses.bind(this), {
            topology: 4
        });
        this.color = this.fg = color;
        this.range = range;
        this.passes = passes;
        this.lightData = new utils_1.Array2D(utils_1.MyColor, game_1.Game.Instance.display._options.width, game_1.Game.Instance.display._options.height);
        this.lighting = new rot_js_1.Lighting(this.reflectivity.bind(this), {
            range: this.range,
            passes: this.passes
        });
        this.lighting.setFOV(this.fov);
        this.lighting.setLight(pos.x, pos.y, this.color.array);
        this.position = pos;
    }
    Light.prototype.update = function () {
        var _this = this;
        this.lightData = new utils_1.Array2D(utils_1.MyColor, game_1.Game.Instance.display._options.width, game_1.Game.Instance.display._options.height);
        this.lighting.clearLights();
        this.lighting.setLight(this.position.x, this.position.y, this.color.array);
        this.lighting.compute(function (x, y, color) {
            _this.lightData.set(x, y, new utils_1.MyColor(color[0], color[1], color[2]));
        });
    };
    //计算光照遮挡
    Light.prototype.lightPasses = function (x, y) {
        return !game_1.Game.Instance.mapData.get(x, y).occlude;
    };
    /* prepare a lighting algorithm */
    Light.prototype.reflectivity = function (x, y) {
        return (game_1.Game.Instance.mapData.get(x, y).occlude ? 0 : 0.3);
    };
    return Light;
}());
exports.Light = Light;
//# sourceMappingURL=ligth.js.map