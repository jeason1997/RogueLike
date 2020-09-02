import PreciseShadowcasting from "rot-js/lib/fov/precise-shadowcasting";
import { FOV, Lighting } from "rot-js";
import { Array2D, MyColor, Point } from "./utils";
import { Game, MapObject } from "./game";

export class Light implements MapObject {

    char: string = "*";
    fg: MyColor = MyColor.White;
    bg: MyColor = MyColor.Black;
    type: string = "light";
    occlude: boolean = false;

    private fov: PreciseShadowcasting;
    public lightData: Array2D<MyColor>;
    public lighting: Lighting;
    public range: number;
    public passes: number;
    public color: MyColor;
    public position: Point;

    constructor(color: MyColor, pos: Point, range: number = 12, passes = 2) {

        this.fov = new FOV.PreciseShadowcasting(this.lightPasses.bind(this), {
            topology: 4
        });

        this.color = this.fg = color;
        this.range = range;
        this.passes = passes;

        this.lightData = new Array2D(MyColor, Game.Instance.display._options.width, Game.Instance.display._options.height);

        this.lighting = new Lighting(this.reflectivity.bind(this),
            {
                range: this.range,
                passes: this.passes
            });

        this.lighting.setFOV(this.fov);
        this.lighting.setLight(pos.x, pos.y, this.color.array);
        this.position = pos;
    }


    update() {
        this.lightData = new Array2D(MyColor, Game.Instance.display._options.width, Game.Instance.display._options.height);
        this.lighting.clearLights();
        this.lighting.setLight(this.position.x, this.position.y, this.color.array);
        this.lighting.compute((x, y, color) => {
            this.lightData.set(x, y, new MyColor(color[0], color[1], color[2]));
        });
    }

    //计算光照遮挡
    lightPasses(x: number, y: number) {
        return !Game.Instance.mapData.get(x, y).occlude;
    }

    /* prepare a lighting algorithm */
    reflectivity(x: number, y: number) {
        return (Game.Instance.mapData.get(x, y).occlude ? 0 : 0.3);
    }
}