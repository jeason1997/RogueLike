"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2D = exports.MyColor = exports.Point = void 0;
var rot_js_1 = require("rot-js");
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (p) {
        return new Point(this.x + p.x, this.y + p.y);
    };
    Point.prototype.sub = function (p) {
        return new Point(this.x - p.x, this.y - p.y);
    };
    return Point;
}());
exports.Point = Point;
var MyColor = /** @class */ (function () {
    function MyColor(arg1, arg2, arg3) {
        this._r = 0;
        this._g = 0;
        this._b = 0;
        this.r = arg1 || 0;
        this.g = arg2 || 0;
        this.b = arg3 || 0;
    }
    Object.defineProperty(MyColor.prototype, "r", {
        get: function () { return this._r; },
        set: function (v) { this._r = Math.round(v); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyColor.prototype, "g", {
        get: function () { return this._g; },
        set: function (v) { this._g = Math.round(v); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyColor.prototype, "b", {
        get: function () { return this._b; },
        set: function (v) { this._b = Math.round(v); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyColor.prototype, "string", {
        get: function () { return rot_js_1.Color.toRGB([this.r, this.g, this.b]); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyColor.prototype, "array", {
        get: function () { return [this.r, this.g, this.b]; },
        enumerable: false,
        configurable: true
    });
    MyColor.prototype.add = function (color) {
        var r = this.r + color.r;
        var g = this.g + color.g;
        var b = this.b + color.b;
        return new MyColor(r, g, b);
    };
    MyColor.prototype.multiply = function (color) {
        var r = this.r * color.r / 255.0;
        var g = this.g * color.g / 255.0;
        var b = this.b * color.b / 255.0;
        return new MyColor(r, g, b);
    };
    MyColor.Red = new MyColor(255, 0, 0);
    MyColor.Green = new MyColor(0, 255, 0);
    MyColor.Blue = new MyColor(0, 0, 255);
    MyColor.White = new MyColor(255, 255, 255);
    MyColor.Black = new MyColor(0, 0, 0);
    MyColor.Gray = new MyColor(128, 128, 128);
    MyColor.LightGray = new MyColor(211, 211, 211);
    MyColor.DarkGray = new MyColor(169, 169, 169);
    MyColor.Yellow = new MyColor(255, 255, 0);
    MyColor.Peru = new MyColor(205, 133, 63);
    MyColor.SaddleBrown = new MyColor(139, 69, 19);
    return MyColor;
}());
exports.MyColor = MyColor;
var Array2D = /** @class */ (function () {
    /**
     * 初始化数组
     */
    function Array2D(type, rows, columns, value) {
        this.my2DArray = new Array();
        this.type = type;
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns, value == undefined ? new type() : value);
    }
    /**
     * 取数组中的值
     */
    Array2D.prototype.get = function (rows, columns) {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return new this.type();
        }
        return this.my2DArray[rows][columns];
    };
    /**
     * 为数组赋值
     */
    Array2D.prototype.set = function (rows, columns, value) {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return;
        }
        this.my2DArray[rows][columns] = value;
    };
    /**
     * 初始化行数
     */
    Array2D.prototype.initRows = function (rows) {
        if (rows < 1) {
            return;
        }
        for (var i = 0; i < rows; i++) {
            this.my2DArray.push(new Array());
        }
    };
    /**
     * 初始化列数
     */
    Array2D.prototype.initColumns = function (columns, value) {
        if (columns < 1) {
            return;
        }
        for (var i = 0; i < this.my2DArray.length; i++) {
            for (var j = 0; j < columns; j++) {
                this.my2DArray[i].push(value);
            }
        }
    };
    /**
     * 获取数组
     */
    Array2D.prototype.getArray = function () {
        return this.my2DArray;
    };
    return Array2D;
}());
exports.Array2D = Array2D;
//# sourceMappingURL=utils.js.map