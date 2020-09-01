"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2D = exports.Point = void 0;
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
var Array2D = /** @class */ (function () {
    /**
     * 初始化数组
     */
    function Array2D(rows, columns, value) {
        if (value === void 0) { value = 0; }
        this.my2DArray = new Array();
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns, value);
    }
    /**
     * 取数组中的值
     */
    Array2D.prototype.get = function (rows, columns) {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return 0;
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