(function() {
	var img = document.getElementsByClassName('img-src');
	for (var i = 0; i < img.length; i++) {
		var src = img[i].getAttribute('src');
		var li = img[i].parentElement;

		li.style.backgroundImage = 'url(' + src + ')';
	}
})();


(function() {
	/*	VINSLIDER
	*
	*/
	var slider1 = document.querySelector('.slider-1');
	var slider2 = document.querySelector('.slider-2');
	var slider3 = document.querySelector('.slider-3');

	var options1 = {
	    duration: 1000,
	    mode: 'fade',
	    scrollable: true,
	};

	var options2 = {
		auto: false,
	    mode: 'slide',
	    scrollable: true,
	};

	var options3 = {
	    duration: 2000,
	    mode: 'carousel',
	    amount: 3,
	    gutter: 0.05,
	    percentGutter: true,
	    scrollable: true,
	    vertical: true,
	    moveBy: 14
	};

	var vinsliderA = new Vinslider(slider1, options1);
	var vinsliderB = new Vinslider(slider2, options2);
	var vinsliderC = new Vinslider(slider3, options3);

	window.onresize = function() {
		var width = window.innerWidth;
		if ( width <= 1024 ) {
			vinsliderC.options.amount = 2;
		}	else {
			vinsliderC.options.amount = 4;
		}
	}

})();

