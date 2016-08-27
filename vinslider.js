const Vinslider = function(target, custom) {
    if (target == undefined) return;
    /*  DEFAULT SETTINGS AND CUSTOM OPTIONS
    *
    */
    this.preset = {
        speed: 5000,
        pager: true,
        controller: true,
        auto: true,
        infinite: true,
        gutter: 0,
        percentGutter: false,
        startFrom: 0,
        direction: true,
        mode: 'fade',
        enableClass: 'active',
        amount: 1,
        scrollable: false,
        vertical: false,
        moveBy: 1,
    };
    this.custom = custom;
    this.options = this.custom ? this.custom : this.preset;
    /*  DOM
    *
    */
    this.dot;
    this.controller;
    this.prevBtn;
    this.nextBtn;
    this.ul = target.children[0];
    this.list = this.ul.children;
    /*  HELPER
    *
    */
    this.mode = {
        fade: 'fade',
        slide: 'slide',
        multiple: 'multiple',
    }
    this.classname = ['vinmain', 'vincontroller', 'vinbullet'];
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
    this.ifwrong = false;
    /*  START RUNNING
    *
    */
    this.init(target);
};

Vinslider.prototype = {
    init: function(target) {
        this.settingOptions();
        /*  CREATE DOM ELEMENT
        *
        */
        this.modeInit();
        this.responsive();
        this.buildBullet(target);
        this.buildController(target);
        /*  RUN VINSLIDER
        *
        */
        this.initFunction(this.options.startFrom);
        this.lifecircle();
        this.autoPlay(this.options.speed);
        this.userEvent();
    },

    modeInit: function() {
        /*  LI WIDTH CALCULATION
        *
        */
        this.ul.className = this.classname[0];
        if (this.options.vertical) {
            this.direction = ['top', 'clientHeight', 'height'];
        }
        for (e=0; e<this.itemNum; e++) {
            var li = this.list[e];
            var gut;

            if (this.options.mode == this.mode.multiple) {
                this.options.amount = (this.options.amount <= 1) ? 2 : this.options.amount;
                this.size = this.ul[this.direction[1]] / this.options.amount;
            }   else {
                this.size = this.ul[this.direction[1]];
            }

            if (this.options.percentGutter) {
                gut = this.size * this.options.gutter;
            }   else {
                gut = this.options.gutter;
            }

            var fix = (this.options.mode == this.mode.multiple) ? gut / (this.options.amount-1) : 1;

            this.size = this.size + fix;
            li.style[this.direction[2]] = this.size - gut + 'px';
        } 
        /*  MODE INIT
        *
        */
        if ( this.options.mode == this.mode.slide ) {
            for (i=0; i<this.itemNum; i++) {
                var li = this.list[i];
                li.style.opacity = 1;
            }
        }

        if ( this.options.mode == this.mode.multiple ) {
            for (i=0; i<this.itemNum; i++) {
                var li = this.list[i];
                li.style.opacity = 1;
            }
            this.options.pager = false;
        }
    },

    responsive: function() {
        var timeout = false;
        /*  FOR REAL TIME RESPONSIVE
        *
        */
        var self = this;
        window.addEventListener('resize',function() {
            clearTimeout(timeout);
            timeout = setTimeout(reset, 300);
        });

        function reset() { 
            self.modeInit();
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

    buildController: function(target) {
        var ul = document.createElement('ul');
        ul.className = this.classname[1];
        target.appendChild(ul);

        for (i=0; i<2; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.controller = ul;
        this.prevBtn = this.controller.children[0];
        this.nextBtn = this.controller.children[1];

        if (this.options.controller == false) ul.style.display = 'none';
    },

    buildBullet: function(target) {
        var ul = document.createElement('ul');
        ul.className = this.classname[2];
        target.appendChild(ul);

        for (i=0; i<this.itemNum; i++) {
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
        for (i=0; i<this.itemNum; i++) {
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

        this.prevLi = this.list[this.curIndex-1];
        this.nextLi = this.list[this.curIndex+1];

        /*  OTHER MODE
        *
        */
        if ( this.options.mode == this.mode.slide || this.options.mode == this.mode.multiple ) {
            for (e=0; e<this.itemNum; e++) {
                var ind  = e - this.curIndex;
                this.list[e].style[this.direction[0]] = this.size * ind + 'px';
            }
        }
    },

    initFunction: function(ind) {
        /*  INITIALIZE THE FUNCTION
        *
        */
        if (ind < 0 || ind > this.itemNum ) {
            return;
        }   else {
            this.list[ind].className = this.options.enableClass;
        }
    },

    autoPlay: function(num) {
        var self = this;
        if ( this.options.auto ) {
            this.timer = setInterval(function() {
                if (self.options.direction) {
                    for (var i = 0; i < self.options.moveBy; i++) {
                        self.forward();
                    }
                }   else  {
                    for (var i = 0; i < self.options.moveBy; i++) {
                        self.backward();
                    }
                }
            }, num);
        }
    },

    resetAutoPlay: function() {
        clearTimeout(this.timer);
        this.autoPlay(this.options.speed);
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
            for (var i = 0; i < self.options.moveBy; i++) {
                self.forward();
            }
            self.resetAutoPlay();
        }

        this.prevBtn.onclick = function() {
            for (var i = 0; i<self.options.moveBy; i++) {
                self.backward();
            }
            self.resetAutoPlay();
        }
       /*  SCROLL
        *
        */
        if (this.options.scrollable) {
            this.ul.onwheel = function(event) {
                event.preventDefault();
                if (event.deltaY > 0 || event.deltaX > 0) {
                    for (var i = 0; i < self.options.moveBy; i++) {
                        self.forward();
                    }
                    self.resetAutoPlay();
                }   else {
                    for (var i = 0; i<self.options.moveBy; i++) {
                        self.backward();
                    }
                    self.resetAutoPlay();
                }
            };
        }
       /*  PAGER NAVIGATION
        *
        */
        for (i=0; i<this.itemNum; i++) {
            this.dot[i].onclick = function () {
                var ind = Array.prototype.indexOf.call(self.dot, this);

                for (e=0; e<self.itemNum; e++) {
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
        this.end = parseInt(this.list[this.itemNum-1].style[this.direction[0]]) < this.ul[this.direction[1]];
    },

    /*  FUNCTIONS TO MANIPULATE THE SLIDER
    *
    */
    forward: function() {
        this.ifStop();
        if ( this.options.mode !== this.mode.multiple ) {
            if ( this.nextIndex < this.itemNum ) {
                this.curLi.className = '';
                this.nextLi.className = this.options.enableClass;
            }   else {
                if (this.options.infinite) {
                    this.curLi.className = '';
                    this.list[0].className = this.options.enableClass;
                }
            }
        }   else {
            if ( !this.end ) {
                this.curLi.className = '';
                this.nextLi.className = this.options.enableClass;
            }   else {
                if (this.options.infinite) {
                    this.curLi.className = '';
                    this.list[0].className = this.options.enableClass;
                }
            }
        }
        this.lifecircle();
    },

    backward: function() {
        this.ifStop();
        if ( this.prevIndex >= 0 ) {
            this.curLi.className = '';
            this.prevLi.className = this.options.enableClass;
        }   else {
            if (this.options.infinite) {
                if (this.options.mode == this.mode.multiple) {
                    this.curLi.className = '';
                    this.list[this.itemNum-this.options.amount].className = this.options.enableClass;
                }   else {
                    this.curLi.className = '';
                    this.list[this.itemNum-1].className = this.options.enableClass;
                }
            }
        }
        this.lifecircle();
    },
};