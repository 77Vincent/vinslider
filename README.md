# Vinslider 

Super lightweight, native Javascript slider module. 

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
    
    <div id="prev">Prev</div>
    <div id="next">Next</div>

* All items could be any HTML element
 
#### Javascript
    
    import Vinslider from 'vinslider'

    new Vinslider({
        el: '#vinslider',
        prev: '#prev',
        next: '#next'
    })

#### CSS
    
    #vinslider { visibility: hidden; }
    
* Please add this line to your Vinslider element, it will be visible again after initiating

## Configurations

#### Your Vinslider wrapper, pass the element selector

    el: '#vinslider' 

#### Previous slide controller, pass your element selector

    prev: '#prev' 

#### Next slide controller, pass your element selector

    next: '#next' 

#### How many slides being shown at a time
 
    amount: 1 (Default) 

#### The duration of transition

    speed: 750 (millisecond)

#### How much time each slide stays

    duration: 3000 (millisecond)

#### Vinslider will autoplay

    isAutoplay: true (Default)

#### Vinslider doesn't stop when reaching the last slide

    isInfinite: true (Default)

## Browser Compatibility

IE 9: No CSS transition effect

IE 10: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

