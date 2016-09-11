# Vinslider

**Vinslider is a light weight, responsive, native javascript module that could convert a list of elements into a slider or a carousel,  and could be highly customized.**

## CODE EXAMPLE
To create a new instance of Vinslider, simply pass the actual DOM element into the Vinslider() as the first parameter, then an option as the second parameter, which is optional, if no custom option is passed, Vinslider will be initialized with the default options.

In this way of creating the instance, you can have several sliders or carousels in one page with different options and behaviour.

    var selectorA = document.querySelector('DOM elementA');
    var selectorB = document.querySelector('DOM elementB');
    
    var option = {
      mode: slider,
      speed: 3500,
      ......
    };
    
    var vinsliderA = new Vinslider(selectorA, option);
    var vinsliderB = new Vinslider(selectorB);
    var ......

The HTML structure is as shown below: the parent element could be whatever tag you want, giving which an ID or a CLASS to be the idenfier so that you can get it in javascript. Inside which, a plain ul is all it needs. The class "vinslider" is for getting the default CSS of Vinslider, which could also be used as an identifier if you want and optional. The default CSS of Vinslider is pretty plain and simple, for not giving too much inconvenience when users want to customize their vinsliders.

    <div id="selector" class="vinslider">
      <ul>
        <li>......</li>
        <li>......</li>
        <li>......</li>
      </ul>
    <div>
    
## API DOCUMENTATIONS

### mode : String
> **fade**: Each slide fades in and fades out when sliding(By default).

> **slide**: Normal slides effect.

> **carousel**: Turning the slider into a carousel. 

### enableClass : String

> This is for changing the active class name for the current active element, by default it's 'vinactive'. Also the vinslider.css is using this class name as the selector. You can customize it into another class name if you want.

### amount: Number

> When under carousel mode, this determines how many items will be shown within one row.

> **NOTE**: If no value is specified or the value is greater than the total number of list items, the value will be reset to 2.

### duration : Number
> How much time each slide stays(mini second).

### gutter : Number
> Add a gutter in between each items(By default the unit is pixel).

### percentGutter : Number
> Turn the normal pixel unit gutter into a percentage one.

> *NOTE*: Only works when the gutter is also declared, if not, no effect or error will be met.

### startFrom: Number
> Determining from which item the slider or carousel starts. 

> NOTE: The first item will be an index of 0 and so on. If the value is greater than the total number of items or less than 0, it will still start from 0.

### moveBy : Number
> How many items will be passed by each event: auto playing, controller, scrolling. (By default the value is 1)

### pager : Boolean
> ture: Show the bullet.

> false: Hide the bullet.

### controller : Boolean
> ture: Show the controller.

> false: Hide the controller.

### auto : Boolean
> ture: Auto play the slider or carousel.

> false: Do not auto play.

### infinite : Boolean
> ture: The slider or carousel will start from the 1st item again when reaching the last item.

> false: Will be stoped at the end the slide.

### scrollable : Boolean
> ture: Mouse wheel scrolling event could slide the slider or carousel.

> false: No mouse wheel event applied(By default).

### vertical : Boolean
> ture: The slider or carousel will be shown in vertical mode. 

> false: Horizontal mode(By default). 

### direction : Boolean
> ture: Goes from left to right, or top to bottom(By default).

> false: The opposite direction.

> NOTE: This only affects the auto playing. Controller event or scolling will still obey their original direction.

## FEATURES

* Vinslider will be immediately stopped if the DOM element is not found or improper.
* Currently touch event on mobile devices is not supported yet.

## NOTES
* After successfully initiating a Vinslider, you will normally get three ul elements in the parent wrapper, which are 
  > vinmain: the main container of the sliders.

  > vinpager: the container of the pagers.
  
  > vincontroller: the container of the controllers.
* All items are absolute positioned in the slider, so that a height for the vinmain or the parent wrapper is needed.
* All animations are taken care by CSS transition. By default it is 0.75s and ease-in-out, customize it as you wish.

## TEST

Open the demo.html

## CONTRIBUTOR

Vincent Wen

## LICENSE



