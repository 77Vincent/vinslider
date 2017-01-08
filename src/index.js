import 'scaffold.css'
import './site.scss'
import $ from 'jquery'
import Vinslider from '../vinslider/vinslider.js'

let $slider = $('.vinslider')
let counter = 0;

new Vinslider($slider[0])

$('#add').on('click', () => {
    if (counter < 4) {
        counter++
        $slider
            .children('.slide:first-child')
            .before('<div class="slide" style="background-image: url(/src/assets/bg-' + parseInt(counter + 4) + '.jpg)"></div>')
    }
})
