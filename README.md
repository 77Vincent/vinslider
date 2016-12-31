# Vinslider 

Light weight, responsive, native Javascript slider module. Highly customizable.

## Demo

http://www.77webtech.com/vinslider

## Installation

Install through npm

    npm install --save vinslider
    
Get HTML ready

    <div class="vinslider">
        <ul>
            <li>content</li>
            <li>content</li>
            ...
        </ul>
    <div>
    
Instantiate in Javascript
    
    import Vinslider from 'vinslider'
    
    let slider = document.querySelector('.vinslider')
    
    new Vinslider(slider[, config])


## Configurations

### mode : String
> fade 

> slide **(Default)**

Tips: Under carousel mode, pager will be hidden by default.

### speed : Number
> The transition speed for switching slides. **(Default: 750, millisecond)**

### duration : Number
> How much time each slide stays. **(Default: 5000, millisecond)**

### amount: Number (carousel mode only)
> How many items will be shown at a time. **(Default: 1)**

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

### isAutoplay : Boolean
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

### isUseItemSize : Boolean
> true: Force vinslider to have the height( width for the vertical mode ) which comes from its biggest slide item.

> false: The size of Vinslider will be defined by CSS. **(Default)**

### isFillWrapper : Boolean
> true: Each slide in Vinslider will have a inline style of height of 100% to fit its wrapper.

> false: Each slide will not have any inline style. **(Default)**

## Callback Functions

Useage: After a Vinslider instance is instantiated, these functions could be called to manipulated the instance anytime when there is a need for callbacks.

Example: vinslider.goto(3);
> Here means navigating this vinslider instance to goto the 4th slide when this piece of code is called.

### goto(index); 
> Navigate the slider to a specific slide with the given index.

### resize();
> Vinslider already has the ability to resize its self under a window.onresize event, but when the size of its wrapper changes but without a window resize event occurring, use this function to resize the size of vinslider to fit its new wrapper. 

### ifAutoplay();
> Make vinslider autoplay or stop it from auto-playing.

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

### rebuild();
> Totally rebuild a Vinslider with new configurations from an existing instance. Old specified configurations will not be removed, adding new configurations wil override the old ones or the default ones otherwise the old configs will still work.

## Features

* Vinslider will be immediately stopped and throw an error message if the element is not found.
* Pagers are able to navigate.
* In fade and slide mode, controller and pagers will be hidden if there is only one slide.

## Browser Compatibility

IE 8: Not supported

IE 9: No CSS transition effect

IE 10+: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

