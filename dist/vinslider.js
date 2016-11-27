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
    init: function (object, custom) {

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
    rebuild: function (custom) {
    
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

    ifAutoplay: function (value) {
        this.config.isAutoplay = value;
        this.autoPlay(this.config.duration);
    },

    goto: function (value) {

        // Go to a certain slide
        this.startFrom(value);
        this.lifecircle();
    },

    resize: function () {
        var self = this;

        // Resize each slide when the size of the wrapper changes
        setTimeout(function () {
            self.sizeInit(self.config.amount);
            self.lifecircle();
        }, 0)
    },

    reAmount: function (value) {

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
    addClass: function (object, classname) {

        if (object !== undefined && object.className.indexOf(classname) < 0) {
            object.className += ' ' + classname;
        }
    },

    removeClass: function (object, classname) {

        if (object !== undefined && object.className.indexOf(classname) >= 0) {
            object.className = object.className.replace(' ' + classname, '');
        }
    },

	capitalize: function (object) {
		
		return object.charAt(0).toUpperCase() + object.slice(1);
	},

    // Configurations
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

        // Replace preset with new customized configurations 
        this.preset = this.config;
    },

    configInit: function () {

        // moveBy could not be set less than 0
        this.config.moveBy = this.config.moveBy < 0 ? 1 : this.config.moveBy;

        // direction of slider
        // In array:
        // 1- main direction position
        // 2- main direction size
        // 3- orthogonal direction size
        this.direction = this.config.isVertical ? ['top', 'height', 'width'] : ['left', 'width', 'height'];
    },

    sizeInit: function (amount) {	
        var self = this;

        // Get gutter
        var gut = this.config.isPercentGutter ? this.size * this.config.gutter : this.config.gutter;

        // Get main direction size of vinmain
        this.size = this.vinmain['client' + this.capitalize(this.direction[1])] / amount;

        // Get orthogonal direction size 
        var temp = 0;
        var max = 0;

        function closure(idx) {

            // Get the largest item's orthogonal size
            setTimeout(function () {
                if (self.list[idx]['client' + self.capitalize(self.direction[2])] >= temp) {
                    max = self.list[idx]['client' + self.capitalize(self.direction[2])]; 
                }
                temp = self.list[idx]['client' + self.capitalize(self.direction[2])];
            }, self.config.speed);
        }

        // Set size for each item 
        for (var i = 0; i < this.itemNum; i++) {

            // Subtract gut from each slide size
            this.list[i].style[this.direction[1]] = this.size - gut + 'px';

            // Set children items' orthogonal size to auto;
            if (this.config.isUseItemSize) {
                this.list[i].style[this.direction[2]] = 'auto';
                closure(i);
            }
        }

        // Set vinmain height based on its children elements' height but not CSS height
        setTimeout(function () {

            // Set vinmain size based on its items size
            if (self.config.isUseItemSize) {
                self.vinmain.style[self.direction[2]] = max + 'px';
            }

            // Set items'size to 100% if is set to fill wrapper
            if (self.config.isFillWrapper) {
                for (var i = 0; i < self.itemNum; i++) {
                    self.list[i].style[self.direction[2]] = '100%';
                }
            }
        }, self.config.speed);
	},

    modeInit: function (amount) {
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

	animation: function () {
		var self = this;
		var speed = ' ' + this.config.speed / 1000 + 's';	
		var unit = !this.config.isVertical ? ['width', 'left'] : ['height', 'top'];

		function create(object) {

			// Apply transition to item based on mode
            switch (self.config.mode) {
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
            timeout = setTimeout(function () {
                self.sizeInit(self.config.amount);
                self.lifecircle();
            }, self.throttle);
        });
    },

    buildWrapper: function (object, string) {

		// Build wrapper for contoller and pager
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = string;
        object.appendChild(wrapper);
        wrapper.appendChild(ul);

        return ul;
    },

    buildController: function (object) {

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

    buildpager: function (object) {

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

    autoPlay: function (value) {

        // Auto play the slider
        var self = this;

        if (this.config.isAutoplay) {

            // Clear timer if exists
            if (this.timer) clearTimeout(this.timer);

            this.timer = setInterval(function () {
                if (self.config.isForward) {
                    self.forward();
                } else {
                    self.backward();
                }
            }, value);
        } else {
            if (this.timer) clearTimeout(this.timer);
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

                for (var i=0; i<self.itemNum; i++) {
                    self.removeClass(self.list[i], self.config.activeClass);
                    self.removeClass(self.bullet[i], self.config.activeClass);
                }
                self.addClass(self.list[idx], self.config.activeClass);
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

    startFrom: function (value) {
        // Correct value
        if (value < 0) {
            value = 0;   
        } else if (value > this.itemNum - this.config.amount) {
            value = this.itemNum - this.config.amount;
        }

        for (var i=0; i<this.itemNum; i++) {
            this.removeClass(this.list[i], this.config.activeClass);
        }

        // Run the slider
		this.addClass(this.list[value], this.config.activeClass);
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

    forward: function () {

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

    backward: function () {

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
    },
};
