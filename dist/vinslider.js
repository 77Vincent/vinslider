'use strict';

/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

var Vinslider = function Vinslider(object, custom) {

    // Stop function if no object is found
    if (!object) return;

    // Default configurations
    this.preset = {

        // String
        mode: 'slide',
        activeClass: 'vinactive',

        // Number
        speed: 750,
        duration: 5000,
        gutter: 0,
        startFrom: 0,
        amount: 1,
        moveBy: 1,

        // Boolean
        isPager: true,
        isController: true,
        isAutoplay: true,
        isInfinite: true,
        isForward: true,
        isPercentGutter: false,
        isScrollable: false,
        isVertical: false,
        isUseItemSize: false,
        isFillWrapper: false
    };

    // DOM
    this.vinmain = object.getElementsByTagName('ul')[0];
    this.vinmain.className = 'vinmain';
    this.list = this.vinmain.children;

    // Meta
    this.throttle = 300;
    this.itemNum = this.list.length;

    // Run
    this.init(object, custom);
};

Vinslider.prototype = {
    init: function init(object, custom) {

        // Synchronous 
        // DOM
        this.buildpager(object);
        this.buildController(object);

        // Config
        this.configReset(custom);
        this.configInit();

        // Init 
        this.animation();
        this.modeInit(this.config.amount);
        this.sizeInit(this.config.amount);

        // Run
        this.startFrom(this.config.startFrom);
        this.lifecircle();
        this.autoPlay(this.config.duration);

        // Asynchronous
        this.responsive();
        this.userEvent();
    },

    // For async callback
    rebuild: function rebuild(custom) {

        // Rebuild the Vinslider with new configurations
        this.configReset(custom);
        this.configInit();
        this.animation();
        this.modeInit(this.config.amount);
        this.sizeInit(this.config.amount);
        this.startFrom(this.config.startFrom);
        this.lifecircle();
        this.autoPlay(this.config.duration);
    },

    ifAutoplay: function ifAutoplay(value) {
        this.config.isAutoplay = value;
        this.autoPlay(this.config.duration);
    },

    goto: function goto(value) {

        // Go to a certain slide
        this.startFrom(value);
        this.lifecircle();
    },

    resize: function resize() {
        var _this = this;

        // Resize each slide when the size of the wrapper changes
        setTimeout(function () {
            _this.sizeInit(_this.config.amount);
            _this.lifecircle();
        }, 0);
    },

    reAmount: function reAmount(value) {

        // Reset the amount of items
        this.config.amount = value;

        // Reinit
        this.modeInit(this.config.amount);
        this.sizeInit(this.config.amount);

        // Rerun
        this.startFrom(0);
        this.lifecircle();
    },

    // Basic utilities
    addClass: function addClass(object, classname) {

        if (object !== undefined && object.className.indexOf(classname) < 0) {
            object.className += ' ' + classname;
        }
    },

    removeClass: function removeClass(object, classname) {

        if (object !== undefined && object.className.indexOf(classname) >= 0) {
            object.className = object.className.replace(' ' + classname, '');
        }
    },

    capitalize: function capitalize(object) {

        return object.charAt(0).toUpperCase() + object.slice(1);
    },

    // Configurations
    configReset: function configReset(custom) {
        var _this2 = this;

        // Reset config
        if (custom) {
            this.config = custom;
            (function (obj) {
                var key = void 0;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        _this2.config[key] = custom[key] !== undefined ? custom[key] : _this2.preset[key];
                    }
                }
            })(this.preset);
        } else {
            this.config = this.preset;
        }

        // Replace preset with new customized configurations 
        this.preset = this.config;
    },

    configInit: function configInit() {

        // moveBy could not be set less than 0
        this.config.moveBy = this.config.moveBy < 0 ? 1 : this.config.moveBy;

        // direction of slider
        // In array:
        // 1- main direction position
        // 2- main direction size
        // 3- orthogonal direction size
        this.direction = this.config.isVertical ? ['top', 'height', 'width'] : ['left', 'width', 'height'];
    },

    sizeInit: function sizeInit(amount) {
        var _this3 = this;

        // Get gutter
        var gut = this.config.isPercentGutter ? this.size * this.config.gutter : this.config.gutter;

        // Get main direction size of vinmain
        this.size = this.vinmain['client' + this.capitalize(this.direction[1])] / amount;

        // Get orthogonal direction size 
        var temp = 0;
        var max = 0;

        // Set size for each item 

        var _loop = function _loop(i) {

            // Subtract gut from each slide size
            _this3.list[i].style[_this3.direction[1]] = _this3.size - gut + 'px';

            // Set children items' orthogonal size to auto;
            if (_this3.config.isUseItemSize) {
                _this3.list[i].style[_this3.direction[2]] = 'auto';

                // Get the largest item's orthogonal size
                setTimeout(function () {
                    if (_this3.list[i]['client' + _this3.capitalize(_this3.direction[2])] >= temp) {
                        max = _this3.list[i]['client' + _this3.capitalize(_this3.direction[2])];
                    }
                    temp = _this3.list[i]['client' + _this3.capitalize(_this3.direction[2])];
                }, _this3.config.speed);
            }
        };

        for (var i = 0; i < this.itemNum; i++) {
            _loop(i);
        }

        // Set vinmain height based on its children elements' height but not CSS height
        setTimeout(function () {

            // Set vinmain size based on its items size
            if (_this3.config.isUseItemSize) {
                _this3.vinmain.style[_this3.direction[2]] = max + 'px';
            }

            // Set items'size to 100% if is set to fill wrapper
            if (_this3.config.isFillWrapper) {
                for (var i = 0; i < _this3.itemNum; i++) {
                    _this3.list[i].style[_this3.direction[2]] = '100%';
                }
            }
        }, this.config.speed);
    },

    modeInit: function modeInit(amount) {
        var controller = this.vinmain.parentElement.querySelector('.vincontroller');
        var pager = this.vinmain.parentElement.querySelector('.vinpager');

        // Correct amount
        if (amount <= 0 || this.config.mode == 'fade') {
            amount = this.config.amount = 1;
        } else if (amount > this.itemNum) {
            amount = this.config.amount = this.itemNum;
        }

        // Controller visible
        if (amount >= this.itemNum) {
            controller.style.display = 'none';
        } else {
            controller.style.display = '';
        }

        // Pager visible
        if (amount > 1 || this.itemNum == 1) {
            pager.style.display = 'none';
        } else {
            pager.style.display = '';
        }

        switch (this.config.mode) {
            case 'slide':
                for (var i = 0; i < this.itemNum; i++) {
                    this.list[i].style.opacity = 1;
                }
                break;
        }

        // Normal
        if (!this.config.isController) {
            controller.style.display = 'none';
        }

        if (!this.config.isPager) {
            pager.style.display = 'none';
        }
    },

    animation: function animation() {
        var _this4 = this;

        var speed = ' ' + this.config.speed / 1000 + 's';
        var unit = !this.config.isVertical ? ['width', 'left'] : ['height', 'top'];

        function create(object) {

            // Apply transition to item based on mode
            switch (this.config.mode) {
                case 'fade':
                    object.style.WebkitTransition = 'opacity' + speed;
                    object.style.MozTransition = 'opacity' + speed;
                    object.style.OTransition = 'opacity' + speed;
                    object.style.Transition = 'opacity' + speed;
                    break;

                case 'slide':
                    object.style.WebkitTransition = unit[0] + speed + ',' + unit[1] + speed;
                    object.style.MozTransition = unit[0] + speed + ',' + unit[1] + speed;
                    object.style.OTransition = unit[0] + speed + ',' + unit[1] + speed;
                    object.style.Transition = unit[0] + speed + ',' + unit[1] + speed;
                    break;
            }
        }

        // Create transition for each list items
        setTimeout(function () {
            for (var i = 0; i < _this4.list.length; i++) {
                create.call(_this4, _this4.list[i]);
            }
        }, this.config.speed);
    },

    responsive: function responsive() {
        var _this5 = this;

        // Resize slider size when resizing screen
        var timeout = false;

        window.addEventListener('resize', function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                _this5.sizeInit(_this5.config.amount);
                _this5.lifecircle();
            }, _this5.throttle);
        });
    },

    buildWrapper: function buildWrapper(object, string) {

        // Build wrapper for contoller and pager
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = string;
        object.appendChild(wrapper);
        wrapper.appendChild(ul);

        return ul;
    },

    buildController: function buildController(object) {

        // Remove element if it is already built
        var prevCon = this.vinmain.parentElement.querySelector('.vincontroller');
        if (prevCon) prevCon.parentElement.removeChild(prevCon);

        var ul = this.buildWrapper(object, 'vincontroller');

        for (var i = 0; i < 2; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }
        this.prevBtn = ul.children[0];
        this.nextBtn = ul.children[1];
    },

    buildpager: function buildpager(object) {

        // Remove element if it is already built
        var prevPager = this.vinmain.parentElement.querySelector('.vinpager');
        if (prevPager) prevPager.parentElement.removeChild(prevPager);

        var ul = this.buildWrapper(object, 'vinpager');

        for (var i = 0; i < this.itemNum; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }
        this.bullet = ul.children;
    },

    autoPlay: function autoPlay(value) {
        var _this6 = this;

        // Auto play the slider

        if (this.config.isAutoplay) {

            // Clear timer if exists
            if (this.timer) clearTimeout(this.timer);

            this.timer = setInterval(function () {
                if (_this6.config.isForward) {
                    _this6.forward();
                } else {
                    _this6.backward();
                }
            }, value);
        } else {
            if (this.timer) clearTimeout(this.timer);
        }
    },

    resetAutoPlay: function resetAutoPlay() {

        // Reset the timer when user navigates the slider
        clearTimeout(this.timer);
        this.autoPlay(this.config.duration);
    },

    userEvent: function userEvent() {
        var _this7 = this;

        function forward() {
            this.forward();
            this.resetAutoPlay();
        }

        function backward() {
            this.backward();
            this.resetAutoPlay();
        }

        // Controller navigate
        this.nextBtn.onclick = function () {
            forward.call(_this7);
        };

        this.prevBtn.onclick = function () {
            backward.call(_this7);
        };

        // Pager navigate

        var _loop2 = function _loop2(i) {
            _this7.bullet[i].addEventListener('click', function () {
                for (var _i = 0; _i < _this7.itemNum; _i++) {
                    _this7.removeClass(_this7.list[_i], _this7.config.activeClass);
                    _this7.removeClass(_this7.bullet[_i], _this7.config.activeClass);
                }
                _this7.addClass(_this7.list[i], _this7.config.activeClass);
                _this7.lifecircle();
                _this7.resetAutoPlay();
            });
        };

        for (var i = 0; i < this.itemNum; i++) {
            _loop2(i);
        }

        // Touch event

        // Scroll
        if (this.config.isScrollable) {
            this.vinmain.addEventListener('wheel', function () {
                event.preventDefault();

                if (event.deltaY > 0 || event.deltaX > 0) {
                    forward.call(_this7);
                } else {
                    backward.call(_this7);
                }
            });
        }
    },

    ifStop: function ifStop() {
        return parseInt(this.list[this.itemNum - 1].style[this.direction[0]]) < this.vinmain['client' + this.capitalize(this.direction[1])];
    },

    startFrom: function startFrom(value) {
        // Correct value
        if (value < 0) {
            value = 0;
        } else if (value > this.itemNum - this.config.amount) {
            value = this.itemNum - this.config.amount;
        }

        for (var i = 0; i < this.itemNum; i++) {
            this.removeClass(this.list[i], this.config.activeClass);
        }

        // Run the slider
        this.addClass(this.list[value], this.config.activeClass);
    },

    lifecircle: function lifecircle() {

        // Get current active element, add active class, and remove all elements active class
        for (var i = 0; i < this.itemNum; i++) {
            var status = this.list[i].className;
            this.removeClass(this.list[i], this.config.activeClass);
            this.removeClass(this.bullet[i], this.config.activeClass);
            if (status.indexOf(this.config.activeClass) >= 0) {

                // Store current active index and element
                this.curIndex = i;
                this.curLi = this.list[this.curIndex];

                // Add active class to the current list and bullet
                this.addClass(this.list[this.curIndex], this.config.activeClass);
                this.addClass(this.bullet[this.curIndex], this.config.activeClass);
            }
        }

        // Store the previous index and element
        this.prevIndex = this.curIndex - 1;
        this.prevLi = this.list[this.prevIndex];

        // Store the next index and element
        this.nextIndex = this.curIndex + 1;
        this.nextLi = this.list[this.nextIndex];

        // Set effect to each slide
        switch (this.config.mode) {
            case 'fade':
                for (var r = 0; r < this.itemNum; r++) {
                    this.list[r].style.opacity = 0;
                    this.list[r].style.zIndex = 1;
                }
                this.list[this.curIndex].style.opacity = 1;
                this.list[this.curIndex].style.zIndex = 1;
                break;

            case 'slide':
                for (var e = 0; e < this.itemNum; e++) {
                    var idx = e - this.curIndex;
                    this.list[e].style[this.direction[0]] = this.size * idx + 'px';
                }
                break;
        }
    },

    forward: function forward() {

        for (var i = 0; i < this.config.moveBy; i++) {
            switch (this.config.amount == 1) {
                case true:
                    if (this.nextIndex < this.itemNum) {
                        this.removeClass(this.curLi, this.config.activeClass);
                        this.addClass(this.nextLi, this.config.activeClass);
                    } else {

                        if (this.config.isInfinite) {
                            this.removeClass(this.curLi, this.config.activeClass);
                            this.addClass(this.list[0], this.config.activeClass);
                        }
                    }
                    break;

                case false:
                    if (!this.ifStop()) {
                        this.removeClass(this.curLi, this.config.activeClass);
                        this.addClass(this.nextLi, this.config.activeClass);
                    } else {
                        if (this.config.isInfinite) {
                            this.removeClass(this.curLi, this.config.activeClass);
                            this.addClass(this.list[0], this.config.activeClass);
                        }
                    }
                    break;
            }
            this.lifecircle();
        }
    },

    backward: function backward() {

        for (var i = 0; i < this.config.moveBy; i++) {
            this.removeClass(this.curLi, this.config.activeClass);
            if (this.prevIndex >= 0) {
                this.addClass(this.prevLi, this.config.activeClass);
            } else {
                if (this.config.isInfinite) {
                    switch (this.config.amount == 1) {
                        case true:
                            this.addClass(this.list[this.itemNum - 1], this.config.activeClass);
                            break;
                        case false:
                            this.addClass(this.list[this.itemNum - this.config.amount], this.config.activeClass);
                            break;
                    }
                }
            }
            this.lifecircle();
        }
    }
};
