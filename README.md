<h1 id="documentation">documentation</h1>

#### Light weight, responsive, native Javascript slider / carousel module. Highly customizable.

<h2 id="example">Code Example</h2>

### Javascript:

    var selector = document.querySelector('DOM element');
    
    var options = {
      mode: slide,
      duration: 3500,
      ......
    };
    
    var vinslider = new Vinslider(selector, options);

* The selector needs to be a native DOM element.
* If no custom option is given, Vinslider will be initialized with the default options.
* You can create several instance of Vinslider within one page with different options by this way.

### HTML: 

    <div id="selector" class="vinslider">
      <ul>
        <li>......</li>
        <li>......</li>
        <li>......</li>
      </ul>
    <div>

* The ul contains the list of elements that will be converted into a slider. No additional classname or id is needed.
* The parent wrapper could be of any kinds of tag.
* The classname "vinslider" is optional, for getting the basic style from vinslider.css

### CSS:

    vinslider.css

* This provides the default and basic style for a Vinslider instance.
* Feel free to override it for a custom style as you want.

<h2 id="installation">Installation</h2>

What you need are:

* vinslider.js
* vinslider.css (optional)

Embed them into your project.

Download here: https://github.com/77Vincent/vinslider
    
<h2 id="configuration">Configuration Options</h2>

### mode : String
> **fade**: Each slide fades in and fades out when sliding **(Default)**.

> **slide**: Normal slides effect.

> **carousel**: Turning the slider into a carousel. 

### amount: Number

> When under carousel mode, this determines how many items will be shown within one row.

> *NOTE: If no value is specified the value will be 2 by default, or if the value is greater than the total amount of items, the controller will be hidden*.

### duration : Number
> How much time each slide stays **(Default: 5000, mini second)**.

### gutter : Number
> Add a gutter in between each items **(Default: 0, pixels)**.

### percentGutter : Boolean
> Turn the normal pixel unit gutter into a percentage one **(Default: false)**.

> *NOTE: Only works when the gutter is also declared, if not, no effect or error will be met*.

### startFrom: Number
> Determining from which item the slider or carousel starts **(Default: 0)**. 

> *NOTE: The first item will be an index of 0 and so on. If the value is greater than the total amount of items or less than 0, it will still start from 0*.

### moveBy : Number
> How many items will pass by with each slide **(Default: 1)**

### pager : Boolean
> ture: Show the bullet **(Default)**.

> false: Hide the bullet.

### controller : Boolean
> ture: Show the controller **(Default)**.

> false: Hide the controller.

### auto : Boolean
> ture: Auto play the slider or carousel **(Default)**.

> false: Do not auto play.

### infinite : Boolean
> ture: The slider or carousel will go back to the first item after reaching the last one **(Default)**.

> false: Will be stoped at the end the slide or carousel.

### scrollable : Boolean
> ture: Mouse wheel scrolling could slide the slider or carousel.

> false: No mouse wheel event applied **(Default)**.

### vertical : Boolean
> ture: The slider or carousel will be shown in vertical mode. 

> false: Horizontal mode **(Default)**. 

### direction : Boolean
> ture: Goes from left to right, or top to bottom **(Default)**.

> false: The opposite direction.

> *NOTE: This only affects the auto playing. User events will still obey their original direction*.

### enableClass : String

> "vinactive" **(Default)**

> This is for changing the active class name of the current active element. Also the vinslider.css is using this class name as the selector. You can customize it into another classname if you want.

<h2 id="dependency">Dependency</h2>

None

<h2 id="features">Features</h2>

* Vinslider will be immediately stopped if the DOM element is not found or improper and throw an error.
* Currently touch event on mobile devices is not supported yet.
* Pager(or bullet) are able to control the slider or carousel.
* Controller will be hidden in carousel mode if the actual amount of items is less than the amount of items to be displayed at a time.

<h2 id="demo">Demo</h2>

Go to http://www.77webtech.com/vinslider to see the demo.

<h2 id="contributor">Contributor</h2>

Vincent Wen

<h2 id="license">License</h2>

Released under the MIT license: http://opensource.org/licenses/MIT

