var custom = {
    init: function () {
        this.instance = {length: 0};
        this.buildSlider.call(custom);
        this.callbacks.call(custom);
    },

    buildSlider: function () {
        var slider = document.querySelectorAll('.vinslider');
        var config = [
            {
                duration: 2000,
            },
            {
                mode: 'fade',
                duration: 2000,
            },
            {
                duration: 2500,
                amount: 4,
            },
            {
                duration: 2500,
                amount: 4,
                gutter: 5,
            },
            {
                duration: 3000,
                amount: 4,
            }
        ];
        for (var i=0; i<slider.length; i++) {
            this.instance[i] = new Vinslider(slider[i], config[i]);
            this.instance.length++; 
        }
    },

    callbacks: function () {
        var self = this;
        var button = document.querySelectorAll('button');

        // Go to the first one 
        button[0].onclick = function () {
            self.instance['4'].goto(0);
        }

        // Go to the last one 
        button[1].onclick = function () {
            self.instance['4'].goto(999);
        }

        // Increase amount
        button[2].onclick = function () {
            var amo = self.instance['4'].config.amount;
            self.instance['4'].reAmount(++amo); 
        }

        // Decrease amount
        button[3].onclick = function () {
            var amo = self.instance['4'].config.amount;
            self.instance['4'].reAmount(--amo); 
        }

        // Half size 
        button[4].onclick = function () {
            vjs.toggleClass(self.instance['4'].vinmain.parentElement, 'toggle');
            setTimeout(function () {
                self.instance['4'].resize();
            }, 400);
        }

        // Add gutter 
        button[5].onclick = function () {
            self.instance['4'].rebuild({
                gutter: 10,
                amount: 3,
                speed: 1500,
                isForward: false
            });
        }
    },
}

custom.init.call(custom);
