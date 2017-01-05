import $ from 'jquery'
import Vinslider from '../modules/vinslider.js'

var custom = {
    init() {
        this.instance = {
            length: 0
        };
        this.buildSlider.call(custom);
        this.callbacks.call(custom);
    },

    buildSlider() {
        var slider = document.querySelectorAll('.vinslider');
        var config = [{
            duration: 2000,
        }, {
            mode: 'fade',
            duration: 2000,
        }, {
            duration: 2500,
            amount: 4,
        }, {
            duration: 2500,
            amount: 4,
            gutter: 5,
        }, {
            duration: 2000,
            amount: 4,
        }];

        for (var i = 0; i < slider.length; i++) {
            this.instance[i] = new Vinslider(slider[i], config[i]);
            this.instance.length++;
        }
    },

    callbacks() {
        var self = this;
        var button = document.querySelectorAll('button');
        var exam = this.instance['4'];

        // Go to the first one 
        button[0].onclick = function() {
            exam.goto(0);
        }

        // Go to the last one 
        button[1].onclick = function() {
            exam.goto(999);
        }

        // Increase amount
        button[2].onclick = function() {
            var cur = exam.config.amount;
            exam.reAmount(++cur);
        }

        // Decrease amount
        button[3].onclick = function() {
            var cur = exam.config.amount;
            exam.reAmount(--cur);
        }

        // Speed up transition 
        button[4].onclick = function() {
            var cur = exam.config.speed;
            exam.rebuild({
                speed: cur - 300
            });
        }

        // Slow down transition 
        button[5].onclick = function() {
            var cur = exam.config.speed;
            exam.rebuild({
                speed: cur + 300
            });
        }

        // Increase gutter 
        button[6].onclick = function() {
            var cur = exam.config.gutter;
            exam.rebuild({
                gutter: cur + 5
            });
        }

        // Decrease gutter 
        button[7].onclick = function() {
                var cur = exam.config.gutter;
                exam.rebuild({
                    gutter: cur - 5
                });
            }
            // Half size 
        button[8].onclick = function() {
            vjs.toggleClass(exam.vinmain.parentElement, 'toggle');
            setTimeout(function() {
                exam.resize();
            }, 400);
            if (this.className.indexOf('toggle') < 0) {
                this.innerHTML = 'Full width';
            } else {
                this.innerHTML = 'Half width';
            }
            vjs.toggleClass(this, 'toggle');
        }

        // Swtich autoplay 
        button[9].onclick = function() {
            if (this.className.indexOf('toggle') < 0) {
                this.innerHTML = 'resume autoplay';
                exam.ifAutoplay(false);
            } else {
                this.innerHTML = 'Stop autoplay';
                exam.ifAutoplay(true);
            }
            vjs.toggleClass(this, 'toggle');
        }

        // Backward 
        button[10].onclick = function() {
            if (this.className.indexOf('toggle') < 0) {
                this.innerHTML = 'Forward autoplay';
                exam.rebuild({
                    isForward: false
                });
            } else {
                this.innerHTML = 'Backward autoplay';
                exam.rebuild({
                    isForward: true
                });
            }
            vjs.toggleClass(this, 'toggle');
        }

        // Infinite loop 
        button[11].onclick = function() {
            if (this.className.indexOf('toggle') < 0) {
                this.innerHTML = 'infinite loop';
                exam.rebuild({
                    isInfinite: false
                });
            } else {
                this.innerHTML = 'not infinite loop';
                exam.rebuild({
                    isInfinite: true
                });
            }
            vjs.toggleClass(this, 'toggle');
        }
    },
}

custom.init.call(custom);
