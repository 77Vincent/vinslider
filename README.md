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

    el: '#vinslider' 

#### prev : Previous slide controller, pass your element selector

    prev: '#prev' 

#### next : Next slide controller, pass your element selector

    next: '#next' 

#### amount: How many slides being shown at a time
 
    amount: 1 (Default) 

#### speed : The duration of transition

    speed: 750 (millisecond)

#### duration : How much time each slide stays

    duration: 3000 (millisecond)

#### isAutoplay : Vinslider will autoplay

    isAutoplay: true (Default)

#### isInfinite : Vinslider doesn't stop when reaching the last slide

    isInfinite: true (Default)

## Browser Compatibility

IE 9: No CSS transition effect

IE 10: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

