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

#### mode : String

    : 'fade' 

    : 'slide' (Default)

Under carousel mode, pager will be hidden by default.

#### speed : Number

    : 750 (Default, millisecond)

The transition duration of sliding.

#### duration : Number

    : 5000 (Default, millisecond)
    
How much time each slide stays.

#### amount: Number
 
    : 1 (Default)

If the value is greater than or equal to the total amount of items, the controller will be hidden.

####  gutter : Number

    : 0 (Default, pixel)
    
Add a gutter in between each items.

#### startFrom: Number

    : 0 (Default)

From which item the slider starts, the index of the first slide is 0 and so on.

#### moveBy : Number

    : 1 (Default)
    
How many items will pass by each slide.

#### isAutoplay : Boolean

    : true (Default)

    : false
    
If auto-play the slider

#### isInfinite : Boolean

    : true (Default)

    : false

If the slider will go back to the first item after reaching the last one.

#### isScrollable : Boolean

    : true

    : false (Default)

Mouse wheel scrolling could control the slider.

#### isVertical : Boolean

    : true

    : false (Default)
    
If slider is displayed vertically

#### isPercentGutter : Boolean

    : true

    : false (Default)

The unit of gutter will be percentage based on the width of each slide. Only works when the gutter is also declared, if not, no effect or error will be met.

#### isForward : Boolean

    : true (Default)

    : false

Slider goes from left to right, or top to bottom. This only affects the auto playing. User events will still respect the direction according to their navigation.

#### isUseItemSize : Boolean

    : true

    : false (Default)

Force vinslider to have the height( width for the vertical mode ) which comes from its biggest slide item.

#### isFillWrapper : Boolean

    : true

    : false (Default)
    
Each slide in Vinslider will have a inline style of height of 100% to fit its wrapper.

## Callback Functions

Useage: After a Vinslider instance is instantiated, these functions could be called to manipulated the instance anytime when there is a need for callbacks.

Example: vinslider.goto(3);
> Here means navigating this vinslider instance to goto the 4th slide when this piece of code is called.

#### goto(index); 

    instance.goto(0)

Navigate a vinslider instance to goto its first slide.

#### resize();

    instance.resize()
    
Vinslider already has the ability to resize its self under a window.onresize event, but when the size of its wrapper changes without a window resize event occurring, use this function to resize the size of vinslider to fit its new wrapper. 

#### ifAutoplay();

    instance.ifAutoplay(false)
    
Stop or resume a vinslider instance.

#### reAmount(value);

    instance.reAmount(3)
    
Reset the amount of items to be displayed based upon the new given value at a time when under carousel mode, mostly for responsive. 

#### rebuild();

    instance.rebuild({
    	// new config goes here
    })
    
Totally rebuild a Vinslider with new configurations from an existing instance. Old specified configurations will not be removed, adding new configurations wil override the old ones or the default ones otherwise the old configs will still work.

## Browser Compatibility

IE 8: Not supported

IE 9: No CSS transition effect

IE 10+: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

