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
exports.Main = void 0;
var ROT = __importStar(require("rot-js"));
var test_1 = require("./test");
var WEB = typeof window != 'undefined';
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.run = function () {
        var d = new ROT.Display({
            width: 11,
            height: 5,
            layout: WEB ? 'rect' : 'term'
        });
        if (WEB) {
            document.body.appendChild(d.getContainer());
        }
        for (var i = 0; i < d._options.width; i++) {
            for (var j = 0; j < d._options.height; j++) {
                if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
                    d.draw(i, j, "#", "gray", "black");
                    d.draw(i, j, ".", "#666", "black");
                }
            }
        }
        d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "black");
        d.drawText(0, 0, new test_1.Test().Do("fuck"));
    };
    return Main;
}());
exports.Main = Main;
new Main().run();
