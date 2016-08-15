(function(win, doc) {
    var Slider = function(target) {

        /*  strings used for targeting DOM
        *
        */
        this.enableClass = 'active';
        this.disableClass = 'inactive';
        this.dotClass = 'bullet';
        this.controlClass = 'controller';

        /*  store DOM as properties
        *
        */
        this.list = target.children[0].children;
        this.dotWrap = target.getElementsByClassName(this.dotClass)[0];
        this.dot = this.dotWrap.children;
        this.controller = target.getElementsByClassName(this.controlClass)[0];
        this.prevBtn = this.controller.children[0];
        this.nextBtn = this.controller.children[1];

        /*  preserved properties for slider loop
        *
        */
        this.prevIndex;
        this.curIndex;
        this.nextIndex;

        this.prevLi;
        this.curLi;
        this.nextLi;

        this.prevDot;
        this.curDot;
        this.nextDot;

        this.itemNum = this.list.length;

        this.init();
    };

    Slider.prototype = {
        /*  life circle
        *
        */
        init: function() {
            this.buildBullet();
            this.initSlide();
            this.checkThrough();
            this.auto(5000);
            this.clienEvent();
        },

        /*  create bullet based on how much list items there are
        *
        */
        buildBullet: function() {
            for (i=0; i<this.itemNum; i++) {
                var item = doc.createElement('li');
                this.dotWrap.appendChild(item);
            }
        },

        checkThrough: function() {
            for (i=0; i<this.itemNum; i++) {
                var li = this.list[i];
                var dot = this.dot[i];
                var status = li.className;

                li.className = '';
                dot.className = '';

                // if (this.list[i-1] >= 0) {
                //     this.prevLi.className = this.disableClass;
                // }   else {
                //     this.list[this.itemNum-1].className = this.disableClass;
                // }

                li.style.display = 'none';

                /*  display the active one throught checking if has class active
                *
                */
                if (status == this.enableClass) {
                    li.style.display = 'block';
                    li.className = this.enableClass;
                    dot.className = this.enableClass;

                    this.curIndex = i;
                    this.curLi = this.list[this.curIndex];
                    this.curDot = this.dot[this.curIndex];
                }
            }

            this.prevIndex = this.curIndex - 1;
            this.nextIndex = this.curIndex + 1;

            this.prevLi = this.list[this.curIndex-1];
            this.nextLi = this.list[this.curIndex+1];

            this.prevDot = this.dot[this.curIndex-1];
            this.nextDot = this.dot[this.curIndex+1];
        },

        initSlide: function(ind) {
            if (ind < 0 || ind > this.itemNum ) {
                return
            }   else if ( (0 < ind <= this.itemNum) && ind !== undefined ) {
                this.list[ind].className = this.enableClass;
            }   else {
                this.list[0].className = this.enableClass;
            }
        },

        auto: function(num) {
            var self = this;
            setInterval(function() {
                self.forward();
            }, num);
        },

        clienEvent: function() {
            var self = this;
            this.nextBtn.onclick = function() {
                self.forward();
            }

            this.prevBtn.onclick = function() {
                self.backward();
            }
        },

        forward: function() {

            if (this.nextIndex < this.itemNum) {
                this.curLi.className = '';
                this.nextLi.className = this.enableClass;
            }   else {
                this.curLi.className = '';
                this.list[0].className = this.enableClass;
            }

            this.checkThrough();
        },

        backward: function() {
            if (this.prevIndex >= 0) {
                this.curLi.className = '';
                this.prevLi.className = this.enableClass;
            }   else {
                this.curLi.className = '';
                this.list[this.itemNum-1].className = this.enableClass;
            }

            this.checkThrough();
        }

    };

    var slider = doc.getElementsByClassName('slider');

    new Slider(slider[0]);

})(window, document);
