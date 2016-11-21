/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

"use strict"
var Vinslider = function (object, custom) {

    // Stop function if no object is found
    if (!object) return;

    // Default configurations
    this.preset = {

        // String
        mode: 'fade',
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
        isAuto: true,
        isInfinite: true,
        isForward: true,
        isPercentGutter: false,
        isScrollable: false,
        isVertical: false,
		isWrapperSize: true
    };

    // DOM
    this.vinmain = object.getElementsByTagName('ul')[0];
    this.vinmain.className = 'vinmain';
    this.list = this.vinmain.children;

    // Meta
    this.itemNum = this.list.length;
    this.mode = ['fade', 'slide', 'carousel'],

	// Run
    this.init(object, custom);
};

Vinslider.prototype = {
    init: function (object, custom) {

        // Global
        this.configReset(custom);
        this.responsive();
		this.animation();

        // Initialzation
        this.configInit();
        this.modeInit();
        this.sizeInit(this.config.amount);

        // Create DOM
        this.buildpager(object);
        this.buildController(object);

        // Run
        this.startFrom(this.config.startFrom);
        this.lifecircle();
        this.autoPlay(this.config.duration);
        this.userEvent();
    },

    // For async callback
    goto: function (idx) {

        // Go to a certain slide
        this.startFrom(idx);
        this.lifecircle();
    },

    resize: function () {

        // Resize each slide when the size of the wrapper changes
        var self = this;
        setTimeout(function () {
            self.sizeInit(self.config.amount);
            self.lifecircle();
        }, 0)
    },

    reAmount: function (amount) {

    	// Reset the amount of items
		this.config.amount = amount;
		this.sizeInit(amount);
		this.lifecircle();
    },

    // Basic utilities
    addClass: function (object, classname) {

        if (object !== undefined && object.className.indexOf(classname) < 0) {
            object.className += ' ' + classname;
        }
    },

    removeClass: function (object, classname) {

        if (object !== undefined && object.className.indexOf(classname) >= 0) {
            object.className = object.className.replace(classname, '');
        }
    },

	capitalize: function (object) {
		
		return object.charAt(0).toUpperCase() + object.slice(1);
	},

    configReset: function (custom) {
        var self = this;

        // Reset config
        if (custom) {
            this.config = custom;
            (function (obj) {
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

    configInit: function () {

        // moveBy could not be set less than 0
        this.config.moveBy = this.config.moveBy < 0 ? 1 : this.config.moveBy;

        // amount always starts from 2
        this.config.amount = this.config.amount <= 1 ? 2 : this.config.amount;

        // direction of slider
        this.direction = this.config.isVertical ? ['top', 'height', 'width'] : ['left', 'width', 'height'];
    },

    sizeInit: function (amount) {	

        // Calculate size of each elements
        if (this.config.mode !== this.mode[0]) {
			var self = this;
            var gut = this.config.isPercentGutter ? this.size * this.config.gutter : this.config.gutter;
			var temp;
            this.size = this.config.mode == this.mode[2] ? (this.vinmain['client' + this.capitalize(this.direction[1])] / amount) : this.vinmain['client' + this.capitalize(this.direction[1])];

            for (var i = 0; i < this.itemNum; i++) {
                this.list[i].style[this.direction[1]] = this.size - gut + 'px';

				// Set children items' height to auto;
				if (!this.config.isWrapperSize) {
					this.list[i].style[this.direction[2]] = 'auto';
				}
            }

			// Set vinmain height based on its children elements' height but not CSS height
			setTimeout(function () {
				if (!self.config.isWrapperSize) {
					self.vinmain.style.height = self.list[0]['client' + self.capitalize(self.direction[2])] + 'px';
				}
			}, self.config.speed);
        }
	},

    modeInit: function () {

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

	animation: function () {
		var self = this;
		var speed = ' ' + this.config.speed / 1000 + 's';	
		var unit = !this.config.isVertical ? ['width', 'left'] : ['height', 'top'];

		function create(object) {

			// Apply transition to li based on mode
			if (self.config.mode == self.mode[0]) {

				// Fade unit
				object.style.WebkitTransition = 'opacity' + speed;
				object.style.MozTransition = 'opacity' + speed;
				object.style.OTransition = 'opacity' + speed;
				object.style.Transition = 'opacity' + speed;
			} else {

				// Slide or carousel unit
				object.style.WebkitTransition = unit[0] + speed + ',' + unit[1] + speed;
				object.style.MozTransition = unit[0] + speed + ',' + unit[1] + speed;
				object.style.OTransition = unit[0] + speed + ',' + unit[1] + speed;
				object.style.Transition = unit[0] + speed + ',' + unit[1] + speed;
			}
		}

		// Create transition for each list items
		for (var i=0; i<this.list.length; i++) {
			create(this.list[i]);
		}	
	},

    responsive: function () {

        // Resize slider size when resizing screen
        var timeout = false;
        var self = this;
        window.addEventListener('resize', function () {
            clearTimeout(timeout);
            timeout = setTimeout(reset, 300);
        });

        function reset() {
            self.sizeInit(self.config.amount);
            self.lifecircle();
        }
    },

    buildWrapper: function (object, string) {

        // Remove element if it is already built
        var prevCon = this.vinmain.parentElement.querySelector('.vincontroller');
        if (prevCon) prevCon.parentElement.removeChild(prevCon);
        var prevPager = this.vinmain.parentElement.querySelector('.vinpager');
        if (prevPager) prevPager.parentElement.removeChild(prevPager);

		// Build wrapper for contoller and pager
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = string;
        object.appendChild(wrapper);
        wrapper.appendChild(ul);

        return ul;
    },

    buildController: function (object) {
        var ul = this.buildWrapper(object, 'vincontroller');

        for (var i = 0; i < 2; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }
        this.prevBtn = ul.children[0];
        this.nextBtn = ul.children[1];

        // Hide controller when the amount of actual slides is less the amount of configuration
        ul.parentElement.style.display = this.itemNum <= this.config.amount || !this.config.isController ? 'none' : '';
    },

    buildpager: function (object) {
        var ul = this.buildWrapper(object, 'vinpager');

        for (var i = 0; i < this.itemNum; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }
        this.bullet = ul.children;

        // Hide controller when
        ul.parentElement.style.display = !this.config.isPager || this.itemNum <= 1 ? 'none' : '';
    },

    autoPlay: function (num) {

        // Auto play the slider
        var self = this;

        if (this.config.isAuto) {
            this.timer = setInterval(function () {
                if (self.config.isForward) {
                    self.forward();
                } else {
                    self.backward();
                }
            }, num);
        }
    },

    resetAutoPlay: function () {

        // Reset the timer when user navigates the slider
        clearTimeout(this.timer);
        this.autoPlay(this.config.duration);
    },

    userEvent: function () {
        var self = this;

        // Controller navigate
        this.nextBtn.onclick = function () {
            self.forward();
            self.resetAutoPlay();
        }

        this.prevBtn.onclick = function () {
            self.backward();
            self.resetAutoPlay();
        }

        // Pager navigate
        function closure(idx) {

            return function () {

                for (var e = 0; e < self.itemNum; e++) {
                    self.list[e].className = '';
                    self.bullet[e].className = '';
                }
                self.list[idx].className = self.config.activeClass;
                self.lifecircle();
                self.resetAutoPlay();
            }
        }

        for (var i = 0; i < this.itemNum; i++) {
            this.bullet[i].onclick = closure(i);
        }

        // Scroll
        if (this.config.isScrollable) {
            this.vinmain.onwheel = function () {
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

    ifStop: function () {
        return parseInt(this.list[this.itemNum - 1].style[this.direction[0]]) < this.vinmain['client' + this.capitalize(this.direction[1])];
    },

    startFrom: function (idx) {

        for (var i=0; i<this.itemNum; i++) {
            this.removeClass(this.list[i], this.config.activeClass);
        }

        // Run the slider
		this.addClass(this.list[idx], this.config.activeClass);
    },

    lifecircle: function () {

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
        if (this.config.mode == this.mode[1] || this.config.mode == this.mode[2]) {

            // Slide and carousel mode, calculate position
            for (var e = 0; e < this.itemNum; e++) {
                var idx = e - this.curIndex;
                this.list[e].style[this.direction[0]] = this.size * idx + 'px';
            }
        } else {

            // Fade mode, set opacity
            for (var r = 0; r < this.itemNum; r++) {
                this.list[r].style.opacity = 0;
                this.list[r].style.zIndex = 1;
            }
            this.list[this.curIndex].style.opacity = 1;
            this.list[this.curIndex].style.zIndex = 1;

        }
    },

    forward: function () {

        for (var i = 0; i < this.config.moveBy; i++) {

            if (this.config.mode !== this.mode[2]) {

                if (this.nextIndex < this.itemNum) {
                    this.removeClass(this.curLi, this.config.activeClass);
                    this.addClass(this.nextLi, this.config.activeClass);
                } else {

                    if (this.config.isInfinite) {
                        this.removeClass(this.curLi, this.config.activeClass);
                        this.addClass(this.list[0], this.config.activeClass);
                    }
                }
            } else {

                if (!this.ifStop()) {
                    this.removeClass(this.curLi, this.config.activeClass);
                    this.addClass(this.nextLi, this.config.activeClass);
                } else {

                    if (this.config.isInfinite) {
                        this.removeClass(this.curLi, this.config.activeClass);
                        this.addClass(this.list[0], this.config.activeClass);
                    }
                }
            }
            this.lifecircle();
        }
    },

    backward: function () {

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
