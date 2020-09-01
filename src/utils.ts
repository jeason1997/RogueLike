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

export class Array2D {

    private my2DArray: Array<Array<number>> = new Array<Array<number>>();
    public rows: number;
    public columns: number;

    /**
     * 初始化数组
     */
    public constructor(rows: number, columns: number, value: number = 0) {
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns, value);
    }
    /**
     * 取数组中的值
     */
    public get(rows: number, columns: number): number {
        if (rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns) {
            return 0;
        }
        return this.my2DArray[rows][columns];
    }
    /**
     * 为数组赋值
     */
    public set(rows: number, columns: number, value: number): void {
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
            this.my2DArray.push(new Array<number>());
        }
    }
    /**
     * 初始化列数
     */
    private initColumns(columns: number, value: number): void {
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
    public getArray(): Array<Array<number>> {
        return this.my2DArray;
    }
}