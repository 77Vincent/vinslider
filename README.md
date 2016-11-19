# DOCUMENTATION 

#### Light weight, responsive, native Javascript slider / carousel module. Highly customizable.

## Demo

http://www.77webtech.com/vinslider

## Code Example

### HTML: 

    <div class="vinslider">
      <ul>
        <li>content</li>
        <li>content</li>
        <li>content</li>
        ...
      </ul>
    <div>

* The outermost div should be the element passed into Vinslider(), could be of any tag, with any identifier as you want.
* The ul contains the actual list of elements that will be converted into the slider. No additional classname or id is needed.
* The classname "vinslider" is for getting the basic style from vinslider.css

### Javascript:

    var object = document.querySelector('DOM element');
    
    var config = {
      mode: slide,
      duration: 3500,
      ...
    };
    
    new Vinslider(object[, config]);

* The object to be passed needs to be a native DOM element.
* Config is optional, Vinslider will be initialized with default config if no custom config are given.
* You can create several instances of Vinslider within one page with different config by this way.

### CSS:

    vinslider.css

* Provides a very basic style for a Vinslider instance.
* Has been simplified as best as I can in order to let you override it with custom styles with ease.

## Installation

Embed these two files into your project:

* vinslider.js
* vinslider.css

Get the source code here:https://github.com/77Vincent/vinslider, they are in dist folder.

## Configurations

### mode : String
> fade **(Default)**

> slide

> carousel

Tips: Under carousel mode, pager will be hidden by default.

### speed : Number
> The transition speed for switching slides. **(Default: 750, millisecond)**

### duration : Number
> How much time each slide stays. **(Default: 5000, millisecond)**

### amount: Number (carousel mode only)
> How many items will be shown at a time. **(Default: 2)**

Tips: If the value is greater than or equal to the total amount of items, the controller will be hidden.

### gutter : Number
> Add a gutter in between each items. **(Default: 0, pixels)**

### startFrom: Number
> From which item the slider starts. **(Default: 0)**

Tips: The first item's index is 0 and so on.

### moveBy : Number
> How many items will pass by each slide. **(Default: 1)**

### isPager : Boolean
> true: Show the pagers. **(Default)**

> false: Hide the pagers.

### isController : Boolean
> true: Show the controller. **(Default)**

> false: Hide the controller.

### isAuto : Boolean
> true: Auto play the slider. **(Default)**

> false: Do not auto play.

### isInfinite : Boolean
> true: The slider will go back to the first item after reaching the last one. **(Default)**

> false: Will be stoped at the end the slide.

### isScrollable : Boolean
> true: Mouse wheel scrolling could control the slider.

> false: Disabled **(Default)**

### isVertical : Boolean
> true: The slider will turn into vertical mode. 

> false: Horizontal mode **(Default)**

### isPercentGutter : Boolean
> true: The unit of gutter will be percentage based on the width of each slide. 

> false: The unit of gutter is pixel. **(Default)**

Tips: Only works when the gutter is also declared, if not, no effect or error will be met.

### isForward : Boolean
> true: Slider goes from left to right, or top to bottom. **(Default)**

> false: Reversed direction.

Tips: This only affects the auto playing. User events will still respect the direction according to their navigation.

## Fallback Functions

Useage: After a Vinslider instance is instantiated, these functions could be called to manipulated the instance anytime when there is a need for callbacks.

Example: vinslider.goto(3);
> Here means navigating this vinslider instance to goto the 4th slide when this piece of code is called.

### goto(index); 
> Navigate the slider to a specific slide with the given index.

### resize();
> Vinslider already has the ability to resize its self under a window.onresize event, but when the size of its wrapper changes but without a window resize event occurring, use this function to resize the size of vinslider to fit its new wrapper. 

### reAmount(value);
> Reset the amount of items to be displayed based upon the new given value at a time when under carousel mode, mostly for responsive. 
	
	var vinslider = new Vinslider(element, {
		mode: 'carousel',
		amount: 4
	});

	window.addEventListener('resize', function() {
		if (window.innerWidth < 1024) {
			vinslider.reAmount(3);
		}
	});

## Features

* Vinslider will be immediately stopped and throw an error message if the element is not found.
* Pagers are able to navigate.
* In fade and slide mode, controller and pagers will be hidden if there is only one slide.

## Browser Compatibility

IE 8: Mouse scrolling not supported

IE 9: No CSS transition effect

IE 10 and above: Fully supported

## Dependency

None

## Author

Vincent Wen

Website: www.77webtech.com

Email: wentianqi77@outlook.com

## License

Released under the MIT license: http://opensource.org/licenses/MIT

