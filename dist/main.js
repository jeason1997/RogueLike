"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var rot_js_1 = require("rot-js");
var rot_js_2 = require("rot-js");
var WEB = typeof window != 'undefined';
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.run = function () {
        var d = new rot_js_1.Display({
            width: 80,
            height: 30,
            layout: WEB ? 'rect' : 'term',
        });
        if (WEB) {
            document.body.appendChild(d.getContainer());
            //d._options.width = document.body.clientHeight / d._options.fontSize;
            //d._options.height = document.body.clientWidth / d._options.fontSize;
        }
        else {
            //d._options.width = process.stdout.rows;
            //d._options.height = process.stdout.columns;
        }
        for (var i = 0; i < d._options.width; i++) {
            for (var j = 0; j < d._options.height; j++) {
                if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
                    d.draw(i, j, "#", "black", "gray");
                }
                else {
                    d.draw(i, j, ".", "#666", "black");
                }
            }
        }
        var t = 255 / d._options.height;
        for (var i = 0; i < d._options.height; i++) {
            var fg = rot_js_2.Color.toRGB([i * t, i * t, i * t]);
            var bg = rot_js_2.Color.toRGB([255 - i * t, 255 - i * t, 255 - i * t]);
            //d.drawText(0, i, `%c{${fg}}%b{${bg}}Hello ${i}`);
            d.draw(0, i, ['`', '.'], 'yellow', 'black');
        }
        d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "blakc");
    };
    return Main;
}());
exports.Main = Main;
new Main().run();
