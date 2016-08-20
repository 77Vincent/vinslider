var Vinslider = function(target, custom) {
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
        startfrom: 0,
        direction: true,
        mode: 'fade',
        enableClass: 'active',
        amount: 1,
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
    this.classname = {
        main: 'vinmain',
        controller: 'vincontroller',
        pager: 'vinbullet'
    }
    this.timer;
    this.end;
    this.prevIndex;
    this.curIndex;
    this.nextIndex;
    this.prevLi;
    this.curLi;
    this.nextLi;
    this.itemNum = this.list.length;
    this.width;
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
        this.buildController(target);
        this.buildBullet(target);
        /*  RUN VINSLIDER
        *
        */
        this.initFunction(this.options.startfrom);
        this.lifecircle();
        this.autoPlay(this.options.speed);
        this.asyncEvent();
    },

    modeInit: function() {
        /*  LI WIDTH CALCULATION
        *
        */
        this.ul.className = this.classname.main;
        for (e=0; e<this.itemNum; e++) {
            var li = this.list[e];
            var gut;
            var num;

            if (this.options.mode == this.mode.multiple) {
                num = (this.options.amount <= 1) ? 2 : this.options.amount;
                this.width = this.ul.clientWidth / num;
            }   else {
                this.width = this.ul.clientWidth;
            }

            if (this.options.percentGutter) {
                gut = this.width * this.options.gutter;
            }   else {
                gut = this.options.gutter;
            }

            var fix = (this.options.mode == this.mode.multiple) ? gut / (num-1) : 1;

            this.width = this.width + fix;
            li.style.width = this.width - gut + 'px';
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
        ul.className = this.classname.controller;
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
        ul.className = this.classname.pager;
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
                this.list[e].style.left = this.width * ind + 'px';
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
                    self.forward();
                }   else  {
                    self.backward();
                }
            }, num);
        }
    },

    resetAutoPlay: function() {
        clearTimeout(this.timer);
        this.autoPlay(this.options.speed);
    },

    asyncEvent: function() {
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
        this.end = parseInt(this.list[this.itemNum-1].style.left) < this.ul.clientWidth;
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