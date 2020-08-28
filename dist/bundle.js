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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var ROT = __importStar(require("rot-js"));
var test_1 = require("./test");
var WEB = typeof window != 'undefined';
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.run = function () {
        var d = new ROT.Display({
            width: 11,
            height: 5,
            layout: WEB ? 'rect' : 'term'
        });
        if (WEB) {
            document.body.appendChild(d.getContainer());
        }
        for (var i = 0; i < d._options.width; i++) {
            for (var j = 0; j < d._options.height; j++) {
                if (!i || !j || i + 1 == d._options.width || j + 1 == d._options.height) {
                    d.draw(i, j, "#", "gray", "black");
                    d.draw(i, j, ".", "#666", "black");
                }
            }
        }
        d.draw(d._options.width >> 1, d._options.height >> 1, "@", "goldenrod", "black");
        d.drawText(0, 0, new test_1.Test().Do("fuck"));
    };
    return Main;
}());
exports.Main = Main;
new Main().run();

},{"./test":4,"rot-js":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.Do = function (s) {
        return '＃' + s;
    };
    return Test;
}());
exports.Test = Test;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JvdC1qcy9kaXN0L3JvdC5qcyIsInNyYy9tYWluLnRzIiwic3JjL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxdU9BLDBDQUE4QjtBQUM5QiwrQkFBOEI7QUFFOUIsSUFBSSxHQUFHLEdBQUcsT0FBTyxNQUFNLElBQUksV0FBVyxDQUFDO0FBRXZDO0lBQUE7SUF3QkEsQ0FBQztJQXRCQSxrQkFBRyxHQUFIO1FBQ0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLEVBQUU7WUFDUixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFVLENBQUMsQ0FBQztTQUNwRDtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUN4RSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ25DO2FBQ0Q7U0FDRDtRQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLFdBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRixXQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTtBQXhCWSxvQkFBSTtBQTBCakIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FDL0JqQjtJQUFBO0lBSUEsQ0FBQztJQUhVLGlCQUFFLEdBQVQsVUFBVSxDQUFTO1FBQ2YsT0FBTyxHQUFHLEdBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxvQkFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOiB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDogZmFjdG9yeShnbG9iYWwuUk9UID0ge30pO1xufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvKipcbiAgICogVGhpcyBjb2RlIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIEFsZWEgYWxnb3JpdGhtOyAoQykgMjAxMCBKb2hhbm5lcyBCYWFnw7hlLlxuICAgKiBBbGVhIGlzIGxpY2Vuc2VkIGFjY29yZGluZyB0byB0aGUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZS5cbiAgICovXG5cbiAgdmFyIEZSQUMgPSAyLjMyODMwNjQzNjUzODY5NjNlLTEwO1xuICAvKiAyXi0zMiAqL1xuXG4gIHZhciBSTkcgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSTkcoKSB7XG4gICAgICB0aGlzLl9zZWVkID0gMDtcbiAgICAgIHRoaXMuX3MwID0gMDtcbiAgICAgIHRoaXMuX3MxID0gMDtcbiAgICAgIHRoaXMuX3MyID0gMDtcbiAgICAgIHRoaXMuX2MgPSAwO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8gPSBSTkcucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvLmdldFNlZWQgPSBmdW5jdGlvbiBnZXRTZWVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZWVkIHRoZSBudW1iZXIgZ2VuZXJhdG9yXG4gICAgICovXG5cblxuICAgIF9wcm90by5zZXRTZWVkID0gZnVuY3Rpb24gc2V0U2VlZChzZWVkKSB7XG4gICAgICBzZWVkID0gc2VlZCA8IDEgPyAxIC8gc2VlZCA6IHNlZWQ7XG4gICAgICB0aGlzLl9zZWVkID0gc2VlZDtcbiAgICAgIHRoaXMuX3MwID0gKHNlZWQgPj4+IDApICogRlJBQztcbiAgICAgIHNlZWQgPSBzZWVkICogNjkwNjkgKyAxID4+PiAwO1xuICAgICAgdGhpcy5fczEgPSBzZWVkICogRlJBQztcbiAgICAgIHNlZWQgPSBzZWVkICogNjkwNjkgKyAxID4+PiAwO1xuICAgICAgdGhpcy5fczIgPSBzZWVkICogRlJBQztcbiAgICAgIHRoaXMuX2MgPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzAsMSksIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0VW5pZm9ybSA9IGZ1bmN0aW9uIGdldFVuaWZvcm0oKSB7XG4gICAgICB2YXIgdCA9IDIwOTE2MzkgKiB0aGlzLl9zMCArIHRoaXMuX2MgKiBGUkFDO1xuICAgICAgdGhpcy5fczAgPSB0aGlzLl9zMTtcbiAgICAgIHRoaXMuX3MxID0gdGhpcy5fczI7XG4gICAgICB0aGlzLl9jID0gdCB8IDA7XG4gICAgICB0aGlzLl9zMiA9IHQgLSB0aGlzLl9jO1xuICAgICAgcmV0dXJuIHRoaXMuX3MyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxvd2VyQm91bmQgVGhlIGxvd2VyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHBhcmFtIHVwcGVyQm91bmQgVGhlIHVwcGVyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFtsb3dlckJvdW5kLCB1cHBlckJvdW5kXSwgdXNpbmcgUk9ULlJORy5nZXRVbmlmb3JtKCkgdG8gZGlzdHJpYnV0ZSB0aGUgdmFsdWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldFVuaWZvcm1JbnQgPSBmdW5jdGlvbiBnZXRVbmlmb3JtSW50KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcbiAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBtZWFuIE1lYW4gdmFsdWVcbiAgICAgKiBAcGFyYW0gc3RkZGV2IFN0YW5kYXJkIGRldmlhdGlvbi4gfjk1JSBvZiB0aGUgYWJzb2x1dGUgdmFsdWVzIHdpbGwgYmUgbG93ZXIgdGhhbiAyKnN0ZGRldi5cbiAgICAgKiBAcmV0dXJucyBBIG5vcm1hbGx5IGRpc3RyaWJ1dGVkIHBzZXVkb3JhbmRvbSB2YWx1ZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0Tm9ybWFsID0gZnVuY3Rpb24gZ2V0Tm9ybWFsKG1lYW4sIHN0ZGRldikge1xuICAgICAgaWYgKG1lYW4gPT09IHZvaWQgMCkge1xuICAgICAgICBtZWFuID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZGRldiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHN0ZGRldiA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciB1LCB2LCByO1xuXG4gICAgICBkbyB7XG4gICAgICAgIHUgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICB2ID0gMiAqIHRoaXMuZ2V0VW5pZm9ybSgpIC0gMTtcbiAgICAgICAgciA9IHUgKiB1ICsgdiAqIHY7XG4gICAgICB9IHdoaWxlIChyID4gMSB8fCByID09IDApO1xuXG4gICAgICB2YXIgZ2F1c3MgPSB1ICogTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocikgLyByKTtcbiAgICAgIHJldHVybiBtZWFuICsgZ2F1c3MgKiBzdGRkZXY7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzEsMTAwXSBpbmNsdXNpdmUsIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0UGVyY2VudGFnZSA9IGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UoKSB7XG4gICAgICByZXR1cm4gMSArIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiAxMDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmFuZG9tbHkgcGlja2VkIGl0ZW0sIG51bGwgd2hlbiBsZW5ndGg9MFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oYXJyYXkpIHtcbiAgICAgIGlmICghYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgTmV3IGFycmF5IHdpdGggcmFuZG9taXplZCBpdGVtc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uc2h1ZmZsZSA9IGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhciBjbG9uZSA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICAgIHdoaWxlIChjbG9uZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIF9pbmRleCA9IGNsb25lLmluZGV4T2YodGhpcy5nZXRJdGVtKGNsb25lKSk7XG5cbiAgICAgICAgcmVzdWx0LnB1c2goY2xvbmUuc3BsaWNlKF9pbmRleCwgMSlbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGEga2V5PXdoYXRldmVyLCB2YWx1ZT13ZWlnaHQgKHJlbGF0aXZlIHByb2JhYmlsaXR5KVxuICAgICAqIEByZXR1cm5zIHdoYXRldmVyXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRXZWlnaHRlZFZhbHVlID0gZnVuY3Rpb24gZ2V0V2VpZ2h0ZWRWYWx1ZShkYXRhKSB7XG4gICAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgICBmb3IgKHZhciBfaWQgaW4gZGF0YSkge1xuICAgICAgICB0b3RhbCArPSBkYXRhW19pZF07XG4gICAgICB9XG5cbiAgICAgIHZhciByYW5kb20gPSB0aGlzLmdldFVuaWZvcm0oKSAqIHRvdGFsO1xuICAgICAgdmFyIGlkLFxuICAgICAgICAgIHBhcnQgPSAwO1xuXG4gICAgICBmb3IgKGlkIGluIGRhdGEpIHtcbiAgICAgICAgcGFydCArPSBkYXRhW2lkXTtcblxuICAgICAgICBpZiAocmFuZG9tIDwgcGFydCkge1xuICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBJZiBieSBzb21lIGZsb2F0aW5nLXBvaW50IGFubm95YW5jZSB3ZSBoYXZlXG4gICAgICAvLyByYW5kb20gPj0gdG90YWwsIGp1c3QgcmV0dXJuIHRoZSBsYXN0IGlkLlxuXG5cbiAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBSTkcgc3RhdGUuIFVzZWZ1bCBmb3Igc3RvcmluZyB0aGUgc3RhdGUgYW5kIHJlLXNldHRpbmcgaXQgdmlhIHNldFN0YXRlLlxuICAgICAqIEByZXR1cm5zIEludGVybmFsIHN0YXRlXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRTdGF0ZSA9IGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgcmV0dXJuIFt0aGlzLl9zMCwgdGhpcy5fczEsIHRoaXMuX3MyLCB0aGlzLl9jXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBhIHByZXZpb3VzbHkgcmV0cmlldmVkIHN0YXRlLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uc2V0U3RhdGUgPSBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgdGhpcy5fczAgPSBzdGF0ZVswXTtcbiAgICAgIHRoaXMuX3MxID0gc3RhdGVbMV07XG4gICAgICB0aGlzLl9zMiA9IHN0YXRlWzJdO1xuICAgICAgdGhpcy5fYyA9IHN0YXRlWzNdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmVkIFJOR1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICAgIHZhciBjbG9uZSA9IG5ldyBSTkcoKTtcbiAgICAgIHJldHVybiBjbG9uZS5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUk5HO1xuICB9KCk7XG5cbiAgdmFyIFJORyQxID0gbmV3IFJORygpLnNldFNlZWQoRGF0ZS5ub3coKSk7XG4gIC8qKlxuICAgKiBAY2xhc3MgQWJzdHJhY3QgZGlzcGxheSBiYWNrZW5kIG1vZHVsZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICB2YXIgQmFja2VuZCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhY2tlbmQoKSB7fVxuXG4gICAgdmFyIF9wcm90bzIgPSBCYWNrZW5kLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIF9wcm90bzIuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfTtcblxuICAgIHJldHVybiBCYWNrZW5kO1xuICB9KCk7XG5cbiAgdmFyIENhbnZhcyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9CYWNrZW5kKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQ2FudmFzLCBfQmFja2VuZCk7XG5cbiAgICBmdW5jdGlvbiBDYW52YXMoKSB7XG4gICAgICB2YXIgX3RoaXM7XG5cbiAgICAgIF90aGlzID0gX0JhY2tlbmQuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMuX2N0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8zID0gQ2FudmFzLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzMuc2NoZWR1bGUgPSBmdW5jdGlvbiBzY2hlZHVsZShjYikge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMy5nZXRDb250YWluZXIgPSBmdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY3R4LmNhbnZhcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMy5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICBfQmFja2VuZC5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICB2YXIgc3R5bGUgPSBvcHRzLmZvbnRTdHlsZSA/IG9wdHMuZm9udFN0eWxlICsgXCIgXCIgOiBcIlwiO1xuICAgICAgdmFyIGZvbnQgPSBzdHlsZSArIFwiIFwiICsgb3B0cy5mb250U2l6ZSArIFwicHggXCIgKyBvcHRzLmZvbnRGYW1pbHk7XG4gICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG5cbiAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcblxuICAgICAgdGhpcy5fY3R4LmZvbnQgPSBmb250O1xuICAgICAgdGhpcy5fY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICB0aGlzLl9jdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICB9O1xuXG4gICAgX3Byb3RvMy5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IHRoaXMuX29wdGlvbnMuYmc7XG5cbiAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCB0aGlzLl9jdHguY2FudmFzLndpZHRoLCB0aGlzLl9jdHguY2FudmFzLmhlaWdodCk7XG4gICAgfTtcblxuICAgIF9wcm90bzMuZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHZhciBjYW52YXMgPSB0aGlzLl9jdHguY2FudmFzO1xuICAgICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB4IC09IHJlY3QubGVmdDtcbiAgICAgIHkgLT0gcmVjdC50b3A7XG4gICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICB5ICo9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcblxuICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY2FudmFzLndpZHRoIHx8IHkgPj0gY2FudmFzLmhlaWdodCkge1xuICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2FudmFzO1xuICB9KEJhY2tlbmQpO1xuICAvKipcbiAgICogQWx3YXlzIHBvc2l0aXZlIG1vZHVsdXNcbiAgICogQHBhcmFtIHggT3BlcmFuZFxuICAgKiBAcGFyYW0gbiBNb2R1bHVzXG4gICAqIEByZXR1cm5zIHggbW9kdWxvIG5cbiAgICovXG5cblxuICBmdW5jdGlvbiBtb2QoeCwgbikge1xuICAgIHJldHVybiAoeCAlIG4gKyBuKSAlIG47XG4gIH1cblxuICBmdW5jdGlvbiBjbGFtcCh2YWwsIG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiA9PT0gdm9pZCAwKSB7XG4gICAgICBtaW4gPSAwO1xuICAgIH1cblxuICAgIGlmIChtYXggPT09IHZvaWQgMCkge1xuICAgICAgbWF4ID0gMTtcbiAgICB9XG5cbiAgICBpZiAodmFsIDwgbWluKSByZXR1cm4gbWluO1xuICAgIGlmICh2YWwgPiBtYXgpIHJldHVybiBtYXg7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgLyoqXG4gICAqIEZvcm1hdCBhIHN0cmluZyBpbiBhIGZsZXhpYmxlIHdheS4gU2NhbnMgZm9yICVzIHN0cmluZ3MgYW5kIHJlcGxhY2VzIHRoZW0gd2l0aCBhcmd1bWVudHMuIExpc3Qgb2YgcGF0dGVybnMgaXMgbW9kaWZpYWJsZSB2aWEgU3RyaW5nLmZvcm1hdC5tYXAuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0ge2FueX0gW2FyZ3ZdXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZm9ybWF0KHRlbXBsYXRlKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIG1hcCA9IGZvcm1hdC5tYXA7XG5cbiAgICB2YXIgcmVwbGFjZXIgPSBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCwgZ3JvdXAxLCBncm91cDIsIGluZGV4KSB7XG4gICAgICBpZiAodGVtcGxhdGUuY2hhckF0KGluZGV4IC0gMSkgPT0gXCIlXCIpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoLnN1YnN0cmluZygxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG5cbiAgICAgIHZhciBvYmogPSBhcmdzWzBdO1xuICAgICAgdmFyIGdyb3VwID0gZ3JvdXAxIHx8IGdyb3VwMjtcbiAgICAgIHZhciBwYXJ0cyA9IGdyb3VwLnNwbGl0KFwiLFwiKTtcbiAgICAgIHZhciBuYW1lID0gcGFydHMuc2hpZnQoKSB8fCBcIlwiO1xuICAgICAgdmFyIG1ldGhvZCA9IG1hcFtuYW1lLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG5cbiAgICAgIG9iaiA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIHZhciByZXBsYWNlZCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgcGFydHMpO1xuICAgICAgdmFyIGZpcnN0ID0gbmFtZS5jaGFyQXQoMCk7XG5cbiAgICAgIGlmIChmaXJzdCAhPSBmaXJzdC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgIHJlcGxhY2VkID0gY2FwaXRhbGl6ZShyZXBsYWNlZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXBsYWNlZDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoLyUoPzooW2Etel0rKXwoPzp7KFtefV0rKX0pKS9naSwgcmVwbGFjZXIpO1xuICB9XG5cbiAgZm9ybWF0Lm1hcCA9IHtcbiAgICBcInNcIjogXCJ0b1N0cmluZ1wiXG4gIH07XG4gIHZhciB1dGlsID1cbiAgLyojX19QVVJFX18qL1xuICBPYmplY3QuZnJlZXplKHtcbiAgICBtb2Q6IG1vZCxcbiAgICBjbGFtcDogY2xhbXAsXG4gICAgY2FwaXRhbGl6ZTogY2FwaXRhbGl6ZSxcbiAgICBmb3JtYXQ6IGZvcm1hdFxuICB9KTtcbiAgLyoqXG4gICAqIEBjbGFzcyBIZXhhZ29uYWwgYmFja2VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICB2YXIgSGV4ID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NhbnZhcykge1xuICAgIF9pbmhlcml0c0xvb3NlKEhleCwgX0NhbnZhcyk7XG5cbiAgICBmdW5jdGlvbiBIZXgoKSB7XG4gICAgICB2YXIgX3RoaXMyO1xuXG4gICAgICBfdGhpczIgPSBfQ2FudmFzLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzMi5fc3BhY2luZ1ggPSAwO1xuICAgICAgX3RoaXMyLl9zcGFjaW5nWSA9IDA7XG4gICAgICBfdGhpczIuX2hleFNpemUgPSAwO1xuICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvNCA9IEhleC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG80LmRyYXcgPSBmdW5jdGlvbiBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICBiZyA9IGRhdGFbNF07XG4gICAgICB2YXIgcHggPSBbKHggKyAxKSAqIHRoaXMuX3NwYWNpbmdYLCB5ICogdGhpcy5fc3BhY2luZ1kgKyB0aGlzLl9oZXhTaXplXTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgIHB4LnJldmVyc2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcblxuICAgICAgICB0aGlzLl9maWxsKHB4WzBdLCBweFsxXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghY2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgcHhbMF0sIE1hdGguY2VpbChweFsxXSkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG80LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICBhdmFpbFdpZHRoICs9IGF2YWlsSGVpZ2h0O1xuICAgICAgICBhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcbiAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpIC0gMTtcbiAgICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKChhdmFpbEhlaWdodCAtIDIgKiB0aGlzLl9oZXhTaXplKSAvIHRoaXMuX3NwYWNpbmdZICsgMSk7XG4gICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH07XG5cbiAgICBfcHJvdG80LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgIGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICBhdmFpbFdpZHRoIC09IGF2YWlsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICB2YXIgaGV4U2l6ZVdpZHRoID0gMiAqIGF2YWlsV2lkdGggLyAoKHRoaXMuX29wdGlvbnMud2lkdGggKyAxKSAqIE1hdGguc3FydCgzKSkgLSAxO1xuICAgICAgdmFyIGhleFNpemVIZWlnaHQgPSBhdmFpbEhlaWdodCAvICgyICsgMS41ICogKHRoaXMuX29wdGlvbnMuaGVpZ2h0IC0gMSkpO1xuICAgICAgdmFyIGhleFNpemUgPSBNYXRoLm1pbihoZXhTaXplV2lkdGgsIGhleFNpemVIZWlnaHQpOyAvLyBjb21wdXRlIGNoYXIgcmF0aW9cblxuICAgICAgdmFyIG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgIHZhciByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgaGV4U2l6ZSA9IE1hdGguZmxvb3IoaGV4U2l6ZSkgKyAxOyAvLyBjbG9zZXN0IGxhcmdlciBoZXhTaXplXG4gICAgICAvLyBGSVhNRSBjaGFyIHNpemUgY29tcHV0YXRpb24gZG9lcyBub3QgcmVzcGVjdCB0cmFuc3Bvc2VkIGhleGVzXG5cbiAgICAgIHZhciBmb250U2l6ZSA9IDIgKiBoZXhTaXplIC8gKHRoaXMuX29wdGlvbnMuc3BhY2luZyAqICgxICsgcmF0aW8gLyBNYXRoLnNxcnQoMykpKTsgLy8gY2xvc2VzdCBzbWFsbGVyIGZvbnRTaXplXG5cbiAgICAgIHJldHVybiBNYXRoLmNlaWwoZm9udFNpemUpIC0gMTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNC5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHZhciBub2RlU2l6ZTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgIHggKz0geTtcbiAgICAgICAgeSA9IHggLSB5O1xuICAgICAgICB4IC09IHk7XG4gICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy53aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBzaXplID0gbm9kZVNpemUgLyB0aGlzLl9vcHRpb25zLmhlaWdodDtcbiAgICAgIHkgPSBNYXRoLmZsb29yKHkgLyBzaXplKTtcblxuICAgICAgaWYgKG1vZCh5LCAyKSkge1xuICAgICAgICAvKiBvZGQgcm93ICovXG4gICAgICAgIHggLT0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgIHggPSAxICsgMiAqIE1hdGguZmxvb3IoeCAvICgyICogdGhpcy5fc3BhY2luZ1gpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHggPSAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXJndW1lbnRzIGFyZSBwaXhlbCB2YWx1ZXMuIElmIFwidHJhbnNwb3NlZFwiIG1vZGUgaXMgZW5hYmxlZCwgdGhlbiB0aGVzZSB0d28gYXJlIGFscmVhZHkgc3dhcHBlZC5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvNC5fZmlsbCA9IGZ1bmN0aW9uIF9maWxsKGN4LCBjeSkge1xuICAgICAgdmFyIGEgPSB0aGlzLl9oZXhTaXplO1xuICAgICAgdmFyIGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICBjdHgubW92ZVRvKGN4IC0gYSArIGIsIGN5KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgLyAyICsgYiwgY3kgKyB0aGlzLl9zcGFjaW5nWCAtIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAvIDIgLSBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC0gYiwgY3kpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAvIDIgLSBiLCBjeSAtIHRoaXMuX3NwYWNpbmdYICsgYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHgubW92ZVRvKGN4LCBjeSAtIGEgKyBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHRoaXMuX3NwYWNpbmdYIC0gYiwgY3kgLSBhIC8gMiArIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSArIGEgLyAyIC0gYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3gsIGN5ICsgYSAtIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gdGhpcy5fc3BhY2luZ1ggKyBiLCBjeSArIGEgLyAyIC0gYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICB9XG5cbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfTtcblxuICAgIF9wcm90bzQuX3VwZGF0ZVNpemUgPSBmdW5jdGlvbiBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgIHZhciBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICB0aGlzLl9oZXhTaXplID0gTWF0aC5mbG9vcihvcHRzLnNwYWNpbmcgKiAob3B0cy5mb250U2l6ZSArIGNoYXJXaWR0aCAvIE1hdGguc3FydCgzKSkgLyAyKTtcbiAgICAgIHRoaXMuX3NwYWNpbmdYID0gdGhpcy5faGV4U2l6ZSAqIE1hdGguc3FydCgzKSAvIDI7XG4gICAgICB0aGlzLl9zcGFjaW5nWSA9IHRoaXMuX2hleFNpemUgKiAxLjU7XG4gICAgICB2YXIgeHByb3A7XG4gICAgICB2YXIgeXByb3A7XG5cbiAgICAgIGlmIChvcHRzLnRyYW5zcG9zZSkge1xuICAgICAgICB4cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICAgIHlwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeHByb3AgPSBcIndpZHRoXCI7XG4gICAgICAgIHlwcm9wID0gXCJoZWlnaHRcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY3R4LmNhbnZhc1t4cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMud2lkdGggKyAxKSAqIHRoaXMuX3NwYWNpbmdYKTtcbiAgICAgIHRoaXMuX2N0eC5jYW52YXNbeXByb3BdID0gTWF0aC5jZWlsKChvcHRzLmhlaWdodCAtIDEpICogdGhpcy5fc3BhY2luZ1kgKyAyICogdGhpcy5faGV4U2l6ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBIZXg7XG4gIH0oQ2FudmFzKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBSZWN0YW5ndWxhciBiYWNrZW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG5cbiAgdmFyIFJlY3QgPVxuICAvKiogQGNsYXNzICovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgUmVjdCA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uIChfQ2FudmFzMikge1xuICAgICAgX2luaGVyaXRzTG9vc2UoUmVjdCwgX0NhbnZhczIpO1xuXG4gICAgICBmdW5jdGlvbiBSZWN0KCkge1xuICAgICAgICB2YXIgX3RoaXMzO1xuXG4gICAgICAgIF90aGlzMyA9IF9DYW52YXMyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMzLl9zcGFjaW5nWCA9IDA7XG4gICAgICAgIF90aGlzMy5fc3BhY2luZ1kgPSAwO1xuICAgICAgICBfdGhpczMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICAgIHJldHVybiBfdGhpczM7XG4gICAgICB9XG5cbiAgICAgIHZhciBfcHJvdG81ID0gUmVjdC5wcm90b3R5cGU7XG5cbiAgICAgIF9wcm90bzUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBfQ2FudmFzMi5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81LmRyYXcgPSBmdW5jdGlvbiBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGlmIChSZWN0LmNhY2hlKSB7XG4gICAgICAgICAgdGhpcy5fZHJhd1dpdGhDYWNoZShkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kcmF3Tm9DYWNoZShkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuX2RyYXdXaXRoQ2FjaGUgPSBmdW5jdGlvbiBfZHJhd1dpdGhDYWNoZShkYXRhKSB7XG4gICAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgICAgYmcgPSBkYXRhWzRdO1xuICAgICAgICB2YXIgaGFzaCA9IFwiXCIgKyBjaCArIGZnICsgYmc7XG4gICAgICAgIHZhciBjYW52YXM7XG5cbiAgICAgICAgaWYgKGhhc2ggaW4gdGhpcy5fY2FudmFzQ2FjaGUpIHtcbiAgICAgICAgICBjYW52YXMgPSB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuX3NwYWNpbmdZO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICBjdHguZmlsbFJlY3QoYiwgYiwgY2FudmFzLndpZHRoIC0gYiwgY2FudmFzLmhlaWdodCAtIGIpO1xuXG4gICAgICAgICAgaWYgKGNoKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICBjdHguZm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICAgICAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCB0aGlzLl9zcGFjaW5nWCAvIDIsIE1hdGguY2VpbCh0aGlzLl9zcGFjaW5nWSAvIDIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXSA9IGNhbnZhcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGhpcy5fc3BhY2luZ1gsIHkgKiB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81Ll9kcmF3Tm9DYWNoZSA9IGZ1bmN0aW9uIF9kcmF3Tm9DYWNoZShkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICAgIGJnID0gZGF0YVs0XTtcblxuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICB2YXIgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcblxuICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGhpcy5fc3BhY2luZ1ggKyBiLCB5ICogdGhpcy5fc3BhY2luZ1kgKyBiLCB0aGlzLl9zcGFjaW5nWCAtIGIsIHRoaXMuX3NwYWNpbmdZIC0gYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sICh4ICsgMC41KSAqIHRoaXMuX3NwYWNpbmdYLCBNYXRoLmNlaWwoKHkgKyAwLjUpICogdGhpcy5fc3BhY2luZ1kpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICB2YXIgYm94V2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcbiAgICAgICAgdmFyIGJveEhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLmhlaWdodCk7XG4gICAgICAgIC8qIGNvbXB1dGUgY2hhciByYXRpbyAqL1xuXG4gICAgICAgIHZhciBvbGRGb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IG9sZEZvbnQ7XG4gICAgICAgIHZhciByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgICB2YXIgd2lkdGhGcmFjdGlvbiA9IHJhdGlvICogYm94SGVpZ2h0IC8gYm94V2lkdGg7XG5cbiAgICAgICAgaWYgKHdpZHRoRnJhY3Rpb24gPiAxKSB7XG4gICAgICAgICAgLyogdG9vIHdpZGUgd2l0aCBjdXJyZW50IGFzcGVjdCByYXRpbyAqL1xuICAgICAgICAgIGJveEhlaWdodCA9IE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gd2lkdGhGcmFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnNwYWNpbmcpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9zcGFjaW5nWCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX3NwYWNpbmdZKV07XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81Ll91cGRhdGVTaXplID0gZnVuY3Rpb24gX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgdmFyIGNoYXJXaWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogY2hhcldpZHRoKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogb3B0cy5mb250U2l6ZSk7XG5cbiAgICAgICAgaWYgKG9wdHMuZm9yY2VTcXVhcmVSYXRpbykge1xuICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1kgPSBNYXRoLm1heCh0aGlzLl9zcGFjaW5nWCwgdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGggKiB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodCAqIHRoaXMuX3NwYWNpbmdZO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIFJlY3Q7XG4gICAgfShDYW52YXMpO1xuXG4gICAgUmVjdC5jYWNoZSA9IGZhbHNlO1xuICAgIHJldHVybiBSZWN0O1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgVGlsZSBiYWNrZW5kXG4gICAqIEBwcml2YXRlXG4gICAqL1xuXG5cbiAgdmFyIFRpbGUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQ2FudmFzMykge1xuICAgIF9pbmhlcml0c0xvb3NlKFRpbGUsIF9DYW52YXMzKTtcblxuICAgIGZ1bmN0aW9uIFRpbGUoKSB7XG4gICAgICB2YXIgX3RoaXM0O1xuXG4gICAgICBfdGhpczQgPSBfQ2FudmFzMy5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczQuX2NvbG9yQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIHJldHVybiBfdGhpczQ7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzYgPSBUaWxlLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzYuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgIHZhciB4ID0gZGF0YVswXSxcbiAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgZmcgPSBkYXRhWzNdLFxuICAgICAgICAgIGJnID0gZGF0YVs0XTtcbiAgICAgIHZhciB0aWxlV2lkdGggPSB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aDtcbiAgICAgIHZhciB0aWxlSGVpZ2h0ID0gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0O1xuXG4gICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgdGhpcy5fY3R4LmNsZWFyUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG5cbiAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFjaCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICB2YXIgZmdzID0gW10uY29uY2F0KGZnKTtcbiAgICAgIHZhciBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGhpcy5fb3B0aW9ucy50aWxlTWFwW2NoYXJzW2ldXTtcblxuICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFyIFxcXCJcIiArIGNoYXJzW2ldICsgXCJcXFwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgLy8gYXBwbHkgY29sb3JpemF0aW9uXG4gICAgICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgIHZhciBfZmcgPSBmZ3NbaV07XG4gICAgICAgICAgdmFyIF9iZyA9IGJnc1tpXTtcbiAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLl9vcHRpb25zLnRpbGVTZXQsIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcblxuICAgICAgICAgIGlmIChfZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IF9mZztcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChfYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IF9iZztcbiAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG82LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKTtcbiAgICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KTtcbiAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfTtcblxuICAgIF9wcm90bzYuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH07XG5cbiAgICBfcHJvdG82Ll9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH07XG5cbiAgICBfcHJvdG82Ll91cGRhdGVTaXplID0gZnVuY3Rpb24gX3VwZGF0ZVNpemUoKSB7XG4gICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoO1xuICAgICAgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodCAqIG9wdHMudGlsZUhlaWdodDtcbiAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLndpZHRoID0gb3B0cy50aWxlV2lkdGg7XG4gICAgICB0aGlzLl9jb2xvckNhbnZhcy5oZWlnaHQgPSBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgfTtcblxuICAgIHJldHVybiBUaWxlO1xuICB9KENhbnZhcyk7XG5cbiAgZnVuY3Rpb24gZnJvbVN0cmluZyhzdHIpIHtcbiAgICB2YXIgY2FjaGVkLCByO1xuXG4gICAgaWYgKHN0ciBpbiBDQUNIRSkge1xuICAgICAgY2FjaGVkID0gQ0FDSEVbc3RyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0ci5jaGFyQXQoMCkgPT0gXCIjXCIpIHtcbiAgICAgICAgLy8gaGV4IHJnYlxuICAgICAgICB2YXIgbWF0Y2hlZCA9IHN0ci5tYXRjaCgvWzAtOWEtZl0vZ2kpIHx8IFtdO1xuICAgICAgICB2YXIgdmFsdWVzID0gbWF0Y2hlZC5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoeCwgMTYpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodmFsdWVzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgY2FjaGVkID0gdmFsdWVzLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggKiAxNztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2kgKyAxXSArPSAxNiAqIHZhbHVlc1tpXTtcbiAgICAgICAgICAgIHZhbHVlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FjaGVkID0gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHIgPSBzdHIubWF0Y2goL3JnYlxcKChbMC05LCBdKylcXCkvaSkpIHtcbiAgICAgICAgLy8gZGVjaW1hbCByZ2JcbiAgICAgICAgY2FjaGVkID0gclsxXS5zcGxpdCgvXFxzKixcXHMqLykubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGh0bWwgbmFtZVxuICAgICAgICBjYWNoZWQgPSBbMCwgMCwgMF07XG4gICAgICB9XG5cbiAgICAgIENBQ0hFW3N0cl0gPSBjYWNoZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlZC5zbGljZSgpO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgdHdvIG9yIG1vcmUgY29sb3JzXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYWRkKGNvbG9yMSkge1xuICAgIHZhciByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgY29sb3JzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGNvbG9yc1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcmVzdWx0W2ldICs9IGNvbG9yc1tqXVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiBBZGQgdHdvIG9yIG1vcmUgY29sb3JzLCBNT0RJRklFUyBGSVJTVCBBUkdVTUVOVFxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGFkZF8oY29sb3IxKSB7XG4gICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBjb2xvcnMgPSBuZXcgQXJyYXkoX2xlbjMgPiAxID8gX2xlbjMgLSAxIDogMCksIF9rZXkzID0gMTsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgY29sb3JzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb2xvcjFbaV0gKz0gY29sb3JzW2pdW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb2xvcjE7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IChtaXgpIHR3byBvciBtb3JlIGNvbG9yc1xuICAgKi9cblxuXG4gIGZ1bmN0aW9uIG11bHRpcGx5KGNvbG9yMSkge1xuICAgIHZhciByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIF9sZW40ID0gYXJndW1lbnRzLmxlbmd0aCwgY29sb3JzID0gbmV3IEFycmF5KF9sZW40ID4gMSA/IF9sZW40IC0gMSA6IDApLCBfa2V5NCA9IDE7IF9rZXk0IDwgX2xlbjQ7IF9rZXk0KyspIHtcbiAgICAgIGNvbG9yc1tfa2V5NCAtIDFdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcmVzdWx0W2ldICo9IGNvbG9yc1tqXVtpXSAvIDI1NTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IChtaXgpIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAgICovXG5cblxuICBmdW5jdGlvbiBtdWx0aXBseV8oY29sb3IxKSB7XG4gICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBjb2xvcnMgPSBuZXcgQXJyYXkoX2xlbjUgPiAxID8gX2xlbjUgLSAxIDogMCksIF9rZXk1ID0gMTsgX2tleTUgPCBfbGVuNTsgX2tleTUrKykge1xuICAgICAgY29sb3JzW19rZXk1IC0gMV0gPSBhcmd1bWVudHNbX2tleTVdO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb2xvcjFbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgfVxuXG4gICAgICBjb2xvcjFbaV0gPSBNYXRoLnJvdW5kKGNvbG9yMVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbG9yMTtcbiAgfVxuICAvKipcbiAgICogSW50ZXJwb2xhdGUgKGJsZW5kKSB0d28gY29sb3JzIHdpdGggYSBnaXZlbiBmYWN0b3JcbiAgICovXG5cblxuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZShjb2xvcjEsIGNvbG9yMiwgZmFjdG9yKSB7XG4gICAgaWYgKGZhY3RvciA9PT0gdm9pZCAwKSB7XG4gICAgICBmYWN0b3IgPSAwLjU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldICsgZmFjdG9yICogKGNvbG9yMltpXSAtIGNvbG9yMVtpXSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgbGVycCA9IGludGVycG9sYXRlO1xuICAvKipcbiAgICogSW50ZXJwb2xhdGUgKGJsZW5kKSB0d28gY29sb3JzIHdpdGggYSBnaXZlbiBmYWN0b3IgaW4gSFNMIG1vZGVcbiAgICovXG5cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGVIU0woY29sb3IxLCBjb2xvcjIsIGZhY3Rvcikge1xuICAgIGlmIChmYWN0b3IgPT09IHZvaWQgMCkge1xuICAgICAgZmFjdG9yID0gMC41O1xuICAgIH1cblxuICAgIHZhciBoc2wxID0gcmdiMmhzbChjb2xvcjEpO1xuICAgIHZhciBoc2wyID0gcmdiMmhzbChjb2xvcjIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGhzbDFbaV0gKz0gZmFjdG9yICogKGhzbDJbaV0gLSBoc2wxW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHNsMnJnYihoc2wxKTtcbiAgfVxuXG4gIHZhciBsZXJwSFNMID0gaW50ZXJwb2xhdGVIU0w7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmFuZG9tIGNvbG9yIGJhc2VkIG9uIHRoaXMgb25lXG4gICAqIEBwYXJhbSBjb2xvclxuICAgKiBAcGFyYW0gZGlmZiBTZXQgb2Ygc3RhbmRhcmQgZGV2aWF0aW9uc1xuICAgKi9cblxuICBmdW5jdGlvbiByYW5kb21pemUoY29sb3IsIGRpZmYpIHtcbiAgICBpZiAoIShkaWZmIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBkaWZmID0gTWF0aC5yb3VuZChSTkckMS5nZXROb3JtYWwoMCwgZGlmZikpO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBjb2xvci5zbGljZSgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIHJlc3VsdFtpXSArPSBkaWZmIGluc3RhbmNlb2YgQXJyYXkgPyBNYXRoLnJvdW5kKFJORyQxLmdldE5vcm1hbCgwLCBkaWZmW2ldKSkgOiBkaWZmO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU0wuIEV4cGVjdHMgMC4uMjU1IGlucHV0cywgcHJvZHVjZXMgMC4uMSBvdXRwdXRzLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHJnYjJoc2woY29sb3IpIHtcbiAgICB2YXIgciA9IGNvbG9yWzBdIC8gMjU1O1xuICAgIHZhciBnID0gY29sb3JbMV0gLyAyNTU7XG4gICAgdmFyIGIgPSBjb2xvclsyXSAvIDI1NTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBoID0gMCxcbiAgICAgICAgcyxcbiAgICAgICAgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgIGlmIChtYXggPT0gbWluKSB7XG4gICAgICBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcblxuICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgY2FzZSByOlxuICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIGI6XG4gICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaCAvPSA2O1xuICAgIH1cblxuICAgIHJldHVybiBbaCwgcywgbF07XG4gIH1cblxuICBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHQgKz0gMTtcbiAgICBpZiAodCA+IDEpIHQgLT0gMTtcbiAgICBpZiAodCA8IDEgLyA2KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcbiAgICBpZiAodCA8IDIgLyAzKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDY7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuIEV4cGVjdHMgMC4uMSBpbnB1dHMsIHByb2R1Y2VzIDAuLjI1NSBvdXRwdXRzLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGhzbDJyZ2IoY29sb3IpIHtcbiAgICB2YXIgbCA9IGNvbG9yWzJdO1xuXG4gICAgaWYgKGNvbG9yWzFdID09IDApIHtcbiAgICAgIGwgPSBNYXRoLnJvdW5kKGwgKiAyNTUpO1xuICAgICAgcmV0dXJuIFtsLCBsLCBsXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHMgPSBjb2xvclsxXTtcbiAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgICAgdmFyIHIgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdICsgMSAvIDMpO1xuICAgICAgdmFyIGcgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdKTtcbiAgICAgIHZhciBiID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSAtIDEgLyAzKTtcbiAgICAgIHJldHVybiBbTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KV07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9SR0IoY29sb3IpIHtcbiAgICB2YXIgY2xhbXBlZCA9IGNvbG9yLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIGNsYW1wKHgsIDAsIDI1NSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFwicmdiKFwiICsgY2xhbXBlZC5qb2luKFwiLFwiKSArIFwiKVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9IZXgoY29sb3IpIHtcbiAgICB2YXIgY2xhbXBlZCA9IGNvbG9yLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIGNsYW1wKHgsIDAsIDI1NSkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gXCIjXCIgKyBjbGFtcGVkLmpvaW4oXCJcIik7XG4gIH1cblxuICB2YXIgQ0FDSEUgPSB7XG4gICAgXCJibGFja1wiOiBbMCwgMCwgMF0sXG4gICAgXCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxuICAgIFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXG4gICAgXCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxuICAgIFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcbiAgICBcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcbiAgICBcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxuICAgIFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxuICAgIFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcbiAgICBcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXG4gICAgXCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXG4gICAgXCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxuICAgIFwibGltZVwiOiBbMCwgMjU1LCAwXSxcbiAgICBcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXG4gICAgXCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcbiAgICBcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXG4gICAgXCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxuICAgIFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcbiAgICBcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcbiAgICBcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxuICAgIFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxuICAgIFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxuICAgIFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxuICAgIFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxuICAgIFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxuICAgIFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcbiAgICBcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXG4gICAgXCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXG4gICAgXCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXG4gICAgXCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXG4gICAgXCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXG4gICAgXCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXG4gICAgXCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcbiAgICBcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcbiAgICBcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxuICAgIFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxuICAgIFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXG4gICAgXCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxuICAgIFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxuICAgIFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcbiAgICBcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXG4gICAgXCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxuICAgIFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcbiAgICBcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXG4gICAgXCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxuICAgIFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXG4gICAgXCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTZdLFxuICAgIFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxuICAgIFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcbiAgICBcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXG4gICAgXCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXSxcbiAgICBcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxuICAgIFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcbiAgICBcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgXCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcbiAgICBcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxuICAgIFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxuICAgIFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXG4gICAgXCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcbiAgICBcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXG4gICAgXCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXG4gICAgXCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxuICAgIFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcbiAgICBcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgXCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXG4gICAgXCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcbiAgICBcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXG4gICAgXCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXG4gICAgXCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxuICAgIFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJwYWxldmlvbGV0cmVkXCI6IFsyMTYsIDExMiwgMTQ3XSxcbiAgICBcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxuICAgIFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcbiAgICBcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgXCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcbiAgICBcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXG4gICAgXCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxuICAgIFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxuICAgIFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgXCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxuICAgIFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXG4gICAgXCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgXCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgXCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXG4gICAgXCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxuICAgIFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxuICAgIFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgXCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxuICAgIFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXG4gICAgXCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxuICAgIFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcbiAgICBcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcbiAgICBcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxuICAgIFwicmVkXCI6IFsyNTUsIDAsIDBdLFxuICAgIFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXG4gICAgXCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxuICAgIFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXG4gICAgXCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcbiAgICBcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxuICAgIFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxuICAgIFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXG4gICAgXCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxuICAgIFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXG4gICAgXCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXG4gICAgXCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxuICAgIFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxuICAgIFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxuICAgIFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcbiAgICBcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgXCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXG4gICAgXCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcbiAgICBcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxuICAgIFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcbiAgICBcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcbiAgICBcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxuICAgIFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXG4gICAgXCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgXCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXG4gICAgXCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV1cbiAgfTtcbiAgdmFyIGNvbG9yID1cbiAgLyojX19QVVJFX18qL1xuICBPYmplY3QuZnJlZXplKHtcbiAgICBmcm9tU3RyaW5nOiBmcm9tU3RyaW5nLFxuICAgIGFkZDogYWRkLFxuICAgIGFkZF86IGFkZF8sXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5LFxuICAgIG11bHRpcGx5XzogbXVsdGlwbHlfLFxuICAgIGludGVycG9sYXRlOiBpbnRlcnBvbGF0ZSxcbiAgICBsZXJwOiBsZXJwLFxuICAgIGludGVycG9sYXRlSFNMOiBpbnRlcnBvbGF0ZUhTTCxcbiAgICBsZXJwSFNMOiBsZXJwSFNMLFxuICAgIHJhbmRvbWl6ZTogcmFuZG9taXplLFxuICAgIHJnYjJoc2w6IHJnYjJoc2wsXG4gICAgaHNsMnJnYjogaHNsMnJnYixcbiAgICB0b1JHQjogdG9SR0IsXG4gICAgdG9IZXg6IHRvSGV4XG4gIH0pO1xuICAvKipcbiAgICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICB2YXIgVGlsZUdMID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0JhY2tlbmQyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoVGlsZUdMLCBfQmFja2VuZDIpO1xuXG4gICAgZnVuY3Rpb24gVGlsZUdMKCkge1xuICAgICAgdmFyIF90aGlzNTtcblxuICAgICAgX3RoaXM1ID0gX0JhY2tlbmQyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzNS5fdW5pZm9ybXMgPSB7fTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgX3RoaXM1Ll9nbCA9IF90aGlzNS5faW5pdFdlYkdMKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpczU7XG4gICAgfVxuXG4gICAgVGlsZUdMLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwge1xuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgX3Byb3RvNyA9IFRpbGVHTC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG83LnNjaGVkdWxlID0gZnVuY3Rpb24gc2NoZWR1bGUoY2IpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7XG4gICAgfTtcblxuICAgIF9wcm90bzcuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2dsLmNhbnZhcztcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgX0JhY2tlbmQyLnByb3RvdHlwZS5zZXRPcHRpb25zLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcblxuICAgICAgdmFyIHRpbGVTZXQgPSB0aGlzLl9vcHRpb25zLnRpbGVTZXQ7XG5cbiAgICAgIGlmICh0aWxlU2V0ICYmIFwiY29tcGxldGVcIiBpbiB0aWxlU2V0ICYmICF0aWxlU2V0LmNvbXBsZXRlKSB7XG4gICAgICAgIHRpbGVTZXQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpczYuX3VwZGF0ZVRleHR1cmUodGlsZVNldCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvNy5kcmF3ID0gZnVuY3Rpb24gZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICBiZyA9IGRhdGFbNF07XG4gICAgICB2YXIgc2Npc3NvclkgPSBnbC5jYW52YXMuaGVpZ2h0IC0gKHkgKyAxKSAqIG9wdHMudGlsZUhlaWdodDtcbiAgICAgIGdsLnNjaXNzb3IoeCAqIG9wdHMudGlsZVdpZHRoLCBzY2lzc29yWSwgb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodCk7XG5cbiAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICBnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdsLmNsZWFyQ29sb3IuYXBwbHkoZ2wsIHBhcnNlQ29sb3IoYmcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgIHZhciBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuICAgICAgdmFyIGZncyA9IFtdLmNvbmNhdChmZyk7XG4gICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0UG9zUmVsXCJdLCBbeCwgeV0pO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0aWxlID0gdGhpcy5fb3B0aW9ucy50aWxlTWFwW2NoYXJzW2ldXTtcblxuICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaGFyIFxcXCJcIiArIGNoYXJzW2ldICsgXCJcXFwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wudW5pZm9ybTFmKHRoaXMuX3VuaWZvcm1zW1wiY29sb3JpemVcIl0sIG9wdHMudGlsZUNvbG9yaXplID8gMSA6IDApO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZXNldFBvc0Fic1wiXSwgdGlsZSk7XG5cbiAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcInRpbnRcIl0sIHBhcnNlQ29sb3IoZmdzW2ldKSk7XG4gICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcImJnXCJdLCBwYXJzZUNvbG9yKGJnc1tpXSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgXG4gICAgICBcbiAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xuICAgICAgXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHsgLy8gYXBwbHkgY29sb3JpemF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIGxldCBmZyA9IGZnc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBiZ3NbaV07XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIGlmIChiZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4KnRpbGVXaWR0aCwgeSp0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbm8gY29sb3JpemluZywgZWFzeVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMudGlsZVNldCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgXG4gICAgICAqL1xuXG4gICAgfTtcblxuICAgIF9wcm90bzcuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgZ2wuY2xlYXJDb2xvci5hcHBseShnbCwgcGFyc2VDb2xvcih0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgICBnbC5zY2lzc29yKDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodCk7XG4gICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XG4gICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH07XG5cbiAgICBfcHJvdG83LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGUgYmFja2VuZCBkb2VzIG5vdCB1bmRlcnN0YW5kIGZvbnQgc2l6ZVwiKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuX2dsLmNhbnZhcztcbiAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgeCAtPSByZWN0LmxlZnQ7XG4gICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgeCAqPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgeSAqPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG5cbiAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IGNhbnZhcy53aWR0aCB8fCB5ID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5faW5pdFdlYkdMID0gZnVuY3Rpb24gX2luaXRXZWJHTCgpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICB2YXIgZ2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwge1xuICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWVcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmdsID0gZ2w7XG4gICAgICB2YXIgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0oZ2wsIFZTLCBGUyk7XG4gICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgY3JlYXRlUXVhZChnbCk7XG4gICAgICBVTklGT1JNUy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBfdGhpczcuX3VuaWZvcm1zW25hbWVdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEsIGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICBnbC5lbmFibGUoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICAgIHJldHVybiBnbDtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpXTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5fdXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIF91cGRhdGVTaXplKCkge1xuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XG4gICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICB2YXIgY2FudmFzU2l6ZSA9IFtvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGgsIG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0XTtcbiAgICAgIGdsLmNhbnZhcy53aWR0aCA9IGNhbnZhc1NpemVbMF07XG4gICAgICBnbC5jYW52YXMuaGVpZ2h0ID0gY2FudmFzU2l6ZVsxXTtcbiAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIGNhbnZhc1NpemVbMF0sIGNhbnZhc1NpemVbMV0pO1xuICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVTaXplXCJdLCBbb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodF0pO1xuICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRhcmdldFNpemVcIl0sIGNhbnZhc1NpemUpO1xuICAgIH07XG5cbiAgICBfcHJvdG83Ll91cGRhdGVUZXh0dXJlID0gZnVuY3Rpb24gX3VwZGF0ZVRleHR1cmUodGlsZVNldCkge1xuICAgICAgY3JlYXRlVGV4dHVyZSh0aGlzLl9nbCwgdGlsZVNldCk7XG4gICAgfTtcblxuICAgIHJldHVybiBUaWxlR0w7XG4gIH0oQmFja2VuZCk7XG5cbiAgdmFyIFVOSUZPUk1TID0gW1widGFyZ2V0UG9zUmVsXCIsIFwidGlsZXNldFBvc0Fic1wiLCBcInRpbGVTaXplXCIsIFwidGFyZ2V0U2l6ZVwiLCBcImNvbG9yaXplXCIsIFwiYmdcIiwgXCJ0aW50XCJdO1xuICB2YXIgVlMgPSBcIlxcbiN2ZXJzaW9uIDMwMCBlc1xcblxcbmluIHZlYzIgdGlsZVBvc1JlbDtcXG5vdXQgdmVjMiB0aWxlc2V0UG9zUHg7XFxuXFxudW5pZm9ybSB2ZWMyIHRpbGVzZXRQb3NBYnM7XFxudW5pZm9ybSB2ZWMyIHRpbGVTaXplO1xcbnVuaWZvcm0gdmVjMiB0YXJnZXRTaXplO1xcbnVuaWZvcm0gdmVjMiB0YXJnZXRQb3NSZWw7XFxuXFxudm9pZCBtYWluKCkge1xcblxcdHZlYzIgdGFyZ2V0UG9zUHggPSAodGFyZ2V0UG9zUmVsICsgdGlsZVBvc1JlbCkgKiB0aWxlU2l6ZTtcXG5cXHR2ZWMyIHRhcmdldFBvc05kYyA9ICgodGFyZ2V0UG9zUHggLyB0YXJnZXRTaXplKS0wLjUpKjIuMDtcXG5cXHR0YXJnZXRQb3NOZGMueSAqPSAtMS4wO1xcblxcblxcdGdsX1Bvc2l0aW9uID0gdmVjNCh0YXJnZXRQb3NOZGMsIDAuMCwgMS4wKTtcXG5cXHR0aWxlc2V0UG9zUHggPSB0aWxlc2V0UG9zQWJzICsgdGlsZVBvc1JlbCAqIHRpbGVTaXplO1xcbn1cIi50cmltKCk7XG4gIHZhciBGUyA9IFwiXFxuI3ZlcnNpb24gMzAwIGVzXFxucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xcblxcbmluIHZlYzIgdGlsZXNldFBvc1B4O1xcbm91dCB2ZWM0IGZyYWdDb2xvcjtcXG51bmlmb3JtIHNhbXBsZXIyRCBpbWFnZTtcXG51bmlmb3JtIGJvb2wgY29sb3JpemU7XFxudW5pZm9ybSB2ZWM0IGJnO1xcbnVuaWZvcm0gdmVjNCB0aW50O1xcblxcbnZvaWQgbWFpbigpIHtcXG5cXHRmcmFnQ29sb3IgPSB2ZWM0KDAsIDAsIDAsIDEpO1xcblxcblxcdHZlYzQgdGV4ZWwgPSB0ZXhlbEZldGNoKGltYWdlLCBpdmVjMih0aWxlc2V0UG9zUHgpLCAwKTtcXG5cXG5cXHRpZiAoY29sb3JpemUpIHtcXG5cXHRcXHR0ZXhlbC5yZ2IgPSB0aW50LmEgKiB0aW50LnJnYiArICgxLjAtdGludC5hKSAqIHRleGVsLnJnYjtcXG5cXHRcXHRmcmFnQ29sb3IucmdiID0gdGV4ZWwuYSp0ZXhlbC5yZ2IgKyAoMS4wLXRleGVsLmEpKmJnLnJnYjtcXG5cXHRcXHRmcmFnQ29sb3IuYSA9IHRleGVsLmEgKyAoMS4wLXRleGVsLmEpKmJnLmE7XFxuXFx0fSBlbHNlIHtcXG5cXHRcXHRmcmFnQ29sb3IgPSB0ZXhlbDtcXG5cXHR9XFxufVwiLnRyaW0oKTtcblxuICBmdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2c3MsIGZzcykge1xuICAgIHZhciB2cyA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodnMsIHZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2cyk7XG5cbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2cywgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh2cykgfHwgXCJcIik7XG4gICAgfVxuXG4gICAgdmFyIGZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZzLCBmc3MpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnMpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coZnMpIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHZhciBwID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwLCB2cyk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIGZzKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwKTtcblxuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRQcm9ncmFtSW5mb0xvZyhwKSB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVF1YWQoZ2wpIHtcbiAgICB2YXIgcG9zID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMCwgMCwgMSwgMSwgMV0pO1xuICAgIHZhciBidWYgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgcG9zLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoMCk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcigwLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGV4dHVyZShnbCwgZGF0YSkge1xuICAgIHZhciB0ID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHQpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5SRVBFQVQpO1xuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIDApO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG4gICAgcmV0dXJuIHQ7XG4gIH1cblxuICB2YXIgY29sb3JDYWNoZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3IpIHtcbiAgICBpZiAoIShjb2xvciBpbiBjb2xvckNhY2hlKSkge1xuICAgICAgdmFyIHBhcnNlZDtcblxuICAgICAgaWYgKGNvbG9yID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICBwYXJzZWQgPSBbMCwgMCwgMCwgMF07XG4gICAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoXCJyZ2JhXCIpID4gLTEpIHtcbiAgICAgICAgcGFyc2VkID0gKGNvbG9yLm1hdGNoKC9bXFxkLl0rL2cpIHx8IFtdKS5tYXAoTnVtYmVyKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgIHBhcnNlZFtpXSA9IHBhcnNlZFtpXSAvIDI1NTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkID0gZnJvbVN0cmluZyhjb2xvcikubWFwKGZ1bmN0aW9uICgkKSB7XG4gICAgICAgICAgcmV0dXJuICQgLyAyNTU7XG4gICAgICAgIH0pO1xuICAgICAgICBwYXJzZWQucHVzaCgxKTtcbiAgICAgIH1cblxuICAgICAgY29sb3JDYWNoZVtjb2xvcl0gPSBwYXJzZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbG9yQ2FjaGVbY29sb3JdO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJUb0Fuc2koYmcpIHtcbiAgICByZXR1cm4gXCJcXHgxQlswOzQ4OzU7XCIgKyB0ZXJtY29sb3IoYmcpICsgXCJtXFx4MUJbMkpcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbG9yVG9BbnNpKGZnLCBiZykge1xuICAgIHJldHVybiBcIlxceDFCWzA7Mzg7NTtcIiArIHRlcm1jb2xvcihmZykgKyBcIjs0ODs1O1wiICsgdGVybWNvbG9yKGJnKSArIFwibVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9zaXRpb25Ub0Fuc2koeCwgeSkge1xuICAgIHJldHVybiBcIlxceDFCW1wiICsgKHkgKyAxKSArIFwiO1wiICsgKHggKyAxKSArIFwiSFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdGVybWNvbG9yKGNvbG9yKSB7XG4gICAgdmFyIFNSQ19DT0xPUlMgPSAyNTYuMDtcbiAgICB2YXIgRFNUX0NPTE9SUyA9IDYuMDtcbiAgICB2YXIgQ09MT1JfUkFUSU8gPSBEU1RfQ09MT1JTIC8gU1JDX0NPTE9SUztcbiAgICB2YXIgcmdiID0gZnJvbVN0cmluZyhjb2xvcik7XG4gICAgdmFyIHIgPSBNYXRoLmZsb29yKHJnYlswXSAqIENPTE9SX1JBVElPKTtcbiAgICB2YXIgZyA9IE1hdGguZmxvb3IocmdiWzFdICogQ09MT1JfUkFUSU8pO1xuICAgIHZhciBiID0gTWF0aC5mbG9vcihyZ2JbMl0gKiBDT0xPUl9SQVRJTyk7XG4gICAgcmV0dXJuIHIgKiAzNiArIGcgKiA2ICsgYiAqIDEgKyAxNjtcbiAgfVxuXG4gIHZhciBUZXJtID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0JhY2tlbmQzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoVGVybSwgX0JhY2tlbmQzKTtcblxuICAgIGZ1bmN0aW9uIFRlcm0oKSB7XG4gICAgICB2YXIgX3RoaXM4O1xuXG4gICAgICBfdGhpczggPSBfQmFja2VuZDMuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXM4Ll9vZmZzZXQgPSBbMCwgMF07XG4gICAgICBfdGhpczguX2N1cnNvciA9IFstMSwgLTFdO1xuICAgICAgX3RoaXM4Ll9sYXN0Q29sb3IgPSBcIlwiO1xuICAgICAgcmV0dXJuIF90aGlzODtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvOCA9IFRlcm0ucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvOC5zY2hlZHVsZSA9IGZ1bmN0aW9uIHNjaGVkdWxlKGNiKSB7XG4gICAgICBzZXRUaW1lb3V0KGNiLCAxMDAwIC8gNjApO1xuICAgIH07XG5cbiAgICBfcHJvdG84LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIF9CYWNrZW5kMy5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICB2YXIgc2l6ZSA9IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF07XG4gICAgICB2YXIgYXZhaWwgPSB0aGlzLmNvbXB1dGVTaXplKCk7XG4gICAgICB0aGlzLl9vZmZzZXQgPSBhdmFpbC5tYXAoZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHZhbCAtIHNpemVbaW5kZXhdKSAvIDIpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90bzguY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNsZWFyVG9BbnNpKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvOC5kcmF3ID0gZnVuY3Rpb24gZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHRvIGRyYXcgd2hhdCB3aXRoIHdoYXQgY29sb3JzXG4gICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICBiZyA9IGRhdGFbNF07IC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIG1vdmUgdGhlIHRlcm1pbmFsIGN1cnNvclxuXG4gICAgICB2YXIgZHggPSB0aGlzLl9vZmZzZXRbMF0gKyB4O1xuICAgICAgdmFyIGR5ID0gdGhpcy5fb2Zmc2V0WzFdICsgeTtcbiAgICAgIHZhciBzaXplID0gdGhpcy5jb21wdXRlU2l6ZSgpO1xuXG4gICAgICBpZiAoZHggPCAwIHx8IGR4ID49IHNpemVbMF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkgPCAwIHx8IGR5ID49IHNpemVbMV0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHggIT09IHRoaXMuX2N1cnNvclswXSB8fCBkeSAhPT0gdGhpcy5fY3Vyc29yWzFdKSB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHBvc2l0aW9uVG9BbnNpKGR4LCBkeSkpO1xuICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSBkeDtcbiAgICAgICAgdGhpcy5fY3Vyc29yWzFdID0gZHk7XG4gICAgICB9IC8vIHRlcm1pbmFscyBhdXRvbWF0aWNhbGx5IGNsZWFyLCBidXQgaWYgd2UncmUgY2xlYXJpbmcgd2hlbiB3ZSdyZVxuICAgICAgLy8gbm90IG90aGVyd2lzZSBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBqdXN0IHVzZSBhIHNwYWNlIGluc3RlYWRcblxuXG4gICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgIGNoID0gXCIgXCI7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gaWYgd2UncmUgbm90IGNsZWFyaW5nIGFuZCBub3QgcHJvdmlkZWQgd2l0aCBhIGNoYXJhY3RlciwgZG8gbm90aGluZ1xuXG5cbiAgICAgIGlmICghY2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBjaGFuZ2UgY29sb3JzXG5cblxuICAgICAgdmFyIG5ld0NvbG9yID0gY29sb3JUb0Fuc2koZmcsIGJnKTtcblxuICAgICAgaWYgKG5ld0NvbG9yICE9PSB0aGlzLl9sYXN0Q29sb3IpIHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobmV3Q29sb3IpO1xuICAgICAgICB0aGlzLl9sYXN0Q29sb3IgPSBuZXdDb2xvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoICE9ICdcXHQnKSB7XG4gICAgICAgIC8vIHdyaXRlIHRoZSBwcm92aWRlZCBzeW1ib2wgdG8gdGhlIGRpc3BsYXlcbiAgICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY2hhcnNbMF0pO1xuICAgICAgfSAvLyB1cGRhdGUgb3VyIHBvc2l0aW9uLCBnaXZlbiB0aGF0IHdlIHdyb3RlIGEgY2hhcmFjdGVyXG5cblxuICAgICAgdGhpcy5fY3Vyc29yWzBdKys7XG5cbiAgICAgIGlmICh0aGlzLl9jdXJzb3JbMF0gPj0gc2l6ZVswXSkge1xuICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSAwO1xuICAgICAgICB0aGlzLl9jdXJzb3JbMV0rKztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvOC5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXJtaW5hbCBiYWNrZW5kIGhhcyBubyBub3Rpb24gb2YgZm9udCBzaXplXCIpO1xuICAgIH07XG5cbiAgICBfcHJvdG84LmV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gW3gsIHldO1xuICAgIH07XG5cbiAgICBfcHJvdG84LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoKSB7XG4gICAgICByZXR1cm4gW3Byb2Nlc3Muc3Rkb3V0LmNvbHVtbnMsIHByb2Nlc3Muc3Rkb3V0LnJvd3NdO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGVybTtcbiAgfShCYWNrZW5kKTtcbiAgLyoqXG4gICAqIEBuYW1lc3BhY2VcbiAgICogQ29udGFpbnMgdGV4dCB0b2tlbml6YXRpb24gYW5kIGJyZWFraW5nIHJvdXRpbmVzXG4gICAqL1xuXG5cbiAgdmFyIFJFX0NPTE9SUyA9IC8lKFtiY10peyhbXn1dKil9L2c7IC8vIHRva2VuIHR5cGVzXG5cbiAgdmFyIFRZUEVfVEVYVCA9IDA7XG4gIHZhciBUWVBFX05FV0xJTkUgPSAxO1xuICB2YXIgVFlQRV9GRyA9IDI7XG4gIHZhciBUWVBFX0JHID0gMztcbiAgLyoqXG4gICAqIE1lYXN1cmUgc2l6ZSBvZiBhIHJlc3VsdGluZyB0ZXh0IGJsb2NrXG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1lYXN1cmUoc3RyLCBtYXhXaWR0aCkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMVxuICAgIH07XG4gICAgdmFyIHRva2VucyA9IHRva2VuaXplKHN0ciwgbWF4V2lkdGgpO1xuICAgIHZhciBsaW5lV2lkdGggPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgIGxpbmVXaWR0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgcmVzdWx0LmhlaWdodCsrO1xuICAgICAgICAgIHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcbiAgICAgICAgICBsaW5lV2lkdGggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdC53aWR0aCA9IE1hdGgubWF4KHJlc3VsdC53aWR0aCwgbGluZVdpZHRoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0IHN0cmluZyB0byBhIHNlcmllcyBvZiBhIGZvcm1hdHRpbmcgY29tbWFuZHNcbiAgICovXG5cblxuICBmdW5jdGlvbiB0b2tlbml6ZShzdHIsIG1heFdpZHRoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIC8qIGZpcnN0IHRva2VuaXphdGlvbiBwYXNzIC0gc3BsaXQgdGV4dHMgYW5kIGNvbG9yIGZvcm1hdHRpbmcgY29tbWFuZHMgKi9cblxuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHN0ci5yZXBsYWNlKFJFX0NPTE9SUywgZnVuY3Rpb24gKG1hdGNoLCB0eXBlLCBuYW1lLCBpbmRleCkge1xuICAgICAgLyogc3RyaW5nIGJlZm9yZSAqL1xuICAgICAgdmFyIHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCwgaW5kZXgpO1xuXG4gICAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgICB2YWx1ZTogcGFydFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8qIGNvbG9yIGNvbW1hbmQgKi9cblxuXG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHR5cGU6IHR5cGUgPT0gXCJjXCIgPyBUWVBFX0ZHIDogVFlQRV9CRyxcbiAgICAgICAgdmFsdWU6IG5hbWUudHJpbSgpXG4gICAgICB9KTtcbiAgICAgIG9mZnNldCA9IGluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSk7XG4gICAgLyogbGFzdCByZW1haW5pbmcgcGFydCAqL1xuXG4gICAgdmFyIHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCk7XG5cbiAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICB2YWx1ZTogcGFydFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJyZWFrTGluZXMocmVzdWx0LCBtYXhXaWR0aCk7XG4gIH1cbiAgLyogaW5zZXJ0IGxpbmUgYnJlYWtzIGludG8gZmlyc3QtcGFzcyB0b2tlbml6ZWQgZGF0YSAqL1xuXG5cbiAgZnVuY3Rpb24gYnJlYWtMaW5lcyh0b2tlbnMsIG1heFdpZHRoKSB7XG4gICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgbWF4V2lkdGggPSBJbmZpbml0eTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxpbmVMZW5ndGggPSAwO1xuICAgIHZhciBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcblxuICAgIHdoaWxlIChpIDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgLyogdGFrZSBhbGwgdGV4dCB0b2tlbnMsIHJlbW92ZSBzcGFjZSwgYXBwbHkgbGluZWJyZWFrcyAqL1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4udHlwZSA9PSBUWVBFX05FV0xJTkUpIHtcbiAgICAgICAgLyogcmVzZXQgKi9cbiAgICAgICAgbGluZUxlbmd0aCA9IDA7XG4gICAgICAgIGxhc3RUb2tlbldpdGhTcGFjZSA9IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAodG9rZW4udHlwZSAhPSBUWVBFX1RFWFQpIHtcbiAgICAgICAgLyogc2tpcCBub24tdGV4dCB0b2tlbnMgKi9cbiAgICAgICAgaSsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8qIHJlbW92ZSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBsaW5lICovXG5cblxuICAgICAgd2hpbGUgKGxpbmVMZW5ndGggPT0gMCAmJiB0b2tlbi52YWx1ZS5jaGFyQXQoMCkgPT0gXCIgXCIpIHtcbiAgICAgICAgdG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG4gICAgICAvKiBmb3JjZWQgbmV3bGluZT8gaW5zZXJ0IHR3byBuZXcgdG9rZW5zIGFmdGVyIHRoaXMgb25lICovXG5cblxuICAgICAgdmFyIF9pbmRleDIgPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiXFxuXCIpO1xuXG4gICAgICBpZiAoX2luZGV4MiAhPSAtMSkge1xuICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBfaW5kZXgyLCB0cnVlKTtcbiAgICAgICAgLyogaWYgdGhlcmUgYXJlIHNwYWNlcyBhdCB0aGUgZW5kLCB3ZSBtdXN0IHJlbW92ZSB0aGVtICh3ZSBkbyBub3Qgd2FudCB0aGUgbGluZSB0b28gbG9uZykgKi9cblxuICAgICAgICB2YXIgYXJyID0gdG9rZW4udmFsdWUuc3BsaXQoXCJcIik7XG5cbiAgICAgICAgd2hpbGUgKGFyci5sZW5ndGggJiYgYXJyW2Fyci5sZW5ndGggLSAxXSA9PSBcIiBcIikge1xuICAgICAgICAgIGFyci5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuLnZhbHVlID0gYXJyLmpvaW4oXCJcIik7XG4gICAgICB9XG4gICAgICAvKiB0b2tlbiBkZWdlbmVyYXRlZD8gKi9cblxuXG4gICAgICBpZiAoIXRva2VuLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0b2tlbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpbmVMZW5ndGggKyB0b2tlbi52YWx1ZS5sZW5ndGggPiBtYXhXaWR0aCkge1xuICAgICAgICAvKiBsaW5lIHRvbyBsb25nLCBmaW5kIGEgc3VpdGFibGUgYnJlYWtpbmcgc3BvdCAqL1xuXG4gICAgICAgIC8qIGlzIGl0IHBvc3NpYmxlIHRvIGJyZWFrIHdpdGhpbiB0aGlzIHRva2VuPyAqL1xuICAgICAgICB2YXIgX2luZGV4MyA9IC0xO1xuXG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgdmFyIG5leHRJbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCIgXCIsIF9pbmRleDMgKyAxKTtcblxuICAgICAgICAgIGlmIChuZXh0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsaW5lTGVuZ3RoICsgbmV4dEluZGV4ID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF9pbmRleDMgPSBuZXh0SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2luZGV4MyAhPSAtMSkge1xuICAgICAgICAgIC8qIGJyZWFrIGF0IHNwYWNlIHdpdGhpbiB0aGlzIG9uZSAqL1xuICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIF9pbmRleDMsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RUb2tlbldpdGhTcGFjZSAhPSAtMSkge1xuICAgICAgICAgIC8qIGlzIHRoZXJlIGEgcHJldmlvdXMgdG9rZW4gd2hlcmUgYSBicmVhayBjYW4gb2NjdXI/ICovXG4gICAgICAgICAgdmFyIF90b2tlbiA9IHRva2Vuc1tsYXN0VG9rZW5XaXRoU3BhY2VdO1xuXG4gICAgICAgICAgdmFyIGJyZWFrSW5kZXggPSBfdG9rZW4udmFsdWUubGFzdEluZGV4T2YoXCIgXCIpO1xuXG4gICAgICAgICAgX3Rva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGxhc3RUb2tlbldpdGhTcGFjZSwgYnJlYWtJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgaSA9IGxhc3RUb2tlbldpdGhTcGFjZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBmb3JjZSBicmVhayBpbiB0aGlzIHRva2VuICovXG4gICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgbWF4V2lkdGggLSBsaW5lTGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGxpbmUgbm90IGxvbmcsIGNvbnRpbnVlICovXG4gICAgICAgIGxpbmVMZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiKSAhPSAtMSkge1xuICAgICAgICAgIGxhc3RUb2tlbldpdGhTcGFjZSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaSsrO1xuICAgICAgLyogYWR2YW5jZSB0byBuZXh0IHRva2VuICovXG4gICAgfVxuXG4gICAgdG9rZW5zLnB1c2goe1xuICAgICAgdHlwZTogVFlQRV9ORVdMSU5FXG4gICAgfSk7XG4gICAgLyogaW5zZXJ0IGZha2UgbmV3bGluZSB0byBmaXggdGhlIGxhc3QgdGV4dCBsaW5lICovXG5cbiAgICAvKiByZW1vdmUgdHJhaWxpbmcgc3BhY2UgZnJvbSB0ZXh0IHRva2VucyBiZWZvcmUgbmV3bGluZXMgKi9cblxuICAgIHZhciBsYXN0VGV4dFRva2VuID0gbnVsbDtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB0b2tlbnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX3Rva2VuMiA9IHRva2Vuc1tfaV07XG5cbiAgICAgIHN3aXRjaCAoX3Rva2VuMi50eXBlKSB7XG4gICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgIGxhc3RUZXh0VG9rZW4gPSBfdG9rZW4yO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgIGlmIChsYXN0VGV4dFRva2VuKSB7XG4gICAgICAgICAgICAvKiByZW1vdmUgdHJhaWxpbmcgc3BhY2UgKi9cbiAgICAgICAgICAgIHZhciBfYXJyID0gbGFzdFRleHRUb2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcblxuICAgICAgICAgICAgd2hpbGUgKF9hcnIubGVuZ3RoICYmIF9hcnJbX2Fyci5sZW5ndGggLSAxXSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICBfYXJyLnBvcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0VGV4dFRva2VuLnZhbHVlID0gX2Fyci5qb2luKFwiXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxhc3RUZXh0VG9rZW4gPSBudWxsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRva2Vucy5wb3AoKTtcbiAgICAvKiByZW1vdmUgZmFrZSB0b2tlbiAqL1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIG5ldyB0b2tlbnMgYW5kIGluc2VydCB0aGVtIGludG8gdGhlIHN0cmVhbVxuICAgKiBAcGFyYW0ge29iamVjdFtdfSB0b2tlbnNcbiAgICogQHBhcmFtIHtpbnR9IHRva2VuSW5kZXggVG9rZW4gYmVpbmcgcHJvY2Vzc2VkXG4gICAqIEBwYXJhbSB7aW50fSBicmVha0luZGV4IEluZGV4IHdpdGhpbiBjdXJyZW50IHRva2VuJ3MgdmFsdWVcbiAgICogQHBhcmFtIHtib29sfSByZW1vdmVCcmVha0NoYXIgRG8gd2Ugd2FudCB0byByZW1vdmUgdGhlIGJyZWFraW5nIGNoYXJhY3Rlcj9cbiAgICogQHJldHVybnMge3N0cmluZ30gcmVtYWluaW5nIHVuYnJva2VuIHRva2VuIHZhbHVlXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIHRva2VuSW5kZXgsIGJyZWFrSW5kZXgsIHJlbW92ZUJyZWFrQ2hhcikge1xuICAgIHZhciBuZXdCcmVha1Rva2VuID0ge1xuICAgICAgdHlwZTogVFlQRV9ORVdMSU5FXG4gICAgfTtcbiAgICB2YXIgbmV3VGV4dFRva2VuID0ge1xuICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgdmFsdWU6IHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoYnJlYWtJbmRleCArIChyZW1vdmVCcmVha0NoYXIgPyAxIDogMCkpXG4gICAgfTtcbiAgICB0b2tlbnMuc3BsaWNlKHRva2VuSW5kZXggKyAxLCAwLCBuZXdCcmVha1Rva2VuLCBuZXdUZXh0VG9rZW4pO1xuICAgIHJldHVybiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKDAsIGJyZWFrSW5kZXgpO1xuICB9XG5cbiAgdmFyIHRleHQgPVxuICAvKiNfX1BVUkVfXyovXG4gIE9iamVjdC5mcmVlemUoe1xuICAgIFRZUEVfVEVYVDogVFlQRV9URVhULFxuICAgIFRZUEVfTkVXTElORTogVFlQRV9ORVdMSU5FLFxuICAgIFRZUEVfRkc6IFRZUEVfRkcsXG4gICAgVFlQRV9CRzogVFlQRV9CRyxcbiAgICBtZWFzdXJlOiBtZWFzdXJlLFxuICAgIHRva2VuaXplOiB0b2tlbml6ZVxuICB9KTtcbiAgLyoqIERlZmF1bHQgd2l0aCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cblxuICB2YXIgREVGQVVMVF9XSURUSCA9IDgwO1xuICAvKiogRGVmYXVsdCBoZWlnaHQgZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXG5cbiAgdmFyIERFRkFVTFRfSEVJR0hUID0gMjU7XG4gIHZhciBESVJTID0ge1xuICAgIDQ6IFtbMCwgLTFdLCBbMSwgMF0sIFswLCAxXSwgWy0xLCAwXV0sXG4gICAgODogW1swLCAtMV0sIFsxLCAtMV0sIFsxLCAwXSwgWzEsIDFdLCBbMCwgMV0sIFstMSwgMV0sIFstMSwgMF0sIFstMSwgLTFdXSxcbiAgICA2OiBbWy0xLCAtMV0sIFsxLCAtMV0sIFsyLCAwXSwgWzEsIDFdLCBbLTEsIDFdLCBbLTIsIDBdXVxuICB9O1xuICB2YXIgS0VZUyA9IHtcbiAgICAvKiogQ2FuY2VsIGtleS4gKi9cbiAgICBWS19DQU5DRUw6IDMsXG5cbiAgICAvKiogSGVscCBrZXkuICovXG4gICAgVktfSEVMUDogNixcblxuICAgIC8qKiBCYWNrc3BhY2Uga2V5LiAqL1xuICAgIFZLX0JBQ0tfU1BBQ0U6IDgsXG5cbiAgICAvKiogVGFiIGtleS4gKi9cbiAgICBWS19UQUI6IDksXG5cbiAgICAvKiogNSBrZXkgb24gTnVtcGFkIHdoZW4gTnVtTG9jayBpcyB1bmxvY2tlZC4gT3Igb24gTWFjLCBjbGVhciBrZXkgd2hpY2ggaXMgcG9zaXRpb25lZCBhdCBOdW1Mb2NrIGtleS4gKi9cbiAgICBWS19DTEVBUjogMTIsXG5cbiAgICAvKiogUmV0dXJuL2VudGVyIGtleSBvbiB0aGUgbWFpbiBrZXlib2FyZC4gKi9cbiAgICBWS19SRVRVUk46IDEzLFxuXG4gICAgLyoqIFJlc2VydmVkLCBidXQgbm90IHVzZWQuICovXG4gICAgVktfRU5URVI6IDE0LFxuXG4gICAgLyoqIFNoaWZ0IGtleS4gKi9cbiAgICBWS19TSElGVDogMTYsXG5cbiAgICAvKiogQ29udHJvbCBrZXkuICovXG4gICAgVktfQ09OVFJPTDogMTcsXG5cbiAgICAvKiogQWx0IChPcHRpb24gb24gTWFjKSBrZXkuICovXG4gICAgVktfQUxUOiAxOCxcblxuICAgIC8qKiBQYXVzZSBrZXkuICovXG4gICAgVktfUEFVU0U6IDE5LFxuXG4gICAgLyoqIENhcHMgbG9jay4gKi9cbiAgICBWS19DQVBTX0xPQ0s6IDIwLFxuXG4gICAgLyoqIEVzY2FwZSBrZXkuICovXG4gICAgVktfRVNDQVBFOiAyNyxcblxuICAgIC8qKiBTcGFjZSBiYXIuICovXG4gICAgVktfU1BBQ0U6IDMyLFxuXG4gICAgLyoqIFBhZ2UgVXAga2V5LiAqL1xuICAgIFZLX1BBR0VfVVA6IDMzLFxuXG4gICAgLyoqIFBhZ2UgRG93biBrZXkuICovXG4gICAgVktfUEFHRV9ET1dOOiAzNCxcblxuICAgIC8qKiBFbmQga2V5LiAqL1xuICAgIFZLX0VORDogMzUsXG5cbiAgICAvKiogSG9tZSBrZXkuICovXG4gICAgVktfSE9NRTogMzYsXG5cbiAgICAvKiogTGVmdCBhcnJvdy4gKi9cbiAgICBWS19MRUZUOiAzNyxcblxuICAgIC8qKiBVcCBhcnJvdy4gKi9cbiAgICBWS19VUDogMzgsXG5cbiAgICAvKiogUmlnaHQgYXJyb3cuICovXG4gICAgVktfUklHSFQ6IDM5LFxuXG4gICAgLyoqIERvd24gYXJyb3cuICovXG4gICAgVktfRE9XTjogNDAsXG5cbiAgICAvKiogUHJpbnQgU2NyZWVuIGtleS4gKi9cbiAgICBWS19QUklOVFNDUkVFTjogNDQsXG5cbiAgICAvKiogSW5zKGVydCkga2V5LiAqL1xuICAgIFZLX0lOU0VSVDogNDUsXG5cbiAgICAvKiogRGVsKGV0ZSkga2V5LiAqL1xuICAgIFZLX0RFTEVURTogNDYsXG5cbiAgICAvKioqL1xuICAgIFZLXzA6IDQ4LFxuXG4gICAgLyoqKi9cbiAgICBWS18xOiA0OSxcblxuICAgIC8qKiovXG4gICAgVktfMjogNTAsXG5cbiAgICAvKioqL1xuICAgIFZLXzM6IDUxLFxuXG4gICAgLyoqKi9cbiAgICBWS180OiA1MixcblxuICAgIC8qKiovXG4gICAgVktfNTogNTMsXG5cbiAgICAvKioqL1xuICAgIFZLXzY6IDU0LFxuXG4gICAgLyoqKi9cbiAgICBWS183OiA1NSxcblxuICAgIC8qKiovXG4gICAgVktfODogNTYsXG5cbiAgICAvKioqL1xuICAgIFZLXzk6IDU3LFxuXG4gICAgLyoqIENvbG9uICg6KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DT0xPTjogNTgsXG5cbiAgICAvKiogU2VtaWNvbG9uICg7KSBrZXkuICovXG4gICAgVktfU0VNSUNPTE9OOiA1OSxcblxuICAgIC8qKiBMZXNzLXRoYW4gKDwpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0xFU1NfVEhBTjogNjAsXG5cbiAgICAvKiogRXF1YWxzICg9KSBrZXkuICovXG4gICAgVktfRVFVQUxTOiA2MSxcblxuICAgIC8qKiBHcmVhdGVyLXRoYW4gKD4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0dSRUFURVJfVEhBTjogNjIsXG5cbiAgICAvKiogUXVlc3Rpb24gbWFyayAoPykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUVVFU1RJT05fTUFSSzogNjMsXG5cbiAgICAvKiogQXRtYXJrIChAKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BVDogNjQsXG5cbiAgICAvKioqL1xuICAgIFZLX0E6IDY1LFxuXG4gICAgLyoqKi9cbiAgICBWS19COiA2NixcblxuICAgIC8qKiovXG4gICAgVktfQzogNjcsXG5cbiAgICAvKioqL1xuICAgIFZLX0Q6IDY4LFxuXG4gICAgLyoqKi9cbiAgICBWS19FOiA2OSxcblxuICAgIC8qKiovXG4gICAgVktfRjogNzAsXG5cbiAgICAvKioqL1xuICAgIFZLX0c6IDcxLFxuXG4gICAgLyoqKi9cbiAgICBWS19IOiA3MixcblxuICAgIC8qKiovXG4gICAgVktfSTogNzMsXG5cbiAgICAvKioqL1xuICAgIFZLX0o6IDc0LFxuXG4gICAgLyoqKi9cbiAgICBWS19LOiA3NSxcblxuICAgIC8qKiovXG4gICAgVktfTDogNzYsXG5cbiAgICAvKioqL1xuICAgIFZLX006IDc3LFxuXG4gICAgLyoqKi9cbiAgICBWS19OOiA3OCxcblxuICAgIC8qKiovXG4gICAgVktfTzogNzksXG5cbiAgICAvKioqL1xuICAgIFZLX1A6IDgwLFxuXG4gICAgLyoqKi9cbiAgICBWS19ROiA4MSxcblxuICAgIC8qKiovXG4gICAgVktfUjogODIsXG5cbiAgICAvKioqL1xuICAgIFZLX1M6IDgzLFxuXG4gICAgLyoqKi9cbiAgICBWS19UOiA4NCxcblxuICAgIC8qKiovXG4gICAgVktfVTogODUsXG5cbiAgICAvKioqL1xuICAgIFZLX1Y6IDg2LFxuXG4gICAgLyoqKi9cbiAgICBWS19XOiA4NyxcblxuICAgIC8qKiovXG4gICAgVktfWDogODgsXG5cbiAgICAvKioqL1xuICAgIFZLX1k6IDg5LFxuXG4gICAgLyoqKi9cbiAgICBWS19aOiA5MCxcblxuICAgIC8qKiovXG4gICAgVktfQ09OVEVYVF9NRU5VOiA5MyxcblxuICAgIC8qKiAwIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQwOiA5NixcblxuICAgIC8qKiAxIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQxOiA5NyxcblxuICAgIC8qKiAyIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQyOiA5OCxcblxuICAgIC8qKiAzIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQzOiA5OSxcblxuICAgIC8qKiA0IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ0OiAxMDAsXG5cbiAgICAvKiogNSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENTogMTAxLFxuXG4gICAgLyoqIDYgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDY6IDEwMixcblxuICAgIC8qKiA3IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ3OiAxMDMsXG5cbiAgICAvKiogOCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEODogMTA0LFxuXG4gICAgLyoqIDkgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDk6IDEwNSxcblxuICAgIC8qKiAqIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19NVUxUSVBMWTogMTA2LFxuXG4gICAgLyoqICsgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0FERDogMTA3LFxuXG4gICAgLyoqKi9cbiAgICBWS19TRVBBUkFUT1I6IDEwOCxcblxuICAgIC8qKiAtIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19TVUJUUkFDVDogMTA5LFxuXG4gICAgLyoqIERlY2ltYWwgcG9pbnQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0RFQ0lNQUw6IDExMCxcblxuICAgIC8qKiAvIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19ESVZJREU6IDExMSxcblxuICAgIC8qKiBGMSBrZXkuICovXG4gICAgVktfRjE6IDExMixcblxuICAgIC8qKiBGMiBrZXkuICovXG4gICAgVktfRjI6IDExMyxcblxuICAgIC8qKiBGMyBrZXkuICovXG4gICAgVktfRjM6IDExNCxcblxuICAgIC8qKiBGNCBrZXkuICovXG4gICAgVktfRjQ6IDExNSxcblxuICAgIC8qKiBGNSBrZXkuICovXG4gICAgVktfRjU6IDExNixcblxuICAgIC8qKiBGNiBrZXkuICovXG4gICAgVktfRjY6IDExNyxcblxuICAgIC8qKiBGNyBrZXkuICovXG4gICAgVktfRjc6IDExOCxcblxuICAgIC8qKiBGOCBrZXkuICovXG4gICAgVktfRjg6IDExOSxcblxuICAgIC8qKiBGOSBrZXkuICovXG4gICAgVktfRjk6IDEyMCxcblxuICAgIC8qKiBGMTAga2V5LiAqL1xuICAgIFZLX0YxMDogMTIxLFxuXG4gICAgLyoqIEYxMSBrZXkuICovXG4gICAgVktfRjExOiAxMjIsXG5cbiAgICAvKiogRjEyIGtleS4gKi9cbiAgICBWS19GMTI6IDEyMyxcblxuICAgIC8qKiBGMTMga2V5LiAqL1xuICAgIFZLX0YxMzogMTI0LFxuXG4gICAgLyoqIEYxNCBrZXkuICovXG4gICAgVktfRjE0OiAxMjUsXG5cbiAgICAvKiogRjE1IGtleS4gKi9cbiAgICBWS19GMTU6IDEyNixcblxuICAgIC8qKiBGMTYga2V5LiAqL1xuICAgIFZLX0YxNjogMTI3LFxuXG4gICAgLyoqIEYxNyBrZXkuICovXG4gICAgVktfRjE3OiAxMjgsXG5cbiAgICAvKiogRjE4IGtleS4gKi9cbiAgICBWS19GMTg6IDEyOSxcblxuICAgIC8qKiBGMTkga2V5LiAqL1xuICAgIFZLX0YxOTogMTMwLFxuXG4gICAgLyoqIEYyMCBrZXkuICovXG4gICAgVktfRjIwOiAxMzEsXG5cbiAgICAvKiogRjIxIGtleS4gKi9cbiAgICBWS19GMjE6IDEzMixcblxuICAgIC8qKiBGMjIga2V5LiAqL1xuICAgIFZLX0YyMjogMTMzLFxuXG4gICAgLyoqIEYyMyBrZXkuICovXG4gICAgVktfRjIzOiAxMzQsXG5cbiAgICAvKiogRjI0IGtleS4gKi9cbiAgICBWS19GMjQ6IDEzNSxcblxuICAgIC8qKiBOdW0gTG9jayBrZXkuICovXG4gICAgVktfTlVNX0xPQ0s6IDE0NCxcblxuICAgIC8qKiBTY3JvbGwgTG9jayBrZXkuICovXG4gICAgVktfU0NST0xMX0xPQ0s6IDE0NSxcblxuICAgIC8qKiBDaXJjdW1mbGV4ICheKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DSVJDVU1GTEVYOiAxNjAsXG5cbiAgICAvKiogRXhjbGFtYXRpb24gKCEpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0VYQ0xBTUFUSU9OOiAxNjEsXG5cbiAgICAvKiogRG91YmxlIHF1b3RlICgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPVUJMRV9RVU9URTogMTYyLFxuXG4gICAgLyoqIEhhc2ggKCMpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0hBU0g6IDE2MyxcblxuICAgIC8qKiBEb2xsYXIgc2lnbiAoJCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRE9MTEFSOiAxNjQsXG5cbiAgICAvKiogUGVyY2VudCAoJSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUEVSQ0VOVDogMTY1LFxuXG4gICAgLyoqIEFtcGVyc2FuZCAoJikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQU1QRVJTQU5EOiAxNjYsXG5cbiAgICAvKiogVW5kZXJzY29yZSAoXykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfVU5ERVJTQ09SRTogMTY3LFxuXG4gICAgLyoqIE9wZW4gcGFyZW50aGVzaXMgKCgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX09QRU5fUEFSRU46IDE2OCxcblxuICAgIC8qKiBDbG9zZSBwYXJlbnRoZXNpcyAoKSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfUEFSRU46IDE2OSxcblxuICAgIC8qIEFzdGVyaXNrICgqKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BU1RFUklTSzogMTcwLFxuXG4gICAgLyoqIFBsdXMgKCspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BMVVM6IDE3MSxcblxuICAgIC8qKiBQaXBlICh8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QSVBFOiAxNzIsXG5cbiAgICAvKiogSHlwaGVuLVVTL2RvY3MvTWludXMgKC0pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0hZUEhFTl9NSU5VUzogMTczLFxuXG4gICAgLyoqIE9wZW4gY3VybHkgYnJhY2tldCAoeykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9DVVJMWV9CUkFDS0VUOiAxNzQsXG5cbiAgICAvKiogQ2xvc2UgY3VybHkgYnJhY2tldCAofSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfQ1VSTFlfQlJBQ0tFVDogMTc1LFxuXG4gICAgLyoqIFRpbGRlICh+KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19USUxERTogMTc2LFxuXG4gICAgLyoqIENvbW1hICgsKSBrZXkuICovXG4gICAgVktfQ09NTUE6IDE4OCxcblxuICAgIC8qKiBQZXJpb2QgKC4pIGtleS4gKi9cbiAgICBWS19QRVJJT0Q6IDE5MCxcblxuICAgIC8qKiBTbGFzaCAoLykga2V5LiAqL1xuICAgIFZLX1NMQVNIOiAxOTEsXG5cbiAgICAvKiogQmFjayB0aWNrIChgKSBrZXkuICovXG4gICAgVktfQkFDS19RVU9URTogMTkyLFxuXG4gICAgLyoqIE9wZW4gc3F1YXJlIGJyYWNrZXQgKFspIGtleS4gKi9cbiAgICBWS19PUEVOX0JSQUNLRVQ6IDIxOSxcblxuICAgIC8qKiBCYWNrIHNsYXNoIChcXCkga2V5LiAqL1xuICAgIFZLX0JBQ0tfU0xBU0g6IDIyMCxcblxuICAgIC8qKiBDbG9zZSBzcXVhcmUgYnJhY2tldCAoXSkga2V5LiAqL1xuICAgIFZLX0NMT1NFX0JSQUNLRVQ6IDIyMSxcblxuICAgIC8qKiBRdW90ZSAoJycnKSBrZXkuICovXG4gICAgVktfUVVPVEU6IDIyMixcblxuICAgIC8qKiBNZXRhIGtleSBvbiBMaW51eCwgQ29tbWFuZCBrZXkgb24gTWFjLiAqL1xuICAgIFZLX01FVEE6IDIyNCxcblxuICAgIC8qKiBBbHRHciBrZXkgb24gTGludXguIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BTFRHUjogMjI1LFxuXG4gICAgLyoqIFdpbmRvd3MgbG9nbyBrZXkgb24gV2luZG93cy4gT3IgU3VwZXIgb3IgSHlwZXIga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfV0lOOiA5MSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19LQU5BOiAyMSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5HVUw6IDIxLFxuXG4gICAgLyoqIOiLseaVsCBrZXkgb24gSmFwYW5lc2UgTWFjIGtleWJvYXJkLiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRUlTVTogMjIsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSlVOSkE6IDIzLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0ZJTkFMOiAyNCxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5KQTogMjUsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfS0FOSkk6IDI1LFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0NPTlZFUlQ6IDI4LFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX05PTkNPTlZFUlQ6IDI5LFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0FDQ0VQVDogMzAsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfTU9ERUNIQU5HRTogMzEsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfU0VMRUNUOiA0MSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19QUklOVDogNDIsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRVhFQ1VURTogNDMsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuXHQgKi9cbiAgICBWS19TTEVFUDogOTVcbiAgfTtcbiAgdmFyIEJBQ0tFTkRTID0ge1xuICAgIFwiaGV4XCI6IEhleCxcbiAgICBcInJlY3RcIjogUmVjdCxcbiAgICBcInRpbGVcIjogVGlsZSxcbiAgICBcInRpbGUtZ2xcIjogVGlsZUdMLFxuICAgIFwidGVybVwiOiBUZXJtXG4gIH07XG4gIHZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gICAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgICB0cmFuc3Bvc2U6IGZhbHNlLFxuICAgIGxheW91dDogXCJyZWN0XCIsXG4gICAgZm9udFNpemU6IDE1LFxuICAgIHNwYWNpbmc6IDEsXG4gICAgYm9yZGVyOiAwLFxuICAgIGZvcmNlU3F1YXJlUmF0aW86IGZhbHNlLFxuICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsXG4gICAgZm9udFN0eWxlOiBcIlwiLFxuICAgIGZnOiBcIiNjY2NcIixcbiAgICBiZzogXCIjMDAwXCIsXG4gICAgdGlsZVdpZHRoOiAzMixcbiAgICB0aWxlSGVpZ2h0OiAzMixcbiAgICB0aWxlTWFwOiB7fSxcbiAgICB0aWxlU2V0OiBudWxsLFxuICAgIHRpbGVDb2xvcml6ZTogZmFsc2VcbiAgfTtcbiAgLyoqXG4gICAqIEBjbGFzcyBWaXN1YWwgbWFwIGRpc3BsYXlcbiAgICovXG5cbiAgdmFyIERpc3BsYXkgPVxuICAvKiogQGNsYXNzICovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgRGlzcGxheSA9XG4gICAgLyojX19QVVJFX18qL1xuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIERpc3BsYXkob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlOyAvLyBmYWxzZSA9IG5vdGhpbmcsIHRydWUgPSBhbGwsIG9iamVjdCA9IGRpcnR5IGNlbGxzXG5cbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLkRFQlVHID0gdGhpcy5ERUJVRy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIERlYnVnIGhlbHBlciwgaWRlYWwgYXMgYSBtYXAgZ2VuZXJhdG9yIGNhbGxiYWNrLiBBbHdheXMgYm91bmQgdG8gdGhpcy5cbiAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICogQHBhcmFtIHtpbnR9IHdoYXRcbiAgICAgICAqL1xuXG5cbiAgICAgIHZhciBfcHJvdG85ID0gRGlzcGxheS5wcm90b3R5cGU7XG5cbiAgICAgIF9wcm90bzkuREVCVUcgPSBmdW5jdGlvbiBERUJVRyh4LCB5LCB3aGF0KSB7XG4gICAgICAgIHZhciBjb2xvcnMgPSBbdGhpcy5fb3B0aW9ucy5iZywgdGhpcy5fb3B0aW9ucy5mZ107XG4gICAgICAgIHRoaXMuZHJhdyh4LCB5LCBudWxsLCBudWxsLCBjb2xvcnNbd2hhdCAlIGNvbG9ycy5sZW5ndGhdKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENsZWFyIHRoZSB3aG9sZSBkaXNwbGF5IChjb3ZlciBpdCB3aXRoIGJhY2tncm91bmQgY29sb3IpXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHNlZSBST1QuRGlzcGxheVxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggfHwgb3B0aW9ucy5oZWlnaHQgfHwgb3B0aW9ucy5mb250U2l6ZSB8fCBvcHRpb25zLmZvbnRGYW1pbHkgfHwgb3B0aW9ucy5zcGFjaW5nIHx8IG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgICB2YXIgY3RvciA9IEJBQ0tFTkRTW29wdGlvbnMubGF5b3V0XTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQgPSBuZXcgY3RvcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2V0T3B0aW9ucyh0aGlzLl9vcHRpb25zKTtcblxuICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyBjdXJyZW50bHkgc2V0IG9wdGlvbnNcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0aGUgRE9NIG5vZGUgb2YgdGhpcyBkaXNwbGF5XG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmdldENvbnRhaW5lciA9IGZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuZ2V0Q29udGFpbmVyKCk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIHdpZHRoL2hlaWdodCB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXG4gICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxuICAgICAgICogQHJldHVybnMge2ludFsyXX0gY2VsbFdpZHRoLGNlbGxIZWlnaHRcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIGZvbnQgc2l6ZSB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXG4gICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxuICAgICAgICogQHJldHVybnMge2ludH0gZm9udFNpemVcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCk7XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG85LmNvbXB1dGVUaWxlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVUaWxlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLmhlaWdodCk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDb252ZXJ0IGEgRE9NIGV2ZW50IChtb3VzZSBvciB0b3VjaCkgdG8gbWFwIGNvb3JkaW5hdGVzLiBVc2VzIGZpcnN0IHRvdWNoIGZvciBtdWx0aS10b3VjaC5cbiAgICAgICAqIEBwYXJhbSB7RXZlbnR9IGUgZXZlbnRcbiAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IC0xIGZvciB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgY2FudmFzXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIGV2ZW50VG9Qb3NpdGlvbihlKSB7XG4gICAgICAgIHZhciB4LCB5O1xuXG4gICAgICAgIGlmIChcInRvdWNoZXNcIiBpbiBlKSB7XG4gICAgICAgICAgeCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgIHkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4ID0gZS5jbGllbnRYO1xuICAgICAgICAgIHkgPSBlLmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5ldmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IHN0cmluZ1tdfSBjaCBPbmUgb3IgbW9yZSBjaGFycyAod2lsbCBiZSBvdmVybGFwcGluZyB0aGVtc2VsdmVzKVxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtmZ10gZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtiZ10gYmFja2dyb3VuZCBjb2xvclxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5kcmF3ID0gZnVuY3Rpb24gZHJhdyh4LCB5LCBjaCwgZmcsIGJnKSB7XG4gICAgICAgIGlmICghZmcpIHtcbiAgICAgICAgICBmZyA9IHRoaXMuX29wdGlvbnMuZmc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJnKSB7XG4gICAgICAgICAgYmcgPSB0aGlzLl9vcHRpb25zLmJnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IFt4LCB5LCBjaCwgZmcsIGJnXTtcblxuICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gLy8gd2lsbCBhbHJlYWR5IHJlZHJhdyBldmVyeXRoaW5nIFxuXG5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgIHRoaXMuX2RpcnR5ID0ge307XG4gICAgICAgIH0gLy8gZmlyc3QhXG5cblxuICAgICAgICB0aGlzLl9kaXJ0eVtrZXldID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIERyYXdzIGEgdGV4dCBhdCBnaXZlbiBwb3NpdGlvbi4gT3B0aW9uYWxseSB3cmFwcyBhdCBhIG1heGltdW0gbGVuZ3RoLiBDdXJyZW50bHkgZG9lcyBub3Qgd29yayB3aXRoIGhleCBsYXlvdXQuXG4gICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IE1heSBjb250YWluIGNvbG9yL2JhY2tncm91bmQgZm9ybWF0IHNwZWNpZmllcnMsICVje25hbWV9LyVie25hbWV9LCBib3RoIG9wdGlvbmFsLiAlY3t9LyVie30gcmVzZXRzIHRvIGRlZmF1bHQuXG4gICAgICAgKiBAcGFyYW0ge2ludH0gW21heFdpZHRoXSB3cmFwIGF0IHdoYXQgd2lkdGg/XG4gICAgICAgKiBAcmV0dXJucyB7aW50fSBsaW5lcyBkcmF3blxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5kcmF3VGV4dCA9IGZ1bmN0aW9uIGRyYXdUZXh0KHgsIHksIHRleHQsIG1heFdpZHRoKSB7XG4gICAgICAgIHZhciBmZyA9IG51bGw7XG4gICAgICAgIHZhciBiZyA9IG51bGw7XG4gICAgICAgIHZhciBjeCA9IHg7XG4gICAgICAgIHZhciBjeSA9IHk7XG4gICAgICAgIHZhciBsaW5lcyA9IDE7XG5cbiAgICAgICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgICAgIG1heFdpZHRoID0gdGhpcy5fb3B0aW9ucy53aWR0aCAtIHg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemUodGV4dCwgbWF4V2lkdGgpO1xuXG4gICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gaW50ZXJwcmV0IHRva2VuaXplZCBvcGNvZGUgc3RyZWFtXG4gICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG5cbiAgICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgICAgICB2YXIgaXNTcGFjZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaXNQcmV2U3BhY2UgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIGlzRnVsbFdpZHRoID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICBpc1ByZXZGdWxsV2lkdGggPSBmYWxzZTtcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2VuLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNjID0gdG9rZW4udmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IHRva2VuLnZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLmxheW91dCA9PT0gXCJ0ZXJtXCIpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjY2ggPSBjYyA+PiA4O1xuICAgICAgICAgICAgICAgICAgdmFyIGlzQ0pLID0gY2NoID09PSAweDExIHx8IGNjaCA+PSAweDJlICYmIGNjaCA8PSAweDlmIHx8IGNjaCA+PSAweGFjICYmIGNjaCA8PSAweGQ3IHx8IGNjID49IDB4QTk2MCAmJiBjYyA8PSAweEE5N0Y7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc0NKSykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAwLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4ICsgMSwgY3ksIFwiXFx0XCIsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgIGN4ICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gLy8gQXNzaWduIHRvIGB0cnVlYCB3aGVuIHRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aC5cblxuXG4gICAgICAgICAgICAgICAgaXNGdWxsV2lkdGggPSBjYyA+IDB4ZmYwMCAmJiBjYyA8IDB4ZmY2MSB8fCBjYyA+IDB4ZmZkYyAmJiBjYyA8IDB4ZmZlOCB8fCBjYyA+IDB4ZmZlZTsgLy8gQ3VycmVudCBjaGFyIGlzIHNwYWNlLCB3aGF0ZXZlciBmdWxsLXdpZHRoIG9yIGhhbGYtd2lkdGggYm90aCBhcmUgT0suXG5cbiAgICAgICAgICAgICAgICBpc1NwYWNlID0gYy5jaGFyQ29kZUF0KDApID09IDB4MjAgfHwgYy5jaGFyQ29kZUF0KDApID09IDB4MzAwMDsgLy8gVGhlIHByZXZpb3VzIGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGNoYXIgaXMgbmV0aGVyIGhhbGYtd2lkdGggbm9yIGEgc3BhY2UuXG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcmV2RnVsbFdpZHRoICYmICFpc0Z1bGxXaWR0aCAmJiAhaXNTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAvLyB0aGUgcHJldmlvdXMgY2hhciBpcyBub3QgYSBzcGFjZS5cblxuXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVsbFdpZHRoICYmICFpc1ByZXZTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3grKywgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgaXNQcmV2U3BhY2UgPSBpc1NwYWNlO1xuICAgICAgICAgICAgICAgIGlzUHJldkZ1bGxXaWR0aCA9IGlzRnVsbFdpZHRoO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVFlQRV9GRzpcbiAgICAgICAgICAgICAgZmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBUWVBFX0JHOlxuICAgICAgICAgICAgICBiZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgY3ggPSB4O1xuICAgICAgICAgICAgICBjeSsrO1xuICAgICAgICAgICAgICBsaW5lcysrO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGluZXM7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBUaW1lciB0aWNrOiB1cGRhdGUgZGlydHkgcGFydHNcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuX3RpY2sgPSBmdW5jdGlvbiBfdGljaygpIHtcbiAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gZHJhdyBhbGxcbiAgICAgICAgICB0aGlzLl9iYWNrZW5kLmNsZWFyKCk7XG5cbiAgICAgICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3KGlkLCBmYWxzZSk7XG4gICAgICAgICAgfSAvLyByZWRyYXcgY2FjaGVkIGRhdGEgXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkcmF3IG9ubHkgZGlydHkgXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3KGtleSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgV2hhdCB0byBkcmF3XG4gICAgICAgKiBAcGFyYW0ge2Jvb2x9IGNsZWFyQmVmb3JlIElzIGl0IG5lY2Vzc2FyeSB0byBjbGVhbiBiZWZvcmU/XG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85Ll9kcmF3ID0gZnVuY3Rpb24gX2RyYXcoa2V5LCBjbGVhckJlZm9yZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcblxuICAgICAgICBpZiAoZGF0YVs0XSAhPSB0aGlzLl9vcHRpb25zLmJnKSB7XG4gICAgICAgICAgY2xlYXJCZWZvcmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmFja2VuZC5kcmF3KGRhdGEsIGNsZWFyQmVmb3JlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBEaXNwbGF5O1xuICAgIH0oKTtcblxuICAgIERpc3BsYXkuUmVjdCA9IFJlY3Q7XG4gICAgRGlzcGxheS5IZXggPSBIZXg7XG4gICAgRGlzcGxheS5UaWxlID0gVGlsZTtcbiAgICBEaXNwbGF5LlRpbGVHTCA9IFRpbGVHTDtcbiAgICBEaXNwbGF5LlRlcm0gPSBUZXJtO1xuICAgIHJldHVybiBEaXNwbGF5O1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgKE1hcmtvdiBwcm9jZXNzKS1iYXNlZCBzdHJpbmcgZ2VuZXJhdG9yLlxuICAgKiBDb3BpZWQgZnJvbSBhIDxhIGhyZWY9XCJodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1OYW1lc19mcm9tX2FfaGlnaF9vcmRlcl9NYXJrb3ZfUHJvY2Vzc19hbmRfYV9zaW1wbGlmaWVkX0thdHpfYmFjay1vZmZfc2NoZW1lXCI+Um9ndWVCYXNpbiBhcnRpY2xlPC9hPi5cbiAgICogT2ZmZXJzIGNvbmZpZ3VyYWJsZSBvcmRlciBhbmQgcHJpb3IuXG4gICAqL1xuXG5cbiAgdmFyIFN0cmluZ0dlbmVyYXRvciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0cmluZ0dlbmVyYXRvcihvcHRpb25zKSB7XG4gICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICB3b3JkczogZmFsc2UsXG4gICAgICAgIG9yZGVyOiAzLFxuICAgICAgICBwcmlvcjogMC4wMDFcbiAgICAgIH07XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgdGhpcy5fYm91bmRhcnkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDApO1xuICAgICAgdGhpcy5fc3VmZml4ID0gdGhpcy5fYm91bmRhcnk7XG4gICAgICB0aGlzLl9wcmVmaXggPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLm9yZGVyOyBpKyspIHtcbiAgICAgICAgdGhpcy5fcHJlZml4LnB1c2godGhpcy5fYm91bmRhcnkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xuICAgICAgdGhpcy5fcHJpb3JWYWx1ZXNbdGhpcy5fYm91bmRhcnldID0gdGhpcy5fb3B0aW9ucy5wcmlvcjtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsZWFybmluZyBkYXRhXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8xMCA9IFN0cmluZ0dlbmVyYXRvci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xMC5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgdGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEdlbmVyYXRlZCBzdHJpbmdcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuZ2VuZXJhdGUgPSBmdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbdGhpcy5fc2FtcGxlKHRoaXMuX3ByZWZpeCldO1xuXG4gICAgICB3aGlsZSAocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSAhPSB0aGlzLl9ib3VuZGFyeSkge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9zYW1wbGUocmVzdWx0KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9qb2luKHJlc3VsdC5zbGljZSgwLCAtMSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZSAobGVhcm4pIGEgc3RyaW5nIGZyb20gYSB0cmFpbmluZyBzZXRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAub2JzZXJ2ZSA9IGZ1bmN0aW9uIG9ic2VydmUoc3RyaW5nKSB7XG4gICAgICB2YXIgdG9rZW5zID0gdGhpcy5fc3BsaXQoc3RyaW5nKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXNbdG9rZW5zW2ldXSA9IHRoaXMuX29wdGlvbnMucHJpb3I7XG4gICAgICB9XG5cbiAgICAgIHRva2VucyA9IHRoaXMuX3ByZWZpeC5jb25jYXQodG9rZW5zKS5jb25jYXQodGhpcy5fc3VmZml4KTtcbiAgICAgIC8qIGFkZCBib3VuZGFyeSBzeW1ib2xzICovXG5cbiAgICAgIGZvciAodmFyIF9pMiA9IHRoaXMuX29wdGlvbnMub3JkZXI7IF9pMiA8IHRva2Vucy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdG9rZW5zLnNsaWNlKF9pMiAtIHRoaXMuX29wdGlvbnMub3JkZXIsIF9pMik7XG4gICAgICAgIHZhciBldmVudCA9IHRva2Vuc1tfaTJdO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29udGV4dC5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBzdWJjb250ZXh0ID0gY29udGV4dC5zbGljZShqKTtcblxuICAgICAgICAgIHRoaXMuX29ic2VydmVFdmVudChzdWJjb250ZXh0LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMTAuZ2V0U3RhdHMgPSBmdW5jdGlvbiBnZXRTdGF0cygpIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgICAgdmFyIHByaW9yQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmlvclZhbHVlcykubGVuZ3RoO1xuICAgICAgcHJpb3JDb3VudC0tOyAvLyBib3VuZGFyeVxuXG4gICAgICBwYXJ0cy5wdXNoKFwiZGlzdGluY3Qgc2FtcGxlczogXCIgKyBwcmlvckNvdW50KTtcbiAgICAgIHZhciBkYXRhQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhKS5sZW5ndGg7XG4gICAgICB2YXIgZXZlbnRDb3VudCA9IDA7XG5cbiAgICAgIGZvciAodmFyIHAgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICBldmVudENvdW50ICs9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGFbcF0pLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgcGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoY29udGV4dHMpOiBcIiArIGRhdGFDb3VudCk7XG4gICAgICBwYXJ0cy5wdXNoKFwiZGljdGlvbmFyeSBzaXplIChldmVudHMpOiBcIiArIGV2ZW50Q291bnQpO1xuICAgICAgcmV0dXJuIHBhcnRzLmpvaW4oXCIsIFwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuX3NwbGl0ID0gZnVuY3Rpb24gX3NwbGl0KHN0cikge1xuICAgICAgcmV0dXJuIHN0ci5zcGxpdCh0aGlzLl9vcHRpb25zLndvcmRzID8gL1xccysvIDogXCJcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLl9qb2luID0gZnVuY3Rpb24gX2pvaW4oYXJyKSB7XG4gICAgICByZXR1cm4gYXJyLmpvaW4odGhpcy5fb3B0aW9ucy53b3JkcyA/IFwiIFwiIDogXCJcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBjb250ZXh0XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLl9vYnNlcnZlRXZlbnQgPSBmdW5jdGlvbiBfb2JzZXJ2ZUV2ZW50KGNvbnRleHQsIGV2ZW50KSB7XG4gICAgICB2YXIga2V5ID0gdGhpcy5fam9pbihjb250ZXh0KTtcblxuICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2RhdGEpKSB7XG4gICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IHt9O1xuICAgICAgfVxuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcblxuICAgICAgaWYgKCEoZXZlbnQgaW4gZGF0YSkpIHtcbiAgICAgICAgZGF0YVtldmVudF0gPSAwO1xuICAgICAgfVxuXG4gICAgICBkYXRhW2V2ZW50XSsrO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5fc2FtcGxlID0gZnVuY3Rpb24gX3NhbXBsZShjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gdGhpcy5fYmFja29mZihjb250ZXh0KTtcblxuICAgICAgdmFyIGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG5cbiAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgdmFyIGF2YWlsYWJsZSA9IHt9O1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy5wcmlvcikge1xuICAgICAgICBmb3IgKHZhciBldmVudCBpbiB0aGlzLl9wcmlvclZhbHVlcykge1xuICAgICAgICAgIGF2YWlsYWJsZVtldmVudF0gPSB0aGlzLl9wcmlvclZhbHVlc1tldmVudF07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBfZXZlbnQgaW4gZGF0YSkge1xuICAgICAgICAgIGF2YWlsYWJsZVtfZXZlbnRdICs9IGRhdGFbX2V2ZW50XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXZhaWxhYmxlID0gZGF0YTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFJORyQxLmdldFdlaWdodGVkVmFsdWUoYXZhaWxhYmxlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5fYmFja29mZiA9IGZ1bmN0aW9uIF9iYWNrb2ZmKGNvbnRleHQpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoLXRoaXMuX29wdGlvbnMub3JkZXIpO1xuICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lmxlbmd0aCA8IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXMuX3ByZWZpeC5zbGljZSgwLCB0aGlzLl9vcHRpb25zLm9yZGVyIC0gY29udGV4dC5sZW5ndGgpLmNvbmNhdChjb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKCEodGhpcy5fam9pbihjb250ZXh0KSBpbiB0aGlzLl9kYXRhKSAmJiBjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoMSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH07XG5cbiAgICByZXR1cm4gU3RyaW5nR2VuZXJhdG9yO1xuICB9KCk7XG5cbiAgdmFyIE1pbkhlYXAgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNaW5IZWFwKCkge1xuICAgICAgdGhpcy5oZWFwID0gW107XG4gICAgICB0aGlzLnRpbWVzdGFtcCA9IDA7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzExID0gTWluSGVhcC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xMS5sZXNzVGhhbiA9IGZ1bmN0aW9uIGxlc3NUaGFuKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmtleSA9PSBiLmtleSA/IGEudGltZXN0YW1wIDwgYi50aW1lc3RhbXAgOiBhLmtleSA8IGIua2V5O1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5zaGlmdCA9IGZ1bmN0aW9uIHNoaWZ0KHYpIHtcbiAgICAgIHRoaXMuaGVhcCA9IHRoaXMuaGVhcC5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIGtleSA9IF9yZWYua2V5LFxuICAgICAgICAgICAgdmFsdWUgPSBfcmVmLnZhbHVlLFxuICAgICAgICAgICAgdGltZXN0YW1wID0gX3JlZi50aW1lc3RhbXA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2V5OiBrZXkgKyB2LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9wcm90bzExLmxlbiA9IGZ1bmN0aW9uIGxlbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2YWx1ZSwga2V5KSB7XG4gICAgICB0aGlzLnRpbWVzdGFtcCArPSAxO1xuICAgICAgdmFyIGxvYyA9IHRoaXMubGVuKCk7XG4gICAgICB0aGlzLmhlYXAucHVzaCh7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcCxcbiAgICAgICAga2V5OiBrZXlcbiAgICAgIH0pO1xuICAgICAgdGhpcy51cGRhdGVVcChsb2MpO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5wb3AgPSBmdW5jdGlvbiBwb3AoKSB7XG4gICAgICBpZiAodGhpcy5sZW4oKSA9PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVsZW1lbnQgdG8gcG9wXCIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG9wID0gdGhpcy5oZWFwWzBdO1xuXG4gICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgdGhpcy5oZWFwWzBdID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURvd24oMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b3A7XG4gICAgfTtcblxuICAgIF9wcm90bzExLmZpbmQgPSBmdW5jdGlvbiBmaW5kKHYpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgIGlmICh2ID09IHRoaXMuaGVhcFtpXS52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhlYXBbaV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSh2KSB7XG4gICAgICB2YXIgaW5kZXggPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuKCk7IGkrKykge1xuICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPiAxKSB7XG4gICAgICAgICAgdGhpcy5oZWFwW2luZGV4XSA9IHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZURvd24oaW5kZXgpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnBhcmVudE5vZGUgPSBmdW5jdGlvbiBwYXJlbnROb2RlKHgpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKCh4IC0gMSkgLyAyKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEubGVmdENoaWxkTm9kZSA9IGZ1bmN0aW9uIGxlZnRDaGlsZE5vZGUoeCkge1xuICAgICAgcmV0dXJuIDIgKiB4ICsgMTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEucmlnaHRDaGlsZE5vZGUgPSBmdW5jdGlvbiByaWdodENoaWxkTm9kZSh4KSB7XG4gICAgICByZXR1cm4gMiAqIHggKyAyO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5leGlzdE5vZGUgPSBmdW5jdGlvbiBleGlzdE5vZGUoeCkge1xuICAgICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEuc3dhcCA9IGZ1bmN0aW9uIHN3YXAoeCwgeSkge1xuICAgICAgdmFyIHQgPSB0aGlzLmhlYXBbeF07XG4gICAgICB0aGlzLmhlYXBbeF0gPSB0aGlzLmhlYXBbeV07XG4gICAgICB0aGlzLmhlYXBbeV0gPSB0O1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5taW5Ob2RlID0gZnVuY3Rpb24gbWluTm9kZShudW1iZXJzKSB7XG4gICAgICB2YXIgdmFsaWRudW1iZXJzID0gbnVtYmVycy5maWx0ZXIodGhpcy5leGlzdE5vZGUuYmluZCh0aGlzKSk7XG4gICAgICB2YXIgbWluaW1hbCA9IHZhbGlkbnVtYmVyc1swXTtcblxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdmFsaWRudW1iZXJzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kzID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgIGlmIChfaTMgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjIgPSBfaXRlcmF0b3JbX2kzKytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9pMyA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pMy5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmMiA9IF9pMy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpID0gX3JlZjI7XG5cbiAgICAgICAgaWYgKHRoaXMubGVzc1RoYW4odGhpcy5oZWFwW2ldLCB0aGlzLmhlYXBbbWluaW1hbF0pKSB7XG4gICAgICAgICAgbWluaW1hbCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1pbmltYWw7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnVwZGF0ZVVwID0gZnVuY3Rpb24gdXBkYXRlVXAoeCkge1xuICAgICAgaWYgKHggPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUoeCk7XG5cbiAgICAgIGlmICh0aGlzLmV4aXN0Tm9kZShwYXJlbnQpICYmIHRoaXMubGVzc1RoYW4odGhpcy5oZWFwW3hdLCB0aGlzLmhlYXBbcGFyZW50XSkpIHtcbiAgICAgICAgdGhpcy5zd2FwKHgsIHBhcmVudCk7XG4gICAgICAgIHRoaXMudXBkYXRlVXAocGFyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMTEudXBkYXRlRG93biA9IGZ1bmN0aW9uIHVwZGF0ZURvd24oeCkge1xuICAgICAgdmFyIGxlZnRDaGlsZCA9IHRoaXMubGVmdENoaWxkTm9kZSh4KTtcbiAgICAgIHZhciByaWdodENoaWxkID0gdGhpcy5yaWdodENoaWxkTm9kZSh4KTtcblxuICAgICAgaWYgKCF0aGlzLmV4aXN0Tm9kZShsZWZ0Q2hpbGQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG0gPSB0aGlzLm1pbk5vZGUoW3gsIGxlZnRDaGlsZCwgcmlnaHRDaGlsZF0pO1xuXG4gICAgICBpZiAobSAhPSB4KSB7XG4gICAgICAgIHRoaXMuc3dhcCh4LCBtKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb3duKG0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8xMS5kZWJ1Z1ByaW50ID0gZnVuY3Rpb24gZGVidWdQcmludCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGVhcCk7XG4gICAgfTtcblxuICAgIHJldHVybiBNaW5IZWFwO1xuICB9KCk7XG5cbiAgdmFyIEV2ZW50UXVldWUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgR2VuZXJpYyBldmVudCBxdWV1ZTogc3RvcmVzIGV2ZW50cyBhbmQgcmV0cmlldmVzIHRoZW0gYmFzZWQgb24gdGhlaXIgdGltZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50UXVldWUoKSB7XG4gICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBNaW5IZWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEVsYXBzZWQgdGltZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMTIgPSBFdmVudFF1ZXVlLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzEyLmdldFRpbWUgPSBmdW5jdGlvbiBnZXRUaW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgc2NoZWR1bGVkIGV2ZW50c1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMi5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gICAgICovXG5cblxuICAgIF9wcm90bzEyLmFkZCA9IGZ1bmN0aW9uIGFkZChldmVudCwgdGltZSkge1xuICAgICAgdGhpcy5fZXZlbnRzLnB1c2goZXZlbnQsIHRpbWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogTG9jYXRlcyB0aGUgbmVhcmVzdCBldmVudCwgYWR2YW5jZXMgdGltZSBpZiBuZWNlc3NhcnkuIFJldHVybnMgdGhhdCBldmVudCBhbmQgcmVtb3ZlcyBpdCBmcm9tIHRoZSBxdWV1ZS5cbiAgICAgKiBAcmV0dXJucyB7PyB8fCBudWxsfSBUaGUgZXZlbnQgcHJldmlvdXNseSBhZGRlZCBieSBhZGRFdmVudCwgbnVsbCBpZiBubyBldmVudCBhdmFpbGFibGVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTIuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudHMubGVuKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciBfdGhpcyRfZXZlbnRzJHBvcCA9IHRoaXMuX2V2ZW50cy5wb3AoKSxcbiAgICAgICAgICB0aW1lID0gX3RoaXMkX2V2ZW50cyRwb3Aua2V5LFxuICAgICAgICAgIGV2ZW50ID0gX3RoaXMkX2V2ZW50cyRwb3AudmFsdWU7XG5cbiAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAvKiBhZHZhbmNlICovXG4gICAgICAgIHRoaXMuX3RpbWUgKz0gdGltZTtcblxuICAgICAgICB0aGlzLl9ldmVudHMuc2hpZnQoLXRpbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBldmVudFxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aW1lXG4gICAgICovXG5cblxuICAgIF9wcm90bzEyLmdldEV2ZW50VGltZSA9IGZ1bmN0aW9uIGdldEV2ZW50VGltZShldmVudCkge1xuICAgICAgdmFyIHIgPSB0aGlzLl9ldmVudHMuZmluZChldmVudCk7XG5cbiAgICAgIGlmIChyKSB7XG4gICAgICAgIHZhciBrZXkgPSByLmtleTtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBldmVudCBmcm9tIHRoZSBxdWV1ZVxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2Vzcz9cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTIucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGV2ZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLnJlbW92ZShldmVudCk7XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudFF1ZXVlO1xuICB9KCk7XG5cbiAgdmFyIFNjaGVkdWxlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBzY2hlZHVsZXJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoKSB7XG4gICAgICB0aGlzLl9xdWV1ZSA9IG5ldyBFdmVudFF1ZXVlKCk7XG4gICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5FdmVudFF1ZXVlI2dldFRpbWVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzEzID0gU2NoZWR1bGVyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzEzLmdldFRpbWUgPSBmdW5jdGlvbiBnZXRUaW1lKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmdldFRpbWUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gcmVwZWF0XG4gICAgICovXG5cblxuICAgIF9wcm90bzEzLmFkZCA9IGZ1bmN0aW9uIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgdGhpcy5fcmVwZWF0LnB1c2goaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lIHRoZSBnaXZlbiBpdGVtIGlzIHNjaGVkdWxlZCBmb3JcbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aW1lXG4gICAgICovXG5cblxuICAgIF9wcm90bzEzLmdldFRpbWVPZiA9IGZ1bmN0aW9uIGdldFRpbWVPZihpdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcXVldWUuZ2V0RXZlbnRUaW1lKGl0ZW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIGl0ZW1zXG4gICAgICovXG5cblxuICAgIF9wcm90bzEzLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLl9xdWV1ZS5jbGVhcigpO1xuXG4gICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBwcmV2aW91c2x5IGFkZGVkIGl0ZW1cbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2Vzc2Z1bD9cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTMucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9xdWV1ZS5yZW1vdmUoaXRlbSk7XG5cbiAgICAgIHZhciBpbmRleCA9IHRoaXMuX3JlcGVhdC5pbmRleE9mKGl0ZW0pO1xuXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcmVwZWF0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jdXJyZW50ID09IGl0ZW0pIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZSBuZXh0IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7P31cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTMubmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fcXVldWUuZ2V0KCk7XG4gICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIFNpbXBsZSBmYWlyIHNjaGVkdWxlciAocm91bmQtcm9iaW4gc3R5bGUpXG4gICAqL1xuXG5cbiAgdmFyIFNpbXBsZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9TY2hlZHVsZXIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShTaW1wbGUsIF9TY2hlZHVsZXIpO1xuXG4gICAgZnVuY3Rpb24gU2ltcGxlKCkge1xuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8xNCA9IFNpbXBsZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xNC5hZGQgPSBmdW5jdGlvbiBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgMCk7XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBpdGVtLCByZXBlYXQpO1xuICAgIH07XG5cbiAgICBfcHJvdG8xNC5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBudWxsICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNpbXBsZTtcbiAgfShTY2hlZHVsZXIpO1xuICAvKipcbiAgICogQGNsYXNzIFNwZWVkLWJhc2VkIHNjaGVkdWxlclxuICAgKi9cblxuXG4gIHZhciBTcGVlZCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9TY2hlZHVsZXIyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoU3BlZWQsIF9TY2hlZHVsZXIyKTtcblxuICAgIGZ1bmN0aW9uIFNwZWVkKCkge1xuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMTUgPSBTcGVlZC5wcm90b3R5cGU7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbSBhbnl0aGluZyB3aXRoIFwiZ2V0U3BlZWRcIiBtZXRob2RcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xL2l0ZW0uZ2V0U3BlZWQoKV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG4gICAgX3Byb3RvMTUuYWRkID0gZnVuY3Rpb24gYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiAxIC8gaXRlbS5nZXRTcGVlZCgpKTtcblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBpdGVtLCByZXBlYXQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTUubmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMSAvIHRoaXMuX2N1cnJlbnQuZ2V0U3BlZWQoKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMi5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3BlZWQ7XG4gIH0oU2NoZWR1bGVyKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBBY3Rpb24tYmFzZWQgc2NoZWR1bGVyXG4gICAqIEBhdWdtZW50cyBST1QuU2NoZWR1bGVyXG4gICAqL1xuXG5cbiAgdmFyIEFjdGlvbiA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9TY2hlZHVsZXIzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQWN0aW9uLCBfU2NoZWR1bGVyMyk7XG5cbiAgICBmdW5jdGlvbiBBY3Rpb24oKSB7XG4gICAgICB2YXIgX3RoaXM5O1xuXG4gICAgICBfdGhpczkgPSBfU2NoZWR1bGVyMy5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczkuX2RlZmF1bHREdXJhdGlvbiA9IDE7XG4gICAgICAvKiBmb3IgbmV3bHkgYWRkZWQgKi9cblxuICAgICAgX3RoaXM5Ll9kdXJhdGlvbiA9IF90aGlzOS5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgLyogZm9yIHRoaXMuX2N1cnJlbnQgKi9cblxuICAgICAgcmV0dXJuIF90aGlzOTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xXVxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzE2ID0gQWN0aW9uLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzE2LmFkZCA9IGZ1bmN0aW9uIGFkZChpdGVtLCByZXBlYXQsIHRpbWUpIHtcbiAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMy5wcm90b3R5cGUuYWRkLmNhbGwodGhpcywgaXRlbSwgcmVwZWF0KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTYuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIzLnByb3RvdHlwZS5jbGVhci5jYWxsKHRoaXMpO1xuICAgIH07XG5cbiAgICBfcHJvdG8xNi5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0gPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9TY2hlZHVsZXIzLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzLCBpdGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG5cblxuICAgIF9wcm90bzE2Lm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IG51bGwgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIHRoaXMuX2R1cmF0aW9uIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG5cbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMy5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IGR1cmF0aW9uIGZvciB0aGUgYWN0aXZlIGl0ZW1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTYuc2V0RHVyYXRpb24gPSBmdW5jdGlvbiBzZXREdXJhdGlvbih0aW1lKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudCkge1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRpbWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gQWN0aW9uO1xuICB9KFNjaGVkdWxlcik7XG5cbiAgdmFyIGluZGV4ID0ge1xuICAgIFNpbXBsZTogU2ltcGxlLFxuICAgIFNwZWVkOiBTcGVlZCxcbiAgICBBY3Rpb246IEFjdGlvblxuICB9O1xuXG4gIHZhciBGT1YgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQWJzdHJhY3QgRk9WIGFsZ29yaXRobVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpZ2h0UGFzc2VzQ2FsbGJhY2sgRG9lcyB0aGUgbGlnaHQgcGFzcyB0aHJvdWdoIHgseT9cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAgICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdIDQvNi84XG4gICAgICovXG4gICAgZnVuY3Rpb24gRk9WKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9saWdodFBhc3NlcyA9IGxpZ2h0UGFzc2VzQ2FsbGJhY2s7XG4gICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBuZWlnaGJvcnMgaW4gYSBjb25jZW50cmljIHJpbmdcbiAgICAgKiBAcGFyYW0ge2ludH0gY3ggY2VudGVyLXhcbiAgICAgKiBAcGFyYW0ge2ludH0gY3kgY2VudGVyLXlcbiAgICAgKiBAcGFyYW0ge2ludH0gciByYW5nZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMTcgPSBGT1YucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTcuX2dldENpcmNsZSA9IGZ1bmN0aW9uIF9nZXRDaXJjbGUoY3gsIGN5LCByKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgZGlycywgY291bnRGYWN0b3IsIHN0YXJ0T2Zmc2V0O1xuXG4gICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIGNvdW50RmFjdG9yID0gMTtcbiAgICAgICAgICBzdGFydE9mZnNldCA9IFswLCAxXTtcbiAgICAgICAgICBkaXJzID0gW0RJUlNbOF1bN10sIERJUlNbOF1bMV0sIERJUlNbOF1bM10sIERJUlNbOF1bNV1dO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBkaXJzID0gRElSU1s2XTtcbiAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICBkaXJzID0gRElSU1s0XTtcbiAgICAgICAgICBjb3VudEZhY3RvciA9IDI7XG4gICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IHRvcG9sb2d5IGZvciBGT1YgY29tcHV0YXRpb25cIik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAvKiBzdGFydGluZyBuZWlnaGJvciAqL1xuXG5cbiAgICAgIHZhciB4ID0gY3ggKyBzdGFydE9mZnNldFswXSAqIHI7XG4gICAgICB2YXIgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0gKiByO1xuICAgICAgLyogY2lyY2xlICovXG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHIgKiBjb3VudEZhY3RvcjsgaisrKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgICAgICB4ICs9IGRpcnNbaV1bMF07XG4gICAgICAgICAgeSArPSBkaXJzW2ldWzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHJldHVybiBGT1Y7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBEaXNjcmV0ZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobS4gT2Jzb2xldGVkIGJ5IFByZWNpc2Ugc2hhZG93Y2FzdGluZy5cbiAgICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAgICovXG5cblxuICB2YXIgRGlzY3JldGVTaGFkb3djYXN0aW5nID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0ZPVikge1xuICAgIF9pbmhlcml0c0xvb3NlKERpc2NyZXRlU2hhZG93Y2FzdGluZywgX0ZPVik7XG5cbiAgICBmdW5jdGlvbiBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcoKSB7XG4gICAgICByZXR1cm4gX0ZPVi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzE4ID0gRGlzY3JldGVTaGFkb3djYXN0aW5nLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzE4LmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgIC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG5cbiAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLyogc3RhcnQgYW5kIGVuZCBhbmdsZXMgKi9cblxuXG4gICAgICB2YXIgREFUQSA9IFtdO1xuICAgICAgdmFyIEEsIEIsIGN4LCBjeSwgYmxvY2tzO1xuICAgICAgLyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cblxuICAgICAgZm9yICh2YXIgciA9IDE7IHIgPD0gUjsgcisrKSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG5cbiAgICAgICAgdmFyIGFuZ2xlID0gMzYwIC8gbmVpZ2hib3JzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuICAgICAgICAgIGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgIEEgPSBhbmdsZSAqIChpIC0gMC41KTtcbiAgICAgICAgICBCID0gQSArIGFuZ2xlO1xuICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGVDb29yZHMoTWF0aC5mbG9vcihBKSwgTWF0aC5jZWlsKEIpLCBibG9ja3MsIERBVEEpKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChEQVRBLmxlbmd0aCA9PSAyICYmIERBVEFbMF0gPT0gMCAmJiBEQVRBWzFdID09IDM2MCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBjdXRvZmY/ICovXG5cbiAgICAgICAgfVxuICAgICAgICAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuXG4gICAgICB9XG4gICAgICAvKiBmb3IgYWxsIHJpbmdzICovXG5cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBBIHN0YXJ0IGFuZ2xlXG4gICAgICogQHBhcmFtIHtpbnR9IEIgZW5kIGFuZ2xlXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGNlbGwgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IERBVEEgc2hhZG93ZWQgYW5nbGUgcGFpcnNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTguX3Zpc2libGVDb29yZHMgPSBmdW5jdGlvbiBfdmlzaWJsZUNvb3JkcyhBLCBCLCBibG9ja3MsIERBVEEpIHtcbiAgICAgIGlmIChBIDwgMCkge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDAsIEIsIGJsb2NrcywgREFUQSk7XG5cbiAgICAgICAgdmFyIHYyID0gdGhpcy5fdmlzaWJsZUNvb3JkcygzNjAgKyBBLCAzNjAsIGJsb2NrcywgREFUQSk7XG5cbiAgICAgICAgcmV0dXJuIHYxIHx8IHYyO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW5kZXggPSAwO1xuXG4gICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEEpIHtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ID09IERBVEEubGVuZ3RoKSB7XG4gICAgICAgIC8qIGNvbXBsZXRlbHkgbmV3IHNoYWRvdyAqL1xuICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgREFUQS5wdXNoKEEsIEIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgIGlmIChpbmRleCAlIDIpIHtcbiAgICAgICAgLyogdGhpcyBzaGFkb3cgc3RhcnRzIGluIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGl0cyBlbmRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBCKSB7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgaWYgKGNvdW50ICUgMikge1xuICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiB0aGlzIHNoYWRvdyBzdGFydHMgb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBhIHN0YXJ0aW5nIGJvdW5kYXJ5ICovXG4gICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICAvKiB2aXNpYmxlIHdoZW4gb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdoZW4gb3ZlcmxhcHBpbmcgKi9cblxuXG4gICAgICAgIGlmIChBID09IERBVEFbaW5kZXggLSBjb3VudF0gJiYgY291bnQgPT0gMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICBpZiAoY291bnQgJSAyKSB7XG4gICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBLCBCKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpc2NyZXRlU2hhZG93Y2FzdGluZztcbiAgfShGT1YpO1xuICAvKipcbiAgICogQGNsYXNzIFByZWNpc2Ugc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAgICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAgICovXG5cblxuICB2YXIgUHJlY2lzZVNoYWRvd2Nhc3RpbmcgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRk9WMikge1xuICAgIF9pbmhlcml0c0xvb3NlKFByZWNpc2VTaGFkb3djYXN0aW5nLCBfRk9WMik7XG5cbiAgICBmdW5jdGlvbiBQcmVjaXNlU2hhZG93Y2FzdGluZygpIHtcbiAgICAgIHJldHVybiBfRk9WMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzE5ID0gUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTkuY29tcHV0ZSA9IGZ1bmN0aW9uIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgIC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cbiAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgLyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cblxuICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvKiBsaXN0IG9mIGFsbCBzaGFkb3dzICovXG5cblxuICAgICAgdmFyIFNIQURPV1MgPSBbXTtcbiAgICAgIHZhciBjeCwgY3ksIGJsb2NrcywgQTEsIEEyLCB2aXNpYmlsaXR5O1xuICAgICAgLyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cblxuICAgICAgZm9yICh2YXIgciA9IDE7IHIgPD0gUjsgcisrKSB7XG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG5cbiAgICAgICAgdmFyIG5laWdoYm9yQ291bnQgPSBuZWlnaGJvcnMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY3ggPSBuZWlnaGJvcnNbaV1bMF07XG4gICAgICAgICAgY3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgLyogc2hpZnQgaGFsZi1hbi1hbmdsZSBiYWNrd2FyZHMgdG8gbWFpbnRhaW4gY29uc2lzdGVuY3kgb2YgMC10aCBjZWxscyAqL1xuXG4gICAgICAgICAgQTEgPSBbaSA/IDIgKiBpIC0gMSA6IDIgKiBuZWlnaGJvckNvdW50IC0gMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgIEEyID0gWzIgKiBpICsgMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuXG4gICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFNIQURPV1MubGVuZ3RoID09IDIgJiYgU0hBRE9XU1swXVswXSA9PSAwICYmIFNIQURPV1NbMV1bMF0gPT0gU0hBRE9XU1sxXVsxXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBjdXRvZmY/ICovXG5cbiAgICAgICAgfVxuICAgICAgICAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuXG4gICAgICB9XG4gICAgICAvKiBmb3IgYWxsIHJpbmdzICovXG5cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMSBhcmMgc3RhcnRcbiAgICAgKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBhcmMgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IFNIQURPV1MgbGlzdCBvZiBhY3RpdmUgc2hhZG93c1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xOS5fY2hlY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24gX2NoZWNrVmlzaWJpbGl0eShBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgICAgaWYgKEExWzBdID4gQTJbMF0pIHtcbiAgICAgICAgLyogc3BsaXQgaW50byB0d28gc3ViLWFyY3MgKi9cbiAgICAgICAgdmFyIHYxID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBbQTFbMV0sIEExWzFdXSwgYmxvY2tzLCBTSEFET1dTKTtcblxuICAgICAgICB2YXIgdjIgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoWzAsIDFdLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcblxuICAgICAgICByZXR1cm4gKHYxICsgdjIpIC8gMjtcbiAgICAgIH1cbiAgICAgIC8qIGluZGV4MTogZmlyc3Qgc2hhZG93ID49IEExICovXG5cblxuICAgICAgdmFyIGluZGV4MSA9IDAsXG4gICAgICAgICAgZWRnZTEgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGluZGV4MSA8IFNIQURPV1MubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGQgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgIHZhciBkaWZmID0gb2xkWzBdICogQTFbMV0gLSBBMVswXSAqIG9sZFsxXTtcblxuICAgICAgICBpZiAoZGlmZiA+PSAwKSB7XG4gICAgICAgICAgLyogb2xkID49IEExICovXG4gICAgICAgICAgaWYgKGRpZmYgPT0gMCAmJiAhKGluZGV4MSAlIDIpKSB7XG4gICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleDErKztcbiAgICAgIH1cbiAgICAgIC8qIGluZGV4MjogbGFzdCBzaGFkb3cgPD0gQTIgKi9cblxuXG4gICAgICB2YXIgaW5kZXgyID0gU0hBRE9XUy5sZW5ndGgsXG4gICAgICAgICAgZWRnZTIgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGluZGV4Mi0tKSB7XG4gICAgICAgIHZhciBfb2xkID0gU0hBRE9XU1tpbmRleDJdO1xuXG4gICAgICAgIHZhciBfZGlmZiA9IEEyWzBdICogX29sZFsxXSAtIF9vbGRbMF0gKiBBMlsxXTtcblxuICAgICAgICBpZiAoX2RpZmYgPj0gMCkge1xuICAgICAgICAgIC8qIG9sZCA8PSBBMiAqL1xuICAgICAgICAgIGlmIChfZGlmZiA9PSAwICYmIGluZGV4MiAlIDIpIHtcbiAgICAgICAgICAgIGVkZ2UyID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmlzaWJsZSA9IHRydWU7XG5cbiAgICAgIGlmIChpbmRleDEgPT0gaW5kZXgyICYmIChlZGdlMSB8fCBlZGdlMikpIHtcbiAgICAgICAgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgb25lIG9mIHRoZSBlZGdlcyBtYXRjaCAqL1xuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGVkZ2UxICYmIGVkZ2UyICYmIGluZGV4MSArIDEgPT0gaW5kZXgyICYmIGluZGV4MiAlIDIpIHtcbiAgICAgICAgLyogY29tcGxldGVseSBlcXVpdmFsZW50IHdpdGggZXhpc3Rpbmcgc2hhZG93ICovXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXgxID4gaW5kZXgyICYmIGluZGV4MSAlIDIpIHtcbiAgICAgICAgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgbm90IHRvdWNoaW5nICovXG4gICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgLyogZmFzdCBjYXNlOiBub3QgdmlzaWJsZSAqL1xuXG5cbiAgICAgIHZhciB2aXNpYmxlTGVuZ3RoO1xuICAgICAgLyogY29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHZpc2libGUgYXJjLCBhZGp1c3QgbGlzdCBvZiBzaGFkb3dzIChpZiBibG9ja2luZykgKi9cblxuICAgICAgdmFyIHJlbW92ZSA9IGluZGV4MiAtIGluZGV4MSArIDE7XG5cbiAgICAgIGlmIChyZW1vdmUgJSAyKSB7XG4gICAgICAgIGlmIChpbmRleDEgJSAyKSB7XG4gICAgICAgICAgLyogZmlyc3QgZWRnZSB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93LCBzZWNvbmQgb3V0c2lkZSAqL1xuICAgICAgICAgIHZhciBQID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoQTJbMF0gKiBQWzFdIC0gUFswXSAqIEEyWzFdKSAvIChQWzFdICogQTJbMV0pO1xuXG4gICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEEyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogc2Vjb25kIGVkZ2Ugd2l0aGluIGV4aXN0aW5nIHNoYWRvdywgZmlyc3Qgb3V0c2lkZSAqL1xuICAgICAgICAgIHZhciBfUCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKF9QWzBdICogQTFbMV0gLSBBMVswXSAqIF9QWzFdKSAvIChBMVsxXSAqIF9QWzFdKTtcblxuICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaW5kZXgxICUgMikge1xuICAgICAgICAgIC8qIGJvdGggZWRnZXMgd2l0aGluIGV4aXN0aW5nIHNoYWRvd3MgKi9cbiAgICAgICAgICB2YXIgUDEgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgdmFyIFAyID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoUDJbMF0gKiBQMVsxXSAtIFAxWzBdICogUDJbMV0pIC8gKFAxWzFdICogUDJbMV0pO1xuXG4gICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBib3RoIGVkZ2VzIG91dHNpZGUgZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMSwgQTIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIC8qIHdob2xlIGFyYyB2aXNpYmxlISAqL1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBhcmNMZW5ndGggPSAoQTJbMF0gKiBBMVsxXSAtIEExWzBdICogQTJbMV0pIC8gKEExWzFdICogQTJbMV0pO1xuICAgICAgcmV0dXJuIHZpc2libGVMZW5ndGggLyBhcmNMZW5ndGg7XG4gICAgfTtcblxuICAgIHJldHVybiBQcmVjaXNlU2hhZG93Y2FzdGluZztcbiAgfShGT1YpO1xuICAvKiogT2N0YW50cyB1c2VkIGZvciB0cmFuc2xhdGluZyByZWN1cnNpdmUgc2hhZG93Y2FzdGluZyBvZmZzZXRzICovXG5cblxuICB2YXIgT0NUQU5UUyA9IFtbLTEsIDAsIDAsIDFdLCBbMCwgLTEsIDEsIDBdLCBbMCwgLTEsIC0xLCAwXSwgWy0xLCAwLCAwLCAtMV0sIFsxLCAwLCAwLCAtMV0sIFswLCAxLCAtMSwgMF0sIFswLCAxLCAxLCAwXSwgWzEsIDAsIDAsIDFdXTtcbiAgLyoqXG4gICAqIEBjbGFzcyBSZWN1cnNpdmUgc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgNC84IHRvcG9sb2dpZXMsIG5vdCBoZXhhZ29uYWwuXG4gICAqIEJhc2VkIG9uIFBldGVyIEhhcmtpbnMnIGltcGxlbWVudGF0aW9uIG9mIEJqw7ZybiBCZXJnc3Ryw7ZtJ3MgYWxnb3JpdGhtIGRlc2NyaWJlZCBoZXJlOiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4uY29tL2luZGV4LnBocD90aXRsZT1GT1ZfdXNpbmdfcmVjdXJzaXZlX3NoYWRvd2Nhc3RpbmdcbiAgICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAgICovXG5cbiAgdmFyIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRk9WMykge1xuICAgIF9pbmhlcml0c0xvb3NlKFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcsIF9GT1YzKTtcblxuICAgIGZ1bmN0aW9uIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcoKSB7XG4gICAgICByZXR1cm4gX0ZPVjMuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yMCA9IFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDM2MC1kZWdyZWUgY2lyY2xlXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIF9wcm90bzIwLmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPQ1RBTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2ldLCBSLCBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMTgwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yMC5jb21wdXRlMTgwID0gZnVuY3Rpb24gY29tcHV0ZTE4MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgIHZhciBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG5cbiAgICAgIHZhciBuZXh0UHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMiArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyB0d28gb2N0YW50cyB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG5cbiAgICAgIHZhciBuZXh0T2N0YW50ID0gKGRpciArIDEgKyA4KSAlIDg7IC8vTmVlZCB0byBncmFiIHRvIG5leHQgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dFByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tuZXh0T2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgOTAtZGVncmVlIGFyY1xuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgX3Byb3RvMjAuY29tcHV0ZTkwID0gZnVuY3Rpb24gY29tcHV0ZTkwKHgsIHksIFIsIGRpciwgY2FsbGJhY2spIHtcbiAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgdmFyIHByZXZpb3VzT2N0YW50ID0gKGRpciAtIDEgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgOTAgZGVncmVlc1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tkaXJdLCBSLCBjYWxsYmFjayk7XG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW3ByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVuZGVyIG9uZSBvY3RhbnQgKDQ1LWRlZ3JlZSBhcmMpIG9mIHRoZSB2aWV3c2hlZFxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gb2N0YW50IE9jdGFudCB0byBiZSByZW5kZXJlZFxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yMC5fcmVuZGVyT2N0YW50ID0gZnVuY3Rpb24gX3JlbmRlck9jdGFudCh4LCB5LCBvY3RhbnQsIFIsIGNhbGxiYWNrKSB7XG4gICAgICAvL1JhZGl1cyBpbmNyZW1lbnRlZCBieSAxIHRvIHByb3ZpZGUgc2FtZSBjb3ZlcmFnZSBhcmVhIGFzIG90aGVyIHNoYWRvd2Nhc3RpbmcgcmFkaXVzZXNcbiAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHgsIHksIDEsIDEuMCwgMC4wLCBSICsgMSwgb2N0YW50WzBdLCBvY3RhbnRbMV0sIG9jdGFudFsyXSwgb2N0YW50WzNdLCBjYWxsYmFjayk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBY3R1YWxseSBjYWxjdWxhdGVzIHRoZSB2aXNpYmlsaXR5XG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WCBUaGUgc3RhcnRpbmcgWCBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WSBUaGUgc3RhcnRpbmcgWSBjb29yZGluYXRlXG4gICAgICogQHBhcmFtIHtpbnR9IHJvdyBUaGUgcm93IHRvIHJlbmRlclxuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHZpc1Nsb3BlU3RhcnQgVGhlIHNsb3BlIHRvIHN0YXJ0IGF0XG4gICAgICogQHBhcmFtIHtmbG9hdH0gdmlzU2xvcGVFbmQgVGhlIHNsb3BlIHRvIGVuZCBhdFxuICAgICAqIEBwYXJhbSB7aW50fSByYWRpdXMgVGhlIHJhZGl1cyB0byByZWFjaCBvdXQgdG9cbiAgICAgKiBAcGFyYW0ge2ludH0geHhcbiAgICAgKiBAcGFyYW0ge2ludH0geHlcbiAgICAgKiBAcGFyYW0ge2ludH0geXhcbiAgICAgKiBAcGFyYW0ge2ludH0geXlcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gdXNlIHdoZW4gd2UgaGl0IGEgYmxvY2sgdGhhdCBpcyB2aXNpYmxlXG4gICAgICovXG5cblxuICAgIF9wcm90bzIwLl9jYXN0VmlzaWJpbGl0eSA9IGZ1bmN0aW9uIF9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgcm93LCB2aXNTbG9wZVN0YXJ0LCB2aXNTbG9wZUVuZCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spIHtcbiAgICAgIGlmICh2aXNTbG9wZVN0YXJ0IDwgdmlzU2xvcGVFbmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gcm93OyBpIDw9IHJhZGl1czsgaSsrKSB7XG4gICAgICAgIHZhciBkeCA9IC1pIC0gMTtcbiAgICAgICAgdmFyIGR5ID0gLWk7XG4gICAgICAgIHZhciBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBuZXdTdGFydCA9IDA7IC8vJ1JvdycgY291bGQgYmUgY29sdW1uLCBuYW1lcyBoZXJlIGFzc3VtZSBvY3RhbnQgMCBhbmQgd291bGQgYmUgZmxpcHBlZCBmb3IgaGFsZiB0aGUgb2N0YW50c1xuXG4gICAgICAgIHdoaWxlIChkeCA8PSAwKSB7XG4gICAgICAgICAgZHggKz0gMTsgLy9UcmFuc2xhdGUgZnJvbSByZWxhdGl2ZSBjb29yZGluYXRlcyB0byBtYXAgY29vcmRpbmF0ZXNcblxuICAgICAgICAgIHZhciBtYXBYID0gc3RhcnRYICsgZHggKiB4eCArIGR5ICogeHk7XG4gICAgICAgICAgdmFyIG1hcFkgPSBzdGFydFkgKyBkeCAqIHl4ICsgZHkgKiB5eTsgLy9SYW5nZSBvZiB0aGUgcm93XG5cbiAgICAgICAgICB2YXIgc2xvcGVTdGFydCA9IChkeCAtIDAuNSkgLyAoZHkgKyAwLjUpO1xuICAgICAgICAgIHZhciBzbG9wZUVuZCA9IChkeCArIDAuNSkgLyAoZHkgLSAwLjUpOyAvL0lnbm9yZSBpZiBub3QgeWV0IGF0IGxlZnQgZWRnZSBvZiBPY3RhbnRcblxuICAgICAgICAgIGlmIChzbG9wZUVuZCA+IHZpc1Nsb3BlU3RhcnQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gLy9Eb25lIGlmIHBhc3QgcmlnaHQgZWRnZVxuXG5cbiAgICAgICAgICBpZiAoc2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IC8vSWYgaXQncyBpbiByYW5nZSwgaXQncyB2aXNpYmxlXG5cblxuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA8IHJhZGl1cyAqIHJhZGl1cykge1xuICAgICAgICAgICAgY2FsbGJhY2sobWFwWCwgbWFwWSwgaSwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFibG9ja2VkKSB7XG4gICAgICAgICAgICAvL0lmIHRpbGUgaXMgYSBibG9ja2luZyB0aWxlLCBjYXN0IGFyb3VuZCBpdFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3NlcyhtYXBYLCBtYXBZKSAmJiBpIDwgcmFkaXVzKSB7XG4gICAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHN0YXJ0WCwgc3RhcnRZLCBpICsgMSwgdmlzU2xvcGVTdGFydCwgc2xvcGVTdGFydCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAgIG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vS2VlcCBuYXJyb3dpbmcgaWYgc2Nhbm5pbmcgYWNyb3NzIGEgYmxvY2tcbiAgICAgICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkpIHtcbiAgICAgICAgICAgICAgbmV3U3RhcnQgPSBzbG9wZUVuZDtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8vQmxvY2sgaGFzIGVuZGVkXG5cblxuICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmlzU2xvcGVTdGFydCA9IG5ld1N0YXJ0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChibG9ja2VkKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlY3Vyc2l2ZVNoYWRvd2Nhc3Rpbmc7XG4gIH0oRk9WKTtcblxuICB2YXIgaW5kZXgkMSA9IHtcbiAgICBEaXNjcmV0ZVNoYWRvd2Nhc3Rpbmc6IERpc2NyZXRlU2hhZG93Y2FzdGluZyxcbiAgICBQcmVjaXNlU2hhZG93Y2FzdGluZzogUHJlY2lzZVNoYWRvd2Nhc3RpbmcsXG4gICAgUmVjdXJzaXZlU2hhZG93Y2FzdGluZzogUmVjdXJzaXZlU2hhZG93Y2FzdGluZ1xuICB9O1xuXG4gIHZhciBNYXAgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQmFzZSBtYXAgZ2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAgICAgKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXG4gICAgICovXG4gICAgZnVuY3Rpb24gTWFwKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIGlmICh3aWR0aCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHdpZHRoID0gREVGQVVMVF9XSURUSDtcbiAgICAgIH1cblxuICAgICAgaWYgKGhlaWdodCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGhlaWdodCA9IERFRkFVTFRfSEVJR0hUO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yMSA9IE1hcC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yMS5fZmlsbE1hcCA9IGZ1bmN0aW9uIF9maWxsTWFwKHZhbHVlKSB7XG4gICAgICB2YXIgbWFwID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICBtYXAucHVzaChbXSk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgIG1hcFtpXS5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFwO1xuICAgIH07XG5cbiAgICByZXR1cm4gTWFwO1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgU2ltcGxlIGVtcHR5IHJlY3Rhbmd1bGFyIHJvb21cbiAgICogQGF1Z21lbnRzIFJPVC5NYXBcbiAgICovXG5cblxuICB2YXIgQXJlbmEgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQXJlbmEsIF9NYXApO1xuXG4gICAgZnVuY3Rpb24gQXJlbmEoKSB7XG4gICAgICByZXR1cm4gX01hcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzIyID0gQXJlbmEucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjIuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdyA9IHRoaXMuX3dpZHRoIC0gMTtcbiAgICAgIHZhciBoID0gdGhpcy5faGVpZ2h0IC0gMTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gdzsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IGg7IGorKykge1xuICAgICAgICAgIHZhciBlbXB0eSA9IGkgJiYgaiAmJiBpIDwgdyAmJiBqIDwgaDtcbiAgICAgICAgICBjYWxsYmFjayhpLCBqLCBlbXB0eSA/IDAgOiAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFyZW5hO1xuICB9KE1hcCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgRHVuZ2VvbiBtYXA6IGhhcyByb29tcyBhbmQgY29ycmlkb3JzXG4gICAqIEBhdWdtZW50cyBST1QuTWFwXG4gICAqL1xuXG5cbiAgdmFyIER1bmdlb24gPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwMikge1xuICAgIF9pbmhlcml0c0xvb3NlKER1bmdlb24sIF9NYXAyKTtcblxuICAgIGZ1bmN0aW9uIER1bmdlb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgdmFyIF90aGlzMTA7XG5cbiAgICAgIF90aGlzMTAgPSBfTWFwMi5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczEwLl9yb29tcyA9IFtdO1xuICAgICAgX3RoaXMxMC5fY29ycmlkb3JzID0gW107XG4gICAgICByZXR1cm4gX3RoaXMxMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgcm9vbXNcbiAgICAgKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLlJvb21bXX1cbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzIzID0gRHVuZ2Vvbi5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yMy5nZXRSb29tcyA9IGZ1bmN0aW9uIGdldFJvb21zKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jvb21zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgY29ycmlkb3JzXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Db3JyaWRvcltdfVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yMy5nZXRDb3JyaWRvcnMgPSBmdW5jdGlvbiBnZXRDb3JyaWRvcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29ycmlkb3JzO1xuICAgIH07XG5cbiAgICByZXR1cm4gRHVuZ2VvbjtcbiAgfShNYXApO1xuICAvKipcbiAgICogQGNsYXNzIER1bmdlb24gZmVhdHVyZTsgaGFzIG93biAuY3JlYXRlKCkgbWV0aG9kXG4gICAqL1xuXG5cbiAgdmFyIEZlYXR1cmUgPSBmdW5jdGlvbiBGZWF0dXJlKCkge307XG4gIC8qKlxuICAgKiBAY2xhc3MgUm9vbVxuICAgKiBAYXVnbWVudHMgUk9ULk1hcC5GZWF0dXJlXG4gICAqIEBwYXJhbSB7aW50fSB4MVxuICAgKiBAcGFyYW0ge2ludH0geTFcbiAgICogQHBhcmFtIHtpbnR9IHgyXG4gICAqIEBwYXJhbSB7aW50fSB5MlxuICAgKiBAcGFyYW0ge2ludH0gW2Rvb3JYXVxuICAgKiBAcGFyYW0ge2ludH0gW2Rvb3JZXVxuICAgKi9cblxuXG4gIHZhciBSb29tID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0ZlYXR1cmUpIHtcbiAgICBfaW5oZXJpdHNMb29zZShSb29tLCBfRmVhdHVyZSk7XG5cbiAgICBmdW5jdGlvbiBSb29tKHgxLCB5MSwgeDIsIHkyLCBkb29yWCwgZG9vclkpIHtcbiAgICAgIHZhciBfdGhpczExO1xuXG4gICAgICBfdGhpczExID0gX0ZlYXR1cmUuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMxMS5feDEgPSB4MTtcbiAgICAgIF90aGlzMTEuX3kxID0geTE7XG4gICAgICBfdGhpczExLl94MiA9IHgyO1xuICAgICAgX3RoaXMxMS5feTIgPSB5MjtcbiAgICAgIF90aGlzMTEuX2Rvb3JzID0ge307XG5cbiAgICAgIGlmIChkb29yWCAhPT0gdW5kZWZpbmVkICYmIGRvb3JZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgX3RoaXMxMS5hZGREb29yKGRvb3JYLCBkb29yWSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdGhpczExO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUsIHdpdGggYSBnaXZlbiBkb29ycyBhbmQgZGlyZWN0aW9uXG4gICAgICovXG4gICAgUm9vbS5jcmVhdGVSYW5kb21BdCA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgb3B0aW9ucykge1xuICAgICAgdmFyIG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgdmFyIG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgdmFyIHdpZHRoID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICB2YXIgaGVpZ2h0ID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG5cbiAgICAgIGlmIChkeCA9PSAxKSB7XG4gICAgICAgIC8qIHRvIHRoZSByaWdodCAqL1xuICAgICAgICB2YXIgeTIgPSB5IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCArIDEsIHkyLCB4ICsgd2lkdGgsIHkyICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeCA9PSAtMSkge1xuICAgICAgICAvKiB0byB0aGUgbGVmdCAqL1xuICAgICAgICB2YXIgX3kgPSB5IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4IC0gd2lkdGgsIF95LCB4IC0gMSwgX3kgKyBoZWlnaHQgLSAxLCB4LCB5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5ID09IDEpIHtcbiAgICAgICAgLyogdG8gdGhlIGJvdHRvbSAqL1xuICAgICAgICB2YXIgeDIgPSB4IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4MiwgeSArIDEsIHgyICsgd2lkdGggLSAxLCB5ICsgaGVpZ2h0LCB4LCB5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5ID09IC0xKSB7XG4gICAgICAgIC8qIHRvIHRoZSB0b3AgKi9cbiAgICAgICAgdmFyIF94ID0geCAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhfeCwgeSAtIGhlaWdodCwgX3ggKyB3aWR0aCAtIDEsIHkgLSAxLCB4LCB5KTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZHggb3IgZHkgbXVzdCBiZSAxIG9yIC0xXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgcG9zaXRpb25lZCBhcm91bmQgY2VudGVyIGNvb3Jkc1xuICAgICAqL1xuXG5cbiAgICBSb29tLmNyZWF0ZVJhbmRvbUNlbnRlciA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUNlbnRlcihjeCwgY3ksIG9wdGlvbnMpIHtcbiAgICAgIHZhciBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgIHZhciBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgIHZhciB3aWR0aCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgdmFyIGhlaWdodCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgdmFyIHgxID0gY3ggLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgIHZhciB5MSA9IGN5IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgdmFyIHgyID0geDEgKyB3aWR0aCAtIDE7XG4gICAgICB2YXIgeTIgPSB5MSArIGhlaWdodCAtIDE7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSB3aXRoaW4gYSBnaXZlbiBkaW1lbnNpb25zXG4gICAgICovXG5cblxuICAgIFJvb20uY3JlYXRlUmFuZG9tID0gZnVuY3Rpb24gY3JlYXRlUmFuZG9tKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICB2YXIgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICB2YXIgd2lkdGggPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgIHZhciBoZWlnaHQgPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIHZhciBsZWZ0ID0gYXZhaWxXaWR0aCAtIHdpZHRoIC0gMTtcbiAgICAgIHZhciB0b3AgPSBhdmFpbEhlaWdodCAtIGhlaWdodCAtIDE7XG4gICAgICB2YXIgeDEgPSAxICsgTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiBsZWZ0KTtcbiAgICAgIHZhciB5MSA9IDEgKyBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIHRvcCk7XG4gICAgICB2YXIgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgIHZhciB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcbiAgICAgIHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgfTtcblxuICAgIHZhciBfcHJvdG8yNCA9IFJvb20ucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjQuYWRkRG9vciA9IGZ1bmN0aW9uIGFkZERvb3IoeCwgeSkge1xuICAgICAgdGhpcy5fZG9vcnNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNC5nZXREb29ycyA9IGZ1bmN0aW9uIGdldERvb3JzKGNiKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgY2IocGFyc2VJbnQocGFydHNbMF0pLCBwYXJzZUludChwYXJ0c1sxXSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuY2xlYXJEb29ycyA9IGZ1bmN0aW9uIGNsZWFyRG9vcnMoKSB7XG4gICAgICB0aGlzLl9kb29ycyA9IHt9O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmFkZERvb3JzID0gZnVuY3Rpb24gYWRkRG9vcnMoaXNXYWxsQ2FsbGJhY2spIHtcbiAgICAgIHZhciBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgdmFyIHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgIHZhciBib3R0b20gPSB0aGlzLl95MiArIDE7XG5cbiAgICAgIGZvciAodmFyIHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgIGlmICh4ICE9IGxlZnQgJiYgeCAhPSByaWdodCAmJiB5ICE9IHRvcCAmJiB5ICE9IGJvdHRvbSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzV2FsbENhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmFkZERvb3IoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmRlYnVnID0gZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInJvb21cIiwgdGhpcy5feDEsIHRoaXMuX3kxLCB0aGlzLl94MiwgdGhpcy5feTIpO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5pc1ZhbGlkID0gZnVuY3Rpb24gaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgdmFyIGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICB2YXIgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICB2YXIgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcblxuICAgICAgZm9yICh2YXIgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XG4gICAgICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eSwgMSA9IHdhbGwsIDIgPSBkb29yLiBNdWx0aXBsZSBkb29ycyBhcmUgYWxsb3dlZC5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjQuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGRpZ0NhbGxiYWNrKSB7XG4gICAgICB2YXIgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgIHZhciByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgIHZhciB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICB2YXIgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgdmFyIHZhbHVlID0gMDtcblxuICAgICAgZm9yICh2YXIgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgaWYgKHggKyBcIixcIiArIHkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgICAgIHZhbHVlID0gMjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZ2V0Q2VudGVyID0gZnVuY3Rpb24gZ2V0Q2VudGVyKCkge1xuICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKCh0aGlzLl94MSArIHRoaXMuX3gyKSAvIDIpLCBNYXRoLnJvdW5kKCh0aGlzLl95MSArIHRoaXMuX3kyKSAvIDIpXTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZ2V0TGVmdCA9IGZ1bmN0aW9uIGdldExlZnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5feDE7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmdldFJpZ2h0ID0gZnVuY3Rpb24gZ2V0UmlnaHQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5feDI7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmdldFRvcCA9IGZ1bmN0aW9uIGdldFRvcCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl95MTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuZ2V0Qm90dG9tID0gZnVuY3Rpb24gZ2V0Qm90dG9tKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3kyO1xuICAgIH07XG5cbiAgICByZXR1cm4gUm9vbTtcbiAgfShGZWF0dXJlKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBDb3JyaWRvclxuICAgKiBAYXVnbWVudHMgUk9ULk1hcC5GZWF0dXJlXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFhcbiAgICogQHBhcmFtIHtpbnR9IHN0YXJ0WVxuICAgKiBAcGFyYW0ge2ludH0gZW5kWFxuICAgKiBAcGFyYW0ge2ludH0gZW5kWVxuICAgKi9cblxuXG4gIHZhciBDb3JyaWRvciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9GZWF0dXJlMikge1xuICAgIF9pbmhlcml0c0xvb3NlKENvcnJpZG9yLCBfRmVhdHVyZTIpO1xuXG4gICAgZnVuY3Rpb24gQ29ycmlkb3Ioc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpIHtcbiAgICAgIHZhciBfdGhpczEyO1xuXG4gICAgICBfdGhpczEyID0gX0ZlYXR1cmUyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzMTIuX3N0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgIF90aGlzMTIuX3N0YXJ0WSA9IHN0YXJ0WTtcbiAgICAgIF90aGlzMTIuX2VuZFggPSBlbmRYO1xuICAgICAgX3RoaXMxMi5fZW5kWSA9IGVuZFk7XG4gICAgICBfdGhpczEyLl9lbmRzV2l0aEFXYWxsID0gdHJ1ZTtcbiAgICAgIHJldHVybiBfdGhpczEyO1xuICAgIH1cblxuICAgIENvcnJpZG9yLmNyZWF0ZVJhbmRvbUF0ID0gZnVuY3Rpb24gY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICB2YXIgbWluID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFswXTtcbiAgICAgIHZhciBtYXggPSBvcHRpb25zLmNvcnJpZG9yTGVuZ3RoWzFdO1xuICAgICAgdmFyIGxlbmd0aCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKHgsIHksIHggKyBkeCAqIGxlbmd0aCwgeSArIGR5ICogbGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgdmFyIF9wcm90bzI1ID0gQ29ycmlkb3IucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjUuZGVidWcgPSBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29ycmlkb3JcIiwgdGhpcy5fc3RhcnRYLCB0aGlzLl9zdGFydFksIHRoaXMuX2VuZFgsIHRoaXMuX2VuZFkpO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNS5pc1ZhbGlkID0gZnVuY3Rpb24gaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgdmFyIHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgdmFyIHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgdmFyIGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgdmFyIGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgdmFyIGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG5cbiAgICAgIGlmIChkeCkge1xuICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkpIHtcbiAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgIH1cblxuICAgICAgdmFyIG54ID0gZHk7XG4gICAgICB2YXIgbnkgPSAtZHg7XG4gICAgICB2YXIgb2sgPSB0cnVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgIHZhciB5ID0gc3kgKyBpICogZHk7XG5cbiAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCArIG54LCB5ICsgbnkpKSB7XG4gICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCAtIG54LCB5IC0gbnkpKSB7XG4gICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICBsZW5ndGggPSBpO1xuICAgICAgICAgIHRoaXMuX2VuZFggPSB4IC0gZHg7XG4gICAgICAgICAgdGhpcy5fZW5kWSA9IHkgLSBkeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBJZiB0aGUgbGVuZ3RoIGRlZ2VuZXJhdGVkLCB0aGlzIGNvcnJpZG9yIG1pZ2h0IGJlIGludmFsaWRcbiAgICAgICAqL1xuXG4gICAgICAvKiBub3Qgc3VwcG9ydGVkICovXG5cblxuICAgICAgaWYgKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8qIGxlbmd0aCAxIGFsbG93ZWQgb25seSBpZiB0aGUgbmV4dCBzcGFjZSBpcyBlbXB0eSAqL1xuXG5cbiAgICAgIGlmIChsZW5ndGggPT0gMSAmJiBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBXZSBkbyBub3Qgd2FudCB0aGUgY29ycmlkb3IgdG8gY3Jhc2ggaW50byBhIGNvcm5lciBvZiBhIHJvb207XG4gICAgICAgKiBpZiBhbnkgb2YgdGhlIGVuZGluZyBjb3JuZXJzIGlzIGVtcHR5LCB0aGUgTisxdGggY2VsbCBvZiB0aGlzIGNvcnJpZG9yIG11c3QgYmUgZW1wdHkgdG9vLlxuICAgICAgICpcbiAgICAgICAqIFNpdHVhdGlvbjpcbiAgICAgICAqICMjIyMjIyMxXG4gICAgICAgKiAuLi4uLi4uP1xuICAgICAgICogIyMjIyMjIzJcbiAgICAgICAqXG4gICAgICAgKiBUaGUgY29ycmlkb3Igd2FzIGR1ZyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAgICAgKiAxLCAyIC0gcHJvYmxlbWF0aWMgY29ybmVycywgPyA9IE4rMXRoIGNlbGwgKG5vdCBkdWcpXG4gICAgICAgKi9cblxuXG4gICAgICB2YXIgZmlyc3RDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4ICsgbngsIHRoaXMuX2VuZFkgKyBkeSArIG55KTtcbiAgICAgIHZhciBzZWNvbmRDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4IC0gbngsIHRoaXMuX2VuZFkgKyBkeSAtIG55KTtcbiAgICAgIHRoaXMuX2VuZHNXaXRoQVdhbGwgPSBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSk7XG5cbiAgICAgIGlmICgoZmlyc3RDb3JuZXJCYWQgfHwgc2Vjb25kQ29ybmVyQmFkKSAmJiB0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eS5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjUuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGRpZ0NhbGxiYWNrKSB7XG4gICAgICB2YXIgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICB2YXIgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICB2YXIgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICB2YXIgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICB2YXIgbGVuZ3RoID0gMSArIE1hdGgubWF4KE1hdGguYWJzKGR4KSwgTWF0aC5hYnMoZHkpKTtcblxuICAgICAgaWYgKGR4KSB7XG4gICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSkge1xuICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgIHZhciB5ID0gc3kgKyBpICogZHk7XG4gICAgICAgIGRpZ0NhbGxiYWNrKHgsIHksIDApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjUuY3JlYXRlUHJpb3JpdHlXYWxscyA9IGZ1bmN0aW9uIGNyZWF0ZVByaW9yaXR5V2FsbHMocHJpb3JpdHlXYWxsQ2FsbGJhY2spIHtcbiAgICAgIGlmICghdGhpcy5fZW5kc1dpdGhBV2FsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgIHZhciBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgIHZhciBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgIHZhciBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcblxuICAgICAgaWYgKGR4KSB7XG4gICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSkge1xuICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnggPSBkeTtcbiAgICAgIHZhciBueSA9IC1keDtcbiAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcbiAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBueCwgdGhpcy5fZW5kWSArIG55KTtcbiAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggLSBueCwgdGhpcy5fZW5kWSAtIG55KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENvcnJpZG9yO1xuICB9KEZlYXR1cmUpO1xuICAvKipcbiAgICogQGNsYXNzIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHRyaWVzIHRvIGZpbGwgdGhlIHNwYWNlIGV2ZW5seS4gR2VuZXJhdGVzIGluZGVwZW5kZW50IHJvb21zIGFuZCB0cmllcyB0byBjb25uZWN0IHRoZW0uXG4gICAqIEBhdWdtZW50cyBST1QuTWFwLkR1bmdlb25cbiAgICovXG5cblxuICB2YXIgVW5pZm9ybSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9EdW5nZW9uKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoVW5pZm9ybSwgX0R1bmdlb24pO1xuXG4gICAgZnVuY3Rpb24gVW5pZm9ybSh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMxMztcblxuICAgICAgX3RoaXMxMyA9IF9EdW5nZW9uLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTMuX29wdGlvbnMgPSB7XG4gICAgICAgIHJvb21XaWR0aDogWzMsIDldLFxuICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgIHJvb21EdWdQZXJjZW50YWdlOiAwLjEsXG4gICAgICAgIHRpbWVMaW1pdDogMTAwMFxuICAgICAgICAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG5cbiAgICAgIH07XG4gICAgICBPYmplY3QuYXNzaWduKF90aGlzMTMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgX3RoaXMxMy5fbWFwID0gW107XG4gICAgICBfdGhpczEzLl9kdWcgPSAwO1xuICAgICAgX3RoaXMxMy5fcm9vbUF0dGVtcHRzID0gMjA7XG4gICAgICAvKiBuZXcgcm9vbSBpcyBjcmVhdGVkIE4tdGltZXMgdW50aWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGdlbmVyYXRlICovXG5cbiAgICAgIF90aGlzMTMuX2NvcnJpZG9yQXR0ZW1wdHMgPSAyMDtcbiAgICAgIC8qIGNvcnJpZG9ycyBhcmUgdHJpZWQgTi10aW1lcyB1bnRpbCB0aGUgbGV2ZWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGNvbm5lY3QgKi9cblxuICAgICAgX3RoaXMxMy5fY29ubmVjdGVkID0gW107XG4gICAgICAvKiBsaXN0IG9mIGFscmVhZHkgY29ubmVjdGVkIHJvb21zICovXG5cbiAgICAgIF90aGlzMTMuX3VuY29ubmVjdGVkID0gW107XG4gICAgICAvKiBsaXN0IG9mIHJlbWFpbmluZyB1bmNvbm5lY3RlZCByb29tcyAqL1xuXG4gICAgICBfdGhpczEzLl9kaWdDYWxsYmFjayA9IF90aGlzMTMuX2RpZ0NhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTMpKSk7XG4gICAgICBfdGhpczEzLl9jYW5CZUR1Z0NhbGxiYWNrID0gX3RoaXMxMy5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczEzKSkpO1xuICAgICAgX3RoaXMxMy5faXNXYWxsQ2FsbGJhY2sgPSBfdGhpczEzLl9pc1dhbGxDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczEzKSkpO1xuICAgICAgcmV0dXJuIF90aGlzMTM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1hcC4gSWYgdGhlIHRpbWUgbGltaXQgaGFzIGJlZW4gaGl0LCByZXR1cm5zIG51bGwuXG4gICAgICogQHNlZSBST1QuTWFwI2NyZWF0ZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMjYgPSBVbmlmb3JtLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI2LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcblxuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgdmFyIHQyID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyogdGltZSBsaW1pdCEgKi9cblxuXG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gW107XG5cbiAgICAgICAgdGhpcy5fZ2VuZXJhdGVSb29tcygpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb29tcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZ2VuZXJhdGVDb3JyaWRvcnMoKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHN1aXRhYmxlIGFtb3VudCBvZiByb29tc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNi5fZ2VuZXJhdGVSb29tcyA9IGZ1bmN0aW9uIF9nZW5lcmF0ZVJvb21zKCkge1xuICAgICAgdmFyIHcgPSB0aGlzLl93aWR0aCAtIDI7XG4gICAgICB2YXIgaCA9IHRoaXMuX2hlaWdodCAtIDI7XG4gICAgICB2YXIgcm9vbTtcblxuICAgICAgZG8ge1xuICAgICAgICByb29tID0gdGhpcy5fZ2VuZXJhdGVSb29tKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2R1ZyAvICh3ICogaCkgPiB0aGlzLl9vcHRpb25zLnJvb21EdWdQZXJjZW50YWdlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyogYWNoaWV2ZWQgcmVxdWVzdGVkIGFtb3VudCBvZiBmcmVlIHNwYWNlICovXG5cbiAgICAgIH0gd2hpbGUgKHJvb20pO1xuICAgICAgLyogZWl0aGVyIGVub3VnaCByb29tcywgb3Igbm90IGFibGUgdG8gZ2VuZXJhdGUgbW9yZSBvZiB0aGVtIDopICovXG5cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyeSB0byBnZW5lcmF0ZSBvbmUgcm9vbVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNi5fZ2VuZXJhdGVSb29tID0gZnVuY3Rpb24gX2dlbmVyYXRlUm9vbSgpIHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjb3VudCA8IHRoaXMuX3Jvb21BdHRlbXB0cykge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgICB2YXIgcm9vbSA9IFJvb20uY3JlYXRlUmFuZG9tKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQsIHRoaXMuX29wdGlvbnMpO1xuXG4gICAgICAgIGlmICghcm9vbS5pc1ZhbGlkKHRoaXMuX2lzV2FsbENhbGxiYWNrLCB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuXG4gICAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG5cbiAgICAgICAgcmV0dXJuIHJvb207XG4gICAgICB9XG4gICAgICAvKiBubyByb29tIHdhcyBnZW5lcmF0ZWQgaW4gYSBnaXZlbiBudW1iZXIgb2YgYXR0ZW1wdHMgKi9cblxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBjb25uZWN0b3JzIGJld2VlbiByb29tc1xuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzIFdhcyB0aGlzIGF0dGVtcHQgc3VjY2Vzc2Z1bGw/XG4gICAgICovXG5cblxuICAgIF9wcm90bzI2Ll9nZW5lcmF0ZUNvcnJpZG9ycyA9IGZ1bmN0aW9uIF9nZW5lcmF0ZUNvcnJpZG9ycygpIHtcbiAgICAgIHZhciBjbnQgPSAwO1xuXG4gICAgICB3aGlsZSAoY250IDwgdGhpcy5fY29ycmlkb3JBdHRlbXB0cykge1xuICAgICAgICBjbnQrKztcbiAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICAgIC8qIGRpZyByb29tcyBpbnRvIGEgY2xlYXIgbWFwICovXG5cbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Jvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHJvb20gPSB0aGlzLl9yb29tc1tpXTtcbiAgICAgICAgICByb29tLmNsZWFyRG9vcnMoKTtcbiAgICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFJORyQxLnNodWZmbGUodGhpcy5fcm9vbXMuc2xpY2UoKSk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaCh0aGlzLl91bmNvbm5lY3RlZC5wb3AoKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogZmlyc3Qgb25lIGlzIGFsd2F5cyBjb25uZWN0ZWQgKi9cblxuXG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgLyogMS4gcGljayByYW5kb20gY29ubmVjdGVkIHJvb20gKi9cbiAgICAgICAgICB2YXIgY29ubmVjdGVkID0gUk5HJDEuZ2V0SXRlbSh0aGlzLl9jb25uZWN0ZWQpO1xuXG4gICAgICAgICAgaWYgKCFjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiAyLiBmaW5kIGNsb3Nlc3QgdW5jb25uZWN0ZWQgKi9cblxuXG4gICAgICAgICAgdmFyIHJvb20xID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fdW5jb25uZWN0ZWQsIGNvbm5lY3RlZCk7XG5cbiAgICAgICAgICBpZiAoIXJvb20xKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogMy4gY29ubmVjdCBpdCB0byBjbG9zZXN0IGNvbm5lY3RlZCAqL1xuXG5cbiAgICAgICAgICB2YXIgcm9vbTIgPSB0aGlzLl9jbG9zZXN0Um9vbSh0aGlzLl9jb25uZWN0ZWQsIHJvb20xKTtcblxuICAgICAgICAgIGlmICghcm9vbTIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBvayA9IHRoaXMuX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpO1xuXG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIHN0b3AgY29ubmVjdGluZywgcmUtc2h1ZmZsZSAqL1xuXG5cbiAgICAgICAgICBpZiAoIXRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGRvbmU7IG5vIHJvb21zIHJlbWFpbiAqL1xuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGb3IgYSBnaXZlbiByb29tLCBmaW5kIHRoZSBjbG9zZXN0IG9uZSBmcm9tIHRoZSBsaXN0XG4gICAgICovXG4gICAgX3Byb3RvMjYuX2Nsb3Nlc3RSb29tID0gZnVuY3Rpb24gX2Nsb3Nlc3RSb29tKHJvb21zLCByb29tKSB7XG4gICAgICB2YXIgZGlzdCA9IEluZmluaXR5O1xuICAgICAgdmFyIGNlbnRlciA9IHJvb20uZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgciA9IHJvb21zW2ldO1xuICAgICAgICB2YXIgYyA9IHIuZ2V0Q2VudGVyKCk7XG4gICAgICAgIHZhciBkeCA9IGNbMF0gLSBjZW50ZXJbMF07XG4gICAgICAgIHZhciBkeSA9IGNbMV0gLSBjZW50ZXJbMV07XG4gICAgICAgIHZhciBkID0gZHggKiBkeCArIGR5ICogZHk7XG5cbiAgICAgICAgaWYgKGQgPCBkaXN0KSB7XG4gICAgICAgICAgZGlzdCA9IGQ7XG4gICAgICAgICAgcmVzdWx0ID0gcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBfcHJvdG8yNi5fY29ubmVjdFJvb21zID0gZnVuY3Rpb24gX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpIHtcbiAgICAgIC8qXG4gICAgICAgICAgcm9vbTEuZGVidWcoKTtcbiAgICAgICAgICByb29tMi5kZWJ1ZygpO1xuICAgICAgKi9cbiAgICAgIHZhciBjZW50ZXIxID0gcm9vbTEuZ2V0Q2VudGVyKCk7XG4gICAgICB2YXIgY2VudGVyMiA9IHJvb20yLmdldENlbnRlcigpO1xuICAgICAgdmFyIGRpZmZYID0gY2VudGVyMlswXSAtIGNlbnRlcjFbMF07XG4gICAgICB2YXIgZGlmZlkgPSBjZW50ZXIyWzFdIC0gY2VudGVyMVsxXTtcbiAgICAgIHZhciBzdGFydDtcbiAgICAgIHZhciBlbmQ7XG4gICAgICB2YXIgZGlySW5kZXgxLCBkaXJJbmRleDIsIG1pbiwgbWF4LCBpbmRleDtcblxuICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA8IE1hdGguYWJzKGRpZmZZKSkge1xuICAgICAgICAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBub3J0aC1zb3V0aCB3YWxscyAqL1xuICAgICAgICBkaXJJbmRleDEgPSBkaWZmWSA+IDAgPyAyIDogMDtcbiAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcbiAgICAgICAgbWluID0gcm9vbTIuZ2V0TGVmdCgpO1xuICAgICAgICBtYXggPSByb29tMi5nZXRSaWdodCgpO1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBlYXN0LXdlc3Qgd2FsbHMgKi9cbiAgICAgICAgZGlySW5kZXgxID0gZGlmZlggPiAwID8gMSA6IDM7XG4gICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XG4gICAgICAgIG1pbiA9IHJvb20yLmdldFRvcCgpO1xuICAgICAgICBtYXggPSByb29tMi5nZXRCb3R0b20oKTtcbiAgICAgICAgaW5kZXggPSAxO1xuICAgICAgfVxuXG4gICAgICBzdGFydCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20xLCBkaXJJbmRleDEpO1xuICAgICAgLyogY29ycmlkb3Igd2lsbCBzdGFydCBoZXJlICovXG5cbiAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnRbaW5kZXhdID49IG1pbiAmJiBzdGFydFtpbmRleF0gPD0gbWF4KSB7XG4gICAgICAgIC8qIHBvc3NpYmxlIHRvIGNvbm5lY3Qgd2l0aCBzdHJhaWdodCBsaW5lIChJLWxpa2UpICovXG4gICAgICAgIGVuZCA9IHN0YXJ0LnNsaWNlKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IDA7XG5cbiAgICAgICAgc3dpdGNoIChkaXJJbmRleDIpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFRvcCgpIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRSaWdodCgpICsgMTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRCb3R0b20oKSArIDE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0TGVmdCgpIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kWyhpbmRleCArIDEpICUgMl0gPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgZW5kXSk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0W2luZGV4XSA8IG1pbiAtIDEgfHwgc3RhcnRbaW5kZXhdID4gbWF4ICsgMSkge1xuICAgICAgICAvKiBuZWVkIHRvIHN3aXRjaCB0YXJnZXQgd2FsbCAoTC1saWtlKSAqL1xuICAgICAgICB2YXIgZGlmZiA9IHN0YXJ0W2luZGV4XSAtIGNlbnRlcjJbaW5kZXhdO1xuICAgICAgICB2YXIgcm90YXRpb24gPSAwO1xuXG4gICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJvdGF0aW9uID0gZGlmZiA8IDAgPyAzIDogMTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJvdGF0aW9uID0gZGlmZiA8IDAgPyAxIDogMztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MiArIHJvdGF0aW9uKSAlIDQ7XG4gICAgICAgIGVuZCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20yLCBkaXJJbmRleDIpO1xuXG4gICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1pZCA9IFswLCAwXTtcbiAgICAgICAgbWlkW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgdmFyIGluZGV4MiA9IChpbmRleCArIDEpICUgMjtcbiAgICAgICAgbWlkW2luZGV4Ml0gPSBlbmRbaW5kZXgyXTtcblxuICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkLCBlbmRdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIHVzZSBjdXJyZW50IHdhbGwgcGFpciwgYnV0IGFkanVzdCB0aGUgbGluZSBpbiB0aGUgbWlkZGxlIChTLWxpa2UpICovXG4gICAgICAgIHZhciBfaW5kZXg0ID0gKGluZGV4ICsgMSkgJSAyO1xuXG4gICAgICAgIGVuZCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20yLCBkaXJJbmRleDIpO1xuXG4gICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9taWQgPSBNYXRoLnJvdW5kKChlbmRbX2luZGV4NF0gKyBzdGFydFtfaW5kZXg0XSkgLyAyKTtcblxuICAgICAgICB2YXIgbWlkMSA9IFswLCAwXTtcbiAgICAgICAgdmFyIG1pZDIgPSBbMCwgMF07XG4gICAgICAgIG1pZDFbaW5kZXhdID0gc3RhcnRbaW5kZXhdO1xuICAgICAgICBtaWQxW19pbmRleDRdID0gX21pZDtcbiAgICAgICAgbWlkMltpbmRleF0gPSBlbmRbaW5kZXhdO1xuICAgICAgICBtaWQyW19pbmRleDRdID0gX21pZDtcblxuICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkMSwgbWlkMiwgZW5kXSk7XG4gICAgICB9XG5cbiAgICAgIHJvb20xLmFkZERvb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgIHJvb20yLmFkZERvb3IoZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20xKTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTEpO1xuICAgICAgfVxuXG4gICAgICBpbmRleCA9IHRoaXMuX3VuY29ubmVjdGVkLmluZGV4T2Yocm9vbTIpO1xuXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNi5fcGxhY2VJbldhbGwgPSBmdW5jdGlvbiBfcGxhY2VJbldhbGwocm9vbSwgZGlySW5kZXgpIHtcbiAgICAgIHZhciBzdGFydCA9IFswLCAwXTtcbiAgICAgIHZhciBkaXIgPSBbMCwgMF07XG4gICAgICB2YXIgbGVuZ3RoID0gMDtcblxuICAgICAgc3dpdGNoIChkaXJJbmRleCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgZGlyID0gWzEsIDBdO1xuICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpLCByb29tLmdldFRvcCgpIC0gMV07XG4gICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRSaWdodCgpIC0gcm9vbS5nZXRMZWZ0KCkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRSaWdodCgpICsgMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0Qm90dG9tKCkgKyAxXTtcbiAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGRpciA9IFswLCAxXTtcbiAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSAtIDEsIHJvb20uZ2V0VG9wKCldO1xuICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCkgLSByb29tLmdldFRvcCgpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGF2YWlsID0gW107XG4gICAgICB2YXIgbGFzdEJhZEluZGV4ID0gLTI7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSBzdGFydFswXSArIGkgKiBkaXJbMF07XG4gICAgICAgIHZhciB5ID0gc3RhcnRbMV0gKyBpICogZGlyWzFdO1xuICAgICAgICBhdmFpbC5wdXNoKG51bGwpO1xuICAgICAgICB2YXIgaXNXYWxsID0gdGhpcy5fbWFwW3hdW3ldID09IDE7XG5cbiAgICAgICAgaWYgKGlzV2FsbCkge1xuICAgICAgICAgIGlmIChsYXN0QmFkSW5kZXggIT0gaSAtIDEpIHtcbiAgICAgICAgICAgIGF2YWlsW2ldID0gW3gsIHldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0QmFkSW5kZXggPSBpO1xuXG4gICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgIGF2YWlsW2kgLSAxXSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNCA9IGF2YWlsLmxlbmd0aCAtIDE7IF9pNCA+PSAwOyBfaTQtLSkge1xuICAgICAgICBpZiAoIWF2YWlsW19pNF0pIHtcbiAgICAgICAgICBhdmFpbC5zcGxpY2UoX2k0LCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXZhaWwubGVuZ3RoID8gUk5HJDEuZ2V0SXRlbShhdmFpbCkgOiBudWxsO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGlnIGEgcG9seWxpbmUuXG4gICAgICovXG5cblxuICAgIF9wcm90bzI2Ll9kaWdMaW5lID0gZnVuY3Rpb24gX2RpZ0xpbmUocG9pbnRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc3RhcnQgPSBwb2ludHNbaSAtIDFdO1xuICAgICAgICB2YXIgZW5kID0gcG9pbnRzW2ldO1xuICAgICAgICB2YXIgY29ycmlkb3IgPSBuZXcgQ29ycmlkb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdLCBlbmRbMF0sIGVuZFsxXSk7XG4gICAgICAgIGNvcnJpZG9yLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG5cbiAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goY29ycmlkb3IpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNi5fZGlnQ2FsbGJhY2sgPSBmdW5jdGlvbiBfZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpIHtcbiAgICAgIHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlO1xuXG4gICAgICBpZiAodmFsdWUgPT0gMCkge1xuICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjYuX2lzV2FsbENhbGxiYWNrID0gZnVuY3Rpb24gX2lzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21hcFt4XVt5XSA9PSAxO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNi5fY2FuQmVEdWdDYWxsYmFjayA9IGZ1bmN0aW9uIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbWFwW3hdW3ldID09IDE7XG4gICAgfTtcblxuICAgIHJldHVybiBVbmlmb3JtO1xuICB9KER1bmdlb24pO1xuICAvKipcbiAgICogQGNsYXNzIENlbGx1bGFyIGF1dG9tYXRvbiBtYXAgZ2VuZXJhdG9yXG4gICAqIEBhdWdtZW50cyBST1QuTWFwXG4gICAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXG4gICAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBPcHRpb25zXG4gICAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLmJvcm5dIExpc3Qgb2YgbmVpZ2hib3IgY291bnRzIGZvciBhIG5ldyBjZWxsIHRvIGJlIGJvcm4gaW4gZW1wdHkgc3BhY2VcbiAgICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuc3Vydml2ZV0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGFuIGV4aXN0aW5nICBjZWxsIHRvIHN1cnZpdmVcbiAgICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5XSBUb3BvbG9neSA0IG9yIDYgb3IgOFxuICAgKi9cblxuXG4gIHZhciBDZWxsdWxhciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXAzKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQ2VsbHVsYXIsIF9NYXAzKTtcblxuICAgIGZ1bmN0aW9uIENlbGx1bGFyKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczE0O1xuXG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxNCA9IF9NYXAzLmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTQuX29wdGlvbnMgPSB7XG4gICAgICAgIGJvcm46IFs1LCA2LCA3LCA4XSxcbiAgICAgICAgc3Vydml2ZTogWzQsIDUsIDYsIDcsIDhdLFxuICAgICAgICB0b3BvbG9neTogOFxuICAgICAgfTtcblxuICAgICAgX3RoaXMxNC5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICBfdGhpczE0Ll9kaXJzID0gRElSU1tfdGhpczE0Ll9vcHRpb25zLnRvcG9sb2d5XTtcbiAgICAgIF90aGlzMTQuX21hcCA9IF90aGlzMTQuX2ZpbGxNYXAoMCk7XG4gICAgICByZXR1cm4gX3RoaXMxNDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsbCB0aGUgbWFwIHdpdGggcmFuZG9tIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHByb2JhYmlsaXR5IFByb2JhYmlsaXR5IGZvciBhIGNlbGwgdG8gYmVjb21lIGFsaXZlOyAwID0gYWxsIGVtcHR5LCAxID0gYWxsIGZ1bGxcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzI3ID0gQ2VsbHVsYXIucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjcucmFuZG9taXplID0gZnVuY3Rpb24gcmFuZG9taXplKHByb2JhYmlsaXR5KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgIHRoaXMuX21hcFtpXVtqXSA9IFJORyQxLmdldFVuaWZvcm0oKSA8IHByb2JhYmlsaXR5ID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGFuZ2Ugb3B0aW9ucy5cbiAgICAgKiBAc2VlIFJPVC5NYXAuQ2VsbHVsYXJcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjcuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuc2V0ID0gZnVuY3Rpb24gc2V0KHgsIHksIHZhbHVlKSB7XG4gICAgICB0aGlzLl9tYXBbeF1beV0gPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbmV3TWFwID0gdGhpcy5fZmlsbE1hcCgwKTtcblxuICAgICAgdmFyIGJvcm4gPSB0aGlzLl9vcHRpb25zLmJvcm47XG4gICAgICB2YXIgc3Vydml2ZSA9IHRoaXMuX29wdGlvbnMuc3Vydml2ZTtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICB2YXIgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgdmFyIHdpZHRoU3RhcnQgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgIHdpZHRoU3RhcnQgPSBqICUgMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSB3aWR0aFN0YXJ0OyBpIDwgdGhpcy5fd2lkdGg7IGkgKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgdmFyIGN1ciA9IHRoaXMuX21hcFtpXVtqXTtcblxuICAgICAgICAgIHZhciBuY291bnQgPSB0aGlzLl9nZXROZWlnaGJvcnMoaSwgaik7XG5cbiAgICAgICAgICBpZiAoY3VyICYmIHN1cnZpdmUuaW5kZXhPZihuY291bnQpICE9IC0xKSB7XG4gICAgICAgICAgICAvKiBzdXJ2aXZlICovXG4gICAgICAgICAgICBuZXdNYXBbaV1bal0gPSAxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIWN1ciAmJiBib3JuLmluZGV4T2YobmNvdW50KSAhPSAtMSkge1xuICAgICAgICAgICAgLyogYm9ybiAqL1xuICAgICAgICAgICAgbmV3TWFwW2ldW2pdID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbWFwID0gbmV3TWFwO1xuICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX3NlcnZpY2VDYWxsYmFjayA9IGZ1bmN0aW9uIF9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgdmFyIHdpZHRoU3RlcCA9IDE7XG4gICAgICAgIHZhciB3aWR0aFN0YXJ0ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBuZWlnaGJvciBjb3VudCBhdCBbaSxqXSBpbiB0aGlzLl9tYXBcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjcuX2dldE5laWdoYm9ycyA9IGZ1bmN0aW9uIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkaXIgPSB0aGlzLl9kaXJzW2ldO1xuICAgICAgICB2YXIgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICB2YXIgeSA9IGN5ICsgZGlyWzFdO1xuXG4gICAgICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPCAwIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgKz0gdGhpcy5fbWFwW3hdW3ldID09IDEgPyAxIDogMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSBldmVyeSBub24td2FsbCBzcGFjZSBpcyBhY2Nlc3NpYmxlLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgdG8gZGlzcGxheSBtYXAgd2hlbiBkb1xuICAgICAqIEBwYXJhbSB7aW50fSB2YWx1ZSB0byBjb25zaWRlciBlbXB0eSBzcGFjZSAtIGRlZmF1bHRzIHRvIDBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHdoZW4gYSBuZXcgY29ubmVjdGlvbiBpcyBtYWRlXG4gICAgICovXG5cblxuICAgIF9wcm90bzI3LmNvbm5lY3QgPSBmdW5jdGlvbiBjb25uZWN0KGNhbGxiYWNrLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDA7XG4gICAgICB2YXIgYWxsRnJlZVNwYWNlID0gW107XG4gICAgICB2YXIgbm90Q29ubmVjdGVkID0ge307IC8vIGZpbmQgYWxsIGZyZWUgc3BhY2VcblxuICAgICAgdmFyIHdpZHRoU3RlcCA9IDE7XG4gICAgICB2YXIgd2lkdGhTdGFydHMgPSBbMCwgMF07XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgd2lkdGhTdGFydHMgPSBbMCwgMV07XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgdGhpcy5faGVpZ2h0OyB5KyspIHtcbiAgICAgICAgZm9yICh2YXIgeCA9IHdpZHRoU3RhcnRzW3kgJSAyXTsgeCA8IHRoaXMuX3dpZHRoOyB4ICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgIGlmICh0aGlzLl9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpKSB7XG4gICAgICAgICAgICB2YXIgcCA9IFt4LCB5XTtcbiAgICAgICAgICAgIG5vdENvbm5lY3RlZFt0aGlzLl9wb2ludEtleShwKV0gPSBwO1xuICAgICAgICAgICAgYWxsRnJlZVNwYWNlLnB1c2goW3gsIHldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXJ0ID0gYWxsRnJlZVNwYWNlW1JORyQxLmdldFVuaWZvcm1JbnQoMCwgYWxsRnJlZVNwYWNlLmxlbmd0aCAtIDEpXTtcblxuICAgICAgdmFyIGtleSA9IHRoaXMuX3BvaW50S2V5KHN0YXJ0KTtcblxuICAgICAgdmFyIGNvbm5lY3RlZCA9IHt9O1xuICAgICAgY29ubmVjdGVkW2tleV0gPSBzdGFydDtcbiAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTsgLy8gZmluZCB3aGF0J3MgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuXG4gICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBbc3RhcnRdLCBmYWxzZSwgdmFsdWUpO1xuXG4gICAgICB3aGlsZSAoT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIGZpbmQgdHdvIHBvaW50cyBmcm9tIG5vdENvbm5lY3RlZCB0byBjb25uZWN0ZWRcbiAgICAgICAgdmFyIF9wID0gdGhpcy5fZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKTtcblxuICAgICAgICB2YXIgZnJvbSA9IF9wWzBdOyAvLyBub3RDb25uZWN0ZWRcblxuICAgICAgICB2YXIgdG8gPSBfcFsxXTsgLy8gY29ubmVjdGVkXG4gICAgICAgIC8vIGZpbmQgZXZlcnl0aGluZyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG5cbiAgICAgICAgdmFyIGxvY2FsID0ge307XG4gICAgICAgIGxvY2FsW3RoaXMuX3BvaW50S2V5KGZyb20pXSA9IGZyb207XG5cbiAgICAgICAgdGhpcy5fZmluZENvbm5lY3RlZChsb2NhbCwgbm90Q29ubmVjdGVkLCBbZnJvbV0sIHRydWUsIHZhbHVlKTsgLy8gY29ubmVjdCB0byBhIGNvbm5lY3RlZCBjZWxsXG5cblxuICAgICAgICB2YXIgdHVubmVsRm4gPSB0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYgPyB0aGlzLl90dW5uZWxUb0Nvbm5lY3RlZDYgOiB0aGlzLl90dW5uZWxUb0Nvbm5lY3RlZDtcbiAgICAgICAgdHVubmVsRm4uY2FsbCh0aGlzLCB0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spOyAvLyBub3cgYWxsIG9mIGxvY2FsIGlzIGNvbm5lY3RlZFxuXG4gICAgICAgIGZvciAodmFyIGsgaW4gbG9jYWwpIHtcbiAgICAgICAgICB2YXIgcHAgPSBsb2NhbFtrXTtcbiAgICAgICAgICB0aGlzLl9tYXBbcHBbMF1dW3BwWzFdXSA9IHZhbHVlO1xuICAgICAgICAgIGNvbm5lY3RlZFtrXSA9IHBwO1xuICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbmQgcmFuZG9tIHBvaW50cyB0byBjb25uZWN0LiBTZWFyY2ggZm9yIHRoZSBjbG9zZXN0IHBvaW50IGluIHRoZSBsYXJnZXIgc3BhY2UuXG4gICAgICogVGhpcyBpcyB0byBtaW5pbWl6ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXNzYWdlIHdoaWxlIG1haW50YWluaW5nIGdvb2QgcGVyZm9ybWFuY2UuXG4gICAgICovXG5cblxuICAgIF9wcm90bzI3Ll9nZXRGcm9tVG8gPSBmdW5jdGlvbiBfZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKSB7XG4gICAgICB2YXIgZnJvbSA9IFswLCAwXSxcbiAgICAgICAgICB0byA9IFswLCAwXSxcbiAgICAgICAgICBkO1xuICAgICAgdmFyIGNvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhjb25uZWN0ZWQpO1xuICAgICAgdmFyIG5vdENvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBpZiAoY29ubmVjdGVkS2V5cy5sZW5ndGggPCBub3RDb25uZWN0ZWRLZXlzLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBrZXlzID0gY29ubmVjdGVkS2V5cztcbiAgICAgICAgICB0byA9IGNvbm5lY3RlZFtrZXlzW1JORyQxLmdldFVuaWZvcm1JbnQoMCwga2V5cy5sZW5ndGggLSAxKV1dO1xuICAgICAgICAgIGZyb20gPSB0aGlzLl9nZXRDbG9zZXN0KHRvLCBub3RDb25uZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBfa2V5cyA9IG5vdENvbm5lY3RlZEtleXM7XG4gICAgICAgICAgZnJvbSA9IG5vdENvbm5lY3RlZFtfa2V5c1tSTkckMS5nZXRVbmlmb3JtSW50KDAsIF9rZXlzLmxlbmd0aCAtIDEpXV07XG4gICAgICAgICAgdG8gPSB0aGlzLl9nZXRDbG9zZXN0KGZyb20sIGNvbm5lY3RlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBkID0gKGZyb21bMF0gLSB0b1swXSkgKiAoZnJvbVswXSAtIHRvWzBdKSArIChmcm9tWzFdIC0gdG9bMV0pICogKGZyb21bMV0gLSB0b1sxXSk7XG5cbiAgICAgICAgaWYgKGQgPCA2NCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IC8vIGNvbnNvbGUubG9nKFwiPj4+IGNvbm5lY3RlZD1cIiArIHRvICsgXCIgbm90Q29ubmVjdGVkPVwiICsgZnJvbSArIFwiIGRpc3Q9XCIgKyBkKTtcblxuXG4gICAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX2dldENsb3Nlc3QgPSBmdW5jdGlvbiBfZ2V0Q2xvc2VzdChwb2ludCwgc3BhY2UpIHtcbiAgICAgIHZhciBtaW5Qb2ludCA9IG51bGw7XG4gICAgICB2YXIgbWluRGlzdCA9IG51bGw7XG5cbiAgICAgIGZvciAodmFyIGsgaW4gc3BhY2UpIHtcbiAgICAgICAgdmFyIHAgPSBzcGFjZVtrXTtcbiAgICAgICAgdmFyIGQgPSAocFswXSAtIHBvaW50WzBdKSAqIChwWzBdIC0gcG9pbnRbMF0pICsgKHBbMV0gLSBwb2ludFsxXSkgKiAocFsxXSAtIHBvaW50WzFdKTtcblxuICAgICAgICBpZiAobWluRGlzdCA9PSBudWxsIHx8IGQgPCBtaW5EaXN0KSB7XG4gICAgICAgICAgbWluRGlzdCA9IGQ7XG4gICAgICAgICAgbWluUG9pbnQgPSBwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtaW5Qb2ludDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjcuX2ZpbmRDb25uZWN0ZWQgPSBmdW5jdGlvbiBfZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgc3RhY2ssIGtlZXBOb3RDb25uZWN0ZWQsIHZhbHVlKSB7XG4gICAgICB3aGlsZSAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgcCA9IHN0YWNrLnNwbGljZSgwLCAxKVswXTtcbiAgICAgICAgdmFyIHRlc3RzID0gdm9pZCAwO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICB0ZXN0cyA9IFtbcFswXSArIDIsIHBbMV1dLCBbcFswXSArIDEsIHBbMV0gLSAxXSwgW3BbMF0gLSAxLCBwWzFdIC0gMV0sIFtwWzBdIC0gMiwgcFsxXV0sIFtwWzBdIC0gMSwgcFsxXSArIDFdLCBbcFswXSArIDEsIHBbMV0gKyAxXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVzdHMgPSBbW3BbMF0gKyAxLCBwWzFdXSwgW3BbMF0gLSAxLCBwWzFdXSwgW3BbMF0sIHBbMV0gKyAxXSwgW3BbMF0sIHBbMV0gLSAxXV07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IHRoaXMuX3BvaW50S2V5KHRlc3RzW2ldKTtcblxuICAgICAgICAgIGlmIChjb25uZWN0ZWRba2V5XSA9PSBudWxsICYmIHRoaXMuX2ZyZWVTcGFjZSh0ZXN0c1tpXVswXSwgdGVzdHNbaV1bMV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgY29ubmVjdGVkW2tleV0gPSB0ZXN0c1tpXTtcblxuICAgICAgICAgICAgaWYgKCFrZWVwTm90Q29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2sucHVzaCh0ZXN0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll90dW5uZWxUb0Nvbm5lY3RlZCA9IGZ1bmN0aW9uIF90dW5uZWxUb0Nvbm5lY3RlZCh0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgIHZhciBhLCBiO1xuXG4gICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgIGEgPSBmcm9tO1xuICAgICAgICBiID0gdG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhID0gdG87XG4gICAgICAgIGIgPSBmcm9tO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciB4eCA9IGFbMF07IHh4IDw9IGJbMF07IHh4KyspIHtcbiAgICAgICAgdGhpcy5fbWFwW3h4XVthWzFdXSA9IHZhbHVlO1xuICAgICAgICB2YXIgcCA9IFt4eCwgYVsxXV07XG5cbiAgICAgICAgdmFyIHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcblxuICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMF0gPCBiWzBdKSB7XG4gICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhhLCBbYlswXSwgYVsxXV0pO1xuICAgICAgfSAvLyB4IGlzIG5vdyBmaXhlZFxuXG5cbiAgICAgIHZhciB4ID0gYlswXTtcblxuICAgICAgaWYgKGZyb21bMV0gPCB0b1sxXSkge1xuICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgYiA9IHRvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IHRvO1xuICAgICAgICBiID0gZnJvbTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgeXkgPSBhWzFdOyB5eSA8IGJbMV07IHl5KyspIHtcbiAgICAgICAgdGhpcy5fbWFwW3hdW3l5XSA9IHZhbHVlO1xuICAgICAgICB2YXIgX3AyID0gW3gsIHl5XTtcblxuICAgICAgICB2YXIgX3BrZXkgPSB0aGlzLl9wb2ludEtleShfcDIpO1xuXG4gICAgICAgIGNvbm5lY3RlZFtfcGtleV0gPSBfcDI7XG4gICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbX3BrZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMV0gPCBiWzFdKSB7XG4gICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhbYlswXSwgYVsxXV0sIFtiWzBdLCBiWzFdXSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll90dW5uZWxUb0Nvbm5lY3RlZDYgPSBmdW5jdGlvbiBfdHVubmVsVG9Db25uZWN0ZWQ2KHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgdmFyIGEsIGI7XG5cbiAgICAgIGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcbiAgICAgICAgYSA9IGZyb207XG4gICAgICAgIGIgPSB0bztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSB0bztcbiAgICAgICAgYiA9IGZyb207XG4gICAgICB9IC8vIHR1bm5lbCBkaWFnb25hbGx5IHVudGlsIGhvcml6b250YWxseSBsZXZlbFxuXG5cbiAgICAgIHZhciB4eCA9IGFbMF07XG4gICAgICB2YXIgeXkgPSBhWzFdO1xuXG4gICAgICB3aGlsZSAoISh4eCA9PSBiWzBdICYmIHl5ID09IGJbMV0pKSB7XG4gICAgICAgIHZhciBzdGVwV2lkdGggPSAyO1xuXG4gICAgICAgIGlmICh5eSA8IGJbMV0pIHtcbiAgICAgICAgICB5eSsrO1xuICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoeXkgPiBiWzFdKSB7XG4gICAgICAgICAgeXktLTtcbiAgICAgICAgICBzdGVwV2lkdGggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHh4IDwgYlswXSkge1xuICAgICAgICAgIHh4ICs9IHN0ZXBXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmICh4eCA+IGJbMF0pIHtcbiAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoYlsxXSAlIDIpIHtcbiAgICAgICAgICAvLyBXb24ndCBzdGVwIG91dHNpZGUgbWFwIGlmIGRlc3RpbmF0aW9uIG9uIGlzIG1hcCdzIHJpZ2h0IGVkZ2VcbiAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGl0dG8gZm9yIGxlZnQgZWRnZVxuICAgICAgICAgIHh4ICs9IHN0ZXBXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21hcFt4eF1beXldID0gdmFsdWU7XG4gICAgICAgIHZhciBwID0gW3h4LCB5eV07XG5cbiAgICAgICAgdmFyIHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcblxuICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhmcm9tLCB0byk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll9mcmVlU3BhY2UgPSBmdW5jdGlvbiBfZnJlZVNwYWNlKHgsIHksIHZhbHVlKSB7XG4gICAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLl93aWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuX2hlaWdodCAmJiB0aGlzLl9tYXBbeF1beV0gPT0gdmFsdWU7XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll9wb2ludEtleSA9IGZ1bmN0aW9uIF9wb2ludEtleShwKSB7XG4gICAgICByZXR1cm4gcFswXSArIFwiLlwiICsgcFsxXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENlbGx1bGFyO1xuICB9KE1hcCk7XG5cbiAgdmFyIEZFQVRVUkVTID0ge1xuICAgIFwicm9vbVwiOiBSb29tLFxuICAgIFwiY29ycmlkb3JcIjogQ29ycmlkb3JcbiAgfTtcbiAgLyoqXG4gICAqIFJhbmRvbSBkdW5nZW9uIGdlbmVyYXRvciB1c2luZyBodW1hbi1saWtlIGRpZ2dpbmcgcGF0dGVybnMuXG4gICAqIEhlYXZpbHkgYmFzZWQgb24gTWlrZSBBbmRlcnNvbidzIGlkZWFzIGZyb20gdGhlIFwiVHlyYW50XCIgYWxnbywgbWVudGlvbmVkIGF0XG4gICAqIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPUR1bmdlb24tQnVpbGRpbmdfQWxnb3JpdGhtLlxuICAgKi9cblxuICB2YXIgRGlnZ2VyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0R1bmdlb24yKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRGlnZ2VyLCBfRHVuZ2VvbjIpO1xuXG4gICAgZnVuY3Rpb24gRGlnZ2VyKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczE1O1xuXG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxNSA9IF9EdW5nZW9uMi5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczE1Ll9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHJvb21XaWR0aDogWzMsIDldLFxuICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgIGNvcnJpZG9yTGVuZ3RoOiBbMywgMTBdLFxuICAgICAgICBkdWdQZXJjZW50YWdlOiAwLjIsXG4gICAgICAgIHRpbWVMaW1pdDogMTAwMFxuICAgICAgICAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG5cbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgX3RoaXMxNS5fZmVhdHVyZXMgPSB7XG4gICAgICAgIFwicm9vbVwiOiA0LFxuICAgICAgICBcImNvcnJpZG9yXCI6IDRcbiAgICAgIH07XG4gICAgICBfdGhpczE1Ll9tYXAgPSBbXTtcbiAgICAgIF90aGlzMTUuX2ZlYXR1cmVBdHRlbXB0cyA9IDIwO1xuICAgICAgLyogaG93IG1hbnkgdGltZXMgZG8gd2UgdHJ5IHRvIGNyZWF0ZSBhIGZlYXR1cmUgb24gYSBzdWl0YWJsZSB3YWxsICovXG5cbiAgICAgIF90aGlzMTUuX3dhbGxzID0ge307XG4gICAgICAvKiB0aGVzZSBhcmUgYXZhaWxhYmxlIGZvciBkaWdnaW5nICovXG5cbiAgICAgIF90aGlzMTUuX2R1ZyA9IDA7XG4gICAgICBfdGhpczE1Ll9kaWdDYWxsYmFjayA9IF90aGlzMTUuX2RpZ0NhbGxiYWNrLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMTUpKSk7XG4gICAgICBfdGhpczE1Ll9jYW5CZUR1Z0NhbGxiYWNrID0gX3RoaXMxNS5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczE1KSkpO1xuICAgICAgX3RoaXMxNS5faXNXYWxsQ2FsbGJhY2sgPSBfdGhpczE1Ll9pc1dhbGxDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczE1KSkpO1xuICAgICAgX3RoaXMxNS5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSBfdGhpczE1Ll9wcmlvcml0eVdhbGxDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczE1KSkpO1xuICAgICAgcmV0dXJuIF90aGlzMTU7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzI4ID0gRGlnZ2VyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI4LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgdmFyIGFyZWEgPSAodGhpcy5fd2lkdGggLSAyKSAqICh0aGlzLl9oZWlnaHQgLSAyKTtcblxuICAgICAgdGhpcy5fZmlyc3RSb29tKCk7XG5cbiAgICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgICB2YXIgcHJpb3JpdHlXYWxscztcblxuICAgICAgZG8ge1xuICAgICAgICBwcmlvcml0eVdhbGxzID0gMDtcbiAgICAgICAgdmFyIHQyID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAodDIgLSB0MSA+IHRoaXMuX29wdGlvbnMudGltZUxpbWl0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLyogZmluZCBhIGdvb2Qgd2FsbCAqL1xuXG5cbiAgICAgICAgdmFyIHdhbGwgPSB0aGlzLl9maW5kV2FsbCgpO1xuXG4gICAgICAgIGlmICghd2FsbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8qIG5vIG1vcmUgd2FsbHMgKi9cblxuXG4gICAgICAgIHZhciBwYXJ0cyA9IHdhbGwuc3BsaXQoXCIsXCIpO1xuICAgICAgICB2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgdmFyIHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG5cbiAgICAgICAgdmFyIGRpciA9IHRoaXMuX2dldERpZ2dpbmdEaXJlY3Rpb24oeCwgeSk7XG5cbiAgICAgICAgaWYgKCFkaXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiB0aGlzIHdhbGwgaXMgbm90IHN1aXRhYmxlICovXG4gICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwid2FsbFwiLCB4LCB5KTtcblxuICAgICAgICAvKiB0cnkgYWRkaW5nIGEgZmVhdHVyZSAqL1xuXG5cbiAgICAgICAgdmFyIGZlYXR1cmVBdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIGZlYXR1cmVBdHRlbXB0cysrO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3RyeUZlYXR1cmUoeCwgeSwgZGlyWzBdLCBkaXJbMV0pKSB7XG4gICAgICAgICAgICAvKiBmZWF0dXJlIGFkZGVkICovXG4gICAgICAgICAgICAvL2lmICh0aGlzLl9yb29tcy5sZW5ndGggKyB0aGlzLl9jb3JyaWRvcnMubGVuZ3RoID09IDIpIHsgdGhpcy5fcm9vbXNbMF0uYWRkRG9vcih4LCB5KTsgfSAvKiBmaXJzdCByb29tIG9maWNpYWxseSBoYXMgZG9vcnMgKi9cbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoeCwgeSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoeCAtIGRpclswXSwgeSAtIGRpclsxXSk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZmVhdHVyZUF0dGVtcHRzIDwgdGhpcy5fZmVhdHVyZUF0dGVtcHRzKTtcblxuICAgICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLl93YWxscykge1xuICAgICAgICAgIGlmICh0aGlzLl93YWxsc1tpZF0gPiAxKSB7XG4gICAgICAgICAgICBwcmlvcml0eVdhbGxzKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IHdoaWxlICh0aGlzLl9kdWcgLyBhcmVhIDwgdGhpcy5fb3B0aW9ucy5kdWdQZXJjZW50YWdlIHx8IHByaW9yaXR5V2FsbHMpO1xuICAgICAgLyogZml4bWUgbnVtYmVyIG9mIHByaW9yaXR5IHdhbGxzICovXG5cblxuICAgICAgdGhpcy5fYWRkRG9vcnMoKTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yOC5fZGlnQ2FsbGJhY2sgPSBmdW5jdGlvbiBfZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSAwIHx8IHZhbHVlID09IDIpIHtcbiAgICAgICAgLyogZW1wdHkgKi9cbiAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gMDtcbiAgICAgICAgdGhpcy5fZHVnKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiB3YWxsICovXG4gICAgICAgIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldID0gMTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX2lzV2FsbENhbGxiYWNrID0gZnVuY3Rpb24gX2lzV2FsbENhbGxiYWNrKHgsIHkpIHtcbiAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21hcFt4XVt5XSA9PSAxO1xuICAgIH07XG5cbiAgICBfcHJvdG8yOC5fY2FuQmVEdWdDYWxsYmFjayA9IGZ1bmN0aW9uIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbWFwW3hdW3ldID09IDE7XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9wcmlvcml0eVdhbGxDYWxsYmFjayA9IGZ1bmN0aW9uIF9wcmlvcml0eVdhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XSA9IDI7XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9maXJzdFJvb20gPSBmdW5jdGlvbiBfZmlyc3RSb29tKCkge1xuICAgICAgdmFyIGN4ID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIDIpO1xuICAgICAgdmFyIGN5ID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyAyKTtcbiAgICAgIHZhciByb29tID0gUm9vbS5jcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCB0aGlzLl9vcHRpb25zKTtcblxuICAgICAgdGhpcy5fcm9vbXMucHVzaChyb29tKTtcblxuICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGEgc3VpdGFibGUgd2FsbFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yOC5fZmluZFdhbGwgPSBmdW5jdGlvbiBfZmluZFdhbGwoKSB7XG4gICAgICB2YXIgcHJpbzEgPSBbXTtcbiAgICAgIHZhciBwcmlvMiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBfaWQyIGluIHRoaXMuX3dhbGxzKSB7XG4gICAgICAgIHZhciBwcmlvID0gdGhpcy5fd2FsbHNbX2lkMl07XG5cbiAgICAgICAgaWYgKHByaW8gPT0gMikge1xuICAgICAgICAgIHByaW8yLnB1c2goX2lkMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJpbzEucHVzaChfaWQyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgYXJyID0gcHJpbzIubGVuZ3RoID8gcHJpbzIgOiBwcmlvMTtcblxuICAgICAgaWYgKCFhcnIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgLyogbm8gd2FsbHMgOi8gKi9cblxuXG4gICAgICB2YXIgaWQgPSBSTkckMS5nZXRJdGVtKGFyci5zb3J0KCkpOyAvLyBzb3J0IHRvIG1ha2UgdGhlIG9yZGVyIGRldGVybWluaXN0aWNcblxuICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW2lkXTtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyaWVzIGFkZGluZyBhIGZlYXR1cmVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gd2FzIHRoaXMgYSBzdWNjZXNzZnVsIHRyeT9cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjguX3RyeUZlYXR1cmUgPSBmdW5jdGlvbiBfdHJ5RmVhdHVyZSh4LCB5LCBkeCwgZHkpIHtcbiAgICAgIHZhciBmZWF0dXJlTmFtZSA9IFJORyQxLmdldFdlaWdodGVkVmFsdWUodGhpcy5fZmVhdHVyZXMpO1xuICAgICAgdmFyIGN0b3IgPSBGRUFUVVJFU1tmZWF0dXJlTmFtZV07XG4gICAgICB2YXIgZmVhdHVyZSA9IGN0b3IuY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCB0aGlzLl9vcHRpb25zKTtcblxuICAgICAgaWYgKCFmZWF0dXJlLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7XG4gICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuICAgICAgICAvL1x0XHRmZWF0dXJlLmRlYnVnKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZmVhdHVyZS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spOyAvL1x0ZmVhdHVyZS5kZWJ1ZygpO1xuXG4gICAgICBpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIFJvb20pIHtcbiAgICAgICAgdGhpcy5fcm9vbXMucHVzaChmZWF0dXJlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBDb3JyaWRvcikge1xuICAgICAgICBmZWF0dXJlLmNyZWF0ZVByaW9yaXR5V2FsbHModGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2spO1xuXG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycy5wdXNoKGZlYXR1cmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMgPSBmdW5jdGlvbiBfcmVtb3ZlU3Vycm91bmRpbmdXYWxscyhjeCwgY3kpIHtcbiAgICAgIHZhciBkZWx0YXMgPSBESVJTWzRdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVsdGEgPSBkZWx0YXNbaV07XG4gICAgICAgIHZhciB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgdmFyIHkgPSBjeSArIGRlbHRhWzFdO1xuICAgICAgICBkZWxldGUgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV07XG4gICAgICAgIHggPSBjeCArIDIgKiBkZWx0YVswXTtcbiAgICAgICAgeSA9IGN5ICsgMiAqIGRlbHRhWzFdO1xuICAgICAgICBkZWxldGUgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV07XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHZlY3RvciBpbiBcImRpZ2dpbmdcIiBkaXJlY3Rpb24sIG9yIGZhbHNlLCBpZiB0aGlzIGRvZXMgbm90IGV4aXN0IChvciBpcyBub3QgdW5pcXVlKVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yOC5fZ2V0RGlnZ2luZ0RpcmVjdGlvbiA9IGZ1bmN0aW9uIF9nZXREaWdnaW5nRGlyZWN0aW9uKGN4LCBjeSkge1xuICAgICAgaWYgKGN4IDw9IDAgfHwgY3kgPD0gMCB8fCBjeCA+PSB0aGlzLl93aWR0aCAtIDEgfHwgY3kgPj0gdGhpcy5faGVpZ2h0IC0gMSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICB2YXIgZGVsdGFzID0gRElSU1s0XTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICB2YXIgeCA9IGN4ICsgZGVsdGFbMF07XG4gICAgICAgIHZhciB5ID0gY3kgKyBkZWx0YVsxXTtcblxuICAgICAgICBpZiAoIXRoaXMuX21hcFt4XVt5XSkge1xuICAgICAgICAgIC8qIHRoZXJlIGFscmVhZHkgaXMgYW5vdGhlciBlbXB0eSBuZWlnaGJvciEgKi9cbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXN1bHQgPSBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLyogbm8gZW1wdHkgbmVpZ2hib3IgKi9cblxuXG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFstcmVzdWx0WzBdLCAtcmVzdWx0WzFdXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZpbmQgZW1wdHkgc3BhY2VzIHN1cnJvdW5kaW5nIHJvb21zLCBhbmQgYXBwbHkgZG9vcnMuXG4gICAgICovXG5cblxuICAgIF9wcm90bzI4Ll9hZGREb29ycyA9IGZ1bmN0aW9uIF9hZGREb29ycygpIHtcbiAgICAgIHZhciBkYXRhID0gdGhpcy5fbWFwO1xuXG4gICAgICBmdW5jdGlvbiBpc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIHJldHVybiBkYXRhW3hdW3ldID09IDE7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvb20gPSB0aGlzLl9yb29tc1tpXTtcbiAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgIHJvb20uYWRkRG9vcnMoaXNXYWxsQ2FsbGJhY2spO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRGlnZ2VyO1xuICB9KER1bmdlb24pO1xuICAvKipcbiAgICogSm9pbiBsaXN0cyB3aXRoIFwiaVwiIGFuZCBcImkrMVwiXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gYWRkVG9MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaSArIDFdXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaSArIDFdO1xuICAgIFJbaV0gPSBpICsgMTtcbiAgICBMW2kgKyAxXSA9IGk7XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBcImlcIiBmcm9tIGl0cyBsaXN0XG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUikge1xuICAgIFJbTFtpXV0gPSBSW2ldO1xuICAgIExbUltpXV0gPSBMW2ldO1xuICAgIFJbaV0gPSBpO1xuICAgIExbaV0gPSBpO1xuICB9XG4gIC8qKlxuICAgKiBNYXplIGdlbmVyYXRvciAtIEVsbGVyJ3MgYWxnb3JpdGhtXG4gICAqIFNlZSBodHRwOi8vaG9tZXBhZ2VzLmN3aS5ubC9+dHJvbXAvbWF6ZS5odG1sIGZvciBleHBsYW5hdGlvblxuICAgKi9cblxuXG4gIHZhciBFbGxlck1hemUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwNCkge1xuICAgIF9pbmhlcml0c0xvb3NlKEVsbGVyTWF6ZSwgX01hcDQpO1xuXG4gICAgZnVuY3Rpb24gRWxsZXJNYXplKCkge1xuICAgICAgcmV0dXJuIF9NYXA0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMjkgPSBFbGxlck1hemUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjkuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcblxuICAgICAgdmFyIHcgPSBNYXRoLmNlaWwoKHRoaXMuX3dpZHRoIC0gMikgLyAyKTtcbiAgICAgIHZhciByYW5kID0gOSAvIDI0O1xuICAgICAgdmFyIEwgPSBbXTtcbiAgICAgIHZhciBSID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgIEwucHVzaChpKTtcbiAgICAgICAgUi5wdXNoKGkpO1xuICAgICAgfVxuXG4gICAgICBMLnB1c2godyAtIDEpO1xuICAgICAgLyogZmFrZSBzdG9wLWJsb2NrIGF0IHRoZSByaWdodCBzaWRlICovXG5cbiAgICAgIHZhciBqO1xuXG4gICAgICBmb3IgKGogPSAxOyBqICsgMyA8IHRoaXMuX2hlaWdodDsgaiArPSAyKSB7XG4gICAgICAgIC8qIG9uZSByb3cgKi9cbiAgICAgICAgZm9yICh2YXIgX2k1ID0gMDsgX2k1IDwgdzsgX2k1KyspIHtcbiAgICAgICAgICAvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXG4gICAgICAgICAgdmFyIHggPSAyICogX2k1ICsgMTtcbiAgICAgICAgICB2YXIgeSA9IGo7XG4gICAgICAgICAgbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG5cbiAgICAgICAgICBpZiAoX2k1ICE9IExbX2k1ICsgMV0gJiYgUk5HJDEuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xuICAgICAgICAgICAgYWRkVG9MaXN0KF9pNSwgTCwgUik7XG4gICAgICAgICAgICBtYXBbeCArIDFdW3ldID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogYm90dG9tIGNvbm5lY3Rpb24gKi9cblxuXG4gICAgICAgICAgaWYgKF9pNSAhPSBMW19pNV0gJiYgUk5HJDEuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xuICAgICAgICAgICAgLyogcmVtb3ZlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgIHJlbW92ZUZyb21MaXN0KF9pNSwgTCwgUik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIGNyZWF0ZSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICBtYXBbeF1beSArIDFdID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIGxhc3Qgcm93ICovXG5cblxuICAgICAgZm9yICh2YXIgX2k2ID0gMDsgX2k2IDwgdzsgX2k2KyspIHtcbiAgICAgICAgLyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xuICAgICAgICB2YXIgX3gyID0gMiAqIF9pNiArIDE7XG5cbiAgICAgICAgdmFyIF95MiA9IGo7XG4gICAgICAgIG1hcFtfeDJdW195Ml0gPSAwO1xuICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG5cbiAgICAgICAgaWYgKF9pNiAhPSBMW19pNiArIDFdICYmIChfaTYgPT0gTFtfaTZdIHx8IFJORyQxLmdldFVuaWZvcm0oKSA+IHJhbmQpKSB7XG4gICAgICAgICAgLyogZGlnIHJpZ2h0IGFsc28gaWYgdGhlIGNlbGwgaXMgc2VwYXJhdGVkLCBzbyBpdCBnZXRzIGNvbm5lY3RlZCB0byB0aGUgcmVzdCBvZiBtYXplICovXG4gICAgICAgICAgYWRkVG9MaXN0KF9pNiwgTCwgUik7XG4gICAgICAgICAgbWFwW194MiArIDFdW195Ml0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlRnJvbUxpc3QoX2k2LCBMLCBSKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2k3ID0gMDsgX2k3IDwgdGhpcy5fd2lkdGg7IF9pNysrKSB7XG4gICAgICAgIGZvciAodmFyIF9qID0gMDsgX2ogPCB0aGlzLl9oZWlnaHQ7IF9qKyspIHtcbiAgICAgICAgICBjYWxsYmFjayhfaTcsIF9qLCBtYXBbX2k3XVtfal0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gRWxsZXJNYXplO1xuICB9KE1hcCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgUmVjdXJzaXZlbHkgZGl2aWRlZCBtYXplLCBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01hemVfZ2VuZXJhdGlvbl9hbGdvcml0aG0jUmVjdXJzaXZlX2RpdmlzaW9uX21ldGhvZFxuICAgKiBAYXVnbWVudHMgUk9ULk1hcFxuICAgKi9cblxuXG4gIHZhciBEaXZpZGVkTWF6ZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXA1KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRGl2aWRlZE1hemUsIF9NYXA1KTtcblxuICAgIGZ1bmN0aW9uIERpdmlkZWRNYXplKCkge1xuICAgICAgdmFyIF90aGlzMTY7XG5cbiAgICAgIF90aGlzMTYgPSBfTWFwNS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICBfdGhpczE2Ll9zdGFjayA9IFtdO1xuICAgICAgX3RoaXMxNi5fbWFwID0gW107XG4gICAgICByZXR1cm4gX3RoaXMxNjtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMzAgPSBEaXZpZGVkTWF6ZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zMC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciB3ID0gdGhpcy5fd2lkdGg7XG4gICAgICB2YXIgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgIHRoaXMuX21hcCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICB0aGlzLl9tYXAucHVzaChbXSk7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoOyBqKyspIHtcbiAgICAgICAgICB2YXIgYm9yZGVyID0gaSA9PSAwIHx8IGogPT0gMCB8fCBpICsgMSA9PSB3IHx8IGogKyAxID09IGg7XG5cbiAgICAgICAgICB0aGlzLl9tYXBbaV0ucHVzaChib3JkZXIgPyAxIDogMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RhY2sgPSBbWzEsIDEsIHcgLSAyLCBoIC0gMl1dO1xuXG4gICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cbiAgICAgIGZvciAodmFyIF9pOCA9IDA7IF9pOCA8IHc7IF9pOCsrKSB7XG4gICAgICAgIGZvciAodmFyIF9qMiA9IDA7IF9qMiA8IGg7IF9qMisrKSB7XG4gICAgICAgICAgY2FsbGJhY2soX2k4LCBfajIsIHRoaXMuX21hcFtfaThdW19qMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzMwLl9wcm9jZXNzID0gZnVuY3Rpb24gX3Byb2Nlc3MoKSB7XG4gICAgICB3aGlsZSAodGhpcy5fc3RhY2subGVuZ3RoKSB7XG4gICAgICAgIHZhciByb29tID0gdGhpcy5fc3RhY2suc2hpZnQoKTtcbiAgICAgICAgLyogW2xlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbV0gKi9cblxuXG4gICAgICAgIHRoaXMuX3BhcnRpdGlvblJvb20ocm9vbSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMwLl9wYXJ0aXRpb25Sb29tID0gZnVuY3Rpb24gX3BhcnRpdGlvblJvb20ocm9vbSkge1xuICAgICAgdmFyIGF2YWlsWCA9IFtdO1xuICAgICAgdmFyIGF2YWlsWSA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gcm9vbVswXSArIDE7IGkgPCByb29tWzJdOyBpKyspIHtcbiAgICAgICAgdmFyIHRvcCA9IHRoaXMuX21hcFtpXVtyb29tWzFdIC0gMV07XG4gICAgICAgIHZhciBib3R0b20gPSB0aGlzLl9tYXBbaV1bcm9vbVszXSArIDFdO1xuXG4gICAgICAgIGlmICh0b3AgJiYgYm90dG9tICYmICEoaSAlIDIpKSB7XG4gICAgICAgICAgYXZhaWxYLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaiA9IHJvb21bMV0gKyAxOyBqIDwgcm9vbVszXTsgaisrKSB7XG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5fbWFwW3Jvb21bMF0gLSAxXVtqXTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5fbWFwW3Jvb21bMl0gKyAxXVtqXTtcblxuICAgICAgICBpZiAobGVmdCAmJiByaWdodCAmJiAhKGogJSAyKSkge1xuICAgICAgICAgIGF2YWlsWS5wdXNoKGopO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYXZhaWxYLmxlbmd0aCB8fCAhYXZhaWxZLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB4ID0gUk5HJDEuZ2V0SXRlbShhdmFpbFgpO1xuICAgICAgdmFyIHkgPSBSTkckMS5nZXRJdGVtKGF2YWlsWSk7XG4gICAgICB0aGlzLl9tYXBbeF1beV0gPSAxO1xuICAgICAgdmFyIHdhbGxzID0gW107XG4gICAgICB2YXIgdyA9IFtdO1xuICAgICAgd2FsbHMucHVzaCh3KTtcbiAgICAgIC8qIGxlZnQgcGFydCAqL1xuXG4gICAgICBmb3IgKHZhciBfaTkgPSByb29tWzBdOyBfaTkgPCB4OyBfaTkrKykge1xuICAgICAgICB0aGlzLl9tYXBbX2k5XVt5XSA9IDE7XG4gICAgICAgIGlmIChfaTkgJSAyKSB3LnB1c2goW19pOSwgeV0pO1xuICAgICAgfVxuXG4gICAgICB3ID0gW107XG4gICAgICB3YWxscy5wdXNoKHcpO1xuICAgICAgLyogcmlnaHQgcGFydCAqL1xuXG4gICAgICBmb3IgKHZhciBfaTEwID0geCArIDE7IF9pMTAgPD0gcm9vbVsyXTsgX2kxMCsrKSB7XG4gICAgICAgIHRoaXMuX21hcFtfaTEwXVt5XSA9IDE7XG4gICAgICAgIGlmIChfaTEwICUgMikgdy5wdXNoKFtfaTEwLCB5XSk7XG4gICAgICB9XG5cbiAgICAgIHcgPSBbXTtcbiAgICAgIHdhbGxzLnB1c2godyk7XG4gICAgICAvKiB0b3AgcGFydCAqL1xuXG4gICAgICBmb3IgKHZhciBfajMgPSByb29tWzFdOyBfajMgPCB5OyBfajMrKykge1xuICAgICAgICB0aGlzLl9tYXBbeF1bX2ozXSA9IDE7XG4gICAgICAgIGlmIChfajMgJSAyKSB3LnB1c2goW3gsIF9qM10pO1xuICAgICAgfVxuXG4gICAgICB3ID0gW107XG4gICAgICB3YWxscy5wdXNoKHcpO1xuICAgICAgLyogYm90dG9tIHBhcnQgKi9cblxuICAgICAgZm9yICh2YXIgX2o0ID0geSArIDE7IF9qNCA8PSByb29tWzNdOyBfajQrKykge1xuICAgICAgICB0aGlzLl9tYXBbeF1bX2o0XSA9IDE7XG4gICAgICAgIGlmIChfajQgJSAyKSB3LnB1c2goW3gsIF9qNF0pO1xuICAgICAgfVxuXG4gICAgICB2YXIgc29saWQgPSBSTkckMS5nZXRJdGVtKHdhbGxzKTtcblxuICAgICAgZm9yICh2YXIgX2kxMSA9IDA7IF9pMTEgPCB3YWxscy5sZW5ndGg7IF9pMTErKykge1xuICAgICAgICB2YXIgX3cgPSB3YWxsc1tfaTExXTtcblxuICAgICAgICBpZiAoX3cgPT0gc29saWQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBob2xlID0gUk5HJDEuZ2V0SXRlbShfdyk7XG4gICAgICAgIHRoaXMuX21hcFtob2xlWzBdXVtob2xlWzFdXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHJvb21bMV0sIHggLSAxLCB5IC0gMV0pO1xuICAgICAgLyogbGVmdCB0b3AgKi9cblxuXG4gICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgcm9vbVsxXSwgcm9vbVsyXSwgeSAtIDFdKTtcbiAgICAgIC8qIHJpZ2h0IHRvcCAqL1xuXG5cbiAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHkgKyAxLCB4IC0gMSwgcm9vbVszXV0pO1xuICAgICAgLyogbGVmdCBib3R0b20gKi9cblxuXG4gICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgeSArIDEsIHJvb21bMl0sIHJvb21bM11dKTtcbiAgICAgIC8qIHJpZ2h0IGJvdHRvbSAqL1xuXG4gICAgfTtcblxuICAgIHJldHVybiBEaXZpZGVkTWF6ZTtcbiAgfShNYXApO1xuICAvKipcbiAgICogSWNleSdzIE1hemUgZ2VuZXJhdG9yXG4gICAqIFNlZSBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1TaW1wbGVfbWF6ZSBmb3IgZXhwbGFuYXRpb25cbiAgICovXG5cblxuICB2YXIgSWNleU1hemUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwNikge1xuICAgIF9pbmhlcml0c0xvb3NlKEljZXlNYXplLCBfTWFwNik7XG5cbiAgICBmdW5jdGlvbiBJY2V5TWF6ZSh3aWR0aCwgaGVpZ2h0LCByZWd1bGFyaXR5KSB7XG4gICAgICB2YXIgX3RoaXMxNztcblxuICAgICAgaWYgKHJlZ3VsYXJpdHkgPT09IHZvaWQgMCkge1xuICAgICAgICByZWd1bGFyaXR5ID0gMDtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxNyA9IF9NYXA2LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTcuX3JlZ3VsYXJpdHkgPSByZWd1bGFyaXR5O1xuICAgICAgX3RoaXMxNy5fbWFwID0gW107XG4gICAgICByZXR1cm4gX3RoaXMxNztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMzEgPSBJY2V5TWF6ZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zMS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciB3aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgdmFyIGhlaWdodCA9IHRoaXMuX2hlaWdodDtcblxuICAgICAgdmFyIG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG5cbiAgICAgIHdpZHRoIC09IHdpZHRoICUgMiA/IDEgOiAyO1xuICAgICAgaGVpZ2h0IC09IGhlaWdodCAlIDIgPyAxIDogMjtcbiAgICAgIHZhciBjeCA9IDA7XG4gICAgICB2YXIgY3kgPSAwO1xuICAgICAgdmFyIG54ID0gMDtcbiAgICAgIHZhciBueSA9IDA7XG4gICAgICB2YXIgZG9uZSA9IDA7XG4gICAgICB2YXIgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgdmFyIGRpcnMgPSBbWzAsIDBdLCBbMCwgMF0sIFswLCAwXSwgWzAsIDBdXTtcblxuICAgICAgZG8ge1xuICAgICAgICBjeCA9IDEgKyAyICogTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiAod2lkdGggLSAxKSAvIDIpO1xuICAgICAgICBjeSA9IDEgKyAyICogTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiAoaGVpZ2h0IC0gMSkgLyAyKTtcblxuICAgICAgICBpZiAoIWRvbmUpIHtcbiAgICAgICAgICBtYXBbY3hdW2N5XSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1hcFtjeF1bY3ldKSB7XG4gICAgICAgICAgdGhpcy5fcmFuZG9taXplKGRpcnMpO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogKHRoaXMuX3JlZ3VsYXJpdHkgKyAxKSkgPT0gMCkge1xuICAgICAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICBueCA9IGN4ICsgZGlyc1tpXVswXSAqIDI7XG4gICAgICAgICAgICAgIG55ID0gY3kgKyBkaXJzW2ldWzFdICogMjtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmVlKG1hcCwgbngsIG55LCB3aWR0aCwgaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgIG1hcFtueF1bbnldID0gMDtcbiAgICAgICAgICAgICAgICBtYXBbY3ggKyBkaXJzW2ldWzBdXVtjeSArIGRpcnNbaV1bMV1dID0gMDtcbiAgICAgICAgICAgICAgICBjeCA9IG54O1xuICAgICAgICAgICAgICAgIGN5ID0gbnk7XG4gICAgICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKCFibG9ja2VkKTtcbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAoZG9uZSArIDEgPCB3aWR0aCAqIGhlaWdodCAvIDQpO1xuXG4gICAgICBmb3IgKHZhciBfaTEyID0gMDsgX2kxMiA8IHRoaXMuX3dpZHRoOyBfaTEyKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgIGNhbGxiYWNrKF9pMTIsIGosIG1hcFtfaTEyXVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMzEuX3JhbmRvbWl6ZSA9IGZ1bmN0aW9uIF9yYW5kb21pemUoZGlycykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgZGlyc1tpXVswXSA9IDA7XG4gICAgICAgIGRpcnNbaV1bMV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogNCkpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGRpcnNbMF1bMF0gPSAtMTtcbiAgICAgICAgICBkaXJzWzFdWzBdID0gMTtcbiAgICAgICAgICBkaXJzWzJdWzFdID0gLTE7XG4gICAgICAgICAgZGlyc1szXVsxXSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGRpcnNbM11bMF0gPSAtMTtcbiAgICAgICAgICBkaXJzWzJdWzBdID0gMTtcbiAgICAgICAgICBkaXJzWzFdWzFdID0gLTE7XG4gICAgICAgICAgZGlyc1swXVsxXSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGRpcnNbMl1bMF0gPSAtMTtcbiAgICAgICAgICBkaXJzWzNdWzBdID0gMTtcbiAgICAgICAgICBkaXJzWzBdWzFdID0gLTE7XG4gICAgICAgICAgZGlyc1sxXVsxXSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGRpcnNbMV1bMF0gPSAtMTtcbiAgICAgICAgICBkaXJzWzBdWzBdID0gMTtcbiAgICAgICAgICBkaXJzWzNdWzFdID0gLTE7XG4gICAgICAgICAgZGlyc1syXVsxXSA9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMxLl9pc0ZyZWUgPSBmdW5jdGlvbiBfaXNGcmVlKG1hcCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggPj0gd2lkdGggfHwgeSA+PSBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFwW3hdW3ldO1xuICAgIH07XG5cbiAgICByZXR1cm4gSWNleU1hemU7XG4gIH0oTWFwKTtcbiAgLyoqXG4gICAqIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHVzZXMgdGhlIFwib3JnaW5hbFwiIFJvZ3VlIGR1bmdlb24gZ2VuZXJhdGlvbiBhbGdvcml0aG0uIFNlZSBodHRwOi8va3VvaS5jb20vfmthbWlrYXplL0dhbWVEZXNpZ24vYXJ0MDdfcm9ndWVfZHVuZ2Vvbi5waHBcbiAgICogQGF1dGhvciBoeWFrdWdlaVxuICAgKi9cblxuXG4gIHZhciBSb2d1ZSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9NYXA3KSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUm9ndWUsIF9NYXA3KTtcblxuICAgIGZ1bmN0aW9uIFJvZ3VlKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczE4O1xuXG4gICAgICBfdGhpczE4ID0gX01hcDcuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxOC5tYXAgPSBbXTtcbiAgICAgIF90aGlzMTgucm9vbXMgPSBbXTtcbiAgICAgIF90aGlzMTguY29ubmVjdGVkQ2VsbHMgPSBbXTtcbiAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2VsbFdpZHRoOiAzLFxuICAgICAgICBjZWxsSGVpZ2h0OiAzIC8vICAgICBpZS4gYXMgYW4gYXJyYXkgd2l0aCBtaW4tbWF4IHZhbHVlcyBmb3IgZWFjaCBkaXJlY3Rpb24uLi4uXG5cbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgLypcbiAgICAgIFNldCB0aGUgcm9vbSBzaXplcyBhY2NvcmRpbmcgdG8gdGhlIG92ZXItYWxsIHdpZHRoIG9mIHRoZSBtYXAsXG4gICAgICBhbmQgdGhlIGNlbGwgc2l6ZXMuXG4gICAgICAqL1xuXG4gICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tV2lkdGhcIikpIHtcbiAgICAgICAgb3B0aW9uc1tcInJvb21XaWR0aFwiXSA9IF90aGlzMTguX2NhbGN1bGF0ZVJvb21TaXplKF90aGlzMTguX3dpZHRoLCBvcHRpb25zW1wiY2VsbFdpZHRoXCJdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbUhlaWdodFwiKSkge1xuICAgICAgICBvcHRpb25zW1wicm9vbUhlaWdodFwiXSA9IF90aGlzMTguX2NhbGN1bGF0ZVJvb21TaXplKF90aGlzMTguX2hlaWdodCwgb3B0aW9uc1tcImNlbGxIZWlnaHRcIl0pO1xuICAgICAgfVxuXG4gICAgICBfdGhpczE4Ll9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIHJldHVybiBfdGhpczE4O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8zMiA9IFJvZ3VlLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzMyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdGhpcy5tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgdGhpcy5yb29tcyA9IFtdO1xuICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFtdO1xuXG4gICAgICB0aGlzLl9pbml0Um9vbXMoKTtcblxuICAgICAgdGhpcy5fY29ubmVjdFJvb21zKCk7XG5cbiAgICAgIHRoaXMuX2Nvbm5lY3RVbmNvbm5lY3RlZFJvb21zKCk7XG5cbiAgICAgIHRoaXMuX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucygpO1xuXG4gICAgICB0aGlzLl9jcmVhdGVSb29tcygpO1xuXG4gICAgICB0aGlzLl9jcmVhdGVDb3JyaWRvcnMoKTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMubWFwW2ldW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jYWxjdWxhdGVSb29tU2l6ZSA9IGZ1bmN0aW9uIF9jYWxjdWxhdGVSb29tU2l6ZShzaXplLCBjZWxsKSB7XG4gICAgICB2YXIgbWF4ID0gTWF0aC5mbG9vcihzaXplIC8gY2VsbCAqIDAuOCk7XG4gICAgICB2YXIgbWluID0gTWF0aC5mbG9vcihzaXplIC8gY2VsbCAqIDAuMjUpO1xuXG4gICAgICBpZiAobWluIDwgMikge1xuICAgICAgICBtaW4gPSAyO1xuICAgICAgfVxuXG4gICAgICBpZiAobWF4IDwgMikge1xuICAgICAgICBtYXggPSAyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW21pbiwgbWF4XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2luaXRSb29tcyA9IGZ1bmN0aW9uIF9pbml0Um9vbXMoKSB7XG4gICAgICAvLyBjcmVhdGUgcm9vbXMgYXJyYXkuIFRoaXMgaXMgdGhlIFwiZ3JpZFwiIGxpc3QgZnJvbSB0aGUgYWxnby5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICB0aGlzLnJvb21zLnB1c2goW10pO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICB0aGlzLnJvb21zW2ldLnB1c2goe1xuICAgICAgICAgICAgXCJ4XCI6IDAsXG4gICAgICAgICAgICBcInlcIjogMCxcbiAgICAgICAgICAgIFwid2lkdGhcIjogMCxcbiAgICAgICAgICAgIFwiaGVpZ2h0XCI6IDAsXG4gICAgICAgICAgICBcImNvbm5lY3Rpb25zXCI6IFtdLFxuICAgICAgICAgICAgXCJjZWxseFwiOiBpLFxuICAgICAgICAgICAgXCJjZWxseVwiOiBqXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2Nvbm5lY3RSb29tcyA9IGZ1bmN0aW9uIF9jb25uZWN0Um9vbXMoKSB7XG4gICAgICAvL3BpY2sgcmFuZG9tIHN0YXJ0aW5nIGdyaWRcbiAgICAgIHZhciBjZ3ggPSBSTkckMS5nZXRVbmlmb3JtSW50KDAsIHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoIC0gMSk7XG4gICAgICB2YXIgY2d5ID0gUk5HJDEuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQgLSAxKTtcbiAgICAgIHZhciBpZHg7XG4gICAgICB2YXIgbmNneDtcbiAgICAgIHZhciBuY2d5O1xuICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICB2YXIgcm9vbTtcbiAgICAgIHZhciBvdGhlclJvb207XG4gICAgICB2YXIgZGlyVG9DaGVjazsgLy8gZmluZCAgdW5jb25uZWN0ZWQgbmVpZ2hib3VyIGNlbGxzXG5cbiAgICAgIGRvIHtcbiAgICAgICAgLy9kaXJUb0NoZWNrID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xuICAgICAgICBkaXJUb0NoZWNrID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICBkaXJUb0NoZWNrID0gUk5HJDEuc2h1ZmZsZShkaXJUb0NoZWNrKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBpZHggPSBkaXJUb0NoZWNrLnBvcCgpO1xuICAgICAgICAgIG5jZ3ggPSBjZ3ggKyBESVJTWzhdW2lkeF1bMF07XG4gICAgICAgICAgbmNneSA9IGNneSArIERJUlNbOF1baWR4XVsxXTtcblxuICAgICAgICAgIGlmIChuY2d4IDwgMCB8fCBuY2d4ID49IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmNneSA8IDAgfHwgbmNneSA+PSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2NneF1bY2d5XTtcblxuICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gYXMgbG9uZyBhcyB0aGlzIHJvb20gZG9lc24ndCBhbHJlYWR5IGNvb25lY3QgdG8gbWUsIHdlIGFyZSBvayB3aXRoIGl0LlxuICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVswXSA9PSBuY2d4ICYmIHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVsxXSA9PSBuY2d5KSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbbmNneF1bbmNneV07XG5cbiAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW2NneCwgY2d5XSk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzLnB1c2goW25jZ3gsIG5jZ3ldKTtcbiAgICAgICAgICAgIGNneCA9IG5jZ3g7XG4gICAgICAgICAgICBjZ3kgPSBuY2d5O1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZGlyVG9DaGVjay5sZW5ndGggPiAwICYmIGZvdW5kID09IGZhbHNlKTtcbiAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCk7XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jb25uZWN0VW5jb25uZWN0ZWRSb29tcyA9IGZ1bmN0aW9uIF9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpIHtcbiAgICAgIC8vV2hpbGUgdGhlcmUgYXJlIHVuY29ubmVjdGVkIHJvb21zLCB0cnkgdG8gY29ubmVjdCB0aGVtIHRvIGEgcmFuZG9tIGNvbm5lY3RlZCBuZWlnaGJvclxuICAgICAgLy8oaWYgYSByb29tIGhhcyBubyBjb25uZWN0ZWQgbmVpZ2hib3JzIHlldCwganVzdCBrZWVwIGN5Y2xpbmcsIHlvdSdsbCBmaWxsIG91dCB0byBpdCBldmVudHVhbGx5KS5cbiAgICAgIHZhciBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgdmFyIGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFJORyQxLnNodWZmbGUodGhpcy5jb25uZWN0ZWRDZWxscyk7XG4gICAgICB2YXIgcm9vbTtcbiAgICAgIHZhciBvdGhlclJvb207XG4gICAgICB2YXIgdmFsaWRSb29tO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7IGorKykge1xuICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuXG4gICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbnMgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgICAgICBkaXJlY3Rpb25zID0gUk5HJDEuc2h1ZmZsZShkaXJlY3Rpb25zKTtcbiAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHZhciBkaXJJZHggPSBkaXJlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgICAgICB2YXIgbmV3SSA9IGkgKyBESVJTWzhdW2RpcklkeF1bMF07XG4gICAgICAgICAgICAgIHZhciBuZXdKID0gaiArIERJUlNbOF1bZGlySWR4XVsxXTtcblxuICAgICAgICAgICAgICBpZiAobmV3SSA8IDAgfHwgbmV3SSA+PSBjdyB8fCBuZXdKIDwgMCB8fCBuZXdKID49IGNoKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW25ld0ldW25ld0pdO1xuICAgICAgICAgICAgICB2YWxpZFJvb20gPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVswXSA9PSBpICYmIG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdWzFdID09IGopIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChkaXJlY3Rpb25zLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmICh2YWxpZFJvb20pIHtcbiAgICAgICAgICAgICAgcm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW290aGVyUm9vbVtcImNlbGx4XCJdLCBvdGhlclJvb21bXCJjZWxseVwiXV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLSBVbmFibGUgdG8gY29ubmVjdCByb29tLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucyA9IGZ1bmN0aW9uIF9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKSB7Ly8gRW1wdHkgZm9yIG5vdy5cbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2NyZWF0ZVJvb21zID0gZnVuY3Rpb24gX2NyZWF0ZVJvb21zKCkge1xuICAgICAgdmFyIHcgPSB0aGlzLl93aWR0aDtcbiAgICAgIHZhciBoID0gdGhpcy5faGVpZ2h0O1xuICAgICAgdmFyIGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICB2YXIgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICB2YXIgY3dwID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIGN3KTtcbiAgICAgIHZhciBjaHAgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIGNoKTtcbiAgICAgIHZhciByb29tdztcbiAgICAgIHZhciByb29taDtcbiAgICAgIHZhciByb29tV2lkdGggPSB0aGlzLl9vcHRpb25zW1wicm9vbVdpZHRoXCJdO1xuICAgICAgdmFyIHJvb21IZWlnaHQgPSB0aGlzLl9vcHRpb25zW1wicm9vbUhlaWdodFwiXTtcbiAgICAgIHZhciBzeDtcbiAgICAgIHZhciBzeTtcbiAgICAgIHZhciBvdGhlclJvb207XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3c7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoOyBqKyspIHtcbiAgICAgICAgICBzeCA9IGN3cCAqIGk7XG4gICAgICAgICAgc3kgPSBjaHAgKiBqO1xuXG4gICAgICAgICAgaWYgKHN4ID09IDApIHtcbiAgICAgICAgICAgIHN4ID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3kgPT0gMCkge1xuICAgICAgICAgICAgc3kgPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvb213ID0gUk5HJDEuZ2V0VW5pZm9ybUludChyb29tV2lkdGhbMF0sIHJvb21XaWR0aFsxXSk7XG4gICAgICAgICAgcm9vbWggPSBSTkckMS5nZXRVbmlmb3JtSW50KHJvb21IZWlnaHRbMF0sIHJvb21IZWlnaHRbMV0pO1xuXG4gICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2ldW2ogLSAxXTtcblxuICAgICAgICAgICAgd2hpbGUgKHN5IC0gKG90aGVyUm9vbVtcInlcIl0gKyBvdGhlclJvb21bXCJoZWlnaHRcIl0pIDwgMykge1xuICAgICAgICAgICAgICBzeSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tpIC0gMV1bal07XG5cbiAgICAgICAgICAgIHdoaWxlIChzeCAtIChvdGhlclJvb21bXCJ4XCJdICsgb3RoZXJSb29tW1wid2lkdGhcIl0pIDwgMykge1xuICAgICAgICAgICAgICBzeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzeE9mZnNldCA9IE1hdGgucm91bmQoUk5HJDEuZ2V0VW5pZm9ybUludCgwLCBjd3AgLSByb29tdykgLyAyKTtcbiAgICAgICAgICB2YXIgc3lPZmZzZXQgPSBNYXRoLnJvdW5kKFJORyQxLmdldFVuaWZvcm1JbnQoMCwgY2hwIC0gcm9vbWgpIC8gMik7XG5cbiAgICAgICAgICB3aGlsZSAoc3ggKyBzeE9mZnNldCArIHJvb213ID49IHcpIHtcbiAgICAgICAgICAgIGlmIChzeE9mZnNldCkge1xuICAgICAgICAgICAgICBzeE9mZnNldC0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcm9vbXctLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aGlsZSAoc3kgKyBzeU9mZnNldCArIHJvb21oID49IGgpIHtcbiAgICAgICAgICAgIGlmIChzeU9mZnNldCkge1xuICAgICAgICAgICAgICBzeU9mZnNldC0tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcm9vbWgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzeCA9IHN4ICsgc3hPZmZzZXQ7XG4gICAgICAgICAgc3kgPSBzeSArIHN5T2Zmc2V0O1xuICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ4XCJdID0gc3g7XG4gICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcInlcIl0gPSBzeTtcbiAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wid2lkdGhcIl0gPSByb29tdztcbiAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wiaGVpZ2h0XCJdID0gcm9vbWg7XG5cbiAgICAgICAgICBmb3IgKHZhciBpaSA9IHN4OyBpaSA8IHN4ICsgcm9vbXc7IGlpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGpqID0gc3k7IGpqIDwgc3kgKyByb29taDsgamorKykge1xuICAgICAgICAgICAgICB0aGlzLm1hcFtpaV1bampdID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2dldFdhbGxQb3NpdGlvbiA9IGZ1bmN0aW9uIF9nZXRXYWxsUG9zaXRpb24oYVJvb20sIGFEaXJlY3Rpb24pIHtcbiAgICAgIHZhciByeDtcbiAgICAgIHZhciByeTtcbiAgICAgIHZhciBkb29yO1xuXG4gICAgICBpZiAoYURpcmVjdGlvbiA9PSAxIHx8IGFEaXJlY3Rpb24gPT0gMykge1xuICAgICAgICByeCA9IFJORyQxLmdldFVuaWZvcm1JbnQoYVJvb21bXCJ4XCJdICsgMSwgYVJvb21bXCJ4XCJdICsgYVJvb21bXCJ3aWR0aFwiXSAtIDIpO1xuXG4gICAgICAgIGlmIChhRGlyZWN0aW9uID09IDEpIHtcbiAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSAtIDI7XG4gICAgICAgICAgZG9vciA9IHJ5ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdICsgMTtcbiAgICAgICAgICBkb29yID0gcnkgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBbcnhdW2Rvb3JdID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnkgPSBSTkckMS5nZXRVbmlmb3JtSW50KGFSb29tW1wieVwiXSArIDEsIGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdIC0gMik7XG5cbiAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMikge1xuICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdICsgYVJvb21bXCJ3aWR0aFwiXSArIDE7XG4gICAgICAgICAgZG9vciA9IHJ4IC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByeCA9IGFSb29tW1wieFwiXSAtIDI7XG4gICAgICAgICAgZG9vciA9IHJ4ICsgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwW2Rvb3JdW3J5XSA9IDA7IC8vIGknbSBub3Qgc2V0dGluZyBhIHNwZWNpZmljICdkb29yJyB0aWxlIHZhbHVlIHJpZ2h0IG5vdywganVzdCBlbXB0eSBzcGFjZS5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFtyeCwgcnldO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fZHJhd0NvcnJpZG9yID0gZnVuY3Rpb24gX2RyYXdDb3JyaWRvcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgICAgdmFyIHhPZmZzZXQgPSBlbmRQb3NpdGlvblswXSAtIHN0YXJ0UG9zaXRpb25bMF07XG4gICAgICB2YXIgeU9mZnNldCA9IGVuZFBvc2l0aW9uWzFdIC0gc3RhcnRQb3NpdGlvblsxXTtcbiAgICAgIHZhciB4cG9zID0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgIHZhciB5cG9zID0gc3RhcnRQb3NpdGlvblsxXTtcbiAgICAgIHZhciB0ZW1wRGlzdDtcbiAgICAgIHZhciB4RGlyO1xuICAgICAgdmFyIHlEaXI7XG4gICAgICB2YXIgbW92ZTsgLy8gMiBlbGVtZW50IGFycmF5LCBlbGVtZW50IDAgaXMgdGhlIGRpcmVjdGlvbiwgZWxlbWVudCAxIGlzIHRoZSB0b3RhbCB2YWx1ZSB0byBtb3ZlLlxuXG4gICAgICB2YXIgbW92ZXMgPSBbXTsgLy8gYSBsaXN0IG9mIDIgZWxlbWVudCBhcnJheXNcblxuICAgICAgdmFyIHhBYnMgPSBNYXRoLmFicyh4T2Zmc2V0KTtcbiAgICAgIHZhciB5QWJzID0gTWF0aC5hYnMoeU9mZnNldCk7XG4gICAgICB2YXIgcGVyY2VudCA9IFJORyQxLmdldFVuaWZvcm0oKTsgLy8gdXNlZCB0byBzcGxpdCB0aGUgbW92ZSBhdCBkaWZmZXJlbnQgcGxhY2VzIGFsb25nIHRoZSBsb25nIGF4aXNcblxuICAgICAgdmFyIGZpcnN0SGFsZiA9IHBlcmNlbnQ7XG4gICAgICB2YXIgc2Vjb25kSGFsZiA9IDEgLSBwZXJjZW50O1xuICAgICAgeERpciA9IHhPZmZzZXQgPiAwID8gMiA6IDY7XG4gICAgICB5RGlyID0geU9mZnNldCA+IDAgPyA0IDogMDtcblxuICAgICAgaWYgKHhBYnMgPCB5QWJzKSB7XG4gICAgICAgIC8vIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB5IG9mZnNldFxuICAgICAgICB0ZW1wRGlzdCA9IE1hdGguY2VpbCh5QWJzICogZmlyc3RIYWxmKTtcbiAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTsgLy8gbW92ZSBhbGwgdGhlIHggb2Zmc2V0XG5cbiAgICAgICAgbW92ZXMucHVzaChbeERpciwgeEFic10pOyAvLyBtb3ZlIHNlbmRIYWxmIG9mIHRoZSAgeSBvZmZzZXRcblxuICAgICAgICB0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeUFicyAqIHNlY29uZEhhbGYpO1xuICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB4IG9mZnNldFxuICAgICAgICB0ZW1wRGlzdCA9IE1hdGguY2VpbCh4QWJzICogZmlyc3RIYWxmKTtcbiAgICAgICAgbW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTsgLy8gbW92ZSBhbGwgdGhlIHkgb2Zmc2V0XG5cbiAgICAgICAgbW92ZXMucHVzaChbeURpciwgeUFic10pOyAvLyBtb3ZlIHNlY29uZEhhbGYgb2YgdGhlIHggb2Zmc2V0LlxuXG4gICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih4QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcblxuICAgICAgd2hpbGUgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbW92ZSA9IG1vdmVzLnBvcCgpO1xuXG4gICAgICAgIHdoaWxlIChtb3ZlWzFdID4gMCkge1xuICAgICAgICAgIHhwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVswXTtcbiAgICAgICAgICB5cG9zICs9IERJUlNbOF1bbW92ZVswXV1bMV07XG4gICAgICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuICAgICAgICAgIG1vdmVbMV0gPSBtb3ZlWzFdIC0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY3JlYXRlQ29ycmlkb3JzID0gZnVuY3Rpb24gX2NyZWF0ZUNvcnJpZG9ycygpIHtcbiAgICAgIC8vIERyYXcgQ29ycmlkb3JzIGJldHdlZW4gY29ubmVjdGVkIHJvb21zXG4gICAgICB2YXIgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgIHZhciBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgIHZhciByb29tO1xuICAgICAgdmFyIGNvbm5lY3Rpb247XG4gICAgICB2YXIgb3RoZXJSb29tO1xuICAgICAgdmFyIHdhbGw7XG4gICAgICB2YXIgb3RoZXJXYWxsO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaDsgaisrKSB7XG4gICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbaV1bal07XG5cbiAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHJvb21bXCJjb25uZWN0aW9uc1wiXVtrXTtcbiAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbY29ubmVjdGlvblswXV1bY29ubmVjdGlvblsxXV07IC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIHN0YXJ0IG9uZS5cbiAgICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIGVuZCBvbi5cblxuICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdID4gcm9vbVtcImNlbGx4XCJdKSB7XG4gICAgICAgICAgICAgIHdhbGwgPSAyO1xuICAgICAgICAgICAgICBvdGhlcldhbGwgPSA0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA8IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICB3YWxsID0gNDtcbiAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJSb29tW1wiY2VsbHlcIl0gPiByb29tW1wiY2VsbHlcIl0pIHtcbiAgICAgICAgICAgICAgd2FsbCA9IDM7XG4gICAgICAgICAgICAgIG90aGVyV2FsbCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3YWxsID0gMTtcbiAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZHJhd0NvcnJpZG9yKHRoaXMuX2dldFdhbGxQb3NpdGlvbihyb29tLCB3YWxsKSwgdGhpcy5fZ2V0V2FsbFBvc2l0aW9uKG90aGVyUm9vbSwgb3RoZXJXYWxsKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBSb2d1ZTtcbiAgfShNYXApO1xuXG4gIHZhciBpbmRleCQyID0ge1xuICAgIEFyZW5hOiBBcmVuYSxcbiAgICBVbmlmb3JtOiBVbmlmb3JtLFxuICAgIENlbGx1bGFyOiBDZWxsdWxhcixcbiAgICBEaWdnZXI6IERpZ2dlcixcbiAgICBFbGxlck1hemU6IEVsbGVyTWF6ZSxcbiAgICBEaXZpZGVkTWF6ZTogRGl2aWRlZE1hemUsXG4gICAgSWNleU1hemU6IEljZXlNYXplLFxuICAgIFJvZ3VlOiBSb2d1ZVxuICB9O1xuICAvKipcbiAgICogQmFzZSBub2lzZSBnZW5lcmF0b3JcbiAgICovXG5cbiAgdmFyIE5vaXNlID0gZnVuY3Rpb24gTm9pc2UoKSB7fTtcblxuICB2YXIgRjIgPSAwLjUgKiAoTWF0aC5zcXJ0KDMpIC0gMSk7XG4gIHZhciBHMiA9ICgzIC0gTWF0aC5zcXJ0KDMpKSAvIDY7XG4gIC8qKlxuICAgKiBBIHNpbXBsZSAyZCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IE9uZHJlaiBaYXJhXG4gICAqXG4gICAqIEJhc2VkIG9uIGEgc3BlZWQtaW1wcm92ZWQgc2ltcGxleCBub2lzZSBhbGdvcml0aG0gZm9yIDJELCAzRCBhbmQgNEQgaW4gSmF2YS5cbiAgICogV2hpY2ggaXMgYmFzZWQgb24gZXhhbXBsZSBjb2RlIGJ5IFN0ZWZhbiBHdXN0YXZzb24gKHN0ZWd1QGl0bi5saXUuc2UpLlxuICAgKiBXaXRoIE9wdGltaXNhdGlvbnMgYnkgUGV0ZXIgRWFzdG1hbiAocGVhc3RtYW5AZHJpenpsZS5zdGFuZm9yZC5lZHUpLlxuICAgKiBCZXR0ZXIgcmFuayBvcmRlcmluZyBtZXRob2QgYnkgU3RlZmFuIEd1c3RhdnNvbiBpbiAyMDEyLlxuICAgKi9cblxuICB2YXIgU2ltcGxleCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9Ob2lzZSkge1xuICAgIF9pbmhlcml0c0xvb3NlKFNpbXBsZXgsIF9Ob2lzZSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZ3JhZGllbnRzIFJhbmRvbSBncmFkaWVudHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTaW1wbGV4KGdyYWRpZW50cykge1xuICAgICAgdmFyIF90aGlzMTk7XG5cbiAgICAgIGlmIChncmFkaWVudHMgPT09IHZvaWQgMCkge1xuICAgICAgICBncmFkaWVudHMgPSAyNTY7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMTkgPSBfTm9pc2UuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMxOS5fZ3JhZGllbnRzID0gW1swLCAtMV0sIFsxLCAtMV0sIFsxLCAwXSwgWzEsIDFdLCBbMCwgMV0sIFstMSwgMV0sIFstMSwgMF0sIFstMSwgLTFdXTtcbiAgICAgIHZhciBwZXJtdXRhdGlvbnMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBncmFkaWVudHM7IGkrKykge1xuICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChpKTtcbiAgICAgIH1cblxuICAgICAgcGVybXV0YXRpb25zID0gUk5HJDEuc2h1ZmZsZShwZXJtdXRhdGlvbnMpO1xuICAgICAgX3RoaXMxOS5fcGVybXMgPSBbXTtcbiAgICAgIF90aGlzMTkuX2luZGV4ZXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgX2kxMyA9IDA7IF9pMTMgPCAyICogZ3JhZGllbnRzOyBfaTEzKyspIHtcbiAgICAgICAgX3RoaXMxOS5fcGVybXMucHVzaChwZXJtdXRhdGlvbnNbX2kxMyAlIGdyYWRpZW50c10pO1xuXG4gICAgICAgIF90aGlzMTkuX2luZGV4ZXMucHVzaChfdGhpczE5Ll9wZXJtc1tfaTEzXSAlIF90aGlzMTkuX2dyYWRpZW50cy5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMxOTtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMzMgPSBTaW1wbGV4LnByb3RvdHlwZTtcblxuICAgIF9wcm90bzMzLmdldCA9IGZ1bmN0aW9uIGdldCh4aW4sIHlpbikge1xuICAgICAgdmFyIHBlcm1zID0gdGhpcy5fcGVybXM7XG4gICAgICB2YXIgaW5kZXhlcyA9IHRoaXMuX2luZGV4ZXM7XG4gICAgICB2YXIgY291bnQgPSBwZXJtcy5sZW5ndGggLyAyO1xuICAgICAgdmFyIG4wID0gMCxcbiAgICAgICAgICBuMSA9IDAsXG4gICAgICAgICAgbjIgPSAwLFxuICAgICAgICAgIGdpOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cblxuICAgICAgdmFyIHMgPSAoeGluICsgeWluKSAqIEYyOyAvLyBIYWlyeSBmYWN0b3IgZm9yIDJEXG5cbiAgICAgIHZhciBpID0gTWF0aC5mbG9vcih4aW4gKyBzKTtcbiAgICAgIHZhciBqID0gTWF0aC5mbG9vcih5aW4gKyBzKTtcbiAgICAgIHZhciB0ID0gKGkgKyBqKSAqIEcyO1xuICAgICAgdmFyIFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5KSBzcGFjZVxuXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuXG4gICAgICB2YXIgeTAgPSB5aW4gLSBZMDsgLy8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cbiAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cblxuICAgICAgdmFyIGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xuXG4gICAgICBpZiAoeDAgPiB5MCkge1xuICAgICAgICBpMSA9IDE7XG4gICAgICAgIGoxID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxvd2VyIHRyaWFuZ2xlLCBYWSBvcmRlcjogKDAsMCktPigxLDApLT4oMSwxKVxuICAgICAgICBpMSA9IDA7XG4gICAgICAgIGoxID0gMTtcbiAgICAgIH0gLy8gdXBwZXIgdHJpYW5nbGUsIFlYIG9yZGVyOiAoMCwwKS0+KDAsMSktPigxLDEpXG4gICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcbiAgICAgIC8vIGEgc3RlcCBvZiAoMCwxKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYykgaW4gKHgseSksIHdoZXJlXG4gICAgICAvLyBjID0gKDMtc3FydCgzKSkvNlxuXG5cbiAgICAgIHZhciB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcblxuICAgICAgdmFyIHkxID0geTAgLSBqMSArIEcyO1xuICAgICAgdmFyIHgyID0geDAgLSAxICsgMiAqIEcyOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcblxuICAgICAgdmFyIHkyID0geTAgLSAxICsgMiAqIEcyOyAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIHRocmVlIHNpbXBsZXggY29ybmVyc1xuXG4gICAgICB2YXIgaWkgPSBtb2QoaSwgY291bnQpO1xuICAgICAgdmFyIGpqID0gbW9kKGosIGNvdW50KTsgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuXG4gICAgICB2YXIgdDAgPSAwLjUgLSB4MCAqIHgwIC0geTAgKiB5MDtcblxuICAgICAgaWYgKHQwID49IDApIHtcbiAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgIGdpID0gaW5kZXhlc1tpaSArIHBlcm1zW2pqXV07XG4gICAgICAgIHZhciBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWRbMF0gKiB4MCArIGdyYWRbMV0gKiB5MCk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0MSA9IDAuNSAtIHgxICogeDEgLSB5MSAqIHkxO1xuXG4gICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgaTEgKyBwZXJtc1tqaiArIGoxXV07XG4gICAgICAgIHZhciBfZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgIG4xID0gdDEgKiB0MSAqIChfZ3JhZFswXSAqIHgxICsgX2dyYWRbMV0gKiB5MSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xuXG4gICAgICBpZiAodDIgPj0gMCkge1xuICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgMSArIHBlcm1zW2pqICsgMV1dO1xuICAgICAgICB2YXIgX2dyYWQyID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgbjIgPSB0MiAqIHQyICogKF9ncmFkMlswXSAqIHgyICsgX2dyYWQyWzFdICogeTIpO1xuICAgICAgfSAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG5cblxuICAgICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMik7XG4gICAgfTtcblxuICAgIHJldHVybiBTaW1wbGV4O1xuICB9KE5vaXNlKTtcblxuICB2YXIgaW5kZXgkMyA9IHtcbiAgICBTaW1wbGV4OiBTaW1wbGV4XG4gIH07XG4gIC8qKlxuICAgKiBAY2xhc3MgQWJzdHJhY3QgcGF0aGZpbmRlclxuICAgKiBAcGFyYW0ge2ludH0gdG9YIFRhcmdldCBYIGNvb3JkXG4gICAqIEBwYXJhbSB7aW50fSB0b1kgVGFyZ2V0IFkgY29vcmRcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcGFzc2FibGVDYWxsYmFjayBDYWxsYmFjayB0byBkZXRlcm1pbmUgbWFwIHBhc3NhYmlsaXR5XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdXG4gICAqL1xuXG4gIHZhciBQYXRoID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGF0aCh0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RvWCA9IHRvWDtcbiAgICAgIHRoaXMuX3RvWSA9IHRvWTtcbiAgICAgIHRoaXMuX3Bhc3NhYmxlQ2FsbGJhY2sgPSBwYXNzYWJsZUNhbGxiYWNrO1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB0b3BvbG9neTogOFxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9kaXJzID0gRElSU1t0aGlzLl9vcHRpb25zLnRvcG9sb2d5XTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gOCkge1xuICAgICAgICAvKiByZW9yZGVyIGRpcnMgZm9yIG1vcmUgYWVzdGhldGljIHJlc3VsdCAodmVydGljYWwvaG9yaXpvbnRhbCBmaXJzdCkgKi9cbiAgICAgICAgdGhpcy5fZGlycyA9IFt0aGlzLl9kaXJzWzBdLCB0aGlzLl9kaXJzWzJdLCB0aGlzLl9kaXJzWzRdLCB0aGlzLl9kaXJzWzZdLCB0aGlzLl9kaXJzWzFdLCB0aGlzLl9kaXJzWzNdLCB0aGlzLl9kaXJzWzVdLCB0aGlzLl9kaXJzWzddXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMzQgPSBQYXRoLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzM0Ll9nZXROZWlnaGJvcnMgPSBmdW5jdGlvbiBfZ2V0TmVpZ2hib3JzKGN4LCBjeSkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgIHZhciB4ID0gY3ggKyBkaXJbMF07XG4gICAgICAgIHZhciB5ID0gY3kgKyBkaXJbMV07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wYXNzYWJsZUNhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICByZXR1cm4gUGF0aDtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIFNpbXBsaWZpZWQgRGlqa3N0cmEncyBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICAgKiBAYXVnbWVudHMgUk9ULlBhdGhcbiAgICogQHNlZSBST1QuUGF0aFxuICAgKi9cblxuXG4gIHZhciBEaWprc3RyYSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9QYXRoKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoRGlqa3N0cmEsIF9QYXRoKTtcblxuICAgIGZ1bmN0aW9uIERpamtzdHJhKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMyMDtcblxuICAgICAgX3RoaXMyMCA9IF9QYXRoLmNhbGwodGhpcywgdG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIwLl9jb21wdXRlZCA9IHt9O1xuICAgICAgX3RoaXMyMC5fdG9kbyA9IFtdO1xuXG4gICAgICBfdGhpczIwLl9hZGQodG9YLCB0b1ksIG51bGwpO1xuXG4gICAgICByZXR1cm4gX3RoaXMyMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8zNSA9IERpamtzdHJhLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzM1LmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBrZXkgPSBmcm9tWCArIFwiLFwiICsgZnJvbVk7XG5cbiAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHtcbiAgICAgICAgdGhpcy5fY29tcHV0ZShmcm9tWCwgZnJvbVkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW0gPSB0aGlzLl9jb21wdXRlZFtrZXldO1xuXG4gICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICBjYWxsYmFjayhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgbm9uLWNhY2hlZCB2YWx1ZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zNS5fY29tcHV0ZSA9IGZ1bmN0aW9uIF9jb21wdXRlKGZyb21YLCBmcm9tWSkge1xuICAgICAgd2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuXG4gICAgICAgIGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhpdGVtLngsIGl0ZW0ueSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG4gICAgICAgICAgdmFyIHggPSBuZWlnaGJvclswXTtcbiAgICAgICAgICB2YXIgeSA9IG5laWdoYm9yWzFdO1xuICAgICAgICAgIHZhciBpZCA9IHggKyBcIixcIiArIHk7XG5cbiAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fY29tcHV0ZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBhbHJlYWR5IGRvbmUgKi9cblxuXG4gICAgICAgICAgdGhpcy5fYWRkKHgsIHksIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzM1Ll9hZGQgPSBmdW5jdGlvbiBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgIHZhciBvYmogPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHByZXY6IHByZXZcbiAgICAgIH07XG4gICAgICB0aGlzLl9jb21wdXRlZFt4ICsgXCIsXCIgKyB5XSA9IG9iajtcblxuICAgICAgdGhpcy5fdG9kby5wdXNoKG9iaik7XG4gICAgfTtcblxuICAgIHJldHVybiBEaWprc3RyYTtcbiAgfShQYXRoKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBTaW1wbGlmaWVkIEEqIGFsZ29yaXRobTogYWxsIGVkZ2VzIGhhdmUgYSB2YWx1ZSBvZiAxXG4gICAqIEBhdWdtZW50cyBST1QuUGF0aFxuICAgKiBAc2VlIFJPVC5QYXRoXG4gICAqL1xuXG5cbiAgdmFyIEFTdGFyID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX1BhdGgyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoQVN0YXIsIF9QYXRoMik7XG5cbiAgICBmdW5jdGlvbiBBU3Rhcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMjE7XG5cbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBfdGhpczIxID0gX1BhdGgyLmNhbGwodGhpcywgdG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIxLl90b2RvID0gW107XG4gICAgICBfdGhpczIxLl9kb25lID0ge307XG4gICAgICByZXR1cm4gX3RoaXMyMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8zNiA9IEFTdGFyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzM2LmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgIHRoaXMuX2RvbmUgPSB7fTtcbiAgICAgIHRoaXMuX2Zyb21YID0gZnJvbVg7XG4gICAgICB0aGlzLl9mcm9tWSA9IGZyb21ZO1xuXG4gICAgICB0aGlzLl9hZGQodGhpcy5fdG9YLCB0aGlzLl90b1ksIG51bGwpO1xuXG4gICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgdmFyIF9pdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuXG4gICAgICAgIHZhciBpZCA9IF9pdGVtLnggKyBcIixcIiArIF9pdGVtLnk7XG5cbiAgICAgICAgaWYgKGlkIGluIHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RvbmVbaWRdID0gX2l0ZW07XG5cbiAgICAgICAgaWYgKF9pdGVtLnggPT0gZnJvbVggJiYgX2l0ZW0ueSA9PSBmcm9tWSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhfaXRlbS54LCBfaXRlbS55KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICB2YXIgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgIHZhciB5ID0gbmVpZ2hib3JbMV07XG5cbiAgICAgICAgICB2YXIgX2lkMyA9IHggKyBcIixcIiArIHk7XG5cbiAgICAgICAgICBpZiAoX2lkMyBpbiB0aGlzLl9kb25lKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9hZGQoeCwgeSwgX2l0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtID0gdGhpcy5fZG9uZVtmcm9tWCArIFwiLFwiICsgZnJvbVldO1xuXG4gICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICBjYWxsYmFjayhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzM2Ll9hZGQgPSBmdW5jdGlvbiBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgIHZhciBoID0gdGhpcy5fZGlzdGFuY2UoeCwgeSk7XG5cbiAgICAgIHZhciBvYmogPSB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgIGc6IHByZXYgPyBwcmV2LmcgKyAxIDogMCxcbiAgICAgICAgaDogaFxuICAgICAgfTtcbiAgICAgIC8qIGluc2VydCBpbnRvIHByaW9yaXR5IHF1ZXVlICovXG5cbiAgICAgIHZhciBmID0gb2JqLmcgKyBvYmouaDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl90b2RvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gdGhpcy5fdG9kb1tpXTtcbiAgICAgICAgdmFyIGl0ZW1GID0gaXRlbS5nICsgaXRlbS5oO1xuXG4gICAgICAgIGlmIChmIDwgaXRlbUYgfHwgZiA9PSBpdGVtRiAmJiBoIDwgaXRlbS5oKSB7XG4gICAgICAgICAgdGhpcy5fdG9kby5zcGxpY2UoaSwgMCwgb2JqKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl90b2RvLnB1c2gob2JqKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMzYuX2Rpc3RhbmNlID0gZnVuY3Rpb24gX2Rpc3RhbmNlKHgsIHkpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgcmV0dXJuIE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCkgKyBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICB2YXIgZHggPSBNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpO1xuICAgICAgICAgIHZhciBkeSA9IE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSk7XG4gICAgICAgICAgcmV0dXJuIGR5ICsgTWF0aC5tYXgoMCwgKGR4IC0gZHkpIC8gMik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpLCBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEFTdGFyO1xuICB9KFBhdGgpO1xuXG4gIHZhciBpbmRleCQ0ID0ge1xuICAgIERpamtzdHJhOiBEaWprc3RyYSxcbiAgICBBU3RhcjogQVN0YXJcbiAgfTtcbiAgLyoqXG4gICAqIEBjbGFzcyBBc3luY2hyb25vdXMgbWFpbiBsb29wXG4gICAqIEBwYXJhbSB7Uk9ULlNjaGVkdWxlcn0gc2NoZWR1bGVyXG4gICAqL1xuXG4gIHZhciBFbmdpbmUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFbmdpbmUoc2NoZWR1bGVyKSB7XG4gICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICB0aGlzLl9sb2NrID0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIG1haW4gbG9vcC4gV2hlbiB0aGlzIGNhbGwgcmV0dXJucywgdGhlIGxvb3AgaXMgbG9ja2VkLlxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMzcgPSBFbmdpbmUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzcuc3RhcnQgPSBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnVubG9jaygpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW50ZXJydXB0IHRoZSBlbmdpbmUgYnkgYW4gYXN5bmNocm9ub3VzIGFjdGlvblxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zNy5sb2NrID0gZnVuY3Rpb24gbG9jaygpIHtcbiAgICAgIHRoaXMuX2xvY2srKztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVzdW1lIGV4ZWN1dGlvbiAocGF1c2VkIGJ5IGEgcHJldmlvdXMgbG9jaylcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzcudW5sb2NrID0gZnVuY3Rpb24gdW5sb2NrKCkge1xuICAgICAgaWYgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1bmxvY2sgdW5sb2NrZWQgZW5naW5lXCIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9sb2NrLS07XG5cbiAgICAgIHdoaWxlICghdGhpcy5fbG9jaykge1xuICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLl9zY2hlZHVsZXIubmV4dCgpO1xuXG4gICAgICAgIGlmICghYWN0b3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2NrKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogbm8gYWN0b3JzICovXG5cblxuICAgICAgICB2YXIgcmVzdWx0ID0gYWN0b3IuYWN0KCk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikge1xuICAgICAgICAgIC8qIGFjdG9yIHJldHVybmVkIGEgXCJ0aGVuYWJsZVwiLCBsb29rcyBsaWtlIGEgUHJvbWlzZSAqL1xuICAgICAgICAgIHRoaXMubG9jaygpO1xuICAgICAgICAgIHJlc3VsdC50aGVuKHRoaXMudW5sb2NrLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gRW5naW5lO1xuICB9KCk7XG4gIC8qKlxuICAgKiBMaWdodGluZyBjb21wdXRhdGlvbiwgYmFzZWQgb24gYSB0cmFkaXRpb25hbCBGT1YgZm9yIG11bHRpcGxlIGxpZ2h0IHNvdXJjZXMgYW5kIG11bHRpcGxlIHBhc3Nlcy5cbiAgICovXG5cblxuICB2YXIgTGlnaHRpbmcgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMaWdodGluZyhyZWZsZWN0aXZpdHlDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrID0gcmVmbGVjdGl2aXR5Q2FsbGJhY2s7XG4gICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIHBhc3NlczogMSxcbiAgICAgICAgZW1pc3Npb25UaHJlc2hvbGQ6IDEwMCxcbiAgICAgICAgcmFuZ2U6IDEwXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2xpZ2h0cyA9IHt9O1xuICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkanVzdCBvcHRpb25zIGF0IHJ1bnRpbWVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzM4ID0gTGlnaHRpbmcucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzguc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcblxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yYW5nZSkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB1c2VkIEZpZWxkLU9mLVZpZXcgYWxnb1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5zZXRGT1YgPSBmdW5jdGlvbiBzZXRGT1YoZm92KSB7XG4gICAgICB0aGlzLl9mb3YgPSBmb3Y7XG4gICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgKG9yIHJlbW92ZSkgYSBsaWdodCBzb3VyY2VcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguc2V0TGlnaHQgPSBmdW5jdGlvbiBzZXRMaWdodCh4LCB5LCBjb2xvcikge1xuICAgICAgdmFyIGtleSA9IHggKyBcIixcIiArIHk7XG5cbiAgICAgIGlmIChjb2xvcikge1xuICAgICAgICB0aGlzLl9saWdodHNba2V5XSA9IHR5cGVvZiBjb2xvciA9PSBcInN0cmluZ1wiID8gZnJvbVN0cmluZyhjb2xvcikgOiBjb2xvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpZ2h0IHNvdXJjZXNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguY2xlYXJMaWdodHMgPSBmdW5jdGlvbiBjbGVhckxpZ2h0cygpIHtcbiAgICAgIHRoaXMuX2xpZ2h0cyA9IHt9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHByZS1jb21wdXRlZCB0b3BvbG9neSB2YWx1ZXMuIENhbGwgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgbWFwIGNoYW5nZXMgaXRzIGxpZ2h0LXBhc3NhYmlsaXR5LlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdGhlIGxpZ2h0aW5nXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4LmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKGxpZ2h0aW5nQ2FsbGJhY2spIHtcbiAgICAgIHZhciBkb25lQ2VsbHMgPSB7fTtcbiAgICAgIHZhciBlbWl0dGluZ0NlbGxzID0ge307XG4gICAgICB2YXIgbGl0Q2VsbHMgPSB7fTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2xpZ2h0cykge1xuICAgICAgICAvKiBwcmVwYXJlIGVtaXR0ZXJzIGZvciBmaXJzdCBwYXNzICovXG4gICAgICAgIHZhciBsaWdodCA9IHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgICBlbWl0dGluZ0NlbGxzW2tleV0gPSBbMCwgMCwgMF07XG4gICAgICAgIGFkZF8oZW1pdHRpbmdDZWxsc1trZXldLCBsaWdodCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5wYXNzZXM7IGkrKykge1xuICAgICAgICAvKiBtYWluIGxvb3AgKi9cbiAgICAgICAgdGhpcy5fZW1pdExpZ2h0KGVtaXR0aW5nQ2VsbHMsIGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuXG4gICAgICAgIGlmIChpICsgMSA9PSB0aGlzLl9vcHRpb25zLnBhc3Nlcykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIG5vdCBmb3IgdGhlIGxhc3QgcGFzcyAqL1xuXG5cbiAgICAgICAgZW1pdHRpbmdDZWxscyA9IHRoaXMuX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgbGl0S2V5IGluIGxpdENlbGxzKSB7XG4gICAgICAgIC8qIGxldCB0aGUgdXNlciBrbm93IHdoYXQgYW5kIGhvdyBpcyBsaXQgKi9cbiAgICAgICAgdmFyIHBhcnRzID0gbGl0S2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgdmFyIHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICBsaWdodGluZ0NhbGxiYWNrKHgsIHksIGxpdENlbGxzW2xpdEtleV0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIGFsbCBlbWl0dGluZyBjZWxsc1xuICAgICAqIEBwYXJhbSBlbWl0dGluZ0NlbGxzIFRoZXNlIGVtaXQgbGlnaHRcbiAgICAgKiBAcGFyYW0gbGl0Q2VsbHMgQWRkIHByb2plY3RlZCBsaWdodCB0byB0aGVzZVxuICAgICAqIEBwYXJhbSBkb25lQ2VsbHMgVGhlc2UgYWxyZWFkeSBlbWl0dGVkLCBmb3JiaWQgdGhlbSBmcm9tIGZ1cnRoZXIgY2FsY3VsYXRpb25zXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4Ll9lbWl0TGlnaHQgPSBmdW5jdGlvbiBfZW1pdExpZ2h0KGVtaXR0aW5nQ2VsbHMsIGxpdENlbGxzLCBkb25lQ2VsbHMpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBlbWl0dGluZ0NlbGxzKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgIHZhciB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcblxuICAgICAgICB0aGlzLl9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBlbWl0dGluZ0NlbGxzW2tleV0sIGxpdENlbGxzKTtcblxuICAgICAgICBkb25lQ2VsbHNba2V5XSA9IDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBhIGxpc3Qgb2YgZW1pdHRlcnMgZm9yIG5leHQgcGFzc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5fY29tcHV0ZUVtaXR0ZXJzID0gZnVuY3Rpb24gX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBsaXRDZWxscykge1xuICAgICAgICBpZiAoa2V5IGluIGRvbmVDZWxscykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIGFscmVhZHkgZW1pdHRlZCAqL1xuXG5cbiAgICAgICAgdmFyIF9jb2xvciA9IGxpdENlbGxzW2tleV07XG4gICAgICAgIHZhciByZWZsZWN0aXZpdHkgPSB2b2lkIDA7XG5cbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSkge1xuICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICB2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayh4LCB5KTtcbiAgICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldID0gcmVmbGVjdGl2aXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlZmxlY3Rpdml0eSA9PSAwKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogd2lsbCBub3QgcmVmbGVjdCBhdCBhbGwgKi9cblxuICAgICAgICAvKiBjb21wdXRlIGVtaXNzaW9uIGNvbG9yICovXG5cblxuICAgICAgICB2YXIgZW1pc3Npb24gPSBbMCwgMCwgMF07XG4gICAgICAgIHZhciBpbnRlbnNpdHkgPSAwO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBhcnQgPSBNYXRoLnJvdW5kKF9jb2xvcltpXSAqIHJlZmxlY3Rpdml0eSk7XG4gICAgICAgICAgZW1pc3Npb25baV0gPSBwYXJ0O1xuICAgICAgICAgIGludGVuc2l0eSArPSBwYXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGludGVuc2l0eSA+IHRoaXMuX29wdGlvbnMuZW1pc3Npb25UaHJlc2hvbGQpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGVtaXNzaW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBvbmUgY2VsbFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5fZW1pdExpZ2h0RnJvbUNlbGwgPSBmdW5jdGlvbiBfZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgY29sb3IsIGxpdENlbGxzKSB7XG4gICAgICB2YXIga2V5ID0geCArIFwiLFwiICsgeTtcbiAgICAgIHZhciBmb3Y7XG5cbiAgICAgIGlmIChrZXkgaW4gdGhpcy5fZm92Q2FjaGUpIHtcbiAgICAgICAgZm92ID0gdGhpcy5fZm92Q2FjaGVba2V5XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvdiA9IHRoaXMuX3VwZGF0ZUZPVih4LCB5KTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgZm92S2V5IGluIGZvdikge1xuICAgICAgICB2YXIgZm9ybUZhY3RvciA9IGZvdltmb3ZLZXldO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgIGlmIChmb3ZLZXkgaW4gbGl0Q2VsbHMpIHtcbiAgICAgICAgICAvKiBhbHJlYWR5IGxpdCAqL1xuICAgICAgICAgIHJlc3VsdCA9IGxpdENlbGxzW2ZvdktleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogbmV3bHkgbGl0ICovXG4gICAgICAgICAgcmVzdWx0ID0gWzAsIDAsIDBdO1xuICAgICAgICAgIGxpdENlbGxzW2ZvdktleV0gPSByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgIHJlc3VsdFtpXSArPSBNYXRoLnJvdW5kKGNvbG9yW2ldICogZm9ybUZhY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgLyogYWRkIGxpZ2h0IGNvbG9yICovXG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIEZPViAoXCJmb3JtIGZhY3RvclwiKSBmb3IgYSBwb3RlbnRpYWwgbGlnaHQgc291cmNlIGF0IFt4LHldXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4Ll91cGRhdGVGT1YgPSBmdW5jdGlvbiBfdXBkYXRlRk9WKHgsIHkpIHtcbiAgICAgIHZhciBrZXkxID0geCArIFwiLFwiICsgeTtcbiAgICAgIHZhciBjYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fZm92Q2FjaGVba2V5MV0gPSBjYWNoZTtcbiAgICAgIHZhciByYW5nZSA9IHRoaXMuX29wdGlvbnMucmFuZ2U7XG5cbiAgICAgIGZ1bmN0aW9uIGNiKHgsIHksIHIsIHZpcykge1xuICAgICAgICB2YXIga2V5MiA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIHZhciBmb3JtRmFjdG9yID0gdmlzICogKDEgLSByIC8gcmFuZ2UpO1xuXG4gICAgICAgIGlmIChmb3JtRmFjdG9yID09IDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYWNoZVtrZXkyXSA9IGZvcm1GYWN0b3I7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2Zvdi5jb21wdXRlKHgsIHksIHJhbmdlLCBjYi5iaW5kKHRoaXMpKTtcblxuICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH07XG5cbiAgICByZXR1cm4gTGlnaHRpbmc7XG4gIH0oKTtcblxuICB2YXIgVXRpbCA9IHV0aWw7XG4gIHZhciBDb2xvciA9IGNvbG9yO1xuICB2YXIgVGV4dCA9IHRleHQ7XG4gIGV4cG9ydHMuVXRpbCA9IFV0aWw7XG4gIGV4cG9ydHMuQ29sb3IgPSBDb2xvcjtcbiAgZXhwb3J0cy5UZXh0ID0gVGV4dDtcbiAgZXhwb3J0cy5STkcgPSBSTkckMTtcbiAgZXhwb3J0cy5EaXNwbGF5ID0gRGlzcGxheTtcbiAgZXhwb3J0cy5TdHJpbmdHZW5lcmF0b3IgPSBTdHJpbmdHZW5lcmF0b3I7XG4gIGV4cG9ydHMuRXZlbnRRdWV1ZSA9IEV2ZW50UXVldWU7XG4gIGV4cG9ydHMuU2NoZWR1bGVyID0gaW5kZXg7XG4gIGV4cG9ydHMuRk9WID0gaW5kZXgkMTtcbiAgZXhwb3J0cy5NYXAgPSBpbmRleCQyO1xuICBleHBvcnRzLk5vaXNlID0gaW5kZXgkMztcbiAgZXhwb3J0cy5QYXRoID0gaW5kZXgkNDtcbiAgZXhwb3J0cy5FbmdpbmUgPSBFbmdpbmU7XG4gIGV4cG9ydHMuTGlnaHRpbmcgPSBMaWdodGluZztcbiAgZXhwb3J0cy5ERUZBVUxUX1dJRFRIID0gREVGQVVMVF9XSURUSDtcbiAgZXhwb3J0cy5ERUZBVUxUX0hFSUdIVCA9IERFRkFVTFRfSEVJR0hUO1xuICBleHBvcnRzLkRJUlMgPSBESVJTO1xuICBleHBvcnRzLktFWVMgPSBLRVlTO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG59KTtcblxuIiwiaW1wb3J0ICogYXMgUk9UIGZyb20gJ3JvdC1qcyc7XG5pbXBvcnQgeyBUZXN0IH0gZnJvbSAnLi90ZXN0JztcblxudmFyIFdFQiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBjbGFzcyBNYWluIHtcblxuXHRydW4oKSB7XG5cdFx0bGV0IGQgPSBuZXcgUk9ULkRpc3BsYXkoe1xuXHRcdFx0d2lkdGg6IDExLFxuXHRcdFx0aGVpZ2h0OiA1LFxuXHRcdFx0bGF5b3V0OiBXRUIgPyAncmVjdCcgOiAndGVybSdcblx0XHR9KTtcblxuXHRcdGlmIChXRUIpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZC5nZXRDb250YWluZXIoKSBhcyBOb2RlKTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGQuX29wdGlvbnMud2lkdGg7IGkrKykge1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBkLl9vcHRpb25zLmhlaWdodDsgaisrKSB7XG5cdFx0XHRcdGlmICghaSB8fCAhaiB8fCBpICsgMSA9PSBkLl9vcHRpb25zLndpZHRoIHx8IGogKyAxID09IGQuX29wdGlvbnMuaGVpZ2h0KSB7XG5cdFx0XHRcdFx0ZC5kcmF3KGksIGosIFwiI1wiLCBcImdyYXlcIiwgXCJibGFja1wiKTtcblx0XHRcdFx0XHRkLmRyYXcoaSwgaiwgXCIuXCIsIFwiIzY2NlwiLCBcImJsYWNrXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGQuZHJhdyhkLl9vcHRpb25zLndpZHRoID4+IDEsIGQuX29wdGlvbnMuaGVpZ2h0ID4+IDEsIFwiQFwiLCBcImdvbGRlbnJvZFwiLCBcImJsYWNrXCIpO1xuXHRcdGQuZHJhd1RleHQoMCwgMCwgbmV3IFRlc3QoKS5EbyhcImZ1Y2tcIikpO1xuXHR9XG59XG5cbm5ldyBNYWluKCkucnVuKCk7IiwiZXhwb3J0IGNsYXNzIFRlc3R7XG4gICAgcHVibGljIERvKHM6IHN0cmluZyk6IHN0cmluZ3tcbiAgICAgICAgcmV0dXJuICfvvIMnK3M7XG4gICAgfVxufSJdfQ==
