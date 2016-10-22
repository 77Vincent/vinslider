# documentation

#### Light weight, responsive, native Javascript slider / carousel module. Highly customizable.

## Code Example

### Javascript:

    var object = document.querySelector('DOM element');
    
    var config = {
      mode: slide,
      duration: 3500,
      ......
    };
    
    var vinslider = new Vinslider(object[, config]);

* The object to be passed needs to be a native DOM element.
* Config is optional, Vinslider will be initialized with default config if no custom config are given.
* Can only give certain configs as you need, no to pass all configs listed in the documentations at a time.
* You can create several instance of Vinslider within one page with different options by this way.

### HTML: 

    <div id="selector" class="vinslider">
      <ul>
        <li>......</li>
        <li>......</li>
        <li>......</li>
      </ul>
    <div>

* The outermost <div> should be the element passed into Vinslider(), could be of any tag, with any identifier as you want.
* The ul contains the list of elements that will be converted into the slider. No additional classname or id is needed.
* The classname "vinslider" is optional, for getting the basic style from vinslider.css

### CSS:

    vinslider.css

* This is optional but recommended.
* Provides a very basic style for a Vinslider instance.
* Has been simplified as best as I can in order to let you override it with custom styles as you want with ease.

## Installation

What you need are:

* vinslider.js
* vinslider.css (optional)

Embed them into your project.

Download here: https://github.com/77Vincent/vinslider
    
## Configurations

### mode : String
> fade **(Default)**

> slide

> carousel

### activeClass : String
> "vinactive" **(Default)**

Tips: Changing the active class name of the current active item. Also the vinslider.css is using this class name by default. You can customize it into another classname if you want.

### duration : Number
> How much time each slide stays. **(Default: 5000, millisecond)**

### amount: Number
> How many items will be shown at a time. **(Default: 2)**

Tips: This will only apply to carousel mode. If the value is greater than or equal to the total amount of items, the controller will be hidden.

### gutter : Number
> Add a gutter in between each items. **(Default: 0, pixels)**

### startFrom: Number
> From which item the slider starts. **(Default: 0)**

Tips: The first item's index is 0 and so on.

### moveBy : Number
> How many items will pass by with each slide. **(Default: 1)**

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
> true: Mouse wheel scrolling could controller the slider.

> false: Disabled **(Default)**

### isVertical : Boolean
> true: The slider will be shown in vertical mode. 

> false: Horizontal mode **(Default)**

### isPercentGutter : Boolean
> true: The unit of gutter will be percentage based on the width of each slide. 

> false: The unit of gutter is pixel. **(Default)**

Tips: Only works when the gutter is also declared, if not, no effect or error will be met.

### isForward : Boolean
> true: Goes from left to right, or top to bottom. **(Default)**

> false: Reversed direction.

Tips: This only affects the auto playing. User events will still respect the direction according to their navigation.

## Browser Compatibility

IE 9 and above

## Dependency

None

## Features

* Vinslider will be immediately stopped and throw an error message if the element passed in is not found or improper.
* Currently touch event on mobile devices is not supported yet.
* Pagers are able to navigate.
* Controller will be hidden in carousel mode if the actual amount of items is less than the amount of items to be displayed at a time.

## Demo

Go to http://www.77webtech.com/vinslider to see the demo.

## Contributor

Vincent Wen

## License

Released under the MIT license: http://opensource.org/licenses/MIT

* 所传递的对象需要是原生DOM对象。
* 配置参数不是必须要提供的，在没有自定配置参数的情况下，Vinslider会使用默认配置参数。
* 可以根据需要传递单独的配置信息，不需要一次传递所有的选项。
* 通过这样的实例化方式，你可以在一个页面里创建多个，使用不同配置的Vinslider对象。

