'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

var Vinslider = function () {
    function Vinslider(object) {
        var _this = this;

        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$amount = _ref.amount,
            amount = _ref$amount === undefined ? 1 : _ref$amount,
            _ref$speed = _ref.speed,
            speed = _ref$speed === undefined ? 750 : _ref$speed,
            _ref$duration = _ref.duration,
            duration = _ref$duration === undefined ? 3000 : _ref$duration,
            _ref$isAutoplay = _ref.isAutoplay,
            isAutoplay = _ref$isAutoplay === undefined ? true : _ref$isAutoplay,
            _ref$isInfinite = _ref.isInfinite,
            isInfinite = _ref$isInfinite === undefined ? true : _ref$isInfinite,
            _ref$prev = _ref.prev,
            prev = _ref$prev === undefined ? '' : _ref$prev,
            _ref$next = _ref.next,
            next = _ref$next === undefined ? '' : _ref$next;

        _classCallCheck(this, Vinslider);

        this.init(object)(amount)(speed)(isInfinite)(duration)(isAutoplay)(prev, next);

        var observer = new MutationObserver(function () {
            _this.init(object)(amount)(speed)(isInfinite)(duration)(isAutoplay)(prev, next);
        });
        observer.observe(object, {
            attributes: true,
            childList: true,
            characterData: true
        });
    }

    _createClass(Vinslider, [{
        key: 'init',
        value: function init(object) {
            var _this2 = this;

            this.items = Array.prototype.slice.call(object.children);

            // Layout 
            return function (amount) {
                var width = 100 / amount;

                _this2.items.forEach(function (v, i) {
                    v.style.width = width + '%';
                    v.style.position = 'absolute';
                    v.style.left = width * i + '%';
                });

                object.style.position = 'relative';
                object.style.overflow = 'hidden';
                object.style.visibility = 'visible';

                // Set transition 
                return function (speed) {
                    var time = speed / 1000 + 's';

                    _this2.items.forEach(function (v, i) {
                        v.style.WebkitTransition = 'left ' + time + ' ease';
                        v.style.MozTransition = 'left ' + time + ' ease';
                        v.style.OTransition = 'left ' + time + ' ease';
                        v.style.transition = 'left ' + time + ' ease';
                    });

                    // Set movement and direction
                    return function (isInfinite) {
                        _this2.index = 0;

                        var loop = function loop() {
                            _this2.items.forEach(function (v, i) {
                                v.style.left = width * (i - _this2.index) + '%';
                                v.className = v.className.replace(' vinactive', '');
                            });
                            _this2.items[_this2.index].className += ' vinactive';
                        };

                        var forwards = function forwards() {
                            ++_this2.index;
                            while (_this2.index === _this2.items.length - amount + 1) {
                                if (isInfinite) {
                                    _this2.index = 0;
                                } else {
                                    --_this2.index;
                                }
                            }
                            loop();
                        };

                        var backwards = function backwards() {
                            --_this2.index;
                            while (_this2.index < 0) {
                                if (isInfinite) {
                                    _this2.index = _this2.items.length - amount;
                                } else {
                                    ++_this2.index;
                                }
                            }
                            loop();
                        };

                        // Start autoplay
                        return function (duration) {
                            window.clearTimeout(_this2.timer);
                            _this2.timer = window.setInterval(function () {
                                forwards();
                            }, duration);

                            // Stop autoplay
                            return function (isAutoplay) {
                                if (!isAutoplay) window.clearTimeout(_this2.timer);

                                // Controllers
                                return function (prev, next) {
                                    document.querySelector(prev).onclick = function () {
                                        backwards();
                                    };
                                    document.querySelector(next).onclick = function () {
                                        forwards();
                                    };
                                };
                            };
                        };
                    };
                };
            };
        }
    }]);

    return Vinslider;
}();

if (typeof define === "function" && define.amd) {
    define('Vinslider', [], function () {
        return Vinslider;
    });
} else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && exports) {
    module.exports = Vinslider;
} else {
    window.Vinslider = Vinslider;
}
