/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

"use strict"

var Vinslider = function(object, custom) {
    // Stop function if no object is found
    if (!object) {
        console.log("ERROR: Didn't find corresponding element");
        return;
    }

    // Default config
    this.preset = {
        // String
        mode: 'fade',
        activeClass: 'vinactive',
        // Number
        duration: 5000,
        gutter: 0,
        startFrom: 0,
        amount: 1,
        moveBy: 1,
        // Boolean
        isPager: true,
        isController: true,
        isAuto: true,
        isInfinite: true,
        isForward: true,
        isPercentGutter: false,
        isScrollable: false,
        isVertical: false,
    };

    // DOM
    this.vinmain = object.getElementsByTagName('ul')[0];
    this.vinmain.className = 'vinmain';
    this.list = this.vinmain.children;

    // Meta
    this.itemNum = this.list.length;
    this.mode = ['fade', 'slide', 'carousel'],

    this.init(object, custom);
};

Vinslider.prototype = {
    init: function(object, custom) {

        // Basic
        this.configReset(custom);
        this.responsive();

        // Initialzation
        this.configInit();
        this.modeInit();
        this.sizeInit();

        // Create DOM
        this.buildpager(object);
        this.buildController(object);

        // Run
        this.startFrom(this.config.startFrom);
        this.lifecircle();
        this.autoPlay(this.config.duration);
        this.userEvent();
    },

    // Basic utilities

    addClass: function(object, classname) {
        if (object !== undefined && object.className.indexOf(classname) < 0) {
            object.className += ' ' + classname;
        }
    },

    removeClass: function(object, classname) {
        if (object !== undefined && object.className.indexOf(classname) >= 0) {
            object.className = object.className.replace(classname, '');
        }
    },

    toggleClass: function(object, classname) {
        if (object !== undefined && object.className.indexOf(classname) >= 0) {
            object.className = object.className.replace(classname, '');
        }   else {
            object.className += ' ' + classname;
        }
    },

    configReset: function(custom) {
        var self = this;

        // Reset config
        if (custom) {
            this.config = custom;
            (function(obj) {
                var ind = 0;
                var key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        self.config[key] = custom[key] !== undefined ? custom[key] : self.preset[key];
                    }
                }
            })(this.preset);
        } else {
            this.config = this.preset;
        }
    },

    configInit: function() {

        // moveBy could not be set less than 0
        this.config.moveBy = this.config.moveBy < 0 ? 1 : this.config.moveBy;

        // amount always starts from 2
        this.config.amount = this.config.amount <= 1 ? 2 : this.config.amount;

        // direction of slider
        this.direction = this.config.isVertical ? ['top', 'clientHeight', 'height'] : ['left', 'clientWidth', 'width'];
    },

    sizeInit: function() {

        // Calculate size of each elements
        if (this.config.mode !== this.mode[0]) {
        var self = this;
            var gut = this.config.isPercentGutter ? this.size * this.config.gutter : this.config.gutter;

            this.size = this.config.mode == this.mode[2] ? (this.vinmain[this.direction[1]] / this.config.amount) : this.vinmain[this.direction[1]];

            for (var i = 0; i < this.itemNum; i++) {
                this.list[i].style[this.direction[2]] = this.size - gut + 'px';
            }
        }
    },

    modeInit: function() {

        // Slide mode
        if (this.config.mode == this.mode[1]) {
            for (var i = 0; i < this.itemNum; i++) {
                this.list[i].style.opacity = 1;
            }
        }

        // Carousel mode
        if (this.config.mode == this.mode[2]) {
            for (var i = 0; i < this.itemNum; i++) {
                this.list[i].style.opacity = 1;
            }
            this.config.isPager = false;
        }
    },

    responsive: function() {

        // Resize slider size when resizing screen
        var timeout = false;
        var self = this;
        window.addEventListener('resize', function() {
            clearTimeout(timeout);
            timeout = setTimeout(reset, 300);
        });

        function reset() {
            self.sizeInit();
            self.lifecircle();
        }
    },

    buildWrapper: function(object, string) {
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = string;
        object.appendChild(wrapper);
        wrapper.appendChild(ul);
        return ul;
    },

    buildController: function(object) {
        var ul = this.buildWrapper(object, 'vincontroller');

        for (var i = 0; i < 2; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.prevBtn = ul.children[0];
        this.nextBtn = ul.children[1];

        // Hide controller when
        ul.style.display = this.itemNum <= this.config.amount || !this.config.isController ? 'none' : '';
    },

    buildpager: function(object) {
        var ul = this.buildWrapper(object, 'vinpager');

        for (var i = 0; i < this.itemNum; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.bullet = ul.children;

        // Hide controller when
        ul.style.display = !this.config.isPager || this.itemNum <= 1 ? 'none' : '';
    },

    autoPlay: function(num) {

        // Auto play the slider
        var self = this;
        if (this.config.isAuto) {
            this.timer = setInterval(function() {
                if (self.config.isForward) {
                    self.forward();
                } else {
                    self.backward();
                }
            }, num);
        }
    },

    resetAutoPlay: function() {

        // Reset the timer when user navigates the slider
        clearTimeout(this.timer);
        this.autoPlay(this.config.duration);
    },

    userEvent: function() {
        var self = this;

        // Controller navigate
        this.nextBtn.onclick = function() {
            self.forward();
            self.resetAutoPlay();
        }

        this.prevBtn.onclick = function() {
            self.backward();
            self.resetAutoPlay();
        }

        // Pager navigate
        function closure(ind) {
            return function() {
                for (var e = 0; e < self.itemNum; e++) {
                    self.list[e].className = '';
                    self.bullet[e].className = '';
                }

                self.list[ind].className = self.config.activeClass;
                self.lifecircle();
                self.resetAutoPlay();
            }
        }
        for (var i = 0; i < this.itemNum; i++) {
            this.bullet[i].onclick = closure(i);
        }

        // Scroll
        if (this.config.isScrollable) {
            this.vinmain.onwheel = function() {
                event.preventDefault();
                if (event.deltaY > 0 || event.deltaX > 0) {
                    self.forward();
                    self.resetAutoPlay();
                } else {
                    self.backward();
                    self.resetAutoPlay();
                }
            }
        }
    },

    ifStop: function() {
        return parseInt(this.list[this.itemNum - 1].style[this.direction[0]]) < this.vinmain[this.direction[1]];
    },

    startFrom: function(ind) {

        // Run the slider
        this.list[ind].className = this.config.activeClass;
    },

    lifecircle: function() {
        // Get current active element, add active class, and remove all elements active class
        for (var i = 0; i < this.itemNum; i++) {
            var status = this.list[i].className;
            this.list[i].className = '';
            this.bullet[i].className = '';

            if (status.indexOf(this.config.activeClass) >= 0) {

                // Store current active index and element
                this.curIndex = i;
                this.curLi = this.list[this.curIndex];

                // Add active class to the current list and bullet
                this.list[this.curIndex].className = this.config.activeClass;
                this.bullet[this.curIndex].className = this.config.activeClass;
            }
        }

        // Store the previous index and element
        this.prevIndex = this.curIndex - 1;
        this.prevLi = this.list[this.prevIndex];
        // Store the next index and element
        this.nextIndex = this.curIndex + 1;
        this.nextLi = this.list[this.nextIndex];

        // Set effect to each slide
        if (this.config.mode == this.mode[1] || this.config.mode == this.mode[2]) {
            // Slide and carousel mode, calculate position
            for (var e = 0; e < this.itemNum; e++) {
                var ind = e - this.curIndex;
                this.list[e].style[this.direction[0]] = this.size * ind + 'px';
            }
        } else {
            // Fade mode, set opacity
            for (var r = 0; r < this.itemNum; r++) {
                this.list[r].style.opacity = 0;
            }
            this.list[this.curIndex].style.opacity = 1;

        }
    },

    forward: function() {
        for (var i = 0; i < this.config.moveBy; i++) {
            if (this.config.mode !== this.mode[2]) {
                this.removeClass(this.curLi, this.config.activeClass);
                if (this.nextIndex < this.itemNum) {
                    this.addClass(this.nextLi, this.config.activeClass);
                } else {
                    if (this.config.isInfinite) {
                        this.addClass(this.list[0], this.config.activeClass);
                    }
                }
            } else {
                if (!this.ifStop()) {
                    this.curLi.className = '';
                    this.nextLi.className = this.config.activeClass;
                } else {
                    if (this.config.isInfinite) {
                        this.curLi.className = '';
                        this.list[0].className = this.config.activeClass;
                    }
                }
            }
            this.lifecircle();
        }
    },

    backward: function() {
        for (var i = 0; i < this.config.moveBy; i++) {
            this.removeClass(this.curLi, this.config.activeClass);
            if (this.prevIndex >= 0) {
                this.addClass(this.prevLi, this.config.activeClass);
            } else {
                if (this.config.isInfinite) {
                    if (this.config.mode == this.mode[2]) {
                        this.addClass(this.list[this.itemNum - this.config.amount], this.config.activeClass);
                    } else {
                        this.addClass(this.list[this.itemNum - 1], this.config.activeClass);
                    }
                }
            }
            this.lifecircle();
        }
    },
};