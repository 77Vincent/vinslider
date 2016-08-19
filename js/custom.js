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
	    speed: 5000,
	    mode: 'slide',
	    auto: true
	};

	var options3 = {
	    speed: 2000,
	    mode: 'slide',
	    auto: true,
	    infinite: true,
	    gutter: 0.02,
	    percentGutter: true,
	    multipleItem: true,
	    pager: false
	};

	new Vinslider(slider1[0], options1);
	new Vinslider(slider2[0], options2);
	new Vinslider(slider3[0], options3);
})();

