(function($) {
    const methods = {
        init: function(options) {
            // Options defaults
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
            }, options)

            return this.each(function() {
                let $this = $(this)

                // Check is there are images or not. If not, throw an error
                if ("object" != typeof o.imagesLinks || 0 == o.imagesLinks.length) {
                    o.imagesLinks = []
                    $this.html('<div class="sb-error">' + o.noImagesMessage + "</div>")
                }

                ////////////////////
                // Start initing
                ////////////////////
                let id = '#' + this.id,
                    slidesCount = o.imagesLinks.length

                $this.addClass('slibox')

                // Set all of the data to this element
                $this.data({
                    options: o,
                    slidesCount: slidesCount
                })


                // Check, if there are content for slide in html, don't create a slide node, only add

                // Check, if there is no slides wrapper, create it
                if (!$this.children('.sb-slides')) {
                    $('<div/>', {
                        class: 'sb-slides'
                    }).appendTo(id)
                }

                // A loop for creating slides
                for (let i = 1; i <= slidesCount; i++) {
                    let content = $(id + ' .sb-slides .sb-slide').eq(i - 1).html()
                    $(id + ' .sb-slides .sb-slide').eq(i - 1).remove()
                    slide = $('<div/>', {
                        class: 'sb-slide sb-slide-' + i,
                        data: {
                            'sb-slide': i
                        },
                        html: content,
                        draggable: true,
                        css: {
                            'background-image': 'url("' + o.imagesLinks[i - 1] + '")',
                            'background-repeat': 'no-repeat'
                        }
                    }).appendTo(id + ' .sb-slides')
                }

                // Load loader image
                $this.slibox('loader', o.loaderLink)

                // Create arrows
                $this.slibox('arrows', o.renderArrows)

                // Creating controllers
                $this.slibox('controllers', o.renderControllers)

                // Images Sizes
                $this.slibox('imageSize', o.imageSize)

                // Images Position
                $this.slibox('imagePosition', imagesPositions)
            })
        },

        loader: function(link) {
            if ("string" == typeof link) {
                this.css({
                    background: "url(" + link + ") no-repeat center"
                })
            }
        },

        // Method for creating controllers
        controllers: function(enable) {
            if (enable) {
                this.each(function() {
                    let id = '#' + this.id
                    $('<div/>', {
                        class: 'sb-controllers',
                        data: {
                            'sb-slider': id
                        }
                    }).appendTo(id)

                    // A loop for creating controllers
                    for (let i = 1; i <= $(id).data('slidesCount'); i++) {
                        $('<div/>', {
                            class: 'sb-controller',
                            data: {
                                'sb-slider': id,
                                'sb-controller': i
                            }
                        }).appendTo(id + ' .sb-controllers')
                    }
                })
            } else {
                this.each(function() {
                    $(this).children('.sb-controllers').remove()
                })
            }
            return enable
        },

        arrows: function(enable) {
            if (enable) {
                // Left arrow
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-left',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M45.539,63.41c0.394,0.394,0.908,0.59,1.424,0.59s1.031-0.197,1.424-0.59c0.787-0.787,0.787-2.061,0-2.848 L20.059,32.233L48.407,3.886c0.786-0.787,0.786-2.062,0-2.848c-0.787-0.787-2.062-0.787-2.849,0L15.822,30.773 c-0.205,0.206-0.384,0.506-0.484,0.778c-0.273,0.738-0.092,1.567,0.465,2.124L45.539,63.41z" /></g></svg>',
                    data: {
                        'sb-slider': this.id,
                        'sb-arrow-direction': 'left'
                    }
                }).appendTo(this)

                // Right arrow
                $('<div/>', {
                    class: 'sb-arrow sb-arrow-right',
                    html: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"><g><path fill="#da5858" stroke="#da5858" d="M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59 c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725 L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z" /></g></svg>',
                    data: {
                        'sb-slider': this.id,
                        'sb-arrow-direction': 'right'
                    }
                }).appendTo(this)
            } else {
                $(this).children('.sb-arrow').remove()
            }
            return enable
        },

        imageSize: function(imagesSizes) {
            this.each(function() {
                let slide,
                    id = '#' + this.id;

                if ("object" == typeof imagesSizes) {
                    for (let i = 1; i <= $(id).data('slidesCount'); i++) {
                        slide = $(id + ' .sb-slide').eq(i - 1)
                        if (imagesSizes.length < i) {
                            $(slide).css({
                                "background-size": imagesSizes[imagesSizes.length - 1]
                            })
                        } else {
                            $(slide).css({
                                "background-size": imagesSizes[i - 1]
                            })
                        }
                    }
                } else if ("string" == typeof imagesSizes) {
                    $(id + ' .sb-slide').css({
                        "background-size": imagesSizes
                    })
                }
            })
        },

        imagePosition: function(imagesPositions) {
            this.each(function() {
                let slide,
                    id = '#' + this.id;

                if ("object" == typeof imagesPositions) {
                    for (let i = 1; i <= $(id).data('slidesCount'); i++) {
                        if (imagesPositions.length < i) {
                            $(slide).css({
                                "background-position": imagesPositions[imagesPositions.length - 1]
                            })
                        } else {
                            $(slide).css({
                                "background-position": imagesPositions[i - 1]
                            })
                        }
                    }
                } else if ("string" == typeof imagesPositions) {
                    $(slide).css({
                        "background-position": imagesPositions
                    })
                }
            })
        },

        // This method slides to slide, that you choosed
        slideTo: function(slideTo) {
            this.each(function() {

            })
        }
    }

    $.fn.slibox = function(method = 'init') {
        // Methods Logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments)
        }
    }
})(jQuery)