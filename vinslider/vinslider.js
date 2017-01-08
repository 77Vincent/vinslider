/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

class Vinslider {
    constructor(object, {
        amount = 1,
        speed = 750,
        duration = 3000,
        isAutoplay = true,
        isInfinite = true,
    } = {}) {
        this.loop = undefined
        this.init(object)(amount)(speed)(duration, isInfinite)(isAutoplay)

        let observer = new MutationObserver(() => {
            this.init(object)(amount)(speed)(duration, isInfinite)(isAutoplay)
        })
        observer.observe(object, {
            attributes: true,
            childList: true,
            characterData: true
        })
    }

    init(object) {
        let items = Array.prototype.slice.call(object.children)

        // Layout all items 
        return (amount) => {
            let width = 100 / amount

            items.forEach(function(v,i) {
                v.style.width = width + '%'
                v.style.position = 'absolute'
                v.style.left = width * i + '%' 
            })

            object.style.position = 'relative'
            object.style.overflow = 'hidden'
            object.style.visibility = 'visible'

            // Set transition to each item
            return (speed) => {
                let time = speed / 1000 + 's'

                items.forEach(function(v,i) {
                    v.style.WebkitTransition = 'left ' + time + ' ease'
                    v.style.MozTransition = 'left ' + time + ' ease'
                    v.style.OTransition = 'left ' + time + ' ease'
                    v.style.transition = 'left ' + time + ' ease'
                })

                // Start autoplay
                return (duration, isInfinite) => {
                        let index = 0
                        let active = ' vinactive'

                        window.clearTimeout(this.loop)
                        this.loop = window.setInterval(() => {
                            ++index
                            while (index === items.length - amount + 1) {
                                if (isInfinite) {
                                    index = 0
                                } else {
                                    --index
                                }
                            }

                            items.forEach(function(v,i) {
                                v.style.left = width * (i - index) + '%' 
                                v.className = v.className.replace(active, '')
                            })
                            items[index].className += active 
                        }, duration)
                    
                    // Stop autoplay
                    return (isAutoplay) => {
                        if (!isAutoplay) window.clearTimeout(this.loop) 
                    }
                }
            }
        } 
    }
}

export default Vinslider = Vinslider
