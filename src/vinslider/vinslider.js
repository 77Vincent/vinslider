/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

class Vinslider {
    constructor(object, {
        mode = 'slide',
        speed = 750,
        duration = 5000,
        index = 0,
        amount = 1,
        isAutoplay = true,
        isInfinite = true,
        isScrollable = false,
    }) {

        // Play
        setInterval(() => {
            index = this.play(this.items(object), index)
        }, duration) 
    }

    items(object) {
        return Array.prototype.slice.call(object.children)
    }

    play(object, index) {
        if (index < object.length - 1) {
            return ++index 
        } else {
            return index = 0
        }
    } 
}

export default Vinslider = Vinslider
