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
ROT.RNG.setSeed(1234);
var map = new MyDigger(50, 50);
var display = new ROT.Display({ fontSize: 8 });
document.body.appendChild(display.getContainer());
map.fuck(display.DEBUG);
console.log("fuc you");
/* var drawDoor = function(x, y) {
    display.draw(x, y, "", "", "red");
}

var rooms = map.getRooms();
for (var i=0; i<rooms.length; i++) {
    var room = rooms[i];
    

    room.getDoors(drawDoor);
} */ 

},{"rot-js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JvdC1qcy9kaXN0L3JvdC5qcyIsInNyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxdU9BLDRCQUE4QjtBQUc5Qjs7Ozs7Ozs7Ozs7Ozs7OERBYzhEO0FBRTlEO0lBQXVCLDRCQUFjO0lBQXJDOztJQU1BLENBQUM7SUFKQSx1QkFBSSxHQUFKLFVBQUssRUFBbUI7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FOQSxBQU1DLENBTnNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQU1wQztBQUVELEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztBQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ3RCOzs7Ozs7Ozs7O0lBVUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDogdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6IGZhY3RvcnkoZ2xvYmFsLlJPVCA9IHt9KTtcbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLyoqXG4gICAqIFRoaXMgY29kZSBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiBBbGVhIGFsZ29yaXRobTsgKEMpIDIwMTAgSm9oYW5uZXMgQmFhZ8O4ZS5cbiAgICogQWxlYSBpcyBsaWNlbnNlZCBhY2NvcmRpbmcgdG8gdGhlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UuXG4gICAqL1xuXG4gIHZhciBGUkFDID0gMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDtcbiAgLyogMl4tMzIgKi9cblxuICB2YXIgUk5HID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUk5HKCkge1xuICAgICAgdGhpcy5fc2VlZCA9IDA7XG4gICAgICB0aGlzLl9zMCA9IDA7XG4gICAgICB0aGlzLl9zMSA9IDA7XG4gICAgICB0aGlzLl9zMiA9IDA7XG4gICAgICB0aGlzLl9jID0gMDtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvID0gUk5HLnByb3RvdHlwZTtcblxuICAgIF9wcm90by5nZXRTZWVkID0gZnVuY3Rpb24gZ2V0U2VlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VlZCB0aGUgbnVtYmVyIGdlbmVyYXRvclxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uc2V0U2VlZCA9IGZ1bmN0aW9uIHNldFNlZWQoc2VlZCkge1xuICAgICAgc2VlZCA9IHNlZWQgPCAxID8gMSAvIHNlZWQgOiBzZWVkO1xuICAgICAgdGhpcy5fc2VlZCA9IHNlZWQ7XG4gICAgICB0aGlzLl9zMCA9IChzZWVkID4+PiAwKSAqIEZSQUM7XG4gICAgICBzZWVkID0gc2VlZCAqIDY5MDY5ICsgMSA+Pj4gMDtcbiAgICAgIHRoaXMuX3MxID0gc2VlZCAqIEZSQUM7XG4gICAgICBzZWVkID0gc2VlZCAqIDY5MDY5ICsgMSA+Pj4gMDtcbiAgICAgIHRoaXMuX3MyID0gc2VlZCAqIEZSQUM7XG4gICAgICB0aGlzLl9jID0gMTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFswLDEpLCB1bmlmb3JtbHkgZGlzdHJpYnV0ZWRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldFVuaWZvcm0gPSBmdW5jdGlvbiBnZXRVbmlmb3JtKCkge1xuICAgICAgdmFyIHQgPSAyMDkxNjM5ICogdGhpcy5fczAgKyB0aGlzLl9jICogRlJBQztcbiAgICAgIHRoaXMuX3MwID0gdGhpcy5fczE7XG4gICAgICB0aGlzLl9zMSA9IHRoaXMuX3MyO1xuICAgICAgdGhpcy5fYyA9IHQgfCAwO1xuICAgICAgdGhpcy5fczIgPSB0IC0gdGhpcy5fYztcbiAgICAgIHJldHVybiB0aGlzLl9zMjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsb3dlckJvdW5kIFRoZSBsb3dlciBlbmQgb2YgdGhlIHJhbmdlIHRvIHJldHVybiBhIHZhbHVlIGZyb20sIGluY2x1c2l2ZVxuICAgICAqIEBwYXJhbSB1cHBlckJvdW5kIFRoZSB1cHBlciBlbmQgb2YgdGhlIHJhbmdlIHRvIHJldHVybiBhIHZhbHVlIGZyb20sIGluY2x1c2l2ZVxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbbG93ZXJCb3VuZCwgdXBwZXJCb3VuZF0sIHVzaW5nIFJPVC5STkcuZ2V0VW5pZm9ybSgpIHRvIGRpc3RyaWJ1dGUgdGhlIHZhbHVlXG4gICAgICovXG5cblxuICAgIF9wcm90by5nZXRVbmlmb3JtSW50ID0gZnVuY3Rpb24gZ2V0VW5pZm9ybUludChsb3dlckJvdW5kLCB1cHBlckJvdW5kKSB7XG4gICAgICB2YXIgbWF4ID0gTWF0aC5tYXgobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICB2YXIgbWluID0gTWF0aC5taW4obG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWVhbiBNZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIHN0ZGRldiBTdGFuZGFyZCBkZXZpYXRpb24uIH45NSUgb2YgdGhlIGFic29sdXRlIHZhbHVlcyB3aWxsIGJlIGxvd2VyIHRoYW4gMipzdGRkZXYuXG4gICAgICogQHJldHVybnMgQSBub3JtYWxseSBkaXN0cmlidXRlZCBwc2V1ZG9yYW5kb20gdmFsdWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldE5vcm1hbCA9IGZ1bmN0aW9uIGdldE5vcm1hbChtZWFuLCBzdGRkZXYpIHtcbiAgICAgIGlmIChtZWFuID09PSB2b2lkIDApIHtcbiAgICAgICAgbWVhbiA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGRkZXYgPT09IHZvaWQgMCkge1xuICAgICAgICBzdGRkZXYgPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgdSwgdiwgcjtcblxuICAgICAgZG8ge1xuICAgICAgICB1ID0gMiAqIHRoaXMuZ2V0VW5pZm9ybSgpIC0gMTtcbiAgICAgICAgdiA9IDIgKiB0aGlzLmdldFVuaWZvcm0oKSAtIDE7XG4gICAgICAgIHIgPSB1ICogdSArIHYgKiB2O1xuICAgICAgfSB3aGlsZSAociA+IDEgfHwgciA9PSAwKTtcblxuICAgICAgdmFyIGdhdXNzID0gdSAqIE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHIpIC8gcik7XG4gICAgICByZXR1cm4gbWVhbiArIGdhdXNzICogc3RkZGV2O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFsxLDEwMF0gaW5jbHVzaXZlLCB1bmlmb3JtbHkgZGlzdHJpYnV0ZWRcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldFBlcmNlbnRhZ2UgPSBmdW5jdGlvbiBnZXRQZXJjZW50YWdlKCkge1xuICAgICAgcmV0dXJuIDEgKyBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogMTAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJhbmRvbWx5IHBpY2tlZCBpdGVtLCBudWxsIHdoZW4gbGVuZ3RoPTBcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGFycmF5KSB7XG4gICAgICBpZiAoIWFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiBhcnJheS5sZW5ndGgpXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIE5ldyBhcnJheSB3aXRoIHJhbmRvbWl6ZWQgaXRlbXNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLnNodWZmbGUgPSBmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICB2YXIgY2xvbmUgPSBhcnJheS5zbGljZSgpO1xuXG4gICAgICB3aGlsZSAoY2xvbmUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfaW5kZXggPSBjbG9uZS5pbmRleE9mKHRoaXMuZ2V0SXRlbShjbG9uZSkpO1xuXG4gICAgICAgIHJlc3VsdC5wdXNoKGNsb25lLnNwbGljZShfaW5kZXgsIDEpWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRhIGtleT13aGF0ZXZlciwgdmFsdWU9d2VpZ2h0IChyZWxhdGl2ZSBwcm9iYWJpbGl0eSlcbiAgICAgKiBAcmV0dXJucyB3aGF0ZXZlclxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0V2VpZ2h0ZWRWYWx1ZSA9IGZ1bmN0aW9uIGdldFdlaWdodGVkVmFsdWUoZGF0YSkge1xuICAgICAgdmFyIHRvdGFsID0gMDtcblxuICAgICAgZm9yICh2YXIgX2lkIGluIGRhdGEpIHtcbiAgICAgICAgdG90YWwgKz0gZGF0YVtfaWRdO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmFuZG9tID0gdGhpcy5nZXRVbmlmb3JtKCkgKiB0b3RhbDtcbiAgICAgIHZhciBpZCxcbiAgICAgICAgICBwYXJ0ID0gMDtcblxuICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XG4gICAgICAgIHBhcnQgKz0gZGF0YVtpZF07XG5cbiAgICAgICAgaWYgKHJhbmRvbSA8IHBhcnQpIHtcbiAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gSWYgYnkgc29tZSBmbG9hdGluZy1wb2ludCBhbm5veWFuY2Ugd2UgaGF2ZVxuICAgICAgLy8gcmFuZG9tID49IHRvdGFsLCBqdXN0IHJldHVybiB0aGUgbGFzdCBpZC5cblxuXG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgUk5HIHN0YXRlLiBVc2VmdWwgZm9yIHN0b3JpbmcgdGhlIHN0YXRlIGFuZCByZS1zZXR0aW5nIGl0IHZpYSBzZXRTdGF0ZS5cbiAgICAgKiBAcmV0dXJucyBJbnRlcm5hbCBzdGF0ZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8uZ2V0U3RhdGUgPSBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgIHJldHVybiBbdGhpcy5fczAsIHRoaXMuX3MxLCB0aGlzLl9zMiwgdGhpcy5fY107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgYSBwcmV2aW91c2x5IHJldHJpZXZlZCBzdGF0ZS5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLnNldFN0YXRlID0gZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgIHRoaXMuX3MwID0gc3RhdGVbMF07XG4gICAgICB0aGlzLl9zMSA9IHN0YXRlWzFdO1xuICAgICAgdGhpcy5fczIgPSBzdGF0ZVsyXTtcbiAgICAgIHRoaXMuX2MgPSBzdGF0ZVszXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNsb25lZCBSTkdcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgICB2YXIgY2xvbmUgPSBuZXcgUk5HKCk7XG4gICAgICByZXR1cm4gY2xvbmUuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJORztcbiAgfSgpO1xuXG4gIHZhciBSTkckMSA9IG5ldyBSTkcoKS5zZXRTZWVkKERhdGUubm93KCkpO1xuICAvKipcbiAgICogQGNsYXNzIEFic3RyYWN0IGRpc3BsYXkgYmFja2VuZCBtb2R1bGVcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdmFyIEJhY2tlbmQgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYWNrZW5kKCkge31cblxuICAgIHZhciBfcHJvdG8yID0gQmFja2VuZC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yLmdldENvbnRhaW5lciA9IGZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBfcHJvdG8yLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH07XG5cbiAgICByZXR1cm4gQmFja2VuZDtcbiAgfSgpO1xuXG4gIHZhciBDYW52YXMgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfQmFja2VuZCkge1xuICAgIF9pbmhlcml0c0xvb3NlKENhbnZhcywgX0JhY2tlbmQpO1xuXG4gICAgZnVuY3Rpb24gQ2FudmFzKCkge1xuICAgICAgdmFyIF90aGlzO1xuXG4gICAgICBfdGhpcyA9IF9CYWNrZW5kLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzLl9jdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMyA9IENhbnZhcy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zLnNjaGVkdWxlID0gZnVuY3Rpb24gc2NoZWR1bGUoY2IpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7XG4gICAgfTtcblxuICAgIF9wcm90bzMuZ2V0Q29udGFpbmVyID0gZnVuY3Rpb24gZ2V0Q29udGFpbmVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2N0eC5jYW52YXM7XG4gICAgfTtcblxuICAgIF9wcm90bzMuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgX0JhY2tlbmQucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgdmFyIHN0eWxlID0gb3B0cy5mb250U3R5bGUgPyBvcHRzLmZvbnRTdHlsZSArIFwiIFwiIDogXCJcIjtcbiAgICAgIHZhciBmb250ID0gc3R5bGUgKyBcIiBcIiArIG9wdHMuZm9udFNpemUgKyBcInB4IFwiICsgb3B0cy5mb250RmFtaWx5O1xuICAgICAgdGhpcy5fY3R4LmZvbnQgPSBmb250O1xuXG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgIHRoaXMuX2N0eC5mb250ID0gZm9udDtcbiAgICAgIHRoaXMuX2N0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgdGhpcy5fY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgfTtcblxuICAgIF9wcm90bzMuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSB0aGlzLl9vcHRpb25zLmJnO1xuXG4gICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIH07XG5cbiAgICBfcHJvdG8zLmV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIGV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICB2YXIgY2FudmFzID0gdGhpcy5fY3R4LmNhbnZhcztcbiAgICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgeCAtPSByZWN0LmxlZnQ7XG4gICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgeCAqPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgeSAqPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG5cbiAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IGNhbnZhcy53aWR0aCB8fCB5ID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIENhbnZhcztcbiAgfShCYWNrZW5kKTtcbiAgLyoqXG4gICAqIEFsd2F5cyBwb3NpdGl2ZSBtb2R1bHVzXG4gICAqIEBwYXJhbSB4IE9wZXJhbmRcbiAgICogQHBhcmFtIG4gTW9kdWx1c1xuICAgKiBAcmV0dXJucyB4IG1vZHVsbyBuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gbW9kKHgsIG4pIHtcbiAgICByZXR1cm4gKHggJSBuICsgbikgJSBuO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xhbXAodmFsLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPT09IHZvaWQgMCkge1xuICAgICAgbWluID0gMDtcbiAgICB9XG5cbiAgICBpZiAobWF4ID09PSB2b2lkIDApIHtcbiAgICAgIG1heCA9IDE7XG4gICAgfVxuXG4gICAgaWYgKHZhbCA8IG1pbikgcmV0dXJuIG1pbjtcbiAgICBpZiAodmFsID4gbWF4KSByZXR1cm4gbWF4O1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpO1xuICB9XG4gIC8qKlxuICAgKiBGb3JtYXQgYSBzdHJpbmcgaW4gYSBmbGV4aWJsZSB3YXkuIFNjYW5zIGZvciAlcyBzdHJpbmdzIGFuZCByZXBsYWNlcyB0aGVtIHdpdGggYXJndW1lbnRzLiBMaXN0IG9mIHBhdHRlcm5zIGlzIG1vZGlmaWFibGUgdmlhIFN0cmluZy5mb3JtYXQubWFwLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAgICogQHBhcmFtIHthbnl9IFthcmd2XVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGZvcm1hdCh0ZW1wbGF0ZSkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBtYXAgPSBmb3JtYXQubWFwO1xuXG4gICAgdmFyIHJlcGxhY2VyID0gZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gsIGdyb3VwMSwgZ3JvdXAyLCBpbmRleCkge1xuICAgICAgaWYgKHRlbXBsYXRlLmNoYXJBdChpbmRleCAtIDEpID09IFwiJVwiKSB7XG4gICAgICAgIHJldHVybiBtYXRjaC5zdWJzdHJpbmcoMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuXG4gICAgICB2YXIgb2JqID0gYXJnc1swXTtcbiAgICAgIHZhciBncm91cCA9IGdyb3VwMSB8fCBncm91cDI7XG4gICAgICB2YXIgcGFydHMgPSBncm91cC5zcGxpdChcIixcIik7XG4gICAgICB2YXIgbmFtZSA9IHBhcnRzLnNoaWZ0KCkgfHwgXCJcIjtcbiAgICAgIHZhciBtZXRob2QgPSBtYXBbbmFtZS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuXG4gICAgICBvYmogPSBhcmdzLnNoaWZ0KCk7XG4gICAgICB2YXIgcmVwbGFjZWQgPSBvYmpbbWV0aG9kXS5hcHBseShvYmosIHBhcnRzKTtcbiAgICAgIHZhciBmaXJzdCA9IG5hbWUuY2hhckF0KDApO1xuXG4gICAgICBpZiAoZmlyc3QgIT0gZmlyc3QudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICByZXBsYWNlZCA9IGNhcGl0YWxpemUocmVwbGFjZWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVwbGFjZWQ7XG4gICAgfTtcblxuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC8lKD86KFthLXpdKyl8KD86eyhbXn1dKyl9KSkvZ2ksIHJlcGxhY2VyKTtcbiAgfVxuXG4gIGZvcm1hdC5tYXAgPSB7XG4gICAgXCJzXCI6IFwidG9TdHJpbmdcIlxuICB9O1xuICB2YXIgdXRpbCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgT2JqZWN0LmZyZWV6ZSh7XG4gICAgbW9kOiBtb2QsXG4gICAgY2xhbXA6IGNsYW1wLFxuICAgIGNhcGl0YWxpemU6IGNhcGl0YWxpemUsXG4gICAgZm9ybWF0OiBmb3JtYXRcbiAgfSk7XG4gIC8qKlxuICAgKiBAY2xhc3MgSGV4YWdvbmFsIGJhY2tlbmRcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdmFyIEhleCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9DYW52YXMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShIZXgsIF9DYW52YXMpO1xuXG4gICAgZnVuY3Rpb24gSGV4KCkge1xuICAgICAgdmFyIF90aGlzMjtcblxuICAgICAgX3RoaXMyID0gX0NhbnZhcy5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczIuX3NwYWNpbmdYID0gMDtcbiAgICAgIF90aGlzMi5fc3BhY2luZ1kgPSAwO1xuICAgICAgX3RoaXMyLl9oZXhTaXplID0gMDtcbiAgICAgIHJldHVybiBfdGhpczI7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzQgPSBIZXgucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvNC5kcmF3ID0gZnVuY3Rpb24gZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgYmcgPSBkYXRhWzRdO1xuICAgICAgdmFyIHB4ID0gWyh4ICsgMSkgKiB0aGlzLl9zcGFjaW5nWCwgeSAqIHRoaXMuX3NwYWNpbmdZICsgdGhpcy5faGV4U2l6ZV07XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICBweC5yZXZlcnNlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG5cbiAgICAgICAgdGhpcy5fZmlsbChweFswXSwgcHhbMV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sIHB4WzBdLCBNYXRoLmNlaWwocHhbMV0pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvNC5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgYXZhaWxIZWlnaHQgPSBhdmFpbFdpZHRoIC0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX3NwYWNpbmdYKSAtIDE7XG4gICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxIZWlnaHQgLSAyICogdGhpcy5faGV4U2l6ZSkgLyB0aGlzLl9zcGFjaW5nWSArIDEpO1xuICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNC5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICBhdmFpbFdpZHRoICs9IGF2YWlsSGVpZ2h0O1xuICAgICAgICBhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcbiAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgIH1cblxuICAgICAgdmFyIGhleFNpemVXaWR0aCA9IDIgKiBhdmFpbFdpZHRoIC8gKCh0aGlzLl9vcHRpb25zLndpZHRoICsgMSkgKiBNYXRoLnNxcnQoMykpIC0gMTtcbiAgICAgIHZhciBoZXhTaXplSGVpZ2h0ID0gYXZhaWxIZWlnaHQgLyAoMiArIDEuNSAqICh0aGlzLl9vcHRpb25zLmhlaWdodCAtIDEpKTtcbiAgICAgIHZhciBoZXhTaXplID0gTWF0aC5taW4oaGV4U2l6ZVdpZHRoLCBoZXhTaXplSGVpZ2h0KTsgLy8gY29tcHV0ZSBjaGFyIHJhdGlvXG5cbiAgICAgIHZhciBvbGRGb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICB0aGlzLl9jdHguZm9udCA9IFwiMTAwcHggXCIgKyB0aGlzLl9vcHRpb25zLmZvbnRGYW1pbHk7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICB0aGlzLl9jdHguZm9udCA9IG9sZEZvbnQ7XG4gICAgICB2YXIgcmF0aW8gPSB3aWR0aCAvIDEwMDtcbiAgICAgIGhleFNpemUgPSBNYXRoLmZsb29yKGhleFNpemUpICsgMTsgLy8gY2xvc2VzdCBsYXJnZXIgaGV4U2l6ZVxuICAgICAgLy8gRklYTUUgY2hhciBzaXplIGNvbXB1dGF0aW9uIGRvZXMgbm90IHJlc3BlY3QgdHJhbnNwb3NlZCBoZXhlc1xuXG4gICAgICB2YXIgZm9udFNpemUgPSAyICogaGV4U2l6ZSAvICh0aGlzLl9vcHRpb25zLnNwYWNpbmcgKiAoMSArIHJhdGlvIC8gTWF0aC5zcXJ0KDMpKSk7IC8vIGNsb3Nlc3Qgc21hbGxlciBmb250U2l6ZVxuXG4gICAgICByZXR1cm4gTWF0aC5jZWlsKGZvbnRTaXplKSAtIDE7XG4gICAgfTtcblxuICAgIF9wcm90bzQuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICB2YXIgbm9kZVNpemU7XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICB4ICs9IHk7XG4gICAgICAgIHkgPSB4IC0geTtcbiAgICAgICAgeCAtPSB5O1xuICAgICAgICBub2RlU2l6ZSA9IHRoaXMuX2N0eC5jYW52YXMud2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlU2l6ZSA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICB2YXIgc2l6ZSA9IG5vZGVTaXplIC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQ7XG4gICAgICB5ID0gTWF0aC5mbG9vcih5IC8gc2l6ZSk7XG5cbiAgICAgIGlmIChtb2QoeSwgMikpIHtcbiAgICAgICAgLyogb2RkIHJvdyAqL1xuICAgICAgICB4IC09IHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICB4ID0gMSArIDIgKiBNYXRoLmZsb29yKHggLyAoMiAqIHRoaXMuX3NwYWNpbmdYKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gMiAqIE1hdGguZmxvb3IoeCAvICgyICogdGhpcy5fc3BhY2luZ1gpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFyZ3VtZW50cyBhcmUgcGl4ZWwgdmFsdWVzLiBJZiBcInRyYW5zcG9zZWRcIiBtb2RlIGlzIGVuYWJsZWQsIHRoZW4gdGhlc2UgdHdvIGFyZSBhbHJlYWR5IHN3YXBwZWQuXG4gICAgICovXG5cblxuICAgIF9wcm90bzQuX2ZpbGwgPSBmdW5jdGlvbiBfZmlsbChjeCwgY3kpIHtcbiAgICAgIHZhciBhID0gdGhpcy5faGV4U2l6ZTtcbiAgICAgIHZhciBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgY3R4Lm1vdmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLyAyIC0gYiwgY3kgKyB0aGlzLl9zcGFjaW5nWCAtIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAtIGIsIGN5KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLyAyIC0gYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gYSAvIDIgKyBiLCBjeSAtIHRoaXMuX3NwYWNpbmdYICsgYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSBhICsgYiwgY3kpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4Lm1vdmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIHRoaXMuX3NwYWNpbmdYIC0gYiwgY3kgKyBhIC8gMiAtIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4LCBjeSArIGEgLSBiKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgKyBhIC8gMiAtIGIpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gdGhpcy5fc3BhY2luZ1ggKyBiLCBjeSAtIGEgLyAyICsgYik7XG4gICAgICAgIGN0eC5saW5lVG8oY3gsIGN5IC0gYSArIGIpO1xuICAgICAgfVxuXG4gICAgICBjdHguZmlsbCgpO1xuICAgIH07XG5cbiAgICBfcHJvdG80Ll91cGRhdGVTaXplID0gZnVuY3Rpb24gX3VwZGF0ZVNpemUoKSB7XG4gICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICB2YXIgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgdGhpcy5faGV4U2l6ZSA9IE1hdGguZmxvb3Iob3B0cy5zcGFjaW5nICogKG9wdHMuZm9udFNpemUgKyBjaGFyV2lkdGggLyBNYXRoLnNxcnQoMykpIC8gMik7XG4gICAgICB0aGlzLl9zcGFjaW5nWCA9IHRoaXMuX2hleFNpemUgKiBNYXRoLnNxcnQoMykgLyAyO1xuICAgICAgdGhpcy5fc3BhY2luZ1kgPSB0aGlzLl9oZXhTaXplICogMS41O1xuICAgICAgdmFyIHhwcm9wO1xuICAgICAgdmFyIHlwcm9wO1xuXG4gICAgICBpZiAob3B0cy50cmFuc3Bvc2UpIHtcbiAgICAgICAgeHByb3AgPSBcImhlaWdodFwiO1xuICAgICAgICB5cHJvcCA9IFwid2lkdGhcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgICB5cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2N0eC5jYW52YXNbeHByb3BdID0gTWF0aC5jZWlsKChvcHRzLndpZHRoICsgMSkgKiB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICB0aGlzLl9jdHguY2FudmFzW3lwcm9wXSA9IE1hdGguY2VpbCgob3B0cy5oZWlnaHQgLSAxKSAqIHRoaXMuX3NwYWNpbmdZICsgMiAqIHRoaXMuX2hleFNpemUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gSGV4O1xuICB9KENhbnZhcyk7XG4gIC8qKlxuICAgKiBAY2xhc3MgUmVjdGFuZ3VsYXIgYmFja2VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuXG4gIHZhciBSZWN0ID1cbiAgLyoqIEBjbGFzcyAqL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIFJlY3QgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoX0NhbnZhczIpIHtcbiAgICAgIF9pbmhlcml0c0xvb3NlKFJlY3QsIF9DYW52YXMyKTtcblxuICAgICAgZnVuY3Rpb24gUmVjdCgpIHtcbiAgICAgICAgdmFyIF90aGlzMztcblxuICAgICAgICBfdGhpczMgPSBfQ2FudmFzMi5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzMy5fc3BhY2luZ1ggPSAwO1xuICAgICAgICBfdGhpczMuX3NwYWNpbmdZID0gMDtcbiAgICAgICAgX3RoaXMzLl9jYW52YXNDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gX3RoaXMzO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3Byb3RvNSA9IFJlY3QucHJvdG90eXBlO1xuXG4gICAgICBfcHJvdG81LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgX0NhbnZhczIucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9jYW52YXNDYWNoZSA9IHt9O1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5kcmF3ID0gZnVuY3Rpb24gZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBpZiAoUmVjdC5jYWNoZSkge1xuICAgICAgICAgIHRoaXMuX2RyYXdXaXRoQ2FjaGUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBfcHJvdG81Ll9kcmF3V2l0aENhY2hlID0gZnVuY3Rpb24gX2RyYXdXaXRoQ2FjaGUoZGF0YSkge1xuICAgICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgICB5ID0gZGF0YVsxXSxcbiAgICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICAgIGJnID0gZGF0YVs0XTtcbiAgICAgICAgdmFyIGhhc2ggPSBcIlwiICsgY2ggKyBmZyArIGJnO1xuICAgICAgICB2YXIgY2FudmFzO1xuXG4gICAgICAgIGlmIChoYXNoIGluIHRoaXMuX2NhbnZhc0NhY2hlKSB7XG4gICAgICAgICAgY2FudmFzID0gdGhpcy5fY2FudmFzQ2FjaGVbaGFzaF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLl9zcGFjaW5nWTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KGIsIGIsIGNhbnZhcy53aWR0aCAtIGIsIGNhbnZhcy5oZWlnaHQgLSBiKTtcblxuICAgICAgICAgIGlmIChjaCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGN0eC5maWxsVGV4dChjaGFyc1tpXSwgdGhpcy5fc3BhY2luZ1ggLyAyLCBNYXRoLmNlaWwodGhpcy5fc3BhY2luZ1kgLyAyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGVbaGFzaF0gPSBjYW52YXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCAqIHRoaXMuX3NwYWNpbmdYLCB5ICogdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5fZHJhd05vQ2FjaGUgPSBmdW5jdGlvbiBfZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgICBjaCA9IGRhdGFbMl0sXG4gICAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgICBiZyA9IGRhdGFbNF07XG5cbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgdmFyIGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG5cbiAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoeCAqIHRoaXMuX3NwYWNpbmdYICsgYiwgeSAqIHRoaXMuX3NwYWNpbmdZICsgYiwgdGhpcy5fc3BhY2luZ1ggLSBiLCB0aGlzLl9zcGFjaW5nWSAtIGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgdmFyIGNoYXJzID0gW10uY29uY2F0KGNoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCAoeCArIDAuNSkgKiB0aGlzLl9zcGFjaW5nWCwgTWF0aC5jZWlsKCh5ICsgMC41KSAqIHRoaXMuX3NwYWNpbmdZKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgdmFyIGJveFdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgIHZhciBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICAvKiBjb21wdXRlIGNoYXIgcmF0aW8gKi9cblxuICAgICAgICB2YXIgb2xkRm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IFwiMTAwcHggXCIgKyB0aGlzLl9vcHRpb25zLmZvbnRGYW1pbHk7XG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBvbGRGb250O1xuICAgICAgICB2YXIgcmF0aW8gPSB3aWR0aCAvIDEwMDtcbiAgICAgICAgdmFyIHdpZHRoRnJhY3Rpb24gPSByYXRpbyAqIGJveEhlaWdodCAvIGJveFdpZHRoO1xuXG4gICAgICAgIGlmICh3aWR0aEZyYWN0aW9uID4gMSkge1xuICAgICAgICAgIC8qIHRvbyB3aWRlIHdpdGggY3VycmVudCBhc3BlY3QgcmF0aW8gKi9cbiAgICAgICAgICBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGJveEhlaWdodCAvIHdpZHRoRnJhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5zcGFjaW5nKTtcbiAgICAgIH07XG5cbiAgICAgIF9wcm90bzUuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fc3BhY2luZ1gpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9zcGFjaW5nWSldO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvNS5fdXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIF91cGRhdGVTaXplKCkge1xuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIHZhciBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdYID0gTWF0aC5jZWlsKG9wdHMuc3BhY2luZyAqIGNoYXJXaWR0aCk7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdZID0gTWF0aC5jZWlsKG9wdHMuc3BhY2luZyAqIG9wdHMuZm9udFNpemUpO1xuXG4gICAgICAgIGlmIChvcHRzLmZvcmNlU3F1YXJlUmF0aW8pIHtcbiAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IHRoaXMuX3NwYWNpbmdZID0gTWF0aC5tYXgodGhpcy5fc3BhY2luZ1gsIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMud2lkdGggPSBvcHRzLndpZHRoICogdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiB0aGlzLl9zcGFjaW5nWTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBSZWN0O1xuICAgIH0oQ2FudmFzKTtcblxuICAgIFJlY3QuY2FjaGUgPSBmYWxzZTtcbiAgICByZXR1cm4gUmVjdDtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuXG4gIHZhciBUaWxlID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0NhbnZhczMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShUaWxlLCBfQ2FudmFzMyk7XG5cbiAgICBmdW5jdGlvbiBUaWxlKCkge1xuICAgICAgdmFyIF90aGlzNDtcblxuICAgICAgX3RoaXM0ID0gX0NhbnZhczMuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXM0Ll9jb2xvckNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICByZXR1cm4gX3RoaXM0O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG82ID0gVGlsZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG82LmRyYXcgPSBmdW5jdGlvbiBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICB2YXIgeCA9IGRhdGFbMF0sXG4gICAgICAgICAgeSA9IGRhdGFbMV0sXG4gICAgICAgICAgY2ggPSBkYXRhWzJdLFxuICAgICAgICAgIGZnID0gZGF0YVszXSxcbiAgICAgICAgICBiZyA9IGRhdGFbNF07XG4gICAgICB2YXIgdGlsZVdpZHRoID0gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGg7XG4gICAgICB2YXIgdGlsZUhlaWdodCA9IHRoaXMuX29wdGlvbnMudGlsZUhlaWdodDtcblxuICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgIHRoaXMuX2N0eC5jbGVhclJlY3QoeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuXG4gICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghY2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgdmFyIGZncyA9IFtdLmNvbmNhdChmZyk7XG4gICAgICB2YXIgYmdzID0gW10uY29uY2F0KGJnKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG5cbiAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hhciBcXFwiXCIgKyBjaGFyc1tpXSArIFwiXFxcIiBub3QgZm91bmQgaW4gdGlsZU1hcFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgIC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgIHZhciBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICB2YXIgX2ZnID0gZmdzW2ldO1xuICAgICAgICAgIHZhciBfYmcgPSBiZ3NbaV07XG4gICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5fb3B0aW9ucy50aWxlU2V0LCB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG5cbiAgICAgICAgICBpZiAoX2ZnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBfZmc7XG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoX2JnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBfYmc7XG4gICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBubyBjb2xvcml6aW5nLCBlYXN5XG4gICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZSh0aGlzLl9vcHRpb25zLnRpbGVTZXQsIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvNi5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XG4gICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH07XG5cbiAgICBfcHJvdG82LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGUgYmFja2VuZCBkb2VzIG5vdCB1bmRlcnN0YW5kIGZvbnQgc2l6ZVwiKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNi5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpXTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNi5fdXBkYXRlU2l6ZSA9IGZ1bmN0aW9uIF91cGRhdGVTaXplKCkge1xuICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGggKiBvcHRzLnRpbGVXaWR0aDtcbiAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICB0aGlzLl9jb2xvckNhbnZhcy53aWR0aCA9IG9wdHMudGlsZVdpZHRoO1xuICAgICAgdGhpcy5fY29sb3JDYW52YXMuaGVpZ2h0ID0gb3B0cy50aWxlSGVpZ2h0O1xuICAgIH07XG5cbiAgICByZXR1cm4gVGlsZTtcbiAgfShDYW52YXMpO1xuXG4gIGZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgdmFyIGNhY2hlZCwgcjtcblxuICAgIGlmIChzdHIgaW4gQ0FDSEUpIHtcbiAgICAgIGNhY2hlZCA9IENBQ0hFW3N0cl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdHIuY2hhckF0KDApID09IFwiI1wiKSB7XG4gICAgICAgIC8vIGhleCByZ2JcbiAgICAgICAgdmFyIG1hdGNoZWQgPSBzdHIubWF0Y2goL1swLTlhLWZdL2dpKSB8fCBbXTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IG1hdGNoZWQubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHgsIDE2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT0gMykge1xuICAgICAgICAgIGNhY2hlZCA9IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ICogMTc7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlc1tpICsgMV0gKz0gMTYgKiB2YWx1ZXNbaV07XG4gICAgICAgICAgICB2YWx1ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhY2hlZCA9IHZhbHVlcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyID0gc3RyLm1hdGNoKC9yZ2JcXCgoWzAtOSwgXSspXFwpL2kpKSB7XG4gICAgICAgIC8vIGRlY2ltYWwgcmdiXG4gICAgICAgIGNhY2hlZCA9IHJbMV0uc3BsaXQoL1xccyosXFxzKi8pLm1hcChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgIHJldHVybiBwYXJzZUludCh4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBodG1sIG5hbWVcbiAgICAgICAgY2FjaGVkID0gWzAsIDAsIDBdO1xuICAgICAgfVxuXG4gICAgICBDQUNIRVtzdHJdID0gY2FjaGVkO1xuICAgIH1cblxuICAgIHJldHVybiBjYWNoZWQuc2xpY2UoKTtcbiAgfVxuICAvKipcbiAgICogQWRkIHR3byBvciBtb3JlIGNvbG9yc1xuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGFkZChjb2xvcjEpIHtcbiAgICB2YXIgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG5cbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbG9ycyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBjb2xvcnNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHJlc3VsdFtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogQWRkIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAgICovXG5cblxuICBmdW5jdGlvbiBhZGRfKGNvbG9yMSkge1xuICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgY29sb3JzID0gbmV3IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGNvbG9yc1tfa2V5MyAtIDFdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29sb3IxW2ldICs9IGNvbG9yc1tqXVtpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29sb3IxO1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnNcbiAgICovXG5cblxuICBmdW5jdGlvbiBtdWx0aXBseShjb2xvcjEpIHtcbiAgICB2YXIgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG5cbiAgICBmb3IgKHZhciBfbGVuNCA9IGFyZ3VtZW50cy5sZW5ndGgsIGNvbG9ycyA9IG5ldyBBcnJheShfbGVuNCA+IDEgPyBfbGVuNCAtIDEgOiAwKSwgX2tleTQgPSAxOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICBjb2xvcnNbX2tleTQgLSAxXSA9IGFyZ3VtZW50c1tfa2V5NF07XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHJlc3VsdFtpXSAqPSBjb2xvcnNbal1baV0gLyAyNTU7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHlfKGNvbG9yMSkge1xuICAgIGZvciAodmFyIF9sZW41ID0gYXJndW1lbnRzLmxlbmd0aCwgY29sb3JzID0gbmV3IEFycmF5KF9sZW41ID4gMSA/IF9sZW41IC0gMSA6IDApLCBfa2V5NSA9IDE7IF9rZXk1IDwgX2xlbjU7IF9rZXk1KyspIHtcbiAgICAgIGNvbG9yc1tfa2V5NSAtIDFdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29sb3IxW2ldICo9IGNvbG9yc1tqXVtpXSAvIDI1NTtcbiAgICAgIH1cblxuICAgICAgY29sb3IxW2ldID0gTWF0aC5yb3VuZChjb2xvcjFbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xvcjE7XG4gIH1cbiAgLyoqXG4gICAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoY29sb3IxLCBjb2xvcjIsIGZhY3Rvcikge1xuICAgIGlmIChmYWN0b3IgPT09IHZvaWQgMCkge1xuICAgICAgZmFjdG9yID0gMC41O1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSArIGZhY3RvciAqIChjb2xvcjJbaV0gLSBjb2xvcjFbaV0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGxlcnAgPSBpbnRlcnBvbGF0ZTtcbiAgLyoqXG4gICAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yIGluIEhTTCBtb2RlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGludGVycG9sYXRlSFNMKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IpIHtcbiAgICBpZiAoZmFjdG9yID09PSB2b2lkIDApIHtcbiAgICAgIGZhY3RvciA9IDAuNTtcbiAgICB9XG5cbiAgICB2YXIgaHNsMSA9IHJnYjJoc2woY29sb3IxKTtcbiAgICB2YXIgaHNsMiA9IHJnYjJoc2woY29sb3IyKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBoc2wxW2ldICs9IGZhY3RvciAqIChoc2wyW2ldIC0gaHNsMVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhzbDJyZ2IoaHNsMSk7XG4gIH1cblxuICB2YXIgbGVycEhTTCA9IGludGVycG9sYXRlSFNMO1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHJhbmRvbSBjb2xvciBiYXNlZCBvbiB0aGlzIG9uZVxuICAgKiBAcGFyYW0gY29sb3JcbiAgICogQHBhcmFtIGRpZmYgU2V0IG9mIHN0YW5kYXJkIGRldmlhdGlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gcmFuZG9taXplKGNvbG9yLCBkaWZmKSB7XG4gICAgaWYgKCEoZGlmZiBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgZGlmZiA9IE1hdGgucm91bmQoUk5HJDEuZ2V0Tm9ybWFsKDAsIGRpZmYpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0gY29sb3Iuc2xpY2UoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICByZXN1bHRbaV0gKz0gZGlmZiBpbnN0YW5jZW9mIEFycmF5ID8gTWF0aC5yb3VuZChSTkckMS5nZXROb3JtYWwoMCwgZGlmZltpXSkpIDogZGlmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBFeHBlY3RzIDAuLjI1NSBpbnB1dHMsIHByb2R1Y2VzIDAuLjEgb3V0cHV0cy5cbiAgICovXG5cblxuICBmdW5jdGlvbiByZ2IyaHNsKGNvbG9yKSB7XG4gICAgdmFyIHIgPSBjb2xvclswXSAvIDI1NTtcbiAgICB2YXIgZyA9IGNvbG9yWzFdIC8gMjU1O1xuICAgIHZhciBiID0gY29sb3JbMl0gLyAyNTU7XG4gICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICB2YXIgaCA9IDAsXG4gICAgICAgIHMsXG4gICAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG5cbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG5cbiAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgcjpcbiAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBnOlxuICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBiOlxuICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cbiAgICByZXR1cm4gW2gsIHMsIGxdO1xuICB9XG5cbiAgZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB0ICs9IDE7XG4gICAgaWYgKHQgPiAxKSB0IC09IDE7XG4gICAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgaWYgKHQgPCAxIC8gMikgcmV0dXJuIHE7XG4gICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgIHJldHVybiBwO1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBIU0wgY29sb3IgdmFsdWUgdG8gUkdCLiBFeHBlY3RzIDAuLjEgaW5wdXRzLCBwcm9kdWNlcyAwLi4yNTUgb3V0cHV0cy5cbiAgICovXG5cblxuICBmdW5jdGlvbiBoc2wycmdiKGNvbG9yKSB7XG4gICAgdmFyIGwgPSBjb2xvclsyXTtcblxuICAgIGlmIChjb2xvclsxXSA9PSAwKSB7XG4gICAgICBsID0gTWF0aC5yb3VuZChsICogMjU1KTtcbiAgICAgIHJldHVybiBbbCwgbCwgbF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzID0gY29sb3JbMV07XG4gICAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgICB2YXIgcCA9IDIgKiBsIC0gcTtcbiAgICAgIHZhciByID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSArIDEgLyAzKTtcbiAgICAgIHZhciBnID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSk7XG4gICAgICB2YXIgYiA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gLSAxIC8gMyk7XG4gICAgICByZXR1cm4gW01hdGgucm91bmQociAqIDI1NSksIE1hdGgucm91bmQoZyAqIDI1NSksIE1hdGgucm91bmQoYiAqIDI1NSldO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvUkdCKGNvbG9yKSB7XG4gICAgdmFyIGNsYW1wZWQgPSBjb2xvci5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBjbGFtcCh4LCAwLCAyNTUpO1xuICAgIH0pO1xuICAgIHJldHVybiBcInJnYihcIiArIGNsYW1wZWQuam9pbihcIixcIikgKyBcIilcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvSGV4KGNvbG9yKSB7XG4gICAgdmFyIGNsYW1wZWQgPSBjb2xvci5tYXAoZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBjbGFtcCh4LCAwLCAyNTUpLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFwiI1wiICsgY2xhbXBlZC5qb2luKFwiXCIpO1xuICB9XG5cbiAgdmFyIENBQ0hFID0ge1xuICAgIFwiYmxhY2tcIjogWzAsIDAsIDBdLFxuICAgIFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcbiAgICBcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxuICAgIFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcbiAgICBcImJsdWVcIjogWzAsIDAsIDI1NV0sXG4gICAgXCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXG4gICAgXCJncmVlblwiOiBbMCwgMTI4LCAwXSxcbiAgICBcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcbiAgICBcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXG4gICAgXCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxuICAgIFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxuICAgIFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcbiAgICBcImxpbWVcIjogWzAsIDI1NSwgMF0sXG4gICAgXCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxuICAgIFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXG4gICAgXCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxuICAgIFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcbiAgICBcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXG4gICAgXCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXG4gICAgXCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcbiAgICBcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcbiAgICBcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcbiAgICBcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcbiAgICBcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcbiAgICBcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXG4gICAgXCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxuICAgIFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxuICAgIFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxuICAgIFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXG4gICAgXCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxuICAgIFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxuICAgIFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXG4gICAgXCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXG4gICAgXCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcbiAgICBcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcbiAgICBcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxuICAgIFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcbiAgICBcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcbiAgICBcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgXCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxuICAgIFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcbiAgICBcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXG4gICAgXCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxuICAgIFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxuICAgIFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE2XSxcbiAgICBcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcbiAgICBcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgXCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxuICAgIFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF0sXG4gICAgXCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcbiAgICBcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXG4gICAgXCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxuICAgIFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXG4gICAgXCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcbiAgICBcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxuICAgIFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXG4gICAgXCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxuICAgIFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxuICAgIFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcbiAgICBcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXG4gICAgXCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxuICAgIFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxuICAgIFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXG4gICAgXCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxuICAgIFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxuICAgIFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcbiAgICBcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwicGFsZXZpb2xldHJlZFwiOiBbMjE2LCAxMTIsIDE0N10sXG4gICAgXCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICBcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgXCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXG4gICAgXCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXG4gICAgXCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxuICAgIFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXG4gICAgXCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxuICAgIFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxuICAgIFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICBcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxuICAgIFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXG4gICAgXCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgXCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxuICAgIFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxuICAgIFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxuICAgIFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcbiAgICBcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcbiAgICBcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcbiAgICBcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXG4gICAgXCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgXCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgXCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcbiAgICBcInJlZFwiOiBbMjU1LCAwLCAwXSxcbiAgICBcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxuICAgIFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcbiAgICBcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxuICAgIFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgXCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcbiAgICBcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcbiAgICBcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxuICAgIFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxuICAgIFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxuICAgIFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcbiAgICBcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcbiAgICBcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcbiAgICBcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXG4gICAgXCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxuICAgIFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxuICAgIFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXG4gICAgXCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcbiAgICBcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcbiAgICBcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXG4gICAgXCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXG4gICAgXCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcbiAgICBcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxuICAgIFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxuICAgIFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxuICAgIFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdXG4gIH07XG4gIHZhciBjb2xvciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgT2JqZWN0LmZyZWV6ZSh7XG4gICAgZnJvbVN0cmluZzogZnJvbVN0cmluZyxcbiAgICBhZGQ6IGFkZCxcbiAgICBhZGRfOiBhZGRfLFxuICAgIG11bHRpcGx5OiBtdWx0aXBseSxcbiAgICBtdWx0aXBseV86IG11bHRpcGx5XyxcbiAgICBpbnRlcnBvbGF0ZTogaW50ZXJwb2xhdGUsXG4gICAgbGVycDogbGVycCxcbiAgICBpbnRlcnBvbGF0ZUhTTDogaW50ZXJwb2xhdGVIU0wsXG4gICAgbGVycEhTTDogbGVycEhTTCxcbiAgICByYW5kb21pemU6IHJhbmRvbWl6ZSxcbiAgICByZ2IyaHNsOiByZ2IyaHNsLFxuICAgIGhzbDJyZ2I6IGhzbDJyZ2IsXG4gICAgdG9SR0I6IHRvUkdCLFxuICAgIHRvSGV4OiB0b0hleFxuICB9KTtcbiAgLyoqXG4gICAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdmFyIFRpbGVHTCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9CYWNrZW5kMikge1xuICAgIF9pbmhlcml0c0xvb3NlKFRpbGVHTCwgX0JhY2tlbmQyKTtcblxuICAgIGZ1bmN0aW9uIFRpbGVHTCgpIHtcbiAgICAgIHZhciBfdGhpczU7XG5cbiAgICAgIF90aGlzNSA9IF9CYWNrZW5kMi5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczUuX3VuaWZvcm1zID0ge307XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIF90aGlzNS5fZ2wgPSBfdGhpczUuX2luaXRXZWJHTCgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBhbGVydChlLm1lc3NhZ2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXM1O1xuICAgIH1cblxuICAgIFRpbGVHTC5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHtcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIF9wcm90bzcgPSBUaWxlR0wucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvNy5zY2hlZHVsZSA9IGZ1bmN0aW9uIHNjaGVkdWxlKGNiKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpO1xuICAgIH07XG5cbiAgICBfcHJvdG83LmdldENvbnRhaW5lciA9IGZ1bmN0aW9uIGdldENvbnRhaW5lcigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9nbC5jYW52YXM7XG4gICAgfTtcblxuICAgIF9wcm90bzcuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgIF9CYWNrZW5kMi5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG5cbiAgICAgIHZhciB0aWxlU2V0ID0gdGhpcy5fb3B0aW9ucy50aWxlU2V0O1xuXG4gICAgICBpZiAodGlsZVNldCAmJiBcImNvbXBsZXRlXCIgaW4gdGlsZVNldCAmJiAhdGlsZVNldC5jb21wbGV0ZSkge1xuICAgICAgICB0aWxlU2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM2Ll91cGRhdGVUZXh0dXJlKHRpbGVTZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVRleHR1cmUodGlsZVNldCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzcuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgYmcgPSBkYXRhWzRdO1xuICAgICAgdmFyIHNjaXNzb3JZID0gZ2wuY2FudmFzLmhlaWdodCAtICh5ICsgMSkgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICBnbC5zY2lzc29yKHggKiBvcHRzLnRpbGVXaWR0aCwgc2Npc3NvclksIG9wdHMudGlsZVdpZHRoLCBvcHRzLnRpbGVIZWlnaHQpO1xuXG4gICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbC5jbGVhckNvbG9yLmFwcGx5KGdsLCBwYXJzZUNvbG9yKGJnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjaCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICB2YXIgYmdzID0gW10uY29uY2F0KGJnKTtcbiAgICAgIHZhciBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRhcmdldFBvc1JlbFwiXSwgW3gsIHldKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG5cbiAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2hhciBcXFwiXCIgKyBjaGFyc1tpXSArIFwiXFxcIiBub3QgZm91bmQgaW4gdGlsZU1hcFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdsLnVuaWZvcm0xZih0aGlzLl91bmlmb3Jtc1tcImNvbG9yaXplXCJdLCBvcHRzLnRpbGVDb2xvcml6ZSA/IDEgOiAwKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVzZXRQb3NBYnNcIl0sIHRpbGUpO1xuXG4gICAgICAgIGlmIChvcHRzLnRpbGVDb2xvcml6ZSkge1xuICAgICAgICAgIGdsLnVuaWZvcm00ZnYodGhpcy5fdW5pZm9ybXNbXCJ0aW50XCJdLCBwYXJzZUNvbG9yKGZnc1tpXSkpO1xuICAgICAgICAgIGdsLnVuaWZvcm00ZnYodGhpcy5fdW5pZm9ybXNbXCJiZ1wiXSwgcGFyc2VDb2xvcihiZ3NbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICAgICAgfVxuICAgICAgLypcbiAgICAgIFxuICAgICAgXG4gICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGNoYXJzLmxlbmd0aDtpKyspIHtcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgZmcgPSBmZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gYmdzW2ldO1xuICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMudGlsZVNldCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRpbGVTZXQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgKi9cblxuICAgIH07XG5cbiAgICBfcHJvdG83LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB2YXIgZ2wgPSB0aGlzLl9nbDtcbiAgICAgIGdsLmNsZWFyQ29sb3IuYXBwbHkoZ2wsIHBhcnNlQ29sb3IodGhpcy5fb3B0aW9ucy5iZykpO1xuICAgICAgZ2wuc2Npc3NvcigwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgfTtcblxuICAgIF9wcm90bzcuY29tcHV0ZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgdmFyIGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xuICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5jb21wdXRlRm9udFNpemUgPSBmdW5jdGlvbiBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlIGJhY2tlbmQgZG9lcyBub3QgdW5kZXJzdGFuZCBmb250IHNpemVcIik7XG4gICAgfTtcblxuICAgIF9wcm90bzcuZXZlbnRUb1Bvc2l0aW9uID0gZnVuY3Rpb24gZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgIHZhciBjYW52YXMgPSB0aGlzLl9nbC5jYW52YXM7XG4gICAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgeSAtPSByZWN0LnRvcDtcbiAgICAgIHggKj0gY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aDtcbiAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuXG4gICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBbLTEsIC0xXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfTtcblxuICAgIF9wcm90bzcuX2luaXRXZWJHTCA9IGZ1bmN0aW9uIF9pbml0V2ViR0woKSB7XG4gICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgdmFyIGdsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHtcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5nbCA9IGdsO1xuICAgICAgdmFyIHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKGdsLCBWUywgRlMpO1xuICAgICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgIGNyZWF0ZVF1YWQoZ2wpO1xuICAgICAgVU5JRk9STVMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gX3RoaXM3Ll91bmlmb3Jtc1tuYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBLCBnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgICAgZ2wuZW5hYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgICByZXR1cm4gZ2w7XG4gICAgfTtcblxuICAgIF9wcm90bzcuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XG4gICAgfTtcblxuICAgIF9wcm90bzcuX3VwZGF0ZVNpemUgPSBmdW5jdGlvbiBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xuICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgdmFyIGNhbnZhc1NpemUgPSBbb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoLCBvcHRzLmhlaWdodCAqIG9wdHMudGlsZUhlaWdodF07XG4gICAgICBnbC5jYW52YXMud2lkdGggPSBjYW52YXNTaXplWzBdO1xuICAgICAgZ2wuY2FudmFzLmhlaWdodCA9IGNhbnZhc1NpemVbMV07XG4gICAgICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXNTaXplWzBdLCBjYW52YXNTaXplWzFdKTtcbiAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0aWxlU2l6ZVwiXSwgW29wdHMudGlsZVdpZHRoLCBvcHRzLnRpbGVIZWlnaHRdKTtcbiAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0YXJnZXRTaXplXCJdLCBjYW52YXNTaXplKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvNy5fdXBkYXRlVGV4dHVyZSA9IGZ1bmN0aW9uIF91cGRhdGVUZXh0dXJlKHRpbGVTZXQpIHtcbiAgICAgIGNyZWF0ZVRleHR1cmUodGhpcy5fZ2wsIHRpbGVTZXQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gVGlsZUdMO1xuICB9KEJhY2tlbmQpO1xuXG4gIHZhciBVTklGT1JNUyA9IFtcInRhcmdldFBvc1JlbFwiLCBcInRpbGVzZXRQb3NBYnNcIiwgXCJ0aWxlU2l6ZVwiLCBcInRhcmdldFNpemVcIiwgXCJjb2xvcml6ZVwiLCBcImJnXCIsIFwidGludFwiXTtcbiAgdmFyIFZTID0gXCJcXG4jdmVyc2lvbiAzMDAgZXNcXG5cXG5pbiB2ZWMyIHRpbGVQb3NSZWw7XFxub3V0IHZlYzIgdGlsZXNldFBvc1B4O1xcblxcbnVuaWZvcm0gdmVjMiB0aWxlc2V0UG9zQWJzO1xcbnVuaWZvcm0gdmVjMiB0aWxlU2l6ZTtcXG51bmlmb3JtIHZlYzIgdGFyZ2V0U2l6ZTtcXG51bmlmb3JtIHZlYzIgdGFyZ2V0UG9zUmVsO1xcblxcbnZvaWQgbWFpbigpIHtcXG5cXHR2ZWMyIHRhcmdldFBvc1B4ID0gKHRhcmdldFBvc1JlbCArIHRpbGVQb3NSZWwpICogdGlsZVNpemU7XFxuXFx0dmVjMiB0YXJnZXRQb3NOZGMgPSAoKHRhcmdldFBvc1B4IC8gdGFyZ2V0U2l6ZSktMC41KSoyLjA7XFxuXFx0dGFyZ2V0UG9zTmRjLnkgKj0gLTEuMDtcXG5cXG5cXHRnbF9Qb3NpdGlvbiA9IHZlYzQodGFyZ2V0UG9zTmRjLCAwLjAsIDEuMCk7XFxuXFx0dGlsZXNldFBvc1B4ID0gdGlsZXNldFBvc0FicyArIHRpbGVQb3NSZWwgKiB0aWxlU2l6ZTtcXG59XCIudHJpbSgpO1xuICB2YXIgRlMgPSBcIlxcbiN2ZXJzaW9uIDMwMCBlc1xcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcXG5cXG5pbiB2ZWMyIHRpbGVzZXRQb3NQeDtcXG5vdXQgdmVjNCBmcmFnQ29sb3I7XFxudW5pZm9ybSBzYW1wbGVyMkQgaW1hZ2U7XFxudW5pZm9ybSBib29sIGNvbG9yaXplO1xcbnVuaWZvcm0gdmVjNCBiZztcXG51bmlmb3JtIHZlYzQgdGludDtcXG5cXG52b2lkIG1haW4oKSB7XFxuXFx0ZnJhZ0NvbG9yID0gdmVjNCgwLCAwLCAwLCAxKTtcXG5cXG5cXHR2ZWM0IHRleGVsID0gdGV4ZWxGZXRjaChpbWFnZSwgaXZlYzIodGlsZXNldFBvc1B4KSwgMCk7XFxuXFxuXFx0aWYgKGNvbG9yaXplKSB7XFxuXFx0XFx0dGV4ZWwucmdiID0gdGludC5hICogdGludC5yZ2IgKyAoMS4wLXRpbnQuYSkgKiB0ZXhlbC5yZ2I7XFxuXFx0XFx0ZnJhZ0NvbG9yLnJnYiA9IHRleGVsLmEqdGV4ZWwucmdiICsgKDEuMC10ZXhlbC5hKSpiZy5yZ2I7XFxuXFx0XFx0ZnJhZ0NvbG9yLmEgPSB0ZXhlbC5hICsgKDEuMC10ZXhlbC5hKSpiZy5hO1xcblxcdH0gZWxzZSB7XFxuXFx0XFx0ZnJhZ0NvbG9yID0gdGV4ZWw7XFxuXFx0fVxcbn1cIi50cmltKCk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgdnNzLCBmc3MpIHtcbiAgICB2YXIgdnMgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKHZzLCB2c3MpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodnMpO1xuXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2codnMpIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHZhciBmcyA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcywgZnNzKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZzKTtcblxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZzLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKGZzKSB8fCBcIlwiKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocCwgdnMpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwLCBmcyk7XG4gICAgZ2wubGlua1Byb2dyYW0ocCk7XG5cbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocCwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocCkgfHwgXCJcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVRdWFkKGdsKSB7XG4gICAgdmFyIHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDAsIDEsIDEsIDFdKTtcbiAgICB2YXIgYnVmID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1Zik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBvcywgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoMCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRleHR1cmUoZ2wsIGRhdGEpIHtcbiAgICB2YXIgdCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAwKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHJldHVybiB0O1xuICB9XG5cbiAgdmFyIGNvbG9yQ2FjaGUgPSB7fTtcblxuICBmdW5jdGlvbiBwYXJzZUNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKCEoY29sb3IgaW4gY29sb3JDYWNoZSkpIHtcbiAgICAgIHZhciBwYXJzZWQ7XG5cbiAgICAgIGlmIChjb2xvciA9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgcGFyc2VkID0gWzAsIDAsIDAsIDBdO1xuICAgICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKFwicmdiYVwiKSA+IC0xKSB7XG4gICAgICAgIHBhcnNlZCA9IChjb2xvci5tYXRjaCgvW1xcZC5dKy9nKSB8fCBbXSkubWFwKE51bWJlcik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICBwYXJzZWRbaV0gPSBwYXJzZWRbaV0gLyAyNTU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZCA9IGZyb21TdHJpbmcoY29sb3IpLm1hcChmdW5jdGlvbiAoJCkge1xuICAgICAgICAgIHJldHVybiAkIC8gMjU1O1xuICAgICAgICB9KTtcbiAgICAgICAgcGFyc2VkLnB1c2goMSk7XG4gICAgICB9XG5cbiAgICAgIGNvbG9yQ2FjaGVbY29sb3JdID0gcGFyc2VkO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xvckNhY2hlW2NvbG9yXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVG9BbnNpKGJnKSB7XG4gICAgcmV0dXJuIFwiXFx4MUJbMDs0ODs1O1wiICsgdGVybWNvbG9yKGJnKSArIFwibVxceDFCWzJKXCI7XG4gIH1cblxuICBmdW5jdGlvbiBjb2xvclRvQW5zaShmZywgYmcpIHtcbiAgICByZXR1cm4gXCJcXHgxQlswOzM4OzU7XCIgKyB0ZXJtY29sb3IoZmcpICsgXCI7NDg7NTtcIiArIHRlcm1jb2xvcihiZykgKyBcIm1cIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvc2l0aW9uVG9BbnNpKHgsIHkpIHtcbiAgICByZXR1cm4gXCJcXHgxQltcIiArICh5ICsgMSkgKyBcIjtcIiArICh4ICsgMSkgKyBcIkhcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRlcm1jb2xvcihjb2xvcikge1xuICAgIHZhciBTUkNfQ09MT1JTID0gMjU2LjA7XG4gICAgdmFyIERTVF9DT0xPUlMgPSA2LjA7XG4gICAgdmFyIENPTE9SX1JBVElPID0gRFNUX0NPTE9SUyAvIFNSQ19DT0xPUlM7XG4gICAgdmFyIHJnYiA9IGZyb21TdHJpbmcoY29sb3IpO1xuICAgIHZhciByID0gTWF0aC5mbG9vcihyZ2JbMF0gKiBDT0xPUl9SQVRJTyk7XG4gICAgdmFyIGcgPSBNYXRoLmZsb29yKHJnYlsxXSAqIENPTE9SX1JBVElPKTtcbiAgICB2YXIgYiA9IE1hdGguZmxvb3IocmdiWzJdICogQ09MT1JfUkFUSU8pO1xuICAgIHJldHVybiByICogMzYgKyBnICogNiArIGIgKiAxICsgMTY7XG4gIH1cblxuICB2YXIgVGVybSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9CYWNrZW5kMykge1xuICAgIF9pbmhlcml0c0xvb3NlKFRlcm0sIF9CYWNrZW5kMyk7XG5cbiAgICBmdW5jdGlvbiBUZXJtKCkge1xuICAgICAgdmFyIF90aGlzODtcblxuICAgICAgX3RoaXM4ID0gX0JhY2tlbmQzLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzOC5fb2Zmc2V0ID0gWzAsIDBdO1xuICAgICAgX3RoaXM4Ll9jdXJzb3IgPSBbLTEsIC0xXTtcbiAgICAgIF90aGlzOC5fbGFzdENvbG9yID0gXCJcIjtcbiAgICAgIHJldHVybiBfdGhpczg7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzggPSBUZXJtLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzguc2NoZWR1bGUgPSBmdW5jdGlvbiBzY2hlZHVsZShjYikge1xuICAgICAgc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvOC5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICBfQmFja2VuZDMucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHNpemUgPSBbb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHRdO1xuICAgICAgdmFyIGF2YWlsID0gdGhpcy5jb21wdXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fb2Zmc2V0ID0gYXZhaWwubWFwKGZ1bmN0aW9uICh2YWwsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCh2YWwgLSBzaXplW2luZGV4XSkgLyAyKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG84LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjbGVhclRvQW5zaSh0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgfTtcblxuICAgIF9wcm90bzguZHJhdyA9IGZ1bmN0aW9uIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGVyZSB0byBkcmF3IHdoYXQgd2l0aCB3aGF0IGNvbG9yc1xuICAgICAgdmFyIHggPSBkYXRhWzBdLFxuICAgICAgICAgIHkgPSBkYXRhWzFdLFxuICAgICAgICAgIGNoID0gZGF0YVsyXSxcbiAgICAgICAgICBmZyA9IGRhdGFbM10sXG4gICAgICAgICAgYmcgPSBkYXRhWzRdOyAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBtb3ZlIHRoZSB0ZXJtaW5hbCBjdXJzb3JcblxuICAgICAgdmFyIGR4ID0gdGhpcy5fb2Zmc2V0WzBdICsgeDtcbiAgICAgIHZhciBkeSA9IHRoaXMuX29mZnNldFsxXSArIHk7XG4gICAgICB2YXIgc2l6ZSA9IHRoaXMuY29tcHV0ZVNpemUoKTtcblxuICAgICAgaWYgKGR4IDwgMCB8fCBkeCA+PSBzaXplWzBdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5IDwgMCB8fCBkeSA+PSBzaXplWzFdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGR4ICE9PSB0aGlzLl9jdXJzb3JbMF0gfHwgZHkgIT09IHRoaXMuX2N1cnNvclsxXSkge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShwb3NpdGlvblRvQW5zaShkeCwgZHkpKTtcbiAgICAgICAgdGhpcy5fY3Vyc29yWzBdID0gZHg7XG4gICAgICAgIHRoaXMuX2N1cnNvclsxXSA9IGR5O1xuICAgICAgfSAvLyB0ZXJtaW5hbHMgYXV0b21hdGljYWxseSBjbGVhciwgYnV0IGlmIHdlJ3JlIGNsZWFyaW5nIHdoZW4gd2UncmVcbiAgICAgIC8vIG5vdCBvdGhlcndpc2UgcHJvdmlkZWQgd2l0aCBhIGNoYXJhY3RlciwganVzdCB1c2UgYSBzcGFjZSBpbnN0ZWFkXG5cblxuICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICBjaCA9IFwiIFwiO1xuICAgICAgICB9XG4gICAgICB9IC8vIGlmIHdlJ3JlIG5vdCBjbGVhcmluZyBhbmQgbm90IHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGRvIG5vdGhpbmdcblxuXG4gICAgICBpZiAoIWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gZGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY2hhbmdlIGNvbG9yc1xuXG5cbiAgICAgIHZhciBuZXdDb2xvciA9IGNvbG9yVG9BbnNpKGZnLCBiZyk7XG5cbiAgICAgIGlmIChuZXdDb2xvciAhPT0gdGhpcy5fbGFzdENvbG9yKSB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG5ld0NvbG9yKTtcbiAgICAgICAgdGhpcy5fbGFzdENvbG9yID0gbmV3Q29sb3I7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaCAhPSAnXFx0Jykge1xuICAgICAgICAvLyB3cml0ZSB0aGUgcHJvdmlkZWQgc3ltYm9sIHRvIHRoZSBkaXNwbGF5XG4gICAgICAgIHZhciBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNoYXJzWzBdKTtcbiAgICAgIH0gLy8gdXBkYXRlIG91ciBwb3NpdGlvbiwgZ2l2ZW4gdGhhdCB3ZSB3cm90ZSBhIGNoYXJhY3RlclxuXG5cbiAgICAgIHRoaXMuX2N1cnNvclswXSsrO1xuXG4gICAgICBpZiAodGhpcy5fY3Vyc29yWzBdID49IHNpemVbMF0pIHtcbiAgICAgICAgdGhpcy5fY3Vyc29yWzBdID0gMDtcbiAgICAgICAgdGhpcy5fY3Vyc29yWzFdKys7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzguY29tcHV0ZUZvbnRTaXplID0gZnVuY3Rpb24gY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGVybWluYWwgYmFja2VuZCBoYXMgbm8gbm90aW9uIG9mIGZvbnQgc2l6ZVwiKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvOC5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvOC5jb21wdXRlU2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVTaXplKCkge1xuICAgICAgcmV0dXJuIFtwcm9jZXNzLnN0ZG91dC5jb2x1bW5zLCBwcm9jZXNzLnN0ZG91dC5yb3dzXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFRlcm07XG4gIH0oQmFja2VuZCk7XG4gIC8qKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqIENvbnRhaW5zIHRleHQgdG9rZW5pemF0aW9uIGFuZCBicmVha2luZyByb3V0aW5lc1xuICAgKi9cblxuXG4gIHZhciBSRV9DT0xPUlMgPSAvJShbYmNdKXsoW159XSopfS9nOyAvLyB0b2tlbiB0eXBlc1xuXG4gIHZhciBUWVBFX1RFWFQgPSAwO1xuICB2YXIgVFlQRV9ORVdMSU5FID0gMTtcbiAgdmFyIFRZUEVfRkcgPSAyO1xuICB2YXIgVFlQRV9CRyA9IDM7XG4gIC8qKlxuICAgKiBNZWFzdXJlIHNpemUgb2YgYSByZXN1bHRpbmcgdGV4dCBibG9ja1xuICAgKi9cblxuICBmdW5jdGlvbiBtZWFzdXJlKHN0ciwgbWF4V2lkdGgpIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDFcbiAgICB9O1xuICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZShzdHIsIG1heFdpZHRoKTtcbiAgICB2YXIgbGluZVdpZHRoID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICBjYXNlIFRZUEVfVEVYVDpcbiAgICAgICAgICBsaW5lV2lkdGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgIHJlc3VsdC5oZWlnaHQrKztcbiAgICAgICAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgICAgICAgbGluZVdpZHRoID0gMDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogQ29udmVydCBzdHJpbmcgdG8gYSBzZXJpZXMgb2YgYSBmb3JtYXR0aW5nIGNvbW1hbmRzXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAvKiBmaXJzdCB0b2tlbml6YXRpb24gcGFzcyAtIHNwbGl0IHRleHRzIGFuZCBjb2xvciBmb3JtYXR0aW5nIGNvbW1hbmRzICovXG5cbiAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICBzdHIucmVwbGFjZShSRV9DT0xPUlMsIGZ1bmN0aW9uIChtYXRjaCwgdHlwZSwgbmFtZSwgaW5kZXgpIHtcbiAgICAgIC8qIHN0cmluZyBiZWZvcmUgKi9cbiAgICAgIHZhciBwYXJ0ID0gc3RyLnN1YnN0cmluZyhvZmZzZXQsIGluZGV4KTtcblxuICAgICAgaWYgKHBhcnQubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvKiBjb2xvciBjb21tYW5kICovXG5cblxuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICB0eXBlOiB0eXBlID09IFwiY1wiID8gVFlQRV9GRyA6IFRZUEVfQkcsXG4gICAgICAgIHZhbHVlOiBuYW1lLnRyaW0oKVxuICAgICAgfSk7XG4gICAgICBvZmZzZXQgPSBpbmRleCArIG1hdGNoLmxlbmd0aDtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0pO1xuICAgIC8qIGxhc3QgcmVtYWluaW5nIHBhcnQgKi9cblxuICAgIHZhciBwYXJ0ID0gc3RyLnN1YnN0cmluZyhvZmZzZXQpO1xuXG4gICAgaWYgKHBhcnQubGVuZ3RoKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBicmVha0xpbmVzKHJlc3VsdCwgbWF4V2lkdGgpO1xuICB9XG4gIC8qIGluc2VydCBsaW5lIGJyZWFrcyBpbnRvIGZpcnN0LXBhc3MgdG9rZW5pemVkIGRhdGEgKi9cblxuXG4gIGZ1bmN0aW9uIGJyZWFrTGluZXModG9rZW5zLCBtYXhXaWR0aCkge1xuICAgIGlmICghbWF4V2lkdGgpIHtcbiAgICAgIG1heFdpZHRoID0gSW5maW5pdHk7XG4gICAgfVxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsaW5lTGVuZ3RoID0gMDtcbiAgICB2YXIgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG5cbiAgICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHtcbiAgICAgIC8qIHRha2UgYWxsIHRleHQgdG9rZW5zLCByZW1vdmUgc3BhY2UsIGFwcGx5IGxpbmVicmVha3MgKi9cbiAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuLnR5cGUgPT0gVFlQRV9ORVdMSU5FKSB7XG4gICAgICAgIC8qIHJlc2V0ICovXG4gICAgICAgIGxpbmVMZW5ndGggPSAwO1xuICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnR5cGUgIT0gVFlQRV9URVhUKSB7XG4gICAgICAgIC8qIHNraXAgbm9uLXRleHQgdG9rZW5zICovXG4gICAgICAgIGkrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvKiByZW1vdmUgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgbGluZSAqL1xuXG5cbiAgICAgIHdoaWxlIChsaW5lTGVuZ3RoID09IDAgJiYgdG9rZW4udmFsdWUuY2hhckF0KDApID09IFwiIFwiKSB7XG4gICAgICAgIHRva2VuLnZhbHVlID0gdG9rZW4udmFsdWUuc3Vic3RyaW5nKDEpO1xuICAgICAgfVxuICAgICAgLyogZm9yY2VkIG5ld2xpbmU/IGluc2VydCB0d28gbmV3IHRva2VucyBhZnRlciB0aGlzIG9uZSAqL1xuXG5cbiAgICAgIHZhciBfaW5kZXgyID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIlxcblwiKTtcblxuICAgICAgaWYgKF9pbmRleDIgIT0gLTEpIHtcbiAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgX2luZGV4MiwgdHJ1ZSk7XG4gICAgICAgIC8qIGlmIHRoZXJlIGFyZSBzcGFjZXMgYXQgdGhlIGVuZCwgd2UgbXVzdCByZW1vdmUgdGhlbSAod2UgZG8gbm90IHdhbnQgdGhlIGxpbmUgdG9vIGxvbmcpICovXG5cbiAgICAgICAgdmFyIGFyciA9IHRva2VuLnZhbHVlLnNwbGl0KFwiXCIpO1xuXG4gICAgICAgIHdoaWxlIChhcnIubGVuZ3RoICYmIGFyclthcnIubGVuZ3RoIC0gMV0gPT0gXCIgXCIpIHtcbiAgICAgICAgICBhcnIucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0b2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgfVxuICAgICAgLyogdG9rZW4gZGVnZW5lcmF0ZWQ/ICovXG5cblxuICAgICAgaWYgKCF0b2tlbi52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaW5lTGVuZ3RoICsgdG9rZW4udmFsdWUubGVuZ3RoID4gbWF4V2lkdGgpIHtcbiAgICAgICAgLyogbGluZSB0b28gbG9uZywgZmluZCBhIHN1aXRhYmxlIGJyZWFraW5nIHNwb3QgKi9cblxuICAgICAgICAvKiBpcyBpdCBwb3NzaWJsZSB0byBicmVhayB3aXRoaW4gdGhpcyB0b2tlbj8gKi9cbiAgICAgICAgdmFyIF9pbmRleDMgPSAtMTtcblxuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIHZhciBuZXh0SW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiLCBfaW5kZXgzICsgMSk7XG5cbiAgICAgICAgICBpZiAobmV4dEluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGluZUxlbmd0aCArIG5leHRJbmRleCA+IG1heFdpZHRoKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBfaW5kZXgzID0gbmV4dEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9pbmRleDMgIT0gLTEpIHtcbiAgICAgICAgICAvKiBicmVhayBhdCBzcGFjZSB3aXRoaW4gdGhpcyBvbmUgKi9cbiAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBfaW5kZXgzLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0VG9rZW5XaXRoU3BhY2UgIT0gLTEpIHtcbiAgICAgICAgICAvKiBpcyB0aGVyZSBhIHByZXZpb3VzIHRva2VuIHdoZXJlIGEgYnJlYWsgY2FuIG9jY3VyPyAqL1xuICAgICAgICAgIHZhciBfdG9rZW4gPSB0b2tlbnNbbGFzdFRva2VuV2l0aFNwYWNlXTtcblxuICAgICAgICAgIHZhciBicmVha0luZGV4ID0gX3Rva2VuLnZhbHVlLmxhc3RJbmRleE9mKFwiIFwiKTtcblxuICAgICAgICAgIF90b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBsYXN0VG9rZW5XaXRoU3BhY2UsIGJyZWFrSW5kZXgsIHRydWUpO1xuICAgICAgICAgIGkgPSBsYXN0VG9rZW5XaXRoU3BhY2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogZm9yY2UgYnJlYWsgaW4gdGhpcyB0b2tlbiAqL1xuICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIG1heFdpZHRoIC0gbGluZUxlbmd0aCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBsaW5lIG5vdCBsb25nLCBjb250aW51ZSAqL1xuICAgICAgICBsaW5lTGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcblxuICAgICAgICBpZiAodG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIikgIT0gLTEpIHtcbiAgICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICAgIC8qIGFkdmFuY2UgdG8gbmV4dCB0b2tlbiAqL1xuICAgIH1cblxuICAgIHRva2Vucy5wdXNoKHtcbiAgICAgIHR5cGU6IFRZUEVfTkVXTElORVxuICAgIH0pO1xuICAgIC8qIGluc2VydCBmYWtlIG5ld2xpbmUgdG8gZml4IHRoZSBsYXN0IHRleHQgbGluZSAqL1xuXG4gICAgLyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlIGZyb20gdGV4dCB0b2tlbnMgYmVmb3JlIG5ld2xpbmVzICovXG5cbiAgICB2YXIgbGFzdFRleHRUb2tlbiA9IG51bGw7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgdG9rZW5zLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF90b2tlbjIgPSB0b2tlbnNbX2ldO1xuXG4gICAgICBzd2l0Y2ggKF90b2tlbjIudHlwZSkge1xuICAgICAgICBjYXNlIFRZUEVfVEVYVDpcbiAgICAgICAgICBsYXN0VGV4dFRva2VuID0gX3Rva2VuMjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICBpZiAobGFzdFRleHRUb2tlbikge1xuICAgICAgICAgICAgLyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlICovXG4gICAgICAgICAgICB2YXIgX2FyciA9IGxhc3RUZXh0VG9rZW4udmFsdWUuc3BsaXQoXCJcIik7XG5cbiAgICAgICAgICAgIHdoaWxlIChfYXJyLmxlbmd0aCAmJiBfYXJyW19hcnIubGVuZ3RoIC0gMV0gPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgX2Fyci5wb3AoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFzdFRleHRUb2tlbi52YWx1ZSA9IF9hcnIuam9pbihcIlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsYXN0VGV4dFRva2VuID0gbnVsbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0b2tlbnMucG9wKCk7XG4gICAgLyogcmVtb3ZlIGZha2UgdG9rZW4gKi9cblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBuZXcgdG9rZW5zIGFuZCBpbnNlcnQgdGhlbSBpbnRvIHRoZSBzdHJlYW1cbiAgICogQHBhcmFtIHtvYmplY3RbXX0gdG9rZW5zXG4gICAqIEBwYXJhbSB7aW50fSB0b2tlbkluZGV4IFRva2VuIGJlaW5nIHByb2Nlc3NlZFxuICAgKiBAcGFyYW0ge2ludH0gYnJlYWtJbmRleCBJbmRleCB3aXRoaW4gY3VycmVudCB0b2tlbidzIHZhbHVlXG4gICAqIEBwYXJhbSB7Ym9vbH0gcmVtb3ZlQnJlYWtDaGFyIERvIHdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBicmVha2luZyBjaGFyYWN0ZXI/XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IHJlbWFpbmluZyB1bmJyb2tlbiB0b2tlbiB2YWx1ZVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCB0b2tlbkluZGV4LCBicmVha0luZGV4LCByZW1vdmVCcmVha0NoYXIpIHtcbiAgICB2YXIgbmV3QnJlYWtUb2tlbiA9IHtcbiAgICAgIHR5cGU6IFRZUEVfTkVXTElORVxuICAgIH07XG4gICAgdmFyIG5ld1RleHRUb2tlbiA9IHtcbiAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgIHZhbHVlOiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKGJyZWFrSW5kZXggKyAocmVtb3ZlQnJlYWtDaGFyID8gMSA6IDApKVxuICAgIH07XG4gICAgdG9rZW5zLnNwbGljZSh0b2tlbkluZGV4ICsgMSwgMCwgbmV3QnJlYWtUb2tlbiwgbmV3VGV4dFRva2VuKTtcbiAgICByZXR1cm4gdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZygwLCBicmVha0luZGV4KTtcbiAgfVxuXG4gIHZhciB0ZXh0ID1cbiAgLyojX19QVVJFX18qL1xuICBPYmplY3QuZnJlZXplKHtcbiAgICBUWVBFX1RFWFQ6IFRZUEVfVEVYVCxcbiAgICBUWVBFX05FV0xJTkU6IFRZUEVfTkVXTElORSxcbiAgICBUWVBFX0ZHOiBUWVBFX0ZHLFxuICAgIFRZUEVfQkc6IFRZUEVfQkcsXG4gICAgbWVhc3VyZTogbWVhc3VyZSxcbiAgICB0b2tlbml6ZTogdG9rZW5pemVcbiAgfSk7XG4gIC8qKiBEZWZhdWx0IHdpdGggZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXG5cbiAgdmFyIERFRkFVTFRfV0lEVEggPSA4MDtcbiAgLyoqIERlZmF1bHQgaGVpZ2h0IGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuXG4gIHZhciBERUZBVUxUX0hFSUdIVCA9IDI1O1xuICB2YXIgRElSUyA9IHtcbiAgICA0OiBbWzAsIC0xXSwgWzEsIDBdLCBbMCwgMV0sIFstMSwgMF1dLFxuICAgIDg6IFtbMCwgLTFdLCBbMSwgLTFdLCBbMSwgMF0sIFsxLCAxXSwgWzAsIDFdLCBbLTEsIDFdLCBbLTEsIDBdLCBbLTEsIC0xXV0sXG4gICAgNjogW1stMSwgLTFdLCBbMSwgLTFdLCBbMiwgMF0sIFsxLCAxXSwgWy0xLCAxXSwgWy0yLCAwXV1cbiAgfTtcbiAgdmFyIEtFWVMgPSB7XG4gICAgLyoqIENhbmNlbCBrZXkuICovXG4gICAgVktfQ0FOQ0VMOiAzLFxuXG4gICAgLyoqIEhlbHAga2V5LiAqL1xuICAgIFZLX0hFTFA6IDYsXG5cbiAgICAvKiogQmFja3NwYWNlIGtleS4gKi9cbiAgICBWS19CQUNLX1NQQUNFOiA4LFxuXG4gICAgLyoqIFRhYiBrZXkuICovXG4gICAgVktfVEFCOiA5LFxuXG4gICAgLyoqIDUga2V5IG9uIE51bXBhZCB3aGVuIE51bUxvY2sgaXMgdW5sb2NrZWQuIE9yIG9uIE1hYywgY2xlYXIga2V5IHdoaWNoIGlzIHBvc2l0aW9uZWQgYXQgTnVtTG9jayBrZXkuICovXG4gICAgVktfQ0xFQVI6IDEyLFxuXG4gICAgLyoqIFJldHVybi9lbnRlciBrZXkgb24gdGhlIG1haW4ga2V5Ym9hcmQuICovXG4gICAgVktfUkVUVVJOOiAxMyxcblxuICAgIC8qKiBSZXNlcnZlZCwgYnV0IG5vdCB1c2VkLiAqL1xuICAgIFZLX0VOVEVSOiAxNCxcblxuICAgIC8qKiBTaGlmdCBrZXkuICovXG4gICAgVktfU0hJRlQ6IDE2LFxuXG4gICAgLyoqIENvbnRyb2wga2V5LiAqL1xuICAgIFZLX0NPTlRST0w6IDE3LFxuXG4gICAgLyoqIEFsdCAoT3B0aW9uIG9uIE1hYykga2V5LiAqL1xuICAgIFZLX0FMVDogMTgsXG5cbiAgICAvKiogUGF1c2Uga2V5LiAqL1xuICAgIFZLX1BBVVNFOiAxOSxcblxuICAgIC8qKiBDYXBzIGxvY2suICovXG4gICAgVktfQ0FQU19MT0NLOiAyMCxcblxuICAgIC8qKiBFc2NhcGUga2V5LiAqL1xuICAgIFZLX0VTQ0FQRTogMjcsXG5cbiAgICAvKiogU3BhY2UgYmFyLiAqL1xuICAgIFZLX1NQQUNFOiAzMixcblxuICAgIC8qKiBQYWdlIFVwIGtleS4gKi9cbiAgICBWS19QQUdFX1VQOiAzMyxcblxuICAgIC8qKiBQYWdlIERvd24ga2V5LiAqL1xuICAgIFZLX1BBR0VfRE9XTjogMzQsXG5cbiAgICAvKiogRW5kIGtleS4gKi9cbiAgICBWS19FTkQ6IDM1LFxuXG4gICAgLyoqIEhvbWUga2V5LiAqL1xuICAgIFZLX0hPTUU6IDM2LFxuXG4gICAgLyoqIExlZnQgYXJyb3cuICovXG4gICAgVktfTEVGVDogMzcsXG5cbiAgICAvKiogVXAgYXJyb3cuICovXG4gICAgVktfVVA6IDM4LFxuXG4gICAgLyoqIFJpZ2h0IGFycm93LiAqL1xuICAgIFZLX1JJR0hUOiAzOSxcblxuICAgIC8qKiBEb3duIGFycm93LiAqL1xuICAgIFZLX0RPV046IDQwLFxuXG4gICAgLyoqIFByaW50IFNjcmVlbiBrZXkuICovXG4gICAgVktfUFJJTlRTQ1JFRU46IDQ0LFxuXG4gICAgLyoqIElucyhlcnQpIGtleS4gKi9cbiAgICBWS19JTlNFUlQ6IDQ1LFxuXG4gICAgLyoqIERlbChldGUpIGtleS4gKi9cbiAgICBWS19ERUxFVEU6IDQ2LFxuXG4gICAgLyoqKi9cbiAgICBWS18wOiA0OCxcblxuICAgIC8qKiovXG4gICAgVktfMTogNDksXG5cbiAgICAvKioqL1xuICAgIFZLXzI6IDUwLFxuXG4gICAgLyoqKi9cbiAgICBWS18zOiA1MSxcblxuICAgIC8qKiovXG4gICAgVktfNDogNTIsXG5cbiAgICAvKioqL1xuICAgIFZLXzU6IDUzLFxuXG4gICAgLyoqKi9cbiAgICBWS182OiA1NCxcblxuICAgIC8qKiovXG4gICAgVktfNzogNTUsXG5cbiAgICAvKioqL1xuICAgIFZLXzg6IDU2LFxuXG4gICAgLyoqKi9cbiAgICBWS185OiA1NyxcblxuICAgIC8qKiBDb2xvbiAoOikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ09MT046IDU4LFxuXG4gICAgLyoqIFNlbWljb2xvbiAoOykga2V5LiAqL1xuICAgIFZLX1NFTUlDT0xPTjogNTksXG5cbiAgICAvKiogTGVzcy10aGFuICg8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19MRVNTX1RIQU46IDYwLFxuXG4gICAgLyoqIEVxdWFscyAoPSkga2V5LiAqL1xuICAgIFZLX0VRVUFMUzogNjEsXG5cbiAgICAvKiogR3JlYXRlci10aGFuICg+KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19HUkVBVEVSX1RIQU46IDYyLFxuXG4gICAgLyoqIFF1ZXN0aW9uIG1hcmsgKD8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1FVRVNUSU9OX01BUks6IDYzLFxuXG4gICAgLyoqIEF0bWFyayAoQCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQVQ6IDY0LFxuXG4gICAgLyoqKi9cbiAgICBWS19BOiA2NSxcblxuICAgIC8qKiovXG4gICAgVktfQjogNjYsXG5cbiAgICAvKioqL1xuICAgIFZLX0M6IDY3LFxuXG4gICAgLyoqKi9cbiAgICBWS19EOiA2OCxcblxuICAgIC8qKiovXG4gICAgVktfRTogNjksXG5cbiAgICAvKioqL1xuICAgIFZLX0Y6IDcwLFxuXG4gICAgLyoqKi9cbiAgICBWS19HOiA3MSxcblxuICAgIC8qKiovXG4gICAgVktfSDogNzIsXG5cbiAgICAvKioqL1xuICAgIFZLX0k6IDczLFxuXG4gICAgLyoqKi9cbiAgICBWS19KOiA3NCxcblxuICAgIC8qKiovXG4gICAgVktfSzogNzUsXG5cbiAgICAvKioqL1xuICAgIFZLX0w6IDc2LFxuXG4gICAgLyoqKi9cbiAgICBWS19NOiA3NyxcblxuICAgIC8qKiovXG4gICAgVktfTjogNzgsXG5cbiAgICAvKioqL1xuICAgIFZLX086IDc5LFxuXG4gICAgLyoqKi9cbiAgICBWS19QOiA4MCxcblxuICAgIC8qKiovXG4gICAgVktfUTogODEsXG5cbiAgICAvKioqL1xuICAgIFZLX1I6IDgyLFxuXG4gICAgLyoqKi9cbiAgICBWS19TOiA4MyxcblxuICAgIC8qKiovXG4gICAgVktfVDogODQsXG5cbiAgICAvKioqL1xuICAgIFZLX1U6IDg1LFxuXG4gICAgLyoqKi9cbiAgICBWS19WOiA4NixcblxuICAgIC8qKiovXG4gICAgVktfVzogODcsXG5cbiAgICAvKioqL1xuICAgIFZLX1g6IDg4LFxuXG4gICAgLyoqKi9cbiAgICBWS19ZOiA4OSxcblxuICAgIC8qKiovXG4gICAgVktfWjogOTAsXG5cbiAgICAvKioqL1xuICAgIFZLX0NPTlRFWFRfTUVOVTogOTMsXG5cbiAgICAvKiogMCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMDogOTYsXG5cbiAgICAvKiogMSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMTogOTcsXG5cbiAgICAvKiogMiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMjogOTgsXG5cbiAgICAvKiogMyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMzogOTksXG5cbiAgICAvKiogNCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENDogMTAwLFxuXG4gICAgLyoqIDUgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDU6IDEwMSxcblxuICAgIC8qKiA2IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ2OiAxMDIsXG5cbiAgICAvKiogNyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENzogMTAzLFxuXG4gICAgLyoqIDggb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDg6IDEwNCxcblxuICAgIC8qKiA5IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ5OiAxMDUsXG5cbiAgICAvKiogKiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTVVMVElQTFk6IDEwNixcblxuICAgIC8qKiArIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19BREQ6IDEwNyxcblxuICAgIC8qKiovXG4gICAgVktfU0VQQVJBVE9SOiAxMDgsXG5cbiAgICAvKiogLSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfU1VCVFJBQ1Q6IDEwOSxcblxuICAgIC8qKiBEZWNpbWFsIHBvaW50IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19ERUNJTUFMOiAxMTAsXG5cbiAgICAvKiogLyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfRElWSURFOiAxMTEsXG5cbiAgICAvKiogRjEga2V5LiAqL1xuICAgIFZLX0YxOiAxMTIsXG5cbiAgICAvKiogRjIga2V5LiAqL1xuICAgIFZLX0YyOiAxMTMsXG5cbiAgICAvKiogRjMga2V5LiAqL1xuICAgIFZLX0YzOiAxMTQsXG5cbiAgICAvKiogRjQga2V5LiAqL1xuICAgIFZLX0Y0OiAxMTUsXG5cbiAgICAvKiogRjUga2V5LiAqL1xuICAgIFZLX0Y1OiAxMTYsXG5cbiAgICAvKiogRjYga2V5LiAqL1xuICAgIFZLX0Y2OiAxMTcsXG5cbiAgICAvKiogRjcga2V5LiAqL1xuICAgIFZLX0Y3OiAxMTgsXG5cbiAgICAvKiogRjgga2V5LiAqL1xuICAgIFZLX0Y4OiAxMTksXG5cbiAgICAvKiogRjkga2V5LiAqL1xuICAgIFZLX0Y5OiAxMjAsXG5cbiAgICAvKiogRjEwIGtleS4gKi9cbiAgICBWS19GMTA6IDEyMSxcblxuICAgIC8qKiBGMTEga2V5LiAqL1xuICAgIFZLX0YxMTogMTIyLFxuXG4gICAgLyoqIEYxMiBrZXkuICovXG4gICAgVktfRjEyOiAxMjMsXG5cbiAgICAvKiogRjEzIGtleS4gKi9cbiAgICBWS19GMTM6IDEyNCxcblxuICAgIC8qKiBGMTQga2V5LiAqL1xuICAgIFZLX0YxNDogMTI1LFxuXG4gICAgLyoqIEYxNSBrZXkuICovXG4gICAgVktfRjE1OiAxMjYsXG5cbiAgICAvKiogRjE2IGtleS4gKi9cbiAgICBWS19GMTY6IDEyNyxcblxuICAgIC8qKiBGMTcga2V5LiAqL1xuICAgIFZLX0YxNzogMTI4LFxuXG4gICAgLyoqIEYxOCBrZXkuICovXG4gICAgVktfRjE4OiAxMjksXG5cbiAgICAvKiogRjE5IGtleS4gKi9cbiAgICBWS19GMTk6IDEzMCxcblxuICAgIC8qKiBGMjAga2V5LiAqL1xuICAgIFZLX0YyMDogMTMxLFxuXG4gICAgLyoqIEYyMSBrZXkuICovXG4gICAgVktfRjIxOiAxMzIsXG5cbiAgICAvKiogRjIyIGtleS4gKi9cbiAgICBWS19GMjI6IDEzMyxcblxuICAgIC8qKiBGMjMga2V5LiAqL1xuICAgIFZLX0YyMzogMTM0LFxuXG4gICAgLyoqIEYyNCBrZXkuICovXG4gICAgVktfRjI0OiAxMzUsXG5cbiAgICAvKiogTnVtIExvY2sga2V5LiAqL1xuICAgIFZLX05VTV9MT0NLOiAxNDQsXG5cbiAgICAvKiogU2Nyb2xsIExvY2sga2V5LiAqL1xuICAgIFZLX1NDUk9MTF9MT0NLOiAxNDUsXG5cbiAgICAvKiogQ2lyY3VtZmxleCAoXikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0lSQ1VNRkxFWDogMTYwLFxuXG4gICAgLyoqIEV4Y2xhbWF0aW9uICghKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19FWENMQU1BVElPTjogMTYxLFxuXG4gICAgLyoqIERvdWJsZSBxdW90ZSAoKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19ET1VCTEVfUVVPVEU6IDE2MixcblxuICAgIC8qKiBIYXNoICgjKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IQVNIOiAxNjMsXG5cbiAgICAvKiogRG9sbGFyIHNpZ24gKCQpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPTExBUjogMTY0LFxuXG4gICAgLyoqIFBlcmNlbnQgKCUpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BFUkNFTlQ6IDE2NSxcblxuICAgIC8qKiBBbXBlcnNhbmQgKCYpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FNUEVSU0FORDogMTY2LFxuXG4gICAgLyoqIFVuZGVyc2NvcmUgKF8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1VOREVSU0NPUkU6IDE2NyxcblxuICAgIC8qKiBPcGVuIHBhcmVudGhlc2lzICgoKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19PUEVOX1BBUkVOOiAxNjgsXG5cbiAgICAvKiogQ2xvc2UgcGFyZW50aGVzaXMgKCkpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX1BBUkVOOiAxNjksXG5cbiAgICAvKiBBc3RlcmlzayAoKikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQVNURVJJU0s6IDE3MCxcblxuICAgIC8qKiBQbHVzICgrKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QTFVTOiAxNzEsXG5cbiAgICAvKiogUGlwZSAofCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUElQRTogMTcyLFxuXG4gICAgLyoqIEh5cGhlbi1VUy9kb2NzL01pbnVzICgtKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IWVBIRU5fTUlOVVM6IDE3MyxcblxuICAgIC8qKiBPcGVuIGN1cmx5IGJyYWNrZXQgKHspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX09QRU5fQ1VSTFlfQlJBQ0tFVDogMTc0LFxuXG4gICAgLyoqIENsb3NlIGN1cmx5IGJyYWNrZXQgKH0pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX0NVUkxZX0JSQUNLRVQ6IDE3NSxcblxuICAgIC8qKiBUaWxkZSAofikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfVElMREU6IDE3NixcblxuICAgIC8qKiBDb21tYSAoLCkga2V5LiAqL1xuICAgIFZLX0NPTU1BOiAxODgsXG5cbiAgICAvKiogUGVyaW9kICguKSBrZXkuICovXG4gICAgVktfUEVSSU9EOiAxOTAsXG5cbiAgICAvKiogU2xhc2ggKC8pIGtleS4gKi9cbiAgICBWS19TTEFTSDogMTkxLFxuXG4gICAgLyoqIEJhY2sgdGljayAoYCkga2V5LiAqL1xuICAgIFZLX0JBQ0tfUVVPVEU6IDE5MixcblxuICAgIC8qKiBPcGVuIHNxdWFyZSBicmFja2V0IChbKSBrZXkuICovXG4gICAgVktfT1BFTl9CUkFDS0VUOiAyMTksXG5cbiAgICAvKiogQmFjayBzbGFzaCAoXFwpIGtleS4gKi9cbiAgICBWS19CQUNLX1NMQVNIOiAyMjAsXG5cbiAgICAvKiogQ2xvc2Ugc3F1YXJlIGJyYWNrZXQgKF0pIGtleS4gKi9cbiAgICBWS19DTE9TRV9CUkFDS0VUOiAyMjEsXG5cbiAgICAvKiogUXVvdGUgKCcnJykga2V5LiAqL1xuICAgIFZLX1FVT1RFOiAyMjIsXG5cbiAgICAvKiogTWV0YSBrZXkgb24gTGludXgsIENvbW1hbmQga2V5IG9uIE1hYy4gKi9cbiAgICBWS19NRVRBOiAyMjQsXG5cbiAgICAvKiogQWx0R3Iga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQUxUR1I6IDIyNSxcblxuICAgIC8qKiBXaW5kb3dzIGxvZ28ga2V5IG9uIFdpbmRvd3MuIE9yIFN1cGVyIG9yIEh5cGVyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1dJTjogOTEsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfS0FOQTogMjEsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSEFOR1VMOiAyMSxcblxuICAgIC8qKiDoi7HmlbAga2V5IG9uIEphcGFuZXNlIE1hYyBrZXlib2FyZC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0VJU1U6IDIyLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0pVTkpBOiAyMyxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19GSU5BTDogMjQsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSEFOSkE6IDI1LFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkpJOiAyNSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19DT05WRVJUOiAyOCxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19OT05DT05WRVJUOiAyOSxcblxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19BQ0NFUFQ6IDMwLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX01PREVDSEFOR0U6IDMxLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1NFTEVDVDogNDEsXG5cbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfUFJJTlQ6IDQyLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0VYRUNVVEU6IDQzLFxuXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLlx0ICovXG4gICAgVktfU0xFRVA6IDk1XG4gIH07XG4gIHZhciBCQUNLRU5EUyA9IHtcbiAgICBcImhleFwiOiBIZXgsXG4gICAgXCJyZWN0XCI6IFJlY3QsXG4gICAgXCJ0aWxlXCI6IFRpbGUsXG4gICAgXCJ0aWxlLWdsXCI6IFRpbGVHTCxcbiAgICBcInRlcm1cIjogVGVybVxuICB9O1xuICB2YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHdpZHRoOiBERUZBVUxUX1dJRFRILFxuICAgIGhlaWdodDogREVGQVVMVF9IRUlHSFQsXG4gICAgdHJhbnNwb3NlOiBmYWxzZSxcbiAgICBsYXlvdXQ6IFwicmVjdFwiLFxuICAgIGZvbnRTaXplOiAxNSxcbiAgICBzcGFjaW5nOiAxLFxuICAgIGJvcmRlcjogMCxcbiAgICBmb3JjZVNxdWFyZVJhdGlvOiBmYWxzZSxcbiAgICBmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiLFxuICAgIGZvbnRTdHlsZTogXCJcIixcbiAgICBmZzogXCIjY2NjXCIsXG4gICAgYmc6IFwiIzAwMFwiLFxuICAgIHRpbGVXaWR0aDogMzIsXG4gICAgdGlsZUhlaWdodDogMzIsXG4gICAgdGlsZU1hcDoge30sXG4gICAgdGlsZVNldDogbnVsbCxcbiAgICB0aWxlQ29sb3JpemU6IGZhbHNlXG4gIH07XG4gIC8qKlxuICAgKiBAY2xhc3MgVmlzdWFsIG1hcCBkaXNwbGF5XG4gICAqL1xuXG4gIHZhciBEaXNwbGF5ID1cbiAgLyoqIEBjbGFzcyAqL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIERpc3BsYXkgPVxuICAgIC8qI19fUFVSRV9fKi9cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBEaXNwbGF5KG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTsgLy8gZmFsc2UgPSBub3RoaW5nLCB0cnVlID0gYWxsLCBvYmplY3QgPSBkaXJ0eSBjZWxsc1xuXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5ERUJVRyA9IHRoaXMuREVCVUcuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLl9iYWNrZW5kLnNjaGVkdWxlKHRoaXMuX3RpY2spO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBEZWJ1ZyBoZWxwZXIsIGlkZWFsIGFzIGEgbWFwIGdlbmVyYXRvciBjYWxsYmFjay4gQWx3YXlzIGJvdW5kIHRvIHRoaXMuXG4gICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAqIEBwYXJhbSB7aW50fSB3aGF0XG4gICAgICAgKi9cblxuXG4gICAgICB2YXIgX3Byb3RvOSA9IERpc3BsYXkucHJvdG90eXBlO1xuXG4gICAgICBfcHJvdG85LkRFQlVHID0gZnVuY3Rpb24gREVCVUcoeCwgeSwgd2hhdCkge1xuICAgICAgICB2YXIgY29sb3JzID0gW3RoaXMuX29wdGlvbnMuYmcsIHRoaXMuX29wdGlvbnMuZmddO1xuICAgICAgICB0aGlzLmRyYXcoeCwgeSwgbnVsbCwgbnVsbCwgY29sb3JzW3doYXQgJSBjb2xvcnMubGVuZ3RoXSk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDbGVhciB0aGUgd2hvbGUgZGlzcGxheSAoY292ZXIgaXQgd2l0aCBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIEBzZWUgUk9ULkRpc3BsYXlcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLndpZHRoIHx8IG9wdGlvbnMuaGVpZ2h0IHx8IG9wdGlvbnMuZm9udFNpemUgfHwgb3B0aW9ucy5mb250RmFtaWx5IHx8IG9wdGlvbnMuc3BhY2luZyB8fCBvcHRpb25zLmxheW91dCkge1xuICAgICAgICAgIGlmIChvcHRpb25zLmxheW91dCkge1xuICAgICAgICAgICAgdmFyIGN0b3IgPSBCQUNLRU5EU1tvcHRpb25zLmxheW91dF07XG4gICAgICAgICAgICB0aGlzLl9iYWNrZW5kID0gbmV3IGN0b3IoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9iYWNrZW5kLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG5cbiAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgY3VycmVudGx5IHNldCBvcHRpb25zXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIERPTSBub2RlIG9mIHRoaXMgZGlzcGxheVxuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5nZXRDb250YWluZXIgPSBmdW5jdGlvbiBnZXRDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iYWNrZW5kLmdldENvbnRhaW5lcigpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ29tcHV0ZSB0aGUgbWF4aW11bSB3aWR0aC9oZWlnaHQgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcbiAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxuICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IGNlbGxXaWR0aCxjZWxsSGVpZ2h0XG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmNvbXB1dGVTaXplID0gZnVuY3Rpb24gY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ29tcHV0ZSB0aGUgbWF4aW11bSBmb250IHNpemUgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcbiAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxuICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAqIEByZXR1cm5zIHtpbnR9IGZvbnRTaXplXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85LmNvbXB1dGVGb250U2l6ZSA9IGZ1bmN0aW9uIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgfTtcblxuICAgICAgX3Byb3RvOS5jb21wdXRlVGlsZVNpemUgPSBmdW5jdGlvbiBjb21wdXRlVGlsZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ29udmVydCBhIERPTSBldmVudCAobW91c2Ugb3IgdG91Y2gpIHRvIG1hcCBjb29yZGluYXRlcy4gVXNlcyBmaXJzdCB0b3VjaCBmb3IgbXVsdGktdG91Y2guXG4gICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlIGV2ZW50XG4gICAgICAgKiBAcmV0dXJucyB7aW50WzJdfSAtMSBmb3IgdmFsdWVzIG91dHNpZGUgb2YgdGhlIGNhbnZhc1xuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5ldmVudFRvUG9zaXRpb24gPSBmdW5jdGlvbiBldmVudFRvUG9zaXRpb24oZSkge1xuICAgICAgICB2YXIgeCwgeTtcblxuICAgICAgICBpZiAoXCJ0b3VjaGVzXCIgaW4gZSkge1xuICAgICAgICAgIHggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICB5ID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeCA9IGUuY2xpZW50WDtcbiAgICAgICAgICB5ID0gZS5jbGllbnRZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuZXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBzdHJpbmdbXX0gY2ggT25lIG9yIG1vcmUgY2hhcnMgKHdpbGwgYmUgb3ZlcmxhcHBpbmcgdGhlbXNlbHZlcylcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZmddIGZvcmVncm91bmQgY29sb3JcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYmddIGJhY2tncm91bmQgY29sb3JcbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuZHJhdyA9IGZ1bmN0aW9uIGRyYXcoeCwgeSwgY2gsIGZnLCBiZykge1xuICAgICAgICBpZiAoIWZnKSB7XG4gICAgICAgICAgZmcgPSB0aGlzLl9vcHRpb25zLmZnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFiZykge1xuICAgICAgICAgIGJnID0gdGhpcy5fb3B0aW9ucy5iZztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSBbeCwgeSwgY2gsIGZnLCBiZ107XG5cbiAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIHdpbGwgYWxyZWFkeSByZWRyYXcgZXZlcnl0aGluZyBcblxuXG4gICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHt9O1xuICAgICAgICB9IC8vIGZpcnN0IVxuXG5cbiAgICAgICAgdGhpcy5fZGlydHlba2V5XSA9IHRydWU7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBEcmF3cyBhIHRleHQgYXQgZ2l2ZW4gcG9zaXRpb24uIE9wdGlvbmFsbHkgd3JhcHMgYXQgYSBtYXhpbXVtIGxlbmd0aC4gQ3VycmVudGx5IGRvZXMgbm90IHdvcmsgd2l0aCBoZXggbGF5b3V0LlxuICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBNYXkgY29udGFpbiBjb2xvci9iYWNrZ3JvdW5kIGZvcm1hdCBzcGVjaWZpZXJzLCAlY3tuYW1lfS8lYntuYW1lfSwgYm90aCBvcHRpb25hbC4gJWN7fS8lYnt9IHJlc2V0cyB0byBkZWZhdWx0LlxuICAgICAgICogQHBhcmFtIHtpbnR9IFttYXhXaWR0aF0gd3JhcCBhdCB3aGF0IHdpZHRoP1xuICAgICAgICogQHJldHVybnMge2ludH0gbGluZXMgZHJhd25cbiAgICAgICAqL1xuXG5cbiAgICAgIF9wcm90bzkuZHJhd1RleHQgPSBmdW5jdGlvbiBkcmF3VGV4dCh4LCB5LCB0ZXh0LCBtYXhXaWR0aCkge1xuICAgICAgICB2YXIgZmcgPSBudWxsO1xuICAgICAgICB2YXIgYmcgPSBudWxsO1xuICAgICAgICB2YXIgY3ggPSB4O1xuICAgICAgICB2YXIgY3kgPSB5O1xuICAgICAgICB2YXIgbGluZXMgPSAxO1xuXG4gICAgICAgIGlmICghbWF4V2lkdGgpIHtcbiAgICAgICAgICBtYXhXaWR0aCA9IHRoaXMuX29wdGlvbnMud2lkdGggLSB4O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplKHRleHQsIG1heFdpZHRoKTtcblxuICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgIC8vIGludGVycHJldCB0b2tlbml6ZWQgb3Bjb2RlIHN0cmVhbVxuICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuXG4gICAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFRZUEVfVEVYVDpcbiAgICAgICAgICAgICAgdmFyIGlzU3BhY2UgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIGlzUHJldlNwYWNlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICBpc0Z1bGxXaWR0aCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgaXNQcmV2RnVsbFdpZHRoID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbi52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBjYyA9IHRva2VuLnZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0b2tlbi52YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5sYXlvdXQgPT09IFwidGVybVwiKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2NoID0gY2MgPj4gODtcbiAgICAgICAgICAgICAgICAgIHZhciBpc0NKSyA9IGNjaCA9PT0gMHgxMSB8fCBjY2ggPj0gMHgyZSAmJiBjY2ggPD0gMHg5ZiB8fCBjY2ggPj0gMHhhYyAmJiBjY2ggPD0gMHhkNyB8fCBjYyA+PSAweEE5NjAgJiYgY2MgPD0gMHhBOTdGO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNDSkspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4ICsgMCwgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCArIDEsIGN5LCBcIlxcdFwiLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICBjeCArPSAyO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIEFzc2lnbiB0byBgdHJ1ZWAgd2hlbiB0aGUgY3VycmVudCBjaGFyIGlzIGZ1bGwtd2lkdGguXG5cblxuICAgICAgICAgICAgICAgIGlzRnVsbFdpZHRoID0gY2MgPiAweGZmMDAgJiYgY2MgPCAweGZmNjEgfHwgY2MgPiAweGZmZGMgJiYgY2MgPCAweGZmZTggfHwgY2MgPiAweGZmZWU7IC8vIEN1cnJlbnQgY2hhciBpcyBzcGFjZSwgd2hhdGV2ZXIgZnVsbC13aWR0aCBvciBoYWxmLXdpZHRoIGJvdGggYXJlIE9LLlxuXG4gICAgICAgICAgICAgICAgaXNTcGFjZSA9IGMuY2hhckNvZGVBdCgwKSA9PSAweDIwIHx8IGMuY2hhckNvZGVBdCgwKSA9PSAweDMwMDA7IC8vIFRoZSBwcmV2aW91cyBjaGFyIGlzIGZ1bGwtd2lkdGggYW5kXG4gICAgICAgICAgICAgICAgLy8gY3VycmVudCBjaGFyIGlzIG5ldGhlciBoYWxmLXdpZHRoIG5vciBhIHNwYWNlLlxuXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJldkZ1bGxXaWR0aCAmJiAhaXNGdWxsV2lkdGggJiYgIWlzU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgIGN4Kys7XG4gICAgICAgICAgICAgICAgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBjaGFyIGlzIGZ1bGwtd2lkdGggYW5kXG4gICAgICAgICAgICAgICAgLy8gdGhlIHByZXZpb3VzIGNoYXIgaXMgbm90IGEgc3BhY2UuXG5cblxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bGxXaWR0aCAmJiAhaXNQcmV2U3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgIGN4Kys7XG4gICAgICAgICAgICAgICAgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cblxuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4KyssIGN5LCBjLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgIGlzUHJldlNwYWNlID0gaXNTcGFjZTtcbiAgICAgICAgICAgICAgICBpc1ByZXZGdWxsV2lkdGggPSBpc0Z1bGxXaWR0aDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFRZUEVfRkc6XG4gICAgICAgICAgICAgIGZnID0gdG9rZW4udmFsdWUgfHwgbnVsbDtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVFlQRV9CRzpcbiAgICAgICAgICAgICAgYmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgIGN4ID0geDtcbiAgICAgICAgICAgICAgY3krKztcbiAgICAgICAgICAgICAgbGluZXMrKztcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogVGltZXIgdGljazogdXBkYXRlIGRpcnR5IHBhcnRzXG4gICAgICAgKi9cblxuXG4gICAgICBfcHJvdG85Ll90aWNrID0gZnVuY3Rpb24gX3RpY2soKSB7XG4gICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kaXJ0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIGRyYXcgYWxsXG4gICAgICAgICAgdGhpcy5fYmFja2VuZC5jbGVhcigpO1xuXG4gICAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhdyhpZCwgZmFsc2UpO1xuICAgICAgICAgIH0gLy8gcmVkcmF3IGNhY2hlZCBkYXRhIFxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZHJhdyBvbmx5IGRpcnR5IFxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fZHJhdyhrZXksIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFdoYXQgdG8gZHJhd1xuICAgICAgICogQHBhcmFtIHtib29sfSBjbGVhckJlZm9yZSBJcyBpdCBuZWNlc3NhcnkgdG8gY2xlYW4gYmVmb3JlP1xuICAgICAgICovXG5cblxuICAgICAgX3Byb3RvOS5fZHJhdyA9IGZ1bmN0aW9uIF9kcmF3KGtleSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG5cbiAgICAgICAgaWYgKGRhdGFbNF0gIT0gdGhpcy5fb3B0aW9ucy5iZykge1xuICAgICAgICAgIGNsZWFyQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2JhY2tlbmQuZHJhdyhkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gRGlzcGxheTtcbiAgICB9KCk7XG5cbiAgICBEaXNwbGF5LlJlY3QgPSBSZWN0O1xuICAgIERpc3BsYXkuSGV4ID0gSGV4O1xuICAgIERpc3BsYXkuVGlsZSA9IFRpbGU7XG4gICAgRGlzcGxheS5UaWxlR0wgPSBUaWxlR0w7XG4gICAgRGlzcGxheS5UZXJtID0gVGVybTtcbiAgICByZXR1cm4gRGlzcGxheTtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIChNYXJrb3YgcHJvY2VzcyktYmFzZWQgc3RyaW5nIGdlbmVyYXRvci5cbiAgICogQ29waWVkIGZyb20gYSA8YSBocmVmPVwiaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9TmFtZXNfZnJvbV9hX2hpZ2hfb3JkZXJfTWFya292X1Byb2Nlc3NfYW5kX2Ffc2ltcGxpZmllZF9LYXR6X2JhY2stb2ZmX3NjaGVtZVwiPlJvZ3VlQmFzaW4gYXJ0aWNsZTwvYT4uXG4gICAqIE9mZmVycyBjb25maWd1cmFibGUgb3JkZXIgYW5kIHByaW9yLlxuICAgKi9cblxuXG4gIHZhciBTdHJpbmdHZW5lcmF0b3IgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdHJpbmdHZW5lcmF0b3Iob3B0aW9ucykge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgd29yZHM6IGZhbHNlLFxuICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgcHJpb3I6IDAuMDAxXG4gICAgICB9O1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgwKTtcbiAgICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXMuX2JvdW5kYXJ5O1xuICAgICAgdGhpcy5fcHJlZml4ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5vcmRlcjsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3ByZWZpeC5wdXNoKHRoaXMuX2JvdW5kYXJ5KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcbiAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3RoaXMuX2JvdW5kYXJ5XSA9IHRoaXMuX29wdGlvbnMucHJpb3I7XG4gICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGVhcm5pbmcgZGF0YVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMTAgPSBTdHJpbmdHZW5lcmF0b3IucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTAuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBHZW5lcmF0ZWQgc3RyaW5nXG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLmdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gW3RoaXMuX3NhbXBsZSh0aGlzLl9wcmVmaXgpXTtcblxuICAgICAgd2hpbGUgKHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gIT0gdGhpcy5fYm91bmRhcnkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5fc2FtcGxlKHJlc3VsdCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5fam9pbihyZXN1bHQuc2xpY2UoMCwgLTEpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9ic2VydmUgKGxlYXJuKSBhIHN0cmluZyBmcm9tIGEgdHJhaW5pbmcgc2V0XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLm9ic2VydmUgPSBmdW5jdGlvbiBvYnNlcnZlKHN0cmluZykge1xuICAgICAgdmFyIHRva2VucyA9IHRoaXMuX3NwbGl0KHN0cmluZyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3Rva2Vuc1tpXV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgfVxuXG4gICAgICB0b2tlbnMgPSB0aGlzLl9wcmVmaXguY29uY2F0KHRva2VucykuY29uY2F0KHRoaXMuX3N1ZmZpeCk7XG4gICAgICAvKiBhZGQgYm91bmRhcnkgc3ltYm9scyAqL1xuXG4gICAgICBmb3IgKHZhciBfaTIgPSB0aGlzLl9vcHRpb25zLm9yZGVyOyBfaTIgPCB0b2tlbnMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgICB2YXIgY29udGV4dCA9IHRva2Vucy5zbGljZShfaTIgLSB0aGlzLl9vcHRpb25zLm9yZGVyLCBfaTIpO1xuICAgICAgICB2YXIgZXZlbnQgPSB0b2tlbnNbX2kyXTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbnRleHQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgc3ViY29udGV4dCA9IGNvbnRleHQuc2xpY2Uoaik7XG5cbiAgICAgICAgICB0aGlzLl9vYnNlcnZlRXZlbnQoc3ViY29udGV4dCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzEwLmdldFN0YXRzID0gZnVuY3Rpb24gZ2V0U3RhdHMoKSB7XG4gICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgIHZhciBwcmlvckNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fcHJpb3JWYWx1ZXMpLmxlbmd0aDtcbiAgICAgIHByaW9yQ291bnQtLTsgLy8gYm91bmRhcnlcblxuICAgICAgcGFydHMucHVzaChcImRpc3RpbmN0IHNhbXBsZXM6IFwiICsgcHJpb3JDb3VudCk7XG4gICAgICB2YXIgZGF0YUNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fZGF0YSkubGVuZ3RoO1xuICAgICAgdmFyIGV2ZW50Q291bnQgPSAwO1xuXG4gICAgICBmb3IgKHZhciBwIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgZXZlbnRDb3VudCArPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhW3BdKS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGNvbnRleHRzKTogXCIgKyBkYXRhQ291bnQpO1xuICAgICAgcGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoZXZlbnRzKTogXCIgKyBldmVudENvdW50KTtcbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLCBcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG5cblxuICAgIF9wcm90bzEwLl9zcGxpdCA9IGZ1bmN0aW9uIF9zcGxpdChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuc3BsaXQodGhpcy5fb3B0aW9ucy53b3JkcyA/IC9cXHMrLyA6IFwiXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5fam9pbiA9IGZ1bmN0aW9uIF9qb2luKGFycikge1xuICAgICAgcmV0dXJuIGFyci5qb2luKHRoaXMuX29wdGlvbnMud29yZHMgPyBcIiBcIiA6IFwiXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gY29udGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMC5fb2JzZXJ2ZUV2ZW50ID0gZnVuY3Rpb24gX29ic2VydmVFdmVudChjb250ZXh0LCBldmVudCkge1xuICAgICAgdmFyIGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG5cbiAgICAgIGlmICghKGtleSBpbiB0aGlzLl9kYXRhKSkge1xuICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG5cbiAgICAgIGlmICghKGV2ZW50IGluIGRhdGEpKSB7XG4gICAgICAgIGRhdGFbZXZlbnRdID0gMDtcbiAgICAgIH1cblxuICAgICAgZGF0YVtldmVudF0rKztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuX3NhbXBsZSA9IGZ1bmN0aW9uIF9zYW1wbGUoY29udGV4dCkge1xuICAgICAgY29udGV4dCA9IHRoaXMuX2JhY2tvZmYoY29udGV4dCk7XG5cbiAgICAgIHZhciBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgIHZhciBhdmFpbGFibGUgPSB7fTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMucHJpb3IpIHtcbiAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gdGhpcy5fcHJpb3JWYWx1ZXMpIHtcbiAgICAgICAgICBhdmFpbGFibGVbZXZlbnRdID0gdGhpcy5fcHJpb3JWYWx1ZXNbZXZlbnRdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgX2V2ZW50IGluIGRhdGEpIHtcbiAgICAgICAgICBhdmFpbGFibGVbX2V2ZW50XSArPSBkYXRhW19ldmVudF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF2YWlsYWJsZSA9IGRhdGE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBSTkckMS5nZXRXZWlnaHRlZFZhbHVlKGF2YWlsYWJsZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTAuX2JhY2tvZmYgPSBmdW5jdGlvbiBfYmFja29mZihjb250ZXh0KSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiB0aGlzLl9vcHRpb25zLm9yZGVyKSB7XG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKC10aGlzLl9vcHRpb25zLm9yZGVyKTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5sZW5ndGggPCB0aGlzLl9vcHRpb25zLm9yZGVyKSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzLl9wcmVmaXguc2xpY2UoMCwgdGhpcy5fb3B0aW9ucy5vcmRlciAtIGNvbnRleHQubGVuZ3RoKS5jb25jYXQoY29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICghKHRoaXMuX2pvaW4oY29udGV4dCkgaW4gdGhpcy5fZGF0YSkgJiYgY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKDEpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFN0cmluZ0dlbmVyYXRvcjtcbiAgfSgpO1xuXG4gIHZhciBNaW5IZWFwID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWluSGVhcCgpIHtcbiAgICAgIHRoaXMuaGVhcCA9IFtdO1xuICAgICAgdGhpcy50aW1lc3RhbXAgPSAwO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8xMSA9IE1pbkhlYXAucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTEubGVzc1RoYW4gPSBmdW5jdGlvbiBsZXNzVGhhbihhLCBiKSB7XG4gICAgICByZXR1cm4gYS5rZXkgPT0gYi5rZXkgPyBhLnRpbWVzdGFtcCA8IGIudGltZXN0YW1wIDogYS5rZXkgPCBiLmtleTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEuc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCh2KSB7XG4gICAgICB0aGlzLmhlYXAgPSB0aGlzLmhlYXAubWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBrZXkgPSBfcmVmLmtleSxcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZi52YWx1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IF9yZWYudGltZXN0YW1wO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtleToga2V5ICsgdixcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5sZW4gPSBmdW5jdGlvbiBsZW4oKSB7XG4gICAgICByZXR1cm4gdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEucHVzaCA9IGZ1bmN0aW9uIHB1c2godmFsdWUsIGtleSkge1xuICAgICAgdGhpcy50aW1lc3RhbXAgKz0gMTtcbiAgICAgIHZhciBsb2MgPSB0aGlzLmxlbigpO1xuICAgICAgdGhpcy5oZWFwLnB1c2goe1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAsXG4gICAgICAgIGtleToga2V5XG4gICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlVXAobG9jKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEucG9wID0gZnVuY3Rpb24gcG9wKCkge1xuICAgICAgaWYgKHRoaXMubGVuKCkgPT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBlbGVtZW50IHRvIHBvcFwiKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcCA9IHRoaXMuaGVhcFswXTtcblxuICAgICAgaWYgKHRoaXMubGVuKCkgPiAxKSB7XG4gICAgICAgIHRoaXMuaGVhcFswXSA9IHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb3duKDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9wO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5maW5kID0gZnVuY3Rpb24gZmluZCh2KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuKCk7IGkrKykge1xuICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5oZWFwW2ldO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUodikge1xuICAgICAgdmFyIGluZGV4ID0gbnVsbDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbigpOyBpKyspIHtcbiAgICAgICAgaWYgKHYgPT0gdGhpcy5oZWFwW2ldLnZhbHVlKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbigpID4gMSkge1xuICAgICAgICAgIHRoaXMuaGVhcFtpbmRleF0gPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVEb3duKGluZGV4KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS5wYXJlbnROb2RlID0gZnVuY3Rpb24gcGFyZW50Tm9kZSh4KSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcigoeCAtIDEpIC8gMik7XG4gICAgfTtcblxuICAgIF9wcm90bzExLmxlZnRDaGlsZE5vZGUgPSBmdW5jdGlvbiBsZWZ0Q2hpbGROb2RlKHgpIHtcbiAgICAgIHJldHVybiAyICogeCArIDE7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnJpZ2h0Q2hpbGROb2RlID0gZnVuY3Rpb24gcmlnaHRDaGlsZE5vZGUoeCkge1xuICAgICAgcmV0dXJuIDIgKiB4ICsgMjtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEuZXhpc3ROb2RlID0gZnVuY3Rpb24gZXhpc3ROb2RlKHgpIHtcbiAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuaGVhcC5sZW5ndGg7XG4gICAgfTtcblxuICAgIF9wcm90bzExLnN3YXAgPSBmdW5jdGlvbiBzd2FwKHgsIHkpIHtcbiAgICAgIHZhciB0ID0gdGhpcy5oZWFwW3hdO1xuICAgICAgdGhpcy5oZWFwW3hdID0gdGhpcy5oZWFwW3ldO1xuICAgICAgdGhpcy5oZWFwW3ldID0gdDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTEubWluTm9kZSA9IGZ1bmN0aW9uIG1pbk5vZGUobnVtYmVycykge1xuICAgICAgdmFyIHZhbGlkbnVtYmVycyA9IG51bWJlcnMuZmlsdGVyKHRoaXMuZXhpc3ROb2RlLmJpbmQodGhpcykpO1xuICAgICAgdmFyIG1pbmltYWwgPSB2YWxpZG51bWJlcnNbMF07XG5cbiAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHZhbGlkbnVtYmVycywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pMyA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yW19pMysrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTMgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTMuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgX3JlZjIgPSBfaTMudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgIGlmICh0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFtpXSwgdGhpcy5oZWFwW21pbmltYWxdKSkge1xuICAgICAgICAgIG1pbmltYWwgPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtaW5pbWFsO1xuICAgIH07XG5cbiAgICBfcHJvdG8xMS51cGRhdGVVcCA9IGZ1bmN0aW9uIHVwZGF0ZVVwKHgpIHtcbiAgICAgIGlmICh4ID09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlKHgpO1xuXG4gICAgICBpZiAodGhpcy5leGlzdE5vZGUocGFyZW50KSAmJiB0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFt4XSwgdGhpcy5oZWFwW3BhcmVudF0pKSB7XG4gICAgICAgIHRoaXMuc3dhcCh4LCBwYXJlbnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVwKHBhcmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzExLnVwZGF0ZURvd24gPSBmdW5jdGlvbiB1cGRhdGVEb3duKHgpIHtcbiAgICAgIHZhciBsZWZ0Q2hpbGQgPSB0aGlzLmxlZnRDaGlsZE5vZGUoeCk7XG4gICAgICB2YXIgcmlnaHRDaGlsZCA9IHRoaXMucmlnaHRDaGlsZE5vZGUoeCk7XG5cbiAgICAgIGlmICghdGhpcy5leGlzdE5vZGUobGVmdENoaWxkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtID0gdGhpcy5taW5Ob2RlKFt4LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGRdKTtcblxuICAgICAgaWYgKG0gIT0geCkge1xuICAgICAgICB0aGlzLnN3YXAoeCwgbSk7XG4gICAgICAgIHRoaXMudXBkYXRlRG93bihtKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMTEuZGVidWdQcmludCA9IGZ1bmN0aW9uIGRlYnVnUHJpbnQoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmhlYXApO1xuICAgIH07XG5cbiAgICByZXR1cm4gTWluSGVhcDtcbiAgfSgpO1xuXG4gIHZhciBFdmVudFF1ZXVlID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEdlbmVyaWMgZXZlbnQgcXVldWU6IHN0b3JlcyBldmVudHMgYW5kIHJldHJpZXZlcyB0aGVtIGJhc2VkIG9uIHRoZWlyIHRpbWVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFdmVudFF1ZXVlKCkge1xuICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICB0aGlzLl9ldmVudHMgPSBuZXcgTWluSGVhcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBFbGFwc2VkIHRpbWVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzEyID0gRXZlbnRRdWV1ZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xMi5nZXRUaW1lID0gZnVuY3Rpb24gZ2V0VGltZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90aW1lO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHNjaGVkdWxlZCBldmVudHNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTIuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBNaW5IZWFwKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMi5hZGQgPSBmdW5jdGlvbiBhZGQoZXZlbnQsIHRpbWUpIHtcbiAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKGV2ZW50LCB0aW1lKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgdGhlIG5lYXJlc3QgZXZlbnQsIGFkdmFuY2VzIHRpbWUgaWYgbmVjZXNzYXJ5LiBSZXR1cm5zIHRoYXQgZXZlbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgcXVldWUuXG4gICAgICogQHJldHVybnMgez8gfHwgbnVsbH0gVGhlIGV2ZW50IHByZXZpb3VzbHkgYWRkZWQgYnkgYWRkRXZlbnQsIG51bGwgaWYgbm8gZXZlbnQgYXZhaWxhYmxlXG4gICAgICovXG5cblxuICAgIF9wcm90bzEyLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzLmxlbigpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgX3RoaXMkX2V2ZW50cyRwb3AgPSB0aGlzLl9ldmVudHMucG9wKCksXG4gICAgICAgICAgdGltZSA9IF90aGlzJF9ldmVudHMkcG9wLmtleSxcbiAgICAgICAgICBldmVudCA9IF90aGlzJF9ldmVudHMkcG9wLnZhbHVlO1xuXG4gICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgLyogYWR2YW5jZSAqL1xuICAgICAgICB0aGlzLl90aW1lICs9IHRpbWU7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzLnNoaWZ0KC10aW1lKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ2l2ZW4gZXZlbnRcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHJldHVybnMge251bWJlcn0gdGltZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMi5nZXRFdmVudFRpbWUgPSBmdW5jdGlvbiBnZXRFdmVudFRpbWUoZXZlbnQpIHtcbiAgICAgIHZhciByID0gdGhpcy5fZXZlbnRzLmZpbmQoZXZlbnQpO1xuXG4gICAgICBpZiAocikge1xuICAgICAgICB2YXIga2V5ID0gci5rZXk7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gZXZlbnQgZnJvbSB0aGUgcXVldWVcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3M/XG4gICAgICovXG5cblxuICAgIF9wcm90bzEyLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShldmVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cy5yZW1vdmUoZXZlbnQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRRdWV1ZTtcbiAgfSgpO1xuXG4gIHZhciBTY2hlZHVsZXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQWJzdHJhY3Qgc2NoZWR1bGVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2NoZWR1bGVyKCkge1xuICAgICAgdGhpcy5fcXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xuICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuRXZlbnRRdWV1ZSNnZXRUaW1lXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8xMyA9IFNjaGVkdWxlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xMy5nZXRUaW1lID0gZnVuY3Rpb24gZ2V0VGltZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXRUaW1lKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMy5hZGQgPSBmdW5jdGlvbiBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICBpZiAocmVwZWF0KSB7XG4gICAgICAgIHRoaXMuX3JlcGVhdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSB0aGUgZ2l2ZW4gaXRlbSBpcyBzY2hlZHVsZWQgZm9yXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGltZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMy5nZXRUaW1lT2YgPSBmdW5jdGlvbiBnZXRUaW1lT2YoaXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3F1ZXVlLmdldEV2ZW50VGltZShpdGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBpdGVtc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xMy5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpcy5fcXVldWUuY2xlYXIoKTtcblxuICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcHJldmlvdXNseSBhZGRlZCBpdGVtXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3NmdWw/XG4gICAgICovXG5cblxuICAgIF9wcm90bzEzLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcXVldWUucmVtb3ZlKGl0ZW0pO1xuXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLl9yZXBlYXQuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3JlcGVhdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY3VycmVudCA9PSBpdGVtKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGUgbmV4dCBpdGVtXG4gICAgICogQHJldHVybnMgez99XG4gICAgICovXG5cblxuICAgIF9wcm90bzEzLm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX3F1ZXVlLmdldCgpO1xuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfTtcblxuICAgIHJldHVybiBTY2hlZHVsZXI7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBTaW1wbGUgZmFpciBzY2hlZHVsZXIgKHJvdW5kLXJvYmluIHN0eWxlKVxuICAgKi9cblxuXG4gIHZhciBTaW1wbGUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfU2NoZWR1bGVyKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoU2ltcGxlLCBfU2NoZWR1bGVyKTtcblxuICAgIGZ1bmN0aW9uIFNpbXBsZSgpIHtcbiAgICAgIHJldHVybiBfU2NoZWR1bGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMTQgPSBTaW1wbGUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMTQuYWRkID0gZnVuY3Rpb24gYWRkKGl0ZW0sIHJlcGVhdCkge1xuICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIDApO1xuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlci5wcm90b3R5cGUuYWRkLmNhbGwodGhpcywgaXRlbSwgcmVwZWF0KTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTQubmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyLnByb3RvdHlwZS5uZXh0LmNhbGwodGhpcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBTaW1wbGU7XG4gIH0oU2NoZWR1bGVyKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBTcGVlZC1iYXNlZCBzY2hlZHVsZXJcbiAgICovXG5cblxuICB2YXIgU3BlZWQgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfU2NoZWR1bGVyMikge1xuICAgIF9pbmhlcml0c0xvb3NlKFNwZWVkLCBfU2NoZWR1bGVyMik7XG5cbiAgICBmdW5jdGlvbiBTcGVlZCgpIHtcbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzE1ID0gU3BlZWQucHJvdG90eXBlO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gYW55dGhpbmcgd2l0aCBcImdldFNwZWVkXCIgbWV0aG9kXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MS9pdGVtLmdldFNwZWVkKCldXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxuICAgICAqL1xuICAgIF9wcm90bzE1LmFkZCA9IGZ1bmN0aW9uIGFkZChpdGVtLCByZXBlYXQsIHRpbWUpIHtcbiAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lICE9PSB1bmRlZmluZWQgPyB0aW1lIDogMSAvIGl0ZW0uZ2V0U3BlZWQoKSk7XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMi5wcm90b3R5cGUuYWRkLmNhbGwodGhpcywgaXRlbSwgcmVwZWF0KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG5cblxuICAgIF9wcm90bzE1Lm5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIDEgLyB0aGlzLl9jdXJyZW50LmdldFNwZWVkKCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNwZWVkO1xuICB9KFNjaGVkdWxlcik7XG4gIC8qKlxuICAgKiBAY2xhc3MgQWN0aW9uLWJhc2VkIHNjaGVkdWxlclxuICAgKiBAYXVnbWVudHMgUk9ULlNjaGVkdWxlclxuICAgKi9cblxuXG4gIHZhciBBY3Rpb24gPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfU2NoZWR1bGVyMykge1xuICAgIF9pbmhlcml0c0xvb3NlKEFjdGlvbiwgX1NjaGVkdWxlcjMpO1xuXG4gICAgZnVuY3Rpb24gQWN0aW9uKCkge1xuICAgICAgdmFyIF90aGlzOTtcblxuICAgICAgX3RoaXM5ID0gX1NjaGVkdWxlcjMuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgX3RoaXM5Ll9kZWZhdWx0RHVyYXRpb24gPSAxO1xuICAgICAgLyogZm9yIG5ld2x5IGFkZGVkICovXG5cbiAgICAgIF90aGlzOS5fZHVyYXRpb24gPSBfdGhpczkuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgIC8qIGZvciB0aGlzLl9jdXJyZW50ICovXG5cbiAgICAgIHJldHVybiBfdGhpczk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8xNiA9IEFjdGlvbi5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xNi5hZGQgPSBmdW5jdGlvbiBhZGQoaXRlbSwgcmVwZWF0LCB0aW1lKSB7XG4gICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjMucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsIGl0ZW0sIHJlcGVhdCk7XG4gICAgfTtcblxuICAgIF9wcm90bzE2LmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMy5wcm90b3R5cGUuY2xlYXIuY2FsbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMTYucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtID09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfU2NoZWR1bGVyMy5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcywgaXRlbSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8xNi5uZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBudWxsICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCB0aGlzLl9kdXJhdGlvbiB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX1NjaGVkdWxlcjMucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBkdXJhdGlvbiBmb3IgdGhlIGFjdGl2ZSBpdGVtXG4gICAgICovXG5cblxuICAgIF9wcm90bzE2LnNldER1cmF0aW9uID0gZnVuY3Rpb24gc2V0RHVyYXRpb24odGltZSkge1xuICAgICAgaWYgKHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aW1lO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFjdGlvbjtcbiAgfShTY2hlZHVsZXIpO1xuXG4gIHZhciBpbmRleCA9IHtcbiAgICBTaW1wbGU6IFNpbXBsZSxcbiAgICBTcGVlZDogU3BlZWQsXG4gICAgQWN0aW9uOiBBY3Rpb25cbiAgfTtcblxuICB2YXIgRk9WID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFic3RyYWN0IEZPViBhbGdvcml0aG1cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaWdodFBhc3Nlc0NhbGxiYWNrIERvZXMgdGhlIGxpZ2h0IHBhc3MgdGhyb3VnaCB4LHk/XG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XSA0LzYvOFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEZPVihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGlnaHRQYXNzZXMgPSBsaWdodFBhc3Nlc0NhbGxiYWNrO1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICB0b3BvbG9neTogOFxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXG4gICAgICogQHBhcmFtIHtpbnR9IGN4IGNlbnRlci14XG4gICAgICogQHBhcmFtIHtpbnR9IGN5IGNlbnRlci15XG4gICAgICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzE3ID0gRk9WLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzE3Ll9nZXRDaXJjbGUgPSBmdW5jdGlvbiBfZ2V0Q2lyY2xlKGN4LCBjeSwgcikge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgdmFyIGRpcnMsIGNvdW50RmFjdG9yLCBzdGFydE9mZnNldDtcblxuICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgc3RhcnRPZmZzZXQgPSBbMCwgMV07XG4gICAgICAgICAgZGlycyA9IFtESVJTWzhdWzddLCBESVJTWzhdWzFdLCBESVJTWzhdWzNdLCBESVJTWzhdWzVdXTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgZGlycyA9IERJUlNbNl07XG4gICAgICAgICAgY291bnRGYWN0b3IgPSAxO1xuICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgZGlycyA9IERJUlNbNF07XG4gICAgICAgICAgY291bnRGYWN0b3IgPSAyO1xuICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCB0b3BvbG9neSBmb3IgRk9WIGNvbXB1dGF0aW9uXCIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLyogc3RhcnRpbmcgbmVpZ2hib3IgKi9cblxuXG4gICAgICB2YXIgeCA9IGN4ICsgc3RhcnRPZmZzZXRbMF0gKiByO1xuICAgICAgdmFyIHkgPSBjeSArIHN0YXJ0T2Zmc2V0WzFdICogcjtcbiAgICAgIC8qIGNpcmNsZSAqL1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByICogY291bnRGYWN0b3I7IGorKykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgeCArPSBkaXJzW2ldWzBdO1xuICAgICAgICAgIHkgKz0gZGlyc1tpXVsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICByZXR1cm4gRk9WO1xuICB9KCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgRGlzY3JldGUgc2hhZG93Y2FzdGluZyBhbGdvcml0aG0uIE9ic29sZXRlZCBieSBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcuXG4gICAqIEBhdWdtZW50cyBST1QuRk9WXG4gICAqL1xuXG5cbiAgdmFyIERpc2NyZXRlU2hhZG93Y2FzdGluZyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9GT1YpIHtcbiAgICBfaW5oZXJpdHNMb29zZShEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcsIF9GT1YpO1xuXG4gICAgZnVuY3Rpb24gRGlzY3JldGVTaGFkb3djYXN0aW5nKCkge1xuICAgICAgcmV0dXJuIF9GT1YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8xOCA9IERpc2NyZXRlU2hhZG93Y2FzdGluZy5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8xOC5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgLyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuXG4gICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8qIHN0YXJ0IGFuZCBlbmQgYW5nbGVzICovXG5cblxuICAgICAgdmFyIERBVEEgPSBbXTtcbiAgICAgIHZhciBBLCBCLCBjeCwgY3ksIGJsb2NrcztcbiAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG5cbiAgICAgIGZvciAodmFyIHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuXG4gICAgICAgIHZhciBhbmdsZSA9IDM2MCAvIG5laWdoYm9ycy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICBBID0gYW5nbGUgKiAoaSAtIDAuNSk7XG4gICAgICAgICAgQiA9IEEgKyBhbmdsZTtcbiAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcblxuICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlQ29vcmRzKE1hdGguZmxvb3IoQSksIE1hdGguY2VpbChCKSwgYmxvY2tzLCBEQVRBKSkge1xuICAgICAgICAgICAgY2FsbGJhY2soY3gsIGN5LCByLCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoREFUQS5sZW5ndGggPT0gMiAmJiBEQVRBWzBdID09IDAgJiYgREFUQVsxXSA9PSAzNjApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogY3V0b2ZmPyAqL1xuXG4gICAgICAgIH1cbiAgICAgICAgLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cblxuICAgICAgfVxuICAgICAgLyogZm9yIGFsbCByaW5ncyAqL1xuXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludH0gQSBzdGFydCBhbmdsZVxuICAgICAqIEBwYXJhbSB7aW50fSBCIGVuZCBhbmdsZVxuICAgICAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBjZWxsIGJsb2NrIHZpc2liaWxpdHk/XG4gICAgICogQHBhcmFtIHtpbnRbXVtdfSBEQVRBIHNoYWRvd2VkIGFuZ2xlIHBhaXJzXG4gICAgICovXG5cblxuICAgIF9wcm90bzE4Ll92aXNpYmxlQ29vcmRzID0gZnVuY3Rpb24gX3Zpc2libGVDb29yZHMoQSwgQiwgYmxvY2tzLCBEQVRBKSB7XG4gICAgICBpZiAoQSA8IDApIHtcbiAgICAgICAgdmFyIHYxID0gdGhpcy5fdmlzaWJsZUNvb3JkcygwLCBCLCBibG9ja3MsIERBVEEpO1xuXG4gICAgICAgIHZhciB2MiA9IHRoaXMuX3Zpc2libGVDb29yZHMoMzYwICsgQSwgMzYwLCBibG9ja3MsIERBVEEpO1xuXG4gICAgICAgIHJldHVybiB2MSB8fCB2MjtcbiAgICAgIH1cblxuICAgICAgdmFyIGluZGV4ID0gMDtcblxuICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBBKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmRleCA9PSBEQVRBLmxlbmd0aCkge1xuICAgICAgICAvKiBjb21wbGV0ZWx5IG5ldyBzaGFkb3cgKi9cbiAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgIERBVEEucHVzaChBLCBCKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICBpZiAoaW5kZXggJSAyKSB7XG4gICAgICAgIC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBpbiBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBpdHMgZW5kaW5nIGJvdW5kYXJ5ICovXG4gICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb3VudCA9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBCKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogdGhpcyBzaGFkb3cgc3RhcnRzIG91dHNpZGUgYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aXRoaW4gYSBzdGFydGluZyBib3VuZGFyeSAqL1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgLyogdmlzaWJsZSB3aGVuIG91dHNpZGUgYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aGVuIG92ZXJsYXBwaW5nICovXG5cblxuICAgICAgICBpZiAoQSA9PSBEQVRBW2luZGV4IC0gY291bnRdICYmIGNvdW50ID09IDEpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgaWYgKGNvdW50ICUgMikge1xuICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQSwgQik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEaXNjcmV0ZVNoYWRvd2Nhc3Rpbmc7XG4gIH0oRk9WKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gICAqIEBhdWdtZW50cyBST1QuRk9WXG4gICAqL1xuXG5cbiAgdmFyIFByZWNpc2VTaGFkb3djYXN0aW5nID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0ZPVjIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShQcmVjaXNlU2hhZG93Y2FzdGluZywgX0ZPVjIpO1xuXG4gICAgZnVuY3Rpb24gUHJlY2lzZVNoYWRvd2Nhc3RpbmcoKSB7XG4gICAgICByZXR1cm4gX0ZPVjIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8xOSA9IFByZWNpc2VTaGFkb3djYXN0aW5nLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzE5LmNvbXB1dGUgPSBmdW5jdGlvbiBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgIC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG5cbiAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLyogbGlzdCBvZiBhbGwgc2hhZG93cyAqL1xuXG5cbiAgICAgIHZhciBTSEFET1dTID0gW107XG4gICAgICB2YXIgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eTtcbiAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG5cbiAgICAgIGZvciAodmFyIHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuXG4gICAgICAgIHZhciBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5laWdoYm9yQ291bnQ7IGkrKykge1xuICAgICAgICAgIGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuICAgICAgICAgIGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgIC8qIHNoaWZ0IGhhbGYtYW4tYW5nbGUgYmFja3dhcmRzIHRvIG1haW50YWluIGNvbnNpc3RlbmN5IG9mIDAtdGggY2VsbHMgKi9cblxuICAgICAgICAgIEExID0gW2kgPyAyICogaSAtIDEgOiAyICogbmVpZ2hib3JDb3VudCAtIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICBBMiA9IFsyICogaSArIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcblxuICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIHZpc2liaWxpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChTSEFET1dTLmxlbmd0aCA9PSAyICYmIFNIQURPV1NbMF1bMF0gPT0gMCAmJiBTSEFET1dTWzFdWzBdID09IFNIQURPV1NbMV1bMV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogY3V0b2ZmPyAqL1xuXG4gICAgICAgIH1cbiAgICAgICAgLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cblxuICAgICAgfVxuICAgICAgLyogZm9yIGFsbCByaW5ncyAqL1xuXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XG4gICAgICogQHBhcmFtIHtpbnRbMl19IEEyIGFyYyBlbmRcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgYXJjIGJsb2NrIHZpc2liaWxpdHk/XG4gICAgICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMTkuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIF9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpIHtcbiAgICAgIGlmIChBMVswXSA+IEEyWzBdKSB7XG4gICAgICAgIC8qIHNwbGl0IGludG8gdHdvIHN1Yi1hcmNzICovXG4gICAgICAgIHZhciB2MSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShBMSwgW0ExWzFdLCBBMVsxXV0sIGJsb2NrcywgU0hBRE9XUyk7XG5cbiAgICAgICAgdmFyIHYyID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KFswLCAxXSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG5cbiAgICAgICAgcmV0dXJuICh2MSArIHYyKSAvIDI7XG4gICAgICB9XG4gICAgICAvKiBpbmRleDE6IGZpcnN0IHNoYWRvdyA+PSBBMSAqL1xuXG5cbiAgICAgIHZhciBpbmRleDEgPSAwLFxuICAgICAgICAgIGVkZ2UxID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChpbmRleDEgPCBTSEFET1dTLmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICB2YXIgZGlmZiA9IG9sZFswXSAqIEExWzFdIC0gQTFbMF0gKiBvbGRbMV07XG5cbiAgICAgICAgaWYgKGRpZmYgPj0gMCkge1xuICAgICAgICAgIC8qIG9sZCA+PSBBMSAqL1xuICAgICAgICAgIGlmIChkaWZmID09IDAgJiYgIShpbmRleDEgJSAyKSkge1xuICAgICAgICAgICAgZWRnZTEgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXgxKys7XG4gICAgICB9XG4gICAgICAvKiBpbmRleDI6IGxhc3Qgc2hhZG93IDw9IEEyICovXG5cblxuICAgICAgdmFyIGluZGV4MiA9IFNIQURPV1MubGVuZ3RoLFxuICAgICAgICAgIGVkZ2UyID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChpbmRleDItLSkge1xuICAgICAgICB2YXIgX29sZCA9IFNIQURPV1NbaW5kZXgyXTtcblxuICAgICAgICB2YXIgX2RpZmYgPSBBMlswXSAqIF9vbGRbMV0gLSBfb2xkWzBdICogQTJbMV07XG5cbiAgICAgICAgaWYgKF9kaWZmID49IDApIHtcbiAgICAgICAgICAvKiBvbGQgPD0gQTIgKi9cbiAgICAgICAgICBpZiAoX2RpZmYgPT0gMCAmJiBpbmRleDIgJSAyKSB7XG4gICAgICAgICAgICBlZGdlMiA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZpc2libGUgPSB0cnVlO1xuXG4gICAgICBpZiAoaW5kZXgxID09IGluZGV4MiAmJiAoZWRnZTEgfHwgZWRnZTIpKSB7XG4gICAgICAgIC8qIHN1YnNldCBvZiBleGlzdGluZyBzaGFkb3csIG9uZSBvZiB0aGUgZWRnZXMgbWF0Y2ggKi9cbiAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChlZGdlMSAmJiBlZGdlMiAmJiBpbmRleDEgKyAxID09IGluZGV4MiAmJiBpbmRleDIgJSAyKSB7XG4gICAgICAgIC8qIGNvbXBsZXRlbHkgZXF1aXZhbGVudCB3aXRoIGV4aXN0aW5nIHNoYWRvdyAqL1xuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4MSA+IGluZGV4MiAmJiBpbmRleDEgJSAyKSB7XG4gICAgICAgIC8qIHN1YnNldCBvZiBleGlzdGluZyBzaGFkb3csIG5vdCB0b3VjaGluZyAqL1xuICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIC8qIGZhc3QgY2FzZTogbm90IHZpc2libGUgKi9cblxuXG4gICAgICB2YXIgdmlzaWJsZUxlbmd0aDtcbiAgICAgIC8qIGNvbXB1dGUgdGhlIGxlbmd0aCBvZiB2aXNpYmxlIGFyYywgYWRqdXN0IGxpc3Qgb2Ygc2hhZG93cyAoaWYgYmxvY2tpbmcpICovXG5cbiAgICAgIHZhciByZW1vdmUgPSBpbmRleDIgLSBpbmRleDEgKyAxO1xuXG4gICAgICBpZiAocmVtb3ZlICUgMikge1xuICAgICAgICBpZiAoaW5kZXgxICUgMikge1xuICAgICAgICAgIC8qIGZpcnN0IGVkZ2Ugd2l0aGluIGV4aXN0aW5nIHNoYWRvdywgc2Vjb25kIG91dHNpZGUgKi9cbiAgICAgICAgICB2YXIgUCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKEEyWzBdICogUFsxXSAtIFBbMF0gKiBBMlsxXSkgLyAoUFsxXSAqIEEyWzFdKTtcblxuICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIHNlY29uZCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIGZpcnN0IG91dHNpZGUgKi9cbiAgICAgICAgICB2YXIgX1AgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChfUFswXSAqIEExWzFdIC0gQTFbMF0gKiBfUFsxXSkgLyAoQTFbMV0gKiBfUFsxXSk7XG5cbiAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGluZGV4MSAlIDIpIHtcbiAgICAgICAgICAvKiBib3RoIGVkZ2VzIHdpdGhpbiBleGlzdGluZyBzaGFkb3dzICovXG4gICAgICAgICAgdmFyIFAxID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICAgIHZhciBQMiA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKFAyWzBdICogUDFbMV0gLSBQMVswXSAqIFAyWzFdKSAvIChQMVsxXSAqIFAyWzFdKTtcblxuICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogYm90aCBlZGdlcyBvdXRzaWRlIGV4aXN0aW5nIHNoYWRvd3MgKi9cbiAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEsIEEyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAvKiB3aG9sZSBhcmMgdmlzaWJsZSEgKi9cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgYXJjTGVuZ3RoID0gKEEyWzBdICogQTFbMV0gLSBBMVswXSAqIEEyWzFdKSAvIChBMVsxXSAqIEEyWzFdKTtcbiAgICAgIHJldHVybiB2aXNpYmxlTGVuZ3RoIC8gYXJjTGVuZ3RoO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJlY2lzZVNoYWRvd2Nhc3Rpbmc7XG4gIH0oRk9WKTtcbiAgLyoqIE9jdGFudHMgdXNlZCBmb3IgdHJhbnNsYXRpbmcgcmVjdXJzaXZlIHNoYWRvd2Nhc3Rpbmcgb2Zmc2V0cyAqL1xuXG5cbiAgdmFyIE9DVEFOVFMgPSBbWy0xLCAwLCAwLCAxXSwgWzAsIC0xLCAxLCAwXSwgWzAsIC0xLCAtMSwgMF0sIFstMSwgMCwgMCwgLTFdLCBbMSwgMCwgMCwgLTFdLCBbMCwgMSwgLTEsIDBdLCBbMCwgMSwgMSwgMF0sIFsxLCAwLCAwLCAxXV07XG4gIC8qKlxuICAgKiBAY2xhc3MgUmVjdXJzaXZlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDQvOCB0b3BvbG9naWVzLCBub3QgaGV4YWdvbmFsLlxuICAgKiBCYXNlZCBvbiBQZXRlciBIYXJraW5zJyBpbXBsZW1lbnRhdGlvbiBvZiBCasO2cm4gQmVyZ3N0csO2bSdzIGFsZ29yaXRobSBkZXNjcmliZWQgaGVyZTogaHR0cDovL3d3dy5yb2d1ZWJhc2luLmNvbS9pbmRleC5waHA/dGl0bGU9Rk9WX3VzaW5nX3JlY3Vyc2l2ZV9zaGFkb3djYXN0aW5nXG4gICAqIEBhdWdtZW50cyBST1QuRk9WXG4gICAqL1xuXG4gIHZhciBSZWN1cnNpdmVTaGFkb3djYXN0aW5nID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX0ZPVjMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShSZWN1cnNpdmVTaGFkb3djYXN0aW5nLCBfRk9WMyk7XG5cbiAgICBmdW5jdGlvbiBSZWN1cnNpdmVTaGFkb3djYXN0aW5nKCkge1xuICAgICAgcmV0dXJuIF9GT1YzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMjAgPSBSZWN1cnNpdmVTaGFkb3djYXN0aW5nLnByb3RvdHlwZTtcblxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAzNjAtZGVncmVlIGNpcmNsZVxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBfcHJvdG8yMC5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgT0NUQU5UUy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tpXSwgUiwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDE4MC1kZWdyZWUgYXJjXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2ludH0gZGlyIERpcmVjdGlvbiB0byBsb29rIGluIChleHByZXNzZWQgaW4gYSBST1QuRElSUyB2YWx1ZSk7XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjAuY29tcHV0ZTE4MCA9IGZ1bmN0aW9uIGNvbXB1dGUxODAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICB2YXIgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuXG4gICAgICB2YXIgbmV4dFByZXZpb3VzT2N0YW50ID0gKGRpciAtIDIgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgdHdvIG9jdGFudHMgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuXG4gICAgICB2YXIgbmV4dE9jdGFudCA9IChkaXIgKyAxICsgOCkgJSA4OyAvL05lZWQgdG8gZ3JhYiB0byBuZXh0IG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW25leHRQcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG5cbiAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dE9jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDkwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIF9wcm90bzIwLmNvbXB1dGU5MCA9IGZ1bmN0aW9uIGNvbXB1dGU5MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgIHZhciBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDkwIGRlZ3JlZXNcblxuICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuXG4gICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBvbmUgb2N0YW50ICg0NS1kZWdyZWUgYXJjKSBvZiB0aGUgdmlld3NoZWRcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IG9jdGFudCBPY3RhbnQgdG8gYmUgcmVuZGVyZWRcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjAuX3JlbmRlck9jdGFudCA9IGZ1bmN0aW9uIF9yZW5kZXJPY3RhbnQoeCwgeSwgb2N0YW50LCBSLCBjYWxsYmFjaykge1xuICAgICAgLy9SYWRpdXMgaW5jcmVtZW50ZWQgYnkgMSB0byBwcm92aWRlIHNhbWUgY292ZXJhZ2UgYXJlYSBhcyBvdGhlciBzaGFkb3djYXN0aW5nIHJhZGl1c2VzXG4gICAgICB0aGlzLl9jYXN0VmlzaWJpbGl0eSh4LCB5LCAxLCAxLjAsIDAuMCwgUiArIDEsIG9jdGFudFswXSwgb2N0YW50WzFdLCBvY3RhbnRbMl0sIG9jdGFudFszXSwgY2FsbGJhY2spO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQWN0dWFsbHkgY2FsY3VsYXRlcyB0aGUgdmlzaWJpbGl0eVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFggVGhlIHN0YXJ0aW5nIFggY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFkgVGhlIHN0YXJ0aW5nIFkgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSByb3cgVGhlIHJvdyB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZVN0YXJ0IFRoZSBzbG9wZSB0byBzdGFydCBhdFxuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHZpc1Nsb3BlRW5kIFRoZSBzbG9wZSB0byBlbmQgYXRcbiAgICAgKiBAcGFyYW0ge2ludH0gcmFkaXVzIFRoZSByYWRpdXMgdG8gcmVhY2ggb3V0IHRvXG4gICAgICogQHBhcmFtIHtpbnR9IHh4XG4gICAgICogQHBhcmFtIHtpbnR9IHh5XG4gICAgICogQHBhcmFtIHtpbnR9IHl4XG4gICAgICogQHBhcmFtIHtpbnR9IHl5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHVzZSB3aGVuIHdlIGhpdCBhIGJsb2NrIHRoYXQgaXMgdmlzaWJsZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yMC5fY2FzdFZpc2liaWxpdHkgPSBmdW5jdGlvbiBfY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIHJvdywgdmlzU2xvcGVTdGFydCwgdmlzU2xvcGVFbmQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKSB7XG4gICAgICBpZiAodmlzU2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHJvdzsgaSA8PSByYWRpdXM7IGkrKykge1xuICAgICAgICB2YXIgZHggPSAtaSAtIDE7XG4gICAgICAgIHZhciBkeSA9IC1pO1xuICAgICAgICB2YXIgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgbmV3U3RhcnQgPSAwOyAvLydSb3cnIGNvdWxkIGJlIGNvbHVtbiwgbmFtZXMgaGVyZSBhc3N1bWUgb2N0YW50IDAgYW5kIHdvdWxkIGJlIGZsaXBwZWQgZm9yIGhhbGYgdGhlIG9jdGFudHNcblxuICAgICAgICB3aGlsZSAoZHggPD0gMCkge1xuICAgICAgICAgIGR4ICs9IDE7IC8vVHJhbnNsYXRlIGZyb20gcmVsYXRpdmUgY29vcmRpbmF0ZXMgdG8gbWFwIGNvb3JkaW5hdGVzXG5cbiAgICAgICAgICB2YXIgbWFwWCA9IHN0YXJ0WCArIGR4ICogeHggKyBkeSAqIHh5O1xuICAgICAgICAgIHZhciBtYXBZID0gc3RhcnRZICsgZHggKiB5eCArIGR5ICogeXk7IC8vUmFuZ2Ugb2YgdGhlIHJvd1xuXG4gICAgICAgICAgdmFyIHNsb3BlU3RhcnQgPSAoZHggLSAwLjUpIC8gKGR5ICsgMC41KTtcbiAgICAgICAgICB2YXIgc2xvcGVFbmQgPSAoZHggKyAwLjUpIC8gKGR5IC0gMC41KTsgLy9JZ25vcmUgaWYgbm90IHlldCBhdCBsZWZ0IGVkZ2Ugb2YgT2N0YW50XG5cbiAgICAgICAgICBpZiAoc2xvcGVFbmQgPiB2aXNTbG9wZVN0YXJ0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IC8vRG9uZSBpZiBwYXN0IHJpZ2h0IGVkZ2VcblxuXG4gICAgICAgICAgaWYgKHNsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSAvL0lmIGl0J3MgaW4gcmFuZ2UsIGl0J3MgdmlzaWJsZVxuXG5cbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPCByYWRpdXMgKiByYWRpdXMpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG1hcFgsIG1hcFksIGksIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghYmxvY2tlZCkge1xuICAgICAgICAgICAgLy9JZiB0aWxlIGlzIGEgYmxvY2tpbmcgdGlsZSwgY2FzdCBhcm91bmQgaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkgJiYgaSA8IHJhZGl1cykge1xuICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICB0aGlzLl9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgaSArIDEsIHZpc1Nsb3BlU3RhcnQsIHNsb3BlU3RhcnQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0tlZXAgbmFycm93aW5nIGlmIHNjYW5uaW5nIGFjcm9zcyBhIGJsb2NrXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpKSB7XG4gICAgICAgICAgICAgIG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvL0Jsb2NrIGhhcyBlbmRlZFxuXG5cbiAgICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZpc1Nsb3BlU3RhcnQgPSBuZXdTdGFydDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBSZWN1cnNpdmVTaGFkb3djYXN0aW5nO1xuICB9KEZPVik7XG5cbiAgdmFyIGluZGV4JDEgPSB7XG4gICAgRGlzY3JldGVTaGFkb3djYXN0aW5nOiBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcsXG4gICAgUHJlY2lzZVNoYWRvd2Nhc3Rpbmc6IFByZWNpc2VTaGFkb3djYXN0aW5nLFxuICAgIFJlY3Vyc2l2ZVNoYWRvd2Nhc3Rpbmc6IFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmdcbiAgfTtcblxuICB2YXIgTWFwID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEJhc2UgbWFwIGdlbmVyYXRvclxuICAgICAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXG4gICAgICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1hcCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICBpZiAod2lkdGggPT09IHZvaWQgMCkge1xuICAgICAgICB3aWR0aCA9IERFRkFVTFRfV0lEVEg7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWlnaHQgPT09IHZvaWQgMCkge1xuICAgICAgICBoZWlnaHQgPSBERUZBVUxUX0hFSUdIVDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMjEgPSBNYXAucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjEuX2ZpbGxNYXAgPSBmdW5jdGlvbiBfZmlsbE1hcCh2YWx1ZSkge1xuICAgICAgdmFyIG1hcCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgbWFwLnB1c2goW10pO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICBtYXBbaV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1hcDtcbiAgfSgpO1xuICAvKipcbiAgICogQGNsYXNzIFNpbXBsZSBlbXB0eSByZWN0YW5ndWxhciByb29tXG4gICAqIEBhdWdtZW50cyBST1QuTWFwXG4gICAqL1xuXG5cbiAgdmFyIEFyZW5hID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcCkge1xuICAgIF9pbmhlcml0c0xvb3NlKEFyZW5hLCBfTWFwKTtcblxuICAgIGZ1bmN0aW9uIEFyZW5hKCkge1xuICAgICAgcmV0dXJuIF9NYXAuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yMiA9IEFyZW5hLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzIyLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIHcgPSB0aGlzLl93aWR0aCAtIDE7XG4gICAgICB2YXIgaCA9IHRoaXMuX2hlaWdodCAtIDE7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHc7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBoOyBqKyspIHtcbiAgICAgICAgICB2YXIgZW1wdHkgPSBpICYmIGogJiYgaSA8IHcgJiYgaiA8IGg7XG4gICAgICAgICAgY2FsbGJhY2soaSwgaiwgZW1wdHkgPyAwIDogMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHJldHVybiBBcmVuYTtcbiAgfShNYXApO1xuICAvKipcbiAgICogQGNsYXNzIER1bmdlb24gbWFwOiBoYXMgcm9vbXMgYW5kIGNvcnJpZG9yc1xuICAgKiBAYXVnbWVudHMgUk9ULk1hcFxuICAgKi9cblxuXG4gIHZhciBEdW5nZW9uID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShEdW5nZW9uLCBfTWFwMik7XG5cbiAgICBmdW5jdGlvbiBEdW5nZW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIHZhciBfdGhpczEwO1xuXG4gICAgICBfdGhpczEwID0gX01hcDIuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxMC5fcm9vbXMgPSBbXTtcbiAgICAgIF90aGlzMTAuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgcmV0dXJuIF90aGlzMTA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIHJvb21zXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Sb29tW119XG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8yMyA9IER1bmdlb24ucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMjMuZ2V0Um9vbXMgPSBmdW5jdGlvbiBnZXRSb29tcygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yb29tcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIGNvcnJpZG9yc1xuICAgICAqIEByZXR1cm5zIHtST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3JbXX1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjMuZ2V0Q29ycmlkb3JzID0gZnVuY3Rpb24gZ2V0Q29ycmlkb3JzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvcnJpZG9ycztcbiAgICB9O1xuXG4gICAgcmV0dXJuIER1bmdlb247XG4gIH0oTWFwKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBEdW5nZW9uIGZlYXR1cmU7IGhhcyBvd24gLmNyZWF0ZSgpIG1ldGhvZFxuICAgKi9cblxuXG4gIHZhciBGZWF0dXJlID0gZnVuY3Rpb24gRmVhdHVyZSgpIHt9O1xuICAvKipcbiAgICogQGNsYXNzIFJvb21cbiAgICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICAgKiBAcGFyYW0ge2ludH0geDFcbiAgICogQHBhcmFtIHtpbnR9IHkxXG4gICAqIEBwYXJhbSB7aW50fSB4MlxuICAgKiBAcGFyYW0ge2ludH0geTJcbiAgICogQHBhcmFtIHtpbnR9IFtkb29yWF1cbiAgICogQHBhcmFtIHtpbnR9IFtkb29yWV1cbiAgICovXG5cblxuICB2YXIgUm9vbSA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9GZWF0dXJlKSB7XG4gICAgX2luaGVyaXRzTG9vc2UoUm9vbSwgX0ZlYXR1cmUpO1xuXG4gICAgZnVuY3Rpb24gUm9vbSh4MSwgeTEsIHgyLCB5MiwgZG9vclgsIGRvb3JZKSB7XG4gICAgICB2YXIgX3RoaXMxMTtcblxuICAgICAgX3RoaXMxMSA9IF9GZWF0dXJlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzMTEuX3gxID0geDE7XG4gICAgICBfdGhpczExLl95MSA9IHkxO1xuICAgICAgX3RoaXMxMS5feDIgPSB4MjtcbiAgICAgIF90aGlzMTEuX3kyID0geTI7XG4gICAgICBfdGhpczExLl9kb29ycyA9IHt9O1xuXG4gICAgICBpZiAoZG9vclggIT09IHVuZGVmaW5lZCAmJiBkb29yWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIF90aGlzMTEuYWRkRG9vcihkb29yWCwgZG9vclkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3RoaXMxMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplLCB3aXRoIGEgZ2l2ZW4gZG9vcnMgYW5kIGRpcmVjdGlvblxuICAgICAqL1xuICAgIFJvb20uY3JlYXRlUmFuZG9tQXQgPSBmdW5jdGlvbiBjcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcbiAgICAgIHZhciBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgIHZhciBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgIHZhciB3aWR0aCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgdmFyIGhlaWdodCA9IFJORyQxLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuXG4gICAgICBpZiAoZHggPT0gMSkge1xuICAgICAgICAvKiB0byB0aGUgcmlnaHQgKi9cbiAgICAgICAgdmFyIHkyID0geSAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHggKyAxLCB5MiwgeCArIHdpZHRoLCB5MiArIGhlaWdodCAtIDEsIHgsIHkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHggPT0gLTEpIHtcbiAgICAgICAgLyogdG8gdGhlIGxlZnQgKi9cbiAgICAgICAgdmFyIF95ID0geSAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcblxuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCAtIHdpZHRoLCBfeSwgeCAtIDEsIF95ICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSA9PSAxKSB7XG4gICAgICAgIC8qIHRvIHRoZSBib3R0b20gKi9cbiAgICAgICAgdmFyIHgyID0geCAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDIsIHkgKyAxLCB4MiArIHdpZHRoIC0gMSwgeSArIGhlaWdodCwgeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkeSA9PSAtMSkge1xuICAgICAgICAvKiB0byB0aGUgdG9wICovXG4gICAgICAgIHZhciBfeCA9IHggLSBNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcblxuICAgICAgICByZXR1cm4gbmV3IHRoaXMoX3gsIHkgLSBoZWlnaHQsIF94ICsgd2lkdGggLSAxLCB5IC0gMSwgeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImR4IG9yIGR5IG11c3QgYmUgMSBvciAtMVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUsIHBvc2l0aW9uZWQgYXJvdW5kIGNlbnRlciBjb29yZHNcbiAgICAgKi9cblxuXG4gICAgUm9vbS5jcmVhdGVSYW5kb21DZW50ZXIgPSBmdW5jdGlvbiBjcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCBvcHRpb25zKSB7XG4gICAgICB2YXIgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICB2YXIgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICB2YXIgd2lkdGggPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgIHZhciBoZWlnaHQgPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIHZhciB4MSA9IGN4IC0gTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICB2YXIgeTEgPSBjeSAtIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgIHZhciB4MiA9IHgxICsgd2lkdGggLSAxO1xuICAgICAgdmFyIHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUgd2l0aGluIGEgZ2l2ZW4gZGltZW5zaW9uc1xuICAgICAqL1xuXG5cbiAgICBSb29tLmNyZWF0ZVJhbmRvbSA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCwgb3B0aW9ucykge1xuICAgICAgdmFyIG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgdmFyIG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgdmFyIHdpZHRoID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICB2YXIgaGVpZ2h0ID0gUk5HJDEuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICB2YXIgbGVmdCA9IGF2YWlsV2lkdGggLSB3aWR0aCAtIDE7XG4gICAgICB2YXIgdG9wID0gYXZhaWxIZWlnaHQgLSBoZWlnaHQgLSAxO1xuICAgICAgdmFyIHgxID0gMSArIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogbGVmdCk7XG4gICAgICB2YXIgeTEgPSAxICsgTWF0aC5mbG9vcihSTkckMS5nZXRVbmlmb3JtKCkgKiB0b3ApO1xuICAgICAgdmFyIHgyID0geDEgKyB3aWR0aCAtIDE7XG4gICAgICB2YXIgeTIgPSB5MSArIGhlaWdodCAtIDE7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH07XG5cbiAgICB2YXIgX3Byb3RvMjQgPSBSb29tLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI0LmFkZERvb3IgPSBmdW5jdGlvbiBhZGREb29yKHgsIHkpIHtcbiAgICAgIHRoaXMuX2Rvb3JzW3ggKyBcIixcIiArIHldID0gMTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn1cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjQuZ2V0RG9vcnMgPSBmdW5jdGlvbiBnZXREb29ycyhjYikge1xuICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX2Rvb3JzKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgIGNiKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmNsZWFyRG9vcnMgPSBmdW5jdGlvbiBjbGVhckRvb3JzKCkge1xuICAgICAgdGhpcy5fZG9vcnMgPSB7fTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5hZGREb29ycyA9IGZ1bmN0aW9uIGFkZERvb3JzKGlzV2FsbENhbGxiYWNrKSB7XG4gICAgICB2YXIgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgIHZhciByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgIHZhciB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICB2YXIgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuXG4gICAgICBmb3IgKHZhciB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgIGZvciAodmFyIHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICBpZiAoeCAhPSBsZWZ0ICYmIHggIT0gcmlnaHQgJiYgeSAhPSB0b3AgJiYgeSAhPSBib3R0b20pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc1dhbGxDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5hZGREb29yKHgsIHkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5kZWJ1ZyA9IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgY29uc29sZS5sb2coXCJyb29tXCIsIHRoaXMuX3gxLCB0aGlzLl95MSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjQuaXNWYWxpZCA9IGZ1bmN0aW9uIGlzVmFsaWQoaXNXYWxsQ2FsbGJhY2ssIGNhbkJlRHVnQ2FsbGJhY2spIHtcbiAgICAgIHZhciBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgdmFyIHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgIHZhciBib3R0b20gPSB0aGlzLl95MiArIDE7XG5cbiAgICAgIGZvciAodmFyIHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHksIDEgPSB3YWxsLCAyID0gZG9vci4gTXVsdGlwbGUgZG9vcnMgYXJlIGFsbG93ZWQuXG4gICAgICovXG5cblxuICAgIF9wcm90bzI0LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgdmFyIGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICB2YXIgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICB2YXIgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgdmFyIGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgIHZhciB2YWx1ZSA9IDA7XG5cbiAgICAgIGZvciAodmFyIHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgIGlmICh4ICsgXCIsXCIgKyB5IGluIHRoaXMuX2Rvb3JzKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDI7XG4gICAgICAgICAgfSBlbHNlIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmdldENlbnRlciA9IGZ1bmN0aW9uIGdldENlbnRlcigpIHtcbiAgICAgIHJldHVybiBbTWF0aC5yb3VuZCgodGhpcy5feDEgKyB0aGlzLl94MikgLyAyKSwgTWF0aC5yb3VuZCgodGhpcy5feTEgKyB0aGlzLl95MikgLyAyKV07XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmdldExlZnQgPSBmdW5jdGlvbiBnZXRMZWZ0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3gxO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5nZXRSaWdodCA9IGZ1bmN0aW9uIGdldFJpZ2h0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3gyO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNC5nZXRUb3AgPSBmdW5jdGlvbiBnZXRUb3AoKSB7XG4gICAgICByZXR1cm4gdGhpcy5feTE7XG4gICAgfTtcblxuICAgIF9wcm90bzI0LmdldEJvdHRvbSA9IGZ1bmN0aW9uIGdldEJvdHRvbSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl95MjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJvb207XG4gIH0oRmVhdHVyZSk7XG4gIC8qKlxuICAgKiBAY2xhc3MgQ29ycmlkb3JcbiAgICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICAgKiBAcGFyYW0ge2ludH0gc3RhcnRYXG4gICAqIEBwYXJhbSB7aW50fSBzdGFydFlcbiAgICogQHBhcmFtIHtpbnR9IGVuZFhcbiAgICogQHBhcmFtIHtpbnR9IGVuZFlcbiAgICovXG5cblxuICB2YXIgQ29ycmlkb3IgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRmVhdHVyZTIpIHtcbiAgICBfaW5oZXJpdHNMb29zZShDb3JyaWRvciwgX0ZlYXR1cmUyKTtcblxuICAgIGZ1bmN0aW9uIENvcnJpZG9yKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKSB7XG4gICAgICB2YXIgX3RoaXMxMjtcblxuICAgICAgX3RoaXMxMiA9IF9GZWF0dXJlMi5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICBfdGhpczEyLl9zdGFydFggPSBzdGFydFg7XG4gICAgICBfdGhpczEyLl9zdGFydFkgPSBzdGFydFk7XG4gICAgICBfdGhpczEyLl9lbmRYID0gZW5kWDtcbiAgICAgIF90aGlzMTIuX2VuZFkgPSBlbmRZO1xuICAgICAgX3RoaXMxMi5fZW5kc1dpdGhBV2FsbCA9IHRydWU7XG4gICAgICByZXR1cm4gX3RoaXMxMjtcbiAgICB9XG5cbiAgICBDb3JyaWRvci5jcmVhdGVSYW5kb21BdCA9IGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgb3B0aW9ucykge1xuICAgICAgdmFyIG1pbiA9IG9wdGlvbnMuY29ycmlkb3JMZW5ndGhbMF07XG4gICAgICB2YXIgbWF4ID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFsxXTtcbiAgICAgIHZhciBsZW5ndGggPSBSTkckMS5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgIHJldHVybiBuZXcgdGhpcyh4LCB5LCB4ICsgZHggKiBsZW5ndGgsIHkgKyBkeSAqIGxlbmd0aCk7XG4gICAgfTtcblxuICAgIHZhciBfcHJvdG8yNSA9IENvcnJpZG9yLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI1LmRlYnVnID0gZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvcnJpZG9yXCIsIHRoaXMuX3N0YXJ0WCwgdGhpcy5fc3RhcnRZLCB0aGlzLl9lbmRYLCB0aGlzLl9lbmRZKTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjUuaXNWYWxpZCA9IGZ1bmN0aW9uIGlzVmFsaWQoaXNXYWxsQ2FsbGJhY2ssIGNhbkJlRHVnQ2FsbGJhY2spIHtcbiAgICAgIHZhciBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgIHZhciBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgIHZhciBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgIHZhciBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgIHZhciBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuXG4gICAgICBpZiAoZHgpIHtcbiAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGR5KSB7XG4gICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBueCA9IGR5O1xuICAgICAgdmFyIG55ID0gLWR4O1xuICAgICAgdmFyIG9rID0gdHJ1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgeCA9IHN4ICsgaSAqIGR4O1xuICAgICAgICB2YXIgeSA9IHN5ICsgaSAqIGR5O1xuXG4gICAgICAgIGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHggKyBueCwgeSArIG55KSkge1xuICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHggLSBueCwgeSAtIG55KSkge1xuICAgICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgbGVuZ3RoID0gaTtcbiAgICAgICAgICB0aGlzLl9lbmRYID0geCAtIGR4O1xuICAgICAgICAgIHRoaXMuX2VuZFkgPSB5IC0gZHk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogSWYgdGhlIGxlbmd0aCBkZWdlbmVyYXRlZCwgdGhpcyBjb3JyaWRvciBtaWdodCBiZSBpbnZhbGlkXG4gICAgICAgKi9cblxuICAgICAgLyogbm90IHN1cHBvcnRlZCAqL1xuXG5cbiAgICAgIGlmIChsZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvKiBsZW5ndGggMSBhbGxvd2VkIG9ubHkgaWYgdGhlIG5leHQgc3BhY2UgaXMgZW1wdHkgKi9cblxuXG4gICAgICBpZiAobGVuZ3RoID09IDEgJiYgaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogV2UgZG8gbm90IHdhbnQgdGhlIGNvcnJpZG9yIHRvIGNyYXNoIGludG8gYSBjb3JuZXIgb2YgYSByb29tO1xuICAgICAgICogaWYgYW55IG9mIHRoZSBlbmRpbmcgY29ybmVycyBpcyBlbXB0eSwgdGhlIE4rMXRoIGNlbGwgb2YgdGhpcyBjb3JyaWRvciBtdXN0IGJlIGVtcHR5IHRvby5cbiAgICAgICAqXG4gICAgICAgKiBTaXR1YXRpb246XG4gICAgICAgKiAjIyMjIyMjMVxuICAgICAgICogLi4uLi4uLj9cbiAgICAgICAqICMjIyMjIyMyXG4gICAgICAgKlxuICAgICAgICogVGhlIGNvcnJpZG9yIHdhcyBkdWcgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgICAgICogMSwgMiAtIHByb2JsZW1hdGljIGNvcm5lcnMsID8gPSBOKzF0aCBjZWxsIChub3QgZHVnKVxuICAgICAgICovXG5cblxuICAgICAgdmFyIGZpcnN0Q29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCArIG54LCB0aGlzLl9lbmRZICsgZHkgKyBueSk7XG4gICAgICB2YXIgc2Vjb25kQ29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCAtIG54LCB0aGlzLl9lbmRZICsgZHkgLSBueSk7XG4gICAgICB0aGlzLl9lbmRzV2l0aEFXYWxsID0gaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xuXG4gICAgICBpZiAoKGZpcnN0Q29ybmVyQmFkIHx8IHNlY29uZENvcm5lckJhZCkgJiYgdGhpcy5fZW5kc1dpdGhBV2FsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHkuXG4gICAgICovXG5cblxuICAgIF9wcm90bzI1LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgdmFyIHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgdmFyIHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgdmFyIGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgdmFyIGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgdmFyIGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG5cbiAgICAgIGlmIChkeCkge1xuICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkpIHtcbiAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgeCA9IHN4ICsgaSAqIGR4O1xuICAgICAgICB2YXIgeSA9IHN5ICsgaSAqIGR5O1xuICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9wcm90bzI1LmNyZWF0ZVByaW9yaXR5V2FsbHMgPSBmdW5jdGlvbiBjcmVhdGVQcmlvcml0eVdhbGxzKHByaW9yaXR5V2FsbENhbGxiYWNrKSB7XG4gICAgICBpZiAoIXRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICB2YXIgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICB2YXIgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICB2YXIgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG5cbiAgICAgIGlmIChkeCkge1xuICAgICAgICBkeCA9IGR4IC8gTWF0aC5hYnMoZHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHkpIHtcbiAgICAgICAgZHkgPSBkeSAvIE1hdGguYWJzKGR5KTtcbiAgICAgIH1cblxuICAgICAgdmFyIG54ID0gZHk7XG4gICAgICB2YXIgbnkgPSAtZHg7XG4gICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSk7XG4gICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgbngsIHRoaXMuX2VuZFkgKyBueSk7XG4gICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYIC0gbngsIHRoaXMuX2VuZFkgLSBueSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb3JyaWRvcjtcbiAgfShGZWF0dXJlKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB0cmllcyB0byBmaWxsIHRoZSBzcGFjZSBldmVubHkuIEdlbmVyYXRlcyBpbmRlcGVuZGVudCByb29tcyBhbmQgdHJpZXMgdG8gY29ubmVjdCB0aGVtLlxuICAgKiBAYXVnbWVudHMgUk9ULk1hcC5EdW5nZW9uXG4gICAqL1xuXG5cbiAgdmFyIFVuaWZvcm0gPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfRHVuZ2Vvbikge1xuICAgIF9pbmhlcml0c0xvb3NlKFVuaWZvcm0sIF9EdW5nZW9uKTtcblxuICAgIGZ1bmN0aW9uIFVuaWZvcm0od2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMTM7XG5cbiAgICAgIF90aGlzMTMgPSBfRHVuZ2Vvbi5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczEzLl9vcHRpb25zID0ge1xuICAgICAgICByb29tV2lkdGg6IFszLCA5XSxcbiAgICAgICAgcm9vbUhlaWdodDogWzMsIDVdLFxuICAgICAgICByb29tRHVnUGVyY2VudGFnZTogMC4xLFxuICAgICAgICB0aW1lTGltaXQ6IDEwMDBcbiAgICAgICAgLyogd2Ugc3RvcCBhZnRlciB0aGlzIG11Y2ggdGltZSBoYXMgcGFzc2VkIChtc2VjKSAqL1xuXG4gICAgICB9O1xuICAgICAgT2JqZWN0LmFzc2lnbihfdGhpczEzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIF90aGlzMTMuX21hcCA9IFtdO1xuICAgICAgX3RoaXMxMy5fZHVnID0gMDtcbiAgICAgIF90aGlzMTMuX3Jvb21BdHRlbXB0cyA9IDIwO1xuICAgICAgLyogbmV3IHJvb20gaXMgY3JlYXRlZCBOLXRpbWVzIHVudGlsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBnZW5lcmF0ZSAqL1xuXG4gICAgICBfdGhpczEzLl9jb3JyaWRvckF0dGVtcHRzID0gMjA7XG4gICAgICAvKiBjb3JyaWRvcnMgYXJlIHRyaWVkIE4tdGltZXMgdW50aWwgdGhlIGxldmVsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBjb25uZWN0ICovXG5cbiAgICAgIF90aGlzMTMuX2Nvbm5lY3RlZCA9IFtdO1xuICAgICAgLyogbGlzdCBvZiBhbHJlYWR5IGNvbm5lY3RlZCByb29tcyAqL1xuXG4gICAgICBfdGhpczEzLl91bmNvbm5lY3RlZCA9IFtdO1xuICAgICAgLyogbGlzdCBvZiByZW1haW5pbmcgdW5jb25uZWN0ZWQgcm9vbXMgKi9cblxuICAgICAgX3RoaXMxMy5fZGlnQ2FsbGJhY2sgPSBfdGhpczEzLl9kaWdDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczEzKSkpO1xuICAgICAgX3RoaXMxMy5fY2FuQmVEdWdDYWxsYmFjayA9IF90aGlzMTMuX2NhbkJlRHVnQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxMykpKTtcbiAgICAgIF90aGlzMTMuX2lzV2FsbENhbGxiYWNrID0gX3RoaXMxMy5faXNXYWxsQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxMykpKTtcbiAgICAgIHJldHVybiBfdGhpczEzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBtYXAuIElmIHRoZSB0aW1lIGxpbWl0IGhhcyBiZWVuIGhpdCwgcmV0dXJucyBudWxsLlxuICAgICAqIEBzZWUgUk9ULk1hcCNjcmVhdGVcbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzI2ID0gVW5pZm9ybS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yNi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHZhciB0MSA9IERhdGUubm93KCk7XG5cbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHZhciB0MiA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qIHRpbWUgbGltaXQhICovXG5cblxuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2dlbmVyYXRlUm9vbXMoKTtcblxuICAgICAgICBpZiAodGhpcy5fcm9vbXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2dlbmVyYXRlQ29ycmlkb3JzKCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBzdWl0YWJsZSBhbW91bnQgb2Ygcm9vbXNcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjYuX2dlbmVyYXRlUm9vbXMgPSBmdW5jdGlvbiBfZ2VuZXJhdGVSb29tcygpIHtcbiAgICAgIHZhciB3ID0gdGhpcy5fd2lkdGggLSAyO1xuICAgICAgdmFyIGggPSB0aGlzLl9oZWlnaHQgLSAyO1xuICAgICAgdmFyIHJvb207XG5cbiAgICAgIGRvIHtcbiAgICAgICAgcm9vbSA9IHRoaXMuX2dlbmVyYXRlUm9vbSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kdWcgLyAodyAqIGgpID4gdGhpcy5fb3B0aW9ucy5yb29tRHVnUGVyY2VudGFnZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8qIGFjaGlldmVkIHJlcXVlc3RlZCBhbW91bnQgb2YgZnJlZSBzcGFjZSAqL1xuXG4gICAgICB9IHdoaWxlIChyb29tKTtcbiAgICAgIC8qIGVpdGhlciBlbm91Z2ggcm9vbXMsIG9yIG5vdCBhYmxlIHRvIGdlbmVyYXRlIG1vcmUgb2YgdGhlbSA6KSAqL1xuXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcnkgdG8gZ2VuZXJhdGUgb25lIHJvb21cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjYuX2dlbmVyYXRlUm9vbSA9IGZ1bmN0aW9uIF9nZW5lcmF0ZVJvb20oKSB7XG4gICAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgICB3aGlsZSAoY291bnQgPCB0aGlzLl9yb29tQXR0ZW1wdHMpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgdmFyIHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbSh0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0LCB0aGlzLl9vcHRpb25zKTtcblxuICAgICAgICBpZiAoIXJvb20uaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcblxuICAgICAgICB0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xuXG4gICAgICAgIHJldHVybiByb29tO1xuICAgICAgfVxuICAgICAgLyogbm8gcm9vbSB3YXMgZ2VuZXJhdGVkIGluIGEgZ2l2ZW4gbnVtYmVyIG9mIGF0dGVtcHRzICovXG5cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgY29ubmVjdG9ycyBiZXdlZW4gcm9vbXNcbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2VzcyBXYXMgdGhpcyBhdHRlbXB0IHN1Y2Nlc3NmdWxsP1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNi5fZ2VuZXJhdGVDb3JyaWRvcnMgPSBmdW5jdGlvbiBfZ2VuZXJhdGVDb3JyaWRvcnMoKSB7XG4gICAgICB2YXIgY250ID0gMDtcblxuICAgICAgd2hpbGUgKGNudCA8IHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMpIHtcbiAgICAgICAgY250Kys7XG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgICAvKiBkaWcgcm9vbXMgaW50byBhIGNsZWFyIG1hcCAqL1xuXG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciByb29tID0gdGhpcy5fcm9vbXNbaV07XG4gICAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBSTkckMS5zaHVmZmxlKHRoaXMuX3Jvb21zLnNsaWNlKCkpO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBbXTtcblxuICAgICAgICBpZiAodGhpcy5fdW5jb25uZWN0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2godGhpcy5fdW5jb25uZWN0ZWQucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGZpcnN0IG9uZSBpcyBhbHdheXMgY29ubmVjdGVkICovXG5cblxuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgIC8qIDEuIHBpY2sgcmFuZG9tIGNvbm5lY3RlZCByb29tICovXG4gICAgICAgICAgdmFyIGNvbm5lY3RlZCA9IFJORyQxLmdldEl0ZW0odGhpcy5fY29ubmVjdGVkKTtcblxuICAgICAgICAgIGlmICghY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogMi4gZmluZCBjbG9zZXN0IHVuY29ubmVjdGVkICovXG5cblxuICAgICAgICAgIHZhciByb29tMSA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX3VuY29ubmVjdGVkLCBjb25uZWN0ZWQpO1xuXG4gICAgICAgICAgaWYgKCFyb29tMSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIDMuIGNvbm5lY3QgaXQgdG8gY2xvc2VzdCBjb25uZWN0ZWQgKi9cblxuXG4gICAgICAgICAgdmFyIHJvb20yID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fY29ubmVjdGVkLCByb29tMSk7XG5cbiAgICAgICAgICBpZiAoIXJvb20yKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgb2sgPSB0aGlzLl9jb25uZWN0Um9vbXMocm9vbTEsIHJvb20yKTtcblxuICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBzdG9wIGNvbm5lY3RpbmcsIHJlLXNodWZmbGUgKi9cblxuXG4gICAgICAgICAgaWYgKCF0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBkb25lOyBubyByb29tcyByZW1haW4gKi9cblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRm9yIGEgZ2l2ZW4gcm9vbSwgZmluZCB0aGUgY2xvc2VzdCBvbmUgZnJvbSB0aGUgbGlzdFxuICAgICAqL1xuICAgIF9wcm90bzI2Ll9jbG9zZXN0Um9vbSA9IGZ1bmN0aW9uIF9jbG9zZXN0Um9vbShyb29tcywgcm9vbSkge1xuICAgICAgdmFyIGRpc3QgPSBJbmZpbml0eTtcbiAgICAgIHZhciBjZW50ZXIgPSByb29tLmdldENlbnRlcigpO1xuICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHIgPSByb29tc1tpXTtcbiAgICAgICAgdmFyIGMgPSByLmdldENlbnRlcigpO1xuICAgICAgICB2YXIgZHggPSBjWzBdIC0gY2VudGVyWzBdO1xuICAgICAgICB2YXIgZHkgPSBjWzFdIC0gY2VudGVyWzFdO1xuICAgICAgICB2YXIgZCA9IGR4ICogZHggKyBkeSAqIGR5O1xuXG4gICAgICAgIGlmIChkIDwgZGlzdCkge1xuICAgICAgICAgIGRpc3QgPSBkO1xuICAgICAgICAgIHJlc3VsdCA9IHI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjYuX2Nvbm5lY3RSb29tcyA9IGZ1bmN0aW9uIF9jb25uZWN0Um9vbXMocm9vbTEsIHJvb20yKSB7XG4gICAgICAvKlxuICAgICAgICAgIHJvb20xLmRlYnVnKCk7XG4gICAgICAgICAgcm9vbTIuZGVidWcoKTtcbiAgICAgICovXG4gICAgICB2YXIgY2VudGVyMSA9IHJvb20xLmdldENlbnRlcigpO1xuICAgICAgdmFyIGNlbnRlcjIgPSByb29tMi5nZXRDZW50ZXIoKTtcbiAgICAgIHZhciBkaWZmWCA9IGNlbnRlcjJbMF0gLSBjZW50ZXIxWzBdO1xuICAgICAgdmFyIGRpZmZZID0gY2VudGVyMlsxXSAtIGNlbnRlcjFbMV07XG4gICAgICB2YXIgc3RhcnQ7XG4gICAgICB2YXIgZW5kO1xuICAgICAgdmFyIGRpckluZGV4MSwgZGlySW5kZXgyLCBtaW4sIG1heCwgaW5kZXg7XG5cbiAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPCBNYXRoLmFicyhkaWZmWSkpIHtcbiAgICAgICAgLyogZmlyc3QgdHJ5IGNvbm5lY3Rpbmcgbm9ydGgtc291dGggd2FsbHMgKi9cbiAgICAgICAgZGlySW5kZXgxID0gZGlmZlkgPiAwID8gMiA6IDA7XG4gICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XG4gICAgICAgIG1pbiA9IHJvb20yLmdldExlZnQoKTtcbiAgICAgICAgbWF4ID0gcm9vbTIuZ2V0UmlnaHQoKTtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogZmlyc3QgdHJ5IGNvbm5lY3RpbmcgZWFzdC13ZXN0IHdhbGxzICovXG4gICAgICAgIGRpckluZGV4MSA9IGRpZmZYID4gMCA/IDEgOiAzO1xuICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICBtaW4gPSByb29tMi5nZXRUb3AoKTtcbiAgICAgICAgbWF4ID0gcm9vbTIuZ2V0Qm90dG9tKCk7XG4gICAgICAgIGluZGV4ID0gMTtcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMSwgZGlySW5kZXgxKTtcbiAgICAgIC8qIGNvcnJpZG9yIHdpbGwgc3RhcnQgaGVyZSAqL1xuXG4gICAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0W2luZGV4XSA+PSBtaW4gJiYgc3RhcnRbaW5kZXhdIDw9IG1heCkge1xuICAgICAgICAvKiBwb3NzaWJsZSB0byBjb25uZWN0IHdpdGggc3RyYWlnaHQgbGluZSAoSS1saWtlKSAqL1xuICAgICAgICBlbmQgPSBzdGFydC5zbGljZSgpO1xuICAgICAgICB2YXIgdmFsdWUgPSAwO1xuXG4gICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRUb3AoKSAtIDE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0UmlnaHQoKSArIDE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0Qm90dG9tKCkgKyAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldExlZnQoKSAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZFsoaW5kZXggKyAxKSAlIDJdID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIGVuZF0pO1xuICAgICAgfSBlbHNlIGlmIChzdGFydFtpbmRleF0gPCBtaW4gLSAxIHx8IHN0YXJ0W2luZGV4XSA+IG1heCArIDEpIHtcbiAgICAgICAgLyogbmVlZCB0byBzd2l0Y2ggdGFyZ2V0IHdhbGwgKEwtbGlrZSkgKi9cbiAgICAgICAgdmFyIGRpZmYgPSBzdGFydFtpbmRleF0gLSBjZW50ZXIyW2luZGV4XTtcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gMDtcblxuICAgICAgICBzd2l0Y2ggKGRpckluZGV4Mikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByb3RhdGlvbiA9IGRpZmYgPCAwID8gMyA6IDE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByb3RhdGlvbiA9IGRpZmYgPCAwID8gMSA6IDM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDIgKyByb3RhdGlvbikgJSA0O1xuICAgICAgICBlbmQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMiwgZGlySW5kZXgyKTtcblxuICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtaWQgPSBbMCwgMF07XG4gICAgICAgIG1pZFtpbmRleF0gPSBzdGFydFtpbmRleF07XG4gICAgICAgIHZhciBpbmRleDIgPSAoaW5kZXggKyAxKSAlIDI7XG4gICAgICAgIG1pZFtpbmRleDJdID0gZW5kW2luZGV4Ml07XG5cbiAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIG1pZCwgZW5kXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiB1c2UgY3VycmVudCB3YWxsIHBhaXIsIGJ1dCBhZGp1c3QgdGhlIGxpbmUgaW4gdGhlIG1pZGRsZSAoUy1saWtlKSAqL1xuICAgICAgICB2YXIgX2luZGV4NCA9IChpbmRleCArIDEpICUgMjtcblxuICAgICAgICBlbmQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMiwgZGlySW5kZXgyKTtcblxuICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfbWlkID0gTWF0aC5yb3VuZCgoZW5kW19pbmRleDRdICsgc3RhcnRbX2luZGV4NF0pIC8gMik7XG5cbiAgICAgICAgdmFyIG1pZDEgPSBbMCwgMF07XG4gICAgICAgIHZhciBtaWQyID0gWzAsIDBdO1xuICAgICAgICBtaWQxW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgbWlkMVtfaW5kZXg0XSA9IF9taWQ7XG4gICAgICAgIG1pZDJbaW5kZXhdID0gZW5kW2luZGV4XTtcbiAgICAgICAgbWlkMltfaW5kZXg0XSA9IF9taWQ7XG5cbiAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIG1pZDEsIG1pZDIsIGVuZF0pO1xuICAgICAgfVxuXG4gICAgICByb29tMS5hZGREb29yKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICByb29tMi5hZGREb29yKGVuZFswXSwgZW5kWzFdKTtcbiAgICAgIGluZGV4ID0gdGhpcy5fdW5jb25uZWN0ZWQuaW5kZXhPZihyb29tMSk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHJvb20xKTtcbiAgICAgIH1cblxuICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20yKTtcblxuICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgIHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjYuX3BsYWNlSW5XYWxsID0gZnVuY3Rpb24gX3BsYWNlSW5XYWxsKHJvb20sIGRpckluZGV4KSB7XG4gICAgICB2YXIgc3RhcnQgPSBbMCwgMF07XG4gICAgICB2YXIgZGlyID0gWzAsIDBdO1xuICAgICAgdmFyIGxlbmd0aCA9IDA7XG5cbiAgICAgIHN3aXRjaCAoZGlySW5kZXgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRUb3AoKSAtIDFdO1xuICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0UmlnaHQoKSArIDEsIHJvb20uZ2V0VG9wKCldO1xuICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCkgLSByb29tLmdldFRvcCgpICsgMTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgZGlyID0gWzEsIDBdO1xuICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpLCByb29tLmdldEJvdHRvbSgpICsgMV07XG4gICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRSaWdodCgpIC0gcm9vbS5nZXRMZWZ0KCkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCkgLSAxLCByb29tLmdldFRvcCgpXTtcbiAgICAgICAgICBsZW5ndGggPSByb29tLmdldEJvdHRvbSgpIC0gcm9vbS5nZXRUb3AoKSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBhdmFpbCA9IFtdO1xuICAgICAgdmFyIGxhc3RCYWRJbmRleCA9IC0yO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB4ID0gc3RhcnRbMF0gKyBpICogZGlyWzBdO1xuICAgICAgICB2YXIgeSA9IHN0YXJ0WzFdICsgaSAqIGRpclsxXTtcbiAgICAgICAgYXZhaWwucHVzaChudWxsKTtcbiAgICAgICAgdmFyIGlzV2FsbCA9IHRoaXMuX21hcFt4XVt5XSA9PSAxO1xuXG4gICAgICAgIGlmIChpc1dhbGwpIHtcbiAgICAgICAgICBpZiAobGFzdEJhZEluZGV4ICE9IGkgLSAxKSB7XG4gICAgICAgICAgICBhdmFpbFtpXSA9IFt4LCB5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGFzdEJhZEluZGV4ID0gaTtcblxuICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICBhdmFpbFtpIC0gMV0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaTQgPSBhdmFpbC5sZW5ndGggLSAxOyBfaTQgPj0gMDsgX2k0LS0pIHtcbiAgICAgICAgaWYgKCFhdmFpbFtfaTRdKSB7XG4gICAgICAgICAgYXZhaWwuc3BsaWNlKF9pNCwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF2YWlsLmxlbmd0aCA/IFJORyQxLmdldEl0ZW0oYXZhaWwpIDogbnVsbDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIERpZyBhIHBvbHlsaW5lLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNi5fZGlnTGluZSA9IGZ1bmN0aW9uIF9kaWdMaW5lKHBvaW50cykge1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gcG9pbnRzW2kgLSAxXTtcbiAgICAgICAgdmFyIGVuZCA9IHBvaW50c1tpXTtcbiAgICAgICAgdmFyIGNvcnJpZG9yID0gbmV3IENvcnJpZG9yKHN0YXJ0WzBdLCBzdGFydFsxXSwgZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgICBjb3JyaWRvci5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuXG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycy5wdXNoKGNvcnJpZG9yKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMjYuX2RpZ0NhbGxiYWNrID0gZnVuY3Rpb24gX2RpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKSB7XG4gICAgICB0aGlzLl9tYXBbeF1beV0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgdGhpcy5fZHVnKys7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI2Ll9pc1dhbGxDYWxsYmFjayA9IGZ1bmN0aW9uIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9tYXBbeF1beV0gPT0gMTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjYuX2NhbkJlRHVnQ2FsbGJhY2sgPSBmdW5jdGlvbiBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCArIDEgPj0gdGhpcy5fd2lkdGggfHwgeSArIDEgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21hcFt4XVt5XSA9PSAxO1xuICAgIH07XG5cbiAgICByZXR1cm4gVW5pZm9ybTtcbiAgfShEdW5nZW9uKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBDZWxsdWxhciBhdXRvbWF0b24gbWFwIGdlbmVyYXRvclxuICAgKiBAYXVnbWVudHMgUk9ULk1hcFxuICAgKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxuICAgKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gT3B0aW9uc1xuICAgKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5ib3JuXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYSBuZXcgY2VsbCB0byBiZSBib3JuIGluIGVtcHR5IHNwYWNlXG4gICAqIEBwYXJhbSB7aW50W119IFtvcHRpb25zLnN1cnZpdmVdIExpc3Qgb2YgbmVpZ2hib3IgY291bnRzIGZvciBhbiBleGlzdGluZyAgY2VsbCB0byBzdXJ2aXZlXG4gICAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neV0gVG9wb2xvZ3kgNCBvciA2IG9yIDhcbiAgICovXG5cblxuICB2YXIgQ2VsbHVsYXIgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwMykge1xuICAgIF9pbmhlcml0c0xvb3NlKENlbGx1bGFyLCBfTWFwMyk7XG5cbiAgICBmdW5jdGlvbiBDZWxsdWxhcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMxNDtcblxuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIF90aGlzMTQgPSBfTWFwMy5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczE0Ll9vcHRpb25zID0ge1xuICAgICAgICBib3JuOiBbNSwgNiwgNywgOF0sXG4gICAgICAgIHN1cnZpdmU6IFs0LCA1LCA2LCA3LCA4XSxcbiAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgIH07XG5cbiAgICAgIF90aGlzMTQuc2V0T3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgX3RoaXMxNC5fZGlycyA9IERJUlNbX3RoaXMxNC5fb3B0aW9ucy50b3BvbG9neV07XG4gICAgICBfdGhpczE0Ll9tYXAgPSBfdGhpczE0Ll9maWxsTWFwKDApO1xuICAgICAgcmV0dXJuIF90aGlzMTQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbGwgdGhlIG1hcCB3aXRoIHJhbmRvbSB2YWx1ZXNcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSBwcm9iYWJpbGl0eSBQcm9iYWJpbGl0eSBmb3IgYSBjZWxsIHRvIGJlY29tZSBhbGl2ZTsgMCA9IGFsbCBlbXB0eSwgMSA9IGFsbCBmdWxsXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8yNyA9IENlbGx1bGFyLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI3LnJhbmRvbWl6ZSA9IGZ1bmN0aW9uIHJhbmRvbWl6ZShwcm9iYWJpbGl0eSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICB0aGlzLl9tYXBbaV1bal0gPSBSTkckMS5nZXRVbmlmb3JtKCkgPCBwcm9iYWJpbGl0eSA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIG9wdGlvbnMuXG4gICAgICogQHNlZSBST1QuTWFwLkNlbGx1bGFyXG4gICAgICovXG5cblxuICAgIF9wcm90bzI3LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgfTtcblxuICAgIF9wcm90bzI3LnNldCA9IGZ1bmN0aW9uIHNldCh4LCB5LCB2YWx1ZSkge1xuICAgICAgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7XG4gICAgfTtcblxuICAgIF9wcm90bzI3LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIG5ld01hcCA9IHRoaXMuX2ZpbGxNYXAoMCk7XG5cbiAgICAgIHZhciBib3JuID0gdGhpcy5fb3B0aW9ucy5ib3JuO1xuICAgICAgdmFyIHN1cnZpdmUgPSB0aGlzLl9vcHRpb25zLnN1cnZpdmU7XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgdmFyIHdpZHRoU3RlcCA9IDE7XG4gICAgICAgIHZhciB3aWR0aFN0YXJ0ID0gMDtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgIHZhciBjdXIgPSB0aGlzLl9tYXBbaV1bal07XG5cbiAgICAgICAgICB2YXIgbmNvdW50ID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGksIGopO1xuXG4gICAgICAgICAgaWYgKGN1ciAmJiBzdXJ2aXZlLmluZGV4T2YobmNvdW50KSAhPSAtMSkge1xuICAgICAgICAgICAgLyogc3Vydml2ZSAqL1xuICAgICAgICAgICAgbmV3TWFwW2ldW2pdID0gMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFjdXIgJiYgYm9ybi5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIC8qIGJvcm4gKi9cbiAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21hcCA9IG5ld01hcDtcbiAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll9zZXJ2aWNlQ2FsbGJhY2sgPSBmdW5jdGlvbiBfc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgIHZhciB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICB2YXIgd2lkdGhTdGFydCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgd2lkdGhTdGFydCA9IGogJSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IHdpZHRoU3RhcnQ7IGkgPCB0aGlzLl93aWR0aDsgaSArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbmVpZ2hib3IgY291bnQgYXQgW2ksal0gaW4gdGhpcy5fbWFwXG4gICAgICovXG5cblxuICAgIF9wcm90bzI3Ll9nZXROZWlnaGJvcnMgPSBmdW5jdGlvbiBfZ2V0TmVpZ2hib3JzKGN4LCBjeSkge1xuICAgICAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGlyID0gdGhpcy5fZGlyc1tpXTtcbiAgICAgICAgdmFyIHggPSBjeCArIGRpclswXTtcbiAgICAgICAgdmFyIHkgPSBjeSArIGRpclsxXTtcblxuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5IDwgMCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ICs9IHRoaXMuX21hcFt4XVt5XSA9PSAxID8gMSA6IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgZXZlcnkgbm9uLXdhbGwgc3BhY2UgaXMgYWNjZXNzaWJsZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHRvIGRpc3BsYXkgbWFwIHdoZW4gZG9cbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgdG8gY29uc2lkZXIgZW1wdHkgc3BhY2UgLSBkZWZhdWx0cyB0byAwXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgdG8gY2FsbCB3aGVuIGEgbmV3IGNvbm5lY3Rpb24gaXMgbWFkZVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNy5jb25uZWN0ID0gZnVuY3Rpb24gY29ubmVjdChjYWxsYmFjaywgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwO1xuICAgICAgdmFyIGFsbEZyZWVTcGFjZSA9IFtdO1xuICAgICAgdmFyIG5vdENvbm5lY3RlZCA9IHt9OyAvLyBmaW5kIGFsbCBmcmVlIHNwYWNlXG5cbiAgICAgIHZhciB3aWR0aFN0ZXAgPSAxO1xuICAgICAgdmFyIHdpZHRoU3RhcnRzID0gWzAsIDBdO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgIHdpZHRoU3RhcnRzID0gWzAsIDFdO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHRoaXMuX2hlaWdodDsgeSsrKSB7XG4gICAgICAgIGZvciAodmFyIHggPSB3aWR0aFN0YXJ0c1t5ICUgMl07IHggPCB0aGlzLl93aWR0aDsgeCArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICBpZiAodGhpcy5fZnJlZVNwYWNlKHgsIHksIHZhbHVlKSkge1xuICAgICAgICAgICAgdmFyIHAgPSBbeCwgeV07XG4gICAgICAgICAgICBub3RDb25uZWN0ZWRbdGhpcy5fcG9pbnRLZXkocCldID0gcDtcbiAgICAgICAgICAgIGFsbEZyZWVTcGFjZS5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGFydCA9IGFsbEZyZWVTcGFjZVtSTkckMS5nZXRVbmlmb3JtSW50KDAsIGFsbEZyZWVTcGFjZS5sZW5ndGggLSAxKV07XG5cbiAgICAgIHZhciBrZXkgPSB0aGlzLl9wb2ludEtleShzdGFydCk7XG5cbiAgICAgIHZhciBjb25uZWN0ZWQgPSB7fTtcbiAgICAgIGNvbm5lY3RlZFtrZXldID0gc3RhcnQ7XG4gICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tleV07IC8vIGZpbmQgd2hhdCdzIGNvbm5lY3RlZCB0byB0aGUgc3RhcnRpbmcgcG9pbnRcblxuICAgICAgdGhpcy5fZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgW3N0YXJ0XSwgZmFsc2UsIHZhbHVlKTtcblxuICAgICAgd2hpbGUgKE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyBmaW5kIHR3byBwb2ludHMgZnJvbSBub3RDb25uZWN0ZWQgdG8gY29ubmVjdGVkXG4gICAgICAgIHZhciBfcCA9IHRoaXMuX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCk7XG5cbiAgICAgICAgdmFyIGZyb20gPSBfcFswXTsgLy8gbm90Q29ubmVjdGVkXG5cbiAgICAgICAgdmFyIHRvID0gX3BbMV07IC8vIGNvbm5lY3RlZFxuICAgICAgICAvLyBmaW5kIGV2ZXJ5dGhpbmcgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuXG4gICAgICAgIHZhciBsb2NhbCA9IHt9O1xuICAgICAgICBsb2NhbFt0aGlzLl9wb2ludEtleShmcm9tKV0gPSBmcm9tO1xuXG4gICAgICAgIHRoaXMuX2ZpbmRDb25uZWN0ZWQobG9jYWwsIG5vdENvbm5lY3RlZCwgW2Zyb21dLCB0cnVlLCB2YWx1ZSk7IC8vIGNvbm5lY3QgdG8gYSBjb25uZWN0ZWQgY2VsbFxuXG5cbiAgICAgICAgdmFyIHR1bm5lbEZuID0gdGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2ID8gdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQ2IDogdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQ7XG4gICAgICAgIHR1bm5lbEZuLmNhbGwodGhpcywgdG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKTsgLy8gbm93IGFsbCBvZiBsb2NhbCBpcyBjb25uZWN0ZWRcblxuICAgICAgICBmb3IgKHZhciBrIGluIGxvY2FsKSB7XG4gICAgICAgICAgdmFyIHBwID0gbG9jYWxba107XG4gICAgICAgICAgdGhpcy5fbWFwW3BwWzBdXVtwcFsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICBjb25uZWN0ZWRba10gPSBwcDtcbiAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIHJhbmRvbSBwb2ludHMgdG8gY29ubmVjdC4gU2VhcmNoIGZvciB0aGUgY2xvc2VzdCBwb2ludCBpbiB0aGUgbGFyZ2VyIHNwYWNlLlxuICAgICAqIFRoaXMgaXMgdG8gbWluaW1pemUgdGhlIGxlbmd0aCBvZiB0aGUgcGFzc2FnZSB3aGlsZSBtYWludGFpbmluZyBnb29kIHBlcmZvcm1hbmNlLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yNy5fZ2V0RnJvbVRvID0gZnVuY3Rpb24gX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCkge1xuICAgICAgdmFyIGZyb20gPSBbMCwgMF0sXG4gICAgICAgICAgdG8gPSBbMCwgMF0sXG4gICAgICAgICAgZDtcbiAgICAgIHZhciBjb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoY29ubmVjdGVkKTtcbiAgICAgIHZhciBub3RDb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgaWYgKGNvbm5lY3RlZEtleXMubGVuZ3RoIDwgbm90Q29ubmVjdGVkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIga2V5cyA9IGNvbm5lY3RlZEtleXM7XG4gICAgICAgICAgdG8gPSBjb25uZWN0ZWRba2V5c1tSTkckMS5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICBmcm9tID0gdGhpcy5fZ2V0Q2xvc2VzdCh0bywgbm90Q29ubmVjdGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgX2tleXMgPSBub3RDb25uZWN0ZWRLZXlzO1xuICAgICAgICAgIGZyb20gPSBub3RDb25uZWN0ZWRbX2tleXNbUk5HJDEuZ2V0VW5pZm9ybUludCgwLCBfa2V5cy5sZW5ndGggLSAxKV1dO1xuICAgICAgICAgIHRvID0gdGhpcy5fZ2V0Q2xvc2VzdChmcm9tLCBjb25uZWN0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZCA9IChmcm9tWzBdIC0gdG9bMF0pICogKGZyb21bMF0gLSB0b1swXSkgKyAoZnJvbVsxXSAtIHRvWzFdKSAqIChmcm9tWzFdIC0gdG9bMV0pO1xuXG4gICAgICAgIGlmIChkIDwgNjQpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSAvLyBjb25zb2xlLmxvZyhcIj4+PiBjb25uZWN0ZWQ9XCIgKyB0byArIFwiIG5vdENvbm5lY3RlZD1cIiArIGZyb20gKyBcIiBkaXN0PVwiICsgZCk7XG5cblxuICAgICAgcmV0dXJuIFtmcm9tLCB0b107XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll9nZXRDbG9zZXN0ID0gZnVuY3Rpb24gX2dldENsb3Nlc3QocG9pbnQsIHNwYWNlKSB7XG4gICAgICB2YXIgbWluUG9pbnQgPSBudWxsO1xuICAgICAgdmFyIG1pbkRpc3QgPSBudWxsO1xuXG4gICAgICBmb3IgKHZhciBrIGluIHNwYWNlKSB7XG4gICAgICAgIHZhciBwID0gc3BhY2Vba107XG4gICAgICAgIHZhciBkID0gKHBbMF0gLSBwb2ludFswXSkgKiAocFswXSAtIHBvaW50WzBdKSArIChwWzFdIC0gcG9pbnRbMV0pICogKHBbMV0gLSBwb2ludFsxXSk7XG5cbiAgICAgICAgaWYgKG1pbkRpc3QgPT0gbnVsbCB8fCBkIDwgbWluRGlzdCkge1xuICAgICAgICAgIG1pbkRpc3QgPSBkO1xuICAgICAgICAgIG1pblBvaW50ID0gcDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWluUG9pbnQ7XG4gICAgfTtcblxuICAgIF9wcm90bzI3Ll9maW5kQ29ubmVjdGVkID0gZnVuY3Rpb24gX2ZpbmRDb25uZWN0ZWQoY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHN0YWNrLCBrZWVwTm90Q29ubmVjdGVkLCB2YWx1ZSkge1xuICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIHAgPSBzdGFjay5zcGxpY2UoMCwgMSlbMF07XG4gICAgICAgIHZhciB0ZXN0cyA9IHZvaWQgMDtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgdGVzdHMgPSBbW3BbMF0gKyAyLCBwWzFdXSwgW3BbMF0gKyAxLCBwWzFdIC0gMV0sIFtwWzBdIC0gMSwgcFsxXSAtIDFdLCBbcFswXSAtIDIsIHBbMV1dLCBbcFswXSAtIDEsIHBbMV0gKyAxXSwgW3BbMF0gKyAxLCBwWzFdICsgMV1dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlc3RzID0gW1twWzBdICsgMSwgcFsxXV0sIFtwWzBdIC0gMSwgcFsxXV0sIFtwWzBdLCBwWzFdICsgMV0sIFtwWzBdLCBwWzFdIC0gMV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSB0aGlzLl9wb2ludEtleSh0ZXN0c1tpXSk7XG5cbiAgICAgICAgICBpZiAoY29ubmVjdGVkW2tleV0gPT0gbnVsbCAmJiB0aGlzLl9mcmVlU3BhY2UodGVzdHNbaV1bMF0sIHRlc3RzW2ldWzFdLCB2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtrZXldID0gdGVzdHNbaV07XG5cbiAgICAgICAgICAgIGlmICgha2VlcE5vdENvbm5lY3RlZCkge1xuICAgICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrLnB1c2godGVzdHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fdHVubmVsVG9Db25uZWN0ZWQgPSBmdW5jdGlvbiBfdHVubmVsVG9Db25uZWN0ZWQodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICB2YXIgYSwgYjtcblxuICAgICAgaWYgKGZyb21bMF0gPCB0b1swXSkge1xuICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgYiA9IHRvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYSA9IHRvO1xuICAgICAgICBiID0gZnJvbTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgeHggPSBhWzBdOyB4eCA8PSBiWzBdOyB4eCsrKSB7XG4gICAgICAgIHRoaXMuX21hcFt4eF1bYVsxXV0gPSB2YWx1ZTtcbiAgICAgICAgdmFyIHAgPSBbeHgsIGFbMV1dO1xuXG4gICAgICAgIHZhciBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG5cbiAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjayAmJiBhWzBdIDwgYlswXSkge1xuICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soYSwgW2JbMF0sIGFbMV1dKTtcbiAgICAgIH0gLy8geCBpcyBub3cgZml4ZWRcblxuXG4gICAgICB2YXIgeCA9IGJbMF07XG5cbiAgICAgIGlmIChmcm9tWzFdIDwgdG9bMV0pIHtcbiAgICAgICAgYSA9IGZyb207XG4gICAgICAgIGIgPSB0bztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSB0bztcbiAgICAgICAgYiA9IGZyb207XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIHl5ID0gYVsxXTsgeXkgPCBiWzFdOyB5eSsrKSB7XG4gICAgICAgIHRoaXMuX21hcFt4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgdmFyIF9wMiA9IFt4LCB5eV07XG5cbiAgICAgICAgdmFyIF9wa2V5ID0gdGhpcy5fcG9pbnRLZXkoX3AyKTtcblxuICAgICAgICBjb25uZWN0ZWRbX3BrZXldID0gX3AyO1xuICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW19wa2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjayAmJiBhWzFdIDwgYlsxXSkge1xuICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soW2JbMF0sIGFbMV1dLCBbYlswXSwgYlsxXV0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fdHVubmVsVG9Db25uZWN0ZWQ2ID0gZnVuY3Rpb24gX3R1bm5lbFRvQ29ubmVjdGVkNih0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgIHZhciBhLCBiO1xuXG4gICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgIGEgPSBmcm9tO1xuICAgICAgICBiID0gdG87XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhID0gdG87XG4gICAgICAgIGIgPSBmcm9tO1xuICAgICAgfSAvLyB0dW5uZWwgZGlhZ29uYWxseSB1bnRpbCBob3Jpem9udGFsbHkgbGV2ZWxcblxuXG4gICAgICB2YXIgeHggPSBhWzBdO1xuICAgICAgdmFyIHl5ID0gYVsxXTtcblxuICAgICAgd2hpbGUgKCEoeHggPT0gYlswXSAmJiB5eSA9PSBiWzFdKSkge1xuICAgICAgICB2YXIgc3RlcFdpZHRoID0gMjtcblxuICAgICAgICBpZiAoeXkgPCBiWzFdKSB7XG4gICAgICAgICAgeXkrKztcbiAgICAgICAgICBzdGVwV2lkdGggPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHl5ID4gYlsxXSkge1xuICAgICAgICAgIHl5LS07XG4gICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4eCA8IGJbMF0pIHtcbiAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoeHggPiBiWzBdKSB7XG4gICAgICAgICAgeHggLT0gc3RlcFdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKGJbMV0gJSAyKSB7XG4gICAgICAgICAgLy8gV29uJ3Qgc3RlcCBvdXRzaWRlIG1hcCBpZiBkZXN0aW5hdGlvbiBvbiBpcyBtYXAncyByaWdodCBlZGdlXG4gICAgICAgICAgeHggLT0gc3RlcFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpdHRvIGZvciBsZWZ0IGVkZ2VcbiAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9tYXBbeHhdW3l5XSA9IHZhbHVlO1xuICAgICAgICB2YXIgcCA9IFt4eCwgeXldO1xuXG4gICAgICAgIHZhciBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG5cbiAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soZnJvbSwgdG8pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fZnJlZVNwYWNlID0gZnVuY3Rpb24gX2ZyZWVTcGFjZSh4LCB5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5fd2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLl9oZWlnaHQgJiYgdGhpcy5fbWFwW3hdW3ldID09IHZhbHVlO1xuICAgIH07XG5cbiAgICBfcHJvdG8yNy5fcG9pbnRLZXkgPSBmdW5jdGlvbiBfcG9pbnRLZXkocCkge1xuICAgICAgcmV0dXJuIHBbMF0gKyBcIi5cIiArIHBbMV07XG4gICAgfTtcblxuICAgIHJldHVybiBDZWxsdWxhcjtcbiAgfShNYXApO1xuXG4gIHZhciBGRUFUVVJFUyA9IHtcbiAgICBcInJvb21cIjogUm9vbSxcbiAgICBcImNvcnJpZG9yXCI6IENvcnJpZG9yXG4gIH07XG4gIC8qKlxuICAgKiBSYW5kb20gZHVuZ2VvbiBnZW5lcmF0b3IgdXNpbmcgaHVtYW4tbGlrZSBkaWdnaW5nIHBhdHRlcm5zLlxuICAgKiBIZWF2aWx5IGJhc2VkIG9uIE1pa2UgQW5kZXJzb24ncyBpZGVhcyBmcm9tIHRoZSBcIlR5cmFudFwiIGFsZ28sIG1lbnRpb25lZCBhdFxuICAgKiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1EdW5nZW9uLUJ1aWxkaW5nX0FsZ29yaXRobS5cbiAgICovXG5cbiAgdmFyIERpZ2dlciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9EdW5nZW9uMikge1xuICAgIF9pbmhlcml0c0xvb3NlKERpZ2dlciwgX0R1bmdlb24yKTtcblxuICAgIGZ1bmN0aW9uIERpZ2dlcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMxNTtcblxuICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG5cbiAgICAgIF90aGlzMTUgPSBfRHVuZ2VvbjIuY2FsbCh0aGlzLCB3aWR0aCwgaGVpZ2h0KSB8fCB0aGlzO1xuICAgICAgX3RoaXMxNS5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICByb29tV2lkdGg6IFszLCA5XSxcbiAgICAgICAgcm9vbUhlaWdodDogWzMsIDVdLFxuICAgICAgICBjb3JyaWRvckxlbmd0aDogWzMsIDEwXSxcbiAgICAgICAgZHVnUGVyY2VudGFnZTogMC4yLFxuICAgICAgICB0aW1lTGltaXQ6IDEwMDBcbiAgICAgICAgLyogd2Ugc3RvcCBhZnRlciB0aGlzIG11Y2ggdGltZSBoYXMgcGFzc2VkIChtc2VjKSAqL1xuXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIF90aGlzMTUuX2ZlYXR1cmVzID0ge1xuICAgICAgICBcInJvb21cIjogNCxcbiAgICAgICAgXCJjb3JyaWRvclwiOiA0XG4gICAgICB9O1xuICAgICAgX3RoaXMxNS5fbWFwID0gW107XG4gICAgICBfdGhpczE1Ll9mZWF0dXJlQXR0ZW1wdHMgPSAyMDtcbiAgICAgIC8qIGhvdyBtYW55IHRpbWVzIGRvIHdlIHRyeSB0byBjcmVhdGUgYSBmZWF0dXJlIG9uIGEgc3VpdGFibGUgd2FsbCAqL1xuXG4gICAgICBfdGhpczE1Ll93YWxscyA9IHt9O1xuICAgICAgLyogdGhlc2UgYXJlIGF2YWlsYWJsZSBmb3IgZGlnZ2luZyAqL1xuXG4gICAgICBfdGhpczE1Ll9kdWcgPSAwO1xuICAgICAgX3RoaXMxNS5fZGlnQ2FsbGJhY2sgPSBfdGhpczE1Ll9kaWdDYWxsYmFjay5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczE1KSkpO1xuICAgICAgX3RoaXMxNS5fY2FuQmVEdWdDYWxsYmFjayA9IF90aGlzMTUuX2NhbkJlRHVnQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxNSkpKTtcbiAgICAgIF90aGlzMTUuX2lzV2FsbENhbGxiYWNrID0gX3RoaXMxNS5faXNXYWxsQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxNSkpKTtcbiAgICAgIF90aGlzMTUuX3ByaW9yaXR5V2FsbENhbGxiYWNrID0gX3RoaXMxNS5fcHJpb3JpdHlXYWxsQ2FsbGJhY2suYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMxNSkpKTtcbiAgICAgIHJldHVybiBfdGhpczE1O1xuICAgIH1cblxuICAgIHZhciBfcHJvdG8yOCA9IERpZ2dlci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8yOC5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgIHZhciBhcmVhID0gKHRoaXMuX3dpZHRoIC0gMikgKiAodGhpcy5faGVpZ2h0IC0gMik7XG5cbiAgICAgIHRoaXMuX2ZpcnN0Um9vbSgpO1xuXG4gICAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgICAgdmFyIHByaW9yaXR5V2FsbHM7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgcHJpb3JpdHlXYWxscyA9IDA7XG4gICAgICAgIHZhciB0MiA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8qIGZpbmQgYSBnb29kIHdhbGwgKi9cblxuXG4gICAgICAgIHZhciB3YWxsID0gdGhpcy5fZmluZFdhbGwoKTtcblxuICAgICAgICBpZiAoIXdhbGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvKiBubyBtb3JlIHdhbGxzICovXG5cblxuICAgICAgICB2YXIgcGFydHMgPSB3YWxsLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgdmFyIHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgIHZhciB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuXG4gICAgICAgIHZhciBkaXIgPSB0aGlzLl9nZXREaWdnaW5nRGlyZWN0aW9uKHgsIHkpO1xuXG4gICAgICAgIGlmICghZGlyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLyogdGhpcyB3YWxsIGlzIG5vdCBzdWl0YWJsZSAqL1xuICAgICAgICAvL1x0XHRjb25zb2xlLmxvZyhcIndhbGxcIiwgeCwgeSk7XG5cbiAgICAgICAgLyogdHJ5IGFkZGluZyBhIGZlYXR1cmUgKi9cblxuXG4gICAgICAgIHZhciBmZWF0dXJlQXR0ZW1wdHMgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBmZWF0dXJlQXR0ZW1wdHMrKztcblxuICAgICAgICAgIGlmICh0aGlzLl90cnlGZWF0dXJlKHgsIHksIGRpclswXSwgZGlyWzFdKSkge1xuICAgICAgICAgICAgLyogZmVhdHVyZSBhZGRlZCAqL1xuICAgICAgICAgICAgLy9pZiAodGhpcy5fcm9vbXMubGVuZ3RoICsgdGhpcy5fY29ycmlkb3JzLmxlbmd0aCA9PSAyKSB7IHRoaXMuX3Jvb21zWzBdLmFkZERvb3IoeCwgeSk7IH0gLyogZmlyc3Qgcm9vbSBvZmljaWFsbHkgaGFzIGRvb3JzICovXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHgsIHkpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHggLSBkaXJbMF0sIHkgLSBkaXJbMV0pO1xuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGZlYXR1cmVBdHRlbXB0cyA8IHRoaXMuX2ZlYXR1cmVBdHRlbXB0cyk7XG5cbiAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgICBpZiAodGhpcy5fd2FsbHNbaWRdID4gMSkge1xuICAgICAgICAgICAgcHJpb3JpdHlXYWxscysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSB3aGlsZSAodGhpcy5fZHVnIC8gYXJlYSA8IHRoaXMuX29wdGlvbnMuZHVnUGVyY2VudGFnZSB8fCBwcmlvcml0eVdhbGxzKTtcbiAgICAgIC8qIGZpeG1lIG51bWJlciBvZiBwcmlvcml0eSB3YWxscyAqL1xuXG5cbiAgICAgIHRoaXMuX2FkZERvb3JzKCk7XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX2RpZ0NhbGxiYWNrID0gZnVuY3Rpb24gX2RpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT0gMCB8fCB2YWx1ZSA9PSAyKSB7XG4gICAgICAgIC8qIGVtcHR5ICovXG4gICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDA7XG4gICAgICAgIHRoaXMuX2R1ZysrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogd2FsbCAqL1xuICAgICAgICB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XSA9IDE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9pc1dhbGxDYWxsYmFjayA9IGZ1bmN0aW9uIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9tYXBbeF1beV0gPT0gMTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMjguX2NhbkJlRHVnQ2FsbGJhY2sgPSBmdW5jdGlvbiBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCArIDEgPj0gdGhpcy5fd2lkdGggfHwgeSArIDEgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX21hcFt4XVt5XSA9PSAxO1xuICAgIH07XG5cbiAgICBfcHJvdG8yOC5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSBmdW5jdGlvbiBfcHJpb3JpdHlXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAyO1xuICAgIH07XG5cbiAgICBfcHJvdG8yOC5fZmlyc3RSb29tID0gZnVuY3Rpb24gX2ZpcnN0Um9vbSgpIHtcbiAgICAgIHZhciBjeCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyAyKTtcbiAgICAgIHZhciBjeSA9IE1hdGguZmxvb3IodGhpcy5faGVpZ2h0IC8gMik7XG4gICAgICB2YXIgcm9vbSA9IFJvb20uY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgdGhpcy5fb3B0aW9ucyk7XG5cbiAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG5cbiAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhIHN1aXRhYmxlIHdhbGxcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjguX2ZpbmRXYWxsID0gZnVuY3Rpb24gX2ZpbmRXYWxsKCkge1xuICAgICAgdmFyIHByaW8xID0gW107XG4gICAgICB2YXIgcHJpbzIgPSBbXTtcblxuICAgICAgZm9yICh2YXIgX2lkMiBpbiB0aGlzLl93YWxscykge1xuICAgICAgICB2YXIgcHJpbyA9IHRoaXMuX3dhbGxzW19pZDJdO1xuXG4gICAgICAgIGlmIChwcmlvID09IDIpIHtcbiAgICAgICAgICBwcmlvMi5wdXNoKF9pZDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW8xLnB1c2goX2lkMik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGFyciA9IHByaW8yLmxlbmd0aCA/IHByaW8yIDogcHJpbzE7XG5cbiAgICAgIGlmICghYXJyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8qIG5vIHdhbGxzIDovICovXG5cblxuICAgICAgdmFyIGlkID0gUk5HJDEuZ2V0SXRlbShhcnIuc29ydCgpKTsgLy8gc29ydCB0byBtYWtlIHRoZSBvcmRlciBkZXRlcm1pbmlzdGljXG5cbiAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1tpZF07XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmllcyBhZGRpbmcgYSBmZWF0dXJlXG4gICAgICogQHJldHVybnMge2Jvb2x9IHdhcyB0aGlzIGEgc3VjY2Vzc2Z1bCB0cnk/XG4gICAgICovXG5cblxuICAgIF9wcm90bzI4Ll90cnlGZWF0dXJlID0gZnVuY3Rpb24gX3RyeUZlYXR1cmUoeCwgeSwgZHgsIGR5KSB7XG4gICAgICB2YXIgZmVhdHVyZU5hbWUgPSBSTkckMS5nZXRXZWlnaHRlZFZhbHVlKHRoaXMuX2ZlYXR1cmVzKTtcbiAgICAgIHZhciBjdG9yID0gRkVBVFVSRVNbZmVhdHVyZU5hbWVdO1xuICAgICAgdmFyIGZlYXR1cmUgPSBjdG9yLmNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgdGhpcy5fb3B0aW9ucyk7XG5cbiAgICAgIGlmICghZmVhdHVyZS5pc1ZhbGlkKHRoaXMuX2lzV2FsbENhbGxiYWNrLCB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrKSkge1xuICAgICAgICAvL1x0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcbiAgICAgICAgLy9cdFx0ZmVhdHVyZS5kZWJ1ZygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZlYXR1cmUuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTsgLy9cdGZlYXR1cmUuZGVidWcoKTtcblxuICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBSb29tKSB7XG4gICAgICAgIHRoaXMuX3Jvb21zLnB1c2goZmVhdHVyZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgQ29ycmlkb3IpIHtcbiAgICAgICAgZmVhdHVyZS5jcmVhdGVQcmlvcml0eVdhbGxzKHRoaXMuX3ByaW9yaXR5V2FsbENhbGxiYWNrKTtcblxuICAgICAgICB0aGlzLl9jb3JyaWRvcnMucHVzaChmZWF0dXJlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9wcm90bzI4Ll9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzID0gZnVuY3Rpb24gX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoY3gsIGN5KSB7XG4gICAgICB2YXIgZGVsdGFzID0gRElSU1s0XTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICB2YXIgeCA9IGN4ICsgZGVsdGFbMF07XG4gICAgICAgIHZhciB5ID0gY3kgKyBkZWx0YVsxXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgICB4ID0gY3ggKyAyICogZGVsdGFbMF07XG4gICAgICAgIHkgPSBjeSArIDIgKiBkZWx0YVsxXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB2ZWN0b3IgaW4gXCJkaWdnaW5nXCIgZGlyZWN0aW9uLCBvciBmYWxzZSwgaWYgdGhpcyBkb2VzIG5vdCBleGlzdCAob3IgaXMgbm90IHVuaXF1ZSlcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMjguX2dldERpZ2dpbmdEaXJlY3Rpb24gPSBmdW5jdGlvbiBfZ2V0RGlnZ2luZ0RpcmVjdGlvbihjeCwgY3kpIHtcbiAgICAgIGlmIChjeCA8PSAwIHx8IGN5IDw9IDAgfHwgY3ggPj0gdGhpcy5fd2lkdGggLSAxIHx8IGN5ID49IHRoaXMuX2hlaWdodCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgdmFyIGRlbHRhcyA9IERJUlNbNF07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgdmFyIHggPSBjeCArIGRlbHRhWzBdO1xuICAgICAgICB2YXIgeSA9IGN5ICsgZGVsdGFbMV07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tYXBbeF1beV0pIHtcbiAgICAgICAgICAvKiB0aGVyZSBhbHJlYWR5IGlzIGFub3RoZXIgZW1wdHkgbmVpZ2hib3IhICovXG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzdWx0ID0gZGVsdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qIG5vIGVtcHR5IG5laWdoYm9yICovXG5cblxuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbLXJlc3VsdFswXSwgLXJlc3VsdFsxXV07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGVtcHR5IHNwYWNlcyBzdXJyb3VuZGluZyByb29tcywgYW5kIGFwcGx5IGRvb3JzLlxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8yOC5fYWRkRG9vcnMgPSBmdW5jdGlvbiBfYWRkRG9vcnMoKSB7XG4gICAgICB2YXIgZGF0YSA9IHRoaXMuX21hcDtcblxuICAgICAgZnVuY3Rpb24gaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICByZXR1cm4gZGF0YVt4XVt5XSA9PSAxO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3Jvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByb29tID0gdGhpcy5fcm9vbXNbaV07XG4gICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICByb29tLmFkZERvb3JzKGlzV2FsbENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIERpZ2dlcjtcbiAgfShEdW5nZW9uKTtcbiAgLyoqXG4gICAqIEpvaW4gbGlzdHMgd2l0aCBcImlcIiBhbmQgXCJpKzFcIlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGFkZFRvTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2kgKyAxXV0gPSBSW2ldO1xuICAgIExbUltpXV0gPSBMW2kgKyAxXTtcbiAgICBSW2ldID0gaSArIDE7XG4gICAgTFtpICsgMV0gPSBpO1xuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgXCJpXCIgZnJvbSBpdHMgbGlzdFxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaV1dID0gUltpXTtcbiAgICBMW1JbaV1dID0gTFtpXTtcbiAgICBSW2ldID0gaTtcbiAgICBMW2ldID0gaTtcbiAgfVxuICAvKipcbiAgICogTWF6ZSBnZW5lcmF0b3IgLSBFbGxlcidzIGFsZ29yaXRobVxuICAgKiBTZWUgaHR0cDovL2hvbWVwYWdlcy5jd2kubmwvfnRyb21wL21hemUuaHRtbCBmb3IgZXhwbGFuYXRpb25cbiAgICovXG5cblxuICB2YXIgRWxsZXJNYXplID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDQpIHtcbiAgICBfaW5oZXJpdHNMb29zZShFbGxlck1hemUsIF9NYXA0KTtcblxuICAgIGZ1bmN0aW9uIEVsbGVyTWF6ZSgpIHtcbiAgICAgIHJldHVybiBfTWFwNC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzI5ID0gRWxsZXJNYXplLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzI5LmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgdmFyIG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG5cbiAgICAgIHZhciB3ID0gTWF0aC5jZWlsKCh0aGlzLl93aWR0aCAtIDIpIC8gMik7XG4gICAgICB2YXIgcmFuZCA9IDkgLyAyNDtcbiAgICAgIHZhciBMID0gW107XG4gICAgICB2YXIgUiA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICBMLnB1c2goaSk7XG4gICAgICAgIFIucHVzaChpKTtcbiAgICAgIH1cblxuICAgICAgTC5wdXNoKHcgLSAxKTtcbiAgICAgIC8qIGZha2Ugc3RvcC1ibG9jayBhdCB0aGUgcmlnaHQgc2lkZSAqL1xuXG4gICAgICB2YXIgajtcblxuICAgICAgZm9yIChqID0gMTsgaiArIDMgPCB0aGlzLl9oZWlnaHQ7IGogKz0gMikge1xuICAgICAgICAvKiBvbmUgcm93ICovXG4gICAgICAgIGZvciAodmFyIF9pNSA9IDA7IF9pNSA8IHc7IF9pNSsrKSB7XG4gICAgICAgICAgLyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xuICAgICAgICAgIHZhciB4ID0gMiAqIF9pNSArIDE7XG4gICAgICAgICAgdmFyIHkgPSBqO1xuICAgICAgICAgIG1hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgLyogcmlnaHQgY29ubmVjdGlvbiAqL1xuXG4gICAgICAgICAgaWYgKF9pNSAhPSBMW19pNSArIDFdICYmIFJORyQxLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgIGFkZFRvTGlzdChfaTUsIEwsIFIpO1xuICAgICAgICAgICAgbWFwW3ggKyAxXVt5XSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGJvdHRvbSBjb25uZWN0aW9uICovXG5cblxuICAgICAgICAgIGlmIChfaTUgIT0gTFtfaTVdICYmIFJORyQxLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgIC8qIHJlbW92ZSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICByZW1vdmVGcm9tTGlzdChfaTUsIEwsIFIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBjcmVhdGUgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgbWFwW3hdW3kgKyAxXSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKiBsYXN0IHJvdyAqL1xuXG5cbiAgICAgIGZvciAodmFyIF9pNiA9IDA7IF9pNiA8IHc7IF9pNisrKSB7XG4gICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgdmFyIF94MiA9IDIgKiBfaTYgKyAxO1xuXG4gICAgICAgIHZhciBfeTIgPSBqO1xuICAgICAgICBtYXBbX3gyXVtfeTJdID0gMDtcbiAgICAgICAgLyogcmlnaHQgY29ubmVjdGlvbiAqL1xuXG4gICAgICAgIGlmIChfaTYgIT0gTFtfaTYgKyAxXSAmJiAoX2k2ID09IExbX2k2XSB8fCBSTkckMS5nZXRVbmlmb3JtKCkgPiByYW5kKSkge1xuICAgICAgICAgIC8qIGRpZyByaWdodCBhbHNvIGlmIHRoZSBjZWxsIGlzIHNlcGFyYXRlZCwgc28gaXQgZ2V0cyBjb25uZWN0ZWQgdG8gdGhlIHJlc3Qgb2YgbWF6ZSAqL1xuICAgICAgICAgIGFkZFRvTGlzdChfaTYsIEwsIFIpO1xuICAgICAgICAgIG1hcFtfeDIgKyAxXVtfeTJdID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUZyb21MaXN0KF9pNiwgTCwgUik7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIF9pNyA9IDA7IF9pNyA8IHRoaXMuX3dpZHRoOyBfaTcrKykge1xuICAgICAgICBmb3IgKHZhciBfaiA9IDA7IF9qIDwgdGhpcy5faGVpZ2h0OyBfaisrKSB7XG4gICAgICAgICAgY2FsbGJhY2soX2k3LCBfaiwgbWFwW19pN11bX2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVsbGVyTWF6ZTtcbiAgfShNYXApO1xuICAvKipcbiAgICogQGNsYXNzIFJlY3Vyc2l2ZWx5IGRpdmlkZWQgbWF6ZSwgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXplX2dlbmVyYXRpb25fYWxnb3JpdGhtI1JlY3Vyc2l2ZV9kaXZpc2lvbl9tZXRob2RcbiAgICogQGF1Z21lbnRzIFJPVC5NYXBcbiAgICovXG5cblxuICB2YXIgRGl2aWRlZE1hemUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwNSkge1xuICAgIF9pbmhlcml0c0xvb3NlKERpdmlkZWRNYXplLCBfTWFwNSk7XG5cbiAgICBmdW5jdGlvbiBEaXZpZGVkTWF6ZSgpIHtcbiAgICAgIHZhciBfdGhpczE2O1xuXG4gICAgICBfdGhpczE2ID0gX01hcDUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgX3RoaXMxNi5fc3RhY2sgPSBbXTtcbiAgICAgIF90aGlzMTYuX21hcCA9IFtdO1xuICAgICAgcmV0dXJuIF90aGlzMTY7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzMwID0gRGl2aWRlZE1hemUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzAuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgdmFyIGggPSB0aGlzLl9oZWlnaHQ7XG4gICAgICB0aGlzLl9tYXAgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgdGhpcy5fbWFwLnB1c2goW10pO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaDsgaisrKSB7XG4gICAgICAgICAgdmFyIGJvcmRlciA9IGkgPT0gMCB8fCBqID09IDAgfHwgaSArIDEgPT0gdyB8fCBqICsgMSA9PSBoO1xuXG4gICAgICAgICAgdGhpcy5fbWFwW2ldLnB1c2goYm9yZGVyID8gMSA6IDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3N0YWNrID0gW1sxLCAxLCB3IC0gMiwgaCAtIDJdXTtcblxuICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG4gICAgICBmb3IgKHZhciBfaTggPSAwOyBfaTggPCB3OyBfaTgrKykge1xuICAgICAgICBmb3IgKHZhciBfajIgPSAwOyBfajIgPCBoOyBfajIrKykge1xuICAgICAgICAgIGNhbGxiYWNrKF9pOCwgX2oyLCB0aGlzLl9tYXBbX2k4XVtfajJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMC5fcHJvY2VzcyA9IGZ1bmN0aW9uIF9wcm9jZXNzKCkge1xuICAgICAgd2hpbGUgKHRoaXMuX3N0YWNrLmxlbmd0aCkge1xuICAgICAgICB2YXIgcm9vbSA9IHRoaXMuX3N0YWNrLnNoaWZ0KCk7XG4gICAgICAgIC8qIFtsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21dICovXG5cblxuICAgICAgICB0aGlzLl9wYXJ0aXRpb25Sb29tKHJvb20pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMC5fcGFydGl0aW9uUm9vbSA9IGZ1bmN0aW9uIF9wYXJ0aXRpb25Sb29tKHJvb20pIHtcbiAgICAgIHZhciBhdmFpbFggPSBbXTtcbiAgICAgIHZhciBhdmFpbFkgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IHJvb21bMF0gKyAxOyBpIDwgcm9vbVsyXTsgaSsrKSB7XG4gICAgICAgIHZhciB0b3AgPSB0aGlzLl9tYXBbaV1bcm9vbVsxXSAtIDFdO1xuICAgICAgICB2YXIgYm90dG9tID0gdGhpcy5fbWFwW2ldW3Jvb21bM10gKyAxXTtcblxuICAgICAgICBpZiAodG9wICYmIGJvdHRvbSAmJiAhKGkgJSAyKSkge1xuICAgICAgICAgIGF2YWlsWC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSByb29tWzFdICsgMTsgaiA8IHJvb21bM107IGorKykge1xuICAgICAgICB2YXIgbGVmdCA9IHRoaXMuX21hcFtyb29tWzBdIC0gMV1bal07XG4gICAgICAgIHZhciByaWdodCA9IHRoaXMuX21hcFtyb29tWzJdICsgMV1bal07XG5cbiAgICAgICAgaWYgKGxlZnQgJiYgcmlnaHQgJiYgIShqICUgMikpIHtcbiAgICAgICAgICBhdmFpbFkucHVzaChqKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWF2YWlsWC5sZW5ndGggfHwgIWF2YWlsWS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgeCA9IFJORyQxLmdldEl0ZW0oYXZhaWxYKTtcbiAgICAgIHZhciB5ID0gUk5HJDEuZ2V0SXRlbShhdmFpbFkpO1xuICAgICAgdGhpcy5fbWFwW3hdW3ldID0gMTtcbiAgICAgIHZhciB3YWxscyA9IFtdO1xuICAgICAgdmFyIHcgPSBbXTtcbiAgICAgIHdhbGxzLnB1c2godyk7XG4gICAgICAvKiBsZWZ0IHBhcnQgKi9cblxuICAgICAgZm9yICh2YXIgX2k5ID0gcm9vbVswXTsgX2k5IDwgeDsgX2k5KyspIHtcbiAgICAgICAgdGhpcy5fbWFwW19pOV1beV0gPSAxO1xuICAgICAgICBpZiAoX2k5ICUgMikgdy5wdXNoKFtfaTksIHldKTtcbiAgICAgIH1cblxuICAgICAgdyA9IFtdO1xuICAgICAgd2FsbHMucHVzaCh3KTtcbiAgICAgIC8qIHJpZ2h0IHBhcnQgKi9cblxuICAgICAgZm9yICh2YXIgX2kxMCA9IHggKyAxOyBfaTEwIDw9IHJvb21bMl07IF9pMTArKykge1xuICAgICAgICB0aGlzLl9tYXBbX2kxMF1beV0gPSAxO1xuICAgICAgICBpZiAoX2kxMCAlIDIpIHcucHVzaChbX2kxMCwgeV0pO1xuICAgICAgfVxuXG4gICAgICB3ID0gW107XG4gICAgICB3YWxscy5wdXNoKHcpO1xuICAgICAgLyogdG9wIHBhcnQgKi9cblxuICAgICAgZm9yICh2YXIgX2ozID0gcm9vbVsxXTsgX2ozIDwgeTsgX2ozKyspIHtcbiAgICAgICAgdGhpcy5fbWFwW3hdW19qM10gPSAxO1xuICAgICAgICBpZiAoX2ozICUgMikgdy5wdXNoKFt4LCBfajNdKTtcbiAgICAgIH1cblxuICAgICAgdyA9IFtdO1xuICAgICAgd2FsbHMucHVzaCh3KTtcbiAgICAgIC8qIGJvdHRvbSBwYXJ0ICovXG5cbiAgICAgIGZvciAodmFyIF9qNCA9IHkgKyAxOyBfajQgPD0gcm9vbVszXTsgX2o0KyspIHtcbiAgICAgICAgdGhpcy5fbWFwW3hdW19qNF0gPSAxO1xuICAgICAgICBpZiAoX2o0ICUgMikgdy5wdXNoKFt4LCBfajRdKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHNvbGlkID0gUk5HJDEuZ2V0SXRlbSh3YWxscyk7XG5cbiAgICAgIGZvciAodmFyIF9pMTEgPSAwOyBfaTExIDwgd2FsbHMubGVuZ3RoOyBfaTExKyspIHtcbiAgICAgICAgdmFyIF93ID0gd2FsbHNbX2kxMV07XG5cbiAgICAgICAgaWYgKF93ID09IHNvbGlkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaG9sZSA9IFJORyQxLmdldEl0ZW0oX3cpO1xuICAgICAgICB0aGlzLl9tYXBbaG9sZVswXV1baG9sZVsxXV0gPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdGFjay5wdXNoKFtyb29tWzBdLCByb29tWzFdLCB4IC0gMSwgeSAtIDFdKTtcbiAgICAgIC8qIGxlZnQgdG9wICovXG5cblxuICAgICAgdGhpcy5fc3RhY2sucHVzaChbeCArIDEsIHJvb21bMV0sIHJvb21bMl0sIHkgLSAxXSk7XG4gICAgICAvKiByaWdodCB0b3AgKi9cblxuXG4gICAgICB0aGlzLl9zdGFjay5wdXNoKFtyb29tWzBdLCB5ICsgMSwgeCAtIDEsIHJvb21bM11dKTtcbiAgICAgIC8qIGxlZnQgYm90dG9tICovXG5cblxuICAgICAgdGhpcy5fc3RhY2sucHVzaChbeCArIDEsIHkgKyAxLCByb29tWzJdLCByb29tWzNdXSk7XG4gICAgICAvKiByaWdodCBib3R0b20gKi9cblxuICAgIH07XG5cbiAgICByZXR1cm4gRGl2aWRlZE1hemU7XG4gIH0oTWFwKTtcbiAgLyoqXG4gICAqIEljZXkncyBNYXplIGdlbmVyYXRvclxuICAgKiBTZWUgaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9U2ltcGxlX21hemUgZm9yIGV4cGxhbmF0aW9uXG4gICAqL1xuXG5cbiAgdmFyIEljZXlNYXplID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX01hcDYpIHtcbiAgICBfaW5oZXJpdHNMb29zZShJY2V5TWF6ZSwgX01hcDYpO1xuXG4gICAgZnVuY3Rpb24gSWNleU1hemUod2lkdGgsIGhlaWdodCwgcmVndWxhcml0eSkge1xuICAgICAgdmFyIF90aGlzMTc7XG5cbiAgICAgIGlmIChyZWd1bGFyaXR5ID09PSB2b2lkIDApIHtcbiAgICAgICAgcmVndWxhcml0eSA9IDA7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMTcgPSBfTWFwNi5jYWxsKHRoaXMsIHdpZHRoLCBoZWlnaHQpIHx8IHRoaXM7XG4gICAgICBfdGhpczE3Ll9yZWd1bGFyaXR5ID0gcmVndWxhcml0eTtcbiAgICAgIF90aGlzMTcuX21hcCA9IFtdO1xuICAgICAgcmV0dXJuIF90aGlzMTc7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzMxID0gSWNleU1hemUucHJvdG90eXBlO1xuXG4gICAgX3Byb3RvMzEuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgIHZhciBoZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG5cbiAgICAgIHZhciBtYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuXG4gICAgICB3aWR0aCAtPSB3aWR0aCAlIDIgPyAxIDogMjtcbiAgICAgIGhlaWdodCAtPSBoZWlnaHQgJSAyID8gMSA6IDI7XG4gICAgICB2YXIgY3ggPSAwO1xuICAgICAgdmFyIGN5ID0gMDtcbiAgICAgIHZhciBueCA9IDA7XG4gICAgICB2YXIgbnkgPSAwO1xuICAgICAgdmFyIGRvbmUgPSAwO1xuICAgICAgdmFyIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgIHZhciBkaXJzID0gW1swLCAwXSwgWzAsIDBdLCBbMCwgMF0sIFswLCAwXV07XG5cbiAgICAgIGRvIHtcbiAgICAgICAgY3ggPSAxICsgMiAqIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogKHdpZHRoIC0gMSkgLyAyKTtcbiAgICAgICAgY3kgPSAxICsgMiAqIE1hdGguZmxvb3IoUk5HJDEuZ2V0VW5pZm9ybSgpICogKGhlaWdodCAtIDEpIC8gMik7XG5cbiAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgbWFwW2N4XVtjeV0gPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXBbY3hdW2N5XSkge1xuICAgICAgICAgIHRoaXMuX3JhbmRvbWl6ZShkaXJzKTtcblxuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqICh0aGlzLl9yZWd1bGFyaXR5ICsgMSkpID09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fcmFuZG9taXplKGRpcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgbnggPSBjeCArIGRpcnNbaV1bMF0gKiAyO1xuICAgICAgICAgICAgICBueSA9IGN5ICsgZGlyc1tpXVsxXSAqIDI7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRnJlZShtYXAsIG54LCBueSwgd2lkdGgsIGhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICBtYXBbbnhdW255XSA9IDA7XG4gICAgICAgICAgICAgICAgbWFwW2N4ICsgZGlyc1tpXVswXV1bY3kgKyBkaXJzW2ldWzFdXSA9IDA7XG4gICAgICAgICAgICAgICAgY3ggPSBueDtcbiAgICAgICAgICAgICAgICBjeSA9IG55O1xuICAgICAgICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlICghYmxvY2tlZCk7XG4gICAgICAgIH1cbiAgICAgIH0gd2hpbGUgKGRvbmUgKyAxIDwgd2lkdGggKiBoZWlnaHQgLyA0KTtcblxuICAgICAgZm9yICh2YXIgX2kxMiA9IDA7IF9pMTIgPCB0aGlzLl93aWR0aDsgX2kxMisrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICBjYWxsYmFjayhfaTEyLCBqLCBtYXBbX2kxMl1bal0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIF9wcm90bzMxLl9yYW5kb21pemUgPSBmdW5jdGlvbiBfcmFuZG9taXplKGRpcnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgIGRpcnNbaV1bMF0gPSAwO1xuICAgICAgICBkaXJzW2ldWzFdID0gMDtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChNYXRoLmZsb29yKFJORyQxLmdldFVuaWZvcm0oKSAqIDQpKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBkaXJzWzBdWzBdID0gLTE7XG4gICAgICAgICAgZGlyc1sxXVswXSA9IDE7XG4gICAgICAgICAgZGlyc1syXVsxXSA9IC0xO1xuICAgICAgICAgIGRpcnNbM11bMV0gPSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBkaXJzWzNdWzBdID0gLTE7XG4gICAgICAgICAgZGlyc1syXVswXSA9IDE7XG4gICAgICAgICAgZGlyc1sxXVsxXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMF1bMV0gPSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBkaXJzWzJdWzBdID0gLTE7XG4gICAgICAgICAgZGlyc1szXVswXSA9IDE7XG4gICAgICAgICAgZGlyc1swXVsxXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMV1bMV0gPSAxO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBkaXJzWzFdWzBdID0gLTE7XG4gICAgICAgICAgZGlyc1swXVswXSA9IDE7XG4gICAgICAgICAgZGlyc1szXVsxXSA9IC0xO1xuICAgICAgICAgIGRpcnNbMl1bMV0gPSAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zMS5faXNGcmVlID0gZnVuY3Rpb24gX2lzRnJlZShtYXAsIHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ID49IHdpZHRoIHx8IHkgPj0gaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcFt4XVt5XTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEljZXlNYXplO1xuICB9KE1hcCk7XG4gIC8qKlxuICAgKiBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB1c2VzIHRoZSBcIm9yZ2luYWxcIiBSb2d1ZSBkdW5nZW9uIGdlbmVyYXRpb24gYWxnb3JpdGhtLiBTZWUgaHR0cDovL2t1b2kuY29tL35rYW1pa2F6ZS9HYW1lRGVzaWduL2FydDA3X3JvZ3VlX2R1bmdlb24ucGhwXG4gICAqIEBhdXRob3IgaHlha3VnZWlcbiAgICovXG5cblxuICB2YXIgUm9ndWUgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTWFwNykge1xuICAgIF9pbmhlcml0c0xvb3NlKFJvZ3VlLCBfTWFwNyk7XG5cbiAgICBmdW5jdGlvbiBSb2d1ZSh3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgX3RoaXMxODtcblxuICAgICAgX3RoaXMxOCA9IF9NYXA3LmNhbGwodGhpcywgd2lkdGgsIGhlaWdodCkgfHwgdGhpcztcbiAgICAgIF90aGlzMTgubWFwID0gW107XG4gICAgICBfdGhpczE4LnJvb21zID0gW107XG4gICAgICBfdGhpczE4LmNvbm5lY3RlZENlbGxzID0gW107XG4gICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNlbGxXaWR0aDogMyxcbiAgICAgICAgY2VsbEhlaWdodDogMyAvLyAgICAgaWUuIGFzIGFuIGFycmF5IHdpdGggbWluLW1heCB2YWx1ZXMgZm9yIGVhY2ggZGlyZWN0aW9uLi4uLlxuXG4gICAgICB9LCBvcHRpb25zKTtcbiAgICAgIC8qXG4gICAgICBTZXQgdGhlIHJvb20gc2l6ZXMgYWNjb3JkaW5nIHRvIHRoZSBvdmVyLWFsbCB3aWR0aCBvZiB0aGUgbWFwLFxuICAgICAgYW5kIHRoZSBjZWxsIHNpemVzLlxuICAgICAgKi9cblxuICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbVdpZHRoXCIpKSB7XG4gICAgICAgIG9wdGlvbnNbXCJyb29tV2lkdGhcIl0gPSBfdGhpczE4Ll9jYWxjdWxhdGVSb29tU2l6ZShfdGhpczE4Ll93aWR0aCwgb3B0aW9uc1tcImNlbGxXaWR0aFwiXSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInJvb21IZWlnaHRcIikpIHtcbiAgICAgICAgb3B0aW9uc1tcInJvb21IZWlnaHRcIl0gPSBfdGhpczE4Ll9jYWxjdWxhdGVSb29tU2l6ZShfdGhpczE4Ll9oZWlnaHQsIG9wdGlvbnNbXCJjZWxsSGVpZ2h0XCJdKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxOC5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICByZXR1cm4gX3RoaXMxODtcbiAgICB9XG5cbiAgICB2YXIgX3Byb3RvMzIgPSBSb2d1ZS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zMi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMubWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcblxuICAgICAgdGhpcy5faW5pdFJvb21zKCk7XG5cbiAgICAgIHRoaXMuX2Nvbm5lY3RSb29tcygpO1xuXG4gICAgICB0aGlzLl9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpO1xuXG4gICAgICB0aGlzLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKTtcblxuICAgICAgdGhpcy5fY3JlYXRlUm9vbXMoKTtcblxuICAgICAgdGhpcy5fY3JlYXRlQ29ycmlkb3JzKCk7XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLm1hcFtpXVtqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY2FsY3VsYXRlUm9vbVNpemUgPSBmdW5jdGlvbiBfY2FsY3VsYXRlUm9vbVNpemUoc2l6ZSwgY2VsbCkge1xuICAgICAgdmFyIG1heCA9IE1hdGguZmxvb3Ioc2l6ZSAvIGNlbGwgKiAwLjgpO1xuICAgICAgdmFyIG1pbiA9IE1hdGguZmxvb3Ioc2l6ZSAvIGNlbGwgKiAwLjI1KTtcblxuICAgICAgaWYgKG1pbiA8IDIpIHtcbiAgICAgICAgbWluID0gMjtcbiAgICAgIH1cblxuICAgICAgaWYgKG1heCA8IDIpIHtcbiAgICAgICAgbWF4ID0gMjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFttaW4sIG1heF07XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9pbml0Um9vbXMgPSBmdW5jdGlvbiBfaW5pdFJvb21zKCkge1xuICAgICAgLy8gY3JlYXRlIHJvb21zIGFycmF5LiBUaGlzIGlzIHRoZSBcImdyaWRcIiBsaXN0IGZyb20gdGhlIGFsZ28uXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yb29tcy5wdXNoKFtdKTtcblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgdGhpcy5yb29tc1tpXS5wdXNoKHtcbiAgICAgICAgICAgIFwieFwiOiAwLFxuICAgICAgICAgICAgXCJ5XCI6IDAsXG4gICAgICAgICAgICBcIndpZHRoXCI6IDAsXG4gICAgICAgICAgICBcImhlaWdodFwiOiAwLFxuICAgICAgICAgICAgXCJjb25uZWN0aW9uc1wiOiBbXSxcbiAgICAgICAgICAgIFwiY2VsbHhcIjogaSxcbiAgICAgICAgICAgIFwiY2VsbHlcIjogalxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jb25uZWN0Um9vbXMgPSBmdW5jdGlvbiBfY29ubmVjdFJvb21zKCkge1xuICAgICAgLy9waWNrIHJhbmRvbSBzdGFydGluZyBncmlkXG4gICAgICB2YXIgY2d4ID0gUk5HJDEuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCAtIDEpO1xuICAgICAgdmFyIGNneSA9IFJORyQxLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0IC0gMSk7XG4gICAgICB2YXIgaWR4O1xuICAgICAgdmFyIG5jZ3g7XG4gICAgICB2YXIgbmNneTtcbiAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgdmFyIHJvb207XG4gICAgICB2YXIgb3RoZXJSb29tO1xuICAgICAgdmFyIGRpclRvQ2hlY2s7IC8vIGZpbmQgIHVuY29ubmVjdGVkIG5laWdoYm91ciBjZWxsc1xuXG4gICAgICBkbyB7XG4gICAgICAgIC8vZGlyVG9DaGVjayA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcbiAgICAgICAgZGlyVG9DaGVjayA9IFswLCAyLCA0LCA2XTtcbiAgICAgICAgZGlyVG9DaGVjayA9IFJORyQxLnNodWZmbGUoZGlyVG9DaGVjayk7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgaWR4ID0gZGlyVG9DaGVjay5wb3AoKTtcbiAgICAgICAgICBuY2d4ID0gY2d4ICsgRElSU1s4XVtpZHhdWzBdO1xuICAgICAgICAgIG5jZ3kgPSBjZ3kgKyBESVJTWzhdW2lkeF1bMV07XG5cbiAgICAgICAgICBpZiAobmNneCA8IDAgfHwgbmNneCA+PSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG5jZ3kgPCAwIHx8IG5jZ3kgPj0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tjZ3hdW2NneV07XG5cbiAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGFzIGxvbmcgYXMgdGhpcyByb29tIGRvZXNuJ3QgYWxyZWFkeSBjb29uZWN0IHRvIG1lLCB3ZSBhcmUgb2sgd2l0aCBpdC5cbiAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMF0gPT0gbmNneCAmJiByb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMV0gPT0gbmNneSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW25jZ3hdW25jZ3ldO1xuXG4gICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtjZ3gsIGNneV0pO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscy5wdXNoKFtuY2d4LCBuY2d5XSk7XG4gICAgICAgICAgICBjZ3ggPSBuY2d4O1xuICAgICAgICAgICAgY2d5ID0gbmNneTtcbiAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCAmJiBmb3VuZCA9PSBmYWxzZSk7XG4gICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDApO1xuICAgIH07XG5cbiAgICBfcHJvdG8zMi5fY29ubmVjdFVuY29ubmVjdGVkUm9vbXMgPSBmdW5jdGlvbiBfY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKSB7XG4gICAgICAvL1doaWxlIHRoZXJlIGFyZSB1bmNvbm5lY3RlZCByb29tcywgdHJ5IHRvIGNvbm5lY3QgdGhlbSB0byBhIHJhbmRvbSBjb25uZWN0ZWQgbmVpZ2hib3JcbiAgICAgIC8vKGlmIGEgcm9vbSBoYXMgbm8gY29ubmVjdGVkIG5laWdoYm9ycyB5ZXQsIGp1c3Qga2VlcCBjeWNsaW5nLCB5b3UnbGwgZmlsbCBvdXQgdG8gaXQgZXZlbnR1YWxseSkuXG4gICAgICB2YXIgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgIHZhciBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBSTkckMS5zaHVmZmxlKHRoaXMuY29ubmVjdGVkQ2VsbHMpO1xuICAgICAgdmFyIHJvb207XG4gICAgICB2YXIgb3RoZXJSb29tO1xuICAgICAgdmFyIHZhbGlkUm9vbTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tpXVtqXTtcblxuICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb25zID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICAgICAgZGlyZWN0aW9ucyA9IFJORyQxLnNodWZmbGUoZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICB2YWxpZFJvb20gPSBmYWxzZTtcblxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICB2YXIgZGlySWR4ID0gZGlyZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgdmFyIG5ld0kgPSBpICsgRElSU1s4XVtkaXJJZHhdWzBdO1xuICAgICAgICAgICAgICB2YXIgbmV3SiA9IGogKyBESVJTWzhdW2RpcklkeF1bMV07XG5cbiAgICAgICAgICAgICAgaWYgKG5ld0kgPCAwIHx8IG5ld0kgPj0gY3cgfHwgbmV3SiA8IDAgfHwgbmV3SiA+PSBjaCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuZXdJXVtuZXdKXTtcbiAgICAgICAgICAgICAgdmFsaWRSb29tID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMF0gPT0gaSAmJiBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVsxXSA9PSBqKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh2YWxpZFJvb20pIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoZGlyZWN0aW9ucy5sZW5ndGgpO1xuXG4gICAgICAgICAgICBpZiAodmFsaWRSb29tKSB7XG4gICAgICAgICAgICAgIHJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtvdGhlclJvb21bXCJjZWxseFwiXSwgb3RoZXJSb29tW1wiY2VsbHlcIl1dKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0gVW5hYmxlIHRvIGNvbm5lY3Qgcm9vbS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMgPSBmdW5jdGlvbiBfY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCkgey8vIEVtcHR5IGZvciBub3cuXG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9jcmVhdGVSb29tcyA9IGZ1bmN0aW9uIF9jcmVhdGVSb29tcygpIHtcbiAgICAgIHZhciB3ID0gdGhpcy5fd2lkdGg7XG4gICAgICB2YXIgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgIHZhciBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgdmFyIGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgdmFyIGN3cCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyBjdyk7XG4gICAgICB2YXIgY2hwID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyBjaCk7XG4gICAgICB2YXIgcm9vbXc7XG4gICAgICB2YXIgcm9vbWg7XG4gICAgICB2YXIgcm9vbVdpZHRoID0gdGhpcy5fb3B0aW9uc1tcInJvb21XaWR0aFwiXTtcbiAgICAgIHZhciByb29tSGVpZ2h0ID0gdGhpcy5fb3B0aW9uc1tcInJvb21IZWlnaHRcIl07XG4gICAgICB2YXIgc3g7XG4gICAgICB2YXIgc3k7XG4gICAgICB2YXIgb3RoZXJSb29tO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaDsgaisrKSB7XG4gICAgICAgICAgc3ggPSBjd3AgKiBpO1xuICAgICAgICAgIHN5ID0gY2hwICogajtcblxuICAgICAgICAgIGlmIChzeCA9PSAwKSB7XG4gICAgICAgICAgICBzeCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHN5ID09IDApIHtcbiAgICAgICAgICAgIHN5ID0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByb29tdyA9IFJORyQxLmdldFVuaWZvcm1JbnQocm9vbVdpZHRoWzBdLCByb29tV2lkdGhbMV0pO1xuICAgICAgICAgIHJvb21oID0gUk5HJDEuZ2V0VW5pZm9ybUludChyb29tSGVpZ2h0WzBdLCByb29tSGVpZ2h0WzFdKTtcblxuICAgICAgICAgIGlmIChqID4gMCkge1xuICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tpXVtqIC0gMV07XG5cbiAgICAgICAgICAgIHdoaWxlIChzeSAtIChvdGhlclJvb21bXCJ5XCJdICsgb3RoZXJSb29tW1wiaGVpZ2h0XCJdKSA8IDMpIHtcbiAgICAgICAgICAgICAgc3krKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaSAtIDFdW2pdO1xuXG4gICAgICAgICAgICB3aGlsZSAoc3ggLSAob3RoZXJSb29tW1wieFwiXSArIG90aGVyUm9vbVtcIndpZHRoXCJdKSA8IDMpIHtcbiAgICAgICAgICAgICAgc3grKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3hPZmZzZXQgPSBNYXRoLnJvdW5kKFJORyQxLmdldFVuaWZvcm1JbnQoMCwgY3dwIC0gcm9vbXcpIC8gMik7XG4gICAgICAgICAgdmFyIHN5T2Zmc2V0ID0gTWF0aC5yb3VuZChSTkckMS5nZXRVbmlmb3JtSW50KDAsIGNocCAtIHJvb21oKSAvIDIpO1xuXG4gICAgICAgICAgd2hpbGUgKHN4ICsgc3hPZmZzZXQgKyByb29tdyA+PSB3KSB7XG4gICAgICAgICAgICBpZiAoc3hPZmZzZXQpIHtcbiAgICAgICAgICAgICAgc3hPZmZzZXQtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJvb213LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2hpbGUgKHN5ICsgc3lPZmZzZXQgKyByb29taCA+PSBoKSB7XG4gICAgICAgICAgICBpZiAoc3lPZmZzZXQpIHtcbiAgICAgICAgICAgICAgc3lPZmZzZXQtLTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJvb21oLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3ggPSBzeCArIHN4T2Zmc2V0O1xuICAgICAgICAgIHN5ID0gc3kgKyBzeU9mZnNldDtcbiAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wieFwiXSA9IHN4O1xuICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ5XCJdID0gc3k7XG4gICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcIndpZHRoXCJdID0gcm9vbXc7XG4gICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcImhlaWdodFwiXSA9IHJvb21oO1xuXG4gICAgICAgICAgZm9yICh2YXIgaWkgPSBzeDsgaWkgPCBzeCArIHJvb213OyBpaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqaiA9IHN5OyBqaiA8IHN5ICsgcm9vbWg7IGpqKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5tYXBbaWldW2pqXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9wcm90bzMyLl9nZXRXYWxsUG9zaXRpb24gPSBmdW5jdGlvbiBfZ2V0V2FsbFBvc2l0aW9uKGFSb29tLCBhRGlyZWN0aW9uKSB7XG4gICAgICB2YXIgcng7XG4gICAgICB2YXIgcnk7XG4gICAgICB2YXIgZG9vcjtcblxuICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMSB8fCBhRGlyZWN0aW9uID09IDMpIHtcbiAgICAgICAgcnggPSBSTkckMS5nZXRVbmlmb3JtSW50KGFSb29tW1wieFwiXSArIDEsIGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gLSAyKTtcblxuICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAxKSB7XG4gICAgICAgICAgcnkgPSBhUm9vbVtcInlcIl0gLSAyO1xuICAgICAgICAgIGRvb3IgPSByeSArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnkgPSBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSArIDE7XG4gICAgICAgICAgZG9vciA9IHJ5IC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwW3J4XVtkb29yXSA9IDA7IC8vIGknbSBub3Qgc2V0dGluZyBhIHNwZWNpZmljICdkb29yJyB0aWxlIHZhbHVlIHJpZ2h0IG5vdywganVzdCBlbXB0eSBzcGFjZS5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJ5ID0gUk5HJDEuZ2V0VW5pZm9ybUludChhUm9vbVtcInlcIl0gKyAxLCBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSAtIDIpO1xuXG4gICAgICAgIGlmIChhRGlyZWN0aW9uID09IDIpIHtcbiAgICAgICAgICByeCA9IGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gKyAxO1xuICAgICAgICAgIGRvb3IgPSByeCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gLSAyO1xuICAgICAgICAgIGRvb3IgPSByeCArIDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcFtkb29yXVtyeV0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbcngsIHJ5XTtcbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2RyYXdDb3JyaWRvciA9IGZ1bmN0aW9uIF9kcmF3Q29ycmlkb3Ioc3RhcnRQb3NpdGlvbiwgZW5kUG9zaXRpb24pIHtcbiAgICAgIHZhciB4T2Zmc2V0ID0gZW5kUG9zaXRpb25bMF0gLSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgdmFyIHlPZmZzZXQgPSBlbmRQb3NpdGlvblsxXSAtIHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICB2YXIgeHBvcyA9IHN0YXJ0UG9zaXRpb25bMF07XG4gICAgICB2YXIgeXBvcyA9IHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICB2YXIgdGVtcERpc3Q7XG4gICAgICB2YXIgeERpcjtcbiAgICAgIHZhciB5RGlyO1xuICAgICAgdmFyIG1vdmU7IC8vIDIgZWxlbWVudCBhcnJheSwgZWxlbWVudCAwIGlzIHRoZSBkaXJlY3Rpb24sIGVsZW1lbnQgMSBpcyB0aGUgdG90YWwgdmFsdWUgdG8gbW92ZS5cblxuICAgICAgdmFyIG1vdmVzID0gW107IC8vIGEgbGlzdCBvZiAyIGVsZW1lbnQgYXJyYXlzXG5cbiAgICAgIHZhciB4QWJzID0gTWF0aC5hYnMoeE9mZnNldCk7XG4gICAgICB2YXIgeUFicyA9IE1hdGguYWJzKHlPZmZzZXQpO1xuICAgICAgdmFyIHBlcmNlbnQgPSBSTkckMS5nZXRVbmlmb3JtKCk7IC8vIHVzZWQgdG8gc3BsaXQgdGhlIG1vdmUgYXQgZGlmZmVyZW50IHBsYWNlcyBhbG9uZyB0aGUgbG9uZyBheGlzXG5cbiAgICAgIHZhciBmaXJzdEhhbGYgPSBwZXJjZW50O1xuICAgICAgdmFyIHNlY29uZEhhbGYgPSAxIC0gcGVyY2VudDtcbiAgICAgIHhEaXIgPSB4T2Zmc2V0ID4gMCA/IDIgOiA2O1xuICAgICAgeURpciA9IHlPZmZzZXQgPiAwID8gNCA6IDA7XG5cbiAgICAgIGlmICh4QWJzIDwgeUFicykge1xuICAgICAgICAvLyBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeSBvZmZzZXRcbiAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeUFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHRlbXBEaXN0XSk7IC8vIG1vdmUgYWxsIHRoZSB4IG9mZnNldFxuXG4gICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHhBYnNdKTsgLy8gbW92ZSBzZW5kSGFsZiBvZiB0aGUgIHkgb2Zmc2V0XG5cbiAgICAgICAgdGVtcERpc3QgPSBNYXRoLmZsb29yKHlBYnMgKiBzZWNvbmRIYWxmKTtcbiAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeCBvZmZzZXRcbiAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeEFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7IC8vIG1vdmUgYWxsIHRoZSB5IG9mZnNldFxuXG4gICAgICAgIG1vdmVzLnB1c2goW3lEaXIsIHlBYnNdKTsgLy8gbW92ZSBzZWNvbmRIYWxmIG9mIHRoZSB4IG9mZnNldC5cblxuICAgICAgICB0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeEFicyAqIHNlY29uZEhhbGYpO1xuICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XG5cbiAgICAgIHdoaWxlIChtb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1vdmUgPSBtb3Zlcy5wb3AoKTtcblxuICAgICAgICB3aGlsZSAobW92ZVsxXSA+IDApIHtcbiAgICAgICAgICB4cG9zICs9IERJUlNbOF1bbW92ZVswXV1bMF07XG4gICAgICAgICAgeXBvcyArPSBESVJTWzhdW21vdmVbMF1dWzFdO1xuICAgICAgICAgIHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcbiAgICAgICAgICBtb3ZlWzFdID0gbW92ZVsxXSAtIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3Byb3RvMzIuX2NyZWF0ZUNvcnJpZG9ycyA9IGZ1bmN0aW9uIF9jcmVhdGVDb3JyaWRvcnMoKSB7XG4gICAgICAvLyBEcmF3IENvcnJpZG9ycyBiZXR3ZWVuIGNvbm5lY3RlZCByb29tc1xuICAgICAgdmFyIGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICB2YXIgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICB2YXIgcm9vbTtcbiAgICAgIHZhciBjb25uZWN0aW9uO1xuICAgICAgdmFyIG90aGVyUm9vbTtcbiAgICAgIHZhciB3YWxsO1xuICAgICAgdmFyIG90aGVyV2FsbDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdzsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuXG4gICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCByb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24gPSByb29tW1wiY29ubmVjdGlvbnNcIl1ba107XG4gICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2Nvbm5lY3Rpb25bMF1dW2Nvbm5lY3Rpb25bMV1dOyAvLyBmaWd1cmUgb3V0IHdoYXQgd2FsbCBvdXIgY29ycmlkb3Igd2lsbCBzdGFydCBvbmUuXG4gICAgICAgICAgICAvLyBmaWd1cmUgb3V0IHdoYXQgd2FsbCBvdXIgY29ycmlkb3Igd2lsbCBlbmQgb24uXG5cbiAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA+IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICB3YWxsID0gMjtcbiAgICAgICAgICAgICAgb3RoZXJXYWxsID0gNDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPCByb29tW1wiY2VsbHhcIl0pIHtcbiAgICAgICAgICAgICAgd2FsbCA9IDQ7XG4gICAgICAgICAgICAgIG90aGVyV2FsbCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx5XCJdID4gcm9vbVtcImNlbGx5XCJdKSB7XG4gICAgICAgICAgICAgIHdhbGwgPSAzO1xuICAgICAgICAgICAgICBvdGhlcldhbGwgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd2FsbCA9IDE7XG4gICAgICAgICAgICAgIG90aGVyV2FsbCA9IDM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RyYXdDb3JyaWRvcih0aGlzLl9nZXRXYWxsUG9zaXRpb24ocm9vbSwgd2FsbCksIHRoaXMuX2dldFdhbGxQb3NpdGlvbihvdGhlclJvb20sIG90aGVyV2FsbCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gUm9ndWU7XG4gIH0oTWFwKTtcblxuICB2YXIgaW5kZXgkMiA9IHtcbiAgICBBcmVuYTogQXJlbmEsXG4gICAgVW5pZm9ybTogVW5pZm9ybSxcbiAgICBDZWxsdWxhcjogQ2VsbHVsYXIsXG4gICAgRGlnZ2VyOiBEaWdnZXIsXG4gICAgRWxsZXJNYXplOiBFbGxlck1hemUsXG4gICAgRGl2aWRlZE1hemU6IERpdmlkZWRNYXplLFxuICAgIEljZXlNYXplOiBJY2V5TWF6ZSxcbiAgICBSb2d1ZTogUm9ndWVcbiAgfTtcbiAgLyoqXG4gICAqIEJhc2Ugbm9pc2UgZ2VuZXJhdG9yXG4gICAqL1xuXG4gIHZhciBOb2lzZSA9IGZ1bmN0aW9uIE5vaXNlKCkge307XG5cbiAgdmFyIEYyID0gMC41ICogKE1hdGguc3FydCgzKSAtIDEpO1xuICB2YXIgRzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2O1xuICAvKipcbiAgICogQSBzaW1wbGUgMmQgaW1wbGVtZW50YXRpb24gb2Ygc2ltcGxleCBub2lzZSBieSBPbmRyZWogWmFyYVxuICAgKlxuICAgKiBCYXNlZCBvbiBhIHNwZWVkLWltcHJvdmVkIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtIGZvciAyRCwgM0QgYW5kIDREIGluIEphdmEuXG4gICAqIFdoaWNoIGlzIGJhc2VkIG9uIGV4YW1wbGUgY29kZSBieSBTdGVmYW4gR3VzdGF2c29uIChzdGVndUBpdG4ubGl1LnNlKS5cbiAgICogV2l0aCBPcHRpbWlzYXRpb25zIGJ5IFBldGVyIEVhc3RtYW4gKHBlYXN0bWFuQGRyaXp6bGUuc3RhbmZvcmQuZWR1KS5cbiAgICogQmV0dGVyIHJhbmsgb3JkZXJpbmcgbWV0aG9kIGJ5IFN0ZWZhbiBHdXN0YXZzb24gaW4gMjAxMi5cbiAgICovXG5cbiAgdmFyIFNpbXBsZXggPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfTm9pc2UpIHtcbiAgICBfaW5oZXJpdHNMb29zZShTaW1wbGV4LCBfTm9pc2UpO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdyYWRpZW50cyBSYW5kb20gZ3JhZGllbnRzXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2ltcGxleChncmFkaWVudHMpIHtcbiAgICAgIHZhciBfdGhpczE5O1xuXG4gICAgICBpZiAoZ3JhZGllbnRzID09PSB2b2lkIDApIHtcbiAgICAgICAgZ3JhZGllbnRzID0gMjU2O1xuICAgICAgfVxuXG4gICAgICBfdGhpczE5ID0gX05vaXNlLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgIF90aGlzMTkuX2dyYWRpZW50cyA9IFtbMCwgLTFdLCBbMSwgLTFdLCBbMSwgMF0sIFsxLCAxXSwgWzAsIDFdLCBbLTEsIDFdLCBbLTEsIDBdLCBbLTEsIC0xXV07XG4gICAgICB2YXIgcGVybXV0YXRpb25zID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JhZGllbnRzOyBpKyspIHtcbiAgICAgICAgcGVybXV0YXRpb25zLnB1c2goaSk7XG4gICAgICB9XG5cbiAgICAgIHBlcm11dGF0aW9ucyA9IFJORyQxLnNodWZmbGUocGVybXV0YXRpb25zKTtcbiAgICAgIF90aGlzMTkuX3Blcm1zID0gW107XG4gICAgICBfdGhpczE5Ll9pbmRleGVzID0gW107XG5cbiAgICAgIGZvciAodmFyIF9pMTMgPSAwOyBfaTEzIDwgMiAqIGdyYWRpZW50czsgX2kxMysrKSB7XG4gICAgICAgIF90aGlzMTkuX3Blcm1zLnB1c2gocGVybXV0YXRpb25zW19pMTMgJSBncmFkaWVudHNdKTtcblxuICAgICAgICBfdGhpczE5Ll9pbmRleGVzLnB1c2goX3RoaXMxOS5fcGVybXNbX2kxM10gJSBfdGhpczE5Ll9ncmFkaWVudHMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF90aGlzMTk7XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzMzID0gU2ltcGxleC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zMy5nZXQgPSBmdW5jdGlvbiBnZXQoeGluLCB5aW4pIHtcbiAgICAgIHZhciBwZXJtcyA9IHRoaXMuX3Blcm1zO1xuICAgICAgdmFyIGluZGV4ZXMgPSB0aGlzLl9pbmRleGVzO1xuICAgICAgdmFyIGNvdW50ID0gcGVybXMubGVuZ3RoIC8gMjtcbiAgICAgIHZhciBuMCA9IDAsXG4gICAgICAgICAgbjEgPSAwLFxuICAgICAgICAgIG4yID0gMCxcbiAgICAgICAgICBnaTsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXG5cbiAgICAgIHZhciBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxuXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICB2YXIgdCA9IChpICsgaikgKiBHMjtcbiAgICAgIHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcblxuICAgICAgdmFyIFkwID0gaiAtIHQ7XG4gICAgICB2YXIgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cblxuICAgICAgdmFyIHkwID0geWluIC0gWTA7IC8vIEZvciB0aGUgMkQgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYW4gZXF1aWxhdGVyYWwgdHJpYW5nbGUuXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG5cbiAgICAgIHZhciBpMSwgajE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCAobWlkZGxlKSBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqKSBjb29yZHNcblxuICAgICAgaWYgKHgwID4geTApIHtcbiAgICAgICAgaTEgPSAxO1xuICAgICAgICBqMSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcbiAgICAgICAgaTEgPSAwO1xuICAgICAgICBqMSA9IDE7XG4gICAgICB9IC8vIHVwcGVyIHRyaWFuZ2xlLCBZWCBvcmRlcjogKDAsMCktPigwLDEpLT4oMSwxKVxuICAgICAgLy8gQSBzdGVwIG9mICgxLDApIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jKSBpbiAoeCx5KSwgYW5kXG4gICAgICAvLyBhIHN0ZXAgb2YgKDAsMSkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMpIGluICh4LHkpLCB3aGVyZVxuICAgICAgLy8gYyA9ICgzLXNxcnQoMykpLzZcblxuXG4gICAgICB2YXIgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG5cbiAgICAgIHZhciB5MSA9IHkwIC0gajEgKyBHMjtcbiAgICAgIHZhciB4MiA9IHgwIC0gMSArIDIgKiBHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG5cbiAgICAgIHZhciB5MiA9IHkwIC0gMSArIDIgKiBHMjsgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcblxuICAgICAgdmFyIGlpID0gbW9kKGksIGNvdW50KTtcbiAgICAgIHZhciBqaiA9IG1vZChqLCBjb3VudCk7IC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcblxuICAgICAgdmFyIHQwID0gMC41IC0geDAgKiB4MCAtIHkwICogeTA7XG5cbiAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgIHQwICo9IHQwO1xuICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyBwZXJtc1tqal1dO1xuICAgICAgICB2YXIgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkWzBdICogeDAgKyBncmFkWzFdICogeTApO1xuICAgICAgfVxuXG4gICAgICB2YXIgdDEgPSAwLjUgLSB4MSAqIHgxIC0geTEgKiB5MTtcblxuICAgICAgaWYgKHQxID49IDApIHtcbiAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgIGdpID0gaW5kZXhlc1tpaSArIGkxICsgcGVybXNbamogKyBqMV1dO1xuICAgICAgICB2YXIgX2dyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoX2dyYWRbMF0gKiB4MSArIF9ncmFkWzFdICogeTEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcblxuICAgICAgaWYgKHQyID49IDApIHtcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIGdpID0gaW5kZXhlc1tpaSArIDEgKyBwZXJtc1tqaiArIDFdXTtcbiAgICAgICAgdmFyIF9ncmFkMiA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChfZ3JhZDJbMF0gKiB4MiArIF9ncmFkMlsxXSAqIHkyKTtcbiAgICAgIH0gLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gcmV0dXJuIHZhbHVlcyBpbiB0aGUgaW50ZXJ2YWwgWy0xLDFdLlxuXG5cbiAgICAgIHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2ltcGxleDtcbiAgfShOb2lzZSk7XG5cbiAgdmFyIGluZGV4JDMgPSB7XG4gICAgU2ltcGxleDogU2ltcGxleFxuICB9O1xuICAvKipcbiAgICogQGNsYXNzIEFic3RyYWN0IHBhdGhmaW5kZXJcbiAgICogQHBhcmFtIHtpbnR9IHRvWCBUYXJnZXQgWCBjb29yZFxuICAgKiBAcGFyYW0ge2ludH0gdG9ZIFRhcmdldCBZIGNvb3JkXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBhc3NhYmxlQ2FsbGJhY2sgQ2FsbGJhY2sgdG8gZGV0ZXJtaW5lIG1hcCBwYXNzYWJpbGl0eVxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XVxuICAgKi9cblxuICB2YXIgUGF0aCA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBhdGgodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl90b1ggPSB0b1g7XG4gICAgICB0aGlzLl90b1kgPSB0b1k7XG4gICAgICB0aGlzLl9wYXNzYWJsZUNhbGxiYWNrID0gcGFzc2FibGVDYWxsYmFjaztcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgdGhpcy5fZGlycyA9IERJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XG5cbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDgpIHtcbiAgICAgICAgLyogcmVvcmRlciBkaXJzIGZvciBtb3JlIGFlc3RoZXRpYyByZXN1bHQgKHZlcnRpY2FsL2hvcml6b250YWwgZmlyc3QpICovXG4gICAgICAgIHRoaXMuX2RpcnMgPSBbdGhpcy5fZGlyc1swXSwgdGhpcy5fZGlyc1syXSwgdGhpcy5fZGlyc1s0XSwgdGhpcy5fZGlyc1s2XSwgdGhpcy5fZGlyc1sxXSwgdGhpcy5fZGlyc1szXSwgdGhpcy5fZGlyc1s1XSwgdGhpcy5fZGlyc1s3XV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIF9wcm90bzM0ID0gUGF0aC5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zNC5fZ2V0TmVpZ2hib3JzID0gZnVuY3Rpb24gX2dldE5laWdoYm9ycyhjeCwgY3kpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkaXIgPSB0aGlzLl9kaXJzW2ldO1xuICAgICAgICB2YXIgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICB2YXIgeSA9IGN5ICsgZGlyWzFdO1xuXG4gICAgICAgIGlmICghdGhpcy5fcGFzc2FibGVDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFBhdGg7XG4gIH0oKTtcbiAgLyoqXG4gICAqIEBjbGFzcyBTaW1wbGlmaWVkIERpamtzdHJhJ3MgYWxnb3JpdGhtOiBhbGwgZWRnZXMgaGF2ZSBhIHZhbHVlIG9mIDFcbiAgICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gICAqIEBzZWUgUk9ULlBhdGhcbiAgICovXG5cblxuICB2YXIgRGlqa3N0cmEgPVxuICAvKiNfX1BVUkVfXyovXG4gIGZ1bmN0aW9uIChfUGF0aCkge1xuICAgIF9pbmhlcml0c0xvb3NlKERpamtzdHJhLCBfUGF0aCk7XG5cbiAgICBmdW5jdGlvbiBEaWprc3RyYSh0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMjA7XG5cbiAgICAgIF90aGlzMjAgPSBfUGF0aC5jYWxsKHRoaXMsIHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgICAgX3RoaXMyMC5fY29tcHV0ZWQgPSB7fTtcbiAgICAgIF90aGlzMjAuX3RvZG8gPSBbXTtcblxuICAgICAgX3RoaXMyMC5fYWRkKHRvWCwgdG9ZLCBudWxsKTtcblxuICAgICAgcmV0dXJuIF90aGlzMjA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxuICAgICAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMzUgPSBEaWprc3RyYS5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zNS5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICB2YXIga2V5ID0gZnJvbVggKyBcIixcIiArIGZyb21ZO1xuXG4gICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgIHRoaXMuX2NvbXB1dGUoZnJvbVgsIGZyb21ZKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2NvbXB1dGVkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtID0gdGhpcy5fY29tcHV0ZWRba2V5XTtcblxuICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICBpdGVtID0gaXRlbS5wcmV2O1xuICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIG5vbi1jYWNoZWQgdmFsdWVcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzUuX2NvbXB1dGUgPSBmdW5jdGlvbiBfY29tcHV0ZShmcm9tWCwgZnJvbVkpIHtcbiAgICAgIHdoaWxlICh0aGlzLl90b2RvLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcblxuICAgICAgICBpZiAoaXRlbS54ID09IGZyb21YICYmIGl0ZW0ueSA9PSBmcm9tWSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXROZWlnaGJvcnMoaXRlbS54LCBpdGVtLnkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xuICAgICAgICAgIHZhciB4ID0gbmVpZ2hib3JbMF07XG4gICAgICAgICAgdmFyIHkgPSBuZWlnaGJvclsxXTtcbiAgICAgICAgICB2YXIgaWQgPSB4ICsgXCIsXCIgKyB5O1xuXG4gICAgICAgICAgaWYgKGlkIGluIHRoaXMuX2NvbXB1dGVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogYWxyZWFkeSBkb25lICovXG5cblxuICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zNS5fYWRkID0gZnVuY3Rpb24gX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICB2YXIgb2JqID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICBwcmV2OiBwcmV2XG4gICAgICB9O1xuICAgICAgdGhpcy5fY29tcHV0ZWRbeCArIFwiLFwiICsgeV0gPSBvYmo7XG5cbiAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGlqa3N0cmE7XG4gIH0oUGF0aCk7XG4gIC8qKlxuICAgKiBAY2xhc3MgU2ltcGxpZmllZCBBKiBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICAgKiBAYXVnbWVudHMgUk9ULlBhdGhcbiAgICogQHNlZSBST1QuUGF0aFxuICAgKi9cblxuXG4gIHZhciBBU3RhciA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9QYXRoMikge1xuICAgIF9pbmhlcml0c0xvb3NlKEFTdGFyLCBfUGF0aDIpO1xuXG4gICAgZnVuY3Rpb24gQVN0YXIodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczIxO1xuXG4gICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMyMSA9IF9QYXRoMi5jYWxsKHRoaXMsIHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zKSB8fCB0aGlzO1xuICAgICAgX3RoaXMyMS5fdG9kbyA9IFtdO1xuICAgICAgX3RoaXMyMS5fZG9uZSA9IHt9O1xuICAgICAgcmV0dXJuIF90aGlzMjE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxuICAgICAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxuICAgICAqL1xuXG5cbiAgICB2YXIgX3Byb3RvMzYgPSBBU3Rhci5wcm90b3R5cGU7XG5cbiAgICBfcHJvdG8zNi5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICB0aGlzLl9kb25lID0ge307XG4gICAgICB0aGlzLl9mcm9tWCA9IGZyb21YO1xuICAgICAgdGhpcy5fZnJvbVkgPSBmcm9tWTtcblxuICAgICAgdGhpcy5fYWRkKHRoaXMuX3RvWCwgdGhpcy5fdG9ZLCBudWxsKTtcblxuICAgICAgd2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XG4gICAgICAgIHZhciBfaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcblxuICAgICAgICB2YXIgaWQgPSBfaXRlbS54ICsgXCIsXCIgKyBfaXRlbS55O1xuXG4gICAgICAgIGlmIChpZCBpbiB0aGlzLl9kb25lKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kb25lW2lkXSA9IF9pdGVtO1xuXG4gICAgICAgIGlmIChfaXRlbS54ID09IGZyb21YICYmIF9pdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXROZWlnaGJvcnMoX2l0ZW0ueCwgX2l0ZW0ueSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG4gICAgICAgICAgdmFyIHggPSBuZWlnaGJvclswXTtcbiAgICAgICAgICB2YXIgeSA9IG5laWdoYm9yWzFdO1xuXG4gICAgICAgICAgdmFyIF9pZDMgPSB4ICsgXCIsXCIgKyB5O1xuXG4gICAgICAgICAgaWYgKF9pZDMgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fYWRkKHgsIHksIF9pdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IHRoaXMuX2RvbmVbZnJvbVggKyBcIixcIiArIGZyb21ZXTtcblxuICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICBpdGVtID0gaXRlbS5wcmV2O1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfcHJvdG8zNi5fYWRkID0gZnVuY3Rpb24gX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICB2YXIgaCA9IHRoaXMuX2Rpc3RhbmNlKHgsIHkpO1xuXG4gICAgICB2YXIgb2JqID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICBwcmV2OiBwcmV2LFxuICAgICAgICBnOiBwcmV2ID8gcHJldi5nICsgMSA6IDAsXG4gICAgICAgIGg6IGhcbiAgICAgIH07XG4gICAgICAvKiBpbnNlcnQgaW50byBwcmlvcml0eSBxdWV1ZSAqL1xuXG4gICAgICB2YXIgZiA9IG9iai5nICsgb2JqLmg7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdG9kby5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuX3RvZG9baV07XG4gICAgICAgIHZhciBpdGVtRiA9IGl0ZW0uZyArIGl0ZW0uaDtcblxuICAgICAgICBpZiAoZiA8IGl0ZW1GIHx8IGYgPT0gaXRlbUYgJiYgaCA8IGl0ZW0uaCkge1xuICAgICAgICAgIHRoaXMuX3RvZG8uc3BsaWNlKGksIDAsIG9iaik7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdG9kby5wdXNoKG9iaik7XG4gICAgfTtcblxuICAgIF9wcm90bzM2Ll9kaXN0YW5jZSA9IGZ1bmN0aW9uIF9kaXN0YW5jZSh4LCB5KSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHJldHVybiBNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpICsgTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKTtcbiAgICAgICAgICB2YXIgZHkgPSBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpO1xuICAgICAgICAgIHJldHVybiBkeSArIE1hdGgubWF4KDAsIChkeCAtIGR5KSAvIDIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKSwgTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBBU3RhcjtcbiAgfShQYXRoKTtcblxuICB2YXIgaW5kZXgkNCA9IHtcbiAgICBEaWprc3RyYTogRGlqa3N0cmEsXG4gICAgQVN0YXI6IEFTdGFyXG4gIH07XG4gIC8qKlxuICAgKiBAY2xhc3MgQXN5bmNocm9ub3VzIG1haW4gbG9vcFxuICAgKiBAcGFyYW0ge1JPVC5TY2hlZHVsZXJ9IHNjaGVkdWxlclxuICAgKi9cblxuICB2YXIgRW5naW5lID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW5naW5lKHNjaGVkdWxlcikge1xuICAgICAgdGhpcy5fc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IHRoZSBtYWluIGxvb3AuIFdoZW4gdGhpcyBjYWxsIHJldHVybnMsIHRoZSBsb29wIGlzIGxvY2tlZC5cbiAgICAgKi9cblxuXG4gICAgdmFyIF9wcm90bzM3ID0gRW5naW5lLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzM3LnN0YXJ0ID0gZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICByZXR1cm4gdGhpcy51bmxvY2soKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludGVycnVwdCB0aGUgZW5naW5lIGJ5IGFuIGFzeW5jaHJvbm91cyBhY3Rpb25cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzcubG9jayA9IGZ1bmN0aW9uIGxvY2soKSB7XG4gICAgICB0aGlzLl9sb2NrKys7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc3VtZSBleGVjdXRpb24gKHBhdXNlZCBieSBhIHByZXZpb3VzIGxvY2spXG4gICAgICovXG5cblxuICAgIF9wcm90bzM3LnVubG9jayA9IGZ1bmN0aW9uIHVubG9jaygpIHtcbiAgICAgIGlmICghdGhpcy5fbG9jaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgdW5sb2NrIHVubG9ja2VkIGVuZ2luZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbG9jay0tO1xuXG4gICAgICB3aGlsZSAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5fc2NoZWR1bGVyLm5leHQoKTtcblxuICAgICAgICBpZiAoIWFjdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubG9jaygpO1xuICAgICAgICB9XG4gICAgICAgIC8qIG5vIGFjdG9ycyAqL1xuXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdG9yLmFjdCgpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRoZW4pIHtcbiAgICAgICAgICAvKiBhY3RvciByZXR1cm5lZCBhIFwidGhlbmFibGVcIiwgbG9va3MgbGlrZSBhIFByb21pc2UgKi9cbiAgICAgICAgICB0aGlzLmxvY2soKTtcbiAgICAgICAgICByZXN1bHQudGhlbih0aGlzLnVubG9jay5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVuZ2luZTtcbiAgfSgpO1xuICAvKipcbiAgICogTGlnaHRpbmcgY29tcHV0YXRpb24sIGJhc2VkIG9uIGEgdHJhZGl0aW9uYWwgRk9WIGZvciBtdWx0aXBsZSBsaWdodCBzb3VyY2VzIGFuZCBtdWx0aXBsZSBwYXNzZXMuXG4gICAqL1xuXG5cbiAgdmFyIExpZ2h0aW5nID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlnaHRpbmcocmVmbGVjdGl2aXR5Q2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayA9IHJlZmxlY3Rpdml0eUNhbGxiYWNrO1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBwYXNzZXM6IDEsXG4gICAgICAgIGVtaXNzaW9uVGhyZXNob2xkOiAxMDAsXG4gICAgICAgIHJhbmdlOiAxMFxuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB0aGlzLl9saWdodHMgPSB7fTtcbiAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGp1c3Qgb3B0aW9ucyBhdCBydW50aW1lXG4gICAgICovXG5cblxuICAgIHZhciBfcHJvdG8zOCA9IExpZ2h0aW5nLnByb3RvdHlwZTtcblxuICAgIF9wcm90bzM4LnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmFuZ2UpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdXNlZCBGaWVsZC1PZi1WaWV3IGFsZ29cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguc2V0Rk9WID0gZnVuY3Rpb24gc2V0Rk9WKGZvdikge1xuICAgICAgdGhpcy5fZm92ID0gZm92O1xuICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IChvciByZW1vdmUpIGEgbGlnaHQgc291cmNlXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4LnNldExpZ2h0ID0gZnVuY3Rpb24gc2V0TGlnaHQoeCwgeSwgY29sb3IpIHtcbiAgICAgIHZhciBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuXG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5fbGlnaHRzW2tleV0gPSB0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIiA/IGZyb21TdHJpbmcoY29sb3IpIDogY29sb3I7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlnaHRzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaWdodCBzb3VyY2VzXG4gICAgICovXG5cblxuICAgIF9wcm90bzM4LmNsZWFyTGlnaHRzID0gZnVuY3Rpb24gY2xlYXJMaWdodHMoKSB7XG4gICAgICB0aGlzLl9saWdodHMgPSB7fTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBwcmUtY29tcHV0ZWQgdG9wb2xvZ3kgdmFsdWVzLiBDYWxsIHdoZW5ldmVyIHRoZSB1bmRlcmx5aW5nIG1hcCBjaGFuZ2VzIGl0cyBsaWdodC1wYXNzYWJpbGl0eS5cbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzgucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBsaWdodGluZ1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5jb21wdXRlID0gZnVuY3Rpb24gY29tcHV0ZShsaWdodGluZ0NhbGxiYWNrKSB7XG4gICAgICB2YXIgZG9uZUNlbGxzID0ge307XG4gICAgICB2YXIgZW1pdHRpbmdDZWxscyA9IHt9O1xuICAgICAgdmFyIGxpdENlbGxzID0ge307XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9saWdodHMpIHtcbiAgICAgICAgLyogcHJlcGFyZSBlbWl0dGVycyBmb3IgZmlyc3QgcGFzcyAqL1xuICAgICAgICB2YXIgbGlnaHQgPSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgICAgZW1pdHRpbmdDZWxsc1trZXldID0gWzAsIDAsIDBdO1xuICAgICAgICBhZGRfKGVtaXR0aW5nQ2VsbHNba2V5XSwgbGlnaHQpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMucGFzc2VzOyBpKyspIHtcbiAgICAgICAgLyogbWFpbiBsb29wICovXG4gICAgICAgIHRoaXMuX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKTtcblxuICAgICAgICBpZiAoaSArIDEgPT0gdGhpcy5fb3B0aW9ucy5wYXNzZXMpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBub3QgZm9yIHRoZSBsYXN0IHBhc3MgKi9cblxuXG4gICAgICAgIGVtaXR0aW5nQ2VsbHMgPSB0aGlzLl9jb21wdXRlRW1pdHRlcnMobGl0Q2VsbHMsIGRvbmVDZWxscyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGxpdEtleSBpbiBsaXRDZWxscykge1xuICAgICAgICAvKiBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGFuZCBob3cgaXMgbGl0ICovXG4gICAgICAgIHZhciBwYXJ0cyA9IGxpdEtleS5zcGxpdChcIixcIik7XG4gICAgICAgIHZhciB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgbGlnaHRpbmdDYWxsYmFjayh4LCB5LCBsaXRDZWxsc1tsaXRLZXldKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBhbGwgZW1pdHRpbmcgY2VsbHNcbiAgICAgKiBAcGFyYW0gZW1pdHRpbmdDZWxscyBUaGVzZSBlbWl0IGxpZ2h0XG4gICAgICogQHBhcmFtIGxpdENlbGxzIEFkZCBwcm9qZWN0ZWQgbGlnaHQgdG8gdGhlc2VcbiAgICAgKiBAcGFyYW0gZG9uZUNlbGxzIFRoZXNlIGFscmVhZHkgZW1pdHRlZCwgZm9yYmlkIHRoZW0gZnJvbSBmdXJ0aGVyIGNhbGN1bGF0aW9uc1xuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5fZW1pdExpZ2h0ID0gZnVuY3Rpb24gX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZW1pdHRpbmdDZWxscykge1xuICAgICAgICB2YXIgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICB2YXIgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgdmFyIHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG5cbiAgICAgICAgdGhpcy5fZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgZW1pdHRpbmdDZWxsc1trZXldLCBsaXRDZWxscyk7XG5cbiAgICAgICAgZG9uZUNlbGxzW2tleV0gPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFByZXBhcmUgYSBsaXN0IG9mIGVtaXR0ZXJzIGZvciBuZXh0IHBhc3NcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguX2NvbXB1dGVFbWl0dGVycyA9IGZ1bmN0aW9uIF9jb21wdXRlRW1pdHRlcnMobGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gbGl0Q2VsbHMpIHtcbiAgICAgICAgaWYgKGtleSBpbiBkb25lQ2VsbHMpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBhbHJlYWR5IGVtaXR0ZWQgKi9cblxuXG4gICAgICAgIHZhciBfY29sb3IgPSBsaXRDZWxsc1trZXldO1xuICAgICAgICB2YXIgcmVmbGVjdGl2aXR5ID0gdm9pZCAwO1xuXG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUpIHtcbiAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgdmFyIHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgdmFyIHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgcmVmbGVjdGl2aXR5ID0gdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2soeCwgeSk7XG4gICAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGVba2V5XSA9IHJlZmxlY3Rpdml0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWZsZWN0aXZpdHkgPT0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIHdpbGwgbm90IHJlZmxlY3QgYXQgYWxsICovXG5cbiAgICAgICAgLyogY29tcHV0ZSBlbWlzc2lvbiBjb2xvciAqL1xuXG5cbiAgICAgICAgdmFyIGVtaXNzaW9uID0gWzAsIDAsIDBdO1xuICAgICAgICB2YXIgaW50ZW5zaXR5ID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgIHZhciBwYXJ0ID0gTWF0aC5yb3VuZChfY29sb3JbaV0gKiByZWZsZWN0aXZpdHkpO1xuICAgICAgICAgIGVtaXNzaW9uW2ldID0gcGFydDtcbiAgICAgICAgICBpbnRlbnNpdHkgKz0gcGFydDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnRlbnNpdHkgPiB0aGlzLl9vcHRpb25zLmVtaXNzaW9uVGhyZXNob2xkKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBlbWlzc2lvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBvbmUgaXRlcmF0aW9uIGZyb20gb25lIGNlbGxcbiAgICAgKi9cblxuXG4gICAgX3Byb3RvMzguX2VtaXRMaWdodEZyb21DZWxsID0gZnVuY3Rpb24gX2VtaXRMaWdodEZyb21DZWxsKHgsIHksIGNvbG9yLCBsaXRDZWxscykge1xuICAgICAgdmFyIGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICB2YXIgZm92O1xuXG4gICAgICBpZiAoa2V5IGluIHRoaXMuX2ZvdkNhY2hlKSB7XG4gICAgICAgIGZvdiA9IHRoaXMuX2ZvdkNhY2hlW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3YgPSB0aGlzLl91cGRhdGVGT1YoeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGZvdktleSBpbiBmb3YpIHtcbiAgICAgICAgdmFyIGZvcm1GYWN0b3IgPSBmb3ZbZm92S2V5XTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcblxuICAgICAgICBpZiAoZm92S2V5IGluIGxpdENlbGxzKSB7XG4gICAgICAgICAgLyogYWxyZWFkeSBsaXQgKi9cbiAgICAgICAgICByZXN1bHQgPSBsaXRDZWxsc1tmb3ZLZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIG5ld2x5IGxpdCAqL1xuICAgICAgICAgIHJlc3VsdCA9IFswLCAwLCAwXTtcbiAgICAgICAgICBsaXRDZWxsc1tmb3ZLZXldID0gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICByZXN1bHRbaV0gKz0gTWF0aC5yb3VuZChjb2xvcltpXSAqIGZvcm1GYWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8qIGFkZCBsaWdodCBjb2xvciAqL1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBGT1YgKFwiZm9ybSBmYWN0b3JcIikgZm9yIGEgcG90ZW50aWFsIGxpZ2h0IHNvdXJjZSBhdCBbeCx5XVxuICAgICAqL1xuXG5cbiAgICBfcHJvdG8zOC5fdXBkYXRlRk9WID0gZnVuY3Rpb24gX3VwZGF0ZUZPVih4LCB5KSB7XG4gICAgICB2YXIga2V5MSA9IHggKyBcIixcIiArIHk7XG4gICAgICB2YXIgY2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuX2ZvdkNhY2hlW2tleTFdID0gY2FjaGU7XG4gICAgICB2YXIgcmFuZ2UgPSB0aGlzLl9vcHRpb25zLnJhbmdlO1xuXG4gICAgICBmdW5jdGlvbiBjYih4LCB5LCByLCB2aXMpIHtcbiAgICAgICAgdmFyIGtleTIgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICB2YXIgZm9ybUZhY3RvciA9IHZpcyAqICgxIC0gciAvIHJhbmdlKTtcblxuICAgICAgICBpZiAoZm9ybUZhY3RvciA9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FjaGVba2V5Ml0gPSBmb3JtRmFjdG9yO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9mb3YuY29tcHV0ZSh4LCB5LCByYW5nZSwgY2IuYmluZCh0aGlzKSk7XG5cbiAgICAgIHJldHVybiBjYWNoZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIExpZ2h0aW5nO1xuICB9KCk7XG5cbiAgdmFyIFV0aWwgPSB1dGlsO1xuICB2YXIgQ29sb3IgPSBjb2xvcjtcbiAgdmFyIFRleHQgPSB0ZXh0O1xuICBleHBvcnRzLlV0aWwgPSBVdGlsO1xuICBleHBvcnRzLkNvbG9yID0gQ29sb3I7XG4gIGV4cG9ydHMuVGV4dCA9IFRleHQ7XG4gIGV4cG9ydHMuUk5HID0gUk5HJDE7XG4gIGV4cG9ydHMuRGlzcGxheSA9IERpc3BsYXk7XG4gIGV4cG9ydHMuU3RyaW5nR2VuZXJhdG9yID0gU3RyaW5nR2VuZXJhdG9yO1xuICBleHBvcnRzLkV2ZW50UXVldWUgPSBFdmVudFF1ZXVlO1xuICBleHBvcnRzLlNjaGVkdWxlciA9IGluZGV4O1xuICBleHBvcnRzLkZPViA9IGluZGV4JDE7XG4gIGV4cG9ydHMuTWFwID0gaW5kZXgkMjtcbiAgZXhwb3J0cy5Ob2lzZSA9IGluZGV4JDM7XG4gIGV4cG9ydHMuUGF0aCA9IGluZGV4JDQ7XG4gIGV4cG9ydHMuRW5naW5lID0gRW5naW5lO1xuICBleHBvcnRzLkxpZ2h0aW5nID0gTGlnaHRpbmc7XG4gIGV4cG9ydHMuREVGQVVMVF9XSURUSCA9IERFRkFVTFRfV0lEVEg7XG4gIGV4cG9ydHMuREVGQVVMVF9IRUlHSFQgPSBERUZBVUxUX0hFSUdIVDtcbiAgZXhwb3J0cy5ESVJTID0gRElSUztcbiAgZXhwb3J0cy5LRVlTID0gS0VZUztcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG4gIH0pO1xufSk7XG5cbiIsImltcG9ydCAqIGFzIFJPVCBmcm9tICdyb3QtanMnO1xuaW1wb3J0IHsgQ3JlYXRlQ2FsbGJhY2sgfSBmcm9tICdyb3QtanMvbGliL21hcC9tYXAnO1xuXG4vKiB2YXIgZCA9IG5ldyBST1QuRGlzcGxheSgpO1xudmFyIG8gPSBkLmdldE9wdGlvbnMoKTtcblxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkLmdldENvbnRhaW5lcigpKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBvLndpZHRoOyBpKyspIHtcblx0Zm9yICh2YXIgaiA9IDA7IGogPCBvLmhlaWdodDsgaisrKSB7XG5cdFx0aWYgKCFpIHx8ICFqIHx8IGkgKyAxID09IG8ud2lkdGggfHwgaiArIDEgPT0gby5oZWlnaHQpIHtcblx0XHRcdGQuZHJhdyhpLCBqLCBcIiNcIiwgXCJncmF5XCIsIFwiYmxhY2tcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGQuZHJhdyhpLCBqLCBcIi5cIiwgXCIjNjY2XCIsIFwiYmxhY2tcIik7XG5cdFx0fVxuXHR9XG59XG5kLmRyYXcoby53aWR0aCA+PiAxLCBvLmhlaWdodCA+PiAxLCBcIkBcIiwgXCJibHVlXCIsIFwieWVsbG93XCIpOyAqL1xuXG5jbGFzcyBNeURpZ2dlciBleHRlbmRzIFJPVC5NYXAuRGlnZ2VyXG57XG5cdGZ1Y2soY2I/OiBDcmVhdGVDYWxsYmFjayl7XG5cdFx0Y29uc29sZS5sb2coXCJjcmVhdGVcIik7XG5cdFx0dGhpcy5jcmVhdGUoY2IpO1xuXHR9XG59XG5cblJPVC5STkcuc2V0U2VlZCgxMjM0KTtcbnZhciBtYXAgPSBuZXcgTXlEaWdnZXIoNTAsIDUwKTtcbnZhciBkaXNwbGF5ID0gbmV3IFJPVC5EaXNwbGF5KHtmb250U2l6ZTo4fSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpc3BsYXkuZ2V0Q29udGFpbmVyKCkpO1xubWFwLmZ1Y2soZGlzcGxheS5ERUJVRyk7XG5cbmNvbnNvbGUubG9nKFwiZnVjIHlvdVwiKVxuLyogdmFyIGRyYXdEb29yID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIGRpc3BsYXkuZHJhdyh4LCB5LCBcIlwiLCBcIlwiLCBcInJlZFwiKTtcbn1cblxudmFyIHJvb21zID0gbWFwLmdldFJvb21zKCk7XG5mb3IgKHZhciBpPTA7IGk8cm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcm9vbSA9IHJvb21zW2ldO1xuICAgIFxuXG5cdHJvb20uZ2V0RG9vcnMoZHJhd0Rvb3IpO1xufSAqLyJdfQ==
