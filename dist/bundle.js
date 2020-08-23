(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.ROT = {});
})(this, function (exports) {
  'use strict';
  /**
   * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
   * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
   */

  var FRAC = 2.3283064365386963e-10;
  /* 2^-32 */

  var RNG =
  /*#__PURE__*/
  function () {
    function RNG() {
      this._seed = 0;
      this._s0 = 0;
      this._s1 = 0;
      this._s2 = 0;
      this._c = 0;
    }

    var _proto = RNG.prototype;

    _proto.getSeed = function getSeed() {
      return this._seed;
    };
    /**
     * Seed the number generator
     */


    _proto.setSeed = function setSeed(seed) {
      seed = seed < 1 ? 1 / seed : seed;
      this._seed = seed;
      this._s0 = (seed >>> 0) * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s1 = seed * FRAC;
      seed = seed * 69069 + 1 >>> 0;
      this._s2 = seed * FRAC;
      this._c = 1;
      return this;
    };
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */


    _proto.getUniform = function getUniform() {
      var t = 2091639 * this._s0 + this._c * FRAC;
      this._s0 = this._s1;
      this._s1 = this._s2;
      this._c = t | 0;
      this._s2 = t - this._c;
      return this._s2;
    };
    /**
     * @param lowerBound The lower end of the range to return a value from, inclusive
     * @param upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */


    _proto.getUniformInt = function getUniformInt(lowerBound, upperBound) {
      var max = Math.max(lowerBound, upperBound);
      var min = Math.min(lowerBound, upperBound);
      return Math.floor(this.getUniform() * (max - min + 1)) + min;
    };
    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */


    _proto.getNormal = function getNormal(mean, stddev) {
      if (mean === void 0) {
        mean = 0;
      }

      if (stddev === void 0) {
        stddev = 1;
      }

      var u, v, r;

      do {
        u = 2 * this.getUniform() - 1;
        v = 2 * this.getUniform() - 1;
        r = u * u + v * v;
      } while (r > 1 || r == 0);

      var gauss = u * Math.sqrt(-2 * Math.log(r) / r);
      return mean + gauss * stddev;
    };
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */


    _proto.getPercentage = function getPercentage() {
      return 1 + Math.floor(this.getUniform() * 100);
    };
    /**
     * @returns Randomly picked item, null when length=0
     */


    _proto.getItem = function getItem(array) {
      if (!array.length) {
        return null;
      }

      return array[Math.floor(this.getUniform() * array.length)];
    };
    /**
     * @returns New array with randomized items
     */


    _proto.shuffle = function shuffle(array) {
      var result = [];
      var clone = array.slice();

      while (clone.length) {
        var _index = clone.indexOf(this.getItem(clone));

        result.push(clone.splice(_index, 1)[0]);
      }

      return result;
    };
    /**
     * @param data key=whatever, value=weight (relative probability)
     * @returns whatever
     */


    _proto.getWeightedValue = function getWeightedValue(data) {
      var total = 0;

      for (var _id in data) {
        total += data[_id];
      }

      var random = this.getUniform() * total;
      var id,
          part = 0;

      for (id in data) {
        part += data[id];

        if (random < part) {
          return id;
        }
      } // If by some floating-point annoyance we have
      // random >= total, just return the last id.


      return id;
    };
    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */


    _proto.getState = function getState() {
      return [this._s0, this._s1, this._s2, this._c];
    };
    /**
     * Set a previously retrieved state.
     */


    _proto.setState = function setState(state) {
      this._s0 = state[0];
      this._s1 = state[1];
      this._s2 = state[2];
      this._c = state[3];
      return this;
    };
    /**
     * Returns a cloned RNG
     */


    _proto.clone = function clone() {
      var clone = new RNG();
      return clone.setState(this.getState());
    };

    return RNG;
  }();

  var RNG$1 = new RNG().setSeed(Date.now());
  /**
   * @class Abstract display backend module
   * @private
   */

  var Backend =
  /*#__PURE__*/
  function () {
    function Backend() {}

    var _proto2 = Backend.prototype;

    _proto2.getContainer = function getContainer() {
      return null;
    };

    _proto2.setOptions = function setOptions(options) {
      this._options = options;
    };

    return Backend;
  }();

  var Canvas =
  /*#__PURE__*/
  function (_Backend) {
    _inheritsLoose(Canvas, _Backend);

    function Canvas() {
      var _this;

      _this = _Backend.call(this) || this;
      _this._ctx = document.createElement("canvas").getContext("2d");
      return _this;
    }

    var _proto3 = Canvas.prototype;

    _proto3.schedule = function schedule(cb) {
      requestAnimationFrame(cb);
    };

    _proto3.getContainer = function getContainer() {
      return this._ctx.canvas;
    };

    _proto3.setOptions = function setOptions(opts) {
      _Backend.prototype.setOptions.call(this, opts);

      var style = opts.fontStyle ? opts.fontStyle + " " : "";
      var font = style + " " + opts.fontSize + "px " + opts.fontFamily;
      this._ctx.font = font;

      this._updateSize();

      this._ctx.font = font;
      this._ctx.textAlign = "center";
      this._ctx.textBaseline = "middle";
    };

    _proto3.clear = function clear() {
      this._ctx.fillStyle = this._options.bg;

      this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    };

    _proto3.eventToPosition = function eventToPosition(x, y) {
      var canvas = this._ctx.canvas;
      var rect = canvas.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;
      x *= canvas.width / rect.width;
      y *= canvas.height / rect.height;

      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return [-1, -1];
      }

      return this._normalizedEventToPosition(x, y);
    };

    return Canvas;
  }(Backend);
  /**
   * Always positive modulus
   * @param x Operand
   * @param n Modulus
   * @returns x modulo n
   */


  function mod(x, n) {
    return (x % n + n) % n;
  }

  function clamp(val, min, max) {
    if (min === void 0) {
      min = 0;
    }

    if (max === void 0) {
      max = 1;
    }

    if (val < min) return min;
    if (val > max) return max;
    return val;
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
  /**
   * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
   * @param {string} template
   * @param {any} [argv]
   */


  function format(template) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var map = format.map;

    var replacer = function replacer(match, group1, group2, index) {
      if (template.charAt(index - 1) == "%") {
        return match.substring(1);
      }

      if (!args.length) {
        return match;
      }

      var obj = args[0];
      var group = group1 || group2;
      var parts = group.split(",");
      var name = parts.shift() || "";
      var method = map[name.toLowerCase()];

      if (!method) {
        return match;
      }

      obj = args.shift();
      var replaced = obj[method].apply(obj, parts);
      var first = name.charAt(0);

      if (first != first.toLowerCase()) {
        replaced = capitalize(replaced);
      }

      return replaced;
    };

    return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
  }

  format.map = {
    "s": "toString"
  };
  var util =
  /*#__PURE__*/
  Object.freeze({
    mod: mod,
    clamp: clamp,
    capitalize: capitalize,
    format: format
  });
  /**
   * @class Hexagonal backend
   * @private
   */

  var Hex =
  /*#__PURE__*/
  function (_Canvas) {
    _inheritsLoose(Hex, _Canvas);

    function Hex() {
      var _this2;

      _this2 = _Canvas.call(this) || this;
      _this2._spacingX = 0;
      _this2._spacingY = 0;
      _this2._hexSize = 0;
      return _this2;
    }

    var _proto4 = Hex.prototype;

    _proto4.draw = function draw(data, clearBefore) {
      var x = data[0],
          y = data[1],
          ch = data[2],
          fg = data[3],
          bg = data[4];
      var px = [(x + 1) * this._spacingX, y * this._spacingY + this._hexSize];

      if (this._options.transpose) {
        px.reverse();
      }

      if (clearBefore) {
        this._ctx.fillStyle = bg;

        this._fill(px[0], px[1]);
      }

      if (!ch) {
        return;
      }

      this._ctx.fillStyle = fg;
      var chars = [].concat(ch);

      for (var i = 0; i < chars.length; i++) {
        this._ctx.fillText(chars[i], px[0], Math.ceil(px[1]));
      }
    };

    _proto4.computeSize = function computeSize(availWidth, availHeight) {
      if (this._options.transpose) {
        availWidth += availHeight;
        availHeight = availWidth - availHeight;
        availWidth -= availHeight;
      }

      var width = Math.floor(availWidth / this._spacingX) - 1;
      var height = Math.floor((availHeight - 2 * this._hexSize) / this._spacingY + 1);
      return [width, height];
    };

    _proto4.computeFontSize = function computeFontSize(availWidth, availHeight) {
      if (this._options.transpose) {
        availWidth += availHeight;
        availHeight = availWidth - availHeight;
        availWidth -= availHeight;
      }

      var hexSizeWidth = 2 * availWidth / ((this._options.width + 1) * Math.sqrt(3)) - 1;
      var hexSizeHeight = availHeight / (2 + 1.5 * (this._options.height - 1));
      var hexSize = Math.min(hexSizeWidth, hexSizeHeight); // compute char ratio

      var oldFont = this._ctx.font;
      this._ctx.font = "100px " + this._options.fontFamily;
      var width = Math.ceil(this._ctx.measureText("W").width);
      this._ctx.font = oldFont;
      var ratio = width / 100;
      hexSize = Math.floor(hexSize) + 1; // closest larger hexSize
      // FIXME char size computation does not respect transposed hexes

      var fontSize = 2 * hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3))); // closest smaller fontSize

      return Math.ceil(fontSize) - 1;
    };

    _proto4._normalizedEventToPosition = function _normalizedEventToPosition(x, y) {
      var nodeSize;

      if (this._options.transpose) {
        x += y;
        y = x - y;
        x -= y;
        nodeSize = this._ctx.canvas.width;
      } else {
        nodeSize = this._ctx.canvas.height;
      }

      var size = nodeSize / this._options.height;
      y = Math.floor(y / size);

      if (mod(y, 2)) {
        /* odd row */
        x -= this._spacingX;
        x = 1 + 2 * Math.floor(x / (2 * this._spacingX));
      } else {
        x = 2 * Math.floor(x / (2 * this._spacingX));
      }

      return [x, y];
    };
    /**
     * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
     */


    _proto4._fill = function _fill(cx, cy) {
      var a = this._hexSize;
      var b = this._options.border;
      var ctx = this._ctx;
      ctx.beginPath();

      if (this._options.transpose) {
        ctx.moveTo(cx - a + b, cy);
        ctx.lineTo(cx - a / 2 + b, cy + this._spacingX - b);
        ctx.lineTo(cx + a / 2 - b, cy + this._spacingX - b);
        ctx.lineTo(cx + a - b, cy);
        ctx.lineTo(cx + a / 2 - b, cy - this._spacingX + b);
        ctx.lineTo(cx - a / 2 + b, cy - this._spacingX + b);
        ctx.lineTo(cx - a + b, cy);
      } else {
        ctx.moveTo(cx, cy - a + b);
        ctx.lineTo(cx + this._spacingX - b, cy - a / 2 + b);
        ctx.lineTo(cx + this._spacingX - b, cy + a / 2 - b);
        ctx.lineTo(cx, cy + a - b);
        ctx.lineTo(cx - this._spacingX + b, cy + a / 2 - b);
        ctx.lineTo(cx - this._spacingX + b, cy - a / 2 + b);
        ctx.lineTo(cx, cy - a + b);
      }

      ctx.fill();
    };

    _proto4._updateSize = function _updateSize() {
      var opts = this._options;
      var charWidth = Math.ceil(this._ctx.measureText("W").width);
      this._hexSize = Math.floor(opts.spacing * (opts.fontSize + charWidth / Math.sqrt(3)) / 2);
      this._spacingX = this._hexSize * Math.sqrt(3) / 2;
      this._spacingY = this._hexSize * 1.5;
      var xprop;
      var yprop;

      if (opts.transpose) {
        xprop = "height";
        yprop = "width";
      } else {
        xprop = "width";
        yprop = "height";
      }

      this._ctx.canvas[xprop] = Math.ceil((opts.width + 1) * this._spacingX);
      this._ctx.canvas[yprop] = Math.ceil((opts.height - 1) * this._spacingY + 2 * this._hexSize);
    };

    return Hex;
  }(Canvas);
  /**
   * @class Rectangular backend
   * @private
   */


  var Rect =
  /** @class */
  function () {
    var Rect =
    /*#__PURE__*/
    function (_Canvas2) {
      _inheritsLoose(Rect, _Canvas2);

      function Rect() {
        var _this3;

        _this3 = _Canvas2.call(this) || this;
        _this3._spacingX = 0;
        _this3._spacingY = 0;
        _this3._canvasCache = {};
        return _this3;
      }

      var _proto5 = Rect.prototype;

      _proto5.setOptions = function setOptions(options) {
        _Canvas2.prototype.setOptions.call(this, options);

        this._canvasCache = {};
      };

      _proto5.draw = function draw(data, clearBefore) {
        if (Rect.cache) {
          this._drawWithCache(data);
        } else {
          this._drawNoCache(data, clearBefore);
        }
      };

      _proto5._drawWithCache = function _drawWithCache(data) {
        var x = data[0],
            y = data[1],
            ch = data[2],
            fg = data[3],
            bg = data[4];
        var hash = "" + ch + fg + bg;
        var canvas;

        if (hash in this._canvasCache) {
          canvas = this._canvasCache[hash];
        } else {
          var b = this._options.border;
          canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = this._spacingX;
          canvas.height = this._spacingY;
          ctx.fillStyle = bg;
          ctx.fillRect(b, b, canvas.width - b, canvas.height - b);

          if (ch) {
            ctx.fillStyle = fg;
            ctx.font = this._ctx.font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            var chars = [].concat(ch);

            for (var i = 0; i < chars.length; i++) {
              ctx.fillText(chars[i], this._spacingX / 2, Math.ceil(this._spacingY / 2));
            }
          }

          this._canvasCache[hash] = canvas;
        }

        this._ctx.drawImage(canvas, x * this._spacingX, y * this._spacingY);
      };

      _proto5._drawNoCache = function _drawNoCache(data, clearBefore) {
        var x = data[0],
            y = data[1],
            ch = data[2],
            fg = data[3],
            bg = data[4];

        if (clearBefore) {
          var b = this._options.border;
          this._ctx.fillStyle = bg;

          this._ctx.fillRect(x * this._spacingX + b, y * this._spacingY + b, this._spacingX - b, this._spacingY - b);
        }

        if (!ch) {
          return;
        }

        this._ctx.fillStyle = fg;
        var chars = [].concat(ch);

        for (var i = 0; i < chars.length; i++) {
          this._ctx.fillText(chars[i], (x + 0.5) * this._spacingX, Math.ceil((y + 0.5) * this._spacingY));
        }
      };

      _proto5.computeSize = function computeSize(availWidth, availHeight) {
        var width = Math.floor(availWidth / this._spacingX);
        var height = Math.floor(availHeight / this._spacingY);
        return [width, height];
      };

      _proto5.computeFontSize = function computeFontSize(availWidth, availHeight) {
        var boxWidth = Math.floor(availWidth / this._options.width);
        var boxHeight = Math.floor(availHeight / this._options.height);
        /* compute char ratio */

        var oldFont = this._ctx.font;
        this._ctx.font = "100px " + this._options.fontFamily;
        var width = Math.ceil(this._ctx.measureText("W").width);
        this._ctx.font = oldFont;
        var ratio = width / 100;
        var widthFraction = ratio * boxHeight / boxWidth;

        if (widthFraction > 1) {
          /* too wide with current aspect ratio */
          boxHeight = Math.floor(boxHeight / widthFraction);
        }

        return Math.floor(boxHeight / this._options.spacing);
      };

      _proto5._normalizedEventToPosition = function _normalizedEventToPosition(x, y) {
        return [Math.floor(x / this._spacingX), Math.floor(y / this._spacingY)];
      };

      _proto5._updateSize = function _updateSize() {
        var opts = this._options;
        var charWidth = Math.ceil(this._ctx.measureText("W").width);
        this._spacingX = Math.ceil(opts.spacing * charWidth);
        this._spacingY = Math.ceil(opts.spacing * opts.fontSize);

        if (opts.forceSquareRatio) {
          this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
        }

        this._ctx.canvas.width = opts.width * this._spacingX;
        this._ctx.canvas.height = opts.height * this._spacingY;
      };

      return Rect;
    }(Canvas);

    Rect.cache = false;
    return Rect;
  }();
  /**
   * @class Tile backend
   * @private
   */


  var Tile =
  /*#__PURE__*/
  function (_Canvas3) {
    _inheritsLoose(Tile, _Canvas3);

    function Tile() {
      var _this4;

      _this4 = _Canvas3.call(this) || this;
      _this4._colorCanvas = document.createElement("canvas");
      return _this4;
    }

    var _proto6 = Tile.prototype;

    _proto6.draw = function draw(data, clearBefore) {
      var x = data[0],
          y = data[1],
          ch = data[2],
          fg = data[3],
          bg = data[4];
      var tileWidth = this._options.tileWidth;
      var tileHeight = this._options.tileHeight;

      if (clearBefore) {
        if (this._options.tileColorize) {
          this._ctx.clearRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        } else {
          this._ctx.fillStyle = bg;

          this._ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
      }

      if (!ch) {
        return;
      }

      var chars = [].concat(ch);
      var fgs = [].concat(fg);
      var bgs = [].concat(bg);

      for (var i = 0; i < chars.length; i++) {
        var tile = this._options.tileMap[chars[i]];

        if (!tile) {
          throw new Error("Char \"" + chars[i] + "\" not found in tileMap");
        }

        if (this._options.tileColorize) {
          // apply colorization
          var canvas = this._colorCanvas;
          var context = canvas.getContext("2d");
          context.globalCompositeOperation = "source-over";
          context.clearRect(0, 0, tileWidth, tileHeight);
          var _fg = fgs[i];
          var _bg = bgs[i];
          context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);

          if (_fg != "transparent") {
            context.fillStyle = _fg;
            context.globalCompositeOperation = "source-atop";
            context.fillRect(0, 0, tileWidth, tileHeight);
          }

          if (_bg != "transparent") {
            context.fillStyle = _bg;
            context.globalCompositeOperation = "destination-over";
            context.fillRect(0, 0, tileWidth, tileHeight);
          }

          this._ctx.drawImage(canvas, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        } else {
          // no colorizing, easy
          this._ctx.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
      }
    };

    _proto6.computeSize = function computeSize(availWidth, availHeight) {
      var width = Math.floor(availWidth / this._options.tileWidth);
      var height = Math.floor(availHeight / this._options.tileHeight);
      return [width, height];
    };

    _proto6.computeFontSize = function computeFontSize() {
      throw new Error("Tile backend does not understand font size");
    };

    _proto6._normalizedEventToPosition = function _normalizedEventToPosition(x, y) {
      return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
    };

    _proto6._updateSize = function _updateSize() {
      var opts = this._options;
      this._ctx.canvas.width = opts.width * opts.tileWidth;
      this._ctx.canvas.height = opts.height * opts.tileHeight;
      this._colorCanvas.width = opts.tileWidth;
      this._colorCanvas.height = opts.tileHeight;
    };

    return Tile;
  }(Canvas);

  function fromString(str) {
    var cached, r;

    if (str in CACHE) {
      cached = CACHE[str];
    } else {
      if (str.charAt(0) == "#") {
        // hex rgb
        var matched = str.match(/[0-9a-f]/gi) || [];
        var values = matched.map(function (x) {
          return parseInt(x, 16);
        });

        if (values.length == 3) {
          cached = values.map(function (x) {
            return x * 17;
          });
        } else {
          for (var i = 0; i < 3; i++) {
            values[i + 1] += 16 * values[i];
            values.splice(i, 1);
          }

          cached = values;
        }
      } else if (r = str.match(/rgb\(([0-9, ]+)\)/i)) {
        // decimal rgb
        cached = r[1].split(/\s*,\s*/).map(function (x) {
          return parseInt(x);
        });
      } else {
        // html name
        cached = [0, 0, 0];
      }

      CACHE[str] = cached;
    }

    return cached.slice();
  }
  /**
   * Add two or more colors
   */


  function add(color1) {
    var result = color1.slice();

    for (var _len2 = arguments.length, colors = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      colors[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < colors.length; j++) {
        result[i] += colors[j][i];
      }
    }

    return result;
  }
  /**
   * Add two or more colors, MODIFIES FIRST ARGUMENT
   */


  function add_(color1) {
    for (var _len3 = arguments.length, colors = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      colors[_key3 - 1] = arguments[_key3];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < colors.length; j++) {
        color1[i] += colors[j][i];
      }
    }

    return color1;
  }
  /**
   * Multiply (mix) two or more colors
   */


  function multiply(color1) {
    var result = color1.slice();

    for (var _len4 = arguments.length, colors = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      colors[_key4 - 1] = arguments[_key4];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < colors.length; j++) {
        result[i] *= colors[j][i] / 255;
      }

      result[i] = Math.round(result[i]);
    }

    return result;
  }
  /**
   * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
   */


  function multiply_(color1) {
    for (var _len5 = arguments.length, colors = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      colors[_key5 - 1] = arguments[_key5];
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < colors.length; j++) {
        color1[i] *= colors[j][i] / 255;
      }

      color1[i] = Math.round(color1[i]);
    }

    return color1;
  }
  /**
   * Interpolate (blend) two colors with a given factor
   */


  function interpolate(color1, color2, factor) {
    if (factor === void 0) {
      factor = 0.5;
    }

    var result = color1.slice();

    for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }

    return result;
  }

  var lerp = interpolate;
  /**
   * Interpolate (blend) two colors with a given factor in HSL mode
   */

  function interpolateHSL(color1, color2, factor) {
    if (factor === void 0) {
      factor = 0.5;
    }

    var hsl1 = rgb2hsl(color1);
    var hsl2 = rgb2hsl(color2);

    for (var i = 0; i < 3; i++) {
      hsl1[i] += factor * (hsl2[i] - hsl1[i]);
    }

    return hsl2rgb(hsl1);
  }

  var lerpHSL = interpolateHSL;
  /**
   * Create a new random color based on this one
   * @param color
   * @param diff Set of standard deviations
   */

  function randomize(color, diff) {
    if (!(diff instanceof Array)) {
      diff = Math.round(RNG$1.getNormal(0, diff));
    }

    var result = color.slice();

    for (var i = 0; i < 3; i++) {
      result[i] += diff instanceof Array ? Math.round(RNG$1.getNormal(0, diff[i])) : diff;
    }

    return result;
  }
  /**
   * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
   */


  function rgb2hsl(color) {
    var r = color[0] / 255;
    var g = color[1] / 255;
    var b = color[2] / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h = 0,
        s,
        l = (max + min) / 2;

    if (max == min) {
      s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  /**
   * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
   */


  function hsl2rgb(color) {
    var l = color[2];

    if (color[1] == 0) {
      l = Math.round(l * 255);
      return [l, l, l];
    } else {
      var s = color[1];
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      var r = hue2rgb(p, q, color[0] + 1 / 3);
      var g = hue2rgb(p, q, color[0]);
      var b = hue2rgb(p, q, color[0] - 1 / 3);
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
  }

  function toRGB(color) {
    var clamped = color.map(function (x) {
      return clamp(x, 0, 255);
    });
    return "rgb(" + clamped.join(",") + ")";
  }

  function toHex(color) {
    var clamped = color.map(function (x) {
      return clamp(x, 0, 255).toString(16).padStart(2, "0");
    });
    return "#" + clamped.join("");
  }

  var CACHE = {
    "black": [0, 0, 0],
    "navy": [0, 0, 128],
    "darkblue": [0, 0, 139],
    "mediumblue": [0, 0, 205],
    "blue": [0, 0, 255],
    "darkgreen": [0, 100, 0],
    "green": [0, 128, 0],
    "teal": [0, 128, 128],
    "darkcyan": [0, 139, 139],
    "deepskyblue": [0, 191, 255],
    "darkturquoise": [0, 206, 209],
    "mediumspringgreen": [0, 250, 154],
    "lime": [0, 255, 0],
    "springgreen": [0, 255, 127],
    "aqua": [0, 255, 255],
    "cyan": [0, 255, 255],
    "midnightblue": [25, 25, 112],
    "dodgerblue": [30, 144, 255],
    "forestgreen": [34, 139, 34],
    "seagreen": [46, 139, 87],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "limegreen": [50, 205, 50],
    "mediumseagreen": [60, 179, 113],
    "turquoise": [64, 224, 208],
    "royalblue": [65, 105, 225],
    "steelblue": [70, 130, 180],
    "darkslateblue": [72, 61, 139],
    "mediumturquoise": [72, 209, 204],
    "indigo": [75, 0, 130],
    "darkolivegreen": [85, 107, 47],
    "cadetblue": [95, 158, 160],
    "cornflowerblue": [100, 149, 237],
    "mediumaquamarine": [102, 205, 170],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "slateblue": [106, 90, 205],
    "olivedrab": [107, 142, 35],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "mediumslateblue": [123, 104, 238],
    "lawngreen": [124, 252, 0],
    "chartreuse": [127, 255, 0],
    "aquamarine": [127, 255, 212],
    "maroon": [128, 0, 0],
    "purple": [128, 0, 128],
    "olive": [128, 128, 0],
    "gray": [128, 128, 128],
    "grey": [128, 128, 128],
    "skyblue": [135, 206, 235],
    "lightskyblue": [135, 206, 250],
    "blueviolet": [138, 43, 226],
    "darkred": [139, 0, 0],
    "darkmagenta": [139, 0, 139],
    "saddlebrown": [139, 69, 19],
    "darkseagreen": [143, 188, 143],
    "lightgreen": [144, 238, 144],
    "mediumpurple": [147, 112, 216],
    "darkviolet": [148, 0, 211],
    "palegreen": [152, 251, 152],
    "darkorchid": [153, 50, 204],
    "yellowgreen": [154, 205, 50],
    "sienna": [160, 82, 45],
    "brown": [165, 42, 42],
    "darkgray": [169, 169, 169],
    "darkgrey": [169, 169, 169],
    "lightblue": [173, 216, 230],
    "greenyellow": [173, 255, 47],
    "paleturquoise": [175, 238, 238],
    "lightsteelblue": [176, 196, 222],
    "powderblue": [176, 224, 230],
    "firebrick": [178, 34, 34],
    "darkgoldenrod": [184, 134, 11],
    "mediumorchid": [186, 85, 211],
    "rosybrown": [188, 143, 143],
    "darkkhaki": [189, 183, 107],
    "silver": [192, 192, 192],
    "mediumvioletred": [199, 21, 133],
    "indianred": [205, 92, 92],
    "peru": [205, 133, 63],
    "chocolate": [210, 105, 30],
    "tan": [210, 180, 140],
    "lightgray": [211, 211, 211],
    "lightgrey": [211, 211, 211],
    "palevioletred": [216, 112, 147],
    "thistle": [216, 191, 216],
    "orchid": [218, 112, 214],
    "goldenrod": [218, 165, 32],
    "crimson": [220, 20, 60],
    "gainsboro": [220, 220, 220],
    "plum": [221, 160, 221],
    "burlywood": [222, 184, 135],
    "lightcyan": [224, 255, 255],
    "lavender": [230, 230, 250],
    "darksalmon": [233, 150, 122],
    "violet": [238, 130, 238],
    "palegoldenrod": [238, 232, 170],
    "lightcoral": [240, 128, 128],
    "khaki": [240, 230, 140],
    "aliceblue": [240, 248, 255],
    "honeydew": [240, 255, 240],
    "azure": [240, 255, 255],
    "sandybrown": [244, 164, 96],
    "wheat": [245, 222, 179],
    "beige": [245, 245, 220],
    "whitesmoke": [245, 245, 245],
    "mintcream": [245, 255, 250],
    "ghostwhite": [248, 248, 255],
    "salmon": [250, 128, 114],
    "antiquewhite": [250, 235, 215],
    "linen": [250, 240, 230],
    "lightgoldenrodyellow": [250, 250, 210],
    "oldlace": [253, 245, 230],
    "red": [255, 0, 0],
    "fuchsia": [255, 0, 255],
    "magenta": [255, 0, 255],
    "deeppink": [255, 20, 147],
    "orangered": [255, 69, 0],
    "tomato": [255, 99, 71],
    "hotpink": [255, 105, 180],
    "coral": [255, 127, 80],
    "darkorange": [255, 140, 0],
    "lightsalmon": [255, 160, 122],
    "orange": [255, 165, 0],
    "lightpink": [255, 182, 193],
    "pink": [255, 192, 203],
    "gold": [255, 215, 0],
    "peachpuff": [255, 218, 185],
    "navajowhite": [255, 222, 173],
    "moccasin": [255, 228, 181],
    "bisque": [255, 228, 196],
    "mistyrose": [255, 228, 225],
    "blanchedalmond": [255, 235, 205],
    "papayawhip": [255, 239, 213],
    "lavenderblush": [255, 240, 245],
    "seashell": [255, 245, 238],
    "cornsilk": [255, 248, 220],
    "lemonchiffon": [255, 250, 205],
    "floralwhite": [255, 250, 240],
    "snow": [255, 250, 250],
    "yellow": [255, 255, 0],
    "lightyellow": [255, 255, 224],
    "ivory": [255, 255, 240],
    "white": [255, 255, 255]
  };
  var color =
  /*#__PURE__*/
  Object.freeze({
    fromString: fromString,
    add: add,
    add_: add_,
    multiply: multiply,
    multiply_: multiply_,
    interpolate: interpolate,
    lerp: lerp,
    interpolateHSL: interpolateHSL,
    lerpHSL: lerpHSL,
    randomize: randomize,
    rgb2hsl: rgb2hsl,
    hsl2rgb: hsl2rgb,
    toRGB: toRGB,
    toHex: toHex
  });
  /**
   * @class Tile backend
   * @private
   */

  var TileGL =
  /*#__PURE__*/
  function (_Backend2) {
    _inheritsLoose(TileGL, _Backend2);

    function TileGL() {
      var _this5;

      _this5 = _Backend2.call(this) || this;
      _this5._uniforms = {};

      try {
        _this5._gl = _this5._initWebGL();
      } catch (e) {
        alert(e.message);
      }

      return _this5;
    }

    TileGL.isSupported = function isSupported() {
      return !!document.createElement("canvas").getContext("webgl2", {
        preserveDrawingBuffer: true
      });
    };

    var _proto7 = TileGL.prototype;

    _proto7.schedule = function schedule(cb) {
      requestAnimationFrame(cb);
    };

    _proto7.getContainer = function getContainer() {
      return this._gl.canvas;
    };

    _proto7.setOptions = function setOptions(opts) {
      var _this6 = this;

      _Backend2.prototype.setOptions.call(this, opts);

      this._updateSize();

      var tileSet = this._options.tileSet;

      if (tileSet && "complete" in tileSet && !tileSet.complete) {
        tileSet.addEventListener("load", function () {
          return _this6._updateTexture(tileSet);
        });
      } else {
        this._updateTexture(tileSet);
      }
    };

    _proto7.draw = function draw(data, clearBefore) {
      var gl = this._gl;
      var opts = this._options;
      var x = data[0],
          y = data[1],
          ch = data[2],
          fg = data[3],
          bg = data[4];
      var scissorY = gl.canvas.height - (y + 1) * opts.tileHeight;
      gl.scissor(x * opts.tileWidth, scissorY, opts.tileWidth, opts.tileHeight);

      if (clearBefore) {
        if (opts.tileColorize) {
          gl.clearColor(0, 0, 0, 0);
        } else {
          gl.clearColor.apply(gl, parseColor(bg));
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      if (!ch) {
        return;
      }

      var chars = [].concat(ch);
      var bgs = [].concat(bg);
      var fgs = [].concat(fg);
      gl.uniform2fv(this._uniforms["targetPosRel"], [x, y]);

      for (var i = 0; i < chars.length; i++) {
        var tile = this._options.tileMap[chars[i]];

        if (!tile) {
          throw new Error("Char \"" + chars[i] + "\" not found in tileMap");
        }

        gl.uniform1f(this._uniforms["colorize"], opts.tileColorize ? 1 : 0);
        gl.uniform2fv(this._uniforms["tilesetPosAbs"], tile);

        if (opts.tileColorize) {
          gl.uniform4fv(this._uniforms["tint"], parseColor(fgs[i]));
          gl.uniform4fv(this._uniforms["bg"], parseColor(bgs[i]));
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      /*
      
      
              for (let i=0;i<chars.length;i++) {
      
                  if (this._options.tileColorize) { // apply colorization
                      let canvas = this._colorCanvas;
                      let context = canvas.getContext("2d") as CanvasRenderingContext2D;
                      context.globalCompositeOperation = "source-over";
                      context.clearRect(0, 0, tileWidth, tileHeight);
      
                      let fg = fgs[i];
                      let bg = bgs[i];
      
                      context.drawImage(
                          this._options.tileSet!,
                          tile[0], tile[1], tileWidth, tileHeight,
                          0, 0, tileWidth, tileHeight
                      );
      
                      if (fg != "transparent") {
                          context.fillStyle = fg;
                          context.globalCompositeOperation = "source-atop";
                          context.fillRect(0, 0, tileWidth, tileHeight);
                      }
      
                      if (bg != "transparent") {
                          context.fillStyle = bg;
                          context.globalCompositeOperation = "destination-over";
                          context.fillRect(0, 0, tileWidth, tileHeight);
                      }
      
                      this._ctx.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
                  } else { // no colorizing, easy
                      this._ctx.drawImage(
                          this._options.tileSet!,
                          tile[0], tile[1], tileWidth, tileHeight,
                          x*tileWidth, y*tileHeight, tileWidth, tileHeight
                      );
                  }
              }
      
      */

    };

    _proto7.clear = function clear() {
      var gl = this._gl;
      gl.clearColor.apply(gl, parseColor(this._options.bg));
      gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    _proto7.computeSize = function computeSize(availWidth, availHeight) {
      var width = Math.floor(availWidth / this._options.tileWidth);
      var height = Math.floor(availHeight / this._options.tileHeight);
      return [width, height];
    };

    _proto7.computeFontSize = function computeFontSize() {
      throw new Error("Tile backend does not understand font size");
    };

    _proto7.eventToPosition = function eventToPosition(x, y) {
      var canvas = this._gl.canvas;
      var rect = canvas.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;
      x *= canvas.width / rect.width;
      y *= canvas.height / rect.height;

      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return [-1, -1];
      }

      return this._normalizedEventToPosition(x, y);
    };

    _proto7._initWebGL = function _initWebGL() {
      var _this7 = this;

      var gl = document.createElement("canvas").getContext("webgl2", {
        preserveDrawingBuffer: true
      });
      window.gl = gl;
      var program = createProgram(gl, VS, FS);
      gl.useProgram(program);
      createQuad(gl);
      UNIFORMS.forEach(function (name) {
        return _this7._uniforms[name] = gl.getUniformLocation(program, name);
      });
      this._program = program;
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.SCISSOR_TEST);
      return gl;
    };

    _proto7._normalizedEventToPosition = function _normalizedEventToPosition(x, y) {
      return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
    };

    _proto7._updateSize = function _updateSize() {
      var gl = this._gl;
      var opts = this._options;
      var canvasSize = [opts.width * opts.tileWidth, opts.height * opts.tileHeight];
      gl.canvas.width = canvasSize[0];
      gl.canvas.height = canvasSize[1];
      gl.viewport(0, 0, canvasSize[0], canvasSize[1]);
      gl.uniform2fv(this._uniforms["tileSize"], [opts.tileWidth, opts.tileHeight]);
      gl.uniform2fv(this._uniforms["targetSize"], canvasSize);
    };

    _proto7._updateTexture = function _updateTexture(tileSet) {
      createTexture(this._gl, tileSet);
    };

    return TileGL;
  }(Backend);

  var UNIFORMS = ["targetPosRel", "tilesetPosAbs", "tileSize", "targetSize", "colorize", "bg", "tint"];
  var VS = "\n#version 300 es\n\nin vec2 tilePosRel;\nout vec2 tilesetPosPx;\n\nuniform vec2 tilesetPosAbs;\nuniform vec2 tileSize;\nuniform vec2 targetSize;\nuniform vec2 targetPosRel;\n\nvoid main() {\n\tvec2 targetPosPx = (targetPosRel + tilePosRel) * tileSize;\n\tvec2 targetPosNdc = ((targetPosPx / targetSize)-0.5)*2.0;\n\ttargetPosNdc.y *= -1.0;\n\n\tgl_Position = vec4(targetPosNdc, 0.0, 1.0);\n\ttilesetPosPx = tilesetPosAbs + tilePosRel * tileSize;\n}".trim();
  var FS = "\n#version 300 es\nprecision highp float;\n\nin vec2 tilesetPosPx;\nout vec4 fragColor;\nuniform sampler2D image;\nuniform bool colorize;\nuniform vec4 bg;\nuniform vec4 tint;\n\nvoid main() {\n\tfragColor = vec4(0, 0, 0, 1);\n\n\tvec4 texel = texelFetch(image, ivec2(tilesetPosPx), 0);\n\n\tif (colorize) {\n\t\ttexel.rgb = tint.a * tint.rgb + (1.0-tint.a) * texel.rgb;\n\t\tfragColor.rgb = texel.a*texel.rgb + (1.0-texel.a)*bg.rgb;\n\t\tfragColor.a = texel.a + (1.0-texel.a)*bg.a;\n\t} else {\n\t\tfragColor = texel;\n\t}\n}".trim();

  function createProgram(gl, vss, fss) {
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vss);
    gl.compileShader(vs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(vs) || "");
    }

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fss);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(fs) || "");
    }

    var p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);

    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(p) || "");
    }

    return p;
  }

  function createQuad(gl) {
    var pos = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  }

  function createTexture(gl, data) {
    var t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return t;
  }

  var colorCache = {};

  function parseColor(color) {
    if (!(color in colorCache)) {
      var parsed;

      if (color == "transparent") {
        parsed = [0, 0, 0, 0];
      } else if (color.indexOf("rgba") > -1) {
        parsed = (color.match(/[\d.]+/g) || []).map(Number);

        for (var i = 0; i < 3; i++) {
          parsed[i] = parsed[i] / 255;
        }
      } else {
        parsed = fromString(color).map(function ($) {
          return $ / 255;
        });
        parsed.push(1);
      }

      colorCache[color] = parsed;
    }

    return colorCache[color];
  }

  function clearToAnsi(bg) {
    return "\x1B[0;48;5;" + termcolor(bg) + "m\x1B[2J";
  }

  function colorToAnsi(fg, bg) {
    return "\x1B[0;38;5;" + termcolor(fg) + ";48;5;" + termcolor(bg) + "m";
  }

  function positionToAnsi(x, y) {
    return "\x1B[" + (y + 1) + ";" + (x + 1) + "H";
  }

  function termcolor(color) {
    var SRC_COLORS = 256.0;
    var DST_COLORS = 6.0;
    var COLOR_RATIO = DST_COLORS / SRC_COLORS;
    var rgb = fromString(color);
    var r = Math.floor(rgb[0] * COLOR_RATIO);
    var g = Math.floor(rgb[1] * COLOR_RATIO);
    var b = Math.floor(rgb[2] * COLOR_RATIO);
    return r * 36 + g * 6 + b * 1 + 16;
  }

  var Term =
  /*#__PURE__*/
  function (_Backend3) {
    _inheritsLoose(Term, _Backend3);

    function Term() {
      var _this8;

      _this8 = _Backend3.call(this) || this;
      _this8._offset = [0, 0];
      _this8._cursor = [-1, -1];
      _this8._lastColor = "";
      return _this8;
    }

    var _proto8 = Term.prototype;

    _proto8.schedule = function schedule(cb) {
      setTimeout(cb, 1000 / 60);
    };

    _proto8.setOptions = function setOptions(options) {
      _Backend3.prototype.setOptions.call(this, options);

      var size = [options.width, options.height];
      var avail = this.computeSize();
      this._offset = avail.map(function (val, index) {
        return Math.floor((val - size[index]) / 2);
      });
    };

    _proto8.clear = function clear() {
      process.stdout.write(clearToAnsi(this._options.bg));
    };

    _proto8.draw = function draw(data, clearBefore) {
      // determine where to draw what with what colors
      var x = data[0],
          y = data[1],
          ch = data[2],
          fg = data[3],
          bg = data[4]; // determine if we need to move the terminal cursor

      var dx = this._offset[0] + x;
      var dy = this._offset[1] + y;
      var size = this.computeSize();

      if (dx < 0 || dx >= size[0]) {
        return;
      }

      if (dy < 0 || dy >= size[1]) {
        return;
      }

      if (dx !== this._cursor[0] || dy !== this._cursor[1]) {
        process.stdout.write(positionToAnsi(dx, dy));
        this._cursor[0] = dx;
        this._cursor[1] = dy;
      } // terminals automatically clear, but if we're clearing when we're
      // not otherwise provided with a character, just use a space instead


      if (clearBefore) {
        if (!ch) {
          ch = " ";
        }
      } // if we're not clearing and not provided with a character, do nothing


      if (!ch) {
        return;
      } // determine if we need to change colors


      var newColor = colorToAnsi(fg, bg);

      if (newColor !== this._lastColor) {
        process.stdout.write(newColor);
        this._lastColor = newColor;
      }

      if (ch != '\t') {
        // write the provided symbol to the display
        var chars = [].concat(ch);
        process.stdout.write(chars[0]);
      } // update our position, given that we wrote a character


      this._cursor[0]++;

      if (this._cursor[0] >= size[0]) {
        this._cursor[0] = 0;
        this._cursor[1]++;
      }
    };

    _proto8.computeFontSize = function computeFontSize() {
      throw new Error("Terminal backend has no notion of font size");
    };

    _proto8.eventToPosition = function eventToPosition(x, y) {
      return [x, y];
    };

    _proto8.computeSize = function computeSize() {
      return [process.stdout.columns, process.stdout.rows];
    };

    return Term;
  }(Backend);
  /**
   * @namespace
   * Contains text tokenization and breaking routines
   */


  var RE_COLORS = /%([bc]){([^}]*)}/g; // token types

  var TYPE_TEXT = 0;
  var TYPE_NEWLINE = 1;
  var TYPE_FG = 2;
  var TYPE_BG = 3;
  /**
   * Measure size of a resulting text block
   */

  function measure(str, maxWidth) {
    var result = {
      width: 0,
      height: 1
    };
    var tokens = tokenize(str, maxWidth);
    var lineWidth = 0;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      switch (token.type) {
        case TYPE_TEXT:
          lineWidth += token.value.length;
          break;

        case TYPE_NEWLINE:
          result.height++;
          result.width = Math.max(result.width, lineWidth);
          lineWidth = 0;
          break;
      }
    }

    result.width = Math.max(result.width, lineWidth);
    return result;
  }
  /**
   * Convert string to a series of a formatting commands
   */


  function tokenize(str, maxWidth) {
    var result = [];
    /* first tokenization pass - split texts and color formatting commands */

    var offset = 0;
    str.replace(RE_COLORS, function (match, type, name, index) {
      /* string before */
      var part = str.substring(offset, index);

      if (part.length) {
        result.push({
          type: TYPE_TEXT,
          value: part
        });
      }
      /* color command */


      result.push({
        type: type == "c" ? TYPE_FG : TYPE_BG,
        value: name.trim()
      });
      offset = index + match.length;
      return "";
    });
    /* last remaining part */

    var part = str.substring(offset);

    if (part.length) {
      result.push({
        type: TYPE_TEXT,
        value: part
      });
    }

    return breakLines(result, maxWidth);
  }
  /* insert line breaks into first-pass tokenized data */


  function breakLines(tokens, maxWidth) {
    if (!maxWidth) {
      maxWidth = Infinity;
    }

    var i = 0;
    var lineLength = 0;
    var lastTokenWithSpace = -1;

    while (i < tokens.length) {
      /* take all text tokens, remove space, apply linebreaks */
      var token = tokens[i];

      if (token.type == TYPE_NEWLINE) {
        /* reset */
        lineLength = 0;
        lastTokenWithSpace = -1;
      }

      if (token.type != TYPE_TEXT) {
        /* skip non-text tokens */
        i++;
        continue;
      }
      /* remove spaces at the beginning of line */


      while (lineLength == 0 && token.value.charAt(0) == " ") {
        token.value = token.value.substring(1);
      }
      /* forced newline? insert two new tokens after this one */


      var _index2 = token.value.indexOf("\n");

      if (_index2 != -1) {
        token.value = breakInsideToken(tokens, i, _index2, true);
        /* if there are spaces at the end, we must remove them (we do not want the line too long) */

        var arr = token.value.split("");

        while (arr.length && arr[arr.length - 1] == " ") {
          arr.pop();
        }

        token.value = arr.join("");
      }
      /* token degenerated? */


      if (!token.value.length) {
        tokens.splice(i, 1);
        continue;
      }

      if (lineLength + token.value.length > maxWidth) {
        /* line too long, find a suitable breaking spot */

        /* is it possible to break within this token? */
        var _index3 = -1;

        while (1) {
          var nextIndex = token.value.indexOf(" ", _index3 + 1);

          if (nextIndex == -1) {
            break;
          }

          if (lineLength + nextIndex > maxWidth) {
            break;
          }

          _index3 = nextIndex;
        }

        if (_index3 != -1) {
          /* break at space within this one */
          token.value = breakInsideToken(tokens, i, _index3, true);
        } else if (lastTokenWithSpace != -1) {
          /* is there a previous token where a break can occur? */
          var _token = tokens[lastTokenWithSpace];

          var breakIndex = _token.value.lastIndexOf(" ");

          _token.value = breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
          i = lastTokenWithSpace;
        } else {
          /* force break in this token */
          token.value = breakInsideToken(tokens, i, maxWidth - lineLength, false);
        }
      } else {
        /* line not long, continue */
        lineLength += token.value.length;

        if (token.value.indexOf(" ") != -1) {
          lastTokenWithSpace = i;
        }
      }

      i++;
      /* advance to next token */
    }

    tokens.push({
      type: TYPE_NEWLINE
    });
    /* insert fake newline to fix the last text line */

    /* remove trailing space from text tokens before newlines */

    var lastTextToken = null;

    for (var _i = 0; _i < tokens.length; _i++) {
      var _token2 = tokens[_i];

      switch (_token2.type) {
        case TYPE_TEXT:
          lastTextToken = _token2;
          break;

        case TYPE_NEWLINE:
          if (lastTextToken) {
            /* remove trailing space */
            var _arr = lastTextToken.value.split("");

            while (_arr.length && _arr[_arr.length - 1] == " ") {
              _arr.pop();
            }

            lastTextToken.value = _arr.join("");
          }

          lastTextToken = null;
          break;
      }
    }

    tokens.pop();
    /* remove fake token */

    return tokens;
  }
  /**
   * Create new tokens and insert them into the stream
   * @param {object[]} tokens
   * @param {int} tokenIndex Token being processed
   * @param {int} breakIndex Index within current token's value
   * @param {bool} removeBreakChar Do we want to remove the breaking character?
   * @returns {string} remaining unbroken token value
   */


  function breakInsideToken(tokens, tokenIndex, breakIndex, removeBreakChar) {
    var newBreakToken = {
      type: TYPE_NEWLINE
    };
    var newTextToken = {
      type: TYPE_TEXT,
      value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
    };
    tokens.splice(tokenIndex + 1, 0, newBreakToken, newTextToken);
    return tokens[tokenIndex].value.substring(0, breakIndex);
  }

  var text =
  /*#__PURE__*/
  Object.freeze({
    TYPE_TEXT: TYPE_TEXT,
    TYPE_NEWLINE: TYPE_NEWLINE,
    TYPE_FG: TYPE_FG,
    TYPE_BG: TYPE_BG,
    measure: measure,
    tokenize: tokenize
  });
  /** Default with for display and map generators */

  var DEFAULT_WIDTH = 80;
  /** Default height for display and map generators */

  var DEFAULT_HEIGHT = 25;
  var DIRS = {
    4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
    8: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
    6: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
  };
  var KEYS = {
    /** Cancel key. */
    VK_CANCEL: 3,

    /** Help key. */
    VK_HELP: 6,

    /** Backspace key. */
    VK_BACK_SPACE: 8,

    /** Tab key. */
    VK_TAB: 9,

    /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
    VK_CLEAR: 12,

    /** Return/enter key on the main keyboard. */
    VK_RETURN: 13,

    /** Reserved, but not used. */
    VK_ENTER: 14,

    /** Shift key. */
    VK_SHIFT: 16,

    /** Control key. */
    VK_CONTROL: 17,

    /** Alt (Option on Mac) key. */
    VK_ALT: 18,

    /** Pause key. */
    VK_PAUSE: 19,

    /** Caps lock. */
    VK_CAPS_LOCK: 20,

    /** Escape key. */
    VK_ESCAPE: 27,

    /** Space bar. */
    VK_SPACE: 32,

    /** Page Up key. */
    VK_PAGE_UP: 33,

    /** Page Down key. */
    VK_PAGE_DOWN: 34,

    /** End key. */
    VK_END: 35,

    /** Home key. */
    VK_HOME: 36,

    /** Left arrow. */
    VK_LEFT: 37,

    /** Up arrow. */
    VK_UP: 38,

    /** Right arrow. */
    VK_RIGHT: 39,

    /** Down arrow. */
    VK_DOWN: 40,

    /** Print Screen key. */
    VK_PRINTSCREEN: 44,

    /** Ins(ert) key. */
    VK_INSERT: 45,

    /** Del(ete) key. */
    VK_DELETE: 46,

    /***/
    VK_0: 48,

    /***/
    VK_1: 49,

    /***/
    VK_2: 50,

    /***/
    VK_3: 51,

    /***/
    VK_4: 52,

    /***/
    VK_5: 53,

    /***/
    VK_6: 54,

    /***/
    VK_7: 55,

    /***/
    VK_8: 56,

    /***/
    VK_9: 57,

    /** Colon (:) key. Requires Gecko 15.0 */
    VK_COLON: 58,

    /** Semicolon (;) key. */
    VK_SEMICOLON: 59,

    /** Less-than (<) key. Requires Gecko 15.0 */
    VK_LESS_THAN: 60,

    /** Equals (=) key. */
    VK_EQUALS: 61,

    /** Greater-than (>) key. Requires Gecko 15.0 */
    VK_GREATER_THAN: 62,

    /** Question mark (?) key. Requires Gecko 15.0 */
    VK_QUESTION_MARK: 63,

    /** Atmark (@) key. Requires Gecko 15.0 */
    VK_AT: 64,

    /***/
    VK_A: 65,

    /***/
    VK_B: 66,

    /***/
    VK_C: 67,

    /***/
    VK_D: 68,

    /***/
    VK_E: 69,

    /***/
    VK_F: 70,

    /***/
    VK_G: 71,

    /***/
    VK_H: 72,

    /***/
    VK_I: 73,

    /***/
    VK_J: 74,

    /***/
    VK_K: 75,

    /***/
    VK_L: 76,

    /***/
    VK_M: 77,

    /***/
    VK_N: 78,

    /***/
    VK_O: 79,

    /***/
    VK_P: 80,

    /***/
    VK_Q: 81,

    /***/
    VK_R: 82,

    /***/
    VK_S: 83,

    /***/
    VK_T: 84,

    /***/
    VK_U: 85,

    /***/
    VK_V: 86,

    /***/
    VK_W: 87,

    /***/
    VK_X: 88,

    /***/
    VK_Y: 89,

    /***/
    VK_Z: 90,

    /***/
    VK_CONTEXT_MENU: 93,

    /** 0 on the numeric keypad. */
    VK_NUMPAD0: 96,

    /** 1 on the numeric keypad. */
    VK_NUMPAD1: 97,

    /** 2 on the numeric keypad. */
    VK_NUMPAD2: 98,

    /** 3 on the numeric keypad. */
    VK_NUMPAD3: 99,

    /** 4 on the numeric keypad. */
    VK_NUMPAD4: 100,

    /** 5 on the numeric keypad. */
    VK_NUMPAD5: 101,

    /** 6 on the numeric keypad. */
    VK_NUMPAD6: 102,

    /** 7 on the numeric keypad. */
    VK_NUMPAD7: 103,

    /** 8 on the numeric keypad. */
    VK_NUMPAD8: 104,

    /** 9 on the numeric keypad. */
    VK_NUMPAD9: 105,

    /** * on the numeric keypad. */
    VK_MULTIPLY: 106,

    /** + on the numeric keypad. */
    VK_ADD: 107,

    /***/
    VK_SEPARATOR: 108,

    /** - on the numeric keypad. */
    VK_SUBTRACT: 109,

    /** Decimal point on the numeric keypad. */
    VK_DECIMAL: 110,

    /** / on the numeric keypad. */
    VK_DIVIDE: 111,

    /** F1 key. */
    VK_F1: 112,

    /** F2 key. */
    VK_F2: 113,

    /** F3 key. */
    VK_F3: 114,

    /** F4 key. */
    VK_F4: 115,

    /** F5 key. */
    VK_F5: 116,

    /** F6 key. */
    VK_F6: 117,

    /** F7 key. */
    VK_F7: 118,

    /** F8 key. */
    VK_F8: 119,

    /** F9 key. */
    VK_F9: 120,

    /** F10 key. */
    VK_F10: 121,

    /** F11 key. */
    VK_F11: 122,

    /** F12 key. */
    VK_F12: 123,

    /** F13 key. */
    VK_F13: 124,

    /** F14 key. */
    VK_F14: 125,

    /** F15 key. */
    VK_F15: 126,

    /** F16 key. */
    VK_F16: 127,

    /** F17 key. */
    VK_F17: 128,

    /** F18 key. */
    VK_F18: 129,

    /** F19 key. */
    VK_F19: 130,

    /** F20 key. */
    VK_F20: 131,

    /** F21 key. */
    VK_F21: 132,

    /** F22 key. */
    VK_F22: 133,

    /** F23 key. */
    VK_F23: 134,

    /** F24 key. */
    VK_F24: 135,

    /** Num Lock key. */
    VK_NUM_LOCK: 144,

    /** Scroll Lock key. */
    VK_SCROLL_LOCK: 145,

    /** Circumflex (^) key. Requires Gecko 15.0 */
    VK_CIRCUMFLEX: 160,

    /** Exclamation (!) key. Requires Gecko 15.0 */
    VK_EXCLAMATION: 161,

    /** Double quote () key. Requires Gecko 15.0 */
    VK_DOUBLE_QUOTE: 162,

    /** Hash (#) key. Requires Gecko 15.0 */
    VK_HASH: 163,

    /** Dollar sign ($) key. Requires Gecko 15.0 */
    VK_DOLLAR: 164,

    /** Percent (%) key. Requires Gecko 15.0 */
    VK_PERCENT: 165,

    /** Ampersand (&) key. Requires Gecko 15.0 */
    VK_AMPERSAND: 166,

    /** Underscore (_) key. Requires Gecko 15.0 */
    VK_UNDERSCORE: 167,

    /** Open parenthesis (() key. Requires Gecko 15.0 */
    VK_OPEN_PAREN: 168,

    /** Close parenthesis ()) key. Requires Gecko 15.0 */
    VK_CLOSE_PAREN: 169,

    /* Asterisk (*) key. Requires Gecko 15.0 */
    VK_ASTERISK: 170,

    /** Plus (+) key. Requires Gecko 15.0 */
    VK_PLUS: 171,

    /** Pipe (|) key. Requires Gecko 15.0 */
    VK_PIPE: 172,

    /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
    VK_HYPHEN_MINUS: 173,

    /** Open curly bracket ({) key. Requires Gecko 15.0 */
    VK_OPEN_CURLY_BRACKET: 174,

    /** Close curly bracket (}) key. Requires Gecko 15.0 */
    VK_CLOSE_CURLY_BRACKET: 175,

    /** Tilde (~) key. Requires Gecko 15.0 */
    VK_TILDE: 176,

    /** Comma (,) key. */
    VK_COMMA: 188,

    /** Period (.) key. */
    VK_PERIOD: 190,

    /** Slash (/) key. */
    VK_SLASH: 191,

    /** Back tick (`) key. */
    VK_BACK_QUOTE: 192,

    /** Open square bracket ([) key. */
    VK_OPEN_BRACKET: 219,

    /** Back slash (\) key. */
    VK_BACK_SLASH: 220,

    /** Close square bracket (]) key. */
    VK_CLOSE_BRACKET: 221,

    /** Quote (''') key. */
    VK_QUOTE: 222,

    /** Meta key on Linux, Command key on Mac. */
    VK_META: 224,

    /** AltGr key on Linux. Requires Gecko 15.0 */
    VK_ALTGR: 225,

    /** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
    VK_WIN: 91,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANA: 21,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANGUL: 21,

    /** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
    VK_EISU: 22,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_JUNJA: 23,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_FINAL: 24,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANJA: 25,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANJI: 25,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_CONVERT: 28,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_NONCONVERT: 29,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_ACCEPT: 30,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_MODECHANGE: 31,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_SELECT: 41,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_PRINT: 42,

    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_EXECUTE: 43,

    /** Linux support for this keycode was added in Gecko 4.0.	 */
    VK_SLEEP: 95
  };
  var BACKENDS = {
    "hex": Hex,
    "rect": Rect,
    "tile": Tile,
    "tile-gl": TileGL,
    "term": Term
  };
  var DEFAULT_OPTIONS = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    transpose: false,
    layout: "rect",
    fontSize: 15,
    spacing: 1,
    border: 0,
    forceSquareRatio: false,
    fontFamily: "monospace",
    fontStyle: "",
    fg: "#ccc",
    bg: "#000",
    tileWidth: 32,
    tileHeight: 32,
    tileMap: {},
    tileSet: null,
    tileColorize: false
  };
  /**
   * @class Visual map display
   */

  var Display =
  /** @class */
  function () {
    var Display =
    /*#__PURE__*/
    function () {
      function Display(options) {
        if (options === void 0) {
          options = {};
        }

        this._data = {};
        this._dirty = false; // false = nothing, true = all, object = dirty cells

        this._options = {};
        options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.setOptions(options);
        this.DEBUG = this.DEBUG.bind(this);
        this._tick = this._tick.bind(this);

        this._backend.schedule(this._tick);
      }
      /**
       * Debug helper, ideal as a map generator callback. Always bound to this.
       * @param {int} x
       * @param {int} y
       * @param {int} what
       */


      var _proto9 = Display.prototype;

      _proto9.DEBUG = function DEBUG(x, y, what) {
        var colors = [this._options.bg, this._options.fg];
        this.draw(x, y, null, null, colors[what % colors.length]);
      };
      /**
       * Clear the whole display (cover it with background color)
       */


      _proto9.clear = function clear() {
        this._data = {};
        this._dirty = true;
      };
      /**
       * @see ROT.Display
       */


      _proto9.setOptions = function setOptions(options) {
        Object.assign(this._options, options);

        if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
          if (options.layout) {
            var ctor = BACKENDS[options.layout];
            this._backend = new ctor();
          }

          this._backend.setOptions(this._options);

          this._dirty = true;
        }

        return this;
      };
      /**
       * Returns currently set options
       */


      _proto9.getOptions = function getOptions() {
        return this._options;
      };
      /**
       * Returns the DOM node of this display
       */


      _proto9.getContainer = function getContainer() {
        return this._backend.getContainer();
      };
      /**
       * Compute the maximum width/height to fit into a set of given constraints
       * @param {int} availWidth Maximum allowed pixel width
       * @param {int} availHeight Maximum allowed pixel height
       * @returns {int[2]} cellWidth,cellHeight
       */


      _proto9.computeSize = function computeSize(availWidth, availHeight) {
        return this._backend.computeSize(availWidth, availHeight);
      };
      /**
       * Compute the maximum font size to fit into a set of given constraints
       * @param {int} availWidth Maximum allowed pixel width
       * @param {int} availHeight Maximum allowed pixel height
       * @returns {int} fontSize
       */


      _proto9.computeFontSize = function computeFontSize(availWidth, availHeight) {
        return this._backend.computeFontSize(availWidth, availHeight);
      };

      _proto9.computeTileSize = function computeTileSize(availWidth, availHeight) {
        var width = Math.floor(availWidth / this._options.width);
        var height = Math.floor(availHeight / this._options.height);
        return [width, height];
      };
      /**
       * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
       * @param {Event} e event
       * @returns {int[2]} -1 for values outside of the canvas
       */


      _proto9.eventToPosition = function eventToPosition(e) {
        var x, y;

        if ("touches" in e) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else {
          x = e.clientX;
          y = e.clientY;
        }

        return this._backend.eventToPosition(x, y);
      };
      /**
       * @param {int} x
       * @param {int} y
       * @param {string || string[]} ch One or more chars (will be overlapping themselves)
       * @param {string} [fg] foreground color
       * @param {string} [bg] background color
       */


      _proto9.draw = function draw(x, y, ch, fg, bg) {
        if (!fg) {
          fg = this._options.fg;
        }

        if (!bg) {
          bg = this._options.bg;
        }

        var key = x + "," + y;
        this._data[key] = [x, y, ch, fg, bg];

        if (this._dirty === true) {
          return;
        } // will already redraw everything 


        if (!this._dirty) {
          this._dirty = {};
        } // first!


        this._dirty[key] = true;
      };
      /**
       * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
       * @param {int} x
       * @param {int} y
       * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
       * @param {int} [maxWidth] wrap at what width?
       * @returns {int} lines drawn
       */


      _proto9.drawText = function drawText(x, y, text, maxWidth) {
        var fg = null;
        var bg = null;
        var cx = x;
        var cy = y;
        var lines = 1;

        if (!maxWidth) {
          maxWidth = this._options.width - x;
        }

        var tokens = tokenize(text, maxWidth);

        while (tokens.length) {
          // interpret tokenized opcode stream
          var token = tokens.shift();

          switch (token.type) {
            case TYPE_TEXT:
              var isSpace = false,
                  isPrevSpace = false,
                  isFullWidth = false,
                  isPrevFullWidth = false;

              for (var i = 0; i < token.value.length; i++) {
                var cc = token.value.charCodeAt(i);
                var c = token.value.charAt(i);

                if (this._options.layout === "term") {
                  var cch = cc >> 8;
                  var isCJK = cch === 0x11 || cch >= 0x2e && cch <= 0x9f || cch >= 0xac && cch <= 0xd7 || cc >= 0xA960 && cc <= 0xA97F;

                  if (isCJK) {
                    this.draw(cx + 0, cy, c, fg, bg);
                    this.draw(cx + 1, cy, "\t", fg, bg);
                    cx += 2;
                    continue;
                  }
                } // Assign to `true` when the current char is full-width.


                isFullWidth = cc > 0xff00 && cc < 0xff61 || cc > 0xffdc && cc < 0xffe8 || cc > 0xffee; // Current char is space, whatever full-width or half-width both are OK.

                isSpace = c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000; // The previous char is full-width and
                // current char is nether half-width nor a space.

                if (isPrevFullWidth && !isFullWidth && !isSpace) {
                  cx++;
                } // add an extra position
                // The current char is full-width and
                // the previous char is not a space.


                if (isFullWidth && !isPrevSpace) {
                  cx++;
                } // add an extra position


                this.draw(cx++, cy, c, fg, bg);
                isPrevSpace = isSpace;
                isPrevFullWidth = isFullWidth;
              }

              break;

            case TYPE_FG:
              fg = token.value || null;
              break;

            case TYPE_BG:
              bg = token.value || null;
              break;

            case TYPE_NEWLINE:
              cx = x;
              cy++;
              lines++;
              break;
          }
        }

        return lines;
      };
      /**
       * Timer tick: update dirty parts
       */


      _proto9._tick = function _tick() {
        this._backend.schedule(this._tick);

        if (!this._dirty) {
          return;
        }

        if (this._dirty === true) {
          // draw all
          this._backend.clear();

          for (var id in this._data) {
            this._draw(id, false);
          } // redraw cached data 

        } else {
          // draw only dirty 
          for (var key in this._dirty) {
            this._draw(key, true);
          }
        }

        this._dirty = false;
      };
      /**
       * @param {string} key What to draw
       * @param {bool} clearBefore Is it necessary to clean before?
       */


      _proto9._draw = function _draw(key, clearBefore) {
        var data = this._data[key];

        if (data[4] != this._options.bg) {
          clearBefore = true;
        }

        this._backend.draw(data, clearBefore);
      };

      return Display;
    }();

    Display.Rect = Rect;
    Display.Hex = Hex;
    Display.Tile = Tile;
    Display.TileGL = TileGL;
    Display.Term = Term;
    return Display;
  }();
  /**
   * @class (Markov process)-based string generator.
   * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>.
   * Offers configurable order and prior.
   */


  var StringGenerator =
  /*#__PURE__*/
  function () {
    function StringGenerator(options) {
      this._options = {
        words: false,
        order: 3,
        prior: 0.001
      };
      Object.assign(this._options, options);
      this._boundary = String.fromCharCode(0);
      this._suffix = this._boundary;
      this._prefix = [];

      for (var i = 0; i < this._options.order; i++) {
        this._prefix.push(this._boundary);
      }

      this._priorValues = {};
      this._priorValues[this._boundary] = this._options.prior;
      this._data = {};
    }
    /**
     * Remove all learning data
     */


    var _proto10 = StringGenerator.prototype;

    _proto10.clear = function clear() {
      this._data = {};
      this._priorValues = {};
    };
    /**
     * @returns {string} Generated string
     */


    _proto10.generate = function generate() {
      var result = [this._sample(this._prefix)];

      while (result[result.length - 1] != this._boundary) {
        result.push(this._sample(result));
      }

      return this._join(result.slice(0, -1));
    };
    /**
     * Observe (learn) a string from a training set
     */


    _proto10.observe = function observe(string) {
      var tokens = this._split(string);

      for (var i = 0; i < tokens.length; i++) {
        this._priorValues[tokens[i]] = this._options.prior;
      }

      tokens = this._prefix.concat(tokens).concat(this._suffix);
      /* add boundary symbols */

      for (var _i2 = this._options.order; _i2 < tokens.length; _i2++) {
        var context = tokens.slice(_i2 - this._options.order, _i2);
        var event = tokens[_i2];

        for (var j = 0; j < context.length; j++) {
          var subcontext = context.slice(j);

          this._observeEvent(subcontext, event);
        }
      }
    };

    _proto10.getStats = function getStats() {
      var parts = [];
      var priorCount = Object.keys(this._priorValues).length;
      priorCount--; // boundary

      parts.push("distinct samples: " + priorCount);
      var dataCount = Object.keys(this._data).length;
      var eventCount = 0;

      for (var p in this._data) {
        eventCount += Object.keys(this._data[p]).length;
      }

      parts.push("dictionary size (contexts): " + dataCount);
      parts.push("dictionary size (events): " + eventCount);
      return parts.join(", ");
    };
    /**
     * @param {string}
     * @returns {string[]}
     */


    _proto10._split = function _split(str) {
      return str.split(this._options.words ? /\s+/ : "");
    };
    /**
     * @param {string[]}
     * @returns {string}
     */


    _proto10._join = function _join(arr) {
      return arr.join(this._options.words ? " " : "");
    };
    /**
     * @param {string[]} context
     * @param {string} event
     */


    _proto10._observeEvent = function _observeEvent(context, event) {
      var key = this._join(context);

      if (!(key in this._data)) {
        this._data[key] = {};
      }

      var data = this._data[key];

      if (!(event in data)) {
        data[event] = 0;
      }

      data[event]++;
    };
    /**
     * @param {string[]}
     * @returns {string}
     */


    _proto10._sample = function _sample(context) {
      context = this._backoff(context);

      var key = this._join(context);

      var data = this._data[key];
      var available = {};

      if (this._options.prior) {
        for (var event in this._priorValues) {
          available[event] = this._priorValues[event];
        }

        for (var _event in data) {
          available[_event] += data[_event];
        }
      } else {
        available = data;
      }

      return RNG$1.getWeightedValue(available);
    };
    /**
     * @param {string[]}
     * @returns {string[]}
     */


    _proto10._backoff = function _backoff(context) {
      if (context.length > this._options.order) {
        context = context.slice(-this._options.order);
      } else if (context.length < this._options.order) {
        context = this._prefix.slice(0, this._options.order - context.length).concat(context);
      }

      while (!(this._join(context) in this._data) && context.length > 0) {
        context = context.slice(1);
      }

      return context;
    };

    return StringGenerator;
  }();

  var MinHeap =
  /*#__PURE__*/
  function () {
    function MinHeap() {
      this.heap = [];
      this.timestamp = 0;
    }

    var _proto11 = MinHeap.prototype;

    _proto11.lessThan = function lessThan(a, b) {
      return a.key == b.key ? a.timestamp < b.timestamp : a.key < b.key;
    };

    _proto11.shift = function shift(v) {
      this.heap = this.heap.map(function (_ref) {
        var key = _ref.key,
            value = _ref.value,
            timestamp = _ref.timestamp;
        return {
          key: key + v,
          value: value,
          timestamp: timestamp
        };
      });
    };

    _proto11.len = function len() {
      return this.heap.length;
    };

    _proto11.push = function push(value, key) {
      this.timestamp += 1;
      var loc = this.len();
      this.heap.push({
        value: value,
        timestamp: this.timestamp,
        key: key
      });
      this.updateUp(loc);
    };

    _proto11.pop = function pop() {
      if (this.len() == 0) {
        throw new Error("no element to pop");
      }

      var top = this.heap[0];

      if (this.len() > 1) {
        this.heap[0] = this.heap.pop();
        this.updateDown(0);
      } else {
        this.heap.pop();
      }

      return top;
    };

    _proto11.find = function find(v) {
      for (var i = 0; i < this.len(); i++) {
        if (v == this.heap[i].value) {
          return this.heap[i];
        }
      }

      return null;
    };

    _proto11.remove = function remove(v) {
      var index = null;

      for (var i = 0; i < this.len(); i++) {
        if (v == this.heap[i].value) {
          index = i;
        }
      }

      if (index != null) {
        if (this.len() > 1) {
          this.heap[index] = this.heap.pop();
          this.updateDown(index);
          return true;
        } else {
          this.heap.pop();
          return true;
        }
      }

      return false;
    };

    _proto11.parentNode = function parentNode(x) {
      return Math.floor((x - 1) / 2);
    };

    _proto11.leftChildNode = function leftChildNode(x) {
      return 2 * x + 1;
    };

    _proto11.rightChildNode = function rightChildNode(x) {
      return 2 * x + 2;
    };

    _proto11.existNode = function existNode(x) {
      return x >= 0 && x < this.heap.length;
    };

    _proto11.swap = function swap(x, y) {
      var t = this.heap[x];
      this.heap[x] = this.heap[y];
      this.heap[y] = t;
    };

    _proto11.minNode = function minNode(numbers) {
      var validnumbers = numbers.filter(this.existNode.bind(this));
      var minimal = validnumbers[0];

      for (var _iterator = validnumbers, _isArray = Array.isArray(_iterator), _i3 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i3 >= _iterator.length) break;
          _ref2 = _iterator[_i3++];
        } else {
          _i3 = _iterator.next();
          if (_i3.done) break;
          _ref2 = _i3.value;
        }

        var i = _ref2;

        if (this.lessThan(this.heap[i], this.heap[minimal])) {
          minimal = i;
        }
      }

      return minimal;
    };

    _proto11.updateUp = function updateUp(x) {
      if (x == 0) {
        return;
      }

      var parent = this.parentNode(x);

      if (this.existNode(parent) && this.lessThan(this.heap[x], this.heap[parent])) {
        this.swap(x, parent);
        this.updateUp(parent);
      }
    };

    _proto11.updateDown = function updateDown(x) {
      var leftChild = this.leftChildNode(x);
      var rightChild = this.rightChildNode(x);

      if (!this.existNode(leftChild)) {
        return;
      }

      var m = this.minNode([x, leftChild, rightChild]);

      if (m != x) {
        this.swap(x, m);
        this.updateDown(m);
      }
    };

    _proto11.debugPrint = function debugPrint() {
      console.log(this.heap);
    };

    return MinHeap;
  }();

  var EventQueue =
  /*#__PURE__*/
  function () {
    /**
     * @class Generic event queue: stores events and retrieves them based on their time
     */
    function EventQueue() {
      this._time = 0;
      this._events = new MinHeap();
    }
    /**
     * @returns {number} Elapsed time
     */


    var _proto12 = EventQueue.prototype;

    _proto12.getTime = function getTime() {
      return this._time;
    };
    /**
     * Clear all scheduled events
     */


    _proto12.clear = function clear() {
      this._events = new MinHeap();
      return this;
    };
    /**
     * @param {?} event
     * @param {number} time
     */


    _proto12.add = function add(event, time) {
      this._events.push(event, time);
    };
    /**
     * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
     * @returns {? || null} The event previously added by addEvent, null if no event available
     */


    _proto12.get = function get() {
      if (!this._events.len()) {
        return null;
      }

      var _this$_events$pop = this._events.pop(),
          time = _this$_events$pop.key,
          event = _this$_events$pop.value;

      if (time > 0) {
        /* advance */
        this._time += time;

        this._events.shift(-time);
      }

      return event;
    };
    /**
     * Get the time associated with the given event
     * @param {?} event
     * @returns {number} time
     */


    _proto12.getEventTime = function getEventTime(event) {
      var r = this._events.find(event);

      if (r) {
        var key = r.key;
        return key;
      }

      return undefined;
    };
    /**
     * Remove an event from the queue
     * @param {?} event
     * @returns {bool} success?
     */


    _proto12.remove = function remove(event) {
      return this._events.remove(event);
    };

    return EventQueue;
  }();

  var Scheduler =
  /*#__PURE__*/
  function () {
    /**
     * @class Abstract scheduler
     */
    function Scheduler() {
      this._queue = new EventQueue();
      this._repeat = [];
      this._current = null;
    }
    /**
     * @see ROT.EventQueue#getTime
     */


    var _proto13 = Scheduler.prototype;

    _proto13.getTime = function getTime() {
      return this._queue.getTime();
    };
    /**
     * @param {?} item
     * @param {bool} repeat
     */


    _proto13.add = function add(item, repeat) {
      if (repeat) {
        this._repeat.push(item);
      }

      return this;
    };
    /**
     * Get the time the given item is scheduled for
     * @param {?} item
     * @returns {number} time
     */


    _proto13.getTimeOf = function getTimeOf(item) {
      return this._queue.getEventTime(item);
    };
    /**
     * Clear all items
     */


    _proto13.clear = function clear() {
      this._queue.clear();

      this._repeat = [];
      this._current = null;
      return this;
    };
    /**
     * Remove a previously added item
     * @param {?} item
     * @returns {bool} successful?
     */


    _proto13.remove = function remove(item) {
      var result = this._queue.remove(item);

      var index = this._repeat.indexOf(item);

      if (index != -1) {
        this._repeat.splice(index, 1);
      }

      if (this._current == item) {
        this._current = null;
      }

      return result;
    };
    /**
     * Schedule next item
     * @returns {?}
     */


    _proto13.next = function next() {
      this._current = this._queue.get();
      return this._current;
    };

    return Scheduler;
  }();
  /**
   * @class Simple fair scheduler (round-robin style)
   */


  var Simple =
  /*#__PURE__*/
  function (_Scheduler) {
    _inheritsLoose(Simple, _Scheduler);

    function Simple() {
      return _Scheduler.apply(this, arguments) || this;
    }

    var _proto14 = Simple.prototype;

    _proto14.add = function add(item, repeat) {
      this._queue.add(item, 0);

      return _Scheduler.prototype.add.call(this, item, repeat);
    };

    _proto14.next = function next() {
      if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
        this._queue.add(this._current, 0);
      }

      return _Scheduler.prototype.next.call(this);
    };

    return Simple;
  }(Scheduler);
  /**
   * @class Speed-based scheduler
   */


  var Speed =
  /*#__PURE__*/
  function (_Scheduler2) {
    _inheritsLoose(Speed, _Scheduler2);

    function Speed() {
      return _Scheduler2.apply(this, arguments) || this;
    }

    var _proto15 = Speed.prototype;

    /**
     * @param {object} item anything with "getSpeed" method
     * @param {bool} repeat
     * @param {number} [time=1/item.getSpeed()]
     * @see ROT.Scheduler#add
     */
    _proto15.add = function add(item, repeat, time) {
      this._queue.add(item, time !== undefined ? time : 1 / item.getSpeed());

      return _Scheduler2.prototype.add.call(this, item, repeat);
    };
    /**
     * @see ROT.Scheduler#next
     */


    _proto15.next = function next() {
      if (this._current && this._repeat.indexOf(this._current) != -1) {
        this._queue.add(this._current, 1 / this._current.getSpeed());
      }

      return _Scheduler2.prototype.next.call(this);
    };

    return Speed;
  }(Scheduler);
  /**
   * @class Action-based scheduler
   * @augments ROT.Scheduler
   */


  var Action =
  /*#__PURE__*/
  function (_Scheduler3) {
    _inheritsLoose(Action, _Scheduler3);

    function Action() {
      var _this9;

      _this9 = _Scheduler3.call(this) || this;
      _this9._defaultDuration = 1;
      /* for newly added */

      _this9._duration = _this9._defaultDuration;
      /* for this._current */

      return _this9;
    }
    /**
     * @param {object} item
     * @param {bool} repeat
     * @param {number} [time=1]
     * @see ROT.Scheduler#add
     */


    var _proto16 = Action.prototype;

    _proto16.add = function add(item, repeat, time) {
      this._queue.add(item, time || this._defaultDuration);

      return _Scheduler3.prototype.add.call(this, item, repeat);
    };

    _proto16.clear = function clear() {
      this._duration = this._defaultDuration;
      return _Scheduler3.prototype.clear.call(this);
    };

    _proto16.remove = function remove(item) {
      if (item == this._current) {
        this._duration = this._defaultDuration;
      }

      return _Scheduler3.prototype.remove.call(this, item);
    };
    /**
     * @see ROT.Scheduler#next
     */


    _proto16.next = function next() {
      if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
        this._queue.add(this._current, this._duration || this._defaultDuration);

        this._duration = this._defaultDuration;
      }

      return _Scheduler3.prototype.next.call(this);
    };
    /**
     * Set duration for the active item
     */


    _proto16.setDuration = function setDuration(time) {
      if (this._current) {
        this._duration = time;
      }

      return this;
    };

    return Action;
  }(Scheduler);

  var index = {
    Simple: Simple,
    Speed: Speed,
    Action: Action
  };

  var FOV =
  /*#__PURE__*/
  function () {
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    function FOV(lightPassesCallback, options) {
      if (options === void 0) {
        options = {};
      }

      this._lightPasses = lightPassesCallback;
      this._options = Object.assign({
        topology: 8
      }, options);
    }
    /**
     * Return all neighbors in a concentric ring
     * @param {int} cx center-x
     * @param {int} cy center-y
     * @param {int} r range
     */


    var _proto17 = FOV.prototype;

    _proto17._getCircle = function _getCircle(cx, cy, r) {
      var result = [];
      var dirs, countFactor, startOffset;

      switch (this._options.topology) {
        case 4:
          countFactor = 1;
          startOffset = [0, 1];
          dirs = [DIRS[8][7], DIRS[8][1], DIRS[8][3], DIRS[8][5]];
          break;

        case 6:
          dirs = DIRS[6];
          countFactor = 1;
          startOffset = [-1, 1];
          break;

        case 8:
          dirs = DIRS[4];
          countFactor = 2;
          startOffset = [-1, 1];
          break;

        default:
          throw new Error("Incorrect topology for FOV computation");
          break;
      }
      /* starting neighbor */


      var x = cx + startOffset[0] * r;
      var y = cy + startOffset[1] * r;
      /* circle */

      for (var i = 0; i < dirs.length; i++) {
        for (var j = 0; j < r * countFactor; j++) {
          result.push([x, y]);
          x += dirs[i][0];
          y += dirs[i][1];
        }
      }

      return result;
    };

    return FOV;
  }();
  /**
   * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
   * @augments ROT.FOV
   */


  var DiscreteShadowcasting =
  /*#__PURE__*/
  function (_FOV) {
    _inheritsLoose(DiscreteShadowcasting, _FOV);

    function DiscreteShadowcasting() {
      return _FOV.apply(this, arguments) || this;
    }

    var _proto18 = DiscreteShadowcasting.prototype;

    _proto18.compute = function compute(x, y, R, callback) {
      /* this place is always visible */
      callback(x, y, 0, 1);
      /* standing in a dark place. FIXME is this a good idea?  */

      if (!this._lightPasses(x, y)) {
        return;
      }
      /* start and end angles */


      var DATA = [];
      var A, B, cx, cy, blocks;
      /* analyze surrounding cells in concentric rings, starting from the center */

      for (var r = 1; r <= R; r++) {
        var neighbors = this._getCircle(x, y, r);

        var angle = 360 / neighbors.length;

        for (var i = 0; i < neighbors.length; i++) {
          cx = neighbors[i][0];
          cy = neighbors[i][1];
          A = angle * (i - 0.5);
          B = A + angle;
          blocks = !this._lightPasses(cx, cy);

          if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) {
            callback(cx, cy, r, 1);
          }

          if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) {
            return;
          }
          /* cutoff? */

        }
        /* for all cells in this ring */

      }
      /* for all rings */

    };
    /**
     * @param {int} A start angle
     * @param {int} B end angle
     * @param {bool} blocks Does current cell block visibility?
     * @param {int[][]} DATA shadowed angle pairs
     */


    _proto18._visibleCoords = function _visibleCoords(A, B, blocks, DATA) {
      if (A < 0) {
        var v1 = this._visibleCoords(0, B, blocks, DATA);

        var v2 = this._visibleCoords(360 + A, 360, blocks, DATA);

        return v1 || v2;
      }

      var index = 0;

      while (index < DATA.length && DATA[index] < A) {
        index++;
      }

      if (index == DATA.length) {
        /* completely new shadow */
        if (blocks) {
          DATA.push(A, B);
        }

        return true;
      }

      var count = 0;

      if (index % 2) {
        /* this shadow starts in an existing shadow, or within its ending boundary */
        while (index < DATA.length && DATA[index] < B) {
          index++;
          count++;
        }

        if (count == 0) {
          return false;
        }

        if (blocks) {
          if (count % 2) {
            DATA.splice(index - count, count, B);
          } else {
            DATA.splice(index - count, count);
          }
        }

        return true;
      } else {
        /* this shadow starts outside an existing shadow, or within a starting boundary */
        while (index < DATA.length && DATA[index] < B) {
          index++;
          count++;
        }
        /* visible when outside an existing shadow, or when overlapping */


        if (A == DATA[index - count] && count == 1) {
          return false;
        }

        if (blocks) {
          if (count % 2) {
            DATA.splice(index - count, count, A);
          } else {
            DATA.splice(index - count, count, A, B);
          }
        }

        return true;
      }
    };

    return DiscreteShadowcasting;
  }(FOV);
  /**
   * @class Precise shadowcasting algorithm
   * @augments ROT.FOV
   */


  var PreciseShadowcasting =
  /*#__PURE__*/
  function (_FOV2) {
    _inheritsLoose(PreciseShadowcasting, _FOV2);

    function PreciseShadowcasting() {
      return _FOV2.apply(this, arguments) || this;
    }

    var _proto19 = PreciseShadowcasting.prototype;

    _proto19.compute = function compute(x, y, R, callback) {
      /* this place is always visible */
      callback(x, y, 0, 1);
      /* standing in a dark place. FIXME is this a good idea?  */

      if (!this._lightPasses(x, y)) {
        return;
      }
      /* list of all shadows */


      var SHADOWS = [];
      var cx, cy, blocks, A1, A2, visibility;
      /* analyze surrounding cells in concentric rings, starting from the center */

      for (var r = 1; r <= R; r++) {
        var neighbors = this._getCircle(x, y, r);

        var neighborCount = neighbors.length;

        for (var i = 0; i < neighborCount; i++) {
          cx = neighbors[i][0];
          cy = neighbors[i][1];
          /* shift half-an-angle backwards to maintain consistency of 0-th cells */

          A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
          A2 = [2 * i + 1, 2 * neighborCount];
          blocks = !this._lightPasses(cx, cy);
          visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);

          if (visibility) {
            callback(cx, cy, r, visibility);
          }

          if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
            return;
          }
          /* cutoff? */

        }
        /* for all cells in this ring */

      }
      /* for all rings */

    };
    /**
     * @param {int[2]} A1 arc start
     * @param {int[2]} A2 arc end
     * @param {bool} blocks Does current arc block visibility?
     * @param {int[][]} SHADOWS list of active shadows
     */


    _proto19._checkVisibility = function _checkVisibility(A1, A2, blocks, SHADOWS) {
      if (A1[0] > A2[0]) {
        /* split into two sub-arcs */
        var v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);

        var v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);

        return (v1 + v2) / 2;
      }
      /* index1: first shadow >= A1 */


      var index1 = 0,
          edge1 = false;

      while (index1 < SHADOWS.length) {
        var old = SHADOWS[index1];
        var diff = old[0] * A1[1] - A1[0] * old[1];

        if (diff >= 0) {
          /* old >= A1 */
          if (diff == 0 && !(index1 % 2)) {
            edge1 = true;
          }

          break;
        }

        index1++;
      }
      /* index2: last shadow <= A2 */


      var index2 = SHADOWS.length,
          edge2 = false;

      while (index2--) {
        var _old = SHADOWS[index2];

        var _diff = A2[0] * _old[1] - _old[0] * A2[1];

        if (_diff >= 0) {
          /* old <= A2 */
          if (_diff == 0 && index2 % 2) {
            edge2 = true;
          }

          break;
        }
      }

      var visible = true;

      if (index1 == index2 && (edge1 || edge2)) {
        /* subset of existing shadow, one of the edges match */
        visible = false;
      } else if (edge1 && edge2 && index1 + 1 == index2 && index2 % 2) {
        /* completely equivalent with existing shadow */
        visible = false;
      } else if (index1 > index2 && index1 % 2) {
        /* subset of existing shadow, not touching */
        visible = false;
      }

      if (!visible) {
        return 0;
      }
      /* fast case: not visible */


      var visibleLength;
      /* compute the length of visible arc, adjust list of shadows (if blocking) */

      var remove = index2 - index1 + 1;

      if (remove % 2) {
        if (index1 % 2) {
          /* first edge within existing shadow, second outside */
          var P = SHADOWS[index1];
          visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);

          if (blocks) {
            SHADOWS.splice(index1, remove, A2);
          }
        } else {
          /* second edge within existing shadow, first outside */
          var _P = SHADOWS[index2];
          visibleLength = (_P[0] * A1[1] - A1[0] * _P[1]) / (A1[1] * _P[1]);

          if (blocks) {
            SHADOWS.splice(index1, remove, A1);
          }
        }
      } else {
        if (index1 % 2) {
          /* both edges within existing shadows */
          var P1 = SHADOWS[index1];
          var P2 = SHADOWS[index2];
          visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);

          if (blocks) {
            SHADOWS.splice(index1, remove);
          }
        } else {
          /* both edges outside existing shadows */
          if (blocks) {
            SHADOWS.splice(index1, remove, A1, A2);
          }

          return 1;
          /* whole arc visible! */
        }
      }

      var arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
      return visibleLength / arcLength;
    };

    return PreciseShadowcasting;
  }(FOV);
  /** Octants used for translating recursive shadowcasting offsets */


  var OCTANTS = [[-1, 0, 0, 1], [0, -1, 1, 0], [0, -1, -1, 0], [-1, 0, 0, -1], [1, 0, 0, -1], [0, 1, -1, 0], [0, 1, 1, 0], [1, 0, 0, 1]];
  /**
   * @class Recursive shadowcasting algorithm
   * Currently only supports 4/8 topologies, not hexagonal.
   * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
   * @augments ROT.FOV
   */

  var RecursiveShadowcasting =
  /*#__PURE__*/
  function (_FOV3) {
    _inheritsLoose(RecursiveShadowcasting, _FOV3);

    function RecursiveShadowcasting() {
      return _FOV3.apply(this, arguments) || this;
    }

    var _proto20 = RecursiveShadowcasting.prototype;

    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    _proto20.compute = function compute(x, y, R, callback) {
      //You can always see your own tile
      callback(x, y, 0, 1);

      for (var i = 0; i < OCTANTS.length; i++) {
        this._renderOctant(x, y, OCTANTS[i], R, callback);
      }
    };
    /**
     * Compute visibility for a 180-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */


    _proto20.compute180 = function compute180(x, y, R, dir, callback) {
      //You can always see your own tile
      callback(x, y, 0, 1);
      var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees

      var nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees

      var nextOctant = (dir + 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees

      this._renderOctant(x, y, OCTANTS[nextPreviousOctant], R, callback);

      this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);

      this._renderOctant(x, y, OCTANTS[dir], R, callback);

      this._renderOctant(x, y, OCTANTS[nextOctant], R, callback);
    };

    /**
     * Compute visibility for a 90-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    _proto20.compute90 = function compute90(x, y, R, dir, callback) {
      //You can always see your own tile
      callback(x, y, 0, 1);
      var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees

      this._renderOctant(x, y, OCTANTS[dir], R, callback);

      this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
    };
    /**
     * Render one octant (45-degree arc) of the viewshed
     * @param {int} x
     * @param {int} y
     * @param {int} octant Octant to be rendered
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */


    _proto20._renderOctant = function _renderOctant(x, y, octant, R, callback) {
      //Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
      this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
    };
    /**
     * Actually calculates the visibility
     * @param {int} startX The starting X coordinate
     * @param {int} startY The starting Y coordinate
     * @param {int} row The row to render
     * @param {float} visSlopeStart The slope to start at
     * @param {float} visSlopeEnd The slope to end at
     * @param {int} radius The radius to reach out to
     * @param {int} xx
     * @param {int} xy
     * @param {int} yx
     * @param {int} yy
     * @param {function} callback The callback to use when we hit a block that is visible
     */


    _proto20._castVisibility = function _castVisibility(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
      if (visSlopeStart < visSlopeEnd) {
        return;
      }

      for (var i = row; i <= radius; i++) {
        var dx = -i - 1;
        var dy = -i;
        var blocked = false;
        var newStart = 0; //'Row' could be column, names here assume octant 0 and would be flipped for half the octants

        while (dx <= 0) {
          dx += 1; //Translate from relative coordinates to map coordinates

          var mapX = startX + dx * xx + dy * xy;
          var mapY = startY + dx * yx + dy * yy; //Range of the row

          var slopeStart = (dx - 0.5) / (dy + 0.5);
          var slopeEnd = (dx + 0.5) / (dy - 0.5); //Ignore if not yet at left edge of Octant

          if (slopeEnd > visSlopeStart) {
            continue;
          } //Done if past right edge


          if (slopeStart < visSlopeEnd) {
            break;
          } //If it's in range, it's visible


          if (dx * dx + dy * dy < radius * radius) {
            callback(mapX, mapY, i, 1);
          }

          if (!blocked) {
            //If tile is a blocking tile, cast around it
            if (!this._lightPasses(mapX, mapY) && i < radius) {
              blocked = true;

              this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);

              newStart = slopeEnd;
            }
          } else {
            //Keep narrowing if scanning across a block
            if (!this._lightPasses(mapX, mapY)) {
              newStart = slopeEnd;
              continue;
            } //Block has ended


            blocked = false;
            visSlopeStart = newStart;
          }
        }

        if (blocked) {
          break;
        }
      }
    };

    return RecursiveShadowcasting;
  }(FOV);

  var index$1 = {
    DiscreteShadowcasting: DiscreteShadowcasting,
    PreciseShadowcasting: PreciseShadowcasting,
    RecursiveShadowcasting: RecursiveShadowcasting
  };

  var Map =
  /*#__PURE__*/
  function () {
    /**
     * @class Base map generator
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     */
    function Map(width, height) {
      if (width === void 0) {
        width = DEFAULT_WIDTH;
      }

      if (height === void 0) {
        height = DEFAULT_HEIGHT;
      }

      this._width = width;
      this._height = height;
    }

    var _proto21 = Map.prototype;

    _proto21._fillMap = function _fillMap(value) {
      var map = [];

      for (var i = 0; i < this._width; i++) {
        map.push([]);

        for (var j = 0; j < this._height; j++) {
          map[i].push(value);
        }
      }

      return map;
    };

    return Map;
  }();
  /**
   * @class Simple empty rectangular room
   * @augments ROT.Map
   */


  var Arena =
  /*#__PURE__*/
  function (_Map) {
    _inheritsLoose(Arena, _Map);

    function Arena() {
      return _Map.apply(this, arguments) || this;
    }

    var _proto22 = Arena.prototype;

    _proto22.create = function create(callback) {
      var w = this._width - 1;
      var h = this._height - 1;

      for (var i = 0; i <= w; i++) {
        for (var j = 0; j <= h; j++) {
          var empty = i && j && i < w && j < h;
          callback(i, j, empty ? 0 : 1);
        }
      }

      return this;
    };

    return Arena;
  }(Map);
  /**
   * @class Dungeon map: has rooms and corridors
   * @augments ROT.Map
   */


  var Dungeon =
  /*#__PURE__*/
  function (_Map2) {
    _inheritsLoose(Dungeon, _Map2);

    function Dungeon(width, height) {
      var _this10;

      _this10 = _Map2.call(this, width, height) || this;
      _this10._rooms = [];
      _this10._corridors = [];
      return _this10;
    }
    /**
     * Get all generated rooms
     * @returns {ROT.Map.Feature.Room[]}
     */


    var _proto23 = Dungeon.prototype;

    _proto23.getRooms = function getRooms() {
      return this._rooms;
    };
    /**
     * Get all generated corridors
     * @returns {ROT.Map.Feature.Corridor[]}
     */


    _proto23.getCorridors = function getCorridors() {
      return this._corridors;
    };

    return Dungeon;
  }(Map);
  /**
   * @class Dungeon feature; has own .create() method
   */


  var Feature = function Feature() {};
  /**
   * @class Room
   * @augments ROT.Map.Feature
   * @param {int} x1
   * @param {int} y1
   * @param {int} x2
   * @param {int} y2
   * @param {int} [doorX]
   * @param {int} [doorY]
   */


  var Room =
  /*#__PURE__*/
  function (_Feature) {
    _inheritsLoose(Room, _Feature);

    function Room(x1, y1, x2, y2, doorX, doorY) {
      var _this11;

      _this11 = _Feature.call(this) || this;
      _this11._x1 = x1;
      _this11._y1 = y1;
      _this11._x2 = x2;
      _this11._y2 = y2;
      _this11._doors = {};

      if (doorX !== undefined && doorY !== undefined) {
        _this11.addDoor(doorX, doorY);
      }

      return _this11;
    }

    /**
     * Room of random size, with a given doors and direction
     */
    Room.createRandomAt = function createRandomAt(x, y, dx, dy, options) {
      var min = options.roomWidth[0];
      var max = options.roomWidth[1];
      var width = RNG$1.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      var height = RNG$1.getUniformInt(min, max);

      if (dx == 1) {
        /* to the right */
        var y2 = y - Math.floor(RNG$1.getUniform() * height);
        return new this(x + 1, y2, x + width, y2 + height - 1, x, y);
      }

      if (dx == -1) {
        /* to the left */
        var _y = y - Math.floor(RNG$1.getUniform() * height);

        return new this(x - width, _y, x - 1, _y + height - 1, x, y);
      }

      if (dy == 1) {
        /* to the bottom */
        var x2 = x - Math.floor(RNG$1.getUniform() * width);
        return new this(x2, y + 1, x2 + width - 1, y + height, x, y);
      }

      if (dy == -1) {
        /* to the top */
        var _x = x - Math.floor(RNG$1.getUniform() * width);

        return new this(_x, y - height, _x + width - 1, y - 1, x, y);
      }

      throw new Error("dx or dy must be 1 or -1");
    };
    /**
     * Room of random size, positioned around center coords
     */


    Room.createRandomCenter = function createRandomCenter(cx, cy, options) {
      var min = options.roomWidth[0];
      var max = options.roomWidth[1];
      var width = RNG$1.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      var height = RNG$1.getUniformInt(min, max);
      var x1 = cx - Math.floor(RNG$1.getUniform() * width);
      var y1 = cy - Math.floor(RNG$1.getUniform() * height);
      var x2 = x1 + width - 1;
      var y2 = y1 + height - 1;
      return new this(x1, y1, x2, y2);
    };
    /**
     * Room of random size within a given dimensions
     */


    Room.createRandom = function createRandom(availWidth, availHeight, options) {
      var min = options.roomWidth[0];
      var max = options.roomWidth[1];
      var width = RNG$1.getUniformInt(min, max);
      min = options.roomHeight[0];
      max = options.roomHeight[1];
      var height = RNG$1.getUniformInt(min, max);
      var left = availWidth - width - 1;
      var top = availHeight - height - 1;
      var x1 = 1 + Math.floor(RNG$1.getUniform() * left);
      var y1 = 1 + Math.floor(RNG$1.getUniform() * top);
      var x2 = x1 + width - 1;
      var y2 = y1 + height - 1;
      return new this(x1, y1, x2, y2);
    };

    var _proto24 = Room.prototype;

    _proto24.addDoor = function addDoor(x, y) {
      this._doors[x + "," + y] = 1;
      return this;
    };
    /**
     * @param {function}
     */


    _proto24.getDoors = function getDoors(cb) {
      for (var key in this._doors) {
        var parts = key.split(",");
        cb(parseInt(parts[0]), parseInt(parts[1]));
      }

      return this;
    };

    _proto24.clearDoors = function clearDoors() {
      this._doors = {};
      return this;
    };

    _proto24.addDoors = function addDoors(isWallCallback) {
      var left = this._x1 - 1;
      var right = this._x2 + 1;
      var top = this._y1 - 1;
      var bottom = this._y2 + 1;

      for (var x = left; x <= right; x++) {
        for (var y = top; y <= bottom; y++) {
          if (x != left && x != right && y != top && y != bottom) {
            continue;
          }

          if (isWallCallback(x, y)) {
            continue;
          }

          this.addDoor(x, y);
        }
      }

      return this;
    };

    _proto24.debug = function debug() {
      console.log("room", this._x1, this._y1, this._x2, this._y2);
    };

    _proto24.isValid = function isValid(isWallCallback, canBeDugCallback) {
      var left = this._x1 - 1;
      var right = this._x2 + 1;
      var top = this._y1 - 1;
      var bottom = this._y2 + 1;

      for (var x = left; x <= right; x++) {
        for (var y = top; y <= bottom; y++) {
          if (x == left || x == right || y == top || y == bottom) {
            if (!isWallCallback(x, y)) {
              return false;
            }
          } else {
            if (!canBeDugCallback(x, y)) {
              return false;
            }
          }
        }
      }

      return true;
    };
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
     */


    _proto24.create = function create(digCallback) {
      var left = this._x1 - 1;
      var right = this._x2 + 1;
      var top = this._y1 - 1;
      var bottom = this._y2 + 1;
      var value = 0;

      for (var x = left; x <= right; x++) {
        for (var y = top; y <= bottom; y++) {
          if (x + "," + y in this._doors) {
            value = 2;
          } else if (x == left || x == right || y == top || y == bottom) {
            value = 1;
          } else {
            value = 0;
          }

          digCallback(x, y, value);
        }
      }
    };

    _proto24.getCenter = function getCenter() {
      return [Math.round((this._x1 + this._x2) / 2), Math.round((this._y1 + this._y2) / 2)];
    };

    _proto24.getLeft = function getLeft() {
      return this._x1;
    };

    _proto24.getRight = function getRight() {
      return this._x2;
    };

    _proto24.getTop = function getTop() {
      return this._y1;
    };

    _proto24.getBottom = function getBottom() {
      return this._y2;
    };

    return Room;
  }(Feature);
  /**
   * @class Corridor
   * @augments ROT.Map.Feature
   * @param {int} startX
   * @param {int} startY
   * @param {int} endX
   * @param {int} endY
   */


  var Corridor =
  /*#__PURE__*/
  function (_Feature2) {
    _inheritsLoose(Corridor, _Feature2);

    function Corridor(startX, startY, endX, endY) {
      var _this12;

      _this12 = _Feature2.call(this) || this;
      _this12._startX = startX;
      _this12._startY = startY;
      _this12._endX = endX;
      _this12._endY = endY;
      _this12._endsWithAWall = true;
      return _this12;
    }

    Corridor.createRandomAt = function createRandomAt(x, y, dx, dy, options) {
      var min = options.corridorLength[0];
      var max = options.corridorLength[1];
      var length = RNG$1.getUniformInt(min, max);
      return new this(x, y, x + dx * length, y + dy * length);
    };

    var _proto25 = Corridor.prototype;

    _proto25.debug = function debug() {
      console.log("corridor", this._startX, this._startY, this._endX, this._endY);
    };

    _proto25.isValid = function isValid(isWallCallback, canBeDugCallback) {
      var sx = this._startX;
      var sy = this._startY;
      var dx = this._endX - sx;
      var dy = this._endY - sy;
      var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));

      if (dx) {
        dx = dx / Math.abs(dx);
      }

      if (dy) {
        dy = dy / Math.abs(dy);
      }

      var nx = dy;
      var ny = -dx;
      var ok = true;

      for (var i = 0; i < length; i++) {
        var x = sx + i * dx;
        var y = sy + i * dy;

        if (!canBeDugCallback(x, y)) {
          ok = false;
        }

        if (!isWallCallback(x + nx, y + ny)) {
          ok = false;
        }

        if (!isWallCallback(x - nx, y - ny)) {
          ok = false;
        }

        if (!ok) {
          length = i;
          this._endX = x - dx;
          this._endY = y - dy;
          break;
        }
      }
      /**
       * If the length degenerated, this corridor might be invalid
       */

      /* not supported */


      if (length == 0) {
        return false;
      }
      /* length 1 allowed only if the next space is empty */


      if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) {
        return false;
      }
      /**
       * We do not want the corridor to crash into a corner of a room;
       * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
       *
       * Situation:
       * #######1
       * .......?
       * #######2
       *
       * The corridor was dug from left to right.
       * 1, 2 - problematic corners, ? = N+1th cell (not dug)
       */


      var firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
      var secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
      this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);

      if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) {
        return false;
      }

      return true;
    };
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
     */


    _proto25.create = function create(digCallback) {
      var sx = this._startX;
      var sy = this._startY;
      var dx = this._endX - sx;
      var dy = this._endY - sy;
      var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));

      if (dx) {
        dx = dx / Math.abs(dx);
      }

      if (dy) {
        dy = dy / Math.abs(dy);
      }

      for (var i = 0; i < length; i++) {
        var x = sx + i * dx;
        var y = sy + i * dy;
        digCallback(x, y, 0);
      }

      return true;
    };

    _proto25.createPriorityWalls = function createPriorityWalls(priorityWallCallback) {
      if (!this._endsWithAWall) {
        return;
      }

      var sx = this._startX;
      var sy = this._startY;
      var dx = this._endX - sx;
      var dy = this._endY - sy;

      if (dx) {
        dx = dx / Math.abs(dx);
      }

      if (dy) {
        dy = dy / Math.abs(dy);
      }

      var nx = dy;
      var ny = -dx;
      priorityWallCallback(this._endX + dx, this._endY + dy);
      priorityWallCallback(this._endX + nx, this._endY + ny);
      priorityWallCallback(this._endX - nx, this._endY - ny);
    };

    return Corridor;
  }(Feature);
  /**
   * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
   * @augments ROT.Map.Dungeon
   */


  var Uniform =
  /*#__PURE__*/
  function (_Dungeon) {
    _inheritsLoose(Uniform, _Dungeon);

    function Uniform(width, height, options) {
      var _this13;

      _this13 = _Dungeon.call(this, width, height) || this;
      _this13._options = {
        roomWidth: [3, 9],
        roomHeight: [3, 5],
        roomDugPercentage: 0.1,
        timeLimit: 1000
        /* we stop after this much time has passed (msec) */

      };
      Object.assign(_this13._options, options);
      _this13._map = [];
      _this13._dug = 0;
      _this13._roomAttempts = 20;
      /* new room is created N-times until is considered as impossible to generate */

      _this13._corridorAttempts = 20;
      /* corridors are tried N-times until the level is considered as impossible to connect */

      _this13._connected = [];
      /* list of already connected rooms */

      _this13._unconnected = [];
      /* list of remaining unconnected rooms */

      _this13._digCallback = _this13._digCallback.bind(_assertThisInitialized(_assertThisInitialized(_this13)));
      _this13._canBeDugCallback = _this13._canBeDugCallback.bind(_assertThisInitialized(_assertThisInitialized(_this13)));
      _this13._isWallCallback = _this13._isWallCallback.bind(_assertThisInitialized(_assertThisInitialized(_this13)));
      return _this13;
    }
    /**
     * Create a map. If the time limit has been hit, returns null.
     * @see ROT.Map#create
     */


    var _proto26 = Uniform.prototype;

    _proto26.create = function create(callback) {
      var t1 = Date.now();

      while (1) {
        var t2 = Date.now();

        if (t2 - t1 > this._options.timeLimit) {
          return null;
        }
        /* time limit! */


        this._map = this._fillMap(1);
        this._dug = 0;
        this._rooms = [];
        this._unconnected = [];

        this._generateRooms();

        if (this._rooms.length < 2) {
          continue;
        }

        if (this._generateCorridors()) {
          break;
        }
      }

      if (callback) {
        for (var i = 0; i < this._width; i++) {
          for (var j = 0; j < this._height; j++) {
            callback(i, j, this._map[i][j]);
          }
        }
      }

      return this;
    };
    /**
     * Generates a suitable amount of rooms
     */


    _proto26._generateRooms = function _generateRooms() {
      var w = this._width - 2;
      var h = this._height - 2;
      var room;

      do {
        room = this._generateRoom();

        if (this._dug / (w * h) > this._options.roomDugPercentage) {
          break;
        }
        /* achieved requested amount of free space */

      } while (room);
      /* either enough rooms, or not able to generate more of them :) */

    };
    /**
     * Try to generate one room
     */


    _proto26._generateRoom = function _generateRoom() {
      var count = 0;

      while (count < this._roomAttempts) {
        count++;
        var room = Room.createRandom(this._width, this._height, this._options);

        if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) {
          continue;
        }

        room.create(this._digCallback);

        this._rooms.push(room);

        return room;
      }
      /* no room was generated in a given number of attempts */


      return null;
    };
    /**
     * Generates connectors beween rooms
     * @returns {bool} success Was this attempt successfull?
     */


    _proto26._generateCorridors = function _generateCorridors() {
      var cnt = 0;

      while (cnt < this._corridorAttempts) {
        cnt++;
        this._corridors = [];
        /* dig rooms into a clear map */

        this._map = this._fillMap(1);

        for (var i = 0; i < this._rooms.length; i++) {
          var room = this._rooms[i];
          room.clearDoors();
          room.create(this._digCallback);
        }

        this._unconnected = RNG$1.shuffle(this._rooms.slice());
        this._connected = [];

        if (this._unconnected.length) {
          this._connected.push(this._unconnected.pop());
        }
        /* first one is always connected */


        while (1) {
          /* 1. pick random connected room */
          var connected = RNG$1.getItem(this._connected);

          if (!connected) {
            break;
          }
          /* 2. find closest unconnected */


          var room1 = this._closestRoom(this._unconnected, connected);

          if (!room1) {
            break;
          }
          /* 3. connect it to closest connected */


          var room2 = this._closestRoom(this._connected, room1);

          if (!room2) {
            break;
          }

          var ok = this._connectRooms(room1, room2);

          if (!ok) {
            break;
          }
          /* stop connecting, re-shuffle */


          if (!this._unconnected.length) {
            return true;
          }
          /* done; no rooms remain */

        }
      }

      return false;
    };

    /**
     * For a given room, find the closest one from the list
     */
    _proto26._closestRoom = function _closestRoom(rooms, room) {
      var dist = Infinity;
      var center = room.getCenter();
      var result = null;

      for (var i = 0; i < rooms.length; i++) {
        var r = rooms[i];
        var c = r.getCenter();
        var dx = c[0] - center[0];
        var dy = c[1] - center[1];
        var d = dx * dx + dy * dy;

        if (d < dist) {
          dist = d;
          result = r;
        }
      }

      return result;
    };

    _proto26._connectRooms = function _connectRooms(room1, room2) {
      /*
          room1.debug();
          room2.debug();
      */
      var center1 = room1.getCenter();
      var center2 = room2.getCenter();
      var diffX = center2[0] - center1[0];
      var diffY = center2[1] - center1[1];
      var start;
      var end;
      var dirIndex1, dirIndex2, min, max, index;

      if (Math.abs(diffX) < Math.abs(diffY)) {
        /* first try connecting north-south walls */
        dirIndex1 = diffY > 0 ? 2 : 0;
        dirIndex2 = (dirIndex1 + 2) % 4;
        min = room2.getLeft();
        max = room2.getRight();
        index = 0;
      } else {
        /* first try connecting east-west walls */
        dirIndex1 = diffX > 0 ? 1 : 3;
        dirIndex2 = (dirIndex1 + 2) % 4;
        min = room2.getTop();
        max = room2.getBottom();
        index = 1;
      }

      start = this._placeInWall(room1, dirIndex1);
      /* corridor will start here */

      if (!start) {
        return false;
      }

      if (start[index] >= min && start[index] <= max) {
        /* possible to connect with straight line (I-like) */
        end = start.slice();
        var value = 0;

        switch (dirIndex2) {
          case 0:
            value = room2.getTop() - 1;
            break;

          case 1:
            value = room2.getRight() + 1;
            break;

          case 2:
            value = room2.getBottom() + 1;
            break;

          case 3:
            value = room2.getLeft() - 1;
            break;
        }

        end[(index + 1) % 2] = value;

        this._digLine([start, end]);
      } else if (start[index] < min - 1 || start[index] > max + 1) {
        /* need to switch target wall (L-like) */
        var diff = start[index] - center2[index];
        var rotation = 0;

        switch (dirIndex2) {
          case 0:
          case 1:
            rotation = diff < 0 ? 3 : 1;
            break;

          case 2:
          case 3:
            rotation = diff < 0 ? 1 : 3;
            break;
        }

        dirIndex2 = (dirIndex2 + rotation) % 4;
        end = this._placeInWall(room2, dirIndex2);

        if (!end) {
          return false;
        }

        var mid = [0, 0];
        mid[index] = start[index];
        var index2 = (index + 1) % 2;
        mid[index2] = end[index2];

        this._digLine([start, mid, end]);
      } else {
        /* use current wall pair, but adjust the line in the middle (S-like) */
        var _index4 = (index + 1) % 2;

        end = this._placeInWall(room2, dirIndex2);

        if (!end) {
          return false;
        }

        var _mid = Math.round((end[_index4] + start[_index4]) / 2);

        var mid1 = [0, 0];
        var mid2 = [0, 0];
        mid1[index] = start[index];
        mid1[_index4] = _mid;
        mid2[index] = end[index];
        mid2[_index4] = _mid;

        this._digLine([start, mid1, mid2, end]);
      }

      room1.addDoor(start[0], start[1]);
      room2.addDoor(end[0], end[1]);
      index = this._unconnected.indexOf(room1);

      if (index != -1) {
        this._unconnected.splice(index, 1);

        this._connected.push(room1);
      }

      index = this._unconnected.indexOf(room2);

      if (index != -1) {
        this._unconnected.splice(index, 1);

        this._connected.push(room2);
      }

      return true;
    };

    _proto26._placeInWall = function _placeInWall(room, dirIndex) {
      var start = [0, 0];
      var dir = [0, 0];
      var length = 0;

      switch (dirIndex) {
        case 0:
          dir = [1, 0];
          start = [room.getLeft(), room.getTop() - 1];
          length = room.getRight() - room.getLeft() + 1;
          break;

        case 1:
          dir = [0, 1];
          start = [room.getRight() + 1, room.getTop()];
          length = room.getBottom() - room.getTop() + 1;
          break;

        case 2:
          dir = [1, 0];
          start = [room.getLeft(), room.getBottom() + 1];
          length = room.getRight() - room.getLeft() + 1;
          break;

        case 3:
          dir = [0, 1];
          start = [room.getLeft() - 1, room.getTop()];
          length = room.getBottom() - room.getTop() + 1;
          break;
      }

      var avail = [];
      var lastBadIndex = -2;

      for (var i = 0; i < length; i++) {
        var x = start[0] + i * dir[0];
        var y = start[1] + i * dir[1];
        avail.push(null);
        var isWall = this._map[x][y] == 1;

        if (isWall) {
          if (lastBadIndex != i - 1) {
            avail[i] = [x, y];
          }
        } else {
          lastBadIndex = i;

          if (i) {
            avail[i - 1] = null;
          }
        }
      }

      for (var _i4 = avail.length - 1; _i4 >= 0; _i4--) {
        if (!avail[_i4]) {
          avail.splice(_i4, 1);
        }
      }

      return avail.length ? RNG$1.getItem(avail) : null;
    };
    /**
     * Dig a polyline.
     */


    _proto26._digLine = function _digLine(points) {
      for (var i = 1; i < points.length; i++) {
        var start = points[i - 1];
        var end = points[i];
        var corridor = new Corridor(start[0], start[1], end[0], end[1]);
        corridor.create(this._digCallback);

        this._corridors.push(corridor);
      }
    };

    _proto26._digCallback = function _digCallback(x, y, value) {
      this._map[x][y] = value;

      if (value == 0) {
        this._dug++;
      }
    };

    _proto26._isWallCallback = function _isWallCallback(x, y) {
      if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    };

    _proto26._canBeDugCallback = function _canBeDugCallback(x, y) {
      if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    };

    return Uniform;
  }(Dungeon);
  /**
   * @class Cellular automaton map generator
   * @augments ROT.Map
   * @param {int} [width=ROT.DEFAULT_WIDTH]
   * @param {int} [height=ROT.DEFAULT_HEIGHT]
   * @param {object} [options] Options
   * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
   * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
   * @param {int} [options.topology] Topology 4 or 6 or 8
   */


  var Cellular =
  /*#__PURE__*/
  function (_Map3) {
    _inheritsLoose(Cellular, _Map3);

    function Cellular(width, height, options) {
      var _this14;

      if (options === void 0) {
        options = {};
      }

      _this14 = _Map3.call(this, width, height) || this;
      _this14._options = {
        born: [5, 6, 7, 8],
        survive: [4, 5, 6, 7, 8],
        topology: 8
      };

      _this14.setOptions(options);

      _this14._dirs = DIRS[_this14._options.topology];
      _this14._map = _this14._fillMap(0);
      return _this14;
    }
    /**
     * Fill the map with random values
     * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
     */


    var _proto27 = Cellular.prototype;

    _proto27.randomize = function randomize(probability) {
      for (var i = 0; i < this._width; i++) {
        for (var j = 0; j < this._height; j++) {
          this._map[i][j] = RNG$1.getUniform() < probability ? 1 : 0;
        }
      }

      return this;
    };
    /**
     * Change options.
     * @see ROT.Map.Cellular
     */


    _proto27.setOptions = function setOptions(options) {
      Object.assign(this._options, options);
    };

    _proto27.set = function set(x, y, value) {
      this._map[x][y] = value;
    };

    _proto27.create = function create(callback) {
      var newMap = this._fillMap(0);

      var born = this._options.born;
      var survive = this._options.survive;

      for (var j = 0; j < this._height; j++) {
        var widthStep = 1;
        var widthStart = 0;

        if (this._options.topology == 6) {
          widthStep = 2;
          widthStart = j % 2;
        }

        for (var i = widthStart; i < this._width; i += widthStep) {
          var cur = this._map[i][j];

          var ncount = this._getNeighbors(i, j);

          if (cur && survive.indexOf(ncount) != -1) {
            /* survive */
            newMap[i][j] = 1;
          } else if (!cur && born.indexOf(ncount) != -1) {
            /* born */
            newMap[i][j] = 1;
          }
        }
      }

      this._map = newMap;
      callback && this._serviceCallback(callback);
    };

    _proto27._serviceCallback = function _serviceCallback(callback) {
      for (var j = 0; j < this._height; j++) {
        var widthStep = 1;
        var widthStart = 0;

        if (this._options.topology == 6) {
          widthStep = 2;
          widthStart = j % 2;
        }

        for (var i = widthStart; i < this._width; i += widthStep) {
          callback(i, j, this._map[i][j]);
        }
      }
    };
    /**
     * Get neighbor count at [i,j] in this._map
     */


    _proto27._getNeighbors = function _getNeighbors(cx, cy) {
      var result = 0;

      for (var i = 0; i < this._dirs.length; i++) {
        var dir = this._dirs[i];
        var x = cx + dir[0];
        var y = cy + dir[1];

        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
          continue;
        }

        result += this._map[x][y] == 1 ? 1 : 0;
      }

      return result;
    };
    /**
     * Make sure every non-wall space is accessible.
     * @param {function} callback to call to display map when do
     * @param {int} value to consider empty space - defaults to 0
     * @param {function} callback to call when a new connection is made
     */


    _proto27.connect = function connect(callback, value, connectionCallback) {
      if (!value) value = 0;
      var allFreeSpace = [];
      var notConnected = {}; // find all free space

      var widthStep = 1;
      var widthStarts = [0, 0];

      if (this._options.topology == 6) {
        widthStep = 2;
        widthStarts = [0, 1];
      }

      for (var y = 0; y < this._height; y++) {
        for (var x = widthStarts[y % 2]; x < this._width; x += widthStep) {
          if (this._freeSpace(x, y, value)) {
            var p = [x, y];
            notConnected[this._pointKey(p)] = p;
            allFreeSpace.push([x, y]);
          }
        }
      }

      var start = allFreeSpace[RNG$1.getUniformInt(0, allFreeSpace.length - 1)];

      var key = this._pointKey(start);

      var connected = {};
      connected[key] = start;
      delete notConnected[key]; // find what's connected to the starting point

      this._findConnected(connected, notConnected, [start], false, value);

      while (Object.keys(notConnected).length > 0) {
        // find two points from notConnected to connected
        var _p = this._getFromTo(connected, notConnected);

        var from = _p[0]; // notConnected

        var to = _p[1]; // connected
        // find everything connected to the starting point

        var local = {};
        local[this._pointKey(from)] = from;

        this._findConnected(local, notConnected, [from], true, value); // connect to a connected cell


        var tunnelFn = this._options.topology == 6 ? this._tunnelToConnected6 : this._tunnelToConnected;
        tunnelFn.call(this, to, from, connected, notConnected, value, connectionCallback); // now all of local is connected

        for (var k in local) {
          var pp = local[k];
          this._map[pp[0]][pp[1]] = value;
          connected[k] = pp;
          delete notConnected[k];
        }
      }

      callback && this._serviceCallback(callback);
    };
    /**
     * Find random points to connect. Search for the closest point in the larger space.
     * This is to minimize the length of the passage while maintaining good performance.
     */


    _proto27._getFromTo = function _getFromTo(connected, notConnected) {
      var from = [0, 0],
          to = [0, 0],
          d;
      var connectedKeys = Object.keys(connected);
      var notConnectedKeys = Object.keys(notConnected);

      for (var i = 0; i < 5; i++) {
        if (connectedKeys.length < notConnectedKeys.length) {
          var keys = connectedKeys;
          to = connected[keys[RNG$1.getUniformInt(0, keys.length - 1)]];
          from = this._getClosest(to, notConnected);
        } else {
          var _keys = notConnectedKeys;
          from = notConnected[_keys[RNG$1.getUniformInt(0, _keys.length - 1)]];
          to = this._getClosest(from, connected);
        }

        d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);

        if (d < 64) {
          break;
        }
      } // console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);


      return [from, to];
    };

    _proto27._getClosest = function _getClosest(point, space) {
      var minPoint = null;
      var minDist = null;

      for (var k in space) {
        var p = space[k];
        var d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);

        if (minDist == null || d < minDist) {
          minDist = d;
          minPoint = p;
        }
      }

      return minPoint;
    };

    _proto27._findConnected = function _findConnected(connected, notConnected, stack, keepNotConnected, value) {
      while (stack.length > 0) {
        var p = stack.splice(0, 1)[0];
        var tests = void 0;

        if (this._options.topology == 6) {
          tests = [[p[0] + 2, p[1]], [p[0] + 1, p[1] - 1], [p[0] - 1, p[1] - 1], [p[0] - 2, p[1]], [p[0] - 1, p[1] + 1], [p[0] + 1, p[1] + 1]];
        } else {
          tests = [[p[0] + 1, p[1]], [p[0] - 1, p[1]], [p[0], p[1] + 1], [p[0], p[1] - 1]];
        }

        for (var i = 0; i < tests.length; i++) {
          var key = this._pointKey(tests[i]);

          if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
            connected[key] = tests[i];

            if (!keepNotConnected) {
              delete notConnected[key];
            }

            stack.push(tests[i]);
          }
        }
      }
    };

    _proto27._tunnelToConnected = function _tunnelToConnected(to, from, connected, notConnected, value, connectionCallback) {
      var a, b;

      if (from[0] < to[0]) {
        a = from;
        b = to;
      } else {
        a = to;
        b = from;
      }

      for (var xx = a[0]; xx <= b[0]; xx++) {
        this._map[xx][a[1]] = value;
        var p = [xx, a[1]];

        var pkey = this._pointKey(p);

        connected[pkey] = p;
        delete notConnected[pkey];
      }

      if (connectionCallback && a[0] < b[0]) {
        connectionCallback(a, [b[0], a[1]]);
      } // x is now fixed


      var x = b[0];

      if (from[1] < to[1]) {
        a = from;
        b = to;
      } else {
        a = to;
        b = from;
      }

      for (var yy = a[1]; yy < b[1]; yy++) {
        this._map[x][yy] = value;
        var _p2 = [x, yy];

        var _pkey = this._pointKey(_p2);

        connected[_pkey] = _p2;
        delete notConnected[_pkey];
      }

      if (connectionCallback && a[1] < b[1]) {
        connectionCallback([b[0], a[1]], [b[0], b[1]]);
      }
    };

    _proto27._tunnelToConnected6 = function _tunnelToConnected6(to, from, connected, notConnected, value, connectionCallback) {
      var a, b;

      if (from[0] < to[0]) {
        a = from;
        b = to;
      } else {
        a = to;
        b = from;
      } // tunnel diagonally until horizontally level


      var xx = a[0];
      var yy = a[1];

      while (!(xx == b[0] && yy == b[1])) {
        var stepWidth = 2;

        if (yy < b[1]) {
          yy++;
          stepWidth = 1;
        } else if (yy > b[1]) {
          yy--;
          stepWidth = 1;
        }

        if (xx < b[0]) {
          xx += stepWidth;
        } else if (xx > b[0]) {
          xx -= stepWidth;
        } else if (b[1] % 2) {
          // Won't step outside map if destination on is map's right edge
          xx -= stepWidth;
        } else {
          // ditto for left edge
          xx += stepWidth;
        }

        this._map[xx][yy] = value;
        var p = [xx, yy];

        var pkey = this._pointKey(p);

        connected[pkey] = p;
        delete notConnected[pkey];
      }

      if (connectionCallback) {
        connectionCallback(from, to);
      }
    };

    _proto27._freeSpace = function _freeSpace(x, y, value) {
      return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
    };

    _proto27._pointKey = function _pointKey(p) {
      return p[0] + "." + p[1];
    };

    return Cellular;
  }(Map);

  var FEATURES = {
    "room": Room,
    "corridor": Corridor
  };
  /**
   * Random dungeon generator using human-like digging patterns.
   * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
   * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
   */

  var Digger =
  /*#__PURE__*/
  function (_Dungeon2) {
    _inheritsLoose(Digger, _Dungeon2);

    function Digger(width, height, options) {
      var _this15;

      if (options === void 0) {
        options = {};
      }

      _this15 = _Dungeon2.call(this, width, height) || this;
      _this15._options = Object.assign({
        roomWidth: [3, 9],
        roomHeight: [3, 5],
        corridorLength: [3, 10],
        dugPercentage: 0.2,
        timeLimit: 1000
        /* we stop after this much time has passed (msec) */

      }, options);
      _this15._features = {
        "room": 4,
        "corridor": 4
      };
      _this15._map = [];
      _this15._featureAttempts = 20;
      /* how many times do we try to create a feature on a suitable wall */

      _this15._walls = {};
      /* these are available for digging */

      _this15._dug = 0;
      _this15._digCallback = _this15._digCallback.bind(_assertThisInitialized(_assertThisInitialized(_this15)));
      _this15._canBeDugCallback = _this15._canBeDugCallback.bind(_assertThisInitialized(_assertThisInitialized(_this15)));
      _this15._isWallCallback = _this15._isWallCallback.bind(_assertThisInitialized(_assertThisInitialized(_this15)));
      _this15._priorityWallCallback = _this15._priorityWallCallback.bind(_assertThisInitialized(_assertThisInitialized(_this15)));
      return _this15;
    }

    var _proto28 = Digger.prototype;

    _proto28.create = function create(callback) {
      this._rooms = [];
      this._corridors = [];
      this._map = this._fillMap(1);
      this._walls = {};
      this._dug = 0;
      var area = (this._width - 2) * (this._height - 2);

      this._firstRoom();

      var t1 = Date.now();
      var priorityWalls;

      do {
        priorityWalls = 0;
        var t2 = Date.now();

        if (t2 - t1 > this._options.timeLimit) {
          break;
        }
        /* find a good wall */


        var wall = this._findWall();

        if (!wall) {
          break;
        }
        /* no more walls */


        var parts = wall.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);

        var dir = this._getDiggingDirection(x, y);

        if (!dir) {
          continue;
        }
        /* this wall is not suitable */
        //		console.log("wall", x, y);

        /* try adding a feature */


        var featureAttempts = 0;

        do {
          featureAttempts++;

          if (this._tryFeature(x, y, dir[0], dir[1])) {
            /* feature added */
            //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
            this._removeSurroundingWalls(x, y);

            this._removeSurroundingWalls(x - dir[0], y - dir[1]);

            break;
          }
        } while (featureAttempts < this._featureAttempts);

        for (var id in this._walls) {
          if (this._walls[id] > 1) {
            priorityWalls++;
          }
        }
      } while (this._dug / area < this._options.dugPercentage || priorityWalls);
      /* fixme number of priority walls */


      this._addDoors();

      if (callback) {
        for (var i = 0; i < this._width; i++) {
          for (var j = 0; j < this._height; j++) {
            callback(i, j, this._map[i][j]);
          }
        }
      }

      this._walls = {};
      this._map = [];
      return this;
    };

    _proto28._digCallback = function _digCallback(x, y, value) {
      if (value == 0 || value == 2) {
        /* empty */
        this._map[x][y] = 0;
        this._dug++;
      } else {
        /* wall */
        this._walls[x + "," + y] = 1;
      }
    };

    _proto28._isWallCallback = function _isWallCallback(x, y) {
      if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    };

    _proto28._canBeDugCallback = function _canBeDugCallback(x, y) {
      if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
        return false;
      }

      return this._map[x][y] == 1;
    };

    _proto28._priorityWallCallback = function _priorityWallCallback(x, y) {
      this._walls[x + "," + y] = 2;
    };

    _proto28._firstRoom = function _firstRoom() {
      var cx = Math.floor(this._width / 2);
      var cy = Math.floor(this._height / 2);
      var room = Room.createRandomCenter(cx, cy, this._options);

      this._rooms.push(room);

      room.create(this._digCallback);
    };
    /**
     * Get a suitable wall
     */


    _proto28._findWall = function _findWall() {
      var prio1 = [];
      var prio2 = [];

      for (var _id2 in this._walls) {
        var prio = this._walls[_id2];

        if (prio == 2) {
          prio2.push(_id2);
        } else {
          prio1.push(_id2);
        }
      }

      var arr = prio2.length ? prio2 : prio1;

      if (!arr.length) {
        return null;
      }
      /* no walls :/ */


      var id = RNG$1.getItem(arr.sort()); // sort to make the order deterministic

      delete this._walls[id];
      return id;
    };
    /**
     * Tries adding a feature
     * @returns {bool} was this a successful try?
     */


    _proto28._tryFeature = function _tryFeature(x, y, dx, dy) {
      var featureName = RNG$1.getWeightedValue(this._features);
      var ctor = FEATURES[featureName];
      var feature = ctor.createRandomAt(x, y, dx, dy, this._options);

      if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
        //		console.log("not valid");
        //		feature.debug();
        return false;
      }

      feature.create(this._digCallback); //	feature.debug();

      if (feature instanceof Room) {
        this._rooms.push(feature);
      }

      if (feature instanceof Corridor) {
        feature.createPriorityWalls(this._priorityWallCallback);

        this._corridors.push(feature);
      }

      return true;
    };

    _proto28._removeSurroundingWalls = function _removeSurroundingWalls(cx, cy) {
      var deltas = DIRS[4];

      for (var i = 0; i < deltas.length; i++) {
        var delta = deltas[i];
        var x = cx + delta[0];
        var y = cy + delta[1];
        delete this._walls[x + "," + y];
        x = cx + 2 * delta[0];
        y = cy + 2 * delta[1];
        delete this._walls[x + "," + y];
      }
    };
    /**
     * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
     */


    _proto28._getDiggingDirection = function _getDiggingDirection(cx, cy) {
      if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
        return null;
      }

      var result = null;
      var deltas = DIRS[4];

      for (var i = 0; i < deltas.length; i++) {
        var delta = deltas[i];
        var x = cx + delta[0];
        var y = cy + delta[1];

        if (!this._map[x][y]) {
          /* there already is another empty neighbor! */
          if (result) {
            return null;
          }

          result = delta;
        }
      }
      /* no empty neighbor */


      if (!result) {
        return null;
      }

      return [-result[0], -result[1]];
    };
    /**
     * Find empty spaces surrounding rooms, and apply doors.
     */


    _proto28._addDoors = function _addDoors() {
      var data = this._map;

      function isWallCallback(x, y) {
        return data[x][y] == 1;
      }

      for (var i = 0; i < this._rooms.length; i++) {
        var room = this._rooms[i];
        room.clearDoors();
        room.addDoors(isWallCallback);
      }
    };

    return Digger;
  }(Dungeon);
  /**
   * Join lists with "i" and "i+1"
   */


  function addToList(i, L, R) {
    R[L[i + 1]] = R[i];
    L[R[i]] = L[i + 1];
    R[i] = i + 1;
    L[i + 1] = i;
  }
  /**
   * Remove "i" from its list
   */


  function removeFromList(i, L, R) {
    R[L[i]] = R[i];
    L[R[i]] = L[i];
    R[i] = i;
    L[i] = i;
  }
  /**
   * Maze generator - Eller's algorithm
   * See http://homepages.cwi.nl/~tromp/maze.html for explanation
   */


  var EllerMaze =
  /*#__PURE__*/
  function (_Map4) {
    _inheritsLoose(EllerMaze, _Map4);

    function EllerMaze() {
      return _Map4.apply(this, arguments) || this;
    }

    var _proto29 = EllerMaze.prototype;

    _proto29.create = function create(callback) {
      var map = this._fillMap(1);

      var w = Math.ceil((this._width - 2) / 2);
      var rand = 9 / 24;
      var L = [];
      var R = [];

      for (var i = 0; i < w; i++) {
        L.push(i);
        R.push(i);
      }

      L.push(w - 1);
      /* fake stop-block at the right side */

      var j;

      for (j = 1; j + 3 < this._height; j += 2) {
        /* one row */
        for (var _i5 = 0; _i5 < w; _i5++) {
          /* cell coords (will be always empty) */
          var x = 2 * _i5 + 1;
          var y = j;
          map[x][y] = 0;
          /* right connection */

          if (_i5 != L[_i5 + 1] && RNG$1.getUniform() > rand) {
            addToList(_i5, L, R);
            map[x + 1][y] = 0;
          }
          /* bottom connection */


          if (_i5 != L[_i5] && RNG$1.getUniform() > rand) {
            /* remove connection */
            removeFromList(_i5, L, R);
          } else {
            /* create connection */
            map[x][y + 1] = 0;
          }
        }
      }
      /* last row */


      for (var _i6 = 0; _i6 < w; _i6++) {
        /* cell coords (will be always empty) */
        var _x2 = 2 * _i6 + 1;

        var _y2 = j;
        map[_x2][_y2] = 0;
        /* right connection */

        if (_i6 != L[_i6 + 1] && (_i6 == L[_i6] || RNG$1.getUniform() > rand)) {
          /* dig right also if the cell is separated, so it gets connected to the rest of maze */
          addToList(_i6, L, R);
          map[_x2 + 1][_y2] = 0;
        }

        removeFromList(_i6, L, R);
      }

      for (var _i7 = 0; _i7 < this._width; _i7++) {
        for (var _j = 0; _j < this._height; _j++) {
          callback(_i7, _j, map[_i7][_j]);
        }
      }

      return this;
    };

    return EllerMaze;
  }(Map);
  /**
   * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
   * @augments ROT.Map
   */


  var DividedMaze =
  /*#__PURE__*/
  function (_Map5) {
    _inheritsLoose(DividedMaze, _Map5);

    function DividedMaze() {
      var _this16;

      _this16 = _Map5.apply(this, arguments) || this;
      _this16._stack = [];
      _this16._map = [];
      return _this16;
    }

    var _proto30 = DividedMaze.prototype;

    _proto30.create = function create(callback) {
      var w = this._width;
      var h = this._height;
      this._map = [];

      for (var i = 0; i < w; i++) {
        this._map.push([]);

        for (var j = 0; j < h; j++) {
          var border = i == 0 || j == 0 || i + 1 == w || j + 1 == h;

          this._map[i].push(border ? 1 : 0);
        }
      }

      this._stack = [[1, 1, w - 2, h - 2]];

      this._process();

      for (var _i8 = 0; _i8 < w; _i8++) {
        for (var _j2 = 0; _j2 < h; _j2++) {
          callback(_i8, _j2, this._map[_i8][_j2]);
        }
      }

      this._map = [];
      return this;
    };

    _proto30._process = function _process() {
      while (this._stack.length) {
        var room = this._stack.shift();
        /* [left, top, right, bottom] */


        this._partitionRoom(room);
      }
    };

    _proto30._partitionRoom = function _partitionRoom(room) {
      var availX = [];
      var availY = [];

      for (var i = room[0] + 1; i < room[2]; i++) {
        var top = this._map[i][room[1] - 1];
        var bottom = this._map[i][room[3] + 1];

        if (top && bottom && !(i % 2)) {
          availX.push(i);
        }
      }

      for (var j = room[1] + 1; j < room[3]; j++) {
        var left = this._map[room[0] - 1][j];
        var right = this._map[room[2] + 1][j];

        if (left && right && !(j % 2)) {
          availY.push(j);
        }
      }

      if (!availX.length || !availY.length) {
        return;
      }

      var x = RNG$1.getItem(availX);
      var y = RNG$1.getItem(availY);
      this._map[x][y] = 1;
      var walls = [];
      var w = [];
      walls.push(w);
      /* left part */

      for (var _i9 = room[0]; _i9 < x; _i9++) {
        this._map[_i9][y] = 1;
        if (_i9 % 2) w.push([_i9, y]);
      }

      w = [];
      walls.push(w);
      /* right part */

      for (var _i10 = x + 1; _i10 <= room[2]; _i10++) {
        this._map[_i10][y] = 1;
        if (_i10 % 2) w.push([_i10, y]);
      }

      w = [];
      walls.push(w);
      /* top part */

      for (var _j3 = room[1]; _j3 < y; _j3++) {
        this._map[x][_j3] = 1;
        if (_j3 % 2) w.push([x, _j3]);
      }

      w = [];
      walls.push(w);
      /* bottom part */

      for (var _j4 = y + 1; _j4 <= room[3]; _j4++) {
        this._map[x][_j4] = 1;
        if (_j4 % 2) w.push([x, _j4]);
      }

      var solid = RNG$1.getItem(walls);

      for (var _i11 = 0; _i11 < walls.length; _i11++) {
        var _w = walls[_i11];

        if (_w == solid) {
          continue;
        }

        var hole = RNG$1.getItem(_w);
        this._map[hole[0]][hole[1]] = 0;
      }

      this._stack.push([room[0], room[1], x - 1, y - 1]);
      /* left top */


      this._stack.push([x + 1, room[1], room[2], y - 1]);
      /* right top */


      this._stack.push([room[0], y + 1, x - 1, room[3]]);
      /* left bottom */


      this._stack.push([x + 1, y + 1, room[2], room[3]]);
      /* right bottom */

    };

    return DividedMaze;
  }(Map);
  /**
   * Icey's Maze generator
   * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
   */


  var IceyMaze =
  /*#__PURE__*/
  function (_Map6) {
    _inheritsLoose(IceyMaze, _Map6);

    function IceyMaze(width, height, regularity) {
      var _this17;

      if (regularity === void 0) {
        regularity = 0;
      }

      _this17 = _Map6.call(this, width, height) || this;
      _this17._regularity = regularity;
      _this17._map = [];
      return _this17;
    }

    var _proto31 = IceyMaze.prototype;

    _proto31.create = function create(callback) {
      var width = this._width;
      var height = this._height;

      var map = this._fillMap(1);

      width -= width % 2 ? 1 : 2;
      height -= height % 2 ? 1 : 2;
      var cx = 0;
      var cy = 0;
      var nx = 0;
      var ny = 0;
      var done = 0;
      var blocked = false;
      var dirs = [[0, 0], [0, 0], [0, 0], [0, 0]];

      do {
        cx = 1 + 2 * Math.floor(RNG$1.getUniform() * (width - 1) / 2);
        cy = 1 + 2 * Math.floor(RNG$1.getUniform() * (height - 1) / 2);

        if (!done) {
          map[cx][cy] = 0;
        }

        if (!map[cx][cy]) {
          this._randomize(dirs);

          do {
            if (Math.floor(RNG$1.getUniform() * (this._regularity + 1)) == 0) {
              this._randomize(dirs);
            }

            blocked = true;

            for (var i = 0; i < 4; i++) {
              nx = cx + dirs[i][0] * 2;
              ny = cy + dirs[i][1] * 2;

              if (this._isFree(map, nx, ny, width, height)) {
                map[nx][ny] = 0;
                map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
                cx = nx;
                cy = ny;
                blocked = false;
                done++;
                break;
              }
            }
          } while (!blocked);
        }
      } while (done + 1 < width * height / 4);

      for (var _i12 = 0; _i12 < this._width; _i12++) {
        for (var j = 0; j < this._height; j++) {
          callback(_i12, j, map[_i12][j]);
        }
      }

      this._map = [];
      return this;
    };

    _proto31._randomize = function _randomize(dirs) {
      for (var i = 0; i < 4; i++) {
        dirs[i][0] = 0;
        dirs[i][1] = 0;
      }

      switch (Math.floor(RNG$1.getUniform() * 4)) {
        case 0:
          dirs[0][0] = -1;
          dirs[1][0] = 1;
          dirs[2][1] = -1;
          dirs[3][1] = 1;
          break;

        case 1:
          dirs[3][0] = -1;
          dirs[2][0] = 1;
          dirs[1][1] = -1;
          dirs[0][1] = 1;
          break;

        case 2:
          dirs[2][0] = -1;
          dirs[3][0] = 1;
          dirs[0][1] = -1;
          dirs[1][1] = 1;
          break;

        case 3:
          dirs[1][0] = -1;
          dirs[0][0] = 1;
          dirs[3][1] = -1;
          dirs[2][1] = 1;
          break;
      }
    };

    _proto31._isFree = function _isFree(map, x, y, width, height) {
      if (x < 1 || y < 1 || x >= width || y >= height) {
        return false;
      }

      return map[x][y];
    };

    return IceyMaze;
  }(Map);
  /**
   * Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
   * @author hyakugei
   */


  var Rogue =
  /*#__PURE__*/
  function (_Map7) {
    _inheritsLoose(Rogue, _Map7);

    function Rogue(width, height, options) {
      var _this18;

      _this18 = _Map7.call(this, width, height) || this;
      _this18.map = [];
      _this18.rooms = [];
      _this18.connectedCells = [];
      options = Object.assign({
        cellWidth: 3,
        cellHeight: 3 //     ie. as an array with min-max values for each direction....

      }, options);
      /*
      Set the room sizes according to the over-all width of the map,
      and the cell sizes.
      */

      if (!options.hasOwnProperty("roomWidth")) {
        options["roomWidth"] = _this18._calculateRoomSize(_this18._width, options["cellWidth"]);
      }

      if (!options.hasOwnProperty("roomHeight")) {
        options["roomHeight"] = _this18._calculateRoomSize(_this18._height, options["cellHeight"]);
      }

      _this18._options = options;
      return _this18;
    }

    var _proto32 = Rogue.prototype;

    _proto32.create = function create(callback) {
      this.map = this._fillMap(1);
      this.rooms = [];
      this.connectedCells = [];

      this._initRooms();

      this._connectRooms();

      this._connectUnconnectedRooms();

      this._createRandomRoomConnections();

      this._createRooms();

      this._createCorridors();

      if (callback) {
        for (var i = 0; i < this._width; i++) {
          for (var j = 0; j < this._height; j++) {
            callback(i, j, this.map[i][j]);
          }
        }
      }

      return this;
    };

    _proto32._calculateRoomSize = function _calculateRoomSize(size, cell) {
      var max = Math.floor(size / cell * 0.8);
      var min = Math.floor(size / cell * 0.25);

      if (min < 2) {
        min = 2;
      }

      if (max < 2) {
        max = 2;
      }

      return [min, max];
    };

    _proto32._initRooms = function _initRooms() {
      // create rooms array. This is the "grid" list from the algo.
      for (var i = 0; i < this._options.cellWidth; i++) {
        this.rooms.push([]);

        for (var j = 0; j < this._options.cellHeight; j++) {
          this.rooms[i].push({
            "x": 0,
            "y": 0,
            "width": 0,
            "height": 0,
            "connections": [],
            "cellx": i,
            "celly": j
          });
        }
      }
    };

    _proto32._connectRooms = function _connectRooms() {
      //pick random starting grid
      var cgx = RNG$1.getUniformInt(0, this._options.cellWidth - 1);
      var cgy = RNG$1.getUniformInt(0, this._options.cellHeight - 1);
      var idx;
      var ncgx;
      var ncgy;
      var found = false;
      var room;
      var otherRoom;
      var dirToCheck; // find  unconnected neighbour cells

      do {
        //dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
        dirToCheck = [0, 2, 4, 6];
        dirToCheck = RNG$1.shuffle(dirToCheck);

        do {
          found = false;
          idx = dirToCheck.pop();
          ncgx = cgx + DIRS[8][idx][0];
          ncgy = cgy + DIRS[8][idx][1];

          if (ncgx < 0 || ncgx >= this._options.cellWidth) {
            continue;
          }

          if (ncgy < 0 || ncgy >= this._options.cellHeight) {
            continue;
          }

          room = this.rooms[cgx][cgy];

          if (room["connections"].length > 0) {
            // as long as this room doesn't already coonect to me, we are ok with it.
            if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
              break;
            }
          }

          otherRoom = this.rooms[ncgx][ncgy];

          if (otherRoom["connections"].length == 0) {
            otherRoom["connections"].push([cgx, cgy]);
            this.connectedCells.push([ncgx, ncgy]);
            cgx = ncgx;
            cgy = ncgy;
            found = true;
          }
        } while (dirToCheck.length > 0 && found == false);
      } while (dirToCheck.length > 0);
    };

    _proto32._connectUnconnectedRooms = function _connectUnconnectedRooms() {
      //While there are unconnected rooms, try to connect them to a random connected neighbor
      //(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
      var cw = this._options.cellWidth;
      var ch = this._options.cellHeight;
      this.connectedCells = RNG$1.shuffle(this.connectedCells);
      var room;
      var otherRoom;
      var validRoom;

      for (var i = 0; i < this._options.cellWidth; i++) {
        for (var j = 0; j < this._options.cellHeight; j++) {
          room = this.rooms[i][j];

          if (room["connections"].length == 0) {
            var directions = [0, 2, 4, 6];
            directions = RNG$1.shuffle(directions);
            validRoom = false;

            do {
              var dirIdx = directions.pop();
              var newI = i + DIRS[8][dirIdx][0];
              var newJ = j + DIRS[8][dirIdx][1];

              if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) {
                continue;
              }

              otherRoom = this.rooms[newI][newJ];
              validRoom = true;

              if (otherRoom["connections"].length == 0) {
                break;
              }

              for (var k = 0; k < otherRoom["connections"].length; k++) {
                if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
                  validRoom = false;
                  break;
                }
              }

              if (validRoom) {
                break;
              }
            } while (directions.length);

            if (validRoom) {
              room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
            } else {
              console.log("-- Unable to connect room.");
            }
          }
        }
      }
    };

    _proto32._createRandomRoomConnections = function _createRandomRoomConnections() {// Empty for now.
    };

    _proto32._createRooms = function _createRooms() {
      var w = this._width;
      var h = this._height;
      var cw = this._options.cellWidth;
      var ch = this._options.cellHeight;
      var cwp = Math.floor(this._width / cw);
      var chp = Math.floor(this._height / ch);
      var roomw;
      var roomh;
      var roomWidth = this._options["roomWidth"];
      var roomHeight = this._options["roomHeight"];
      var sx;
      var sy;
      var otherRoom;

      for (var i = 0; i < cw; i++) {
        for (var j = 0; j < ch; j++) {
          sx = cwp * i;
          sy = chp * j;

          if (sx == 0) {
            sx = 1;
          }

          if (sy == 0) {
            sy = 1;
          }

          roomw = RNG$1.getUniformInt(roomWidth[0], roomWidth[1]);
          roomh = RNG$1.getUniformInt(roomHeight[0], roomHeight[1]);

          if (j > 0) {
            otherRoom = this.rooms[i][j - 1];

            while (sy - (otherRoom["y"] + otherRoom["height"]) < 3) {
              sy++;
            }
          }

          if (i > 0) {
            otherRoom = this.rooms[i - 1][j];

            while (sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
              sx++;
            }
          }

          var sxOffset = Math.round(RNG$1.getUniformInt(0, cwp - roomw) / 2);
          var syOffset = Math.round(RNG$1.getUniformInt(0, chp - roomh) / 2);

          while (sx + sxOffset + roomw >= w) {
            if (sxOffset) {
              sxOffset--;
            } else {
              roomw--;
            }
          }

          while (sy + syOffset + roomh >= h) {
            if (syOffset) {
              syOffset--;
            } else {
              roomh--;
            }
          }

          sx = sx + sxOffset;
          sy = sy + syOffset;
          this.rooms[i][j]["x"] = sx;
          this.rooms[i][j]["y"] = sy;
          this.rooms[i][j]["width"] = roomw;
          this.rooms[i][j]["height"] = roomh;

          for (var ii = sx; ii < sx + roomw; ii++) {
            for (var jj = sy; jj < sy + roomh; jj++) {
              this.map[ii][jj] = 0;
            }
          }
        }
      }
    };

    _proto32._getWallPosition = function _getWallPosition(aRoom, aDirection) {
      var rx;
      var ry;
      var door;

      if (aDirection == 1 || aDirection == 3) {
        rx = RNG$1.getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);

        if (aDirection == 1) {
          ry = aRoom["y"] - 2;
          door = ry + 1;
        } else {
          ry = aRoom["y"] + aRoom["height"] + 1;
          door = ry - 1;
        }

        this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
      } else {
        ry = RNG$1.getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);

        if (aDirection == 2) {
          rx = aRoom["x"] + aRoom["width"] + 1;
          door = rx - 1;
        } else {
          rx = aRoom["x"] - 2;
          door = rx + 1;
        }

        this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
      }

      return [rx, ry];
    };

    _proto32._drawCorridor = function _drawCorridor(startPosition, endPosition) {
      var xOffset = endPosition[0] - startPosition[0];
      var yOffset = endPosition[1] - startPosition[1];
      var xpos = startPosition[0];
      var ypos = startPosition[1];
      var tempDist;
      var xDir;
      var yDir;
      var move; // 2 element array, element 0 is the direction, element 1 is the total value to move.

      var moves = []; // a list of 2 element arrays

      var xAbs = Math.abs(xOffset);
      var yAbs = Math.abs(yOffset);
      var percent = RNG$1.getUniform(); // used to split the move at different places along the long axis

      var firstHalf = percent;
      var secondHalf = 1 - percent;
      xDir = xOffset > 0 ? 2 : 6;
      yDir = yOffset > 0 ? 4 : 0;

      if (xAbs < yAbs) {
        // move firstHalf of the y offset
        tempDist = Math.ceil(yAbs * firstHalf);
        moves.push([yDir, tempDist]); // move all the x offset

        moves.push([xDir, xAbs]); // move sendHalf of the  y offset

        tempDist = Math.floor(yAbs * secondHalf);
        moves.push([yDir, tempDist]);
      } else {
        //  move firstHalf of the x offset
        tempDist = Math.ceil(xAbs * firstHalf);
        moves.push([xDir, tempDist]); // move all the y offset

        moves.push([yDir, yAbs]); // move secondHalf of the x offset.

        tempDist = Math.floor(xAbs * secondHalf);
        moves.push([xDir, tempDist]);
      }

      this.map[xpos][ypos] = 0;

      while (moves.length > 0) {
        move = moves.pop();

        while (move[1] > 0) {
          xpos += DIRS[8][move[0]][0];
          ypos += DIRS[8][move[0]][1];
          this.map[xpos][ypos] = 0;
          move[1] = move[1] - 1;
        }
      }
    };

    _proto32._createCorridors = function _createCorridors() {
      // Draw Corridors between connected rooms
      var cw = this._options.cellWidth;
      var ch = this._options.cellHeight;
      var room;
      var connection;
      var otherRoom;
      var wall;
      var otherWall;

      for (var i = 0; i < cw; i++) {
        for (var j = 0; j < ch; j++) {
          room = this.rooms[i][j];

          for (var k = 0; k < room["connections"].length; k++) {
            connection = room["connections"][k];
            otherRoom = this.rooms[connection[0]][connection[1]]; // figure out what wall our corridor will start one.
            // figure out what wall our corridor will end on.

            if (otherRoom["cellx"] > room["cellx"]) {
              wall = 2;
              otherWall = 4;
            } else if (otherRoom["cellx"] < room["cellx"]) {
              wall = 4;
              otherWall = 2;
            } else if (otherRoom["celly"] > room["celly"]) {
              wall = 3;
              otherWall = 1;
            } else {
              wall = 1;
              otherWall = 3;
            }

            this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
          }
        }
      }
    };

    return Rogue;
  }(Map);

  var index$2 = {
    Arena: Arena,
    Uniform: Uniform,
    Cellular: Cellular,
    Digger: Digger,
    EllerMaze: EllerMaze,
    DividedMaze: DividedMaze,
    IceyMaze: IceyMaze,
    Rogue: Rogue
  };
  /**
   * Base noise generator
   */

  var Noise = function Noise() {};

  var F2 = 0.5 * (Math.sqrt(3) - 1);
  var G2 = (3 - Math.sqrt(3)) / 6;
  /**
   * A simple 2d implementation of simplex noise by Ondrej Zara
   *
   * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
   * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
   * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
   * Better rank ordering method by Stefan Gustavson in 2012.
   */

  var Simplex =
  /*#__PURE__*/
  function (_Noise) {
    _inheritsLoose(Simplex, _Noise);

    /**
     * @param gradients Random gradients
     */
    function Simplex(gradients) {
      var _this19;

      if (gradients === void 0) {
        gradients = 256;
      }

      _this19 = _Noise.call(this) || this;
      _this19._gradients = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
      var permutations = [];

      for (var i = 0; i < gradients; i++) {
        permutations.push(i);
      }

      permutations = RNG$1.shuffle(permutations);
      _this19._perms = [];
      _this19._indexes = [];

      for (var _i13 = 0; _i13 < 2 * gradients; _i13++) {
        _this19._perms.push(permutations[_i13 % gradients]);

        _this19._indexes.push(_this19._perms[_i13] % _this19._gradients.length);
      }

      return _this19;
    }

    var _proto33 = Simplex.prototype;

    _proto33.get = function get(xin, yin) {
      var perms = this._perms;
      var indexes = this._indexes;
      var count = perms.length / 2;
      var n0 = 0,
          n1 = 0,
          n2 = 0,
          gi; // Noise contributions from the three corners
      // Skew the input space to determine which simplex cell we're in

      var s = (xin + yin) * F2; // Hairy factor for 2D

      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space

      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin

      var y0 = yin - Y0; // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.

      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords

      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } else {
        // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        i1 = 0;
        j1 = 1;
      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6


      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords

      var y2 = y0 - 1 + 2 * G2; // Work out the hashed gradient indices of the three simplex corners

      var ii = mod(i, count);
      var jj = mod(j, count); // Calculate the contribution from the three corners

      var t0 = 0.5 - x0 * x0 - y0 * y0;

      if (t0 >= 0) {
        t0 *= t0;
        gi = indexes[ii + perms[jj]];
        var grad = this._gradients[gi];
        n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
      }

      var t1 = 0.5 - x1 * x1 - y1 * y1;

      if (t1 >= 0) {
        t1 *= t1;
        gi = indexes[ii + i1 + perms[jj + j1]];
        var _grad = this._gradients[gi];
        n1 = t1 * t1 * (_grad[0] * x1 + _grad[1] * y1);
      }

      var t2 = 0.5 - x2 * x2 - y2 * y2;

      if (t2 >= 0) {
        t2 *= t2;
        gi = indexes[ii + 1 + perms[jj + 1]];
        var _grad2 = this._gradients[gi];
        n2 = t2 * t2 * (_grad2[0] * x2 + _grad2[1] * y2);
      } // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].


      return 70 * (n0 + n1 + n2);
    };

    return Simplex;
  }(Noise);

  var index$3 = {
    Simplex: Simplex
  };
  /**
   * @class Abstract pathfinder
   * @param {int} toX Target X coord
   * @param {int} toY Target Y coord
   * @param {function} passableCallback Callback to determine map passability
   * @param {object} [options]
   * @param {int} [options.topology=8]
   */

  var Path =
  /*#__PURE__*/
  function () {
    function Path(toX, toY, passableCallback, options) {
      if (options === void 0) {
        options = {};
      }

      this._toX = toX;
      this._toY = toY;
      this._passableCallback = passableCallback;
      this._options = Object.assign({
        topology: 8
      }, options);
      this._dirs = DIRS[this._options.topology];

      if (this._options.topology == 8) {
        /* reorder dirs for more aesthetic result (vertical/horizontal first) */
        this._dirs = [this._dirs[0], this._dirs[2], this._dirs[4], this._dirs[6], this._dirs[1], this._dirs[3], this._dirs[5], this._dirs[7]];
      }
    }

    var _proto34 = Path.prototype;

    _proto34._getNeighbors = function _getNeighbors(cx, cy) {
      var result = [];

      for (var i = 0; i < this._dirs.length; i++) {
        var dir = this._dirs[i];
        var x = cx + dir[0];
        var y = cy + dir[1];

        if (!this._passableCallback(x, y)) {
          continue;
        }

        result.push([x, y]);
      }

      return result;
    };

    return Path;
  }();
  /**
   * @class Simplified Dijkstra's algorithm: all edges have a value of 1
   * @augments ROT.Path
   * @see ROT.Path
   */


  var Dijkstra =
  /*#__PURE__*/
  function (_Path) {
    _inheritsLoose(Dijkstra, _Path);

    function Dijkstra(toX, toY, passableCallback, options) {
      var _this20;

      _this20 = _Path.call(this, toX, toY, passableCallback, options) || this;
      _this20._computed = {};
      _this20._todo = [];

      _this20._add(toX, toY, null);

      return _this20;
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */


    var _proto35 = Dijkstra.prototype;

    _proto35.compute = function compute(fromX, fromY, callback) {
      var key = fromX + "," + fromY;

      if (!(key in this._computed)) {
        this._compute(fromX, fromY);
      }

      if (!(key in this._computed)) {
        return;
      }

      var item = this._computed[key];

      while (item) {
        callback(item.x, item.y);
        item = item.prev;
      }
    };
    /**
     * Compute a non-cached value
     */


    _proto35._compute = function _compute(fromX, fromY) {
      while (this._todo.length) {
        var item = this._todo.shift();

        if (item.x == fromX && item.y == fromY) {
          return;
        }

        var neighbors = this._getNeighbors(item.x, item.y);

        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];
          var x = neighbor[0];
          var y = neighbor[1];
          var id = x + "," + y;

          if (id in this._computed) {
            continue;
          }
          /* already done */


          this._add(x, y, item);
        }
      }
    };

    _proto35._add = function _add(x, y, prev) {
      var obj = {
        x: x,
        y: y,
        prev: prev
      };
      this._computed[x + "," + y] = obj;

      this._todo.push(obj);
    };

    return Dijkstra;
  }(Path);
  /**
   * @class Simplified A* algorithm: all edges have a value of 1
   * @augments ROT.Path
   * @see ROT.Path
   */


  var AStar =
  /*#__PURE__*/
  function (_Path2) {
    _inheritsLoose(AStar, _Path2);

    function AStar(toX, toY, passableCallback, options) {
      var _this21;

      if (options === void 0) {
        options = {};
      }

      _this21 = _Path2.call(this, toX, toY, passableCallback, options) || this;
      _this21._todo = [];
      _this21._done = {};
      return _this21;
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */


    var _proto36 = AStar.prototype;

    _proto36.compute = function compute(fromX, fromY, callback) {
      this._todo = [];
      this._done = {};
      this._fromX = fromX;
      this._fromY = fromY;

      this._add(this._toX, this._toY, null);

      while (this._todo.length) {
        var _item = this._todo.shift();

        var id = _item.x + "," + _item.y;

        if (id in this._done) {
          continue;
        }

        this._done[id] = _item;

        if (_item.x == fromX && _item.y == fromY) {
          break;
        }

        var neighbors = this._getNeighbors(_item.x, _item.y);

        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];
          var x = neighbor[0];
          var y = neighbor[1];

          var _id3 = x + "," + y;

          if (_id3 in this._done) {
            continue;
          }

          this._add(x, y, _item);
        }
      }

      var item = this._done[fromX + "," + fromY];

      if (!item) {
        return;
      }

      while (item) {
        callback(item.x, item.y);
        item = item.prev;
      }
    };

    _proto36._add = function _add(x, y, prev) {
      var h = this._distance(x, y);

      var obj = {
        x: x,
        y: y,
        prev: prev,
        g: prev ? prev.g + 1 : 0,
        h: h
      };
      /* insert into priority queue */

      var f = obj.g + obj.h;

      for (var i = 0; i < this._todo.length; i++) {
        var item = this._todo[i];
        var itemF = item.g + item.h;

        if (f < itemF || f == itemF && h < item.h) {
          this._todo.splice(i, 0, obj);

          return;
        }
      }

      this._todo.push(obj);
    };

    _proto36._distance = function _distance(x, y) {
      switch (this._options.topology) {
        case 4:
          return Math.abs(x - this._fromX) + Math.abs(y - this._fromY);
          break;

        case 6:
          var dx = Math.abs(x - this._fromX);
          var dy = Math.abs(y - this._fromY);
          return dy + Math.max(0, (dx - dy) / 2);
          break;

        case 8:
          return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
          break;
      }
    };

    return AStar;
  }(Path);

  var index$4 = {
    Dijkstra: Dijkstra,
    AStar: AStar
  };
  /**
   * @class Asynchronous main loop
   * @param {ROT.Scheduler} scheduler
   */

  var Engine =
  /*#__PURE__*/
  function () {
    function Engine(scheduler) {
      this._scheduler = scheduler;
      this._lock = 1;
    }
    /**
     * Start the main loop. When this call returns, the loop is locked.
     */


    var _proto37 = Engine.prototype;

    _proto37.start = function start() {
      return this.unlock();
    };
    /**
     * Interrupt the engine by an asynchronous action
     */


    _proto37.lock = function lock() {
      this._lock++;
      return this;
    };
    /**
     * Resume execution (paused by a previous lock)
     */


    _proto37.unlock = function unlock() {
      if (!this._lock) {
        throw new Error("Cannot unlock unlocked engine");
      }

      this._lock--;

      while (!this._lock) {
        var actor = this._scheduler.next();

        if (!actor) {
          return this.lock();
        }
        /* no actors */


        var result = actor.act();

        if (result && result.then) {
          /* actor returned a "thenable", looks like a Promise */
          this.lock();
          result.then(this.unlock.bind(this));
        }
      }

      return this;
    };

    return Engine;
  }();
  /**
   * Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
   */


  var Lighting =
  /*#__PURE__*/
  function () {
    function Lighting(reflectivityCallback, options) {
      if (options === void 0) {
        options = {};
      }

      this._reflectivityCallback = reflectivityCallback;
      this._options = {};
      options = Object.assign({
        passes: 1,
        emissionThreshold: 100,
        range: 10
      }, options);
      this._lights = {};
      this._reflectivityCache = {};
      this._fovCache = {};
      this.setOptions(options);
    }
    /**
     * Adjust options at runtime
     */


    var _proto38 = Lighting.prototype;

    _proto38.setOptions = function setOptions(options) {
      Object.assign(this._options, options);

      if (options && options.range) {
        this.reset();
      }

      return this;
    };
    /**
     * Set the used Field-Of-View algo
     */


    _proto38.setFOV = function setFOV(fov) {
      this._fov = fov;
      this._fovCache = {};
      return this;
    };
    /**
     * Set (or remove) a light source
     */


    _proto38.setLight = function setLight(x, y, color) {
      var key = x + "," + y;

      if (color) {
        this._lights[key] = typeof color == "string" ? fromString(color) : color;
      } else {
        delete this._lights[key];
      }

      return this;
    };
    /**
     * Remove all light sources
     */


    _proto38.clearLights = function clearLights() {
      this._lights = {};
    };
    /**
     * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
     */


    _proto38.reset = function reset() {
      this._reflectivityCache = {};
      this._fovCache = {};
      return this;
    };
    /**
     * Compute the lighting
     */


    _proto38.compute = function compute(lightingCallback) {
      var doneCells = {};
      var emittingCells = {};
      var litCells = {};

      for (var key in this._lights) {
        /* prepare emitters for first pass */
        var light = this._lights[key];
        emittingCells[key] = [0, 0, 0];
        add_(emittingCells[key], light);
      }

      for (var i = 0; i < this._options.passes; i++) {
        /* main loop */
        this._emitLight(emittingCells, litCells, doneCells);

        if (i + 1 == this._options.passes) {
          continue;
        }
        /* not for the last pass */


        emittingCells = this._computeEmitters(litCells, doneCells);
      }

      for (var litKey in litCells) {
        /* let the user know what and how is lit */
        var parts = litKey.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        lightingCallback(x, y, litCells[litKey]);
      }

      return this;
    };
    /**
     * Compute one iteration from all emitting cells
     * @param emittingCells These emit light
     * @param litCells Add projected light to these
     * @param doneCells These already emitted, forbid them from further calculations
     */


    _proto38._emitLight = function _emitLight(emittingCells, litCells, doneCells) {
      for (var key in emittingCells) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);

        this._emitLightFromCell(x, y, emittingCells[key], litCells);

        doneCells[key] = 1;
      }

      return this;
    };
    /**
     * Prepare a list of emitters for next pass
     */


    _proto38._computeEmitters = function _computeEmitters(litCells, doneCells) {
      var result = {};

      for (var key in litCells) {
        if (key in doneCells) {
          continue;
        }
        /* already emitted */


        var _color = litCells[key];
        var reflectivity = void 0;

        if (key in this._reflectivityCache) {
          reflectivity = this._reflectivityCache[key];
        } else {
          var parts = key.split(",");
          var x = parseInt(parts[0]);
          var y = parseInt(parts[1]);
          reflectivity = this._reflectivityCallback(x, y);
          this._reflectivityCache[key] = reflectivity;
        }

        if (reflectivity == 0) {
          continue;
        }
        /* will not reflect at all */

        /* compute emission color */


        var emission = [0, 0, 0];
        var intensity = 0;

        for (var i = 0; i < 3; i++) {
          var part = Math.round(_color[i] * reflectivity);
          emission[i] = part;
          intensity += part;
        }

        if (intensity > this._options.emissionThreshold) {
          result[key] = emission;
        }
      }

      return result;
    };
    /**
     * Compute one iteration from one cell
     */


    _proto38._emitLightFromCell = function _emitLightFromCell(x, y, color, litCells) {
      var key = x + "," + y;
      var fov;

      if (key in this._fovCache) {
        fov = this._fovCache[key];
      } else {
        fov = this._updateFOV(x, y);
      }

      for (var fovKey in fov) {
        var formFactor = fov[fovKey];
        var result = void 0;

        if (fovKey in litCells) {
          /* already lit */
          result = litCells[fovKey];
        } else {
          /* newly lit */
          result = [0, 0, 0];
          litCells[fovKey] = result;
        }

        for (var i = 0; i < 3; i++) {
          result[i] += Math.round(color[i] * formFactor);
        }
        /* add light color */

      }

      return this;
    };
    /**
     * Compute FOV ("form factor") for a potential light source at [x,y]
     */


    _proto38._updateFOV = function _updateFOV(x, y) {
      var key1 = x + "," + y;
      var cache = {};
      this._fovCache[key1] = cache;
      var range = this._options.range;

      function cb(x, y, r, vis) {
        var key2 = x + "," + y;
        var formFactor = vis * (1 - r / range);

        if (formFactor == 0) {
          return;
        }

        cache[key2] = formFactor;
      }

      this._fov.compute(x, y, range, cb.bind(this));

      return cache;
    };

    return Lighting;
  }();

  var Util = util;
  var Color = color;
  var Text = text;
  exports.Util = Util;
  exports.Color = Color;
  exports.Text = Text;
  exports.RNG = RNG$1;
  exports.Display = Display;
  exports.StringGenerator = StringGenerator;
  exports.EventQueue = EventQueue;
  exports.Scheduler = index;
  exports.FOV = index$1;
  exports.Map = index$2;
  exports.Noise = index$3;
  exports.Path = index$4;
  exports.Engine = Engine;
  exports.Lighting = Lighting;
  exports.DEFAULT_WIDTH = DEFAULT_WIDTH;
  exports.DEFAULT_HEIGHT = DEFAULT_HEIGHT;
  exports.DIRS = DIRS;
  exports.KEYS = KEYS;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});


}).call(this,require('_process'))

},{"_process":1}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ROT = require("rot-js");
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
var MyDigger = /** @class */ (function (_super) {
    __extends(MyDigger, _super);
    function MyDigger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDigger.prototype.fuck = function (cb) {
        console.log("create");
        this.create(cb);
    };
    return MyDigger;
}(ROT.Map.Digger));
ROT.RNG.setSeed(2234);
var map = new MyDigger(50, 50);
var display = new ROT.Display({ fontSize: 8 });
document.body.appendChild(display.getContainer());
map.fuck(display.DEBUG);
/* var drawDoor = function(x, y) {
    display.draw(x, y, "", "", "red");
}

var rooms = map.getRooms();
for (var i=0; i<rooms.length; i++) {
    var room = rooms[i];
    

    room.getDoors(drawDoor);
} */ 

},{"rot-js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JvdC1qcy9kaXN0L3JvdC5qcyIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxdU9BLDRCQUE4QjtBQUc5Qjs7Ozs7Ozs7Ozs7Ozs7OERBYzhEO0FBRTlEO0lBQXVCLDRCQUFjO0lBQXJDOztJQU1BLENBQUM7SUFKQSx1QkFBSSxHQUFKLFVBQUssRUFBbUI7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FOQSxBQU1DLENBTnNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQU1wQztBQUVELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV4Qjs7Ozs7Ozs7OztJQVVJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6IHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOiBmYWN0b3J5KGdsb2JhbC5ST1QgPSB7fSk7XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuICAndXNlIHN0cmljdCc7XG4gIC8qKlxuICAgKiBUaGlzIGNvZGUgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgQWxlYSBhbGdvcml0aG07IChDKSAyMDEwIEpvaGFubmVzIEJhYWfDuGUuXG4gICAqIEFsZWEgaXMgbGljZW5zZWQgYWNjb3JkaW5nIHRvIHRoZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01JVF9MaWNlbnNlLlxuICAgKi9cblxuICB2YXIgRlJBQyA9IDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7XG4gIC8qIDJeLTMyICovXG5cbiAgdmFyIFJORyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJORygpIHtcbiAgICAgIHRoaXMuX3NlZWQgPSAwO1xuICAgICAgdGhpcy5fczAgPSAwO1xuICAgICAgdGhpcy5fczEgPSAwO1xuICAgICAgdGhpcy5fczIgPSAwO1xuICAgICAgdGhpcy5fYyA9IDA7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90byA9IFJORy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8uZ2V0U2VlZCA9IGZ1bmN0aW9uIGdldFNlZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNlZWQgdGhlIG51bWJlciBnZW5lcmF0b3JcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLnNldFNlZWQgPSBmdW5jdGlvbiBzZXRTZWVkKHNlZWQpIHtcbiAgICAgIHNlZWQgPSBzZWVkIDwgMSA/IDEgLyBzZWVkIDogc2VlZDtcbiAgICAgIHRoaXMuX3NlZWQgPSBzZWVkO1xuICAgICAgdGhpcy5fczAgPSAoc2VlZCA+Pj4gMCkgKiBGUkFDO1xuICAgICAgc2VlZCA9IHNlZWQgKiA2OTA2OSArIDEgPj4+IDA7XG4gICAgICB0aGlzLl9zMSA9IHNlZWQgKiBGUkFDO1xuICAgICAgc2VlZCA9IHNlZWQgKiA2OTA2OSArIDEgPj4+IDA7XG4gICAgICB0aGlzLl9zMiA9IHNlZWQgKiBGUkFDO1xuICAgICAgdGhpcy5fYyA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbMCwxKSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRVbmlmb3JtID0gZnVuY3Rpb24gZ2V0VW5pZm9ybSgpIHtcbiAgICAgIHZhciB0ID0gMjA5MTYzOSAqIHRoaXMuX3MwICsgdGhpcy5fYyAqIEZSQUM7XG4gICAgICB0aGlzLl9zMCA9IHRoaXMuX3MxO1xuICAgICAgdGhpcy5fczEgPSB0aGlzLl9zMjtcbiAgICAgIHRoaXMuX2MgPSB0IHwgMDtcbiAgICAgIHRoaXMuX3MyID0gdCAtIHRoaXMuX2M7XG4gICAgICByZXR1cm4gdGhpcy5fczI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG93ZXJCb3VuZCBUaGUgbG93ZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcGFyYW0gdXBwZXJCb3VuZCBUaGUgdXBwZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgW2xvd2VyQm91bmQsIHVwcGVyQm91bmRdLCB1c2luZyBST1QuUk5HLmdldFVuaWZvcm0oKSB0byBkaXN0cmlidXRlIHRoZSB2YWx1ZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0VW5pZm9ybUludCA9IGZ1bmN0aW9uIGdldFVuaWZvcm1JbnQobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICAgICAgdmFyIG1heCA9IE1hdGgubWF4KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpO1xuICAgICAgdmFyIG1pbiA9IE1hdGgubWluKGxvd2VyQm91bmQsIHVwcGVyQm91bmQpO1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1lYW4gTWVhbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBzdGRkZXYgU3RhbmRhcmQgZGV2aWF0aW9uLiB+OTUlIG9mIHRoZSBhYnNvbHV0ZSB2YWx1ZXMgd2lsbCBiZSBsb3dlciB0aGFuIDIqc3RkZGV2LlxuICAgICAqIEByZXR1cm5zIEEgbm9ybWFsbHkgZGlzdHJpYnV0ZWQgcHNldWRvcmFuZG9tIHZhbHVlXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXROb3JtYWwgPSBmdW5jdGlvbiBnZXROb3JtYWwobWVhbiwgc3RkZGV2KSB7XG4gICAgICBpZiAobWVhbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG1lYW4gPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RkZGV2ID09PSB2b2lkIDApIHtcbiAgICAgICAgc3RkZGV2ID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIHUsIHYsIHI7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgdSA9IDIgKiB0aGlzLmdldFVuaWZvcm0oKSAtIDE7XG4gICAgICAgIHYgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICByID0gdSAqIHUgKyB2ICogdjtcbiAgICAgIH0gd2hpbGUgKHIgPiAxIHx8IHIgPT0gMCk7XG5cbiAgICAgIHZhciBnYXVzcyA9IHUgKiBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhyKSAvIHIpO1xuICAgICAgcmV0dXJuIG1lYW4gKyBnYXVzcyAqIHN0ZGRldjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbMSwxMDBdIGluY2x1c2l2ZSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRQZXJjZW50YWdlID0gZnVuY3Rpb24gZ2V0UGVyY2VudGFnZSgpIHtcbiAgICAgIHJldHVybiAxICsgTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIDEwMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSYW5kb21seSBwaWNrZWQgaXRlbSwgbnVsbCB3aGVuIGxlbmd0aD0wXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbShhcnJheSkge1xuICAgICAgaWYgKCFhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogYXJyYXkubGVuZ3RoKV07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBOZXcgYXJyYXkgd2l0aCByYW5kb21pemVkIGl0ZW1zXG4gICAgICovXG5cblxuICAgIF9wcm90by5zaHVmZmxlID0gZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdmFyIGNsb25lID0gYXJyYXkuc2xpY2UoKTtcblxuICAgICAgd2hpbGUgKGNsb25lLmxlbmd0aCkge1xuICAgICAgICB2YXIgX2luZGV4ID0gY2xvbmUuaW5kZXhPZih0aGlzLmdldEl0ZW0oY2xvbmUpKTtcblxuICAgICAgICByZXN1bHQucHVzaChjbG9uZS5zcGxpY2UoX2luZGV4LCAxKVswXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0YSBrZXk9d2hhdGV2ZXIsIHZhbHVlPXdlaWdodCAocmVsYXRpdmUgcHJvYmFiaWxpdHkpXG4gICAgICogQHJldHVybnMgd2hhdGV2ZXJcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldFdlaWdodGVkVmFsdWUgPSBmdW5jdGlvbiBnZXRXZWlnaHRlZFZhbHVlKGRhdGEpIHtcbiAgICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAgIGZvciAodmFyIF9pZCBpbiBkYXRhKSB7XG4gICAgICAgIHRvdGFsICs9IGRhdGFbX2lkXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJhbmRvbSA9IHRoaXMuZ2V0VW5pZm9ybSgpICogdG90YWw7XG4gICAgICB2YXIgaWQsXG4gICAgICAgICAgcGFydCA9IDA7XG5cbiAgICAgIGZvciAoaWQgaW4gZGF0YSkge1xuICAgICAgICBwYXJ0ICs9IGRhdGFbaWRdO1xuXG4gICAgICAgIGlmIChyYW5kb20gPCBwYXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgICB9IC8vIElmIGJ5IHNvbWUgZmxvYXRpbmctcG9pbnQgYW5ub3lhbmNlIHdlIGhhdmVcbiAgICAgIC8vIHJhbmRvbSA+PSB0b3RhbCwganVzdCByZXR1cm4gdGhlIGxhc3QgaWQuXG5cblxuICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IFJORyBzdGF0ZS4gVXNlZnVsIGZvciBzdG9yaW5nIHRoZSBzdGF0ZSBhbmQgcmUtc2V0dGluZyBpdCB2aWEgc2V0U3RhdGUuXG4gICAgICogQHJldHVybnMgSW50ZXJuYWwgc3RhdGVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldFN0YXRlID0gZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICByZXR1cm4gW3RoaXMuX3MwLCB0aGlzLl9zMSwgdGhpcy5fczIsIHRoaXMuX2NdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IGEgcHJldmlvdXNseSByZXRyaWV2ZWQgc3RhdGUuXG4gICAgICovXG5cblxuICAgIF9wcm90by5zZXRTdGF0ZSA9IGZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgICB0aGlzLl9zMCA9IHN0YXRlWzBdO1xuICAgICAgdGhpcy5fczEgPSBzdGF0ZVsxXTtcbiAgICAgIHRoaXMuX3MyID0gc3RhdGVbMl07XG4gICAgICB0aGlzLl9jID0gc3RhdGVbM107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjbG9uZWQgUk5HXG4gICAgICovXG5cblxuICAgIF9wcm90by5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgICAgdmFyIGNsb25lID0gbmV3IFJORygpO1xuICAgICAgcmV0dXJuIGNsb25lLnNldFN0YXRlKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBSTkc7XG4gIH0oKTtcblxuICB2YXIgUk5HJDEgPSBuZXcgUk5HKCkuc2V0U2VlZChEYXRlLm5vdygpKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBBYnN0cmFjdCBkaXNwbGF5IGJhY2tlbmQgbW9kdWxlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIHZhciBCYWNrZW5kID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFja2VuZCgpIHt9XG5cbiAgICB2YXIgX3Byb3RvMiA9IEJhY2tlbmQucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMi5nZXRDb250YWluZXIgPSBmdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMi5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJhY2tlbmQ7XG4gIH0oKTtcblxuICB2YXIgQ2FudmFzID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0JhY2tlbmQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDYW52YXMsIF9CYWNrZW5kKTtcblxuICAgIGZ1bmN0aW9uIENhbnZhcygpIHtcbiAgICAgIHZhciBfdGhpcztcblxuICAgICAgX3RoaXMgPSBfQmFja2VuZC5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpcy5fY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzMgPSBDYW52YXMucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMy5zY2hlZHVsZSA9IGZ1bmN0aW9uIHNjaGVkdWxlKGNiKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpO1xuICAgIH07XG5cbiAgICBfcHJvdG8zLmdldENvbnRhaW5lciA9IGZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jdHguY2FudmFzO1xuICAgIH07XG5cbiAgICBfcHJvdG8zLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgIF9CYWNrZW5kLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgIHZhciBzdHlsZSA9IG9wdHMuZm9udFN0eWxlID8gb3B0cy5mb250U3R5bGUgKyBcIiBcIiA6IFwiXCI7XG4gICAgICB2YXIgZm9udCA9IHN0eWxlICsgXCIgXCIgKyBvcHRzLmZvbnRTaXplICsgXCJweCBcIiArIG9wdHMuZm9udEZhbWlseTtcbiAgICAgIHRoaXMuX2N0eC5mb250ID0gZm9udDtcblxuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG4gICAgICB0aGlzLl9jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgIHRoaXMuX2N0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgIH07XG5cbiAgICBfcHJvdG8zLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gdGhpcy5fb3B0aW9ucy5iZztcblxuICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2N0eC5jYW52YXMud2lkdGgsIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMy5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuX2N0eC5jYW52YXM7XG4gICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgeSAtPSByZWN0LnRvcDtcbiAgICAgIHggKj0gY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aDtcbiAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuXG4gICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBbLTEsIC0xXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDYW52YXM7XG4gIH0oQmFja2VuZCk7XG4gIC8qKlxuICAgKiBBbHdheXMgcG9zaXRpdmUgbW9kdWx1c1xuICAgKiBAcGFyYW0geCBPcGVyYW5kXG4gICAqIEBwYXJhbSBuIE1vZHVsdXNcbiAgICogQHJldHVybnMgeCBtb2R1bG8gblxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIG1vZCh4LCBuKSB7XG4gICAgcmV0dXJuICh4ICUgbiArIG4pICUgbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsYW1wKHZhbCwgbWluLCBtYXgpIHtcbiAgICBpZiAobWluID09PSB2b2lkIDApIHtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKG1heCA9PT0gdm9pZCAwKSB7XG4gICAgICBtYXggPSAxO1xuICAgIH1cblxuICAgIGlmICh2YWwgPCBtaW4pIHJldHVybiBtaW47XG4gICAgaWYgKHZhbCA+IG1heCkgcmV0dXJuIG1heDtcbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnN1YnN0cmluZygxKTtcbiAgfVxuICAvKipcbiAgICogRm9ybWF0IGEgc3RyaW5nIGluIGEgZmxleGlibGUgd2F5LiBTY2FucyBmb3IgJXMgc3RyaW5ncyBhbmQgcmVwbGFjZXMgdGhlbSB3aXRoIGFyZ3VtZW50cy4gTGlzdCBvZiBwYXR0ZXJucyBpcyBtb2RpZmlhYmxlIHZpYSBTdHJpbmcuZm9ybWF0Lm1hcC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlXG4gICAqIEBwYXJhbSB7YW55fSBbYXJndl1cbiAgICovXG5cblxuICBmdW5jdGlvbiBmb3JtYXQodGVtcGxhdGUpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgbWFwID0gZm9ybWF0Lm1hcDtcblxuICAgIHZhciByZXBsYWNlciA9IGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoLCBncm91cDEsIGdyb3VwMiwgaW5kZXgpIHtcbiAgICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoaW5kZXggLSAxKSA9PSBcIiVcIikge1xuICAgICAgICByZXR1cm4gbWF0Y2guc3Vic3RyaW5nKDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cblxuICAgICAgdmFyIG9iaiA9IGFyZ3NbMF07XG4gICAgICB2YXIgZ3JvdXAgPSBncm91cDEgfHwgZ3JvdXAyO1xuICAgICAgdmFyIHBhcnRzID0gZ3JvdXAuc3BsaXQoXCIsXCIpO1xuICAgICAgdmFyIG5hbWUgPSBwYXJ0cy5zaGlmdCgpIHx8IFwiXCI7XG4gICAgICB2YXIgbWV0aG9kID0gbWFwW25hbWUudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cblxuICAgICAgb2JqID0gYXJncy5zaGlmdCgpO1xuICAgICAgdmFyIHJlcGxhY2VkID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBwYXJ0cyk7XG4gICAgICB2YXIgZmlyc3QgPSBuYW1lLmNoYXJBdCgwKTtcblxuICAgICAgaWYgKGZpcnN0ICE9IGZpcnN0LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgcmVwbGFjZWQgPSBjYXBpdGFsaXplKHJlcGxhY2VkKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcGxhY2VkO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZSgvJSg/OihbYS16XSspfCg/OnsoW159XSspfSkpL2dpLCByZXBsYWNlcik7XG4gIH1cblxuICBmb3JtYXQubWFwID0ge1xuICAgIFwic1wiOiBcInRvU3RyaW5nXCJcbiAgfTtcbiAgdmFyIHV0aWwgPVxuICAvKiNfX1BVUkVfXyovXG4gIE9iamVjdC5mcmVlemUoe1xuICAgIG1vZDogbW9kLFxuICAgIGNsYW1wOiBjbGFtcCxcbiAgICBjYXBpdGFsaXplOiBjYXBpdGFsaXplLFxuICAgIGZvcm1hdDogZm9ybWF0XG4gIH0pO1xuICAvKipcbiAgICogQGNsYXNzIEhleGFnb25hbCBiYWNrZW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIHZhciBIZXggPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ2FudmFzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoSGV4LCBfQ2FudmFzKTtcblxuICAgIGZ1bmN0aW9uIEhleCgpIHtcbiAgICAgIHZhciBfdGhpczI7XG5cbiAgICAgIF90aGlzMiA9IF9DYW52YXMuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMyLl9zcGFjaW5nWCA9IDA7XG4gICAgICBfdGhpczIuX3NwYWNpbmdZID0gMDtcbiAgICAgIF90aGlzMi5faGV4U2l6ZSA9IDA7XG4gICAgICByZXR1cm4gX3RoaXMyO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG80ID0gSGV4LnByb3RvdHlwZTtcblxuICAgIF9wcm90bzQuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgIGJnID0gZGF0YVs0XTtcbiAgICAgIHZhciBweCA9IFsoeCArIDEpICogdGhpcy5fc3BhY2luZ1gsIHkgKiB0aGlzLl9zcGFjaW5nWSArIHRoaXMuX2hleFNpemVdO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgcHgucmV2ZXJzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuXG4gICAgICAgIHRoaXMuX2ZpbGwocHhbMF0sIHB4WzFdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjaCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCBweFswXSwgTWF0aC5jZWlsKHB4WzFdKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzQuY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgIGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICBhdmFpbFdpZHRoIC09IGF2YWlsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCkgLSAxO1xuICAgICAgdmFyIGhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsSGVpZ2h0IC0gMiAqIHRoaXMuX2hleFNpemUpIC8gdGhpcy5fc3BhY2luZ1kgKyAxKTtcbiAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfTtcblxuICAgIF9wcm90bzQuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgYXZhaWxIZWlnaHQgPSBhdmFpbFdpZHRoIC0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBoZXhTaXplV2lkdGggPSAyICogYXZhaWxXaWR0aCAvICgodGhpcy5fb3B0aW9ucy53aWR0aCArIDEpICogTWF0aC5zcXJ0KDMpKSAtIDE7XG4gICAgICB2YXIgaGV4U2l6ZUhlaWdodCA9IGF2YWlsSGVpZ2h0IC8gKDIgKyAxLjUgKiAodGhpcy5fb3B0aW9ucy5oZWlnaHQgLSAxKSk7XG4gICAgICB2YXIgaGV4U2l6ZSA9IE1hdGgubWluKGhleFNpemVXaWR0aCwgaGV4U2l6ZUhlaWdodCk7IC8vIGNvbXB1dGUgY2hhciByYXRpb1xuXG4gICAgICB2YXIgb2xkRm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgdGhpcy5fY3R4LmZvbnQgPSBvbGRGb250O1xuICAgICAgdmFyIHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICBoZXhTaXplID0gTWF0aC5mbG9vcihoZXhTaXplKSArIDE7IC8vIGNsb3Nlc3QgbGFyZ2VyIGhleFNpemVcbiAgICAgIC8vIEZJWE1FIGNoYXIgc2l6ZSBjb21wdXRhdGlvbiBkb2VzIG5vdCByZXNwZWN0IHRyYW5zcG9zZWQgaGV4ZXNcblxuICAgICAgdmFyIGZvbnRTaXplID0gMiAqIGhleFNpemUgLyAodGhpcy5fb3B0aW9ucy5zcGFjaW5nICogKDEgKyByYXRpbyAvIE1hdGguc3FydCgzKSkpOyAvLyBjbG9zZXN0IHNtYWxsZXIgZm9udFNpemVcblxuICAgICAgcmV0dXJuIE1hdGguY2VpbChmb250U2l6ZSkgLSAxO1xuICAgIH07XG5cbiAgICBfcHJvdG80Ll9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgdmFyIG5vZGVTaXplO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgeCArPSB5O1xuICAgICAgICB5ID0geCAtIHk7XG4gICAgICAgIHggLT0geTtcbiAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLndpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgdmFyIHNpemUgPSBub2RlU2l6ZSAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0O1xuICAgICAgeSA9IE1hdGguZmxvb3IoeSAvIHNpemUpO1xuXG4gICAgICBpZiAobW9kKHksIDIpKSB7XG4gICAgICAgIC8qIG9kZCByb3cgKi9cbiAgICAgICAgeCAtPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgeCA9IDEgKyAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IDIgKiBNYXRoLmZsb29yKHggLyAoMiAqIHRoaXMuX3NwYWNpbmdYKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBcmd1bWVudHMgYXJlIHBpeGVsIHZhbHVlcy4gSWYgXCJ0cmFuc3Bvc2VkXCIgbW9kZSBpcyBlbmFibGVkLCB0aGVuIHRoZXNlIHR3byBhcmUgYWxyZWFkeSBzd2FwcGVkLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG80Ll9maWxsID0gZnVuY3Rpb24gX2ZpbGwoY3gsIGN5KSB7XG4gICAgICB2YXIgYSA9IHRoaXMuX2hleFNpemU7XG4gICAgICB2YXIgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3ggLSBhICsgYiwgY3kpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gYSAvIDIgKyBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLSBiLCBjeSk7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgLyAyICsgYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gYSArIGIsIGN5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3gsIGN5IC0gYSArIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSAtIGEgLyAyICsgYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCwgY3kgKyBhIC0gYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgLSBhIC8gMiArIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4LCBjeSAtIGEgKyBiKTtcbiAgICAgIH1cblxuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNC5fdXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIF91cGRhdGVTaXplKCkge1xuICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgdmFyIGNoYXJXaWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgIHRoaXMuX2hleFNpemUgPSBNYXRoLmZsb29yKG9wdHMuc3BhY2luZyAqIChvcHRzLmZvbnRTaXplICsgY2hhcldpZHRoIC8gTWF0aC5zcXJ0KDMpKSAvIDIpO1xuICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9oZXhTaXplICogTWF0aC5zcXJ0KDMpIC8gMjtcbiAgICAgIHRoaXMuX3NwYWNpbmdZID0gdGhpcy5faGV4U2l6ZSAqIDEuNTtcbiAgICAgIHZhciB4cHJvcDtcbiAgICAgIHZhciB5cHJvcDtcblxuICAgICAgaWYgKG9wdHMudHJhbnNwb3NlKSB7XG4gICAgICAgIHhwcm9wID0gXCJoZWlnaHRcIjtcbiAgICAgICAgeXByb3AgPSBcIndpZHRoXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4cHJvcCA9IFwid2lkdGhcIjtcbiAgICAgICAgeXByb3AgPSBcImhlaWdodFwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jdHguY2FudmFzW3hwcm9wXSA9IE1hdGguY2VpbCgob3B0cy53aWR0aCArIDEpICogdGhpcy5fc3BhY2luZ1gpO1xuICAgICAgdGhpcy5fY3R4LmNhbnZhc1t5cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMuaGVpZ2h0IC0gMSkgKiB0aGlzLl9zcGFjaW5nWSArIDIgKiB0aGlzLl9oZXhTaXplKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEhleDtcbiAgfShDYW52YXMpO1xuICAvKipcbiAgICogQGNsYXNzIFJlY3Rhbmd1bGFyIGJhY2tlbmRcbiAgICogQHByaXZhdGVcbiAgICovXG5cblxuICB2YXIgUmVjdCA9XG4gIC8qKiBAY2xhc3MgKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIHZhciBSZWN0ID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKF9DYW52YXMyKSB7XG4gICAgICBfaW5oZXJpdHNMb29zZShSZWN0LCBfQ2FudmFzMik7XG5cbiAgICAgIGZ1bmN0aW9uIFJlY3QoKSB7XG4gICAgICAgIHZhciBfdGhpczM7XG5cbiAgICAgICAgX3RoaXMzID0gX0NhbnZhczIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpczMuX3NwYWNpbmdYID0gMDtcbiAgICAgICAgX3RoaXMzLl9zcGFjaW5nWSA9IDA7XG4gICAgICAgIF90aGlzMy5fY2FudmFzQ2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIF90aGlzMztcbiAgICAgIH1cblxuICAgICAgdmFyIF9wcm90bzUgPSBSZWN0LnByb3RvdHlwZTtcblxuICAgICAgX3Byb3RvNS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIF9DYW52YXMyLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGUgPSB7fTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgaWYgKFJlY3QuY2FjaGUpIHtcbiAgICAgICAgICB0aGlzLl9kcmF3V2l0aENhY2hlKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RyYXdOb0NhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5fZHJhd1dpdGhDYWNoZSA9IGZ1bmN0aW9uIF9kcmF3V2l0aENhY2hlKGRhdGEpIHtcbiAgICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgICBiZyA9IGRhdGFbNF07XG4gICAgICAgIHZhciBoYXNoID0gXCJcIiArIGNoICsgZmcgKyBiZztcbiAgICAgICAgdmFyIGNhbnZhcztcblxuICAgICAgICBpZiAoaGFzaCBpbiB0aGlzLl9jYW52YXNDYWNoZSkge1xuICAgICAgICAgIGNhbnZhcyA9IHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5fc3BhY2luZ1k7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgIGN0eC5maWxsUmVjdChiLCBiLCBjYW52YXMud2lkdGggLSBiLCBjYW52YXMuaGVpZ2h0IC0gYik7XG5cbiAgICAgICAgICBpZiAoY2gpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgICAgICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjdHguZmlsbFRleHQoY2hhcnNbaV0sIHRoaXMuX3NwYWNpbmdYIC8gMiwgTWF0aC5jZWlsKHRoaXMuX3NwYWNpbmdZIC8gMikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdID0gY2FudmFzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aGlzLl9zcGFjaW5nWCwgeSAqIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuX2RyYXdOb0NhY2hlID0gZnVuY3Rpb24gX2RyYXdOb0NhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgICAgYmcgPSBkYXRhWzRdO1xuXG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgIHZhciBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuXG4gICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KHggKiB0aGlzLl9zcGFjaW5nWCArIGIsIHkgKiB0aGlzLl9zcGFjaW5nWSArIGIsIHRoaXMuX3NwYWNpbmdYIC0gYiwgdGhpcy5fc3BhY2luZ1kgLSBiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgKHggKyAwLjUpICogdGhpcy5fc3BhY2luZ1gsIE1hdGguY2VpbCgoeSArIDAuNSkgKiB0aGlzLl9zcGFjaW5nWSkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIHZhciBib3hXaWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xuICAgICAgICB2YXIgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgLyogY29tcHV0ZSBjaGFyIHJhdGlvICovXG5cbiAgICAgICAgdmFyIG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgICAgdmFyIHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICAgIHZhciB3aWR0aEZyYWN0aW9uID0gcmF0aW8gKiBib3hIZWlnaHQgLyBib3hXaWR0aDtcblxuICAgICAgICBpZiAod2lkdGhGcmFjdGlvbiA+IDEpIHtcbiAgICAgICAgICAvKiB0b28gd2lkZSB3aXRoIGN1cnJlbnQgYXNwZWN0IHJhdGlvICovXG4gICAgICAgICAgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB3aWR0aEZyYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGJveEhlaWdodCAvIHRoaXMuX29wdGlvbnMuc3BhY2luZyk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81Ll9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX3NwYWNpbmdYKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fc3BhY2luZ1kpXTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuX3VwZGF0ZVNpemUgPSBmdW5jdGlvbiBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICB2YXIgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IE1hdGguY2VpbChvcHRzLnNwYWNpbmcgKiBjaGFyV2lkdGgpO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IE1hdGguY2VpbChvcHRzLnNwYWNpbmcgKiBvcHRzLmZvbnRTaXplKTtcblxuICAgICAgICBpZiAob3B0cy5mb3JjZVNxdWFyZVJhdGlvKSB7XG4gICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9zcGFjaW5nWSA9IE1hdGgubWF4KHRoaXMuX3NwYWNpbmdYLCB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICogdGhpcy5fc3BhY2luZ1k7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gUmVjdDtcbiAgICB9KENhbnZhcyk7XG5cbiAgICBSZWN0LmNhY2hlID0gZmFsc2U7XG4gICAgcmV0dXJuIFJlY3Q7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcbiAgICogQHByaXZhdGVcbiAgICovXG5cblxuICB2YXIgVGlsZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9DYW52YXMzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoVGlsZSwgX0NhbnZhczMpO1xuXG4gICAgZnVuY3Rpb24gVGlsZSgpIHtcbiAgICAgIHZhciBfdGhpczQ7XG5cbiAgICAgIF90aGlzNCA9IF9DYW52YXMzLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzNC5fY29sb3JDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgcmV0dXJuIF90aGlzNDtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvNiA9IFRpbGUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvNi5kcmF3ID0gZnVuY3Rpb24gZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgYmcgPSBkYXRhWzRdO1xuICAgICAgdmFyIHRpbGVXaWR0aCA9IHRoaXMuX29wdGlvbnMudGlsZVdpZHRoO1xuICAgICAgdmFyIHRpbGVIZWlnaHQgPSB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQ7XG5cbiAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICB0aGlzLl9jdHguY2xlYXJSZWN0KHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcblxuICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgIHZhciBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgdmFyIGJncyA9IFtdLmNvbmNhdChiZyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuXG4gICAgICAgIGlmICghdGlsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYXIgXFxcIlwiICsgY2hhcnNbaV0gKyBcIlxcXCIgbm90IGZvdW5kIGluIHRpbGVNYXBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAvLyBhcHBseSBjb2xvcml6YXRpb25cbiAgICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5fY29sb3JDYW52YXM7XG4gICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgdmFyIF9mZyA9IGZnc1tpXTtcbiAgICAgICAgICB2YXIgX2JnID0gYmdzW2ldO1xuICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCAwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuXG4gICAgICAgICAgaWYgKF9mZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gX2ZnO1xuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKF9iZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gX2JnO1xuICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm8gY29sb3JpemluZywgZWFzeVxuICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UodGhpcy5fb3B0aW9ucy50aWxlU2V0LCB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzYuY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgdmFyIGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xuICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNi5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlIGJhY2tlbmQgZG9lcyBub3QgdW5kZXJzdGFuZCBmb250IHNpemVcIik7XG4gICAgfTtcblxuICAgIF9wcm90bzYuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XG4gICAgfTtcblxuICAgIF9wcm90bzYuX3VwZGF0ZVNpemUgPSBmdW5jdGlvbiBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgIHRoaXMuX2N0eC5jYW52YXMud2lkdGggPSBvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGg7XG4gICAgICB0aGlzLl9jdHguY2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0O1xuICAgICAgdGhpcy5fY29sb3JDYW52YXMud2lkdGggPSBvcHRzLnRpbGVXaWR0aDtcbiAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLmhlaWdodCA9IG9wdHMudGlsZUhlaWdodDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFRpbGU7XG4gIH0oQ2FudmFzKTtcblxuICBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cikge1xuICAgIHZhciBjYWNoZWQsIHI7XG5cbiAgICBpZiAoc3RyIGluIENBQ0hFKSB7XG4gICAgICBjYWNoZWQgPSBDQUNIRVtzdHJdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIiNcIikge1xuICAgICAgICAvLyBoZXggcmdiXG4gICAgICAgIHZhciBtYXRjaGVkID0gc3RyLm1hdGNoKC9bMC05YS1mXS9naSkgfHwgW107XG4gICAgICAgIHZhciB2YWx1ZXMgPSBtYXRjaGVkLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiBwYXJzZUludCh4LCAxNik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXMubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCAqIDE3O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZXNbaSArIDFdICs9IDE2ICogdmFsdWVzW2ldO1xuICAgICAgICAgICAgdmFsdWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAociA9IHN0ci5tYXRjaCgvcmdiXFwoKFswLTksIF0rKVxcKS9pKSkge1xuICAgICAgICAvLyBkZWNpbWFsIHJnYlxuICAgICAgICBjYWNoZWQgPSByWzFdLnNwbGl0KC9cXHMqLFxccyovKS5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoeCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaHRtbCBuYW1lXG4gICAgICAgIGNhY2hlZCA9IFswLCAwLCAwXTtcbiAgICAgIH1cblxuICAgICAgQ0FDSEVbc3RyXSA9IGNhY2hlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVkLnNsaWNlKCk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCB0d28gb3IgbW9yZSBjb2xvcnNcbiAgICovXG5cblxuICBmdW5jdGlvbiBhZGQoY29sb3IxKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuXG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBjb2xvcnMgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgY29sb3JzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICByZXN1bHRbaV0gKz0gY29sb3JzW2pdW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYWRkXyhjb2xvcjEpIHtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbG9ycyA9IG5ldyBBcnJheShfbGVuMyA+IDEgPyBfbGVuMyAtIDEgOiAwKSwgX2tleTMgPSAxOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICBjb2xvcnNbX2tleTMgLSAxXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbG9yMVtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbG9yMTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkoY29sb3IxKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuXG4gICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBjb2xvcnMgPSBuZXcgQXJyYXkoX2xlbjQgPiAxID8gX2xlbjQgLSAxIDogMCksIF9rZXk0ID0gMTsgX2tleTQgPCBfbGVuNDsgX2tleTQrKykge1xuICAgICAgY29sb3JzW19rZXk0IC0gMV0gPSBhcmd1bWVudHNbX2tleTRdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICByZXN1bHRbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgfVxuXG4gICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzLCBNT0RJRklFUyBGSVJTVCBBUkdVTUVOVFxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIG11bHRpcGx5Xyhjb2xvcjEpIHtcbiAgICBmb3IgKHZhciBfbGVuNSA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbG9ycyA9IG5ldyBBcnJheShfbGVuNSA+IDEgPyBfbGVuNSAtIDEgOiAwKSwgX2tleTUgPSAxOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICBjb2xvcnNbX2tleTUgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NV07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbG9yMVtpXSAqPSBjb2xvcnNbal1baV0gLyAyNTU7XG4gICAgICB9XG5cbiAgICAgIGNvbG9yMVtpXSA9IE1hdGgucm91bmQoY29sb3IxW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sb3IxO1xuICB9XG4gIC8qKlxuICAgKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvclxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IpIHtcbiAgICBpZiAoZmFjdG9yID09PSB2b2lkIDApIHtcbiAgICAgIGZhY3RvciA9IDAuNTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgcmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0gKyBmYWN0b3IgKiAoY29sb3IyW2ldIC0gY29sb3IxW2ldKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBsZXJwID0gaW50ZXJwb2xhdGU7XG4gIC8qKlxuICAgKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvciBpbiBIU0wgbW9kZVxuICAgKi9cblxuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZUhTTChjb2xvcjEsIGNvbG9yMiwgZmFjdG9yKSB7XG4gICAgaWYgKGZhY3RvciA9PT0gdm9pZCAwKSB7XG4gICAgICBmYWN0b3IgPSAwLjU7XG4gICAgfVxuXG4gICAgdmFyIGhzbDEgPSByZ2IyaHNsKGNvbG9yMSk7XG4gICAgdmFyIGhzbDIgPSByZ2IyaHNsKGNvbG9yMik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgaHNsMVtpXSArPSBmYWN0b3IgKiAoaHNsMltpXSAtIGhzbDFbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBoc2wycmdiKGhzbDEpO1xuICB9XG5cbiAgdmFyIGxlcnBIU0wgPSBpbnRlcnBvbGF0ZUhTTDtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByYW5kb20gY29sb3IgYmFzZWQgb24gdGhpcyBvbmVcbiAgICogQHBhcmFtIGNvbG9yXG4gICAqIEBwYXJhbSBkaWZmIFNldCBvZiBzdGFuZGFyZCBkZXZpYXRpb25zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmRvbWl6ZShjb2xvciwgZGlmZikge1xuICAgIGlmICghKGRpZmYgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIGRpZmYgPSBNYXRoLnJvdW5kKFJORyQxLmdldE5vcm1hbCgwLCBkaWZmKSk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGNvbG9yLnNsaWNlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgcmVzdWx0W2ldICs9IGRpZmYgaW5zdGFuY2VvZiBBcnJheSA/IE1hdGgucm91bmQoUk5HJDEuZ2V0Tm9ybWFsKDAsIGRpZmZbaV0pKSA6IGRpZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTTC4gRXhwZWN0cyAwLi4yNTUgaW5wdXRzLCBwcm9kdWNlcyAwLi4xIG91dHB1dHMuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gcmdiMmhzbChjb2xvcikge1xuICAgIHZhciByID0gY29sb3JbMF0gLyAyNTU7XG4gICAgdmFyIGcgPSBjb2xvclsxXSAvIDI1NTtcbiAgICB2YXIgYiA9IGNvbG9yWzJdIC8gMjU1O1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICAgICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGggPSAwLFxuICAgICAgICBzLFxuICAgICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIHMgPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuXG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6XG4gICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgZzpcbiAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgYjpcbiAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMCkgdCArPSAxO1xuICAgIGlmICh0ID4gMSkgdCAtPSAxO1xuICAgIGlmICh0IDwgMSAvIDYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xuICAgIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICByZXR1cm4gcDtcbiAgfVxuICAvKipcbiAgICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gRXhwZWN0cyAwLi4xIGlucHV0cywgcHJvZHVjZXMgMC4uMjU1IG91dHB1dHMuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gaHNsMnJnYihjb2xvcikge1xuICAgIHZhciBsID0gY29sb3JbMl07XG5cbiAgICBpZiAoY29sb3JbMV0gPT0gMCkge1xuICAgICAgbCA9IE1hdGgucm91bmQobCAqIDI1NSk7XG4gICAgICByZXR1cm4gW2wsIGwsIGxdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcyA9IGNvbG9yWzFdO1xuICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICB2YXIgciA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gKyAxIC8gMyk7XG4gICAgICB2YXIgZyA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0pO1xuICAgICAgdmFyIGIgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdIC0gMSAvIDMpO1xuICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKHIgKiAyNTUpLCBNYXRoLnJvdW5kKGcgKiAyNTUpLCBNYXRoLnJvdW5kKGIgKiAyNTUpXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b1JHQihjb2xvcikge1xuICAgIHZhciBjbGFtcGVkID0gY29sb3IubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gY2xhbXAoeCwgMCwgMjU1KTtcbiAgICB9KTtcbiAgICByZXR1cm4gXCJyZ2IoXCIgKyBjbGFtcGVkLmpvaW4oXCIsXCIpICsgXCIpXCI7XG4gIH1cblxuICBmdW5jdGlvbiB0b0hleChjb2xvcikge1xuICAgIHZhciBjbGFtcGVkID0gY29sb3IubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gY2xhbXAoeCwgMCwgMjU1KS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBcIiNcIiArIGNsYW1wZWQuam9pbihcIlwiKTtcbiAgfVxuXG4gIHZhciBDQUNIRSA9IHtcbiAgICBcImJsYWNrXCI6IFswLCAwLCAwXSxcbiAgICBcIm5hdnlcIjogWzAsIDAsIDEyOF0sXG4gICAgXCJkYXJrYmx1ZVwiOiBbMCwgMCwgMTM5XSxcbiAgICBcIm1lZGl1bWJsdWVcIjogWzAsIDAsIDIwNV0sXG4gICAgXCJibHVlXCI6IFswLCAwLCAyNTVdLFxuICAgIFwiZGFya2dyZWVuXCI6IFswLCAxMDAsIDBdLFxuICAgIFwiZ3JlZW5cIjogWzAsIDEyOCwgMF0sXG4gICAgXCJ0ZWFsXCI6IFswLCAxMjgsIDEyOF0sXG4gICAgXCJkYXJrY3lhblwiOiBbMCwgMTM5LCAxMzldLFxuICAgIFwiZGVlcHNreWJsdWVcIjogWzAsIDE5MSwgMjU1XSxcbiAgICBcImRhcmt0dXJxdW9pc2VcIjogWzAsIDIwNiwgMjA5XSxcbiAgICBcIm1lZGl1bXNwcmluZ2dyZWVuXCI6IFswLCAyNTAsIDE1NF0sXG4gICAgXCJsaW1lXCI6IFswLCAyNTUsIDBdLFxuICAgIFwic3ByaW5nZ3JlZW5cIjogWzAsIDI1NSwgMTI3XSxcbiAgICBcImFxdWFcIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcImN5YW5cIjogWzAsIDI1NSwgMjU1XSxcbiAgICBcIm1pZG5pZ2h0Ymx1ZVwiOiBbMjUsIDI1LCAxMTJdLFxuICAgIFwiZG9kZ2VyYmx1ZVwiOiBbMzAsIDE0NCwgMjU1XSxcbiAgICBcImZvcmVzdGdyZWVuXCI6IFszNCwgMTM5LCAzNF0sXG4gICAgXCJzZWFncmVlblwiOiBbNDYsIDEzOSwgODddLFxuICAgIFwiZGFya3NsYXRlZ3JheVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJkYXJrc2xhdGVncmV5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImxpbWVncmVlblwiOiBbNTAsIDIwNSwgNTBdLFxuICAgIFwibWVkaXVtc2VhZ3JlZW5cIjogWzYwLCAxNzksIDExM10sXG4gICAgXCJ0dXJxdW9pc2VcIjogWzY0LCAyMjQsIDIwOF0sXG4gICAgXCJyb3lhbGJsdWVcIjogWzY1LCAxMDUsIDIyNV0sXG4gICAgXCJzdGVlbGJsdWVcIjogWzcwLCAxMzAsIDE4MF0sXG4gICAgXCJkYXJrc2xhdGVibHVlXCI6IFs3MiwgNjEsIDEzOV0sXG4gICAgXCJtZWRpdW10dXJxdW9pc2VcIjogWzcyLCAyMDksIDIwNF0sXG4gICAgXCJpbmRpZ29cIjogWzc1LCAwLCAxMzBdLFxuICAgIFwiZGFya29saXZlZ3JlZW5cIjogWzg1LCAxMDcsIDQ3XSxcbiAgICBcImNhZGV0Ymx1ZVwiOiBbOTUsIDE1OCwgMTYwXSxcbiAgICBcImNvcm5mbG93ZXJibHVlXCI6IFsxMDAsIDE0OSwgMjM3XSxcbiAgICBcIm1lZGl1bWFxdWFtYXJpbmVcIjogWzEwMiwgMjA1LCAxNzBdLFxuICAgIFwiZGltZ3JheVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJkaW1ncmV5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcInNsYXRlYmx1ZVwiOiBbMTA2LCA5MCwgMjA1XSxcbiAgICBcIm9saXZlZHJhYlwiOiBbMTA3LCAxNDIsIDM1XSxcbiAgICBcInNsYXRlZ3JheVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJzbGF0ZWdyZXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwibGlnaHRzbGF0ZWdyYXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibGlnaHRzbGF0ZWdyZXlcIjogWzExOSwgMTM2LCAxNTNdLFxuICAgIFwibWVkaXVtc2xhdGVibHVlXCI6IFsxMjMsIDEwNCwgMjM4XSxcbiAgICBcImxhd25ncmVlblwiOiBbMTI0LCAyNTIsIDBdLFxuICAgIFwiY2hhcnRyZXVzZVwiOiBbMTI3LCAyNTUsIDBdLFxuICAgIFwiYXF1YW1hcmluZVwiOiBbMTI3LCAyNTUsIDIxMl0sXG4gICAgXCJtYXJvb25cIjogWzEyOCwgMCwgMF0sXG4gICAgXCJwdXJwbGVcIjogWzEyOCwgMCwgMTI4XSxcbiAgICBcIm9saXZlXCI6IFsxMjgsIDEyOCwgMF0sXG4gICAgXCJncmF5XCI6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBcImdyZXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwic2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDIzNV0sXG4gICAgXCJsaWdodHNreWJsdWVcIjogWzEzNSwgMjA2LCAyNTBdLFxuICAgIFwiYmx1ZXZpb2xldFwiOiBbMTM4LCA0MywgMjI2XSxcbiAgICBcImRhcmtyZWRcIjogWzEzOSwgMCwgMF0sXG4gICAgXCJkYXJrbWFnZW50YVwiOiBbMTM5LCAwLCAxMzldLFxuICAgIFwic2FkZGxlYnJvd25cIjogWzEzOSwgNjksIDE5XSxcbiAgICBcImRhcmtzZWFncmVlblwiOiBbMTQzLCAxODgsIDE0M10sXG4gICAgXCJsaWdodGdyZWVuXCI6IFsxNDQsIDIzOCwgMTQ0XSxcbiAgICBcIm1lZGl1bXB1cnBsZVwiOiBbMTQ3LCAxMTIsIDIxNl0sXG4gICAgXCJkYXJrdmlvbGV0XCI6IFsxNDgsIDAsIDIxMV0sXG4gICAgXCJwYWxlZ3JlZW5cIjogWzE1MiwgMjUxLCAxNTJdLFxuICAgIFwiZGFya29yY2hpZFwiOiBbMTUzLCA1MCwgMjA0XSxcbiAgICBcInllbGxvd2dyZWVuXCI6IFsxNTQsIDIwNSwgNTBdLFxuICAgIFwic2llbm5hXCI6IFsxNjAsIDgyLCA0NV0sXG4gICAgXCJicm93blwiOiBbMTY1LCA0MiwgNDJdLFxuICAgIFwiZGFya2dyYXlcIjogWzE2OSwgMTY5LCAxNjldLFxuICAgIFwiZGFya2dyZXlcIjogWzE2OSwgMTY5LCAxNjldLFxuICAgIFwibGlnaHRibHVlXCI6IFsxNzMsIDIxNiwgMjMwXSxcbiAgICBcImdyZWVueWVsbG93XCI6IFsxNzMsIDI1NSwgNDddLFxuICAgIFwicGFsZXR1cnF1b2lzZVwiOiBbMTc1LCAyMzgsIDIzOF0sXG4gICAgXCJsaWdodHN0ZWVsYmx1ZVwiOiBbMTc2LCAxOTYsIDIyMl0sXG4gICAgXCJwb3dkZXJibHVlXCI6IFsxNzYsIDIyNCwgMjMwXSxcbiAgICBcImZpcmVicmlja1wiOiBbMTc4LCAzNCwgMzRdLFxuICAgIFwiZGFya2dvbGRlbnJvZFwiOiBbMTg0LCAxMzQsIDExXSxcbiAgICBcIm1lZGl1bW9yY2hpZFwiOiBbMTg2LCA4NSwgMjExXSxcbiAgICBcInJvc3licm93blwiOiBbMTg4LCAxNDMsIDE0M10sXG4gICAgXCJkYXJra2hha2lcIjogWzE4OSwgMTgzLCAxMDddLFxuICAgIFwic2lsdmVyXCI6IFsxOTIsIDE5MiwgMTkyXSxcbiAgICBcIm1lZGl1bXZpb2xldHJlZFwiOiBbMTk5LCAyMSwgMTMzXSxcbiAgICBcImluZGlhbnJlZFwiOiBbMjA1LCA5MiwgOTJdLFxuICAgIFwicGVydVwiOiBbMjA1LCAxMzMsIDYzXSxcbiAgICBcImNob2NvbGF0ZVwiOiBbMjEwLCAxMDUsIDMwXSxcbiAgICBcInRhblwiOiBbMjEwLCAxODAsIDE0MF0sXG4gICAgXCJsaWdodGdyYXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwibGlnaHRncmV5XCI6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBcInBhbGV2aW9sZXRyZWRcIjogWzIxNiwgMTEyLCAxNDddLFxuICAgIFwidGhpc3RsZVwiOiBbMjE2LCAxOTEsIDIxNl0sXG4gICAgXCJvcmNoaWRcIjogWzIxOCwgMTEyLCAyMTRdLFxuICAgIFwiZ29sZGVucm9kXCI6IFsyMTgsIDE2NSwgMzJdLFxuICAgIFwiY3JpbXNvblwiOiBbMjIwLCAyMCwgNjBdLFxuICAgIFwiZ2FpbnNib3JvXCI6IFsyMjAsIDIyMCwgMjIwXSxcbiAgICBcInBsdW1cIjogWzIyMSwgMTYwLCAyMjFdLFxuICAgIFwiYnVybHl3b29kXCI6IFsyMjIsIDE4NCwgMTM1XSxcbiAgICBcImxpZ2h0Y3lhblwiOiBbMjI0LCAyNTUsIDI1NV0sXG4gICAgXCJsYXZlbmRlclwiOiBbMjMwLCAyMzAsIDI1MF0sXG4gICAgXCJkYXJrc2FsbW9uXCI6IFsyMzMsIDE1MCwgMTIyXSxcbiAgICBcInZpb2xldFwiOiBbMjM4LCAxMzAsIDIzOF0sXG4gICAgXCJwYWxlZ29sZGVucm9kXCI6IFsyMzgsIDIzMiwgMTcwXSxcbiAgICBcImxpZ2h0Y29yYWxcIjogWzI0MCwgMTI4LCAxMjhdLFxuICAgIFwia2hha2lcIjogWzI0MCwgMjMwLCAxNDBdLFxuICAgIFwiYWxpY2VibHVlXCI6IFsyNDAsIDI0OCwgMjU1XSxcbiAgICBcImhvbmV5ZGV3XCI6IFsyNDAsIDI1NSwgMjQwXSxcbiAgICBcImF6dXJlXCI6IFsyNDAsIDI1NSwgMjU1XSxcbiAgICBcInNhbmR5YnJvd25cIjogWzI0NCwgMTY0LCA5Nl0sXG4gICAgXCJ3aGVhdFwiOiBbMjQ1LCAyMjIsIDE3OV0sXG4gICAgXCJiZWlnZVwiOiBbMjQ1LCAyNDUsIDIyMF0sXG4gICAgXCJ3aGl0ZXNtb2tlXCI6IFsyNDUsIDI0NSwgMjQ1XSxcbiAgICBcIm1pbnRjcmVhbVwiOiBbMjQ1LCAyNTUsIDI1MF0sXG4gICAgXCJnaG9zdHdoaXRlXCI6IFsyNDgsIDI0OCwgMjU1XSxcbiAgICBcInNhbG1vblwiOiBbMjUwLCAxMjgsIDExNF0sXG4gICAgXCJhbnRpcXVld2hpdGVcIjogWzI1MCwgMjM1LCAyMTVdLFxuICAgIFwibGluZW5cIjogWzI1MCwgMjQwLCAyMzBdLFxuICAgIFwibGlnaHRnb2xkZW5yb2R5ZWxsb3dcIjogWzI1MCwgMjUwLCAyMTBdLFxuICAgIFwib2xkbGFjZVwiOiBbMjUzLCAyNDUsIDIzMF0sXG4gICAgXCJyZWRcIjogWzI1NSwgMCwgMF0sXG4gICAgXCJmdWNoc2lhXCI6IFsyNTUsIDAsIDI1NV0sXG4gICAgXCJtYWdlbnRhXCI6IFsyNTUsIDAsIDI1NV0sXG4gICAgXCJkZWVwcGlua1wiOiBbMjU1LCAyMCwgMTQ3XSxcbiAgICBcIm9yYW5nZXJlZFwiOiBbMjU1LCA2OSwgMF0sXG4gICAgXCJ0b21hdG9cIjogWzI1NSwgOTksIDcxXSxcbiAgICBcImhvdHBpbmtcIjogWzI1NSwgMTA1LCAxODBdLFxuICAgIFwiY29yYWxcIjogWzI1NSwgMTI3LCA4MF0sXG4gICAgXCJkYXJrb3JhbmdlXCI6IFsyNTUsIDE0MCwgMF0sXG4gICAgXCJsaWdodHNhbG1vblwiOiBbMjU1LCAxNjAsIDEyMl0sXG4gICAgXCJvcmFuZ2VcIjogWzI1NSwgMTY1LCAwXSxcbiAgICBcImxpZ2h0cGlua1wiOiBbMjU1LCAxODIsIDE5M10sXG4gICAgXCJwaW5rXCI6IFsyNTUsIDE5MiwgMjAzXSxcbiAgICBcImdvbGRcIjogWzI1NSwgMjE1LCAwXSxcbiAgICBcInBlYWNocHVmZlwiOiBbMjU1LCAyMTgsIDE4NV0sXG4gICAgXCJuYXZham93aGl0ZVwiOiBbMjU1LCAyMjIsIDE3M10sXG4gICAgXCJtb2NjYXNpblwiOiBbMjU1LCAyMjgsIDE4MV0sXG4gICAgXCJiaXNxdWVcIjogWzI1NSwgMjI4LCAxOTZdLFxuICAgIFwibWlzdHlyb3NlXCI6IFsyNTUsIDIyOCwgMjI1XSxcbiAgICBcImJsYW5jaGVkYWxtb25kXCI6IFsyNTUsIDIzNSwgMjA1XSxcbiAgICBcInBhcGF5YXdoaXBcIjogWzI1NSwgMjM5LCAyMTNdLFxuICAgIFwibGF2ZW5kZXJibHVzaFwiOiBbMjU1LCAyNDAsIDI0NV0sXG4gICAgXCJzZWFzaGVsbFwiOiBbMjU1LCAyNDUsIDIzOF0sXG4gICAgXCJjb3Juc2lsa1wiOiBbMjU1LCAyNDgsIDIyMF0sXG4gICAgXCJsZW1vbmNoaWZmb25cIjogWzI1NSwgMjUwLCAyMDVdLFxuICAgIFwiZmxvcmFsd2hpdGVcIjogWzI1NSwgMjUwLCAyNDBdLFxuICAgIFwic25vd1wiOiBbMjU1LCAyNTAsIDI1MF0sXG4gICAgXCJ5ZWxsb3dcIjogWzI1NSwgMjU1LCAwXSxcbiAgICBcImxpZ2h0eWVsbG93XCI6IFsyNTUsIDI1NSwgMjI0XSxcbiAgICBcIml2b3J5XCI6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBcIndoaXRlXCI6IFsyNTUsIDI1NSwgMjU1XVxuICB9O1xuICB2YXIgY29sb3IgPVxuICAvKiNfX1BVUkVfXyovXG4gIE9iamVjdC5mcmVlemUoe1xuICAgIGZyb21TdHJpbmc6IGZyb21TdHJpbmcsXG4gICAgYWRkOiBhZGQsXG4gICAgYWRkXzogYWRkXyxcbiAgICBtdWx0aXBseTogbXVsdGlwbHksXG4gICAgbXVsdGlwbHlfOiBtdWx0aXBseV8sXG4gICAgaW50ZXJwb2xhdGU6IGludGVycG9sYXRlLFxuICAgIGxlcnA6IGxlcnAsXG4gICAgaW50ZXJwb2xhdGVIU0w6IGludGVycG9sYXRlSFNMLFxuICAgIGxlcnBIU0w6IGxlcnBIU0wsXG4gICAgcmFuZG9taXplOiByYW5kb21pemUsXG4gICAgcmdiMmhzbDogcmdiMmhzbCxcbiAgICBoc2wycmdiOiBoc2wycmdiLFxuICAgIHRvUkdCOiB0b1JHQixcbiAgICB0b0hleDogdG9IZXhcbiAgfSk7XG4gIC8qKlxuICAgKiBAY2xhc3MgVGlsZSBiYWNrZW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG4gIHZhciBUaWxlR0wgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQmFja2VuZDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShUaWxlR0wsIF9CYWNrZW5kMik7XG5cbiAgICBmdW5jdGlvbiBUaWxlR0woKSB7XG4gICAgICB2YXIgX3RoaXM1O1xuXG4gICAgICBfdGhpczUgPSBfQmFja2VuZDIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXM1Ll91bmlmb3JtcyA9IHt9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBfdGhpczUuX2dsID0gX3RoaXM1Ll9pbml0V2ViR0woKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgYWxlcnQoZS5tZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzNTtcbiAgICB9XG5cbiAgICBUaWxlR0wuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcbiAgICAgIHJldHVybiAhIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7XG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBfcHJvdG83ID0gVGlsZUdMLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzcuc2NoZWR1bGUgPSBmdW5jdGlvbiBzY2hlZHVsZShjYikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5nZXRDb250YWluZXIgPSBmdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2wuY2FudmFzO1xuICAgIH07XG5cbiAgICBfcHJvdG83LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICBfQmFja2VuZDIucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuXG4gICAgICB2YXIgdGlsZVNldCA9IHRoaXMuX29wdGlvbnMudGlsZVNldDtcblxuICAgICAgaWYgKHRpbGVTZXQgJiYgXCJjb21wbGV0ZVwiIGluIHRpbGVTZXQgJiYgIXRpbGVTZXQuY29tcGxldGUpIHtcbiAgICAgICAgdGlsZVNldC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNi5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl91cGRhdGVUZXh0dXJlKHRpbGVTZXQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG83LmRyYXcgPSBmdW5jdGlvbiBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICB2YXIgZ2wgPSB0aGlzLl9nbDtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgIGJnID0gZGF0YVs0XTtcbiAgICAgIHZhciBzY2lzc29yWSA9IGdsLmNhbnZhcy5oZWlnaHQgLSAoeSArIDEpICogb3B0cy50aWxlSGVpZ2h0O1xuICAgICAgZ2wuc2Npc3Nvcih4ICogb3B0cy50aWxlV2lkdGgsIHNjaXNzb3JZLCBvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0KTtcblxuICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGlmIChvcHRzLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wuY2xlYXJDb2xvci5hcHBseShnbCwgcGFyc2VDb2xvcihiZykpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgdmFyIGJncyA9IFtdLmNvbmNhdChiZyk7XG4gICAgICB2YXIgZmdzID0gW10uY29uY2F0KGZnKTtcbiAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0YXJnZXRQb3NSZWxcIl0sIFt4LCB5XSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuXG4gICAgICAgIGlmICghdGlsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNoYXIgXFxcIlwiICsgY2hhcnNbaV0gKyBcIlxcXCIgbm90IGZvdW5kIGluIHRpbGVNYXBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBnbC51bmlmb3JtMWYodGhpcy5fdW5pZm9ybXNbXCJjb2xvcml6ZVwiXSwgb3B0cy50aWxlQ29sb3JpemUgPyAxIDogMCk7XG4gICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0aWxlc2V0UG9zQWJzXCJdLCB0aWxlKTtcblxuICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1widGludFwiXSwgcGFyc2VDb2xvcihmZ3NbaV0pKTtcbiAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1wiYmdcIl0sIHBhcnNlQ29sb3IoYmdzW2ldKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgIH1cbiAgICAgIC8qXG4gICAgICBcbiAgICAgIFxuICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTxjaGFycy5sZW5ndGg7aSsrKSB7XG4gICAgICBcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkgeyAvLyBhcHBseSBjb2xvcml6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fY29sb3JDYW52YXM7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGZnID0gZmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IGJnc1tpXTtcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRpbGVTZXQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGJnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBubyBjb2xvcml6aW5nLCBlYXN5XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB4KnRpbGVXaWR0aCwgeSp0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICovXG5cbiAgICB9O1xuXG4gICAgX3Byb3RvNy5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICBnbC5jbGVhckNvbG9yLmFwcGx5KGdsLCBwYXJzZUNvbG9yKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICAgIGdsLnNjaXNzb3IoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgIH07XG5cbiAgICBfcHJvdG83LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKTtcbiAgICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KTtcbiAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfTtcblxuICAgIF9wcm90bzcuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH07XG5cbiAgICBfcHJvdG83LmV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICB2YXIgY2FudmFzID0gdGhpcy5fZ2wuY2FudmFzO1xuICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB4IC09IHJlY3QubGVmdDtcbiAgICAgIHkgLT0gcmVjdC50b3A7XG4gICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICB5ICo9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcblxuICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY2FudmFzLndpZHRoIHx8IHkgPj0gY2FudmFzLmhlaWdodCkge1xuICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgIH07XG5cbiAgICBfcHJvdG83Ll9pbml0V2ViR0wgPSBmdW5jdGlvbiBfaW5pdFdlYkdMKCkge1xuICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgIHZhciBnbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7XG4gICAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuZ2wgPSBnbDtcbiAgICAgIHZhciBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgVlMsIEZTKTtcbiAgICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgICBjcmVhdGVRdWFkKGdsKTtcbiAgICAgIFVOSUZPUk1TLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzNy5fdW5pZm9ybXNbbmFtZV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgbmFtZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgIGdsLmVuYWJsZShnbC5TQ0lTU09SX1RFU1QpO1xuICAgICAgcmV0dXJuIGdsO1xuICAgIH07XG5cbiAgICBfcHJvdG83Ll9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH07XG5cbiAgICBfcHJvdG83Ll91cGRhdGVTaXplID0gZnVuY3Rpb24gX3VwZGF0ZVNpemUoKSB7XG4gICAgICB2YXIgZ2wgPSB0aGlzLl9nbDtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgIHZhciBjYW52YXNTaXplID0gW29wdHMud2lkdGggKiBvcHRzLnRpbGVXaWR0aCwgb3B0cy5oZWlnaHQgKiBvcHRzLnRpbGVIZWlnaHRdO1xuICAgICAgZ2wuY2FudmFzLndpZHRoID0gY2FudmFzU2l6ZVswXTtcbiAgICAgIGdsLmNhbnZhcy5oZWlnaHQgPSBjYW52YXNTaXplWzFdO1xuICAgICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzU2l6ZVswXSwgY2FudmFzU2l6ZVsxXSk7XG4gICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZVNpemVcIl0sIFtvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0XSk7XG4gICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0U2l6ZVwiXSwgY2FudmFzU2l6ZSk7XG4gICAgfTtcblxuICAgIF9wcm90bzcuX3VwZGF0ZVRleHR1cmUgPSBmdW5jdGlvbiBfdXBkYXRlVGV4dHVyZSh0aWxlU2V0KSB7XG4gICAgICBjcmVhdGVUZXh0dXJlKHRoaXMuX2dsLCB0aWxlU2V0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFRpbGVHTDtcbiAgfShCYWNrZW5kKTtcblxuICB2YXIgVU5JRk9STVMgPSBbXCJ0YXJnZXRQb3NSZWxcIiwgXCJ0aWxlc2V0UG9zQWJzXCIsIFwidGlsZVNpemVcIiwgXCJ0YXJnZXRTaXplXCIsIFwiY29sb3JpemVcIiwgXCJiZ1wiLCBcInRpbnRcIl07XG4gIHZhciBWUyA9IFwiXFxuI3ZlcnNpb24gMzAwIGVzXFxuXFxuaW4gdmVjMiB0aWxlUG9zUmVsO1xcbm91dCB2ZWMyIHRpbGVzZXRQb3NQeDtcXG5cXG51bmlmb3JtIHZlYzIgdGlsZXNldFBvc0FicztcXG51bmlmb3JtIHZlYzIgdGlsZVNpemU7XFxudW5pZm9ybSB2ZWMyIHRhcmdldFNpemU7XFxudW5pZm9ybSB2ZWMyIHRhcmdldFBvc1JlbDtcXG5cXG52b2lkIG1haW4oKSB7XFxuXFx0dmVjMiB0YXJnZXRQb3NQeCA9ICh0YXJnZXRQb3NSZWwgKyB0aWxlUG9zUmVsKSAqIHRpbGVTaXplO1xcblxcdHZlYzIgdGFyZ2V0UG9zTmRjID0gKCh0YXJnZXRQb3NQeCAvIHRhcmdldFNpemUpLTAuNSkqMi4wO1xcblxcdHRhcmdldFBvc05kYy55ICo9IC0xLjA7XFxuXFxuXFx0Z2xfUG9zaXRpb24gPSB2ZWM0KHRhcmdldFBvc05kYywgMC4wLCAxLjApO1xcblxcdHRpbGVzZXRQb3NQeCA9IHRpbGVzZXRQb3NBYnMgKyB0aWxlUG9zUmVsICogdGlsZVNpemU7XFxufVwiLnRyaW0oKTtcbiAgdmFyIEZTID0gXCJcXG4jdmVyc2lvbiAzMDAgZXNcXG5wcmVjaXNpb24gaGlnaHAgZmxvYXQ7XFxuXFxuaW4gdmVjMiB0aWxlc2V0UG9zUHg7XFxub3V0IHZlYzQgZnJhZ0NvbG9yO1xcbnVuaWZvcm0gc2FtcGxlcjJEIGltYWdlO1xcbnVuaWZvcm0gYm9vbCBjb2xvcml6ZTtcXG51bmlmb3JtIHZlYzQgYmc7XFxudW5pZm9ybSB2ZWM0IHRpbnQ7XFxuXFxudm9pZCBtYWluKCkge1xcblxcdGZyYWdDb2xvciA9IHZlYzQoMCwgMCwgMCwgMSk7XFxuXFxuXFx0dmVjNCB0ZXhlbCA9IHRleGVsRmV0Y2goaW1hZ2UsIGl2ZWMyKHRpbGVzZXRQb3NQeCksIDApO1xcblxcblxcdGlmIChjb2xvcml6ZSkge1xcblxcdFxcdHRleGVsLnJnYiA9IHRpbnQuYSAqIHRpbnQucmdiICsgKDEuMC10aW50LmEpICogdGV4ZWwucmdiO1xcblxcdFxcdGZyYWdDb2xvci5yZ2IgPSB0ZXhlbC5hKnRleGVsLnJnYiArICgxLjAtdGV4ZWwuYSkqYmcucmdiO1xcblxcdFxcdGZyYWdDb2xvci5hID0gdGV4ZWwuYSArICgxLjAtdGV4ZWwuYSkqYmcuYTtcXG5cXHR9IGVsc2Uge1xcblxcdFxcdGZyYWdDb2xvciA9IHRleGVsO1xcblxcdH1cXG59XCIudHJpbSgpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHZzcywgZnNzKSB7XG4gICAgdmFyIHZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2cywgdnNzKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZzKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZzLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHZzKSB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICB2YXIgZnMgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnMsIGZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcyk7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcywgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcykgfHwgXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIHAgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIHZzKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocCwgZnMpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHApO1xuXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHAsIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHApIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBwO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUXVhZChnbCkge1xuICAgIHZhciBwb3MgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAwLCAxLCAxLCAxXSk7XG4gICAgdmFyIGJ1ZiA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWYpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwb3MsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgwKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDAsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVUZXh0dXJlKGdsLCBkYXRhKSB7XG4gICAgdmFyIHQgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5SRVBFQVQpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLlJFUEVBVCk7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMCk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICByZXR1cm4gdDtcbiAgfVxuXG4gIHZhciBjb2xvckNhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvcikge1xuICAgIGlmICghKGNvbG9yIGluIGNvbG9yQ2FjaGUpKSB7XG4gICAgICB2YXIgcGFyc2VkO1xuXG4gICAgICBpZiAoY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgIHBhcnNlZCA9IFswLCAwLCAwLCAwXTtcbiAgICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZihcInJnYmFcIikgPiAtMSkge1xuICAgICAgICBwYXJzZWQgPSAoY29sb3IubWF0Y2goL1tcXGQuXSsvZykgfHwgW10pLm1hcChOdW1iZXIpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgcGFyc2VkW2ldID0gcGFyc2VkW2ldIC8gMjU1O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWQgPSBmcm9tU3RyaW5nKGNvbG9yKS5tYXAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgICByZXR1cm4gJCAvIDI1NTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhcnNlZC5wdXNoKDEpO1xuICAgICAgfVxuXG4gICAgICBjb2xvckNhY2hlW2NvbG9yXSA9IHBhcnNlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sb3JDYWNoZVtjb2xvcl07XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclRvQW5zaShiZykge1xuICAgIHJldHVybiBcIlxceDFCWzA7NDg7NTtcIiArIHRlcm1jb2xvcihiZykgKyBcIm1cXHgxQlsySlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sb3JUb0Fuc2koZmcsIGJnKSB7XG4gICAgcmV0dXJuIFwiXFx4MUJbMDszODs1O1wiICsgdGVybWNvbG9yKGZnKSArIFwiOzQ4OzU7XCIgKyB0ZXJtY29sb3IoYmcpICsgXCJtXCI7XG4gIH1cblxuICBmdW5jdGlvbiBwb3NpdGlvblRvQW5zaSh4LCB5KSB7XG4gICAgcmV0dXJuIFwiXFx4MUJbXCIgKyAoeSArIDEpICsgXCI7XCIgKyAoeCArIDEpICsgXCJIXCI7XG4gIH1cblxuICBmdW5jdGlvbiB0ZXJtY29sb3IoY29sb3IpIHtcbiAgICB2YXIgU1JDX0NPTE9SUyA9IDI1Ni4wO1xuICAgIHZhciBEU1RfQ09MT1JTID0gNi4wO1xuICAgIHZhciBDT0xPUl9SQVRJTyA9IERTVF9DT0xPUlMgLyBTUkNfQ09MT1JTO1xuICAgIHZhciByZ2IgPSBmcm9tU3RyaW5nKGNvbG9yKTtcbiAgICB2YXIgciA9IE1hdGguZmxvb3IocmdiWzBdICogQ09MT1JfUkFUSU8pO1xuICAgIHZhciBnID0gTWF0aC5mbG9vcihyZ2JbMV0gKiBDT0xPUl9SQVRJTyk7XG4gICAgdmFyIGIgPSBNYXRoLmZsb29yKHJnYlsyXSAqIENPTE9SX1JBVElPKTtcbiAgICByZXR1cm4gciAqIDM2ICsgZyAqIDYgKyBiICogMSArIDE2O1xuICB9XG5cbiAgdmFyIFRlcm0gPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQmFja2VuZDMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShUZXJtLCBfQmFja2VuZDMpO1xuXG4gICAgZnVuY3Rpb24gVGVybSgpIHtcbiAgICAgIHZhciBfdGhpczg7XG5cbiAgICAgIF90aGlzOCA9IF9CYWNrZW5kMy5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczguX29mZnNldCA9IFswLCAwXTtcbiAgICAgIF90aGlzOC5fY3Vyc29yID0gWy0xLCAtMV07XG4gICAgICBfdGhpczguX2xhc3RDb2xvciA9IFwiXCI7XG4gICAgICByZXR1cm4gX3RoaXM4O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG84ID0gVGVybS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG84LnNjaGVkdWxlID0gZnVuY3Rpb24gc2NoZWR1bGUoY2IpIHtcbiAgICAgIHNldFRpbWVvdXQoY2IsIDEwMDAgLyA2MCk7XG4gICAgfTtcblxuICAgIF9wcm90bzguc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgX0JhY2tlbmQzLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgIHZhciBzaXplID0gW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XTtcbiAgICAgIHZhciBhdmFpbCA9IHRoaXMuY29tcHV0ZVNpemUoKTtcbiAgICAgIHRoaXMuX29mZnNldCA9IGF2YWlsLm1hcChmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigodmFsIC0gc2l6ZVtpbmRleF0pIC8gMik7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvOC5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY2xlYXJUb0Fuc2kodGhpcy5fb3B0aW9ucy5iZykpO1xuICAgIH07XG5cbiAgICBfcHJvdG84LmRyYXcgPSBmdW5jdGlvbiBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gZHJhdyB3aGF0IHdpdGggd2hhdCBjb2xvcnNcbiAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgIGJnID0gZGF0YVs0XTsgLy8gZGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gbW92ZSB0aGUgdGVybWluYWwgY3Vyc29yXG5cbiAgICAgIHZhciBkeCA9IHRoaXMuX29mZnNldFswXSArIHg7XG4gICAgICB2YXIgZHkgPSB0aGlzLl9vZmZzZXRbMV0gKyB5O1xuICAgICAgdmFyIHNpemUgPSB0aGlzLmNvbXB1dGVTaXplKCk7XG5cbiAgICAgIGlmIChkeCA8IDAgfHwgZHggPj0gc2l6ZVswXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSA8IDAgfHwgZHkgPj0gc2l6ZVsxXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkeCAhPT0gdGhpcy5fY3Vyc29yWzBdIHx8IGR5ICE9PSB0aGlzLl9jdXJzb3JbMV0pIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocG9zaXRpb25Ub0Fuc2koZHgsIGR5KSk7XG4gICAgICAgIHRoaXMuX2N1cnNvclswXSA9IGR4O1xuICAgICAgICB0aGlzLl9jdXJzb3JbMV0gPSBkeTtcbiAgICAgIH0gLy8gdGVybWluYWxzIGF1dG9tYXRpY2FsbHkgY2xlYXIsIGJ1dCBpZiB3ZSdyZSBjbGVhcmluZyB3aGVuIHdlJ3JlXG4gICAgICAvLyBub3Qgb3RoZXJ3aXNlIHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGp1c3QgdXNlIGEgc3BhY2UgaW5zdGVhZFxuXG5cbiAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgY2ggPSBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBpZiB3ZSdyZSBub3QgY2xlYXJpbmcgYW5kIG5vdCBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBkbyBub3RoaW5nXG5cblxuICAgICAgaWYgKCFjaCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNoYW5nZSBjb2xvcnNcblxuXG4gICAgICB2YXIgbmV3Q29sb3IgPSBjb2xvclRvQW5zaShmZywgYmcpO1xuXG4gICAgICBpZiAobmV3Q29sb3IgIT09IHRoaXMuX2xhc3RDb2xvcikge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShuZXdDb2xvcik7XG4gICAgICAgIHRoaXMuX2xhc3RDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ggIT0gJ1xcdCcpIHtcbiAgICAgICAgLy8gd3JpdGUgdGhlIHByb3ZpZGVkIHN5bWJvbCB0byB0aGUgZGlzcGxheVxuICAgICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjaGFyc1swXSk7XG4gICAgICB9IC8vIHVwZGF0ZSBvdXIgcG9zaXRpb24sIGdpdmVuIHRoYXQgd2Ugd3JvdGUgYSBjaGFyYWN0ZXJcblxuXG4gICAgICB0aGlzLl9jdXJzb3JbMF0rKztcblxuICAgICAgaWYgKHRoaXMuX2N1cnNvclswXSA+PSBzaXplWzBdKSB7XG4gICAgICAgIHRoaXMuX2N1cnNvclswXSA9IDA7XG4gICAgICAgIHRoaXMuX2N1cnNvclsxXSsrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG84LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRlcm1pbmFsIGJhY2tlbmQgaGFzIG5vIG5vdGlvbiBvZiBmb250IHNpemVcIik7XG4gICAgfTtcblxuICAgIF9wcm90bzguZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfTtcblxuICAgIF9wcm90bzguY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZSgpIHtcbiAgICAgIHJldHVybiBbcHJvY2Vzcy5zdGRvdXQuY29sdW1ucywgcHJvY2Vzcy5zdGRvdXQucm93c107XG4gICAgfTtcblxuICAgIHJldHVybiBUZXJtO1xuICB9KEJhY2tlbmQpO1xuICAvKipcbiAgICogQG5hbWVzcGFjZVxuICAgKiBDb250YWlucyB0ZXh0IHRva2VuaXphdGlvbiBhbmQgYnJlYWtpbmcgcm91dGluZXNcbiAgICovXG5cblxuICB2YXIgUkVfQ09MT1JTID0gLyUoW2JjXSl7KFtefV0qKX0vZzsgLy8gdG9rZW4gdHlwZXNcblxuICB2YXIgVFlQRV9URVhUID0gMDtcbiAgdmFyIFRZUEVfTkVXTElORSA9IDE7XG4gIHZhciBUWVBFX0ZHID0gMjtcbiAgdmFyIFRZUEVfQkcgPSAzO1xuICAvKipcbiAgICogTWVhc3VyZSBzaXplIG9mIGEgcmVzdWx0aW5nIHRleHQgYmxvY2tcbiAgICovXG5cbiAgZnVuY3Rpb24gbWVhc3VyZShzdHIsIG1heFdpZHRoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAxXG4gICAgfTtcbiAgICB2YXIgdG9rZW5zID0gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCk7XG4gICAgdmFyIGxpbmVXaWR0aCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgbGluZVdpZHRoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICByZXN1bHQuaGVpZ2h0Kys7XG4gICAgICAgICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgICAgICAgIGxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnQgc3RyaW5nIHRvIGEgc2VyaWVzIG9mIGEgZm9ybWF0dGluZyBjb21tYW5kc1xuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHRva2VuaXplKHN0ciwgbWF4V2lkdGgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgLyogZmlyc3QgdG9rZW5pemF0aW9uIHBhc3MgLSBzcGxpdCB0ZXh0cyBhbmQgY29sb3IgZm9ybWF0dGluZyBjb21tYW5kcyAqL1xuXG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgc3RyLnJlcGxhY2UoUkVfQ09MT1JTLCBmdW5jdGlvbiAobWF0Y2gsIHR5cGUsIG5hbWUsIGluZGV4KSB7XG4gICAgICAvKiBzdHJpbmcgYmVmb3JlICovXG4gICAgICB2YXIgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0LCBpbmRleCk7XG5cbiAgICAgIGlmIChwYXJ0Lmxlbmd0aCkge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICAgIHZhbHVlOiBwYXJ0XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLyogY29sb3IgY29tbWFuZCAqL1xuXG5cbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgdHlwZTogdHlwZSA9PSBcImNcIiA/IFRZUEVfRkcgOiBUWVBFX0JHLFxuICAgICAgICB2YWx1ZTogbmFtZS50cmltKClcbiAgICAgIH0pO1xuICAgICAgb2Zmc2V0ID0gaW5kZXggKyBtYXRjaC5sZW5ndGg7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9KTtcbiAgICAvKiBsYXN0IHJlbWFpbmluZyBwYXJ0ICovXG5cbiAgICB2YXIgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0KTtcblxuICAgIGlmIChwYXJ0Lmxlbmd0aCkge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgIHZhbHVlOiBwYXJ0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnJlYWtMaW5lcyhyZXN1bHQsIG1heFdpZHRoKTtcbiAgfVxuICAvKiBpbnNlcnQgbGluZSBicmVha3MgaW50byBmaXJzdC1wYXNzIHRva2VuaXplZCBkYXRhICovXG5cblxuICBmdW5jdGlvbiBicmVha0xpbmVzKHRva2VucywgbWF4V2lkdGgpIHtcbiAgICBpZiAoIW1heFdpZHRoKSB7XG4gICAgICBtYXhXaWR0aCA9IEluZmluaXR5O1xuICAgIH1cblxuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGluZUxlbmd0aCA9IDA7XG4gICAgdmFyIGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xuXG4gICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAvKiB0YWtlIGFsbCB0ZXh0IHRva2VucywgcmVtb3ZlIHNwYWNlLCBhcHBseSBsaW5lYnJlYWtzICovXG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09IFRZUEVfTkVXTElORSkge1xuICAgICAgICAvKiByZXNldCAqL1xuICAgICAgICBsaW5lTGVuZ3RoID0gMDtcbiAgICAgICAgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi50eXBlICE9IFRZUEVfVEVYVCkge1xuICAgICAgICAvKiBza2lwIG5vbi10ZXh0IHRva2VucyAqL1xuICAgICAgICBpKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLyogcmVtb3ZlIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGxpbmUgKi9cblxuXG4gICAgICB3aGlsZSAobGluZUxlbmd0aCA9PSAwICYmIHRva2VuLnZhbHVlLmNoYXJBdCgwKSA9PSBcIiBcIikge1xuICAgICAgICB0b2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgIH1cbiAgICAgIC8qIGZvcmNlZCBuZXdsaW5lPyBpbnNlcnQgdHdvIG5ldyB0b2tlbnMgYWZ0ZXIgdGhpcyBvbmUgKi9cblxuXG4gICAgICB2YXIgX2luZGV4MiA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCJcXG5cIik7XG5cbiAgICAgIGlmIChfaW5kZXgyICE9IC0xKSB7XG4gICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIF9pbmRleDIsIHRydWUpO1xuICAgICAgICAvKiBpZiB0aGVyZSBhcmUgc3BhY2VzIGF0IHRoZSBlbmQsIHdlIG11c3QgcmVtb3ZlIHRoZW0gKHdlIGRvIG5vdCB3YW50IHRoZSBsaW5lIHRvbyBsb25nKSAqL1xuXG4gICAgICAgIHZhciBhcnIgPSB0b2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcblxuICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgIH1cbiAgICAgIC8qIHRva2VuIGRlZ2VuZXJhdGVkPyAqL1xuXG5cbiAgICAgIGlmICghdG9rZW4udmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRva2Vucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobGluZUxlbmd0aCArIHRva2VuLnZhbHVlLmxlbmd0aCA+IG1heFdpZHRoKSB7XG4gICAgICAgIC8qIGxpbmUgdG9vIGxvbmcsIGZpbmQgYSBzdWl0YWJsZSBicmVha2luZyBzcG90ICovXG5cbiAgICAgICAgLyogaXMgaXQgcG9zc2libGUgdG8gYnJlYWsgd2l0aGluIHRoaXMgdG9rZW4/ICovXG4gICAgICAgIHZhciBfaW5kZXgzID0gLTE7XG5cbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIiwgX2luZGV4MyArIDEpO1xuXG4gICAgICAgICAgaWYgKG5leHRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGxpbmVMZW5ndGggKyBuZXh0SW5kZXggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX2luZGV4MyA9IG5leHRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfaW5kZXgzICE9IC0xKSB7XG4gICAgICAgICAgLyogYnJlYWsgYXQgc3BhY2Ugd2l0aGluIHRoaXMgb25lICovXG4gICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgX2luZGV4MywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFRva2VuV2l0aFNwYWNlICE9IC0xKSB7XG4gICAgICAgICAgLyogaXMgdGhlcmUgYSBwcmV2aW91cyB0b2tlbiB3aGVyZSBhIGJyZWFrIGNhbiBvY2N1cj8gKi9cbiAgICAgICAgICB2YXIgX3Rva2VuID0gdG9rZW5zW2xhc3RUb2tlbldpdGhTcGFjZV07XG5cbiAgICAgICAgICB2YXIgYnJlYWtJbmRleCA9IF90b2tlbi52YWx1ZS5sYXN0SW5kZXhPZihcIiBcIik7XG5cbiAgICAgICAgICBfdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgbGFzdFRva2VuV2l0aFNwYWNlLCBicmVha0luZGV4LCB0cnVlKTtcbiAgICAgICAgICBpID0gbGFzdFRva2VuV2l0aFNwYWNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIGZvcmNlIGJyZWFrIGluIHRoaXMgdG9rZW4gKi9cbiAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBtYXhXaWR0aCAtIGxpbmVMZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogbGluZSBub3QgbG9uZywgY29udGludWUgKi9cbiAgICAgICAgbGluZUxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRva2VuLnZhbHVlLmluZGV4T2YoXCIgXCIpICE9IC0xKSB7XG4gICAgICAgICAgbGFzdFRva2VuV2l0aFNwYWNlID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpKys7XG4gICAgICAvKiBhZHZhbmNlIHRvIG5leHQgdG9rZW4gKi9cbiAgICB9XG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICB0eXBlOiBUWVBFX05FV0xJTkVcbiAgICB9KTtcbiAgICAvKiBpbnNlcnQgZmFrZSBuZXdsaW5lIHRvIGZpeCB0aGUgbGFzdCB0ZXh0IGxpbmUgKi9cblxuICAgIC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSBmcm9tIHRleHQgdG9rZW5zIGJlZm9yZSBuZXdsaW5lcyAqL1xuXG4gICAgdmFyIGxhc3RUZXh0VG9rZW4gPSBudWxsO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRva2Vucy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfdG9rZW4yID0gdG9rZW5zW19pXTtcblxuICAgICAgc3dpdGNoIChfdG9rZW4yLnR5cGUpIHtcbiAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgbGFzdFRleHRUb2tlbiA9IF90b2tlbjI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgaWYgKGxhc3RUZXh0VG9rZW4pIHtcbiAgICAgICAgICAgIC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSAqL1xuICAgICAgICAgICAgdmFyIF9hcnIgPSBsYXN0VGV4dFRva2VuLnZhbHVlLnNwbGl0KFwiXCIpO1xuXG4gICAgICAgICAgICB3aGlsZSAoX2Fyci5sZW5ndGggJiYgX2FycltfYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgIF9hcnIucG9wKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4udmFsdWUgPSBfYXJyLmpvaW4oXCJcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGFzdFRleHRUb2tlbiA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdG9rZW5zLnBvcCgpO1xuICAgIC8qIHJlbW92ZSBmYWtlIHRva2VuICovXG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgbmV3IHRva2VucyBhbmQgaW5zZXJ0IHRoZW0gaW50byB0aGUgc3RyZWFtXG4gICAqIEBwYXJhbSB7b2JqZWN0W119IHRva2Vuc1xuICAgKiBAcGFyYW0ge2ludH0gdG9rZW5JbmRleCBUb2tlbiBiZWluZyBwcm9jZXNzZWRcbiAgICogQHBhcmFtIHtpbnR9IGJyZWFrSW5kZXggSW5kZXggd2l0aGluIGN1cnJlbnQgdG9rZW4ncyB2YWx1ZVxuICAgKiBAcGFyYW0ge2Jvb2x9IHJlbW92ZUJyZWFrQ2hhciBEbyB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgYnJlYWtpbmcgY2hhcmFjdGVyP1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfSByZW1haW5pbmcgdW5icm9rZW4gdG9rZW4gdmFsdWVcbiAgICovXG5cblxuICBmdW5jdGlvbiBicmVha0luc2lkZVRva2VuKHRva2VucywgdG9rZW5JbmRleCwgYnJlYWtJbmRleCwgcmVtb3ZlQnJlYWtDaGFyKSB7XG4gICAgdmFyIG5ld0JyZWFrVG9rZW4gPSB7XG4gICAgICB0eXBlOiBUWVBFX05FV0xJTkVcbiAgICB9O1xuICAgIHZhciBuZXdUZXh0VG9rZW4gPSB7XG4gICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICB2YWx1ZTogdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZyhicmVha0luZGV4ICsgKHJlbW92ZUJyZWFrQ2hhciA/IDEgOiAwKSlcbiAgICB9O1xuICAgIHRva2Vucy5zcGxpY2UodG9rZW5JbmRleCArIDEsIDAsIG5ld0JyZWFrVG9rZW4sIG5ld1RleHRUb2tlbik7XG4gICAgcmV0dXJuIHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoMCwgYnJlYWtJbmRleCk7XG4gIH1cblxuICB2YXIgdGV4dCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgT2JqZWN0LmZyZWV6ZSh7XG4gICAgVFlQRV9URVhUOiBUWVBFX1RFWFQsXG4gICAgVFlQRV9ORVdMSU5FOiBUWVBFX05FV0xJTkUsXG4gICAgVFlQRV9GRzogVFlQRV9GRyxcbiAgICBUWVBFX0JHOiBUWVBFX0JHLFxuICAgIG1lYXN1cmU6IG1lYXN1cmUsXG4gICAgdG9rZW5pemU6IHRva2VuaXplXG4gIH0pO1xuICAvKiogRGVmYXVsdCB3aXRoIGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuXG4gIHZhciBERUZBVUxUX1dJRFRIID0gODA7XG4gIC8qKiBEZWZhdWx0IGhlaWdodCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cblxuICB2YXIgREVGQVVMVF9IRUlHSFQgPSAyNTtcbiAgdmFyIERJUlMgPSB7XG4gICAgNDogW1swLCAtMV0sIFsxLCAwXSwgWzAsIDFdLCBbLTEsIDBdXSxcbiAgICA4OiBbWzAsIC0xXSwgWzEsIC0xXSwgWzEsIDBdLCBbMSwgMV0sIFswLCAxXSwgWy0xLCAxXSwgWy0xLCAwXSwgWy0xLCAtMV1dLFxuICAgIDY6IFtbLTEsIC0xXSwgWzEsIC0xXSwgWzIsIDBdLCBbMSwgMV0sIFstMSwgMV0sIFstMiwgMF1dXG4gIH07XG4gIHZhciBLRVlTID0ge1xuICAgIC8qKiBDYW5jZWwga2V5LiAqL1xuICAgIFZLX0NBTkNFTDogMyxcblxuICAgIC8qKiBIZWxwIGtleS4gKi9cbiAgICBWS19IRUxQOiA2LFxuXG4gICAgLyoqIEJhY2tzcGFjZSBrZXkuICovXG4gICAgVktfQkFDS19TUEFDRTogOCxcblxuICAgIC8qKiBUYWIga2V5LiAqL1xuICAgIFZLX1RBQjogOSxcblxuICAgIC8qKiA1IGtleSBvbiBOdW1wYWQgd2hlbiBOdW1Mb2NrIGlzIHVubG9ja2VkLiBPciBvbiBNYWMsIGNsZWFyIGtleSB3aGljaCBpcyBwb3NpdGlvbmVkIGF0IE51bUxvY2sga2V5LiAqL1xuICAgIFZLX0NMRUFSOiAxMixcblxuICAgIC8qKiBSZXR1cm4vZW50ZXIga2V5IG9uIHRoZSBtYWluIGtleWJvYXJkLiAqL1xuICAgIFZLX1JFVFVSTjogMTMsXG5cbiAgICAvKiogUmVzZXJ2ZWQsIGJ1dCBub3QgdXNlZC4gKi9cbiAgICBWS19FTlRFUjogMTQsXG5cbiAgICAvKiogU2hpZnQga2V5LiAqL1xuICAgIFZLX1NISUZUOiAxNixcblxuICAgIC8qKiBDb250cm9sIGtleS4gKi9cbiAgICBWS19DT05UUk9MOiAxNyxcblxuICAgIC8qKiBBbHQgKE9wdGlvbiBvbiBNYWMpIGtleS4gKi9cbiAgICBWS19BTFQ6IDE4LFxuXG4gICAgLyoqIFBhdXNlIGtleS4gKi9cbiAgICBWS19QQVVTRTogMTksXG5cbiAgICAvKiogQ2FwcyBsb2NrLiAqL1xuICAgIFZLX0NBUFNfTE9DSzogMjAsXG5cbiAgICAvKiogRXNjYXBlIGtleS4gKi9cbiAgICBWS19FU0NBUEU6IDI3LFxuXG4gICAgLyoqIFNwYWNlIGJhci4gKi9cbiAgICBWS19TUEFDRTogMzIsXG5cbiAgICAvKiogUGFnZSBVcCBrZXkuICovXG4gICAgVktfUEFHRV9VUDogMzMsXG5cbiAgICAvKiogUGFnZSBEb3duIGtleS4gKi9cbiAgICBWS19QQUdFX0RPV046IDM0LFxuXG4gICAgLyoqIEVuZCBrZXkuICovXG4gICAgVktfRU5EOiAzNSxcblxuICAgIC8qKiBIb21lIGtleS4gKi9cbiAgICBWS19IT01FOiAzNixcblxuICAgIC8qKiBMZWZ0IGFycm93LiAqL1xuICAgIFZLX0xFRlQ6IDM3LFxuXG4gICAgLyoqIFVwIGFycm93LiAqL1xuICAgIFZLX1VQOiAzOCxcblxuICAgIC8qKiBSaWdodCBhcnJvdy4gKi9cbiAgICBWS19SSUdIVDogMzksXG5cbiAgICAvKiogRG93biBhcnJvdy4gKi9cbiAgICBWS19ET1dOOiA0MCxcblxuICAgIC8qKiBQcmludCBTY3JlZW4ga2V5LiAqL1xuICAgIFZLX1BSSU5UU0NSRUVOOiA0NCxcblxuICAgIC8qKiBJbnMoZXJ0KSBrZXkuICovXG4gICAgVktfSU5TRVJUOiA0NSxcblxuICAgIC8qKiBEZWwoZXRlKSBrZXkuICovXG4gICAgVktfREVMRVRFOiA0NixcblxuICAgIC8qKiovXG4gICAgVktfMDogNDgsXG5cbiAgICAvKioqL1xuICAgIFZLXzE6IDQ5LFxuXG4gICAgLyoqKi9cbiAgICBWS18yOiA1MCxcblxuICAgIC8qKiovXG4gICAgVktfMzogNTEsXG5cbiAgICAvKioqL1xuICAgIFZLXzQ6IDUyLFxuXG4gICAgLyoqKi9cbiAgICBWS181OiA1MyxcblxuICAgIC8qKiovXG4gICAgVktfNjogNTQsXG5cbiAgICAvKioqL1xuICAgIFZLXzc6IDU1LFxuXG4gICAgLyoqKi9cbiAgICBWS184OiA1NixcblxuICAgIC8qKiovXG4gICAgVktfOTogNTcsXG5cbiAgICAvKiogQ29sb24gKDopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NPTE9OOiA1OCxcblxuICAgIC8qKiBTZW1pY29sb24gKDspIGtleS4gKi9cbiAgICBWS19TRU1JQ09MT046IDU5LFxuXG4gICAgLyoqIExlc3MtdGhhbiAoPCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfTEVTU19USEFOOiA2MCxcblxuICAgIC8qKiBFcXVhbHMgKD0pIGtleS4gKi9cbiAgICBWS19FUVVBTFM6IDYxLFxuXG4gICAgLyoqIEdyZWF0ZXItdGhhbiAoPikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfR1JFQVRFUl9USEFOOiA2MixcblxuICAgIC8qKiBRdWVzdGlvbiBtYXJrICg/KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19RVUVTVElPTl9NQVJLOiA2MyxcblxuICAgIC8qKiBBdG1hcmsgKEApIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FUOiA2NCxcblxuICAgIC8qKiovXG4gICAgVktfQTogNjUsXG5cbiAgICAvKioqL1xuICAgIFZLX0I6IDY2LFxuXG4gICAgLyoqKi9cbiAgICBWS19DOiA2NyxcblxuICAgIC8qKiovXG4gICAgVktfRDogNjgsXG5cbiAgICAvKioqL1xuICAgIFZLX0U6IDY5LFxuXG4gICAgLyoqKi9cbiAgICBWS19GOiA3MCxcblxuICAgIC8qKiovXG4gICAgVktfRzogNzEsXG5cbiAgICAvKioqL1xuICAgIFZLX0g6IDcyLFxuXG4gICAgLyoqKi9cbiAgICBWS19JOiA3MyxcblxuICAgIC8qKiovXG4gICAgVktfSjogNzQsXG5cbiAgICAvKioqL1xuICAgIFZLX0s6IDc1LFxuXG4gICAgLyoqKi9cbiAgICBWS19MOiA3NixcblxuICAgIC8qKiovXG4gICAgVktfTTogNzcsXG5cbiAgICAvKioqL1xuICAgIFZLX046IDc4LFxuXG4gICAgLyoqKi9cbiAgICBWS19POiA3OSxcblxuICAgIC8qKiovXG4gICAgVktfUDogODAsXG5cbiAgICAvKioqL1xuICAgIFZLX1E6IDgxLFxuXG4gICAgLyoqKi9cbiAgICBWS19SOiA4MixcblxuICAgIC8qKiovXG4gICAgVktfUzogODMsXG5cbiAgICAvKioqL1xuICAgIFZLX1Q6IDg0LFxuXG4gICAgLyoqKi9cbiAgICBWS19VOiA4NSxcblxuICAgIC8qKiovXG4gICAgVktfVjogODYsXG5cbiAgICAvKioqL1xuICAgIFZLX1c6IDg3LFxuXG4gICAgLyoqKi9cbiAgICBWS19YOiA4OCxcblxuICAgIC8qKiovXG4gICAgVktfWTogODksXG5cbiAgICAvKioqL1xuICAgIFZLX1o6IDkwLFxuXG4gICAgLyoqKi9cbiAgICBWS19DT05URVhUX01FTlU6IDkzLFxuXG4gICAgLyoqIDAgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDA6IDk2LFxuXG4gICAgLyoqIDEgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDE6IDk3LFxuXG4gICAgLyoqIDIgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDI6IDk4LFxuXG4gICAgLyoqIDMgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDM6IDk5LFxuXG4gICAgLyoqIDQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDQ6IDEwMCxcblxuICAgIC8qKiA1IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ1OiAxMDEsXG5cbiAgICAvKiogNiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENjogMTAyLFxuXG4gICAgLyoqIDcgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDc6IDEwMyxcblxuICAgIC8qKiA4IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ4OiAxMDQsXG5cbiAgICAvKiogOSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEOTogMTA1LFxuXG4gICAgLyoqICogb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX01VTFRJUExZOiAxMDYsXG5cbiAgICAvKiogKyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfQUREOiAxMDcsXG5cbiAgICAvKioqL1xuICAgIFZLX1NFUEFSQVRPUjogMTA4LFxuXG4gICAgLyoqIC0gb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX1NVQlRSQUNUOiAxMDksXG5cbiAgICAvKiogRGVjaW1hbCBwb2ludCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfREVDSU1BTDogMTEwLFxuXG4gICAgLyoqIC8gb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0RJVklERTogMTExLFxuXG4gICAgLyoqIEYxIGtleS4gKi9cbiAgICBWS19GMTogMTEyLFxuXG4gICAgLyoqIEYyIGtleS4gKi9cbiAgICBWS19GMjogMTEzLFxuXG4gICAgLyoqIEYzIGtleS4gKi9cbiAgICBWS19GMzogMTE0LFxuXG4gICAgLyoqIEY0IGtleS4gKi9cbiAgICBWS19GNDogMTE1LFxuXG4gICAgLyoqIEY1IGtleS4gKi9cbiAgICBWS19GNTogMTE2LFxuXG4gICAgLyoqIEY2IGtleS4gKi9cbiAgICBWS19GNjogMTE3LFxuXG4gICAgLyoqIEY3IGtleS4gKi9cbiAgICBWS19GNzogMTE4LFxuXG4gICAgLyoqIEY4IGtleS4gKi9cbiAgICBWS19GODogMTE5LFxuXG4gICAgLyoqIEY5IGtleS4gKi9cbiAgICBWS19GOTogMTIwLFxuXG4gICAgLyoqIEYxMCBrZXkuICovXG4gICAgVktfRjEwOiAxMjEsXG5cbiAgICAvKiogRjExIGtleS4gKi9cbiAgICBWS19GMTE6IDEyMixcblxuICAgIC8qKiBGMTIga2V5LiAqL1xuICAgIFZLX0YxMjogMTIzLFxuXG4gICAgLyoqIEYxMyBrZXkuICovXG4gICAgVktfRjEzOiAxMjQsXG5cbiAgICAvKiogRjE0IGtleS4gKi9cbiAgICBWS19GMTQ6IDEyNSxcblxuICAgIC8qKiBGMTUga2V5LiAqL1xuICAgIFZLX0YxNTogMTI2LFxuXG4gICAgLyoqIEYxNiBrZXkuICovXG4gICAgVktfRjE2OiAxMjcsXG5cbiAgICAvKiogRjE3IGtleS4gKi9cbiAgICBWS19GMTc6IDEyOCxcblxuICAgIC8qKiBGMTgga2V5LiAqL1xuICAgIFZLX0YxODogMTI5LFxuXG4gICAgLyoqIEYxOSBrZXkuICovXG4gICAgVktfRjE5OiAxMzAsXG5cbiAgICAvKiogRjIwIGtleS4gKi9cbiAgICBWS19GMjA6IDEzMSxcblxuICAgIC8qKiBGMjEga2V5LiAqL1xuICAgIFZLX0YyMTogMTMyLFxuXG4gICAgLyoqIEYyMiBrZXkuICovXG4gICAgVktfRjIyOiAxMzMsXG5cbiAgICAvKiogRjIzIGtleS4gKi9cbiAgICBWS19GMjM6IDEzNCxcblxuICAgIC8qKiBGMjQga2V5LiAqL1xuICAgIFZLX0YyNDogMTM1LFxuXG4gICAgLyoqIE51bSBMb2NrIGtleS4gKi9cbiAgICBWS19OVU1fTE9DSzogMTQ0LFxuXG4gICAgLyoqIFNjcm9sbCBMb2NrIGtleS4gKi9cbiAgICBWS19TQ1JPTExfTE9DSzogMTQ1LFxuXG4gICAgLyoqIENpcmN1bWZsZXggKF4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NJUkNVTUZMRVg6IDE2MCxcblxuICAgIC8qKiBFeGNsYW1hdGlvbiAoISkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRVhDTEFNQVRJT046IDE2MSxcblxuICAgIC8qKiBEb3VibGUgcXVvdGUgKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRE9VQkxFX1FVT1RFOiAxNjIsXG5cbiAgICAvKiogSGFzaCAoIykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfSEFTSDogMTYzLFxuXG4gICAgLyoqIERvbGxhciBzaWduICgkKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19ET0xMQVI6IDE2NCxcblxuICAgIC8qKiBQZXJjZW50ICglKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QRVJDRU5UOiAxNjUsXG5cbiAgICAvKiogQW1wZXJzYW5kICgmKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BTVBFUlNBTkQ6IDE2NixcblxuICAgIC8qKiBVbmRlcnNjb3JlIChfKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19VTkRFUlNDT1JFOiAxNjcsXG5cbiAgICAvKiogT3BlbiBwYXJlbnRoZXNpcyAoKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9QQVJFTjogMTY4LFxuXG4gICAgLyoqIENsb3NlIHBhcmVudGhlc2lzICgpKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DTE9TRV9QQVJFTjogMTY5LFxuXG4gICAgLyogQXN0ZXJpc2sgKCopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FTVEVSSVNLOiAxNzAsXG5cbiAgICAvKiogUGx1cyAoKykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUExVUzogMTcxLFxuXG4gICAgLyoqIFBpcGUgKHwpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BJUEU6IDE3MixcblxuICAgIC8qKiBIeXBoZW4tVVMvZG9jcy9NaW51cyAoLSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfSFlQSEVOX01JTlVTOiAxNzMsXG5cbiAgICAvKiogT3BlbiBjdXJseSBicmFja2V0ICh7KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19PUEVOX0NVUkxZX0JSQUNLRVQ6IDE3NCxcblxuICAgIC8qKiBDbG9zZSBjdXJseSBicmFja2V0ICh9KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DTE9TRV9DVVJMWV9CUkFDS0VUOiAxNzUsXG5cbiAgICAvKiogVGlsZGUgKH4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1RJTERFOiAxNzYsXG5cbiAgICAvKiogQ29tbWEgKCwpIGtleS4gKi9cbiAgICBWS19DT01NQTogMTg4LFxuXG4gICAgLyoqIFBlcmlvZCAoLikga2V5LiAqL1xuICAgIFZLX1BFUklPRDogMTkwLFxuXG4gICAgLyoqIFNsYXNoICgvKSBrZXkuICovXG4gICAgVktfU0xBU0g6IDE5MSxcblxuICAgIC8qKiBCYWNrIHRpY2sgKGApIGtleS4gKi9cbiAgICBWS19CQUNLX1FVT1RFOiAxOTIsXG5cbiAgICAvKiogT3BlbiBzcXVhcmUgYnJhY2tldCAoWykga2V5LiAqL1xuICAgIFZLX09QRU5fQlJBQ0tFVDogMjE5LFxuXG4gICAgLyoqIEJhY2sgc2xhc2ggKFxcKSBrZXkuICovXG4gICAgVktfQkFDS19TTEFTSDogMjIwLFxuXG4gICAgLyoqIENsb3NlIHNxdWFyZSBicmFja2V0IChdKSBrZXkuICovXG4gICAgVktfQ0xPU0VfQlJBQ0tFVDogMjIxLFxuXG4gICAgLyoqIFF1b3RlICgnJycpIGtleS4gKi9cbiAgICBWS19RVU9URTogMjIyLFxuXG4gICAgLyoqIE1ldGEga2V5IG9uIExpbnV4LCBDb21tYW5kIGtleSBvbiBNYWMuICovXG4gICAgVktfTUVUQTogMjI0LFxuXG4gICAgLyoqIEFsdEdyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FMVEdSOiAyMjUsXG5cbiAgICAvKiogV2luZG93cyBsb2dvIGtleSBvbiBXaW5kb3dzLiBPciBTdXBlciBvciBIeXBlciBrZXkgb24gTGludXguIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19XSU46IDkxLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkE6IDIxLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0hBTkdVTDogMjEsXG5cbiAgICAvKiog6Iux5pWwIGtleSBvbiBKYXBhbmVzZSBNYWMga2V5Ym9hcmQuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19FSVNVOiAyMixcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19KVU5KQTogMjMsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRklOQUw6IDI0LFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0hBTkpBOiAyNSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19LQU5KSTogMjUsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQ09OVkVSVDogMjgsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfTk9OQ09OVkVSVDogMjksXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQUNDRVBUOiAzMCxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19NT0RFQ0hBTkdFOiAzMSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19TRUxFQ1Q6IDQxLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1BSSU5UOiA0MixcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19FWEVDVVRFOiA0MyxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC5cdCAqL1xuICAgIFZLX1NMRUVQOiA5NVxuICB9O1xuICB2YXIgQkFDS0VORFMgPSB7XG4gICAgXCJoZXhcIjogSGV4LFxuICAgIFwicmVjdFwiOiBSZWN0LFxuICAgIFwidGlsZVwiOiBUaWxlLFxuICAgIFwidGlsZS1nbFwiOiBUaWxlR0wsXG4gICAgXCJ0ZXJtXCI6IFRlcm1cbiAgfTtcbiAgdmFyIERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB3aWR0aDogREVGQVVMVF9XSURUSCxcbiAgICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICAgIHRyYW5zcG9zZTogZmFsc2UsXG4gICAgbGF5b3V0OiBcInJlY3RcIixcbiAgICBmb250U2l6ZTogMTUsXG4gICAgc3BhY2luZzogMSxcbiAgICBib3JkZXI6IDAsXG4gICAgZm9yY2VTcXVhcmVSYXRpbzogZmFsc2UsXG4gICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcbiAgICBmb250U3R5bGU6IFwiXCIsXG4gICAgZmc6IFwiI2NjY1wiLFxuICAgIGJnOiBcIiMwMDBcIixcbiAgICB0aWxlV2lkdGg6IDMyLFxuICAgIHRpbGVIZWlnaHQ6IDMyLFxuICAgIHRpbGVNYXA6IHt9LFxuICAgIHRpbGVTZXQ6IG51bGwsXG4gICAgdGlsZUNvbG9yaXplOiBmYWxzZVxuICB9O1xuICAvKipcbiAgICogQGNsYXNzIFZpc3VhbCBtYXAgZGlzcGxheVxuICAgKi9cblxuICB2YXIgRGlzcGxheSA9XG4gIC8qKiBAY2xhc3MgKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIHZhciBEaXNwbGF5ID1cbiAgICAvKiNfX1BVUkVfXyovXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gRGlzcGxheShvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7IC8vIGZhbHNlID0gbm90aGluZywgdHJ1ZSA9IGFsbCwgb2JqZWN0ID0gZGlydHkgY2VsbHNcblxuICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuREVCVUcgPSB0aGlzLkRFQlVHLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3RpY2sgPSB0aGlzLl90aWNrLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogRGVidWcgaGVscGVyLCBpZGVhbCBhcyBhIG1hcCBnZW5lcmF0b3IgY2FsbGJhY2suIEFsd2F5cyBib3VuZCB0byB0aGlzLlxuICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgKiBAcGFyYW0ge2ludH0gd2hhdFxuICAgICAgICovXG5cblxuICAgICAgdmFyIF9wcm90bzkgPSBEaXNwbGF5LnByb3RvdHlwZTtcblxuICAgICAgX3Byb3RvOS5ERUJVRyA9IGZ1bmN0aW9uIERFQlVHKHgsIHksIHdoYXQpIHtcbiAgICAgICAgdmFyIGNvbG9ycyA9IFt0aGlzLl9vcHRpb25zLmJnLCB0aGlzLl9vcHRpb25zLmZnXTtcbiAgICAgICAgdGhpcy5kcmF3KHgsIHksIG51bGwsIG51bGwsIGNvbG9yc1t3aGF0ICUgY29sb3JzLmxlbmd0aF0pO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ2xlYXIgdGhlIHdob2xlIGRpc3BsYXkgKGNvdmVyIGl0IHdpdGggYmFja2dyb3VuZCBjb2xvcilcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBAc2VlIFJPVC5EaXNwbGF5XG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgICBpZiAob3B0aW9ucy53aWR0aCB8fCBvcHRpb25zLmhlaWdodCB8fCBvcHRpb25zLmZvbnRTaXplIHx8IG9wdGlvbnMuZm9udEZhbWlseSB8fCBvcHRpb25zLnNwYWNpbmcgfHwgb3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICAgIHZhciBjdG9yID0gQkFDS0VORFNbb3B0aW9ucy5sYXlvdXRdO1xuICAgICAgICAgICAgdGhpcy5fYmFja2VuZCA9IG5ldyBjdG9yKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fYmFja2VuZC5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuXG4gICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIGN1cnJlbnRseSBzZXQgb3B0aW9uc1xuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSBET00gbm9kZSBvZiB0aGlzIGRpc3BsYXlcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5nZXRDb250YWluZXIoKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENvbXB1dGUgdGhlIG1heGltdW0gd2lkdGgvaGVpZ2h0IHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXG4gICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XG4gICAgICAgKiBAcmV0dXJucyB7aW50WzJdfSBjZWxsV2lkdGgsY2VsbEhlaWdodFxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENvbXB1dGUgdGhlIG1heGltdW0gZm9udCBzaXplIHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXG4gICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XG4gICAgICAgKiBAcmV0dXJucyB7aW50fSBmb250U2l6ZVxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzkuY29tcHV0ZVRpbGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVRpbGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENvbnZlcnQgYSBET00gZXZlbnQgKG1vdXNlIG9yIHRvdWNoKSB0byBtYXAgY29vcmRpbmF0ZXMuIFVzZXMgZmlyc3QgdG91Y2ggZm9yIG11bHRpLXRvdWNoLlxuICAgICAgICogQHBhcmFtIHtFdmVudH0gZSBldmVudFxuICAgICAgICogQHJldHVybnMge2ludFsyXX0gLTEgZm9yIHZhbHVlcyBvdXRzaWRlIG9mIHRoZSBjYW52YXNcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gZXZlbnRUb1Bvc2l0aW9uKGUpIHtcbiAgICAgICAgdmFyIHgsIHk7XG5cbiAgICAgICAgaWYgKFwidG91Y2hlc1wiIGluIGUpIHtcbiAgICAgICAgICB4ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgeSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHggPSBlLmNsaWVudFg7XG4gICAgICAgICAgeSA9IGUuY2xpZW50WTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICogQHBhcmFtIHtzdHJpbmcgfHwgc3RyaW5nW119IGNoIE9uZSBvciBtb3JlIGNoYXJzICh3aWxsIGJlIG92ZXJsYXBwaW5nIHRoZW1zZWx2ZXMpXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZnXSBmb3JlZ3JvdW5kIGNvbG9yXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JnXSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmRyYXcgPSBmdW5jdGlvbiBkcmF3KHgsIHksIGNoLCBmZywgYmcpIHtcbiAgICAgICAgaWYgKCFmZykge1xuICAgICAgICAgIGZnID0gdGhpcy5fb3B0aW9ucy5mZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYmcpIHtcbiAgICAgICAgICBiZyA9IHRoaXMuX29wdGlvbnMuYmc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5ID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgdGhpcy5fZGF0YVtrZXldID0gW3gsIHksIGNoLCBmZywgYmddO1xuXG4gICAgICAgIGlmICh0aGlzLl9kaXJ0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSAvLyB3aWxsIGFscmVhZHkgcmVkcmF3IGV2ZXJ5dGhpbmcgXG5cblxuICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgdGhpcy5fZGlydHkgPSB7fTtcbiAgICAgICAgfSAvLyBmaXJzdCFcblxuXG4gICAgICAgIHRoaXMuX2RpcnR5W2tleV0gPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogRHJhd3MgYSB0ZXh0IGF0IGdpdmVuIHBvc2l0aW9uLiBPcHRpb25hbGx5IHdyYXBzIGF0IGEgbWF4aW11bSBsZW5ndGguIEN1cnJlbnRseSBkb2VzIG5vdCB3b3JrIHdpdGggaGV4IGxheW91dC5cbiAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgTWF5IGNvbnRhaW4gY29sb3IvYmFja2dyb3VuZCBmb3JtYXQgc3BlY2lmaWVycywgJWN7bmFtZX0vJWJ7bmFtZX0sIGJvdGggb3B0aW9uYWwuICVje30vJWJ7fSByZXNldHMgdG8gZGVmYXVsdC5cbiAgICAgICAqIEBwYXJhbSB7aW50fSBbbWF4V2lkdGhdIHdyYXAgYXQgd2hhdCB3aWR0aD9cbiAgICAgICAqIEByZXR1cm5zIHtpbnR9IGxpbmVzIGRyYXduXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmRyYXdUZXh0ID0gZnVuY3Rpb24gZHJhd1RleHQoeCwgeSwgdGV4dCwgbWF4V2lkdGgpIHtcbiAgICAgICAgdmFyIGZnID0gbnVsbDtcbiAgICAgICAgdmFyIGJnID0gbnVsbDtcbiAgICAgICAgdmFyIGN4ID0geDtcbiAgICAgICAgdmFyIGN5ID0geTtcbiAgICAgICAgdmFyIGxpbmVzID0gMTtcblxuICAgICAgICBpZiAoIW1heFdpZHRoKSB7XG4gICAgICAgICAgbWF4V2lkdGggPSB0aGlzLl9vcHRpb25zLndpZHRoIC0geDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZSh0ZXh0LCBtYXhXaWR0aCk7XG5cbiAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBpbnRlcnByZXQgdG9rZW5pemVkIG9wY29kZSBzdHJlYW1cbiAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcblxuICAgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgICAgIHZhciBpc1NwYWNlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICBpc1ByZXZTcGFjZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaXNGdWxsV2lkdGggPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIGlzUHJldkZ1bGxXaWR0aCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW4udmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2MgPSB0b2tlbi52YWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgIHZhciBjID0gdG9rZW4udmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubGF5b3V0ID09PSBcInRlcm1cIikge1xuICAgICAgICAgICAgICAgICAgdmFyIGNjaCA9IGNjID4+IDg7XG4gICAgICAgICAgICAgICAgICB2YXIgaXNDSksgPSBjY2ggPT09IDB4MTEgfHwgY2NoID49IDB4MmUgJiYgY2NoIDw9IDB4OWYgfHwgY2NoID49IDB4YWMgJiYgY2NoIDw9IDB4ZDcgfHwgY2MgPj0gMHhBOTYwICYmIGNjIDw9IDB4QTk3RjtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzQ0pLKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCArIDAsIGN5LCBjLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAxLCBjeSwgXCJcXHRcIiwgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgY3ggKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAvLyBBc3NpZ24gdG8gYHRydWVgIHdoZW4gdGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoLlxuXG5cbiAgICAgICAgICAgICAgICBpc0Z1bGxXaWR0aCA9IGNjID4gMHhmZjAwICYmIGNjIDwgMHhmZjYxIHx8IGNjID4gMHhmZmRjICYmIGNjIDwgMHhmZmU4IHx8IGNjID4gMHhmZmVlOyAvLyBDdXJyZW50IGNoYXIgaXMgc3BhY2UsIHdoYXRldmVyIGZ1bGwtd2lkdGggb3IgaGFsZi13aWR0aCBib3RoIGFyZSBPSy5cblxuICAgICAgICAgICAgICAgIGlzU3BhY2UgPSBjLmNoYXJDb2RlQXQoMCkgPT0gMHgyMCB8fCBjLmNoYXJDb2RlQXQoMCkgPT0gMHgzMDAwOyAvLyBUaGUgcHJldmlvdXMgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgY2hhciBpcyBuZXRoZXIgaGFsZi13aWR0aCBub3IgYSBzcGFjZS5cblxuICAgICAgICAgICAgICAgIGlmIChpc1ByZXZGdWxsV2lkdGggJiYgIWlzRnVsbFdpZHRoICYmICFpc1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICBjeCsrO1xuICAgICAgICAgICAgICAgIH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgIC8vIHRoZSBwcmV2aW91cyBjaGFyIGlzIG5vdCBhIHNwYWNlLlxuXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNGdWxsV2lkdGggJiYgIWlzUHJldlNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICBjeCsrO1xuICAgICAgICAgICAgICAgIH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXG5cblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCsrLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICBpc1ByZXZTcGFjZSA9IGlzU3BhY2U7XG4gICAgICAgICAgICAgICAgaXNQcmV2RnVsbFdpZHRoID0gaXNGdWxsV2lkdGg7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBUWVBFX0ZHOlxuICAgICAgICAgICAgICBmZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRZUEVfQkc6XG4gICAgICAgICAgICAgIGJnID0gdG9rZW4udmFsdWUgfHwgbnVsbDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICBjeCA9IHg7XG4gICAgICAgICAgICAgIGN5Kys7XG4gICAgICAgICAgICAgIGxpbmVzKys7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaW5lcztcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFRpbWVyIHRpY2s6IHVwZGF0ZSBkaXJ0eSBwYXJ0c1xuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5fdGljayA9IGZ1bmN0aW9uIF90aWNrKCkge1xuICAgICAgICB0aGlzLl9iYWNrZW5kLnNjaGVkdWxlKHRoaXMuX3RpY2spO1xuXG4gICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBkcmF3IGFsbFxuICAgICAgICAgIHRoaXMuX2JhY2tlbmQuY2xlYXIoKTtcblxuICAgICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXcoaWQsIGZhbHNlKTtcbiAgICAgICAgICB9IC8vIHJlZHJhdyBjYWNoZWQgZGF0YSBcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRyYXcgb25seSBkaXJ0eSBcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXcoa2V5LCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBXaGF0IHRvIGRyYXdcbiAgICAgICAqIEBwYXJhbSB7Ym9vbH0gY2xlYXJCZWZvcmUgSXMgaXQgbmVjZXNzYXJ5IHRvIGNsZWFuIGJlZm9yZT9cbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuX2RyYXcgPSBmdW5jdGlvbiBfZHJhdyhrZXksIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuXG4gICAgICAgIGlmIChkYXRhWzRdICE9IHRoaXMuX29wdGlvbnMuYmcpIHtcbiAgICAgICAgICBjbGVhckJlZm9yZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9iYWNrZW5kLmRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIERpc3BsYXk7XG4gICAgfSgpO1xuXG4gICAgRGlzcGxheS5SZWN0ID0gUmVjdDtcbiAgICBEaXNwbGF5LkhleCA9IEhleDtcbiAgICBEaXNwbGF5LlRpbGUgPSBUaWxlO1xuICAgIERpc3BsYXkuVGlsZUdMID0gVGlsZUdMO1xuICAgIERpc3BsYXkuVGVybSA9IFRlcm07XG4gICAgcmV0dXJuIERpc3BsYXk7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyAoTWFya292IHByb2Nlc3MpLWJhc2VkIHN0cmluZyBnZW5lcmF0b3IuXG4gICAqIENvcGllZCBmcm9tIGEgPGEgaHJlZj1cImh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPU5hbWVzX2Zyb21fYV9oaWdoX29yZGVyX01hcmtvdl9Qcm9jZXNzX2FuZF9hX3NpbXBsaWZpZWRfS2F0el9iYWNrLW9mZl9zY2hlbWVcIj5Sb2d1ZUJhc2luIGFydGljbGU8L2E+LlxuICAgKiBPZmZlcnMgY29uZmlndXJhYmxlIG9yZGVyIGFuZCBwcmlvci5cbiAgICovXG5cblxuICB2YXIgU3RyaW5nR2VuZXJhdG9yID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RyaW5nR2VuZXJhdG9yKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgIHdvcmRzOiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDMsXG4gICAgICAgIHByaW9yOiAwLjAwMVxuICAgICAgfTtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9ib3VuZGFyeSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG4gICAgICB0aGlzLl9zdWZmaXggPSB0aGlzLl9ib3VuZGFyeTtcbiAgICAgIHRoaXMuX3ByZWZpeCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMub3JkZXI7IGkrKykge1xuICAgICAgICB0aGlzLl9wcmVmaXgucHVzaCh0aGlzLl9ib3VuZGFyeSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgICB0aGlzLl9wcmlvclZhbHVlc1t0aGlzLl9ib3VuZGFyeV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxlYXJuaW5nIGRhdGFcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzEwID0gU3RyaW5nR2VuZXJhdG9yLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzEwLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICB0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gR2VuZXJhdGVkIHN0cmluZ1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5nZW5lcmF0ZSA9IGZ1bmN0aW9uIGdlbmVyYXRlKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IFt0aGlzLl9zYW1wbGUodGhpcy5fcHJlZml4KV07XG5cbiAgICAgIHdoaWxlIChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdICE9IHRoaXMuX2JvdW5kYXJ5KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX3NhbXBsZShyZXN1bHQpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2pvaW4ocmVzdWx0LnNsaWNlKDAsIC0xKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPYnNlcnZlIChsZWFybikgYSBzdHJpbmcgZnJvbSBhIHRyYWluaW5nIHNldFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5vYnNlcnZlID0gZnVuY3Rpb24gb2JzZXJ2ZShzdHJpbmcpIHtcbiAgICAgIHZhciB0b2tlbnMgPSB0aGlzLl9zcGxpdChzdHJpbmcpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLl9wcmlvclZhbHVlc1t0b2tlbnNbaV1dID0gdGhpcy5fb3B0aW9ucy5wcmlvcjtcbiAgICAgIH1cblxuICAgICAgdG9rZW5zID0gdGhpcy5fcHJlZml4LmNvbmNhdCh0b2tlbnMpLmNvbmNhdCh0aGlzLl9zdWZmaXgpO1xuICAgICAgLyogYWRkIGJvdW5kYXJ5IHN5bWJvbHMgKi9cblxuICAgICAgZm9yICh2YXIgX2kyID0gdGhpcy5fb3B0aW9ucy5vcmRlcjsgX2kyIDwgdG9rZW5zLmxlbmd0aDsgX2kyKyspIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0b2tlbnMuc2xpY2UoX2kyIC0gdGhpcy5fb3B0aW9ucy5vcmRlciwgX2kyKTtcbiAgICAgICAgdmFyIGV2ZW50ID0gdG9rZW5zW19pMl07XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb250ZXh0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIHN1YmNvbnRleHQgPSBjb250ZXh0LnNsaWNlKGopO1xuXG4gICAgICAgICAgdGhpcy5fb2JzZXJ2ZUV2ZW50KHN1YmNvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8xMC5nZXRTdGF0cyA9IGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICB2YXIgcHJpb3JDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX3ByaW9yVmFsdWVzKS5sZW5ndGg7XG4gICAgICBwcmlvckNvdW50LS07IC8vIGJvdW5kYXJ5XG5cbiAgICAgIHBhcnRzLnB1c2goXCJkaXN0aW5jdCBzYW1wbGVzOiBcIiArIHByaW9yQ291bnQpO1xuICAgICAgdmFyIGRhdGFDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEpLmxlbmd0aDtcbiAgICAgIHZhciBldmVudENvdW50ID0gMDtcblxuICAgICAgZm9yICh2YXIgcCBpbiB0aGlzLl9kYXRhKSB7XG4gICAgICAgIGV2ZW50Q291bnQgKz0gT2JqZWN0LmtleXModGhpcy5fZGF0YVtwXSkubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwYXJ0cy5wdXNoKFwiZGljdGlvbmFyeSBzaXplIChjb250ZXh0cyk6IFwiICsgZGF0YUNvdW50KTtcbiAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGV2ZW50cyk6IFwiICsgZXZlbnRDb3VudCk7XG4gICAgICByZXR1cm4gcGFydHMuam9pbihcIiwgXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5fc3BsaXQgPSBmdW5jdGlvbiBfc3BsaXQoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnNwbGl0KHRoaXMuX29wdGlvbnMud29yZHMgPyAvXFxzKy8gOiBcIlwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuX2pvaW4gPSBmdW5jdGlvbiBfam9pbihhcnIpIHtcbiAgICAgIHJldHVybiBhcnIuam9pbih0aGlzLl9vcHRpb25zLndvcmRzID8gXCIgXCIgOiBcIlwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuX29ic2VydmVFdmVudCA9IGZ1bmN0aW9uIF9vYnNlcnZlRXZlbnQoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgIHZhciBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuXG4gICAgICBpZiAoIShrZXkgaW4gdGhpcy5fZGF0YSkpIHtcbiAgICAgICAgdGhpcy5fZGF0YVtrZXldID0ge307XG4gICAgICB9XG5cbiAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuXG4gICAgICBpZiAoIShldmVudCBpbiBkYXRhKSkge1xuICAgICAgICBkYXRhW2V2ZW50XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGRhdGFbZXZlbnRdKys7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLl9zYW1wbGUgPSBmdW5jdGlvbiBfc2FtcGxlKGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzLl9iYWNrb2ZmKGNvbnRleHQpO1xuXG4gICAgICB2YXIga2V5ID0gdGhpcy5fam9pbihjb250ZXh0KTtcblxuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICB2YXIgYXZhaWxhYmxlID0ge307XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnByaW9yKSB7XG4gICAgICAgIGZvciAodmFyIGV2ZW50IGluIHRoaXMuX3ByaW9yVmFsdWVzKSB7XG4gICAgICAgICAgYXZhaWxhYmxlW2V2ZW50XSA9IHRoaXMuX3ByaW9yVmFsdWVzW2V2ZW50XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIF9ldmVudCBpbiBkYXRhKSB7XG4gICAgICAgICAgYXZhaWxhYmxlW19ldmVudF0gKz0gZGF0YVtfZXZlbnRdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdmFpbGFibGUgPSBkYXRhO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUk5HJDEuZ2V0V2VpZ2h0ZWRWYWx1ZShhdmFpbGFibGUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLl9iYWNrb2ZmID0gZnVuY3Rpb24gX2JhY2tvZmYoY29udGV4dCkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5zbGljZSgtdGhpcy5fb3B0aW9ucy5vcmRlcik7XG4gICAgICB9IGVsc2UgaWYgKGNvbnRleHQubGVuZ3RoIDwgdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICBjb250ZXh0ID0gdGhpcy5fcHJlZml4LnNsaWNlKDAsIHRoaXMuX29wdGlvbnMub3JkZXIgLSBjb250ZXh0Lmxlbmd0aCkuY29uY2F0KGNvbnRleHQpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoISh0aGlzLl9qb2luKGNvbnRleHQpIGluIHRoaXMuX2RhdGEpICYmIGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5zbGljZSgxKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfTtcblxuICAgIHJldHVybiBTdHJpbmdHZW5lcmF0b3I7XG4gIH0oKTtcblxuICB2YXIgTWluSGVhcCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1pbkhlYXAoKSB7XG4gICAgICB0aGlzLmhlYXAgPSBbXTtcbiAgICAgIHRoaXMudGltZXN0YW1wID0gMDtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMTEgPSBNaW5IZWFwLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzExLmxlc3NUaGFuID0gZnVuY3Rpb24gbGVzc1RoYW4oYSwgYikge1xuICAgICAgcmV0dXJuIGEua2V5ID09IGIua2V5ID8gYS50aW1lc3RhbXAgPCBiLnRpbWVzdGFtcCA6IGEua2V5IDwgYi5rZXk7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQodikge1xuICAgICAgdGhpcy5oZWFwID0gdGhpcy5oZWFwLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIga2V5ID0gX3JlZi5rZXksXG4gICAgICAgICAgICB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICAgICAgICB0aW1lc3RhbXAgPSBfcmVmLnRpbWVzdGFtcDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrZXk6IGtleSArIHYsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEubGVuID0gZnVuY3Rpb24gbGVuKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGVhcC5sZW5ndGg7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgIHRoaXMudGltZXN0YW1wICs9IDE7XG4gICAgICB2YXIgbG9jID0gdGhpcy5sZW4oKTtcbiAgICAgIHRoaXMuaGVhcC5wdXNoKHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wLFxuICAgICAgICBrZXk6IGtleVxuICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZVVwKGxvYyk7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnBvcCA9IGZ1bmN0aW9uIHBvcCgpIHtcbiAgICAgIGlmICh0aGlzLmxlbigpID09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZWxlbWVudCB0byBwb3BcIik7XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3AgPSB0aGlzLmhlYXBbMF07XG5cbiAgICAgIGlmICh0aGlzLmxlbigpID4gMSkge1xuICAgICAgICB0aGlzLmhlYXBbMF0gPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRG93bigwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvcDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEuZmluZCA9IGZ1bmN0aW9uIGZpbmQodikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbigpOyBpKyspIHtcbiAgICAgICAgaWYgKHYgPT0gdGhpcy5oZWFwW2ldLnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKHYpIHtcbiAgICAgIHZhciBpbmRleCA9IG51bGw7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgIGlmICh2ID09IHRoaXMuaGVhcFtpXS52YWx1ZSkge1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgICB0aGlzLmhlYXBbaW5kZXhdID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICAgIHRoaXMudXBkYXRlRG93bihpbmRleCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEucGFyZW50Tm9kZSA9IGZ1bmN0aW9uIHBhcmVudE5vZGUoeCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHggLSAxKSAvIDIpO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5sZWZ0Q2hpbGROb2RlID0gZnVuY3Rpb24gbGVmdENoaWxkTm9kZSh4KSB7XG4gICAgICByZXR1cm4gMiAqIHggKyAxO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5yaWdodENoaWxkTm9kZSA9IGZ1bmN0aW9uIHJpZ2h0Q2hpbGROb2RlKHgpIHtcbiAgICAgIHJldHVybiAyICogeCArIDI7XG4gICAgfTtcblxuICAgIF9wcm90bzExLmV4aXN0Tm9kZSA9IGZ1bmN0aW9uIGV4aXN0Tm9kZSh4KSB7XG4gICAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5zd2FwID0gZnVuY3Rpb24gc3dhcCh4LCB5KSB7XG4gICAgICB2YXIgdCA9IHRoaXMuaGVhcFt4XTtcbiAgICAgIHRoaXMuaGVhcFt4XSA9IHRoaXMuaGVhcFt5XTtcbiAgICAgIHRoaXMuaGVhcFt5XSA9IHQ7XG4gICAgfTtcblxuICAgIF9wcm90bzExLm1pbk5vZGUgPSBmdW5jdGlvbiBtaW5Ob2RlKG51bWJlcnMpIHtcbiAgICAgIHZhciB2YWxpZG51bWJlcnMgPSBudW1iZXJzLmZpbHRlcih0aGlzLmV4aXN0Tm9kZS5iaW5kKHRoaXMpKTtcbiAgICAgIHZhciBtaW5pbWFsID0gdmFsaWRudW1iZXJzWzBdO1xuXG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB2YWxpZG51bWJlcnMsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaTMgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgaWYgKF9pMyA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcltfaTMrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2kzID0gX2l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYyID0gX2kzLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGkgPSBfcmVmMjtcblxuICAgICAgICBpZiAodGhpcy5sZXNzVGhhbih0aGlzLmhlYXBbaV0sIHRoaXMuaGVhcFttaW5pbWFsXSkpIHtcbiAgICAgICAgICBtaW5pbWFsID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWluaW1hbDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEudXBkYXRlVXAgPSBmdW5jdGlvbiB1cGRhdGVVcCh4KSB7XG4gICAgICBpZiAoeCA9PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSh4KTtcblxuICAgICAgaWYgKHRoaXMuZXhpc3ROb2RlKHBhcmVudCkgJiYgdGhpcy5sZXNzVGhhbih0aGlzLmhlYXBbeF0sIHRoaXMuaGVhcFtwYXJlbnRdKSkge1xuICAgICAgICB0aGlzLnN3YXAoeCwgcGFyZW50KTtcbiAgICAgICAgdGhpcy51cGRhdGVVcChwYXJlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8xMS51cGRhdGVEb3duID0gZnVuY3Rpb24gdXBkYXRlRG93bih4KSB7XG4gICAgICB2YXIgbGVmdENoaWxkID0gdGhpcy5sZWZ0Q2hpbGROb2RlKHgpO1xuICAgICAgdmFyIHJpZ2h0Q2hpbGQgPSB0aGlzLnJpZ2h0Q2hpbGROb2RlKHgpO1xuXG4gICAgICBpZiAoIXRoaXMuZXhpc3ROb2RlKGxlZnRDaGlsZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbSA9IHRoaXMubWluTm9kZShbeCwgbGVmdENoaWxkLCByaWdodENoaWxkXSk7XG5cbiAgICAgIGlmIChtICE9IHgpIHtcbiAgICAgICAgdGhpcy5zd2FwKHgsIG0pO1xuICAgICAgICB0aGlzLnVwZGF0ZURvd24obSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzExLmRlYnVnUHJpbnQgPSBmdW5jdGlvbiBkZWJ1Z1ByaW50KCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5oZWFwKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1pbkhlYXA7XG4gIH0oKTtcblxuICB2YXIgRXZlbnRRdWV1ZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBHZW5lcmljIGV2ZW50IHF1ZXVlOiBzdG9yZXMgZXZlbnRzIGFuZCByZXRyaWV2ZXMgdGhlbSBiYXNlZCBvbiB0aGVpciB0aW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRRdWV1ZSgpIHtcbiAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn0gRWxhcHNlZCB0aW1lXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8xMiA9IEV2ZW50UXVldWUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTIuZ2V0VGltZSA9IGZ1bmN0aW9uIGdldFRpbWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBzY2hlZHVsZWQgZXZlbnRzXG4gICAgICovXG5cblxuICAgIF9wcm90bzEyLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLl9ldmVudHMgPSBuZXcgTWluSGVhcCgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTIuYWRkID0gZnVuY3Rpb24gYWRkKGV2ZW50LCB0aW1lKSB7XG4gICAgICB0aGlzLl9ldmVudHMucHVzaChldmVudCwgdGltZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMb2NhdGVzIHRoZSBuZWFyZXN0IGV2ZW50LCBhZHZhbmNlcyB0aW1lIGlmIG5lY2Vzc2FyeS4gUmV0dXJucyB0aGF0IGV2ZW50IGFuZCByZW1vdmVzIGl0IGZyb20gdGhlIHF1ZXVlLlxuICAgICAqIEByZXR1cm5zIHs/IHx8IG51bGx9IFRoZSBldmVudCBwcmV2aW91c2x5IGFkZGVkIGJ5IGFkZEV2ZW50LCBudWxsIGlmIG5vIGV2ZW50IGF2YWlsYWJsZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMi5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cy5sZW4oKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIF90aGlzJF9ldmVudHMkcG9wID0gdGhpcy5fZXZlbnRzLnBvcCgpLFxuICAgICAgICAgIHRpbWUgPSBfdGhpcyRfZXZlbnRzJHBvcC5rZXksXG4gICAgICAgICAgZXZlbnQgPSBfdGhpcyRfZXZlbnRzJHBvcC52YWx1ZTtcblxuICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgIC8qIGFkdmFuY2UgKi9cbiAgICAgICAgdGhpcy5fdGltZSArPSB0aW1lO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cy5zaGlmdCgtdGltZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGV2ZW50XG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTIuZ2V0RXZlbnRUaW1lID0gZnVuY3Rpb24gZ2V0RXZlbnRUaW1lKGV2ZW50KSB7XG4gICAgICB2YXIgciA9IHRoaXMuX2V2ZW50cy5maW5kKGV2ZW50KTtcblxuICAgICAgaWYgKHIpIHtcbiAgICAgICAgdmFyIGtleSA9IHIua2V5O1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGV2ZW50IGZyb20gdGhlIHF1ZXVlXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzP1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMi5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoZXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudHMucmVtb3ZlKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50UXVldWU7XG4gIH0oKTtcblxuICB2YXIgU2NoZWR1bGVyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFic3RyYWN0IHNjaGVkdWxlclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlcigpIHtcbiAgICAgIHRoaXMuX3F1ZXVlID0gbmV3IEV2ZW50UXVldWUoKTtcbiAgICAgIHRoaXMuX3JlcGVhdCA9IFtdO1xuICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULkV2ZW50UXVldWUjZ2V0VGltZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMTMgPSBTY2hlZHVsZXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTMuZ2V0VGltZSA9IGZ1bmN0aW9uIGdldFRpbWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcXVldWUuZ2V0VGltZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTMuYWRkID0gZnVuY3Rpb24gYWRkKGl0ZW0sIHJlcGVhdCkge1xuICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICB0aGlzLl9yZXBlYXQucHVzaChpdGVtKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgdGhlIGdpdmVuIGl0ZW0gaXMgc2NoZWR1bGVkIGZvclxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTMuZ2V0VGltZU9mID0gZnVuY3Rpb24gZ2V0VGltZU9mKGl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXRFdmVudFRpbWUoaXRlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgaXRlbXNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTMuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuX3F1ZXVlLmNsZWFyKCk7XG5cbiAgICAgIHRoaXMuX3JlcGVhdCA9IFtdO1xuICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIHByZXZpb3VzbHkgYWRkZWQgaXRlbVxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzZnVsP1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMy5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX3F1ZXVlLnJlbW92ZShpdGVtKTtcblxuICAgICAgdmFyIGluZGV4ID0gdGhpcy5fcmVwZWF0LmluZGV4T2YoaXRlbSk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICB0aGlzLl9yZXBlYXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgPT0gaXRlbSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlIG5leHQgaXRlbVxuICAgICAqIEByZXR1cm5zIHs/fVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMy5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSB0aGlzLl9xdWV1ZS5nZXQoKTtcbiAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH07XG5cbiAgICByZXR1cm4gU2NoZWR1bGVyO1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgU2ltcGxlIGZhaXIgc2NoZWR1bGVyIChyb3VuZC1yb2JpbiBzdHlsZSlcbiAgICovXG5cblxuICB2YXIgU2ltcGxlID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1NjaGVkdWxlcikge1xuICAgIF9pbmhlcml0c0xvb3NlKFNpbXBsZSwgX1NjaGVkdWxlcik7XG5cbiAgICBmdW5jdGlvbiBTaW1wbGUoKSB7XG4gICAgICByZXR1cm4gX1NjaGVkdWxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzE0ID0gU2ltcGxlLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzE0LmFkZCA9IGZ1bmN0aW9uIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCAwKTtcblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGl0ZW0sIHJlcGVhdCk7XG4gICAgfTtcblxuICAgIF9wcm90bzE0Lm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IG51bGwgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIDApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2ltcGxlO1xuICB9KFNjaGVkdWxlcik7XG4gIC8qKlxuICAgKiBAY2xhc3MgU3BlZWQtYmFzZWQgc2NoZWR1bGVyXG4gICAqL1xuXG5cbiAgdmFyIFNwZWVkID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1NjaGVkdWxlcjIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShTcGVlZCwgX1NjaGVkdWxlcjIpO1xuXG4gICAgZnVuY3Rpb24gU3BlZWQoKSB7XG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8xNSA9IFNwZWVkLnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIGFueXRoaW5nIHdpdGggXCJnZXRTcGVlZFwiIG1ldGhvZFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lPTEvaXRlbS5nZXRTcGVlZCgpXVxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcbiAgICAgKi9cbiAgICBfcHJvdG8xNS5hZGQgPSBmdW5jdGlvbiBhZGQoaXRlbSwgcmVwZWF0LCB0aW1lKSB7XG4gICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IDEgLyBpdGVtLmdldFNwZWVkKCkpO1xuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjIucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGl0ZW0sIHJlcGVhdCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xNS5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50ICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAxIC8gdGhpcy5fY3VycmVudC5nZXRTcGVlZCgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBTcGVlZDtcbiAgfShTY2hlZHVsZXIpO1xuICAvKipcbiAgICogQGNsYXNzIEFjdGlvbi1iYXNlZCBzY2hlZHVsZXJcbiAgICogQGF1Z21lbnRzIFJPVC5TY2hlZHVsZXJcbiAgICovXG5cblxuICB2YXIgQWN0aW9uID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1NjaGVkdWxlcjMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShBY3Rpb24sIF9TY2hlZHVsZXIzKTtcblxuICAgIGZ1bmN0aW9uIEFjdGlvbigpIHtcbiAgICAgIHZhciBfdGhpczk7XG5cbiAgICAgIF90aGlzOSA9IF9TY2hlZHVsZXIzLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzOS5fZGVmYXVsdER1cmF0aW9uID0gMTtcbiAgICAgIC8qIGZvciBuZXdseSBhZGRlZCAqL1xuXG4gICAgICBfdGhpczkuX2R1cmF0aW9uID0gX3RoaXM5Ll9kZWZhdWx0RHVyYXRpb247XG4gICAgICAvKiBmb3IgdGhpcy5fY3VycmVudCAqL1xuXG4gICAgICByZXR1cm4gX3RoaXM5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lPTFdXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMTYgPSBBY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTYuYWRkID0gZnVuY3Rpb24gYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIHRpbWUgfHwgdGhpcy5fZGVmYXVsdER1cmF0aW9uKTtcblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIzLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBpdGVtLCByZXBlYXQpO1xuICAgIH07XG5cbiAgICBfcHJvdG8xNi5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjMucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIF9wcm90bzE2LnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG4gICAgICBpZiAoaXRlbSA9PSB0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjMucHJvdG90eXBlLnJlbW92ZS5jYWxsKHRoaXMsIGl0ZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTYubmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgdGhpcy5fZHVyYXRpb24gfHwgdGhpcy5fZGVmYXVsdER1cmF0aW9uKTtcblxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIzLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgZHVyYXRpb24gZm9yIHRoZSBhY3RpdmUgaXRlbVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xNi5zZXREdXJhdGlvbiA9IGZ1bmN0aW9uIHNldER1cmF0aW9uKHRpbWUpIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGltZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBBY3Rpb247XG4gIH0oU2NoZWR1bGVyKTtcblxuICB2YXIgaW5kZXggPSB7XG4gICAgU2ltcGxlOiBTaW1wbGUsXG4gICAgU3BlZWQ6IFNwZWVkLFxuICAgIEFjdGlvbjogQWN0aW9uXG4gIH07XG5cbiAgdmFyIEZPViA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBGT1YgYWxnb3JpdGhtXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRQYXNzZXNDYWxsYmFjayBEb2VzIHRoZSBsaWdodCBwYXNzIHRocm91Z2ggeCx5P1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF0gNC82LzhcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBGT1YobGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xpZ2h0UGFzc2VzID0gbGlnaHRQYXNzZXNDYWxsYmFjaztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIG5laWdoYm9ycyBpbiBhIGNvbmNlbnRyaWMgcmluZ1xuICAgICAqIEBwYXJhbSB7aW50fSBjeCBjZW50ZXIteFxuICAgICAqIEBwYXJhbSB7aW50fSBjeSBjZW50ZXIteVxuICAgICAqIEBwYXJhbSB7aW50fSByIHJhbmdlXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8xNyA9IEZPVi5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xNy5fZ2V0Q2lyY2xlID0gZnVuY3Rpb24gX2dldENpcmNsZShjeCwgY3ksIHIpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBkaXJzLCBjb3VudEZhY3Rvciwgc3RhcnRPZmZzZXQ7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgY291bnRGYWN0b3IgPSAxO1xuICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWzAsIDFdO1xuICAgICAgICAgIGRpcnMgPSBbRElSU1s4XVs3XSwgRElSU1s4XVsxXSwgRElSU1s4XVszXSwgRElSU1s4XVs1XV07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIGRpcnMgPSBESVJTWzZdO1xuICAgICAgICAgIGNvdW50RmFjdG9yID0gMTtcbiAgICAgICAgICBzdGFydE9mZnNldCA9IFstMSwgMV07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgIGRpcnMgPSBESVJTWzRdO1xuICAgICAgICAgIGNvdW50RmFjdG9yID0gMjtcbiAgICAgICAgICBzdGFydE9mZnNldCA9IFstMSwgMV07XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgdG9wb2xvZ3kgZm9yIEZPViBjb21wdXRhdGlvblwiKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8qIHN0YXJ0aW5nIG5laWdoYm9yICovXG5cblxuICAgICAgdmFyIHggPSBjeCArIHN0YXJ0T2Zmc2V0WzBdICogcjtcbiAgICAgIHZhciB5ID0gY3kgKyBzdGFydE9mZnNldFsxXSAqIHI7XG4gICAgICAvKiBjaXJjbGUgKi9cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgciAqIGNvdW50RmFjdG9yOyBqKyspIHtcbiAgICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgICAgIHggKz0gZGlyc1tpXVswXTtcbiAgICAgICAgICB5ICs9IGRpcnNbaV1bMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEZPVjtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIERpc2NyZXRlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtLiBPYnNvbGV0ZWQgYnkgUHJlY2lzZSBzaGFkb3djYXN0aW5nLlxuICAgKiBAYXVnbWVudHMgUk9ULkZPVlxuICAgKi9cblxuXG4gIHZhciBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRk9WKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRGlzY3JldGVTaGFkb3djYXN0aW5nLCBfRk9WKTtcblxuICAgIGZ1bmN0aW9uIERpc2NyZXRlU2hhZG93Y2FzdGluZygpIHtcbiAgICAgIHJldHVybiBfRk9WLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMTggPSBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTguY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgIC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cbiAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgLyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cblxuICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvKiBzdGFydCBhbmQgZW5kIGFuZ2xlcyAqL1xuXG5cbiAgICAgIHZhciBEQVRBID0gW107XG4gICAgICB2YXIgQSwgQiwgY3gsIGN5LCBibG9ja3M7XG4gICAgICAvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuXG4gICAgICBmb3IgKHZhciByID0gMTsgciA8PSBSOyByKyspIHtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcblxuICAgICAgICB2YXIgYW5nbGUgPSAzNjAgLyBuZWlnaGJvcnMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY3ggPSBuZWlnaGJvcnNbaV1bMF07XG4gICAgICAgICAgY3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgQSA9IGFuZ2xlICogKGkgLSAwLjUpO1xuICAgICAgICAgIEIgPSBBICsgYW5nbGU7XG4gICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5fdmlzaWJsZUNvb3JkcyhNYXRoLmZsb29yKEEpLCBNYXRoLmNlaWwoQiksIGJsb2NrcywgREFUQSkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN4LCBjeSwgciwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKERBVEEubGVuZ3RoID09IDIgJiYgREFUQVswXSA9PSAwICYmIERBVEFbMV0gPT0gMzYwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGN1dG9mZj8gKi9cblxuICAgICAgICB9XG4gICAgICAgIC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG5cbiAgICAgIH1cbiAgICAgIC8qIGZvciBhbGwgcmluZ3MgKi9cblxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnR9IEEgc3RhcnQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2ludH0gQiBlbmQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgY2VsbCBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gREFUQSBzaGFkb3dlZCBhbmdsZSBwYWlyc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xOC5fdmlzaWJsZUNvb3JkcyA9IGZ1bmN0aW9uIF92aXNpYmxlQ29vcmRzKEEsIEIsIGJsb2NrcywgREFUQSkge1xuICAgICAgaWYgKEEgPCAwKSB7XG4gICAgICAgIHZhciB2MSA9IHRoaXMuX3Zpc2libGVDb29yZHMoMCwgQiwgYmxvY2tzLCBEQVRBKTtcblxuICAgICAgICB2YXIgdjIgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDM2MCArIEEsIDM2MCwgYmxvY2tzLCBEQVRBKTtcblxuICAgICAgICByZXR1cm4gdjEgfHwgdjI7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQSkge1xuICAgICAgICBpbmRleCsrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPT0gREFUQS5sZW5ndGgpIHtcbiAgICAgICAgLyogY29tcGxldGVseSBuZXcgc2hhZG93ICovXG4gICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICBEQVRBLnB1c2goQSwgQik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgaWYgKGluZGV4ICUgMikge1xuICAgICAgICAvKiB0aGlzIHNoYWRvdyBzdGFydHMgaW4gYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aXRoaW4gaXRzIGVuZGluZyBib3VuZGFyeSAqL1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY291bnQgPT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICBpZiAoY291bnQgJSAyKSB7XG4gICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGEgc3RhcnRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBCKSB7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIC8qIHZpc2libGUgd2hlbiBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2hlbiBvdmVybGFwcGluZyAqL1xuXG5cbiAgICAgICAgaWYgKEEgPT0gREFUQVtpbmRleCAtIGNvdW50XSAmJiBjb3VudCA9PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEsIEIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRGlzY3JldGVTaGFkb3djYXN0aW5nO1xuICB9KEZPVik7XG4gIC8qKlxuICAgKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICAgKiBAYXVnbWVudHMgUk9ULkZPVlxuICAgKi9cblxuXG4gIHZhciBQcmVjaXNlU2hhZG93Y2FzdGluZyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9GT1YyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUHJlY2lzZVNoYWRvd2Nhc3RpbmcsIF9GT1YyKTtcblxuICAgIGZ1bmN0aW9uIFByZWNpc2VTaGFkb3djYXN0aW5nKCkge1xuICAgICAgcmV0dXJuIF9GT1YyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMTkgPSBQcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xOS5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgLyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuXG4gICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8qIGxpc3Qgb2YgYWxsIHNoYWRvd3MgKi9cblxuXG4gICAgICB2YXIgU0hBRE9XUyA9IFtdO1xuICAgICAgdmFyIGN4LCBjeSwgYmxvY2tzLCBBMSwgQTIsIHZpc2liaWxpdHk7XG4gICAgICAvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuXG4gICAgICBmb3IgKHZhciByID0gMTsgciA8PSBSOyByKyspIHtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcblxuICAgICAgICB2YXIgbmVpZ2hib3JDb3VudCA9IG5laWdoYm9ycy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvckNvdW50OyBpKyspIHtcbiAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAvKiBzaGlmdCBoYWxmLWFuLWFuZ2xlIGJhY2t3YXJkcyB0byBtYWludGFpbiBjb25zaXN0ZW5jeSBvZiAwLXRoIGNlbGxzICovXG5cbiAgICAgICAgICBBMSA9IFtpID8gMiAqIGkgLSAxIDogMiAqIG5laWdoYm9yQ291bnQgLSAxLCAyICogbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgQTIgPSBbMiAqIGkgKyAxLCAyICogbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG5cbiAgICAgICAgICBpZiAodmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMiAmJiBTSEFET1dTWzBdWzBdID09IDAgJiYgU0hBRE9XU1sxXVswXSA9PSBTSEFET1dTWzFdWzFdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGN1dG9mZj8gKi9cblxuICAgICAgICB9XG4gICAgICAgIC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG5cbiAgICAgIH1cbiAgICAgIC8qIGZvciBhbGwgcmluZ3MgKi9cblxuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnRbMl19IEExIGFyYyBzdGFydFxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMiBhcmMgZW5kXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gU0hBRE9XUyBsaXN0IG9mIGFjdGl2ZSBzaGFkb3dzXG4gICAgICovXG5cblxuICAgIF9wcm90bzE5Ll9jaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiBfY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgICBpZiAoQTFbMF0gPiBBMlswXSkge1xuICAgICAgICAvKiBzcGxpdCBpbnRvIHR3byBzdWItYXJjcyAqL1xuICAgICAgICB2YXIgdjEgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIFtBMVsxXSwgQTFbMV1dLCBibG9ja3MsIFNIQURPV1MpO1xuXG4gICAgICAgIHZhciB2MiA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShbMCwgMV0sIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuXG4gICAgICAgIHJldHVybiAodjEgKyB2MikgLyAyO1xuICAgICAgfVxuICAgICAgLyogaW5kZXgxOiBmaXJzdCBzaGFkb3cgPj0gQTEgKi9cblxuXG4gICAgICB2YXIgaW5kZXgxID0gMCxcbiAgICAgICAgICBlZGdlMSA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgdmFyIGRpZmYgPSBvbGRbMF0gKiBBMVsxXSAtIEExWzBdICogb2xkWzFdO1xuXG4gICAgICAgIGlmIChkaWZmID49IDApIHtcbiAgICAgICAgICAvKiBvbGQgPj0gQTEgKi9cbiAgICAgICAgICBpZiAoZGlmZiA9PSAwICYmICEoaW5kZXgxICUgMikpIHtcbiAgICAgICAgICAgIGVkZ2UxID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4MSsrO1xuICAgICAgfVxuICAgICAgLyogaW5kZXgyOiBsYXN0IHNoYWRvdyA8PSBBMiAqL1xuXG5cbiAgICAgIHZhciBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCxcbiAgICAgICAgICBlZGdlMiA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoaW5kZXgyLS0pIHtcbiAgICAgICAgdmFyIF9vbGQgPSBTSEFET1dTW2luZGV4Ml07XG5cbiAgICAgICAgdmFyIF9kaWZmID0gQTJbMF0gKiBfb2xkWzFdIC0gX29sZFswXSAqIEEyWzFdO1xuXG4gICAgICAgIGlmIChfZGlmZiA+PSAwKSB7XG4gICAgICAgICAgLyogb2xkIDw9IEEyICovXG4gICAgICAgICAgaWYgKF9kaWZmID09IDAgJiYgaW5kZXgyICUgMikge1xuICAgICAgICAgICAgZWRnZTIgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgaWYgKGluZGV4MSA9PSBpbmRleDIgJiYgKGVkZ2UxIHx8IGVkZ2UyKSkge1xuICAgICAgICAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBvbmUgb2YgdGhlIGVkZ2VzIG1hdGNoICovXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoZWRnZTEgJiYgZWRnZTIgJiYgaW5kZXgxICsgMSA9PSBpbmRleDIgJiYgaW5kZXgyICUgMikge1xuICAgICAgICAvKiBjb21wbGV0ZWx5IGVxdWl2YWxlbnQgd2l0aCBleGlzdGluZyBzaGFkb3cgKi9cbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChpbmRleDEgPiBpbmRleDIgJiYgaW5kZXgxICUgMikge1xuICAgICAgICAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBub3QgdG91Y2hpbmcgKi9cbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICAvKiBmYXN0IGNhc2U6IG5vdCB2aXNpYmxlICovXG5cblxuICAgICAgdmFyIHZpc2libGVMZW5ndGg7XG4gICAgICAvKiBjb21wdXRlIHRoZSBsZW5ndGggb2YgdmlzaWJsZSBhcmMsIGFkanVzdCBsaXN0IG9mIHNoYWRvd3MgKGlmIGJsb2NraW5nKSAqL1xuXG4gICAgICB2YXIgcmVtb3ZlID0gaW5kZXgyIC0gaW5kZXgxICsgMTtcblxuICAgICAgaWYgKHJlbW92ZSAlIDIpIHtcbiAgICAgICAgaWYgKGluZGV4MSAlIDIpIHtcbiAgICAgICAgICAvKiBmaXJzdCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIHNlY29uZCBvdXRzaWRlICovXG4gICAgICAgICAgdmFyIFAgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChBMlswXSAqIFBbMV0gLSBQWzBdICogQTJbMV0pIC8gKFBbMV0gKiBBMlsxXSk7XG5cbiAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBzZWNvbmQgZWRnZSB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93LCBmaXJzdCBvdXRzaWRlICovXG4gICAgICAgICAgdmFyIF9QID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoX1BbMF0gKiBBMVsxXSAtIEExWzBdICogX1BbMV0pIC8gKEExWzFdICogX1BbMV0pO1xuXG4gICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpbmRleDEgJSAyKSB7XG4gICAgICAgICAgLyogYm90aCBlZGdlcyB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgIHZhciBQMSA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICB2YXIgUDIgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChQMlswXSAqIFAxWzFdIC0gUDFbMF0gKiBQMlsxXSkgLyAoUDFbMV0gKiBQMlsxXSk7XG5cbiAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIGJvdGggZWRnZXMgb3V0c2lkZSBleGlzdGluZyBzaGFkb3dzICovXG4gICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExLCBBMik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgLyogd2hvbGUgYXJjIHZpc2libGUhICovXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGFyY0xlbmd0aCA9IChBMlswXSAqIEExWzFdIC0gQTFbMF0gKiBBMlsxXSkgLyAoQTFbMV0gKiBBMlsxXSk7XG4gICAgICByZXR1cm4gdmlzaWJsZUxlbmd0aCAvIGFyY0xlbmd0aDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFByZWNpc2VTaGFkb3djYXN0aW5nO1xuICB9KEZPVik7XG4gIC8qKiBPY3RhbnRzIHVzZWQgZm9yIHRyYW5zbGF0aW5nIHJlY3Vyc2l2ZSBzaGFkb3djYXN0aW5nIG9mZnNldHMgKi9cblxuXG4gIHZhciBPQ1RBTlRTID0gW1stMSwgMCwgMCwgMV0sIFswLCAtMSwgMSwgMF0sIFswLCAtMSwgLTEsIDBdLCBbLTEsIDAsIDAsIC0xXSwgWzEsIDAsIDAsIC0xXSwgWzAsIDEsIC0xLCAwXSwgWzAsIDEsIDEsIDBdLCBbMSwgMCwgMCwgMV1dO1xuICAvKipcbiAgICogQGNsYXNzIFJlY3Vyc2l2ZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyA0LzggdG9wb2xvZ2llcywgbm90IGhleGFnb25hbC5cbiAgICogQmFzZWQgb24gUGV0ZXIgSGFya2lucycgaW1wbGVtZW50YXRpb24gb2YgQmrDtnJuIEJlcmdzdHLDtm0ncyBhbGdvcml0aG0gZGVzY3JpYmVkIGhlcmU6IGh0dHA6Ly93d3cucm9ndWViYXNpbi5jb20vaW5kZXgucGhwP3RpdGxlPUZPVl91c2luZ19yZWN1cnNpdmVfc2hhZG93Y2FzdGluZ1xuICAgKiBAYXVnbWVudHMgUk9ULkZPVlxuICAgKi9cblxuICB2YXIgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9GT1YzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUmVjdXJzaXZlU2hhZG93Y2FzdGluZywgX0ZPVjMpO1xuXG4gICAgZnVuY3Rpb24gUmVjdXJzaXZlU2hhZG93Y2FzdGluZygpIHtcbiAgICAgIHJldHVybiBfRk9WMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIwID0gUmVjdXJzaXZlU2hhZG93Y2FzdGluZy5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMzYwLWRlZ3JlZSBjaXJjbGVcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgX3Byb3RvMjAuY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IE9DVEFOVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbaV0sIFIsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAxODAtZGVncmVlIGFyY1xuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG5cblxuICAgIF9wcm90bzIwLmNvbXB1dGUxODAgPSBmdW5jdGlvbiBjb21wdXRlMTgwKHgsIHksIFIsIGRpciwgY2FsbGJhY2spIHtcbiAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgdmFyIHByZXZpb3VzT2N0YW50ID0gKGRpciAtIDEgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcblxuICAgICAgdmFyIG5leHRQcmV2aW91c09jdGFudCA9IChkaXIgLSAyICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIHR3byBvY3RhbnRzIHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcblxuICAgICAgdmFyIG5leHRPY3RhbnQgPSAoZGlyICsgMSArIDgpICUgODsgLy9OZWVkIHRvIGdyYWIgdG8gbmV4dCBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tuZXh0UHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW3ByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tkaXJdLCBSLCBjYWxsYmFjayk7XG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW25leHRPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSA5MC1kZWdyZWUgYXJjXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2ludH0gZGlyIERpcmVjdGlvbiB0byBsb29rIGluIChleHByZXNzZWQgaW4gYSBST1QuRElSUyB2YWx1ZSk7XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBfcHJvdG8yMC5jb21wdXRlOTAgPSBmdW5jdGlvbiBjb21wdXRlOTAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICB2YXIgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCA5MCBkZWdyZWVzXG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgb25lIG9jdGFudCAoNDUtZGVncmVlIGFyYykgb2YgdGhlIHZpZXdzaGVkXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBvY3RhbnQgT2N0YW50IHRvIGJlIHJlbmRlcmVkXG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG5cblxuICAgIF9wcm90bzIwLl9yZW5kZXJPY3RhbnQgPSBmdW5jdGlvbiBfcmVuZGVyT2N0YW50KHgsIHksIG9jdGFudCwgUiwgY2FsbGJhY2spIHtcbiAgICAgIC8vUmFkaXVzIGluY3JlbWVudGVkIGJ5IDEgdG8gcHJvdmlkZSBzYW1lIGNvdmVyYWdlIGFyZWEgYXMgb3RoZXIgc2hhZG93Y2FzdGluZyByYWRpdXNlc1xuICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoeCwgeSwgMSwgMS4wLCAwLjAsIFIgKyAxLCBvY3RhbnRbMF0sIG9jdGFudFsxXSwgb2N0YW50WzJdLCBvY3RhbnRbM10sIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFjdHVhbGx5IGNhbGN1bGF0ZXMgdGhlIHZpc2liaWxpdHlcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRYIFRoZSBzdGFydGluZyBYIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRZIFRoZSBzdGFydGluZyBZIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gcm93IFRoZSByb3cgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHtmbG9hdH0gdmlzU2xvcGVTdGFydCBUaGUgc2xvcGUgdG8gc3RhcnQgYXRcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZUVuZCBUaGUgc2xvcGUgdG8gZW5kIGF0XG4gICAgICogQHBhcmFtIHtpbnR9IHJhZGl1cyBUaGUgcmFkaXVzIHRvIHJlYWNoIG91dCB0b1xuICAgICAqIEBwYXJhbSB7aW50fSB4eFxuICAgICAqIEBwYXJhbSB7aW50fSB4eVxuICAgICAqIEBwYXJhbSB7aW50fSB5eFxuICAgICAqIEBwYXJhbSB7aW50fSB5eVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byB1c2Ugd2hlbiB3ZSBoaXQgYSBibG9jayB0aGF0IGlzIHZpc2libGVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjAuX2Nhc3RWaXNpYmlsaXR5ID0gZnVuY3Rpb24gX2Nhc3RWaXNpYmlsaXR5KHN0YXJ0WCwgc3RhcnRZLCByb3csIHZpc1Nsb3BlU3RhcnQsIHZpc1Nsb3BlRW5kLCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjaykge1xuICAgICAgaWYgKHZpc1Nsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSByb3c7IGkgPD0gcmFkaXVzOyBpKyspIHtcbiAgICAgICAgdmFyIGR4ID0gLWkgLSAxO1xuICAgICAgICB2YXIgZHkgPSAtaTtcbiAgICAgICAgdmFyIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIG5ld1N0YXJ0ID0gMDsgLy8nUm93JyBjb3VsZCBiZSBjb2x1bW4sIG5hbWVzIGhlcmUgYXNzdW1lIG9jdGFudCAwIGFuZCB3b3VsZCBiZSBmbGlwcGVkIGZvciBoYWxmIHRoZSBvY3RhbnRzXG5cbiAgICAgICAgd2hpbGUgKGR4IDw9IDApIHtcbiAgICAgICAgICBkeCArPSAxOyAvL1RyYW5zbGF0ZSBmcm9tIHJlbGF0aXZlIGNvb3JkaW5hdGVzIHRvIG1hcCBjb29yZGluYXRlc1xuXG4gICAgICAgICAgdmFyIG1hcFggPSBzdGFydFggKyBkeCAqIHh4ICsgZHkgKiB4eTtcbiAgICAgICAgICB2YXIgbWFwWSA9IHN0YXJ0WSArIGR4ICogeXggKyBkeSAqIHl5OyAvL1JhbmdlIG9mIHRoZSByb3dcblxuICAgICAgICAgIHZhciBzbG9wZVN0YXJ0ID0gKGR4IC0gMC41KSAvIChkeSArIDAuNSk7XG4gICAgICAgICAgdmFyIHNsb3BlRW5kID0gKGR4ICsgMC41KSAvIChkeSAtIDAuNSk7IC8vSWdub3JlIGlmIG5vdCB5ZXQgYXQgbGVmdCBlZGdlIG9mIE9jdGFudFxuXG4gICAgICAgICAgaWYgKHNsb3BlRW5kID4gdmlzU2xvcGVTdGFydCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSAvL0RvbmUgaWYgcGFzdCByaWdodCBlZGdlXG5cblxuICAgICAgICAgIGlmIChzbG9wZVN0YXJ0IDwgdmlzU2xvcGVFbmQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gLy9JZiBpdCdzIGluIHJhbmdlLCBpdCdzIHZpc2libGVcblxuXG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5IDwgcmFkaXVzICogcmFkaXVzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhtYXBYLCBtYXBZLCBpLCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWJsb2NrZWQpIHtcbiAgICAgICAgICAgIC8vSWYgdGlsZSBpcyBhIGJsb2NraW5nIHRpbGUsIGNhc3QgYXJvdW5kIGl0XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpICYmIGkgPCByYWRpdXMpIHtcbiAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIGkgKyAxLCB2aXNTbG9wZVN0YXJ0LCBzbG9wZVN0YXJ0LCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAgICAgbmV3U3RhcnQgPSBzbG9wZUVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9LZWVwIG5hcnJvd2luZyBpZiBzY2FubmluZyBhY3Jvc3MgYSBibG9ja1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3NlcyhtYXBYLCBtYXBZKSkge1xuICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLy9CbG9jayBoYXMgZW5kZWRcblxuXG4gICAgICAgICAgICBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB2aXNTbG9wZVN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gUmVjdXJzaXZlU2hhZG93Y2FzdGluZztcbiAgfShGT1YpO1xuXG4gIHZhciBpbmRleCQxID0ge1xuICAgIERpc2NyZXRlU2hhZG93Y2FzdGluZzogRGlzY3JldGVTaGFkb3djYXN0aW5nLFxuICAgIFByZWNpc2VTaGFkb3djYXN0aW5nOiBQcmVjaXNlU2hhZG93Y2FzdGluZyxcbiAgICBSZWN1cnNpdmVTaGFkb3djYXN0aW5nOiBSZWN1cnNpdmVTaGFkb3djYXN0aW5nXG4gIH07XG5cbiAgdmFyIE1hcCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBCYXNlIG1hcCBnZW5lcmF0b3JcbiAgICAgKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxuICAgICAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNYXAod2lkdGgsIGhlaWdodCkge1xuICAgICAgaWYgKHdpZHRoID09PSB2b2lkIDApIHtcbiAgICAgICAgd2lkdGggPSBERUZBVUxUX1dJRFRIO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGVpZ2h0ID09PSB2b2lkIDApIHtcbiAgICAgICAgaGVpZ2h0ID0gREVGQVVMVF9IRUlHSFQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIxID0gTWFwLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIxLl9maWxsTWFwID0gZnVuY3Rpb24gX2ZpbGxNYXAodmFsdWUpIHtcbiAgICAgIHZhciBtYXAgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgIG1hcC5wdXNoKFtdKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgbWFwW2ldLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcblxuICAgIHJldHVybiBNYXA7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBTaW1wbGUgZW1wdHkgcmVjdGFuZ3VsYXIgcm9vbVxuICAgKiBAYXVnbWVudHMgUk9ULk1hcFxuICAgKi9cblxuXG4gIHZhciBBcmVuYSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXApIHtcbiAgICBfaW5oZXJpdHNMb29zZShBcmVuYSwgX01hcCk7XG5cbiAgICBmdW5jdGlvbiBBcmVuYSgpIHtcbiAgICAgIHJldHVybiBfTWFwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMjIgPSBBcmVuYS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yMi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciB3ID0gdGhpcy5fd2lkdGggLSAxO1xuICAgICAgdmFyIGggPSB0aGlzLl9oZWlnaHQgLSAxO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB3OyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gaDsgaisrKSB7XG4gICAgICAgICAgdmFyIGVtcHR5ID0gaSAmJiBqICYmIGkgPCB3ICYmIGogPCBoO1xuICAgICAgICAgIGNhbGxiYWNrKGksIGosIGVtcHR5ID8gMCA6IDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gQXJlbmE7XG4gIH0oTWFwKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBEdW5nZW9uIG1hcDogaGFzIHJvb21zIGFuZCBjb3JyaWRvcnNcbiAgICogQGF1Z21lbnRzIFJPVC5NYXBcbiAgICovXG5cblxuICB2YXIgRHVuZ2VvbiA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXAyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRHVuZ2VvbiwgX01hcDIpO1xuXG4gICAgZnVuY3Rpb24gRHVuZ2Vvbih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICB2YXIgX3RoaXMxMDtcblxuICAgICAgX3RoaXMxMCA9IF9NYXAyLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTAuX3Jvb21zID0gW107XG4gICAgICBfdGhpczEwLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgIHJldHVybiBfdGhpczEwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlbmVyYXRlZCByb29tc1xuICAgICAqIEByZXR1cm5zIHtST1QuTWFwLkZlYXR1cmUuUm9vbVtdfVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMjMgPSBEdW5nZW9uLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIzLmdldFJvb21zID0gZnVuY3Rpb24gZ2V0Um9vbXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcm9vbXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGdlbmVyYXRlZCBjb3JyaWRvcnNcbiAgICAgKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLkNvcnJpZG9yW119XG4gICAgICovXG5cblxuICAgIF9wcm90bzIzLmdldENvcnJpZG9ycyA9IGZ1bmN0aW9uIGdldENvcnJpZG9ycygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb3JyaWRvcnM7XG4gICAgfTtcblxuICAgIHJldHVybiBEdW5nZW9uO1xuICB9KE1hcCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgRHVuZ2VvbiBmZWF0dXJlOyBoYXMgb3duIC5jcmVhdGUoKSBtZXRob2RcbiAgICovXG5cblxuICB2YXIgRmVhdHVyZSA9IGZ1bmN0aW9uIEZlYXR1cmUoKSB7fTtcbiAgLyoqXG4gICAqIEBjbGFzcyBSb29tXG4gICAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAgICogQHBhcmFtIHtpbnR9IHgxXG4gICAqIEBwYXJhbSB7aW50fSB5MVxuICAgKiBAcGFyYW0ge2ludH0geDJcbiAgICogQHBhcmFtIHtpbnR9IHkyXG4gICAqIEBwYXJhbSB7aW50fSBbZG9vclhdXG4gICAqIEBwYXJhbSB7aW50fSBbZG9vclldXG4gICAqL1xuXG5cbiAgdmFyIFJvb20gPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRmVhdHVyZSkge1xuICAgIF9pbmhlcml0c0xvb3NlKFJvb20sIF9GZWF0dXJlKTtcblxuICAgIGZ1bmN0aW9uIFJvb20oeDEsIHkxLCB4MiwgeTIsIGRvb3JYLCBkb29yWSkge1xuICAgICAgdmFyIF90aGlzMTE7XG5cbiAgICAgIF90aGlzMTEgPSBfRmVhdHVyZS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczExLl94MSA9IHgxO1xuICAgICAgX3RoaXMxMS5feTEgPSB5MTtcbiAgICAgIF90aGlzMTEuX3gyID0geDI7XG4gICAgICBfdGhpczExLl95MiA9IHkyO1xuICAgICAgX3RoaXMxMS5fZG9vcnMgPSB7fTtcblxuICAgICAgaWYgKGRvb3JYICE9PSB1bmRlZmluZWQgJiYgZG9vclkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBfdGhpczExLmFkZERvb3IoZG9vclgsIGRvb3JZKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzMTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgd2l0aCBhIGdpdmVuIGRvb3JzIGFuZCBkaXJlY3Rpb25cbiAgICAgKi9cbiAgICBSb29tLmNyZWF0ZVJhbmRvbUF0ID0gZnVuY3Rpb24gY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICB2YXIgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICB2YXIgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICB2YXIgd2lkdGggPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgIHZhciBoZWlnaHQgPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcblxuICAgICAgaWYgKGR4ID09IDEpIHtcbiAgICAgICAgLyogdG8gdGhlIHJpZ2h0ICovXG4gICAgICAgIHZhciB5MiA9IHkgLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4ICsgMSwgeTIsIHggKyB3aWR0aCwgeTIgKyBoZWlnaHQgLSAxLCB4LCB5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR4ID09IC0xKSB7XG4gICAgICAgIC8qIHRvIHRoZSBsZWZ0ICovXG4gICAgICAgIHZhciBfeSA9IHkgLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHggLSB3aWR0aCwgX3ksIHggLSAxLCBfeSArIGhlaWdodCAtIDEsIHgsIHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkgPT0gMSkge1xuICAgICAgICAvKiB0byB0aGUgYm90dG9tICovXG4gICAgICAgIHZhciB4MiA9IHggLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgyLCB5ICsgMSwgeDIgKyB3aWR0aCAtIDEsIHkgKyBoZWlnaHQsIHgsIHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkgPT0gLTEpIHtcbiAgICAgICAgLyogdG8gdGhlIHRvcCAqL1xuICAgICAgICB2YXIgX3ggPSB4IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKF94LCB5IC0gaGVpZ2h0LCBfeCArIHdpZHRoIC0gMSwgeSAtIDEsIHgsIHkpO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkeCBvciBkeSBtdXN0IGJlIDEgb3IgLTFcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplLCBwb3NpdGlvbmVkIGFyb3VuZCBjZW50ZXIgY29vcmRzXG4gICAgICovXG5cblxuICAgIFJvb20uY3JlYXRlUmFuZG9tQ2VudGVyID0gZnVuY3Rpb24gY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgb3B0aW9ucykge1xuICAgICAgdmFyIG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgdmFyIG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgdmFyIHdpZHRoID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICB2YXIgaGVpZ2h0ID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICB2YXIgeDEgPSBjeCAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgdmFyIHkxID0gY3kgLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICB2YXIgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgIHZhciB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcbiAgICAgIHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplIHdpdGhpbiBhIGdpdmVuIGRpbWVuc2lvbnNcbiAgICAgKi9cblxuXG4gICAgUm9vbS5jcmVhdGVSYW5kb20gPSBmdW5jdGlvbiBjcmVhdGVSYW5kb20oYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgIHZhciBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgIHZhciB3aWR0aCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgdmFyIGhlaWdodCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgdmFyIGxlZnQgPSBhdmFpbFdpZHRoIC0gd2lkdGggLSAxO1xuICAgICAgdmFyIHRvcCA9IGF2YWlsSGVpZ2h0IC0gaGVpZ2h0IC0gMTtcbiAgICAgIHZhciB4MSA9IDEgKyBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIGxlZnQpO1xuICAgICAgdmFyIHkxID0gMSArIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogdG9wKTtcbiAgICAgIHZhciB4MiA9IHgxICsgd2lkdGggLSAxO1xuICAgICAgdmFyIHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9O1xuXG4gICAgdmFyIF9wcm90bzI0ID0gUm9vbS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yNC5hZGREb29yID0gZnVuY3Rpb24gYWRkRG9vcih4LCB5KSB7XG4gICAgICB0aGlzLl9kb29yc1t4ICsgXCIsXCIgKyB5XSA9IDE7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259XG4gICAgICovXG5cblxuICAgIF9wcm90bzI0LmdldERvb3JzID0gZnVuY3Rpb24gZ2V0RG9vcnMoY2IpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9kb29ycykge1xuICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICBjYihwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5jbGVhckRvb3JzID0gZnVuY3Rpb24gY2xlYXJEb29ycygpIHtcbiAgICAgIHRoaXMuX2Rvb3JzID0ge307XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuYWRkRG9vcnMgPSBmdW5jdGlvbiBhZGREb29ycyhpc1dhbGxDYWxsYmFjaykge1xuICAgICAgdmFyIGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICB2YXIgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICB2YXIgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcblxuICAgICAgZm9yICh2YXIgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgaWYgKHggIT0gbGVmdCAmJiB4ICE9IHJpZ2h0ICYmIHkgIT0gdG9wICYmIHkgIT0gYm90dG9tKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuYWRkRG9vcih4LCB5KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZGVidWcgPSBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwicm9vbVwiLCB0aGlzLl94MSwgdGhpcy5feTEsIHRoaXMuX3gyLCB0aGlzLl95Mik7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmlzVmFsaWQgPSBmdW5jdGlvbiBpc1ZhbGlkKGlzV2FsbENhbGxiYWNrLCBjYW5CZUR1Z0NhbGxiYWNrKSB7XG4gICAgICB2YXIgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgIHZhciByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgIHZhciB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICB2YXIgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuXG4gICAgICBmb3IgKHZhciB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgIGZvciAodmFyIHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICBpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcbiAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNhbkJlRHVnQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LCAxID0gd2FsbCwgMiA9IGRvb3IuIE11bHRpcGxlIGRvb3JzIGFyZSBhbGxvd2VkLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoZGlnQ2FsbGJhY2spIHtcbiAgICAgIHZhciBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgdmFyIHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgIHZhciBib3R0b20gPSB0aGlzLl95MiArIDE7XG4gICAgICB2YXIgdmFsdWUgPSAwO1xuXG4gICAgICBmb3IgKHZhciB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgIGZvciAodmFyIHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICBpZiAoeCArIFwiLFwiICsgeSBpbiB0aGlzLl9kb29ycykge1xuICAgICAgICAgICAgdmFsdWUgPSAyO1xuICAgICAgICAgIH0gZWxzZSBpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcbiAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNC5nZXRDZW50ZXIgPSBmdW5jdGlvbiBnZXRDZW50ZXIoKSB7XG4gICAgICByZXR1cm4gW01hdGgucm91bmQoKHRoaXMuX3gxICsgdGhpcy5feDIpIC8gMiksIE1hdGgucm91bmQoKHRoaXMuX3kxICsgdGhpcy5feTIpIC8gMildO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5nZXRMZWZ0ID0gZnVuY3Rpb24gZ2V0TGVmdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl94MTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZ2V0UmlnaHQgPSBmdW5jdGlvbiBnZXRSaWdodCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl94MjtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZ2V0VG9wID0gZnVuY3Rpb24gZ2V0VG9wKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3kxO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5nZXRCb3R0b20gPSBmdW5jdGlvbiBnZXRCb3R0b20oKSB7XG4gICAgICByZXR1cm4gdGhpcy5feTI7XG4gICAgfTtcblxuICAgIHJldHVybiBSb29tO1xuICB9KEZlYXR1cmUpO1xuICAvKipcbiAgICogQGNsYXNzIENvcnJpZG9yXG4gICAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WFxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRZXG4gICAqIEBwYXJhbSB7aW50fSBlbmRYXG4gICAqIEBwYXJhbSB7aW50fSBlbmRZXG4gICAqL1xuXG5cbiAgdmFyIENvcnJpZG9yID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0ZlYXR1cmUyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQ29ycmlkb3IsIF9GZWF0dXJlMik7XG5cbiAgICBmdW5jdGlvbiBDb3JyaWRvcihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkge1xuICAgICAgdmFyIF90aGlzMTI7XG5cbiAgICAgIF90aGlzMTIgPSBfRmVhdHVyZTIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMxMi5fc3RhcnRYID0gc3RhcnRYO1xuICAgICAgX3RoaXMxMi5fc3RhcnRZID0gc3RhcnRZO1xuICAgICAgX3RoaXMxMi5fZW5kWCA9IGVuZFg7XG4gICAgICBfdGhpczEyLl9lbmRZID0gZW5kWTtcbiAgICAgIF90aGlzMTIuX2VuZHNXaXRoQVdhbGwgPSB0cnVlO1xuICAgICAgcmV0dXJuIF90aGlzMTI7XG4gICAgfVxuXG4gICAgQ29ycmlkb3IuY3JlYXRlUmFuZG9tQXQgPSBmdW5jdGlvbiBjcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcbiAgICAgIHZhciBtaW4gPSBvcHRpb25zLmNvcnJpZG9yTGVuZ3RoWzBdO1xuICAgICAgdmFyIG1heCA9IG9wdGlvbnMuY29ycmlkb3JMZW5ndGhbMV07XG4gICAgICB2YXIgbGVuZ3RoID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoeCwgeSwgeCArIGR4ICogbGVuZ3RoLCB5ICsgZHkgKiBsZW5ndGgpO1xuICAgIH07XG5cbiAgICB2YXIgX3Byb3RvMjUgPSBDb3JyaWRvci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yNS5kZWJ1ZyA9IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjb3JyaWRvclwiLCB0aGlzLl9zdGFydFgsIHRoaXMuX3N0YXJ0WSwgdGhpcy5fZW5kWCwgdGhpcy5fZW5kWSk7XG4gICAgfTtcblxuICAgIF9wcm90bzI1LmlzVmFsaWQgPSBmdW5jdGlvbiBpc1ZhbGlkKGlzV2FsbENhbGxiYWNrLCBjYW5CZUR1Z0NhbGxiYWNrKSB7XG4gICAgICB2YXIgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICB2YXIgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICB2YXIgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICB2YXIgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICB2YXIgbGVuZ3RoID0gMSArIE1hdGgubWF4KE1hdGguYWJzKGR4KSwgTWF0aC5hYnMoZHkpKTtcblxuICAgICAgaWYgKGR4KSB7XG4gICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSkge1xuICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnggPSBkeTtcbiAgICAgIHZhciBueSA9IC1keDtcbiAgICAgIHZhciBvayA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgdmFyIHkgPSBzeSArIGkgKiBkeTtcblxuICAgICAgICBpZiAoIWNhbkJlRHVnQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4ICsgbngsIHkgKyBueSkpIHtcbiAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4IC0gbngsIHkgLSBueSkpIHtcbiAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgIGxlbmd0aCA9IGk7XG4gICAgICAgICAgdGhpcy5fZW5kWCA9IHggLSBkeDtcbiAgICAgICAgICB0aGlzLl9lbmRZID0geSAtIGR5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIElmIHRoZSBsZW5ndGggZGVnZW5lcmF0ZWQsIHRoaXMgY29ycmlkb3IgbWlnaHQgYmUgaW52YWxpZFxuICAgICAgICovXG5cbiAgICAgIC8qIG5vdCBzdXBwb3J0ZWQgKi9cblxuXG4gICAgICBpZiAobGVuZ3RoID09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLyogbGVuZ3RoIDEgYWxsb3dlZCBvbmx5IGlmIHRoZSBuZXh0IHNwYWNlIGlzIGVtcHR5ICovXG5cblxuICAgICAgaWYgKGxlbmd0aCA9PSAxICYmIGlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIFdlIGRvIG5vdCB3YW50IHRoZSBjb3JyaWRvciB0byBjcmFzaCBpbnRvIGEgY29ybmVyIG9mIGEgcm9vbTtcbiAgICAgICAqIGlmIGFueSBvZiB0aGUgZW5kaW5nIGNvcm5lcnMgaXMgZW1wdHksIHRoZSBOKzF0aCBjZWxsIG9mIHRoaXMgY29ycmlkb3IgbXVzdCBiZSBlbXB0eSB0b28uXG4gICAgICAgKlxuICAgICAgICogU2l0dWF0aW9uOlxuICAgICAgICogIyMjIyMjIzFcbiAgICAgICAqIC4uLi4uLi4/XG4gICAgICAgKiAjIyMjIyMjMlxuICAgICAgICpcbiAgICAgICAqIFRoZSBjb3JyaWRvciB3YXMgZHVnIGZyb20gbGVmdCB0byByaWdodC5cbiAgICAgICAqIDEsIDIgLSBwcm9ibGVtYXRpYyBjb3JuZXJzLCA/ID0gTisxdGggY2VsbCAobm90IGR1ZylcbiAgICAgICAqL1xuXG5cbiAgICAgIHZhciBmaXJzdENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggKyBueCwgdGhpcy5fZW5kWSArIGR5ICsgbnkpO1xuICAgICAgdmFyIHNlY29uZENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggLSBueCwgdGhpcy5fZW5kWSArIGR5IC0gbnkpO1xuICAgICAgdGhpcy5fZW5kc1dpdGhBV2FsbCA9IGlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcblxuICAgICAgaWYgKChmaXJzdENvcm5lckJhZCB8fCBzZWNvbmRDb3JuZXJCYWQpICYmIHRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoZGlnQ2FsbGJhY2spIHtcbiAgICAgIHZhciBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgIHZhciBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgIHZhciBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgIHZhciBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgIHZhciBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuXG4gICAgICBpZiAoZHgpIHtcbiAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5KSB7XG4gICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgdmFyIHkgPSBzeSArIGkgKiBkeTtcbiAgICAgICAgZGlnQ2FsbGJhY2soeCwgeSwgMCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNS5jcmVhdGVQcmlvcml0eVdhbGxzID0gZnVuY3Rpb24gY3JlYXRlUHJpb3JpdHlXYWxscyhwcmlvcml0eVdhbGxDYWxsYmFjaykge1xuICAgICAgaWYgKCF0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgdmFyIHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgdmFyIGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgdmFyIGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuXG4gICAgICBpZiAoZHgpIHtcbiAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5KSB7XG4gICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBueCA9IGR5O1xuICAgICAgdmFyIG55ID0gLWR4O1xuICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xuICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIG54LCB0aGlzLl9lbmRZICsgbnkpO1xuICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCAtIG54LCB0aGlzLl9lbmRZIC0gbnkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ29ycmlkb3I7XG4gIH0oRmVhdHVyZSk7XG4gIC8qKlxuICAgKiBAY2xhc3MgRHVuZ2VvbiBnZW5lcmF0b3Igd2hpY2ggdHJpZXMgdG8gZmlsbCB0aGUgc3BhY2UgZXZlbmx5LiBHZW5lcmF0ZXMgaW5kZXBlbmRlbnQgcm9vbXMgYW5kIHRyaWVzIHRvIGNvbm5lY3QgdGhlbS5cbiAgICogQGF1Z21lbnRzIFJPVC5NYXAuRHVuZ2VvblxuICAgKi9cblxuXG4gIHZhciBVbmlmb3JtID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0R1bmdlb24pIHtcbiAgICBfaW5oZXJpdHNMb29zZShVbmlmb3JtLCBfRHVuZ2Vvbik7XG5cbiAgICBmdW5jdGlvbiBVbmlmb3JtKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczEzO1xuXG4gICAgICBfdGhpczEzID0gX0R1bmdlb24uY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxMy5fb3B0aW9ucyA9IHtcbiAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgIHJvb21IZWlnaHQ6IFszLCA1XSxcbiAgICAgICAgcm9vbUR1Z1BlcmNlbnRhZ2U6IDAuMSxcbiAgICAgICAgdGltZUxpbWl0OiAxMDAwXG4gICAgICAgIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cblxuICAgICAgfTtcbiAgICAgIE9iamVjdC5hc3NpZ24oX3RoaXMxMy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICBfdGhpczEzLl9tYXAgPSBbXTtcbiAgICAgIF90aGlzMTMuX2R1ZyA9IDA7XG4gICAgICBfdGhpczEzLl9yb29tQXR0ZW1wdHMgPSAyMDtcbiAgICAgIC8qIG5ldyByb29tIGlzIGNyZWF0ZWQgTi10aW1lcyB1bnRpbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gZ2VuZXJhdGUgKi9cblxuICAgICAgX3RoaXMxMy5fY29ycmlkb3JBdHRlbXB0cyA9IDIwO1xuICAgICAgLyogY29ycmlkb3JzIGFyZSB0cmllZCBOLXRpbWVzIHVudGlsIHRoZSBsZXZlbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gY29ubmVjdCAqL1xuXG4gICAgICBfdGhpczEzLl9jb25uZWN0ZWQgPSBbXTtcbiAgICAgIC8qIGxpc3Qgb2YgYWxyZWFkeSBjb25uZWN0ZWQgcm9vbXMgKi9cblxuICAgICAgX3RoaXMxMy5fdW5jb25uZWN0ZWQgPSBbXTtcbiAgICAgIC8qIGxpc3Qgb2YgcmVtYWluaW5nIHVuY29ubmVjdGVkIHJvb21zICovXG5cbiAgICAgIF90aGlzMTMuX2RpZ0NhbGxiYWNrID0gX3RoaXMxMy5fZGlnQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxMykpKTtcbiAgICAgIF90aGlzMTMuX2NhbkJlRHVnQ2FsbGJhY2sgPSBfdGhpczEzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTMpKSk7XG4gICAgICBfdGhpczEzLl9pc1dhbGxDYWxsYmFjayA9IF90aGlzMTMuX2lzV2FsbENhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTMpKSk7XG4gICAgICByZXR1cm4gX3RoaXMxMztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbWFwLiBJZiB0aGUgdGltZSBsaW1pdCBoYXMgYmVlbiBoaXQsIHJldHVybnMgbnVsbC5cbiAgICAgKiBAc2VlIFJPVC5NYXAjY3JlYXRlXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8yNiA9IFVuaWZvcm0ucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjYuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuXG4gICAgICB3aGlsZSAoMSkge1xuICAgICAgICB2YXIgdDIgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvKiB0aW1lIGxpbWl0ISAqL1xuXG5cbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBbXTtcblxuICAgICAgICB0aGlzLl9nZW5lcmF0ZVJvb21zKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Jvb21zLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9nZW5lcmF0ZUNvcnJpZG9ycygpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc3VpdGFibGUgYW1vdW50IG9mIHJvb21zXG4gICAgICovXG5cblxuICAgIF9wcm90bzI2Ll9nZW5lcmF0ZVJvb21zID0gZnVuY3Rpb24gX2dlbmVyYXRlUm9vbXMoKSB7XG4gICAgICB2YXIgdyA9IHRoaXMuX3dpZHRoIC0gMjtcbiAgICAgIHZhciBoID0gdGhpcy5faGVpZ2h0IC0gMjtcbiAgICAgIHZhciByb29tO1xuXG4gICAgICBkbyB7XG4gICAgICAgIHJvb20gPSB0aGlzLl9nZW5lcmF0ZVJvb20oKTtcblxuICAgICAgICBpZiAodGhpcy5fZHVnIC8gKHcgKiBoKSA+IHRoaXMuX29wdGlvbnMucm9vbUR1Z1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvKiBhY2hpZXZlZCByZXF1ZXN0ZWQgYW1vdW50IG9mIGZyZWUgc3BhY2UgKi9cblxuICAgICAgfSB3aGlsZSAocm9vbSk7XG4gICAgICAvKiBlaXRoZXIgZW5vdWdoIHJvb21zLCBvciBub3QgYWJsZSB0byBnZW5lcmF0ZSBtb3JlIG9mIHRoZW0gOikgKi9cblxuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJ5IHRvIGdlbmVyYXRlIG9uZSByb29tXG4gICAgICovXG5cblxuICAgIF9wcm90bzI2Ll9nZW5lcmF0ZVJvb20gPSBmdW5jdGlvbiBfZ2VuZXJhdGVSb29tKCkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgd2hpbGUgKGNvdW50IDwgdGhpcy5fcm9vbUF0dGVtcHRzKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIHZhciByb29tID0gUm9vbS5jcmVhdGVSYW5kb20odGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCwgdGhpcy5fb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCFyb29tLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG5cbiAgICAgICAgdGhpcy5fcm9vbXMucHVzaChyb29tKTtcblxuICAgICAgICByZXR1cm4gcm9vbTtcbiAgICAgIH1cbiAgICAgIC8qIG5vIHJvb20gd2FzIGdlbmVyYXRlZCBpbiBhIGdpdmVuIG51bWJlciBvZiBhdHRlbXB0cyAqL1xuXG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGNvbm5lY3RvcnMgYmV3ZWVuIHJvb21zXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3MgV2FzIHRoaXMgYXR0ZW1wdCBzdWNjZXNzZnVsbD9cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjYuX2dlbmVyYXRlQ29ycmlkb3JzID0gZnVuY3Rpb24gX2dlbmVyYXRlQ29ycmlkb3JzKCkge1xuICAgICAgdmFyIGNudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjbnQgPCB0aGlzLl9jb3JyaWRvckF0dGVtcHRzKSB7XG4gICAgICAgIGNudCsrO1xuICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgICAgLyogZGlnIHJvb21zIGludG8gYSBjbGVhciBtYXAgKi9cblxuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gUk5HJDEuc2h1ZmZsZSh0aGlzLl9yb29tcy5zbGljZSgpKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHRoaXMuX3VuY29ubmVjdGVkLnBvcCgpKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBmaXJzdCBvbmUgaXMgYWx3YXlzIGNvbm5lY3RlZCAqL1xuXG5cbiAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAvKiAxLiBwaWNrIHJhbmRvbSBjb25uZWN0ZWQgcm9vbSAqL1xuICAgICAgICAgIHZhciBjb25uZWN0ZWQgPSBSTkckMS5nZXRJdGVtKHRoaXMuX2Nvbm5lY3RlZCk7XG5cbiAgICAgICAgICBpZiAoIWNvbm5lY3RlZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIDIuIGZpbmQgY2xvc2VzdCB1bmNvbm5lY3RlZCAqL1xuXG5cbiAgICAgICAgICB2YXIgcm9vbTEgPSB0aGlzLl9jbG9zZXN0Um9vbSh0aGlzLl91bmNvbm5lY3RlZCwgY29ubmVjdGVkKTtcblxuICAgICAgICAgIGlmICghcm9vbTEpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiAzLiBjb25uZWN0IGl0IHRvIGNsb3Nlc3QgY29ubmVjdGVkICovXG5cblxuICAgICAgICAgIHZhciByb29tMiA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX2Nvbm5lY3RlZCwgcm9vbTEpO1xuXG4gICAgICAgICAgaWYgKCFyb29tMikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIG9rID0gdGhpcy5fY29ubmVjdFJvb21zKHJvb20xLCByb29tMik7XG5cbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogc3RvcCBjb25uZWN0aW5nLCByZS1zaHVmZmxlICovXG5cblxuICAgICAgICAgIGlmICghdGhpcy5fdW5jb25uZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogZG9uZTsgbm8gcm9vbXMgcmVtYWluICovXG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZvciBhIGdpdmVuIHJvb20sIGZpbmQgdGhlIGNsb3Nlc3Qgb25lIGZyb20gdGhlIGxpc3RcbiAgICAgKi9cbiAgICBfcHJvdG8yNi5fY2xvc2VzdFJvb20gPSBmdW5jdGlvbiBfY2xvc2VzdFJvb20ocm9vbXMsIHJvb20pIHtcbiAgICAgIHZhciBkaXN0ID0gSW5maW5pdHk7XG4gICAgICB2YXIgY2VudGVyID0gcm9vbS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByID0gcm9vbXNbaV07XG4gICAgICAgIHZhciBjID0gci5nZXRDZW50ZXIoKTtcbiAgICAgICAgdmFyIGR4ID0gY1swXSAtIGNlbnRlclswXTtcbiAgICAgICAgdmFyIGR5ID0gY1sxXSAtIGNlbnRlclsxXTtcbiAgICAgICAgdmFyIGQgPSBkeCAqIGR4ICsgZHkgKiBkeTtcblxuICAgICAgICBpZiAoZCA8IGRpc3QpIHtcbiAgICAgICAgICBkaXN0ID0gZDtcbiAgICAgICAgICByZXN1bHQgPSByO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIF9wcm90bzI2Ll9jb25uZWN0Um9vbXMgPSBmdW5jdGlvbiBfY29ubmVjdFJvb21zKHJvb20xLCByb29tMikge1xuICAgICAgLypcbiAgICAgICAgICByb29tMS5kZWJ1ZygpO1xuICAgICAgICAgIHJvb20yLmRlYnVnKCk7XG4gICAgICAqL1xuICAgICAgdmFyIGNlbnRlcjEgPSByb29tMS5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBjZW50ZXIyID0gcm9vbTIuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgZGlmZlggPSBjZW50ZXIyWzBdIC0gY2VudGVyMVswXTtcbiAgICAgIHZhciBkaWZmWSA9IGNlbnRlcjJbMV0gLSBjZW50ZXIxWzFdO1xuICAgICAgdmFyIHN0YXJ0O1xuICAgICAgdmFyIGVuZDtcbiAgICAgIHZhciBkaXJJbmRleDEsIGRpckluZGV4MiwgbWluLCBtYXgsIGluZGV4O1xuXG4gICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpIDwgTWF0aC5hYnMoZGlmZlkpKSB7XG4gICAgICAgIC8qIGZpcnN0IHRyeSBjb25uZWN0aW5nIG5vcnRoLXNvdXRoIHdhbGxzICovXG4gICAgICAgIGRpckluZGV4MSA9IGRpZmZZID4gMCA/IDIgOiAwO1xuICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICBtaW4gPSByb29tMi5nZXRMZWZ0KCk7XG4gICAgICAgIG1heCA9IHJvb20yLmdldFJpZ2h0KCk7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGZpcnN0IHRyeSBjb25uZWN0aW5nIGVhc3Qtd2VzdCB3YWxscyAqL1xuICAgICAgICBkaXJJbmRleDEgPSBkaWZmWCA+IDAgPyAxIDogMztcbiAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcbiAgICAgICAgbWluID0gcm9vbTIuZ2V0VG9wKCk7XG4gICAgICAgIG1heCA9IHJvb20yLmdldEJvdHRvbSgpO1xuICAgICAgICBpbmRleCA9IDE7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTEsIGRpckluZGV4MSk7XG4gICAgICAvKiBjb3JyaWRvciB3aWxsIHN0YXJ0IGhlcmUgKi9cblxuICAgICAgaWYgKCFzdGFydCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFydFtpbmRleF0gPj0gbWluICYmIHN0YXJ0W2luZGV4XSA8PSBtYXgpIHtcbiAgICAgICAgLyogcG9zc2libGUgdG8gY29ubmVjdCB3aXRoIHN0cmFpZ2h0IGxpbmUgKEktbGlrZSkgKi9cbiAgICAgICAgZW5kID0gc3RhcnQuc2xpY2UoKTtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcblxuICAgICAgICBzd2l0Y2ggKGRpckluZGV4Mikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0VG9wKCkgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFJpZ2h0KCkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldEJvdHRvbSgpICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRMZWZ0KCkgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBlbmRbKGluZGV4ICsgMSkgJSAyXSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBlbmRdKTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhcnRbaW5kZXhdIDwgbWluIC0gMSB8fCBzdGFydFtpbmRleF0gPiBtYXggKyAxKSB7XG4gICAgICAgIC8qIG5lZWQgdG8gc3dpdGNoIHRhcmdldCB3YWxsIChMLWxpa2UpICovXG4gICAgICAgIHZhciBkaWZmID0gc3RhcnRbaW5kZXhdIC0gY2VudGVyMltpbmRleF07XG4gICAgICAgIHZhciByb3RhdGlvbiA9IDA7XG5cbiAgICAgICAgc3dpdGNoIChkaXJJbmRleDIpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcm90YXRpb24gPSBkaWZmIDwgMCA/IDMgOiAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcm90YXRpb24gPSBkaWZmIDwgMCA/IDEgOiAzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgyICsgcm90YXRpb24pICUgNDtcbiAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG5cbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWlkID0gWzAsIDBdO1xuICAgICAgICBtaWRbaW5kZXhdID0gc3RhcnRbaW5kZXhdO1xuICAgICAgICB2YXIgaW5kZXgyID0gKGluZGV4ICsgMSkgJSAyO1xuICAgICAgICBtaWRbaW5kZXgyXSA9IGVuZFtpbmRleDJdO1xuXG4gICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQsIGVuZF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogdXNlIGN1cnJlbnQgd2FsbCBwYWlyLCBidXQgYWRqdXN0IHRoZSBsaW5lIGluIHRoZSBtaWRkbGUgKFMtbGlrZSkgKi9cbiAgICAgICAgdmFyIF9pbmRleDQgPSAoaW5kZXggKyAxKSAlIDI7XG5cbiAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG5cbiAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX21pZCA9IE1hdGgucm91bmQoKGVuZFtfaW5kZXg0XSArIHN0YXJ0W19pbmRleDRdKSAvIDIpO1xuXG4gICAgICAgIHZhciBtaWQxID0gWzAsIDBdO1xuICAgICAgICB2YXIgbWlkMiA9IFswLCAwXTtcbiAgICAgICAgbWlkMVtpbmRleF0gPSBzdGFydFtpbmRleF07XG4gICAgICAgIG1pZDFbX2luZGV4NF0gPSBfbWlkO1xuICAgICAgICBtaWQyW2luZGV4XSA9IGVuZFtpbmRleF07XG4gICAgICAgIG1pZDJbX2luZGV4NF0gPSBfbWlkO1xuXG4gICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQxLCBtaWQyLCBlbmRdKTtcbiAgICAgIH1cblxuICAgICAgcm9vbTEuYWRkRG9vcihzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgcm9vbTIuYWRkRG9vcihlbmRbMF0sIGVuZFsxXSk7XG4gICAgICBpbmRleCA9IHRoaXMuX3VuY29ubmVjdGVkLmluZGV4T2Yocm9vbTEpO1xuXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMSk7XG4gICAgICB9XG5cbiAgICAgIGluZGV4ID0gdGhpcy5fdW5jb25uZWN0ZWQuaW5kZXhPZihyb29tMik7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHJvb20yKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9wcm90bzI2Ll9wbGFjZUluV2FsbCA9IGZ1bmN0aW9uIF9wbGFjZUluV2FsbChyb29tLCBkaXJJbmRleCkge1xuICAgICAgdmFyIHN0YXJ0ID0gWzAsIDBdO1xuICAgICAgdmFyIGRpciA9IFswLCAwXTtcbiAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICBzd2l0Y2ggKGRpckluZGV4KSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0VG9wKCkgLSAxXTtcbiAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGRpciA9IFswLCAxXTtcbiAgICAgICAgICBzdGFydCA9IFtyb29tLmdldFJpZ2h0KCkgKyAxLCByb29tLmdldFRvcCgpXTtcbiAgICAgICAgICBsZW5ndGggPSByb29tLmdldEJvdHRvbSgpIC0gcm9vbS5nZXRUb3AoKSArIDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRCb3R0b20oKSArIDFdO1xuICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpIC0gMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXZhaWwgPSBbXTtcbiAgICAgIHZhciBsYXN0QmFkSW5kZXggPSAtMjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgeCA9IHN0YXJ0WzBdICsgaSAqIGRpclswXTtcbiAgICAgICAgdmFyIHkgPSBzdGFydFsxXSArIGkgKiBkaXJbMV07XG4gICAgICAgIGF2YWlsLnB1c2gobnVsbCk7XG4gICAgICAgIHZhciBpc1dhbGwgPSB0aGlzLl9tYXBbeF1beV0gPT0gMTtcblxuICAgICAgICBpZiAoaXNXYWxsKSB7XG4gICAgICAgICAgaWYgKGxhc3RCYWRJbmRleCAhPSBpIC0gMSkge1xuICAgICAgICAgICAgYXZhaWxbaV0gPSBbeCwgeV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3RCYWRJbmRleCA9IGk7XG5cbiAgICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgYXZhaWxbaSAtIDFdID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k0ID0gYXZhaWwubGVuZ3RoIC0gMTsgX2k0ID49IDA7IF9pNC0tKSB7XG4gICAgICAgIGlmICghYXZhaWxbX2k0XSkge1xuICAgICAgICAgIGF2YWlsLnNwbGljZShfaTQsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdmFpbC5sZW5ndGggPyBSTkckMS5nZXRJdGVtKGF2YWlsKSA6IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEaWcgYSBwb2x5bGluZS5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjYuX2RpZ0xpbmUgPSBmdW5jdGlvbiBfZGlnTGluZShwb2ludHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHBvaW50c1tpIC0gMV07XG4gICAgICAgIHZhciBlbmQgPSBwb2ludHNbaV07XG4gICAgICAgIHZhciBjb3JyaWRvciA9IG5ldyBDb3JyaWRvcihzdGFydFswXSwgc3RhcnRbMV0sIGVuZFswXSwgZW5kWzFdKTtcbiAgICAgICAgY29ycmlkb3IuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcblxuICAgICAgICB0aGlzLl9jb3JyaWRvcnMucHVzaChjb3JyaWRvcik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI2Ll9kaWdDYWxsYmFjayA9IGZ1bmN0aW9uIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7XG5cbiAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuX2R1ZysrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNi5faXNXYWxsQ2FsbGJhY2sgPSBmdW5jdGlvbiBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbWFwW3hdW3ldID09IDE7XG4gICAgfTtcblxuICAgIF9wcm90bzI2Ll9jYW5CZUR1Z0NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbkJlRHVnQ2FsbGJhY2soeCwgeSkge1xuICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9tYXBbeF1beV0gPT0gMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVuaWZvcm07XG4gIH0oRHVuZ2Vvbik7XG4gIC8qKlxuICAgKiBAY2xhc3MgQ2VsbHVsYXIgYXV0b21hdG9uIG1hcCBnZW5lcmF0b3JcbiAgICogQGF1Z21lbnRzIFJPVC5NYXBcbiAgICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAgICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIE9wdGlvbnNcbiAgICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuYm9ybl0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGEgbmV3IGNlbGwgdG8gYmUgYm9ybiBpbiBlbXB0eSBzcGFjZVxuICAgKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5zdXJ2aXZlXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYW4gZXhpc3RpbmcgIGNlbGwgdG8gc3Vydml2ZVxuICAgKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3ldIFRvcG9sb2d5IDQgb3IgNiBvciA4XG4gICAqL1xuXG5cbiAgdmFyIENlbGx1bGFyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDZWxsdWxhciwgX01hcDMpO1xuXG4gICAgZnVuY3Rpb24gQ2VsbHVsYXIod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMTQ7XG5cbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBfdGhpczE0ID0gX01hcDMuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxNC5fb3B0aW9ucyA9IHtcbiAgICAgICAgYm9ybjogWzUsIDYsIDcsIDhdLFxuICAgICAgICBzdXJ2aXZlOiBbNCwgNSwgNiwgNywgOF0sXG4gICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICB9O1xuXG4gICAgICBfdGhpczE0LnNldE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgIF90aGlzMTQuX2RpcnMgPSBESVJTW190aGlzMTQuX29wdGlvbnMudG9wb2xvZ3ldO1xuICAgICAgX3RoaXMxNC5fbWFwID0gX3RoaXMxNC5fZmlsbE1hcCgwKTtcbiAgICAgIHJldHVybiBfdGhpczE0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaWxsIHRoZSBtYXAgd2l0aCByYW5kb20gdmFsdWVzXG4gICAgICogQHBhcmFtIHtmbG9hdH0gcHJvYmFiaWxpdHkgUHJvYmFiaWxpdHkgZm9yIGEgY2VsbCB0byBiZWNvbWUgYWxpdmU7IDAgPSBhbGwgZW1wdHksIDEgPSBhbGwgZnVsbFxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMjcgPSBDZWxsdWxhci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yNy5yYW5kb21pemUgPSBmdW5jdGlvbiByYW5kb21pemUocHJvYmFiaWxpdHkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgdGhpcy5fbWFwW2ldW2pdID0gUk5HJDEuZ2V0VW5pZm9ybSgpIDwgcHJvYmFiaWxpdHkgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoYW5nZSBvcHRpb25zLlxuICAgICAqIEBzZWUgUk9ULk1hcC5DZWxsdWxhclxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNy5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5zZXQgPSBmdW5jdGlvbiBzZXQoeCwgeSwgdmFsdWUpIHtcbiAgICAgIHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciBuZXdNYXAgPSB0aGlzLl9maWxsTWFwKDApO1xuXG4gICAgICB2YXIgYm9ybiA9IHRoaXMuX29wdGlvbnMuYm9ybjtcbiAgICAgIHZhciBzdXJ2aXZlID0gdGhpcy5fb3B0aW9ucy5zdXJ2aXZlO1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgIHZhciB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICB2YXIgd2lkdGhTdGFydCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgd2lkdGhTdGFydCA9IGogJSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHdpZHRoU3RhcnQ7IGkgPCB0aGlzLl93aWR0aDsgaSArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICB2YXIgY3VyID0gdGhpcy5fbWFwW2ldW2pdO1xuXG4gICAgICAgICAgdmFyIG5jb3VudCA9IHRoaXMuX2dldE5laWdoYm9ycyhpLCBqKTtcblxuICAgICAgICAgIGlmIChjdXIgJiYgc3Vydml2ZS5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIC8qIHN1cnZpdmUgKi9cbiAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgfSBlbHNlIGlmICghY3VyICYmIGJvcm4uaW5kZXhPZihuY291bnQpICE9IC0xKSB7XG4gICAgICAgICAgICAvKiBib3JuICovXG4gICAgICAgICAgICBuZXdNYXBbaV1bal0gPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICBjYWxsYmFjayAmJiB0aGlzLl9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fc2VydmljZUNhbGxiYWNrID0gZnVuY3Rpb24gX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICB2YXIgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgdmFyIHdpZHRoU3RhcnQgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgIHdpZHRoU3RhcnQgPSBqICUgMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSB3aWR0aFN0YXJ0OyBpIDwgdGhpcy5fd2lkdGg7IGkgKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG5laWdoYm9yIGNvdW50IGF0IFtpLGpdIGluIHRoaXMuX21hcFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNy5fZ2V0TmVpZ2hib3JzID0gZnVuY3Rpb24gX2dldE5laWdoYm9ycyhjeCwgY3kpIHtcbiAgICAgIHZhciByZXN1bHQgPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgIHZhciB4ID0gY3ggKyBkaXJbMF07XG4gICAgICAgIHZhciB5ID0gY3kgKyBkaXJbMV07XG5cbiAgICAgICAgaWYgKHggPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA8IDAgfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCArPSB0aGlzLl9tYXBbeF1beV0gPT0gMSA/IDEgOiAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTWFrZSBzdXJlIGV2ZXJ5IG5vbi13YWxsIHNwYWNlIGlzIGFjY2Vzc2libGUuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgdG8gY2FsbCB0byBkaXNwbGF5IG1hcCB3aGVuIGRvXG4gICAgICogQHBhcmFtIHtpbnR9IHZhbHVlIHRvIGNvbnNpZGVyIGVtcHR5IHNwYWNlIC0gZGVmYXVsdHMgdG8gMFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgd2hlbiBhIG5ldyBjb25uZWN0aW9uIGlzIG1hZGVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjcuY29ubmVjdCA9IGZ1bmN0aW9uIGNvbm5lY3QoY2FsbGJhY2ssIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgIGlmICghdmFsdWUpIHZhbHVlID0gMDtcbiAgICAgIHZhciBhbGxGcmVlU3BhY2UgPSBbXTtcbiAgICAgIHZhciBub3RDb25uZWN0ZWQgPSB7fTsgLy8gZmluZCBhbGwgZnJlZSBzcGFjZVxuXG4gICAgICB2YXIgd2lkdGhTdGVwID0gMTtcbiAgICAgIHZhciB3aWR0aFN0YXJ0cyA9IFswLCAwXTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICB3aWR0aFN0YXJ0cyA9IFswLCAxXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLl9oZWlnaHQ7IHkrKykge1xuICAgICAgICBmb3IgKHZhciB4ID0gd2lkdGhTdGFydHNbeSAlIDJdOyB4IDwgdGhpcy5fd2lkdGg7IHggKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2ZyZWVTcGFjZSh4LCB5LCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBwID0gW3gsIHldO1xuICAgICAgICAgICAgbm90Q29ubmVjdGVkW3RoaXMuX3BvaW50S2V5KHApXSA9IHA7XG4gICAgICAgICAgICBhbGxGcmVlU3BhY2UucHVzaChbeCwgeV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc3RhcnQgPSBhbGxGcmVlU3BhY2VbUk5HJDEuZ2V0VW5pZm9ybUludCgwLCBhbGxGcmVlU3BhY2UubGVuZ3RoIC0gMSldO1xuXG4gICAgICB2YXIga2V5ID0gdGhpcy5fcG9pbnRLZXkoc3RhcnQpO1xuXG4gICAgICB2YXIgY29ubmVjdGVkID0ge307XG4gICAgICBjb25uZWN0ZWRba2V5XSA9IHN0YXJ0O1xuICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldOyAvLyBmaW5kIHdoYXQncyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG5cbiAgICAgIHRoaXMuX2ZpbmRDb25uZWN0ZWQoY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIFtzdGFydF0sIGZhbHNlLCB2YWx1ZSk7XG5cbiAgICAgIHdoaWxlIChPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gZmluZCB0d28gcG9pbnRzIGZyb20gbm90Q29ubmVjdGVkIHRvIGNvbm5lY3RlZFxuICAgICAgICB2YXIgX3AgPSB0aGlzLl9nZXRGcm9tVG8oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQpO1xuXG4gICAgICAgIHZhciBmcm9tID0gX3BbMF07IC8vIG5vdENvbm5lY3RlZFxuXG4gICAgICAgIHZhciB0byA9IF9wWzFdOyAvLyBjb25uZWN0ZWRcbiAgICAgICAgLy8gZmluZCBldmVyeXRoaW5nIGNvbm5lY3RlZCB0byB0aGUgc3RhcnRpbmcgcG9pbnRcblxuICAgICAgICB2YXIgbG9jYWwgPSB7fTtcbiAgICAgICAgbG9jYWxbdGhpcy5fcG9pbnRLZXkoZnJvbSldID0gZnJvbTtcblxuICAgICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGxvY2FsLCBub3RDb25uZWN0ZWQsIFtmcm9tXSwgdHJ1ZSwgdmFsdWUpOyAvLyBjb25uZWN0IHRvIGEgY29ubmVjdGVkIGNlbGxcblxuXG4gICAgICAgIHZhciB0dW5uZWxGbiA9IHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNiA/IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkNiA6IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkO1xuICAgICAgICB0dW5uZWxGbi5jYWxsKHRoaXMsIHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjayk7IC8vIG5vdyBhbGwgb2YgbG9jYWwgaXMgY29ubmVjdGVkXG5cbiAgICAgICAgZm9yICh2YXIgayBpbiBsb2NhbCkge1xuICAgICAgICAgIHZhciBwcCA9IGxvY2FsW2tdO1xuICAgICAgICAgIHRoaXMuX21hcFtwcFswXV1bcHBbMV1dID0gdmFsdWU7XG4gICAgICAgICAgY29ubmVjdGVkW2tdID0gcHA7XG4gICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiB0aGlzLl9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmluZCByYW5kb20gcG9pbnRzIHRvIGNvbm5lY3QuIFNlYXJjaCBmb3IgdGhlIGNsb3Nlc3QgcG9pbnQgaW4gdGhlIGxhcmdlciBzcGFjZS5cbiAgICAgKiBUaGlzIGlzIHRvIG1pbmltaXplIHRoZSBsZW5ndGggb2YgdGhlIHBhc3NhZ2Ugd2hpbGUgbWFpbnRhaW5pbmcgZ29vZCBwZXJmb3JtYW5jZS5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjcuX2dldEZyb21UbyA9IGZ1bmN0aW9uIF9nZXRGcm9tVG8oY29ubmVjdGVkLCBub3RDb25uZWN0ZWQpIHtcbiAgICAgIHZhciBmcm9tID0gWzAsIDBdLFxuICAgICAgICAgIHRvID0gWzAsIDBdLFxuICAgICAgICAgIGQ7XG4gICAgICB2YXIgY29ubmVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGNvbm5lY3RlZCk7XG4gICAgICB2YXIgbm90Q29ubmVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGlmIChjb25uZWN0ZWRLZXlzLmxlbmd0aCA8IG5vdENvbm5lY3RlZEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGtleXMgPSBjb25uZWN0ZWRLZXlzO1xuICAgICAgICAgIHRvID0gY29ubmVjdGVkW2tleXNbUk5HJDEuZ2V0VW5pZm9ybUludCgwLCBrZXlzLmxlbmd0aCAtIDEpXV07XG4gICAgICAgICAgZnJvbSA9IHRoaXMuX2dldENsb3Nlc3QodG8sIG5vdENvbm5lY3RlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIF9rZXlzID0gbm90Q29ubmVjdGVkS2V5cztcbiAgICAgICAgICBmcm9tID0gbm90Q29ubmVjdGVkW19rZXlzW1JORyQxLmdldFVuaWZvcm1JbnQoMCwgX2tleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICB0byA9IHRoaXMuX2dldENsb3Nlc3QoZnJvbSwgY29ubmVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGQgPSAoZnJvbVswXSAtIHRvWzBdKSAqIChmcm9tWzBdIC0gdG9bMF0pICsgKGZyb21bMV0gLSB0b1sxXSkgKiAoZnJvbVsxXSAtIHRvWzFdKTtcblxuICAgICAgICBpZiAoZCA8IDY0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gY29uc29sZS5sb2coXCI+Pj4gY29ubmVjdGVkPVwiICsgdG8gKyBcIiBub3RDb25uZWN0ZWQ9XCIgKyBmcm9tICsgXCIgZGlzdD1cIiArIGQpO1xuXG5cbiAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fZ2V0Q2xvc2VzdCA9IGZ1bmN0aW9uIF9nZXRDbG9zZXN0KHBvaW50LCBzcGFjZSkge1xuICAgICAgdmFyIG1pblBvaW50ID0gbnVsbDtcbiAgICAgIHZhciBtaW5EaXN0ID0gbnVsbDtcblxuICAgICAgZm9yICh2YXIgayBpbiBzcGFjZSkge1xuICAgICAgICB2YXIgcCA9IHNwYWNlW2tdO1xuICAgICAgICB2YXIgZCA9IChwWzBdIC0gcG9pbnRbMF0pICogKHBbMF0gLSBwb2ludFswXSkgKyAocFsxXSAtIHBvaW50WzFdKSAqIChwWzFdIC0gcG9pbnRbMV0pO1xuXG4gICAgICAgIGlmIChtaW5EaXN0ID09IG51bGwgfHwgZCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICBtaW5Qb2ludCA9IHA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1pblBvaW50O1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fZmluZENvbm5lY3RlZCA9IGZ1bmN0aW9uIF9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBzdGFjaywga2VlcE5vdENvbm5lY3RlZCwgdmFsdWUpIHtcbiAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBwID0gc3RhY2suc3BsaWNlKDAsIDEpWzBdO1xuICAgICAgICB2YXIgdGVzdHMgPSB2b2lkIDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgIHRlc3RzID0gW1twWzBdICsgMiwgcFsxXV0sIFtwWzBdICsgMSwgcFsxXSAtIDFdLCBbcFswXSAtIDEsIHBbMV0gLSAxXSwgW3BbMF0gLSAyLCBwWzFdXSwgW3BbMF0gLSAxLCBwWzFdICsgMV0sIFtwWzBdICsgMSwgcFsxXSArIDFdXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXN0cyA9IFtbcFswXSArIDEsIHBbMV1dLCBbcFswXSAtIDEsIHBbMV1dLCBbcFswXSwgcFsxXSArIDFdLCBbcFswXSwgcFsxXSAtIDFdXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fcG9pbnRLZXkodGVzdHNbaV0pO1xuXG4gICAgICAgICAgaWYgKGNvbm5lY3RlZFtrZXldID09IG51bGwgJiYgdGhpcy5fZnJlZVNwYWNlKHRlc3RzW2ldWzBdLCB0ZXN0c1tpXVsxXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICBjb25uZWN0ZWRba2V5XSA9IHRlc3RzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIWtlZXBOb3RDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGFjay5wdXNoKHRlc3RzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX3R1bm5lbFRvQ29ubmVjdGVkID0gZnVuY3Rpb24gX3R1bm5lbFRvQ29ubmVjdGVkKHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgdmFyIGEsIGI7XG5cbiAgICAgIGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcbiAgICAgICAgYSA9IGZyb207XG4gICAgICAgIGIgPSB0bztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSB0bztcbiAgICAgICAgYiA9IGZyb207XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIHh4ID0gYVswXTsgeHggPD0gYlswXTsgeHgrKykge1xuICAgICAgICB0aGlzLl9tYXBbeHhdW2FbMV1dID0gdmFsdWU7XG4gICAgICAgIHZhciBwID0gW3h4LCBhWzFdXTtcblxuICAgICAgICB2YXIgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuXG4gICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVswXSA8IGJbMF0pIHtcbiAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKGEsIFtiWzBdLCBhWzFdXSk7XG4gICAgICB9IC8vIHggaXMgbm93IGZpeGVkXG5cblxuICAgICAgdmFyIHggPSBiWzBdO1xuXG4gICAgICBpZiAoZnJvbVsxXSA8IHRvWzFdKSB7XG4gICAgICAgIGEgPSBmcm9tO1xuICAgICAgICBiID0gdG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhID0gdG87XG4gICAgICAgIGIgPSBmcm9tO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciB5eSA9IGFbMV07IHl5IDwgYlsxXTsgeXkrKykge1xuICAgICAgICB0aGlzLl9tYXBbeF1beXldID0gdmFsdWU7XG4gICAgICAgIHZhciBfcDIgPSBbeCwgeXldO1xuXG4gICAgICAgIHZhciBfcGtleSA9IHRoaXMuX3BvaW50S2V5KF9wMik7XG5cbiAgICAgICAgY29ubmVjdGVkW19wa2V5XSA9IF9wMjtcbiAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtfcGtleV07XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVsxXSA8IGJbMV0pIHtcbiAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKFtiWzBdLCBhWzFdXSwgW2JbMF0sIGJbMV1dKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX3R1bm5lbFRvQ29ubmVjdGVkNiA9IGZ1bmN0aW9uIF90dW5uZWxUb0Nvbm5lY3RlZDYodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICB2YXIgYSwgYjtcblxuICAgICAgaWYgKGZyb21bMF0gPCB0b1swXSkge1xuICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgYiA9IHRvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IHRvO1xuICAgICAgICBiID0gZnJvbTtcbiAgICAgIH0gLy8gdHVubmVsIGRpYWdvbmFsbHkgdW50aWwgaG9yaXpvbnRhbGx5IGxldmVsXG5cblxuICAgICAgdmFyIHh4ID0gYVswXTtcbiAgICAgIHZhciB5eSA9IGFbMV07XG5cbiAgICAgIHdoaWxlICghKHh4ID09IGJbMF0gJiYgeXkgPT0gYlsxXSkpIHtcbiAgICAgICAgdmFyIHN0ZXBXaWR0aCA9IDI7XG5cbiAgICAgICAgaWYgKHl5IDwgYlsxXSkge1xuICAgICAgICAgIHl5Kys7XG4gICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh5eSA+IGJbMV0pIHtcbiAgICAgICAgICB5eS0tO1xuICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeHggPCBiWzBdKSB7XG4gICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKHh4ID4gYlswXSkge1xuICAgICAgICAgIHh4IC09IHN0ZXBXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChiWzFdICUgMikge1xuICAgICAgICAgIC8vIFdvbid0IHN0ZXAgb3V0c2lkZSBtYXAgaWYgZGVzdGluYXRpb24gb24gaXMgbWFwJ3MgcmlnaHQgZWRnZVxuICAgICAgICAgIHh4IC09IHN0ZXBXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXR0byBmb3IgbGVmdCBlZGdlXG4gICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFwW3h4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgdmFyIHAgPSBbeHgsIHl5XTtcblxuICAgICAgICB2YXIgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuXG4gICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKGZyb20sIHRvKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX2ZyZWVTcGFjZSA9IGZ1bmN0aW9uIF9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuX3dpZHRoICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5faGVpZ2h0ICYmIHRoaXMuX21hcFt4XVt5XSA9PSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX3BvaW50S2V5ID0gZnVuY3Rpb24gX3BvaW50S2V5KHApIHtcbiAgICAgIHJldHVybiBwWzBdICsgXCIuXCIgKyBwWzFdO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2VsbHVsYXI7XG4gIH0oTWFwKTtcblxuICB2YXIgRkVBVFVSRVMgPSB7XG4gICAgXCJyb29tXCI6IFJvb20sXG4gICAgXCJjb3JyaWRvclwiOiBDb3JyaWRvclxuICB9O1xuICAvKipcbiAgICogUmFuZG9tIGR1bmdlb24gZ2VuZXJhdG9yIHVzaW5nIGh1bWFuLWxpa2UgZGlnZ2luZyBwYXR0ZXJucy5cbiAgICogSGVhdmlseSBiYXNlZCBvbiBNaWtlIEFuZGVyc29uJ3MgaWRlYXMgZnJvbSB0aGUgXCJUeXJhbnRcIiBhbGdvLCBtZW50aW9uZWQgYXRcbiAgICogaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9RHVuZ2Vvbi1CdWlsZGluZ19BbGdvcml0aG0uXG4gICAqL1xuXG4gIHZhciBEaWdnZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRHVuZ2VvbjIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShEaWdnZXIsIF9EdW5nZW9uMik7XG5cbiAgICBmdW5jdGlvbiBEaWdnZXIod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMTU7XG5cbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBfdGhpczE1ID0gX0R1bmdlb24yLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTUuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgIHJvb21IZWlnaHQ6IFszLCA1XSxcbiAgICAgICAgY29ycmlkb3JMZW5ndGg6IFszLCAxMF0sXG4gICAgICAgIGR1Z1BlcmNlbnRhZ2U6IDAuMixcbiAgICAgICAgdGltZUxpbWl0OiAxMDAwXG4gICAgICAgIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cblxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICBfdGhpczE1Ll9mZWF0dXJlcyA9IHtcbiAgICAgICAgXCJyb29tXCI6IDQsXG4gICAgICAgIFwiY29ycmlkb3JcIjogNFxuICAgICAgfTtcbiAgICAgIF90aGlzMTUuX21hcCA9IFtdO1xuICAgICAgX3RoaXMxNS5fZmVhdHVyZUF0dGVtcHRzID0gMjA7XG4gICAgICAvKiBob3cgbWFueSB0aW1lcyBkbyB3ZSB0cnkgdG8gY3JlYXRlIGEgZmVhdHVyZSBvbiBhIHN1aXRhYmxlIHdhbGwgKi9cblxuICAgICAgX3RoaXMxNS5fd2FsbHMgPSB7fTtcbiAgICAgIC8qIHRoZXNlIGFyZSBhdmFpbGFibGUgZm9yIGRpZ2dpbmcgKi9cblxuICAgICAgX3RoaXMxNS5fZHVnID0gMDtcbiAgICAgIF90aGlzMTUuX2RpZ0NhbGxiYWNrID0gX3RoaXMxNS5fZGlnQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxNSkpKTtcbiAgICAgIF90aGlzMTUuX2NhbkJlRHVnQ2FsbGJhY2sgPSBfdGhpczE1Ll9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTUpKSk7XG4gICAgICBfdGhpczE1Ll9pc1dhbGxDYWxsYmFjayA9IF90aGlzMTUuX2lzV2FsbENhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTUpKSk7XG4gICAgICBfdGhpczE1Ll9wcmlvcml0eVdhbGxDYWxsYmFjayA9IF90aGlzMTUuX3ByaW9yaXR5V2FsbENhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTUpKSk7XG4gICAgICByZXR1cm4gX3RoaXMxNTtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMjggPSBEaWdnZXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjguY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgdGhpcy5fd2FsbHMgPSB7fTtcbiAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICB2YXIgYXJlYSA9ICh0aGlzLl93aWR0aCAtIDIpICogKHRoaXMuX2hlaWdodCAtIDIpO1xuXG4gICAgICB0aGlzLl9maXJzdFJvb20oKTtcblxuICAgICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICAgIHZhciBwcmlvcml0eVdhbGxzO1xuXG4gICAgICBkbyB7XG4gICAgICAgIHByaW9yaXR5V2FsbHMgPSAwO1xuICAgICAgICB2YXIgdDIgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvKiBmaW5kIGEgZ29vZCB3YWxsICovXG5cblxuICAgICAgICB2YXIgd2FsbCA9IHRoaXMuX2ZpbmRXYWxsKCk7XG5cbiAgICAgICAgaWYgKCF3YWxsKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyogbm8gbW9yZSB3YWxscyAqL1xuXG5cbiAgICAgICAgdmFyIHBhcnRzID0gd2FsbC5zcGxpdChcIixcIik7XG4gICAgICAgIHZhciB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcblxuICAgICAgICB2YXIgZGlyID0gdGhpcy5fZ2V0RGlnZ2luZ0RpcmVjdGlvbih4LCB5KTtcblxuICAgICAgICBpZiAoIWRpcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIHRoaXMgd2FsbCBpcyBub3Qgc3VpdGFibGUgKi9cbiAgICAgICAgLy9cdFx0Y29uc29sZS5sb2coXCJ3YWxsXCIsIHgsIHkpO1xuXG4gICAgICAgIC8qIHRyeSBhZGRpbmcgYSBmZWF0dXJlICovXG5cblxuICAgICAgICB2YXIgZmVhdHVyZUF0dGVtcHRzID0gMDtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgZmVhdHVyZUF0dGVtcHRzKys7XG5cbiAgICAgICAgICBpZiAodGhpcy5fdHJ5RmVhdHVyZSh4LCB5LCBkaXJbMF0sIGRpclsxXSkpIHtcbiAgICAgICAgICAgIC8qIGZlYXR1cmUgYWRkZWQgKi9cbiAgICAgICAgICAgIC8vaWYgKHRoaXMuX3Jvb21zLmxlbmd0aCArIHRoaXMuX2NvcnJpZG9ycy5sZW5ndGggPT0gMikgeyB0aGlzLl9yb29tc1swXS5hZGREb29yKHgsIHkpOyB9IC8qIGZpcnN0IHJvb20gb2ZpY2lhbGx5IGhhcyBkb29ycyAqL1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4LCB5KTtcblxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4IC0gZGlyWzBdLCB5IC0gZGlyWzFdKTtcblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChmZWF0dXJlQXR0ZW1wdHMgPCB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMpO1xuXG4gICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMuX3dhbGxzKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3dhbGxzW2lkXSA+IDEpIHtcbiAgICAgICAgICAgIHByaW9yaXR5V2FsbHMrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gd2hpbGUgKHRoaXMuX2R1ZyAvIGFyZWEgPCB0aGlzLl9vcHRpb25zLmR1Z1BlcmNlbnRhZ2UgfHwgcHJpb3JpdHlXYWxscyk7XG4gICAgICAvKiBmaXhtZSBudW1iZXIgb2YgcHJpb3JpdHkgd2FsbHMgKi9cblxuXG4gICAgICB0aGlzLl9hZGREb29ycygpO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fd2FsbHMgPSB7fTtcbiAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9kaWdDYWxsYmFjayA9IGZ1bmN0aW9uIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09IDAgfHwgdmFsdWUgPT0gMikge1xuICAgICAgICAvKiBlbXB0eSAqL1xuICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSAwO1xuICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIHdhbGwgKi9cbiAgICAgICAgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yOC5faXNXYWxsQ2FsbGJhY2sgPSBmdW5jdGlvbiBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gdGhpcy5fd2lkdGggfHwgeSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbWFwW3hdW3ldID09IDE7XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9jYW5CZUR1Z0NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbkJlRHVnQ2FsbGJhY2soeCwgeSkge1xuICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9tYXBbeF1beV0gPT0gMTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX3ByaW9yaXR5V2FsbENhbGxiYWNrID0gZnVuY3Rpb24gX3ByaW9yaXR5V2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldID0gMjtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX2ZpcnN0Um9vbSA9IGZ1bmN0aW9uIF9maXJzdFJvb20oKSB7XG4gICAgICB2YXIgY3ggPSBNYXRoLmZsb29yKHRoaXMuX3dpZHRoIC8gMik7XG4gICAgICB2YXIgY3kgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIDIpO1xuICAgICAgdmFyIHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbUNlbnRlcihjeCwgY3ksIHRoaXMuX29wdGlvbnMpO1xuXG4gICAgICB0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xuXG4gICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYSBzdWl0YWJsZSB3YWxsXG4gICAgICovXG5cblxuICAgIF9wcm90bzI4Ll9maW5kV2FsbCA9IGZ1bmN0aW9uIF9maW5kV2FsbCgpIHtcbiAgICAgIHZhciBwcmlvMSA9IFtdO1xuICAgICAgdmFyIHByaW8yID0gW107XG5cbiAgICAgIGZvciAodmFyIF9pZDIgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgdmFyIHByaW8gPSB0aGlzLl93YWxsc1tfaWQyXTtcblxuICAgICAgICBpZiAocHJpbyA9PSAyKSB7XG4gICAgICAgICAgcHJpbzIucHVzaChfaWQyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmlvMS5wdXNoKF9pZDIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBhcnIgPSBwcmlvMi5sZW5ndGggPyBwcmlvMiA6IHByaW8xO1xuXG4gICAgICBpZiAoIWFyci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAvKiBubyB3YWxscyA6LyAqL1xuXG5cbiAgICAgIHZhciBpZCA9IFJORyQxLmdldEl0ZW0oYXJyLnNvcnQoKSk7IC8vIHNvcnQgdG8gbWFrZSB0aGUgb3JkZXIgZGV0ZXJtaW5pc3RpY1xuXG4gICAgICBkZWxldGUgdGhpcy5fd2FsbHNbaWRdO1xuICAgICAgcmV0dXJuIGlkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpZXMgYWRkaW5nIGEgZmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtib29sfSB3YXMgdGhpcyBhIHN1Y2Nlc3NmdWwgdHJ5P1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yOC5fdHJ5RmVhdHVyZSA9IGZ1bmN0aW9uIF90cnlGZWF0dXJlKHgsIHksIGR4LCBkeSkge1xuICAgICAgdmFyIGZlYXR1cmVOYW1lID0gUk5HJDEuZ2V0V2VpZ2h0ZWRWYWx1ZSh0aGlzLl9mZWF0dXJlcyk7XG4gICAgICB2YXIgY3RvciA9IEZFQVRVUkVTW2ZlYXR1cmVOYW1lXTtcbiAgICAgIHZhciBmZWF0dXJlID0gY3Rvci5jcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIHRoaXMuX29wdGlvbnMpO1xuXG4gICAgICBpZiAoIWZlYXR1cmUuaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgLy9cdFx0Y29uc29sZS5sb2coXCJub3QgdmFsaWRcIik7XG4gICAgICAgIC8vXHRcdGZlYXR1cmUuZGVidWcoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBmZWF0dXJlLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7IC8vXHRmZWF0dXJlLmRlYnVnKCk7XG5cbiAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgUm9vbSkge1xuICAgICAgICB0aGlzLl9yb29tcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIENvcnJpZG9yKSB7XG4gICAgICAgIGZlYXR1cmUuY3JlYXRlUHJpb3JpdHlXYWxscyh0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjayk7XG5cbiAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goZmVhdHVyZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBfcHJvdG8yOC5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyA9IGZ1bmN0aW9uIF9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKGN4LCBjeSkge1xuICAgICAgdmFyIGRlbHRhcyA9IERJUlNbNF07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgdmFyIHggPSBjeCArIGRlbHRhWzBdO1xuICAgICAgICB2YXIgeSA9IGN5ICsgZGVsdGFbMV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgICAgeCA9IGN4ICsgMiAqIGRlbHRhWzBdO1xuICAgICAgICB5ID0gY3kgKyAyICogZGVsdGFbMV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdmVjdG9yIGluIFwiZGlnZ2luZ1wiIGRpcmVjdGlvbiwgb3IgZmFsc2UsIGlmIHRoaXMgZG9lcyBub3QgZXhpc3QgKG9yIGlzIG5vdCB1bmlxdWUpXG4gICAgICovXG5cblxuICAgIF9wcm90bzI4Ll9nZXREaWdnaW5nRGlyZWN0aW9uID0gZnVuY3Rpb24gX2dldERpZ2dpbmdEaXJlY3Rpb24oY3gsIGN5KSB7XG4gICAgICBpZiAoY3ggPD0gMCB8fCBjeSA8PSAwIHx8IGN4ID49IHRoaXMuX3dpZHRoIC0gMSB8fCBjeSA+PSB0aGlzLl9oZWlnaHQgLSAxKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgIHZhciBkZWx0YXMgPSBESVJTWzRdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVsdGEgPSBkZWx0YXNbaV07XG4gICAgICAgIHZhciB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgdmFyIHkgPSBjeSArIGRlbHRhWzFdO1xuXG4gICAgICAgIGlmICghdGhpcy5fbWFwW3hdW3ldKSB7XG4gICAgICAgICAgLyogdGhlcmUgYWxyZWFkeSBpcyBhbm90aGVyIGVtcHR5IG5laWdoYm9yISAqL1xuICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc3VsdCA9IGRlbHRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBubyBlbXB0eSBuZWlnaGJvciAqL1xuXG5cbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gWy1yZXN1bHRbMF0sIC1yZXN1bHRbMV1dO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmluZCBlbXB0eSBzcGFjZXMgc3Vycm91bmRpbmcgcm9vbXMsIGFuZCBhcHBseSBkb29ycy5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjguX2FkZERvb3JzID0gZnVuY3Rpb24gX2FkZERvb3JzKCkge1xuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9tYXA7XG5cbiAgICAgIGZ1bmN0aW9uIGlzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFbeF1beV0gPT0gMTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICByb29tLmNsZWFyRG9vcnMoKTtcbiAgICAgICAgcm9vbS5hZGREb29ycyhpc1dhbGxDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEaWdnZXI7XG4gIH0oRHVuZ2Vvbik7XG4gIC8qKlxuICAgKiBKb2luIGxpc3RzIHdpdGggXCJpXCIgYW5kIFwiaSsxXCJcbiAgICovXG5cblxuICBmdW5jdGlvbiBhZGRUb0xpc3QoaSwgTCwgUikge1xuICAgIFJbTFtpICsgMV1dID0gUltpXTtcbiAgICBMW1JbaV1dID0gTFtpICsgMV07XG4gICAgUltpXSA9IGkgKyAxO1xuICAgIExbaSArIDFdID0gaTtcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIFwiaVwiIGZyb20gaXRzIGxpc3RcbiAgICovXG5cblxuICBmdW5jdGlvbiByZW1vdmVGcm9tTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2ldXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaV07XG4gICAgUltpXSA9IGk7XG4gICAgTFtpXSA9IGk7XG4gIH1cbiAgLyoqXG4gICAqIE1hemUgZ2VuZXJhdG9yIC0gRWxsZXIncyBhbGdvcml0aG1cbiAgICogU2VlIGh0dHA6Ly9ob21lcGFnZXMuY3dpLm5sL350cm9tcC9tYXplLmh0bWwgZm9yIGV4cGxhbmF0aW9uXG4gICAqL1xuXG5cbiAgdmFyIEVsbGVyTWF6ZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXA0KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRWxsZXJNYXplLCBfTWFwNCk7XG5cbiAgICBmdW5jdGlvbiBFbGxlck1hemUoKSB7XG4gICAgICByZXR1cm4gX01hcDQuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yOSA9IEVsbGVyTWF6ZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yOS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciBtYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuXG4gICAgICB2YXIgdyA9IE1hdGguY2VpbCgodGhpcy5fd2lkdGggLSAyKSAvIDIpO1xuICAgICAgdmFyIHJhbmQgPSA5IC8gMjQ7XG4gICAgICB2YXIgTCA9IFtdO1xuICAgICAgdmFyIFIgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgTC5wdXNoKGkpO1xuICAgICAgICBSLnB1c2goaSk7XG4gICAgICB9XG5cbiAgICAgIEwucHVzaCh3IC0gMSk7XG4gICAgICAvKiBmYWtlIHN0b3AtYmxvY2sgYXQgdGhlIHJpZ2h0IHNpZGUgKi9cblxuICAgICAgdmFyIGo7XG5cbiAgICAgIGZvciAoaiA9IDE7IGogKyAzIDwgdGhpcy5faGVpZ2h0OyBqICs9IDIpIHtcbiAgICAgICAgLyogb25lIHJvdyAqL1xuICAgICAgICBmb3IgKHZhciBfaTUgPSAwOyBfaTUgPCB3OyBfaTUrKykge1xuICAgICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgICB2YXIgeCA9IDIgKiBfaTUgKyAxO1xuICAgICAgICAgIHZhciB5ID0gajtcbiAgICAgICAgICBtYXBbeF1beV0gPSAwO1xuICAgICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cblxuICAgICAgICAgIGlmIChfaTUgIT0gTFtfaTUgKyAxXSAmJiBSTkckMS5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XG4gICAgICAgICAgICBhZGRUb0xpc3QoX2k1LCBMLCBSKTtcbiAgICAgICAgICAgIG1hcFt4ICsgMV1beV0gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBib3R0b20gY29ubmVjdGlvbiAqL1xuXG5cbiAgICAgICAgICBpZiAoX2k1ICE9IExbX2k1XSAmJiBSTkckMS5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XG4gICAgICAgICAgICAvKiByZW1vdmUgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgcmVtb3ZlRnJvbUxpc3QoX2k1LCBMLCBSKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyogY3JlYXRlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgIG1hcFt4XVt5ICsgMV0gPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogbGFzdCByb3cgKi9cblxuXG4gICAgICBmb3IgKHZhciBfaTYgPSAwOyBfaTYgPCB3OyBfaTYrKykge1xuICAgICAgICAvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXG4gICAgICAgIHZhciBfeDIgPSAyICogX2k2ICsgMTtcblxuICAgICAgICB2YXIgX3kyID0gajtcbiAgICAgICAgbWFwW194Ml1bX3kyXSA9IDA7XG4gICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cblxuICAgICAgICBpZiAoX2k2ICE9IExbX2k2ICsgMV0gJiYgKF9pNiA9PSBMW19pNl0gfHwgUk5HJDEuZ2V0VW5pZm9ybSgpID4gcmFuZCkpIHtcbiAgICAgICAgICAvKiBkaWcgcmlnaHQgYWxzbyBpZiB0aGUgY2VsbCBpcyBzZXBhcmF0ZWQsIHNvIGl0IGdldHMgY29ubmVjdGVkIHRvIHRoZSByZXN0IG9mIG1hemUgKi9cbiAgICAgICAgICBhZGRUb0xpc3QoX2k2LCBMLCBSKTtcbiAgICAgICAgICBtYXBbX3gyICsgMV1bX3kyXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVGcm9tTGlzdChfaTYsIEwsIFIpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTcgPSAwOyBfaTcgPCB0aGlzLl93aWR0aDsgX2k3KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2ogPSAwOyBfaiA8IHRoaXMuX2hlaWdodDsgX2orKykge1xuICAgICAgICAgIGNhbGxiYWNrKF9pNywgX2osIG1hcFtfaTddW19qXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBFbGxlck1hemU7XG4gIH0oTWFwKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBSZWN1cnNpdmVseSBkaXZpZGVkIG1hemUsIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF6ZV9nZW5lcmF0aW9uX2FsZ29yaXRobSNSZWN1cnNpdmVfZGl2aXNpb25fbWV0aG9kXG4gICAqIEBhdWdtZW50cyBST1QuTWFwXG4gICAqL1xuXG5cbiAgdmFyIERpdmlkZWRNYXplID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDUpIHtcbiAgICBfaW5oZXJpdHNMb29zZShEaXZpZGVkTWF6ZSwgX01hcDUpO1xuXG4gICAgZnVuY3Rpb24gRGl2aWRlZE1hemUoKSB7XG4gICAgICB2YXIgX3RoaXMxNjtcblxuICAgICAgX3RoaXMxNiA9IF9NYXA1LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgIF90aGlzMTYuX3N0YWNrID0gW107XG4gICAgICBfdGhpczE2Ll9tYXAgPSBbXTtcbiAgICAgIHJldHVybiBfdGhpczE2O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8zMCA9IERpdmlkZWRNYXplLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzMwLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIHcgPSB0aGlzLl93aWR0aDtcbiAgICAgIHZhciBoID0gdGhpcy5faGVpZ2h0O1xuICAgICAgdGhpcy5fbWFwID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgIHRoaXMuX21hcC5wdXNoKFtdKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGg7IGorKykge1xuICAgICAgICAgIHZhciBib3JkZXIgPSBpID09IDAgfHwgaiA9PSAwIHx8IGkgKyAxID09IHcgfHwgaiArIDEgPT0gaDtcblxuICAgICAgICAgIHRoaXMuX21hcFtpXS5wdXNoKGJvcmRlciA/IDEgOiAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGFjayA9IFtbMSwgMSwgdyAtIDIsIGggLSAyXV07XG5cbiAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuICAgICAgZm9yICh2YXIgX2k4ID0gMDsgX2k4IDwgdzsgX2k4KyspIHtcbiAgICAgICAgZm9yICh2YXIgX2oyID0gMDsgX2oyIDwgaDsgX2oyKyspIHtcbiAgICAgICAgICBjYWxsYmFjayhfaTgsIF9qMiwgdGhpcy5fbWFwW19pOF1bX2oyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMzAuX3Byb2Nlc3MgPSBmdW5jdGlvbiBfcHJvY2VzcygpIHtcbiAgICAgIHdoaWxlICh0aGlzLl9zdGFjay5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHJvb20gPSB0aGlzLl9zdGFjay5zaGlmdCgpO1xuICAgICAgICAvKiBbbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXSAqL1xuXG5cbiAgICAgICAgdGhpcy5fcGFydGl0aW9uUm9vbShyb29tKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzAuX3BhcnRpdGlvblJvb20gPSBmdW5jdGlvbiBfcGFydGl0aW9uUm9vbShyb29tKSB7XG4gICAgICB2YXIgYXZhaWxYID0gW107XG4gICAgICB2YXIgYXZhaWxZID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSByb29tWzBdICsgMTsgaSA8IHJvb21bMl07IGkrKykge1xuICAgICAgICB2YXIgdG9wID0gdGhpcy5fbWFwW2ldW3Jvb21bMV0gLSAxXTtcbiAgICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuX21hcFtpXVtyb29tWzNdICsgMV07XG5cbiAgICAgICAgaWYgKHRvcCAmJiBib3R0b20gJiYgIShpICUgMikpIHtcbiAgICAgICAgICBhdmFpbFgucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBqID0gcm9vbVsxXSArIDE7IGogPCByb29tWzNdOyBqKyspIHtcbiAgICAgICAgdmFyIGxlZnQgPSB0aGlzLl9tYXBbcm9vbVswXSAtIDFdW2pdO1xuICAgICAgICB2YXIgcmlnaHQgPSB0aGlzLl9tYXBbcm9vbVsyXSArIDFdW2pdO1xuXG4gICAgICAgIGlmIChsZWZ0ICYmIHJpZ2h0ICYmICEoaiAlIDIpKSB7XG4gICAgICAgICAgYXZhaWxZLnB1c2goaik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhdmFpbFgubGVuZ3RoIHx8ICFhdmFpbFkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHggPSBSTkckMS5nZXRJdGVtKGF2YWlsWCk7XG4gICAgICB2YXIgeSA9IFJORyQxLmdldEl0ZW0oYXZhaWxZKTtcbiAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDE7XG4gICAgICB2YXIgd2FsbHMgPSBbXTtcbiAgICAgIHZhciB3ID0gW107XG4gICAgICB3YWxscy5wdXNoKHcpO1xuICAgICAgLyogbGVmdCBwYXJ0ICovXG5cbiAgICAgIGZvciAodmFyIF9pOSA9IHJvb21bMF07IF9pOSA8IHg7IF9pOSsrKSB7XG4gICAgICAgIHRoaXMuX21hcFtfaTldW3ldID0gMTtcbiAgICAgICAgaWYgKF9pOSAlIDIpIHcucHVzaChbX2k5LCB5XSk7XG4gICAgICB9XG5cbiAgICAgIHcgPSBbXTtcbiAgICAgIHdhbGxzLnB1c2godyk7XG4gICAgICAvKiByaWdodCBwYXJ0ICovXG5cbiAgICAgIGZvciAodmFyIF9pMTAgPSB4ICsgMTsgX2kxMCA8PSByb29tWzJdOyBfaTEwKyspIHtcbiAgICAgICAgdGhpcy5fbWFwW19pMTBdW3ldID0gMTtcbiAgICAgICAgaWYgKF9pMTAgJSAyKSB3LnB1c2goW19pMTAsIHldKTtcbiAgICAgIH1cblxuICAgICAgdyA9IFtdO1xuICAgICAgd2FsbHMucHVzaCh3KTtcbiAgICAgIC8qIHRvcCBwYXJ0ICovXG5cbiAgICAgIGZvciAodmFyIF9qMyA9IHJvb21bMV07IF9qMyA8IHk7IF9qMysrKSB7XG4gICAgICAgIHRoaXMuX21hcFt4XVtfajNdID0gMTtcbiAgICAgICAgaWYgKF9qMyAlIDIpIHcucHVzaChbeCwgX2ozXSk7XG4gICAgICB9XG5cbiAgICAgIHcgPSBbXTtcbiAgICAgIHdhbGxzLnB1c2godyk7XG4gICAgICAvKiBib3R0b20gcGFydCAqL1xuXG4gICAgICBmb3IgKHZhciBfajQgPSB5ICsgMTsgX2o0IDw9IHJvb21bM107IF9qNCsrKSB7XG4gICAgICAgIHRoaXMuX21hcFt4XVtfajRdID0gMTtcbiAgICAgICAgaWYgKF9qNCAlIDIpIHcucHVzaChbeCwgX2o0XSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb2xpZCA9IFJORyQxLmdldEl0ZW0od2FsbHMpO1xuXG4gICAgICBmb3IgKHZhciBfaTExID0gMDsgX2kxMSA8IHdhbGxzLmxlbmd0aDsgX2kxMSsrKSB7XG4gICAgICAgIHZhciBfdyA9IHdhbGxzW19pMTFdO1xuXG4gICAgICAgIGlmIChfdyA9PSBzb2xpZCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhvbGUgPSBSTkckMS5nZXRJdGVtKF93KTtcbiAgICAgICAgdGhpcy5fbWFwW2hvbGVbMF1dW2hvbGVbMV1dID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgcm9vbVsxXSwgeCAtIDEsIHkgLSAxXSk7XG4gICAgICAvKiBsZWZ0IHRvcCAqL1xuXG5cbiAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCByb29tWzFdLCByb29tWzJdLCB5IC0gMV0pO1xuICAgICAgLyogcmlnaHQgdG9wICovXG5cblxuICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgeSArIDEsIHggLSAxLCByb29tWzNdXSk7XG4gICAgICAvKiBsZWZ0IGJvdHRvbSAqL1xuXG5cbiAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCB5ICsgMSwgcm9vbVsyXSwgcm9vbVszXV0pO1xuICAgICAgLyogcmlnaHQgYm90dG9tICovXG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpdmlkZWRNYXplO1xuICB9KE1hcCk7XG4gIC8qKlxuICAgKiBJY2V5J3MgTWF6ZSBnZW5lcmF0b3JcbiAgICogU2VlIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPVNpbXBsZV9tYXplIGZvciBleHBsYW5hdGlvblxuICAgKi9cblxuXG4gIHZhciBJY2V5TWF6ZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXA2KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoSWNleU1hemUsIF9NYXA2KTtcblxuICAgIGZ1bmN0aW9uIEljZXlNYXplKHdpZHRoLCBoZWlnaHQsIHJlZ3VsYXJpdHkpIHtcbiAgICAgIHZhciBfdGhpczE3O1xuXG4gICAgICBpZiAocmVndWxhcml0eSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJlZ3VsYXJpdHkgPSAwO1xuICAgICAgfVxuXG4gICAgICBfdGhpczE3ID0gX01hcDYuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxNy5fcmVndWxhcml0eSA9IHJlZ3VsYXJpdHk7XG4gICAgICBfdGhpczE3Ll9tYXAgPSBbXTtcbiAgICAgIHJldHVybiBfdGhpczE3O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8zMSA9IEljZXlNYXplLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzMxLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuXG4gICAgICB2YXIgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcblxuICAgICAgd2lkdGggLT0gd2lkdGggJSAyID8gMSA6IDI7XG4gICAgICBoZWlnaHQgLT0gaGVpZ2h0ICUgMiA/IDEgOiAyO1xuICAgICAgdmFyIGN4ID0gMDtcbiAgICAgIHZhciBjeSA9IDA7XG4gICAgICB2YXIgbnggPSAwO1xuICAgICAgdmFyIG55ID0gMDtcbiAgICAgIHZhciBkb25lID0gMDtcbiAgICAgIHZhciBibG9ja2VkID0gZmFsc2U7XG4gICAgICB2YXIgZGlycyA9IFtbMCwgMF0sIFswLCAwXSwgWzAsIDBdLCBbMCwgMF1dO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGN4ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqICh3aWR0aCAtIDEpIC8gMik7XG4gICAgICAgIGN5ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIChoZWlnaHQgLSAxKSAvIDIpO1xuXG4gICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgIG1hcFtjeF1bY3ldID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWFwW2N4XVtjeV0pIHtcbiAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG5cbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiAodGhpcy5fcmVndWxhcml0eSArIDEpKSA9PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3JhbmRvbWl6ZShkaXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgIG54ID0gY3ggKyBkaXJzW2ldWzBdICogMjtcbiAgICAgICAgICAgICAgbnkgPSBjeSArIGRpcnNbaV1bMV0gKiAyO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pc0ZyZWUobWFwLCBueCwgbnksIHdpZHRoLCBoZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgbWFwW254XVtueV0gPSAwO1xuICAgICAgICAgICAgICAgIG1hcFtjeCArIGRpcnNbaV1bMF1dW2N5ICsgZGlyc1tpXVsxXV0gPSAwO1xuICAgICAgICAgICAgICAgIGN4ID0gbng7XG4gICAgICAgICAgICAgICAgY3kgPSBueTtcbiAgICAgICAgICAgICAgICBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZG9uZSsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAoIWJsb2NrZWQpO1xuICAgICAgICB9XG4gICAgICB9IHdoaWxlIChkb25lICsgMSA8IHdpZHRoICogaGVpZ2h0IC8gNCk7XG5cbiAgICAgIGZvciAodmFyIF9pMTIgPSAwOyBfaTEyIDwgdGhpcy5fd2lkdGg7IF9pMTIrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgY2FsbGJhY2soX2kxMiwgaiwgbWFwW19pMTJdW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMS5fcmFuZG9taXplID0gZnVuY3Rpb24gX3JhbmRvbWl6ZShkaXJzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBkaXJzW2ldWzBdID0gMDtcbiAgICAgICAgZGlyc1tpXVsxXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiA0KSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgZGlyc1swXVswXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMV1bMF0gPSAxO1xuICAgICAgICAgIGRpcnNbMl1bMV0gPSAtMTtcbiAgICAgICAgICBkaXJzWzNdWzFdID0gMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgZGlyc1szXVswXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMl1bMF0gPSAxO1xuICAgICAgICAgIGRpcnNbMV1bMV0gPSAtMTtcbiAgICAgICAgICBkaXJzWzBdWzFdID0gMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgZGlyc1syXVswXSA9IC0xO1xuICAgICAgICAgIGRpcnNbM11bMF0gPSAxO1xuICAgICAgICAgIGRpcnNbMF1bMV0gPSAtMTtcbiAgICAgICAgICBkaXJzWzFdWzFdID0gMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgZGlyc1sxXVswXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMF1bMF0gPSAxO1xuICAgICAgICAgIGRpcnNbM11bMV0gPSAtMTtcbiAgICAgICAgICBkaXJzWzJdWzFdID0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzEuX2lzRnJlZSA9IGZ1bmN0aW9uIF9pc0ZyZWUobWFwLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCA+PSB3aWR0aCB8fCB5ID49IGhlaWdodCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXBbeF1beV07XG4gICAgfTtcblxuICAgIHJldHVybiBJY2V5TWF6ZTtcbiAgfShNYXApO1xuICAvKipcbiAgICogRHVuZ2VvbiBnZW5lcmF0b3Igd2hpY2ggdXNlcyB0aGUgXCJvcmdpbmFsXCIgUm9ndWUgZHVuZ2VvbiBnZW5lcmF0aW9uIGFsZ29yaXRobS4gU2VlIGh0dHA6Ly9rdW9pLmNvbS9+a2FtaWthemUvR2FtZURlc2lnbi9hcnQwN19yb2d1ZV9kdW5nZW9uLnBocFxuICAgKiBAYXV0aG9yIGh5YWt1Z2VpXG4gICAqL1xuXG5cbiAgdmFyIFJvZ3VlID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDcpIHtcbiAgICBfaW5oZXJpdHNMb29zZShSb2d1ZSwgX01hcDcpO1xuXG4gICAgZnVuY3Rpb24gUm9ndWUod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMTg7XG5cbiAgICAgIF90aGlzMTggPSBfTWFwNy5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczE4Lm1hcCA9IFtdO1xuICAgICAgX3RoaXMxOC5yb29tcyA9IFtdO1xuICAgICAgX3RoaXMxOC5jb25uZWN0ZWRDZWxscyA9IFtdO1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjZWxsV2lkdGg6IDMsXG4gICAgICAgIGNlbGxIZWlnaHQ6IDMgLy8gICAgIGllLiBhcyBhbiBhcnJheSB3aXRoIG1pbi1tYXggdmFsdWVzIGZvciBlYWNoIGRpcmVjdGlvbi4uLi5cblxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAvKlxuICAgICAgU2V0IHRoZSByb29tIHNpemVzIGFjY29yZGluZyB0byB0aGUgb3Zlci1hbGwgd2lkdGggb2YgdGhlIG1hcCxcbiAgICAgIGFuZCB0aGUgY2VsbCBzaXplcy5cbiAgICAgICovXG5cbiAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInJvb21XaWR0aFwiKSkge1xuICAgICAgICBvcHRpb25zW1wicm9vbVdpZHRoXCJdID0gX3RoaXMxOC5fY2FsY3VsYXRlUm9vbVNpemUoX3RoaXMxOC5fd2lkdGgsIG9wdGlvbnNbXCJjZWxsV2lkdGhcIl0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tSGVpZ2h0XCIpKSB7XG4gICAgICAgIG9wdGlvbnNbXCJyb29tSGVpZ2h0XCJdID0gX3RoaXMxOC5fY2FsY3VsYXRlUm9vbVNpemUoX3RoaXMxOC5faGVpZ2h0LCBvcHRpb25zW1wiY2VsbEhlaWdodFwiXSk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMTguX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgcmV0dXJuIF90aGlzMTg7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzMyID0gUm9ndWUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gW107XG5cbiAgICAgIHRoaXMuX2luaXRSb29tcygpO1xuXG4gICAgICB0aGlzLl9jb25uZWN0Um9vbXMoKTtcblxuICAgICAgdGhpcy5fY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKTtcblxuICAgICAgdGhpcy5fY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCk7XG5cbiAgICAgIHRoaXMuX2NyZWF0ZVJvb21zKCk7XG5cbiAgICAgIHRoaXMuX2NyZWF0ZUNvcnJpZG9ycygpO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5tYXBbaV1bal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2NhbGN1bGF0ZVJvb21TaXplID0gZnVuY3Rpb24gX2NhbGN1bGF0ZVJvb21TaXplKHNpemUsIGNlbGwpIHtcbiAgICAgIHZhciBtYXggPSBNYXRoLmZsb29yKHNpemUgLyBjZWxsICogMC44KTtcbiAgICAgIHZhciBtaW4gPSBNYXRoLmZsb29yKHNpemUgLyBjZWxsICogMC4yNSk7XG5cbiAgICAgIGlmIChtaW4gPCAyKSB7XG4gICAgICAgIG1pbiA9IDI7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXggPCAyKSB7XG4gICAgICAgIG1heCA9IDI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbbWluLCBtYXhdO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMi5faW5pdFJvb21zID0gZnVuY3Rpb24gX2luaXRSb29tcygpIHtcbiAgICAgIC8vIGNyZWF0ZSByb29tcyBhcnJheS4gVGhpcyBpcyB0aGUgXCJncmlkXCIgbGlzdCBmcm9tIHRoZSBhbGdvLlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucm9vbXMucHVzaChbXSk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7IGorKykge1xuICAgICAgICAgIHRoaXMucm9vbXNbaV0ucHVzaCh7XG4gICAgICAgICAgICBcInhcIjogMCxcbiAgICAgICAgICAgIFwieVwiOiAwLFxuICAgICAgICAgICAgXCJ3aWR0aFwiOiAwLFxuICAgICAgICAgICAgXCJoZWlnaHRcIjogMCxcbiAgICAgICAgICAgIFwiY29ubmVjdGlvbnNcIjogW10sXG4gICAgICAgICAgICBcImNlbGx4XCI6IGksXG4gICAgICAgICAgICBcImNlbGx5XCI6IGpcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY29ubmVjdFJvb21zID0gZnVuY3Rpb24gX2Nvbm5lY3RSb29tcygpIHtcbiAgICAgIC8vcGljayByYW5kb20gc3RhcnRpbmcgZ3JpZFxuICAgICAgdmFyIGNneCA9IFJORyQxLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGggLSAxKTtcbiAgICAgIHZhciBjZ3kgPSBSTkckMS5nZXRVbmlmb3JtSW50KDAsIHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCAtIDEpO1xuICAgICAgdmFyIGlkeDtcbiAgICAgIHZhciBuY2d4O1xuICAgICAgdmFyIG5jZ3k7XG4gICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgIHZhciByb29tO1xuICAgICAgdmFyIG90aGVyUm9vbTtcbiAgICAgIHZhciBkaXJUb0NoZWNrOyAvLyBmaW5kICB1bmNvbm5lY3RlZCBuZWlnaGJvdXIgY2VsbHNcblxuICAgICAgZG8ge1xuICAgICAgICAvL2RpclRvQ2hlY2sgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG4gICAgICAgIGRpclRvQ2hlY2sgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgIGRpclRvQ2hlY2sgPSBSTkckMS5zaHVmZmxlKGRpclRvQ2hlY2spO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgIGlkeCA9IGRpclRvQ2hlY2sucG9wKCk7XG4gICAgICAgICAgbmNneCA9IGNneCArIERJUlNbOF1baWR4XVswXTtcbiAgICAgICAgICBuY2d5ID0gY2d5ICsgRElSU1s4XVtpZHhdWzFdO1xuXG4gICAgICAgICAgaWYgKG5jZ3ggPCAwIHx8IG5jZ3ggPj0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChuY2d5IDwgMCB8fCBuY2d5ID49IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbY2d4XVtjZ3ldO1xuXG4gICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBhcyBsb25nIGFzIHRoaXMgcm9vbSBkb2Vzbid0IGFscmVhZHkgY29vbmVjdCB0byBtZSwgd2UgYXJlIG9rIHdpdGggaXQuXG4gICAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzBdID09IG5jZ3ggJiYgcm9vbVtcImNvbm5lY3Rpb25zXCJdWzBdWzFdID09IG5jZ3kpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuY2d4XVtuY2d5XTtcblxuICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ucHVzaChbY2d4LCBjZ3ldKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMucHVzaChbbmNneCwgbmNneV0pO1xuICAgICAgICAgICAgY2d4ID0gbmNneDtcbiAgICAgICAgICAgIGNneSA9IG5jZ3k7XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDAgJiYgZm91bmQgPT0gZmFsc2UpO1xuICAgICAgfSB3aGlsZSAoZGlyVG9DaGVjay5sZW5ndGggPiAwKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2Nvbm5lY3RVbmNvbm5lY3RlZFJvb21zID0gZnVuY3Rpb24gX2Nvbm5lY3RVbmNvbm5lY3RlZFJvb21zKCkge1xuICAgICAgLy9XaGlsZSB0aGVyZSBhcmUgdW5jb25uZWN0ZWQgcm9vbXMsIHRyeSB0byBjb25uZWN0IHRoZW0gdG8gYSByYW5kb20gY29ubmVjdGVkIG5laWdoYm9yXG4gICAgICAvLyhpZiBhIHJvb20gaGFzIG5vIGNvbm5lY3RlZCBuZWlnaGJvcnMgeWV0LCBqdXN0IGtlZXAgY3ljbGluZywgeW91J2xsIGZpbGwgb3V0IHRvIGl0IGV2ZW50dWFsbHkpLlxuICAgICAgdmFyIGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICB2YXIgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gUk5HJDEuc2h1ZmZsZSh0aGlzLmNvbm5lY3RlZENlbGxzKTtcbiAgICAgIHZhciByb29tO1xuICAgICAgdmFyIG90aGVyUm9vbTtcbiAgICAgIHZhciB2YWxpZFJvb207XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbaV1bal07XG5cbiAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9ucyA9IFswLCAyLCA0LCA2XTtcbiAgICAgICAgICAgIGRpcmVjdGlvbnMgPSBSTkckMS5zaHVmZmxlKGRpcmVjdGlvbnMpO1xuICAgICAgICAgICAgdmFsaWRSb29tID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgdmFyIGRpcklkeCA9IGRpcmVjdGlvbnMucG9wKCk7XG4gICAgICAgICAgICAgIHZhciBuZXdJID0gaSArIERJUlNbOF1bZGlySWR4XVswXTtcbiAgICAgICAgICAgICAgdmFyIG5ld0ogPSBqICsgRElSU1s4XVtkaXJJZHhdWzFdO1xuXG4gICAgICAgICAgICAgIGlmIChuZXdJIDwgMCB8fCBuZXdJID49IGN3IHx8IG5ld0ogPCAwIHx8IG5ld0ogPj0gY2gpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbbmV3SV1bbmV3Sl07XG4gICAgICAgICAgICAgIHZhbGlkUm9vbSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdWzBdID09IGkgJiYgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMV0gPT0gaikge1xuICAgICAgICAgICAgICAgICAgdmFsaWRSb29tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodmFsaWRSb29tKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKGRpcmVjdGlvbnMubGVuZ3RoKTtcblxuICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICByb29tW1wiY29ubmVjdGlvbnNcIl0ucHVzaChbb3RoZXJSb29tW1wiY2VsbHhcIl0sIG90aGVyUm9vbVtcImNlbGx5XCJdXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tIFVuYWJsZSB0byBjb25uZWN0IHJvb20uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zID0gZnVuY3Rpb24gX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucygpIHsvLyBFbXB0eSBmb3Igbm93LlxuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY3JlYXRlUm9vbXMgPSBmdW5jdGlvbiBfY3JlYXRlUm9vbXMoKSB7XG4gICAgICB2YXIgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgdmFyIGggPSB0aGlzLl9oZWlnaHQ7XG4gICAgICB2YXIgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgIHZhciBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgIHZhciBjd3AgPSBNYXRoLmZsb29yKHRoaXMuX3dpZHRoIC8gY3cpO1xuICAgICAgdmFyIGNocCA9IE1hdGguZmxvb3IodGhpcy5faGVpZ2h0IC8gY2gpO1xuICAgICAgdmFyIHJvb213O1xuICAgICAgdmFyIHJvb21oO1xuICAgICAgdmFyIHJvb21XaWR0aCA9IHRoaXMuX29wdGlvbnNbXCJyb29tV2lkdGhcIl07XG4gICAgICB2YXIgcm9vbUhlaWdodCA9IHRoaXMuX29wdGlvbnNbXCJyb29tSGVpZ2h0XCJdO1xuICAgICAgdmFyIHN4O1xuICAgICAgdmFyIHN5O1xuICAgICAgdmFyIG90aGVyUm9vbTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdzsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgIHN4ID0gY3dwICogaTtcbiAgICAgICAgICBzeSA9IGNocCAqIGo7XG5cbiAgICAgICAgICBpZiAoc3ggPT0gMCkge1xuICAgICAgICAgICAgc3ggPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzeSA9PSAwKSB7XG4gICAgICAgICAgICBzeSA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm9vbXcgPSBSTkckMS5nZXRVbmlmb3JtSW50KHJvb21XaWR0aFswXSwgcm9vbVdpZHRoWzFdKTtcbiAgICAgICAgICByb29taCA9IFJORyQxLmdldFVuaWZvcm1JbnQocm9vbUhlaWdodFswXSwgcm9vbUhlaWdodFsxXSk7XG5cbiAgICAgICAgICBpZiAoaiA+IDApIHtcbiAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaV1baiAtIDFdO1xuXG4gICAgICAgICAgICB3aGlsZSAoc3kgLSAob3RoZXJSb29tW1wieVwiXSArIG90aGVyUm9vbVtcImhlaWdodFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgIHN5Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2kgLSAxXVtqXTtcblxuICAgICAgICAgICAgd2hpbGUgKHN4IC0gKG90aGVyUm9vbVtcInhcIl0gKyBvdGhlclJvb21bXCJ3aWR0aFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgIHN4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN4T2Zmc2V0ID0gTWF0aC5yb3VuZChSTkckMS5nZXRVbmlmb3JtSW50KDAsIGN3cCAtIHJvb213KSAvIDIpO1xuICAgICAgICAgIHZhciBzeU9mZnNldCA9IE1hdGgucm91bmQoUk5HJDEuZ2V0VW5pZm9ybUludCgwLCBjaHAgLSByb29taCkgLyAyKTtcblxuICAgICAgICAgIHdoaWxlIChzeCArIHN4T2Zmc2V0ICsgcm9vbXcgPj0gdykge1xuICAgICAgICAgICAgaWYgKHN4T2Zmc2V0KSB7XG4gICAgICAgICAgICAgIHN4T2Zmc2V0LS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByb29tdy0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdoaWxlIChzeSArIHN5T2Zmc2V0ICsgcm9vbWggPj0gaCkge1xuICAgICAgICAgICAgaWYgKHN5T2Zmc2V0KSB7XG4gICAgICAgICAgICAgIHN5T2Zmc2V0LS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByb29taC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHN4ID0gc3ggKyBzeE9mZnNldDtcbiAgICAgICAgICBzeSA9IHN5ICsgc3lPZmZzZXQ7XG4gICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcInhcIl0gPSBzeDtcbiAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wieVwiXSA9IHN5O1xuICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ3aWR0aFwiXSA9IHJvb213O1xuICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJoZWlnaHRcIl0gPSByb29taDtcblxuICAgICAgICAgIGZvciAodmFyIGlpID0gc3g7IGlpIDwgc3ggKyByb29tdzsgaWkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgamogPSBzeTsgamogPCBzeSArIHJvb21oOyBqaisrKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFwW2lpXVtqal0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fZ2V0V2FsbFBvc2l0aW9uID0gZnVuY3Rpb24gX2dldFdhbGxQb3NpdGlvbihhUm9vbSwgYURpcmVjdGlvbikge1xuICAgICAgdmFyIHJ4O1xuICAgICAgdmFyIHJ5O1xuICAgICAgdmFyIGRvb3I7XG5cbiAgICAgIGlmIChhRGlyZWN0aW9uID09IDEgfHwgYURpcmVjdGlvbiA9PSAzKSB7XG4gICAgICAgIHJ4ID0gUk5HJDEuZ2V0VW5pZm9ybUludChhUm9vbVtcInhcIl0gKyAxLCBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdIC0gMik7XG5cbiAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMSkge1xuICAgICAgICAgIHJ5ID0gYVJvb21bXCJ5XCJdIC0gMjtcbiAgICAgICAgICBkb29yID0gcnkgKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ5ID0gYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gKyAxO1xuICAgICAgICAgIGRvb3IgPSByeSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcFtyeF1bZG9vcl0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByeSA9IFJORyQxLmdldFVuaWZvcm1JbnQoYVJvb21bXCJ5XCJdICsgMSwgYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gLSAyKTtcblxuICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdICsgMTtcbiAgICAgICAgICBkb29yID0gcnggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdIC0gMjtcbiAgICAgICAgICBkb29yID0gcnggKyAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBbZG9vcl1bcnldID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3J4LCByeV07XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9kcmF3Q29ycmlkb3IgPSBmdW5jdGlvbiBfZHJhd0NvcnJpZG9yKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgICB2YXIgeE9mZnNldCA9IGVuZFBvc2l0aW9uWzBdIC0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgIHZhciB5T2Zmc2V0ID0gZW5kUG9zaXRpb25bMV0gLSBzdGFydFBvc2l0aW9uWzFdO1xuICAgICAgdmFyIHhwb3MgPSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgdmFyIHlwb3MgPSBzdGFydFBvc2l0aW9uWzFdO1xuICAgICAgdmFyIHRlbXBEaXN0O1xuICAgICAgdmFyIHhEaXI7XG4gICAgICB2YXIgeURpcjtcbiAgICAgIHZhciBtb3ZlOyAvLyAyIGVsZW1lbnQgYXJyYXksIGVsZW1lbnQgMCBpcyB0aGUgZGlyZWN0aW9uLCBlbGVtZW50IDEgaXMgdGhlIHRvdGFsIHZhbHVlIHRvIG1vdmUuXG5cbiAgICAgIHZhciBtb3ZlcyA9IFtdOyAvLyBhIGxpc3Qgb2YgMiBlbGVtZW50IGFycmF5c1xuXG4gICAgICB2YXIgeEFicyA9IE1hdGguYWJzKHhPZmZzZXQpO1xuICAgICAgdmFyIHlBYnMgPSBNYXRoLmFicyh5T2Zmc2V0KTtcbiAgICAgIHZhciBwZXJjZW50ID0gUk5HJDEuZ2V0VW5pZm9ybSgpOyAvLyB1c2VkIHRvIHNwbGl0IHRoZSBtb3ZlIGF0IGRpZmZlcmVudCBwbGFjZXMgYWxvbmcgdGhlIGxvbmcgYXhpc1xuXG4gICAgICB2YXIgZmlyc3RIYWxmID0gcGVyY2VudDtcbiAgICAgIHZhciBzZWNvbmRIYWxmID0gMSAtIHBlcmNlbnQ7XG4gICAgICB4RGlyID0geE9mZnNldCA+IDAgPyAyIDogNjtcbiAgICAgIHlEaXIgPSB5T2Zmc2V0ID4gMCA/IDQgOiAwO1xuXG4gICAgICBpZiAoeEFicyA8IHlBYnMpIHtcbiAgICAgICAgLy8gbW92ZSBmaXJzdEhhbGYgb2YgdGhlIHkgb2Zmc2V0XG4gICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHlBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pOyAvLyBtb3ZlIGFsbCB0aGUgeCBvZmZzZXRcblxuICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB4QWJzXSk7IC8vIG1vdmUgc2VuZEhhbGYgb2YgdGhlICB5IG9mZnNldFxuXG4gICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih5QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHRlbXBEaXN0XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgbW92ZSBmaXJzdEhhbGYgb2YgdGhlIHggb2Zmc2V0XG4gICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHhBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pOyAvLyBtb3ZlIGFsbCB0aGUgeSBvZmZzZXRcblxuICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB5QWJzXSk7IC8vIG1vdmUgc2Vjb25kSGFsZiBvZiB0aGUgeCBvZmZzZXQuXG5cbiAgICAgICAgdGVtcERpc3QgPSBNYXRoLmZsb29yKHhBYnMgKiBzZWNvbmRIYWxmKTtcbiAgICAgICAgbW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuXG4gICAgICB3aGlsZSAobW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBtb3ZlID0gbW92ZXMucG9wKCk7XG5cbiAgICAgICAgd2hpbGUgKG1vdmVbMV0gPiAwKSB7XG4gICAgICAgICAgeHBvcyArPSBESVJTWzhdW21vdmVbMF1dWzBdO1xuICAgICAgICAgIHlwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVsxXTtcbiAgICAgICAgICB0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XG4gICAgICAgICAgbW92ZVsxXSA9IG1vdmVbMV0gLSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jcmVhdGVDb3JyaWRvcnMgPSBmdW5jdGlvbiBfY3JlYXRlQ29ycmlkb3JzKCkge1xuICAgICAgLy8gRHJhdyBDb3JyaWRvcnMgYmV0d2VlbiBjb25uZWN0ZWQgcm9vbXNcbiAgICAgIHZhciBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgdmFyIGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgdmFyIHJvb207XG4gICAgICB2YXIgY29ubmVjdGlvbjtcbiAgICAgIHZhciBvdGhlclJvb207XG4gICAgICB2YXIgd2FsbDtcbiAgICAgIHZhciBvdGhlcldhbGw7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3c7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoOyBqKyspIHtcbiAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tpXVtqXTtcblxuICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uID0gcm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdO1xuICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tjb25uZWN0aW9uWzBdXVtjb25uZWN0aW9uWzFdXTsgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgc3RhcnQgb25lLlxuICAgICAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgZW5kIG9uLlxuXG4gICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPiByb29tW1wiY2VsbHhcIl0pIHtcbiAgICAgICAgICAgICAgd2FsbCA9IDI7XG4gICAgICAgICAgICAgIG90aGVyV2FsbCA9IDQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdIDwgcm9vbVtcImNlbGx4XCJdKSB7XG4gICAgICAgICAgICAgIHdhbGwgPSA0O1xuICAgICAgICAgICAgICBvdGhlcldhbGwgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlclJvb21bXCJjZWxseVwiXSA+IHJvb21bXCJjZWxseVwiXSkge1xuICAgICAgICAgICAgICB3YWxsID0gMztcbiAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdhbGwgPSAxO1xuICAgICAgICAgICAgICBvdGhlcldhbGwgPSAzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kcmF3Q29ycmlkb3IodGhpcy5fZ2V0V2FsbFBvc2l0aW9uKHJvb20sIHdhbGwpLCB0aGlzLl9nZXRXYWxsUG9zaXRpb24ob3RoZXJSb29tLCBvdGhlcldhbGwpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFJvZ3VlO1xuICB9KE1hcCk7XG5cbiAgdmFyIGluZGV4JDIgPSB7XG4gICAgQXJlbmE6IEFyZW5hLFxuICAgIFVuaWZvcm06IFVuaWZvcm0sXG4gICAgQ2VsbHVsYXI6IENlbGx1bGFyLFxuICAgIERpZ2dlcjogRGlnZ2VyLFxuICAgIEVsbGVyTWF6ZTogRWxsZXJNYXplLFxuICAgIERpdmlkZWRNYXplOiBEaXZpZGVkTWF6ZSxcbiAgICBJY2V5TWF6ZTogSWNleU1hemUsXG4gICAgUm9ndWU6IFJvZ3VlXG4gIH07XG4gIC8qKlxuICAgKiBCYXNlIG5vaXNlIGdlbmVyYXRvclxuICAgKi9cblxuICB2YXIgTm9pc2UgPSBmdW5jdGlvbiBOb2lzZSgpIHt9O1xuXG4gIHZhciBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKTtcbiAgdmFyIEcyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNjtcbiAgLyoqXG4gICAqIEEgc2ltcGxlIDJkIGltcGxlbWVudGF0aW9uIG9mIHNpbXBsZXggbm9pc2UgYnkgT25kcmVqIFphcmFcbiAgICpcbiAgICogQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxuICAgKiBXaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXG4gICAqIFdpdGggT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXG4gICAqIEJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXG4gICAqL1xuXG4gIHZhciBTaW1wbGV4ID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX05vaXNlKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoU2ltcGxleCwgX05vaXNlKTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBncmFkaWVudHMgUmFuZG9tIGdyYWRpZW50c1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNpbXBsZXgoZ3JhZGllbnRzKSB7XG4gICAgICB2YXIgX3RoaXMxOTtcblxuICAgICAgaWYgKGdyYWRpZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGdyYWRpZW50cyA9IDI1NjtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxOSA9IF9Ob2lzZS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczE5Ll9ncmFkaWVudHMgPSBbWzAsIC0xXSwgWzEsIC0xXSwgWzEsIDBdLCBbMSwgMV0sIFswLCAxXSwgWy0xLCAxXSwgWy0xLCAwXSwgWy0xLCAtMV1dO1xuICAgICAgdmFyIHBlcm11dGF0aW9ucyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyYWRpZW50czsgaSsrKSB7XG4gICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKGkpO1xuICAgICAgfVxuXG4gICAgICBwZXJtdXRhdGlvbnMgPSBSTkckMS5zaHVmZmxlKHBlcm11dGF0aW9ucyk7XG4gICAgICBfdGhpczE5Ll9wZXJtcyA9IFtdO1xuICAgICAgX3RoaXMxOS5faW5kZXhlcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaTEzID0gMDsgX2kxMyA8IDIgKiBncmFkaWVudHM7IF9pMTMrKykge1xuICAgICAgICBfdGhpczE5Ll9wZXJtcy5wdXNoKHBlcm11dGF0aW9uc1tfaTEzICUgZ3JhZGllbnRzXSk7XG5cbiAgICAgICAgX3RoaXMxOS5faW5kZXhlcy5wdXNoKF90aGlzMTkuX3Blcm1zW19pMTNdICUgX3RoaXMxOS5fZ3JhZGllbnRzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpczE5O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8zMyA9IFNpbXBsZXgucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzMuZ2V0ID0gZnVuY3Rpb24gZ2V0KHhpbiwgeWluKSB7XG4gICAgICB2YXIgcGVybXMgPSB0aGlzLl9wZXJtcztcbiAgICAgIHZhciBpbmRleGVzID0gdGhpcy5faW5kZXhlcztcbiAgICAgIHZhciBjb3VudCA9IHBlcm1zLmxlbmd0aCAvIDI7XG4gICAgICB2YXIgbjAgPSAwLFxuICAgICAgICAgIG4xID0gMCxcbiAgICAgICAgICBuMiA9IDAsXG4gICAgICAgICAgZ2k7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuXG4gICAgICB2YXIgcyA9ICh4aW4gKyB5aW4pICogRjI7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcblxuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGopICogRzI7XG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG5cbiAgICAgIHZhciBZMCA9IGogLSB0O1xuICAgICAgdmFyIHgwID0geGluIC0gWDA7IC8vIFRoZSB4LHkgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG5cbiAgICAgIHZhciB5MCA9IHlpbiAtIFkwOyAvLyBGb3IgdGhlIDJEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGFuIGVxdWlsYXRlcmFsIHRyaWFuZ2xlLlxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuXG4gICAgICB2YXIgaTEsIGoxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgKG1pZGRsZSkgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaikgY29vcmRzXG5cbiAgICAgIGlmICh4MCA+IHkwKSB7XG4gICAgICAgIGkxID0gMTtcbiAgICAgICAgajEgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbG93ZXIgdHJpYW5nbGUsIFhZIG9yZGVyOiAoMCwwKS0+KDEsMCktPigxLDEpXG4gICAgICAgIGkxID0gMDtcbiAgICAgICAgajEgPSAxO1xuICAgICAgfSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcbiAgICAgIC8vIEEgc3RlcCBvZiAoMSwwKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYykgaW4gKHgseSksIGFuZFxuICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XG5cblxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEcyOyAvLyBPZmZzZXRzIGZvciBtaWRkbGUgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICB2YXIgeDIgPSB4MCAtIDEgKyAyICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuXG4gICAgICB2YXIgeTIgPSB5MCAtIDEgKyAyICogRzI7IC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXG5cbiAgICAgIHZhciBpaSA9IG1vZChpLCBjb3VudCk7XG4gICAgICB2YXIgamogPSBtb2QoaiwgY291bnQpOyAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG5cbiAgICAgIHZhciB0MCA9IDAuNSAtIHgwICogeDAgLSB5MCAqIHkwO1xuXG4gICAgICBpZiAodDAgPj0gMCkge1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgcGVybXNbampdXTtcbiAgICAgICAgdmFyIGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZFswXSAqIHgwICsgZ3JhZFsxXSAqIHkwKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XG5cbiAgICAgIGlmICh0MSA+PSAwKSB7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyBpMSArIHBlcm1zW2pqICsgajFdXTtcbiAgICAgICAgdmFyIF9ncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgbjEgPSB0MSAqIHQxICogKF9ncmFkWzBdICogeDEgKyBfZ3JhZFsxXSAqIHkxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHQyID0gMC41IC0geDIgKiB4MiAtIHkyICogeTI7XG5cbiAgICAgIGlmICh0MiA+PSAwKSB7XG4gICAgICAgIHQyICo9IHQyO1xuICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyAxICsgcGVybXNbamogKyAxXV07XG4gICAgICAgIHZhciBfZ3JhZDIgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICBuMiA9IHQyICogdDIgKiAoX2dyYWQyWzBdICogeDIgKyBfZ3JhZDJbMV0gKiB5Mik7XG4gICAgICB9IC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHJldHVybiB2YWx1ZXMgaW4gdGhlIGludGVydmFsIFstMSwxXS5cblxuXG4gICAgICByZXR1cm4gNzAgKiAobjAgKyBuMSArIG4yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNpbXBsZXg7XG4gIH0oTm9pc2UpO1xuXG4gIHZhciBpbmRleCQzID0ge1xuICAgIFNpbXBsZXg6IFNpbXBsZXhcbiAgfTtcbiAgLyoqXG4gICAqIEBjbGFzcyBBYnN0cmFjdCBwYXRoZmluZGVyXG4gICAqIEBwYXJhbSB7aW50fSB0b1ggVGFyZ2V0IFggY29vcmRcbiAgICogQHBhcmFtIHtpbnR9IHRvWSBUYXJnZXQgWSBjb29yZFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXNzYWJsZUNhbGxiYWNrIENhbGxiYWNrIHRvIGRldGVybWluZSBtYXAgcGFzc2FiaWxpdHlcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF1cbiAgICovXG5cbiAgdmFyIFBhdGggPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYXRoKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdG9YID0gdG9YO1xuICAgICAgdGhpcy5fdG9ZID0gdG9ZO1xuICAgICAgdGhpcy5fcGFzc2FibGVDYWxsYmFjayA9IHBhc3NhYmxlQ2FsbGJhY2s7XG4gICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2RpcnMgPSBESVJTW3RoaXMuX29wdGlvbnMudG9wb2xvZ3ldO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA4KSB7XG4gICAgICAgIC8qIHJlb3JkZXIgZGlycyBmb3IgbW9yZSBhZXN0aGV0aWMgcmVzdWx0ICh2ZXJ0aWNhbC9ob3Jpem9udGFsIGZpcnN0KSAqL1xuICAgICAgICB0aGlzLl9kaXJzID0gW3RoaXMuX2RpcnNbMF0sIHRoaXMuX2RpcnNbMl0sIHRoaXMuX2RpcnNbNF0sIHRoaXMuX2RpcnNbNl0sIHRoaXMuX2RpcnNbMV0sIHRoaXMuX2RpcnNbM10sIHRoaXMuX2RpcnNbNV0sIHRoaXMuX2RpcnNbN11dO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBfcHJvdG8zNCA9IFBhdGgucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzQuX2dldE5laWdoYm9ycyA9IGZ1bmN0aW9uIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGlyID0gdGhpcy5fZGlyc1tpXTtcbiAgICAgICAgdmFyIHggPSBjeCArIGRpclswXTtcbiAgICAgICAgdmFyIHkgPSBjeSArIGRpclsxXTtcblxuICAgICAgICBpZiAoIXRoaXMuX3Bhc3NhYmxlQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHJldHVybiBQYXRoO1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgU2ltcGxpZmllZCBEaWprc3RyYSdzIGFsZ29yaXRobTogYWxsIGVkZ2VzIGhhdmUgYSB2YWx1ZSBvZiAxXG4gICAqIEBhdWdtZW50cyBST1QuUGF0aFxuICAgKiBAc2VlIFJPVC5QYXRoXG4gICAqL1xuXG5cbiAgdmFyIERpamtzdHJhID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1BhdGgpIHtcbiAgICBfaW5oZXJpdHNMb29zZShEaWprc3RyYSwgX1BhdGgpO1xuXG4gICAgZnVuY3Rpb24gRGlqa3N0cmEodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczIwO1xuXG4gICAgICBfdGhpczIwID0gX1BhdGguY2FsbCh0aGlzLCB0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykgfHwgdGhpcztcbiAgICAgIF90aGlzMjAuX2NvbXB1dGVkID0ge307XG4gICAgICBfdGhpczIwLl90b2RvID0gW107XG5cbiAgICAgIF90aGlzMjAuX2FkZCh0b1gsIHRvWSwgbnVsbCk7XG5cbiAgICAgIHJldHVybiBfdGhpczIwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGF0aCBmcm9tIGEgZ2l2ZW4gcG9pbnRcbiAgICAgKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzM1ID0gRGlqa3N0cmEucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzUuY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUoZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGtleSA9IGZyb21YICsgXCIsXCIgKyBmcm9tWTtcblxuICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2NvbXB1dGVkKSkge1xuICAgICAgICB0aGlzLl9jb21wdXRlKGZyb21YLCBmcm9tWSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IHRoaXMuX2NvbXB1dGVkW2tleV07XG5cbiAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBub24tY2FjaGVkIHZhbHVlXG4gICAgICovXG5cblxuICAgIF9wcm90bzM1Ll9jb21wdXRlID0gZnVuY3Rpb24gX2NvbXB1dGUoZnJvbVgsIGZyb21ZKSB7XG4gICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl90b2RvLnNoaWZ0KCk7XG5cbiAgICAgICAgaWYgKGl0ZW0ueCA9PSBmcm9tWCAmJiBpdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICB2YXIgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgIHZhciB5ID0gbmVpZ2hib3JbMV07XG4gICAgICAgICAgdmFyIGlkID0geCArIFwiLFwiICsgeTtcblxuICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9jb21wdXRlZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGFscmVhZHkgZG9uZSAqL1xuXG5cbiAgICAgICAgICB0aGlzLl9hZGQoeCwgeSwgaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzUuX2FkZCA9IGZ1bmN0aW9uIF9hZGQoeCwgeSwgcHJldikge1xuICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgcHJldjogcHJldlxuICAgICAgfTtcbiAgICAgIHRoaXMuX2NvbXB1dGVkW3ggKyBcIixcIiArIHldID0gb2JqO1xuXG4gICAgICB0aGlzLl90b2RvLnB1c2gob2JqKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERpamtzdHJhO1xuICB9KFBhdGgpO1xuICAvKipcbiAgICogQGNsYXNzIFNpbXBsaWZpZWQgQSogYWxnb3JpdGhtOiBhbGwgZWRnZXMgaGF2ZSBhIHZhbHVlIG9mIDFcbiAgICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gICAqIEBzZWUgUk9ULlBhdGhcbiAgICovXG5cblxuICB2YXIgQVN0YXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfUGF0aDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShBU3RhciwgX1BhdGgyKTtcblxuICAgIGZ1bmN0aW9uIEFTdGFyKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMyMTtcblxuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIF90aGlzMjEgPSBfUGF0aDIuY2FsbCh0aGlzLCB0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykgfHwgdGhpcztcbiAgICAgIF90aGlzMjEuX3RvZG8gPSBbXTtcbiAgICAgIF90aGlzMjEuX2RvbmUgPSB7fTtcbiAgICAgIHJldHVybiBfdGhpczIxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGF0aCBmcm9tIGEgZ2l2ZW4gcG9pbnRcbiAgICAgKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzM2ID0gQVN0YXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzYuY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUoZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5fdG9kbyA9IFtdO1xuICAgICAgdGhpcy5fZG9uZSA9IHt9O1xuICAgICAgdGhpcy5fZnJvbVggPSBmcm9tWDtcbiAgICAgIHRoaXMuX2Zyb21ZID0gZnJvbVk7XG5cbiAgICAgIHRoaXMuX2FkZCh0aGlzLl90b1gsIHRoaXMuX3RvWSwgbnVsbCk7XG5cbiAgICAgIHdoaWxlICh0aGlzLl90b2RvLmxlbmd0aCkge1xuICAgICAgICB2YXIgX2l0ZW0gPSB0aGlzLl90b2RvLnNoaWZ0KCk7XG5cbiAgICAgICAgdmFyIGlkID0gX2l0ZW0ueCArIFwiLFwiICsgX2l0ZW0ueTtcblxuICAgICAgICBpZiAoaWQgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZG9uZVtpZF0gPSBfaXRlbTtcblxuICAgICAgICBpZiAoX2l0ZW0ueCA9PSBmcm9tWCAmJiBfaXRlbS55ID09IGZyb21ZKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKF9pdGVtLngsIF9pdGVtLnkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xuICAgICAgICAgIHZhciB4ID0gbmVpZ2hib3JbMF07XG4gICAgICAgICAgdmFyIHkgPSBuZWlnaGJvclsxXTtcblxuICAgICAgICAgIHZhciBfaWQzID0geCArIFwiLFwiICsgeTtcblxuICAgICAgICAgIGlmIChfaWQzIGluIHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBfaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9kb25lW2Zyb21YICsgXCIsXCIgKyBmcm9tWV07XG5cbiAgICAgIGlmICghaXRlbSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzYuX2FkZCA9IGZ1bmN0aW9uIF9hZGQoeCwgeSwgcHJldikge1xuICAgICAgdmFyIGggPSB0aGlzLl9kaXN0YW5jZSh4LCB5KTtcblxuICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgcHJldjogcHJldixcbiAgICAgICAgZzogcHJldiA/IHByZXYuZyArIDEgOiAwLFxuICAgICAgICBoOiBoXG4gICAgICB9O1xuICAgICAgLyogaW5zZXJ0IGludG8gcHJpb3JpdHkgcXVldWUgKi9cblxuICAgICAgdmFyIGYgPSBvYmouZyArIG9iai5oO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RvZG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLl90b2RvW2ldO1xuICAgICAgICB2YXIgaXRlbUYgPSBpdGVtLmcgKyBpdGVtLmg7XG5cbiAgICAgICAgaWYgKGYgPCBpdGVtRiB8fCBmID09IGl0ZW1GICYmIGggPCBpdGVtLmgpIHtcbiAgICAgICAgICB0aGlzLl90b2RvLnNwbGljZShpLCAwLCBvYmopO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH07XG5cbiAgICBfcHJvdG8zNi5fZGlzdGFuY2UgPSBmdW5jdGlvbiBfZGlzdGFuY2UoeCwgeSkge1xuICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKSArIE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCk7XG4gICAgICAgICAgdmFyIGR5ID0gTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKTtcbiAgICAgICAgICByZXR1cm4gZHkgKyBNYXRoLm1heCgwLCAoZHggLSBkeSkgLyAyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCksIE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gQVN0YXI7XG4gIH0oUGF0aCk7XG5cbiAgdmFyIGluZGV4JDQgPSB7XG4gICAgRGlqa3N0cmE6IERpamtzdHJhLFxuICAgIEFTdGFyOiBBU3RhclxuICB9O1xuICAvKipcbiAgICogQGNsYXNzIEFzeW5jaHJvbm91cyBtYWluIGxvb3BcbiAgICogQHBhcmFtIHtST1QuU2NoZWR1bGVyfSBzY2hlZHVsZXJcbiAgICovXG5cbiAgdmFyIEVuZ2luZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVuZ2luZShzY2hlZHVsZXIpIHtcbiAgICAgIHRoaXMuX3NjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgIHRoaXMuX2xvY2sgPSAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCB0aGUgbWFpbiBsb29wLiBXaGVuIHRoaXMgY2FsbCByZXR1cm5zLCB0aGUgbG9vcCBpcyBsb2NrZWQuXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8zNyA9IEVuZ2luZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zNy5zdGFydCA9IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgcmV0dXJuIHRoaXMudW5sb2NrKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnRlcnJ1cHQgdGhlIGVuZ2luZSBieSBhbiBhc3luY2hyb25vdXMgYWN0aW9uXG4gICAgICovXG5cblxuICAgIF9wcm90bzM3LmxvY2sgPSBmdW5jdGlvbiBsb2NrKCkge1xuICAgICAgdGhpcy5fbG9jaysrO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXN1bWUgZXhlY3V0aW9uIChwYXVzZWQgYnkgYSBwcmV2aW91cyBsb2NrKVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zNy51bmxvY2sgPSBmdW5jdGlvbiB1bmxvY2soKSB7XG4gICAgICBpZiAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHVubG9jayB1bmxvY2tlZCBlbmdpbmVcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xvY2stLTtcblxuICAgICAgd2hpbGUgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgIHZhciBhY3RvciA9IHRoaXMuX3NjaGVkdWxlci5uZXh0KCk7XG5cbiAgICAgICAgaWYgKCFhY3Rvcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmxvY2soKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBubyBhY3RvcnMgKi9cblxuXG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rvci5hY3QoKTtcblxuICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7XG4gICAgICAgICAgLyogYWN0b3IgcmV0dXJuZWQgYSBcInRoZW5hYmxlXCIsIGxvb2tzIGxpa2UgYSBQcm9taXNlICovXG4gICAgICAgICAgdGhpcy5sb2NrKCk7XG4gICAgICAgICAgcmVzdWx0LnRoZW4odGhpcy51bmxvY2suYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBFbmdpbmU7XG4gIH0oKTtcbiAgLyoqXG4gICAqIExpZ2h0aW5nIGNvbXB1dGF0aW9uLCBiYXNlZCBvbiBhIHRyYWRpdGlvbmFsIEZPViBmb3IgbXVsdGlwbGUgbGlnaHQgc291cmNlcyBhbmQgbXVsdGlwbGUgcGFzc2VzLlxuICAgKi9cblxuXG4gIHZhciBMaWdodGluZyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpZ2h0aW5nKHJlZmxlY3Rpdml0eUNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2sgPSByZWZsZWN0aXZpdHlDYWxsYmFjaztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSB7fTtcbiAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgcGFzc2VzOiAxLFxuICAgICAgICBlbWlzc2lvblRocmVzaG9sZDogMTAwLFxuICAgICAgICByYW5nZTogMTBcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgdGhpcy5fbGlnaHRzID0ge307XG4gICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRqdXN0IG9wdGlvbnMgYXQgcnVudGltZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMzggPSBMaWdodGluZy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zOC5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJhbmdlKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHVzZWQgRmllbGQtT2YtVmlldyBhbGdvXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4LnNldEZPViA9IGZ1bmN0aW9uIHNldEZPVihmb3YpIHtcbiAgICAgIHRoaXMuX2ZvdiA9IGZvdjtcbiAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCAob3IgcmVtb3ZlKSBhIGxpZ2h0IHNvdXJjZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5zZXRMaWdodCA9IGZ1bmN0aW9uIHNldExpZ2h0KHgsIHksIGNvbG9yKSB7XG4gICAgICB2YXIga2V5ID0geCArIFwiLFwiICsgeTtcblxuICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgIHRoaXMuX2xpZ2h0c1trZXldID0gdHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIgPyBmcm9tU3RyaW5nKGNvbG9yKSA6IGNvbG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlnaHQgc291cmNlc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5jbGVhckxpZ2h0cyA9IGZ1bmN0aW9uIGNsZWFyTGlnaHRzKCkge1xuICAgICAgdGhpcy5fbGlnaHRzID0ge307XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgcHJlLWNvbXB1dGVkIHRvcG9sb2d5IHZhbHVlcy4gQ2FsbCB3aGVuZXZlciB0aGUgdW5kZXJseWluZyBtYXAgY2hhbmdlcyBpdHMgbGlnaHQtcGFzc2FiaWxpdHkuXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4LnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB0aGUgbGlnaHRpbmdcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUobGlnaHRpbmdDYWxsYmFjaykge1xuICAgICAgdmFyIGRvbmVDZWxscyA9IHt9O1xuICAgICAgdmFyIGVtaXR0aW5nQ2VsbHMgPSB7fTtcbiAgICAgIHZhciBsaXRDZWxscyA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fbGlnaHRzKSB7XG4gICAgICAgIC8qIHByZXBhcmUgZW1pdHRlcnMgZm9yIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgdmFyIGxpZ2h0ID0gdGhpcy5fbGlnaHRzW2tleV07XG4gICAgICAgIGVtaXR0aW5nQ2VsbHNba2V5XSA9IFswLCAwLCAwXTtcbiAgICAgICAgYWRkXyhlbWl0dGluZ0NlbGxzW2tleV0sIGxpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLnBhc3NlczsgaSsrKSB7XG4gICAgICAgIC8qIG1haW4gbG9vcCAqL1xuICAgICAgICB0aGlzLl9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscyk7XG5cbiAgICAgICAgaWYgKGkgKyAxID09IHRoaXMuX29wdGlvbnMucGFzc2VzKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogbm90IGZvciB0aGUgbGFzdCBwYXNzICovXG5cblxuICAgICAgICBlbWl0dGluZ0NlbGxzID0gdGhpcy5fY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBsaXRLZXkgaW4gbGl0Q2VsbHMpIHtcbiAgICAgICAgLyogbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBhbmQgaG93IGlzIGxpdCAqL1xuICAgICAgICB2YXIgcGFydHMgPSBsaXRLZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICB2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgdmFyIHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgIGxpZ2h0aW5nQ2FsbGJhY2soeCwgeSwgbGl0Q2VsbHNbbGl0S2V5XSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBvbmUgaXRlcmF0aW9uIGZyb20gYWxsIGVtaXR0aW5nIGNlbGxzXG4gICAgICogQHBhcmFtIGVtaXR0aW5nQ2VsbHMgVGhlc2UgZW1pdCBsaWdodFxuICAgICAqIEBwYXJhbSBsaXRDZWxscyBBZGQgcHJvamVjdGVkIGxpZ2h0IHRvIHRoZXNlXG4gICAgICogQHBhcmFtIGRvbmVDZWxscyBUaGVzZSBhbHJlYWR5IGVtaXR0ZWQsIGZvcmJpZCB0aGVtIGZyb20gZnVydGhlciBjYWxjdWxhdGlvbnNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguX2VtaXRMaWdodCA9IGZ1bmN0aW9uIF9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgZm9yICh2YXIga2V5IGluIGVtaXR0aW5nQ2VsbHMpIHtcbiAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgdmFyIHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuXG4gICAgICAgIHRoaXMuX2VtaXRMaWdodEZyb21DZWxsKHgsIHksIGVtaXR0aW5nQ2VsbHNba2V5XSwgbGl0Q2VsbHMpO1xuXG4gICAgICAgIGRvbmVDZWxsc1trZXldID0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIGEgbGlzdCBvZiBlbWl0dGVycyBmb3IgbmV4dCBwYXNzXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4Ll9jb21wdXRlRW1pdHRlcnMgPSBmdW5jdGlvbiBfY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIGxpdENlbGxzKSB7XG4gICAgICAgIGlmIChrZXkgaW4gZG9uZUNlbGxzKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogYWxyZWFkeSBlbWl0dGVkICovXG5cblxuICAgICAgICB2YXIgX2NvbG9yID0gbGl0Q2VsbHNba2V5XTtcbiAgICAgICAgdmFyIHJlZmxlY3Rpdml0eSA9IHZvaWQgMDtcblxuICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlKSB7XG4gICAgICAgICAgcmVmbGVjdGl2aXR5ID0gdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgIHZhciB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgIHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrKHgsIHkpO1xuICAgICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV0gPSByZWZsZWN0aXZpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVmbGVjdGl2aXR5ID09IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiB3aWxsIG5vdCByZWZsZWN0IGF0IGFsbCAqL1xuXG4gICAgICAgIC8qIGNvbXB1dGUgZW1pc3Npb24gY29sb3IgKi9cblxuXG4gICAgICAgIHZhciBlbWlzc2lvbiA9IFswLCAwLCAwXTtcbiAgICAgICAgdmFyIGludGVuc2l0eSA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICB2YXIgcGFydCA9IE1hdGgucm91bmQoX2NvbG9yW2ldICogcmVmbGVjdGl2aXR5KTtcbiAgICAgICAgICBlbWlzc2lvbltpXSA9IHBhcnQ7XG4gICAgICAgICAgaW50ZW5zaXR5ICs9IHBhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW50ZW5zaXR5ID4gdGhpcy5fb3B0aW9ucy5lbWlzc2lvblRocmVzaG9sZCkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gZW1pc3Npb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIG9uZSBjZWxsXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4Ll9lbWl0TGlnaHRGcm9tQ2VsbCA9IGZ1bmN0aW9uIF9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBjb2xvciwgbGl0Q2VsbHMpIHtcbiAgICAgIHZhciBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgdmFyIGZvdjtcblxuICAgICAgaWYgKGtleSBpbiB0aGlzLl9mb3ZDYWNoZSkge1xuICAgICAgICBmb3YgPSB0aGlzLl9mb3ZDYWNoZVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm92ID0gdGhpcy5fdXBkYXRlRk9WKHgsIHkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBmb3ZLZXkgaW4gZm92KSB7XG4gICAgICAgIHZhciBmb3JtRmFjdG9yID0gZm92W2ZvdktleV07XG4gICAgICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG5cbiAgICAgICAgaWYgKGZvdktleSBpbiBsaXRDZWxscykge1xuICAgICAgICAgIC8qIGFscmVhZHkgbGl0ICovXG4gICAgICAgICAgcmVzdWx0ID0gbGl0Q2VsbHNbZm92S2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBuZXdseSBsaXQgKi9cbiAgICAgICAgICByZXN1bHQgPSBbMCwgMCwgMF07XG4gICAgICAgICAgbGl0Q2VsbHNbZm92S2V5XSA9IHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgcmVzdWx0W2ldICs9IE1hdGgucm91bmQoY29sb3JbaV0gKiBmb3JtRmFjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBhZGQgbGlnaHQgY29sb3IgKi9cblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgRk9WIChcImZvcm0gZmFjdG9yXCIpIGZvciBhIHBvdGVudGlhbCBsaWdodCBzb3VyY2UgYXQgW3gseV1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguX3VwZGF0ZUZPViA9IGZ1bmN0aW9uIF91cGRhdGVGT1YoeCwgeSkge1xuICAgICAgdmFyIGtleTEgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgdmFyIGNhY2hlID0ge307XG4gICAgICB0aGlzLl9mb3ZDYWNoZVtrZXkxXSA9IGNhY2hlO1xuICAgICAgdmFyIHJhbmdlID0gdGhpcy5fb3B0aW9ucy5yYW5nZTtcblxuICAgICAgZnVuY3Rpb24gY2IoeCwgeSwgciwgdmlzKSB7XG4gICAgICAgIHZhciBrZXkyID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgdmFyIGZvcm1GYWN0b3IgPSB2aXMgKiAoMSAtIHIgLyByYW5nZSk7XG5cbiAgICAgICAgaWYgKGZvcm1GYWN0b3IgPT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhY2hlW2tleTJdID0gZm9ybUZhY3RvcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZm92LmNvbXB1dGUoeCwgeSwgcmFuZ2UsIGNiLmJpbmQodGhpcykpO1xuXG4gICAgICByZXR1cm4gY2FjaGU7XG4gICAgfTtcblxuICAgIHJldHVybiBMaWdodGluZztcbiAgfSgpO1xuXG4gIHZhciBVdGlsID0gdXRpbDtcbiAgdmFyIENvbG9yID0gY29sb3I7XG4gIHZhciBUZXh0ID0gdGV4dDtcbiAgZXhwb3J0cy5VdGlsID0gVXRpbDtcbiAgZXhwb3J0cy5Db2xvciA9IENvbG9yO1xuICBleHBvcnRzLlRleHQgPSBUZXh0O1xuICBleHBvcnRzLlJORyA9IFJORyQxO1xuICBleHBvcnRzLkRpc3BsYXkgPSBEaXNwbGF5O1xuICBleHBvcnRzLlN0cmluZ0dlbmVyYXRvciA9IFN0cmluZ0dlbmVyYXRvcjtcbiAgZXhwb3J0cy5FdmVudFF1ZXVlID0gRXZlbnRRdWV1ZTtcbiAgZXhwb3J0cy5TY2hlZHVsZXIgPSBpbmRleDtcbiAgZXhwb3J0cy5GT1YgPSBpbmRleCQxO1xuICBleHBvcnRzLk1hcCA9IGluZGV4JDI7XG4gIGV4cG9ydHMuTm9pc2UgPSBpbmRleCQzO1xuICBleHBvcnRzLlBhdGggPSBpbmRleCQ0O1xuICBleHBvcnRzLkVuZ2luZSA9IEVuZ2luZTtcbiAgZXhwb3J0cy5MaWdodGluZyA9IExpZ2h0aW5nO1xuICBleHBvcnRzLkRFRkFVTFRfV0lEVEggPSBERUZBVUxUX1dJRFRIO1xuICBleHBvcnRzLkRFRkFVTFRfSEVJR0hUID0gREVGQVVMVF9IRUlHSFQ7XG4gIGV4cG9ydHMuRElSUyA9IERJUlM7XG4gIGV4cG9ydHMuS0VZUyA9IEtFWVM7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcbn0pO1xuXG4iLCJpbXBvcnQgKiBhcyBST1QgZnJvbSAncm90LWpzJztcbmltcG9ydCB7IENyZWF0ZUNhbGxiYWNrIH0gZnJvbSAncm90LWpzL2xpYi9tYXAvbWFwJztcblxuLyogdmFyIGQgPSBuZXcgUk9ULkRpc3BsYXkoKTtcbnZhciBvID0gZC5nZXRPcHRpb25zKCk7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZC5nZXRDb250YWluZXIoKSk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgby53aWR0aDsgaSsrKSB7XG5cdGZvciAodmFyIGogPSAwOyBqIDwgby5oZWlnaHQ7IGorKykge1xuXHRcdGlmICghaSB8fCAhaiB8fCBpICsgMSA9PSBvLndpZHRoIHx8IGogKyAxID09IG8uaGVpZ2h0KSB7XG5cdFx0XHRkLmRyYXcoaSwgaiwgXCIjXCIsIFwiZ3JheVwiLCBcImJsYWNrXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkLmRyYXcoaSwgaiwgXCIuXCIsIFwiIzY2NlwiLCBcImJsYWNrXCIpO1xuXHRcdH1cblx0fVxufVxuZC5kcmF3KG8ud2lkdGggPj4gMSwgby5oZWlnaHQgPj4gMSwgXCJAXCIsIFwiYmx1ZVwiLCBcInllbGxvd1wiKTsgKi9cblxuY2xhc3MgTXlEaWdnZXIgZXh0ZW5kcyBST1QuTWFwLkRpZ2dlclxue1xuXHRmdWNrKGNiPzogQ3JlYXRlQ2FsbGJhY2spe1xuXHRcdGNvbnNvbGUubG9nKFwiY3JlYXRlXCIpO1xuXHRcdHRoaXMuY3JlYXRlKGNiKTtcblx0fVxufVxuXG5ST1QuUk5HLnNldFNlZWQoMjIzNCk7XG52YXIgbWFwID0gbmV3IE15RGlnZ2VyKDUwLCA1MCk7XG52YXIgZGlzcGxheSA9IG5ldyBST1QuRGlzcGxheSh7Zm9udFNpemU6OH0pO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXNwbGF5LmdldENvbnRhaW5lcigpKTtcbm1hcC5mdWNrKGRpc3BsYXkuREVCVUcpO1xuXG4vKiB2YXIgZHJhd0Rvb3IgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgZGlzcGxheS5kcmF3KHgsIHksIFwiXCIsIFwiXCIsIFwicmVkXCIpO1xufVxuXG52YXIgcm9vbXMgPSBtYXAuZ2V0Um9vbXMoKTtcbmZvciAodmFyIGk9MDsgaTxyb29tcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByb29tID0gcm9vbXNbaV07XG4gICAgXG5cblx0cm9vbS5nZXREb29ycyhkcmF3RG9vcik7XG59ICovIl19
