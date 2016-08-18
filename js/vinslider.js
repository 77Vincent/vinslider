var Vinslider = function(target, custom) {
    /*  STOP IF NO TARGET
    *
    */
    if (target == undefined) return;
    /*  DEFAULT SETTINGS AND CUSTOM OPTIONS
    *
    */
    this.preset = {
        speed: 5000,
        pager: true,
        controller: true,
        startfrom: 0,
        direction: true,
        mode: 'fade',
        enableClass: 'active',
    };
    this.custom = custom;
    this.options = this.custom ? this.custom : this.preset;
   /*  ERROR
    *
    */
    this.error = {
        startfrom: 'startfrom value is invalid, bigger than the total amount of slides, or less than 0'
    }
    this.ifwrong = false;
    /*  DOM
    *
    */
    this.dotUl;
    this.dot;
    this.controller;
    this.prevBtn;
    this.nextBtn;
    this.ul = target.children[0];
    this.list = this.ul.children;
    this.timer;
    /*  SLIDER
    *
    */
    this.prevIndex;
    this.curIndex;
    this.nextIndex;
    this.prevLi;
    this.curLi;
    this.nextLi;
    this.itemNum = this.list.length;
    this.width;
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
        this.buildController(target);
        this.buildBullet(target);
        /*  RUN VINSLIDER
        *
        */
        this.initFunction(this.options.startfrom);
        if (this.ifwrong) return;
        this.lifecircle();
        this.autoPlay(this.options.speed);
        this.asyncEvent();
    },

    modeInit: function() {
        for (i=0; i<this.itemNum; i++) {
            var li = this.list[i];
            this.width = li.clientWidth;

            if ( this.options.mode == 'slide') {
                li.style.opacity = 1;
            }
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
        ul.className = 'controller';
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
        ul.className = 'bullet';
        target.appendChild(ul);

        for (i=0; i<this.itemNum; i++) {
            var li = document.createElement('li');
            ul.appendChild(li);
        }

        this.dotUl = ul;
        this.dot = ul.children;

        if (this.options.pager == false) ul.style.display = 'none';
    },

    lifecircle: function() {
        /*  BASIC LIFECIRCLE OF A SLIDE
        *
        */
        var self = this;
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
        if ( this.options.mode == 'slide') {
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
            console.log(this.error.startfrom);
            this.ifwrong = true;
        }   else {
            this.list[ind].className = this.options.enableClass;
        }
    },

    autoPlay: function(num) {
        var self = this;
        this.timer = setInterval(function() {
            if (self.options.direction) {
                self.forward();
            }   else  {
                self.backward();
            }
        }, num);
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

    /*  FUNCTIONS TO MANIPULATE THE SLIDER
    *
    */
    forward: function() {

        if (this.nextIndex < this.itemNum) {
            this.curLi.className = '';
            this.nextLi.className = this.options.enableClass;
        }   else {
            this.curLi.className = '';
            this.list[0].className = this.options.enableClass;
        }

        this.lifecircle();
    },

    backward: function() {
        if (this.prevIndex >= 0) {
            this.curLi.className = '';
            this.prevLi.className = this.options.enableClass;
        }   else {
            this.curLi.className = '';
            this.list[this.itemNum-1].className = this.options.enableClass;
        }

        this.lifecircle();
    },
};
