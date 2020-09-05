import { MapObject, Game } from "./game";
import { MyColor, Point } from "./utils";

export class Enemy implements MapObject {

    char: string = "E";
    fg: MyColor = MyColor.White;
    bg: MyColor = MyColor.Black;
    type: string = "enemy";
    occlude: boolean = false;
    position: Point = new Point();

    bag: Array<MapObject>;

    constructor() {
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