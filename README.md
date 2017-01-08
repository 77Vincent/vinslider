# Vinslider 

Light weight, native Javascript slider module. 

http://www.77webtech.com/vinslider

## Setup

Install through npm

    npm install --save vinslider
    
Markup

    <div class="vinslider">
        <div>content</div>
        <div>content</div>
        ...
    <div>
    
Javascript
    
    import Vinslider from 'vinslider'
    
    let slider = document.querySelector('.vinslider')
    
    new Vinslider(slider[, config])


## Configurations

#### speed : Number

    : 750 (millisecond)

The duration of transition

#### duration : Number

    : 5000 (millisecond)
    
How much time each slide stays

#### amount: Number
 
    : 1 

How many slides being shown at a time

#### isAutoplay : Boolean

    : true (Default)

Vinslider will autoplay

#### isInfinite : Boolean

    : true (Default)

Vinslider doesn't stop when reaching the last slide

## Browser Compatibility

IE 9: No CSS transition effect

IE 10: Fully supported

## License

Released under the MIT license: http://opensource.org/licenses/MIT

