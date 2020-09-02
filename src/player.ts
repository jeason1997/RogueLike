import { IS_WEB } from "./main";
import { Point, MyColor } from "./utils";
import { Game, MapObject } from "./game";

export class Player implements MapObject {

    char: string = "@";
    fg: MyColor = MyColor.White;
    bg: MyColor = MyColor.Black;
    type: string = "player";
    occlude: boolean = false;
    position: Point = new Point();

    bag: Array<MapObject>;

    constructor() {
        if (IS_WEB) {
            window.addEventListener("keydown", this.webKeyDown.bind(this));
        } else {
            process.stdin.on("keypress", this.ttyKeyDown.bind(this));
        }

        this.bag = new Array<MapObject>();
    }

    webKeyDown(e: KeyboardEvent) {
        var x = 0;
        var y = 0;
        x += (e.key == "a" || e.key == "ArrowLeft") ? -1 : 0;
        x += (e.key == "d" || e.key == "ArrowRight") ? 1 : 0;
        y += (e.key == "w" || e.key == "ArrowUp") ? -1 : 0;
        y += (e.key == "s" || e.key == "ArrowDown") ? 1 : 0;

        this.move(x, y);
    }

    ttyKeyDown(ch: string, key: any) {
        var x = 0;
        var y = 0;
        x += (key.name == "a" || key.name == "left") ? -1 : 0;
        x += (key.name == "d" || key.name == "right") ? 1 : 0;
        y += (key.name == "w" || key.name == "up") ? -1 : 0;
        y += (key.name == "s" || key.name == "down") ? 1 : 0;

        this.move(x, y);
    }

    move(x: number, y: number) {
        var newPos = this.position.add(new Point(x, y));

        if (!Game.Instance.mapData.get(newPos.x, newPos.y).occlude) {
            this.position = newPos;

            this.bag.forEach(item => {
                item.position = this.position;
            });

            Game.Instance.rendering();
        }
    }

    give(obj: MapObject){
        this.bag.push(obj);
    }
}