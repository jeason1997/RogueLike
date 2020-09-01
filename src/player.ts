import { IS_WEB } from "./main";
import { Point } from "./utils";
import { Game } from "./game";
import { POINT_CONVERSION_COMPRESSED } from "constants";

export class Player {

    position: Point = new Point();

    constructor() {
        if (IS_WEB) {
            window.addEventListener("keydown", this.onKeyDown.bind(this));
        } else {

        }
    }

    onKeyDown(e: KeyboardEvent) {
        var x = 0;
        var y = 0;
        x += (e.key == "a" || e.key == "ArrowLeft") ? -1 : 0;
        x += (e.key == "d" || e.key == "ArrowRight") ? 1 : 0;
        y += (e.key == "w" || e.key == "ArrowUp") ? -1 : 0;
        y += (e.key == "s" || e.key == "ArrowDonw") ? 1 : 0;

        var newPos = this.position.add(new Point(x, y));

        if (Game.Instance.mapData.get(newPos.x, newPos.y) == 0){
            this.position = newPos;
            Game.Instance.updateMap();
        }
    }
}