var slider = document.querySelectorAll('.vinslider');

var options1 = {
	duration: 2500
};

var options2 = {
	duration: 2500,
	mode: 'slide',
	isVertical: true,
	isScrollable: true
};

var options3 = {
	duration: 2500,
	mode: 'slide',
};

var options4 = {
	duration: 2500,
	mode: 'slide',
	isForward: false
};

var options5 = {
	duration: 2500,
	mode: 'carousel',
	amount: 4,
	moveBy: 2
};

var options6 = {
	duration: 2500,
	mode: 'carousel',
	amount: 4,
	gutter: 10
};


new Vinslider(slider[0], options1);
new Vinslider(slider[1], options2);
new Vinslider(slider[2], options3);
new Vinslider(slider[3], options4);
new Vinslider(slider[4], options5);
new Vinslider(slider[5], options6);


