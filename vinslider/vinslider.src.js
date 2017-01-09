/**
 * @Title:     Vinslider
 * @Descr:     A lightweight slider/carousel module in native Javascript
 * @Package:   Javascript
 * @Copyright: Released under the MIT license: http://opensource.org/licenses/MIT
 * @Author:    Vincent Wen <www.77webtech.com/about> <wentianqi77@outlook.com>
 */

class Vinslider {
    constructor({
        el = '',
        prev = '',
        next = '',
        amount = 1,
        speed = 750,
        duration = 3000,
        isAutoplay = true,
        isInfinite = true
    } = {}) {
        let wrapper = document.querySelector(el) 
        this.init(wrapper)(amount)(speed)(isInfinite)(duration)(isAutoplay)(prev, next)

        let observer = new MutationObserver(() => {
            this.init(wrapper)(amount)(speed)(isInfinite)(duration)(isAutoplay)(prev, next)
        })
        observer.observe(wrapper, {
            attributes: true,
            childList: true,
            characterData: true
        })
    }

    init(wrapper) {
        this.items = Array.prototype.slice.call(wrapper.children)

        // Layout 
        return (amount) => {
            let width = 100 / amount
            let heights = this.items.map((v,i) => {
                // Clean all transition
                v.style.WebkitTransition = ''
                v.style.MozTransition = '' 
                v.style.OTransition = ''
                v.style.transition = ''

                // Set translate
                v.style.width = width + '%'
                v.style.display = 'block'
                v.style.transform = 'translate(' + width * i + '%,' + (0 - i) + '00%)' 
                return v.clientHeight
            })
            let max = Math.max.apply(Math, heights)

            // Set style to wrapper
            wrapper.style.height = max + 'px'
            wrapper.style.overflow = 'hidden'
            wrapper.style.visibility = 'visible'

            // Set transition 
            return (speed) => {
                let time = speed / 1000 + 's' 

                this.items.forEach(function(v,i) {
                    v.style.WebkitTransition = 'transform ' + time + ' ease'
                    v.style.MozTransition = 'transform ' + time + ' ease'
                    v.style.OTransition = 'transform ' + time + ' ease'
                    v.style.transition = 'transform ' + time + ' ease'
                })

                // Set movement and direction
                return (isInfinite) => {
                    this.index = 0

                    let loop = () => {
                        this.items.forEach((v,i) => {
                            v.style.transform = 'translate(' + width * (i - this.index) + '%,' + (0 - i) + '00%)' 
                            v.className = v.className.replace(' vinactive', '')
                        })
                        this.items[this.index].className += ' vinactive' 
                    } 

                    let forwards = () => {
                        ++this.index
                        while (this.index === this.items.length - amount + 1) {
                            if (isInfinite) {
                                this.index = 0
                            } else {
                                --this.index
                            }
                        }
                        loop()
                    }

                    let backwards = () => {
                        --this.index
                        while (this.index < 0) {
                            if (isInfinite) {
                                this.index = this.items.length - amount 
                            } else {
                                ++this.index
                            }
                        }
                        loop()
                    }

                    // Start autoplay
                    return (duration) => {
                        window.clearTimeout(this.timer)
                        this.timer = window.setInterval(() => {
                            forwards()
                        }, duration)

                        // Stop autoplay
                        return (isAutoplay) => {
                            if (!isAutoplay) window.clearTimeout(this.timer) 

                            // Controllers
                            return (prev, next) => {
                                document.querySelector(prev).onclick = () => {
                                    backwards() 
                                }
                                document.querySelector(next).onclick = () => {
                                    forwards() 
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
}

if (typeof define === "function" && define.amd) {
    define('Vinslider', [], function() {
        return Vinslider
    });
} else if (typeof module === "object" && exports) {
    module.exports = Vinslider
} else {
    window.Vinslider = Vinslider
}
