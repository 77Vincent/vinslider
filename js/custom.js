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
	var slider1 = document.getElementsByClassName('slider-1');
	var slider2 = document.getElementsByClassName('slider-2');
	var slider3 = document.getElementsByClassName('slider-3');

	var options1 = {
	    speed: 4000,
	    mode: 'fade',
	};

	var options2 = {
		auto: false,
	    mode: 'slide',
	    scrollable: true,
	};

	var options3 = {
	    speed: 2000,
	    mode: 'multiple',
	    infinite: false,
	    amount: 4,
	    gutter: 0.04,
	    percentGutter: true,
	    vertical: true,
	    moveBy: 2,
	};

	new Vinslider(slider1[0], options1);
	new Vinslider(slider2[0], options2);
	new Vinslider(slider3[0], options3);
})();

