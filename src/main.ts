//@ts-nocheck

import { Game } from "./game";

export const IS_WEB = typeof window != 'undefined';

if (IS_WEB) {
	//init
	var node = document.getElementById("startgame");
	node?.parentNode?.removeChild(node);
	new Game().run();
	GAME_INIT = true;

	document.addEventListener("keydown", keydown);

	function keydown(event: KeyboardEvent) {
		if (event.key == 'F11') {
			if (IsFullScreenCurrently())
				GoOutFullscreen();
			else
				GoInFullscreen(document.getElementById("root"));
		}
	};

	//https://usefulangle.com/post/12/javascript-going-fullscreen-is-rare
	/* Get into full screen */
	function GoInFullscreen(element) {
		if (element.requestFullscreen)
			element.requestFullscreen();
		else if (element.mozRequestFullScreen)
			element.mozRequestFullScreen();
		else if (element.webkitRequestFullscreen)
			element.webkitRequestFullscreen();
		else if (element.msRequestFullscreen)
			element.msRequestFullscreen();
	}

	/* Get out of full screen */
	function GoOutFullscreen() {
		if (document.exitFullscreen)
			document.exitFullscreen();
		else if (document.mozCancelFullScreen)
			document.mozCancelFullScreen();
		else if (document.webkitExitFullscreen)
			document.webkitExitFullscreen();
		else if (document.msExitFullscreen)
			document.msExitFullscreen();
	}

	/* Is currently in full screen or not */
	function IsFullScreenCurrently() {
		var full_screen_element = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;

		// If no element is in full-screen
		if (full_screen_element === null)
			return false;
		else
			return true;
	}
}
else {
	new Game().run();
}