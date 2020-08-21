import * as ROT from 'rot-js';

var d = new ROT.Display();
var o = d.getOptions();

document.body.appendChild(d.getContainer());

for (var i=0; i<o.width; i++) {
	for (var j=0; j<o.height; j++) {
		if (!i || !j || i+1 == o.width || j+1 == o.height) {
			d.draw(i, j, "#", "gray", "black");
		} else {
			d.draw(i, j, ".", "#666", "black");
		}
	}
}
d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod", "black");