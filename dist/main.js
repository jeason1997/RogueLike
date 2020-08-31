"use strict";
//@ts-nocheck
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_WEB = void 0;
var game_1 = require("./game");
exports.IS_WEB = typeof window != 'undefined';
if (exports.IS_WEB) {
    //init
    var node = document.getElementById("startgame");
    (_a = node === null || node === void 0 ? void 0 : node.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(node);
    new game_1.Game().run();
    document.addEventListener("keydown", keydown);
    function keydown(event) {
        if (event.key == 'F11') {
            if (IsFullScreenCurrently())
                GoOutFullscreen();
            else
                GoInFullscreen(document.getElementById("root"));
        }
    }
    ;
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
    new game_1.Game().run();
}
//# sourceMappingURL=main.js.map