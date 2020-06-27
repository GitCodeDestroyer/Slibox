$(document).ready((function() {
    $("#options-values-table").DataTable({
        lengthMenu: [-1],
        sDom: "ftr",
        oLanguage: {
            sSearchPlaceholder: "Search Here...",
            sSearch: ""
        }
    });
    (new WOW).init({
        live: !1
    });
    // $.fn.copy = function() {
    //     var e = document,
    //         t = this[0];
    //     if (e.body.createTextRange)(a = document.body.createTextRange()).moveToElementText(t), a.select();
    //     else if (window.getSelection) {
    //         var a, o = window.getSelection();
    //         (a = document.createRange()).selectNodeContents(t), o.removeAllRanges(), o.addRange(a)
    //     }
    //     document.execCommand("copy"), document.selection ? document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges()
    // };
    // $(".copy").click(function() {
    //     $(".npm .text").copy()
    // });
    // $(".copy").hover(function() {
    //     $(".npm .text").stop().animate({
    //         padding: "0 25px"
    //     }, 300)
    // }, function() {
    //     $(".npm .text").stop().animate({
    //         padding: "0 20px"
    //     }, 300)
    // });
    $("a[href*=#]:not([href=#])").click(function(e) {
        if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
            var t = $(this.hash);
            if ((t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length) return $("html,body").stop(), $("html,body").animate({
                scrollTop: t.offset().top - 51
            }, 1e3), !1
        }
    });
    $(".docs a[href*=#]:not([href=#])").click(function(e) {
        if (e.preventDefault(), location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
            var t = $(this.hash);
            if ((t = t.length ? t : $("[name=" + this.hash.slice(1) + "]")).length) return $("html,body").stop(), $("html,body").animate({
                scrollTop: t.offset().top - 100
            }, 1e3), !1
        }
    });
    let e = !1;

    function checkSections() {
        $(".section").each((function() {
            var t = $(this),
                a = t.offset().top - 70,
                o = a + t.height(),
                n = $(window).scrollTop();
            if (a < n && o > n) {
                var i = t.data("section"),
                    s = $(".nav a").filter('[href="#section-' + i + '"]');
                s.closest(".nav a").addClass("active"), s.siblings().removeClass("active")
            }
            3 == i ? (e = !0, $(".part").each((function() {
                var e = $(this),
                    t = e.offset().top - 300,
                    a = t + e.height(),
                    o = $(window).scrollTop();
                if (t < o && a > o) {
                    var n = e[0].id,
                        i = $('.sidebar a[href="#' + n + '"]');
                    i.closest(".sidebar a").addClass("active"), i.siblings().removeClass("active")
                }
            }))) : e = !1
        })), e ? $(".docs .sidebar").css({
            left: 0
        }) : $(".docs .sidebar").css({
            left: -300
        })
    }
    $(window).scroll((function(e) {
        e.preventDefault(), checkSections()
    })), checkSections()
}));