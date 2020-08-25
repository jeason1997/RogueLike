import * as ROT from 'rot-js';
import { CreateCallback } from 'rot-js/lib/map/map';

/* var d = new ROT.Display();
var o = d.getOptions();

document.body.appendChild(d.getContainer());

for (var i = 0; i < o.width; i++) {
	for (var j = 0; j < o.height; j++) {
		if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
			d.draw(i, j, "#", "gray", "black");
		} else {
			d.draw(i, j, ".", "#666", "black");
		}
	}
}
d.draw(o.width >> 1, o.height >> 1, "@", "blue", "yellow"); */

class MyDigger extends ROT.Map.Digger
{
	fuck(cb?: CreateCallback){
		console.log("create");
		this.create(cb);
	}
}

ROT.RNG.setSeed(1234);
var map = new MyDigger(50, 50);
var display = new ROT.Display({fontSize:8});
document.body.appendChild(display.getContainer());
map.fuck(display.DEBUG);

console.log("fuc you")
/* var drawDoor = function(x, y) {
    display.draw(x, y, "", "", "red");
}

var rooms = map.getRooms();
for (var i=0; i<rooms.length; i++) {
    var room = rooms[i];
    

	room.getDoors(drawDoor);
} */