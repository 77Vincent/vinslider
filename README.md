# Vinslider 

Light weight, native Javascript slider module. 

http://www.77webtech.com/vinslider

## Setup

#### Installation 

    npm install --save vinslider

#### Markup

    <div id="vinslider">
        <div>content</div>
        <div>content</div>
        ...
    <div>

* Items could be any HTML elements
 
#### Javascript
    
    import Vinslider from 'vinslider'

    new Vinslider({
        el: '#vinslider'
    })

#### CSS
    
    #vinslider {
        visibility: hidden;
        height: ...;
    }

Please add these two lines to your Vinslider wrapper
* All items inside will be absolute positioned, so a certain height is needed
* Vinslider will be visible again after initiating

## Configurations

#### el: Your Vinslider wrapper, pass the element selector

    : '#vinslider' 

#### prev : Previous slide controller, pass your element selector

    : '#prev' 

#### next : Next slide controller, pass your element selector

    : '#next' 

#### amount: How many slides being shown at a time
 
    : 1 (Default) 

#### speed : The duration of transition

    : 750 (millisecond)

#### duration : How much time each slide stays

    : 3000 (millisecond)

#### isAutoplay : Vinslider will autoplay

    : true (Default)

#### isInfinite : Vinslider doesn't stop when reaching the last slide

    : true (Default)

## Browser Compatibility

IE 9: No CSS transition effect

IE 10: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

