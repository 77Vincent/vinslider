# Vinslider 

Super lightweight, native Javascript slider module / 超轻量，原生JS幻灯片模组

http://www.77webtech.com/vinslider

## Setup ／ 如何使用

#### Installation / 安装

    npm install --save vinslider
    
#### Markup

    <div id="vinslider">
        <div>content</div>
        <div>content</div>
        ...
    <div>
    
    <div id="prev">Prev</div>
    <div id="next">Next</div>
    
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
* 请在CSS中加上这一行，Vinslider会在初始化完成后重新可见

## Configurations

#### Your Vinslider wrapper, pass the element selector / 幻灯片容器

    el: '#vinslider' 
    
#### Previous slide controller, pass your element selector ／ 幻灯片”上一张“按钮

    prev: '#prev'
    
#### Next slide controller, pass your element selector ／ 幻灯片”下一张“按钮

    next: '#next' 
    
#### How many slides being shown at a time ／ 每一轮显示多少张幻灯片

    amount: 1 (Default) 
    
#### The duration of transition ／ 切换动画时间

    speed: 750 (millisecond)
    
#### How much time each slide stays ／ 每一张幻灯片停留时间

    duration: 3000 (millisecond)
    
#### Vinslider will autoplay ／ 自动播放

    isAutoplay: true (Default)
    
#### Vinslider doesn't stop when reaching the last slide ／ 无限循环

    isInfinite: true (Default)
    
## Browser Compatibility / 浏览器支持

* IE 9: No CSS transition effect ／ 无动画效果
* IE 10: Fully supported ／ 完全支持

## License / 许可

Released under the MIT license: http://opensource.org/licenses/MIT

