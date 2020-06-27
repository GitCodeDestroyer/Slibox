! function($) {
    $.fn.slideTo = function (slideTo, fromTimer = false) {
        this.each(function () {
            let sliderId = '#' + this.id,
            slidesCount = $(sliderId).data("sb-slides-count");

            if ($(sliderId).data("sb-carousel") || fromTimer) {
                if (slideTo > slidesCount) {
                    slideTo = 1;
                } else if (slideTo < 1) {
                    slideTo = slidesCount
                }
            }

            if (fromTimer) {
                if ($(sliderId).data('sb-timer')) {
                    $(sliderId + ' .sb-timer').removeClass('sb-timer-animate');
    
                    setTimeout(function () {
                        $(sliderId + ' .sb-timer').addClass('sb-timer-animate');
                    }, 100);
    
                    clearInterval(this.slidingInterval);
    
                    this.slidingInterval = setInterval(function () {
                        if (!$(sliderId)[0].paused) {
                            console.log($(sliderId).data('sb-timer-time') / 100, $(sliderId)[0].time);
                            if ($(sliderId).data('sb-timer-time') / 100 != $(sliderId)[0].time) {
                                $(sliderId)[0].time++;
                            }else {
                                if (($(sliderId).data('sb-timer-carousel') || $(sliderId).data('sb-active-slide') < $(sliderId).data('sb-slides-count'))) {
                                    $(sliderId).slideToNext();
                                }else {
                                    $(sliderId + ' .sb-timer').css('animation-play-state', 'paused');
                                }
                                $(sliderId)[0].time = 2;
                            }
                        }
                    }, 100);
                }
            }


            if (slideTo) {
                $(sliderId).toggleClass('sb-last-slide', slideTo == $(sliderId).data('sb-slides-count'));
                $(sliderId).data("sb-active-slide", slideTo);
                $(sliderId + " .sb-slide").removeClass("active");
                $(sliderId + " .sb-slide:nth-of-type(" + slideTo + ")").addClass("active");
                $(sliderId + " .sb-controller").removeClass("active"), $(sliderId + " .sb-controller:nth-of-type(" + slideTo + ")").addClass("active");
            }
    
        })
    }

    let sbCanDrag = true;

    $.fn.slideToNext = function () {
        this.each(function () {
            if (this.className.match('slibox')) {
                $(this).slideTo($(this).data('sb-active-slide') + 1, $(this).data('sb-timed-carousel'));
            }
        })
        return $(this).data('sb-active-slide');
    }

    $.fn.slideToPrev = function () {
        this.each(function () {
            if (this.className.match('slibox')) {
                $(this).slideTo($(this).data('sb-active-slide') - 1, $(this).data('sb-timed-carousel'));
            }
        })
        return $(this).data('sb-active-slide');
    }

    $.fn.slibox = function(options) {
        /*
         * Options of this slider
         */
        let o = $.extend({
            height: !1,
            width: !1,
            activeSlide: 1,
            renderArrows: !0,
            renderControllers: !0,
            imagesLinks: [],
            loadErrorMessage: "Image is not loaded",
            noImagesMessage: "There are no images links you added<br><small>Slibox</small>",
            imageSize: "contain",
            loaderLink: !1,
            imagePosition: "center",
            animateCSS: !1,
            carousel: !1,
            timer: !1,
            timerTime: 5000,
            timerCarousel: !0,
        }, options);

        return this.each(function() {
            let el = "#" + this.id;

            $(el).addClass("slibox");

            /*
             * Check, if images links are not setted, render an error
             */
            if ("object" != typeof o.imagesLinks || 0 == o.imagesLinks.length) {
                return o.imagesLinks = [], $(el).html('<h1 class="sb-error">' + o.noImagesMessage + "</h1>"), !1;
            }

            if (!$(el).children('.sb-slides')) {
                $('<div/>', {
                    class: 'sb-slides'
                }).appendTo(el);
            }

            $(el).data("sb-slides-count", o.imagesLinks.length);
            $(el).data("sb-carousel", o.carousel);
            $(el).data("sb-timer-time", o.timerTime);
            $(el).data("sb-timer-carousel", o.timerCarousel);
            $(el).data("sb-timer", o.timer);

            /*
             * Setting a link of the loader
             */
            if ("string" == typeof o.loaderLink) {
                $(el).css({
                    background: "url(" + o.loaderLink + ") no-repeat center"
                })
            }

            /*
             * Create Arrows
             */
            if (o.renderArrows) {
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-left',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M45.539,63.41c0.394,0.394,0.908,0.59,1.424,0.59s1.031-0.197,1.424-0.59c0.787-0.787,0.787-2.061,0-2.848 L20.059,32.233L48.407,3.886c0.786-0.787,0.786-2.062,0-2.848c-0.787-0.787-2.062-0.787-2.849,0L15.822,30.773 c-0.205,0.206-0.384,0.506-0.484,0.778c-0.273,0.738-0.092,1.567,0.465,2.124L45.539,63.41z" /></g></svg>',
                    data: {
                        'sb-slider': el,
                        'sb-arrow-direction': 'left'
                    }
                }).appendTo(el);
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-right',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59 c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725 L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z" /></g></svg>',
                    data: {
                        'sb-slider': el,
                        'sb-arrow-direction': 'right'
                    }
                }).appendTo(el);
            }

            for (let i = 1; i <= o.imagesLinks.length; i++) {
                let slide = $(el + ' .sb-slides .sb-slide:nth-of-type(' + i + ')');
                if (slide.length != 0) {
                    slide = slide
                            .data('sb-slide', i)
                            .css({
                                'background-image': 'url("' + o.imagesLinks[i - 1] + '")',
                                'background-repeat': 'no-repeat'
                            }).addClass('sb-slide-' + i).html('<div class="sb-slider-content">' + slide.html() + '</div>');
                }else {
                    slide = $('<div/>', {
                        class: 'sb-slide sb-slide-' + i,
                        data: {
                            'sb-slide': i
                        },
                        css: {
                            'background-image': 'url("' + o.imagesLinks[i - 1] + '")',
                            'background-repeat': 'no-repeat'
                        }
                    }).appendTo(el + ' .sb-slides').html('<div class="sb-slider-content"></div>');
                }

                /*
                 * Create Controllers
                 */
                if (o.renderControllers) {
                    if (0 == i - 1) {
                        $('<div/>', {
                            class: 'sb-controllers',
                            data: {'sb-slider': el}
                        }).appendTo(el);
                    }
                    $('<div/>', {
                        class: 'sb-controller',
                        data: {
                            'sb-slider': el,
                            'sb-controller': i
                        }
                    }).appendTo(el + ' .sb-controllers');
                }

                /*
                 * Animate.css functionality
                 */
                if (o.animateCSS) {
                    if ("object" == typeof o.animateCSS) {
                        if (o.animateCSS.length < i) {
                            $(slide).addClass(o.animateCSS[o.animateCSS.length - 1])
                        } else {
                            $(slide).addClass(o.animateCSS[i - 1]);
                        }
                    } else if ("string" == typeof o.animateCSS) {
                        $(slide).addClass(o.animateCSS);
                    }
                    $(slide).addClass("animated");
                }

                /*
                 * Image Size
                 */
                if (o.imageSize) {
                    if ("object" == typeof o.imageSize) {
                        if (o.imageSize.length < i) {
                            $(slide).css({
                                "background-size": o.imageSize[o.imageSize.length - 1]
                            })
                        } else {
                            $(slide).css({
                                "background-size": o.imageSize[i - 1]
                            })
                        }
                    } else if ("string" == typeof o.imageSize) {
                        $(slide).css({
                            "background-size": o.imageSize
                        })
                    }
                }

                /*
                 * Image Position
                 */
                if (o.imagePosition) {
                    if ("object" == typeof o.imagePosition) {
                        if (o.imagePosition.length < i) {
                            $(slide).css({
                                "background-position": o.imagePosition[o.imagePosition.length - 1]
                            })
                        } else {
                            $(slide).css({
                                "background-position": o.imagePosition[i - 1]
                            })
                        }
                    } else {
                        $(slide).css({
                            "background-position": o.imagePosition
                        })
                    }
                }
            } // End for

            $(el).width(o.width);

            if (!o.height) {
                $(el).height(0.5625 * $(el).width())
            } else {
                $(el).height(o.height)
            }

            if ("number" == typeof o.activeSlide) {
                if (o.activeSlide > o.imagesLinks.length) {
                    $(el).data("sb-active-slide", o.imagesLinks.length)
                }else if (o.activeSlide < 1) {
                    $(el).data("sb-active-slide", 1)
                }
                $(el).data("sb-active-slide", o.activeSlide)
            } else {
                $(el).data("sb-active-slide", 1)
            }

            if (o.timer) {
                $(el).data('sb-timed-carousel', o.timerCarousel);
                $('<div/>', {
                    class: 'sb-timer-container',
                }).append($('<div/>', {
                    class: 'sb-timer sb-timer-animate',
                    style: 'animation-duration: ' + o.timerTime + 'ms'
                })).appendTo(el);
                this.time = 2;
            }

            $(".sb-controller").unbind('click');
            $(".sb-controller").click(function() {
                $($(this).data("sb-slider")).slideTo($(this).data("sb-controller"))
            })

            $(".sb-arrow").unbind('click');
            $(".sb-arrow").click(function() {
                let sliderId = $(this).data("sb-slider"),
                    activeSlide = $(el).data("sb-active-slide");
                if ("left" == $(this).data("sb-arrow-direction")) {
                    $(sliderId).slideTo(activeSlide - 1)
                }else if ("right" == $(this).data("sb-arrow-direction")) {
                    $(sliderId).slideTo(activeSlide + 1)
                }
            })

            $(el).hover(function () {
                $('#' + this.id + ' .sb-timer').css('animation-play-state', 'paused');
                $('#' + this.id)[0].paused = true;
            }, function () {
                let sliderId = '#' + this.id;
                $('#' + this.id + ' .sb-timer').css('animation-play-state', 'running');
                $('#' + this.id)[0].paused = false;
            });

            $(el).slideTo($(el).data("sb-active-slide"), true);

            $(el + ' .sb-slide').each(function() {
                let box = $(this),
                    container = $(el)[0];
                this.boxOffset, this.myDragFlag = !1
                box.on('selectstart', function () {
                    sbCanDrag = false;
                });
                let device = navigator.userAgent;
                if (
                (device.match(/(Android);?[\s\/]+([\d.]+)?/) ||
                device.match(/(iPad).*OS\s([\d_]+)/) ||
                device.match(/(iPod)(.*OS\s([\d_]+))?/) ||
                device.match(/(iPhone\sOS)\s([\d_]+)/)) != null
                ) {
                    box.on('touchend', function (e) {
                        if (e.target == box.children()[0] || e.target == box[0]) {
                            $(el).slideTo($(this).data("sb-slide") + 1);
                        }
                    });
                } else {
                    box.mousedown(function(e) {
                        if (sbCanDrag) {
                            this.startX = e.pageX - box[0].offsetLeft - container.offsetLeft
                            this.myDragFlag = !0
                        }
                    })
                    box.mouseup(function(e) {
                        if (sbCanDrag) {
                            this.boxOffset = e.pageX - this.startX;
                            if (this.boxOffset - container.offsetLeft <= -20) {
                                $(el).slideTo($(this).data("sb-slide") + 1)
                            }
                            if (this.boxOffset - container.offsetLeft >= 20) {
                                $(el).slideTo($(this).data("sb-slide") - 1)
                                this.myDragFlag = !1
                            }
                        }else {
                            sbCanDrag = true;
                        }
                    })
                }
            })
        })
    }
}(jQuery);