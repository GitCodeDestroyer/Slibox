let test

(function($) {
    let sliboxesInitiated = 0

    // All methods
    const methods = {
        // This method inits slider
        init: function(options) {
            // Options defaults
            let extOptions = Object.assign({
                activeSlide: 1,
                renderArrows: !0,
                renderControllers: !0,
                imagesLinks: [],
                loadErrorMessage: 'Image is not loaded',
                noImagesMessage: 'There are no images links you added<br><small>Slibox</small>',
                imageSize: 'contain',
                loaderLink: !1,
                imagePosition: 'center',
                animateCSS: !1,
                carousel: !1,
                timer: !1,
                timerTime: 5000,
                timerCarousel: !0,
            }, options)

            return this.each(function() {
                const $wrapper = $(this)

                // Increase inited sliboxes to 1
                sliboxesInitiated++

                // Init wrapper only
                $wrapper.addClass('slibox').addClass('slibox-' + sliboxesInitiated).data('slibox', '.slibox-' + sliboxesInitiated)
                const wrapperSelector = $wrapper.data('slibox')

                // Check, if there is no slides wrapper, create it
                if (!$.contains($wrapper, $('.sb-slides'))) {
                    $('<div/>', {
                        class: 'sb-slides'
                    }).appendTo(wrapperSelector)
                    // Check is there are images or not. If not, throw an error
                    if ('object' != typeof extOptions.imagesLinks || 0 == extOptions.imagesLinks.length) {
                        extOptions.imagesLinks = []
                        $wrapper.html('<div class="sb-error">' + extOptions.noImagesMessage + '</div>')
                    }
                }

                ////////////////////
                // Start initing
                ////////////////////

                const slidesCount = extOptions.imagesLinks.length > 0 ? extOptions.imagesLinks.length : $(wrapperSelector + ' .sb-slide').length

                // Set all of the data to this element
                $wrapper.data({
                    extOptions,
                    timer: extOptions.timer,
                    timerCarousel: extOptions.timerCarousel,
                    timerTime: extOptions.timerTime,
                    timeCounter: 0,
                    slidesCount: slidesCount,
                    activeSlide: extOptions.activeSlide,
                    carousel: extOptions.carousel
                })

                let slide
                // A loop for creating slides
                for (let i = 1; i <= slidesCount; i++) {
                    slide = $(wrapperSelector + ' .sb-slides .sb-slide-' + i)
                    if (slide.length == 0) {
                        slide = $('<div/>', {
                            class: 'sb-slide sb-slide-' + i,
                            data: {
                                'slide': i,
                                'canDrag': true,
                                'boxOffset': false,
                                'myDragFlag': false,
                                'startX': false
                            },
                            draggable: true,
                            css: {
                                'background-image': 'url("' + extOptions.imagesLinks[i - 1] + '")',
                                'background-repeat': 'no-repeat'
                            }
                        }).appendTo(wrapperSelector + ' .sb-slides')
                    } else {
                        slide.data({
                                'slide': i,
                                'canDrag': true,
                                'boxOffset': false,
                                'myDragFlag': false,
                                'startX': false
                            }).attr('draggable', true)
                            .css({
                                'background-image': 'url("' + extOptions.imagesLinks[i - 1] + '")',
                                'background-repeat': 'no-repeat'
                            })
                            .addClass('sb-slide-' + i)
                            .html('<div class="sb-slider-content">' + slide.html() + '</div>');
                    }

                    // When user selects some text, disable dragging
                    slide[0].onselectstart = function() {
                        slide.data('canDrag', false)
                    }

                    slide[0].ondragstart = function(e) {
                        if (slide.data('canDrag')) {
                            slide.data('startX', e.pageX - slide[0].offsetLeft - $wrapper[0].offsetLeft)
                            slide.myDragFlag = !0
                        }
                    }

                    slide[0].ondragend = function(e) {
                        if (slide.data('canDrag')) {
                            slide.data('boxOffset', e.pageX - slide.data('startX'))
                            if (slide.data('boxOffset') - $wrapper[0].offsetLeft <= -20) {
                                $wrapper.slibox('slideToNext')
                            }
                            if (slide.boxOffset - $wrapper[0].offsetLeft >= 20) {
                                $wrapper.slibox('slideToPrev')
                                slide.myDragFlag = !1
                            }
                        } else {
                            canDrag = true;
                        }
                    }
                }

                // Load loader image
                $wrapper.slibox('loader', extOptions.loaderLink)

                // Create arrows
                $wrapper.slibox('initArrows', extOptions.renderArrows)

                // Creating controllers
                $wrapper.slibox('initControllers', extOptions.renderControllers)

                // Images Sizes
                $wrapper.slibox('imageSize', extOptions.imageSize)

                // Images Position
                $wrapper.slibox('imagePosition', extOptions.imagePosition)

                // Active slide
                $wrapper.slibox('activeSlide', extOptions.activeSlide)

                // Timer
                $wrapper.slibox('initTimer', extOptions.timer)

                // Method for sliding to slide
                $wrapper.slibox('slideTo', extOptions.activeSlide)

                // init Animate.css
                $wrapper.slibox('initAnimateCSS', extOptions.animateCSS)

                test = $wrapper.data()
            })
        },

        // Method for setting a link for loader
        loader: function(link) {
            this.each(function() {
                if ('string' == typeof link) {
                    $(this).css({
                        background: 'url("' + link + '") no-repeat center'
                    })
                }
            })
            return this
        },

        // Method for creating controllers
        initControllers: function() {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox'),
                    controllersWrapper = wrapperSelector + ' .sb-controllers'

                $('<div/>', {
                    class: 'sb-controllers',
                    data: {
                        'parentSlider': wrapperSelector
                    }
                }).appendTo($wrapper)

                // A loop for creating controllers
                for (let i = 1; i <= $wrapper.data('slidesCount'); i++) {
                    $('<div/>', {
                        class: 'sb-controller',
                        data: {
                            'parentSlider': wrapperSelector,
                            'sb-controller': i
                        }
                    }).appendTo(controllersWrapper).click(function() {
                        $wrapper.slibox('slideTo', i)
                    })
                }

                $(controllersWrapper).css({
                    width: $wrapper.data('slidesCount') * 22,
                    marginLeft: ($wrapper.width() - $wrapper.data('slidesCount') * 22) / 2
                })
            })
            return this
        },

        // Method for destroying controllers
        destroyControllers: function() {
            this.each(function() {
                $(this).children('.sb-controllers').remove()
            })
            return this
        },

        // Method for initing arrows
        initArrows: function() {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox')

                // Left arrow
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-left',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M45.539,63.41c0.394,0.394,0.908,0.59,1.424,0.59s1.031-0.197,1.424-0.59c0.787-0.787,0.787-2.061,0-2.848 L20.059,32.233L48.407,3.886c0.786-0.787,0.786-2.062,0-2.848c-0.787-0.787-2.062-0.787-2.849,0L15.822,30.773 c-0.205,0.206-0.384,0.506-0.484,0.778c-0.273,0.738-0.092,1.567,0.465,2.124L45.539,63.41z" /></g></svg>',
                    data: {
                        'parentSlider': wrapperSelector,
                        'arrowDirection': 'left'
                    }
                }).appendTo($wrapper).click(function() {
                    $wrapper.slibox('slideToPrev')
                })

                // Right arrow
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-right',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59 c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725 L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z" /></g></svg>',
                    data: {
                        'parentSlider': wrapperSelector,
                        'arrowDirection': 'right'
                    }
                }).appendTo($wrapper).click(function() {
                    $wrapper.slibox('slideToNext')
                })
            })
            return this
        },

        // Method for destroying arrows
        destroyArrows: function() {
            $(this).children('.sb-arrow').remove()
            return this
        },

        // Timer initialization
        initTimer: function() {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox')

                $('<div/>', {
                    class: 'sb-timer-container',
                }).append($('<div/>', {
                    class: 'sb-timer sb-timer-animate',
                    style: 'animation-duration: ' + $wrapper.data('timerTime') + 'ms'
                })).appendTo($wrapper)
                $wrapper.data('timeCounter', 2)

                // When user hover cursor (or click to wrapper in mobile brower) to slider, timer will be paused 
                $wrapper.hover(function() {
                    $(wrapperSelector + ' .sb-timer').css('animation-play-state', 'paused')
                    $wrapper.data('paused', true)
                }, function() {
                    $(wrapperSelector + ' .sb-timer').css('animation-play-state', 'running')
                    $wrapper.data('paused', false)
                })
            })
            return this
        },

        // Method for destroying a timer
        destroyTimer: function() {
            this.each(function() {
                const $wrapper = $(this)

                $wrapper.unbind('hover')
                $wrapper.children('.sb-timer-container').remove()
                $wrapper.data({
                    'timeCounter': 0,
                    'paused': false
                })
            })
            return this
        },

        // Setting timer's time
        setTime: function(time) {
            this.each(function() {
                const $wrapper = $(this),
                    timer = $($wrapper.data('slibox') + ' .sb-timer')

                $wrapper.data({
                    'timerTime': time,
                    'timeCounter': Math.ceil($wrapper.data('timeCounter') / time)
                })

                timer.css({
                    'animation-duration': time + 'ms',
                    'animation-play-state': 'running'
                })
            })
            return this
        },

        // Method for reloading the timer
        reloadTimer: function() {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox'),
                    timer = $(wrapperSelector + ' .sb-timer')

                timer.removeClass('sb-timer-animate')

                setTimeout(function() {
                    timer.addClass('sb-timer-animate')
                    $wrapper.data('time', 0)
                }, 100)


                clearInterval(this.slidingInterval)
            })
            return this
        },

        // Method for initializing animations
        initAnimateCSS: function(animations) {
            this.each(function() {
                const $wrapper = $(this),
                    slides = $($wrapper.data('slibox') + ' .sb-slide')
                let slide

                if ('object' == typeof animations) {
                    for (let i = 1; i <= $wrapper.data('slidesCount'); i++) {
                        slide = slides.eq(i - 1)
                        if (animations.length < i) {
                            slide.addClass(animations[animations.length - 1])
                        } else {
                            slide.addClass(animations[i - 1])
                        }
                    }
                } else if ('string' == typeof animations) {
                    slides.addClass(animations)
                }
                slides.addClass('animated')
            })
            return this
        },

        // Method for add an image size for every slider
        imageSize: function(imagesSizes) {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox'),
                    slides = $(wrapperSelector + ' .sb-slide')
                let slide

                if ('object' == typeof imagesSizes) {
                    for (let i = 1; i <= $wrapper.data('slidesCount'); i++) {
                        slide = slides.eq(i - 1)
                        if (imagesSizes.length < i) {
                            slide.css({
                                'background-size': imagesSizes[imagesSizes.length - 1]
                            })
                        } else {
                            slide.css({
                                'background-size': imagesSizes[i - 1]
                            })
                        }
                    }
                } else if ('string' == typeof imagesSizes) {
                    slides.css({
                        'background-size': imagesSizes
                    })
                }
            })
            return this
        },

        // Method for add an image position for every slider
        imagePosition: function(imagesPositions) {
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox'),
                    slides = $(wrapperSelector + ' .sb-slide')
                let slide

                if ('object' == typeof imagesPositions) {
                    for (let i = 1; i <= $wrapper.data('slidesCount'); i++) {
                        slide = slides.eq(i - 1)
                        if (imagesPositions.length < i) {
                            slide.css({
                                'background-position': imagesPositions[imagesPositions.length - 1]
                            })
                        } else {
                            slide.css({
                                'background-position': imagesPositions[i - 1]
                            })
                        }
                    }
                } else if ('string' == typeof imagesPositions) {
                    slides.css({
                        'background-position': imagesPositions
                    })
                }
            })
            return this
        },

        // Method for setting active slide
        activeSlide: function(activeSlide) {
            this.each(function() {
                const $wrapper = $(this),
                    slidesCount = $wrapper.data('slidesCount')

                if ('number' == typeof activeSlide) {
                    if (activeSlide > slidesCount) {
                        $wrapper.data('activeSlide', slidesCount)
                    } else if (activeSlide < 1) {
                        $wrapper.data('activeSlide', 1)
                    } else {
                        $wrapper.data('activeSlide', activeSlide)
                    }
                }
            })
            return this
        },

        // This method slides to slide, that you choosed
        slideTo: function(slideTo) {
            if ('number' != typeof slideTo) {
                console.warn('Input should be a number, input:' + slideTo)
                return false
            }
            this.each(function() {
                const $wrapper = $(this),
                    wrapperSelector = $wrapper.data('slibox'),
                    slide = $(wrapperSelector + ' .sb-slide'),
                    controller = $(wrapperSelector + ' .sb-controller'),
                    slidesCount = $wrapper.data('slidesCount')

                if ($wrapper.data('carousel')) {
                    if (slideTo > slidesCount) {
                        slideTo = 1
                    } else if (slideTo < 1) {
                        slideTo = slidesCount
                    }
                } else {
                    if (slideTo > slidesCount) {
                        slideTo = slidesCount
                    } else if (slideTo < 1) {
                        slideTo = 1
                    }
                }

                $wrapper.data('activeSlide', slideTo)

                slide.removeClass('active')
                slide.eq(slideTo - 1).addClass('active')

                controller.removeClass('active')
                controller.eq(slideTo - 1).addClass('active')

                $wrapper.slibox('reloadTimer')

                this.slidingInterval = setInterval(function() {
                    const time = $wrapper.data('timeCounter')
                    if (!$wrapper.data('paused')) {
                        if ($wrapper.data('timerTime') / 100 != time - 1) {
                            $wrapper.data('timeCounter', time + 1)
                        } else {
                            if (($wrapper.data('timerCarousel') || $wrapper.data('activeSlide') < $wrapper.data('slidesCount'))) {
                                $wrapper.slibox('slideToNext')
                            } else {
                                $(wrapperSelector + ' .sb-timer').css('animation-play-state', 'paused')
                            }
                            $wrapper.data('timeCounter', 0)
                        }
                    }
                }, 100)
            })
            return this
        },

        // Method for sliding to next slide
        slideToNext: function() {
            this.each(function() {
                const $wrapper = $(this)

                $wrapper.slibox('slideTo', $wrapper.data('activeSlide') + 1)
            })
            return this
        },

        // Method for sliding to previous slide
        slideToPrev: function() {
            this.each(function() {
                const $wrapper = $(this)

                $wrapper.slibox('slideTo', $wrapper.data('activeSlide') - 1)
            })
            return this
        }
    }

    // Setting plugin
    $.fn.slibox = function(method = 'init') {
        // if method is not an object, do this method, either do init method
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments)
        }
        console.log(test)
    }
})(jQuery)
