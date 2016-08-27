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
	    infinite: false,
	};

	var options2 = {
	    speed: 5000,
	    mode: 'slide',
	};

	var options3 = {
	    speed: 2000,
	    mode: 'multiple',
	    amount: 4,
	    gutter: 5
	};

	new Vinslider(slider1, options1);
	new Vinslider(slider2, options2);
	new Vinslider(slider3, options3);
})();

