import { Color } from "rot-js";

export class Point {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(p: Point): Point {
        return new Point(this.x + p.x, this.y + p.y);
    }

    sub(p: Point) {
        return new Point(this.x - p.x, this.y - p.y);
    }
}

export class MyColor {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;

    public get r(): number { return this._r; }
    public get g(): number { return this._g; }
    public get b(): number { return this._b; }

    public set r(v: number) { this._r = Math.round(v) }
    public set g(v: number) { this._g = Math.round(v) }
    public set b(v: number) { this._b = Math.round(v) }

    public get string(): string { return Color.toRGB([this.r, this.g, this.b]); }
    public get array(): [number, number, number] { return [this.r, this.g, this.b]; }

    constructor();
    constructor(r: number, g: number, b: number);
    constructor(arg1?: number, arg2?: number, arg3?: number) {
        this.r = arg1 || 0;
        this.g = arg2 || 0;
        this.b = arg3 || 0;
    }

    public add(color: MyColor): MyColor {
        var r = this.r + color.r;
        var g = this.g + color.g;
        var b = this.b + color.b;
        return new MyColor(r, g, b);
    }

    public multiply(color: MyColor): MyColor {
        var r = this.r * color.r / 255.0;
        var g = this.g * color.g / 255.0;
        var b = this.b * color.b / 255.0;
        return new MyColor(r, g, b);
    }

    public static Red: MyColor = new MyColor(255, 0, 0);
    public static Green: MyColor = new MyColor(0, 255, 0);
    public static Blue: MyColor = new MyColor(0, 0, 255);
    public static White: MyColor = new MyColor(255, 255, 255);
    public static Black: MyColor = new MyColor(0, 0, 0);
    public static Gray: MyColor = new MyColor(128, 128, 128);
    public static LightGray: MyColor = new MyColor(211, 211, 211);
    public static DarkGray: MyColor = new MyColor(169, 169, 169);
    public static Yellow: MyColor = new MyColor(255, 255, 0);
    public static Peru: MyColor = new MyColor(205, 133, 63);
    public static SaddleBrown: MyColor = new MyColor(139, 69, 19);
}

export class Array2D<T> {

    private my2DArray: Array<Array<T>>;
    private type: any;
    public rows: number;
    public columns: number;

    /**
     * 初始化数组
     */
    public constructor(type: (new () => T), rows: number, columns: number, value?: T) {
        this.my2DArray = new Array<Array<T>>();
        this.type = type;
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns, value == undefined ? new type() : value);
    }

    /**
     * 取数组中的值
     */
    public get(rows: number, columns: number): T {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return new this.type();
        }
        return this.my2DArray[rows][columns];
    }

    /**
     * 为数组赋值
     */
    public set(rows: number, columns: number, value: T): void {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return;
        }
        this.my2DArray[rows][columns] = value;
    }

    /**
     * 初始化行数
     */
    private initRows(rows: number): void {
        if (rows < 1) {
            return;
        }
        for (let i = 0; i < rows; i++) {
            this.my2DArray.push(new Array<T>());
        }
    }

    /**
     * 初始化列数
     */
    private initColumns(columns: number, value: T): void {
        if (columns < 1) {
            return;
        }
        for (let i = 0; i < this.my2DArray.length; i++) {
            for (let j = 0; j < columns; j++) {
                this.my2DArray[i].push(value);
            }
        }
    }

    /**
     * 获取数组
     */
    public getArray(): Array<Array<T>> {
        return this.my2DArray;
    }
}