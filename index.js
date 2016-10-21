/**
 *   @Title:     Vinslider
 *   @Descr:     A lightweight slider/carousel module in native Javascript
 *   @Package:   Javascript
 *   @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 *   @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

"use strict"

var Vinslider = function(selector, custom) {
    if (!selector) {
        console.log("ERROR: Didn't find corresponding element");
        return;
    }
    /*  OPTIONS
     *
     */
    this.preset = {
        duration: 5000,
        pager: true,
        controller: true,
        auto: true,
        infinite: true,
        gutter: 0,
        percentGutter: false,
        startFrom: 0,
        direction: true,
        mode: 'fade',
        enableClass: 'vinactive',
        amount: 1,
        scrollable: false,
        vertical: false,
        moveBy: 1,
    };
    this.custom = custom ? custom : this.preset;
    this.options = this.custom ? this.custom : this.preset;
    /*  META
     *
     */
    this.dot;
    this.controller;
    this.prevBtn;
    this.nextBtn;
    this.ul = selector.children[0];
    this.list = this.ul.children;
    this.mode = {
        fade: 'fade',
        slide: 'slide',
        carousel: 'carousel',
    }
    this.direction = ['left', 'clientWidth', 'width'];
    this.timer;
    this.end;
    this.prevIndex;
    this.curIndex;
    this.nextIndex;
    this.prevLi;
    this.curLi;
    this.nextLi;
    this.itemNum = this.list.length;
    this.size;
    this.init(selector);
};

Vinslider.prototype = {
    init: function(selector) {
        this.settingOptions();
        /*  CREATE DOM
         *
         */
        this.functionInit();
        this.responsive();
        this.buildpager(selector);
        this.buildController(selector);
        /*  RUN VINSLIDER
         *
         */
        this.start(this.options.startFrom);
        this.lifecircle();
        this.autoPlay(this.options.duration);
        this.userEvent();
    },

    functionInit: function() {
        /*  LI WIDTH CALCULATION
         *
         */
        this.ul.className = 'vinmain';
        if (this.options.vertical) {
            this.direction = ['top', 'clientHeight', 'height'];
        }
        for (var e = 0; e < this.itemNum; e++) {
            var li = this.list[e];
            if (this.options.mode == this.mode.carousel) {
                this.options.amount = (this.options.amount <= 1) ? 2 : this.options.amount;
                this.size = (this.ul[this.direction[1]] / this.options.amount);
            } else {
                this.size = this.ul[this.direction[1]];
            }
        }

        var gut;
        if (this.options.percentGutter) {
            gut = this.size * this.options.gutter;
        } else {
            gut = this.options.gutter;
        }
        var fix = (this.options.mode == this.mode.carousel) ? gut / (this.options.amount - 1) : 0;
        for (var e = 0; e < this.itemNum; e++) {
            var li = this.list[e];
            li.style[this.direction[2]] = this.size - gut + 'px';
        }

        /*  MODE INIT
         *
         */
        if (this.options.mode == this.mode.slide) {
            for (var i = 0; i < this.itemNum; i++) {
                var li = this.list[i];
                li.style.opacity = 1;
            }
        }
        if (this.options.mode == this.mode.carousel) {
            for (var i = 0; i < this.itemNum; i++) {
                var li = this.list[i];
                li.style.opacity = 1;
            }
            this.options.pager = false;
        }

        if (this.options.moveBy < 0) {
            this.options.moveBy = 1;
        }
    },

    responsive: function() {
        var timeout = false;
        /*  FOR RESPONSIVE
         *
         */
        var self = this;
        window.addEventListener('resize', function() {
            clearTimeout(timeout);
            timeout = setTimeout(reset, 300);
        });

        function reset() {
            self.functionInit();
            self.lifecircle();
        }
    },

    settingOptions: function() {
        /*  SET OPTIONS TO DEFAULT IF THERE IS NOT A CUSTOM ONE 
         *
         */
        var self = this;
        (function(obj) {
            var ind = 0;
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    self.options[key] = self.custom[key] !== undefined ? self.custom[key] : self.preset[key];
                }
            }
        })(this.preset);
    },

    buildController: function(selector) {
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = 'vincontroller';
        selector.appendChild(wrapper);
        wrapper.appendChild(ul);

        for (var i = 0; i < 2; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.controller = ul;
        this.prevBtn = this.controller.children[0];
        this.nextBtn = this.controller.children[1];

        if (this.options.controller == false) ul.style.display = 'none';
        if (this.itemNum <= this.options.amount) ul.style.display = 'none';
    },

    buildpager: function(selector) {
        var wrapper = document.createElement('div');
        var ul = document.createElement('ul');
        wrapper.className = 'vinpager';
        selector.appendChild(wrapper);
        wrapper.appendChild(ul);

        for (var i = 0; i < this.itemNum; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.dot = ul.children;
        if (this.options.pager == false) ul.style.display = 'none';
    },

    lifecircle: function() {
        /*  BASIC LIFECIRCLE OF A SLIDE
         *
         */
        for (var i = 0; i < this.itemNum; i++) {
            var li = this.list[i];
            var dot = this.dot[i];
            var status = li.className;

            li.className = '';
            dot.className = '';

            /*  ADD ACITVE CLASS
             *
             */
            if (status == this.options.enableClass) {
                li.className = this.options.enableClass;
                dot.className = this.options.enableClass;
                this.curIndex = i;
                this.curLi = this.list[this.curIndex];
            }
        }

        this.prevIndex = this.curIndex - 1;
        this.nextIndex = this.curIndex + 1;

        this.prevLi = this.list[this.curIndex - 1];
        this.nextLi = this.list[this.curIndex + 1];

        /*  OTHER MODE
         *
         */
        if (this.options.mode == this.mode.slide || this.options.mode == this.mode.carousel) {
            for (var e = 0; e < this.itemNum; e++) {
                var ind = e - this.curIndex;
                this.list[e].style[this.direction[0]] = this.size * ind + 'px';
            }
        }
    },

    start: function(ind) {
        /*  INITIALIZE THE FUNCTION
         *
         */
        if (ind < 0 || ind > this.itemNum) {
            this.list[0].className = this.options.enableClass;
        } else {
            this.list[ind].className = this.options.enableClass;
        }
    },

    autoPlay: function(num) {
        var self = this;
        if (this.options.auto) {
            this.timer = setInterval(function() {
                if (self.options.direction) {
                    self.forward();
                } else {
                    self.backward();
                }
            }, num);
        }
    },

    resetAutoPlay: function() {
        clearTimeout(this.timer);
        this.autoPlay(this.options.duration);
    },

    userEvent: function() {
        /*  USER EVENT
         *
         */
        var self = this;
        /*  CONTROLLER NAVIGATION
         *
         */
        this.nextBtn.onclick = function() {
            self.forward();
            self.resetAutoPlay();
        }

        this.prevBtn.onclick = function() {
                self.backward();
                self.resetAutoPlay();
            }
            /*  SCROLL
             *
             */
        if (this.options.scrollable) {
            this.ul.onwheel = function(event) {
                event.preventDefault();
                if (event.deltaY > 0 || event.deltaX > 0) {
                    self.forward();
                    self.resetAutoPlay();
                } else {
                    self.backward();
                    self.resetAutoPlay();
                }
            };
        }
        /*  PAGER NAVIGATION
         *
         */
        for (var i = 0; i < this.itemNum; i++) {
            this.dot[i].onclick = function() {
                var ind = Array.prototype.indexOf.call(self.dot, this);

                for (var e = 0; e < self.itemNum; e++) {
                    self.list[e].className = '';
                    self.dot[e].className = '';
                }

                self.list[ind].className = self.options.enableClass;
                self.lifecircle();
                self.resetAutoPlay();
            }
        }
    },

    ifStop: function() {
        this.end = parseInt(this.list[this.itemNum - 1].style[this.direction[0]]) < this.ul[this.direction[1]];
    },

    /*  FUNCTIONS TO MANIPULATE THE SLIDER
     *
     */
    forward: function() {
        for (var i = 0; i < this.options.moveBy; i++) {
            this.ifStop();
            if (this.options.mode !== this.mode.carousel) {
                if (this.nextIndex < this.itemNum) {
                    this.curLi.className = '';
                    this.nextLi.className = this.options.enableClass;
                } else {
                    if (this.options.infinite) {
                        this.curLi.className = '';
                        this.list[0].className = this.options.enableClass;
                    }
                }
            } else {
                if (!this.end) {
                    this.curLi.className = '';
                    this.nextLi.className = this.options.enableClass;
                } else {
                    if (this.options.infinite) {
                        this.curLi.className = '';
                        this.list[0].className = this.options.enableClass;
                    }
                }
            }
            this.lifecircle();
        }
    },

    backward: function() {
        for (var i = 0; i < this.options.moveBy; i++) {
            this.ifStop();
            if (this.prevIndex >= 0) {
                this.curLi.className = '';
                this.prevLi.className = this.options.enableClass;
            } else {
                if (this.options.infinite) {
                    if (this.options.mode == this.mode.carousel) {
                        this.curLi.className = '';
                        this.list[this.itemNum - this.options.amount].className = this.options.enableClass;
                    } else {
                        this.curLi.className = '';
                        this.list[this.itemNum - 1].className = this.options.enableClass;
                    }
                }
            }
            this.lifecircle();
        }
    },
};