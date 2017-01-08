import 'scaffold.css'
import './site.scss'
import $ from 'jquery'
import Vinslider from '../vinslider/vinslider.js'

let $slider = $('.vinslider')
let counter = 0;

new Vinslider($slider[0], {
    prev: '#prev',
    next: '#next'
})

$('#add').on('click', () => {
    if (counter < 4) {
        counter++
        $slider
            .children('.slide:first-child')
            .before('<div class="slide" style="background-image: url(http://7xr7xo.com1.z0.glb.clouddn.com/bg-' + parseInt(counter + 4) + '.jpg)"></div>')
    }
})
