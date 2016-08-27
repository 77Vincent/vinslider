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
	    speed: 4000,
	    mode: 'fade',
	    scrollable: true,
	};

	var options2 = {
		auto: false,
	    mode: 'slide',
	    scrollable: true,
	};

	var options3 = {
	    speed: 2000,
	    mode: 'multiple',
	    auto: false,
	    amount: 4,
	    gutter: 0.04,
	    percentGutter: true,
	    vertical: true,
	    scrollable: true,
	    moveBy: 1,
	};

	new Vinslider(slider1, options1);
	new Vinslider(slider2, options2);
	new Vinslider(slider3, options3);
})();

