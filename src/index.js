import 'scaffold.css'
import './site.scss'
import $ from 'jquery'
import Vinslider from './vinslider/vinslider.js'

let slider = document.querySelector('.vinslider')
new Vinslider(slider, {
    duration: 1000
})
