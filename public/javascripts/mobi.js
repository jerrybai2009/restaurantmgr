if (typeof Mobi == "undefined") {
    Mobi = {}
}
Mobi.getPreviewWindow = function() {
    var b = Fai.top.document.getElementById("mobiReviewPageFrame");
    var a = !b ? window : b.contentWindow;
    return a
};
Mobi.getPreviewDocument = function() {
    var a = Mobi.getPreviewWindow().document;
    return a
};
Mobi.getPreviewObject = function(a) {
    if (!a) {
        return
    }
    return Mobi.getPreviewDocument().getElementById(a)
};
Mobi.getPreviewObjectClass = function(a) {
    if (!a) {
        return
    }
    return Mobi.getPreviewDocument().getElementsByClassName(a)
};
Mobi.getJQMobi = function() {
    var b = Mobi.getPreviewWindow(),
        a = b.jm;
    return a
};
Mobi.unifiedAttrVal = function(b, d, a) {
    var c = b.find(d);
    var e = 0;
    c.each(function() {
        var f = jm(this).css(a);
        f = parseInt(f);
        if (f > e) {
            e = f
        }
    });
    c.each(function() {
        jm(this).css(a, e + "px")
    })
};
Mobi.orientationchange = function() {
    var a = "onorientationchange" in window,
        b = a ? "orientationchange" : "resize";
    window.addEventListener(b, function() {
        Mobi.orientationFunctions()
    }, false)
};
Mobi.orientationFunctions = function() {
    Mobi.logoSizeCompressByMargin();
    Mobi.titlePositionRefreshByLogo()
};
Mobi.createElementByHtml = function(a) {
    var b = document.createElement("div");
    b.innerHTML = a;
    b = b.firstChild;
    b.parentNode.removeChild(b);
    return b
};
Mobi.isNull = function(a) {
    return (typeof a == "undefined") || (a == null)
};
Mobi.addInterval = function(d, c, a) {
    if (Mobi.isNull(Mobi.intervalFunc)) {
        Mobi.intervalFunc = new Array()
    }
    for (var b = 0; b < Mobi.intervalFunc.length; ++b) {
        if (Mobi.intervalFunc[b].id == d) {
            Mobi.intervalFunc.splice(b, 1);
            break
        }
    }
    Mobi.intervalFunc.push({
        id: d,
        func: c,
        interval: a,
        type: 1
    })
};
Mobi.startInterval = function(c) {
    if (Mobi.isNull(Mobi.intervalFunc)) {
        return
    }
    for (var b = 0; b < Mobi.intervalFunc.length; ++b) {
        var a = Mobi.intervalFunc[b];
        if (c == null || a.id == c) {
            if (a.timer) {
                clearInterval(a.timer)
            }
            if (a.type == 1) {
                a.timer = setInterval(a.func, a.interval)
            } else {
                a.timer = setTimeout(a.func, a.interval)
            }
        }
    }
};
Mobi.bindTouchAndClickEvent = function(a, b) {
    if (jm.os.supportsTouch) {
        a.unbind("touchstart");
        a.bind("touchstart", b)
    } else {
        a.unbind("mousedown");
        a.bind("mousedown", b)
    }
};
Mobi.onTouchAndClickEvent = function(a, b) {
    if (jm.os.supportsTouch) {
        jm("body").off("touchstart", a);
        jm("body").on("touchstart", a, b)
    } else {
        jm("body").off("mousedown", a);
        jm("body").on("mousedown", a, b)
    }
};
Mobi.bindTransitionEnd = function(c, d) {
    if (!c) {
        return
    }
    var a = c;
    if (Object.prototype.toString.call(a) === "[object String]") {
        a = jm(c)
    }
    var b = Mobi.getTransitionEndEventName();
    a.unbind(b);
    a.bind(b, d)
};
Mobi.autoFixGWebTop = function(e) {
    var j = Mobi.webTop(),
        f = Mobi.getPreviewObject("g_web"),
        i = Mobi.getPreviewObject("webTop"),
        h = Mobi.getPreviewObject("webBodyBackground"),
        d = Mobi.getPreviewObject("webHeaderBox");
    d.style.top = "";
    i.style.top = "";
    if (e !== 2 && e !== 7 && e !== 8) {
        var c = Mobi.getPreviewObject("fk-gWebPlaceholdPT");
        if (c) {
            c.style.height = j + "px"
        } else {
            c = jm("<div id='fk-gWebPlaceholdPT' style='height:" + j + "px;'></div>");
            jm(f).prepend(c)
        }
        return
    }
    if (e == 7) {
        var b = jm("#webHeader"),
            a = Mobi.getPreviewObject("navbar");
        if (j > 0) {
            a.style.top = j + "px"
        }
        if (b.css("display") === "none") {
            return
        }
    }
    d.style.top = j + "px";
    i.style.top = j + "px";
    var c = Mobi.getPreviewObject("fk-gWebPlaceholdPT");
    if (c) {
        c.style.height = (d.offsetHeight + j) + "px"
    } else {
        c = jm("<div id='fk-gWebPlaceholdPT' style='height:" + (d.offsetHeight + j) + "px;'></div>");
        jm(f).prepend(c)
    }
};
Mobi.webTop = function() {
    var b = 0,
        a = Mobi.getPreviewObject("mobiTipsMarquee");
    if (!a) {
        return b
    } else {
        var c = Mobi.getPreviewObject("webTips").offsetHeight;
        b = c;
        return b
    }
};
Mobi.topTipMarquee = function() {
    var d = Mobi.getPreviewObject("mobiTipsMarquee");
    if (!d) {
        return false
    }
    var f = Mobi.getPreviewObjectClass("J_marquee")[0],
        j = d.querySelectorAll("li"),
        b = jm(f).width(),
        h = f.offsetWidth,
        a = false,
        c = [],
        k = 0;
    for (var e = 0; e < j.length; e++) {
        c[e] = parseInt(j[e].offsetWidth);
        if (b > c[e]) {
            k = (e == 0) ? b : parseInt(k) + c[e]
        } else {
            k = (e == 0) ? c[e] : parseInt(k) + c[e]
        }
    }
    if (j.length == 1 && c[0] < b) {} else {
        Mobi.copyTipsDom(j, d);
        a = true
    }
    if (a) {
        Mobi.initTipsMarquee(k)
    }
};
Mobi.copyTipsDom = function(h, b) {
    var a = h.length - 1,
        e = Mobi.getPreviewObjectClass("J_marqueeContainer")[0],
        f = Mobi.createElementByHtml("<ul class='marquee j-marquee J_marquee' id='J_mobiTipsMarqueeCopy'></ul>"),
        c;
    e.appendChild(f);
    for (var d = 0; d <= a; d++) {
        c = jm(h[d]).clone();
        jm(f).append(c)
    }
};
Mobi.initTipsMarquee = function(f) {
    var e = 0,
        d = Mobi.getPreviewObjectClass("J_marqueeContainer")[0],
        a = Mobi.getPreviewObject("mobiTipsMarquee"),
        b = Mobi.getPreviewObject("J_mobiTipsMarqueeCopy"),
        c;
    jm(a).addClass("j-marquee");
    jm(a).css({
        width: f + "px",
        left: "0",
        top: "0"
    });
    c = a.offsetWidth;
    jm(b).css({
        width: f + "px",
        left: c + "px",
        top: "0"
    });
    Mobi.setParentMarquee(a, b)
};
Mobi.setParentMarquee = function(b, c) {
    var a = b.offsetWidth,
        e = c.offsetWidth,
        f = a + e,
        d = Mobi.getPreviewObjectClass("J_marqueeContainer")[0],
        h = 70;
    jm(d).css({
        width: f + "px",
        left: "0",
        top: "0"
    });
    d.setAttribute("style", d.getAttribute("style") + Mobi.marqueeAnimation(f, h))
};
Mobi.marqueeAnimation = function(b, c) {
    var a = "mobi_notice_right_to_left_50";
    return "-webkit-animation: " + a + " " + b / c + "s linear 1s infinite;-moz-animation:    " + a + " " + b / c + "s linear 1s infinite;-o-animation:      " + a + " " + b / c + "s linear 1s infinite;animation:         " + a + " " + b / c + "s linear 1s infinite;"
};
Mobi.ingTigs = function(j, i) {
    var e = (j == null || j == "") ? "正在处理..." : j;
    var d = Fai.top.document.body.clientWidth;
    var a = Fai.top.document.body.clientHeight;
    var f = "";
    f = "<div id='mobiIng' class='mobiIng'></div>";
    if (jm("#mobiIng").length == 0) {
        jm(f).appendTo("body")
    }
    var b = jm("#mobiIng");
    var c = parseInt(Math.random() * 10000);
    var h = '<div id="' + c + '" class="mobiTips"><div id="mobiMsg' + c + '" class="mobiMsg">' + e + "</div></div>";
    b.find(".mobiTips").remove();
    jm("#mobiIngTigs").find(".mobiTips").remove();
    jm(h).appendTo(b);
    window.setTimeout(function() {
        b.css("visibility", "hidden");
        b.css("opacity", "0")
    }, 2500);
    window.setTimeout(function() {
        jm("#" + c).remove();
        b.css("visibility", "visible");
        b.css("opacity", "1")
    }, 3000)
};
Mobi.ing = function(n, o) {
    var e = (n == null || n == "") ? "正在处理..." : n;
    var m = "";
    if (o == "" || o == null || o == 0) {
        m = "<div class='icon-errorTigs'></div>"
    } else {
        if (o == 1) {
            m = "<div class='icon-succeedTigs'></div>"
        } else {
            if (o == -1) {
                m = ""
            }
        }
    }
    var d = Fai.top.document.body.clientWidth;
    var a = Fai.top.document.body.clientHeight;
    var j = jm("body").attr("class");
    var i = "";
    if (j.indexOf("2052") >= 0) {
        i = parseFloat(n.length);
        if (i > 13 && i < 39) {
            i = 15;
            e = n.substring(0, 13) + "<br>" + n.substring(13)
        } else {
            if (i > 39) {
                i = 15;
                e = n.substring(0, 13) + "<br>" + n.substring(13, 39) + "<br>" + n.substring(39)
            }
        }
    } else {
        i = parseFloat(n.length) / 2;
        if (i > 15) {
            var h = n.substring(0, 30).lastIndexOf(" ");
            if (n.charAt(30) != "" && i < 50) {
                if (h < 15) {
                    h = 30
                }
                e = n.substring(0, h) + "<br>" + n.substring(h)
            } else {
                if (i > 50) {
                    var f = n.substring(30, 50).lastIndexOf(" ");
                    e = n.substring(0, h) + "<br>" + n.substring(h, f) + "<br>" + n.substring(f)
                }
            }
            i = 15
        }
    }
    i += "rem";
    var k = "";
    k = "<div id='mobiIngTigs' class='mobiIngTigs'></div>";
    if (jm("#mobiIngTigs").length == 0) {
        jm(k).appendTo("body")
    }
    var b = jm("#mobiIngTigs");
    var c = parseInt(Math.random() * 10000);
    var l = '<div id="' + c + '" class="mobiTips" style=\'width:' + i + "; '><div id=\"mobiMsg" + c + '" class="mobiMsg">' + m + "<div class=''>" + e + "</div></div></div>";
    b.find(".mobiTips").remove();
    jm("#mobiIng").find(".mobiTips").remove();
    jm(l).appendTo(b);
    window.setTimeout(function() {
        b.css("visibility", "hidden");
        b.css("opacity", "0")
    }, 1500);
    window.setTimeout(function() {
        jm("#" + c).remove();
        b.remove()
    }, 2500)
};
Mobi.initForms = function() {
    var d = document.querySelector("#webModuleContainer"),
        c = d.querySelectorAll(".form");
    for (var b = 0; b < c.length; b++) {
        var a = c[b],
            e = a.getAttribute("id");
        if (e) {
            e = e.replace("module", "");
            if (a.getAttribute("_autoHeight") != 1) {
                Mobi.setModuleHeight2(e, a.clientHeight)
            }
        }
    }
};
Mobi.fixFontSizeDeviation = function() {
    var q = document.querySelector("#webModuleContainer"),
        n = q.querySelectorAll(".form");
    for (var k = 0; k < n.length; k++) {
        var f = n[k],
            e = f.getAttribute("id");
        if (e) {
            e = e.replace("module", "");
            var f = Mobi.getPreviewObject("module" + e),
                h = f.querySelector(".formBannerTitle"),
                r = f.querySelector(".formMiddleContent"),
                j = jm(f).css("margin-left"),
                d = jm(f).css("margin-right"),
                c = jm(f).css("margin-top"),
                p = jm(f).css("margin-bottom"),
                b = jm(h).css("height"),
                a = jm(r).css("margin-left"),
                o = jm(r).css("margin-right"),
                m = jm(r).css("margin-top"),
                l = jm(r).css("margin-bottom");
            if (j != "0px") {
                f.style.marginLeft = j.substring(0, j.length - 2) / _htmlFontSize + "rem"
            }
            if (d != "0px") {
                f.style.marginRight = d.substring(0, d.length - 2) / _htmlFontSize + "rem"
            }
            if (c != "0px") {
                f.style.marginTop = c.substring(0, c.length - 2) / _htmlFontSize + "rem"
            }
            if (p != "0px") {
                f.style.marginBottom = p.substring(0, p.length - 2) / _htmlFontSize + "rem"
            }
            h.style.height = b.substring(0, b.length - 2) / _htmlFontSize + "rem";
            if (a != "0px") {
                r.style.marginLeft = a.substring(0, a.length - 2) / _htmlFontSize + "rem"
            }
            if (o != "0px") {
                r.style.marginRight = o.substring(0, o.length - 2) / _htmlFontSize + "rem"
            }
            if (m != "0px") {
                r.style.marginTop = m.substring(0, m.length - 2) / _htmlFontSize + "rem"
            }
            if (l != "0px") {
                r.style.marginBottom = l.substring(0, l.length - 2) / _htmlFontSize + "rem"
            }
        }
    }
};
Mobi.topContentFixedAutoHidden = function(b) {
    if (b == 0 || b == 2) {
        var e = Mobi.getPreviewObject("webHeaderBox"),
            c = e.style.top,
            f = document.querySelector("#webTips") ? true : false,
            h = {},
            d = Mobi.getPreviewObject("g_web"),
            a = d.style.top;
        e.setAttribute("showNav", "true");
        d.style[jm.feat.cssPrefix + "Transition"] = "top 350ms";
        d.addEventListener("touchstart", function(i) {
            h.y1 = i.touches[0].pageY
        }, false);
        d.addEventListener("touchmove", function(i) {
            h.y2 = i.touches[0].pageY
        }, false);
        d.addEventListener("touchend", function(j) {
            var i = h.y1 - h.y2;
            if (i > 0) {
                if (e.getAttribute("showNav") == "true") {
                    e.setAttribute("showNav", "false");
                    e.style.opacity = 0;
                    e.style.zIndex = -1
                }
            } else {
                if (e.getAttribute("showNav") == "false") {
                    e.setAttribute("showNav", "true");
                    e.style.opacity = 1;
                    e.style.zIndex = 5
                }
            }
        }, false)
    }
};
Mobi.onlineServiceInputWord = function() {
    if (!jm.os.supportsTouch) {
        return
    }
    var f = document.querySelectorAll("input[type='text']"),
        e = document.querySelectorAll("textArea"),
        d = [],
        a = document.getElementById("webCustomerServiceBox");
    if (!a) {
        return
    }
    for (var c = 0; c < f.length; c++) {
        d.push(f[c])
    }
    for (var b = 0; b < e.length; b++) {
        d.push(e[b])
    }
    for (var c = 0; c < d.length; c++) {
        d[c].addEventListener("blur", function() {
            a.style.display = "block"
        }, false);
        d[c].addEventListener("focus", function() {
            a.style.display = "none"
        }, false)
    }
};
var ajaxDone = true;
Mobi.createFullScreenDiv = function(b, c, a) {
    if (!ajaxDone) {
        return
    }
    if (!c) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (!a) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (jm("#" + b).length > 0) {
        jm("#" + b).remove()
    }
    jm("#fullScreenDivCotainer").append("<div id='" + b + "' class='fullScreenDiv webBackground webContainerBox moduleContent categoryModel'></div>");
    jm("#" + b).css("background-image", "none");
    jm("#" + b).css("background-image", jm("#webBodyBackground").css("background-image"));
    jm.ajax({
        type: "post",
        url: "ajax/other_h.jsp?cmd=" + c,
        data: a,
        error: function() {
            Mobi.closeLoading();
            Mobi.ing(LS.systemError);
            ajaxDone = true
        },
        success: function(d) {
            var e = jm.parseJSON(d);
            if (e.success) {
                jm("#" + b).append(e.html);
                jm("#" + b).addClass("showFullScreen");
                Mobi.getPreviewObject(b).focus();
                Mobi.switchJump();
                Mobi.initModulePhotoSwipe(b)
            }
            ajaxDone = true;
            Mobi.closeLoading()
        }
    })
};
Mobi.createInnerScreenDiv = function(a, e, m, c, j) {
    if (!ajaxDone) {
        return
    }
    if (!c) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (!j) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    var l = document.getElementById("ngGroupDiv").className;
    var b = new RegExp("ngTag", "g");
    if (l.match(b)) {
        for (var d = 0; d < m; ++d) {
            if (jm("#line" + d).hasClass("ngLine-bg")) {
                jm("#line" + d).removeClass("ngLine-bg");
                break
            }
        }
        for (var d = 0; d < m; ++d) {
            jm("#ngName" + d).css({
                width: "90%"
            });
            jm("#ngMark" + d).css({
                "float": "right"
            });
            jm("#line" + d).css({
                color: "black"
            })
        }
        jm("#ngGroupDiv").removeClass("ngTag");
        jm("#ngGroupDiv").text("");
        jm("#ngGroupDiv").css({
            "margin-top": "0px"
        })
    }
    Mobi.showLoading();
    var f = document.getElementById("ngList" + a).offsetHeight;
    jm("#ngGroupDiv").addClass("ngTag");
    setTimeout(function() {
        for (var h = 0; h < m; ++h) {
            jm("#ngName" + h).css({
                width: "34%"
            });
            jm("#ngMark" + h).css({
                "float": "left"
            });
            if (e == h) {
                jm("#ngMark" + h).css("color", "white")
            } else {
                jm("#line" + h).css({
                    color: "#555555"
                });
                jm("#ngMark" + h).css({
                    color: "#555555"
                })
            }
        }
    }, 90);
    setTimeout(function() {
        jm("#line" + e).addClass("ngLine-bg");
        jm("#ngGroupDiv").css({
            "min-height": f + "px",
            "margin-top": "-" + f + "px"
        })
    }, 100);
    jm.ajax({
        type: "post",
        url: "ajax/other_h.jsp?cmd=" + c,
        data: j,
        error: function() {
            Mobi.closeLoading();
            Mobi.ing(LS.systemError);
            ajaxDone = true
        },
        success: function(h) {
            var i = jm.parseJSON(h);
            if (i.success) {
                jm("#ngGroupDiv").append(i.html)
            }
            ajaxDone = true;
            Mobi.closeLoading()
        }
    })
};
Mobi.getCommentDiv = function(c, e, d) {
    if (!c) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (isNaN(e)) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (jm("#comemtDiv").length === 0) {
        jm("#fullScreenDivCotainer").append("<div class='fullScreenDiv webContainerBox moduleContent'  style='overflow-y: scroll;background:#fff;' id='comemtDiv'></div>")
    } else {
        jm("#comemtDiv").html("")
    }
    var a = "id=" + e;
    if (!isNaN(d)) {
        a += ("&pageno=" + d)
    }
    Mobi.mobiHideScroll();
    Mobi.showLoading();
    var b = jm("html").css("font-size");
    b = b.substring(0, b.length - 2);
    jm.ajax({
        type: "post",
        url: "ajax/other_h.jsp?cmd=" + c + "&rem=" + b,
        data: a,
        error: function() {
            Mobi.closeLoading();
            Mobi.ing(LS.systemError)
        },
        success: function(f) {
            var h = jm.parseJSON(f);
            if (h.success) {
                jm("#comemtDiv").append(h.html);
                jm("#comemtDiv").addClass("showFullScreen")
            }
            Mobi.closeLoading();
            Mobi.hidePlaceholder();
            setTimeout(function() {
                var k = jm(".ct-s-content-m");
                if (typeof(k) != "undefined" && k != null) {
                    for (var l = 0; l < k.length; l++) {
                        var j = k.eq(l)[0].querySelectorAll("img");
                        if (typeof(j) != "undefined" && j != null && j.length > 0) {
                            Mobi.bindCommImgShow(j)
                        }
                    }
                }
            }, 100)
        }
    })
};
Mobi.removeCommentDiv = function() {
    Mobi.mobiShowScroll();
    jm("#comemtDiv").remove();
    window.location.reload()
};
Mobi.productGroupCollapse = function(e) {
    var d = jm("#pgBox");
    var k = jm("#pgBox2");
    var i = Mobi.getPreviewObject("group_" + groupId);
    var j = jm("#pgBox2_Item" + groupId);
    var f = jm("#pgSelect");
    var a = parseInt(d.height());
    var h = parseInt(k.height());
    var c = a > h ? a : h;
    jm("#pgBox2").children(".pgBox2Item").removeClass("pgBox2ItemCollapse");
    d.addClass("pgBoxCollapse");
    k.addClass("pgBox2Collapse");
    k.css("height", c + "px");
    j.addClass("pgBox2ItemCollapse");
    var b = parseInt(i.offsetTop) + 4;
    if (f.length > 0) {
        f.css("top", b + "px")
    } else {
        d.prepend("<div id='pgSelect' class='pgSelect' style='top:" + b + "px'></div>")
    }
    setTimeout(function() {}, 100)
};
Mobi.disableSafeMode = function() {
    var b = Fai.top.$("#mobiReviewPageFrame").attr("src"),
        d, f, e = b.indexOf("?"),
        c = Fai.top.location.href || "";
    if (e != -1) {
        d = b.substring(0, e);
        f = b.substring(e + 1);
        if (f.indexOf("_safeMode=true") > -1 && f.length > 15) {
            d += "?" + b.substring(e + 1).replace("&_safeMode=true", "").replace("_safeMode=true&", "").replace("_safeMode=true", "")
        }
    }
    Fai.top.$("#mobiReviewPageFrame").attr("src", d);
    location.hash = a(d);
    Fai.top.location.href = c.replace("_safeMode=true", "_safeMode=false");

    function a(r) {
        if (r) {
            var n = r.indexOf("#"),
                o = r.indexOf(".jsp"),
                p = r.indexOf("?"),
                q = r.substring(n + 2, o),
                h = {},
                l = "",
                j, k, m;
            if (p != -1) {
                j = r.substring(p + 1).split("&");
                for (m = 0; m < j.length; m++) {
                    if (j.length == 0) {
                        continue
                    }
                    k = j[m].split("=");
                    h[k[0]] = k[1]
                }
                l += "&data=" + jm.toJSON(h)
            }
            return "appId=" + q + l
        }
    }
};
Mobi.switchJump = function() {
    var a = jm(".switchJump");
    jm.each(a, function(c, e) {
        if (c === "length") {
            return
        }
        var b = e.getAttribute("_mu") || e.getAttribute("mJUrl");
        var d = e.getAttribute("_mColHide");
        if (b == null && !d) {
            return
        }
        if (d) {
            e.setAttribute("href", "javascript:void;");
            e.setAttribute("style", "text-decoration:none;");
            return
        }
        if (b.substring(0, 10) == "javascript") {
            e.setAttribute("href", "javascript:;");
            e.setAttribute("onclick", b.substring(11) + "return false;")
        } else {
            e.setAttribute("href", b)
        }
    })
};
Mobi.viewPageBeforeInit = function() {
    if (!Fai.top._manageMode && window.top !== window.self) {
        jm("#g_body").addClass("g_viewMode");
        jm("#webTips").css("display", "none")
    }
};
Mobi.getTransitionEndEventName = function() {
    var a, d, b = document.createElement("div"),
        c = {
            transition: "transitionend",
            OTransition: "otransitionend",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
    for (a in c) {
        if (c.hasOwnProperty(a) && b.style[a] !== d) {
            return c[a]
        }
    }
};
Mobi.prompt = function(k) {
    var f = {
        content: "",
        textClass: ""
    };
    var k = jm.extend(f, k);
    var c = Fai.top.document.body.clientWidth;
    var a = Fai.top.document.body.clientHeight;
    var i = "<div id='mobiPrompt' class='mobiPrompt'></div>",
        h = "<div id='mobiPrompt_Bg' class='mobiPrompt_Bg'></div>";
    jm(i).appendTo("body");
    jm(h).appendTo("body");
    var d = jm("#mobiPrompt"),
        j = jm("#mobiPrompt_Bg");
    var e = [];
    e.push("<div class='mobiPrompt_inner'>");
    e.push("<div class=' mobiPrompt_content'>");
    e.push("<div class=''>" + k.content + "</div>");
    e.push("<div class='J-prompt-cancel icon-mobiPromptClose'></div>");
    e.push("</div>");
    e.push("<div class=' mobiPrompt_buttons '>");
    e.push("<div class='J-prompt-cancel mobiPromptCancel icon-PromptCancel'></div>");
    e.push("<div class='J-prompt-save mobiPromptSave " + k.textClass + " icon-PromptSave'></div>");
    e.push("</div>");
    e.push("</div>");
    var b = parseInt(Math.random() * 10000);
    d.append(e.join(""));
    d.find(".J-prompt-cancel").on("click", function() {
        d.removeClass("mobiPromptShow");
        j.removeClass("mobiPromptBgShow");
        setTimeout(function() {
            d.remove();
            j.remove()
        }, 200)
    });
    if (k.callback) {
        d.find(".J-prompt-save").on("click", function() {
            k.callback()
        })
    }
    window.setTimeout(function() {
        j.addClass("mobiPromptBgShow");
        d.addClass("mobiPromptShow")
    }, 100)
};
Mobi.initWebPage = function(f) {
    var p = f.triggerId,
        s = f.panelId,
        m = f.pageHtml,
        j = f.pageHead,
        b = f.pageBg || false,
        a = f.returnSeltFun || false,
        e = f.closeWebPage,
        n = f.direction || "right",
        i = f.callback;
    var d = "";
    if (!p) {
        return
    }
    var r, h = jm("#webPagePanel" + p);
    if (h.length !== 0) {
        h.remove();
        h = jm("#webPagePanel" + p)
    }
    var l = "webPagePanelRight";
    var k = false;
    if (n === "left") {
        l = "webPagePanelLeft"
    } else {
        if (n === "top") {
            l = "webPagePanelTop"
        } else {
            if (n === "bottom") {
                l = "webPagePanelBottom"
            }
        }
    }
    var q = "";
    if (b) {
        q = "<div class='webPagePanelBg' style='z-index:999'></div>"
    }
    var d = 0;
    var c = 0;
    jm("#" + p).bind("click", function(t) {
        o();
        if (!k) {
            i && i();
            k = true
        }
        window.scrollTo(0, c)
    });
    var o = function() {
        if (h.length === 0) {
            jm("#g_web").append("<div id='webPagePanel" + p + "' class='webPagePanel' style='z-index:1000'>" + q + "</div>");
            h = jm("#webPagePanel" + p);
            if (m) {
                h.append(m);
                r = jm(m);
                r = jm("#" + r[0].id)
            } else {
                if (!s) {
                    alert("panelId is null")
                }
                r = jm("#" + s);
                h.append(r)
            }
            r.addClass(l);
            r.addClass("webPagePanel");
            h.show();
            r.show();
            setTimeout(function() {
                r.addClass("webPagePanelShow")
            });
            if (b) {
                Mobi.bindTouchAndClickEvent(jm("#webPagePanel" + p + " .webPagePanelBg"), function(y) {
                    r.removeClass("webPagePanelShow");
                    r.removeClass("webPagePanelShow");
                    jm("#g_body").css({
                        overflow: "",
                        height: "",
                        top: ""
                    });
                    jm("html").css({
                        overflow: "",
                    });
                    jm("#g_web").removeClass("gwNoScroll");
                    jm("#webPagePanel" + p).css("z-index", "-1");
                    window.scrollTo(0, c);
                    return false
                })
            }
            var v = e.split(",");
            for (var w = 0; w < v.length; w++) {
                var x = v[w].trim();
                Mobi.bindTouchAndClickEvent(jm(x), function(y) {
                    r.removeClass("webPagePanelShow");
                    jm("#g_body").css({
                        overflow: "",
                        height: "",
                        top: ""
                    });
                    jm("html").css({
                        overflow: "",
                    });
                    jm("#g_web").removeClass("gwNoScroll");
                    jm("#webPagePanel" + p).css("z-index", "-1");
                    window.scrollTo(0, c);
                    if (p == "userCommentId" || p == "postComment") {
                        jm("input,textarea").each(function(A, z) {
                            z.blur()
                        })
                    }
                    return false
                });
                jm(x).unbind("click");
                jm(x).bind("click", function() {
                    r.removeClass("webPagePanelShow");
                    jm("#g_body").css({
                        overflow: "",
                        height: "",
                        top: ""
                    });
                    jm("html").css({
                        overflow: "",
                    });
                    jm("#g_web").removeClass("gwNoScroll");
                    jm("#webPagePanel" + p).css("z-index", "-1");
                    window.scrollTo(0, c);
                    if (p == "userCommentId" || p == "postComment") {
                        jm("input,textarea").each(function(z, y) {
                            y.blur()
                        })
                    }
                    return false
                })
            }
            Mobi.bindTransitionEnd(r, function() {
                if (!r.hasClass("webPagePanelShow")) {
                    h.hide()
                }
            })
        } else {
            h.show();
            r.addClass(l);
            setTimeout(function() {
                r.addClass("webPagePanelShow")
            }, 0)
        }
        c = window.scrollY;
        var t = jm(window).height();
        var u = t + "px";
        jm("#g_body").css({
            overflow: "hidden",
            height: u,
            position: "relative",
            top: -c + "px"
        });
        h.css("height", t + "px");
        h.css("z-index", "1000");
        jm("html").css({
            overflow: "hidden"
        });
        jm("#g_web").addClass("gwNoScroll")
    };
    if (a) {
        return function() {
            o();
            if (!k) {
                i && i();
                k = true
            }
        }
    }
};
Mobi.initProductGroup = function(c, j, e) {
    if (j == 1 || c == 0) {
        return false
    }
    var a = window.innerHeight ? window.innerHeight : window.screen.height;
    var p = jm("#module22");
    var k = jm(".productNewGroup");
    var h = p.height();
    var b = jm(k).find(".J_itemImage");
    for (var f = 0; f < b.length; f++) {
        var n = b[f];
        d(n)
    }
    k.css("height", (a - h) + "px");
    k.find(".firstGroup .firstGroupItem").off(".productNewGroup");
    k.find(".firstGroup .firstGroupItem").on("click.productNewGroup", function() {
        if (jm(this).hasClass("checkedItem")) {
            return false
        }
        var i = k.find(".firstGroup .checkedItem");
        checkedItemSecondPanel = k.find(".unFirstGroup .checkedPanel");
        var q = jm(this),
            s = jm(q).attr("data-id"),
            r = jm("#sed_" + s);
        i.removeClass("checkedItem");
        checkedItemSecondPanel.removeClass("checkedPanel");
        q.addClass("checkedItem");
        r.addClass("checkedPanel")
    });
    Mobi.SimpleDrag.__create(k.find(".firstGroupList"));
    if (!e || c != 1) {
        return
    }
    var m = jm(k).find(".J_groupItem");
    var o = {
        key: "productGroup",
        targets: m,
        type: Mobi.QuickIn.TYPE.FU,
        popupWindowOption: {
            settings: {
                title: "添加图片",
                maxSize: 5,
                type: ["jpg", "jpeg", "bmp", "png", "gif"],
                imgMode: 2,
                maxChoiceList: 1,
                netFileMode: true,
                openIcon: true,
                tabIndex: 0
            },
            closeFunc: l
        }
    };

    function l(t, q) {
        if (t.length == 0 || !q.fileId || q.fileId.length == 0) {
            return
        }
        var s = parseInt(jm(t).parent().attr("data-id"));
        var i = q.fileId;
        var r = q.filePath;
        jm.ajax({
            url: "../ajax/productGroup_h.jsp?cmd=setSingle&id=" + s + "&mIcon=" + i,
            type: "get",
            error: function() {
                top.Fai.ing("服务繁忙，请稍候重试", false)
            },
            success: function(u) {
                var w = $.parseJSON(u);
                if (w.success) {
                    var x = jm(t).parent().find(".J_itemImage");
                    var v = jm(x).parent();
                    v.empty();
                    if (top.Fai.isFontIcon(i)) {
                        v.append("<span class='J_itemImage itemImage " + r + "'></span>")
                    } else {
                        v.append("<img  class='J_itemImage itemImage' src='" + r + "' data-w='" + q.fileWidth + "' data-h='" + q.fileHeight + "' />")
                    }
                    d(jm(v).find(".J_itemImage"));
                    top.Fai.ing(w.msg, true)
                } else {
                    top.Fai.ing(w.msg, true)
                }
            }
        })
    }
    Mobi.QuickIn.__createInstance(o);

    function d(q) {
        var i = parseInt(jm(q).attr("data-w")),
            r = parseInt(jm(q).attr("data-h"));
        if (i >= r) {
            jm(q).css("width", "2.8rem").css("height", "auto").css("vertical-align", "middle")
        } else {
            if (r > i) {
                jm(q).css("width", "auto").css("height", "2.9rem").css("display", "block").css("margin", "0 auto")
            }
        }
    }
};
Mobi.QuickIn = {
    TYPE: {
        FU: 1
    },
    __data: {},
    __html: {},
    __func: {},
    __createInstance: new Function()
};
(function(f, a) {
    function c() {
        if (!a.__data.init) {
            b()
        }
        a.__data.init = true
    }

    function b() {
        a.__data.count = 0;
        a.__data.init = false;
        a.__data.instances = {};
        a.__html = "<div class='quick_in' data-id='_$dataId' data-type='_$dataType'></div>"
    }
    a.__createInstance = function(i) {
        e(i)
    };

    function e(i) {
        d(i);
        h()
    }

    function d(j) {
        var m = a.__html.replace("_$dataId", a.__data.count).replace("_$dataType", j.type);
        for (var k = 0; k < j.targets.length; k++) {
            var l = j.targets[k];
            f(l).append(m)
        }
        a.__data.instances[a.__data.count] = j
    }

    function h() {
        var i = a.__data.instances[a.__data.count];
        var j;
        f(i.targets).find(".quick_in").unbind("click.quickIn").bind("click.quickIn", function(l) {
            j = f(this);
            switch (i.type) {
                case Mobi.QuickIn.TYPE.FU:
                    top.Mobi.fileUpload2("", i.popupWindowOption.settings, k);
                    break;
                default:
                    alert("not found quickIn type!");
                    break
            }

            function k(m) {
                var n = f.parseJSON(m);
                if (n) {
                    i.popupWindowOption.closeFunc(j, n.data[0])
                }
            }
        });
        f(i.targets).off(".quickIn").on("mouseenter.quickIn", function() {
            f(this).find(".quick_in").show()
        }).on("mouseleave", function() {
            f(this).find(".quick_in").hide()
        })
    }
    c()
})(jm, Mobi.QuickIn);
Mobi.SimpleDrag = {
    __data: {},
    __func: {},
    __create: new Function()
};
(function(f, c, d) {
    c.__create = function(m) {
        j(m)
    };

    function j(n) {
        var m = {};
        a(m, n);
        f(n).css("transform", "translateY(0px)");
        f(n).off(".simpleDrag");
        f(n).on("mousedown.simpleDrag", function(o) {
            b(o, m, this)
        }).on("touchstart.simpleDrag", function(o) {
            b(o, m, this)
        }).on("mouseup.simpleDrag", function(o) {
            e(o, m, this)
        }).on("touchend.simpleDrag", function(o) {
            e(o, m, this)
        }).on("mousemove.simpleDrag", function(o) {
            i(o, m, this);
            o.preventDefault()
        }).on("touchmove.simpleDrag", function(o) {
            i(o, m, this);
            o.preventDefault()
        })
    }

    function b(o, n, m) {
        n.isClicking = true;
        n.startY = k(o);
        if (n.overflowHeight != 0) {
            n.transformY = h(m)
        }
    }

    function e(p, o, n) {
        o.isClicking = false;
        o.moveY = l(o);
        var m = {};
        f(n).css("transform", "translateY(" + o.moveY + ")").css("-webkit-transform", "translateY(" + o.moveY + "px)");
        f(n).css("transition", "transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0s").css("-webkit-transition", "transform 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0s");
        setTimeout(function() {
            f(n).css("transition", "").css("-webkit-transition", "")
        }, 550)
    }

    function i(p, o, n) {
        var m = {};
        if (o.isClicking) {
            o.moveY = k(p) - o.startY;
            if (o.overflowHeight != 0) {
                o.moveY += o.transformY
            }
            if (o.moveY > o.moveOverflowRange) {
                o.moveY = o.moveOverflowRange
            } else {
                if (o.moveY < (o.overflowHeight * -1 - o.moveOverflowRange)) {
                    o.moveY = (o.overflowHeight * -1 - o.moveOverflowRange)
                }
            }
            f(n).css("transform", "translateY(" + o.moveY + ")").css("-webkit-transform", "translateY(" + o.moveY + "px)")
        }
    }

    function a(p, o) {
        var n = parseInt(f(o).parent().height()),
            m = parseInt(f(o).height());
        p.startY = 0;
        p.moveY = 0;
        p.isClicking = false;
        p.overflowHeight = m - n;
        p.transformY = h(o);
        p.moveOverflowRange = f(f(o).children()[0]).height();
        if (m < n) {
            p.overflowHeight = 0
        }
    }

    function l(m) {
        if (!!!m.moveY || m.moveY > 0) {
            return 0
        }
        if (m.moveY < 0) {
            if ((m.moveY * -1) >= m.overflowHeight) {
                return m.overflowHeight * -1
            }
        }
        return m.moveY
    }

    function k(n) {
        var m = n.clientY;
        if (n.touches) {
            m = n.touches[0].clientY
        }
        return m
    }

    function h(m) {
        if (m.length == 0) {
            return 0
        }
        var n = f(m).css("transform");
        if (!n) {
            n = f(m).css("-webkit-transform")
        }
        if (n == "none") {
            n = 0
        } else {
            n = n.replace("translateY(", "").replace(")", "");
            n = parseInt(n, 10)
        }
        if (!n) {
            n = 0
        }
        return n
    }
})(jm, Mobi.SimpleDrag);
(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(["$"], b)
    } else {
        if (typeof exports === "object") {
            module.exports = b()
        } else {
            a.Dialog = b(window.Zepto || window.jQuery || jm)
        }
    }
})(this, function(b) {
    b.fn.Dialog = function(c) {
        var d = [];
        b(this).each(function() {
            var f = new a();
            var e = b.extend({
                trigger: b(this)
            }, c);
            f.init(e);
            d.push(f)
        });
        return d
    };
    b.Dialog = function(c) {
        if (c.type === "confirm") {
            var j = new a();
            var h = '<div class="fkarea-ui-confirm-title">' + c.content + "</div>";
            var e = "";
            if (!c.buttons) {
                c.buttons = [{
                    no: "取消"
                }, {
                    yes: "完成"
                }]
            }
            var n = "";
            for (var f = 0, d = c.buttons.length; f < d; f++) {
                var k = c.buttons[f];
                if (k.no) {
                    n += '<td><button class="fkarea-ui-confirm-no" data-type="no">' + k.no + "</button></td>"
                }
                if (k.yes) {
                    n += '<td><button class="fkarea-ui-confirm-submit " data-type="yes">' + k.yes + "</button></td>"
                }
            }
            e = '<table class="fkarea-ui-dialog-action"><tr>' + n + "</tr></table>";
            h = e + h;
            var m = b.extend({
                target: h,
                animate: true,
                show: true,
                fixed: true,
                mask: true,
                className: "fkarea-ui-alert",
                afterHide: function(i) {
                    this.dispose()
                },
                beforeShow: function(i) {
                    j.touch(b(".fkarea-ui-confirm-submit", i), function() {
                        c.callback && c.callback.call(j, "yes", i);
                        b("body").css({
                            overflow: "auto"
                        })
                    });
                    j.touch(b(".fkarea-ui-confirm-no", i), function() {
                        c.callback && c.callback.call(j, "no", i);
                        b("body").css({
                            overflow: "auto"
                        })
                    })
                }
            }, c);
            j.init(m)
        }
    };
    b.confirm = function(f, e, i, d) {
        var c = {};
        var h = {
            zIndex: 100,
            type: "confirm"
        };
        if (typeof f == "object") {
            c = b.extend(h, f)
        } else {
            c = b.extend(h, {
                content: f,
                buttons: e,
                callback: i
            })
        }
        b.Dialog(b.extend(c, d))
    };
    var a = function() {
        var c = Math.random().toString().replace(".", "");
        this.id = "dialog_" + c;
        this.settings = {};
        this.settings.titleTpl = b('<div class="fkarea-ui-dialog-title"></div>');
        this.timer = null;
        this.showed = false;
        this.mask = b()
    };
    a.prototype = {
        init: function(c) {
            var e = this;
            this.settings = b.extend({
                fixed: false
            }, this.settings, c);
            if (this.settings.mask) {
                this.mask = b('<div class="fkarea-ui-dialog-mask"/>');
                b("body").append(this.mask)
            }
            b("body").append('<div class="fkarea-ui-dialog" id="' + this.id + '"></div>');
            this.dialogContainer = b("#" + this.id);
            var d = this.settings.zIndex || 10;
            this.dialogContainer.css({
                zIndex: d
            });
            if (this.settings.className) {
                this.dialogContainer.addClass(this.settings.className)
            }
            this.mask.css({
                zIndex: d - 1
            });
            if (this.settings.title) {
                this.dialogContainer.append(this.settings.titleTpl);
                this.settings.titleTpl.html(this.settings.title)
            }
            this.bindEvent();
            if (this.settings.show) {
                this.show()
            }
        },
        touch: function(f, d) {
            var c;
            b(f).on("click", e);

            function e(h) {
                return d.call(this, h)
            }
            b(f).on("touchmove", function(h) {
                c = true;
                h.preventDefault();
                h.stopPropagation()
            }).on("touchend", function(h) {
                h.preventDefault();
                if (!c) {
                    var i = d.call(this, h, "touch");
                    if (!i) {
                        h.preventDefault();
                        h.stopPropagation()
                    }
                }
                c = false
            })
        },
        bindEvent: function() {
            var c = this;
            if (this.settings.trigger) {
                b(this.settings.trigger).click(function() {
                    c.show()
                });
                c.touch(b(this.settings.trigger), function() {
                    c.show()
                })
            }
            b(this.dialogContainer).on("click", ".js-dialog-close", function() {
                c.hide();
                return false
            });
            b(this.dialogContainer).on("hide", function() {
                c.hide()
            })
        },
        dispose: function() {
            this.dialogContainer.remove();
            this.mask.remove();
            this.timer && clearInterval(this.timer)
        },
        hide: function() {
            var c = this;
            if (c.settings.beforeHide) {
                c.settings.beforeHide.call(c, c.dialogContainer)
            }
            this.showed = false;
            this.mask.hide();
            this.timer && clearInterval(this.timer);
            if (this.settings.animate) {
                this.dialogContainer.removeClass("fkarea-zoomIn").addClass("fkarea-zoomOut");
                setTimeout(function() {
                    c.dialogContainer.hide();
                    if (typeof c.settings.target === "object") {
                        b("body").append(c.dialogContainer.hide())
                    }
                    if (c.settings.afterHide) {
                        c.settings.afterHide.call(c, c.dialogContainer)
                    }
                }, 500)
            } else {
                this.dialogContainer.hide();
                if (typeof this.settings.target === "object") {
                    b("body").append(this.dialogContainer)
                }
                if (this.settings.afterHide) {
                    this.settings.afterHide.call(this, this.dialogContainer)
                }
            }
        },
        show: function() {
            if (typeof this.settings.target === "string") {
                if (/^(\.|\#\w+)/gi.test(this.settings.target)) {
                    this.dailogContent = b(this.settings.target)
                } else {
                    this.dailogContent = b("<div>" + this.settings.target + "</div>")
                }
            } else {
                this.dailogContent = this.settings.target
            }
            this.mask.show();
            this.mask.bind("touchmove", function(d) {
                d.preventDefault()
            });
            b("body").css({
                overflow: "hidden"
            });
            this.dailogContent.show();
            this.dailogContent.bind("touchmove", function(d) {
                d.preventDefault()
            });
            this.height = this.settings.height || "auto";
            this.width = this.settings.width || "auto";
            this.dialogContainer.append(this.dailogContent).show().css({
                height: this.height,
                width: this.width
            });
            if (this.settings.beforeShow) {
                this.settings.beforeShow.call(this, this.dialogContainer)
            }
            this.showed = true;
            this.setPosition();
            var c = this;
            this.timer && clearInterval(this.timer);
            if (this.settings.fixed) {
                this.timer = setInterval(function() {
                    c.setPosition()
                }, 1000)
            }
            if (this.settings.animate) {
                this.dialogContainer.addClass("fkarea-zoomIn").removeClass("fkarea-zoomOut").addClass("fkarea-animated")
            }
        },
        setPosition: function() {
            if (this.showed) {
                var k = this;
                this.dialogContainer.show();
                this.height = this.settings.height;
                this.width = this.settings.width;
                if (isNaN(this.height)) {
                    this.height = (this.dialogContainer.outerHeight && this.dialogContainer.outerHeight()) || this.dialogContainer.height()
                }
                if (isNaN(this.width)) {
                    this.width = (this.dialogContainer.outerWidth && this.dialogContainer.outerWidth()) || this.dialogContainer.width()
                }
                var e = this.settings.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var i = this.settings.clientWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var j = this.width / 2;
                var d = this.height / 2;
                var h = i / 2 - j;
                var f = e / 2 - d;
                h = Math.floor(Math.max(0, h));
                f = Math.floor(Math.max(0, f));
                var c = "absolute";
                if (k.settings.fixed) {
                    c = "fixed"
                }
                k.dialogContainer.css({
                    position: c,
                    top: f,
                    width: "100%",
                    left: 0,
                    right: 0,
                    maxWidth: "640px",
                    margin: "0px auto"
                })
            }
        }
    };
    return a
});
(function(a, b) {
    if (typeof define === "function" && define.amd) {
        define(["$", "dialog"], b)
    } else {
        if (typeof define === "function" && define.cmd) {
            define(function(e, d, f) {
                var h = e("$");
                var c = e("dialog");
                return b(h, c)
            })
        } else {
            if (typeof exports === "object") {
                module.exports = b()
            } else {
                a.MobileSelectArea = b(window.Zepto || window.jQuery || jm)
            }
        }
    }
})(this, function(c, a) {
    var b = function() {
        var d = Math.random().toString().replace(".", "");
        this.id = "scroller_" + d;
        this.scroller;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
        this.oldvalue;
        this.oldtext = [];
        this.text = ["", "", ""];
        this.level = 3;
        this.mtop = 30;
        this.separator = ""
    };
    b.prototype = {
        init: function(d) {
            this.settings = c.extend({
                eventName: "click"
            }, d);
            this.lcid = parseInt(this.settings.lcid);
            this.trigger = c(this.settings.trigger);
            this.settings.init == undefined ? this.init = 1 : this.init = 0;
            level = parseInt(this.settings.level);
            this.level = level > 0 ? level : 3;
            this.trigger.attr("readonly", "readonly");
            this.value = (this.settings.value && this.settings.value.split(",")) || [0, 0, 0];
            this.text = this.settings.text || this.trigger.val().split(" ") || ["", "", ""];
            this.oldvalue = this.value.concat([]);
            this.oldtext = this.text.concat([]);
            this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            this.bindEvent()
        },
        getData: function() {
            var d = this;
            if (typeof this.settings.data == "object") {
                this.data = this.settings.data
            }
        },
        bindEvent: function() {
            var d = this;
            this.trigger[d.settings.eventName](function(m) {
                var l = "";
                for (var k = 0; k < d.level; k++) {
                    l += "<div></div>"
                }
                if (d.lcid != 2052 && d.lcid != 1028) {
                    d.buttons = [{
                        no: "cancel"
                    }, {
                        yes: "fulfil"
                    }]
                } else {
                    d.buttons = null
                }
                c.confirm('<div class="fkarea-ui-scroller-mask"><div id="' + d.id + '" class="ui-scroller">' + l + "<p></p></div></div>", d.buttons, function(e, i) {
                    if (e == "yes") {
                        d.submit()
                    }
                    if (e == "no") {
                        d.cancel()
                    }
                    this.dispose()
                }, {
                    width: 320,
                    height: 215
                });
                d.scroller = c("#" + d.id);
                d.getData();
                d.format();
                var o = 0,
                    h = 0;
                d.scroller.children().off("mousedown.area-scroller").on("mousedown.area-scroller", n);

                function n(e) {
                    e = e || window.event;
                    o = e.pageY;
                    c(window).off("mousemove.area-scroller").on("mousemove.area-scroller", f);
                    c(window).off("mouseup.area-scroller").on("mouseup.area-scroller", j);
                    e.preventDefault()
                }

                function f(i) {
                    i = i || window.event;
                    h = i.pageY;
                    var q = h - o;
                    var e = c(i.target).parent();
                    if (e[0].nodeName != "DL") {
                        return
                    }
                    var p = parseInt(e.css("top") || 0) + q;
                    e.css("top", p + "px");
                    o = h;
                    i.preventDefault()
                }

                function j(e) {
                    e = e || window.event;
                    h = e.pageY;
                    c(window).off("mousemove.area-scroller");
                    c(window).off("mouseup.area-scroller");
                    var w = h - o;
                    var s = c(e.target).parent();
                    if (s[0].nodeName != "DL") {
                        return
                    }
                    var q = c(s.parent()).index();
                    var u = parseInt(s.css("top") || 0) + w - 30;
                    if (u > d.mtop) {
                        u = d.mtop
                    }
                    if (u < -c(s).height() + 60) {
                        u = -c(s).height() + 60
                    }
                    var v = u / d.mtop;
                    var r = Math.round(v);
                    var t = Math.abs(r) + 1;
                    if (r == 1) {
                        t = 0
                    }
                    d.value[q] = c(s.children().get(t)).attr("ref");
                    d.value[q] == 0 ? d.text[q] = "" : d.text[q] = c(s.children().get(t)).html();
                    for (var p = d.level - 1; p > q; p--) {
                        d.value[p] = 0;
                        d.text[p] = ""
                    }
                    if (!c(s.children().get(t)).hasClass("focus")) {
                        d.format()
                    }
                    c(s.children().get(t)).addClass("focus").siblings().removeClass("focus");
                    s.css("top", r * d.mtop + "px");
                    e.preventDefault()
                }
                d.scroller.children().bind("touchstart", function(i) {
                    o = (i.changedTouches || i.originalEvent.changedTouches)[0].pageY
                });
                d.scroller.children().bind("touchmove", function(r) {
                    h = (r.changedTouches || r.originalEvent.changedTouches)[0].pageY;
                    var q = h - o;
                    var i = c(r.target).parent();
                    if (i[0].nodeName != "DL") {
                        return
                    }
                    var p = parseInt(i.css("top") || 0) + q;
                    i.css("top", p + "px");
                    o = h;
                    return false
                });
                d.scroller.children().bind("touchend", function(u) {
                    h = (u.changedTouches || u.originalEvent.changedTouches)[0].pageY;
                    var x = h - o;
                    var s = c(u.target).parent();
                    if (s[0].nodeName != "DL") {
                        return
                    }
                    var q = c(s.parent()).index();
                    var v = parseInt(s.css("top") || 0) + x - 30;
                    if (v > d.mtop) {
                        v = d.mtop
                    }
                    if (v < -c(s).height() + 60) {
                        v = -c(s).height() + 60
                    }
                    var w = v / d.mtop;
                    var r = Math.round(w);
                    var t = Math.abs(r) + 1;
                    if (r == 1) {
                        t = 0
                    }
                    d.value[q] = c(s.children().get(t)).attr("ref");
                    d.value[q] == 0 ? d.text[q] = "" : d.text[q] = c(s.children().get(t)).html();
                    for (var p = d.level - 1; p > q; p--) {
                        d.value[p] = 0;
                        d.text[p] = ""
                    }
                    if (!c(s.children().get(t)).hasClass("focus")) {
                        d.format()
                    }
                    c(s.children().get(t)).addClass("focus").siblings().removeClass("focus");
                    s.css("top", r * d.mtop + "px");
                    return false
                });
                return false
            })
        },
        format: function() {
            var e = this;
            var d = e.scroller.children();
            this.f(this.data)
        },
        f: function(k) {
            var n = this;
            var r = k;
            if (!r) {
                r = []
            }
            var o = '<dl><dd ref="0">——</dd>';
            var s = 0,
                f, p = n.mtop;
            if (n.index !== 0 && n.value[n.index - 1] == "0" && this.init == 0) {
                o = '<dl><dd ref="0" class="focus">——</dd>';
                n.value[n.index] = 0;
                n.text[n.index] = "";
                s = 0
            } else {
                if (n.value[n.index] == "0") {
                    o = '<dl><dd ref="0" class="focus">——</dd>';
                    s = 0
                }
                if (r.length > 0 && this.init == 1) {
                    o = "<dl>";
                    var l = r[0].pid || 0;
                    var d = r[0].id || 0;
                    s = r[0].id;
                    if (n.lcid == 2052 || n.lcid == 1028) {
                        f = site_cityUtil.getCities(r[0].id)
                    } else {
                        f = site_cityUtil.getCitiesEn(r[0].id)
                    }
                    if (!n.value[this.index]) {
                        n.value[this.index] = d;
                        n.text[this.index] = r[0].name
                    }
                    o += '<dd pid="' + l + '" class="' + q + '" ref="' + d + '">' + r[0].name + "</dd>"
                }
                for (var i = n.init, m = r.length; i < m; i++) {
                    var l = r[i].pid || 0;
                    var d = r[i].id || 0;
                    var q = "";
                    if (n.value[n.index] == d) {
                        q = "focus";
                        s = d;
                        if (n.lcid == 2052 || n.lcid == 1028) {
                            f = site_cityUtil.getCities(r[i].id)
                        } else {
                            f = site_cityUtil.getCitiesEn(r[i].id)
                        }
                        p = n.mtop * (-(i - n.init))
                    }
                    o += '<dd pid="' + l + '" class="' + q + '" ref="' + d + '">' + r[i].name + "</dd>"
                }
            }
            o += "</dl>";
            var h = o;
            var e = n.scroller.children();
            c(e[n.index]).html(h);
            c(e[n.index]).children().css("top", p + 30 + "px");
            n.index++;
            if (n.index > n.level - 1) {
                n.index = 0;
                return
            }
            n.f(f)
        },
        submit: function() {
            this.oldvalue = this.value.concat([]);
            this.oldtext = this.text.concat([]);
            if (this.trigger[0].nodeType == 1) {
                this.trigger.val(this.text.join(this.separator));
                this.trigger.attr("data-value", this.value.join(","))
            }
            this.settings.callback && this.settings.callback.call(this, this.scroller, this.text, this.value)
        },
        cancel: function() {
            this.value = this.oldvalue.concat([]);
            this.text = this.oldtext.concat([])
        }
    };
    return b
});
Mobi.showNavItemContainer = function() {
    Mobi.hideNavItemContainer();
    var u = Mobi.getPreviewObject("navbarList"),
        b = Mobi.getPreviewObject("navbar"),
        e = u,
        s = parseInt(jm(b).width()),
        l = 0,
        k = b.querySelectorAll(".navItem"),
        t = b.querySelectorAll(".itemSep");
    for (var x = 0; x < k.length; x++) {
        l += k[x].offsetWidth
    }
    for (var v = 0; v < t.length; v++) {
        l += t[v].offsetWidth
    }
    l = l + k.length;
    if (l > s) {
        if (navigator.appVersion.match(/MSIE [\d.]+/)) {
            if (parseInt(navigator.appVersion.match(/MSIE ([\d.]+)/)[1]) === 10) {
                l = l + k.length * 2
            }
        }
        jm(e).css("width", l + "px");
        var z = jm.getCookie("startX") ? parseInt(jm.getCookie("startX")) : 0;
        if (jm.os.supportsTouch) {
            var c = new iScroll(b, {
                x: z,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                remarkXCoordinate: true,
                remarkNavLeftRight: y
            });
            y(z, c);

            function y(i, j) {
                var p = j.wrapper.querySelector(".navLeft") ? j.wrapper.querySelector(".navLeft") : j.wrapper.querySelector(".navTouchLeft"),
                    B = j.wrapper.querySelector(".navRight") ? j.wrapper.querySelector(".navRight") : j.wrapper.querySelector(".navTouchRight");
                p.className = "navTouchLeft";
                B.className = "navTouchRight";
                if (i < 0) {
                    p.style.display = "block"
                } else {
                    p.style.display = "none"
                }
                if (j.maxScrollX === j.x) {
                    B.style.display = "none"
                } else {
                    B.style.display = "block"
                }
            }
        } else {
            var q = jm(b).find(".navLeft"),
                A = jm(b).find(".navRight"),
                a = jm(b).find(".navbarList"),
                o = null;
            if (z < 0) {
                q.css("display", "block");
                jm(e).css("left", z + "px")
            }
            A.css("display", "block");
            var v = jm.getCookie("startX_p") ? parseInt(jm.getCookie("startX_p")) : 0;
            var w = 0;
            var d = 0;
            var f;
            if (jm(t[0]).css("display")) {
                f = 0
            } else {
                f = jm(b).find(".itemSep").width() / 2
            }
            var n = b.offsetLeft;
            var r = [];
            jm(b).find(".navItem").each(function(j) {
                r[j] = this.offsetLeft - n;
                w++
            });
            A.unbind("click");
            q.unbind("click");
            A.on("click", function() {
                h(this, "click")
            });
            q.on("click", function() {
                m(this, "click")
            });
            jm(b).bind("swipeLeft", function(i) {}).bind("swipeRight", function(i) {});

            function m(p, j) {
                jm(p).unbind(j);
                if (v >= r.length) {
                    v = r.length - 1
                }
                d = r[v] - r[v - 1];
                if (v == 1) {
                    d -= f
                }
                v--;
                if (v < 0) {
                    v = 0
                }
                var i = (e.offsetLeft + d);
                if (i > 0) {
                    i = 0
                }
                jm(e).css("left", i + "px");
                jm.setCookie("startX", i);
                jm.setCookie("startX_p", v);
                setTimeout(function() {
                    if ((Math.abs(e.offsetLeft) + s) < l) {
                        A.css("display", "block")
                    }
                    if (e.offsetLeft >= -1) {
                        q.css("display", "none")
                    }
                    jm(p).bind(j, function() {
                        m(this, j)
                    })
                }, 600)
            }

            function h(p, j) {
                jm(p).unbind(j);
                if (v >= r.length) {
                    v = r.length - 1
                }
                d = r[v + 1] - r[v];
                if (v == 0) {
                    d -= f
                }
                v++;
                if (v == w) {
                    v = w - 1
                }
                var i = (e.offsetLeft - d);
                if (Math.abs(i) + s > l) {
                    i = 0 - (l - s)
                }
                jm(e).css("left", i + "px");
                jm.setCookie("startX", i);
                jm.setCookie("startX_p", v);
                setTimeout(function() {
                    if (e.offsetLeft < 0) {
                        q.css("display", "block")
                    }
                    if ((Math.abs(e.offsetLeft) + s) >= l) {
                        A.css("display", "none")
                    }
                    jm(p).bind(j, function() {
                        h(this, j)
                    })
                }, 1000)
            }
        }
    }
};
Mobi.hideNavItemContainer = function() {
    jm(Mobi.getPreviewObject("navbarList")).removeAttr("style");
    jm(Mobi.getPreviewObject("navbar")).find(".navLeft").hide();
    jm(Mobi.getPreviewObject("navbar")).find(".navRight").hide()
};
Mobi.removeAllSwipeMenuClass = function() {
    a("moveAnimation");
    a("moveRight");
    jm("#navbar").removeClass("open");
    jm("#navButton").removeClass("navButtonOpen");
    jm("#navExistOffPanel").removeClass("navButtonOpen");

    function a(b) {
        jm("#webHeaderBox").removeClass(b);
        jm("#webBannerBox").removeClass(b);
        jm("#webContainerBox").removeClass(b);
        jm("#customerServiceDiv").removeClass(b);
        jm("#webFooter").removeClass(b);
        jm("#bgm_icon").removeClass(b)
    }
};
Mobi.navSwipeMenu = function(a) {
    var b = "navButton";
    c("moveAnimation");

    function c(f) {
        jm("#webBannerBox").addClass(f);
        jm("#webContainerBox").addClass(f);
        jm("#customerServiceDiv").addClass(f);
        jm("#webFooter").addClass(f);
        jm("#bgm_icon").addClass(f)
    }

    function e(f) {
        jm("#webHeaderBox").removeClass(f);
        jm("#webBannerBox").removeClass(f);
        jm("#webContainerBox").removeClass(f);
        jm("#customerServiceDiv").removeClass(f);
        jm("#webFooter").removeClass(f);
        jm("#bgm_icon").removeClass(f)
    }

    function d(h) {
        var f = Mobi.getPreviewObject("navbar").className;
        if (f.indexOf("open") !== -1) {
            jm("#navbar").removeClass("open");
            jm("#navExistOffPanel").removeClass("navPanelOpen");
            jm("#navButton").removeClass("navButtonOpen");
            e("moveRight");
            if (a === 2) {
                jm("#webTop").css("height", "")
            }
        } else {
            jm("#navbar").addClass("open");
            jm("#navExistOffPanel").addClass("navPanelOpen");
            jm("#navButton").addClass("navButtonOpen");
            c("moveRight");
            if (a === 2) {
                jm("#webTop").css("height", "100%")
            }
        }
    }
    if (a != 5 && a != 2 && a !== 8) {
        Mobi.autoSetNavBarHeight(a)
    }
    Mobi.bindTouchAndClickEvent(jm("#" + b), function() {
        d();
        return false
    });
    Mobi.bindTouchAndClickEvent(jm("#navExistOffPanel"), function() {
        d();
        return false
    })
};
Mobi.getStyle = function(a, b) {
    var c = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b)
    } else {
        if (a.currentStyle) {
            b = b.replace(/\-(\w)/g, function(d, e) {
                return e.toUpperCase()
            });
            c = a.currentStyle[b]
        }
    }
    return c
};
Mobi.getFrameHeight = function(d) {
    var c = parseInt(Mobi.getStyle(d, "padding-top").replace("px", "")) + parseInt(Mobi.getStyle(d, "padding-bottom").replace("px", ""));
    var b = parseInt(Mobi.getStyle(d, "margin-top").replace("px", "")) + parseInt(Mobi.getStyle(d, "margin-bottom").replace("px", ""));
    var a = parseInt(Mobi.getStyle(d, "border-top-width").replace("px", "")) + parseInt(Mobi.getStyle(d, "border-bottom-width").replace("px", ""));
    return a + b + c
};
Mobi.setModuleHeight2 = function(a, j) {
    var b = Mobi.getPreviewObject("module" + a);
    if (!b) {
        return
    }
    b.style.height = j / _htmlFontSize + "rem";
    var d = b.querySelector(".formBannerTitle" + a);
    var f = b.querySelector(".formMiddle");
    var h = 0;
    if (d.style.display != "none") {
        h = d.offsetHeight
    }
    var e = j - h - Mobi.getFrameHeight(f);
    f.style.height = e / _htmlFontSize + "rem";
    var i = f.querySelector(".middleCenter");
    e = e - Mobi.getFrameHeight(i);
    var c = f.querySelector(".formMiddleContent");
    e = e - Mobi.getFrameHeight(c);
    c.style.height = e / _htmlFontSize + "rem";
    c.style.overflow = "hidden"
};
Mobi.setModuleBannerHeight2 = function(d, a) {
    var c = Mobi.getPreviewObject("module" + d);
    var b = c.querySelector(".formBannerTitle");
    b.style.height = a / _htmlFontSize + "rem"
};
Mobi.msgBoardShowMsg = function(a) {
    jm(".notice").show();
    jm(".notice").html(a)
};
Mobi.msgBoardAddMsg = function(m, k) {
    var a = jm("#reqName").val();
    var h = jm("#reqPhone").val();
    var i = jm("#reqEmail").val();
    var f = jm("#reqContent").val();
    var l = jm("#msgBoardCaptcha").val();
    var b = jm(".notice").show();
    var e = 0;
    jm("input.msg_isMust").each(function() {
        var o = jm(this).attr("id");
        var p = jm(this).attr("placeholder");
        var n = jm(this).val();
        if (n == "" || n == null) {
            b.html(jm.format(LS.msgBoardInputIsEmpty, jm.encodeHtml(p)));
            Mobi.getPreviewObject(o).focus();
            e = 1;
            return false
        }
        if (o == "reqPhone" && !jm.isPhone(n)) {
            b.html(jm.format(LS.msgBoardInputCorrect, jm.encodeHtml(p)));
            Mobi.getPreviewObject(o).focus();
            e = 1;
            return false
        }
        if (o == "reqEmail" && !jm.isEmail(n)) {
            b.html(jm.format(LS.msgBoardInputCorrect, jm.encodeHtml(p)));
            Mobi.getPreviewObject(o).focus();
            e = 1;
            return false
        }
    });
    if (e == 1) {
        return false
    }
    var d = 0;
    jm("input.msg_ipt").each(function() {
        var o = jm(this).attr("id");
        var q = jm(this).attr("placeholder");
        var n = jm(this).val();
        var p = jm(this).attr("maxlength");
        if (n.length > p) {
            b.html(jm.format(LS.msgBoardInputMaxLength, jm.encodeHtml(q), p));
            d = 1;
            return false
        }
        if (o == "reqPhone" && n.length && !jm.isPhone(n)) {
            b.html(jm.format(LS.msgBoardInputCorrect, jm.encodeHtml(q)));
            Mobi.getPreviewObject(o).focus();
            d = 1;
            return false
        }
        if (o == "reqEmail" && n.length && !jm.isEmail(n)) {
            b.html(jm.format(LS.msgBoardInputCorrect, jm.encodeHtml(q)));
            Mobi.getPreviewObject(o).focus();
            d = 1;
            return false
        }
    });
    if (d == 1) {
        return false
    }
    if (f == null || f == "") {
        Mobi.msgBoardShowMsg(LS.msgBoardInputContent);
        Mobi.getPreviewObject("reqContent").focus();
        return
    }
    var c = 10000;
    if (f.length > c) {
        Mobi.msgBoardShowMsg(jm.format(LS.msgBoardInputContent2, c));
        Mobi.getPreviewObject("reqContent").focus();
        return
    }
    if (l == null || l == "") {
        Mobi.msgBoardShowMsg(LS.msgBoardInputValidateCode);
        Mobi.getPreviewObject("msgBoardCaptcha").focus();
        return
    }
    Mobi.msgBoardShowMsg(LS.msgBoardDoing);
    var j = {};
    jm("input.msg_ipt").each(function() {
        var o = jm(this).attr("id");
        var n = jm(this).val();
        j[o] = n.trim()
    });
    j.reqContent = f;
    j.memberId = (k === undefined) ? 0 : k;
    jm.ajax({
        type: "post",
        url: "ajax/msgBoard_h.jsp",
        data: "cmd=add&msgBdData=" + jm.encodeUrl(jm.toJSON(j)) + "&validateCode=" + jm.encodeUrl(l),
        error: function() {
            Mobi.msgBoardShowMsg(LS.systemError)
        },
        success: function(n) {
            n = jm.parseJSON(n);
            if (n.success) {
                if (m) {
                    Mobi.ing(LS.msgBoardSendOkAutoOpen, 1)
                } else {
                    Mobi.ing(LS.msgBoardSendOk, 1)
                }
                setTimeout(function() {
                    Fai.top.location.reload()
                }, 1500)
            } else {
                if (n.errno == 1) {
                    Mobi.msgBoardShowMsg(LS.captchaError)
                } else {
                    if (n.errno == 2) {
                        Mobi.msgBoardShowMsg(LS.argsError)
                    } else {
                        if (n.errno == -4) {
                            Mobi.msgBoardShowMsg(LS.msgBoardAddCountLimit)
                        } else {
                            Mobi.msgBoardShowMsg(LS.systemError)
                        }
                    }
                }
            }
            Mobi.changeValidateCode(jm("#msgBoardCaptchaImg"))
        }
    })
};
Mobi.noticeLeftRightMarquee = function(e, z) {
    var y = {
        direction: "up",
        speed: "normal",
        loop: "infinite",
        moveout: false,
        isScrolling: false
    };
    jm.extend(y, e);
    if (y.speed == "normal") {
        jm.extend(y, {
            speed: 70
        })
    } else {
        if (y.speed == "slow") {
            jm.extend(y, {
                speed: 40
            })
        } else {
            jm.extend(y, {
                speed: 100
            })
        }
    }
    jm("#noticeMarquee" + y.id).data("options", e);
    var m = y.id,
        v = Mobi.getPreviewObject("noticeMarquee" + m),
        h = v.offsetHeight,
        f = v.offsetWidth,
        p = 0,
        a = v.querySelectorAll(".noticeMarqueeRow>span");
    for (var r = 0; r < a.length; r++) {
        p += a[r].offsetWidth
    }
    var c = Mobi.getPreviewObject("noticeContainer" + m),
        d = c.offsetWidth,
        l = (p > d) ? p : d;
    var D = y.direction,
        C = 0,
        k = "left",
        s = y.speed,
        B = (y.loop != "infinite" || y.loop <= 0) ? 1 : y.loop,
        n = false,
        E = y.isScrolling,
        x = y.noticeType,
        A = 20,
        u = Mobi.createElementByHtml("<div id='noticeMarqueeCopy" + m + "' class='noticeMarquee' style='overflow:hidden;width:" + l + "px;' ></div>");
    var j = "<div id='noticeMarqueeNewParent" + m + "' style='position:relative;overflow:hidden;width:" + (l + d) + "px;'></div>";
    var i = Mobi.createElementByHtml("<div style='-webkit-text-size-adjust:none;position: relative;width: 100%;height:1.5rem;line-height:1.5rem;overflow: hidden;" + (x == 4 ? "" : "left: 23px;") + "'></div>");
    var o = Mobi.createElementByHtml(j);
    v.style.width = l + "px";

    function q() {
        c.appendChild(i);
        i.appendChild(o);
        o.appendChild(v);
        o.appendChild(u);
        if (!E) {
            u.style.height = 20 + "px";
            u.style.width = d + "px"
        } else {
            u.appendChild(v.querySelector(".noticeMarqueeDiv").cloneNode(true))
        }
        if (D == "left") {
            C = h
        } else {
            C = 0 - l;
            if (E && !n || !E && !n) {
                C = 0
            }
            if (E && n) {
                C = -l
            }
        }
        if (n) {
            v.style.left = 0 + "px"
        } else {
            v.style.left = C + "px"
        }
        if (D == "left" || D == "right") {
            v.style.top = 0 + "px"
        }
        b(D)
    }

    function b(F) {
        if (F == "left" || F == "right") {
            o.style.position = "relative";
            u.style.top = 0 + "px";
            if (F == "left") {
                if (E && !n) {
                    o.style.width = l * 2 + "px";
                    v.style.left = 0 + "px";
                    u.style.left = l + "px"
                }
                if (E && n) {}
                if (!E && !n) {
                    v.style.left = f + "px";
                    u.style.left = l + d + "px"
                }
                if (!E && n) {}
            } else {
                v.style.width = l + "px";
                if (E && !n) {
                    o.style.width = l * 2 + "px";
                    v.style.paddingLeft = l + "px";
                    o.style.left = -(l * 2 - d + 23) + "px"
                }
                if (E && n) {
                    o.style.width = l * 2 + "px";
                    v.style.paddingLeft = l + "px";
                    o.style.left = -(l * 2 - d + 23) + "px"
                }
                if (!E && !n) {
                    u.style.left = l + "px";
                    o.style.left = -l + "px"
                }
                if (!E && n) {
                    o.style.left = -(l + 23) + "px";
                    v.style.left = d + "px";
                    u.style.left = 0 + "px"
                }
            }
        }
    }

    function w(G, I, J, H) {
        var F;
        if (I == "left") {
            F = J ? "mobi_notice_right_to_left_50" : "mobi_notice_right_to_left"
        } else {
            if (I == "right") {
                F = J ? "mobi_notice_left_to_right_50" : "mobi_notice_left_to_right"
            }
        }
        return "-webkit-animation: " + F + " " + G / H + "s linear 1s infinite;-moz-animation:    " + F + " " + G / H + "s linear 1s infinite;-o-animation:      " + F + " " + G / H + "s linear 1s infinite;animation:         " + F + " " + G / H + "s linear 1s infinite;"
    }

    function t() {
        if (D == "left") {
            var F = o.scrollLeft;
            F++;
            if (E && !n) {
                o.setAttribute("style", o.getAttribute("style") + w(l + d, D, E, s))
            }
            if (E && n) {}
            if (!E && !n) {
                o.setAttribute("style", o.getAttribute("style") + w(l + d, D, E, s))
            }
            if (!E && n) {
                o.className += " mobi_notice_right_to_left";
                setTimeout(function() {
                    o.style.left = d + "px"
                }, 15000)
            }
        } else {
            if (D == "right") {
                var F = o.scrollLeft;
                F--;
                if (E && !n) {
                    o.setAttribute("style", o.getAttribute("style") + w(l + d, D, E, s))
                }
                if (E && n) {
                    o.className += " mobi_notice_left_to_right_50_" + s
                }
                if (!E && !n) {
                    o.setAttribute("style", o.getAttribute("style") + w(l + d, D, E, s))
                }
                if (!E && n) {
                    o.className += " mobi_notice_left_to_right_" + s;
                    setTimeout(function() {
                        o.style.left = -(d + l + 23) + "px"
                    }, 15000)
                }
            }
        }
    }
    if (e != null) {
        q();
        t()
    }
};
Mobi.saveNoticeMarqueeProps = function(a) {
    if (a != null) {
        jm("#noticeMarquee" + a.id).data("options", a)
    }
    jm("#module" + a.id).on("Fai_onModuleSizeChange", function() {
        Mobi.noticeMarquee(jm("#noticeMarquee" + a.id).data("options"), a.id)
    });
    jm("#module" + a.id).on("Fai_onModulePositionChange", function() {
        Mobi.noticeMarquee(jm("#noticeMarquee" + a.id).data("options"), a.id)
    })
};
Mobi.noticeMarqueeUpDown1 = function(c) {
    var b = {
        direction: "top",
        speed: "normal",
        stopTime: 1000
    };
    jm.extend(b, c);
    if ("fast" === b.speed) {
        jm.extend(b, {
            speed: 500
        })
    } else {
        if ("slow" === b.speed) {
            jm.extend(b, {
                speed: 1100
            })
        } else {
            jm.extend(b, {
                speed: 850
            })
        }
    }
    var h = jm("#noticeScrollbar" + b.id + " li");
    if (h.length == 1) {
        var f = jm(h.get(0));
        var a = "<li class='scrollbarLi'>" + f.html() + "</li>";
        jm(a).insertAfter(f)
    }
    jm("#noticeScrollbar" + b.id).marquee({
        yScroll: b.direction,
        showSpeed: b.speed,
        pauseSpeed: b.stopTime,
        hoverChange: false
    });
    var e = jm("#module" + b.id + " .formMiddleContent");
    e.css("overflow", "hidden");
    e.css("width", "98%");
    var d = jm("#module" + b.id + " .formMiddleCenter");
    d.css("overflow", "hidden")
};
Mobi.noticeMarqueeUpDown = function(c) {
    var w = {
        direction: "top",
        speed: "normal",
        stopTime: 1000
    };
    jm.extend(w, c);
    if ("fast" === w.speed) {
        jm.extend(w, {
            speed: 500
        })
    } else {
        if ("slow" === w.speed) {
            jm.extend(w, {
                speed: 1100
            })
        } else {
            jm.extend(w, {
                speed: 850
            })
        }
    }
    var e = Mobi.getPreviewObject("noticeScrollbar" + w.id);
    if (e.length < 1) {
        return
    }
    var s = e.style,
        h = jm(e),
        v = e.querySelectorAll("li"),
        a = v.length,
        u = "";
    if (a == 1) {
        var m = "";
        if (a == 1) {
            m = "<li class='scrollbarLi'>" + v[0].innerHTML + "</li><li class='scrollbarLi'>" + v[0].innerHTML + "</li>"
        } else {
            for (var q in v) {
                m += "<li class='scrollbarLi'>" + v[q].innerHTML + "</li>"
            }
        }
        h.append(jm(m))
    } else {
        if (w.direction == "top") {
            u = "<li class='scrollbarLi'>" + v[a - 1].innerHTML + "</li>";
            e.insertBefore(jm(u)[0], e.getElementsByClassName("scrollbarLi")[0])
        } else {
            u = "<li class='scrollbarLi'>" + v[0].innerHTML + "</li>";
            h.append(u)
        }
    }
    v = e.querySelectorAll("li");
    s[jm.feat.cssPrefix + "TransitionProperty"] = "top";
    s[jm.feat.cssPrefix + "TransitionTimingFunction"] = "ease";
    e.parentNode.style.height = v[0].offsetHeight + "px";
    var o = [];
    for (var t = 0; t < v.length; t++) {
        o[t] = v[t].offsetTop
    }
    if (w.direction == "top") {
        o.reverse()
    }
    e.style.top = -o[0] + "px";
    Mobi.noticeMarqueetimeIds = Mobi.noticeMarqueetimeIds || {};
    var p = Mobi.noticeMarqueetimeIds["scroll" + w.id];
    if (p >= 0) {
        clearTimeout(p)
    }
    var r = o.length - 1,
        d = o.length,
        b = w.speed + "ms",
        f = 0,
        l = jm.feat.cssPrefix + "TransitionDuration";
    if (v.length > 1) {
        n()
    }

    function n() {
        if (r < d) {
            if (r) {
                s[l] = b;
                f = w.stopTime + w.speed
            } else {
                s[l] = "0ms";
                f = 25
            }
            s.top = -o[r] + "px";
            r++
        } else {
            r = 0;
            f = 0
        }
        Mobi.getPreviewWindow().Mobi.noticeMarqueetimeIds["scroll" + w.id] = setTimeout(n, f)
    }
};
Mobi.noticeUpDownSizeChange = function(d) {
    var b = jm("#noticeMarquee" + d),
        a = b.height(),
        c = b.children().children();
    jm.each(c, function(e, f) {
        jm(f).css("top", -(a + 2) + "px")
    });
    jm("#noticeScrollbar" + d).removeData("_innerHeight")
};
Mobi.siteFormAdd = function(a, p, n, e, c) {
    var h = [];
    var o = n;
    var b = true;
    var k = 100;
    var d = 1000;
    var m = e;
    var l = jm("#M" + a + "F" + p + "siteFormValidateCode");
    var i = l.val();
    var j = [];
    if (o.length > 0) {
        jm.each(o, function(D, B) {
            if (B.hide) {
                return true
            }
            var y = B.id;
            var J = B.name;
            var z = B.must;
            var u = B.type;
            var F = {};
            F.id = y;
            F.type = u;
            if (u == 0) {
                var H = jm("#M" + a + "F" + p + "siteFormInput" + y).val();
                if (z && H == "") {
                    Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                    b = false;
                    return false
                }
                if (H.length > k) {
                    Mobi.ing(jm.format(LS.siteFormSubmitInputMaxLength, jm.encodeHtml(J), k));
                    b = false;
                    return false
                }
                F.val = H
            } else {
                if (u == 1) {
                    var q = jm("#M" + a + "F" + p + "siteFormTextArea" + y).val();
                    if (z && q == "") {
                        Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                        b = false;
                        return false
                    }
                    if (q.length > d) {
                        Mobi.ing(jm.format(LS.siteFormSubmitInputMaxLength, jm.encodeHtml(J), d));
                        b = false;
                        return false
                    }
                    F.val = q
                } else {
                    if (u == 2) {
                        var v = document.querySelectorAll("input[name='M" + a + "F" + p + "siteFormRadioR" + y + "']:checked");
                        if (z && v.length == 0) {
                            Mobi.ing(jm.format(LS.siteFormSubmitCheckIsEmpty, jm.encodeHtml(J)));
                            b = false;
                            return false
                        }
                        if (v.length > 0) {
                            F.val = v[0].value
                        } else {
                            F.val = ""
                        }
                    } else {
                        if (u == 3) {
                            var w = document.querySelectorAll("input[name='M" + a + "F" + p + "siteFormCheckboxR" + y + "']:checked");
                            if (z && w.length == 0) {
                                Mobi.ing(jm.format(LS.siteFormSubmitCheckIsEmpty, jm.encodeHtml(J)));
                                b = false;
                                return false
                            }
                            var C = [];
                            for (var D = 0; D < w.length; D++) {
                                C.push(w[D].value)
                            }
                            F.val = C.join("\n")
                        } else {
                            if (u == 4) {
                                var x = document.getElementById("M" + a + "F" + p + "siteFormSelect" + y),
                                    A = x.options[x.selectedIndex].value;
                                if (z && (A.length == 0 || A == "none")) {
                                    Mobi.ing(jm.format(LS.siteFormSubmitCheckIsEmpty, jm.encodeHtml(J)));
                                    b = false;
                                    return false
                                }
                                F.val = A
                            } else {
                                if (u == 5) {
                                    return true
                                } else {
                                    if (u == 6) {
                                        var H = jm("#Mobi" + a + "Calendar" + y + "Pluginsinput").val();
                                        if (z && H == "") {
                                            Mobi.ing(jm.format(LS.siteFormSubmitCheckIsEmpty, jm.encodeHtml(J)));
                                            b = false;
                                            return false
                                        }
                                        F.val = H
                                    } else {
                                        if (u == 7) {
                                            var r = jm("#module" + a).find("#siteForm" + a + "fileName" + y);
                                            var G = {};
                                            if (z && r.attr("_tmpFileId") == "") {
                                                Mobi.ing("请选择文件上传");
                                                b = false;
                                                return false
                                            }
                                            if (r.attr("_tmpFileId") == "") {
                                                F.val = ""
                                            } else {
                                                F.val = r.attr("_fileId");
                                                G.tmpFileName = r.attr("_tmpFileName");
                                                G.fileId = F.val;
                                                G.tmpFileId = r.attr("_tmpFileId");
                                                j.push(G)
                                            }
                                        } else {
                                            if (u == 8) {
                                                var I = jm("#M" + a + "F" + p + "siteFormPhoneInput" + y).val();
                                                if (z && I == "") {
                                                    Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                                                    b = false;
                                                    return false
                                                }
                                                if (!Mobi.isNationMobile(I)) {
                                                    Mobi.ing(LS.mobileNumRegular);
                                                    b = false;
                                                    return false
                                                }
                                                F.val = I
                                            } else {
                                                if (u == 9) {
                                                    var E = jm("#M" + a + "F" + p + "siteFormMailInput" + y).val();
                                                    if (z && E == "") {
                                                        Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                                                        b = false;
                                                        return false
                                                    }
                                                    if (!jm.isEmail(E)) {
                                                        Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, jm.encodeHtml(J)));
                                                        b = false;
                                                        return false
                                                    }
                                                    F.val = E
                                                } else {
                                                    if (u == 10) {
                                                        var t = jm("#M" + a + "F" + p + "siteFormIndentityInput" + y).val();
                                                        if (z && t == "") {
                                                            Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                                                            b = false;
                                                            return false
                                                        }
                                                        if (!jm.isCardNo(t)) {
                                                            Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, jm.encodeHtml(J)));
                                                            b = false;
                                                            return false
                                                        }
                                                        F.val = t
                                                    } else {
                                                        if (u == 11) {
                                                            var s = jm("#M" + a + "F" + p + "siteFormAddressInput" + y).val();
                                                            if (z && s == "") {
                                                                Mobi.ing(jm.format(LS.siteFormSubmitInputIsEmpty, jm.encodeHtml(J)));
                                                                b = false;
                                                                return false
                                                            }
                                                            F.val = s
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            h.push(F)
        })
    }
    if (!b) {
        return false
    }
    if (m && i == "") {
        Mobi.ing(jm.format(l.attr("msg")));
        b = false;
        return false
    }
    var f = "&submitContentList=" + jm.encodeUrl(jm.toJSON(h));
    Mobi.ing(LS.siteFormSubmitIng, -1);
    jm.ajax({
        type: "post",
        url: "ajax/mobiForm_h.jsp",
        data: "cmd=addSubmit&formId=" + p + "&submitContentList=" + jm.encodeUrl(jm.toJSON(h)) + "&vCodeId=" + a + p + "&validateCode=" + i + "&tmpFileList=" + jm.encodeUrl(jm.toJSON(j)),
        error: function() {
            Mobi.ing(LS.systemError)
        },
        success: function(q) {
            q = jm.parseJSON(q);
            if (q.success) {
                Mobi.ing(LS.siteFormSubmitOk, 1);
                jm("#M" + a + "F" + p + "siteFormAddButton").attr("disabled", true);
                setTimeout(function() {
                    if (!c) {
                        c = "index.jsp"
                    }
                    location.href = c
                }, 2500)
            } else {
                if (q.rt == -4) {
                    Mobi.ing(LS.siteFormSubmitCountLimit)
                } else {
                    if (q.rt == -401) {
                        Mobi.ing(LS.siteFormSubmitValidateCodeErr);
                        jm("#M" + a + "F" + p + "siteFormValidateCode").val("");
                        Mobi.siteFormValidation(p, a)
                    } else {
                        Mobi.ing(LS.systemError)
                    }
                }
            }
        }
    })
};
Mobi.siteFormNotLogin = function(d, c) {
    var b = jm.encodeUrl(Fai.top.location.href);
    var a = LS.siteFormSubmitNotLogin + LS.login + LS.period;
    Mobi.ing(a)
};
Mobi.siteFormValidation = function(b, a) {
    jm("#M" + a + "F" + b + "validateCodeImg").attr("src", "validateCode.jsp?" + parseInt(Math.random() * 1000) + "&vCodeId=" + a + b)
};
Mobi.siteFormFileUpload = function(c, f, n, j, d, a, b, i) {
    var m = jm(".uploadify-button").height();
    var k = jm(".uploadify-button").width();
    var l = jm(".uploadify-button").css("font-size");
    var o = {
        file_post_name: "Filedata",
        upload_url: "/ajax/upsiteimg_h.jsp",
        button_placeholder_id: "siteForm" + d + "fileUpload" + n,
        file_size_limit: f + "MB",
        button_image_type: 5,
        button_height: m,
        button_width: k,
        button_text: "<span class='fk_m_btText'>" + i + "</span>",
        button_text_style: ".fk_m_btText{text-align:center;font-family: 微软雅黑; color: #666666;font-size:" + l + "}",
        button_text_top_padding: 10,
        file_queue_limit: 1,
        requeue_on_error: false,
        post_params: {
            ctrl: "Filedata",
            app: 21,
            type: 0,
            isSiteForm: true
        },
        file_types: a.join(""),
        file_dialog_complete_handler: function(p) {
            this._allSuccess = false;
            this.startUpload()
        },
        file_queue_error_handler: function(q, p, r) {
            switch (p) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    Mobi.ing(LS.siteFormSubmitCheckFileSizeErr, true);
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    Mobi.ing("不允许的文件类型", true);
                    break;
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    Mobi.ing("一次只能上传一个文件", true);
                    break;
                default:
                    Mobi.ing("请重新选择文件上传。", true);
                    break
            }
        },
        upload_success_handler: function(q, p) {
            var r = jQuery.parseJSON(p);
            this._allSuccess = r.success;
            this._sysResult = r.msg;
            if (r.success) {
                setTimeout(function() {
                    Mobi.ing("文件上传成功", true)
                }, 2000);
                Mobi.onFileUploadEvent("upload", r, d, n)
            } else {
                Mobi.ing("文件" + q.name + "，" + r.msg)
            }
        },
        upload_error_handler: function(q, p, r) {
            if (p == -280) {
                Mobi.ing("文件取消成功", false)
            } else {
                if (p == -270) {
                    Mobi.ing("已经存在名称为" + q.name + "的文件。", true)
                } else {
                    Mobi.ing("服务繁忙，文件" + q.name + "上传失败，请稍候重试。")
                }
            }
        },
        upload_complete_handler: function(p) {
            if (p.filestatus == SWFUpload.FILE_STATUS.COMPLETE) {
                setTimeout(function() {
                    swfObj.startUpload()
                }, swfObj.upload_delay)
            } else {
                if (p.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                    Mobi.ing("服务繁忙，文件" + p.name + "上传失败，请稍候重试。")
                }
            }
        },
        upload_start_handler: function(p) {
            Mobi.ing("读取文件准备上传", false)
        },
        view_progress: function(p, s, r, q) {
            var q = Math.ceil((s / r) * 100);
            if (q == 100) {
                Mobi.ing("正在上传" + q + "%", true)
            } else {
                Mobi.ing("正在上传" + q + "%", false)
            }
        }
    };
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.src = c;
    e.onload = function() {
        var p = document.createElement("script");
        p.src = b;
        p.type = "text/javascript";
        h.appendChild(p);
        p.onload = function() {
            swfObj = SWFUploadCreator.create(o);
            jm(".swfupload").css("vertical-align", "middle")
        }
    };
    var h = document.documentElement || document.body;
    h.appendChild(e)
};
Mobi.siteFormFileUploadHtml = function(p, d, a, l, o, n, h, b, c, j, m) {
    var k = {
        siteFree: n,
        updateUrlViewRes: "updateUrlViewRes",
        auto: true,
        fileTypeExts: a.join(""),
        multi: false,
        fileSizeLimit: h * 1024 * 1024,
        breakPoints: true,
        saveInfoLocal: false,
        showUploadedPercent: true,
        showUploadedSize: true,
        removeTimeout: 9999999,
        post_params: {
            app: 21,
            type: 0
        },
        isDefinedButton: true,
        buttonText: m,
        getFileSizeUrl: "http://" + j + "/ajax/advanceUpload.jsp?cmd=_getUploadSize",
        uploader: "http://" + j + "/ajax/advanceUpload.jsp?cmd=_mobiupload",
        onUploadStart: function(q) {
            _uTime = new Date().getTime()
        },
        onUploadSuccess: function(r, t) {
            var s = jQuery.parseJSON(t);
            if (s.success) {
                var q = {
                    status: "end",
                    id: r.id,
                    title: "上传成功。"
                };
                i(q);
                Mobi.onFileUploadEvent("upload", s, d, p);
                setTimeout(function() {
                    Mobi.ing("文件上传成功", true)
                }, 2000)
            } else {
                var q = {
                    status: "end",
                    id: r.id,
                    title: s.msg
                };
                i(q);
                Mobi.ing("文件:" + r.name + "，" + s.msg)
            }
        },
        onUploadError: function(q, r) {
            $("#progressBody_ " + q.id).remove();
            $("#progressWrap_" + q.id).remove();
            Mobi.ing("网络繁忙，文件:" + q.name + "上传失败，请稍后重试");
            _uTime = new Date().getTime() - _uTime
        },
        onSelect: function() {
            if (l) {
                Mobi.ing("已超过资源库容量限制，请升级网站版本。");
                return false
            } else {
                return true
            }
        },
        view_progress: function(q) {
            var q = Math.ceil(q);
            if (q == 100) {
                Mobi.ing("正在上传" + q + "%", true)
            } else {
                Mobi.ing("正在上传" + q + "%", false)
            }
        }
    };

    function i(q) {
        if (q.status == "start") {
            var r = ['<div id="progressBody_' + q.id + '" class="bodyDisable"></div>', '<div id="progressWrap_' + q.id + '" class="bodyProgressWrap">', '<div class="progressCenter"></div>', '<div class="progressIngBody">', '<div id="progressTitle' + q.id + '" class="progressIngTitle">' + q.title + "</div>", '<div class="progressIngMission">', '<div class="mission"><div id="progress' + q.id + '" class="progress" style="width:1%;"></div></div>', '<div id="progressNum' + q.id + '" class="progressNum">0%</div>', "</div>", '<div class="progressInfo"><span id="progressTips' + q.id + '" class="progressFileSize"></span><a class="progressCancel" href="javascript:uploadCancel(\'' + q.id + "');\">取消</a></div>", "</div>", "</div>"];
            $("body").append(r.join(""))
        } else {
            if (q.status == "ing") {
                $("#progressTitle" + q.id).text(q.title);
                $("#progress" + q.id).css("width", Math.round(q.percent) + "%");
                $("#progressNum" + q.id).html(Math.round(q.percent) + "%")
            } else {
                if (q.status == "end") {
                    $("#progressTitle" + q.id).text(q.title);
                    $("#progressBody_" + q.id).remove();
                    $("#progressWrap_" + q.id).remove()
                } else {
                    if (q.status == "error") {
                        $("#progress" + q.id).addClass("progressError")
                    }
                }
            }
        }
    }
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.src = b;
    e.onload = function() {
        var q = document.createElement("script");
        q.src = c;
        q.type = "text/javascript";
        f.appendChild(q);
        q.onload = function() {
            upload = jm("#uploadButton" + d + p).uploadify(k)
        }
    };
    var f = document.documentElement || document.body;
    f.appendChild(e)
};
Mobi.onFileUploadEvent = function(o, l, p, i) {
    if (o == "upload") {
        var e = l.id;
        var n = l.name;
        var c = l.type;
        var k = l.size;
        var j = l.path;
        var d = l.createTime;
        var a = l.groupId;
        var f = "";
        var b = 100;
        var m = 100;
        var h = l.fileId;
        $("#module" + p).find("#siteForm" + p + "fileName" + i).html(n);
        $("#module" + p).find("#siteForm" + p + "fileName" + i).attr("_tmpFileId", e).attr("_tmpFileName", n).attr("title", n).attr("_fileId", h)
    }
};
Mobi.fixMobiFormDropdownItem = function(c, b, a) {
    jm(jm("#M" + c + "F" + b + "siteFormSelect" + a + "").find("option")[0]).hide()
};
Mobi.fixIphoneStyle = function(c, b) {
    var a = navigator.userAgent;
    if (a.indexOf("iPhone") > -1) {
        jm("#module" + b + "").find(".F" + c + "siteFormItemShowVal").find("textArea").css({
            width: "90%"
        });
        jm("#module" + b + "").find(".F" + c + "siteFormItemShowVal").find("select").css({
            width: "91%",
            height: "2rem"
        })
    }
};
Mobi.siteFormSelectArea = function(c, e, d, b) {
    var f;
    if (b == 2052 || b == 1028) {
        f = site_cityUtil.getProvince()
    } else {
        f = site_cityUtil.getProvinceEn()
    }
    var a = new MobileSelectArea();
    a.init({
        lcid: b,
        trigger: "#M" + d + "F" + e + "siteFormAddressInput" + c + "",
        value: jm("#M" + d + "F" + e + "siteFormAddressInput" + c + "").data("value"),
        data: f,
        eventName: "click",
        init: 0
    })
};
Mobi.voidFun = function() {};
Mobi.codeInsertButtom = function(d) {
    var b = /document.write/g;
    d = d.replace(b, "Mobi.voidFun");
    var a = document.createElement("script");
    a.type = "text/javascript";
    try {
        a.appendChild(document.createTextNode(d))
    } catch (c) {
        a.text = d
    }
    document.body.appendChild(a)
};
Mobi.memberLogin1 = function(a) {
    Fai.top.location.href = "login.jsp?returnUrl=" + jm.encodeUrl(jm.getUrlRoot(Fai.top.location.href)) + "&errno=" + a
};
Mobi.memberLogin = function(url, mid, fid) {
    var acct = jm("#user").val();
    var pwd = jm("#password").val();
    var needCaptcha = (jm(".loginCaptchaCtrl").css("display") != "none");
    var captcha = jm("#loginCaptcha").val();
    if (mid != null && fid != null) {
        jm.cookie("_moduleid", mid);
        jm.cookie("_fileid", fid)
    }
    if (acct == null || acct == "") {
        Mobi.showMemberLoginMsg(1, false);
        return
    }
    if (pwd == null || pwd == "") {
        Mobi.showMemberLoginMsg(2, false);
        return
    }
    if (needCaptcha && (captcha == null || captcha == "")) {
        Mobi.showMemberLoginMsg(3, false);
        return
    }
    pwd = jm.md5(pwd);
    var loginBtn = jm(".loginSubmit");
    loginBtn.attr("disabled", true);
    jm(".g_botton").removeClass("sendIcon");
    var autoLoginBtn = jm("#autoLogin");
    var autoLogin = false;
    if (autoLoginBtn && autoLoginBtn.prop("checked")) {
        autoLogin = true
    }
    jm.ajax({
        type: "post",
        url: "ajax/login_h.jsp",
        data: "cmd=loginMember&acct=" + jm.encodeUrl(acct) + "&pwd=" + jm.encodeUrl(pwd) + "&captcha=" + jm.encodeUrl(captcha) + "&autoLogin=" + autoLogin,
        error: function() {
            loginBtn.removeAttr("disabled");
            Mobi.showMemberLoginMsg(-1)
        },
        success: function(result) {
            loginBtn.removeAttr("disabled");
            if (result.msg) {
                delete result.msg
            }
            var result = jm.parseJSON(result);
            if (result.success) {
                jm("#_TOKEN").attr("value") || jm("#g_web").append("<span id='_TOKEN' value='" + result._TOKEN + "'></span>");
                if (url.indexOf("javascript") == -1) {
                    Fai.top.location.href = url;
                    return
                } else {
                    var methods = url.split(";");
                    for (var i = 0; i < methods.length - 1; i++) {
                        var patt1 = new RegExp("[^script:]");
                        if (patt1.test(url)) {
                            var cells = methods[i].split(":"),
                                start = cells[1].indexOf("(") + 1,
                                end = cells[1].lastIndexOf(")"),
                                plist = Array.prototype.slice.call(cells[1].substring(start, end).split(","));
                            namespace = cells[1].substring(0, start - 1);
                            eval(cells[1]);
                            if (url.indexOf("PhotoDetailSwipeForJumpCtrl") != -1) {
                                window.klass.returnIndex = function() {
                                    Fai.top.location.href = "/index.jsp"
                                }
                            }
                        }
                    }
                }
            } else {
                jm(".g_botton").addClass("sendIcon");
                jm(".loginIcon ").hide();
                if (result.active) {
                    Mobi.ing(LS.memberLoginMailActivation)
                } else {
                    Mobi.showMemberLoginMsg(result.rt, result.captcha)
                }
            }
        }
    })
};
Mobi.showMemberLoginMsg = function(c, b) {
    var d = "";
    if (c == 1) {
        d = LS.memberInputAcct;
        Mobi.getPreviewObject("user").focus()
    } else {
        if (c == 2) {
            d = LS.memberInputPwd;
            Mobi.getPreviewObject("password").focus()
        } else {
            if (c == 3) {
                d = LS.memberInputCaptcha
            } else {
                if (c == 11) {
                    d = LS.memberLoginFirst
                } else {
                    if (c == 12) {
                        d = LS.memberLoginSignup
                    } else {
                        if (c == 13) {
                            d = LS.memberLoginToView
                        } else {
                            if (c == 14) {
                                d = LS.memberLoginNoPermission
                            } else {
                                if (c == -3) {
                                    d = LS.memberPwdError
                                } else {
                                    if (c == -301) {
                                        d = LS.memberCaptchError
                                    } else {
                                        if (c == -302) {
                                            d = LS.memberPwdError
                                        } else {
                                            if (c == -303) {
                                                d = LS.memberNoAuth
                                            } else {
                                                if (c == -305) {
                                                    d = LS.memberPwdError
                                                } else {
                                                    d = LS.memberLoginError
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var a = jm(".loginErrorLine");
    a.show();
    Mobi.ing(d);
    if (b) {
        jm(".loginCaptchaCtrl").show();
        jm("#loginCaptchaImg").attr("src", "validateCode.jsp?" + Math.random() * 1000)
    }
    setTimeout(function() {
        a.hide()
    }, 3000)
};
Mobi.changeValidateCode = function(a) {
    jm(a).attr("src", "validateCode.jsp?" + Math.random() * 1000)
};
Mobi.onLogout = function(a) {
    if (a == null) {
        a = "index.jsp"
    }
    jm.ajax({
        type: "post",
        url: "ajax/login_h.jsp?cmd=logoutMember",
        error: function() {},
        success: function(b) {
            var b = jm.parseJSON(b);
            if (b.success) {
                location.href = a;
                return
            }
        }
    })
};
Mobi.initWBLogin = function(f, d, b, a, c, e) {
    jm("#" + e).click(function() {
        window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=" + f + "&redirect_uri=" + d + "/wbLogin.jsp&display=mobile&response_type=code"
    })
};
Mobi.wbWinListener = function(f, e, i, c, d, a, b) {
    var h = Mobi.checkHasMobileOption(jm.parseJSON(f));
    jm.ajax({
        type: "post",
        url: "ajax/login_h.jsp?cmd=otherLoginMember&hasMobile=" + h,
        data: "loginType=2&openId=" + c,
        error: function() {
            Mobi.ing(LS.memberLoginError, true)
        },
        success: function(j) {
            var j = jm.parseJSON(j);
            if (j.success) {
                Fai.top.location.href = "/index.jsp";
                return
            } else {
                if (j.active) {
                    Mobi.memberActive(j.email, j.memName)
                } else {
                    if (j.rt == -3) {
                        Mobi.memberOtherLoginAdd(d, c, a, jm.parseJSON(f), e, i, 2, j.mobileCtNameList, j.signNeenMobile, b)
                    } else {
                        if (j.rt == -303) {
                            Mobi.ing(LS.memberNoAuth, true)
                        } else {
                            Mobi.ing(LS.argsError, true)
                        }
                    }
                }
            }
        }
    })
};
Mobi.initQQLogin = function(f, d, b, a, c, e) {
    jm("#" + e).click(function() {
        window.location.href = "https://graph.qq.com/oauth2.0/authorize?client_id=" + f + "&redirect_uri=" + d + "/qqLogin.jsp&display=mobile&response_type=token&scope=all"
    })
};
Mobi.qqWinListener = function(optionList, noRemark, remarkMaxLen, q_uid, q_name, q_avator, url) {
    var hasMobile = Mobi.checkHasMobileOption(jm.parseJSON(optionList));
    jm.ajax({
        type: "post",
        url: "ajax/login_h.jsp?cmd=otherLoginMember&hasMobile=" + hasMobile,
        data: "loginType=1&openId=" + q_uid,
        error: function() {
            Mobi.ing(LS.memberLoginError, true)
        },
        success: function(result) {
            var result = jm.parseJSON(result);
            if (result.success) {
                if (url.indexOf("javascript") == -1) {
                    Fai.top.location.href = url;
                    return
                } else {
                    var methods = url.split(";");
                    for (var i = 0; i < methods.length - 1; i++) {
                        var patt1 = new RegExp("[^script:]");
                        if (patt1.test(url)) {
                            var cells = methods[i].split(":"),
                                start = cells[1].indexOf("(") + 1,
                                end = cells[1].lastIndexOf(")"),
                                plist = Array.prototype.slice.call(cells[1].substring(start, end).split(","));
                            namespace = cells[1].substring(0, start - 1);
                            eval(cells[1]);
                            if (url.indexOf("PhotoDetailSwipeForJumpCtrl") != -1) {
                                window.klass.returnIndex = function() {
                                    Fai.top.location.href = "/index.jsp"
                                }
                            }
                        }
                    }
                }
            } else {
                if (result.active) {
                    Mobi.memberActive(result.email, result.memName)
                } else {
                    if (result.rt == -3) {
                        Mobi.memberOtherLoginAdd(q_name, q_uid, q_avator, jm.parseJSON(optionList), noRemark, remarkMaxLen, 1, result.mobileCtNameList, result.signNeenMobile, url)
                    } else {
                        if (result.rt == -303) {
                            Mobi.ing(LS.memberNoAuth, true)
                        } else {
                            Mobi.ing(LS.argsError, true)
                        }
                    }
                }
            }
        }
    })
};
Mobi.memberOtherLoginAdd = function(b, c, k, j, d, e, i, f, h, a) {
    var l = [];
    l.push("<div style='height:5rem;'>");
    if (i == 1) {
        l.push("<div class='avator' style='height:2.5rem;width:2.5rem;margin-top:1rem;margin-left:6.2rem;border-radius:50%;background:url(" + k + ");background-size:2.5rem;'></div>")
    } else {
        l.push("<div class='avator' style='height:1.2rem;width:1.2rem;margin-top:1rem;margin-left:6.6rem;border-radius:50%;background:url(" + k + ");background-size:1.2rem;'></div>")
    }
    l.push("<div class='userName' style='margin-top:0.5rem;'>" + b + "</div>");
    l.push("</div>");
    l.push("<div class='desc' style='height:3rem;font-size:0.6rem;color:#666;'>");
    if (i == 1) {
        l.push("<div class='firstLine' style='width:4.5rem;'>" + LS.memberOtherLgnQQUser + ":</div>")
    } else {
        l.push("<div class='firstLine' style='width:5.8rem;'>" + LS.memberOtherLgnWBUser + ":</div>")
    }
    l.push("<div class='secondLine' style='width:13rem;margin-top:0.5rem;'>" + LS.memberOtherLgnBindAcctMsg + "</div>");
    l.push("</div>");
    l.push("<div class='choose' style='font-size:0.6rem;color:#999;height:7rem;'>");
    l.push("<div class='haveMember' style='width:3rem;'>" + LS.memberOtherLgnHaveAcct + "</div>");
    l.push("<div class='bindNow g_button sendIcon' style='margin-bottom:1rem;' onclick='Mobi.bindNow(" + i + ', "' + c + '", "' + a + "\");'>" + LS.memberOtherLgnBindNow + "</div>");
    l.push("<div class='noMember' style='width:3rem;'>" + LS.memberOtherLgnNotAcct + "</div>");
    l.push("<div class='signUp g_button sendIcon' id='signUp' >" + LS.memberOtherLgnSignUp + "</div>");
    l.push("</div>");
    if (!jm("#bindAcct .loginContent").children().length) {
        jm("#bindAcct .loginContent").append(l.join(""))
    }
    jm("#mLogin").hide();
    jm("#bindAcct").show();
    jm("#bindAcct #bindBack").click(function() {
        jm("#bindAcct").hide();
        jm("#mLogin").show()
    });
    jm("#signUp").click(function() {
        Mobi.signUp(j, d, e, i, c, k, f, h, a)
    })
};
Mobi.bindNow = function(e, c, a) {
    var d = true;
    var b = "<div class='g_globalLine'>";
    b += "	<input type='text' maxlength='50'  id='bindUser' class='itemEdit g_input mustItem' placeholder='" + LS.memberSignupRegisterAcctEmpty + "'/><span class='icon-userIcon g_mainColor'></span>";
    b += "</div>";
    b += "<div class='g_globalLine'>";
    b += "	<input type='password'maxlength='20' id='bindPassword' class='itemEdit g_input  mustItem' placeholder='" + LS.memberDialogPleaseEnterPwd + "'/><span class='icon-pswIcon g_mainColor'></span>";
    b += "</div>";
    if (e == 1) {
        b += "<div style='margin-top:0.5rem;font-size:0.6rem;color:#999;width:12rem;'>" + LS.memberOtherLgnQQMsg + "</div>"
    } else {
        b += "<div style='margin-top:0.5rem;font-size:0.6rem;color:#999;width:13.5rem;'>" + LS.memberOtherLgnSinaMsg + "</div>"
    }
    b += "<div class='g_globalLine'>";
    b += "<input type='button'  class=' g_button sendIcon' onclick='Mobi.memberOtherLoginSubmit(" + e + ", " + d + ', "' + c + '", "' + a + "\")' value='" + LS.memberOtherLgnSure + "'/>";
    b += "</div>";
    if (!jm("#bindNow .loginContent").children().length) {
        jm("#bindNow .loginContent").append(b)
    }
    jm("#bindAcct").hide();
    jm("#bindNow").show();
    jm("#bindNow #bindNowBack").click(function() {
        jm("#bindNow").hide();
        jm("#bindAcct").show()
    })
};
Mobi.signUp = function(k, c, f, i, b, m, h, j, a) {
    var e = false;
    var n = [],
        d = "";
    if (Mobi.checkHasMobileOption(k)) {
        d = "tagWidth8"
    }
    var l = "";
    n.push("<div class='g_globalLine " + d + "'>");
    n.push("<input type='text' maxlength='50' id='memberSignupAcct' class='mustItem itemEdit userAddItem g_input' placeholder='" + LS.memberSignupRegisterAcctEmpty + LS.memberOtherLgnMust + "'><span class='icon-userIcon g_mainColor'></span>");
    n.push("</div>");
    n.push("<div class='g_globalLine " + d + "'>");
    n.push("<input type='password'  maxlength='20' id='memberSignupPwd' class='mustItem itemEdit icon-pswIcon userAddItem g_input' placeholder='" + LS.memberDialogPleaseEnterPwd + LS.memberOtherLgnMust + "'><span class='icon-pswIcon g_mainColor'></span>");
    n.push("</div>");
    n.push("<div class='g_globalLine " + d + "'>");
    n.push("<input type='password'  maxlength='20' id='memberSignupRepwd' class='mustItem itemEdit icon-pswIcon userAddItem g_input' placeholder='" + LS.memberDialogPleaseEnterPwd2 + LS.memberOtherLgnMust + "'><span class='icon-pswIcon g_mainColor'></span>");
    n.push("</div>");
    jm.each(k, function(p, s) {
        var q = "";
        if ("email" == s.fieldKey) {
            l = "icon-emailIcon g_mainColor"
        } else {
            if ("phone" == s.fieldKey) {
                l = "icon-phoneIcon g_mainColor"
            } else {
                if ("name" == s.fieldKey) {
                    l = "icon-nameIcon g_mainColor"
                } else {
                    l = "icon-customIcon g_mainColor";
                    q = "customIcon"
                }
            }
        }
        var r = "";
        if (s.placeholder == s.name) {
            r = LS.memberOtherLgnPleaseInput + s.name
        } else {
            r = s.placeholder
        }
        if ("mobile" == s.fieldKey) {
            n.push("<div class='g_globalLine " + d + "'>");
            n.push("<select id='mobileCt' name='mobileCt' class='itemEdit g_select'>");
            for (var o = 0; o < h.length; o++) {
                n.push("<option value='" + h[o]["ctName"] + "'>" + h[o]["ctShowName"] + h[o]["ctCode"] + "</option>")
            }
            n.push("</select>");
            n.push("<span class='" + q + "'>" + LS.mobileAreaCode + "</span>");
            n.push("</div>")
        }
        n.push("<div class='g_globalLine " + d + "'>");
        if (s.must) {
            n.push("<input type='text' maxlength='50' id='" + s.fieldKey + "' name='" + s.name + "' class='mustItem isCheckUAI itemEdit userAddItem  g_input' maxlength='50' placeholder='" + r + LS.memberOtherLgnMust + "'><span class='" + l + "'></span>")
        } else {
            n.push("<input type='text' maxlength='50' id='" + s.fieldKey + "' name='" + s.name + "' class='itemEdit userAddItem  g_input' maxlength='50' placeholder='" + r + "'><span class='" + l + "'></span>")
        }
        if (q != "") {
            n.push("<span class='" + q + "'>" + s.name + "</span>")
        }
        n.push("</div>")
    });
    if (c) {
        n.push("<div class='g_globalLine " + d + "'>");
        n.push("<input type='text' class='itemEdit g_input userAddItem' id='memberSignupRemark' maxlength='200' placeholder='" + LS.memberOtherLgnRemark + "'><span class='icon-msgIcon g_mainColor'></span>");
        n.push("</div>")
    }
    if (j) {
        n.push("<div class='g_globalLine'>");
        n.push("<input id='memberSignupCaptcha' type='text' class='captchaText g_input' maxlength='4' placeholder='" + LS.EnterVerificationCode + "'/><img id='signupCaptchaImg'  class='captchaImg' src='validateCode.jsp?" + (Math.random() * 1000) + "' onclick='Mobi.changeValidateCode(jm(\"#signupCaptchaImg\"))' /><div style='clear:both'></div>");
        n.push("</div>");
        n.push("<div class='g_globalLine'>");
        n.push("<input id='messageAuthCode' type='text' class='captchaText g_input' maxlength='6' placeholder='" + LS.inputMobileCode + "' /><div id='messageAuthCodeClick' onclick='Mobi.getSignMobileCode()' class='fk-sign-getMobileCode' title='" + LS.getMobileCode + "'>" + LS.getMobileCode + "</div><div style='clear:both'></div>");
        n.push("</div>")
    }
    if (i == 1) {
        n.push("<div style='margin-top:0.5rem;font-size:0.6rem;color:#999;width:12rem;'>" + LS.signByQQCanLogin + "</div>")
    } else {
        n.push("<div style='margin-top:0.5rem;font-size:0.6rem;color:#999;width:13.5rem;'>" + LS.signByWbCanLogin + "</div>")
    }
    n.push("<div class='signupSubmitCtrl g_globalLine " + d + "'>");
    n.push("<input type='button'  class='g_button sendIcon signupSubmit submitIcon' onclick='Mobi.memberOtherLoginSubmit(" + i + ", " + e + ', "' + b + '", "' + a + '", "' + m + "\")' value='" + LS.memberOtherLgnSignUp + "'/>");
    n.push("</div>");
    if (!jm("#mSignUp .loginContent").children().length) {
        jm("#mSignUp .loginContent").append(n.join(""))
    }
    jm("#mSignUp").show();
    jm("#bindAcct").hide();
    jm("#mSignUp #signUpBack").click(function() {
        jm("#mSignUp").hide();
        jm("#bindAcct").show()
    })
};
Mobi.checkHasMobileOption = function(b) {
    var c = false;
    if (b) {
        for (var a = 0; a < b.length; a++) {
            if (b[a]["fieldKey"] == "mobile") {
                c = true;
                break
            }
        }
    }
    return c
};
Mobi.memberOtherLoginSubmit = function(loginType, isBindAcct, openId, url, avator) {
    var cmd = "";
    var info = {};
    if (loginType == 1) {
        info.qqOpenId = openId;
        info.headImgUrl = avator
    } else {
        if (loginType == 2) {
            info.sinaOpenId = openId;
            info.headImgUrl = avator
        }
    }
    if (isBindAcct) {
        cmd = "cmd=bindAcct";
        var acct = jm("#bindUser").val();
        var pwd = jm("#bindPassword").val();
        if (acct == null || acct == "") {
            Mobi.showMemberLoginMsg(1, false);
            return
        }
        if (pwd == null || pwd == "") {
            Mobi.showMemberLoginMsg(2, false);
            return
        }
        pwd = jm.md5(pwd);
        info.acct = acct;
        info.pwd = pwd
    } else {
        cmd = "cmd=otherAdd";
        var acct = jm("#memberSignupAcct").val();
        if (acct == null || acct == "") {
            Mobi.ing(LS.memberSignupRegisterAcctEmpty);
            Mobi.getPreviewObject("memberSignupAcct").focus();
            return
        }
        var pwd = jm("#memberSignupPwd").val();
        if (pwd == null || pwd == "") {
            Mobi.ing(LS.memberSignupRegisterPwdEmpty);
            Mobi.getPreviewObject("memberSignupPwd").focus();
            return
        }
        if (pwd.length < 4) {
            Mobi.ing(LS.memberSignupRegisterPwdMinLength);
            Mobi.getPreviewObject("memberSignupPwd").focus();
            return
        }
        var repwd = jm("#memberSignupRepwd").val();
        if (pwd != repwd) {
            Mobi.ing(LS.memberSignupRegisterPwdNotMatch);
            Mobi.getPreviewObject("memberSignupRepwd").focus();
            return
        }
        var remark = "";
        if (jm("#memberSignupRemark").length > 0) {
            remark = jm("#memberSignupRemark").val();
            var remarkMaxLength = jm("#memberSignupRemark").attr("maxlength");
            if (remark.length > remarkMaxLength) {
                Mobi.ing(jm.format(LS.memberSignupRegisterRemarkMaxLength, remarkMaxLength));
                Mobi.getPreviewObject("memberSignupRemark").focus();
                return
            }
        }
        info.acct = acct;
        info.pwd = jm.md5(pwd);
        info.remark = remark;
        var userAddItemName = "";
        var userAddItemId = "";
        var userAddItemValue = "";
        var isUserAddItemNameTooLong = 0;
        var userAddItemMaxLength = "";
        var isUserAddItemPass = 0;
        var userAddItemType = "";
        jm(".userAddItem").each(function() {
            userAddItemID = jm(this).attr("id");
            userAddItemValue = jm(this).val();
            userAddItemName = jm(this).attr("name");
            userAddItemMaxLength = jm(this).attr("maxlength");
            info[userAddItemID] = userAddItemValue;
            if (userAddItemValue.length > userAddItemMaxLength) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemMaxLength, userAddItemName, userAddItemMaxLength));
                Mobi.getPreviewObject(userAddItemID).focus();
                isUserAddItemNameTooLong = 1;
                return false
            }
            if (userAddItemID == "email" && userAddItemValue.length > 0) {
                if (!jm.isEmail(userAddItemValue)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, userAddItemName));
                    Mobi.getPreviewObject(userAddItemID).focus();
                    isUserAddItemPass = 1;
                    return false
                }
            }
            if (userAddItemID == "phone" && userAddItemValue.length > 0) {
                if (!jm.isPhone(userAddItemValue)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, userAddItemName));
                    Mobi.getPreviewObject(userAddItemID).focus();
                    isUserAddItemPass = 1;
                    return false
                }
            }
            if (userAddItemID == "mobile" && userAddItemValue.length > 0) {
                if (!Mobi.isNationMobile(userAddItemValue)) {
                    Mobi.ing(LS.mobileNumRegular);
                    Mobi.getPreviewObject(userAddItemID).focus();
                    isUserAddItemPass = 1;
                    return false
                } else {
                    info.mobileCt = jm("#mobileCt").val()
                }
            }
        });
        if (isUserAddItemPass == 1) {
            return
        }
        if (isUserAddItemNameTooLong == 1) {
            return
        }
        if (typeof(jm("#messageAuthCode").attr("maxlength")) != "undefined" && jm("#messageAuthCode").attr("maxlength") != null) {
            var memberSignupCaptcha = jm("#memberSignupCaptcha").val();
            if (typeof(memberSignupCaptcha) == "undefined" || memberSignupCaptcha == null || memberSignupCaptcha == "") {
                Mobi.ing(LS.memberInputCaptcha);
                return false
            }
            var messageAuthCode = jm("#messageAuthCode").val();
            if (typeof(messageAuthCode) == "undefined" || messageAuthCode == null || messageAuthCode == "") {
                Mobi.ing(LS.inputMobileCode);
                return false
            }
            info.messageAuthCode = messageAuthCode
        }
        var isCheckUAIStatus = 0;
        jm(".isCheckUAI").each(function() {
            userAddItemID = jm(this).attr("id");
            userAddItemValue = jm(this).val();
            userAddItemName = jm(this).attr("name");
            if (userAddItemValue == null || userAddItemValue == "") {
                if (jm(this).is("input")) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty, userAddItemName))
                } else {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty2, userAddItemName))
                }
                Mobi.getPreviewObject(userAddItemID).focus();
                isCheckUAIStatus = 1;
                return false
            }
            if (userAddItemID == "email" && userAddItemValue.length > 0) {
                if (!jm.isEmail(userAddItemValue)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, userAddItemName));
                    Mobi.getPreviewObject(userAddItemID).focus();
                    isCheckUAIStatus = 1;
                    return false
                }
            }
        });
        if (isCheckUAIStatus == 1) {
            return
        }
    }
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?" + cmd,
        data: "info=" + jm.encodeUrl(jm.toJSON(info)) + "&loginType=" + loginType,
        error: function() {
            Mobi.ing(LS.memberSignupRegisterError)
        },
        success: function(result) {
            var data = jm.parseJSON(result);
            if (data.success) {
                if (data.fromBind) {
                    Mobi.memberActive(data.mail, data.memName)
                } else {
                    if (data.active) {
                        Mobi.memberActive(info.email, info.acct)
                    } else {
                        if (url.indexOf("javascript") == -1) {
                            Fai.top.location.href = url;
                            return
                        } else {
                            var methods = url.split(";");
                            for (var i = 0; i < methods.length - 1; i++) {
                                var patt1 = new RegExp("[^script:]");
                                if (patt1.test(url)) {
                                    var cells = methods[i].split(":"),
                                        start = cells[1].indexOf("(") + 1,
                                        end = cells[1].lastIndexOf(")"),
                                        plist = Array.prototype.slice.call(cells[1].substring(start, end).split(","));
                                    namespace = cells[1].substring(0, start - 1);
                                    eval(cells[1]);
                                    if (url.indexOf("PhotoDetailSwipeForJumpCtrl") != -1) {
                                        window.klass.returnIndex = function() {
                                            Fai.top.location.href = "/index.jsp"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                Mobi.changeValidateCode(jm("#signupCaptchaImg"));
                jm("#memberSignupCaptcha").val("");
                if (data.rt == -401) {
                    Mobi.ing(LS.memberSignupRegisterCaptchaNotMatch)
                } else {
                    if (data.rt == -601) {
                        Mobi.ing(LS.reGetMobileCode)
                    } else {
                        if (data.rt == -8) {
                            Mobi.ing(LS.mobileHasSigned)
                        } else {
                            if (data.rt == -6) {
                                Mobi.ing(LS.memberSignupRegisterExisted)
                            } else {
                                if (data.rt == -4) {
                                    Mobi.ing(LS.memberSignupRegisterLimit)
                                } else {
                                    if (data.rt == -3) {
                                        Mobi.ing(LS.memberDialogNotFound)
                                    } else {
                                        if (data.rt == Mobi.otherLoginErrno.acctAlreadyBind) {
                                            Mobi.ing(LS.memberOtherLgnAcctAlreadyBind)
                                        } else {
                                            Mobi.ing(LS.memberSignupRegisterError)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
Mobi.otherLoginErrno = {
    acctAlreadyBind: 1
};
Mobi.memberSignupSubmit = function(b) {
    var j = jm("#memberSignupAcct").val();
    if (j == null || j == "") {
        Mobi.ing(LS.memberSignupRegisterAcctEmpty);
        Mobi.getPreviewObject("memberSignupAcct").focus();
        return
    }
    var d = jm("#memberSignupPwd").val();
    if (d == null || d == "") {
        Mobi.ing(LS.memberSignupRegisterPwdEmpty);
        Mobi.getPreviewObject("memberSignupPwd").focus();
        return
    }
    if (d.length < 4) {
        Mobi.ing(LS.memberSignupRegisterPwdMinLength);
        Mobi.getPreviewObject("memberSignupPwd").focus();
        return
    }
    var m = jm("#memberSignupRepwd").val();
    if (d != m) {
        Mobi.ing(LS.memberSignupRegisterPwdNotMatch);
        Mobi.getPreviewObject("memberSignupRepwd").focus();
        return
    }
    var n = "";
    if (jm("#memberSignupRemark").length > 0) {
        n = jm("#memberSignupRemark").val();
        var s = jm("#memberSignupRemark").attr("maxlength");
        if (n.length > s) {
            Mobi.ing(jm.format(LS.memberSignupRegisterRemarkMaxLength, s));
            Mobi.getPreviewObject("memberSignupRemark").focus();
            return
        }
    }
    var r = {};
    r.acct = j;
    r.pwd = jm.md5(d);
    r.remark = n;
    if (typeof(jm("#messageAuthCode").attr("maxlength")) != "undefined" && jm("#messageAuthCode").attr("maxlength") != null) {
        var l = jm("#messageAuthCode").val();
        if (typeof(l) == "undefined" || l == null || l == "") {
            Mobi.ing(LS.inputMobileCode);
            Mobi.getPreviewObject("messageAuthCode").focus();
            return
        } else {
            r.messageAuthCode = l
        }
    }
    var a = "";
    var o = "";
    var e = "";
    var q = 0;
    var k = "";
    var f = "";
    var c = 0;
    jm(".userAddItem").each(function() {
        userAddItemID = jm(this).attr("id");
        e = jm(this).val();
        a = jm(this).attr("name");
        k = jm(this).attr("maxlength");
        r[userAddItemID] = e;
        if (e.length > k && f == "input") {
            Mobi.ing(jm.format(LS.memberSignupUserAddItemMaxLength, a, k));
            Mobi.getPreviewObject(userAddItemID).focus();
            q = 1;
            return false
        }
        if (userAddItemID == "email" && e.length > 0) {
            if (!jm.isEmail(e)) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, a));
                Mobi.getPreviewObject(userAddItemID).focus();
                c = 1;
                return false
            }
        }
        if (userAddItemID == "phone" && e.length > 0) {
            if (!jm.isPhone(e)) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, a));
                Mobi.getPreviewObject(userAddItemID).focus();
                c = 1;
                return false
            }
        }
        if (userAddItemID == "mobile" && e.length > 0) {
            if (!Mobi.isNationMobile(e)) {
                Mobi.ing(LS.mobileNumRegular);
                Mobi.getPreviewObject(userAddItemID).focus();
                c = 1;
                return false
            }
        }
        if (userAddItemID == "mobile" && e.length <= 0) {
            r.mobileCt = ""
        }
    });
    if (c == 1) {
        return
    }
    if (q == 1) {
        return
    }
    var i = 0;
    jm(".isCheckUAI").each(function() {
        userAddItemID = jm(this).attr("id");
        e = jm(this).val();
        a = jm(this).attr("name");
        if (e == null || e == "") {
            if (jm(this).is("input")) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty, a))
            } else {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty2, a))
            }
            Mobi.getPreviewObject(userAddItemID).focus();
            i = 1;
            return false
        }
        if (userAddItemID == "email" && e.length > 0) {
            if (!jm.isEmail(e)) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, a));
                Mobi.getPreviewObject(userAddItemID).focus();
                i = 1;
                return false
            }
        }
    });
    if (i == 1) {
        return
    }
    var h = jm("#memberSignupCaptcha").val();
    if (h == null || h == "") {
        Mobi.ing(LS.memberSignupRegisterCaptchaEmpty);
        Mobi.getPreviewObject("memberSignupCaptcha").focus();
        return
    }
    var p = jm("#memberAgreePro");
    if (p.length > 0) {
        if (!p.prop("checked")) {
            Mobi.ing(LS.memberAgreeProtocol);
            return
        }
    }
    Mobi.ing(LS.memberSignupRegisterIng);
    jm(".g_button").removeClass("sendIcon");
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=add",
        data: "info=" + jm.encodeUrl(jm.toJSON(r)) + "&validateCode=" + h,
        error: function() {
            Mobi.ing(LS.memberSignupRegisterError)
        },
        success: function(t) {
            var u = jm.parseJSON(t);
            if (u.success) {
                if (u.active) {
                    Mobi.memberActive(r.email, r.acct, b, function() {})
                } else {
                    setTimeout(function() {
                        if (b) {
                            Mobi.autoLogin(j, d, b)
                        } else {
                            Fai.top.location.href = "login.jsp?errno=12"
                        }
                    }, 3000)
                }
            } else {
                jm(".g_button").addClass("sendIcon");
                jm(".loginIcon ").hide();
                jm("#signupCaptchaImg").attr("src", "validateCode.jsp?" + Math.random() * 1000);
                jm("#memberSignupCaptcha").val("");
                if (u.rt == -401) {
                    Mobi.ing(LS.memberSignupRegisterCaptchaNotMatch)
                } else {
                    if (u.rt == -601) {
                        Mobi.ing(LS.reGetMobileCode)
                    } else {
                        if (u.rt == -8) {
                            Mobi.ing(LS.mobileHasSigned)
                        } else {
                            if (u.rt == -6) {
                                Mobi.ing(LS.memberSignupRegisterExisted)
                            } else {
                                if (u.rt == -4) {
                                    Mobi.ing(LS.memberSignupRegisterLimit)
                                } else {
                                    if (u.rt == -28) {
                                        Mobi.ing(LS.memberRegisterLimit)
                                    } else {
                                        Mobi.ing(LS.memberSignupRegisterError)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
Mobi.isNationMobile = function(a) {
    var b = /^\d{8,14}$/;
    return b.test(a)
};
Mobi.getSignMobileCode = function() {
    var a = jm("#mobile").val();
    var b = jm("#mobileCt").val();
    var c = jm("#memberSignupCaptcha").val();
    if (!Mobi.isNationMobile(a)) {
        Mobi.ing(LS.mobileNumRegular);
        return
    }
    if (c == null || c == "") {
        Mobi.ing(LS.memberSignupRegisterCaptchaEmpty);
        return
    }
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=getMobileCode",
        data: "mobile=" + a + "&mobileCt=" + b + "&validateCode=" + c,
        error: function() {
            Mobi.ing(LS.getMobileCodeErrAf)
        },
        success: function(d) {
            var e = jm.parseJSON(d);
            if (e.success) {
                Mobi.ing(LS.sendMobileCodeSuc);
                Mobi.getSignMobileCodeCountDown()
            } else {
                Mobi.changeValidateCode(jm("#signupCaptchaImg"));
                jm("#memberSignupCaptcha").val("");
                if (e.rt == -401) {
                    Mobi.ing(LS.memberSignupRegisterCaptchaNotMatch)
                } else {
                    if (e.rt == -2) {
                        Mobi.ing(LS.argsError)
                    } else {
                        if (e.rt == 2) {
                            Mobi.ing(LS.memberDialogSendMobileCodeErr)
                        } else {
                            if (e.rt == -4 || e.rt == 8) {
                                Mobi.ing(LS.getMobileOneMin)
                            } else {
                                if (e.rt == -8) {
                                    Mobi.ing(LS.getMobileHalfHour)
                                } else {
                                    if (e.rt == 3) {
                                        Mobi.ing(LS.memberDialogMobileMoneyErr)
                                    } else {
                                        if (e.rt == 9) {
                                            Mobi.ing(LS.memberDialogSendMobileCodeLimit)
                                        } else {
                                            if (e.rt == 101) {
                                                Mobi.ing(LS.mobileSetErr)
                                            } else {
                                                if (e.rt == -6) {
                                                    Mobi.ing(LS.mobileHasSigned)
                                                } else {
                                                    if (e.rt == 23) {
                                                        Mobi.ing(LS.mobileNationTplErr)
                                                    } else {
                                                        Mobi.ing(LS.getMobileRefresh)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
Mobi.getSignMobileCodeCountDown = function() {
    var d = jm("#messageAuthCodeClick");
    var c = d.attr("cTime");
    var e = 60;
    var b = "5.2rem";
    if (!c || c == null) {
        c = 0
    } else {
        b = "5.6rem";
        c = parseInt(c);
        e = 1800
    }
    c++;
    d.attr("cTime", c);
    d.attr("s_onclick", d.attr("onclick"));
    d.removeAttr("onclick");
    d.css("width", b);
    var a = setInterval(function() {
        e--;
        d.html(LS.reGetMsg + "(" + e + ")");
        if (e <= 0) {
            d.html(d.attr("title"));
            d.css("width", "4.2rem");
            d.attr("onclick", d.attr("s_onclick"));
            clearInterval(a)
        }
    }, 1000)
};
Mobi.autoLogin = function(c, b, a) {
    jm.ajax({
        type: "post",
        url: "ajax/login_h.jsp",
        data: "cmd=loginMember&acct=" + jm.encodeUrl(c) + "&pwd=" + jm.encodeUrl(jm.md5(b)),
        error: function() {
            Mobi.showMemberLoginMsg(-1)
        },
        success: function(d) {
            var d = jm.parseJSON(d);
            if (d.success) {
                Fai.top.location.href = a;
                return
            } else {
                Fai.top.location.href = "login.jsp?returnUrl=" + jm.encodeUrl(a)
            }
        }
    })
};
Mobi.memberActive = function(a, c, b) {
    jm.ajax({
        type: "post",
        url: "ajax/mail_h.jsp?cmd=sendMemberActiveMail",
        data: "memName=" + jm.encodeUrl(c) + "&memEmail=" + a,
        error: function() {
            Mobi.ing(LS.systemError)
        },
        success: function(d) {
            jm("#profileArea").hide();
            jm("#mSignUp .loginContent").hide();
            jm(".loginErrorLine").hide();
            var e = Mobi.getEmailCarriersAddress(a);
            jm("#checkEmail").html(jm.format(LS.memberSignupMailActivation, a));
            if (e != -1) {
                jm("#emailAddr").attr("href", e.addr);
                jm("#emailAddr").html(jm.format(LS.memberSignupMailActivationLink, e.name));
                jm("#emailAddr").show()
            }
        }
    })
};
Mobi.getEmailCarriersAddress = function(a) {
    var c = {};
    var b = a.split("@")[1];
    if (b === "qq.com" || b === "vip.qq.com" || b === "foxmail.com") {
        c.name = "QQ";
        c.addr = "https://w.mail.qq.com";
        return c
    } else {
        if (b === "163.com") {
            c.name = "163";
            c.addr = "http://smart.mail.163.com";
            return c
        } else {
            if (b === "126.com") {
                c.name = "126";
                c.addr = "http://smart.mail.126.com";
                return c
            } else {
                if (b === "sina.com" || b === "vip.sina.com") {
                    c.name = "sina";
                    c.addr = "http://mail.sina.com.cn";
                    return c
                } else {
                    return -1
                }
            }
        }
    }
};
Mobi.showErrorMsg = function(a) {
    jm(".loginErrorLine").show();
    Mobi.ing(a)
};
Mobi.readBulletin = function() {
    var a = jm("#bulletinTitle"),
        b = jm("#bulletinTitle").attr("sessionMid");
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp",
        data: "cmd=setBulletinReadTime&id=" + b,
        error: function() {
            Mobi.ing(LS.systemError)
        },
        success: function(c) {
            var c = jm.parseJSON(c);
            if (c.success) {
                jm("#profile").hide();
                jm("#mBulletinConten").show();
                jm(a).removeClass("newsReminds")
            } else {
                Mobi.ing(LS.systemError)
            }
        }
    })
};
Mobi.memberAddrInfoOpera = function(c, e, o) {
    var h = e,
        q = "",
        i = "",
        f = h.length,
        p = "",
        l = false;
    var a = {};
    jm("#addrInfoList .addAddrInfo").click(function() {
        l = true;
        if (f < 6) {
            jm("#addrInfoList").hide();
            jm("#editAddrInfo").show();
            jm("#editAddrInfo").find(".propItemValue").each(function() {
                jm(this).val("")
            });
            jm("#div1").attr("class", "close1");
            jm("#div2").attr("class", "close2");
            q = "addAddr";
            p = "ajax/member_h.jsp?cmd=set&id=" + c
        } else {
            Mobi.ing("数量已超过限制", true)
        }
    });
    jm("#addrInfoList .edit , #addrInfo .nameAndPhone , #addrInfo .address").click(function() {
        l = false;
        jm("#addrInfoList").hide();
        jm("#editAddrInfo").show();
        if (jm(this).attr("class") == "edit") {
            i = jm(this).parent().parent().attr("_item")
        } else {
            i = jm(this).parent().attr("_item")
        }
        q = "editAddr";
        p = "ajax/member_h.jsp?cmd=set&id=" + c;
        var w = h[i];
        jm("#editAddrInfo").find(".propItemValue").each(function() {
            var z = jm(this).attr("_field");
            jm(this).val(w[z]);
            if ("mobile" == z) {
                if ("mobileCt" in w) {
                    if (w.mobileCt != null && w.mobileCt != "") {
                        jm("#mobileCt").val(w.mobileCt)
                    }
                }
            }
        });
        var y = w.addr_info;
        if (y != null) {
            jm("#addrInfo_province").val(y.provinceCode);
            jm("#addrInfo_province").change();
            jm("#addrInfo_city").val(y.cityCode);
            jm("#addrInfo_city").change();
            jm("#addrInfo_county").val(y.countyCode);
            jm("#addrInfo_street").val(y.streetAddr)
        }
        var x = w.isDefault;
        if (x) {
            jm("#div1").attr("class", "open1");
            jm("#div2").attr("class", "open2")
        } else {
            jm("#div1").attr("class", "close1");
            jm("#div2").attr("class", "close2")
        }
    });
    jm(".saveAddrInfo").click(function() {
        var G = true;
        var F = jm("#div1");
        var B = (F.attr("class") == "close1") ? 0 : 1;
        if (h.length == 0) {
            B = 1
        }
        var E = jm(this);
        var H = {};
        var x = {};
        var L = "";
        var A = "";
        var z = "";
        var w = false;
        E.parent().find(".propItemValue").each(function() {
            L = jm(this).attr("_field");
            A = jm(this).val();
            z = jm(this).attr("_prop");
            w = jm(this).attr("_required") == "1" ? true : false;
            if (w && (A == null || A == "")) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, z));
                this.focus();
                G = false
            }
            if (L == "email" && A.length > 0) {
                if (!jm.isEmail(A)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, z));
                    this.focus();
                    G = false
                }
            }
            if (L == "phone" && A.length > 0) {
                if (!jm.isPhone(A)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, z));
                    this.focus();
                    G = false
                }
            }
            if (L == "mobile" && A.length > 0) {
                if (!Mobi.isNationMobile(A)) {
                    Mobi.ing(LS.mobileNumRegular);
                    this.focus();
                    A = "";
                    G = false
                }
                x.mobileCt = jm(this).parent().find("#mobileCt").val()
            }
            if (L == "mobile" && A.length <= 0) {
                x.mobileCt = ""
            }
            x[L] = A
        });
        var y = jm("#addrInfo_county");
        var D = jm("#addrInfo_city");
        var C = jm("#addrInfo_province");
        var K = jm("#addrInfo_street");
        w = E.parent().find("#addrInfo_street").attr("_required") == "1" ? true : false;
        if (w) {
            if (C.val() == "-1") {
                Mobi.ing("请选择省份", 1);
                document.getElementById("addrInfo_province").focus();
                return
            }
            if (D.val() == "-1") {
                Mobi.ing("请选择城市", 1);
                document.getElementById("addrInfo_city").focus();
                return
            }
            if (y.val() == "-1") {
                Mobi.ing("请选择区/县", 1);
                document.getElementById("addrInfo_county").focus();
                return
            }
        }
        H.provinceCode = C.val();
        H.cityCode = D.val();
        H.countyCode = y.val();
        H.streetAddr = K.val();
        x.addr_info = H;
        var J = "";
        if (jm("#addrInfo_province").length == 1) {
            var I = document.getElementById("addrInfo_province").selectedIndex;
            J = (parseInt(I) == 0) ? "" : document.getElementById("addrInfo_province").options[I].text;
            I = document.getElementById("addrInfo_city").selectedIndex;
            J += (parseInt(I) == 0) ? "" : document.getElementById("addrInfo_city").options[I].text;
            I = document.getElementById("addrInfo_county").selectedIndex;
            J += (parseInt(I) == 0) ? "" : document.getElementById("addrInfo_county").options[I].text;
            J += jm("#addrInfo_street").val()
        }
        x.addr = J;
        x.isDefault = B;
        a.opera = q;
        a._item = i;
        a.addrInfo = x;
        if (G) {
            jm.ajax({
                type: "post",
                url: p,
                data: "info=" + jm.encodeUrl(jm.toJSON(a)),
                error: function() {
                    Mobi.ing(LS.memberProfileError)
                },
                success: function(M) {
                    var O = jm.parseJSON(M);
                    if (O.success) {
                        if (q == "editAddr") {
                            if (B) {
                                jm("#addrInfoList").find(".addrInfo").each(function() {
                                    if (jm(this).find(".defaultAddr").attr("style") != "display:none") {
                                        jm(this).find(".defaultAddr").hide();
                                        jm(this).find(".delete").show();
                                        h[jm(this).attr("_item")]["isDefault"] = 0
                                    }
                                    if (jm(this).attr("_item") == i) {
                                        jm(this).find(".name").text(x.name);
                                        jm(this).find(".phone").text(x.phone);
                                        jm(this).find("#addr").text(x.addr);
                                        jm(this).find(".defaultAddr").show();
                                        jm(this).find(".delete").hide()
                                    }
                                })
                            } else {
                                jm("#addrInfoList").find(".addrInfo").each(function() {
                                    if (jm(this).attr("_item") == i) {
                                        jm(this).find(".name").text(x.name);
                                        jm(this).find(".phone").text(x.phone);
                                        jm(this).find("#addr").text(x.addr)
                                    }
                                })
                            }
                            h.splice(i, 1, x);
                            jm("#editAddrInfo").hide();
                            jm("#addrInfoList").show()
                        } else {
                            if (q == "addAddr") {
                                var N = "";
                                if (B) {
                                    N = "<div class='addrInfo' _item='" + f + "'><div class='nameAndPhone'><span class='name'>" + x.name + "</span><span class='phone'>" + x.phone + "</span></div><div class='address'><span class='defaultAddr'>默认</span><span id='addr'>" + x.addr + "</span></div><div class='opera'><div class='edit'></div></div></div>";
                                    jm("#addrInfoList").find(".addrInfo").each(function() {
                                        if (jm(this).find(".defaultAddr").attr("style") != "display:none") {
                                            jm(this).find(".defaultAddr").hide();
                                            jm(this).find(".delete").show();
                                            h[jm(this).attr("_item")]["isDefault"] = 0
                                        }
                                    })
                                } else {
                                    N = "<div class='addrInfo' _item='" + f + "'><div class='nameAndPhone'><span class='name'>" + x.name + "</span><span class='phone'>" + x.phone + "</span></div><div class='address'><span class='defaultAddr' style='display:none'>默认</span><span id='addr'>" + x.addr + "</span></div><div class='opera'><div class='delete'></div><div class='edit'></div></div></div>"
                                }
                                jm("#addrInfo").append(N);
                                h.push(x);
                                jm("#editAddrInfo").hide();
                                jm("#addrInfoList").show();
                                jm("#addrInfoList .addAddrInfo").unbind("click");
                                jm("#addrInfoList .edit").unbind("click");
                                jm(".saveAddrInfo").unbind("click");
                                jm("#addrInfoList .delete").unbind("click");
                                jm("#addrInfo .nameAndPhone").unbind("click");
                                jm("#addrInfo .address").unbind("click");
                                jm("#div1").unbind("click");
                                Mobi.memberAddrInfoOpera(c, h, o)
                            }
                        }
                    } else {
                        Mobi.ing(O.msg)
                    }
                }
            })
        }
    });
    jm("#addrInfoList .delete").click(function() {
        var y = jm(this);
        i = y.parent().parent().attr("_item");
        a.opera = "delAddr";
        a._item = i;
        var w = function(A, z) {
            jm.ajax({
                type: "post",
                url: "ajax/member_h.jsp?cmd=set&id=" + A,
                data: "info=" + jm.encodeUrl(jm.toJSON(a)),
                error: function() {
                    Mobi.ing(LS.systemError)
                },
                success: function(B) {
                    var D = jm.parseJSON(B);
                    if (D.success) {
                        jm("#mobiPrompt").remove();
                        jm("#mobiPrompt_Bg").remove();
                        var C = 0;
                        jm("#addrInfoList").find(".addrInfo").each(function() {
                            if (jm(this).attr("_item") == z) {
                                jm(this).remove()
                            } else {
                                jm(this).attr("_item", C);
                                C++
                            }
                        });
                        f--;
                        h.splice(z, 1)
                    } else {
                        Mobi.ing(D.msg)
                    }
                }
            })
        };
        var x = {
            textClass: "confirm",
            content: "确定要删除该收货人信息吗？",
            callback: function() {
                w(c, i)
            }
        };
        Mobi.prompt(x)
    });
    var d = jm("#div1");
    var b = jm("#div2");
    d.click(function() {
        if (l == true || h[i]["isDefault"] == 0) {
            var w = (d.attr("class") == "close1") ? "open1" : "close1";
            var x = (b.attr("class") == "close2") ? "open2" : "close2";
            d.attr("class", w);
            b.attr("class", x)
        }
    });
    var n = LS.mallPleaseChoose,
        t = [],
        j, u, m, r, v, k, s;
    if (o == 2052 || o == 1028) {
        site_cityUtil.simpleProvinceName(s);
        s = site_cityUtil.getProvince()
    } else {
        site_cityUtil.simpleProvinceNameEn(s);
        s = site_cityUtil.getProvinceEn()
    }
    jm.each(s, function(w, x) {
        if (o == 2052 || o == 1028) {
            t.push("<option value='" + x.id + "'>" + site_cityUtil.simpleCityNameStr(x.name) + "</option>")
        } else {
            t.push("<option value='" + x.id + "'>" + site_cityUtil.simpleCityNameStrEn(x.name) + "</option>")
        }
    });
    jm("#addrInfo_province").html("").html("<option value='-1'>" + n + "</option>" + t.join("")).change(function(w) {
        j = jm("#addrInfo_province").val();
        if (isNaN(j) || j <= 0) {
            jm("#addrInfo_city").html("").html("<option value='-1'>" + n + "</option>");
            jm("#addrInfo_county").html("").html("<option value='-1'>" + n + "</option>")
        }
        m = [];
        if (o == 2052 || o == 1028) {
            u = site_cityUtil.getCities(j);
            site_cityUtil.simpleCityName(u)
        } else {
            u = site_cityUtil.getCitiesEn(j);
            site_cityUtil.simpleCityNameEn(u)
        }
        jm.each(u, function(x, y) {
            m.push("<option value='" + y.id + "' >" + y.name + "</option>")
        });
        jm("#addrInfo_city").html("").html("<option value='-1'>" + n + "</option>" + m.join("")).unbind().bind("change", function(x) {
            r = jm("#addrInfo_city").val();
            if (isNaN(r) || r <= 0) {
                jm("#addrInfo_county").html("").html("<option value='-1'>" + n + "</option>")
            }
            k = [];
            if (o == 2052 || o == 1028) {
                v = site_cityUtil.getCounty(r)
            } else {
                v = site_cityUtil.getCountyEn(r)
            }
            jm.each(v, function(y, z) {
                k.push("<option value='" + z.id + "' >" + z.name + "</option>")
            });
            jm("#addrInfo_county").html("").html("<option value='-1'>" + n + "</option>" + k.join("")).unbind().bind("change", function(y) {})
        })
    });
    jm("#addrInfo_city").html("").html("<option value='-1'>" + n + "</option>");
    jm("#addrInfo_county").html("").html("<option value='-1'>" + n + "</option>")
};
Mobi.modifyListener = function(c, b) {
    jm(".modifyArea li").click(function() {
        if (jm(this).attr("orderlist") === "0") {
            return
        }
        if (jm(this).attr("orderlist") === "1") {
            Mobi.readBulletin();
            return
        }
        var e = jm(this).find(".itemName").html();
        if (jm(this).attr("id") === "password") {
            jm("#profile").hide();
            jm("#modifyPsw").show()
        } else {
            if (jm(this).attr("id") === "consigneeInfo") {
                jm("#addrInfoList").find(".title").html(e);
                jm("#profile").hide();
                jm("#addrInfoList").show()
            } else {
                if (jm(this).attr("id") === "personalInfo") {
                    jm("#modifyPersInfo").find(".title").html(e);
                    jm("#profile").hide();
                    jm("#modifyPersInfo").show()
                } else {
                    if (jm(this).attr("id") === "integral") {
                        jm("#modifyIntegral").find(".title").html(e);
                        jm("#profile").hide();
                        jm("#modifyIntegral").show()
                    } else {
                        if (jm(this).attr("id") === "collection") {
                            jm("#modifyCollection").find(".title").html(e);
                            jm("#profile").hide();
                            jm("#modifyCollection").show()
                        } else {
                            if (jm(this).attr("id") === "coupon") {
                                jm("#modifyCoupon").find(".title").html(e);
                                jm("#profile").hide();
                                jm("#modifyCoupon").show()
                            } else {
                                var d = jm(this).find(".itemText").html();
                                jm("#profile").hide();
                                jm("#modifyProfile").show();
                                jm("#modifyProfile").find(".title").html(e);
                                jm("#profileValue").val(jm.decodeHtml(d));
                                jm("#profileValue").attr("name", jm(this).attr("id"));
                                jm("#profileValue").attr("ismust", jm(this).attr("ismust"))
                            }
                        }
                    }
                }
            }
        }
    });
    var a = new Mobi.memberHeadPic(c, b);
    a.init()
};
Mobi.profileLogout = function(b) {
    var a = {
        textClass: "confirm",
        content: LS.onLogout,
        callback: function() {
            Mobi.onLogout("login.jsp?returnUrl=" + jm.encodeUrl(b))
        }
    };
    Mobi.prompt(a)
};
Mobi.loadPdCollectionList = function(b, a) {
    this.pIdList = a;
    this.mid = b;
    this.panel = jm("#modifyCollection")
};
(function(q, l, c) {
    var h = l.prototype,
        r, d, i, k = [],
        s = 10,
        a, b = [];
    h.init = function() {
        d = this.pIdList, i = this.panel;
        r = this.mid;
        if (d.length == 0) {
            f();
            return
        }
        o();
        var v = d.slice(0, s);
        a = v.length;
        n(v);
        e()
    };

    function f() {
        if (d.length == 0) {
            i.find(".profileContent").html("<div class='noCollIcon'></div><div class='noCollTip'>" + LS.notCollect + "</div>")
        }
    }

    function o() {
        q.post("ajax/product_h.jsp", {
            mid: r,
            cmd: "updateCollections",
            ids: q.toJSON(d)
        }, function(v) {
            if (v.success) {
                d = v.list
            }
        }, "json")
    }

    function n(v) {
        q.ajax({
            url: "ajax/product_h.jsp",
            data: {
                cmd: "batchGetPd",
                ids: q.toJSON(v)
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function(w) {
                if (w.success) {
                    m(v, w.list)
                }
            }
        })
    }

    function t(w) {
        var v = false,
            x;
        q.each(b, function(y, z) {
            if (w == z.lid) {
                v = true;
                x = z
            }
        });
        if (!v) {
            x = j(w)
        }
        return x
    }

    function j(v) {
        var w = {
            lid: v
        };
        q.ajax({
            url: "ajax/productProp_h.jsp?cmd=list&lid=" + v,
            async: false,
            type: "POST",
            dataType: "json",
            success: function(x) {
                if (x.success) {
                    var y = false;
                    q.each(x.list, function(z, A) {
                        if (A.fieldKey == "mallPrice") {
                            y = true
                        }
                    });
                    w.showPrice = y;
                    b.push(w)
                }
            }
        });
        return w
    }

    function u() {
        var w = {},
            v = false;
        w.productCollections = d.reverse() + "";
        q.ajax({
            url: "ajax/member_h.jsp",
            data: {
                cmd: "set",
                id: r,
                info: q.toJSON(w)
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function(x) {
                if (x.success) {
                    v = true
                } else {
                    v = false
                }
            }
        });
        return v
    }

    function m(v, w) {
        var x = [];
        q.each(w, function(y, A) {
            var z = t(A.lid);
            x.push("<li>");
            x.push('  <div class="pdImg">');
            x.push('      <a href="javascript:;" _href="pd.jsp?pid=' + A.id + '&returnUrl=profile.jsp">');
            x.push('          <img src="' + A.picPath + '" />');
            x.push("      </a>");
            x.push("  </div>  ");
            x.push('  <div class="pdName">' + A.name + "</div>");
            if (A.mallPrice != -1 && z.showPrice) {
                x.push('  <div class="pdPrice"><div class="mallPrice">￥ ' + A.mallPrice + "</div></div>")
            }
            x.push('  <div class="cancelCollection" data-id="' + A.id + '">' + LS.cancelCollect + "</div>");
            x.push("</li>")
        });
        i.find(".collectionList").append(x.join(""))
    }

    function p() {
        i.find(".collectionList li img[_src]").each(function() {
            var w = q(this).attr("_src");
            var v = new Image();
            v.src = w;
            q(this).attr("_src", "");
            q(this).attr("src", w)
        })
    }

    function e() {
        Mobi.onTouchAndClickEvent(".cancelCollection", function(y) {
            var w = $(this);
            var x = {
                textClass: "confirm",
                content: LS.sureCancelCollect,
                callback: function() {
                    var A = w.attr("data-id");
                    var B = d.indexOf(Number(A));
                    if (B > -1) {
                        d.splice(B, 1)
                    }
                    if (u()) {
                        a--;
                        w.parents("li").remove()
                    }
                    if (i.find(".collectionList li").length < 6 && d.length > a) {
                        var z = d.slice(a, a + s);
                        a = a + z.length;
                        if (z.length > 0) {
                            n(z)
                        }
                    }
                    f();
                    q("#mobiPrompt").remove();
                    q("#mobiPrompt_Bg").remove()
                }
            };
            Mobi.prompt(x)
        });
        Mobi.onTouchAndClickEvent(".pdName,.pdPrice,.pdImg", function(x) {
            var w = q(this).parent().find("a").attr("_href");
            location.href = w;
            q.setCookie("_fromCollect", true)
        });
        q(window).on("scroll", function() {
            if (d.length > a) {
                var x = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                if (q(window)[0].scrollY + q(window).height() + 100 >= x) {
                    var w = d.slice(a, a + s);
                    a = a + w.length;
                    if (w.length > 0) {
                        n(w)
                    }
                }
            }
        });
        if (q.getCookie("_openCollect")) {
            var v = q("#collection").find(".itemName").html();
            q("#modifyCollection").find(".title").html(v);
            q("#profile").hide();
            q("#modifyCollection").show();
            q.setCookie("_openCollect", "", -1)
        }
    }
})(jm, Mobi.loadPdCollectionList);
Mobi.loadCouponList = (function(e) {
    function f(m) {
        this.mid = m
    }
    var h = f.prototype,
        k, c = 0;
    pageno = [1, 1, 1];
    pageSize = 10, couponList = [
        [],
        [],
        []
    ], couponColorList = ["red", "orange", "yellow", "green", "blue", "pink", "purple", "gray"], bgColor = jm(".g_button").css("background-color");
    h.init = function() {
        k = this;
        d();
        l()
    };

    function d() {
        var m = k;
        e.ajax({
            url: "ajax/mallCoupon_h.jsp?cmd=getCouponByMid",
            data: "mid=" + m.mid,
            dataType: "json",
            success: function(n) {
                if (n.success) {
                    if (n.receiveList) {
                        couponList[0] = n.receiveList
                    }
                    if (n.usedList) {
                        couponList[1] = n.usedList
                    }
                    if (n.expireList) {
                        couponList[2] = n.expireList
                    }
                    a()
                }
            },
            error: function() {}
        })
    }

    function a() {
        var p = k;
        var n = e(".couponListPanel");
        var m = [];
        m.push('<div class="tabList">');
        m.push('<div class="coupon-tab"><span><span class="">' + LS.notUse + '(</span><span class="coupon-amount">' + couponList[0].length + "</span><span>)</span></span><em></em></div>");
        m.push('<div class="coupon-tab"><span><span>' + LS.used + '(</span><span class="coupon-amount">' + couponList[1].length + "</span><span>)</span></span><em></em></div>");
        m.push('<div class="coupon-tab"><span><span>' + LS.expired + '(</span><span class="coupon-amount">' + couponList[2].length + "</span><span>)</span></span><em></em></div>");
        m.push("</div>");
        m.push("<div id='showCouponList'>");
        m.push(j());
        m.push("</div>");
        n.append(m.join(""));
        i(c);
        var o = jm("body").height()
    }

    function i(m) {
        jm(".coupon-tab").attr("style", "");
        jm(".coupon-tab").find("em").attr("style", "");
        var n = jm(".coupon-tab").eq(m);
        n.css({
            background: bgColor,
            color: "#fff",
            borderColor: bgColor
        });
        n.find("em").css({
            borderColor: bgColor + "transparent transparent transparent"
        })
    }

    function b() {
        if (e(".webHeaderBg").height() <= e("body")[0].scrollTop) {
            jm(".tabList").css({
                position: "fixed",
                width: jm(".couponListPanel").width() + "px"
            });
            jm("#showCouponList").css("margin-top", "1.7rem")
        } else {
            jm(".tabList").css({
                position: "",
                width: ""
            });
            jm("#showCouponList").css("margin-top", "")
        }
    }

    function l() {
        var m = k;
        Mobi.onTouchAndClickEvent(".coupon-tab", function() {
            if (jm(this).index() != c) {
                c = jm(this).index();
                i(c);
                e(".show-coupon-list").remove();
                e(".coupon-empty").remove();
                e("#showCouponList").append(j())
            }
        });
        document.addEventListener("touchstart", function(n) {
            b()
        }, false);
        document.addEventListener("touchmove", function(n) {
            b()
        }, false);
        document.addEventListener("touchend", function(n) {
            b()
        }, false);
        document.addEventListener("scroll", function() {
            b()
        }, false);
        Mobi.onTouchAndClickEvent(".icon-delIcon", function() {
            var p = e(this).parents(".coupon-warp");
            var q = p.attr("data_id");
            var o = LS.delCouponWillUnavail;
            if (c != 0) {
                o = LS.confirmDelCoupon
            }
            var n = {
                textClass: "confirm",
                content: o,
                callback: function() {
                    couponList[c].splice((pageno[c] - 1) * pageSize, 1);
                    e.ajax({
                        url: "ajax/member_h.jsp?cmd=delCoupon",
                        data: "mid=" + m.mid + "&cdid=" + q,
                        dataType: "json",
                        success: function(r) {
                            if (r.success) {
                                p.remove();
                                e(".coupon-tab").eq(c).find(".coupon-amount").text(couponList[c].length)
                            }
                        },
                        error: function() {}
                    });
                    jm("#mobiPrompt").remove();
                    jm("#mobiPrompt_Bg").remove()
                }
            };
            Mobi.prompt(n)
        })
    }

    function j() {
        var q = k,
            n = [],
            m = pageno[c];
        n = couponList[c];
        var o = [];
        if (n.length == 0) {
            o.push("<div class='coupon-empty'>");
            o.push("<div class='icon-coupons1'></div>");
            var p = "";
            if (c == 0) {
                p = jm.format(LS.notHasCoupon, LS.notUse)
            } else {
                if (c == 1) {
                    p = jm.format(LS.notHasCoupon, LS.used)
                } else {
                    if (c == 2) {
                        p = jm.format(LS.notHasCoupon, LS.expired)
                    }
                }
            }
            o.push("<div class='showMsg'>" + p + "</div>");
            o.push("</div>")
        } else {
            o.push("<div class='show-coupon-list'>");
            e.each(n, function(s, r) {
                if (c != 0) {
                    r.bg = 7
                }
                o.push("<div class='coupon-warp' data_id='" + r.cdId + "'>");
                o.push("<div class='coupon-code'>" + LS.couponNumber + "：" + r.redeemCode + "</div>");
                o.push("<div class='icon-delIcon'></div>");
                o.push("<div class='coupon-data'>");
                o.push("<div>" + LS.Event + LS.name + "：" + jm.encodeHtml(r.couponName) + "</div>");
                o.push("<div>" + LS.useCondition + "：" + r.orderMinPrice + "</div>");
                o.push("<div style='overflow:visible;'>" + LS.vilidaty + "：" + r.validity + "</div>");
                o.push("</div>");
                o.push("<div class='coupon' data_id='" + r.cdId + "'>");
                o.push("<div class='coupon-left coupon-" + couponColorList[r.bg] + "-left'></div>");
                o.push("<div class='coupon-content coupon-color-" + couponColorList[r.bg] + "'>");
                o.push("<div class='couponSavePrice'><span class='priceSign'>" + Fai.top.choiceCurrencyVal + "</span><span class='couponPrice'>" + r.savePrice + "</span></div>");
                o.push("</div>");
                o.push("<div class='coupon-right coupon-" + couponColorList[r.bg] + "-right'></div>");
                o.push("<div class='coupon-watermark'>券</div>");
                if (c == 2) {
                    o.push('<div class="fk-coupon-expired"></div>')
                }
                o.push("</div>");
                o.push("</div>")
            });
            o.push("</div>");
            if (couponList[c].length > pageSize) {}
        }
        return o.join("")
    }
    return f
})(jm);
Mobi.memberHeadPic = function(b, a) {
    this.sessionMid = b;
    this.headPicJson = a
};
(function(h, c, f) {
    var j = c.prototype;
    var l = h(".picArea .coverImg"),
        a = h(".picArea"),
        k = h("#headPic"),
        o, e, q, b, r, m, p, i;
    j.init = function() {
        this.initBind()
    };
    j.initBind = function() {
        var C = this;
        k.on({
            load: function() {
                m = h(this)[0].offsetTop;
                p = h(this)[0].offsetLeft;
                i = Math.min(h(this)[0].height, h(this)[0].width);
                b = m + h(this)[0].height / 2 - i / 2;
                r = p + h(this)[0].width / 2 - i / 2;
                k.css({
                    top: m + "px",
                    left: p + "px"
                });
                d()
            }
        });
        h("#memberHeadPic").click(function() {
            var D = setInterval(function() {
                if (h("#headPic")[0].complete) {
                    h("#profile").hide();
                    h(".middleCenter").css("padding-bottom", "0");
                    var E = h("#editMemberHeadPic");
                    E.css("height", h(window).height() + "px");
                    h("#editMemberHeadPic").show();
                    if (Mobi.deviceTypeIsMobi()) {
                        h("#coverBox").remove()
                    }
                    a.css("height", h(window).height() - Math.floor(h(".loginHeader").height()) - Math.floor(h(".editHeadPicFooter").height()) + "px");
                    o = Number(a.height());
                    e = Number(a.width());
                    m = (o - k.height()) / 2;
                    p = (e - k.width()) / 2;
                    if (h.toJSON(C.headPicJson) == "{}" || C.headPicJson.thumbId == "") {
                        b = m;
                        r = p;
                        i = Number(k.width())
                    } else {
                        var F = C.headPicJson.imgW / k.width();
                        b = m + C.headPicJson.top / F;
                        r = p + C.headPicJson.left / F;
                        i = C.headPicJson.width / F
                    }
                    k.css({
                        top: m + "px",
                        left: p + "px"
                    });
                    q = Math.min(k.width(), k.height());
                    d();
                    clearInterval(D)
                }
            }, 50)
        });
        h(".editHeadPicFooter .saveBtn").click(function() {
            var D = h(this).attr("mid");
            var E = h(this).attr("newimg");
            var G = h(this).attr("oldimgid");
            var F = {};
            if (!E && !G) {
                h("#editMemberHeadPic").hide();
                h("#profile").show();
                return
            }
            C.headPicJson.width = Math.round(i);
            C.headPicJson.top = Math.round(b - m);
            C.headPicJson.left = Math.round(r - p);
            C.headPicJson.imgH = Math.round(k[0].height);
            C.headPicJson.imgW = Math.round(k[0].width);
            if (E != null) {
                $.ajax({
                    type: "post",
                    url: "ajax/member_h.jsp?cmd=cimg",
                    data: "oldImgId=" + G + "&mid=" + D + "&newImg=" + h.encodeUrl(E),
                    async: false,
                    error: function() {
                        Mobi.ing(LS.memberProfileError)
                    },
                    success: function(H) {
                        H = JSON.parse(H);
                        if (H.success) {
                            C.headPicJson.thumbId = H.fileId
                        }
                    }
                })
            } else {
                C.headPicJson.thumbId = G
            }
            F.headPic = C.headPicJson;
            $.ajax({
                type: "post",
                async: false,
                url: "ajax/member_h.jsp?cmd=set",
                data: "id=" + D + "&info=" + h.encodeUrl(h.toJSON(F)),
                error: function() {
                    Mobi.ing(LS.memberProfileError)
                },
                success: function(H) {
                    var I = jQuery.parseJSON(H);
                    if (I.success) {
                        C.headPicJson.path = k.attr("src");
                        Mobi.initMemberHeadPic(C.headPicJson);
                        h("#editMemberHeadPic").hide();
                        h("#profile").show();
                        Mobi.ing(LS.saveMemHeadImgSuc, 1)
                    } else {
                        Mobi.ing(LS.memberProfileError)
                    }
                }
            })
        });
        var s, y, w, z, w, x, t, v, u;
        h(".picArea").on({
            touchstart: function(D) {
                var F = D.touches.length;
                s = l[0].offsetTop;
                y = l[0].offsetLeft;
                i = l[0].width;
                if (F == 1) {
                    D.preventDefault();
                    var E = D.touches[0];
                    x = {
                        x: E.pageX,
                        y: E.pageY
                    }
                } else {
                    z = n(D).dist;
                    w = i
                }
            },
            touchmove: function(E) {
                var H = E.touches.length;
                q = Math.min(k.width(), k.height());
                if (H == 1) {
                    E.preventDefault();
                    var G = E.touches[0];
                    t = {
                        x: G.pageX,
                        y: G.pageY
                    };
                    v = t.x - x.x;
                    u = t.y - x.y;
                    b = s + u;
                    r = y + v;
                    d()
                } else {
                    var F = n(E).dist,
                        D = F / z;
                    i = Math.round(w * D);
                    b = s + (w - i) / 2;
                    r = y + (w - i) / 2;
                    d()
                }
            }
        });
        var A = false;
        h("body").on("mouseup", function() {
            A = false
        });
        h(".picArea").on({
            mousedown: function(E) {
                s = l[0].offsetTop;
                y = l[0].offsetLeft;
                w = l[0].width;
                x = {
                    x: E.pageX,
                    y: E.pageY
                };
                A = true;
                var D = E.target.id;
                if (D == "coverBox" || D == "coverImg") {
                    B(0)
                } else {
                    if (D == "dragBotCenter" || D == "dragRightCenter" || D == "dragRightBot") {
                        B(1)
                    } else {
                        if (D == "dragLeftCenter" || D == "dragLeftBot") {
                            B(2)
                        } else {
                            if (D == "dragTopCenter" || D == "dragRightTop") {
                                B(3)
                            } else {
                                if (D == "dragLeftTop") {
                                    B(4)
                                }
                            }
                        }
                    }
                }
            },
            mouseup: function() {
                A = false
            }
        }, "#coverBox,#coverImg");

        function B(D) {
            document.onmousemove = function(E) {
                if (!A) {
                    return
                }
                t = {
                    x: E.pageX,
                    y: E.pageY
                };
                v = t.x - x.x;
                u = t.y - x.y;
                switch (D) {
                    case 0:
                        i = w;
                        b = s + u;
                        r = y + v;
                        break;
                    case 1:
                        i = w + Math.max(v, u);
                        b = s;
                        r = y;
                        break;
                    case 2:
                        i = w - v;
                        b = s;
                        r = y + v;
                        break;
                    case 3:
                        i = w + v;
                        b = s - v;
                        r = y;
                        break;
                    case 4:
                        i = w - v;
                        b = s + v;
                        r = y + v;
                        break
                }
                d()
            }
        }
    };

    function d() {
        if (i < 100) {
            i = 100
        } else {
            if (i > Math.min(k[0].height, k[0].width)) {
                i = Math.min(k[0].height, k[0].width)
            }
        }
        if (b < m) {
            b = m
        } else {
            if (b > m + k[0].height - i) {
                b = m + k[0].height - i
            }
        }
        if (r < p) {
            r = p
        } else {
            if (r > p + k[0].width - i) {
                r = p + k[0].width - i
            }
        }
        if (b >= m && b <= m + k[0].height - i && r >= p && r <= p + k[0].width - i) {
            l.css({
                width: i + "px",
                height: i + "px",
                top: b + "px",
                left: r + "px"
            });
            h(".picArea .coverRing").css({
                width: i - 2 + "px",
                height: i - 2 + "px",
                top: b + "px",
                left: r + "px"
            });
            h(".picArea .coverBox").css({
                width: i + "px",
                height: i + "px",
                top: b - 1 + "px",
                left: r - 1 + "px"
            });
            h(".picArea .cover1").css({
                width: "100%",
                height: b + "px",
                top: 0,
                left: 0
            });
            h(".picArea .cover2").css({
                width: r + "px",
                height: i + "px",
                top: b + "px",
                left: 0
            });
            h(".picArea .cover4").css({
                width: e - i - r + "px",
                height: i + "px",
                top: b + "px",
                left: i + r + "px"
            });
            h(".picArea .cover5").css({
                width: "100%",
                height: o - i - b + "px",
                top: i + b + "px",
                left: 0
            })
        }
    }

    function n(z) {
        var w = 0,
            y = 0,
            u = 0,
            x = 0,
            t = 0,
            v = 0,
            s = {};
        w = z.touches[0].pageX;
        u = z.touches[1].pageX;
        y = z.touches[0].pageY - document.body.scrollTop;
        x = z.touches[1].pageY - document.body.scrollTop;
        if (!w || !u) {
            return
        }
        if (w <= u) {
            t = (u - w) / 2 + w
        } else {
            t = (w - u) / 2 + u
        }
        if (y <= x) {
            v = (x - y) / 2 + y
        } else {
            v = (y - x) / 2 + x
        }
        s = {
            dist: Math.round(Math.sqrt(Math.pow(w - u, 2) + Math.pow(y - x, 2))),
            x: Math.round(t),
            y: Math.round(v)
        };
        return s
    }
})(jm, Mobi.memberHeadPic);
Mobi.deviceTypeIsMobi = function() {
    var c = navigator.userAgent.toLowerCase();
    var h = c.match(/ipad/i) == "ipad";
    var i = c.match(/iphone os/i) == "iphone os";
    var f = c.match(/midp/i) == "midp";
    var d = c.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var e = c.match(/ucweb/i) == "ucweb";
    var a = c.match(/android/i) == "android";
    var b = c.match(/windows ce/i) == "windows ce";
    var j = c.match(/windows mobile/i) == "windows mobile";
    if (h || i || f || d || e || a || b || j) {
        return true
    } else {
        return false
    }
};
Mobi.reloadMemberImg = function(b, f) {
    var d = jm("#headPic"),
        e = jm(".picArea"),
        a = Number(e.height()),
        h = Number(e.width());
    if (b == "new") {
        var c = new Image();
        c.src = f.smallPath;
        c.onload = function() {
            d.attr("src", f.smallPath);
            imgTop = (a - d.height()) / 2;
            imgLeft = (h - d.width()) / 2;
            d.css({
                top: imgTop + "px",
                left: imgLeft + "px"
            });
            jm(".editHeadPicFooter .saveBtn").attr("newimg", jm.toJSON(f))
        }
    }
};
Mobi.initMemberUploadImg = function(d, e, k, l, i, j, m, c) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.src = l;
    b.onload = function() {
        var n = document.createElement("script");
        if (c == "true") {
            n.src = m
        } else {
            n.src = i
        }
        n.type = "text/javascript";
        h.appendChild(n);
        n.onload = function() {
            if (c == "true") {
                Mobi.mobiMemberUploadImgSWF("file_upload", d, e, 1, j)
            } else {
                Mobi.mobiMemberUploadImgHtml("file_upload", d, e, j)
            }
        }
    };
    var h = document.documentElement || document.body;
    h.appendChild(b);
    var a = jm("#headPic").attr("_src");
    var f = new Image();
    f.src = a;
    jm("#headPic").attr("src", a)
};
Mobi.mobiMemberUploadImgSWF = function(e, c, h, b, a) {
    var f = h.split(",");
    var d = {
        file_post_name: "Filedata",
        upload_url: "ajax/memberHeadImgUp_h.jsp",
        button_placeholder_id: e,
        file_size_limit: c + "MB",
        button_image_type: 3,
        file_queue_limit: 1,
        button_cursor: SWFUpload.CURSOR.HAND,
        requeue_on_error: false,
        post_params: {
            ctrl: "Filedata",
            app: 21,
            type: 0,
            fileUploadLimit: c
        },
        file_types: f.join(";"),
        file_dialog_complete_handler: function(i) {
            this._allSuccess = false;
            this.startUpload()
        },
        file_queue_error_handler: function(j, i, k) {
            switch (i) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    Mobi.ing(LS.mobiFormSubmitCheckFileSizeErr, true);
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    Mobi.ing(LS.mobiFormSubmitFileUploadNotAllow, true);
                    break;
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadOneTimeNum, "1"), true);
                    break;
                default:
                    Mobi.ing(LS.mobiFormSubmitFileUploadReSelect, true);
                    break
            }
        },
        upload_success_handler: function(j, i) {
            var k = jQuery.parseJSON(i);
            this._allSuccess = k.success;
            this._sysResult = k.msg;
            if (k.success) {
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(j.name)), true)
                }, 1800);
                Mobi.reloadMemberImg("new", k)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + j.name + "   " + k.msg)
            }
        },
        upload_error_handler: function(j, i, k) {
            if (i == -280) {
                Mobi.ing(LS.mobiFormSubmitFileUploadFileCancle, false)
            } else {
                if (i == -270) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadFileExist, jm.encodeHtml(j.name)), true)
                } else {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(j.name)))
                }
            }
        },
        upload_complete_handler: function(i) {
            if (i.filestatus == SWFUpload.FILE_STATUS.COMPLETE) {
                setTimeout(function() {
                    swfObj.startUpload()
                }, swfObj.upload_delay)
            } else {
                if (i.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(i.name)))
                }
            }
        },
        upload_start_handler: function(i) {
            Mobi.ing(LS.mobiFormSubmitFileUploadPrepare, false)
        },
        view_progress: function(i, l, k, j) {
            var j = Math.ceil((l / k) * 100);
            if (isNaN(j)) {
                return
            }
            if (j == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + j + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + j + "%", false)
            }
        }
    };
    swfObj = SWFUploadCreator.create(d)
};
Mobi.mobiMemberUploadImgHtml = function(h, d, e, f) {
    var a = e.split(",");
    var c = jm("#_TOKEN").attr("value");
    var i = {
        siteFree: false,
        updateUrlViewRes: "",
        auto: true,
        fileTypeExts: a.join(";"),
        multi: false,
        fileSizeLimit: d * 1024 * 1024,
        breakPoints: true,
        saveInfoLocal: false,
        showUploadedPercent: true,
        removeTimeout: 9999999,
        getFileSizeUrlFlag: true,
        post_params: {
            app: 21,
            type: 0,
            fileUploadLimit: d,
            isSiteForm: true
        },
        isOrnotButton: true,
        buttonText: "",
        uploader: "http://" + f + "/ajax/memberHeadImgUp_h.jsp?cmd=mobiUpload&_TOKEN=" + c,
        onUploadStart: function(k) {
            jm("#progressBody_ " + k.id).remove();
            jm("#progressWrap_" + k.id).remove()
        },
        onUploadSuccess: function(k, m) {
            var l = jm.parseJSON(m);
            if (l.success) {
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(k.name)), true)
                }, 1800);
                Mobi.reloadMemberImg("new", l)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + k.name + "   " + l.msg)
            }
        },
        onUploadError: function(k, l) {
            jm("#progressWrap_" + k.id).remove();
            Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(k.name)))
        },
        view_progress: function(k) {
            var k = Math.ceil(k);
            if (isNaN(k)) {
                return
            }
            if (k == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + k + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + k + "%", false)
            }
        }
    };
    upload = jm("#" + h).uploadify(i);
    var j = "file_upload_pt_1";
    var b = "select_btn_pt_1";
    jm("#file_upload_1-button").attr("id", j);
    jm("#select_btn_1").attr("id", b);
    if (Fai.top._manageMode) {
        jm("#file_upload_pt_1").attr("disabled", "true")
    }
};
Mobi.initMemberHeadPic = function(b) {
    var a = jm("#memberHeadPic"),
        c = jm(".icon-pnameIcon");
    if (typeof b.path != undefined) {
        a.attr("src", b.path)
    }
    if (b.width != 0) {
        var f = b.width / c.width(),
            e = -(b.top / f) + "px",
            d = -b.left / f + "px";
        a.css({
            width: b.imgW / f + "px",
            height: b.imgH / f + "px",
            marginTop: e,
            marginLeft: d
        })
    }
};
Mobi.memberProfileSubmit = function(i, a) {
    var c = {};
    if (a) {
        var d = jm("#oldPsw").val();
        if (d == null || d == "") {
            Mobi.ing(LS.memberProfileOldPwdEmpty);
            Mobi.getPreviewObject("oldPsw").focus();
            return
        }
        var h = jm("#newPsw").val();
        if (h == null || h == "") {
            Mobi.ing(LS.memberProfilePwdEmpty);
            Mobi.getPreviewObject("newPsw").focus();
            return
        }
        if (h.length < 4) {
            Mobi.ing(LS.memberProfilePwdMinLength);
            Mobi.getPreviewObject("newPsw").focus();
            return
        }
        var e = jm("#confirmPsw").val();
        if (h != e) {
            Mobi.ing(LS.memberProfilePwdNotMatch);
            Mobi.getPreviewObject("confirmPsw").focus();
            return
        }
        c.oldPwd = jm.md5(d);
        c.pwd = jm.md5(h)
    } else {
        var j = jm("#profileValue").attr("maxlength");
        var f = jm("#profileValue").attr("name");
        var b = jm("#profileValue").val();
        c[f] = b;
        if (b.length > j) {
            Mobi.ing(jm.format(LS.memberProfileUserEditItemMaxLength, f, j));
            Mobi.getPreviewObject("profileValue").focus();
            return false
        }
        if (jm("#profileValue").attr("ismust") === "true") {
            if (b == null || b == "") {
                if (jm(this).is("input")) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty, jm("#modifyProfile").find(".title").html()))
                } else {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemIsEmpty2, jm("#modifyProfile").find(".title").html()))
                }
                Mobi.getPreviewObject("profileValue").focus();
                return false
            }
            if (f === "email" && b.length > 0) {
                if (!jm.isEmail(b)) {
                    Mobi.ing(jm.format(LS.memberProfileItemCorrect, f));
                    Mobi.getPreviewObject("profileValue").focus();
                    return false
                }
            }
        }
    }
    Mobi.ing(LS.memberProfileSubmitting, -1);
    jm(".g_button").removeClass("sendIcon");
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=set",
        data: "id=" + i + "&info=" + jm.encodeUrl(jm.toJSON(c)),
        error: function() {
            Mobi.ing(LS.memberProfileError)
        },
        success: function(k) {
            var l = jm.parseJSON(k);
            if (l.success) {
                Mobi.ing(LS.memberProfileOK, 1);
                document.location.reload()
            } else {
                jm(".g_button").addClass("sendIcon");
                jm(".loginIcon ").hide();
                if (l.rt = -3) {
                    Mobi.ing(LS.memberProfileOldPwdIncorrectError)
                } else {
                    Mobi.ing(LS.memberProfileError)
                }
            }
        }
    })
};
Mobi.getMProtocol = function(a, b) {
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=getProContent",
        error: function() {
            Mobi.ing(LS.memberProfileError)
        },
        success: function(c) {
            var d = jm.parseJSON(c);
            if (d.success) {
                jm("#mProPage").find(".title").html(d.proName);
                jm("#mProPage").find(".set-line").html(d.msg);
                window.scrollTo(0, 0);
                jm("#signupPage").hide();
                jm("#mProPage").show()
            } else {
                alert("服务器连接错误!")
            }
        }
    })
};
Mobi.checkMustItem = function(a) {
    jm(a).find(".mustItem").on("keyup focusout", function() {
        var b = true;
        jm(a).find(".mustItem").each(function() {
            if (jm(this).val().trim() === "") {
                b = false;
                return
            }
        });
        if (b === true) {
            jm(".sendIcon").removeAttr("disabled")
        }
    })
};
Mobi.setPersonalInfo = function(c) {
    var f = {};
    var e = "";
    var a = "";
    var b = "";
    var h = 0;
    var d = false;
    jm(".infoItem").each(function() {
        e = jm(this).attr("name");
        a = jm(this).val();
        b = jm(this).attr("placeholder");
        d = (jm(this).attr("class").indexOf("mustItem") < 0) ? false : true;
        if (!h && d && (a == null || a == "")) {
            Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, b));
            this.focus();
            h = 1
        }
        if (!h && e == "email" && a.length > 0) {
            if (!jm.isEmail(a)) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, b));
                this.focus();
                h = 1
            }
        }
        if (!h && e == "phone" && a.length > 0) {
            if (!jm.isPhone(a)) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, b));
                this.focus();
                h = 1
            }
        }
        if (!h && e == "mobile" && a.length > 0) {
            if (jm(this).attr("disabled") != "disabled") {
                if (!Mobi.isNationMobile(a)) {
                    Mobi.ing(LS.mobileNumRegular);
                    this.focus();
                    h = 1
                }
            } else {
                a = ""
            }
        }
        f[e] = a;
        if (e == "mobile" && a.length <= 0) {
            f.mobileCt = ""
        }
    });
    if (h === 0) {
        jm.ajax({
            type: "post",
            url: "ajax/member_h.jsp?cmd=set",
            data: "id=" + c + "&info=" + jm.encodeUrl(jm.toJSON(f)),
            error: function() {
                Mobi.ing(LS.memberProfileError)
            },
            success: function(i) {
                var j = jm.parseJSON(i);
                if (j.success) {
                    Mobi.ing(LS.memberProfileOK, 1);
                    document.location.reload()
                } else {
                    if (j.rt == -3) {
                        Mobi.ing(LS.memberProfileOldPwdIncorrectError)
                    } else {
                        if (j.mobileErr) {
                            Mobi.ing(LS.mobileNumRegular)
                        } else {
                            Mobi.ing(LS.memberProfileError)
                        }
                    }
                }
            }
        })
    }
};
Mobi.hidePlaceholder = function() {
    var e = document.querySelectorAll(".mustItem");
    var d = document.querySelectorAll(".g_input");
    var a = document.querySelectorAll(".g_textArea");
    var c = "";
    for (var b = 0; b < d.length; b++) {
        d[b].onfocus = function() {
            c = this.placeholder;
            this.placeholder = "";
            jm(this).removeClass("fk-inputFontColor")
        };
        d[b].onblur = function() {
            this.placeholder = c;
            jm(this).addClass("fk-inputFontColor")
        }
    }
    for (var b = 0; b < a.length; b++) {
        a[b].onfocus = function() {
            c = this.placeholder;
            this.placeholder = ""
        };
        a[b].onblur = function() {
            this.placeholder = c
        }
    }
};
Mobi.checkLabel = function(a) {
    var b = jm(a).find("span").attr("class");
    if (b === "icon-checkIcon g_mainColor") {
        b = "icon-uncheckIcon g_mainColor";
        jm(a).parent().find("input").attr("checked", "")
    } else {
        if (b === "icon-uncheckIcon g_mainColor") {
            b = "icon-checkIcon g_mainColor";
            jm(a).parent().find("input").removeAttr("checked")
        }
    }
    jm(a).find("span").attr("class", b)
};
Mobi.memberFdPwd = function(a, c) {
    jm(".J_showFindPwWay").html("");
    var b = jm.trim(jm("#macct").val());
    if (b == "") {
        Mobi.ing(LS.memberInputAcct, true);
        Mobi.getPreviewObject("macct").focus();
        return
    }
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=getMAcctMail",
        data: "mAcct=" + jm.encodeUrl(b),
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(d) {
            var d = jm.parseJSON(d);
            if (d.success) {
                if (!d.findPwByMobileOpen) {
                    if (d.noMail) {
                        Mobi.ing(LS.memberDialogNoEmailMsg);
                        return
                    }
                }
                if (!d.findPwByMailOpen) {
                    if (d.mobile == null || d.mobile == "null" || "" == d.mobile) {
                        Mobi.ing(LS.memberDialogNoMobile);
                        return
                    }
                }
                if (d.noMail && (d.mobile == "null" || "" == d.mobile)) {
                    Mobi.ing(LS.memberDialogNoMailMobile);
                    return
                }
                jm(".J_memberFdPwdBtn").remove();
                var e = [];
                e.push('<div class="fk-mem-findPwStepOneFindWay"style="">');
                e.push(LS.memberFdPwdWay + ":");
                e.push("</div>");
                if (d.findPwByMailOpen) {
                    if (d.noMail) {
                        e.push('<div class="fk-mem-findPwStepOne" onclick="Mobi.findPwByMailShowNoMail()">')
                    } else {
                        e.push('<div class="fk-mem-findPwStepOne" onclick=Mobi.findPwByMailStepTwo("' + b + '","' + a + '","' + c + '","' + d.mail + '")>')
                    }
                    e.push('<span class="content">');
                    e.push(LS.memberFdPwdWayByMail);
                    e.push("</span>");
                    e.push('<span class="icon-gGoforward">');
                    e.push("</span>");
                    e.push("</div>")
                }
                if (d.findPwByMobileOpen) {
                    if (d.mobile == "null" || "" == d.mobile) {
                        e.push('<div class="fk-mem-findPwStepOne" onclick="Mobi.findPwByMobileShowNoMb()">')
                    } else {
                        e.push('<div class="fk-mem-findPwStepOne" onclick=Mobi.sendFindPwMobileCode("' + b + '",true,"' + a + '","' + c + '","' + d.mobile + '")>')
                    }
                    e.push('<span class="content">');
                    e.push(LS.memberFdPwdWayByMobile);
                    e.push("</span>");
                    e.push('<span class="icon-gGoforward">');
                    e.push("</span>");
                    e.push("</div>")
                }
                e = e.join("");
                jm(".J_showFindPwWay").append(e)
            } else {
                if (d.notFound) {
                    Mobi.ing(LS.memberDialogNotFound, true)
                } else {
                    Mobi.ing(LS.argsError, true)
                }
            }
        }
    })
};
Mobi.findPwByMailShowNoMail = function() {
    Mobi.ing(LS.memberShowNoMail)
};
Mobi.findPwByMobileShowNoMb = function() {
    Mobi.ing(LS.memberShowNoMobile)
};
Mobi.findPwByMailStepTwo = function(c, b, e, a) {
    jm("#memberFdPwdStepOne").hide();
    var d = ['<div class="formMiddleContent moduleContent" id="memberFdPwdStepTwo">', '<div class="loginHeader webHeaderBg">', '<a onclick="history.go(0);" class="g_close icon-gClose"></a>', '<span class="title pageTitle">', LS.memberDialogFwdStepOneTitle, "</span>", "</div>", '<div class="g_globalLine fk-mem-findPw-showMsg"><div class="showMsg">', "", LS.memberDialogSendedMsg, "&nbsp", a, "&nbsp", LS.memberDialogViewMail, "", "</div></div>", '<div class="loginContent">', '<div class="g_globalLine">', '<input type="text" maxlength="4"  id="memEmailCode" class="itemEdit g_input mustItem" placeholder="', LS.memberDialogPleaseEnterCode, '"/>', '<input style="display:none;" type="text" id="memMailCodeSign" disabled/>', '<span class="icon-pswIcon icon-codeIcon g_mainColor"></span>', "</div>", '<div class="g_globalLine">', '<input type="button" id="sendEmailCode" style="width:49%;float:left;" class="g_button sendIcon" onclick="Mobi.sendMemberEmailPwdCode(\'' + c + '\');" value="', LS.memberDialogReSendMsg, '(60)" disabled/>', '<input type="button" style="width:49%;float:left;margin-left:2%;" class="g_button sendIcon" onclick="Mobi.memberFdPwdStepThree(\'' + c + "','" + b + "','" + e + '\');" value="', LS.memberDialogNextStep, '"/>', "</div>", "</div>", "</div>", ];
    d = d.join("");
    jm(".middleCenter").append(d);
    Mobi.sendMemberEmailCodeImgFix("#memEmailCode", b);
    Mobi.sendMemberEmailPwdCode(c)
};
Mobi.findPwByMobileStepTwo = function(d, b, h, c, a) {
    jm("#memberFdPwdStepOne").hide();
    jm("#memberFdPwdStepTwo").remove();
    var e = ['<div class="formMiddleContent moduleContent" id="memberFdPwdStepTwo">', '<div class="loginHeader webHeaderBg">', '<a onclick="history.go(0);" class="g_close icon-gClose"></a>', '<span class="title pageTitle">', LS.memberDialogFwdStepOneTitle, "</span>", "</div>", '<div class="g_globalLine fk-mem-findPw-showMsg"><div class="showMsg">', "", LS.fdPwdHasSendMobileCode, "&nbsp", c, "&nbsp", LS.pleaseCheckMobileCode, "", "</div></div>", '<div class="loginContent">', '<div class="g_globalLine fk-findPwByMobile">', '<input type="text" maxlength="6"  id="memEmailCode" class="itemEdit g_input mustItem" placeholder="', LS.inputMobileCode, '"/>', '<input style="display:none;" type="text" id="memMailCodeSign" value="' + a + '" disabled/>', '<span class="icon-pswIcon icon-codeIcon g_mainColor"></span>', "</div>", '<div class="g_globalLine">', '<input type="button" id="sendEmailCode" style="width:49%;float:left;" class="g_button sendIcon" onclick=Mobi.sendFindPwMobileCode("' + d + '",true,"' + b + '","' + h + '","' + c + '") value="', LS.memberDialogReSendMsg, '(60)" disabled/>', '<input type="button" style="width:49%;float:left;margin-left:2%;" class="g_button sendIcon" onclick=Mobi.memberFdPwdByMobileStepThree("' + d + '","' + b + '","' + h + '") value="', LS.memberDialogNextStep, '"/>', "</div>", "</div>", "</div>", ];
    e = e.join("");
    jm(".middleCenter").append(e);
    Mobi.sendMemberEmailCodeImgFix("#memEmailCode", b);
    var f = jm("#sendEmailCode");
    Mobi.codeTimeCountDown(f)
};
Mobi.sendFindPwMobileCode = function(d, b, a, e, c) {
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=sendMemberPwdMobileCode",
        data: "memName=" + jm.encodeUrl(d),
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(f) {
            var f = jm.parseJSON(f);
            if (f.success) {
                if (b) {
                    Mobi.findPwByMobileStepTwo(d, a, e, c, f.mobileCodeSign)
                }
            } else {
                if (f.argErr) {
                    Mobi.ing(LS.memberDialogSendMobileClose)
                } else {
                    if (f.apiKeyNotFound) {
                        Mobi.ing(LS.memberDialogYunPianErr)
                    } else {
                        if (f.tplNotFound) {
                            Mobi.ing(LS.memberDialogMobileTplErr)
                        } else {
                            if (f.notFound) {
                                Mobi.ing(LS.memberDialogNotFound)
                            } else {
                                if (f.limitOne) {
                                    Mobi.ing(LS.getMobileOneMin)
                                } else {
                                    if (f.limitTwo) {
                                        Mobi.ing(LS.getMobileHalfHour)
                                    } else {
                                        if (f.noMoney) {
                                            Mobi.ing(LS.memberDialogMobileMoneyErr)
                                        } else {
                                            if (f.mobileErr) {
                                                Mobi.ing(LS.memberDialogSendMobileCodeErr)
                                            } else {
                                                if (f.sendLimit) {
                                                    Mobi.ing(LS.memberDialogSendMobileCodeLimit)
                                                } else {
                                                    if (f.mobileSysErr) {
                                                        Mobi.ing(LS.memberDialogSendMobileSysErr)
                                                    } else {
                                                        if (f.systemErr) {
                                                            Mobi.ing(LS.systemError)
                                                        } else {
                                                            if (f.tplNationErr) {
                                                                Mobi.ing(LS.mobileNationTplErr)
                                                            } else {
                                                                Mobi.ing(LS.argsError)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
Mobi.sendMemberEmailCodeImgFix = function(b, a) {
    if (a == 2052) {
        jm(b).css("padding-left", "3.5rem")
    } else {
        jm(b).css("padding-left", "2rem")
    }
};
Mobi.sendMemberEmailPwdCode = function(a) {
    var b = jm("#sendEmailCode");
    Mobi.codeTimeCountDown(b);
    jm.ajax({
        type: "post",
        url: "ajax/mail_h.jsp?cmd=sendMemberPwdEmail",
        data: "memName=" + jm.encodeUrl(a),
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(c) {
            var c = jm.parseJSON(c);
            if (c.success) {
                jm("#memMailCodeSign").val(c.emailCodeSign)
            } else {
                if (c.notFound) {
                    Mobi.ing(LS.memberDialogNotFound, true)
                } else {
                    Mobi.ing(LS.argsError, true);
                    b.val(LS.memberDialogReSendMsg)
                }
            }
        }
    })
};
Mobi.codeTimeCountDown = function(c) {
    var b = 60;
    a(c);

    function a(d) {
        if (b == 0) {
            d.removeAttr("disabled");
            d.val(LS.memberDialogReSendMsg);
            return
        } else {
            d.attr("disabled", true);
            d.val("" + LS.memberDialogReSendMsg + "(" + b + ")");
            b--
        }
        setTimeout(function() {
            a(d)
        }, 1000)
    }
};
Mobi.memberFdPwdByMobileStepThree = function(b, a, f) {
    var d = jm("#memEmailCode").val();
    if (!d || d.length < 0) {
        Mobi.ing(LS.inputMobileCode);
        return
    }
    var c = jm("#memMailCodeSign").val();
    var e = "memMobileCode=" + jm.encodeUrl(d) + "&memMobileCodeSign=" + jm.encodeUrl(c) + "&memName=" + jm.encodeUrl(b);
    jm.ajax({
        type: "post",
        url: "ajax/member_h.jsp?cmd=checkFindPwdByMobileCode",
        data: e,
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(h) {
            var h = jm.parseJSON(h);
            if (h.success) {
                Mobi.memberFdPwdStepThreeSd(b, a, f)
            } else {
                if (h.argErr) {
                    Mobi.ing(LS.argsError, true)
                } else {
                    if (h.notFound) {
                        Mobi.ing(LS.memberDialogNotFound, true)
                    } else {
                        Mobi.ing(LS.reGetMobileCode, true)
                    }
                }
            }
        }
    })
};
Mobi.memberFdPwdStepThree = function(d, c, f) {
    var a = jm("#memEmailCode").val();
    if (!a || a.length < 0) {
        Mobi.ing(LS.memberDialogPleaseEnterCode);
        return
    }
    var b = jm("#memMailCodeSign").val();
    var e = "memEmailCode=" + jm.encodeUrl(a) + "&memMailCodeSign=" + jm.encodeUrl(b) + "&memName=" + jm.encodeUrl(d);
    jm.ajax({
        type: "post",
        url: "ajax/mail_h.jsp?cmd=checkPwdEmailCode",
        data: e,
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(h) {
            var h = jm.parseJSON(h);
            if (h.success) {
                Mobi.memberFdPwdStepThreeSd(d, c, f)
            } else {
                Mobi.ing(LS.memberDialogCodeMailFailure, true)
            }
        }
    })
};
Mobi.memberFdPwdStepThreeSd = function(b, a, d) {
    jm("#memberFdPwdStepTwo").hide();
    var c = ['<div class="formMiddleContent moduleContent" id="memberFdPwdStepThree">', '<div class="loginHeader webHeaderBg">', '<a onclick="history.go(0);" class="g_close icon-gClose"></a>', '<span class="title  pageTitle">', LS.memberDialogResetPwd, "</span>", "</div>", '<div class="loginContent">', '<div class="g_globalLine">', '<input type="password" id="memPwd" class="itemEdit g_input mustItem" placeholder="', LS.memberDialogPleaseEnterPwd, '"/>', '<span class="icon-pswIcon icon-npwdIcon g_mainColor"></span>', "</div>", '<div class="g_globalLine">', '<input type="password" id="memPwd2" class="itemEdit g_input mustItem" placeholder="', LS.memberDialogPleaseEnterPwd2, '"/>', '<span class="icon-pswIcon icon-npwdIcon g_mainColor"></span>', "</div>", '<div class="g_globalLine">', '<input type="button" class="g_button sendIcon" onclick="Mobi.memberFdPwdStepLast(\'' + b + "','" + d + '\');" value="', LS.memberDialogConfirm, '"/>', "</div> ", "</div>", "</div>", ];
    c = c.join("");
    jm(".middleCenter").append(c);
    Mobi.sendMemberEmailCodeImgFix("#memPwd", a);
    Mobi.sendMemberEmailCodeImgFix("#memPwd2", a)
};
Mobi.memberFdPwdStepLast = function(b, e) {
    var a = jm("#memPwd").val();
    var d = jm("#memPwd2").val();
    if (!a) {
        Mobi.ing(LS.memberDialogPleaseEnterPwd, true);
        return
    } else {
        if (!d) {
            Mobi.ing(LS.memberDialogPleaseEnterPwd2, true);
            return
        } else {
            if (a != d) {
                Mobi.ing(LS.memberDialogPwdDifToPwd2, true);
                return
            } else {
                if (a.length < 4 || a.length > 20) {
                    Mobi.ing(jm.format(LS.memberDialogPwdLimit, 4, 20));
                    return
                }
            }
        }
    }
    var c = "&memPwd=" + jm.md5(a) + "&memName=" + jm.encodeUrl(b);
    jm.ajax({
        type: "post",
        url: "ajax/mail_h.jsp?cmd=setMemberPwd",
        data: c,
        error: function() {
            Mobi.ing(LS.systemError, false)
        },
        success: function(f) {
            var f = jm.parseJSON(f);
            if (f.success) {
                jm("#memberFdPwdStepThree").hide();
                var h = ['<div class="formMiddleContent moduleContent" id="memberFdPwdStepLast">', '<div class="loginHeader webHeaderBg">', '<a onclick="history.go(0);" class="g_close icon-gClose"></a>', '<span class="title pageTitle">', LS.memberDialogModified, "</span>", "</div>", '<div class="loginContent">', '<div class="g_globalLine">', '<div class="g_circle">', '<span class="icon-lockstarIcon g_mainColor"></span>', "</div>", '<span class="title">', LS.memberDialogPwdforced, "</span>", "</div>", '<div class="g_globalLine" style="margin-top:1.5rem;">', '<input type="button" class="g_button sendIcon" onclick="document.location.href=\'' + e + '\'" value="', LS.memberDialogHome, '"/>', "</div> ", "</div>", "</div>", ];
                h = h.join("");
                jm(".middleCenter").append(h)
            } else {
                if (f.notFound) {
                    Mobi.ing(LS.memberDialogNotFound, true)
                } else {
                    Mobi.ing(LS.argsError, true)
                }
            }
        }
    })
};
Mobi.initModulePhotoList = function(u, e, c) {
    if (!u || !c) {
        return
    }
    var n = Mobi.getPreviewObject("photoListDetailShow" + u);
    if (n) {
        n.parentNode.removeChild(n)
    }
    module = "module" + u;
    var k = document.getElementById(module),
        d = document.getElementById("webFooterBox"),
        v = document.createElement("div"),
        o = document.createElement("div"),
        h = document.createElement("div"),
        m = document.createElement("div");
    m.className = "photoDetailClose";
    v.appendChild(m);
    o.className = "webPhotoListDetail";
    o.id = "webPhotoListDetail" + u;
    for (var r = 0; r < c.length; r++) {
        var a = document.createElement("div");
        a.className = "photoDetail";
        var j = document.createElement("img");
        var l = document.createElement("span");
        l.className = "imageSpan";
        j.setAttribute("vwidth", c[r].width);
        j.setAttribute("vheight", c[r].height);
        a.appendChild(l);
        a.appendChild(j);
        o.appendChild(a)
    }
    v.appendChild(o);
    h.className = "photoDetailDescription descriptionClose";
    h.id = "photoDetailDescription" + u;
    var p = document.createElement("div");
    p.className = "handleDiv";
    var b = document.createElement("div");
    b.className = "drawer_handle";
    var t = document.createElement("div");
    t.className = "handleIcon handleUp";
    p.appendChild(b);
    p.appendChild(t);
    h.appendChild(p);
    var s = document.createElement("div");
    s.className = "descriptionFilter";
    h.appendChild(s);
    var f = document.createElement("div");
    f.className = "descriptionDom";
    f.id = "descriptionDom" + u;
    h.appendChild(f);
    v.appendChild(h);
    v.className = "photoListDetailShow";
    v.id = "photoListDetailShow" + u;
    d.appendChild(v);
    var q = jm(o).carousel({
        carouselIndex: 3,
        photoAllJson: c,
        preventDefaults: false,
        photoListDetailShowDom: v,
        moduleId: u
    });
    jm("#webModuleContainer").on("click", "#" + module + " .photoModule img", function() {
        if (this.getAttribute("linkType") != 1) {
            return
        }
        Mobi.getPreviewObject("photoListDetailShow" + u).style.top = "0px";
        var i = parseInt(this.getAttribute("photoIndex"));
        q.onMoveIndex(i, "1ms", c[i]);
        q.photoDetailAjax(c[i])
    });
    jm(o).bind("click", function(y) {
        var x = y.target || y.srcElement;
        if (x.className == "prevPhoto" || x.className == "nextPhoto") {
            return
        }
        var w = this.querySelector(".prevPhoto"),
            i = this.querySelector(".nextPhoto");
        if (this.getAttribute("full") == "true") {
            this.setAttribute("full", false);
            m.style.opacity = 1;
            h.style.opacity = 1;
            i.style.opacity = 1;
            w.style.opacity = 1;
            h.style.visibility = "visible";
            m.style.visibility = "visible";
            i.style.visibility = "visible";
            w.style.visibility = "visible";
            if (h.className.indexOf("descriptionClose") === -1) {
                o.className = "webPhotoListDetail photoFilter"
            }
        } else {
            this.setAttribute("full", true);
            m.style.opacity = 0;
            h.style.opacity = 0;
            i.style.opacity = 0;
            w.style.opacity = 0;
            h.style.visibility = "hidden";
            m.style.visibility = "hidden";
            i.style.visibility = "hidden";
            w.style.visibility = "hidden";
            o.className = "webPhotoListDetail"
        }
    });
    jm(h).bind("click", function(y) {
        var w = this.querySelector(".handleIcon");
        if (this.className.indexOf("descriptionOpen") === -1) {
            var x = f.offsetHeight,
                i = Mobi.getPreviewWindow().innerHeight;
            if (jm.os.android) {
                i = Mobi.getPreviewWindow().screen.height / Mobi.getPreviewWindow().devicePixelRatio - Mobi.getPreviewWindow().screenTop
            }
            if (i > x) {
                if (f.innerHTML) {
                    this.style.bottom = "0px";
                    o.className = "webPhotoListDetail photoFilter"
                }
            } else {
                this.style.bottom = i * 0.8 - x + "px";
                o.className = "webPhotoListDetail photoFilter"
            }
            this.className = "photoDetailDescription descriptionOpen";
            if (f.innerHTML) {
                w.className = "handleIcon handleDown"
            }
        } else {
            if (f.innerHTML) {
                this.style.bottom = -(f.offsetHeight - b.offsetHeight) + "px"
            }
            this.className = "photoDetailDescription descriptionClose";
            o.className = "webPhotoListDetail";
            if (f.innerHTML) {
                w.className = "handleIcon handleUp"
            }
        }
    });
    jm(m).bind("click", function() {
        v.style.top = "150%";
        o.className = "webPhotoListDetail"
    })
};
Mobi.clickPhoto = function(a, c) {
    var b = Mobi.getPreviewWindow;
    if (Fai.top.document.getElementById("mobiReviewPageFrame")) {
        Fai.top.document.getElementById("mobiReviewPageFrame").scrolling = "no"
    }
    jm(".imgDetailDiv").show();
    Mobi.getPhotoDetail(a, c)
};
Mobi.exitPhotoDetail = function() {
    if (Fai.top.document.getElementById("mobiReviewPageFrame")) {
        Fai.top.document.getElementById("mobiReviewPageFrame").scrolling = "yes"
    }
    jm(".imgDetailDiv").hide()
};
Mobi.getPhotoDetail = function(a, b) {
    jm.ajax({
        type: "post",
        url: "ajax/photo_h.jsp",
        data: "cmd=get&id=" + jm.encodeUrl(b) + "&groupId=" + jm.encodeUrl(a),
        error: function() {},
        success: function(d) {
            d = jm.parseJSON(d);
            jm(".showImg").attr("src", d.picPath);
            var c = parseInt(d.nextId) === -1 ? false : true;
            var e = parseInt(d.prevId) === -1 ? false : true;
            if (e) {
                jm(".prevPhoto").show();
                jm(".prevPhoto").attr("onclick", "Mobi.getPhotoDetail('" + d.groupId + "','" + d.prevId + "')")
            } else {
                jm(".prevPhoto").hide()
            }
            if (c) {
                jm(".nextPhoto").show();
                jm(".nextPhoto").attr("onclick", "Mobi.getPhotoDetail('" + d.groupId + "','" + d.nextId + "')")
            } else {
                jm(".nextPhoto").hide()
            }
            jm(".imgDesc").html(d.basic);
            jm(".imgName").html(d.name);
            jm(".imgDetailArea").html(d.detail)
        }
    })
};
Mobi.toNextPhoto = function(h) {
    var b = jm(Mobi.getPreviewObject("module" + h)).find(".photoBox");
    var d = parseInt(jm(b).css("width")) - 300;
    var f = parseInt(jm(b).css("left").split("px")[0]);
    var a = Math.abs(f / 300) + 2;
    var c = jm(b).find("li:nth-child(" + a + ") img").attr("lazysrc");
    if (c) {
        jm(b).find("li:nth-child(" + a + ") img").attr("src", c)
    }
    if (f <= -d) {
        if (!jm(b).hasClass("moving")) {
            jm(b).addClass("moving");
            jm(b).css("left", (f - 50) + "px");
            setTimeout(function() {
                jm(b).css("left", (f) + "px");
                jm(b).removeClass("moving")
            }, 600)
        }
        return
    }
    var e = f - 300;
    jm(b).css("left", e + "px")
};
Mobi.toPrevPhoto = function(e) {
    var a = jm(Mobi.getPreviewObject("module" + e)).find(".photoBox");
    var b = parseInt(jm(a).css("width"));
    var d = parseInt(jm(a).css("left").split("px")[0]);
    if (d == 0) {
        if (!jm(a).hasClass("moving")) {
            jm(a).addClass("moving");
            jm(a).css("left", (d + 50) + "px");
            setTimeout(function() {
                jm(a).css("left", (d) + "px");
                jm(a).removeClass("moving")
            }, 600)
        }
        return
    }
    var c = d + 300;
    jm(a).css("left", c + "px")
};
Mobi.handEvent = function(b) {
    var a = jm(Mobi.getPreviewObject("module" + b)).find(".photoModule");
    jm(a).bind("swipeLeft", function() {
        Mobi.toNextPhoto(b);
        return false
    });
    jm(a).bind("swipeRight", function() {
        Mobi.toPrevPhoto(b);
        return false
    })
};
Mobi.autoSetPhotoHeight = function(a) {
    Mobi.unifiedAttrVal(jm(Mobi.getPreviewObject("module" + a)), ".photoModule .photoDiv", "height")
};
Mobi.initPhotoSwipe = function(i, h, e, f) {
    var d = Mobi.getPreviewObject("imgName" + i);
    jm(d).html(h[0]);
    var c = Mobi.getJQMobi();
    var b = Mobi.getPreviewObject("photoSwipe" + i);
    if (!b) {
        return
    }
    Mobi.initScaleImage(b);
    c("#photoSwipe" + i).swipehandle(b, {
        auto: e,
        speed: f,
        continuous: true,
        bulletsClick: true,
        callback: function(k) {
            jm(d).html(h[k]);
            var j = a.length;
            while (j--) {
                a[j].className = " "
            }
            if (!a[k]) {
                a[k - a.length].className = "on"
            } else {
                a[k].className = "on"
            }
        }
    });
    if (!b.querySelector("#bullets" + i)) {
        return
    }
    var a = b.querySelector("#bullets" + i).getElementsByTagName("li")
};
Mobi.initScaleImage = function(c) {
    if (c) {
        var h = c.querySelectorAll("img"),
            e = c.clientWidth,
            f = 0;
        if (h) {
            for (var i = 0; i < h.length; i++) {
                var a = parseInt(h[i].getAttribute("vwidth") ? h[i].getAttribute("vwidth") : 1),
                    j = parseInt(h[i].getAttribute("vheight") ? h[i].getAttribute("vheight") : 1),
                    d = j / a;
                if (d === NaN) {
                    continue
                }
                h[i].style.width = e + "px";
                h[i].style.height = Math.floor(e * d) + "px";
                if (d > f) {
                    f = d
                }
            }
            if (e * f != 0) {
                c.style.height = Math.floor(e * f) + "px"
            }
            if (c.className == "proImgSwipe") {
                var b = c.querySelector(".proDetailImg");
                if (b) {
                    c.style.height = b.clientHeight + "px"
                }
            }
        }
    }
};
Mobi.initPhotoImageSwipe = function(a) {
    var b = Mobi.getJQMobi();
    var d = Mobi.getPreviewObject(a),
        c = d.querySelector(".imgName");
    if (!d) {
        return
    }
    Mobi.initScaleImage(d);
    b("#" + a).swipehandle(d, {
        isOpenNextAndPrevious: true,
        callback: function(i, e) {
            var h = e.querySelector("img"),
                f = h.getAttribute("lazysrc");
            if (!h.src) {
                h.src = f;
                h.onload = function() {}
            }
            c.innerText = h.alt
        }
    })
};
Mobi.initModulePhotoSwipe = function(e) {
    var b = document.querySelectorAll("#" + e + " img");
    if (b.length < 1) {
        return
    }
    var d = {
            imageScaleMethod: "fitNoUpscale",
            getImageCaption: function(f, h) {
                var j, i;
                j = f + "/" + h;
                i = document.createElement("div");
                i.appendChild(document.createTextNode(j));
                return i
            },
            getToolbar: function() {
                return '<div class="ps-toolbar-close"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-previous"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-next"><div class="ps-toolbar-content"></div></div>'
            }
        },
        c = window.Code.PhotoSwipe,
        a = c.attach(b, d)
};
Mobi.initModulePhotoDetailSwipe = function(b, o, m) {
    if (o.length < 1) {
        return
    }
    var k = [];
    if (m) {
        k = document.querySelectorAll("#" + b + " .photoGroup-img")
    } else {
        k = document.querySelectorAll("#" + b + " img")
    }
    if (k.length < 1) {
        return
    }
    if (m) {
        var c = [];
        if (k[0].nodeName === "DIV") {
            k[0].src = k[0].getAttribute("datasrc") || ""
        }
        c.push(k[0]);
        for (var i = 1, f = o.length; i < f; i++) {
            var d = new Image();
            if (i < 3) {
                d.src = o[i].picPath
            }
            d.style.display = "none";
            jm("body").append(d);
            c.push(d)
        }
        k = c
    }
    var p = {
            imageScaleMethod: "fitNoUpscale",
            enableMouseWheel: false,
            resetToolbarPosition: true,
            loop: false,
            photoJson: o,
            captionAndToolbarAutoHideDelay: 0,
            getImageCaption: function(q, r) {
                var t, s;
                t = q + " / " + r;
                s = document.createElement("div");
                s.className = "ps-page";
                s.appendChild(document.createTextNode(t));
                return s
            },
            getToolbar: function() {
                return '<div class="ps-toolbar-close ps-toolbar-close-style icon-toolbar-close-style"></div><div class="ps-toolbar-base"><div class="ps-toolbar-base-title" id="wrapperTitle"></div><div class="ps-toolbar-base-detail icon-toolbar-base-detail" id="wrapperTitleDetail"></div></div><div class="ps-toolbar-base-describe" id="wrapperBasic"><div id="scrollerBasic"></div></div>'
            },
            uiDetailCallBack: function(r, v, q) {
                var s = this;
                jm(r).html("");
                var x = o[n.currentIndex],
                    u = x.groupId,
                    w = x.id,
                    t = x.name;
                jm(q).html(t);
                jm(v).addClass(a.Carousel.CssClasses.itemLoading);
                jm.ajax({
                    type: "post",
                    url: "ajax/photo_h.jsp",
                    data: "cmd=getInfo&id=" + jm.encodeUrl(w) + "&groupId=" + jm.encodeUrl(u),
                    error: function() {
                        Mobi.ing(LS.systemError)
                    },
                    success: function(y) {
                        jm(r).html(y);
                        var B = r.querySelectorAll("img");
                        if (B.length === 0) {
                            s.detailScroll && s.detailScroll.destroy();
                            s.detailScroll = null;
                            s.destroyScroll = new iScroll(v);
                            jm(v).removeClass(a.Carousel.CssClasses.itemLoading)
                        } else {
                            for (var z = 0; z < B.length; z++) {
                                var A = new Image();
                                A.src = B[z].src;
                                A.onload = function() {
                                    if (z === B.length) {
                                        s.detailScroll && s.detailScroll.destroy();
                                        s.detailScroll = null;
                                        s.destroyScroll = new iScroll(v);
                                        jm(v).removeClass(a.Carousel.CssClasses.itemLoading)
                                    }
                                }
                            }
                        }
                        Mobi.switchJump()
                    }
                })
            }
        },
        l = null,
        e = null,
        j = null,
        h = null,
        a = window.Code.PhotoSwipe,
        n = a.attach(k, p);
    n && n.addEventHandler(a.EventTypes.onCaptionAndToolbarShow, function(q) {
        if (this.scroll) {
            this.scroll.destroy()
        }
        this.scroll = new iScroll("wrapperBasic")
    });
    if (m) {
        n.addEventHandler(a.EventTypes.onDisplayImage, function(s) {
            var q = s.target.currentIndex;
            if (q > 1) {
                var r = o[q + 1];
                if (s.target.cache.images[s.target.currentIndex + 1]) {
                    s.target.cache.images[s.target.currentIndex + 1].imageEl.src = r.picPath
                }
            }
        })
    }
};
Mobi.PhotoDetailSwipeForJumpCtrl = function(a) {
    var b = [];
    jm.ajax({
        type: "get",
        url: "../ajax/getPhotoData_h.jsp?groupId=" + a + "&cmd=getPhotoData",
        success: function(p) {
            var p = jm.parseJSON(p);
            if (p && p.success) {
                if (p.info != null) {
                    b = p.info
                }
            }
            var l = [],
                e;
            for (var d = 0, k = b.length; d < k; d++) {
                e = new Image();
                if (d < 3) {
                    e.src = b[d].picPath
                }
                l.push(e)
            }
            if (l.length < 1) {
                return
            }
            var o = {
                    imageScaleMethod: "fitNoUpscale",
                    enableMouseWheel: false,
                    resetToolbarPosition: true,
                    loop: false,
                    photoJson: b,
                    captionAndToolbarAutoHideDelay: 0,
                    getImageCaption: function(i, q) {
                        var s, r;
                        s = i + " / " + q;
                        r = document.createElement("div");
                        r.className = "ps-page";
                        r.appendChild(document.createTextNode(s));
                        return r
                    },
                    getToolbar: function() {
                        return '<div class="ps-toolbar-close ps-toolbar-close-style icon-toolbar-close-style"></div><div class="ps-toolbar-base"><div class="ps-toolbar-base-title" id="wrapperTitle"></div><div class="ps-toolbar-base-detail icon-toolbar-base-detail" id="wrapperTitleDetail"></div></div><div class="ps-toolbar-base-describe" id="wrapperBasic"><div id="scrollerBasic"></div></div>'
                    },
                    uiDetailCallBack: function(q, u, i) {
                        var r = this;
                        jm(q).html("");
                        var w = b[n.currentIndex],
                            t = w.groupId,
                            v = w.id,
                            s = w.name;
                        jm(i).html(s);
                        jm(u).addClass(c.Carousel.CssClasses.itemLoading);
                        jm.ajax({
                            type: "post",
                            url: "ajax/photo_h.jsp",
                            data: "cmd=getInfo&id=" + jm.encodeUrl(v) + "&groupId=" + jm.encodeUrl(t),
                            error: function() {
                                Mobi.ing(LS.systemError)
                            },
                            success: function(x) {
                                jm(q).html(x);
                                var A = q.querySelectorAll("img");
                                if (A.length === 0) {
                                    r.detailScroll && r.detailScroll.destroy();
                                    r.detailScroll = null;
                                    r.destroyScroll = new iScroll(u);
                                    jm(u).removeClass(c.Carousel.CssClasses.itemLoading)
                                } else {
                                    for (var y = 0; y < A.length; y++) {
                                        var z = new Image();
                                        z.src = A[y].src;
                                        z.onload = function() {
                                            if (y === A.length) {
                                                r.detailScroll && r.detailScroll.destroy();
                                                r.detailScroll = null;
                                                r.destroyScroll = new iScroll(u);
                                                jm(u).removeClass(c.Carousel.CssClasses.itemLoading)
                                            }
                                        }
                                    }
                                }
                                Mobi.switchJump()
                            }
                        })
                    }
                },
                m = null,
                f = null,
                j = null,
                h = null,
                c = window.Code.PhotoSwipe,
                n = c.attach(l, o);
            n && n.addEventHandler(c.EventTypes.onCaptionAndToolbarShow, function(i) {
                if (this.scroll) {
                    this.scroll.destroy()
                }
                this.scroll = new iScroll("wrapperBasic")
            });
            jm(l[0]).trigger("click");
            n.addEventHandler(c.EventTypes.onDisplayImage, function(r) {
                var i = r.target.currentIndex;
                if (i > 1) {
                    var q = b[i + 1];
                    if (r.target.cache.images[r.target.currentIndex + 1]) {
                        r.target.cache.images[r.target.currentIndex + 1].imageEl.src = q.picPath
                    }
                }
            })
        }
    })
};
Mobi.photoCrossedSlideSecSwipe = function(a, f, c) {
    var e = Mobi.getPreviewObject(f),
        j = Mobi.getPreviewObject(c),
        h = e,
        m = parseInt(jm(j).width()),
        o = 0,
        l = j.querySelectorAll(".photoCrossedSlideSec");
    var k = _htmlFontSize;
    var b = l.length * 0.5 * k;
    for (var d = 0; d < l.length; d++) {
        o += l[d].offsetWidth
    }
    o += b;
    if (o > m) {
        if (navigator.appVersion.match(/MSIE [\d.]+/)) {
            if (parseInt(navigator.appVersion.match(/MSIE ([\d.]+)/)[1]) === 10) {
                o = o + l.length * 2
            }
        }
        o = o + 10;
        jm(h).css("width", o + "px");
        if (jm.os.supportsTouch) {
            var n = new iScroll(j, {
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                remarkXCoordinate: true,
                onBeforeScrollStart: null
            })
        }
    }
};
Mobi.initModuleMultiPhotoListItemManage = function(a) {
    if (!a || !a.moduleId) {
        return
    }
    var c = $("#module" + a.moduleId);
    c.data("options", a);
    var b = a.content;
    $.each(b.picList, function(f, j) {
        var l = j.id,
            h = j.desc,
            e = j.ide,
            d = j.openLink;
        var k = $("#module" + a.moduleId).find("#" + l);
        k.mouseover(function() {
            var i = [{
                operationText: "编辑图片",
                className: "edit",
                evalScript: "top.Mobi.popupWindow({title:'编辑图片', frameSrcUrl:'mobiPhotoEdit.jsp?moduleId=" + a.moduleId + "&id=" + l + "', width:580, height:420, closeFunc: closeMobiPhotoEdit, saveBeforePopup: true });"
            }, {
                operationText: "删除图片",
                className: "close",
                evalScript: "Mobi.deleteMultiPhotoItem('" + l + "', " + a.moduleId + ");"
            }];
            if (a.type === 1) {
                layer = Mobi.addEditLayer($(this), i, 106)
            } else {
                layer = Mobi.addEditLayer($(this), i, 6)
            }
        }).mouseleave(function() {
            if (a.type === 1) {
                Mobi.removeEditLayer($(this), null, 106)
            } else {
                Mobi.removeEditLayer($(this))
            }
        })
    })
};
Mobi.initModuleMultiPhotoCarouselItemManage = function(a) {
    if (!a || !a.moduleId) {
        return
    }
    var c = $("#module" + a.moduleId);
    c.data("options", a);
    var b = a.content,
        d = b.picList;
    $.each(d, function(h, l) {
        var m = l.id,
            j = l.desc,
            f = l.ide,
            e = l.openLink;
        var k = $("#module" + a.moduleId).find("img[id=" + m + "]");
        k.each(function(i, n) {
            $(n).mouseover(function() {
                var o = [{
                    operationText: "编辑图片",
                    className: "edit",
                    evalScript: "top.Mobi.popupWindow({title:'编辑图片', frameSrcUrl:'mobiPhotoEdit.jsp?moduleId=" + a.moduleId + "&id=" + m + "', width:580, height:420, closeFunc: closeMobiPhotoEdit, saveBeforePopup: true});"
                }, {
                    operationText: "删除图片",
                    className: "close",
                    evalScript: "Mobi.deleteMultiPhotoItem('" + m + "', " + a.moduleId + ");"
                }];
                Mobi.addEditLayer($(n), o, 1)
            }).mouseleave(function() {
                Mobi.removeEditLayer($(n), null, 1)
            })
        })
    })
};

function closeMobiPhotoEdit(j) {
    if (j != null && j != undefined) {
        var d = jm.parseJSON(j);
        var h = d.photoList,
            a = d.moduleId,
            f = $("#module" + a),
            i = f.data("options"),
            e = i.content;
        if (!!h) {
            e.picList = h;
            var c = new Array();
            var b = "ajax/mobimodule_h.jsp?cmd=setBack&id=" + i.moduleId + "&colId=" + Fai.top._colId + "&style=" + i.style + "&extId=" + Fai.top._extId;
            c.push("&content=" + jm.encodeUrl(jm.toJSON(e)));
            Mobi.ing("正在保存...", false);
            jm.ajax({
                type: "post",
                url: b,
                data: c.join(""),
                error: function() {
                    Mobi.ing("服务繁忙，请稍后重试。", true)
                },
                success: function(k) {
                    var l = jm.parseJSON(k);
                    if (l.success) {
                        Mobi.ing("保存成功。", true);
                        Mobi.jumpUrlMobi(Mobi.getPreviewDocument().location.href)
                    } else {
                        Mobi.ing(l.msg, false)
                    }
                }
            })
        } else {
            Mobi.ing("图片信息错误。", true)
        }
    }
}
Mobi.deleteMultiPhotoItem = function(f, b) {
    var a, d = $("#module" + b);
    options = d.data("options");
    content = options.content, picList = content.picList;
    $.each(picList, function(h, j) {
        if (j.id == f) {
            a = h
        }
    });
    if (confirm("确定删除图片？")) {
        if (typeof a != "undefined") {
            picList.splice(a, 1);
            var e = new Array();
            var c = "ajax/mobimodule_h.jsp?cmd=setBack&id=" + b + "&colId=" + Fai.top._colId + "&style=" + options.style + "&extId=" + Fai.top._extId;
            e.push("&content=" + jm.encodeUrl(jm.toJSON(content)));
            $.ajax({
                type: "post",
                url: c,
                data: e.join(""),
                error: function() {
                    Mobi.ing("服务繁忙，请稍后重试。", true)
                },
                success: function(h) {
                    var i = jm.parseJSON(h);
                    if (i.success) {
                        Mobi.ing("保存成功。", true);
                        Mobi.jumpUrlMobi(Mobi.getPreviewDocument().location.href)
                    } else {
                        Mobi.ing(i.msg, false)
                    }
                }
            })
        }
    }
};
Mobi.initPhotoDetailManage = function(c, a) {
    var b = Mobi.getPreviewDocument().getElementById("photoGroupDetailPanel" + c);
    $(b).mousemove(function() {
        Mobi.addEditLayer("photoGroupDetailPanel" + c, a, 8)
    }).mouseleave(function() {
        Mobi.removeEditLayer("photoGroupDetailPanel" + c)
    })
};
Mobi.photoGroupContentInit = function(c) {
    var f = jm("#photoGroupDetailPanel" + c),
        b = f.find(".photoGroupDetail").width(),
        a = f.find(".photoGroupPic"),
        e = f.find(".icon-gClose");
    jm("#photoGroupPicList" + c).width(b * a.length + "px");
    a.width(b + "px");
    var d = {
        triggerId: "newsDetailShare",
        pageBg: true,
        pageHtml: Mobi.sharePage(Fai.top._shareDataPhotoGroup),
        direction: "bottom",
        callback: function() {
            Mobi.initProductSwipe("shareListShowSwipe")
        },
        closeWebPage: "#shareListPanel .shareListCancel"
    };
    Mobi.initWebPage(d);
    jm(e).bind("click", function() {
        if (window.history.length <= 1) {
            window.location.href = "index.jsp"
        } else {
            history.back();
            var h = setTimeout(function() {
                window.location.href = "index.jsp";
                h = null
            }, 500)
        }
        return false
    });
    Mobi.scrollFadeIn("photoGroupDetailHeader" + c, "photoGroupPicPanel" + c, 1)
};
Mobi.initPhotoGroupSwipe = function(b) {
    var d = Mobi.getJQMobi();
    var c = Mobi.getPreviewObject(b);
    if (!c) {
        return
    }
    Mobi.initScaleImage(c);
    if (!c.querySelector(".bullets")) {
        return
    }
    var a = c.querySelector(".bullets").getElementsByTagName("li");
    d("#" + b).swipehandle(c, {
        continuous: true,
        bulletsClick: true,
        callback: function(f) {
            var e = a.length;
            while (e--) {
                a[e].className = " "
            }
            if (!a[f]) {
                a[f - a.length].className = "on"
            } else {
                a[f].className = "on"
            }
        }
    })
};
Mobi.getPhotoListInfo = function(c) {
    var b = new Array();
    var d = $("#module" + c);
    var a = {};
    if (d.data("options")) {
        var e = d.data("options").content.picList;
        for (index in e) {
            a = {
                id: e[index].id,
                desc: e[index].desc,
                openLink: e[index].openLink,
                ide: e[index].ide
            };
            b.push(a)
        }
    }
    return b
};
Mobi.initMbPdCollection = function(d, c, b, a) {
    this.sessionMid = d;
    this.collectionList = c;
    this.pid = b;
    this._manageMode = a
};
(function(e, a, b) {
    var f = a.prototype,
        c, k, h, d;
    f.init = function() {
        c = this.sessionMid, k = this.collectionList, h = this.pid, d = this._manageMode;
        l();
        i();
        if (e("#_TOKEN").length != 0 && !d && e.getCookie("m_collectID") == h + "" && !e(".shareBlock .icon-collection ").hasClass("icon-collectSelect")) {
            if (k.indexOf(h) == -1) {
                k.push(h);
                e(".shareBlock .icon-collection").addClass("icon-collectSelect");
                j("suc")
            }
        }
        e.setCookie("m_collectID", "", -1)
    };

    function l() {
        Mobi.bindTouchAndClickEvent(e(".shareBlock"), function(m) {
            if (c == 0) {
                if (d) {
                    Mobi.ing(LS.isManageFailCollection)
                } else {
                    window.location.href = "login.jsp?returnUrl=" + e.encodeUrl(window.location.href);
                    e.setCookie("m_collectID", h)
                }
            } else {
                if (k.indexOf(h) == -1) {
                    k.push(h);
                    e(".shareBlock .icon-collection").addClass("icon-collectSelect");
                    j("suc")
                } else {
                    if (k.indexOf(h) != -1) {
                        k.splice(k.indexOf(h), 1);
                        e(".shareBlock .icon-collection").removeClass("icon-collectSelect");
                        j("warn")
                    }
                }
            }
        })
    }

    function i() {
        if (c != 0 && k.indexOf(h) != -1) {
            e(".shareBlock .icon-collection").addClass("icon-collectSelect")
        }
    }

    function j(m) {
        var n = {};
        n.productCollections = k + "";
        e.post("ajax/member_h.jsp", {
            cmd: "set",
            id: c,
            info: e.toJSON(n)
        }, function(o) {
            if (o.success) {
                if (m == "suc") {
                    Mobi.ing(LS.sucCollection, 1)
                } else {
                    Mobi.ing(LS.cancelledCollection)
                }
            }
        }, "json")
    }
})(jm, Mobi.initMbPdCollection);
Mobi.initProductEvent = function(a) {
    Mobi.initProductSwipe(a)
};
Mobi.initRepPropValueOfURL = function() {
    var a = new RegExp("https?|ftp|file://");
    jm(".paramCollection .propVal").each(function(b, d) {
        var c = jm(this).text();
        if (a.test(c)) {
            jm(this).html(c.replace(/((https?|ftp|file):\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*)/g, '<a href="$1" target="_blank" style="text-decoration:underline">$1</a>'))
        }
    })
};
Mobi.initProductRestrict = function(f, e, d, b) {
    if (f) {
        var i = 0;
        if (b.count != null) {
            i = b.count
        }
        var h = 0;
        h = d - i;
        if (jm.fkEval(h) < 0) {
            h = -1
        }
        var c = 1,
            a = -1;
        if (e > 1 && d != 0) {
            jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
            jm("#limitAmountDiv").text("( " + LS.minAmount + " : " + e + " ; " + LS.maxAmount + " : " + h + " )");
            c = e;
            a = h
        } else {
            if (e == 1 && d != 0) {
                jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
                jm("#limitAmountDiv").text("( " + LS.maxAmount + " : " + h + " )");
                a = h
            } else {
                if (e > 1 && d == 0) {
                    jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
                    jm("#limitAmountDiv").text("( " + LS.minAmount + " : " + e + " )");
                    c = e
                }
            }
        }
        jm("#productNum").val(c);
        jm("#productNum").unbind("change");
        jm("#productNum").change(function() {
            var j = jm("#productNum").val();
            var k = 1;
            if (jm.isInteger(j)) {
                k = parseInt(j)
            }
            if (k < c || k == c) {
                k = c;
                jm("#g_decrease , .g_decrease").addClass("g_opacity50");
                jm("#g_increase , .g_increase").removeClass("g_opacity50");
                if (a < c || a == c) {
                    jm("#g_increase , .g_increase").addClass("g_opacity50")
                }
            } else {
                if (a != -1 && (k > a || k == a)) {
                    k = a;
                    jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                    jm("#g_increase , .g_increase").addClass("g_opacity50")
                } else {
                    if (k > 9999998) {
                        k = 9999999;
                        jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                        jm("#g_increase , .g_increase").addClass("g_opacity50")
                    } else {
                        jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                        jm("#g_increase , .g_increase").removeClass("g_opacity50")
                    }
                }
            }
            jm("#productNum").val(k)
        });
        jm("#productNum").change();
        jm("#g_decrease , .g_decrease").click(function() {
            var j = jm("#productNum").val();
            var k = 1;
            if (jm.isInteger(j)) {
                k = parseInt(j)
            }
            if (k < c + 1) {
                jm("#productNum").val(c)
            }
            jm("#productNum").change()
        });
        jm("#g_increase , .g_increase").click(function() {
            var j = jm("#productNum").val();
            var k = 1;
            if (jm.isInteger(j)) {
                k = parseInt(j)
            }
            if (k > a - 1 && a != -1) {
                if (a > c) {
                    jm("#productNum").val(a)
                } else {
                    jm("#productNum").val(c)
                }
            }
            jm("#productNum").change()
        })
    }
};
Mobi.initProductOptions = function(e, q, b, l, f, k, v, h) {
    var t = false;
    jm.each(e, function(j, w) {
        if (w.t == null) {
            t = true;
            return false
        }
    });
    var u = [],
        c = [],
        m = [],
        a = true,
        p = [];
    if (v != "null" && v != "") {
        u = h.split("_");
        c = v.split("_");
        for (var r = 0; r < c.length; r++) {
            for (var o = 0; o < u.length; o++) {
                if (c[r] == u[o]) {
                    p.push(o);
                    a = false
                }
            }
            if (a) {
                m.push(r)
            }
        }
    }
    var d = jm(".J-op-box"),
        s = jm(".mallOptionImg"),
        n = d.find(".J-op");
    jm(n).each(function(j) {
        var w = jm(this);
        w.find("label").click(function() {
            var F = jm(this);
            if (F.parent().find(".optionSelected").length > 0) {
                F.parent().find(".optionSelected").removeClass("optionSelected")
            }
            F.addClass("optionSelected");
            var D = F.attr("data"),
                J = d.find(".optionSelected");
            w.attr("option_data", D);
            if (s.length > 0) {
                var U = F.attr("_indeptPic");
                if (U != null) {
                    s.attr("src", U)
                }
            }
            if (n.length == J.length) {
                var B = "",
                    O, C, x, G, H;
                jm(J).each(function(X) {
                    if (t) {
                        B += jm(this).attr("data") + "_"
                    } else {
                        B += jm(this).attr("data")
                    }
                });
                jm.each(e, function(ab, ae) {
                    var ac = ae.t2;
                    if (v != "null" && v != "") {
                        var Y = ae.t2.split("_"),
                            ad = [],
                            aa = "";
                        for (var Z = 0; Z < p.length; Z++) {
                            for (var X = 0; X < u.length; X++) {
                                if (X == p[Z]) {
                                    ad[X] = Y[Z]
                                }
                            }
                        }
                        for (var Z = 0; Z < ad.length; Z++) {
                            if (ad[Z] != null) {
                                aa += ad[Z] + "_"
                            }
                        }
                        ac = aa.substring(0, aa.length - 1)
                    }
                    if (ae.t == B) {
                        O = ae.oPrice;
                        C = ae.oAmount;
                        x = ae.minAmount;
                        G = ae.maxAmount;
                        H = ae.w
                    } else {
                        if ((ac + "_") == B) {
                            O = ae.oPrice;
                            C = ae.oAmount;
                            x = ae.minAmount;
                            G = ae.maxAmount;
                            H = ae.w
                        }
                    }
                    if (v != "null" && v != "" && p.length != c.length) {
                        C = 0
                    }
                });
                if (l) {
                    jm("#limitAmountDiv").text("");
                    var y = 0;
                    var W = f.optionsCount;
                    if (W != null && W.d != null) {
                        for (var S = 0; S < W.d.length; S++) {
                            if ((W.d[S].t + "_") == B) {
                                y = W.d[S].c
                            }
                        }
                    }
                    var E = 0;
                    E = G - y;
                    if (jm.fkEval(E) < 0) {
                        E = -1
                    }
                    var N = 1;
                    var R = -1;
                    if (x > 1 && G != 0) {
                        jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
                        jm("#limitAmountDiv").text("( " + LS.minAmount + " : " + x + " ; " + LS.maxAmount + " : " + E + " )");
                        N = x;
                        R = E
                    } else {
                        if (x == 1 && G != 0) {
                            jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
                            jm("#limitAmountDiv").text("( " + LS.maxAmount + " : " + E + " )");
                            R = E
                        } else {
                            if (x > 1 && G == 0) {
                                jm("#limitAmountDiv").parent().attr("style", "line-height:1.5rem;");
                                jm("#limitAmountDiv").text("( " + LS.minAmount + " : " + x + " )");
                                N = x
                            }
                        }
                    }
                    jm("#productNum").val(N);
                    jm("#productNum").unbind("change");
                    jm("#productNum").change(function() {
                        var i = jm("#productNum").val();
                        var X = 1;
                        if (jm.isInteger(i)) {
                            X = parseInt(i)
                        }
                        if (X < N || X == N) {
                            X = N;
                            jm("#g_decrease , .g_decrease").addClass("g_opacity50");
                            jm("#g_increase , .g_increase").removeClass("g_opacity50")
                        } else {
                            if (R != -1 && (X > R || X == R)) {
                                X = R;
                                jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                                jm("#g_increase , .g_increase").addClass("g_opacity50")
                            } else {
                                if (X > 9999998) {
                                    X = 9999999;
                                    jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                                    jm("#g_increase , .g_increase").addClass("g_opacity50")
                                } else {
                                    jm("#g_decrease , .g_decrease").removeClass("g_opacity50");
                                    jm("#g_increase , .g_increase").removeClass("g_opacity50")
                                }
                            }
                        }
                        jm("#productNum").val(X)
                    });
                    jm("#productNum").change();
                    jm("#g_decrease , .g_decrease").unbind("click");
                    jm("#g_increase , .g_increase").unbind("click");
                    jm("#g_decrease , .g_decrease").click(function() {
                        var i = jm("#productNum").val();
                        var X = 1;
                        if (jm.isInteger(i)) {
                            X = parseInt(i)
                        }
                        if (X < N + 1) {
                            jm("#productNum").val(N)
                        }
                        jm("#productNum").change()
                    });
                    jm("#g_increase , .g_increase").click(function() {
                        var i = jm("#productNum").val();
                        var X = 1;
                        if (jm.isInteger(i)) {
                            X = parseInt(i)
                        }
                        if (X > R - 1 && R != -1) {
                            if (R > N) {
                                jm("#productNum").val(R)
                            } else {
                                jm("#productNum").val(N)
                            }
                        }
                        jm("#productNum").change()
                    })
                }
                if (q) {
                    jm("#mallAmount").text(C)
                }
                if (O == null) {
                    Mobi.onlyChangeSalePrice(b, k)
                } else {
                    Mobi.onlyChangeSalePrice(O, k)
                }
                if (H != null) {
                    jm("#mallWeight").text(H + "kg")
                }
            }
            var T = [];
            for (var S = 0; S < n.length; S++) {
                var I = n.eq("" + S + "");
                if (I.find(".optionSelected").length > 0) {
                    T.push(I.find(".optionSelected").attr("data"))
                } else {
                    break
                }
            }
            var Q = false;
            if (T.length <= n.length && T.length > 1) {
                var L = T.length;
                for (var S = 0; S < L; S++) {
                    jm.each(e, function(Z, ad) {
                        var ab = ad.t2;
                        if (v != "null" && v != "") {
                            var X = ad.t2.split("_"),
                                ac = [],
                                ab = "",
                                aa = "";
                            for (var i = 0; i < m.length; i++) {
                                X.splice(m[i], 1)
                            }
                            for (var Z = 0; Z < p.length; Z++) {
                                for (var i = 0; i < u.length; i++) {
                                    if (i == p[Z]) {
                                        ac[i] = X[Z]
                                    }
                                }
                            }
                            for (var Z = 0; Z < ac.length; Z++) {
                                if (ac[Z] != null) {
                                    aa += ac[Z] + "_"
                                }
                            }
                            ab = aa.substring(0, aa.length - 1)
                        }
                        var Y = ab.split("_");
                        if (ad.flag == undefined) {
                            ad.flag = 1
                        }
                        if (ad.flag == 1 && arrHasSameBegin(Y, T)) {
                            Q = true;
                            return false
                        }
                    });
                    if (!Q) {
                        var M = n.eq(T.length - 1).find("label");
                        n.eq(T.length - 1).removeAttr("option_data");
                        M.removeClass("optionSelected");
                        var K = T.pop();
                        M.each(function() {
                            if (jm(this).attr("data") == K) {
                                jm(this).hide()
                            }
                        })
                    } else {
                        break
                    }
                }
            }
            var V = n.index(w);
            for (var P = V; P < T.length; P++) {
                var z = T.slice(0, P + 1);
                Q = false;
                for (var S = z.length; S < n.length; S++) {
                    var A = n.eq("" + S + "");
                    A.find("label").each(function() {
                        var i = jm(this).attr("data");
                        Q = false;
                        jm.each(e, function(aa, ae) {
                            var ac = ae.t2;
                            if (v != "null" && v != "") {
                                var Y = ae.t2.split("_"),
                                    ad = [],
                                    ac = "",
                                    ab = "";
                                for (var X = 0; X < m.length; X++) {
                                    Y.splice(m[X], 1)
                                }
                                for (var aa = 0; aa < p.length; aa++) {
                                    for (var X = 0; X < u.length; X++) {
                                        if (X == p[aa]) {
                                            ad[X] = Y[aa]
                                        }
                                    }
                                }
                                for (var aa = 0; aa < ad.length; aa++) {
                                    if (ad[aa] != null) {
                                        ab += ad[aa] + "_"
                                    }
                                }
                                ac = ab.substring(0, ab.length - 1)
                            }
                            var Z = ac.split("_");
                            if (ae.flag == undefined) {
                                ae.flag = 1
                            }
                            if (i == Z[S] && ae.flag == 1 && arrHasSameBegin(Z, z)) {
                                Q = true;
                                return false
                            }
                        });
                        if (!Q) {
                            jm(this).hide()
                        } else {
                            jm(this).show()
                        }
                    })
                }
            }
        })
    })
};
Mobi.onlyChangeSalePrice = function(d, c) {
    d = parseFloat(d);
    if (isNaN(d)) {
        return
    }
    var e = Mobi.salePromotionDetail.salePromotionParam;
    if (typeof(e) == "undefined" || e == null || e == "") {
        jm("#mallPrice").html(d.toFixed(2));
        return
    }
    if (Mobi.salePromotionDetail.showType == "1") {
        jm("#mallPrice").html(d.toFixed(2));
        return
    }
    if (e.saleType == "1") {
        var b = parseFloat(e.other.ruleData.d[0].m);
        var a = 0;
        if (e.other.ruleData.s == "1") {
            a = d * (b / 10)
        } else {
            a = d - b
        }
        if (a < 0) {
            a = 0
        }
        if (jm(".J_saleProductNew").css("width").length == 0) {
            jm("#mallPrice").html(d.toFixed(2));
            jm(".J_salePriceSet").html(c + a.toFixed(2))
        } else {
            jm("#mallPrice").html(a.toFixed(2));
            jm(".J_salePriceSet").html(c + a.toFixed(2))
        }
    } else {
        jm("#mallPrice").html(d.toFixed(2))
    }
};

function arrHasSameBegin(b, d) {
    var a = true;
    for (var c = 0; c < d.length; c++) {
        if (d[c] != b[c]) {
            a = false
        }
    }
    return a
}
Mobi.autoSetProductHeight = function(a) {
    Mobi.unifiedAttrVal(jm(Mobi.getPreviewObject("module" + a)), ".styleForm1 .mProductTileForm", "height")
};
Mobi.initProductSwipe = function(b) {
    var d = Mobi.getJQMobi();
    var c = Mobi.getPreviewObject(b);
    if (!c) {
        return
    }
    Mobi.initScaleImage(c);
    d("#" + b).swipehandle(c, {
        continuous: true,
        bulletsClick: true,
        callback: function(f) {
            var e = a.length;
            while (e--) {
                a[e].className = " "
            }
            if (!a[f]) {
                a[f - a.length].className = "on"
            } else {
                a[f].className = "on"
            }
        }
    });
    if (!c.querySelector(".bullets")) {
        return
    }
    var a = c.querySelector(".bullets").getElementsByTagName("li")
};
Mobi.pdCommentAddCom = function() {
    var j = jm.trim(jm("#productCommentCreator").val());
    var n = jm("#productCommentCreator").attr("minlength");
    var b = jm("#productCommentInput").val();
    var f = jm("#productCommentInput").attr("minlength");
    var d = jm("#validateCodeInput").val();
    var o = jm("#productCommentInput").attr("productId");
    if (typeof(j) != "string") {
        Mobi.ing(LS.creatorTips);
        return
    }
    if (typeof(b) != "string" || "" == b) {
        Mobi.ing(LS.commentNotEmpty);
        return
    }
    if (b.length < f) {
        Mobi.ing(jm.format(LS.commentLenTips, jm.encodeHtml(f)));
        return
    }
    if (typeof(d) != "string" || "" == d) {
        Mobi.ing(LS.memberInputCaptcha);
        return
    }
    var l = jm(".J_productCommImg").find("img");
    var e = [];
    if (l != null && typeof(l) != "undefined") {
        var a = l.length;
        if (a > 0) {
            for (var q = 0; q < a; q++) {
                var c = l.eq(q);
                if (c != null && c != "undefined") {
                    var s = {};
                    var p = c.attr("_id");
                    var t = c.attr("_name");
                    var k = c.attr("_file_size");
                    var m = c.attr("_file_id");
                    s.imgId = p;
                    s.imgName = t;
                    s.imgSize = k;
                    s.tempFileId = m;
                    e.push(s)
                }
            }
        }
    }
    var r = "ajax/productComment_h.jsp?cmd=submitPC";
    var h = {
        validateCode: d,
        commentsObjId: o,
        creator: j,
        commImgList: JSON.stringify(e),
        comment: b
    };
    Mobi.ing(LS.siteFormSubmitIng);
    jm.ajax({
        type: "POST",
        url: r,
        data: h,
        error: function() {
            Mobi.ing(LS.systemError);
            jm("#captchaChange").click()
        },
        success: function(i) {
            var v = jm.parseJSON(i);
            if (!v || !v.success) {
                jm("#captchaChange").click()
            }
            switch (v.msg) {
                case 1:
                    Mobi.ing(LS.captchaError);
                    break;
                case 2:
                    Mobi.ing(LS.creatorError);
                    break;
                case 3:
                    Mobi.ing(LS.commentError);
                    break;
                case 4:
                    Mobi.getCommentDiv("product", o);
                    jm(".comm-find-tb-remove").remove();
                    Mobi.ing(LS.submitSuccess, 1);
                    break;
                case 5:
                    Mobi.ing(LS.paramError);
                    break;
                case 6:
                    var u = jm.encodeUrl(window.location.href);
                    window.location.href = "login.jsp?returnUrl=" + u + "&errno=11";
                    break;
                case 7:
                    Mobi.ing(LS.commentClosed);
                    break;
                case 8:
                    Mobi.ing(LS.commentSubmitError);
                    break;
                case 9:
                    Mobi.ing(LS.commentCountLimit);
                    break;
                default:
            }
        }
    })
};
Mobi.waterFall = function(v, y, w, j, e, h, l) {
    var c = parseInt(jm("#" + y + " .productWaterFall .style8Img").width());
    var f = _htmlFontSize;
    var m = (c * h) / (e * f);
    m = parseFloat(m.toFixed(4));
    var t = (c * j) / (w * f);
    t = parseFloat(t.toFixed(4));
    var z = jm("#" + y + " .paramPadding .paramName").css("font-size");
    if (typeof z != "object") {
        var n = z.substring(0, z.indexOf("p")) / f;
        n = parseFloat(n) + 0.1;
        jm("#" + y + " .productWaterFall .paramPadding .paramName").css("line-height", n + "rem");
        n = parseFloat(n.toFixed(4)) * 2
    } else {
        n = 0
    }
    var q = "paramWrap";
    if (l == q) {
        jm("#" + y + " .productWaterFall .paramPadding .paramName").height(n + "rem")
    } else {
        jm("#" + y + " .productWaterFall .paramPadding .paramName").height(n / 2 + "rem")
    }
    if (v.length == 1) {
        jm("#" + y + " .productWaterFall .style8Img").height(m + "rem");
        jm("#" + y + " .productWaterFall").eq(r).css({
            "vertical-align": "top"
        })
    } else {
        if (v.length == 2) {
            for (var r = 0; r < v.length; r++) {
                if (r % 2 == 0) {
                    jm("#" + y + " .productWaterFall .style8Img").eq(r).height(m + "rem");
                    jm("#" + y + " .productWaterFall").eq(r).css({
                        "vertical-align": "top"
                    })
                } else {
                    if (r % 2 == 1) {
                        var x = 0;
                        jm("#" + y + " .productWaterFall .style8Img").eq(r).height(t + "rem");
                        jm("#" + y + " .productWaterFall").eq(r).css({
                            position: "absolute",
                            top: x + "rem"
                        });
                        var d = parseFloat(jm("#" + y + " .productWaterFall .commonProRight").parent().parent().parent().height());
                        var o = parseFloat(jm("#" + y + " .productWaterFall .firstLastPro").parent().parent().parent().height());
                        d = d / f;
                        o = o / f;
                        if (o < d) {
                            d = d + 10 / f;
                            jm("#" + y + " .productWaterFall .firstLastPro").parent().parent().parent().parent().height(d + "rem")
                        }
                    }
                }
            }
        } else {
            for (var r = 0; r < v.length; r++) {
                var p = r;
                if (r == 0) {
                    jm("#" + y + " .productWaterFall .style8Img").eq(r).height(m + "rem");
                    jm("#" + y + " .productWaterFall").eq(r).css({
                        "vertical-align": "top"
                    })
                } else {
                    if (p + 1 == v.length) {
                        jm("#" + y + " .productWaterFall .style8Img").eq(r).height(m + "rem");
                        if (v.length % 2 == 1) {
                            jm("#" + y + " .productWaterFall").eq(r).css({
                                "vertical-align": "top"
                            })
                        } else {
                            if (v.length % 2 == 0) {
                                var b = parseFloat(jm("#" + y + " .productWaterFall .commonProRight").parent().parent().parent().height());
                                b = (b) / f;
                                var u = (b + 0.5) * ((r + 1) / 2 - 1);
                                jm("#" + y + " .productWaterFall").eq(r).css({
                                    position: "absolute",
                                    top: u + "rem"
                                })
                            }
                        }
                    } else {
                        jm("#" + y + " .productWaterFall .style8Img").eq(r).height(t + "rem");
                        var b = parseFloat(jm("#" + y + " .productWaterFall .commonProRight").parent().parent().parent().height());
                        var a = parseFloat(jm("#" + y + " .productWaterFall .commonProRight").parent().parent().parent().width());
                        b = (b) / f;
                        if (r % 2 == 0) {
                            jm("#" + y + " .productWaterFall").eq(r).css({
                                "vertical-align": "top"
                            })
                        } else {
                            if (r % 2 == 1) {
                                var s = (b + 0.5) * ((r + 1) / 2 - 1);
                                jm("#" + y + " .productWaterFall").eq(r).css({
                                    position: "absolute",
                                    top: s + "rem"
                                })
                            }
                        }
                    }
                }
            }
        }
    }
};
Mobi.initProductSwipe1 = function(d) {
    var c = Mobi.getJQMobi();
    var b = Mobi.getPreviewObject(d);
    if (!b) {
        return
    }
    c("#" + d).swipehandle(b, {
        auto: false,
        continuous: false,
        bulletsClick: true,
        callback: function(f) {
            var e = a.length;
            while (e--) {
                a[e].className = " "
            }
            if (!a[f]) {
                a[f - a.length].className = "on"
            } else {
                a[f].className = "on"
            }
        }
    });
    if (!b.querySelector(".bullets")) {
        return
    }
    var a = b.querySelector(".bullets").getElementsByTagName("li")
};
Mobi.productCrossedSlide = function(a, d, f, b) {
    var c = jm("#" + a + " .productCrossedSlide .style7Img").width();
    var h = _htmlFontSize;
    var j = (c * f) / (d * h);
    j = parseFloat(j.toFixed(4));
    var i = jm("#" + a + " .paramPadding .paramName").css("font-size");
    if (typeof i != "object") {
        var k = i.substring(0, i.indexOf("p")) / h;
        jm("#" + a + " .productCrossedSlide .paramPadding .paramName").css("line-height", k + "rem");
        k = parseFloat(k.toFixed(4)) * 2
    } else {
        k = 0
    }
    var e = "paramWrap";
    if (b == e) {
        jm("#" + a + " .productCrossedSlide .paramPadding .paramName").height(k + "rem")
    } else {
        jm("#" + a + " .productWaterFall .paramPadding .paramName").height(k / 2 + "rem")
    }
    jm("#" + a + " .productCrossedSlide .style7Img").height(j + "rem")
};
Mobi.productCrossedSlideSec = function(a, d, f, b) {
    var c = jm("#" + a + " .productCrossedSlideSec .style9Img").width();
    var h = _htmlFontSize;
    var j = (c * f) / (d * h);
    j = parseFloat(j.toFixed(4));
    var i = jm("#" + a + " .paramPadding .paramName").css("font-size");
    if (typeof i != "object") {
        var k = i.substring(0, i.indexOf("p")) / h;
        jm("#" + a + " .productCrossedSlideSec .paramPadding .paramName").css("line-height", k + "rem");
        k = parseFloat(k.toFixed(4)) * 2
    } else {
        k = 0
    }
    var e = "paramWrap";
    if (b == e) {
        jm("#" + a + " .productCrossedSlideSec .paramPadding .paramName").height(k + "rem")
    } else {
        jm("#" + a + " .productWaterFall .paramPadding .paramName").height(k / 2 + "rem")
    }
    jm("#" + a + " .productCrossedSlideSec .style9Img").height(j + "rem")
};
Mobi.productCrossedSlideSecSwipe = function(b, l) {
    var e = Mobi.getPreviewObject(b),
        a = Mobi.getPreviewObject(l),
        k = e,
        n = parseInt(jm(a).width()),
        h = 0,
        c = a.querySelectorAll(".productCrossedSlideSec");
    var m = _htmlFontSize;
    var j = c.length * 0.5 * m;
    for (var d = 0; d < c.length; d++) {
        h += c[d].offsetWidth
    }
    h += j;
    if (h > n) {
        if (navigator.appVersion.match(/MSIE [\d.]+/)) {
            if (parseInt(navigator.appVersion.match(/MSIE ([\d.]+)/)[1]) === 10) {
                h = h + c.length * 2
            }
        }
        h = h + 10;
        jm(k).css("width", h + "px");
        var f = jm.getCookie("startX") ? parseInt(jm.getCookie("startX")) : 0;
        if (jm.os.supportsTouch) {
            var o = new iScroll(a, {
                x: f,
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                remarkXCoordinate: true,
                onBeforeScrollStart: null
            })
        } else {}
    }
};
Mobi.hideProductItemContainer = function(a) {
    jm(Mobi.getPreviewObject(a)).removeAttr("style");
    jm(Mobi.getPreviewObject("productSlide")).find(".productLeft").hide();
    jm(Mobi.getPreviewObject("productSlide")).find(".productRight").hide()
};
Mobi.hideParamPadding = function(b) {
    var a = jm("#" + b + " .paramCollection").children("p").length;
    if (a === 0) {
        jm("#" + b + " .paramCollection").removeClass("paramPadding")
    }
};
Mobi.removeMarginBottom = function(c, b) {
    if (b == "styleNine") {
        var f = jm("#" + c + " .productCrossedSlideSec")
    } else {
        if (b == "styleEight") {
            var f = jm("#" + c + " .productWaterFall")
        } else {
            if (b == "styleSeven") {
                var f = jm("#" + c + " .productCrossedSlide")
            }
        }
    }
    var a = f.eq(0).find(".paramCollection").children("p").length;
    var e = f.eq(0).find(".paramCollection").children(".paramName").length;
    if (a === 1 && e === 1) {
        jm("#" + c + " .paramCollection .paramName").css("marginBottom", 0)
    }
    var d = f.eq(0).find(".paramCollection").children(".paramPrice").length;
    if (a === 2 && d === 1) {
        f.find(".paramCollection").children(".paramLine").remove()
    }
};
Mobi.productNewDetailEventInit = function(f) {
    if (!f) {
        return
    }
    var y = f.moduleId,
        t = f.productId,
        x = f.mallOptionsOpen;
    pageStyle = f.pageStyle, returnUrl = f.returnUrl || "";
    Mobi.scrollFadeIn("productDetailHeader" + y, "productNewDetailSwipe" + y, pageStyle);
    Mobi.initAjaxTab({
        pid: t,
        moduleId: y
    });
    var z = document.getElementById("productDetailHeader" + y),
        j = document.getElementById("productNewDetailPanel" + y),
        p = j.querySelector(".productNewDetail .productInfoSize"),
        r = z.querySelector(".icon-gClose.proBack"),
        k = z.querySelector(".icon-noProduct.proShopping"),
        l = z.querySelector(".tabBody .userCommentInfo"),
        h = z.querySelector(".icon-gOther.proOther"),
        v = z.querySelector(".icon-share.proShare"),
        A = z.querySelector(".proOtherPanel"),
        a = j.querySelector(".productImmediatelyBug"),
        s = j.querySelector(".productMallBuy"),
        u = j.querySelector(".productMallShop"),
        o = j.querySelector("#productTabUl");
    var m = false;
    if (window.sessionStorage) {
        m = Mobi.checkWindowSeStgValue(window.sessionStorage._isJumpFromMlist);
        try {
            window.sessionStorage._isJumpFromMlist = false
        } catch (n) {}
    }
    var d = false;
    d = jm.getCookie("_fromCollect");
    jm(r).bind("click", function() {
        if (window.sessionStorage) {
            if (m) {
                if (window.sessionStorage._jumpMlistUrl.indexOf("?") <= -1) {
                    window.location.href = window.sessionStorage._jumpMlistUrl + "?commHideFlag=true"
                } else {
                    if (window.sessionStorage._jumpMlistUrl.indexOf("commHideFlag") <= -1) {
                        window.location.href = window.sessionStorage._jumpMlistUrl + "&commHideFlag=true"
                    } else {
                        window.location.href = window.sessionStorage._jumpMlistUrl
                    }
                }
                window.sessionStorage._backFromProDetail = true
            } else {
                if (d) {
                    jm.setCookie("_fromCollect", "", -1);
                    jm.setCookie("_openCollect", true);
                    window.location.href = Mobi.getQueryString("returnUrl")
                } else {
                    if (window.history.length <= 1) {
                        window.location.href = "index.jsp"
                    } else {
                        if (returnUrl.length > 0) {
                            window.location.href = returnUrl
                        } else {
                            history.back();
                            var B = setTimeout(function() {
                                window.location.href = "index.jsp";
                                B = null
                            }, 500)
                        }
                    }
                }
            }
            return false
        } else {
            if (window.history.length <= 1) {
                window.location.href = "index.jsp"
            } else {
                history.back();
                var B = setTimeout(function() {
                    window.location.href = "index.jsp";
                    B = null
                }, 500)
            }
            return false
        }
    });
    jm(j).bind("click", function() {
        if (jm(A).hasClass("proOtherPanelOpen")) {
            jm(A).removeClass("proOtherPanelOpen")
        }
    });
    jm(h).bind("click", function(B) {
        if (jm(A).hasClass("proOtherPanelOpen")) {
            jm(A).removeClass("proOtherPanelOpen")
        } else {
            jm(A).addClass("proOtherPanelOpen")
        }
        B.stopPropagation()
    });
    var q = Mobi.initWebPage({
        triggerId: "productInfoSize",
        panelId: "productMallOptionPanel",
        callback: c,
        pageBg: true,
        returnSeltFun: true,
        direction: "bottom",
        closeWebPage: "#productMallOptionPanel .productDetailClose.icon-Off"
    });

    function c() {
        if (Mobi.deviceTypeIsMobi()) {
            var B = new iScroll("mallOptionAndNumContainer")
        }
        if (!i) {
            w()
        }
        return false
    }
    var i = false;

    function w() {
        var C = document.getElementById("productMallOptionPanel"),
            D = document.getElementById("g_body").clientHeight,
            H = C.querySelector(".productMallOptionContentPanel"),
            B = C.querySelector(".productMallOptionContent"),
            E = C.querySelector(".productMallOptionMargin"),
            G = C.querySelectorAll(".productMallOptionContent>div"),
            F = true
    }
    var e;
    jm("#productNewDetailPanel" + y + " .productAddMall").bind("click", function() {
        q()
    });
    jm("#productNewDetailPanel" + y + " .productMallBuy").bind("click", function() {
        Mobi.mallBuy(t, e)
    });
    jm(a).bind("click", function() {
        e = 1;
        q()
    });
    var b = {
        triggerId: "productDetailShare",
        pageBg: true,
        pageHtml: Mobi.sharePage(Fai.top._shareData),
        direction: "bottom",
        callback: function() {
            Mobi.initProductSwipe("shareListShowSwipe")
        },
        closeWebPage: "#shareListPanel .shareListCancel"
    };
    Mobi.initWebPage(b);
    Mobi.hidePlaceholder()
};
Mobi.getQueryString = function(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)");
    var c = window.location.search.substr(1).match(b);
    if (c != null) {
        return unescape(c[2])
    }
    return null
};
Mobi.initCommentUserTab = function(c) {
    if (c !== 3) {
        return
    }
    var b = "ajax/productComment_h.jsp?cmd=submitPC&newComment=true";
    var a = {
        triggerId: "userCommentId",
        panelId: "userCommentPanel",
        callback: function() {
            Mobi.postUserComment(b)
        },
        closeWebPage: "#userCommentPanel .userCommentGoBack"
    };
    Mobi.initWebPage(a);
    jm("#userCommentId").one("click", function() {
        jm("#loginCaptchaImg").attr({
            src: "validateCode.jsp?v=610"
        })
    })
};
Mobi.initStarList = function(a) {
    jm(".J-star-list").eq(a).attr("_star", 5);
    jm(".J-star-list").eq(a).html('<li class="faisco-icons-star3"></li><li class="faisco-icons-star3"></li><li class="faisco-icons-star3"></li><li class="faisco-icons-star3"></li><li class="faisco-icons-star3"></li><li class="score-tip"></li>')
};
Mobi.setStarSelect = function() {
    Mobi.onTouchAndClickEvent(".J-star-list li", function() {
        var f = jm(".userCommentPanel").css("background-color");
        if (typeof f != "string") {
            f = "#FFF"
        }
        var c = jm(this).index();
        if (c >= 5) {
            return true
        }
        var e = jm(this).parent();
        e.attr("_star", c + 1);
        for (var d = 0; d < 5; d++) {
            var a = e.find("li").eq(d);
            if (d < c + 1) {
                if (c < 2) {
                    a.removeClass("select_more");
                    a.addClass("select_less")
                } else {
                    a.removeClass("select_less");
                    a.addClass("select_more")
                }
            } else {
                a.removeClass("select_more");
                a.removeClass("select_less")
            }
        }
        e.find("li.score-tip").show();
        var h = "";
        var b = "";
        if (c == 0) {
            h = LS.badComment;
            b = "#b7b6b6"
        } else {
            if (c == 1) {
                h = LS.moderateComment;
                b = "#b7b6b6"
            } else {
                if (c == 2) {
                    h = LS.moderateComment;
                    b = "#ffb600"
                } else {
                    h = LS.highComment;
                    b = "#ffb600"
                }
            }
        }
        e.find("li.score-tip").html("<em></em><span></span>" + (c + 1) + LS.score + h);
        e.find("li.score-tip").css({
            "border-color": b,
            color: b,
            display: "inline-block"
        });
        e.find("li.score-tip em").css({
            borderColor: "transparent " + b + " transparent transparent"
        });
        e.find("li.score-tip span").css({
            borderColor: "transparent " + f + " transparent transparent"
        })
    })
};
Mobi.sharePage = function(k) {
    if (!k) {
        return
    }
    var i = jm.parseJSON(k.shareLinkList),
        b = k.shareUrl,
        d = k.browserTitle;
    var j = "",
        f = [];
    for (var c in i) {
        var a = i[c].url,
            e = i[c].icon;
        j += "<a hidefocus='true' class='shareLink' href='javascript:;' onclick='window.open(\"" + a + "\")'><div class='shareNewIcon g_iconMiddle icon-" + e + "'></div><div class='shareText icon-" + e + "-text'></div></a>";
        if ((parseInt(c) + 1) % 8 === 0) {
            f.push("<div class='swipImgBox'>" + j + "</div>");
            j = ""
        }
    }
    j && f.push("<div class='swipImgBox'>" + j + "</div>");
    var h = "<div class='shareListPanel' id='shareListPanel'><div class='shareListContent'><div class='shareTitle'>" + LS.shareIt + "</div><div class='shareListShow' id='shareListShowSwipe'><div class='shareListSwipe'>" + f.join("") + "</div>";
    if (i.length > 8) {
        h += '<div class="shareBullet"><ul id="bullets" class="bullets"><li class="on"></li><li></li></ul></div>'
    }
    h += "</div><div class='shareListCancel'>" + LS.cancel + "</div></div></div>";
    return h
};
Mobi.showPbSingalInstCommImg = function() {
    var a = jm(".J_productCommImg").eq(0)[0].querySelectorAll("img");
    if (typeof(a) != "undefined" && a != null && a.length > 0) {
        Mobi.bindCommImgShow(a, true, 0)
    }
};
Mobi.setMemberPriceLabelColot2ThemeBackgroundColor = function() {
    var a = jm(".productImmediatelyBug").css("background-color");
    jm(".memberPrice").css("background-color", a)
};
Mobi.initPbCommUploadImgParam = function(c, d, j, k, e, f, n, b) {
    _pbCommUploadImgParam = {
        upImgMaxSize: c,
        imgType: d,
        upImgMaxNum: j,
        jsJquery: k,
        jsUpload: e,
        swfUpload: n,
        isIE: b,
        siteMainDomain: f
    };
    var h = document.body;
    if (!l(k)) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = k;
        a.onload = function() {
            m()
        };
        h.appendChild(a)
    } else {
        m()
    }

    function m() {
        var p = e,
            o;
        if (b == "true") {
            p = n
        }
        if (!l(p)) {
            o = document.createElement("script");
            o.src = p;
            o.type = "text/javascript";
            h.appendChild(o);
            o.onload = function() {
                i()
            }
        } else {
            i()
        }
    }

    function i() {
        if (b == "true") {
            Mobi.mobiPbCommUploadImgSWF("comm-img-swfu-placeholder", c, d, j)
        } else {
            Mobi.mobiPbCommUploadImgHtml("comm-img-swfu-placeholder", c, d, f)
        }
    }

    function l(t) {
        var q = document.getElementsByTagName("script"),
            r = false,
            p = "";
        for (var s = 0, o = q.length; s < o; s++) {
            p = (q[s].getAttribute && q[s].getAttribute("src")) || "";
            if (p == t) {
                r = true;
                break
            }
        }
        return r
    }
};
Mobi.mobiPbCommUploadImgSWF = function(d, b, f, a) {
    var e = f.split(",");
    var c = {
        file_post_name: "Filedata",
        upload_url: "/ajax/commUpsiteimg_h.jsp",
        button_placeholder_id: d,
        file_size_limit: b + "MB",
        button_image_type: 3,
        file_queue_limit: 1,
        button_width: "50px",
        button_height: "50px",
        button_cursor: SWFUpload.CURSOR.HAND,
        button_image_url: _resRoot + "/image/mobi/msgUpImg/upload.png",
        requeue_on_error: false,
        post_params: {
            ctrl: "Filedata",
            app: 21,
            type: 0,
            fileUploadLimit: a
        },
        file_types: e.join(";"),
        file_dialog_complete_handler: function(h) {
            this._allSuccess = false;
            this.startUpload()
        },
        file_queue_error_handler: function(i, h, j) {
            switch (h) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    Mobi.ing(LS.mobiFormSubmitCheckFileSizeErr, true);
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    Mobi.ing(LS.mobiFormSubmitFileUploadNotAllow, true);
                    break;
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadOneTimeNum, "1"), true);
                    break;
                default:
                    Mobi.ing(LS.mobiFormSubmitFileUploadReSelect, true);
                    break
            }
        },
        upload_success_handler: function(i, h) {
            var j = jQuery.parseJSON(h);
            this._allSuccess = j.success;
            this._sysResult = j.msg;
            if (j.success) {
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(i.name)), true)
                }, 1800);
                Mobi.onPbCommFileUploadEvent("upload", j)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + i.name + "   " + j.msg)
            }
        },
        upload_error_handler: function(i, h, j) {
            if (h == -280) {
                Mobi.ing(LS.mobiFormSubmitFileUploadFileCancle, false)
            } else {
                if (h == -270) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadFileExist, jm.encodeHtml(i.name)), true)
                } else {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(i.name)))
                }
            }
        },
        upload_complete_handler: function(h) {
            if (h.filestatus == SWFUpload.FILE_STATUS.COMPLETE) {
                setTimeout(function() {
                    swfObj.startUpload()
                }, swfObj.upload_delay)
            } else {
                if (h.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(h.name)))
                }
            }
        },
        upload_start_handler: function(h) {
            Mobi.ing(LS.mobiFormSubmitFileUploadPrepare, false)
        },
        view_progress: function(h, k, j, i) {
            var i = Math.ceil((k / j) * 100);
            if (isNaN(i)) {
                return
            }
            if (i == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + i + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + i + "%", false)
            }
        }
    };
    swfObj = SWFUploadCreator.create(c)
};
Mobi.mobiPbCommUploadImgHtml = function(h, c, d, f) {
    var a = d.split(",");
    var i = {
        siteFree: false,
        updateUrlViewRes: "",
        auto: true,
        fileTypeExts: a.join(";"),
        multi: false,
        fileSizeLimit: c * 1024 * 1024,
        breakPoints: true,
        saveInfoLocal: false,
        showUploadedPercent: true,
        removeTimeout: 9999999,
        getFileSizeUrlFlag: true,
        post_params: {
            app: 21,
            type: 0,
            fileUploadLimit: c,
            isSiteForm: true
        },
        buttonText: "",
        uploader: "http://" + f + '/ajax/commUpsiteimg_h.jsp?cmd="mobiUpload"',
        onUploadStart: function(k) {
            _uTime = new Date().getTime()
        },
        onUploadSuccess: function(l, n) {
            var m = jm.parseJSON(n);
            if (m.success) {
                var k = {
                    status: "end",
                    id: l.id,
                    title: "上传成功。"
                };
                e(k);
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(l.name)), true)
                }, 1800);
                Mobi.onPbCommFileUploadEvent("upload", m)
            } else {
                var k = {
                    status: "end",
                    id: l.id,
                    title: m.msg
                };
                e(k);
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + l.name + "   " + m.msg)
            }
        },
        onUploadError: function(k, l) {
            jm("#progressBody_ " + k.id).remove();
            jm("#progressWrap_" + k.id).remove();
            Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(k.name)));
            _uTime = new Date().getTime() - _uTime
        },
        view_progress: function(k) {
            var k = Math.ceil(k);
            if (isNaN(k)) {
                return
            }
            if (k == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + k + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + k + "%", false)
            }
        }
    };

    function e(k) {
        if (isNaN(Math.round(k.percent))) {
            return
        }
        if (k.status == "start") {
            var l = ['<div id="progressBody_' + k.id + '" class="bodyDisable"></div>', '<div id="progressWrap_' + k.id + '" class="bodyProgressWrap">', '<div class="progressCenter"></div>', '<div class="progressIngBody">', '<div id="progressTitle' + k.id + '" class="progressIngTitle">' + k.title + "</div>", '<div class="progressIngMission">', '<div class="mission"><div id="progress' + k.id + '" class="progress" style="width:1%;"></div></div>', '<div id="progressNum' + k.id + '" class="progressNum">0%</div>', "</div>", '<div class="progressInfo"><span id="progressTips' + k.id + '" class="progressFileSize"></span><a class="progressCancel" href="javascript:uploadCancel(\'' + k.id + "');\">取消</a></div>", "</div>", "</div>"];
            jm("body").append(l.join(""))
        } else {
            if (k.status == "ing") {
                jm("#progressTitle" + k.id).text(k.title);
                jm("#progress" + k.id).css("width", Math.round(k.percent) + "%");
                jm("#progressNum" + k.id).html(Math.round(k.percent) + "%")
            } else {
                if (k.status == "end") {
                    jm("#progressTitle" + k.id).text(k.title);
                    jm("#progressBody_" + k.id).remove();
                    jm("#progressWrap_" + k.id).remove()
                } else {
                    if (k.status == "error") {
                        jm("#progress" + k.id).addClass("progressError")
                    }
                }
            }
        }
    }
    upload = jm("#" + h).uploadify(i);
    var j = "file_upload_pt_1";
    var b = "select_btn_pt_1";
    jm("#file_upload_1-button").attr("id", j);
    jm("#select_btn_1").attr("id", b);
    if (Fai.top._manageMode) {
        jm("#file_upload_pt_1").attr("disabled", "true")
    }
};
Mobi.onPbCommFileUploadEvent = function(j, f) {
    if (j == "upload") {
        var c = f.id;
        var i = f.name;
        var e = f.size;
        var d = f.path;
        var k = f.pathSmall;
        var b = f.fileId;
        var a = f.width;
        var h = f.height;
        Mobi.pbCommImgTableCtrl(k, i, c, e, b)
    }
};
Mobi.pbCommImgTableCtrl = function(k, a, b, h, d) {
    var i = $("#pt_add_img_tb").eq(0);
    var j = i.find(".comm-find-tb").length;
    var e = i.find(".comm-find-tb").eq(j - 1);
    var c = e.attr("maxNum");
    if (parseInt(j - 1) >= c) {
        return
    }
    var f = [];
    f.push("<td  class='comm-find-tb comm-find-tb-remove'>");
    f.push("<table style='width:100%; height:100%; table-layout:fixed;'  cellpadding='0'  cellspacing='0'>");
    f.push(" <tr>");
    f.push("    <td valign='middle'   align='center' class='comm-show-td-bd'>");
    f.push("      <img src='" + k + "' alt='' onclick='Mobi.pbRemoveBodyStyle()'  _name='" + a + "' _id='" + b + "' _file_size='" + h + "' _file_id='" + d + "' class='comm-up-set'>");
    f.push("     </td>");
    f.push(" </tr>");
    f.push("</table>");
    f.push("<div class='comm-up-div'>");
    f.push("  <span onclick=Mobi.pbCommTableImgDelete(this) class='comm-up-div-set'/>");
    f.push("</div>");
    f.push("</td>");
    e.before(f.join(""));
    j = i.find(".comm-find-tb").length;
    if (parseInt(j - 1) >= c) {
        e.css("display", "none")
    }
    Mobi.showPbSingalInstCommImg()
};
Mobi.pbCommTableImgDelete = function(a) {
    var d = jm("#pt_add_img_tb").eq(0);
    var b = d.find(".comm-find-tb").length;
    for (var c = 0; c < b; c++) {
        if (d.find(".comm-find-tb").eq(c).find(".comm-up-div-set")[0] === a) {
            d.find(".comm-find-tb").eq(c).remove();
            break
        }
    }
    b = d.find(".comm-find-tb").length;
    var e = d.find(".comm-find-tb").eq(b - 1);
    if (b <= e.attr("maxNum")) {
        e.css("display", "block")
    }
    Mobi.showPbSingalInstCommImg()
};
Mobi.postUserComment = function(f) {
    var c = document.getElementById("userCommentPanel"),
        e = c.querySelector(".tabUl"),
        b = c.querySelector(".tabLi"),
        a = c.querySelector(".tabUserPanel"),
        d = function(l) {
            if (l) {
                var m = l.getAttribute("data"),
                    k = c.querySelector(".tabActive").getAttribute("data"),
                    j = document.getElementById("tabUserPanel" + m);
                jm(c.querySelector(".tabActive")).removeClass("tabActive");
                jm(c.querySelector(".tabPanelAtive")).removeClass("tabPanelAtive");
                jm("#userCommentRemarkPanel" + m).append(jm("#userCommentRemarkPanel" + k + " .g_globalLine"));
                jm(j).append(jm("#userCommentRemarkPanel"));
                jm("#tabUserLi" + m).addClass("tabActive");
                jm(j).addClass("tabPanelAtive")
            }
        },
        i = function() {
            var m = jm("#user").val();
            var l = jm("#password").val();
            var j = (jm(".loginCaptchaCtrl").css("display") != "none");
            var k = jm("#loginCaptcha").val();
            if (m == null || m == "") {
                Mobi.ing(LS.memberInputAcct);
                return
            }
            if (l == null || l == "") {
                Mobi.ing(LS.memberInputPwd);
                return
            }
            if (j && (k == null || k == "")) {
                Mobi.ing(LS.memberInputCaptcha);
                return
            }
            l = jm.md5(l);
            jm.ajax({
                type: "post",
                url: "ajax/login_h.jsp",
                data: "cmd=loginMember&acct=" + jm.encodeUrl(m) + "&pwd=" + jm.encodeUrl(l) + "&captcha=" + jm.encodeUrl(k),
                error: function() {
                    loginBtn.removeAttr("disabled");
                    Mobi.showMemberLoginMsg(-1)
                },
                success: function(n) {
                    var n = jm.parseJSON(n);
                    if (n.success) {
                        Fai.top.sessionMemberId = n.sessionMemberId;
                        jm("#_TOKEN").remove();
                        jm("head").append(n._HEADTOKEN);
                        h(true);
                        return
                    } else {
                        if (n.active) {
                            Mobi.ing(LS.memberLoginMailActivation)
                        } else {
                            Mobi.showMemberLoginMsg(n.rt, n.captcha)
                        }
                    }
                }
            })
        },
        h = function(o) {
            var u = jm("#postCommentId").val();
            var k = jm("#userCommentRemark").val();
            var p = jm("#userCommentRemark").attr("minlength");
            var m;
            var r;
            if (typeof(k) != "string" || "" == k) {
                Mobi.ing(LS.commentNotEmpty);
                return
            }
            if (k.length < p) {
                Mobi.ing(jm.format(LS.commentLenTips, jm.encodeHtml(p)));
                return
            }
            if (!o) {
                r = jm.trim(jm("#anonymityCommentUser").val());
                var x = jm("#anonymityCommentUser").attr("minlength");
                m = jm("#loginCaptcha").val();
                var s = (jm(".loginCaptchaCtrl").css("display") != "none");
                if (typeof(r) != "string") {
                    Mobi.ing(LS.creatorTips);
                    return
                }
                if (s && (typeof(m) != "string" || "" == m)) {
                    Mobi.ing(LS.memberInputCaptcha);
                    return
                }
            } else {
                r = jm.trim(jm("#user").val());
                m = jm("#loginCaptcha").val()
            }
            var v = jm(".J_productCommImg").find("img");
            var n = [];
            if (v != null && typeof(v) != "undefined") {
                var j = v.length;
                if (j > 0) {
                    for (var z = 0; z < j; z++) {
                        var l = v.eq(z);
                        if (l != null && l != "undefined") {
                            var A = {};
                            var y = l.attr("_id");
                            var C = l.attr("_name");
                            var t = l.attr("_file_size");
                            var w = l.attr("_file_id");
                            A.imgId = y;
                            A.imgName = C;
                            A.imgSize = t;
                            A.tempFileId = w;
                            n.push(A)
                        }
                    }
                }
            }
            var q = {
                validateCode: m,
                commentsObjId: u,
                creator: r,
                commImgList: JSON.stringify(n),
                comment: k,
                anonymity: !o
            };
            var B;
            if (o) {
                B = jm(".J-star-list").eq(0).attr("_star")
            } else {
                B = jm(".J-star-list").eq(1).attr("_star")
            }
            if (B) {
                q.star = B
            }
            Mobi.ing(LS.siteFormSubmitIng);
            jm.ajax({
                type: "POST",
                url: f,
                data: q,
                error: function() {
                    Mobi.ing(LS.systemError);
                    jm("#captchaChange").click()
                },
                success: function(D) {
                    var E = jm.parseJSON(D);
                    if (!E || !E.success) {
                        jm("#captchaChange").click()
                    }
                    switch (E.msg) {
                        case 1:
                            Mobi.showMemberLoginMsg(-301, E.captcha);
                            Mobi.ing(LS.captchaError);
                            jm("#loginCaptchaImg").click();
                            jm("#loginCaptcha").val("");
                            break;
                        case 2:
                            Mobi.ing(LS.creatorError);
                            break;
                        case 3:
                            Mobi.ing(LS.commentError);
                            break;
                        case 4:
                            if (B) {
                                E.comment.star = B
                            }
                            Mobi.addTheNewComment(E.comment);
                            Mobi.ing(LS.submitSuccess, 1);
                            jm("#userCommentRemark").val("");
                            jm("#loginCaptchaImg").click();
                            jm("#loginCaptcha").val("");
                            jm(".comm-find-tb-remove").remove();
                            if (o) {
                                Mobi.initStarList(0)
                            } else {
                                Mobi.initStarList(1)
                            }
                            break;
                        case 5:
                            Mobi.ing(LS.paramError);
                            break;
                        case 6:
                            Mobi.ing(LS.OnlyMembersCanComment);
                            d(jm("#tabUserLi1")[0]);
                            break;
                        case 7:
                            Mobi.ing(LS.commentClosed);
                            break;
                        case 8:
                            Mobi.ing(LS.commentSubmitError);
                            break;
                        case 9:
                            Mobi.ing(LS.commentCountLimit);
                            break;
                        default:
                    }
                }
            })
        };
    Mobi.bindTouchAndClickEvent(jm(e), function(k) {
        var j = k.target;
        d(j)
    });
    Mobi.bindTouchAndClickEvent(jm("#userCommentLoginAndComform"), function(j) {
        if (Fai.top._manageMode) {
            Mobi.ing("您目前处于网站管理状态，请先退出再登录");
            return
        }
        if (Fai.top.sessionMemberId > 0) {
            h(true)
        } else {
            i()
        }
        j.stopPropagation();
        return false
    });
    Mobi.bindTouchAndClickEvent(jm("#anonymityCommentComform"), function(j) {
        if (Fai.top._manageMode) {
            Mobi.ing("您目前处于网站管理状态，请先退出再登录");
            return
        }
        h(false);
        j.stopPropagation();
        return false
    })
};
Mobi.addTheNewComment = function(w) {
    var d = [];
    var c = "VIP";
    if (w.newsId != null) {
        if (w.memberId == 0) {
            c = LS.Incognito
        }
        var t = new Date(w.createTime);
        t = Mobi.formatDate(t);
        d.push("<div class='msgArea'>");
        d.push("  <div class='msgTitle'>");
        d.push("  <div class='msgUser'><span class='g_mainColor'>[" + c + "]</span>" + w.creator + "</div>");
        d.push("  <div class='msgTime'>" + t + "</div>");
        d.push("  </div>");
        d.push("  <div class='msgContent'>" + w.comment + "</div>");
        d.push("</div>");
        if (jm(".nnewsComHeader").length != 0) {
            jm(d.join("")).insertAfter(jm(".nnewsComHeader"))
        } else {
            location.reload()
        }
    } else {
        if (w.memberId == 0) {
            c = LS.Incognito
        } else {
            c = w.level
        }
        var t = new Date(w.createTime);
        t = Mobi.formatDate(t);
        var n = jm("html").css("font-size");
        n = n.substring(0, n.length - 2);
        var p = w.headPic;
        d.push("<div class='msgArea ct-panel' style='padding-bottom:0.25rem;margin-top:-0.5rem'>");
        d.push("<div class='pdMsgTitle'>");
        d.push('<div class="msgUserHeacPic"><img src="' + p.path + '" ');
        if (p.thumbId) {
            var o = p.width,
                e = p.left,
                m = p.top,
                b = p.imgW,
                j = p.imgH;
            var v = o / (n * 1.8);
            d.push('style="top:' + -m / v + "px; left:" + -e / v + "px; width:" + b / v + "px; height:" + j / v + 'px"')
        } else {
            d.push('style="height:' + (n * 1.8) + 'px"')
        }
        d.push(" /></div>");
        d.push("<div class='msgUser g_mirrorColor'>&nbsp;" + w.creator + "</div>");
        d.push("<span class='msgLevalUser'>[" + c + "]</span>");
        d.push("<div class='msgTime g_mirrorColor'>" + t + "</div>");
        d.push("</div>");
        if ("star" in w) {
            d.push("<div class='fk-star-list'>");
            var s = Number(w.star);
            for (var q = 0; q < 5; q++) {
                if (q < s) {
                    d.push("<li class='faisco-icons-star3 select_more'></li>")
                } else {
                    d.push("<li class='faisco-icons-star3 select_less'></li>")
                }
            }
            d.push("</div>");
            if (s == 1) {
                var f = Number(jm(".fk-right-statisBox .badComm").text());
                jm(".fk-right-statisBox .badComm").text(f + 1)
            } else {
                if (s > 3) {
                    var f = Number(jm(".fk-right-statisBox .hignComm").text());
                    jm(".fk-right-statisBox .hignComm").text(f + 1)
                } else {
                    var f = Number(jm(".fk-right-statisBox .middComm").text());
                    jm(".fk-right-statisBox .middComm").text(f + 1)
                }
            }
            var k = jm(".fk-comm-avgScore"),
                h = Number(k.attr("_tc")) + s,
                l = Number(k.attr("_ts")) + 1;
            var u = h / l;
            k.text(u.toFixed(1));
            k.attr("_tc", h);
            k.attr("_ts", l)
        }
        d.push("<div class='msgContent g_defaultColor'>" + w.comment + "</div>");
        if (typeof(w.commImgList) != "undefined" && w.commImgList != "null") {
            var a = jm.parseJSON(w.commImgList);
            if (a != null && a.length > 0) {
                d.push("<div class='ct-s-content-m' style='padding:0;'>");
                d.push("<table>");
                d.push("<tr>");
                for (var q = 0; q < a.length; q++) {
                    d.push("<td class='s-img-f-tb'>");
                    d.push("<table class='s-img-tb' cellpadding='0' cellspacing='0'>");
                    d.push("<tr>");
                    d.push("<td class='s-img-bd' valign='middle'   align='center'>");
                    d.push("<img src='" + a[q].path + "' alt='' class='s-img-set'>");
                    d.push("</td>");
                    d.push("</tr>");
                    d.push("</table>");
                    d.push("</td>")
                }
                d.push("</tr>");
                d.push("</table>");
                d.push("</div>")
            }
        }
        d.push("</div>");
        if (jm("#tabPanel3 .msgArea")[0] != undefined) {
            jm(d.join("")).insertBefore(jm("#tabPanel3 .msgArea")[0]);
            Mobi.setNewCommImgBindShow()
        } else {
            location.reload()
        }
    }
    jm("#userCommentPanel .userCommentGoBack").click()
};
Mobi.setNewCommImgBindShow = function() {
    setTimeout(function() {
        var b = jm("#tabPanel3 .msgArea").eq(0).find(".ct-s-content-m").eq(0)[0];
        if (typeof(b) != "undefined" && b != "null") {
            var a = b.querySelectorAll("img");
            if (typeof(a) != "undefined" && a != null && a.length > 0) {
                Mobi.bindCommImgShow(a, false, 0)
            }
        }
    }, 500)
};
Mobi.formatDate = function(b) {
    var k = new Date(b);
    var j = b.getFullYear();
    var a = parseInt(b.getMonth() + 1) > 9 ? parseInt(b.getMonth() + 1) : ("0" + parseInt(b.getMonth() + 1));
    var i = b.getDate() > 9 ? b.getDate() : ("0" + b.getDate());
    var e = b.getHours() > 9 ? b.getHours() : ("0" + b.getHours());
    var f = b.getMinutes() > 9 ? b.getMinutes() : ("0" + b.getMinutes());
    var c = b.getSeconds() > 9 ? b.getSeconds() : ("0" + b.getSeconds());
    return j + "-" + a + "-" + i
};
Mobi.initAjaxTab = function(c) {
    if (!c) {
        return
    }
    var b = c.pid,
        f = c.moduleId,
        i = document.querySelector("#productDetailTabPanel" + f + " .tabUl"),
        d = document.querySelector("#productDetailTabPanel" + f + " .tabBody"),
        e = document.getElementById("productNewDetailPanel" + f),
        a = function(n) {
            if (!n) {
                return
            }
            var l = parseInt(n.getAttribute("data")),
                k = document.getElementById("tabPanel" + l),
                s = document.getElementById("tabLi" + l),
                o = e.querySelector(".tabLi.tabActive"),
                q = e.querySelector(".tabPanel.tabPanelAtive");
            if (!k) {
                return
            }
            jm(o).removeClass("tabActive");
            jm(q).removeClass("tabPanelAtive");
            jm(s).addClass("tabActive");
            jm(k).addClass("tabPanelAtive");
            setTimeout(function() {
                Mobi.productTabUlScroll()
            }, 0);
            var j = jm("html").css("font-size");
            j = j.substring(0, j.length - 2);
            if (k.innerHTML == "") {
                var m = "<div id='tabPanelLoading' class='tabPanelLoading'></div>";
                jm(d).append(m);
                var p = "pid=" + b + "&type=" + l + "&moduleId=" + f + "&rem=" + j;
                jm.ajax({
                    type: "post",
                    url: "ajax/product_h.jsp?cmd=getProductDetailInfo",
                    data: p,
                    error: function() {
                        Mobi.ing("error")
                    },
                    success: function(r) {
                        var t = jm.parseJSON(r);
                        if (!t.html) {
                            jm("#tabPanelLoading").remove();
                            t.html = ""
                        }
                        if (l == 3) {
                            k.innerHTML = t.html;
                            Mobi.initCommentUserTab(3);
                            Mobi.setCommImgBindShow()
                        } else {
                            if (l === 1) {
                                t.html = "<div class='productDetailInfoPanel g_defaultColor'>" + t.html + "</div>";
                                if (!Fai.top._productRecommentData) {
                                    k.innerHTML = t.html;
                                    jm("#tabPanelLoading").remove();
                                    Mobi.switchJump();
                                    Mobi.initModulePhotoSwipe("productDetailTabPanel" + f);
                                    return
                                }
                                k.innerHTML = t.html + Fai.top._productRecommentData;
                                Mobi.productCrossedSlideSec("mProductList" + f, 1, 1, "paramWrap");
                                Mobi.productCrossedSlideSecSwipe("productSlideList" + f, "productSlide" + f);
                                Mobi.switchJump();
                                Mobi.initModulePhotoSwipe("productDetailTabPanel" + f)
                            } else {
                                if (l === 2) {
                                    k.innerHTML = t.html
                                }
                            }
                        }
                        jm("#tabPanelLoading").remove()
                    }
                })
            }
        },
        h = function(k) {
            var j = k.target;
            if (j) {
                a(j);
                return false
            }
        };
    if (!i.querySelector(".tabActive")) {
        return
    }
    jm(i).bind("click", h);
    a(i.querySelector(".tabActive"));
    jm(e).css("min-height", jm(window).height() + "px");
    Mobi.initCommentUserTab(parseInt(i.querySelector(".tabActive").getAttribute("data")))
};
Mobi.getCommentAjaxPagenation = function(b, d) {
    if (!b) {
        return
    }
    var c = jm("html").css("font-size");
    c = c.substring(0, c.length - 2);
    var a = "pid=" + b + "&pageno=" + d + "&ajaxPage=" + true + "&rem=" + c;
    jm.ajax({
        type: "post",
        url: "ajax/product_h.jsp?cmd=getProductInfoComment",
        data: a,
        error: function() {
            Mobi.ing("error")
        },
        success: function(e) {
            var f = jm.parseJSON(e);
            if (!f.html) {
                f.html = ""
            }
            jm("#tabPanel3 .commentBoxPanel").remove();
            document.getElementById("tabPanel3").insertBefore(jm(f.html)[0], jm("#tabPanel3 .userComment")[0]);
            Mobi.setCommImgBindShow()
        }
    })
};
Mobi.setCommImgBindShow = function() {
    setTimeout(function() {
        var b = jm(".ct-s-content-m");
        if (typeof(b) != "undefined" && b != null) {
            for (var c = 0; c < b.length; c++) {
                var a = b.eq(c)[0].querySelectorAll("img");
                if (typeof(a) != "undefined" && a != null && a.length > 0) {
                    Mobi.bindCommImgShow(a, false, 0)
                }
            }
        }
    }, 500)
};
Mobi.pbSaveBodyStyle = function() {
    if (typeof(g_saveBodyIdStyle) != "undefined" && g_saveBodyIdStyle != null) {
        jm("#g_body").attr("style", g_saveBodyIdStyle);
        g_saveBodyIdStyle = null
    }
};
Mobi.pbRemoveBodyStyle = function() {
    g_saveBodyIdStyle = jm("#g_body").attr("style");
    jm("#g_body").attr("style", "")
};
Mobi.bindCommImgShow = function(h, b, c) {
    var k = {
            imageScaleMethod: "fitNoUpscale",
            enableMouseWheel: false,
            resetToolbarPosition: true,
            loop: false,
            captionAndToolbarAutoHideDelay: 0,
            showCountTextLeft: true,
            getImageCaption: function(l, m) {
                var o, n;
                o = l + " / " + m;
                n = document.createElement("div");
                n.className = "ps-comm-page";
                n.appendChild(document.createTextNode(o));
                return n
            },
            getToolbar: function() {
                return '<div onclick="Mobi.pbSaveBodyStyle()" class="ps-toolbar-close   ps-toolbar-close-style icon-toolbar-close-style"></div>'
            }
        },
        i = null,
        d = null,
        f = null,
        e = null,
        a = window.Code.PhotoSwipe;
    if (b == null || !b || b == "false") {
        var j = a.attach(h, k)
    } else {
        if (typeof(g_showCommImgInstance) != "undefined" && g_showCommImgInstance != "null") {
            if (typeof(g_showCommImgInstance[c]) != "undefined" && g_showCommImgInstance[c] != "null") {
                a.detatch(g_showCommImgInstance[c]);
                g_showCommImgInstance[c] = null
            } else {
                g_showCommImgInstance[c] = {}
            }
        } else {
            g_showCommImgInstance = [];
            g_showCommImgInstance[c] = {}
        }
        setTimeout(function() {
            g_showCommImgInstance[c] = a.attach(h, k)
        }, 1000)
    }
};
Mobi.scrollFadeIn = function(i, c, l) {
    var c = document.getElementById(c),
        i = document.getElementById(i),
        m = document.getElementById("g_body"),
        a = i.clientHeight,
        d = c.clientHeight,
        h = false,
        e = false;
    document.addEventListener("touchstart", function(n) {
        k();
        b()
    }, false);
    document.addEventListener("touchmove", function(n) {
        k();
        b()
    }, false);
    document.addEventListener("touchend", function(n) {
        k();
        b()
    }, false);
    document.addEventListener("touchcancel", function(n) {
        k();
        b()
    }, false);
    document.addEventListener("scroll", function() {
        k();
        b()
    }, false);
    k();

    function k() {
        var o = m.scrollTop;
        if (l == 1) {
            return
        }
        if (o < d + 1) {
            var n = o * 1 / d;
            i.style.background = "rgba(255,255,255," + n + ")";
            i.style.borderBottom = "";
            e = true
        }
        if (o > d && e) {
            i.style.background = "rgba(255,255,255,0.99)";
            i.style.borderBottom = "1px solid #ddd";
            e = false
        }
    }
    productTabUl = document.getElementById("productTabUl");
    if (productTabUl != null && productTabUl != undefined) {
        var j = productTabUl.clientHeight,
            f = productTabUl.offsetTop;
        Mobi.productTabUlScroll = b
    }

    function b() {
        var n = m.scrollTop;
        if (n > (f - a) && !h) {
            jm(productTabUl).addClass("tabUl_fix");
            h = true
        }
        if ((n + j) < f && h) {
            jm(productTabUl).removeClass("tabUl_fix");
            h = false
        }
    }
};
Mobi.salePromotionDetail = {
    salePromotionParam: "",
    showType: "2",
    styleType: "1",
    saleCountTimeInterval: {},
    showSaleTime: false,
    showSaleDlMore: false,
    saleReSalePriceHtml: ""
};
Mobi.initSalePromotion = function(c, a, b) {
    Mobi.salePromotionDetail.salePromotionParam = c;
    Mobi.salePromotionDetail.styleType = a;
    Mobi.salePromotionDetail.saleReSalePriceHtml = b
};
Mobi.oldShowSalePromotionDl = function(k, d, e) {
    if (typeof(k) == "undefined" || k == null || k == "") {
        return
    }
    Mobi.salePromotionDetail.salePromotionParam = k;
    var b = [];
    if (k.saleType == "1") {
        var h = "";
        if (typeof(k.other.ruleData.d.length) == "undefined") {
            return
        }
        var f = parseFloat(k.other.ruleData.d[0].m);
        if (k.other.ruleData.s == "1") {
            if (Fai.top._lcid == 2052 || Fai.top._lcid == 1028) {
                h = jm.format(LS.salePromotionDisCount, f)
            } else {
                h = jm.format(LS.salePromotionDisCount, 10 * (10 - f))
            }
            d = parseFloat(d) * f / 10
        } else {
            h = jm.format(LS.salePromotionLapse, f);
            d = parseFloat(d) - f
        }
        if (d < 0) {
            d = 0
        }
        b.push("<table cellpadding='0' cellspacing='0'>");
        b.push("<tr>");
        b.push("<td>" + LS.promotionPrice + LS.colon + "</td>");
        b.push("</td>");
        b.push("<td class='J_salePriceSet'>" + e + d.toFixed(2) + "</td>");
        b.push("</td>");
        b.push("<td class='oldTbTd1'>");
        b.push("<div class='trangle'>");
        b.push("</div>");
        b.push("</td>");
        b.push("<td class='oldTbTD2'>");
        b.push("<div class='rect'>");
        b.push(h);
        b.push("</div>");
        b.push("</td>");
        b.push("</tr>");
        b.push("</table>")
    } else {
        if (typeof(k.other.ruleData.d.length) == "undefined") {
            return
        }
        var j = k.other.ruleData.d;
        var c = j.length;
        b.push("<table cellpadding='0' cellspacing='0'>");
        for (var a = 0; a < c; a++) {
            b.push("<tr>");
            if (a == 0) {
                b.push("<td>" + LS.salePromotionName + LS.colon + "</td>")
            } else {
                b.push("<td></td>")
            }
            b.push("<td>");
            b.push("<div class='oldSaleTypeBg'>");
            b.push(LS.salePromotionOnlyFullReduce);
            b.push("</div>");
            b.push("</td>");
            b.push("<td>");
            b.push("<div class='oldShowDelColor'>");
            b.push("&nbsp;&nbsp;" + jm.format(LS.salePromotionFullReduce, j[a].m, j[a].n));
            b.push("</div>");
            b.push("</td>");
            b.push("</tr>")
        }
        b.push("</table>")
    }
    jm(".J_showSaleDetail").html(b.join(""))
};
Mobi.showNewMarketPrice = function(a) {
    if (a == true) {
        Mobi.setPdPriceHeight(0.4);
        jm(".J_saleMallPrice").css("height", "3.75rem");
        jm(".J_saleMallPrice").css("line-height", "2.75rem");
        jm(".marketPriceNew").css("display", "block")
    }
};
Mobi.showSalePromotionDl = function(m, k, c) {
    var a = "position:relative;";
    if (Mobi.salePromotionDetail.showSaleTime == true) {
        Mobi.setPdPriceHeight(0.93);
        a = a + "margin-top:0.4rem;"
    } else {
        Mobi.setPdPriceHeight(1.06)
    }
    if (Mobi.salePromotionDetail.showType != "2") {
        return
    }
    if (typeof(m) == "undefined" || m == null || m == "") {
        return
    }
    var d = jm(".J_saleMallPrice").css("color");
    if (typeof(d) == "undefined" || d == null || d == "") {
        d = "#FC4643"
    }
    var f = [];
    if (m.saleType == "1") {
        if (c != null && c != "") {
            jm(".J_saleMallPrice").html(c)
        }
        var j = "";
        jm(".J_salePrePrice").css("display", "inline-block");
        var b = m.other.ruleData.d[0].m;
        if (m.other.ruleData.s == "1") {
            if (Fai.top._lcid == 2052 || Fai.top._lcid == 1028) {
                j = jm.format(LS.salePromotionDisCount, b)
            } else {
                j = jm.format(LS.salePromotionDisCount, 10 * (10 - b))
            }
        } else {
            j = jm.format(LS.salePromotionLapse, b)
        }
        f.push("<div class='J_salePromotionRemove saleProDetail' style='" + a + "'><table cellpadding='0' cellspacing='0'>");
        f.push("<tr>");
        f.push("<td style='color:#323232;'>");
        f.push(LS.salePromotionName + LS.colon);
        f.push("</td>");
        f.push("<td>");
        f.push("<div  style='border:" + d + " 2px solid;color:" + d + ";' class='saleTypeBg'>");
        f.push(LS.salePromotionReduce);
        f.push("</div>");
        f.push("</td>");
        f.push("<td style='color:" + d + "'>");
        f.push("&nbsp;&nbsp;" + j);
        f.push("</td>");
        f.push("</tr>");
        f.push("</table><div>");
        jm(".J_saleInfoDl").html(f.join(""))
    } else {
        if (typeof(m.other.ruleData.d.length) == "undefined") {
            return
        }
        var l = m.other.ruleData.d;
        var h = l.length;
        var j = "";
        if (h > 1) {
            f.push("<div  onclick='Mobi.showSaleDlMore(" + h + ")' class='J_salePromotionRemove saleProDetail' style='" + a + "'>")
        } else {
            f.push("<div class='J_salePromotionRemove saleProDetail' style='" + a + "'>")
        }
        f.push("<table cellpadding='0' cellspacing='0'><tr>");
        f.push("<td style='color:#323232;'>");
        f.push(LS.salePromotionName + LS.colon);
        f.push("</td>");
        f.push("<td>");
        f.push("<div class='J_saleFullBgShow saleTypeBg' style='border:" + d + " 2px solid;color:" + d + ";'>");
        f.push(LS.salePromotionOnlyFullReduce);
        f.push("</div>");
        f.push("</td>");
        f.push("<td style='color:" + d + "'>");
        if (h == 1) {
            j = jm.format(LS.salePromotionFullReduce, l[0].m, l[0].n);
            f.push("&nbsp;&nbsp;" + j)
        }
        f.push("</td>");
        f.push("</tr></table>");
        if (h > 1) {
            f.push("<div class='saleProShowMore'><span class='J_saleShowMoreIcon faisco-icons-downward1'></span></div>");
            for (var e = 0; e < h; e++) {
                f.push("<div class='J_saleFullProDetail saleProDetail' style='display:none;'>");
                f.push("<table cellpadding='0' cellspacing='0'><tr>");
                f.push("<td>");
                f.push("<div class='J_saleFullBgShow saleTypeBg' style='border:" + d + " 2px solid;color:" + d + ";'>");
                f.push(LS.salePromotionOnlyFullReduce);
                f.push("</div>");
                f.push("</td>");
                f.push("<td style='color:" + d + "'>");
                f.push("&nbsp;&nbsp;" + jm.format(LS.salePromotionFullReduce, l[e].m, l[e].n));
                f.push("</td>");
                f.push("</tr></table>");
                f.push("</div>")
            }
        }
        f.push("</div>");
        jm(".J_saleInfoDl").html(f.join(""))
    }
};
Mobi.showSaleDlMore = function(a) {
    if (typeof(a) == "undefined") {
        return
    }
    if (Mobi.salePromotionDetail.showSaleDlMore == true) {
        Mobi.salePromotionDetail.showSaleDlMore = false;
        jm(".J_saleShowMoreIcon").addClass("faisco-icons-downward1");
        jm(".J_saleShowMoreIcon").removeClass("faisco-icons-upward1");
        jm(".J_saleFullProDetail").css("display", "none");
        Mobi.setPdPriceHeight("-" + a)
    } else {
        Mobi.salePromotionDetail.showSaleDlMore = true;
        jm(".J_saleShowMoreIcon").addClass("faisco-icons-upward1");
        jm(".J_saleShowMoreIcon").removeClass("faisco-icons-downward1");
        Mobi.setPdPriceHeight(a);
        jm(".J_saleFullProDetail").css("display", "block")
    }
};
Mobi.setPdPriceHeight = function(b) {
    var a = jm(".productPrice").css("height");
    if (a.indexOf("rem") < 0) {
        if (a.indexOf("px") < 0) {
            a = parseFloat(a) / _htmlFontSize
        } else {
            a = parseFloat(a.substring(0, (a.length - 2))) / _htmlFontSize
        }
    } else {
        a = parseFloat(a.substring(0, (a.length - 3)))
    }
    a = a + (parseFloat(b) * 2.3);
    jm(".productPrice").css("height", a + "rem")
};
Mobi.setPdMallPriceHeight = function(b) {
    var a = jm(".J_saleMallPrice").css("height");
    if (a.indexOf("rem") < 0) {
        if (a.indexOf("px") < 0) {
            a = parseFloat(a) / _htmlFontSize
        } else {
            a = parseFloat(a.substring(0, (a.length - 2))) / _htmlFontSize
        }
    } else {
        a = parseFloat(a.substring(0, (a.length - 3)))
    }
    a = a + (parseFloat(b) * 2.3);
    jm(".J_saleMallPrice").css("height", a + "rem");
    jm(".J_saleMallPrice").css("line-height", a + "rem");
    jm(".J_salePrePrice").css("height", a + "rem");
    jm(".J_salePrePrice").css("line-height", a + "rem")
};
Mobi.showSaleTimeCountDown = function(i, c, h, j, f) {
    var b = "";
    var a = LS.salePromotionBegin;
    var e = LS.salePromotionEnd;
    var d = 0;
    Mobi.salePromotionDetail.showType = h;
    Mobi.salePromotionDetail.showSaleTime = true;
    if (h == 1) {
        b = a;
        d = i
    } else {
        b = e;
        d = c
    }
    Mobi.setPdPriceHeight(0.88);
    window.onload = function() {
        jm(".showSaleTimeImg").css("display", "block")
    };
    clearInterval(Mobi.salePromotionDetail.saleCountTimeInterval);
    Mobi.salePromotionDetail.saleCountTimeInterval = setInterval(function() {
        var o = parseInt(d / (3600 * 24));
        var k = parseInt(d / 3600) - (o * 24);
        var l = parseInt(d / 60) - (o * 24 * 60) - (k * 60);
        var n = parseInt(d % 60);
        if (Fai.top._lcid != 2052 && Fai.top._lcid != 1028) {
            if (k < 10) {
                k = "0" + k
            }
            if (l < 10) {
                l = "0" + l
            }
            if (n < 10) {
                n = "0" + n
            }
        }
        d--;
        if (j == 1) {
            jm(".showSaleTimeClass").html("&nbsp;&nbsp;" + jm.format(b, o, k, l, n))
        }
        if (d < 0) {
            if (h == 1) {
                d = c;
                b = e;
                h = 2;
                Mobi.salePromotionDetail.showType = 2;
                Mobi.showSalePromotionDl(Mobi.salePromotionDetail.salePromotionParam, Mobi.salePromotionDetail.styleType, Mobi.salePromotionDetail.saleReSalePriceHtml)
            } else {
                clearInterval(Mobi.salePromotionDetail.saleCountTimeInterval);
                Mobi.salePromotionDetail.showType = 1;
                if (Mobi.salePromotionDetail.salePromotionParam.saleType == "1") {
                    var m = jm(".J_salePrePrice").html();
                    if (m != null) {
                        jm(".J_saleMallPrice").html(m)
                    }
                }
                jm(".J_salePromotionRemove").remove();
                if (f == true) {
                    jm(".productPrice").css("height", "3.75rem")
                } else {
                    jm(".productPrice").css("height", "2.75rem")
                }
            }
        }
    }, 1000)
};
Mobi.addProductScreenFilterModel = function(e, c) {
    var a = e;
    c = jm.parseJSON(jm.decodeUrl(c));
    var b = Mobi.initWebPage({
        triggerId: "screenButton",
        panelId: "productScreenFilterPanel",
        pageBg: true,
        returnSeltFun: true,
        callback: d,
        direction: "right",
        pageHead: "筛选",
        closeWebPage: ".screenFilterIcon"
    });

    function d() {
        var l = c.sortName,
            m = c.desc,
            k = c.groupId,
            h;
        if (c.keyword) {
            h = c.keyword
        } else {
            h = ""
        }
        var j = c.mid,
            f = c.psc;
        var i = {};
        i.sortName = l;
        i.pdListId = a;
        i.desc = m;
        i.groupID = k;
        i.searchword = h;
        i.mid = j;
        urlStr = "ajax/product_h.jsp?cmd=getScreenPrInfo";
        jm.ajax({
            type: "POST",
            url: urlStr,
            data: i,
            success: function(n) {
                var p = jm.parseJSON(n);
                if (p.success) {
                    var o = jm.toJSON(p.list);
                    Mobi.initScreenFilter(o, f, k, m, l, h)
                }
            }
        })
    }
};
Mobi.initScreenFilter = function(h, e, o, k, p, l) {
    var c = jm.parseJSON(h);
    var j = jm.parseJSON(e);
    var d = LS.productScreenAll;
    if (j) {
        var n = j.lid;
        for (var f = c.length - 1; f >= 0; f--) {
            var b = c[f];
            if (b.lid == n) {
                d = b.libName;
                break
            }
        }
    }
    var m = [];
    if (c.length > 1) {
        m.push("<div class='productScreenFilterLib' id='libTab'>");
        m.push("<div class='productScreenLibLeft'>" + LS.productScreenSort + "</div>");
        m.push("<div class='g_mainColor productScreenLibRight'>");
        m.push("<div class='icon-libNextMore libNextMoreIcon'></div>");
        m.push("<div class='productScreenLibName' id='productScreenLibName'>" + d + "</div>");
        m.push("</div>");
        m.push("</div>");
        if (j) {
            var n = j.lid;
            m.push("<input type='hidden' id='lidValue' value='" + n + "'/>")
        } else {
            m.push("<input type='hidden' id='lidValue' value='-1'/>")
        }
    } else {
        if (c.length == 1) {
            m.push("<input type='hidden' id='lidValue' value='" + c[0].lid + "'/>")
        } else {
            m.push("<input type='hidden' id='lidValue' value='-1'/>")
        }
    }
    var q = m.join("");
    jm("#baseScreenFilterContenter").append(q);
    jm("#backContent").show();
    var a = [];
    a.push("<div class='productScreenFilterBottom'>");
    a.push("<div class='g_bgColor productScreenFilterButton' id='screenCommit'>" + LS.productScreenCommit + "</div>");
    a.push("</div>");
    q = a.join("");
    jm("#basePanel").append(q);
    if (c.length > 1) {
        Mobi.changeScreenFilterLib(h)
    }
    Mobi.initScreenFilterModel(h, j);
    Mobi.screenCommitData(h, o, k, p, l)
};
Mobi.changeScreenFilterLib = function(a) {
    var b = jm.parseJSON(a);
    jm("#libTab").bind("click", function() {
        jm("#screenCommit").hide();
        jm("#baseScreenFilterContenter").hide();
        var h = jm("#lidValue").val();
        var e = [];
        e.push("<div class='productScreenFilterOptionContenter' id='optionSelectorLib'>");
        e.push("<div class='productScreenFilterTitle'>");
        e.push("<div id='backLib' class='icon-screenFilterRt screenFilterRtIcon'></div>");
        e.push("<div class='productScreenFilterTi'>" + LS.productScreenSort + "</div>");
        e.push("</div>");
        e.push("<div class='productScreenFilterContent'>");
        if (h < 0) {
            e.push("<div class='productScreenFilterLineCheck' id='propOptionLibAll' onclick='Mobi.changeLibValue(-1," + jm.encodeHtml(jm.toJSON(b)) + ")'>")
        } else {
            e.push("<div class='productScreenFilterLine' id='propOptionLibAll' onclick='Mobi.changeLibValue(-1," + jm.encodeHtml(jm.toJSON(b)) + ")'>")
        }
        e.push("<div class='productScreenFilterLineLf'>");
        e.push("<span>" + LS.productScreenAll + "</span>");
        e.push("</div>");
        if (h < 0) {
            e.push("<div class='entry-trangle'>");
            e.push("</div>");
            e.push("<div class='icon-check checkIcon'>");
            e.push("</div>")
        }
        e.push("</div>");
        e.push("<div class='g_separator'></div>");
        for (var d = 0; d < b.length; d++) {
            var j = b[d].lid;
            var f = b[d].libName;
            if (j == h) {
                e.push("<div class='productScreenFilterLineCheck' id='propOptionLib'  onclick='Mobi.changeLibValue(" + b[d].lid + "," + jm.encodeHtml(jm.toJSON(b)) + ")'>")
            } else {
                e.push("<div class='productScreenFilterLine' id='propOptionLib'  onclick='Mobi.changeLibValue(" + b[d].lid + "," + jm.encodeHtml(jm.toJSON(b)) + ")'>")
            }
            e.push("<div class='productScreenFilterLineLf'>");
            e.push("<span>" + jm.encodeHtml(f) + "</span>");
            e.push("</div>");
            if (j == h) {
                e.push("<div class='entry-trangle'>");
                e.push("</div>");
                e.push("<div class='icon-check checkIcon'>");
                e.push("</div>")
            }
            e.push("</div>");
            e.push("<div class='g_separator'></div>")
        }
        e.push("</div>");
        e.push("</div>");
        var c = e.join("");
        jm("#basePanel").append(c);
        jm("#backLib").on("click", function() {
            jm("#optionSelectorLib").remove();
            jm("#screenCommit").show();
            jm("#baseScreenFilterContenter").show()
        })
    })
};
Mobi.changeLibValue = function(c, b) {
    if (c > 0) {
        for (var a = b.length - 1; a >= 0; a--) {
            if (b[a].lid == c) {
                jm(".productScreenLibName").html(b[a].libName);
                jm("#lidValue").val(c);
                break
            }
        }
    } else {
        jm(".productScreenLibName").html(LS.productScreenAll);
        jm("#lidValue").val(-1)
    }
    jm("#optionSelectorLib").remove();
    jm("#screenCommit").show();
    Mobi.initScreenFilterModel(jm.toJSON(b));
    jm("#baseScreenFilterContenter").show()
};
Mobi.initScreenFilterModel = function(k, c) {
    if (jm("#productScreenFilterOptions").length > 0) {
        jm("#productScreenFilterOptions").remove()
    }
    if (jm(".noScreenProp").length > 0) {
        jm(".noScreenProp").remove()
    }
    var n = jm("#lidValue").val();
    if (!k) {
        return
    }
    if (n < 0) {
        return
    }
    var b = jm.parseJSON(k);
    var o = [];
    var m;
    if (c) {
        m = c.prop;
        n = c.lid
    }
    for (var f = 0; f < b.length; f++) {
        if (b[f].lid == n) {
            var r = b[f].propList;
            o.push("<div class='productScreenFilterContent' id='productScreenFilterOptions'>");
            for (var e = 0; e < r.length; e++) {
                var h = LS.productScreenAll;
                if (m) {
                    for (var d = 0; d < m.length; d++) {
                        var a = r[e].id;
                        if (a == m[d].k) {
                            h = m[d].v;
                            if (a == 11 || a == 12 || a == 13) {
                                var p = r[e].currency;
                                h = h.replace("[", "");
                                h = h.replace(",", "~");
                                h = h.replace("]", "");
                                h = p + h;
                                if (h.indexOf("~") < 0) {
                                    h = h + "~"
                                }
                            }
                        }
                    }
                }
                o.push("<div class='productScreenFilterLine' id='screenOption" + e + "'>");
                o.push("<div class='productScreenFilterLineLf'>");
                o.push("<span>" + r[e].name + "</span>");
                o.push("</div>");
                o.push("<div class='productScreenFilterLineRt'>");
                o.push("<div class='icon-nextMore nextMoreIcon'></div>");
                o.push("<span class='productScreenFilterOption' id='screenOptionContent" + e + "'>" + h + "</span>");
                o.push("</div>");
                o.push("</div>");
                o.push("<div class='g_separator'></div>")
            }
            o.push("</div>");
            break
        }
    }
    var q = o.join("");
    jm("#baseScreenFilterContenter").append(q);
    jm.each(b, function(t, u) {
        if (u.lid == n) {
            var l = u.propList;
            for (var s = 0; s < l.length; s++) {
                Mobi.changeScreenFilterModel(s, l[s])
            }
        }
    })
};
Mobi.changeScreenFilterModel = function(e, b) {
    var d = b.name;
    var c = b.option;
    var a = b.currency;
    jm("#screenOption" + e).bind("click", function() {
        jm("#baseScreenFilterContenter").hide();
        var l = jm("#screenOptionContent" + e).html();
        l = jm.decodeHtml(l);
        jm("#screenCommit").hide();
        var k = [];
        k.push("<div class='productScreenFilterOptionContenter' id='optionSelector" + e + "'>");
        k.push("<div class='productScreenFilterTitle'>");
        k.push("<div id='back' class='icon-screenFilterRt screenFilterRtIcon'></div>");
        k.push("<div class='productScreenFilterTi'>" + d + "</div>");
        k.push("</div>");
        k.push("<div class='productScreenFilterContent'>");
        if (l == LS.productScreenAll) {
            k.push("<div class='productScreenFilterLineCheck' id='propOptionLineAll' onclick='Mobi.changePropValue(\"All\"," + e + ")'>")
        } else {
            k.push("<div class='productScreenFilterLine' id='propOptionLineAll' onclick='Mobi.changePropValue(\"All\"," + e + ")'>")
        }
        k.push("<div class='productScreenFilterLineLfLong'>");
        k.push("<span id='optionAll'>" + LS.productScreenAll + "</span>");
        k.push("</div>");
        if (l == LS.productScreenAll) {
            k.push("<div class='entry-trangle'>");
            k.push("</div>");
            k.push("<div class='icon-check checkIcon'>");
            k.push("</div>")
        }
        k.push("</div>");
        k.push("<div class='g_separator'></div>");
        for (var j = 0; j < c.length; j++) {
            var f = c[j];
            if (f.indexOf("[") > -1 && f.indexOf("]") > -1) {
                f = f.replace("[", "");
                f = f.replace(",", "~");
                f = f.replace("]", "");
                if (j == c.length - 1) {
                    f = f + "~"
                }
            }
            f = a + f;
            if (l == f) {
                k.push("<div class='productScreenFilterLineCheck' id='propOptionLine" + j + "' onclick='Mobi.changePropValue(\"" + j + '",' + e + ")'>")
            } else {
                k.push("<div class='productScreenFilterLine' id='propOptionLine" + j + "' onclick='Mobi.changePropValue(\"" + j + '",' + e + ")'>")
            }
            k.push("<div class='productScreenFilterLineLfLong'>");
            k.push("<span id='option" + j + "'>" + f + "</span>");
            k.push("</div>");
            if (l == f) {
                k.push("<div class='entry-trangle'>");
                k.push("</div>");
                k.push("<div class='icon-check checkIcon'>");
                k.push("</div>")
            }
            k.push("</div>");
            k.push("<div class='g_separator'></div>")
        }
        k.push("</div>");
        k.push("</div>");
        var h = k.join("");
        jm("#basePanel").append(h);
        jm("#back").on("click", function() {
            jm("#optionSelector" + e).remove();
            jm("#screenCommit").show();
            jm("#baseScreenFilterContenter").show()
        })
    })
};
Mobi.changePropValue = function(a, b) {
    jm("#screenOptionContent" + b).html(jm("#option" + a).html());
    jm("#optionSelector" + b).remove();
    jm("#screenCommit").show();
    jm("#baseScreenFilterContenter").show()
};
Mobi.screenCommitData = function(c, b, f, e, a) {
    var d = jm.parseJSON(c);
    jm("#screenCommit").bind("click", function() {
        var p, l = {};
        if (d.length > 1) {
            jm.each(d, function(t, v) {
                var u = jm("#productScreenLibName").html();
                u = jm.decodeHtml(u);
                if (u == v.libName) {
                    l.lid = v.lid;
                    p = v
                }
            })
        } else {
            l.lid = d[0].lid;
            p = d[0]
        }
        var r = "?";
        var k = "pr.jsp";
        if (b) {
            k += r + "groupId=" + b;
            r = "&"
        }
        if (f) {
            k += r + "desc=" + f;
            r = "&"
        }
        if (e) {
            k += r + "sortName=" + e;
            r = "&"
        }
        if (a) {
            k += r + "searchword=" + a;
            r = "&"
        }
        if (p) {
            var j = [];
            var s = p.propList;
            for (var n = 0; n < s.length; n++) {
                var o = jm("#screenOptionContent" + n).html();
                if (o != LS.productScreenAll) {
                    var m = {};
                    var h = s[n].id;
                    m.k = h;
                    if (h == 11 || h == 12 || h == 13) {
                        var q = s[n].currency;
                        if (q) {
                            o = o.replace(q, "")
                        }
                        if (o.charAt(o.length - 1) == "~") {
                            o = o.replace("~", "")
                        } else {
                            o = o.replace("~", ",")
                        }
                        o = "[" + o + "]"
                    } else {
                        o = jm.decodeHtml(o)
                    }
                    m.v = o;
                    j.push(m)
                }
            }
            l.prop = j;
            k += r + "psc=" + jm.encodeUrl(jm.toJSON(l))
        }
        document.location.href = k
    })
};
Mobi.initOnlineServiceWidth = function() {
    var b = Mobi.getPreviewObject("customerServiceDiv");
    if (!b) {
        return
    }
    var a = b.querySelectorAll(".service").length;
    if (a === 0) {
        jm("#webCustomerServiceBox").css("display", "none");
        Fai.top._openOnlineService = false;
        Fai.top._onlineServiceJson.open = false
    } else {
        jm("#webCustomerServiceBox").css("display", "block");
        Fai.top._openOnlineService = true;
        Fai.top._onlineServiceJson.open = true
    }
    jm("#customerServiceDiv .service").css("width", 100 / a + "%")
};
Mobi.showMapService = function() {
    var a = Fai.top._onlineServiceJson.map.city + Fai.top._onlineServiceJson.map.d_address;
    if (!a) {
        alert("请填写正确的地址");
        return false
    }
    var b = "http://map.baidu.com/mobile/webapp/search/search/qt=s&wd=" + encodeURIComponent(a) + "&c=348&searchFlag=bigBox&version=5&exptype=dep/vt=map/?fromhash=1";
    jm("#webMapServiceBox").addClass("showMapService");
    jm("#mobiSearchMapFrame").attr("src", b);
    jm("#mobiSearchMapFrame").load(function() {
        Mobi.mobiHideScroll()
    })
};
Mobi.closeMapService = function() {
    Mobi.mobiShowScroll();
    jm("#webMapServiceBox").removeClass("showMapService")
};
Mobi.unloadForATag = function() {
    if (!jm.os.supportsTouch) {
        jm("#g_body").delegate("#customerServiceDiv a", "click", function(d) {
            var c = d.target || d.srcElement;
            var b = c.parentNode.parentNode.parentNode;
            if (!b) {
                return
            }
            var a = b.getAttribute("id").substring(11);
            if (parseInt(a) === 2 || parseInt(a) === 1) {
                alert("该功能无法在桌面浏览器中启动");
                return false
            }
        })
    }
};
Mobi.showPhonesBg = function() {
    var a = document.getElementById("showMorePhone");
    if (a != null) {
        a.onclick = null;
        a.onclick = function() {
            if (Fai.top._onlineServiceJson.phone.phoneInfo.length > 1) {
                Mobi.mobiHideScroll();
                var L = document.body.clientHeight;
                var C = document.body.clientWidth;
                var e = document.getElementById("g_web");
                var A = document.createElement("div");
                var J = document.createElement("div");
                var w = document.createElement("div");
                var d = document.createElement("div");
                var t = document.createElement("div");
                A.id = "phoneDiv";
                J.id = "fullbg";
                w.id = "tablesDiv";
                d.id = "scrollTable";
                A.className = "phoneDiv";
                w.className = "tablesDiv";
                J.className = "phoneFullBg";
                d.className = "scrollTable";
                t.id = "iScrollDiv";
                e.appendChild(A);
                var F = document.getElementById("phoneDiv");
                F.appendChild(J);
                F.appendChild(w);
                w.appendChild(d);
                var z = document.getElementById("fullbg");
                var c = document.getElementById("tablesDiv");
                var s = document.getElementById("scrollTable");
                s.appendChild(t);
                var G = document.getElementById("iScrollDiv");
                z.style.height = L + "px";
                z.style.width = C + "px";
                z.style.position = "fixed";
                for (var H = 0; H < Fai.top._onlineServiceJson.phone.phoneInfo.length; H++) {
                    var M = H + 1;
                    var f = decodeURIComponent(Fai.top._onlineServiceJson.phone.phoneInfo[H].name);
                    var O = Fai.top._onlineServiceJson.phone.phoneInfo[H].number;
                    var m = document.createElement("div");
                    m.id = "fullTableDiv" + M;
                    m.className = "fullTableDiv";
                    G.appendChild(m);
                    var j = document.getElementById("fullTableDiv");
                    m.innerHTML = "<a id='numberHref_" + Fai.top._onlineServiceJson.phone.type + M + "' href='tel:" + O + "'>";
                    var y = document.getElementById("numberHref_" + Fai.top._onlineServiceJson.phone.type + M);
                    var I = document.createElement("div");
                    I.id = "tableDiv";
                    I.className = "tableBox tableDiv";
                    y.appendChild(I);
                    var n = document.getElementById("tableDiv");
                    var r = document.createElement("div");
                    var B = document.createElement("div");
                    var h = document.createElement("div");
                    var p = document.createElement("div");
                    var u = document.createElement("div");
                    var E = document.createElement("div");
                    r.className = "phoneName tableCell";
                    r.id = "phoneName" + M;
                    B.className = "phoneNumber tableCell";
                    B.id = "phoneNumber" + M;
                    h.className = "phoneOperation tableCell";
                    h.id = "phoneOperation" + M;
                    p.id = "phoneLine";
                    p.className = "phoneLine";
                    E.id = "phoneOperImg" + M;
                    E.className = "phoneOperImg";
                    I.appendChild(r);
                    I.appendChild(B);
                    I.appendChild(h);
                    G.appendChild(p);
                    h.appendChild(E);
                    var l = document.getElementById("phoneName" + M);
                    var b = document.getElementById("phoneNumber" + M);
                    var q = document.getElementById("phoneOperation" + M);
                    var K = document.getElementById("phoneOperImg");
                    var o = document.createTextNode(f);
                    l.appendChild(o);
                    b.innerHTML = O;
                    if (!jm.os.supportsTouch) {
                        y.onclick = function() {
                            alert("该功能无法在桌面浏览器中启动")
                        }
                    }
                }
                var x = document.createElement("div");
                var D = document.createElement("div");
                x.id = "pCancle";
                x.className = "pCancle";
                D.id = "phoneCancle";
                D.className = "phoneCancle";
                c.appendChild(x);
                x.appendChild(D);
                var k = document.getElementById("phoneCancle");
                k.innerHTML = LS.cancel;
                var N = document.documentElement.clientHeight - k.offsetHeight;
                var v = s.offsetHeight;
                if (v > N) {
                    d.style.height = (document.documentElement.clientHeight - k.offsetHeight) + "px"
                }
                if (Mobi.deviceTypeIsMobi()) {
                    new iScroll("scrollTable")
                }
                setTimeout("tablesDiv.style.cssText = 'bottom: 0; ';", 10);
                setTimeout(function() {
                    z.style.opacity = "0.3"
                }, 10);
                z.onclick = function() {
                    var i = document.getElementById("phoneDiv");
                    c.style.cssText = "bottom: -100%";
                    z.style.opacity = "0";
                    Mobi.mobiShowScroll();
                    setTimeout(function() {
                        i.parentNode.removeChild(i)
                    }, 100)
                };
                k.onclick = function() {
                    var i = document.getElementById("phoneDiv");
                    c.style.cssText = "bottom: -100%";
                    z.style.opacity = "0";
                    Mobi.mobiShowScroll();
                    setTimeout(function() {
                        i.parentNode.removeChild(i)
                    }, 100)
                }
            }
        }
    } else {
        return
    }
};
Mobi.showQqBg = function() {
    var a = document.getElementById("showMoreQq");
    if (a != null) {
        a.onclick = null;
        a.onclick = function() {
            if (Fai.top._onlineServiceJson.qq.qqInfo.length > 1) {
                Mobi.mobiHideScroll();
                var J = document.body.clientHeight;
                var A = document.body.clientWidth;
                var f = document.getElementById("g_web");
                var y = document.createElement("div");
                var I = document.createElement("div");
                var u = document.createElement("div");
                var d = document.createElement("div");
                y.id = "qqDiv";
                I.id = "fullbg";
                u.id = "tablesDiv";
                d.id = "scrollTable";
                y.className = "qqDiv";
                u.className = "tablesDiv";
                I.className = "qqFullBg";
                d.className = "scrollTable";
                f.appendChild(y);
                var D = document.getElementById("qqDiv");
                D.appendChild(I);
                D.appendChild(u);
                u.appendChild(d);
                var x = document.getElementById("fullbg");
                var c = document.getElementById("tablesDiv");
                var q = document.getElementById("scrollTable");
                x.style.height = J + "px";
                x.style.width = A + "px";
                x.style.position = "fixed";
                for (var G = 0; G < Fai.top._onlineServiceJson.qq.qqInfo.length; G++) {
                    var K = G + 1;
                    var h = decodeURIComponent(Fai.top._onlineServiceJson.qq.qqInfo[G].name);
                    var M = Fai.top._onlineServiceJson.qq.qqInfo[G].number;
                    var m = document.createElement("div");
                    m.id = "fullTableDiv" + K;
                    m.className = "fullTableDiv";
                    q.appendChild(m);
                    var k = document.getElementById("fullTableDiv");
                    m.innerHTML = "<a id='numberHref_" + Fai.top._onlineServiceJson.qq.type + K + "' target='_blank' href='http://wpa.qq.com/msgrd?v=3&uin=" + M + "&site=qq&menu=yes'>";
                    var w = document.getElementById("numberHref_" + Fai.top._onlineServiceJson.qq.type + K);
                    var H = document.createElement("div");
                    H.id = "tableDiv";
                    H.className = "tableBox tableDiv";
                    w.appendChild(H);
                    var n = document.getElementById("tableDiv");
                    var e = document.createElement("div");
                    var z = document.createElement("div");
                    var p = document.createElement("div");
                    var b = document.createElement("div");
                    var B = document.createElement("div");
                    var F = document.createElement("div");
                    e.className = "qqName tableCell";
                    e.id = "qqName" + K;
                    z.className = "qqNumber tableCell";
                    z.id = "qqNumber" + K;
                    p.className = "qqOperation tableCell";
                    p.id = "qqOperation" + K;
                    b.id = "qqLine";
                    b.className = "qqLine";
                    F.id = "qqOperImg" + K;
                    F.className = "qqOperImg";
                    H.appendChild(e);
                    H.appendChild(z);
                    H.appendChild(p);
                    q.appendChild(b);
                    p.appendChild(F);
                    var r = document.getElementById("qqName" + K);
                    var s = document.getElementById("qqNumber" + K);
                    var E = document.getElementById("qqOperation" + K);
                    var j = document.getElementById("qqOperImg");
                    var o = document.createTextNode(h);
                    r.appendChild(o);
                    s.innerHTML = M
                }
                var v = document.createElement("div");
                var C = document.createElement("div");
                v.id = "qCancle";
                v.className = "qCancle";
                C.id = "qqCancle";
                C.className = "qqCancle";
                c.appendChild(v);
                v.appendChild(C);
                var l = document.getElementById("qqCancle");
                l.innerHTML = LS.cancel;
                var L = document.documentElement.clientHeight - l.offsetHeight;
                var t = q.offsetHeight;
                if (t > L) {
                    d.style.height = (document.documentElement.clientHeight - l.offsetHeight) + "px"
                }
                setTimeout("tablesDiv.style.cssText = 'bottom: 0; ';", 10);
                setTimeout(function() {
                    x.style.opacity = "0.3"
                }, 10);
                x.onclick = function() {
                    var i = document.getElementById("qqDiv");
                    c.style.cssText = "bottom: -100%";
                    x.style.opacity = "0";
                    Mobi.mobiShowScroll();
                    setTimeout(function() {
                        i.parentNode.removeChild(i)
                    }, 100)
                };
                l.onclick = function() {
                    var i = document.getElementById("qqDiv");
                    c.style.cssText = "bottom: -100%";
                    x.style.opacity = "0";
                    Mobi.mobiShowScroll();
                    setTimeout(function() {
                        i.parentNode.removeChild(i)
                    }, 100)
                }
            }
        }
    } else {
        return
    }
};
Mobi.initLocater = function() {
    var b = jm("#multiLanguageCtrl ");
    if (!b) {
        return false
    } else {
        var d = jm("#lanSelect .lanContainer").find("div[currentlan]"),
            a = d.length === 1 ? jm(d[0]).text() : jm(d[1]).text(),
            c = d.length === 1 ? jm(d[0]).attr("currentlan") : jm(d[1]).attr("currentlan");
        d.hide();
        jm(b).addClass("Icon" + c);
        jm("#lanSelected").addClass("Icon" + c);
        b.find(".lanTitle").eq(0).text(a);
        jm("#lanSelected").find(".lanTitle").eq(0).text(a);
        jm(".lanItem ").click(function(f) {
            if (jm("#lanSelect").length < 1 || parseInt(jm("#lanSelect").height()) == 0) {
                return
            }
            f.stopPropagation();
            document.location.href = jm(this).attr("value")
        });
        jm(document).unbind("click").bind("click", function(f) {
            var e = f.target || f.srcElement;
            if (e.id === "multiLanguageCtrl") {
                return
            }
            var h = jm(e);
            if (h.closest("#lanSelect").length == 0) {
                Mobi.closeLanSelect()
            }
            f.stopPropagation()
        });
        jm("#lanSelect .lanContainer").height(0)
    }
};
Mobi.languageCtrl = function() {
    var b = function(d) {
        if (parseInt(jm("#lanSelect").height()) > 0) {
            Mobi.closeLanSelect()
        } else {
            if (Fai.top._manageMode) {
                Mobi.removeAllEditLayer()
            }
            Mobi.openLanSelect()
        }
        d.stopPropagation();
        return false
    };
    var a = Mobi.getTransitionEndEventName(),
        c = "";
    if (Fai.top._manageMode) {
        setTimeout(function() {
            $(Mobi.getPreviewObject("multiLanguageCtrl")).unbind("click").bind("click", b);
            $(Mobi.getPreviewObject("lanSelected")).unbind("click").bind("click", b)
        }, 2000);
        c = Mobi.getPreviewObject("lanSelect")
    } else {
        jm("#multiLanguageCtrl").unbind("click").bind("click", b);
        jm("#lanSelected").unbind("click").bind("click", b);
        c = document.getElementById("lanSelect")
    }
};
Mobi.closeLanSelect = function() {
    if (jm("#lanSelect").length < 1 || parseInt(jm("#lanSelect").height()) == 0) {
        return
    }
    if (jm("#bgm_icon").length > 0 && jm("#bgm_icon").hasClass("bgm_rightUp")) {
        jm("#bgm_icon").css("visibility", "visible")
    }
    jm("#lanSelect").height(0);
    jm("#lanSelect").css("opacity", 0.3);
    jm("#lanSelect .lanContainer").height(0);
    if (Fai.top._manageMode) {
        jm("#lanFixed").remove()
    }
};
Mobi.openLanSelect = function() {
    if (jm("#lanSelect").length < 1 || parseInt(jm("#lanSelect").height()) > 0) {
        return
    }
    if (jm("#bgm_icon").length > 0 && jm("#bgm_icon").hasClass("bgm_rightUp")) {
        jm("#bgm_icon").css("visibility", "hidden")
    }
    jm("#lanSelect .lanContainer").height("");
    var b = parseFloat(jm("#lanSelected").height()) + parseFloat(jm("#lanSelect .lanContainer").height());
    var a = jm(".multiLanguageCtrl ").css("margin-top");
    if (a.indexOf("px") > 0) {
        a = parseFloat(a.substr(0, a.length - 2))
    } else {
        a = parseFloat(a)
    }
    b = b + a;
    jm("#lanSelect").height(b + "px");
    jm("#lanSelect").css("opacity", 1);
    if (Fai.top._manageMode) {
        jm("#webMultilingualArea").append("<div id='lanFixed' class='lanFixed'></div>")
    }
};
Mobi.removeLanSelectFlag = function() {
    jm("#lanSelect").removeClass("lanDisabled")
};
Mobi.addLanSelectFlag = function() {
    jm("#lanSelect").addClass("lanDisabled")
};
Mobi.decrease = function(b) {
    var a = parseInt(jm("#productNum").val());
    if (isNaN(a)) {
        a = 1
    }
    if (a > 99999998) {
        a = 99999998
    }
    if (a < 0) {
        a = 0
    }
    if (a + 1 > 1) {
        jm("#g_decrease").removeClass("g_opacity50")
    }
    jm("#productNum").val(a + 1)
};
Mobi.increase = function(b) {
    var a = parseInt(jm("#productNum").val());
    if (isNaN(a)) {
        a = 1
    }
    if (a < 2) {
        a = 2
    }
    if ((a - 1) === 1) {
        jm("#g_decrease").addClass("g_opacity50")
    }
    jm("#productNum").val(a - 1)
};
Mobi.removeMallTIps = function() {
    jm("#mallBuyTips").remove();
    jm(".productDetailClose").click();
    document.getElementById("webLoading").style.display = "none"
};
Mobi.MallAjaxErrno = {
    ok: 0,
    error: 1,
    manager: 2,
    login: 3,
    idNotExist: 4,
    orderSettle: 5,
    noMall: 6,
    toProductDetail: 7,
    orderNotExist: 8,
    networkError: 9,
    outOfMallAmount: 10,
    mallAmountZero: 11,
    mallOptionStop: 12,
    OutOfAllowAmount: 13,
    notAdded: 14,
    payDomainError: 15,
    couponNotFound: 16,
    couponUnavail: 17,
    couponOverTime: 18
};
Mobi.returnMallErrorMsg = function(a) {
    var b;
    switch (parseInt(a)) {
        case Mobi.MallAjaxErrno.error:
            Mobi.ing(LS.mallAjaxErrno_error);
            break;
        case Mobi.MallAjaxErrno.manager:
            Mobi.showMallTips(LS.mallAjaxErrno_manager);
            break;
        case Mobi.MallAjaxErrno.login:
            goToMallCartUrl = "login.jsp?returnUrl=" + jm.encodeUrl(jm.getUrlRoot(location.href)) + "&errno=11";
            location.href = goToMallCartUrl;
            break;
        case Mobi.MallAjaxErrno.idNotExist:
            Mobi.ing(LS.mallAjaxErrno_idNotExist);
            break;
        case Mobi.MallAjaxErrno.orderSettle:
            Mobi.ing(LS.mallAjaxErrno_orderSettle);
            break;
        case Mobi.MallAjaxErrno.noMall:
            Mobi.ing(LS.mallAjaxErrno_noMall);
            break;
        case Mobi.MallAjaxErrno.orderNotExist:
            Mobi.ing(LS.mallAjaxErrno_orderNotExist);
            break;
        case Mobi.MallAjaxErrno.networkError:
            Mobi.ing(LS.networkError);
            break;
        case Mobi.MallAjaxErrno.outOfMallAmount:
            Mobi.ing(LS.mallAmountOverFlow);
            break;
        case Mobi.MallAjaxErrno.mallAmountZero:
            Mobi.ing(LS.mallAmountZero);
            break;
        case Mobi.MallAjaxErrno.mallOptionStop:
            Mobi.ing(LS.mallOptionStop);
            break;
        case Mobi.MallAjaxErrno.OutOfAllowAmount:
            Mobi.ing(LS.allowAmountOverFlow);
            break;
        case Mobi.MallAjaxErrno.notAdded:
            Mobi.ing(LS.mallProductNotAdded);
            break;
        default:
            Mobi.ing(LS.systemError);
            location.href.reload()
    }
};
Mobi.initOptionsStr = function(a) {
    Mobi.optionsStr.oldOptionsStr = a
};
Mobi.optionsStr = {};
Mobi.mallBuying = {};
Mobi.mallBuy = function(e, q) {
    if (typeof(Mobi.mallBuying[e]) == "undefined") {
        Mobi.mallBuying[e] = false
    }
    var f = false;
    jm.each(Mobi.mallBuying, function(j, i) {
        if (i) {
            f = true;
            return false
        }
    });
    if (f) {
        return
    }
    Mobi.mallBuying[e] = true;
    var o = "id=" + e + "&fromDetail=true",
        l = [],
        c = jm(".J-op"),
        s = true;
    jm(c).each(function() {
        var v = jm(this),
            j = v.attr("option_name"),
            u = v.attr("data"),
            t = v.attr("type"),
            i = v.attr("option_data");
        if (i) {
            var w = {};
            w.name = u;
            w.value = parseInt(i);
            if (t != null) {
                w.name = u.replace(/^opIndept/, "");
                w.type = parseInt(t)
            }
            l.push(w)
        } else {
            Mobi.ing(jm.format(LS.mallCartChoiceItemError, jm.encodeHtml(j)));
            s = false;
            return false
        }
    });
    if (Mobi.optionsStr.oldOptionsStr != "null" && Mobi.optionsStr.oldOptionsStr) {
        var p = Mobi.optionsStr.oldOptionsStr.split("_"),
            d = [];
        for (var k = 0; k < p.length; k++) {
            for (var h = 0; h < l.length; h++) {
                if (l[h].name == p[k]) {
                    d.push(l[h])
                }
            }
        }
        l = d
    }
    if (!s) {
        Mobi.mallBuying[e] = false;
        return false
    }
    if (l.length > 0) {
        o += "&optionList=" + jm.encodeUrl(jm.toJSON(l))
    }
    var r = jm("#productNum"),
        b = r.val(),
        n = 1;
    if (jm.isInteger(b)) {
        n = parseInt(b)
    }
    if (n < 1) {
        n = 1
    } else {
        if (n > 9999999) {
            n = 9999999
        }
    }
    r.val(n);
    var m = "addCartItem";
    o += "&amount=" + n;
    if (q === 1) {
        var a = {
            pid: e,
            amount: n,
            optList: jm.toJSON(l)
        };
        m = "addIme";
        o += "&codata=" + jm.toJSON(a)
    }
    jm.ajax({
        type: "post",
        url: "ajax/order_h.jsp?cmd=" + m,
        data: o,
        error: function() {
            Mobi.ing(LS.systemError);
            Mobi.mallBuying[e] = false
        },
        success: function(i) {
            var j = jm.parseJSON(i);
            if (j.success) {
                if (q === 1) {
                    if (window.self != window.top && /(iPhone|iPad|iPod|safari)/i.test(navigator.userAgent.toLowerCase())) {
                        location.href = "mstl.jsp?immeData=" + jm.encodeUrl(jm.toJSON(a))
                    } else {
                        location.href = "mstl.jsp?imme"
                    }
                } else {
                    Mobi.showMallTips(LS.mallAddSuc)
                }
                Mobi.mallBuying[e] = false
            } else {
                Mobi.returnMallErrorMsg(j.rt);
                Mobi.mallBuying[e] = false
            }
        }
    })
};
Mobi.initBuyNumber = function(e, c, a, d) {
    jm(".mall_product").eq(0).css("border-top", "1px solid #fff");
    var b = jm(".itemLine" + e);
    if (c == a) {
        b.find(".icon-minisIcon").addClass("g_opacity50")
    }
    if (c == d) {
        b.find(".icon-plusIcon").addClass("g_opacity50")
    }
};
Mobi.ajaxChangeAmount = function(b, a, c) {
    jm.ajax({
        type: "post",
        url: "ajax/order_h.jsp?cmd=setItem&orderId=" + a,
        data: "itemId=" + c + "&amount=" + b,
        error: function() {
            Mobi.ing(LS.mallCartUpdateError)
        },
        success: function(d) {
            var d = jm.parseJSON(d);
            if (d.success) {
                Mobi.setAcSaleList(c, b);
                Mobi.reCtOrderMoney();
                return true
            } else {
                if (d.rt == -3) {
                    Mobi.ing(LS.mallCartUpdateNotFound)
                } else {
                    if (d.rt == -9) {
                        Mobi.ing(LS.mallCartUpdateStatusError)
                    } else {
                        Mobi.ing(LS.mallCartUpdateError)
                    }
                }
                return false
            }
        }
    })
};
Mobi.mallCartAmountChange = function(a, b, h, f, i) {
    var j = jm(".itemLine" + a);
    var c = j.find(".buyNumber");
    var e = c.val();
    var d = 1;
    if (jm.isInteger(e)) {
        d = parseInt(e)
    }
    if (d < f || d == f) {
        d = f;
        j.find(".icon-minisIcon").addClass("g_opacity50");
        j.find(".icon-plusIcon").removeClass("g_opacity50")
    } else {
        if ((d > i || d == i) && i != 0) {
            d = i;
            j.find(".icon-plusIcon").addClass("g_opacity50");
            j.find(".icon-minisIcon").removeClass("g_opacity50")
        } else {
            if (d > 9999998) {
                d = 9999999
            }
        }
    }
    if (isNaN(d) || d <= 0 || d > 9999999) {
        Mobi.ing(LS.mallCartAmountError);
        return
    }
    Mobi.ajaxChangeAmount(d, b, h);
    c.val(d);
    if (d > 1) {
        j.find(".icon-minisIcon").removeAttr("disabled")
    } else {
        j.find(".icon-minisIcon").attr("disabled", "true")
    }
};
Mobi.mallCartAmountPlus = function(a, b, c, h, f, i) {
    if (jm(a).attr("disabled") != "true") {
        var j = jm(".itemLine" + b);
        var d = j.find(".buyNumber");
        var e = d.val();
        if (jm.isInteger(e)) {
            e = parseInt(e) + 1
        }
        if (e < 2) {
            e = 1
        } else {
            if ((e > i || e == i) && i != 0) {
                e = i;
                j.find(".icon-plusIcon").addClass("g_opacity50 ");
                if (f != i) {
                    j.find(".icon-minisIcon").removeClass("g_opacity50")
                }
            } else {
                if (e > 9999998) {
                    e = 9999999
                }
            }
        }
        if (e > f) {
            j.find(".icon-minisIcon").removeClass("g_opacity50")
        }
        if (isNaN(e) || e <= 0 || e > 9999999) {
            Mobi.ing(LS.mallCartAmountError);
            return
        }
        Mobi.ajaxChangeAmount(e, c, h);
        d.val(e);
        if (e > 1) {
            j.find(".icon-minisIcon").removeAttr("disabled")
        } else {
            j.find(".icon-minisIcon").attr("disabled", "true")
        }
    } else {
        return
    }
};
Mobi.mallCartAmountMinis = function(a, b, c, h, f, i) {
    if (jm(a).attr("disabled") != "true") {
        var j = jm(".itemLine" + b);
        var d = j.find(".buyNumber");
        var e = d.val();
        if (jm.isInteger(e)) {
            e = parseInt(e) - 1
        }
        if (e < f || e == f) {
            e = f;
            j.find(".icon-minisIcon").addClass("g_opacity50");
            if (f != i) {
                j.find(".icon-plusIcon").removeClass("g_opacity50")
            }
        } else {
            if (e > 9999998) {
                e = 9999999
            }
        }
        if (e < i) {
            j.find(".icon-plusIcon").removeClass("g_opacity50")
        }
        if (isNaN(e) || e <= 0 || e > 9999999) {
            Mobi.ing(LS.mallCartAmountError);
            return
        }
        Mobi.ajaxChangeAmount(e, c, h);
        d.val(e);
        if (e > 1) {
            j.find(".icon-minisIcon").removeAttr("disabled")
        } else {
            j.find(".icon-minisIcon").attr("disabled", "true")
        }
    } else {
        return
    }
};
Mobi.acSaleProShowList = {};
Mobi.initAcSaleList = function(a) {
    Mobi.acSaleProShowList = jm.parseJSON(a)
};
Mobi.removeAcSaleList = function(h) {
    if (isNaN(h)) {
        return
    }
    var a = Mobi.acSaleProShowList;
    if (a.length <= 0) {
        return
    }
    var b = false;
    for (var d = 0; d < a.length && b == false; d++) {
        var f = a[d];
        var e = f.acList;
        if (typeof(e) == "undefined" || e == null) {
            continue
        }
        for (var c = 0; c < e.length; c++) {
            if (e[c].id == h) {
                e.splice(c, 1);
                b = true;
                break
            }
        }
    }
};
Mobi.setAcSaleList = function(k, d) {
    if (isNaN(k)) {
        return
    }
    var a = Mobi.acSaleProShowList;
    if (a.length <= 0) {
        return
    }
    var e = false;
    for (var c = 0; c < a.length && e == false; c++) {
        var h = a[c];
        var f = h.acList;
        if (typeof(f) == "undefined" || f == null) {
            continue
        }
        for (var b = 0; b < f.length; b++) {
            if (f[b].id == k) {
                f[b].amount = d;
                e = true;
                break
            }
        }
    }
};
Mobi.countItsSaveMoney = function() {
    var d = 0;
    var f = Mobi.acSaleProShowList;
    if (f.length <= 0) {
        return d
    }
    for (var e = 0; e < f.length; e++) {
        var a = f[e];
        var b = a.acList;
        var l = a.sInfo;
        if (typeof(b) == "undefined" || b == null || b.length <= 0) {
            continue
        }
        if (l == null) {
            continue
        }
        var o = l.s;
        var n = l.d;
        if (o == "1") {
            for (var c = 0; c < b.length; c++) {
                var m = 0;
                var h = b[c].amount;
                var k = b[c].price;
                m += (k * 100 * h);
                if (n == null || n.length <= 0) {
                    continue
                }
                d = Mobi.countFoldOfSigle(n, m / 100, d)
            }
        } else {
            var m = 0;
            for (var c = 0; c < b.length; c++) {
                var h = b[c].amount;
                var k = b[c].price;
                m += (k * 100 * h)
            }
            if (n == null || n.length <= 0) {
                continue
            }
            d = Mobi.countFoldOfSigle(n, m / 100, d)
        }
    }
    return d
};
Mobi.countFoldOfSigle = function(h, b, f) {
    var j = 0;
    var d = 0;
    for (var e = 0; e < h.length; e++) {
        saleDataParam = h[e];
        var c = saleDataParam.m;
        var a = saleDataParam.n;
        if (c <= 0) {
            c = 0;
            a = 0
        }
        if (b >= c) {
            if (c > j) {
                j = c;
                d = a
            }
        }
    }
    if (d > 0 && b >= j && b >= d) {
        f += d
    }
    return f
};
Mobi.reCtOrderMoney = function() {
    var a = jm(".mall_product");
    var d = 0;
    a.each(function() {
        var i = parseFloat(jm(this).attr("price"), 2);
        var f = parseInt(jm(this).find(".buyNumber").val());
        if (isNaN(f)) {
            f = 0
        }
        var h = (i * f);
        d += h
    });
    var e = Mobi.countItsSaveMoney();
    e = parseFloat(e);
    d = d - e;
    var b = jm("#count");
    var c = b.attr("choiceCurrencyVal");
    b.html(isNaN(d.toFixed(2)) ? c + "0.00" : c + d.toFixed(2));
    jm(".saleSaveMoney").html(isNaN(e.toFixed(2)) ? c + "0.00" : c + e.toFixed(2))
};
Mobi.mallCartItemDel = function(b, a, c) {
    Mobi.ing(LS.mallCartUpdating);
    jm.ajax({
        type: "post",
        url: "ajax/order_h.jsp?cmd=delItem&orderId=" + a,
        data: "itemIds=[" + c + "]",
        error: function() {
            Mobi.ing(LS.mallCartUpdateError)
        },
        success: function(d) {
            var d = jm.parseJSON(d);
            if (d.success) {
                Mobi.ing(LS.mallCartUpdateOk, 1);
                jm(".itemLine" + b).parent().remove();
                Mobi.removeAcSaleList(c);
                var e = jm(".mall_product");
                if (e.length == 0) {
                    Fai.top.location.reload()
                } else {
                    Mobi.reCtOrderMoney();
                    jm(".mall_product").eq(0).css("border-top", "1px solid #fff")
                }
            } else {
                if (d.rt == -3) {
                    Mobi.ing(LS.mallCartUpdateNotFound)
                } else {
                    if (d.rt == -9) {
                        Mobi.ing(LS.mallCartUpdateStatusError)
                    } else {
                        Mobi.ing(LS.mallCartUpdateError)
                    }
                }
            }
        }
    })
};
Mobi.showMallTips = function(c) {
    document.getElementById("webLoading").style.display = "block";
    var b = document.getElementById("webLoading");
    var a = "<div id='mallBuyTips' class='mallTips'><div class='top wekitBox'><div class='topIcon'></div><div class='topText flex1'>" + c + "</div></div><div class='bottom wekitBox'><div class='left flex1' onclick='Mobi.removeMallTIps();'>" + LS.mallContinueShopping + "</div><a href='mcart.jsp' class='right flex1'>" + LS.mallToCartCount + "</a></div></div>";
    b.innerHTML = a
};
Mobi.initModuleMallAddrInfo = function(c, e, m, u) {
    var t = LS.mallPleaseChoose,
        z = [],
        o, B, s, y, C, p, A;
    if (u == 2052 || u == 1028) {
        A = site_cityUtil.getProvince();
        site_cityUtil.simpleProvinceName(A)
    } else {
        A = site_cityUtil.getProvinceEn();
        site_cityUtil.simpleProvinceNameEn(A)
    }
    jm.each(A, function(j, D) {
        if (u == 2052 || u == 1028) {
            z.push("<option value='" + D.id + "'>" + site_cityUtil.simpleCityNameStr(D.name) + "</option>")
        } else {
            z.push("<option value='" + D.id + "'>" + site_cityUtil.simpleCityNameStrEn(D.name) + "</option>")
        }
    });
    jm("#addrInfo_province").html("").html("<option value='-1'>" + t + "</option>" + z.join("")).change(function(i) {
        o = jm("#addrInfo_province").val();
        if (isNaN(o) || o <= 0) {
            jm("#addrInfo_city").html("").html("<option value='-1'>" + t + "</option>");
            jm("#addrInfo_county").html("").html("<option value='-1'>" + t + "</option>")
        }
        jm("#mallShipTemplate_province").val(jm("#addrInfo_province").val());
        jm("#mallShipTemplate_province").change();
        s = [];
        if (u == 2052 || u == 1028) {
            B = site_cityUtil.getCities(o);
            site_cityUtil.simpleCityName(B)
        } else {
            B = site_cityUtil.getCitiesEn(o);
            site_cityUtil.simpleCityNameEn(B)
        }
        jm.each(B, function(j, D) {
            s.push("<option value='" + D.id + "' >" + D.name + "</option>")
        });
        jm("#addrInfo_city").html("").html("<option value='-1'>" + t + "</option>" + s.join("")).unbind().bind("change", function(j) {
            y = jm("#addrInfo_city").val();
            if (isNaN(y) || y <= 0) {
                jm("#addrInfo_county").html("").html("<option value='-1'>" + t + "</option>")
            }
            jm("#mallShipTemplate_city").val(jm("#addrInfo_city").val());
            jm("#mallShipTemplate_city").change();
            p = [];
            if (u == 2052 || u == 1028) {
                C = site_cityUtil.getCounty(y)
            } else {
                C = site_cityUtil.getCountyEn(y)
            }
            jm.each(C, function(D, E) {
                p.push("<option value='" + E.id + "' >" + E.name + "</option>")
            });
            jm("#addrInfo_county").html("").html("<option value='-1'>" + t + "</option>" + p.join("")).unbind().bind("change", function(D) {
                jm("#mallShipTemplate_county").val(jm("#addrInfo_county").val());
                jm("#mallShipTemplate_county").change()
            })
        })
    });
    jm("#addrInfo_street").change(function(i) {
        jm("#edit_addrDetal").val(jm("#addrInfo_street").val())
    });
    jm("#addrInfo_city").html("").html("<option value='-1'>" + t + "</option>");
    jm("#addrInfo_county").html("").html("<option value='-1'>" + t + "</option>");
    for (var w = 0; w < e.length; w++) {
        var f = e[w];
        if (f.isDefault == 1) {
            for (var v = 0; v < m.length; v++) {
                var k = m[v]["fieldKey"];
                var r = f[k];
                jm(".orderSettle").find(".propItemValue").each(function() {
                    if (jm(this).attr("_field") == k) {
                        jm(this).val(r)
                    }
                    if ("mobile" == k) {
                        if ("mobileCt" in f) {
                            if (f.mobileCt != null && f.mobileCt != "") {
                                jm("#mobileCt").val(f.mobileCt)
                            }
                        }
                    }
                })
            }
            if (jm("#mallShipTemplate_province").length == 1 && f.addr_info != null) {
                setTimeout(function() {
                    jm("#mallShipTemplate_province").val(f.addr_info["provinceCode"]);
                    jm("#mallShipTemplate_province").trigger("change");
                    setTimeout(function() {
                        jm("#mallShipTemplate_city").val(f.addr_info["cityCode"]);
                        jm("#mallShipTemplate_city").trigger("change");
                        setTimeout(function() {
                            jm("#mallShipTemplate_county").val(f.addr_info["countyCode"]);
                            jm("#mallShipTemplate_county").trigger("change")
                        }, 0)
                    }, 0)
                }, 0);
                jm("#edit_addrDetal").val(f.addr_info["streetAddr"])
            }
        }
    }
    jm(".addrInfo").click(function() {
        var F = jm(this).attr("_item");
        jm(this).find(".left").show();
        jm(this).find(".middle").attr("style", "width:12rem;");
        jm(this).parent().find(".addrInfo").each(function() {
            if (jm(this).attr("_item") != F) {
                jm(this).find(".left").hide();
                jm(this).find(".middle").attr("style", "width:14rem;")
            }
        });
        var D = e[F];
        jm("#info_name").text(D.name);
        jm("#info_phone").text(D.phone);
        if (D.addr == null) {
            jm("#info_addr").text("")
        } else {
            jm("#info_addr").text(D.addr)
        }
        if (D.isDefault == 1) {
            jm(".mall_DefaultAddr").show()
        } else {
            jm(".mall_DefaultAddr").hide()
        }
        if (jm("#mallShipTemplate_province").length == 1 && D.addr_info != null) {
            setTimeout(function() {
                jm("#mallShipTemplate_province").val(D.addr_info["provinceCode"]);
                jm("#mallShipTemplate_province").trigger("change");
                setTimeout(function() {
                    jm("#mallShipTemplate_city").val(D.addr_info["cityCode"]);
                    jm("#mallShipTemplate_city").trigger("change");
                    setTimeout(function() {
                        jm("#mallShipTemplate_county").val(D.addr_info["countyCode"]);
                        jm("#mallShipTemplate_county").trigger("change")
                    }, 0)
                }, 0)
            }, 0);
            jm("#edit_addrDetal").val(D.addr_info["streetAddr"])
        }
        if (jm("#mallShipTemplate_province").length == 1 && D.addr_info == null) {
            setTimeout(function() {
                jm("#mallShipTemplate_province").val("-1");
                jm("#mallShipTemplate_province").trigger("change")
            }, 0);
            jm("#edit_addrDetal").val("")
        }
        for (var E = 0; E < m.length; E++) {
            var j = m[E]["fieldKey"];
            var G = D[j];
            jm(".orderSettle").find(".propItemValue").each(function() {
                if (jm(this).attr("_field") == j) {
                    jm(this).val(G)
                }
                if ("mobile" == j) {
                    if ("mobileCt" in D) {
                        if (D.mobileCt != null && D.mobileCt != "") {
                            jm("#mobileCt").val(D.mobileCt)
                        }
                    }
                }
            })
        }
    });
    var l = e,
        x = "",
        n = "",
        h = l.length,
        q = false;
    var a = {};
    jm("#addrInfoList .orderAddAddrInfo").click(function() {
        q = true;
        jm("#editAddrInfo").find(".propItemValue").each(function() {
            jm(this).val("")
        });
        jm("#addrInfo_province").val(-1);
        jm("#addrInfo_province").change();
        jm("#addrInfo_city").val(-1);
        jm("#addrInfo_city").change();
        jm("#addrInfo_county").val(-1);
        jm("#addrInfo_street").val();
        jm("#div1").attr("class", "close1");
        jm("#div2").attr("class", "close2");
        x = "addAddr"
    });
    jm(".edit").click(function() {
        jm("#addrInfoList .orderAddAddrInfo").click();
        q = false;
        n = jm(this).parent().parent().attr("_item");
        x = "editAddr";
        var i = l[n];
        jm("#editAddrInfo").find(".propItemValue").each(function() {
            var E = jm(this).attr("_field");
            jm(this).val(i[E])
        });
        var D = i.addr_info;
        if (D != null) {
            jm("#addrInfo_province").val(D.provinceCode);
            jm("#addrInfo_province").change();
            jm("#addrInfo_city").val(D.cityCode);
            jm("#addrInfo_city").change();
            jm("#addrInfo_county").val(D.countyCode);
            jm("#addrInfo_street").val(D.streetAddr)
        } else {
            jm("#addrInfo_street").val(i.addr)
        }
        var j = i.isDefault;
        if (j) {
            jm("#div1").attr("class", "open1");
            jm("#div2").attr("class", "open2")
        } else {
            jm("#div1").attr("class", "close1");
            jm("#div2").attr("class", "close2")
        }
    });
    jm(".orderSaveAddrInfo").click(function() {
        var L = true;
        if (h == 6 && x == "addAddr") {
            Mobi.ing(LS.mallAddrInfoAmountLimit, true);
            L = false;
            jm("#editAddrInfo .g_close").click()
        }
        var K = jm("#div1");
        var G = (K.attr("class") == "close1") ? 0 : 1;
        if (l.length == 0) {
            G = 1
        }
        var J = jm(this);
        var M = {};
        var j = {};
        var Q = "";
        var F = "";
        var E = "";
        var i = false;
        J.parent().find(".propItemValue").each(function() {
            Q = jm(this).attr("_field");
            F = jm(this).val();
            E = jm(this).attr("_prop");
            i = jm(this).attr("_required") == "1" ? true : false;
            if (i && (F == null || F == "")) {
                Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, E));
                this.focus();
                L = false
            }
            if (Q == "email" && F.length > 0) {
                if (!jm.isEmail(F)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, E));
                    this.focus();
                    L = false
                }
            }
            if (Q == "phone" && F.length > 0) {
                if (!jm.isPhone(F)) {
                    Mobi.ing(jm.format(LS.memberSignupUserAddItemCorrect, E));
                    this.focus();
                    L = false
                }
            }
            if (Q == "mobile" && F.length > 0) {
                if (!Mobi.isNationMobile(F)) {
                    Mobi.ing(LS.mobileNumRegular);
                    this.focus();
                    F = "";
                    L = false
                }
                j.mobileCt = jm(this).parent().find("#mobileCt").val()
            }
            if (Q == "mobile" && F.length <= 0) {
                j.mobileCt = ""
            }
            j[Q] = F
        });
        var D = jm("#addrInfo_county");
        var I = jm("#addrInfo_city");
        var H = jm("#addrInfo_province");
        var P = jm("#addrInfo_street");
        i = J.parent().find("#addrInfo_street").attr("_required") == "1" ? true : false;
        if (i) {
            if (H.val() == "-1") {
                Mobi.ing(LS.mallStlSubmitAddrErr, 1);
                document.getElementById("addrInfo_province").focus();
                return
            }
            if (I.val() == "-1") {
                Mobi.ing(LS.mallStlSubmitAddrErr, 1);
                document.getElementById("addrInfo_city").focus();
                return
            }
        }
        M.provinceCode = H.val();
        M.cityCode = I.val();
        M.countyCode = D.val();
        M.streetAddr = P.val();
        j.addr_info = M;
        var O = "";
        if (jm("#addrInfo_province").length == 1) {
            var N = document.getElementById("addrInfo_province").selectedIndex;
            O = (parseInt(N) == 0) ? "" : document.getElementById("addrInfo_province").options[N].text;
            N = document.getElementById("addrInfo_city").selectedIndex;
            O += (parseInt(N) == 0) ? "" : document.getElementById("addrInfo_city").options[N].text;
            N = document.getElementById("addrInfo_county").selectedIndex;
            O += (parseInt(N) == 0) ? "" : document.getElementById("addrInfo_county").options[N].text;
            O += jm("#addrInfo_street").val();
            j.addr = O
        }
        j.isDefault = G;
        a.opera = x;
        a._item = n;
        a.addrInfo = j;
        if (L) {
            jm.ajax({
                type: "post",
                url: "ajax/member_h.jsp?cmd=set&id=" + c,
                data: "info=" + jm.encodeUrl(jm.toJSON(a)),
                error: function() {
                    Mobi.ing(LS.memberProfileError)
                },
                success: function(R) {
                    var U = jm.parseJSON(R);
                    if (U.success) {
                        if (x == "editAddr") {
                            var S;
                            if (G) {
                                jm("#addrInfoList").find(".addrInfo").each(function() {
                                    if (jm(this).find(".defaultAddr").attr("style") != "display:none") {
                                        jm(this).find(".defaultAddr").hide();
                                        l[jm(this).attr("_item")]["isDefault"] = 0
                                    }
                                    if (jm(this).attr("_item") == n) {
                                        jm(this).find(".name").text(j.name);
                                        jm(this).find(".phone").text(j.phone);
                                        jm(this).find("#addr").text(j.addr);
                                        jm(this).find(".defaultAddr").show();
                                        S = jm(this)
                                    }
                                })
                            } else {
                                jm("#addrInfoList").find(".addrInfo").each(function() {
                                    if (jm(this).attr("_item") == n) {
                                        jm(this).find(".name").text(j.name);
                                        jm(this).find(".phone").text(j.phone);
                                        jm(this).find("#addr").text(j.addr);
                                        S = jm(this)
                                    }
                                })
                            }
                            l.splice(n, 1, j);
                            jm("#editAddrInfo .g_close").click();
                            S.click()
                        } else {
                            if (x == "addAddr") {
                                var T = "";
                                if (G) {
                                    T = "<div class='addrInfo' _item='" + h + "'><div class='left' style='display:none'><div class='selected'></div></div><div class='middle' style='width:14rem;'><div class='nameAndPhone'><span class='name'>" + j.name + "</span><span class='phone'>" + j.phone + "</span></div><div class='address'><span class='defaultAddr'>默认</span><span id='addr'>" + j.addr + "</span></div></div><div class='right'><div class='edit'></div></div></div>";
                                    jm("#addrInfoList").find(".addrInfo").each(function() {
                                        if (jm(this).find(".defaultAddr").attr("style") != "display:none") {
                                            jm(this).find(".defaultAddr").hide();
                                            l[jm(this).attr("_item")]["isDefault"] = 0
                                        }
                                    })
                                } else {
                                    T = "<div class='addrInfo' _item='" + h + "'><div class='left' style='display:none'><div class='selected'></div></div><div class='middle' style='width:14rem;'><div class='nameAndPhone'><span class='name'>" + j.name + "</span><span class='phone'>" + j.phone + "</span></div><div class='address'><span class='defaultAddr' style='display:none'>默认</span><span id='addr'>" + j.addr + "</span></div></div><div class='right'><div class='edit'></div></div></div>"
                                }
                                jm("#addrInfo").append(T);
                                l.push(j);
                                jm("#div1").unbind("click");
                                jm("#eidt").unbind("click");
                                jm(".orderSaveAddrInfo").unbind("click");
                                Mobi.initModuleMallAddrInfo(c, l, m, u);
                                jm("#editAddrInfo .g_close").click();
                                jm(".addrInfo").each(function() {
                                    if (jm(this).attr("_item") == (e.length - 1)) {
                                        jm(this).click()
                                    }
                                })
                            }
                        }
                    } else {
                        Mobi.ing(U.msg)
                    }
                }
            })
        }
    });
    var d = jm("#div1");
    var b = jm("#div2");
    d.click(function() {
        if (q == true || l[n]["isDefault"] == 0) {
            var i = (d.attr("class") == "close1") ? "open1" : "close1";
            var j = (b.attr("class") == "close2") ? "open2" : "close2";
            d.attr("class", i);
            b.attr("class", j)
        }
    })
};
Mobi.initModuleMallShipTemplate = function(h, j, p, k, m) {
    var i = p.vType || 1,
        c = p.sco || 0,
        d = p.openItemList;
    var r = LS.mallPleaseChoose,
        o = [],
        f, q, b, e, a, l, n;
    if (m == 2052 || m == 1028) {
        n = site_cityUtil.getProvince();
        site_cityUtil.simpleProvinceName(n)
    } else {
        n = site_cityUtil.getProvinceEn();
        site_cityUtil.simpleProvinceNameEn(n)
    }
    jm.each(n, function(s, t) {
        if (m == 2052 || m == 1028) {
            o.push("<option value='" + t.id + "' >" + site_cityUtil.simpleCityNameStr(t.name) + "</option>")
        } else {
            o.push("<option value='" + t.id + "' >" + site_cityUtil.simpleCityNameStrEn(t.name) + "</option>")
        }
    });
    jm("#mallShipTemplate_province").html("").html("<option value='-1'>" + r + "</option>" + o.join("")).change(function(s) {
        f = jm("#mallShipTemplate_province").val();
        if (isNaN(f) || f <= 0) {
            jm("#mallShipTemplate_city").html("").html("<option value='-1'>" + r + "</option>");
            jm("#mallShipTemplate_county").html("").html("<option value='-1'>" + r + "</option>");
            jm.each(d, function(t, u) {
                Mobi.changeShipTplPrice(u)
            });
            Mobi.mallStlCalcTotal();
            return
        }
        b = [];
        if (m == 2052 || m == 1028) {
            q = site_cityUtil.getCities(f);
            site_cityUtil.simpleCityName(q)
        } else {
            q = site_cityUtil.getCitiesEn(f);
            site_cityUtil.simpleCityNameEn(q)
        }
        jm.each(q, function(t, u) {
            b.push("<option value='" + u.id + "' >" + u.name + "</option>")
        });
        jm("#mallShipTemplate_city").html("").html("<option value='-1'>" + r + "</option>" + b.join("")).unbind().bind("change", function(t) {
            Mobi.mallStlCalcTotal();
            e = jm("#mallShipTemplate_city").val();
            if (isNaN(e) || e <= 0) {
                jm("#mallShipTemplate_county").html("").html("<option value='-1'>" + r + "</option>");
                jm.each(d, function(u, v) {
                    Mobi.changeShipTplPrice(v)
                });
                return
            }
            l = [];
            if (m == 2052 || m == 1028) {
                a = site_cityUtil.getCounty(e)
            } else {
                a = site_cityUtil.getCountyEn(e)
            }
            jm.each(a, function(u, v) {
                l.push("<option value='" + v.id + "' >" + v.name + "</option>")
            });
            jm("#mallShipTemplate_county").html("").html("<option value='-1'>" + r + "</option>" + l.join("")).unbind().bind("change", function(u) {
                Mobi.mallStlCalcTotal()
            });
            if (h === 0) {
                return
            }
            jm.each(d, function(w, y) {
                if (c) {
                    var x = false,
                        v = p.scrl || [];
                    jm.each(v, function(A, z) {
                        if (z.st === y.type) {
                            if (jm.inArray(parseInt(e), z.arl) > -1) {
                                if (z.fc === 1) {
                                    if (i === 1) {
                                        if (h >= z.d1) {
                                            x = true;
                                            return false
                                        }
                                    } else {
                                        if (h <= z.d1) {
                                            x = true;
                                            return false
                                        }
                                    }
                                }
                                if (z.fc === 2) {
                                    if (j >= z.d2) {
                                        x = true;
                                        return false
                                    }
                                }
                                if (z.fc === 3) {
                                    if (i === 1) {
                                        if (h >= z.d1 && j >= z.d2) {
                                            x = true;
                                            return false
                                        }
                                    } else {
                                        if (h <= z.d1 && j >= z.d2) {
                                            x = true;
                                            return false
                                        }
                                    }
                                }
                                if (z.fc === 4) {
                                    if (i === 1) {
                                        if (h >= z.d1 || j >= z.d2) {
                                            x = true;
                                            return false
                                        }
                                    } else {
                                        if (h <= z.d1 || j >= z.d2) {
                                            x = true;
                                            return false
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if (x) {
                        var u = {};
                        u.type = y.type;
                        u.defaultPrice = 0;
                        Mobi.changeShipTplPrice(u);
                        return
                    } else {
                        Mobi.changeShipTplPrice(y)
                    }
                }
                jm.each(y.regionList, function(F, I) {
                    if (jm.inArray(parseInt(e), I.areaList) < 0) {
                        Mobi.changeShipTplPrice(y);
                        return true
                    }
                    var E = 0,
                        A = I.price,
                        G = I.rha == null ? 1 : I.rha,
                        H = I.ria == null ? 1 : I.ria,
                        C = I.rip || 0;
                    var D = h;
                    if (G > 0) {
                        E = A;
                        D -= G
                    }
                    if (H > 0 && D > 0) {
                        var z = (D / H).toFixed(1);
                        z = Math.ceil(z);
                        E += C * z
                    }
                    var B = {};
                    B.type = y.type;
                    B.defaultPrice = E;
                    Mobi.changeShipTplPrice(B);
                    return false
                })
            })
        });
        jm("#mallShipTemplate_county").html("").html("<option value='-1'>" + r + "</option>");
        jm.each(d, function(t, u) {
            Mobi.changeShipTplPrice(u)
        });
        Mobi.mallStlCalcTotal()
    });
    jm("#mallShipTemplate_city").html("").html("<option value='-1'>" + r + "</option>");
    jm("#mallShipTemplate_county").html("").html("<option value='-1'>" + r + "</option>")
};
Mobi.changeShipTplPrice = function(a) {
    var b = jm("#tmpType_" + a.type).text().substring(0, 1);
    if (a.defaultPrice == 0) {
        jm("#tmpType_" + a.type).text(LS.freeShipping)
    } else {
        jm("#tmpType_" + a.type).text(b + a.defaultPrice.toFixed(2))
    }
    jm("#tmpType_" + a.type).attr("value", a.defaultPrice.toFixed(2));
    if (jm("#shipValue").attr("shiptype") == a.type) {
        jm("#shipPrice").attr("value", a.defaultPrice.toFixed(2));
        jm("#shipPrice").text(a.defaultPrice == 0 ? LS.freeShipping : a.defaultPrice.toFixed(2));
        Mobi.mallStlCalcTotal()
    }
    if (jm("#shipValue")[0].offsetHeight != jm("#shipPrice")[0].offsetHeight) {
        jm(".selectship").css({
            lineHeight: "1.25rem"
        });
        jm(".selectship .icon-rightIcon").css({
            position: "absolute",
            lineHeight: "2.5rem",
            marginTop: "-1.25rem"
        })
    }
};
Mobi.changeShipType = function() {
    var a = Fai.top._choiceCurrencyVal;
    jm(".ShipItem").click(function() {
        var e = jm(this),
            c = parseFloat(jm("#shipPrice").attr("value")),
            b = parseFloat(jm("#totalValue").text()),
            f = parseFloat(e.find(".right").attr("value")),
            i = parseFloat(e.find(".right").attr("shipType")),
            d = e.find(".right").text(),
            h = e.find(".left").text();
        jm("#shipPrice").attr("value", f).text(f == 0 ? LS.freeShipping : a + f);
        jm("#shipValue").attr("shiptype", i).text(h + "  ");
        b = Mobi.calculate(Mobi.calculate(b, c, 1), f, 0);
        jm("#totalValue").text(b);
        jm(".modifyShipDetails .g_close").click();
        if (jm("#shipValue")[0].offsetHeight != jm("#shipPrice")[0].offsetHeight) {
            jm(".selectship").css({
                lineHeight: "1.25rem"
            });
            jm(".selectship .icon-rightIcon").css({
                position: "absolute",
                lineHeight: "2.5rem",
                marginTop: "-1.25rem"
            })
        } else {
            jm(".selectship").attr("style", "");
            jm(".selectship .icon-rightIcon").attr("style", "")
        }
    })
};
Mobi.changeBankList = function() {
    jm(".bankListArea").click(function() {
        var c = jm(this),
            d = c.find(".bankItemValue").eq(2).text(),
            a = c.find(".bankItemValue").eq(0).text(),
            b = c.find(".bankItemValue").eq(1).text();
        jm(".orderDetail_line .bankDetailArea").find(".bankItemValue").eq(2).text(d);
        jm(".orderDetail_line .bankDetailArea").find(".bankItemValue").eq(0).text(a);
        jm(".orderDetail_line .bankDetailArea").find(".bankItemValue").eq(1).text(b);
        jm(".modifyBankList .g_close").click()
    })
};
Mobi.getRootFontSize = function() {
    var a = jm("html").css("font-size");
    a = a.substring(0, a.length - 2);
    return Number(a)
};
Mobi.initUseCoupon = (function(h) {
    var e = i.prototype,
        b, c = {};

    function i(j) {
        this.selectCoupon = {};
        b = this;
        c.couponList = j;
        c.couponColorList = ["red", "orange", "yellow", "green", "blue", "pink", "purple"], d();
        a()
    }

    function d() {
        Mobi.onTouchAndClickEvent(".coupon-warp", function() {
            var l = jm(".fk-select-layer"),
                k = Mobi.getRootFontSize(),
                j = jm(this)[0].offsetTop;
            b.selectCoupon.id = jm(this).attr("data_id");
            b.selectCoupon.saveMoney = jm(this).find(".couponPrice").text();
            l.css({
                top: j + "px"
            });
            l.show();
            Mobi.mallStlCalcTotal()
        });
        Mobi.onTouchAndClickEvent(".fk-select-layer", function() {
            jm(".fk-select-layer").hide();
            b.selectCoupon = {};
            jm("#couponOffsetMoney").text(LS.notUse);
            Mobi.mallStlCalcTotal()
        });
        Mobi.onTouchAndClickEvent("#editCouponPanel .fk-coupon-opera .g_button", function(o) {
            if ("id" in b.selectCoupon) {
                var n = Fai.top._choiceCurrencyVal;
                var j = b.selectCoupon.saveMoney;
                if (jm("#editUseItgPanel").length > 0) {
                    var q = jm("#useItg"),
                        k = parseInt(q.attr("_needitg")),
                        l = parseInt(q.attr("_maxuse"));
                    var p = parseFloat(jm("#cartTotalPrice").attr("totalPrice"));
                    if (isNaN(p)) {
                        return
                    }
                    var m = Math.floor((p - j) * k);
                    if (m < l) {
                        jm(".useTips .maxUse").text(m)
                    } else {
                        jm(".useTips .maxUse").text(l)
                    }
                }
                jm("#couponOffsetMoney").attr("_offsetmoney", j);
                jm("#couponOffsetMoney").text("-" + n + (parseFloat(j).toFixed(2)));
                Mobi.mallStlCalcTotal();
                jm("#editCouponPanel .g_close").click();
                return false
            } else {
                Mobi.ing(LS.plsSelectCoupon)
            }
        });
        Mobi.onTouchAndClickEvent("#editCouponPanel #validCode", function() {
            var j = jm("#redeemCode").val();
            if (redeemCodee) {
                $.ajax({
                    url: "ajax/mallCoupon_h.jsp?cmd=checkSetCoupon",
                    data: "code=" + jm.encodeUrl(redeemCodee),
                    dataType: "json",
                    success: function(l) {
                        if (l.success) {} else {}
                    },
                    error: function() {
                        Mobi.ing(LS.systemError)
                    }
                })
            }
            if ("id" in b.selectCoupon) {
                var k = Fai.top._choiceCurrencyVal;
                jm("#couponOffsetMoney").text("-" + k + b.selectCoupon.saveMoney);
                jm("#editCouponPanel .g_close").click()
            } else {
                Mobi.ing(LS.plsSelectCoupon)
            }
        });
        Mobi.onTouchAndClickEvent("#editCouponPanel .notUseBtn", function() {
            jm(".fk-select-layer").hide();
            b.selectCoupon = {};
            jm("#couponOffsetMoney").text(LS.notUse);
            Mobi.mallStlCalcTotal();
            jm("#editCouponPanel .g_close").click()
        })
    }

    function f() {
        var j = [];
        j.push("<div class='couponPanel' id='editCouponPanel' style='display:none;'>");
        j.push("<div class='ShipDetailsHeader webHeaderBg'>");
        j.push("<span class='g_close icon-gClose'></span><span class='title pageTitle'>" + LS.coupon);
        j.push("</span></div>");
        j.push("<div class='fk-coupon-panel couponListPanel'>");
        j.push("<div class='fk-rc' style='display:none'>");
        j.push('<input type="text" id="redeemCode" class="g_input fk-rc-input" placeholder="我有兑换码"/>');
        j.push("<div class='g_button' id='validCode'>验证</div>");
        j.push("</div>");
        j.push("<div class='coupon-empty' style='display:none;'>");
        j.push("<div class='icon-coupons1'></div>");
        var k = "暂无可使用优惠券";
        j.push("<div class='showMsg'>" + k + "</div>");
        j.push("</div>");
        j.push("<div class='show-coupon-list'>");
        j.push("<div style='padding: 0.5rem;'>" + LS.plsSelectUseCoupon + "</div>");
        jm.each(c.couponList, function(m, l) {
            j.push("<div class='coupon-warp' data_id='" + l.cdId + "' data_min='" + l.orderMinPrice + "'>");
            j.push("<div class='coupon-code'>" + LS.coupon.substring(2) + LS.serialNumber + "：" + l.redeemCode + "</div>");
            j.push("<div class='coupon-data'>");
            j.push("<div>" + LS.Event + LS.name + "：" + l.couponName + "</div>");
            j.push("<div>" + LS.useConditionOrderOver + l.orderMinPrice + "</div>");
            j.push("<div>" + LS.vilidaty + "：" + l.validity + "</div>");
            j.push("</div>");
            j.push("<div class='coupon' data_id='" + l.cdId + "'>");
            j.push("<div class='coupon-left coupon-" + couponColorList[l.bg] + "-left'></div>");
            j.push("<div class='coupon-content coupon-color-" + couponColorList[l.bg] + "'>");
            j.push("<div class='couponSavePrice'><span class='priceSign'>" + Fai.top._choiceCurrencyVal + "</span><span class='couponPrice'>" + l.savePrice + "</span></div>");
            j.push("</div>");
            j.push("<div class='coupon-right coupon-" + couponColorList[l.bg] + "-right'></div>");
            j.push("<div class='coupon-watermark'>券</div>");
            j.push("</div>");
            j.push("</div>")
        });
        j.push("<div class='fk-select-layer'><div></div><em><span class='faisco-icons-select'></span></em></div>");
        j.push("</div>");
        j.push("</div>");
        j.push("<div class='fk-coupon-opera'>");
        j.push("<div class='g_color g_bdColor  notUseBtn'><span>" + LS.doNotUsed + "<span class=''></div>");
        j.push("<div class='g_button'>" + LS.sureUse + "</div>");
        j.push("</div>");
        return j.join("")
    }

    function a() {
        jm(f()).insertAfter("#couponLine");
        var j = {
            triggerId: "couponLine",
            panelId: "editCouponPanel",
            closeWebPage: "#editCouponPanel .g_close"
        };
        Mobi.initWebPage(j)
    }
    return i
})();
Mobi.setUseIntegral = function() {
    var a = Fai.top._choiceCurrencyVal;
    Mobi.onTouchAndClickEvent("#editUseItgPanel .g_button", function() {
        if (Mobi.initPresentIpt()) {
            jm("#editUseItgPanel .g_close").click()
        }
    });
    Mobi.onTouchAndClickEvent("#editUseItgPanel .notUseBtn", function() {
        jm("#offsetMoney").text(LS.notUse);
        jm("#offsetMoney").attr("_offsetmoney", "0");
        jm("#useItg").val("0");
        Mobi.initPresentIpt();
        Mobi.mallStlCalcTotal();
        jm("#editUseItgPanel .g_close").click()
    })
};
Mobi.mallStlCalcTotal = function() {
    var f = parseFloat(jm("#cartTotalPrice").attr("totalPrice"));
    if (isNaN(f)) {
        return
    }
    var d = parseFloat(jm("#shipPrice").attr("value"));
    if (isNaN(d)) {
        d = 0
    }
    if (jm("#mallShipTemplate_province").length > 0) {
        var a = jm("#shipValue");
        a.attr("provinceCode", jm.trim(jm("#mallShipTemplate_province").val()));
        a.attr("cityCode", jm.trim(jm("#mallShipTemplate_city").val()));
        a.attr("countyCode", jm.trim(jm("#mallShipTemplate_county").val()));
        var c = jm("#shipValue").attr("shiptype")
    } else {
        if (jm("#mallShip").length == 1) {
            var c = jm("#shipValue").attr("shiptype");
            jm("#mallShip").attr("shipType", c)
        }
    }
    var h = 0;
    if (jm("#offsetMoney").length > 0) {
        var b = jm("#offsetMoney").attr("_offsetmoney");
        if (!isNaN(b) && !Mobi.isNull(b)) {
            h = parseFloat(b);
            if ((f + d) < h) {
                Mobi.ing(jm.format(LS.integral_maxUse, jm("#useItg").attr("_maxuse"), jm.encodeHtml(jm("#useItg").attr("_itegName"))));
                module.find(".mallStlTotal .totalValue").text((f + d).toFixed(2));
                return
            }
        }
    }
    if (Mobi.selectCoupon && "id" in Mobi.selectCoupon && Mobi.selectCoupon.id) {
        h += Number(Mobi.selectCoupon.saveMoney)
    }
    var e = parseInt(jm("#presentItg").attr("value"));
    if (!isNaN(e) && e > 0) {
        jm("#presentItg").text(parseInt((f - h).toFixed(2) * e))
    }
    jm("#mallShipCount").text((d).toFixed(2));
    jm("#totalValue").text((f + d - h).toFixed(2))
};
var oAddrDetail = jm("#info_addr").text();
Mobi.editInfoSave = function(c) {
    var b = jm(".orderSettle");
    var t = new Array();
    var p = false;
    var h = {};
    var r = {};
    b.find(".propItemValue").each(function() {
        var w = jm(this).val();
        var x = jm(this).attr("id");
        var v = jm(this).attr("_field");
        if (jm(this).attr("_required") == 1 && !w && !p) {
            msg = LS.mallStlSubmitInput + jm(this).attr("_prop");
            Mobi.ing(msg);
            document.getElementById(x).focus();
            p = true;
            return false
        }
        if (w && w.length > 0) {
            if (v === "email" && !jm.isEmail(w)) {
                msg = LS.mallStlSubmitInput2 + jm(this).attr("_prop");
                Mobi.ing(msg);
                document.getElementById(x).focus();
                p = true;
                return false
            }
            if (v === "phone" && !jm.isPhone(w)) {
                msg = LS.mallStlSubmitInput2 + jm(this).attr("_prop");
                Mobi.ing(msg);
                document.getElementById(x).focus();
                p = true;
                return false
            }
            if (v == "mobile" && !Mobi.isNationMobile(w)) {
                msg = LS.mobileNumRegular;
                Mobi.ing(msg);
                document.getElementById(x).focus();
                p = true;
                return false
            }
            if (v == "mobile") {
                r.mobileCt = jm(this).parent().find("#mobileCt").val();
                if (w.length <= 0) {
                    r.mobileCt = ""
                }
                var u = {};
                u.field = "mobileCt";
                u.value = r.mobileCt;
                t.push(u)
            }
        }
        if (typeof v !== "undefined") {
            var u = {};
            u.field = v;
            u.value = w;
            t.push(u);
            if (v != "addrDetail") {
                r[v] = w
            }
        }
    });
    if (p) {
        return
    }
    var l = "";
    if (jm("#mallShipTemplate_city").length == 1) {
        var o = parseInt(jm("#mallShipTemplate_city").val());
        if (o === -1) {
            Mobi.ing(LS.mallStlSubmitAddrErr);
            document.getElementById("mallShipTemplate_city").focus();
            return false
        } else {
            var n = document.getElementById("mallShipTemplate_province").selectedIndex;
            l = (parseInt(n) == 0) ? "" : document.getElementById("mallShipTemplate_province").options[n].text;
            n = document.getElementById("mallShipTemplate_city").selectedIndex;
            l += (parseInt(n) == 0) ? "" : document.getElementById("mallShipTemplate_city").options[n].text;
            n = document.getElementById("mallShipTemplate_county").selectedIndex;
            l += (parseInt(n) == 0) ? "" : document.getElementById("mallShipTemplate_county").options[n].text;
            l += jm("#edit_addrDetal").val()
        }
    }
    if (jm("#addrInfo_city").length == 1) {
        l = "";
        var f = jm("#addrInfo_street");
        var e = parseInt(jm("#addrInfo_city").val());
        var j = parseInt(jm("#addrInfo_province").val());
        var m = parseInt(jm("#addrInfo_county").val());
        var i = f.attr("_required");
        if (i && j === -1) {
            Mobi.ing(LS.mallStlSubmitAddrErr);
            document.getElementById("addrInfo_province").focus();
            return false
        } else {
            if (i && e === -1) {
                Mobi.ing(LS.mallStlSubmitAddrErr);
                document.getElementById("addrInfo_city").focus();
                return false
            } else {
                var n = document.getElementById("addrInfo_province").selectedIndex;
                l = (parseInt(n) == 0) ? "" : document.getElementById("addrInfo_province").options[n].text;
                n = document.getElementById("addrInfo_city").selectedIndex;
                l += (parseInt(n) == 0) ? "" : document.getElementById("addrInfo_city").options[n].text;
                n = document.getElementById("addrInfo_county").selectedIndex;
                l += (parseInt(n) == 0) ? "" : document.getElementById("addrInfo_county").options[n].text;
                l += jm("#addrInfo_street").val()
            }
        }
        if (c != 0) {
            h.provinceCode = j;
            h.cityCode = e;
            h.countyCode = m;
            h.streetAddr = f.val();
            r.addr_info = h;
            r.addr = l;
            r.isDefault = 1
        }
        var q = {};
        q.field = "addr";
        q.value = l;
        t.push(q)
    }
    if (c != 0) {
        var a = {};
        a.opera = "addAddr";
        a.addrInfo = r;
        jm.ajax({
            type: "post",
            url: action = "ajax/member_h.jsp?cmd=set&id=" + c,
            data: "info=" + jm.encodeUrl(jm.toJSON(a)),
            success: function(u) {},
            error: function() {
                Mobi.ing(LS.systemError)
            }
        })
    }
    if (jm(".assignItem_line").length < 1) {
        var d = "";
        var s = "";
        var k = "";
        jm(".orderAssign_line .shipTopBg:last-child").remove();
        d += "<div class='separatorLine'></div>";
        d += "<div class='assignItem_line' id='assignItemline'>";
        jm.each(t, function(u) {
            if ((t[u])["field"] === "name" || (t[u])["field"] === "phone") {
                d += "<span class='item_value flex1' id='info_" + (t[u])["field"] + "'>" + (t[u])["value"] + "</span>"
            } else {
                if ((t[u])["field"] === "addr") {
                    s = (t[u])["value"];
                    k = (t[u])["field"]
                }
            }
        });
        if (s != "" && k != "") {
            d += "<div class='item_value flex1' id='info_" + k + "'>" + s + "</div>"
        } else {
            if (l != "") {
                d += "<div class='item_value flex1' id='info_addr'>" + l + "</div>"
            }
        }
        d += "</div>";
        d += "<div class='shipTopBg'></div>";
        jm(".orderAssign_line").append(d)
    }
    jm("#editCusInfo .g_close").click()
};
Mobi.mallSubmit = function(q, k, e, x, A) {
    if (!k && q === 0) {
        Mobi.ing("您目前处于管理状态，您的订单为示例数据。");
        return
    }
    var n = jm("#mstlBtn");
    var f = jm(".orderSettle"),
        z = {},
        u = false,
        l = "";
    f.find(".propItemValue").each(function() {
        var B = jm(this),
            E = B.val(),
            F = B.attr("id");
        if (B.attr("_required") == 1 && !E && !u) {
            l = LS.mallStlSubmitInput + B.attr("_prop");
            Mobi.ing(l);
            jm("#linetitle1").click();
            document.getElementById(F).focus();
            u = true;
            return false
        }
        var D = B.attr("_field");
        if (E && E.length > 0) {
            if (D === "email" && !jm.isEmail(E)) {
                l = LS.mallStlSubmitInput2 + B.attr("_prop");
                Mobi.ing(l);
                jm("#linetitle1").click();
                document.getElementById(F).focus();
                u = true;
                return false
            }
            if (D === "phone" && !jm.isPhone(E)) {
                l = LS.mallStlSubmitInput2 + B.attr("_prop");
                Mobi.ing(l);
                jm("#linetitle1").click();
                document.getElementById(F).focus();
                u = true;
                return false
            }
            if (D == "mobile" && !Mobi.isNationMobile(E)) {
                l = LS.mobileNumRegular;
                Mobi.ing(l);
                document.getElementById(F).focus();
                u = true;
                return false
            }
        }
        if (typeof D !== "undefined") {
            if (D !== "addrDetail" && D !== "addrInfo_street") {
                z[D] = E;
                if (D == "mobile") {
                    var C = jm("#mobileCt").val();
                    if (E.length <= 0) {
                        C = ""
                    }
                    z.mobileCt = C
                }
            }
        }
    });
    if (z.addr == null && jm("#addrInfo_province").length == 1) {
        var o = "";
        var r = document.getElementById("addrInfo_province").selectedIndex;
        o = (parseInt(r) == 0) ? "" : document.getElementById("addrInfo_province").options[r].text;
        r = document.getElementById("addrInfo_city").selectedIndex;
        o += (parseInt(r) == 0) ? "" : document.getElementById("addrInfo_city").options[r].text;
        r = document.getElementById("addrInfo_county").selectedIndex;
        o += (parseInt(r) == 0) ? "" : document.getElementById("addrInfo_county").options[r].text;
        o += jm("#addrInfo_street").val();
        z.addr = o
    }
    if (Mobi.orderLvMessageOpen) {
        var t = jm("#orderLeveaMsgIn").val();
        if (t.length > Mobi.orderLvMessageMaxNum) {
            t = t.substring(0, Mobi.orderLvMessageMaxNum)
        }
        z.msg = t
    } else {
        z.msg = ""
    }
    if (u) {
        return
    }
    var b = jm("#shipValue");
    if (jm("#mallShipTemplate_province").length == 1 && b.length == 1) {
        var j = parseInt(b.attr("provinceCode"));
        var p = parseInt(b.attr("cityCode"));
        var i = parseInt(b.attr("countyCode"));
        if (!j || isNaN(j) || !site_cityUtil.isValidProvince(j)) {
            l = LS.mallStlSubmitAddrErr;
            jm("#linetitle1").click();
            document.getElementById("mallShipTemplate_province").focus()
        } else {
            if (!p || isNaN(p) || !site_cityUtil.isValidCity(p, j)) {
                l = LS.mallStlSubmitAddrErr;
                jm("#linetitle1").click();
                document.getElementById("mallShipTemplate_city").focus()
            }
        }
        var m = {
            type: parseInt(b.attr("shipType")),
            templateId: parseInt(b.attr("templateId")),
            provinceCode: j,
            cityCode: p,
            countyCode: i,
            streetAddr: jm.trim(jm("#edit_addrDetal").val())
        };
        z.shipType = m
    } else {
        z.shipType = parseInt(jm("#shipValue").attr("shipType"))
    }
    if (l != "") {
        Mobi.ing(l);
        return
    }
    var s = jm("#onlineBankType");
    var c = 0;
    if (s.length == 1) {
        c = parseInt(s.attr("_paymode"));
        if (c < 3) {
            z.payMode = c
        }
    }
    if ((s.length == 1) && (c > 2)) {
        c = parseInt(s.attr("_paymode"));
        if (c != 9 && c != 8 && c != 7) {
            z.payBankType = parseInt(s.attr("_type"))
        }
        z.payMode = parseInt(s.attr("_paymode"))
    }
    if (isNaN(c)) {
        Mobi.ing(LS.mallStlPayOnlineType);
        return
    }
    var y = jm("#useItg");
    if (y.length > 0) {
        var d = y.val();
        if (jm.isInteger(d)) {
            var h = parseInt(y.attr("_maxUse"));
            var a = parseInt(y.attr("_currentitg"));
            var v = y.attr("_itegName");
            if (d > a) {
                Mobi.ing(jm.format(LS.integral_notOverCurrent, jm.encodeHtml(v), jm.encodeHtml(v)));
                y.focus();
                return
            }
            if (d > h) {
                Mobi.ing(jm.format(LS.integral_notOver, jm.encodeHtml(v), h));
                y.focus();
                return
            }
            if (d < 0) {
                Mobi.ing(LS.integral_inputInteger);
                y.focus();
                return
            }
            z.useItg = parseInt(d)
        }
    }
    if (jm("#presentItgShow").length > 0) {
        z.presentItg = true
    }
    if (Mobi.selectCoupon && "id" in Mobi.selectCoupon && Mobi.selectCoupon.id) {
        z.cdId = Number(Mobi.selectCoupon.id)
    }
    Mobi.ing(LS.mallStlSubmitting, -1);
    var w = jm("#onlineBankType").attr("_paymode");
    urlArg = "orderId=" + q;
    if (k) {
        if (window.self != window.top && /(iPhone|iPad|iPod|safari)/i.test(navigator.userAgent.toLowerCase())) {
            urlArg = "imme&immeData=" + jm.encodeUrl(jm.toJSON(A))
        } else {
            urlArg = "imme"
        }
    }
    n.attr("disabled", "disabled");
    if (!k && e.length > 0) {
        jm.ajax({
            type: "post",
            url: "ajax/order_h.jsp?cmd=delItem&orderId=" + q,
            data: "itemIds=[" + e + "]",
            error: function() {
                Mobi.ing(LS.mallCartUpdateError)
            },
            success: function(B) {
                var B = jm.parseJSON(B);
                if (B.success) {
                    Mobi.ajaxSettleOrder(urlArg, z, x, k, w, q)
                } else {
                    Mobi.ing(LS.mallStlSubmitError)
                }
            }
        })
    } else {
        Mobi.ajaxSettleOrder(urlArg, z, x, k, w, q)
    }
    n[0].disabled = false
};
Mobi.ajaxSettleOrder = function(f, c, d, b, e, a) {
    jm.ajax({
        type: "post",
        url: "ajax/order_h.jsp?cmd=settle&" + f,
        data: "data=" + jm.encodeUrl(jm.toJSON(c)),
        error: function() {
            Mobi.ing(LS.mallStlSubmitError)
        },
        success: function(h) {
            var h = jm.parseJSON(h);
            if (h.success) {
                jm.ajax({
                    type: "post",
                    url: "ajax/order_h.jsp?cmd=addAfterShop",
                    data: "data=" + jm.encodeUrl(jm.toJSON(d)),
                    error: function() {
                        stlMsg.html(LS.mallStlSubmitError)
                    },
                    success: function(i) {
                        if (e == "10" || e == "11") {
                            window.location.href = "/wxPay/mdetail.jsp?id=" + (b ? h.oid : a) + "&suc=true"
                        } else {
                            window.location.href = "mdetail.jsp?id=" + (b ? h.oid : a) + "&suc=true"
                        }
                    }
                })
            } else {
                if (h.rt == -3) {
                    Mobi.ing(LS.mallStlSubmitNotFound)
                } else {
                    if (h.rt == -9) {
                        Mobi.ing(LS.mallStlSubmitStatusError)
                    } else {
                        if (h.rt == Mobi.MallAjaxErrno.outOfMallAmount) {
                            Mobi.ing(jm.format(LS.mallAmountOverNameList, h.productsName))
                        } else {
                            if (h.rt == Mobi.MallAjaxErrno.OutOfAllowAmount) {
                                Mobi.ing(jm.format(LS.allowAmountOverNameList, h.productsName))
                            } else {
                                if (h.rt == Mobi.MallAjaxErrno.couponOverTime) {
                                    Mobi.ing(LS.couponOverTime)
                                } else {
                                    if (h.rt == Mobi.MallAjaxErrno.couponUnavail) {
                                        Mobi.ing(LS.couponUnavail)
                                    } else {
                                        if (h.rt == Mobi.MallAjaxErrno.couponNotFound) {
                                            Mobi.ing(LS.couponNotFound)
                                        } else {
                                            Mobi.ing(LS.mallStlSubmitError)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
};
Mobi.orderLvMessageOpen = false;
Mobi.orderLvMessageMaxNum = 0;
Mobi.initOrderLvMsgPrm = function(b, a) {
    Mobi.orderLvMessageOpen = b;
    Mobi.orderLvMessageMaxNum = a
};
Mobi.mallSettle = function(a) {
    if (a > 0) {
        var b = [];
        jm(".mallCart .invalidItem").each(function() {
            b.push(jm(this).attr("itemId"))
        });
        if (jm(".mallCart").children().length - 1 == b.length) {
            Mobi.ing(LS.settleFailplsModifyCart);
            return
        }
        if (jm(".mallCart").children().length - 1 > 500) {
            Mobi.ing(LS.mcartTooLong);
            return
        }
        window.location.href = "mstl.jsp?id=" + a + "&invalidIds=" + b
    } else {
        window.location.href = "mstl.jsp"
    }
};
Mobi.initPresentIpt = function() {
    var b = jm("#useItg");
    if (b.length > 0) {
        var h = Fai.top._choiceCurrencyVal;
        var i = parseInt(b.attr("_needitg"));
        var e = parseInt(b.val());
        var k = b.attr("_itegName");
        var j = parseInt(b.attr("_maxuse"));
        var f = parseFloat(jm("#cartTotalPrice").attr("totalPrice"));
        if (isNaN(f)) {
            return false
        }
        if (!jm.isInteger(e) || e < 0) {
            jm("#offsetMoney").text(LS.notUse);
            jm("#offsetMoney").attr("_offsetmoney", "");
            Mobi.ing(LS.integral_inputOverZero);
            b.focus;
            e = 0
        }
        if (jm("#couponOffsetMoney").length > 0) {
            var c = jm("#couponOffsetMoney").attr("_offsetmoney");
            if (!isNaN(c)) {
                c = parseInt(c);
                var l = Math.floor((f - c) * i);
                if (l < j) {
                    j = l
                }
            }
        }
        if (e > j) {
            Mobi.ing(jm.format(LS.integral_maxUse, j, jm.encodeHtml(jm("#useItg").attr("_itegName"))));
            jm("#useItg").val(j);
            return false
        }
        if (e > parseInt(b.attr("_currentItg"))) {
            Mobi.ing(jm.format(LS.integral_notOverCurrent, jm.encodeHtml(k), jm.encodeHtml(k)));
            e = 0;
            b.focus();
            return false
        }
        var d = (e / i).toFixed(2);
        if (e == 0) {
            jm("#offsetMoney").text(LS.notUse)
        } else {
            jm("#offsetMoney").text("-" + h + d)
        }
        jm("#offsetMoney").attr("_offsetmoney", d);
        if (jm(".coupon-warp").length > 0) {
            var a = 0;
            jm(".coupon-warp").each(function() {
                var m = parseInt(jm(this).attr("data_min"));
                if (f - d < m) {
                    jm(this).hide()
                } else {
                    a++;
                    jm(this).show()
                }
            });
            if (a != 0) {
                jm(".show-coupon-list").show();
                jm(".coupon-empty").hide();
                jm(".fk-coupon-opera").show()
            } else {
                jm(".fk-select-layer").hide();
                Mobi.selectCoupon = {};
                jm("#couponOffsetMoney").text(LS.notUse);
                jm(".show-coupon-list").hide();
                jm(".coupon-empty").show();
                jm(".fk-coupon-opera").hide()
            }
            jm("#cpCount").text(a)
        }
        Mobi.mallStlCalcTotal();
        if (e == 0) {
            return false
        }
    }
    return true
};
Mobi.printOnlinePayType = function(a) {
    var b = new Array();
    b.push("<div class='pgListDiv' id='pgListDiv'>");
    b.push("<div class='loginHeader webHeaderBg'>");
    b.push("<span class='turnBackIcon g_close icon-gClose'></span>");
    b.push("<span class='title pageTitle'>" + LS.mallSstlOnlineType + "</span>");
    b.push("</div>");
    b.push("<div id='onlinePayType' class='pgDetail onlinePayType'>");
    b.push("<div id='pgBox' class='pgBox'>");
    jm.each(a, function(c) {
        var d = a[c];
        if (!d.desc) {
            return true
        }
        b.push("<div id=group_" + d.payMode + " class='line'>");
        b.push("<div class='pgBoxItem'><a class='pgName payMode'  onclick='Mobi.setPayOnlineType(this);'  _payMode='" + d.payMode + "' _name='" + d.desc + "'>" + d.desc + "</a></div>");
        b.push("</div>")
    });
    b.push("</div></div></div>");
    return b.join("")
};
Mobi.toggleItemLine = function(c) {
    var d = jm(c);
    if (d.hasClass("opened")) {
        d.parent().find(".pgBox2Item").height(0);
        d.removeClass("opened")
    } else {
        jm(".pgBox2Item").height(0);
        jm(".pgBoxItem").removeClass("opened");
        var a = jm(c).parent().find(".pgBox2Item .pgName").length;
        var b = 0;
        if (a >= 6) {
            b = "15rem"
        } else {
            b = a * 2.5 + "rem"
        }
        d.addClass("opened").parent().find(".pgBox2Item").height(b)
    }
};
Mobi.setPayOnlineType = function(e, a) {
    var e = jm(e),
        d = "",
        b = "",
        a = e.attr("_name");
    if (e.hasClass("payMode")) {
        d = e.attr("_payMode");
        if (d == 10 || d == 11) {
            var c = navigator.userAgent.toLowerCase();
            if (!(c.match(/MicroMessenger/i) == "micromessenger")) {
                Mobi.ing("只可在微信客户端可用，请重新选择。");
                return
            }
        }
        jm("#onlineBankType").attr("_payMode", d)
    } else {
        if (e.hasClass("bank")) {
            d = e.attr("_payMode");
            b = e.attr("_type");
            jm("#onlineBankType").attr("_payMode", d);
            jm("#onlineBankType").attr("_type", b)
        }
    }
    jm("#onlineBankType").text(a);
    jm("#pgListDiv .g_close").click()
};
Mobi.initpayOrder = function(a) {
    var b = new Mobi.payOrder(a);
    b.init()
};
Mobi.payOrder = function(a) {
    this.orderId = a
};
(function(c, b, h) {
    var f = b.prototype,
        a, i = c(".payButton");
    f.init = function() {
        a = this.orderId;
        d()
    };

    function d() {
        i.on("click", function() {
            var k = c(this).attr("_href");
            var l = (k == "WXPAY");
            var j = e(l);
            if (j) {
                if (!l) {
                    document.location.href = k
                } else {
                    var m = c(this).attr("_appId");
                    Mobi.getWxpayUrl(m)
                }
            }
        })
    }

    function e(k) {
        var j = true;
        c.ajax({
            type: "post",
            url: "ajax/order_h.jsp?cmd=checkOrder",
            data: "orderId=" + a + "&isWX=" + k,
            async: false,
            dataType: "json",
            error: function() {
                Mobi.ing(LS.mallStlSubmitError)
            },
            success: function(l) {
                if (!l.success) {
                    j = false;
                    if (l.rt == -3) {
                        Mobi.ing(LS.mallStlSubmitNotFound)
                    } else {
                        if (l.rt == -9) {
                            Mobi.ing(LS.mallStlSubmitStatusError)
                        } else {
                            if (l.rt == Mobi.MallAjaxErrno.outOfMallAmount) {
                                Mobi.ing(c.format(LS.mallAmountOverNameList, l.productsName))
                            } else {
                                if (l.rt == Mobi.MallAjaxErrno.OutOfAllowAmount) {
                                    Mobi.ing(c.format(LS.allowAmountOverNameList, l.productsName))
                                } else {
                                    if (l.rt == Mobi.MallAjaxErrno.payDomainError) {
                                        Mobi.ing(c.format(LS.mallPayDomainError))
                                    } else {
                                        Mobi.ing(LS.mallStlSubmitError)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return j
    }
})(jm, Mobi.payOrder);
Mobi.getWxpayUrl = function(a) {
    var b = encodeURIComponent(location.href);
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + a + "&redirect_uri=" + b + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
};
Mobi.callPay = function(b, a) {
    Mobi.showLoading();
    jm.ajax({
        type: "post",
        url: "ajax/mall_h.jsp?cmd=getWxpayCallPayParam&orderId=" + a + "&code=" + b,
        error: function() {
            Mobi.closeLoading();
            Mobi.ing(LS.systemError)
        },
        success: function(c) {
            var d = jm.parseJSON(jm.decodeUrl(c));
            Mobi.closeLoading();
            if (d.success) {
                Mobi.callPayAPI(d)
            } else {
                Mobi.closeLoading();
                Mobi.ing(d.errMsg + "(请联系网站管理员)")
            }
        }
    })
};
Mobi.callPayAPI = function(c) {
    try {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", a, false)
            } else {
                if (document.attachEvent) {
                    document.attachEvent("WeixinJSBridgeReady", a);
                    document.attachEvent("onWeixinJSBridgeReady", a)
                }
            }
        } else {
            a()
        }

        function a() {
            var d = {
                appId: c.appId,
                nonceStr: c.nonceStr,
                timeStamp: c.timeStamp,
                paySign: c.paySign,
                "package": c.pak,
                signType: "MD5"
            };
            WeixinJSBridge.invoke("getBrandWCPayRequest", d, function(e) {
                if (e.err_msg != "get_brand_wcpay_request:cancel") {
                    WeixinJSBridge.log(e.err_msg)
                }
                if (e.err_msg != "get_brand_wcpay_request:ok") {
                    Mobi.ing(e.err_msg);
                    Mobi.showLoading();
                    setTimeout(function() {
                        window.location.href = "/wxPay/mdetail.jsp?id=" + jm("#wxpayBtn").attr("_orderid") + "&suc=true"
                    }, 3000)
                } else {
                    Mobi.ing("支付成功，5秒后将跳转到首页。");
                    Mobi.showLoading();
                    setTimeout(function() {
                        window.location.href = "index.jsp"
                    }, 5000)
                }
            })
        }
    } catch (b) {
        alert(b.message)
    }
};
Mobi.backOff = function(a) {
    if (Fai.top._manageMode) {
        var b = {};
        b.fun = top.Mobi.saveDesignToCheckUpRedirectUrl;
        b.args = new Array();
        b.args.push("../mcart.jsp");
        if (top.Mobi.checkSaveBar(b, true)) {
            return false
        }
        window.location.href = "index.jsp"
    } else {
        history.go(-1)
    }
};
Mobi.getNewFlowInfo = function(c, a) {
    var b = jm("#module" + c);
    jm.ajax({
        type: "post",
        url: "ajax/flowInfo_h.jsp?cmd=flowMsg",
        data: "id=" + a,
        success: function(e) {
            var j = jm.parseJSON(e);
            if (j.msgList == null || j.msgList.length === 0 || !j.success) {
                b.find(".noflowInfo").eq(0).show()
            } else {
                var k = "",
                    d = [],
                    h = j.msgList.length;
                if (j.msgList.indexOf("http") >= 0) {
                    d.push("<div class='flowInfo'>");
                    d.push("<div class='flowFlag'></div>");
                    d.push("<div><span>" + LS.mall_flowDetails + "</span></div>");
                    d.push("</div>");
                    b.find(".J-newFlowInfo").append(d.join(""))
                } else {
                    for (var f = h - 1; f >= 0; f--) {
                        if (h > 2 && f == h - 3) {
                            break
                        }
                        d.push("<div class='flowInfo'>");
                        d.push("<div class='flowFlag'></div>");
                        d.push("<div><span>" + j.msgList[f].context + "</span></div>");
                        d.push("<div><span class=''>" + j.msgList[f].time + "</span>");
                        if (f == h - 1) {
                            d.push("<span class='icon-flowCurrent'></span>")
                        }
                        d.push("   </div>");
                        d.push("</div>")
                    }
                    b.find(".J-newFlowInfo").append(d.join(""))
                }
            }
            if (j.success) {
                b.find(".J-newFlowInfo").eq(0).click(function() {
                    Mobi.getAllFlowInfo(c, a)
                })
            } else {
                if (j.msg != undefined) {
                    Mobi.ing(j.msg)
                }
            }
        }
    })
};
Mobi.setFlowDivSwipeLis = function() {
    var a, d, c, b;
    jm("#J-flowClickDiv").bind("click", function() {
        Mobi.ing("aaaa")
    });
    jm("#J-flowSwipeDiv").bind("mousedown", function(f) {
        a = f.clientX - jm("#J-flowSwipeDiv").offset().left;
        d = f.clientY - jm("#J-flowSwipeDiv").offset().top;
        jm("#J-flowSwipeDiv").bind("mousemove", function(h) {}).bind("mouseup", function(i) {
            jm("#J-flowSwipeDiv").unbind("mousemove").unbind("mouseup");
            c = i.clientX - jm("#J-flowSwipeDiv").offset().left;
            b = i.clientY - jm("#J-flowSwipeDiv").offset().top;
            Mobi.ing(b);
            var h = i;
            if (a == c && d == b) {
                Mobi.ing(i.offsetX + "," + i.offsetY);
                jm("#J-flowClickDiv").css("margin-left", (i.offsetX - 10) + "px");
                jm("#J-flowClickDiv").css("margin-top", (i.offsetY + 5) + "px");
                jm("#J-flowSwipeDiv").css("display", "none");
                setTimeout(function() {
                    document.getElementById("J-flowClickDiv").click();
                    document.getElementById("J-flowClickDiv").click();
                    document.getElementById("J-flowClickDiv").click();
                    jm("#J-flowSwipeDiv").css("display", "block")
                }, 100)
            }
        })
    })
};
Mobi.getAllFlowInfo = function(d, a) {
    var c = jm("#module" + d),
        e = jm("#flowDetailPanel" + a),
        b = jm("#g_web");
    if (e.length < 1) {
        jm.ajax({
            type: "post",
            url: "ajax/flowInfo_h.jsp?cmd=show",
            data: "id=" + a,
            success: function(f) {
                var h = jm.parseJSON(f);
                b.append(h.flowDetailHtml);
                Mobi.initFlowDetailEvent(d, a)
            }
        })
    }
    setTimeout(function() {
        jm.ajax({
            type: "post",
            url: "ajax/flowInfo_h.jsp?cmd=flowMsg",
            data: "id=" + a,
            success: function(h) {
                var l = jm.parseJSON(h),
                    n = jm("#flowDetailPanel" + a);
                if (l.msgList == null || l.msgList.length === 0 || !l.success) {
                    n.find(".flowDetail .flowDiv .noflowInfo").eq(0).show()
                } else {
                    var m = "",
                        f = [],
                        k = l.msgList.length;
                    n.find(".flowDetail .flowDiv .flowPanel").eq(0).remove();
                    if (l.msgList.indexOf("http") >= 0) {
                        f.push("<div class='flowPanel' style = 'position:relative;padding-top:0.5rem;padding-left:0rem;margin-left:0rem;height:420px;width:100%;overflow:auto;'>");
                        f.push("     <div id='J-flowSwipeDiv' style='position:absolute;width:600px;height:380px;z-index:1;overflow:no;pointer-events:none'>");
                        f.push("     </div>");
                        f.push("     <iframe name='kuaidi100' src='");
                        f.push(l.msgList + "'  ");
                        f.push("width='600' height='380'  marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no'>");
                        f.push("      </iframe>");
                        f.push("      <div class ='J-flowMaskDiv' style='position:absolute;top:0px;left:0px;width:165px;height:380px;z-index:2;'>");
                        f.push("      </div>");
                        f.push("      <div class ='J-flowMaskDiv' style='position:absolute;top:0px;left:185px;width:310px;height:380px;z-index:2;'>");
                        f.push("      </div>");
                        f.push("      <div class ='J-flowMaskDiv' style='position:absolute;top:0px;left:565px;width:35px;height:380px;z-index:2;'>");
                        f.push("      </div>");
                        f.push("      <div class ='J-flowMaskDiv' style='position:absolute;bottom:0px;width:600px;height:160px;z-index:2;'>");
                        f.push("      </div>");
                        f.push("</div>");
                        n.find(".flowDetail .flowDiv").eq(0).append(f.join(""))
                    } else {
                        f.push("<div class='flowPanel'>");
                        for (var j = k - 1; j >= 0; j--) {
                            f.push("<div class='flowInfo'>");
                            f.push("<div class='flowFlag'></div>");
                            f.push("<div><span>" + l.msgList[j].context + "</span></div>");
                            f.push("<div><span>" + l.msgList[j].time + "</span>");
                            if (j == k - 1) {
                                f.push("<span class='icon-flowCurrent'></span>")
                            }
                            f.push("   </div>");
                            f.push("</div>")
                        }
                        f.push("</div>");
                        n.find(".flowDetail .flowDiv").eq(0).append(f.join(""))
                    }
                }
                if (l.success) {} else {
                    if (l.msg != undefined) {
                        Mobi.ing(l.msg)
                    }
                }
                Mobi.initFlowDetailHeight(d, a);
                Mobi.showFlowDetailPanel(d, a)
            }
        })
    }, 100)
};
Mobi.initFlowDetailEvent = function(b, a) {
    var c = jm("#flowDetailPanel" + a);
    moreButton = jm("#moreOrderProductList" + a);
    c.find(".loginHeader .g_close").eq(0).click(function() {
        Mobi.hideFlowDetailPanel(b, a)
    });
    c.bind("scroll", function(d) {
        d.stopPropagation();
        d.cancelBubble = true
    });
    moreButton.click(function() {
        Mobi.moreOrderProductList(b, a)
    })
};
Mobi.showFlowDetailPanel = function(b, a) {
    var c = jm("#flowDetailPanel" + a);
    c.css("margin-left", 0)
};
Mobi.hideFlowDetailPanel = function(b, a) {
    var c = jm("#flowDetailPanel" + a);
    c.css("margin-left", "")
};
Mobi.moreOrderProductList = function(d, b) {
    var e = jm("#orderProductList" + b),
        c = jm("#moreOrderProductList" + b),
        h = jm("#flowDetailPanel" + b);
    var f = (parseInt(e.find(".line_item").eq(0).height()) + parseInt(e.find(".line_item").eq(0).css("padding-top"))) * 2,
        a = parseInt(e.find(".orderProductList_inner").eq(0).height());
    if (c.attr("type") == "0") {
        e.css("height", a + "px");
        c.attr("type", "1");
        if (c.attr("is_cn") == "0") {
            c.removeClass("icon-more");
            c.addClass("icon-less")
        } else {
            c.find(".more").eq(0).hide();
            c.find(".less").eq(0).show()
        }
    } else {
        e.css("height", f + "px");
        c.attr("type", "0");
        if (c.attr("is_cn") == "0") {
            c.removeClass("icon-less");
            c.addClass("icon-more")
        } else {
            c.find(".less").eq(0).hide();
            c.find(".more").eq(0).show()
        }
    }
};
Mobi.initFlowDetailHeight = function(c, a) {
    var d = jm("#orderProductList" + a),
        e = jm("#flowDetailPanel" + a);
    d.css("height", "");
    e.css("height", "");
    e.attr("tmp_h", e.height());
    if (d.find(".line_item").length > 2) {
        var b = jm("#moreOrderProductList" + a);
        b.attr("type", "0");
        if (b.attr("is_cn") == "0") {
            b.removeClass("icon-less");
            b.addClass("icon-more")
        } else {
            b.find(".less").eq(0).hide();
            b.find(".more").eq(0).show()
        }
        d.height((parseInt(d.find(".line_item").eq(0).height()) + parseInt(d.find(".line_item").eq(0).css("padding-top"))) * 2 + "px")
    }
};
Mobi.initFlowButton = function(b) {
    var a = jm("#module" + b);
    a.find(".J-flowView").click(function() {
        var d = jm(this);
        var c = d.attr("_oid");
        Mobi.getAllFlowInfo(b, c)
    })
};
Mobi.initOrderSureButton = function(b) {
    var a = jm("#module" + b);
    a.find(".J-orderSureRpt").click(function() {
        var h = jm(this),
            e = h.parent().parent(),
            d = h.attr("_oid");
        var c = function(j, i) {
            jm.ajax({
                type: "post",
                url: "ajax/order_h.jsp",
                data: "cmd=setStatus&id=" + i + "&status=20",
                error: function() {
                    Mobi.ing(LS.systemError)
                },
                success: function(k) {
                    var l = jm.parseJSON(k);
                    if (l.success) {
                        jm("#mobiPrompt").remove();
                        Mobi.ing(LS.orderSureMsg, 1);
                        setTimeout(function() {
                            document.location.reload()
                        }, 200)
                    } else {
                        Mobi.ing(l.msg)
                    }
                }
            })
        };
        var f = {
            content: LS.orderConfirmMsg,
            callback: function() {
                c(e, d)
            }
        };
        Mobi.prompt(f)
    })
};
Mobi.initOrderCancelButton = function(b) {
    var a = jm("#module" + b);
    a.find(".J-orderCancel").click(function() {
        var h = jm(this),
            e = h.parent().parent(),
            d = h.attr("_oid");
        var c = function(j, i) {
            jm.ajax({
                type: "post",
                url: "ajax/order_h.jsp",
                data: "cmd=setStatus&id=" + i + "&status=25",
                error: function() {
                    Mobi.ing(LS.systemError)
                },
                success: function(k) {
                    var l = jm.parseJSON(k);
                    if (l.success) {
                        jm("#mobiPrompt").remove();
                        Mobi.ing(LS.orderCancel, 1);
                        setTimeout(function() {
                            document.location.reload()
                        }, 200)
                    } else {
                        Mobi.ing(l.msg)
                    }
                }
            })
        };
        var f = {
            textClass: "confirm",
            content: LS.orderCancelMsg,
            callback: function() {
                c(e, d)
            }
        };
        Mobi.prompt(f)
    })
};
Mobi.showShipDetails = function() {
    if (!Fai.top._shipList || !Fai.top._choiceCurrencyVal) {
        return
    }
    var a = Fai.top._shipList;
    var f = Fai.top._choiceCurrencyVal;
    var h = [];
    h.push("<div id='modifyShipDetails'  class='modifyShipDetails'>");
    h.push("<div class='ShipDetailsHeader webHeaderBg'>");
    h.push("<span class='g_close icon-gClose'></span><span class='title pageTitle'>" + LS.mall_ShippingMethod);
    h.push("</span></div>");
    h.push("<div class='profileContent'>");
    for (var c = 0; c < a.length; c++) {
        var b = a[c].show;
        if (b == 0) {
            continue
        }
        var d = a[c].type;
        var e = a[c].price;
        h.push("<div class='count_line wekitBox ShipItem'>");
        h.push("<div class='left'>" + d + "</div>");
        h.push("<div class='right flex1' value='" + e + "' shipType='" + c + "'>" + f + e + "</div>");
        h.push("</div>")
    }
    h.push("</div>");
    h.push("</div>");
    Mobi.changeShipType();
    return h.join("")
};
Mobi.showBanksDetails = function() {
    if (!Fai.top._banksList) {
        return
    }
    var a = Fai.top._banksList;
    var e = "<div id='modifyBankList'  class='modifyBankList'>";
    e += "<div class='BanksDetailHeader webHeaderBg'>";
    e += "<span class='g_close icon-gClose'></span><span class='title pageTitle'>" + LS.receAcctList;
    e += "</span></div>";
    e += "<div class='bankPanelDes'>" + LS.payTips + "</div>";
    e += "<div class='g_separator separatorLine'></div>";
    for (var d = 0; d < a.length; d++) {
        var f = a[d].acct,
            b = a[d].bank,
            c = a[d].name;
        e += "<div class='bankListArea'>";
        e += "<div class='bankList'>";
        e += "<table class='bankListTable'>";
        e += "<tbody>";
        e += "<tr>";
        e += "<td class='bankItemName g_selected'>" + LS.orderDetailBank + " :</td>";
        e += "<td class='bankItemValue'>" + b + "</td>";
        e += "</tr>";
        e += "<tr>";
        e += "<td class='bankItemName g_selected'>" + LS.orderDetailBankName + " :</td>";
        e += "<td class='bankItemValue'>" + c + "</td>";
        e += "</tr>";
        e += "<tr>";
        e += "<td class='bankItemName g_selected'>" + LS.orderDetailBankAcct + " :</td>";
        e += "<td class='bankItemValue'>" + f + "</td>";
        e += "</tr>";
        e += "</tbody>";
        e += "</table>";
        e += "</div>";
        e += "</div>";
        if (d != (a.length - 1)) {
            e += "<div class='g_breakline g_separator separatorLine'></div>"
        }
    }
    e += "</div>";
    Mobi.changeBankList();
    return e
};
Mobi.initOrderPopUpPanel = function() {
    var a = {
        triggerId: "linetitle1",
        panelId: "editCusInfo",
        closeWebPage: "#editCusInfo .g_close"
    };
    Mobi.initWebPage(a);
    setTimeout(function() {
        jm("#editCusInfo").css("overflow-y", "auto");
        jm("#editCusInfo").css("height", "100%")
    }, 400);
    var b = {
        triggerId: "shipLine",
        pageHtml: Mobi.showShipDetails(),
        callback: function() {
            Mobi.showShipDetails()
        },
        closeWebPage: "#modifyShipDetails .g_close"
    };
    Mobi.initWebPage(b);
    b = {
        triggerId: "shipTplLine",
        panelId: "modifyShipTemplate",
        callback: function() {
            Mobi.changeShipType()
        },
        closeWebPage: "#modifyShipTemplate .g_close"
    };
    Mobi.initWebPage(b);
    b = {
        triggerId: "pay_line",
        pageHtml: Mobi.printOnlinePayType(Fai.top._payTypeList),
        callback: function() {},
        closeWebPage: "#pgListDiv .g_close"
    };
    Mobi.initWebPage(b);
    b = {
        triggerId: "banks",
        panelId: "modifyBankList",
        pageHtml: Mobi.showBanksDetails(),
        callback: function() {
            Mobi.changeBankList()
        },
        closeWebPage: "#modifyBankList .g_close"
    };
    Mobi.initWebPage(b);
    var b = {
        triggerId: "orderAddAddrInfo",
        panelId: "editAddrInfo",
        closeWebPage: "#editAddrInfo .g_close"
    };
    Mobi.initWebPage(b);
    b = {
        triggerId: "useItgLine",
        panelId: "editUseItgPanel",
        closeWebPage: "#editUseItgPanel .g_close"
    };
    Mobi.initWebPage(b)
};
Mobi.seeMoreGoodsInOrder = function() {
    jm(".moreGoods").toggle();
    jm(".smText1").toggle();
    jm(".smText2").toggle()
};
Mobi.changePayMode = function(b, a) {
    commentOption = {
        triggerId: "morePayMode",
        pageHtml: c(a),
        callback: function() {},
        closeWebPage: "#pgListDiv .g_close"
    };
    Mobi.initWebPage(commentOption);

    function c(d) {
        var e = [];
        e.push("<div class='pgListDiv' id='pgListDiv'>");
        e.push("<div class='loginHeader webHeaderBg'>");
        e.push("<span class='turnBackIcon g_close icon-gClose'></span>");
        e.push("<span class='title pageTitle'>" + LS.choosePayment + "</span>");
        e.push("</div>");
        e.push("<div id='onlinePayType' class='pgDetail onlinePayType'>");
        e.push("<div id='pgBox' class='pgBox'>");
        jm.each(d, function(f) {
            var j = d[f];
            if (!j.desc) {
                return true
            }
            e.push("<div id=group_" + j.payMode + " class='line'>");
            var h = "";
            if (j.payMode == 10 || j.payMode == 11) {
                h = " _appId='" + j.appId + "' "
            }
            e.push("<div class='pgBoxItem'><a class='pgName payMode'  onclick='Mobi.changePayModeEvent(this);' _orderId='" + b + "'" + h + " _payMode='" + j.payMode + "' _name='" + j.desc + "'>" + j.desc + "</a></div>");
            e.push("</div>")
        });
        e.push("</div></div></div>");
        return e.join("")
    }
};
Mobi.changePayModeEvent = function(f) {
    var d = jm(f).attr("_payMode"),
        a = jm(f).attr("_orderId"),
        e = {};
    if (d == 10 || d == 11) {
        var c = navigator.userAgent.toLowerCase();
        if (!(c.match(/MicroMessenger/i) == "micromessenger")) {
            Mobi.ing("只可在微信客户端可用，请重新选择。");
            return
        }
    }
    e.payMode = d;
    jm.ajax({
        type: "post",
        url: "ajax/order_h.jsp?cmd=setOrder",
        data: "id=" + a + "&info=" + jm.toJSON(e),
        dataType: "json",
        error: function() {
            Mobi.ing(LS.mallStlSubmitError)
        },
        success: function(h) {
            if (h.success) {
                var k = false;
                if (d == 10 || d == 11) {
                    k = true
                }
                var i = b(k);
                if (i) {
                    var j;
                    if (d == 3) {
                        j = "tenpay.jsp?orderId=" + a
                    } else {
                        if (d == 4 || d == 5 || d == 6 || d == 8) {
                            j = "alipay.jsp?orderId=" + a
                        } else {
                            if (d == 7) {
                                j = "paypal.jsp?orderId=" + a
                            } else {
                                if (d == 9) {
                                    j = "cbpay.jsp?orderId=" + a
                                } else {
                                    if (d == 10 || d == 11) {
                                        j = "/wxPay/mdetail.jsp?id=" + a
                                    } else {
                                        document.location.reload();
                                        return
                                    }
                                }
                            }
                        }
                    }
                    document.location.href = j
                }
            } else {
                Mobi.ing(h.msg)
            }
        }
    });

    function b(i) {
        var h = true;
        jm.ajax({
            type: "post",
            url: "ajax/order_h.jsp?cmd=checkOrder",
            data: "orderId=" + a + "&isWX=" + i,
            async: false,
            dataType: "json",
            error: function() {
                Mobi.ing(LS.mallStlSubmitError)
            },
            success: function(j) {
                if (!j.success) {
                    h = false;
                    if (j.rt == -3) {
                        Mobi.ing(LS.mallStlSubmitNotFound)
                    } else {
                        if (j.rt == -9) {
                            Mobi.ing(LS.mallStlSubmitStatusError)
                        } else {
                            if (j.rt == Mobi.MallAjaxErrno.outOfMallAmount) {
                                Mobi.ing(jm.format(LS.mallAmountOverNameList, j.productsName))
                            } else {
                                if (j.rt == Mobi.MallAjaxErrno.OutOfAllowAmount) {
                                    Mobi.ing(jm.format(LS.allowAmountOverNameList, j.productsName))
                                } else {
                                    if (j.rt == Mobi.MallAjaxErrno.payDomainError) {
                                        Mobi.ing(jm.format(LS.mallPayDomainError))
                                    } else {
                                        Mobi.ing(LS.mallStlSubmitError)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return h
    }
};
Mobi.jumpToProductDetail = function(b, a) {
    if (window.sessionStorage) {
        window.sessionStorage._isJumpFromMlist = true;
        window.sessionStorage._jumpMlistUrl = window.location.href;
        if (a == 1 && Mobi.checkWindowSeStgValue(window.sessionStorage._commClickItemId)) {
            window.sessionStorage._commClickItemId = false
        }
    }
    window.location.href = "pd.jsp?pid=" + b
};
Mobi.setWebContainerBoxShow = function() {
    setTimeout(function() {
        jm("#footer").css("visibility", "visible");
        jm("#cusInfo").css("visibility", "visible");
        window.sessionStorage._backFromProDetail = false
    }, 500)
};
Mobi.checkWindowSeStgValue = function(a) {
    if (a && a != "false") {
        return true
    }
    return false
};
Mobi.initCommentBtn = function(d, a) {
    var c = jm("#module" + d),
        b = jm("#g_web");
    c.find(".J-comment").click(function() {
        var j = jm(this),
            f = j.attr("_oid");
        if (window.sessionStorage) {
            window.sessionStorage._commClickOrderId = f
        }
        var h = jm("#pd-ct-panel" + f);
        if (h.length > 0) {
            h.css("margin-left", 0);
            return
        }
        var e = false;
        if (window.sessionStorage) {
            if (Mobi.checkWindowSeStgValue(window.sessionStorage._backFromProDetail)) {
                e = true
            }
        }
        var i = {
            oid: f,
            marginFlag: e
        };
        jm.ajax({
            type: "post",
            url: "ajax/order_h.jsp?cmd=getCtPanel",
            data: i,
            success: function(k) {
                var l = jm.parseJSON(k);
                h = jm(l.html);
                b.append(h);
                setTimeout(function() {
                    h.css("margin-left", 0)
                }, 100);
                h.bind("scroll", function(m) {
                    m.stopPropagation();
                    m.cancelBubble = true
                });
                h.find(".loginHeader .g_close").eq(0).click(function() {
                    if (h.find(".J-ct-item").length == 0) {
                        j.removeClass("orderButton").addClass("comment-txt  orderButtonHas orderButton").text(LS.commentExist)
                    }
                    _hidePanel("pd-ct-panel" + f)
                });
                h.find(".J-ct-item").click(function() {
                    var q = jm(this),
                        p = q.attr("_iid"),
                        n = q.attr("_pid");
                    if (window.sessionStorage) {
                        window.sessionStorage._commClickItemId = p
                    }
                    var o = jm("#pd-item-" + f + "-" + p);
                    if (o.length > 0) {
                        o.css("margin-left", 0);
                        var m = o.find(".J-ct-area");
                        if (typeof(m) != "undefined" && m != null && m.length > 0) {
                            m[0].focus()
                        }
                        return
                    }
                    _initItemCommentPanel(f, p, q, h, n)
                });
                if (window.sessionStorage) {
                    if (Mobi.checkWindowSeStgValue(window.sessionStorage._commClickItemFlag)) {
                        Mobi.checkWindowSeStgValue(window.sessionStorage._commClickItemFlag);
                        if (Mobi.checkWindowSeStgValue(window.sessionStorage._commClickItemId)) {
                            setTimeout(function() {
                                jm(".J-ct-item[_iid='" + window.sessionStorage._commClickItemId + "']").click()
                            }, 30)
                        }
                        window.sessionStorage._commClickItemFlag = false
                    }
                }
            }
        })
    });
    if (window.sessionStorage) {
        if (Mobi.checkWindowSeStgValue(window.sessionStorage._backFromProDetail)) {
            if (Mobi.checkWindowSeStgValue(window.sessionStorage._commClickOrderId)) {
                setTimeout(function() {
                    jm(".J-comment[_oid='" + window.sessionStorage._commClickOrderId + "']").click();
                    window.sessionStorage._commClickItemFlag = true;
                    Mobi.setWebContainerBoxShow()
                }, 120)
            }
        } else {
            Mobi.setWebContainerBoxShow()
        }
    } else {
        Mobi.setWebContainerBoxShow()
    }
    _hidePanel = function(e) {
        jm("#" + e).css("margin-left", "")
    };
    _initItemCommentPanel = function(o, w, h, r, t) {
        var s = h.attr("_iprice"),
            z = h.attr("_iname"),
            p = h.attr("_ipath"),
            A = h.attr("_maxlen"),
            q = h.attr("_minlen"),
            m = h.attr("_showflag"),
            f = h.attr("_comment"),
            x = h.attr("_pathList"),
            B = h.attr("_star");
        var C = "' class='ct-panel order-ext-panel'>";
        if (window.sessionStorage) {
            if (Mobi.checkWindowSeStgValue(window.sessionStorage._backFromProDetail)) {
                C = "' class='ct-panel order-ext-panel' style='margin-left:0;'>";
                window.sessionStorage._backFromProDetail = false
            }
        }
        if (typeof(m) != "undefined" && m != null) {
            if (typeof(x) != "undefined" && x != null) {
                x = jm.parseJSON(x)
            }
            var v = [];
            var u = "";
            if (typeof(x) != "undefined" && x != null && x.length > 0) {
                v.push("<div class='ct-s-content-m'>");
                v.push("<table>");
                v.push("<tr>");
                for (var n = 0; n < x.length; n++) {
                    v.push("<td class='s-img-f-tb'>");
                    v.push("<table class='s-img-tb' cellpadding='0' cellspacing='0'>");
                    v.push("<tr>");
                    v.push("<td class='s-img-bd' valign='middle'   align='center'>");
                    v.push("<img src='" + x[n].path + "'  class='s-img-set'>");
                    v.push("</td>");
                    v.push("</tr>");
                    v.push("</table>");
                    v.push("</td>")
                }
                v.push("</tr>");
                v.push("</table>");
                v.push("</div>")
            }
            if (v != "[]") {
                u = v.join("")
            }
            var k = [];
            if (a) {
                k.push("<div class='l-comm-star'>");
                for (var y = 0; y < 5; y++) {
                    if (y < B) {
                        k.push("<li class='faisco-icons-star3 select_more'></li>")
                    } else {
                        k.push("<li class='faisco-icons-star3 select_less'></li>")
                    }
                }
                k.push("</div>")
            }
            var e = ["<div id='pd-item-", o, "-", w, C, "<div class='loginHeader webHeaderBg'>", "<span class='g_close icon-gClose'></span>", "<span class='title  pageTitle' style='padding-right:0px;'>", LS.commentPub, "</span>", "<span class='homeIcon icon-homeIcon' onclick='window.location.href=\"index.jsp\"'></span>", "</div>", "<div class='l-comm-item'>", "<div class='d-click' onclick=Mobi.jumpToProductDetail('" + t + "',2)></div>", "<div class='i-block1 i-block1-w'>", "<img class='b-comm-img' src='", p, "' alt=''/>", "</div>", "<div class='i-block2'>", "<div class='pd-n pd-n-p' >", jm.encodeHtml(z), "</div>", "</div>", "</div>", "<div class='l-s-item'>", "<div class='tipImg'>", "</div>", "<div class='ct-s-content'>", f, "</div>", u, k.join(""), "</div>", "</div>", ];
            e = jm(e.join(""));
            b.append(e);
            setTimeout(function() {
                e.css("margin-left", 0);
                var F = e.find(".ct-s-content-m");
                if (typeof(F) != "undefined" && F != null) {
                    for (var G = 0; G < F.length; G++) {
                        var E = F.eq(G)[0].querySelectorAll("img");
                        if (typeof(E) != "undefined" && E != null && E.length > 0) {
                            Mobi.bindCommImgShow(E, false, 0)
                        }
                    }
                }
            }, 100);
            e.bind("scroll", function(i) {
                i.stopPropagation();
                i.cancelBubble = true
            });
            e.find(".loginHeader .g_close").eq(0).click(function() {
                _hidePanel("pd-item-" + o + "-" + w)
            })
        } else {
            var l = 5;
            if (typeof(_commUploadImgParam) != "undefined" && _commUploadImgParam != null) {
                l = _commUploadImgParam.upImgMaxNum
            }
            var k = [];
            if (a) {
                k = ["<div class='l-star-list J-star-list'>", "<li class='faisco-icons-star3'></li>", "<li class='faisco-icons-star3'></li>", "<li class='faisco-icons-star3'></li>", "<li class='faisco-icons-star3'></li>", "<li class='faisco-icons-star3'></li>", "<li class='score-tip'></li>", "</div>"]
            }
            var e = ["<div id='pd-item-", o, "-", w, C, "<div class='loginHeader webHeaderBg'>", "<span class='g_close icon-gClose'></span>", "<span class='title  pageTitle' style='padding-right:0px;'>", LS.commentPub, "</span>", "<span class='homeIcon icon-homeIcon' onclick='window.location.href=\"index.jsp\"'></span>", "</div>", "<div class='l-comm-item'>", "<div class='d-click'  onclick=Mobi.jumpToProductDetail('" + t + "',2)></div>", "<div class='i-block1 i-block1-w'>", "<img class='b-comm-img' src='", p, "' alt=''/>", "</div>", "<div class='i-block2'>", "<div class='pd-n pd-n-p'>", jm.encodeHtml(z), "</div>", "</div>", "</div>", k.join(""), "<div class='l-area-item'>", "<div class='tipImg'></div>", "<textarea class='J-ct-area g_textArea comm_input' placeholder='", LS.commentUpInTip, "' minlength='", q, "' maxlength='", A, "'></textarea>", "</div>", "<div class='img-area-item'>", "<table cellpadding='0' cellspacing='0' id='msg_add_img_tb_" + _commUploadImgParam.countNumber + "' >", "<tr>", "<td id='msgBoardAddImgBtn_" + _commUploadImgParam.countNumber + "' class='comm-find-tb' maxNum='" + l + "'> ", "<div  id='comm-img-swfu-placeholder-" + _commUploadImgParam.countNumber + "'>", "</td> ", "</tr>", "</table>", "</div>", "<div class='l-sb-item'>", "<div class='J-ct-submit g_button'>", LS.commentSumit, "</div>", "</div>", "</div>", ];
            e = jm(e.join(""));
            b.append(e);
            Mobi.setStarSelect();
            setTimeout(function() {
                e.css("margin-left", 0)
            }, 100);
            if (_commUploadImgParam.isIE == "true") {
                var j = _commUploadImgParam.countNumber;
                Mobi.mobiCommUploadImgSWF("comm-img-swfu-placeholder-" + _commUploadImgParam.countNumber, _commUploadImgParam.upImgMaxSize, _commUploadImgParam.imgType, _commUploadImgParam.upImgMaxNum, j)
            } else {
                Mobi.mobiCommUploadImgHtml("comm-img-swfu-placeholder-" + _commUploadImgParam.countNumber, _commUploadImgParam.upImgMaxSize, _commUploadImgParam.imgType, _commUploadImgParam.siteMainDomain)
            }
            e.bind("scroll", function(i) {
                i.stopPropagation();
                i.cancelBubble = true
            });
            e.find(".loginHeader .g_close").eq(0).click(function() {
                _hidePanel("pd-item-" + o + "-" + w)
            });
            var D = e.find(".J-ct-area");
            D[0].focus();
            e.find(".J-ct-submit").click(function() {
                if (Fai.top._manageMode) {
                    Mobi.ing("您目前处于网站管理状态，请先退出再登录");
                    return
                }
                var M = jm.trim(D.val());
                if (typeof(M) != "string" || "" == M) {
                    D[0].focus();
                    Mobi.ing(LS.commentNotEmpty);
                    return
                }
                var K = e.find(".img-area-item").find("img");
                var F = [];
                if (typeof(K) != "undefined" && K != null) {
                    var I = K.length;
                    if (I > 0) {
                        for (var J = 0; J < I; J++) {
                            var O = K.eq(J);
                            if (O != null && O != "undefined") {
                                var G = {};
                                var E = O.attr("_id");
                                var P = O.attr("_name");
                                var N = O.attr("_file_size");
                                var Q = O.attr("_file_id");
                                G.imgId = E;
                                G.imgName = P;
                                G.imgSize = N;
                                G.tempFileId = Q;
                                F.push(G)
                            }
                        }
                    }
                }
                var L = jm(".J-star-list").attr("_star");
                if (!L) {
                    L = 5
                }
                var H = {
                    oid: o,
                    iid: w,
                    commImgList: JSON.stringify(F),
                    comment: M,
                    star: L
                };
                jm.ajax({
                    type: "post",
                    url: "ajax/order_h.jsp?cmd=addPC",
                    data: H,
                    error: function() {
                        Mobi.ing(LS.systemError)
                    },
                    success: function(i) {
                        var S = jm.parseJSON(i);
                        if (S.success) {
                            Mobi.ing(LS.submitSuccess);
                            pdItem = r.find(".J-l-item-" + w);
                            pdItem.find(".J-ct-item").remove();
                            pdItem.append("<div class='orderButton orderButtonHas' _star=" + L + " _iid=" + w + " _iprice='" + s + "' _ipath='" + p + "' _showFlag='check'  _iname='" + z + "' _pid='" + t + "'  _comment='" + jm.encodeHtml(M) + "' _pathList='" + JSON.stringify(S.imgsPathStr) + "'>" + LS.commentView + "</div>");
                            pdItem.find(".orderButton").click(function() {
                                var X = jm(this),
                                    W = X.attr("_iid"),
                                    U = X.attr("_pid");
                                var V = jm("#pd-item-" + o + "-" + W);
                                if (V.length > 0) {
                                    V.css("margin-left", 0);
                                    var T = V.find(".J-ct-area");
                                    if (typeof(T) != "undefined" && T != null && T.length > 0) {
                                        T[0].focus()
                                    }
                                    return
                                }
                                _initItemCommentPanel(o, W, X, r, U)
                            });
                            e.remove()
                        } else {
                            var R = "";
                            switch (S.rt) {
                                case 1:
                                    R = LS.commentError;
                                    break;
                                case 2:
                                    R = LS.mallStlSubmitNotFound;
                                    break;
                                case 3:
                                    R = LS.commentError;
                                    break;
                                case 5:
                                    R = LS.paramError;
                                    break;
                                case 7:
                                    R = LS.commentClosed;
                                    break;
                                case 8:
                                    R = LS.commentExist;
                                    break;
                                case 9:
                                    R = LS.commentCountLimit;
                                    break;
                                default:
                                    R = LS.systemError;
                                    break
                            }
                            Mobi.ing(R)
                        }
                    }
                })
            })
        }
    }
};
Mobi.initcommUploadImgParam = function(c, d, i, j, f, h, k, b) {
    _commUploadImgParam = {
        upImgMaxSize: c,
        imgType: d,
        upImgMaxNum: i,
        jsJquery: j,
        jsUpload: f,
        countNumber: 2,
        swfUpload: k,
        isIE: b,
        swfObjList: [],
        siteMainDomain: h
    };
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.src = j;
    a.onload = function() {
        var l = document.createElement("script");
        if (b == "true") {
            l.src = k
        } else {
            l.src = f
        }
        l.type = "text/javascript";
        e.appendChild(l)
    };
    var e = document.documentElement || document.body;
    e.appendChild(a)
};
Mobi.showSingalInstCommImg = function(b) {
    var a = $("#msg_add_img_tb_" + b).eq(0)[0].querySelectorAll("img");
    if (typeof(a) != "undefined" && a != null && a.length > 0) {
        Mobi.bindCommImgShow(a, true, b)
    }
};
Mobi.mobiCommUploadImgSWF = function(d, b, h, a, f) {
    var e = h.split(",");
    var c = {
        file_post_name: "Filedata",
        upload_url: "/ajax/commUpsiteimg_h.jsp",
        button_placeholder_id: d,
        file_size_limit: b + "MB",
        button_image_type: 3,
        file_queue_limit: 1,
        button_width: "50px",
        button_height: "50px",
        button_cursor: SWFUpload.CURSOR.HAND,
        button_image_url: _resRoot + "/image/mobi/msgUpImg/upload.png",
        requeue_on_error: false,
        post_params: {
            ctrl: "Filedata",
            app: 21,
            type: 0,
            fileUploadLimit: a
        },
        file_types: e.join(";"),
        file_dialog_complete_handler: function(i) {
            this._allSuccess = false;
            this.startUpload()
        },
        file_queue_error_handler: function(j, i, k) {
            switch (i) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    Mobi.ing(LS.mobiFormSubmitCheckFileSizeErr, true);
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    Mobi.ing(LS.mobiFormSubmitFileUploadNotAllow, true);
                    break;
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadOneTimeNum, "1"), true);
                    break;
                default:
                    Mobi.ing(LS.mobiFormSubmitFileUploadReSelect, true);
                    break
            }
        },
        upload_success_handler: function(j, i) {
            var k = jQuery.parseJSON(i);
            this._allSuccess = k.success;
            this._sysResult = k.msg;
            if (k.success) {
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(j.name)), true)
                }, 1800);
                Mobi.onCommFileUploadEvent("upload", k, f)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + j.name + "   " + k.msg)
            }
        },
        upload_error_handler: function(j, i, k) {
            if (i == -280) {
                Mobi.ing(LS.mobiFormSubmitFileUploadFileCancle, false)
            } else {
                if (i == -270) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadFileExist, jm.encodeHtml(j.name)), true)
                } else {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(j.name)))
                }
            }
        },
        upload_complete_handler: function(i) {
            if (i.filestatus == SWFUpload.FILE_STATUS.COMPLETE) {
                if (typeof(_commUploadImgParam.swfObjList) == "undefined") {
                    _commUploadImgParam.swfObjList = []
                }
                swfObj = _commUploadImgParam.swfObjList[f];
                setTimeout(function() {
                    swfObj.startUpload()
                }, swfObj.upload_delay)
            } else {
                if (i.filestatus == SWFUpload.FILE_STATUS.ERROR) {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(i.name)))
                }
            }
        },
        upload_start_handler: function(i) {
            Mobi.ing(LS.mobiFormSubmitFileUploadPrepare, false)
        },
        view_progress: function(i, l, k, j) {
            var j = Math.ceil((l / k) * 100);
            if (isNaN(j)) {
                return
            }
            if (j == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + j + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + j + "%", false)
            }
        }
    };
    if (typeof(_commUploadImgParam.swfObjList) == "undefined") {
        _commUploadImgParam.swfObjList = []
    }
    _commUploadImgParam.swfObjList[f] = SWFUploadCreator.create(c);
    _commUploadImgParam.countNumber++
};
Mobi.mobiCommUploadImgHtml = function(h, c, d, f) {
    var a = d.split(",");
    var j = _commUploadImgParam.countNumber;
    var i = {
        siteFree: false,
        updateUrlViewRes: "",
        auto: true,
        fileTypeExts: a.join(";"),
        multi: false,
        fileSizeLimit: c * 1024 * 1024,
        breakPoints: true,
        saveInfoLocal: false,
        showUploadedPercent: true,
        removeTimeout: 9999999,
        getFileSizeUrlFlag: true,
        post_params: {
            app: 21,
            type: 0,
            fileUploadLimit: c,
            isSiteForm: true
        },
        isOrnotButton: true,
        buttonText: "",
        uploader: "http://" + f + '/ajax/commUpsiteimg_h.jsp?cmd="mobiUpload"',
        onUploadStart: function(l) {
            _uTime = new Date().getTime()
        },
        onUploadSuccess: function(m, o) {
            var n = jm.parseJSON(o);
            if (n.success) {
                var l = {
                    status: "end",
                    id: m.id,
                    title: "上传成功。"
                };
                e(l);
                setTimeout(function() {
                    Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSucess, jm.encodeHtml(m.name)), true)
                }, 1800);
                Mobi.onCommFileUploadEvent("upload", n, j)
            } else {
                var l = {
                    status: "end",
                    id: m.id,
                    title: n.msg
                };
                e(l);
                Mobi.ing(LS.mobiFormSubmitFileUploadFile + m.name + "   " + n.msg)
            }
        },
        onUploadError: function(l, m) {
            jm("#progressBody_ " + l.id).remove();
            jm("#progressWrap_" + l.id).remove();
            Mobi.ing(jm.format(LS.mobiFormSubmitFileUploadSvrBusy, jm.encodeHtml(l.name)));
            _uTime = new Date().getTime() - _uTime
        },
        view_progress: function(l) {
            var l = Math.ceil(l);
            if (isNaN(l)) {
                return
            }
            if (l == 100) {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + l + "%", true)
            } else {
                Mobi.ing(LS.mobiFormSubmitFileUploadIng + l + "%", false)
            }
        }
    };

    function e(l) {
        if (isNaN(Math.round(l.percent))) {
            return
        }
        if (l.status == "start") {
            var m = ['<div id="progressBody_' + l.id + '" class="bodyDisable"></div>', '<div id="progressWrap_' + l.id + '" class="bodyProgressWrap">', '<div class="progressCenter"></div>', '<div class="progressIngBody">', '<div id="progressTitle' + l.id + '" class="progressIngTitle">' + l.title + "</div>", '<div class="progressIngMission">', '<div class="mission"><div id="progress' + l.id + '" class="progress" style="width:1%;"></div></div>', '<div id="progressNum' + l.id + '" class="progressNum">0%</div>', "</div>", '<div class="progressInfo"><span id="progressTips' + l.id + '" class="progressFileSize"></span><a class="progressCancel" href="javascript:uploadCancel(\'' + l.id + "');\">取消</a></div>", "</div>", "</div>"];
            jm("body").append(m.join(""))
        } else {
            if (l.status == "ing") {
                jm("#progressTitle" + l.id).text(l.title);
                jm("#progress" + l.id).css("width", Math.round(l.percent) + "%");
                jm("#progressNum" + l.id).html(Math.round(l.percent) + "%")
            } else {
                if (l.status == "end") {
                    jm("#progressTitle" + l.id).text(l.title);
                    jm("#progressBody_" + l.id).remove();
                    jm("#progressWrap_" + l.id).remove()
                } else {
                    if (l.status == "error") {
                        jm("#progress" + l.id).addClass("progressError")
                    }
                }
            }
        }
    }
    upload = jm("#" + h).uploadify(i);
    var k = "file_upload_" + _commUploadImgParam.countNumber;
    var b = "select_btn_" + _commUploadImgParam.countNumber;
    jm("#file_upload_1-button").attr("id", k);
    jm("#select_btn_1").attr("id", b);
    _commUploadImgParam.countNumber++
};
Mobi.onCommFileUploadEvent = function(k, h, d) {
    if (k == "upload") {
        var c = h.id;
        var j = h.name;
        var f = h.size;
        var e = h.path;
        var l = h.pathSmall;
        var b = h.fileId;
        var a = h.width;
        var i = h.height;
        Mobi.mListCommImgTableCtrl(l, j, c, f, b, d)
    }
};
Mobi.mListCommImgTableCtrl = function(l, a, b, i, d, h) {
    var j = $("#msg_add_img_tb_" + h).eq(0);
    var k = j.find(".comm-find-tb").length;
    var e = j.find(".comm-find-tb").eq(k - 1);
    var c = e.attr("maxNum");
    if (parseInt(k - 1) >= c) {
        return
    }
    var f = [];
    f.push("<td  class='comm-find-tb'>");
    f.push("<table style='width:100%; height:100%; table-layout:fixed;' cellpadding='0'  cellspacing='0'>");
    f.push(" <tr>");
    f.push("    <td valign='middle'   align='center' class='comm-show-td-bd'>");
    f.push("      <img src='" + l + "'  alt=''  _name='" + a + "' _id='" + b + "' _file_size='" + i + "' _file_id='" + d + "' class='comm-up-set'>");
    f.push("     </td>");
    f.push(" </tr>");
    f.push("</table>");
    f.push("<div class='comm-up-div'>");
    f.push("  <span onclick=Mobi.mListCommTableImgDelete(this,'" + h + "') class='comm-up-div-set'/>");
    f.push("</div>");
    f.push("</td>");
    e.before(f.join(""));
    k = j.find(".comm-find-tb").length;
    if (parseInt(k - 1) >= c) {
        e.css("display", "none")
    }
    Mobi.showSingalInstCommImg(h)
};
Mobi.mListCommTableImgDelete = function(a, c) {
    var e = jm("#msg_add_img_tb_" + c).eq(0);
    var b = e.find(".comm-find-tb").length;
    for (var d = 0; d < b; d++) {
        if (e.find(".comm-find-tb").eq(d).find(".comm-up-div-set")[0] === a) {
            e.find(".comm-find-tb").eq(d).remove();
            break
        }
    }
    b = e.find(".comm-find-tb").length;
    var f = e.find(".comm-find-tb").eq(b - 1);
    if (b <= f.attr("maxNum")) {
        f.css("display", "block")
    }
    Mobi.showSingalInstCommImg(c)
};
Mobi.calculate = function(i, f, j) {
    var l = 0,
        d = 0,
        b = 0;
    try {
        d = i.toString().split(".")[1].length
    } catch (c) {
        d = 0
    }
    try {
        b = f.toString().split(".")[1].length
    } catch (c) {
        b = 0
    }
    switch (j) {
        case 0:
            var k = Math.pow(10, Math.max(d, b));
            l = (i * k + f * k) / k;
            break;
        case 1:
            var a;
            var k = Math.pow(10, Math.max(d, b));
            a = (d >= b) ? d : b;
            l = ((i * k - f * k) / k).toFixed(a);
            break;
        case 2:
            l = h(i, f);
            break;
        case 3:
            l = h((Number(i.toString().replace(".", "")) / Number(f.toString().replace(".", ""))), Math.pow(10, b - d));
            break
    }
    return l;

    function h(o, m) {
        var n = 0;
        try {
            n += o.toString().split(".")[1].length
        } catch (p) {}
        try {
            n += m.toString().split(".")[1].length
        } catch (p) {}
        return Number(o.toString().replace(".", "")) * Number(m.toString().replace(".", "")) / Math.pow(10, n)
    }
};
Mobi.newsCommentAddCom = function() {
    var e = jm.trim(jm("#newsCommentCreator").val());
    var d = jm("#newsCommentCreator").attr("minlength");
    var i = jm("#newsCommentInput").val();
    var a = jm("#newsCommentInput").attr("minlength");
    var f = jm("#validateCodeInput").val();
    var b = jm("#newsCommentInput").attr("newsId");
    if (typeof(e) != "string") {
        Mobi.ing(LS.creatorTips);
        return
    }
    if (typeof(i) != "string" || "" == i) {
        Mobi.ing(LS.commentNotEmpty);
        return
    }
    if (i.length < a) {
        Mobi.ing(jm.format(LS.commentLenTips, jm.encodeHtml(a)));
        return
    }
    if (typeof(f) != "string" || "" == f) {
        Mobi.ing(LS.memberInputCaptcha);
        return
    }
    var h = "ajax/newsComment_h.jsp?cmd=submitComment";
    var c = {
        validateCode: f,
        newsId: b,
        creator: e,
        comment: i
    };
    Mobi.ing(LS.siteFormSubmitIng);
    jm.ajax({
        type: "POST",
        url: h,
        data: c,
        error: function() {
            Mobi.ing(LS.systemError);
            jm("#captchaChange").click()
        },
        success: function(j) {
            var l = jm.parseJSON(j);
            if (!l || !l.success) {
                jm("#captchaChange").click()
            }
            switch (l.msg) {
                case 1:
                    Mobi.ing(LS.captchaError);
                    break;
                case 2:
                    Mobi.ing(LS.creatorError);
                    break;
                case 3:
                    Mobi.ing(LS.commentError);
                    break;
                case 4:
                    Mobi.getCommentDiv("news", b);
                    Mobi.ing(LS.submitSuccess, 1);
                    break;
                case 5:
                    Mobi.ing(LS.paramError);
                    break;
                case 6:
                    var k = jm.encodeUrl(window.location.href);
                    window.location.href = "login.jsp?returnUrl=" + k + "&errno=11";
                    break;
                case 7:
                    Mobi.ing(LS.commentClosed);
                    break;
                case 8:
                    Mobi.ing(LS.commentSubmitError);
                    break;
                case 9:
                    Mobi.ing(LS.commentCountLimit);
                    break;
                default:
            }
        }
    })
};
Mobi.initMixNews = function(c) {
    var b = jm("#newsList" + c.moduleId);
    var f = b.children().eq(0);
    var e = f.find(".mixNewsStyleTitleContainer  a");
    var d = parseInt(f.width());
    var a = parseInt(c.imgWidth);
    var h = d - a - 45;
    e.css({
        width: h + "px"
    })
};
Mobi.showMore = function() {
    var b = document.getElementById("sharePanel");
    var a = document.getElementById("showOrHide");
    if (b && b.style) {
        if (b.style.height == "auto") {
            b.style.height = "";
            a.className = a.className.replace("hideIcon", "showIcon");
            b.style.background = ""
        } else {
            b.style.height = "auto";
            a.className = a.className.replace("showIcon", "hideIcon")
        }
    }
};
Mobi.showBg = function() {
    Mobi.mobiHideScroll();
    var b = document.body.clientHeight;
    var f = document.body.clientWidth;
    var i = document.body;
    var j = document.createElement("div");
    var h = document.createElement("div");
    var d = document.createElement("div");
    j.id = "shareParentDiv";
    h.id = "shareFullbg";
    h.className = "shareFullbg";
    d.id = "shareTipsDiv";
    d.className = "shareTips";
    i.appendChild(j);
    var a = document.getElementById("shareParentDiv");
    a.appendChild(h);
    a.appendChild(d);
    var e = document.getElementById("shareFullbg");
    var c = document.getElementById("shareTipsDiv");
    e.style.height = b + "px";
    e.style.width = f + "px";
    e.style.position = "fixed";
    e.onclick = function() {
        var k = document.getElementById("shareParentDiv");
        Mobi.mobiShowScroll();
        k.parentNode.removeChild(k)
    }
};
Mobi.initNewsEvent = function(b, i, f) {
    if (!b) {
        return
    }
    var d = document.getElementById("productDetailHeader" + b),
        a = document.getElementById("newsDetailShare"),
        c = d.querySelector(".icon-gClose");
    var e = {
        triggerId: "newsDetailShare",
        pageBg: true,
        pageHtml: Mobi.sharePage(Fai.top._shareData),
        direction: "bottom",
        callback: function() {
            Mobi.initProductSwipe("shareListShowSwipe")
        },
        closeWebPage: "#shareListPanel .shareListCancel"
    };
    Mobi.initWebPage(e);
    jm(c).bind("click", function() {
        if (window.history.length <= 1) {
            window.location.href = "index.jsp"
        } else {
            if (f && f.length > 0) {
                window.location.href = f
            } else {
                history.back();
                var k = setTimeout(function() {
                    window.location.href = "index.jsp";
                    k = null
                }, 500)
            }
        }
        return false
    });
    Mobi.scrollFadeIn("productDetailHeader" + b, "newsFigure" + b, i);
    var h = "ajax/newsComment_h.jsp?cmd=submitNewComment";
    var j = {
        triggerId: "postComment",
        panelId: "userCommentPanel",
        callback: function() {
            Mobi.postUserComment(h)
        },
        closeWebPage: "#userCommentPanel .userCommentGoBack"
    };
    Mobi.initWebPage(j);
    Mobi.hidePlaceholder()
};
Mobi.setNewDetailPanelHeight = function() {
    var d = jm("#newsDetailPanel")[0].offsetHeight;
    var a = jm(".newsBottom");
    var b = 0;
    if (a.length > 0) {
        b = jm(".newsBottom")[0].offsetHeight
    } else {
        var c = jm("#g_web").css("paddingTop");
        if (c) {
            c = Number(c.substring(0, c.length - 2));
            if (!isNaN(c)) {
                d = d - c
            }
        }
    }
    jm(".formMiddle").css({
        height: (d) + "px",
        paddingBottom: "0",
        border: "none"
    });
    jm(".newsDetail").css({
        height: (d - b) + "px"
    })
};
Mobi.getCommentsInfo = function(c, e, d, b) {
    if (!c) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    if (isNaN(e)) {
        Mobi.ing(LS.mallStlSubmitError);
        return
    }
    var a = "id=" + e;
    if (!isNaN(d)) {
        jm(".getMoreComments").remove();
        a += ("&pageno=" + d)
    }
    Mobi.showLoading();
    jm.ajax({
        type: "post",
        url: "ajax/other_h.jsp?cmd=" + c,
        data: a,
        error: function() {
            Mobi.closeLoading();
            Mobi.ing(LS.systemError)
        },
        success: function(h) {
            var i = jm.parseJSON(h);
            if (i.success) {
                jm("#newsDetailPanel").append(i.html)
            }
            Mobi.closeLoading();
            Mobi.hidePlaceholder();
            if (jm("#postComment").length > 0 && jm("#module" + b).length > 0) {
                var f = jm("#g_web").height();
                if ((f - jm("#webContainerBox").height()) > 5) {
                    jm("#webContainerBox").css("height", f + "px");
                    jm("#module" + b).css("height", f + "px").find(".formMiddle").css("height", f + "px")
                }
            }
        }
    })
};
Mobi.getNewsCommentAjaxPagenation = function(c, b) {
    if (!c) {
        return
    }
    var a = "id=" + c + "&pageno=" + b + "&ajaxPage=" + true;
    jm.ajax({
        type: "post",
        url: "ajax/other_h.jsp?cmd=newNews",
        data: a,
        error: function() {
            Mobi.ing("error")
        },
        success: function(d) {
            var h = jm.parseJSON(d);
            if (!h.html) {
                h.html = ""
            }
            jm("#newsDetailPanel .commentBox").remove();
            jm("#newsDetailPanel").append(h.html);
            var f = parseInt(document.getElementById("commentBox").offsetTop);
            var e = parseInt(jm(".productDetailHeader").height());
            var i = f - e;
            window.scrollTo(0, i)
        }
    })
};
Mobi.changeTheUrlToAdaptApple = function(a, d) {
    var c;
    if (a != "" && a != null) {
        var b = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(b)) {
            if (d != "" && d != null) {
                c = d
            }
        } else {
            c = a
        }
        window.location.href = c
    }
};
var site_cityUtil = (function() {
    var s = {
        "110000": ["北京", "1"],
        "110100": ["北京市", "110000"],
        "110101": ["东城区", "110100"],
        "110102": ["西城区", "110100"],
        "110103": ["崇文区", "110100"],
        "110104": ["宣武区", "110100"],
        "110105": ["朝阳区", "110100"],
        "110106": ["丰台区", "110100"],
        "110107": ["石景山区", "110100"],
        "110108": ["海淀区", "110100"],
        "110109": ["门头沟区", "110100"],
        "110111": ["房山区", "110100"],
        "110112": ["通州区", "110100"],
        "110113": ["顺义区", "110100"],
        "110114": ["昌平区", "110100"],
        "110115": ["大兴区", "110100"],
        "110116": ["怀柔区", "110100"],
        "110117": ["平谷区", "110100"],
        "110228": ["密云县", "110100"],
        "110229": ["延庆县", "110100"],
        "110230": ["其它区", "110100"],
        "120000": ["天津", "1"],
        "120100": ["天津市", "120000"],
        "120101": ["和平区", "120100"],
        "120102": ["河东区", "120100"],
        "120103": ["河西区", "120100"],
        "120104": ["南开区", "120100"],
        "120105": ["河北区", "120100"],
        "120106": ["红桥区", "120100"],
        "120107": ["塘沽区", "120100"],
        "120108": ["汉沽区", "120100"],
        "120109": ["大港区", "120100"],
        "120110": ["东丽区", "120100"],
        "120111": ["西青区", "120100"],
        "120112": ["津南区", "120100"],
        "120113": ["北辰区", "120100"],
        "120114": ["武清区", "120100"],
        "120115": ["宝坻区", "120100"],
        "120116": ["滨海新区", "120100"],
        "120221": ["宁河县", "120100"],
        "120223": ["静海县", "120100"],
        "120225": ["蓟县", "120100"],
        "120226": ["其它区", "120100"],
        "130000": ["河北省", "1"],
        "130100": ["石家庄市", "130000"],
        "130102": ["长安区", "130100"],
        "130103": ["桥东区", "130100"],
        "130104": ["桥西区", "130100"],
        "130105": ["新华区", "130100"],
        "130107": ["井陉矿区", "130100"],
        "130108": ["裕华区", "130100"],
        "130121": ["井陉县", "130100"],
        "130123": ["正定县", "130100"],
        "130124": ["栾城县", "130100"],
        "130125": ["行唐县", "130100"],
        "130126": ["灵寿县", "130100"],
        "130127": ["高邑县", "130100"],
        "130128": ["深泽县", "130100"],
        "130129": ["赞皇县", "130100"],
        "130130": ["无极县", "130100"],
        "130131": ["平山县", "130100"],
        "130132": ["元氏县", "130100"],
        "130133": ["赵县", "130100"],
        "130181": ["辛集市", "130100"],
        "130182": ["藁城市", "130100"],
        "130183": ["晋州市", "130100"],
        "130184": ["新乐市", "130100"],
        "130185": ["鹿泉市", "130100"],
        "130186": ["其它区", "130100"],
        "130200": ["唐山市", "130000"],
        "130202": ["路南区", "130200"],
        "130203": ["路北区", "130200"],
        "130204": ["古冶区", "130200"],
        "130205": ["开平区", "130200"],
        "130207": ["丰南区", "130200"],
        "130208": ["丰润区", "130200"],
        "130223": ["滦县", "130200"],
        "130224": ["滦南县", "130200"],
        "130225": ["乐亭县", "130200"],
        "130227": ["迁西县", "130200"],
        "130229": ["玉田县", "130200"],
        "130230": ["唐海县", "130200"],
        "130281": ["遵化市", "130200"],
        "130283": ["迁安市", "130200"],
        "130284": ["其它区", "130200"],
        "130300": ["秦皇岛市", "130000"],
        "130302": ["海港区", "130300"],
        "130303": ["山海关区", "130300"],
        "130304": ["北戴河区", "130300"],
        "130321": ["青龙满族自治县", "130300"],
        "130322": ["昌黎县", "130300"],
        "130323": ["抚宁县", "130300"],
        "130324": ["卢龙县", "130300"],
        "130398": ["其它区", "130300"],
        "130399": ["经济技术开发区", "130300"],
        "130400": ["邯郸市", "130000"],
        "130402": ["邯山区", "130400"],
        "130403": ["丛台区", "130400"],
        "130404": ["复兴区", "130400"],
        "130406": ["峰峰矿区", "130400"],
        "130421": ["邯郸县", "130400"],
        "130423": ["临漳县", "130400"],
        "130424": ["成安县", "130400"],
        "130425": ["大名县", "130400"],
        "130426": ["涉县", "130400"],
        "130427": ["磁县", "130400"],
        "130428": ["肥乡县", "130400"],
        "130429": ["永年县", "130400"],
        "130430": ["邱县", "130400"],
        "130431": ["鸡泽县", "130400"],
        "130432": ["广平县", "130400"],
        "130433": ["馆陶县", "130400"],
        "130434": ["魏县", "130400"],
        "130435": ["曲周县", "130400"],
        "130481": ["武安市", "130400"],
        "130482": ["其它区", "130400"],
        "130500": ["邢台市", "130000"],
        "130502": ["桥东区", "130500"],
        "130503": ["桥西区", "130500"],
        "130521": ["邢台县", "130500"],
        "130522": ["临城县", "130500"],
        "130523": ["内丘县", "130500"],
        "130524": ["柏乡县", "130500"],
        "130525": ["隆尧县", "130500"],
        "130526": ["任县", "130500"],
        "130527": ["南和县", "130500"],
        "130528": ["宁晋县", "130500"],
        "130529": ["巨鹿县", "130500"],
        "130530": ["新河县", "130500"],
        "130531": ["广宗县", "130500"],
        "130532": ["平乡县", "130500"],
        "130533": ["威县", "130500"],
        "130534": ["清河县", "130500"],
        "130535": ["临西县", "130500"],
        "130581": ["南宫市", "130500"],
        "130582": ["沙河市", "130500"],
        "130583": ["其它区", "130500"],
        "130600": ["保定市", "130000"],
        "130602": ["新市区", "130600"],
        "130603": ["北市区", "130600"],
        "130604": ["南市区", "130600"],
        "130621": ["满城县", "130600"],
        "130622": ["清苑县", "130600"],
        "130623": ["涞水县", "130600"],
        "130624": ["阜平县", "130600"],
        "130625": ["徐水县", "130600"],
        "130626": ["定兴县", "130600"],
        "130627": ["唐县", "130600"],
        "130628": ["高阳县", "130600"],
        "130629": ["容城县", "130600"],
        "130630": ["涞源县", "130600"],
        "130631": ["望都县", "130600"],
        "130632": ["安新县", "130600"],
        "130633": ["易县", "130600"],
        "130634": ["曲阳县", "130600"],
        "130635": ["蠡县", "130600"],
        "130636": ["顺平县", "130600"],
        "130637": ["博野县", "130600"],
        "130638": ["雄县", "130600"],
        "130681": ["涿州市", "130600"],
        "130682": ["定州市", "130600"],
        "130683": ["安国市", "130600"],
        "130684": ["高碑店市", "130600"],
        "130698": ["高开区", "130600"],
        "130699": ["其它区", "130600"],
        "130700": ["张家口市", "130000"],
        "130702": ["桥东区", "130700"],
        "130703": ["桥西区", "130700"],
        "130705": ["宣化区", "130700"],
        "130706": ["下花园区", "130700"],
        "130721": ["宣化县", "130700"],
        "130722": ["张北县", "130700"],
        "130723": ["康保县", "130700"],
        "130724": ["沽源县", "130700"],
        "130725": ["尚义县", "130700"],
        "130726": ["蔚县", "130700"],
        "130727": ["阳原县", "130700"],
        "130728": ["怀安县", "130700"],
        "130729": ["万全县", "130700"],
        "130730": ["怀来县", "130700"],
        "130731": ["涿鹿县", "130700"],
        "130732": ["赤城县", "130700"],
        "130733": ["崇礼县", "130700"],
        "130734": ["其它区", "130700"],
        "130800": ["承德市", "130000"],
        "130802": ["双桥区", "130800"],
        "130803": ["双滦区", "130800"],
        "130804": ["鹰手营子矿区", "130800"],
        "130821": ["承德县", "130800"],
        "130822": ["兴隆县", "130800"],
        "130823": ["平泉县", "130800"],
        "130824": ["滦平县", "130800"],
        "130825": ["隆化县", "130800"],
        "130826": ["丰宁满族自治县", "130800"],
        "130827": ["宽城满族自治县", "130800"],
        "130828": ["围场满族蒙古族自治县", "130800"],
        "130829": ["其它区", "130800"],
        "130900": ["沧州市", "130000"],
        "130902": ["新华区", "130900"],
        "130903": ["运河区", "130900"],
        "130921": ["沧县", "130900"],
        "130922": ["青县", "130900"],
        "130923": ["东光县", "130900"],
        "130924": ["海兴县", "130900"],
        "130925": ["盐山县", "130900"],
        "130926": ["肃宁县", "130900"],
        "130927": ["南皮县", "130900"],
        "130928": ["吴桥县", "130900"],
        "130929": ["献县", "130900"],
        "130930": ["孟村回族自治县", "130900"],
        "130981": ["泊头市", "130900"],
        "130982": ["任丘市", "130900"],
        "130983": ["黄骅市", "130900"],
        "130984": ["河间市", "130900"],
        "130985": ["其它区", "130900"],
        "131000": ["廊坊市", "130000"],
        "131002": ["安次区", "131000"],
        "131003": ["广阳区", "131000"],
        "131022": ["固安县", "131000"],
        "131023": ["永清县", "131000"],
        "131024": ["香河县", "131000"],
        "131025": ["大城县", "131000"],
        "131026": ["文安县", "131000"],
        "131028": ["大厂回族自治县", "131000"],
        "131051": ["开发区", "131000"],
        "131052": ["燕郊经济技术开发区", "131000"],
        "131081": ["霸州市", "131000"],
        "131082": ["三河市", "131000"],
        "131083": ["其它区", "131000"],
        "131100": ["衡水市", "130000"],
        "131102": ["桃城区", "131100"],
        "131121": ["枣强县", "131100"],
        "131122": ["武邑县", "131100"],
        "131123": ["武强县", "131100"],
        "131124": ["饶阳县", "131100"],
        "131125": ["安平县", "131100"],
        "131126": ["故城县", "131100"],
        "131127": ["景县", "131100"],
        "131128": ["阜城县", "131100"],
        "131181": ["冀州市", "131100"],
        "131182": ["深州市", "131100"],
        "131183": ["其它区", "131100"],
        "140000": ["山西省", "1"],
        "140100": ["太原市", "140000"],
        "140105": ["小店区", "140100"],
        "140106": ["迎泽区", "140100"],
        "140107": ["杏花岭区", "140100"],
        "140108": ["尖草坪区", "140100"],
        "140109": ["万柏林区", "140100"],
        "140110": ["晋源区", "140100"],
        "140121": ["清徐县", "140100"],
        "140122": ["阳曲县", "140100"],
        "140123": ["娄烦县", "140100"],
        "140181": ["古交市", "140100"],
        "140182": ["其它区", "140100"],
        "140200": ["大同市", "140000"],
        "140202": ["城区", "140200"],
        "140203": ["矿区", "140200"],
        "140211": ["南郊区", "140200"],
        "140212": ["新荣区", "140200"],
        "140221": ["阳高县", "140200"],
        "140222": ["天镇县", "140200"],
        "140223": ["广灵县", "140200"],
        "140224": ["灵丘县", "140200"],
        "140225": ["浑源县", "140200"],
        "140226": ["左云县", "140200"],
        "140227": ["大同县", "140200"],
        "140228": ["其它区", "140200"],
        "140300": ["阳泉市", "140000"],
        "140302": ["城区", "140300"],
        "140303": ["矿区", "140300"],
        "140311": ["郊区", "140300"],
        "140321": ["平定县", "140300"],
        "140322": ["盂县", "140300"],
        "140323": ["其它区", "140300"],
        "140400": ["长治市", "140000"],
        "140421": ["长治县", "140400"],
        "140423": ["襄垣县", "140400"],
        "140424": ["屯留县", "140400"],
        "140425": ["平顺县", "140400"],
        "140426": ["黎城县", "140400"],
        "140427": ["壶关县", "140400"],
        "140428": ["长子县", "140400"],
        "140429": ["武乡县", "140400"],
        "140430": ["沁县", "140400"],
        "140431": ["沁源县", "140400"],
        "140481": ["潞城市", "140400"],
        "140482": ["城区", "140400"],
        "140483": ["郊区", "140400"],
        "140484": ["高新区", "140400"],
        "140485": ["其它区", "140400"],
        "140500": ["晋城市", "140000"],
        "140502": ["城区", "140500"],
        "140521": ["沁水县", "140500"],
        "140522": ["阳城县", "140500"],
        "140524": ["陵川县", "140500"],
        "140525": ["泽州县", "140500"],
        "140581": ["高平市", "140500"],
        "140582": ["其它区", "140500"],
        "140600": ["朔州市", "140000"],
        "140602": ["朔城区", "140600"],
        "140603": ["平鲁区", "140600"],
        "140621": ["山阴县", "140600"],
        "140622": ["应县", "140600"],
        "140623": ["右玉县", "140600"],
        "140624": ["怀仁县", "140600"],
        "140625": ["其它区", "140600"],
        "140700": ["晋中市", "140000"],
        "140702": ["榆次区", "140700"],
        "140721": ["榆社县", "140700"],
        "140722": ["左权县", "140700"],
        "140723": ["和顺县", "140700"],
        "140724": ["昔阳县", "140700"],
        "140725": ["寿阳县", "140700"],
        "140726": ["太谷县", "140700"],
        "140727": ["祁县", "140700"],
        "140728": ["平遥县", "140700"],
        "140729": ["灵石县", "140700"],
        "140781": ["介休市", "140700"],
        "140782": ["其它区", "140700"],
        "140800": ["运城市", "140000"],
        "140802": ["盐湖区", "140800"],
        "140821": ["临猗县", "140800"],
        "140822": ["万荣县", "140800"],
        "140823": ["闻喜县", "140800"],
        "140824": ["稷山县", "140800"],
        "140825": ["新绛县", "140800"],
        "140826": ["绛县", "140800"],
        "140827": ["垣曲县", "140800"],
        "140828": ["夏县", "140800"],
        "140829": ["平陆县", "140800"],
        "140830": ["芮城县", "140800"],
        "140881": ["永济市", "140800"],
        "140882": ["河津市", "140800"],
        "140883": ["其它区", "140800"],
        "140900": ["忻州市", "140000"],
        "140902": ["忻府区", "140900"],
        "140921": ["定襄县", "140900"],
        "140922": ["五台县", "140900"],
        "140923": ["代县", "140900"],
        "140924": ["繁峙县", "140900"],
        "140925": ["宁武县", "140900"],
        "140926": ["静乐县", "140900"],
        "140927": ["神池县", "140900"],
        "140928": ["五寨县", "140900"],
        "140929": ["岢岚县", "140900"],
        "140930": ["河曲县", "140900"],
        "140931": ["保德县", "140900"],
        "140932": ["偏关县", "140900"],
        "140981": ["原平市", "140900"],
        "140982": ["其它区", "140900"],
        "141000": ["临汾市", "140000"],
        "141002": ["尧都区", "141000"],
        "141021": ["曲沃县", "141000"],
        "141022": ["翼城县", "141000"],
        "141023": ["襄汾县", "141000"],
        "141024": ["洪洞县", "141000"],
        "141025": ["古县", "141000"],
        "141026": ["安泽县", "141000"],
        "141027": ["浮山县", "141000"],
        "141028": ["吉县", "141000"],
        "141029": ["乡宁县", "141000"],
        "141030": ["大宁县", "141000"],
        "141031": ["隰县", "141000"],
        "141032": ["永和县", "141000"],
        "141033": ["蒲县", "141000"],
        "141034": ["汾西县", "141000"],
        "141081": ["侯马市", "141000"],
        "141082": ["霍州市", "141000"],
        "141083": ["其它区", "141000"],
        "141100": ["吕梁市", "140000"],
        "141102": ["离石区", "141100"],
        "141121": ["文水县", "141100"],
        "141122": ["交城县", "141100"],
        "141123": ["兴县", "141100"],
        "141124": ["临县", "141100"],
        "141125": ["柳林县", "141100"],
        "141126": ["石楼县", "141100"],
        "141127": ["岚县", "141100"],
        "141128": ["方山县", "141100"],
        "141129": ["中阳县", "141100"],
        "141130": ["交口县", "141100"],
        "141181": ["孝义市", "141100"],
        "141182": ["汾阳市", "141100"],
        "141183": ["其它区", "141100"],
        "150000": ["内蒙古自治区", "1"],
        "150100": ["呼和浩特市", "150000"],
        "150102": ["新城区", "150100"],
        "150103": ["回民区", "150100"],
        "150104": ["玉泉区", "150100"],
        "150105": ["赛罕区", "150100"],
        "150121": ["土默特左旗", "150100"],
        "150122": ["托克托县", "150100"],
        "150123": ["和林格尔县", "150100"],
        "150124": ["清水河县", "150100"],
        "150125": ["武川县", "150100"],
        "150126": ["其它区", "150100"],
        "150200": ["包头市", "150000"],
        "150202": ["东河区", "150200"],
        "150203": ["昆都仑区", "150200"],
        "150204": ["青山区", "150200"],
        "150205": ["石拐区", "150200"],
        "150206": ["白云矿区", "150200"],
        "150207": ["九原区", "150200"],
        "150221": ["土默特右旗", "150200"],
        "150222": ["固阳县", "150200"],
        "150223": ["达尔罕茂明安联合旗", "150200"],
        "150224": ["其它区", "150200"],
        "150300": ["乌海市", "150000"],
        "150302": ["海勃湾区", "150300"],
        "150303": ["海南区", "150300"],
        "150304": ["乌达区", "150300"],
        "150305": ["其它区", "150300"],
        "150400": ["赤峰市", "150000"],
        "150402": ["红山区", "150400"],
        "150403": ["元宝山区", "150400"],
        "150404": ["松山区", "150400"],
        "150421": ["阿鲁科尔沁旗", "150400"],
        "150422": ["巴林左旗", "150400"],
        "150423": ["巴林右旗", "150400"],
        "150424": ["林西县", "150400"],
        "150425": ["克什克腾旗", "150400"],
        "150426": ["翁牛特旗", "150400"],
        "150428": ["喀喇沁旗", "150400"],
        "150429": ["宁城县", "150400"],
        "150430": ["敖汉旗", "150400"],
        "150431": ["其它区", "150400"],
        "150500": ["通辽市", "150000"],
        "150502": ["科尔沁区", "150500"],
        "150521": ["科尔沁左翼中旗", "150500"],
        "150522": ["科尔沁左翼后旗", "150500"],
        "150523": ["开鲁县", "150500"],
        "150524": ["库伦旗", "150500"],
        "150525": ["奈曼旗", "150500"],
        "150526": ["扎鲁特旗", "150500"],
        "150581": ["霍林郭勒市", "150500"],
        "150582": ["其它区", "150500"],
        "150600": ["鄂尔多斯市", "150000"],
        "150602": ["东胜区", "150600"],
        "150621": ["达拉特旗", "150600"],
        "150622": ["准格尔旗", "150600"],
        "150623": ["鄂托克前旗", "150600"],
        "150624": ["鄂托克旗", "150600"],
        "150625": ["杭锦旗", "150600"],
        "150626": ["乌审旗", "150600"],
        "150627": ["伊金霍洛旗", "150600"],
        "150628": ["其它区", "150600"],
        "150700": ["呼伦贝尔市", "150000"],
        "150702": ["海拉尔区", "150700"],
        "150721": ["阿荣旗", "150700"],
        "150722": ["莫力达瓦达斡尔族自治旗", "150700"],
        "150723": ["鄂伦春自治旗", "150700"],
        "150724": ["鄂温克族自治旗", "150700"],
        "150725": ["陈巴尔虎旗", "150700"],
        "150726": ["新巴尔虎左旗", "150700"],
        "150727": ["新巴尔虎右旗", "150700"],
        "150781": ["满洲里市", "150700"],
        "150782": ["牙克石市", "150700"],
        "150783": ["扎兰屯市", "150700"],
        "150784": ["额尔古纳市", "150700"],
        "150785": ["根河市", "150700"],
        "150786": ["其它区", "150700"],
        "150800": ["巴彦淖尔市", "150000"],
        "150802": ["临河区", "150800"],
        "150821": ["五原县", "150800"],
        "150822": ["磴口县", "150800"],
        "150823": ["乌拉特前旗", "150800"],
        "150824": ["乌拉特中旗", "150800"],
        "150825": ["乌拉特后旗", "150800"],
        "150826": ["杭锦后旗", "150800"],
        "150827": ["其它区", "150800"],
        "150900": ["乌兰察布市", "150000"],
        "150902": ["集宁区", "150900"],
        "150921": ["卓资县", "150900"],
        "150922": ["化德县", "150900"],
        "150923": ["商都县", "150900"],
        "150924": ["兴和县", "150900"],
        "150925": ["凉城县", "150900"],
        "150926": ["察哈尔右翼前旗", "150900"],
        "150927": ["察哈尔右翼中旗", "150900"],
        "150928": ["察哈尔右翼后旗", "150900"],
        "150929": ["四子王旗", "150900"],
        "150981": ["丰镇市", "150900"],
        "150982": ["其它区", "150900"],
        "152200": ["兴安盟", "150000"],
        "152201": ["乌兰浩特市", "152200"],
        "152202": ["阿尔山市", "152200"],
        "152221": ["科尔沁右翼前旗", "152200"],
        "152222": ["科尔沁右翼中旗", "152200"],
        "152223": ["扎赉特旗", "152200"],
        "152224": ["突泉县", "152200"],
        "152225": ["其它区", "152200"],
        "152500": ["锡林郭勒盟", "150000"],
        "152501": ["二连浩特市", "152500"],
        "152502": ["锡林浩特市", "152500"],
        "152522": ["阿巴嘎旗", "152500"],
        "152523": ["苏尼特左旗", "152500"],
        "152524": ["苏尼特右旗", "152500"],
        "152525": ["东乌珠穆沁旗", "152500"],
        "152526": ["西乌珠穆沁旗", "152500"],
        "152527": ["太仆寺旗", "152500"],
        "152528": ["镶黄旗", "152500"],
        "152529": ["正镶白旗", "152500"],
        "152530": ["正蓝旗", "152500"],
        "152531": ["多伦县", "152500"],
        "152532": ["其它区", "152500"],
        "152900": ["阿拉善盟", "150000"],
        "152921": ["阿拉善左旗", "152900"],
        "152922": ["阿拉善右旗", "152900"],
        "152923": ["额济纳旗", "152900"],
        "152924": ["其它区", "152900"],
        "210000": ["辽宁省", "1"],
        "210100": ["沈阳市", "210000"],
        "210102": ["和平区", "210100"],
        "210103": ["沈河区", "210100"],
        "210104": ["大东区", "210100"],
        "210105": ["皇姑区", "210100"],
        "210106": ["铁西区", "210100"],
        "210111": ["苏家屯区", "210100"],
        "210112": ["东陵区", "210100"],
        "210113": ["新城子区", "210100"],
        "210114": ["于洪区", "210100"],
        "210122": ["辽中县", "210100"],
        "210123": ["康平县", "210100"],
        "210124": ["法库县", "210100"],
        "210181": ["新民市", "210100"],
        "210182": ["浑南新区", "210100"],
        "210183": ["张士开发区", "210100"],
        "210184": ["沈北新区", "210100"],
        "210185": ["其它区", "210100"],
        "210200": ["大连市", "210000"],
        "210202": ["中山区", "210200"],
        "210203": ["西岗区", "210200"],
        "210204": ["沙河口区", "210200"],
        "210211": ["甘井子区", "210200"],
        "210212": ["旅顺口区", "210200"],
        "210213": ["金州区", "210200"],
        "210224": ["长海县", "210200"],
        "210251": ["开发区", "210200"],
        "210281": ["瓦房店市", "210200"],
        "210282": ["普兰店市", "210200"],
        "210283": ["庄河市", "210200"],
        "210297": ["岭前区", "210200"],
        "210298": ["其它区", "210200"],
        "210300": ["鞍山市", "210000"],
        "210302": ["铁东区", "210300"],
        "210303": ["铁西区", "210300"],
        "210304": ["立山区", "210300"],
        "210311": ["千山区", "210300"],
        "210321": ["台安县", "210300"],
        "210323": ["岫岩满族自治县", "210300"],
        "210351": ["高新区", "210300"],
        "210381": ["海城市", "210300"],
        "210382": ["其它区", "210300"],
        "210400": ["抚顺市", "210000"],
        "210402": ["新抚区", "210400"],
        "210403": ["东洲区", "210400"],
        "210404": ["望花区", "210400"],
        "210411": ["顺城区", "210400"],
        "210421": ["抚顺县", "210400"],
        "210422": ["新宾满族自治县", "210400"],
        "210423": ["清原满族自治县", "210400"],
        "210424": ["其它区", "210400"],
        "210500": ["本溪市", "210000"],
        "210502": ["平山区", "210500"],
        "210503": ["溪湖区", "210500"],
        "210504": ["明山区", "210500"],
        "210505": ["南芬区", "210500"],
        "210521": ["本溪满族自治县", "210500"],
        "210522": ["桓仁满族自治县", "210500"],
        "210523": ["其它区", "210500"],
        "210600": ["丹东市", "210000"],
        "210602": ["元宝区", "210600"],
        "210603": ["振兴区", "210600"],
        "210604": ["振安区", "210600"],
        "210624": ["宽甸满族自治县", "210600"],
        "210681": ["东港市", "210600"],
        "210682": ["凤城市", "210600"],
        "210683": ["其它区", "210600"],
        "210700": ["锦州市", "210000"],
        "210702": ["古塔区", "210700"],
        "210703": ["凌河区", "210700"],
        "210711": ["太和区", "210700"],
        "210726": ["黑山县", "210700"],
        "210727": ["义县", "210700"],
        "210781": ["凌海市", "210700"],
        "210782": ["北镇市", "210700"],
        "210783": ["其它区", "210700"],
        "210800": ["营口市", "210000"],
        "210802": ["站前区", "210800"],
        "210803": ["西市区", "210800"],
        "210804": ["鲅鱼圈区", "210800"],
        "210811": ["老边区", "210800"],
        "210881": ["盖州市", "210800"],
        "210882": ["大石桥市", "210800"],
        "210883": ["其它区", "210800"],
        "210900": ["阜新市", "210000"],
        "210902": ["海州区", "210900"],
        "210903": ["新邱区", "210900"],
        "210904": ["太平区", "210900"],
        "210905": ["清河门区", "210900"],
        "210911": ["细河区", "210900"],
        "210921": ["阜新蒙古族自治县", "210900"],
        "210922": ["彰武县", "210900"],
        "210923": ["其它区", "210900"],
        "211000": ["辽阳市", "210000"],
        "211002": ["白塔区", "211000"],
        "211003": ["文圣区", "211000"],
        "211004": ["宏伟区", "211000"],
        "211005": ["弓长岭区", "211000"],
        "211011": ["太子河区", "211000"],
        "211021": ["辽阳县", "211000"],
        "211081": ["灯塔市", "211000"],
        "211082": ["其它区", "211000"],
        "211100": ["盘锦市", "210000"],
        "211102": ["双台子区", "211100"],
        "211103": ["兴隆台区", "211100"],
        "211121": ["大洼县", "211100"],
        "211122": ["盘山县", "211100"],
        "211123": ["其它区", "211100"],
        "211200": ["铁岭市", "210000"],
        "211202": ["银州区", "211200"],
        "211204": ["清河区", "211200"],
        "211221": ["铁岭县", "211200"],
        "211223": ["西丰县", "211200"],
        "211224": ["昌图县", "211200"],
        "211281": ["调兵山市", "211200"],
        "211282": ["开原市", "211200"],
        "211283": ["其它区", "211200"],
        "211300": ["朝阳市", "210000"],
        "211302": ["双塔区", "211300"],
        "211303": ["龙城区", "211300"],
        "211321": ["朝阳县", "211300"],
        "211322": ["建平县", "211300"],
        "211324": ["喀喇沁左翼蒙古族自治县", "211300"],
        "211381": ["北票市", "211300"],
        "211382": ["凌源市", "211300"],
        "211383": ["其它区", "211300"],
        "211400": ["葫芦岛市", "210000"],
        "211402": ["连山区", "211400"],
        "211403": ["龙港区", "211400"],
        "211404": ["南票区", "211400"],
        "211421": ["绥中县", "211400"],
        "211422": ["建昌县", "211400"],
        "211481": ["兴城市", "211400"],
        "211482": ["其它区", "211400"],
        "220000": ["吉林省", "1"],
        "220100": ["长春市", "220000"],
        "220102": ["南关区", "220100"],
        "220103": ["宽城区", "220100"],
        "220104": ["朝阳区", "220100"],
        "220105": ["二道区", "220100"],
        "220106": ["绿园区", "220100"],
        "220112": ["双阳区", "220100"],
        "220122": ["农安县", "220100"],
        "220181": ["九台市", "220100"],
        "220182": ["榆树市", "220100"],
        "220183": ["德惠市", "220100"],
        "220184": ["高新技术产业开发区", "220100"],
        "220185": ["汽车产业开发区", "220100"],
        "220186": ["经济技术开发区", "220100"],
        "220187": ["净月旅游开发区", "220100"],
        "220188": ["其它区", "220100"],
        "220200": ["吉林市", "220000"],
        "220202": ["昌邑区", "220200"],
        "220203": ["龙潭区", "220200"],
        "220204": ["船营区", "220200"],
        "220211": ["丰满区", "220200"],
        "220221": ["永吉县", "220200"],
        "220281": ["蛟河市", "220200"],
        "220282": ["桦甸市", "220200"],
        "220283": ["舒兰市", "220200"],
        "220284": ["磐石市", "220200"],
        "220285": ["其它区", "220200"],
        "220300": ["四平市", "220000"],
        "220302": ["铁西区", "220300"],
        "220303": ["铁东区", "220300"],
        "220322": ["梨树县", "220300"],
        "220323": ["伊通满族自治县", "220300"],
        "220381": ["公主岭市", "220300"],
        "220382": ["双辽市", "220300"],
        "220383": ["其它区", "220300"],
        "220400": ["辽源市", "220000"],
        "220402": ["龙山区", "220400"],
        "220403": ["西安区", "220400"],
        "220421": ["东丰县", "220400"],
        "220422": ["东辽县", "220400"],
        "220423": ["其它区", "220400"],
        "220500": ["通化市", "220000"],
        "220502": ["东昌区", "220500"],
        "220503": ["二道江区", "220500"],
        "220521": ["通化县", "220500"],
        "220523": ["辉南县", "220500"],
        "220524": ["柳河县", "220500"],
        "220581": ["梅河口市", "220500"],
        "220582": ["集安市", "220500"],
        "220583": ["其它区", "220500"],
        "220600": ["白山市", "220000"],
        "220602": ["八道江区", "220600"],
        "220621": ["抚松县", "220600"],
        "220622": ["靖宇县", "220600"],
        "220623": ["长白朝鲜族自治县", "220600"],
        "220625": ["江源县", "220600"],
        "220681": ["临江市", "220600"],
        "220682": ["其它区", "220600"],
        "220700": ["松原市", "220000"],
        "220702": ["宁江区", "220700"],
        "220721": ["前郭尔罗斯蒙古族自治县", "220700"],
        "220722": ["长岭县", "220700"],
        "220723": ["乾安县", "220700"],
        "220724": ["扶余县", "220700"],
        "220725": ["其它区", "220700"],
        "220800": ["白城市", "220000"],
        "220802": ["洮北区", "220800"],
        "220821": ["镇赉县", "220800"],
        "220822": ["通榆县", "220800"],
        "220881": ["洮南市", "220800"],
        "220882": ["大安市", "220800"],
        "220883": ["其它区", "220800"],
        "222400": ["延边朝鲜族自治州", "220000"],
        "222401": ["延吉市", "222400"],
        "222402": ["图们市", "222400"],
        "222403": ["敦化市", "222400"],
        "222404": ["珲春市", "222400"],
        "222405": ["龙井市", "222400"],
        "222406": ["和龙市", "222400"],
        "222424": ["汪清县", "222400"],
        "222426": ["安图县", "222400"],
        "222427": ["其它区", "222400"],
        "230000": ["黑龙江省", "1"],
        "230100": ["哈尔滨市", "230000"],
        "230102": ["道里区", "230100"],
        "230103": ["南岗区", "230100"],
        "230104": ["道外区", "230100"],
        "230106": ["香坊区", "230100"],
        "230107": ["动力区", "230100"],
        "230108": ["平房区", "230100"],
        "230109": ["松北区", "230100"],
        "230111": ["呼兰区", "230100"],
        "230123": ["依兰县", "230100"],
        "230124": ["方正县", "230100"],
        "230125": ["宾县", "230100"],
        "230126": ["巴彦县", "230100"],
        "230127": ["木兰县", "230100"],
        "230128": ["通河县", "230100"],
        "230129": ["延寿县", "230100"],
        "230181": ["阿城市", "230100"],
        "230182": ["双城市", "230100"],
        "230183": ["尚志市", "230100"],
        "230184": ["五常市", "230100"],
        "230185": ["阿城市", "230100"],
        "230186": ["其它区", "230100"],
        "230200": ["齐齐哈尔市", "230000"],
        "230202": ["龙沙区", "230200"],
        "230203": ["建华区", "230200"],
        "230204": ["铁锋区", "230200"],
        "230205": ["昂昂溪区", "230200"],
        "230206": ["富拉尔基区", "230200"],
        "230207": ["碾子山区", "230200"],
        "230208": ["梅里斯达斡尔族区", "230200"],
        "230221": ["龙江县", "230200"],
        "230223": ["依安县", "230200"],
        "230224": ["泰来县", "230200"],
        "230225": ["甘南县", "230200"],
        "230227": ["富裕县", "230200"],
        "230229": ["克山县", "230200"],
        "230230": ["克东县", "230200"],
        "230231": ["拜泉县", "230200"],
        "230281": ["讷河市", "230200"],
        "230282": ["其它区", "230200"],
        "230300": ["鸡西市", "230000"],
        "230302": ["鸡冠区", "230300"],
        "230303": ["恒山区", "230300"],
        "230304": ["滴道区", "230300"],
        "230305": ["梨树区", "230300"],
        "230306": ["城子河区", "230300"],
        "230307": ["麻山区", "230300"],
        "230321": ["鸡东县", "230300"],
        "230381": ["虎林市", "230300"],
        "230382": ["密山市", "230300"],
        "230383": ["其它区", "230300"],
        "230400": ["鹤岗市", "230000"],
        "230402": ["向阳区", "230400"],
        "230403": ["工农区", "230400"],
        "230404": ["南山区", "230400"],
        "230405": ["兴安区", "230400"],
        "230406": ["东山区", "230400"],
        "230407": ["兴山区", "230400"],
        "230421": ["萝北县", "230400"],
        "230422": ["绥滨县", "230400"],
        "230423": ["其它区", "230400"],
        "230500": ["双鸭山市", "230000"],
        "230502": ["尖山区", "230500"],
        "230503": ["岭东区", "230500"],
        "230505": ["四方台区", "230500"],
        "230506": ["宝山区", "230500"],
        "230521": ["集贤县", "230500"],
        "230522": ["友谊县", "230500"],
        "230523": ["宝清县", "230500"],
        "230524": ["饶河县", "230500"],
        "230525": ["其它区", "230500"],
        "230600": ["大庆市", "230000"],
        "230602": ["萨尔图区", "230600"],
        "230603": ["龙凤区", "230600"],
        "230604": ["让胡路区", "230600"],
        "230605": ["红岗区", "230600"],
        "230606": ["大同区", "230600"],
        "230621": ["肇州县", "230600"],
        "230622": ["肇源县", "230600"],
        "230623": ["林甸县", "230600"],
        "230624": ["杜尔伯特蒙古族自治县", "230600"],
        "230625": ["其它区", "230600"],
        "230700": ["伊春市", "230000"],
        "230702": ["伊春区", "230700"],
        "230703": ["南岔区", "230700"],
        "230704": ["友好区", "230700"],
        "230705": ["西林区", "230700"],
        "230706": ["翠峦区", "230700"],
        "230707": ["新青区", "230700"],
        "230708": ["美溪区", "230700"],
        "230709": ["金山屯区", "230700"],
        "230710": ["五营区", "230700"],
        "230711": ["乌马河区", "230700"],
        "230712": ["汤旺河区", "230700"],
        "230713": ["带岭区", "230700"],
        "230714": ["乌伊岭区", "230700"],
        "230715": ["红星区", "230700"],
        "230716": ["上甘岭区", "230700"],
        "230722": ["嘉荫县", "230700"],
        "230781": ["铁力市", "230700"],
        "230782": ["其它区", "230700"],
        "230800": ["佳木斯市", "230000"],
        "230802": ["永红区", "230800"],
        "230803": ["向阳区", "230800"],
        "230804": ["前进区", "230800"],
        "230805": ["东风区", "230800"],
        "230811": ["郊区", "230800"],
        "230822": ["桦南县", "230800"],
        "230826": ["桦川县", "230800"],
        "230828": ["汤原县", "230800"],
        "230833": ["抚远县", "230800"],
        "230881": ["同江市", "230800"],
        "230882": ["富锦市", "230800"],
        "230883": ["其它区", "230800"],
        "230900": ["七台河市", "230000"],
        "230902": ["新兴区", "230900"],
        "230903": ["桃山区", "230900"],
        "230904": ["茄子河区", "230900"],
        "230921": ["勃利县", "230900"],
        "230922": ["其它区", "230900"],
        "231000": ["牡丹江市", "230000"],
        "231002": ["东安区", "231000"],
        "231003": ["阳明区", "231000"],
        "231004": ["爱民区", "231000"],
        "231005": ["西安区", "231000"],
        "231024": ["东宁县", "231000"],
        "231025": ["林口县", "231000"],
        "231081": ["绥芬河市", "231000"],
        "231083": ["海林市", "231000"],
        "231084": ["宁安市", "231000"],
        "231085": ["穆棱市", "231000"],
        "231086": ["其它区", "231000"],
        "231100": ["黑河市", "230000"],
        "231102": ["爱辉区", "231100"],
        "231121": ["嫩江县", "231100"],
        "231123": ["逊克县", "231100"],
        "231124": ["孙吴县", "231100"],
        "231181": ["北安市", "231100"],
        "231182": ["五大连池市", "231100"],
        "231183": ["其它区", "231100"],
        "231200": ["绥化市", "230000"],
        "231202": ["北林区", "231200"],
        "231221": ["望奎县", "231200"],
        "231222": ["兰西县", "231200"],
        "231223": ["青冈县", "231200"],
        "231224": ["庆安县", "231200"],
        "231225": ["明水县", "231200"],
        "231226": ["绥棱县", "231200"],
        "231281": ["安达市", "231200"],
        "231282": ["肇东市", "231200"],
        "231283": ["海伦市", "231200"],
        "231284": ["其它区", "231200"],
        "232700": ["大兴安岭地区", "230000"],
        "232721": ["呼玛县", "232700"],
        "232722": ["塔河县", "232700"],
        "232723": ["漠河县", "232700"],
        "232724": ["加格达奇区", "232700"],
        "232725": ["其它区", "232700"],
        "310000": ["上海", "1"],
        "310100": ["上海市", "310000"],
        "310101": ["黄浦区", "310100"],
        "310103": ["卢湾区", "310100"],
        "310104": ["徐汇区", "310100"],
        "310105": ["长宁区", "310100"],
        "310106": ["静安区", "310100"],
        "310107": ["普陀区", "310100"],
        "310108": ["闸北区", "310100"],
        "310109": ["虹口区", "310100"],
        "310110": ["杨浦区", "310100"],
        "310112": ["闵行区", "310100"],
        "310113": ["宝山区", "310100"],
        "310114": ["嘉定区", "310100"],
        "310115": ["浦东新区", "310100"],
        "310116": ["金山区", "310100"],
        "310117": ["松江区", "310100"],
        "310118": ["青浦区", "310100"],
        "310119": ["南汇区", "310100"],
        "310120": ["奉贤区", "310100"],
        "310152": ["川沙区", "310100"],
        "310230": ["崇明县", "310100"],
        "310231": ["其它区", "310100"],
        "320000": ["江苏省", "1"],
        "320100": ["南京市", "320000"],
        "320102": ["玄武区", "320100"],
        "320103": ["白下区", "320100"],
        "320104": ["秦淮区", "320100"],
        "320105": ["建邺区", "320100"],
        "320106": ["鼓楼区", "320100"],
        "320107": ["下关区", "320100"],
        "320111": ["浦口区", "320100"],
        "320113": ["栖霞区", "320100"],
        "320114": ["雨花台区", "320100"],
        "320115": ["江宁区", "320100"],
        "320116": ["六合区", "320100"],
        "320124": ["溧水县", "320100"],
        "320125": ["高淳县", "320100"],
        "320126": ["其它区", "320100"],
        "320200": ["无锡市", "320000"],
        "320202": ["崇安区", "320200"],
        "320203": ["南长区", "320200"],
        "320204": ["北塘区", "320200"],
        "320205": ["锡山区", "320200"],
        "320206": ["惠山区", "320200"],
        "320211": ["滨湖区", "320200"],
        "320281": ["江阴市", "320200"],
        "320282": ["宜兴市", "320200"],
        "320296": ["新区", "320200"],
        "320297": ["其它区", "320200"],
        "320300": ["徐州市", "320000"],
        "320302": ["鼓楼区", "320300"],
        "320303": ["云龙区", "320300"],
        "320304": ["九里区", "320300"],
        "320305": ["贾汪区", "320300"],
        "320311": ["泉山区", "320300"],
        "320321": ["丰县", "320300"],
        "320322": ["沛县", "320300"],
        "320323": ["铜山县", "320300"],
        "320324": ["睢宁县", "320300"],
        "320381": ["新沂市", "320300"],
        "320382": ["邳州市", "320300"],
        "320383": ["其它区", "320300"],
        "320400": ["常州市", "320000"],
        "320402": ["天宁区", "320400"],
        "320404": ["钟楼区", "320400"],
        "320405": ["戚墅堰区", "320400"],
        "320411": ["新北区", "320400"],
        "320412": ["武进区", "320400"],
        "320481": ["溧阳市", "320400"],
        "320482": ["金坛市", "320400"],
        "320483": ["其它区", "320400"],
        "320500": ["苏州市", "320000"],
        "320502": ["沧浪区", "320500"],
        "320503": ["平江区", "320500"],
        "320504": ["金阊区", "320500"],
        "320505": ["虎丘区", "320500"],
        "320506": ["吴中区", "320500"],
        "320507": ["相城区", "320500"],
        "320581": ["常熟市", "320500"],
        "320582": ["张家港市", "320500"],
        "320583": ["昆山市", "320500"],
        "320584": ["吴江市", "320500"],
        "320585": ["太仓市", "320500"],
        "320594": ["新区", "320500"],
        "320595": ["园区", "320500"],
        "320596": ["其它区", "320500"],
        "320600": ["南通市", "320000"],
        "320602": ["崇川区", "320600"],
        "320611": ["港闸区", "320600"],
        "320612": ["通州区", "320600"],
        "320621": ["海安县", "320600"],
        "320623": ["如东县", "320600"],
        "320681": ["启东市", "320600"],
        "320682": ["如皋市", "320600"],
        "320683": ["通州市", "320600"],
        "320684": ["海门市", "320600"],
        "320693": ["开发区", "320600"],
        "320694": ["其它区", "320600"],
        "320700": ["连云港市", "320000"],
        "320703": ["连云区", "320700"],
        "320705": ["新浦区", "320700"],
        "320706": ["海州区", "320700"],
        "320721": ["赣榆县", "320700"],
        "320722": ["东海县", "320700"],
        "320723": ["灌云县", "320700"],
        "320724": ["灌南县", "320700"],
        "320725": ["其它区", "320700"],
        "320800": ["淮安市", "320000"],
        "320802": ["清河区", "320800"],
        "320803": ["楚州区", "320800"],
        "320804": ["淮阴区", "320800"],
        "320811": ["清浦区", "320800"],
        "320826": ["涟水县", "320800"],
        "320829": ["洪泽县", "320800"],
        "320830": ["盱眙县", "320800"],
        "320831": ["金湖县", "320800"],
        "320832": ["其它区", "320800"],
        "320900": ["盐城市", "320000"],
        "320902": ["亭湖区", "320900"],
        "320903": ["盐都区", "320900"],
        "320921": ["响水县", "320900"],
        "320922": ["滨海县", "320900"],
        "320923": ["阜宁县", "320900"],
        "320924": ["射阳县", "320900"],
        "320925": ["建湖县", "320900"],
        "320981": ["东台市", "320900"],
        "320982": ["大丰市", "320900"],
        "320983": ["其它区", "320900"],
        "321000": ["扬州市", "320000"],
        "321002": ["广陵区", "321000"],
        "321003": ["邗江区", "321000"],
        "321011": ["维扬区", "321000"],
        "321023": ["宝应县", "321000"],
        "321081": ["仪征市", "321000"],
        "321084": ["高邮市", "321000"],
        "321088": ["江都市", "321000"],
        "321092": ["经济开发区", "321000"],
        "321093": ["其它区", "321000"],
        "321100": ["镇江市", "320000"],
        "321102": ["京口区", "321100"],
        "321111": ["润州区", "321100"],
        "321112": ["丹徒区", "321100"],
        "321181": ["丹阳市", "321100"],
        "321182": ["扬中市", "321100"],
        "321183": ["句容市", "321100"],
        "321184": ["其它区", "321100"],
        "321200": ["泰州市", "320000"],
        "321202": ["海陵区", "321200"],
        "321203": ["高港区", "321200"],
        "321281": ["兴化市", "321200"],
        "321282": ["靖江市", "321200"],
        "321283": ["泰兴市", "321200"],
        "321284": ["姜堰市", "321200"],
        "321285": ["其它区", "321200"],
        "321300": ["宿迁市", "320000"],
        "321302": ["宿城区", "321300"],
        "321311": ["宿豫区", "321300"],
        "321322": ["沭阳县", "321300"],
        "321323": ["泗阳县", "321300"],
        "321324": ["泗洪县", "321300"],
        "321325": ["其它区", "321300"],
        "330000": ["浙江省", "1"],
        "330100": ["杭州市", "330000"],
        "330102": ["上城区", "330100"],
        "330103": ["下城区", "330100"],
        "330104": ["江干区", "330100"],
        "330105": ["拱墅区", "330100"],
        "330106": ["西湖区", "330100"],
        "330108": ["滨江区", "330100"],
        "330109": ["萧山区", "330100"],
        "330110": ["余杭区", "330100"],
        "330122": ["桐庐县", "330100"],
        "330127": ["淳安县", "330100"],
        "330182": ["建德市", "330100"],
        "330183": ["富阳市", "330100"],
        "330185": ["临安市", "330100"],
        "330186": ["其它区", "330100"],
        "330200": ["宁波市", "330000"],
        "330203": ["海曙区", "330200"],
        "330204": ["江东区", "330200"],
        "330205": ["江北区", "330200"],
        "330206": ["北仑区", "330200"],
        "330211": ["镇海区", "330200"],
        "330212": ["鄞州区", "330200"],
        "330225": ["象山县", "330200"],
        "330226": ["宁海县", "330200"],
        "330281": ["余姚市", "330200"],
        "330282": ["慈溪市", "330200"],
        "330283": ["奉化市", "330200"],
        "330284": ["其它区", "330200"],
        "330300": ["温州市", "330000"],
        "330302": ["鹿城区", "330300"],
        "330303": ["龙湾区", "330300"],
        "330304": ["瓯海区", "330300"],
        "330322": ["洞头县", "330300"],
        "330324": ["永嘉县", "330300"],
        "330326": ["平阳县", "330300"],
        "330327": ["苍南县", "330300"],
        "330328": ["文成县", "330300"],
        "330329": ["泰顺县", "330300"],
        "330381": ["瑞安市", "330300"],
        "330382": ["乐清市", "330300"],
        "330383": ["其它区", "330300"],
        "330400": ["嘉兴市", "330000"],
        "330402": ["南湖区", "330400"],
        "330411": ["秀洲区", "330400"],
        "330421": ["嘉善县", "330400"],
        "330424": ["海盐县", "330400"],
        "330481": ["海宁市", "330400"],
        "330482": ["平湖市", "330400"],
        "330483": ["桐乡市", "330400"],
        "330484": ["其它区", "330400"],
        "330500": ["湖州市", "330000"],
        "330502": ["吴兴区", "330500"],
        "330503": ["南浔区", "330500"],
        "330521": ["德清县", "330500"],
        "330522": ["长兴县", "330500"],
        "330523": ["安吉县", "330500"],
        "330524": ["其它区", "330500"],
        "330600": ["绍兴市", "330000"],
        "330602": ["越城区", "330600"],
        "330621": ["绍兴县", "330600"],
        "330624": ["新昌县", "330600"],
        "330681": ["诸暨市", "330600"],
        "330682": ["上虞市", "330600"],
        "330683": ["嵊州市", "330600"],
        "330684": ["其它区", "330600"],
        "330700": ["金华市", "330000"],
        "330702": ["婺城区", "330700"],
        "330703": ["金东区", "330700"],
        "330723": ["武义县", "330700"],
        "330726": ["浦江县", "330700"],
        "330727": ["磐安县", "330700"],
        "330781": ["兰溪市", "330700"],
        "330782": ["义乌市", "330700"],
        "330783": ["东阳市", "330700"],
        "330784": ["永康市", "330700"],
        "330785": ["其它区", "330700"],
        "330800": ["衢州市", "330000"],
        "330802": ["柯城区", "330800"],
        "330803": ["衢江区", "330800"],
        "330822": ["常山县", "330800"],
        "330824": ["开化县", "330800"],
        "330825": ["龙游县", "330800"],
        "330881": ["江山市", "330800"],
        "330882": ["其它区", "330800"],
        "330900": ["舟山市", "330000"],
        "330902": ["定海区", "330900"],
        "330903": ["普陀区", "330900"],
        "330921": ["岱山县", "330900"],
        "330922": ["嵊泗县", "330900"],
        "330923": ["其它区", "330900"],
        "331000": ["台州市", "330000"],
        "331002": ["椒江区", "331000"],
        "331003": ["黄岩区", "331000"],
        "331004": ["路桥区", "331000"],
        "331021": ["玉环县", "331000"],
        "331022": ["三门县", "331000"],
        "331023": ["天台县", "331000"],
        "331024": ["仙居县", "331000"],
        "331081": ["温岭市", "331000"],
        "331082": ["临海市", "331000"],
        "331083": ["其它区", "331000"],
        "331100": ["丽水市", "330000"],
        "331102": ["莲都区", "331100"],
        "331121": ["青田县", "331100"],
        "331122": ["缙云县", "331100"],
        "331123": ["遂昌县", "331100"],
        "331124": ["松阳县", "331100"],
        "331125": ["云和县", "331100"],
        "331126": ["庆元县", "331100"],
        "331127": ["景宁畲族自治县", "331100"],
        "331181": ["龙泉市", "331100"],
        "331182": ["其它区", "331100"],
        "340000": ["安徽省", "1"],
        "340100": ["合肥市", "340000"],
        "340102": ["瑶海区", "340100"],
        "340103": ["庐阳区", "340100"],
        "340104": ["蜀山区", "340100"],
        "340111": ["包河区", "340100"],
        "340121": ["长丰县", "340100"],
        "340122": ["肥东县", "340100"],
        "340123": ["肥西县", "340100"],
        "340151": ["高新区", "340100"],
        "340191": ["中区", "340100"],
        "340192": ["其它区", "340100"],
        "340200": ["芜湖市", "340000"],
        "340202": ["镜湖区", "340200"],
        "340203": ["弋江区", "340200"],
        "340207": ["鸠江区", "340200"],
        "340208": ["三山区", "340200"],
        "340221": ["芜湖县", "340200"],
        "340222": ["繁昌县", "340200"],
        "340223": ["南陵县", "340200"],
        "340224": ["其它区", "340200"],
        "340300": ["蚌埠市", "340000"],
        "340302": ["龙子湖区", "340300"],
        "340303": ["蚌山区", "340300"],
        "340304": ["禹会区", "340300"],
        "340311": ["淮上区", "340300"],
        "340321": ["怀远县", "340300"],
        "340322": ["五河县", "340300"],
        "340323": ["固镇县", "340300"],
        "340324": ["其它区", "340300"],
        "340400": ["淮南市", "340000"],
        "340402": ["大通区", "340400"],
        "340403": ["田家庵区", "340400"],
        "340404": ["谢家集区", "340400"],
        "340405": ["八公山区", "340400"],
        "340406": ["潘集区", "340400"],
        "340421": ["凤台县", "340400"],
        "340422": ["其它区", "340400"],
        "340500": ["马鞍山市", "340000"],
        "340502": ["金家庄区", "340500"],
        "340503": ["花山区", "340500"],
        "340504": ["雨山区", "340500"],
        "340521": ["当涂县", "340500"],
        "340522": ["其它区", "340500"],
        "340600": ["淮北市", "340000"],
        "340602": ["杜集区", "340600"],
        "340603": ["相山区", "340600"],
        "340604": ["烈山区", "340600"],
        "340621": ["濉溪县", "340600"],
        "340622": ["其它区", "340600"],
        "340700": ["铜陵市", "340000"],
        "340702": ["铜官山区", "340700"],
        "340703": ["狮子山区", "340700"],
        "340711": ["郊区", "340700"],
        "340721": ["铜陵县", "340700"],
        "340722": ["其它区", "340700"],
        "340800": ["安庆市", "340000"],
        "340802": ["迎江区", "340800"],
        "340803": ["大观区", "340800"],
        "340811": ["宜秀区", "340800"],
        "340822": ["怀宁县", "340800"],
        "340823": ["枞阳县", "340800"],
        "340824": ["潜山县", "340800"],
        "340825": ["太湖县", "340800"],
        "340826": ["宿松县", "340800"],
        "340827": ["望江县", "340800"],
        "340828": ["岳西县", "340800"],
        "340881": ["桐城市", "340800"],
        "340882": ["其它区", "340800"],
        "341000": ["黄山市", "340000"],
        "341002": ["屯溪区", "341000"],
        "341003": ["黄山区", "341000"],
        "341004": ["徽州区", "341000"],
        "341021": ["歙县", "341000"],
        "341022": ["休宁县", "341000"],
        "341023": ["黟县", "341000"],
        "341024": ["祁门县", "341000"],
        "341025": ["其它区", "341000"],
        "341100": ["滁州市", "340000"],
        "341102": ["琅琊区", "341100"],
        "341103": ["南谯区", "341100"],
        "341122": ["来安县", "341100"],
        "341124": ["全椒县", "341100"],
        "341125": ["定远县", "341100"],
        "341126": ["凤阳县", "341100"],
        "341181": ["天长市", "341100"],
        "341182": ["明光市", "341100"],
        "341183": ["其它区", "341100"],
        "341200": ["阜阳市", "340000"],
        "341202": ["颍州区", "341200"],
        "341203": ["颍东区", "341200"],
        "341204": ["颍泉区", "341200"],
        "341221": ["临泉县", "341200"],
        "341222": ["太和县", "341200"],
        "341225": ["阜南县", "341200"],
        "341226": ["颍上县", "341200"],
        "341282": ["界首市", "341200"],
        "341283": ["其它区", "341200"],
        "341300": ["宿州市", "340000"],
        "341302": ["埇桥区", "341300"],
        "341321": ["砀山县", "341300"],
        "341322": ["萧县", "341300"],
        "341323": ["灵璧县", "341300"],
        "341324": ["泗县", "341300"],
        "341325": ["其它区", "341300"],
        "341400": ["巢湖市", "340100"],
        "341402": ["居巢区", "340100"],
        "341421": ["庐江县", "340100"],
        "341422": ["无为县", "340200"],
        "341423": ["含山县", "340500"],
        "341424": ["和县", "340500"],
        "341500": ["六安市", "340000"],
        "341502": ["金安区", "341500"],
        "341503": ["裕安区", "341500"],
        "341521": ["寿县", "341500"],
        "341522": ["霍邱县", "341500"],
        "341523": ["舒城县", "341500"],
        "341524": ["金寨县", "341500"],
        "341525": ["霍山县", "341500"],
        "341526": ["其它区", "341500"],
        "341600": ["亳州市", "340000"],
        "341602": ["谯城区", "341600"],
        "341621": ["涡阳县", "341600"],
        "341622": ["蒙城县", "341600"],
        "341623": ["利辛县", "341600"],
        "341624": ["其它区", "341600"],
        "341700": ["池州市", "340000"],
        "341702": ["贵池区", "341700"],
        "341721": ["东至县", "341700"],
        "341722": ["石台县", "341700"],
        "341723": ["青阳县", "341700"],
        "341724": ["其它区", "341700"],
        "341800": ["宣城市", "340000"],
        "341802": ["宣州区", "341800"],
        "341821": ["郎溪县", "341800"],
        "341822": ["广德县", "341800"],
        "341823": ["泾县", "341800"],
        "341824": ["绩溪县", "341800"],
        "341825": ["旌德县", "341800"],
        "341881": ["宁国市", "341800"],
        "341882": ["其它区", "341800"],
        "350000": ["福建省", "1"],
        "350100": ["福州市", "350000"],
        "350102": ["鼓楼区", "350100"],
        "350103": ["台江区", "350100"],
        "350104": ["仓山区", "350100"],
        "350105": ["马尾区", "350100"],
        "350111": ["晋安区", "350100"],
        "350121": ["闽侯县", "350100"],
        "350122": ["连江县", "350100"],
        "350123": ["罗源县", "350100"],
        "350124": ["闽清县", "350100"],
        "350125": ["永泰县", "350100"],
        "350128": ["平潭县", "350100"],
        "350181": ["福清市", "350100"],
        "350182": ["长乐市", "350100"],
        "350183": ["其它区", "350100"],
        "350200": ["厦门市", "350000"],
        "350203": ["思明区", "350200"],
        "350205": ["海沧区", "350200"],
        "350206": ["湖里区", "350200"],
        "350211": ["集美区", "350200"],
        "350212": ["同安区", "350200"],
        "350213": ["翔安区", "350200"],
        "350214": ["其它区", "350200"],
        "350300": ["莆田市", "350000"],
        "350302": ["城厢区", "350300"],
        "350303": ["涵江区", "350300"],
        "350304": ["荔城区", "350300"],
        "350305": ["秀屿区", "350300"],
        "350322": ["仙游县", "350300"],
        "350323": ["其它区", "350300"],
        "350400": ["三明市", "350000"],
        "350402": ["梅列区", "350400"],
        "350403": ["三元区", "350400"],
        "350421": ["明溪县", "350400"],
        "350423": ["清流县", "350400"],
        "350424": ["宁化县", "350400"],
        "350425": ["大田县", "350400"],
        "350426": ["尤溪县", "350400"],
        "350427": ["沙县", "350400"],
        "350428": ["将乐县", "350400"],
        "350429": ["泰宁县", "350400"],
        "350430": ["建宁县", "350400"],
        "350481": ["永安市", "350400"],
        "350482": ["其它区", "350400"],
        "350500": ["泉州市", "350000"],
        "350502": ["鲤城区", "350500"],
        "350503": ["丰泽区", "350500"],
        "350504": ["洛江区", "350500"],
        "350505": ["泉港区", "350500"],
        "350521": ["惠安县", "350500"],
        "350524": ["安溪县", "350500"],
        "350525": ["永春县", "350500"],
        "350526": ["德化县", "350500"],
        "350527": ["金门县", "350500"],
        "350581": ["石狮市", "350500"],
        "350582": ["晋江市", "350500"],
        "350583": ["南安市", "350500"],
        "350584": ["其它区", "350500"],
        "350600": ["漳州市", "350000"],
        "350602": ["芗城区", "350600"],
        "350603": ["龙文区", "350600"],
        "350622": ["云霄县", "350600"],
        "350623": ["漳浦县", "350600"],
        "350624": ["诏安县", "350600"],
        "350625": ["长泰县", "350600"],
        "350626": ["东山县", "350600"],
        "350627": ["南靖县", "350600"],
        "350628": ["平和县", "350600"],
        "350629": ["华安县", "350600"],
        "350681": ["龙海市", "350600"],
        "350682": ["其它区", "350600"],
        "350700": ["南平市", "350000"],
        "350702": ["延平区", "350700"],
        "350721": ["顺昌县", "350700"],
        "350722": ["浦城县", "350700"],
        "350723": ["光泽县", "350700"],
        "350724": ["松溪县", "350700"],
        "350725": ["政和县", "350700"],
        "350781": ["邵武市", "350700"],
        "350782": ["武夷山市", "350700"],
        "350783": ["建瓯市", "350700"],
        "350784": ["建阳市", "350700"],
        "350785": ["其它区", "350700"],
        "350800": ["龙岩市", "350000"],
        "350802": ["新罗区", "350800"],
        "350821": ["长汀县", "350800"],
        "350822": ["永定县", "350800"],
        "350823": ["上杭县", "350800"],
        "350824": ["武平县", "350800"],
        "350825": ["连城县", "350800"],
        "350881": ["漳平市", "350800"],
        "350882": ["其它区", "350800"],
        "350900": ["宁德市", "350000"],
        "350902": ["蕉城区", "350900"],
        "350921": ["霞浦县", "350900"],
        "350922": ["古田县", "350900"],
        "350923": ["屏南县", "350900"],
        "350924": ["寿宁县", "350900"],
        "350925": ["周宁县", "350900"],
        "350926": ["柘荣县", "350900"],
        "350981": ["福安市", "350900"],
        "350982": ["福鼎市", "350900"],
        "350983": ["其它区", "350900"],
        "360000": ["江西省", "1"],
        "360100": ["南昌市", "360000"],
        "360102": ["东湖区", "360100"],
        "360103": ["西湖区", "360100"],
        "360104": ["青云谱区", "360100"],
        "360105": ["湾里区", "360100"],
        "360111": ["青山湖区", "360100"],
        "360121": ["南昌县", "360100"],
        "360122": ["新建县", "360100"],
        "360123": ["安义县", "360100"],
        "360124": ["进贤县", "360100"],
        "360125": ["红谷滩新区", "360100"],
        "360126": ["经济技术开发区", "360100"],
        "360127": ["昌北区", "360100"],
        "360128": ["其它区", "360100"],
        "360200": ["景德镇市", "360000"],
        "360202": ["昌江区", "360200"],
        "360203": ["珠山区", "360200"],
        "360222": ["浮梁县", "360200"],
        "360281": ["乐平市", "360200"],
        "360282": ["其它区", "360200"],
        "360300": ["萍乡市", "360000"],
        "360302": ["安源区", "360300"],
        "360313": ["湘东区", "360300"],
        "360321": ["莲花县", "360300"],
        "360322": ["上栗县", "360300"],
        "360323": ["芦溪县", "360300"],
        "360324": ["其它区", "360300"],
        "360400": ["九江市", "360000"],
        "360402": ["庐山区", "360400"],
        "360403": ["浔阳区", "360400"],
        "360421": ["九江县", "360400"],
        "360423": ["武宁县", "360400"],
        "360424": ["修水县", "360400"],
        "360425": ["永修县", "360400"],
        "360426": ["德安县", "360400"],
        "360427": ["星子县", "360400"],
        "360428": ["都昌县", "360400"],
        "360429": ["湖口县", "360400"],
        "360430": ["彭泽县", "360400"],
        "360481": ["瑞昌市", "360400"],
        "360482": ["其它区", "360400"],
        "360500": ["新余市", "360000"],
        "360502": ["渝水区", "360500"],
        "360521": ["分宜县", "360500"],
        "360522": ["其它区", "360500"],
        "360600": ["鹰潭市", "360000"],
        "360602": ["月湖区", "360600"],
        "360622": ["余江县", "360600"],
        "360681": ["贵溪市", "360600"],
        "360682": ["其它区", "360600"],
        "360700": ["赣州市", "360000"],
        "360702": ["章贡区", "360700"],
        "360721": ["赣县", "360700"],
        "360722": ["信丰县", "360700"],
        "360723": ["大余县", "360700"],
        "360724": ["上犹县", "360700"],
        "360725": ["崇义县", "360700"],
        "360726": ["安远县", "360700"],
        "360727": ["龙南县", "360700"],
        "360728": ["定南县", "360700"],
        "360729": ["全南县", "360700"],
        "360730": ["宁都县", "360700"],
        "360731": ["于都县", "360700"],
        "360732": ["兴国县", "360700"],
        "360733": ["会昌县", "360700"],
        "360734": ["寻乌县", "360700"],
        "360735": ["石城县", "360700"],
        "360751": ["黄金区", "360700"],
        "360781": ["瑞金市", "360700"],
        "360782": ["南康市", "360700"],
        "360783": ["其它区", "360700"],
        "360800": ["吉安市", "360000"],
        "360802": ["吉州区", "360800"],
        "360803": ["青原区", "360800"],
        "360821": ["吉安县", "360800"],
        "360822": ["吉水县", "360800"],
        "360823": ["峡江县", "360800"],
        "360824": ["新干县", "360800"],
        "360825": ["永丰县", "360800"],
        "360826": ["泰和县", "360800"],
        "360827": ["遂川县", "360800"],
        "360828": ["万安县", "360800"],
        "360829": ["安福县", "360800"],
        "360830": ["永新县", "360800"],
        "360881": ["井冈山市", "360800"],
        "360882": ["其它区", "360800"],
        "360900": ["宜春市", "360000"],
        "360902": ["袁州区", "360900"],
        "360921": ["奉新县", "360900"],
        "360922": ["万载县", "360900"],
        "360923": ["上高县", "360900"],
        "360924": ["宜丰县", "360900"],
        "360925": ["靖安县", "360900"],
        "360926": ["铜鼓县", "360900"],
        "360981": ["丰城市", "360900"],
        "360982": ["樟树市", "360900"],
        "360983": ["高安市", "360900"],
        "360984": ["其它区", "360900"],
        "361000": ["抚州市", "360000"],
        "361002": ["临川区", "361000"],
        "361021": ["南城县", "361000"],
        "361022": ["黎川县", "361000"],
        "361023": ["南丰县", "361000"],
        "361024": ["崇仁县", "361000"],
        "361025": ["乐安县", "361000"],
        "361026": ["宜黄县", "361000"],
        "361027": ["金溪县", "361000"],
        "361028": ["资溪县", "361000"],
        "361029": ["东乡县", "361000"],
        "361030": ["广昌县", "361000"],
        "361031": ["其它区", "361000"],
        "361100": ["上饶市", "360000"],
        "361102": ["信州区", "361100"],
        "361121": ["上饶县", "361100"],
        "361122": ["广丰县", "361100"],
        "361123": ["玉山县", "361100"],
        "361124": ["铅山县", "361100"],
        "361125": ["横峰县", "361100"],
        "361126": ["弋阳县", "361100"],
        "361127": ["余干县", "361100"],
        "361128": ["鄱阳县", "361100"],
        "361129": ["万年县", "361100"],
        "361130": ["婺源县", "361100"],
        "361181": ["德兴市", "361100"],
        "361182": ["其它区", "361100"],
        "370000": ["山东省", "1"],
        "370100": ["济南市", "370000"],
        "370102": ["历下区", "370100"],
        "370103": ["市中区", "370100"],
        "370104": ["槐荫区", "370100"],
        "370105": ["天桥区", "370100"],
        "370112": ["历城区", "370100"],
        "370113": ["长清区", "370100"],
        "370124": ["平阴县", "370100"],
        "370125": ["济阳县", "370100"],
        "370126": ["商河县", "370100"],
        "370181": ["章丘市", "370100"],
        "370182": ["其它区", "370100"],
        "370200": ["青岛市", "370000"],
        "370202": ["市南区", "370200"],
        "370203": ["市北区", "370200"],
        "370205": ["四方区", "370200"],
        "370211": ["黄岛区", "370200"],
        "370212": ["崂山区", "370200"],
        "370213": ["李沧区", "370200"],
        "370214": ["城阳区", "370200"],
        "370251": ["开发区", "370200"],
        "370281": ["胶州市", "370200"],
        "370282": ["即墨市", "370200"],
        "370283": ["平度市", "370200"],
        "370284": ["胶南市", "370200"],
        "370285": ["莱西市", "370200"],
        "370286": ["其它区", "370200"],
        "370300": ["淄博市", "370000"],
        "370302": ["淄川区", "370300"],
        "370303": ["张店区", "370300"],
        "370304": ["博山区", "370300"],
        "370305": ["临淄区", "370300"],
        "370306": ["周村区", "370300"],
        "370321": ["桓台县", "370300"],
        "370322": ["高青县", "370300"],
        "370323": ["沂源县", "370300"],
        "370324": ["其它区", "370300"],
        "370400": ["枣庄市", "370000"],
        "370402": ["市中区", "370400"],
        "370403": ["薛城区", "370400"],
        "370404": ["峄城区", "370400"],
        "370405": ["台儿庄区", "370400"],
        "370406": ["山亭区", "370400"],
        "370481": ["滕州市", "370400"],
        "370482": ["其它区", "370400"],
        "370500": ["东营市", "370000"],
        "370502": ["东营区", "370500"],
        "370503": ["河口区", "370500"],
        "370521": ["垦利县", "370500"],
        "370522": ["利津县", "370500"],
        "370523": ["广饶县", "370500"],
        "370589": ["西城区", "370500"],
        "370590": ["东城区", "370500"],
        "370591": ["其它区", "370500"],
        "370600": ["烟台市", "370000"],
        "370602": ["芝罘区", "370600"],
        "370611": ["福山区", "370600"],
        "370612": ["牟平区", "370600"],
        "370613": ["莱山区", "370600"],
        "370634": ["长岛县", "370600"],
        "370681": ["龙口市", "370600"],
        "370682": ["莱阳市", "370600"],
        "370683": ["莱州市", "370600"],
        "370684": ["蓬莱市", "370600"],
        "370685": ["招远市", "370600"],
        "370686": ["栖霞市", "370600"],
        "370687": ["海阳市", "370600"],
        "370688": ["其它区", "370600"],
        "370700": ["潍坊市", "370000"],
        "370702": ["潍城区", "370700"],
        "370703": ["寒亭区", "370700"],
        "370704": ["坊子区", "370700"],
        "370705": ["奎文区", "370700"],
        "370724": ["临朐县", "370700"],
        "370725": ["昌乐县", "370700"],
        "370751": ["开发区", "370700"],
        "370781": ["青州市", "370700"],
        "370782": ["诸城市", "370700"],
        "370783": ["寿光市", "370700"],
        "370784": ["安丘市", "370700"],
        "370785": ["高密市", "370700"],
        "370786": ["昌邑市", "370700"],
        "370787": ["其它区", "370700"],
        "370800": ["济宁市", "370000"],
        "370802": ["市中区", "370800"],
        "370811": ["任城区", "370800"],
        "370826": ["微山县", "370800"],
        "370827": ["鱼台县", "370800"],
        "370828": ["金乡县", "370800"],
        "370829": ["嘉祥县", "370800"],
        "370830": ["汶上县", "370800"],
        "370831": ["泗水县", "370800"],
        "370832": ["梁山县", "370800"],
        "370881": ["曲阜市", "370800"],
        "370882": ["兖州市", "370800"],
        "370883": ["邹城市", "370800"],
        "370884": ["其它区", "370800"],
        "370900": ["泰安市", "370000"],
        "370902": ["泰山区", "370900"],
        "370903": ["岱岳区", "370900"],
        "370921": ["宁阳县", "370900"],
        "370923": ["东平县", "370900"],
        "370982": ["新泰市", "370900"],
        "370983": ["肥城市", "370900"],
        "370984": ["其它区", "370900"],
        "371000": ["威海市", "370000"],
        "371002": ["环翠区", "371000"],
        "371081": ["文登市", "371000"],
        "371082": ["荣成市", "371000"],
        "371083": ["乳山市", "371000"],
        "371084": ["其它区", "371000"],
        "371100": ["日照市", "370000"],
        "371102": ["东港区", "371100"],
        "371103": ["岚山区", "371100"],
        "371121": ["五莲县", "371100"],
        "371122": ["莒县", "371100"],
        "371123": ["其它区", "371100"],
        "371200": ["莱芜市", "370000"],
        "371202": ["莱城区", "371200"],
        "371203": ["钢城区", "371200"],
        "371204": ["其它区", "371200"],
        "371300": ["临沂市", "370000"],
        "371302": ["兰山区", "371300"],
        "371311": ["罗庄区", "371300"],
        "371312": ["河东区", "371300"],
        "371321": ["沂南县", "371300"],
        "371322": ["郯城县", "371300"],
        "371323": ["沂水县", "371300"],
        "371324": ["苍山县", "371300"],
        "371325": ["费县", "371300"],
        "371326": ["平邑县", "371300"],
        "371327": ["莒南县", "371300"],
        "371328": ["蒙阴县", "371300"],
        "371329": ["临沭县", "371300"],
        "371330": ["其它区", "371300"],
        "371400": ["德州市", "370000"],
        "371402": ["德城区", "371400"],
        "371421": ["陵县", "371400"],
        "371422": ["宁津县", "371400"],
        "371423": ["庆云县", "371400"],
        "371424": ["临邑县", "371400"],
        "371425": ["齐河县", "371400"],
        "371426": ["平原县", "371400"],
        "371427": ["夏津县", "371400"],
        "371428": ["武城县", "371400"],
        "371451": ["开发区", "371400"],
        "371481": ["乐陵市", "371400"],
        "371482": ["禹城市", "371400"],
        "371483": ["其它区", "371400"],
        "371500": ["聊城市", "370000"],
        "371502": ["东昌府区", "371500"],
        "371521": ["阳谷县", "371500"],
        "371522": ["莘县", "371500"],
        "371523": ["茌平县", "371500"],
        "371524": ["东阿县", "371500"],
        "371525": ["冠县", "371500"],
        "371526": ["高唐县", "371500"],
        "371581": ["临清市", "371500"],
        "371582": ["其它区", "371500"],
        "371600": ["滨州市", "370000"],
        "371602": ["滨城区", "371600"],
        "371621": ["惠民县", "371600"],
        "371622": ["阳信县", "371600"],
        "371623": ["无棣县", "371600"],
        "371624": ["沾化县", "371600"],
        "371625": ["博兴县", "371600"],
        "371626": ["邹平县", "371600"],
        "371627": ["其它区", "371600"],
        "371700": ["菏泽市", "370000"],
        "371702": ["牡丹区", "371700"],
        "371721": ["曹县", "371700"],
        "371722": ["单县", "371700"],
        "371723": ["成武县", "371700"],
        "371724": ["巨野县", "371700"],
        "371725": ["郓城县", "371700"],
        "371726": ["鄄城县", "371700"],
        "371727": ["定陶县", "371700"],
        "371728": ["东明县", "371700"],
        "371729": ["其它区", "371700"],
        "410000": ["河南省", "1"],
        "410100": ["郑州市", "410000"],
        "410102": ["中原区", "410100"],
        "410103": ["二七区", "410100"],
        "410104": ["管城回族区", "410100"],
        "410105": ["金水区", "410100"],
        "410106": ["上街区", "410100"],
        "410108": ["惠济区", "410100"],
        "410122": ["中牟县", "410100"],
        "410181": ["巩义市", "410100"],
        "410182": ["荥阳市", "410100"],
        "410183": ["新密市", "410100"],
        "410184": ["新郑市", "410100"],
        "410185": ["登封市", "410100"],
        "410186": ["郑东新区", "410100"],
        "410187": ["高新区", "410100"],
        "410188": ["其它区", "410100"],
        "410200": ["开封市", "410000"],
        "410202": ["龙亭区", "410200"],
        "410203": ["顺河回族区", "410200"],
        "410204": ["鼓楼区", "410200"],
        "410205": ["禹王台区", "410200"],
        "410211": ["金明区", "410200"],
        "410221": ["杞县", "410200"],
        "410222": ["通许县", "410200"],
        "410223": ["尉氏县", "410200"],
        "410224": ["开封县", "410200"],
        "410225": ["兰考县", "410200"],
        "410226": ["其它区", "410200"],
        "410300": ["洛阳市", "410000"],
        "410302": ["老城区", "410300"],
        "410303": ["西工区", "410300"],
        "410304": ["廛河回族区", "410300"],
        "410305": ["涧西区", "410300"],
        "410306": ["吉利区", "410300"],
        "410307": ["洛龙区", "410300"],
        "410322": ["孟津县", "410300"],
        "410323": ["新安县", "410300"],
        "410324": ["栾川县", "410300"],
        "410325": ["嵩县", "410300"],
        "410326": ["汝阳县", "410300"],
        "410327": ["宜阳县", "410300"],
        "410328": ["洛宁县", "410300"],
        "410329": ["伊川县", "410300"],
        "410381": ["偃师市", "410300"],
        "410400": ["平顶山市", "410000"],
        "410402": ["新华区", "410400"],
        "410403": ["卫东区", "410400"],
        "410404": ["石龙区", "410400"],
        "410411": ["湛河区", "410400"],
        "410421": ["宝丰县", "410400"],
        "410422": ["叶县", "410400"],
        "410423": ["鲁山县", "410400"],
        "410425": ["郏县", "410400"],
        "410481": ["舞钢市", "410400"],
        "410482": ["汝州市", "410400"],
        "410483": ["其它区", "410400"],
        "410500": ["安阳市", "410000"],
        "410502": ["文峰区", "410500"],
        "410503": ["北关区", "410500"],
        "410505": ["殷都区", "410500"],
        "410506": ["龙安区", "410500"],
        "410522": ["安阳县", "410500"],
        "410523": ["汤阴县", "410500"],
        "410526": ["滑县", "410500"],
        "410527": ["内黄县", "410500"],
        "410581": ["林州市", "410500"],
        "410582": ["其它区", "410500"],
        "410600": ["鹤壁市", "410000"],
        "410602": ["鹤山区", "410600"],
        "410603": ["山城区", "410600"],
        "410611": ["淇滨区", "410600"],
        "410621": ["浚县", "410600"],
        "410622": ["淇县", "410600"],
        "410623": ["其它区", "410600"],
        "410700": ["新乡市", "410000"],
        "410702": ["红旗区", "410700"],
        "410703": ["卫滨区", "410700"],
        "410704": ["凤泉区", "410700"],
        "410711": ["牧野区", "410700"],
        "410721": ["新乡县", "410700"],
        "410724": ["获嘉县", "410700"],
        "410725": ["原阳县", "410700"],
        "410726": ["延津县", "410700"],
        "410727": ["封丘县", "410700"],
        "410728": ["长垣县", "410700"],
        "410781": ["卫辉市", "410700"],
        "410782": ["辉县市", "410700"],
        "410783": ["其它区", "410700"],
        "410800": ["焦作市", "410000"],
        "410802": ["解放区", "410800"],
        "410803": ["中站区", "410800"],
        "410804": ["马村区", "410800"],
        "410811": ["山阳区", "410800"],
        "410821": ["修武县", "410800"],
        "410822": ["博爱县", "410800"],
        "410823": ["武陟县", "410800"],
        "410825": ["温县", "410800"],
        "410881": ["济源市", "410000"],
        "410882": ["沁阳市", "410800"],
        "410883": ["孟州市", "410800"],
        "410884": ["其它区", "410800"],
        "410900": ["濮阳市", "410000"],
        "410902": ["华龙区", "410900"],
        "410922": ["清丰县", "410900"],
        "410923": ["南乐县", "410900"],
        "410926": ["范县", "410900"],
        "410927": ["台前县", "410900"],
        "410928": ["濮阳县", "410900"],
        "410929": ["其它区", "410900"],
        "411000": ["许昌市", "410000"],
        "411002": ["魏都区", "411000"],
        "411023": ["许昌县", "411000"],
        "411024": ["鄢陵县", "411000"],
        "411025": ["襄城县", "411000"],
        "411081": ["禹州市", "411000"],
        "411082": ["长葛市", "411000"],
        "411083": ["其它区", "411000"],
        "411100": ["漯河市", "410000"],
        "411102": ["源汇区", "411100"],
        "411103": ["郾城区", "411100"],
        "411104": ["召陵区", "411100"],
        "411121": ["舞阳县", "411100"],
        "411122": ["临颍县", "411100"],
        "411123": ["其它区", "411100"],
        "411200": ["三门峡市", "410000"],
        "411202": ["湖滨区", "411200"],
        "411221": ["渑池县", "411200"],
        "411222": ["陕县", "411200"],
        "411224": ["卢氏县", "411200"],
        "411281": ["义马市", "411200"],
        "411282": ["灵宝市", "411200"],
        "411283": ["其它区", "411200"],
        "411300": ["南阳市", "410000"],
        "411302": ["宛城区", "411300"],
        "411303": ["卧龙区", "411300"],
        "411321": ["南召县", "411300"],
        "411322": ["方城县", "411300"],
        "411323": ["西峡县", "411300"],
        "411324": ["镇平县", "411300"],
        "411325": ["内乡县", "411300"],
        "411326": ["淅川县", "411300"],
        "411327": ["社旗县", "411300"],
        "411328": ["唐河县", "411300"],
        "411329": ["新野县", "411300"],
        "411330": ["桐柏县", "411300"],
        "411381": ["邓州市", "411300"],
        "411382": ["其它区", "411300"],
        "411400": ["商丘市", "410000"],
        "411402": ["梁园区", "411400"],
        "411403": ["睢阳区", "411400"],
        "411421": ["民权县", "411400"],
        "411422": ["睢县", "411400"],
        "411423": ["宁陵县", "411400"],
        "411424": ["柘城县", "411400"],
        "411425": ["虞城县", "411400"],
        "411426": ["夏邑县", "411400"],
        "411481": ["永城市", "411400"],
        "411482": ["其它区", "411400"],
        "411500": ["信阳市", "410000"],
        "411502": ["浉河区", "411500"],
        "411503": ["平桥区", "411500"],
        "411521": ["罗山县", "411500"],
        "411522": ["光山县", "411500"],
        "411523": ["新县", "411500"],
        "411524": ["商城县", "411500"],
        "411525": ["固始县", "411500"],
        "411526": ["潢川县", "411500"],
        "411527": ["淮滨县", "411500"],
        "411528": ["息县", "411500"],
        "411529": ["其它区", "411500"],
        "411600": ["周口市", "410000"],
        "411602": ["川汇区", "411600"],
        "411621": ["扶沟县", "411600"],
        "411622": ["西华县", "411600"],
        "411623": ["商水县", "411600"],
        "411624": ["沈丘县", "411600"],
        "411625": ["郸城县", "411600"],
        "411626": ["淮阳县", "411600"],
        "411627": ["太康县", "411600"],
        "411628": ["鹿邑县", "411600"],
        "411681": ["项城市", "411600"],
        "411682": ["其它区", "411600"],
        "411700": ["驻马店市", "410000"],
        "411702": ["驿城区", "411700"],
        "411721": ["西平县", "411700"],
        "411722": ["上蔡县", "411700"],
        "411723": ["平舆县", "411700"],
        "411724": ["正阳县", "411700"],
        "411725": ["确山县", "411700"],
        "411726": ["泌阳县", "411700"],
        "411727": ["汝南县", "411700"],
        "411728": ["遂平县", "411700"],
        "411729": ["新蔡县", "411700"],
        "411730": ["其它区", "411700"],
        "420000": ["湖北省", "1"],
        "420100": ["武汉市", "420000"],
        "420102": ["江岸区", "420100"],
        "420103": ["江汉区", "420100"],
        "420104": ["硚口区", "420100"],
        "420105": ["汉阳区", "420100"],
        "420106": ["武昌区", "420100"],
        "420107": ["青山区", "420100"],
        "420111": ["洪山区", "420100"],
        "420112": ["东西湖区", "420100"],
        "420113": ["汉南区", "420100"],
        "420114": ["蔡甸区", "420100"],
        "420115": ["江夏区", "420100"],
        "420116": ["黄陂区", "420100"],
        "420117": ["新洲区", "420100"],
        "420118": ["其它区", "420100"],
        "420200": ["黄石市", "420000"],
        "420202": ["黄石港区", "420200"],
        "420203": ["西塞山区", "420200"],
        "420204": ["下陆区", "420200"],
        "420205": ["铁山区", "420200"],
        "420222": ["阳新县", "420200"],
        "420281": ["大冶市", "420200"],
        "420282": ["其它区", "420200"],
        "420300": ["十堰市", "420000"],
        "420302": ["茅箭区", "420300"],
        "420303": ["张湾区", "420300"],
        "420321": ["郧县", "420300"],
        "420322": ["郧西县", "420300"],
        "420323": ["竹山县", "420300"],
        "420324": ["竹溪县", "420300"],
        "420325": ["房县", "420300"],
        "420381": ["丹江口市", "420300"],
        "420382": ["城区", "420300"],
        "420383": ["其它区", "420300"],
        "420500": ["宜昌市", "420000"],
        "420502": ["西陵区", "420500"],
        "420503": ["伍家岗区", "420500"],
        "420504": ["点军区", "420500"],
        "420505": ["猇亭区", "420500"],
        "420506": ["夷陵区", "420500"],
        "420525": ["远安县", "420500"],
        "420526": ["兴山县", "420500"],
        "420527": ["秭归县", "420500"],
        "420528": ["长阳土家族自治县", "420500"],
        "420529": ["五峰土家族自治县", "420500"],
        "420551": ["葛洲坝区", "420500"],
        "420552": ["开发区", "420500"],
        "420581": ["宜都市", "420500"],
        "420582": ["当阳市", "420500"],
        "420583": ["枝江市", "420500"],
        "420584": ["其它区", "420500"],
        "420600": ["襄阳市", "420000"],
        "420602": ["襄城区", "420600"],
        "420606": ["樊城区", "420600"],
        "420607": ["襄州区", "420600"],
        "420624": ["南漳县", "420600"],
        "420625": ["谷城县", "420600"],
        "420626": ["保康县", "420600"],
        "420682": ["老河口市", "420600"],
        "420683": ["枣阳市", "420600"],
        "420684": ["宜城市", "420600"],
        "420685": ["其它区", "420600"],
        "420700": ["鄂州市", "420000"],
        "420702": ["梁子湖区", "420700"],
        "420703": ["华容区", "420700"],
        "420704": ["鄂城区", "420700"],
        "420705": ["其它区", "420700"],
        "420800": ["荆门市", "420000"],
        "420802": ["东宝区", "420800"],
        "420804": ["掇刀区", "420800"],
        "420821": ["京山县", "420800"],
        "420822": ["沙洋县", "420800"],
        "420881": ["钟祥市", "420800"],
        "420882": ["其它区", "420800"],
        "420900": ["孝感市", "420000"],
        "420902": ["孝南区", "420900"],
        "420921": ["孝昌县", "420900"],
        "420922": ["大悟县", "420900"],
        "420923": ["云梦县", "420900"],
        "420981": ["应城市", "420900"],
        "420982": ["安陆市", "420900"],
        "420984": ["汉川市", "420900"],
        "420985": ["其它区", "420900"],
        "421000": ["荆州市", "420000"],
        "421002": ["沙市区", "421000"],
        "421003": ["荆州区", "421000"],
        "421022": ["公安县", "421000"],
        "421023": ["监利县", "421000"],
        "421024": ["江陵县", "421000"],
        "421081": ["石首市", "421000"],
        "421083": ["洪湖市", "421000"],
        "421087": ["松滋市", "421000"],
        "421088": ["其它区", "421000"],
        "421100": ["黄冈市", "420000"],
        "421102": ["黄州区", "421100"],
        "421121": ["团风县", "421100"],
        "421122": ["红安县", "421100"],
        "421123": ["罗田县", "421100"],
        "421124": ["英山县", "421100"],
        "421125": ["浠水县", "421100"],
        "421126": ["蕲春县", "421100"],
        "421127": ["黄梅县", "421100"],
        "421181": ["麻城市", "421100"],
        "421182": ["武穴市", "421100"],
        "421183": ["其它区", "421100"],
        "421200": ["咸宁市", "420000"],
        "421202": ["咸安区", "421200"],
        "421221": ["嘉鱼县", "421200"],
        "421222": ["通城县", "421200"],
        "421223": ["崇阳县", "421200"],
        "421224": ["通山县", "421200"],
        "421281": ["赤壁市", "421200"],
        "421282": ["温泉城区", "421200"],
        "421283": ["其它区", "421200"],
        "421300": ["随州市", "420000"],
        "421302": ["曾都区", "421300"],
        "421321": ["随县", "421300"],
        "421381": ["广水市", "421300"],
        "421382": ["其它区", "421300"],
        "422800": ["恩施土家族苗族自治州", "420000"],
        "422801": ["恩施市", "422800"],
        "422802": ["利川市", "422800"],
        "422822": ["建始县", "422800"],
        "422823": ["巴东县", "422800"],
        "422825": ["宣恩县", "422800"],
        "422826": ["咸丰县", "422800"],
        "422827": ["来凤县", "422800"],
        "422828": ["鹤峰县", "422800"],
        "422829": ["其它区", "422800"],
        "429004": ["仙桃市", "420000"],
        "429005": ["潜江市", "420000"],
        "429006": ["天门市", "420000"],
        "429021": ["神农架林区", "420000"],
        "430000": ["湖南省", "1"],
        "430100": ["长沙市", "430000"],
        "430102": ["芙蓉区", "430100"],
        "430103": ["天心区", "430100"],
        "430104": ["岳麓区", "430100"],
        "430105": ["开福区", "430100"],
        "430111": ["雨花区", "430100"],
        "430121": ["长沙县", "430100"],
        "430122": ["望城县", "430100"],
        "430124": ["宁乡县", "430100"],
        "430181": ["浏阳市", "430100"],
        "430182": ["其它区", "430100"],
        "430200": ["株洲市", "430000"],
        "430202": ["荷塘区", "430200"],
        "430203": ["芦淞区", "430200"],
        "430204": ["石峰区", "430200"],
        "430211": ["天元区", "430200"],
        "430221": ["株洲县", "430200"],
        "430223": ["攸县", "430200"],
        "430224": ["茶陵县", "430200"],
        "430225": ["炎陵县", "430200"],
        "430281": ["醴陵市", "430200"],
        "430282": ["其它区", "430200"],
        "430300": ["湘潭市", "430000"],
        "430302": ["雨湖区", "430300"],
        "430304": ["岳塘区", "430300"],
        "430321": ["湘潭县", "430300"],
        "430381": ["湘乡市", "430300"],
        "430382": ["韶山市", "430300"],
        "430383": ["其它区", "430300"],
        "430400": ["衡阳市", "430000"],
        "430405": ["珠晖区", "430400"],
        "430406": ["雁峰区", "430400"],
        "430407": ["石鼓区", "430400"],
        "430408": ["蒸湘区", "430400"],
        "430412": ["南岳区", "430400"],
        "430421": ["衡阳县", "430400"],
        "430422": ["衡南县", "430400"],
        "430423": ["衡山县", "430400"],
        "430424": ["衡东县", "430400"],
        "430426": ["祁东县", "430400"],
        "430481": ["耒阳市", "430400"],
        "430482": ["常宁市", "430400"],
        "430483": ["其它区", "430400"],
        "430500": ["邵阳市", "430000"],
        "430502": ["双清区", "430500"],
        "430503": ["大祥区", "430500"],
        "430511": ["北塔区", "430500"],
        "430521": ["邵东县", "430500"],
        "430522": ["新邵县", "430500"],
        "430523": ["邵阳县", "430500"],
        "430524": ["隆回县", "430500"],
        "430525": ["洞口县", "430500"],
        "430527": ["绥宁县", "430500"],
        "430528": ["新宁县", "430500"],
        "430529": ["城步苗族自治县", "430500"],
        "430581": ["武冈市", "430500"],
        "430582": ["其它区", "430500"],
        "430600": ["岳阳市", "430000"],
        "430602": ["岳阳楼区", "430600"],
        "430603": ["云溪区", "430600"],
        "430611": ["君山区", "430600"],
        "430621": ["岳阳县", "430600"],
        "430623": ["华容县", "430600"],
        "430624": ["湘阴县", "430600"],
        "430626": ["平江县", "430600"],
        "430681": ["汨罗市", "430600"],
        "430682": ["临湘市", "430600"],
        "430683": ["其它区", "430600"],
        "430700": ["常德市", "430000"],
        "430702": ["武陵区", "430700"],
        "430703": ["鼎城区", "430700"],
        "430721": ["安乡县", "430700"],
        "430722": ["汉寿县", "430700"],
        "430723": ["澧县", "430700"],
        "430724": ["临澧县", "430700"],
        "430725": ["桃源县", "430700"],
        "430726": ["石门县", "430700"],
        "430781": ["津市市", "430700"],
        "430782": ["其它区", "430700"],
        "430800": ["张家界市", "430000"],
        "430802": ["永定区", "430800"],
        "430811": ["武陵源区", "430800"],
        "430821": ["慈利县", "430800"],
        "430822": ["桑植县", "430800"],
        "430823": ["其它区", "430800"],
        "430900": ["益阳市", "430000"],
        "430902": ["资阳区", "430900"],
        "430903": ["赫山区", "430900"],
        "430921": ["南县", "430900"],
        "430922": ["桃江县", "430900"],
        "430923": ["安化县", "430900"],
        "430981": ["沅江市", "430900"],
        "430982": ["其它区", "430900"],
        "431000": ["郴州市", "430000"],
        "431002": ["北湖区", "431000"],
        "431003": ["苏仙区", "431000"],
        "431021": ["桂阳县", "431000"],
        "431022": ["宜章县", "431000"],
        "431023": ["永兴县", "431000"],
        "431024": ["嘉禾县", "431000"],
        "431025": ["临武县", "431000"],
        "431026": ["汝城县", "431000"],
        "431027": ["桂东县", "431000"],
        "431028": ["安仁县", "431000"],
        "431081": ["资兴市", "431000"],
        "431082": ["其它区", "431000"],
        "431100": ["永州市", "430000"],
        "431102": ["零陵区", "431100"],
        "431103": ["冷水滩区", "431100"],
        "431121": ["祁阳县", "431100"],
        "431122": ["东安县", "431100"],
        "431123": ["双牌县", "431100"],
        "431124": ["道县", "431100"],
        "431125": ["江永县", "431100"],
        "431126": ["宁远县", "431100"],
        "431127": ["蓝山县", "431100"],
        "431128": ["新田县", "431100"],
        "431129": ["江华瑶族自治县", "431100"],
        "431130": ["其它区", "431100"],
        "431200": ["怀化市", "430000"],
        "431202": ["鹤城区", "431200"],
        "431221": ["中方县", "431200"],
        "431222": ["沅陵县", "431200"],
        "431223": ["辰溪县", "431200"],
        "431224": ["溆浦县", "431200"],
        "431225": ["会同县", "431200"],
        "431226": ["麻阳苗族自治县", "431200"],
        "431227": ["新晃侗族自治县", "431200"],
        "431228": ["芷江侗族自治县", "431200"],
        "431229": ["靖州苗族侗族自治县", "431200"],
        "431230": ["通道侗族自治县", "431200"],
        "431281": ["洪江市", "431200"],
        "431282": ["其它区", "431200"],
        "431300": ["娄底市", "430000"],
        "431302": ["娄星区", "431300"],
        "431321": ["双峰县", "431300"],
        "431322": ["新化县", "431300"],
        "431381": ["冷水江市", "431300"],
        "431382": ["涟源市", "431300"],
        "431383": ["其它区", "431300"],
        "433100": ["湘西土家族苗族自治州", "430000"],
        "433101": ["吉首市", "433100"],
        "433122": ["泸溪县", "433100"],
        "433123": ["凤凰县", "433100"],
        "433124": ["花垣县", "433100"],
        "433125": ["保靖县", "433100"],
        "433126": ["古丈县", "433100"],
        "433127": ["永顺县", "433100"],
        "433130": ["龙山县", "433100"],
        "433131": ["其它区", "433100"],
        "440000": ["广东省", "1"],
        "440100": ["广州市", "440000"],
        "440103": ["荔湾区", "440100"],
        "440104": ["越秀区", "440100"],
        "440105": ["海珠区", "440100"],
        "440106": ["天河区", "440100"],
        "440111": ["白云区", "440100"],
        "440112": ["黄埔区", "440100"],
        "440113": ["番禺区", "440100"],
        "440114": ["花都区", "440100"],
        "440115": ["南沙区", "440100"],
        "440116": ["萝岗区", "440100"],
        "440183": ["增城市", "440100"],
        "440184": ["从化市", "440100"],
        "440188": ["东山区", "440100"],
        "440189": ["其它区", "440100"],
        "440200": ["韶关市", "440000"],
        "440203": ["武江区", "440200"],
        "440204": ["浈江区", "440200"],
        "440205": ["曲江区", "440200"],
        "440222": ["始兴县", "440200"],
        "440224": ["仁化县", "440200"],
        "440229": ["翁源县", "440200"],
        "440232": ["乳源瑶族自治县", "440200"],
        "440233": ["新丰县", "440200"],
        "440281": ["乐昌市", "440200"],
        "440282": ["南雄市", "440200"],
        "440283": ["其它区", "440200"],
        "440300": ["深圳市", "440000"],
        "440303": ["罗湖区", "440300"],
        "440304": ["福田区", "440300"],
        "440305": ["南山区", "440300"],
        "440306": ["宝安区", "440300"],
        "440307": ["龙岗区", "440300"],
        "440308": ["盐田区", "440300"],
        "440309": ["其它区", "440300"],
        "440400": ["珠海市", "440000"],
        "440402": ["香洲区", "440400"],
        "440403": ["斗门区", "440400"],
        "440404": ["金湾区", "440400"],
        "440486": ["金唐区", "440400"],
        "440487": ["南湾区", "440400"],
        "440488": ["其它区", "440400"],
        "440500": ["汕头市", "440000"],
        "440507": ["龙湖区", "440500"],
        "440511": ["金平区", "440500"],
        "440512": ["濠江区", "440500"],
        "440513": ["潮阳区", "440500"],
        "440514": ["潮南区", "440500"],
        "440515": ["澄海区", "440500"],
        "440523": ["南澳县", "440500"],
        "440524": ["其它区", "440500"],
        "440600": ["佛山市", "440000"],
        "440604": ["禅城区", "440600"],
        "440605": ["南海区", "440600"],
        "440606": ["顺德区", "440600"],
        "440607": ["三水区", "440600"],
        "440608": ["高明区", "440600"],
        "440609": ["其它区", "440600"],
        "440700": ["江门市", "440000"],
        "440703": ["蓬江区", "440700"],
        "440704": ["江海区", "440700"],
        "440705": ["新会区", "440700"],
        "440781": ["台山市", "440700"],
        "440783": ["开平市", "440700"],
        "440784": ["鹤山市", "440700"],
        "440785": ["恩平市", "440700"],
        "440786": ["其它区", "440700"],
        "440800": ["湛江市", "440000"],
        "440802": ["赤坎区", "440800"],
        "440803": ["霞山区", "440800"],
        "440804": ["坡头区", "440800"],
        "440811": ["麻章区", "440800"],
        "440823": ["遂溪县", "440800"],
        "440825": ["徐闻县", "440800"],
        "440881": ["廉江市", "440800"],
        "440882": ["雷州市", "440800"],
        "440883": ["吴川市", "440800"],
        "440884": ["其它区", "440800"],
        "440900": ["茂名市", "440000"],
        "440902": ["茂南区", "440900"],
        "440903": ["茂港区", "440900"],
        "440923": ["电白县", "440900"],
        "440981": ["高州市", "440900"],
        "440982": ["化州市", "440900"],
        "440983": ["信宜市", "440900"],
        "440984": ["其它区", "440900"],
        "441200": ["肇庆市", "440000"],
        "441202": ["端州区", "441200"],
        "441203": ["鼎湖区", "441200"],
        "441223": ["广宁县", "441200"],
        "441224": ["怀集县", "441200"],
        "441225": ["封开县", "441200"],
        "441226": ["德庆县", "441200"],
        "441283": ["高要市", "441200"],
        "441284": ["四会市", "441200"],
        "441285": ["其它区", "441200"],
        "441300": ["惠州市", "440000"],
        "441302": ["惠城区", "441300"],
        "441303": ["惠阳区", "441300"],
        "441322": ["博罗县", "441300"],
        "441323": ["惠东县", "441300"],
        "441324": ["龙门县", "441300"],
        "441325": ["其它区", "441300"],
        "441400": ["梅州市", "440000"],
        "441402": ["梅江区", "441400"],
        "441421": ["梅县", "441400"],
        "441422": ["大埔县", "441400"],
        "441423": ["丰顺县", "441400"],
        "441424": ["五华县", "441400"],
        "441426": ["平远县", "441400"],
        "441427": ["蕉岭县", "441400"],
        "441481": ["兴宁市", "441400"],
        "441482": ["其它区", "441400"],
        "441500": ["汕尾市", "440000"],
        "441502": ["城区", "441500"],
        "441521": ["海丰县", "441500"],
        "441523": ["陆河县", "441500"],
        "441581": ["陆丰市", "441500"],
        "441582": ["其它区", "441500"],
        "441600": ["河源市", "440000"],
        "441602": ["源城区", "441600"],
        "441621": ["紫金县", "441600"],
        "441622": ["龙川县", "441600"],
        "441623": ["连平县", "441600"],
        "441624": ["和平县", "441600"],
        "441625": ["东源县", "441600"],
        "441626": ["其它区", "441600"],
        "441700": ["阳江市", "440000"],
        "441702": ["江城区", "441700"],
        "441721": ["阳西县", "441700"],
        "441723": ["阳东县", "441700"],
        "441781": ["阳春市", "441700"],
        "441782": ["其它区", "441700"],
        "441800": ["清远市", "440000"],
        "441802": ["清城区", "441800"],
        "441821": ["佛冈县", "441800"],
        "441823": ["阳山县", "441800"],
        "441825": ["连山壮族瑶族自治县", "441800"],
        "441826": ["连南瑶族自治县", "441800"],
        "441827": ["清新县", "441800"],
        "441881": ["英德市", "441800"],
        "441882": ["连州市", "441800"],
        "441883": ["其它区", "441800"],
        "441900": ["东莞市", "440000"],
        "441901": ["万江区", "441900"],
        "441902": ["莞城区", "441900"],
        "441903": ["南城区", "441900"],
        "441904": ["东城区", "441900"],
        "442000": ["中山市", "440000"],
        "442001": ["石岐区", "442000"],
        "442002": ["东区", "442000"],
        "442003": ["西区", "442000"],
        "442004": ["南区", "442000"],
        "442005": ["五桂山区", "442000"],
        "442006": ["其它", "442000"],
        "445100": ["潮州市", "440000"],
        "445102": ["湘桥区", "445100"],
        "445121": ["潮安县", "445100"],
        "445122": ["饶平县", "445100"],
        "445185": ["枫溪区", "445100"],
        "445186": ["其它区", "445100"],
        "445200": ["揭阳市", "440000"],
        "445202": ["榕城区", "445200"],
        "445221": ["揭东县", "445200"],
        "445222": ["揭西县", "445200"],
        "445224": ["惠来县", "445200"],
        "445281": ["普宁市", "445200"],
        "445284": ["东山区", "445200"],
        "445285": ["其它区", "445200"],
        "445300": ["云浮市", "440000"],
        "445302": ["云城区", "445300"],
        "445321": ["新兴县", "445300"],
        "445322": ["郁南县", "445300"],
        "445323": ["云安县", "445300"],
        "445381": ["罗定市", "445300"],
        "445382": ["其它区", "445300"],
        "450000": ["广西壮族自治区", "1"],
        "450100": ["南宁市", "450000"],
        "450102": ["兴宁区", "450100"],
        "450103": ["青秀区", "450100"],
        "450105": ["江南区", "450100"],
        "450107": ["西乡塘区", "450100"],
        "450108": ["良庆区", "450100"],
        "450109": ["邕宁区", "450100"],
        "450122": ["武鸣县", "450100"],
        "450123": ["隆安县", "450100"],
        "450124": ["马山县", "450100"],
        "450125": ["上林县", "450100"],
        "450126": ["宾阳县", "450100"],
        "450127": ["横县", "450100"],
        "450128": ["其它区", "450100"],
        "450200": ["柳州市", "450000"],
        "450202": ["城中区", "450200"],
        "450203": ["鱼峰区", "450200"],
        "450204": ["柳南区", "450200"],
        "450205": ["柳北区", "450200"],
        "450221": ["柳江县", "450200"],
        "450222": ["柳城县", "450200"],
        "450223": ["鹿寨县", "450200"],
        "450224": ["融安县", "450200"],
        "450225": ["融水苗族自治县", "450200"],
        "450226": ["三江侗族自治县", "450200"],
        "450227": ["其它区", "450200"],
        "450300": ["桂林市", "450000"],
        "450302": ["秀峰区", "450300"],
        "450303": ["叠彩区", "450300"],
        "450304": ["象山区", "450300"],
        "450305": ["七星区", "450300"],
        "450311": ["雁山区", "450300"],
        "450321": ["阳朔县", "450300"],
        "450322": ["临桂县", "450300"],
        "450323": ["灵川县", "450300"],
        "450324": ["全州县", "450300"],
        "450325": ["兴安县", "450300"],
        "450326": ["永福县", "450300"],
        "450327": ["灌阳县", "450300"],
        "450328": ["龙胜各族自治县", "450300"],
        "450329": ["资源县", "450300"],
        "450330": ["平乐县", "450300"],
        "450331": ["荔浦县", "450300"],
        "450332": ["恭城瑶族自治县", "450300"],
        "450333": ["其它区", "450300"],
        "450400": ["梧州市", "450000"],
        "450403": ["万秀区", "450400"],
        "450404": ["蝶山区", "450400"],
        "450405": ["长洲区", "450400"],
        "450421": ["苍梧县", "450400"],
        "450422": ["藤县", "450400"],
        "450423": ["蒙山县", "450400"],
        "450481": ["岑溪市", "450400"],
        "450482": ["其它区", "450400"],
        "450500": ["北海市", "450000"],
        "450502": ["海城区", "450500"],
        "450503": ["银海区", "450500"],
        "450512": ["铁山港区", "450500"],
        "450521": ["合浦县", "450500"],
        "450522": ["其它区", "450500"],
        "450600": ["防城港市", "450000"],
        "450602": ["港口区", "450600"],
        "450603": ["防城区", "450600"],
        "450621": ["上思县", "450600"],
        "450681": ["东兴市", "450600"],
        "450682": ["其它区", "450600"],
        "450700": ["钦州市", "450000"],
        "450702": ["钦南区", "450700"],
        "450703": ["钦北区", "450700"],
        "450721": ["灵山县", "450700"],
        "450722": ["浦北县", "450700"],
        "450723": ["其它区", "450700"],
        "450800": ["贵港市", "450000"],
        "450802": ["港北区", "450800"],
        "450803": ["港南区", "450800"],
        "450804": ["覃塘区", "450800"],
        "450821": ["平南县", "450800"],
        "450881": ["桂平市", "450800"],
        "450882": ["其它区", "450800"],
        "450900": ["玉林市", "450000"],
        "450902": ["玉州区", "450900"],
        "450921": ["容县", "450900"],
        "450922": ["陆川县", "450900"],
        "450923": ["博白县", "450900"],
        "450924": ["兴业县", "450900"],
        "450981": ["北流市", "450900"],
        "450982": ["其它区", "450900"],
        "451000": ["百色市", "450000"],
        "451002": ["右江区", "451000"],
        "451021": ["田阳县", "451000"],
        "451022": ["田东县", "451000"],
        "451023": ["平果县", "451000"],
        "451024": ["德保县", "451000"],
        "451025": ["靖西县", "451000"],
        "451026": ["那坡县", "451000"],
        "451027": ["凌云县", "451000"],
        "451028": ["乐业县", "451000"],
        "451029": ["田林县", "451000"],
        "451030": ["西林县", "451000"],
        "451031": ["隆林各族自治县", "451000"],
        "451032": ["其它区", "451000"],
        "451100": ["贺州市", "450000"],
        "451102": ["八步区", "451100"],
        "451121": ["昭平县", "451100"],
        "451122": ["钟山县", "451100"],
        "451123": ["富川瑶族自治县", "451100"],
        "451124": ["其它区", "451100"],
        "451200": ["河池市", "450000"],
        "451202": ["金城江区", "451200"],
        "451221": ["南丹县", "451200"],
        "451222": ["天峨县", "451200"],
        "451223": ["凤山县", "451200"],
        "451224": ["东兰县", "451200"],
        "451225": ["罗城仫佬族自治县", "451200"],
        "451226": ["环江毛南族自治县", "451200"],
        "451227": ["巴马瑶族自治县", "451200"],
        "451228": ["都安瑶族自治县", "451200"],
        "451229": ["大化瑶族自治县", "451200"],
        "451281": ["宜州市", "451200"],
        "451282": ["其它区", "451200"],
        "451300": ["来宾市", "450000"],
        "451302": ["兴宾区", "451300"],
        "451321": ["忻城县", "451300"],
        "451322": ["象州县", "451300"],
        "451323": ["武宣县", "451300"],
        "451324": ["金秀瑶族自治县", "451300"],
        "451381": ["合山市", "451300"],
        "451382": ["其它区", "451300"],
        "451400": ["崇左市", "450000"],
        "451402": ["江州区", "451400"],
        "451421": ["扶绥县", "451400"],
        "451422": ["宁明县", "451400"],
        "451423": ["龙州县", "451400"],
        "451424": ["大新县", "451400"],
        "451425": ["天等县", "451400"],
        "451481": ["凭祥市", "451400"],
        "451482": ["其它区", "451400"],
        "460000": ["海南省", "1"],
        "460100": ["海口市", "460000"],
        "460105": ["秀英区", "460100"],
        "460106": ["龙华区", "460100"],
        "460107": ["琼山区", "460100"],
        "460108": ["美兰区", "460100"],
        "460109": ["其它区", "460100"],
        "460200": ["三亚市", "460000"],
        "469001": ["五指山市", "460000"],
        "469002": ["琼海市", "460000"],
        "469003": ["儋州市", "460000"],
        "469005": ["文昌市", "460000"],
        "469006": ["万宁市", "460000"],
        "469007": ["东方市", "460000"],
        "469025": ["定安县", "460000"],
        "469026": ["屯昌县", "460000"],
        "469027": ["澄迈县", "460000"],
        "469028": ["临高县", "460000"],
        "469030": ["白沙黎族自治县", "460000"],
        "469031": ["昌江黎族自治县", "460000"],
        "469033": ["乐东黎族自治县", "460000"],
        "469034": ["陵水黎族自治县", "460000"],
        "469035": ["保亭黎族苗族自治县", "460000"],
        "469036": ["琼中黎族苗族自治县", "460000"],
        "469037": ["西沙群岛", "460000"],
        "469038": ["南沙群岛", "460000"],
        "469039": ["中沙群岛的岛礁及其海域", "460000"],
        "471004": ["高新区", "410300"],
        "471005": ["其它区", "410300"],
        "500000": ["重庆", "1"],
        "500100": ["重庆市", "500000"],
        "500101": ["万州区", "500100"],
        "500102": ["涪陵区", "500100"],
        "500103": ["渝中区", "500100"],
        "500104": ["大渡口区", "500100"],
        "500105": ["江北区", "500100"],
        "500106": ["沙坪坝区", "500100"],
        "500107": ["九龙坡区", "500100"],
        "500108": ["南岸区", "500100"],
        "500109": ["北碚区", "500100"],
        "500110": ["万盛区", "500100"],
        "500111": ["双桥区", "500100"],
        "500112": ["渝北区", "500100"],
        "500113": ["巴南区", "500100"],
        "500114": ["黔江区", "500100"],
        "500115": ["长寿区", "500100"],
        "500222": ["綦江县", "500100"],
        "500223": ["潼南县", "500100"],
        "500224": ["铜梁县", "500100"],
        "500225": ["大足县", "500100"],
        "500226": ["荣昌县", "500100"],
        "500227": ["璧山县", "500100"],
        "500228": ["梁平县", "500100"],
        "500229": ["城口县", "500100"],
        "500230": ["丰都县", "500100"],
        "500231": ["垫江县", "500100"],
        "500232": ["武隆县", "500100"],
        "500233": ["忠县", "500100"],
        "500234": ["开县", "500100"],
        "500235": ["云阳县", "500100"],
        "500236": ["奉节县", "500100"],
        "500237": ["巫山县", "500100"],
        "500238": ["巫溪县", "500100"],
        "500240": ["石柱土家族自治县", "500100"],
        "500241": ["秀山土家族苗族自治县", "500100"],
        "500242": ["酉阳土家族苗族自治县", "500100"],
        "500243": ["彭水苗族土家族自治县", "500100"],
        "500381": ["江津区", "500100"],
        "500382": ["合川区", "500100"],
        "500383": ["永川区", "500100"],
        "500384": ["南川区", "500100"],
        "500385": ["其它区", "500100"],
        "510000": ["四川省", "1"],
        "510100": ["成都市", "510000"],
        "510104": ["锦江区", "510100"],
        "510105": ["青羊区", "510100"],
        "510106": ["金牛区", "510100"],
        "510107": ["武侯区", "510100"],
        "510108": ["成华区", "510100"],
        "510112": ["龙泉驿区", "510100"],
        "510113": ["青白江区", "510100"],
        "510114": ["新都区", "510100"],
        "510115": ["温江区", "510100"],
        "510121": ["金堂县", "510100"],
        "510122": ["双流县", "510100"],
        "510124": ["郫县", "510100"],
        "510129": ["大邑县", "510100"],
        "510131": ["蒲江县", "510100"],
        "510132": ["新津县", "510100"],
        "510181": ["都江堰市", "510100"],
        "510182": ["彭州市", "510100"],
        "510183": ["邛崃市", "510100"],
        "510184": ["崇州市", "510100"],
        "510185": ["其它区", "510100"],
        "510300": ["自贡市", "510000"],
        "510302": ["自流井区", "510300"],
        "510303": ["贡井区", "510300"],
        "510304": ["大安区", "510300"],
        "510311": ["沿滩区", "510300"],
        "510321": ["荣县", "510300"],
        "510322": ["富顺县", "510300"],
        "510323": ["其它区", "510300"],
        "510400": ["攀枝花市", "510000"],
        "510402": ["东区", "510400"],
        "510403": ["西区", "510400"],
        "510411": ["仁和区", "510400"],
        "510421": ["米易县", "510400"],
        "510422": ["盐边县", "510400"],
        "510423": ["其它区", "510400"],
        "510500": ["泸州市", "510000"],
        "510502": ["江阳区", "510500"],
        "510503": ["纳溪区", "510500"],
        "510504": ["龙马潭区", "510500"],
        "510521": ["泸县", "510500"],
        "510522": ["合江县", "510500"],
        "510524": ["叙永县", "510500"],
        "510525": ["古蔺县", "510500"],
        "510526": ["其它区", "510500"],
        "510600": ["德阳市", "510000"],
        "510603": ["旌阳区", "510600"],
        "510623": ["中江县", "510600"],
        "510626": ["罗江县", "510600"],
        "510681": ["广汉市", "510600"],
        "510682": ["什邡市", "510600"],
        "510683": ["绵竹市", "510600"],
        "510684": ["其它区", "510600"],
        "510700": ["绵阳市", "510000"],
        "510703": ["涪城区", "510700"],
        "510704": ["游仙区", "510700"],
        "510722": ["三台县", "510700"],
        "510723": ["盐亭县", "510700"],
        "510724": ["安县", "510700"],
        "510725": ["梓潼县", "510700"],
        "510726": ["北川羌族自治县", "510700"],
        "510727": ["平武县", "510700"],
        "510751": ["高新区", "510700"],
        "510781": ["江油市", "510700"],
        "510782": ["其它区", "510700"],
        "510800": ["广元市", "510000"],
        "510802": ["利州区", "510800"],
        "510811": ["元坝区", "510800"],
        "510812": ["朝天区", "510800"],
        "510821": ["旺苍县", "510800"],
        "510822": ["青川县", "510800"],
        "510823": ["剑阁县", "510800"],
        "510824": ["苍溪县", "510800"],
        "510825": ["其它区", "510800"],
        "510900": ["遂宁市", "510000"],
        "510903": ["船山区", "510900"],
        "510904": ["安居区", "510900"],
        "510921": ["蓬溪县", "510900"],
        "510922": ["射洪县", "510900"],
        "510923": ["大英县", "510900"],
        "510924": ["其它区", "510900"],
        "511000": ["内江市", "510000"],
        "511002": ["市中区", "511000"],
        "511011": ["东兴区", "511000"],
        "511024": ["威远县", "511000"],
        "511025": ["资中县", "511000"],
        "511028": ["隆昌县", "511000"],
        "511029": ["其它区", "511000"],
        "511100": ["乐山市", "510000"],
        "511102": ["市中区", "511100"],
        "511111": ["沙湾区", "511100"],
        "511112": ["五通桥区", "511100"],
        "511113": ["金口河区", "511100"],
        "511123": ["犍为县", "511100"],
        "511124": ["井研县", "511100"],
        "511126": ["夹江县", "511100"],
        "511129": ["沐川县", "511100"],
        "511132": ["峨边彝族自治县", "511100"],
        "511133": ["马边彝族自治县", "511100"],
        "511181": ["峨眉山市", "511100"],
        "511182": ["其它区", "511100"],
        "511300": ["南充市", "510000"],
        "511302": ["顺庆区", "511300"],
        "511303": ["高坪区", "511300"],
        "511304": ["嘉陵区", "511300"],
        "511321": ["南部县", "511300"],
        "511322": ["营山县", "511300"],
        "511323": ["蓬安县", "511300"],
        "511324": ["仪陇县", "511300"],
        "511325": ["西充县", "511300"],
        "511381": ["阆中市", "511300"],
        "511382": ["其它区", "511300"],
        "511400": ["眉山市", "510000"],
        "511402": ["东坡区", "511400"],
        "511421": ["仁寿县", "511400"],
        "511422": ["彭山县", "511400"],
        "511423": ["洪雅县", "511400"],
        "511424": ["丹棱县", "511400"],
        "511425": ["青神县", "511400"],
        "511426": ["其它区", "511400"],
        "511500": ["宜宾市", "510000"],
        "511502": ["翠屏区", "511500"],
        "511521": ["宜宾县", "511500"],
        "511522": ["南溪县", "511500"],
        "511523": ["江安县", "511500"],
        "511524": ["长宁县", "511500"],
        "511525": ["高县", "511500"],
        "511526": ["珙县", "511500"],
        "511527": ["筠连县", "511500"],
        "511528": ["兴文县", "511500"],
        "511529": ["屏山县", "511500"],
        "511530": ["其它区", "511500"],
        "511600": ["广安市", "510000"],
        "511602": ["广安区", "511600"],
        "511621": ["岳池县", "511600"],
        "511622": ["武胜县", "511600"],
        "511623": ["邻水县", "511600"],
        "511681": ["华蓥市", "511600"],
        "511682": ["市辖区", "511600"],
        "511683": ["其它区", "511600"],
        "511700": ["达州市", "510000"],
        "511702": ["通川区", "511700"],
        "511721": ["达县", "511700"],
        "511722": ["宣汉县", "511700"],
        "511723": ["开江县", "511700"],
        "511724": ["大竹县", "511700"],
        "511725": ["渠县", "511700"],
        "511781": ["万源市", "511700"],
        "511782": ["其它区", "511700"],
        "511800": ["雅安市", "510000"],
        "511802": ["雨城区", "511800"],
        "511821": ["名山县", "511800"],
        "511822": ["荥经县", "511800"],
        "511823": ["汉源县", "511800"],
        "511824": ["石棉县", "511800"],
        "511825": ["天全县", "511800"],
        "511826": ["芦山县", "511800"],
        "511827": ["宝兴县", "511800"],
        "511828": ["其它区", "511800"],
        "511900": ["巴中市", "510000"],
        "511902": ["巴州区", "511900"],
        "511921": ["通江县", "511900"],
        "511922": ["南江县", "511900"],
        "511923": ["平昌县", "511900"],
        "511924": ["其它区", "511900"],
        "512000": ["资阳市", "510000"],
        "512002": ["雁江区", "512000"],
        "512021": ["安岳县", "512000"],
        "512022": ["乐至县", "512000"],
        "512081": ["简阳市", "512000"],
        "512082": ["其它区", "512000"],
        "513200": ["阿坝藏族羌族自治州", "510000"],
        "513221": ["汶川县", "513200"],
        "513222": ["理县", "513200"],
        "513223": ["茂县", "513200"],
        "513224": ["松潘县", "513200"],
        "513225": ["九寨沟县", "513200"],
        "513226": ["金川县", "513200"],
        "513227": ["小金县", "513200"],
        "513228": ["黑水县", "513200"],
        "513229": ["马尔康县", "513200"],
        "513230": ["壤塘县", "513200"],
        "513231": ["阿坝县", "513200"],
        "513232": ["若尔盖县", "513200"],
        "513233": ["红原县", "513200"],
        "513234": ["其它区", "513200"],
        "513300": ["甘孜藏族自治州", "510000"],
        "513321": ["康定县", "513300"],
        "513322": ["泸定县", "513300"],
        "513323": ["丹巴县", "513300"],
        "513324": ["九龙县", "513300"],
        "513325": ["雅江县", "513300"],
        "513326": ["道孚县", "513300"],
        "513327": ["炉霍县", "513300"],
        "513328": ["甘孜县", "513300"],
        "513329": ["新龙县", "513300"],
        "513330": ["德格县", "513300"],
        "513331": ["白玉县", "513300"],
        "513332": ["石渠县", "513300"],
        "513333": ["色达县", "513300"],
        "513334": ["理塘县", "513300"],
        "513335": ["巴塘县", "513300"],
        "513336": ["乡城县", "513300"],
        "513337": ["稻城县", "513300"],
        "513338": ["得荣县", "513300"],
        "513339": ["其它区", "513300"],
        "513400": ["凉山彝族自治州", "510000"],
        "513401": ["西昌市", "513400"],
        "513422": ["木里藏族自治县", "513400"],
        "513423": ["盐源县", "513400"],
        "513424": ["德昌县", "513400"],
        "513425": ["会理县", "513400"],
        "513426": ["会东县", "513400"],
        "513427": ["宁南县", "513400"],
        "513428": ["普格县", "513400"],
        "513429": ["布拖县", "513400"],
        "513430": ["金阳县", "513400"],
        "513431": ["昭觉县", "513400"],
        "513432": ["喜德县", "513400"],
        "513433": ["冕宁县", "513400"],
        "513434": ["越西县", "513400"],
        "513435": ["甘洛县", "513400"],
        "513436": ["美姑县", "513400"],
        "513437": ["雷波县", "513400"],
        "513438": ["其它区", "513400"],
        "520000": ["贵州省", "1"],
        "520100": ["贵阳市", "520000"],
        "520102": ["南明区", "520100"],
        "520103": ["云岩区", "520100"],
        "520111": ["花溪区", "520100"],
        "520112": ["乌当区", "520100"],
        "520113": ["白云区", "520100"],
        "520114": ["小河区", "520100"],
        "520121": ["开阳县", "520100"],
        "520122": ["息烽县", "520100"],
        "520123": ["修文县", "520100"],
        "520151": ["金阳开发区", "520100"],
        "520181": ["清镇市", "520100"],
        "520182": ["其它区", "520100"],
        "520200": ["六盘水市", "520000"],
        "520201": ["钟山区", "520200"],
        "520203": ["六枝特区", "520200"],
        "520221": ["水城县", "520200"],
        "520222": ["盘县", "520200"],
        "520223": ["其它区", "520200"],
        "520300": ["遵义市", "520000"],
        "520302": ["红花岗区", "520300"],
        "520303": ["汇川区", "520300"],
        "520321": ["遵义县", "520300"],
        "520322": ["桐梓县", "520300"],
        "520323": ["绥阳县", "520300"],
        "520324": ["正安县", "520300"],
        "520325": ["道真仡佬族苗族自治县", "520300"],
        "520326": ["务川仡佬族苗族自治县", "520300"],
        "520327": ["凤冈县", "520300"],
        "520328": ["湄潭县", "520300"],
        "520329": ["余庆县", "520300"],
        "520330": ["习水县", "520300"],
        "520381": ["赤水市", "520300"],
        "520382": ["仁怀市", "520300"],
        "520383": ["其它区", "520300"],
        "520400": ["安顺市", "520000"],
        "520402": ["西秀区", "520400"],
        "520421": ["平坝县", "520400"],
        "520422": ["普定县", "520400"],
        "520423": ["镇宁布依族苗族自治县", "520400"],
        "520424": ["关岭布依族苗族自治县", "520400"],
        "520425": ["紫云苗族布依族自治县", "520400"],
        "520426": ["其它区", "520400"],
        "522200": ["铜仁地区", "520000"],
        "522201": ["铜仁市", "522200"],
        "522222": ["江口县", "522200"],
        "522223": ["玉屏侗族自治县", "522200"],
        "522224": ["石阡县", "522200"],
        "522225": ["思南县", "522200"],
        "522226": ["印江土家族苗族自治县", "522200"],
        "522227": ["德江县", "522200"],
        "522228": ["沿河土家族自治县", "522200"],
        "522229": ["松桃苗族自治县", "522200"],
        "522230": ["万山特区", "522200"],
        "522231": ["其它区", "522200"],
        "522300": ["黔西南布依族苗族自治州", "520000"],
        "522301": ["兴义市", "522300"],
        "522322": ["兴仁县", "522300"],
        "522323": ["普安县", "522300"],
        "522324": ["晴隆县", "522300"],
        "522325": ["贞丰县", "522300"],
        "522326": ["望谟县", "522300"],
        "522327": ["册亨县", "522300"],
        "522328": ["安龙县", "522300"],
        "522329": ["其它区", "522300"],
        "522400": ["毕节地区", "520000"],
        "522401": ["毕节市", "522400"],
        "522422": ["大方县", "522400"],
        "522423": ["黔西县", "522400"],
        "522424": ["金沙县", "522400"],
        "522425": ["织金县", "522400"],
        "522426": ["纳雍县", "522400"],
        "522427": ["威宁彝族回族苗族自治县", "522400"],
        "522428": ["赫章县", "522400"],
        "522429": ["其它区", "522400"],
        "522600": ["黔东南苗族侗族自治州", "520000"],
        "522601": ["凯里市", "522600"],
        "522622": ["黄平县", "522600"],
        "522623": ["施秉县", "522600"],
        "522624": ["三穗县", "522600"],
        "522625": ["镇远县", "522600"],
        "522626": ["岑巩县", "522600"],
        "522627": ["天柱县", "522600"],
        "522628": ["锦屏县", "522600"],
        "522629": ["剑河县", "522600"],
        "522630": ["台江县", "522600"],
        "522631": ["黎平县", "522600"],
        "522632": ["榕江县", "522600"],
        "522633": ["从江县", "522600"],
        "522634": ["雷山县", "522600"],
        "522635": ["麻江县", "522600"],
        "522636": ["丹寨县", "522600"],
        "522637": ["其它区", "522600"],
        "522700": ["黔南布依族苗族自治州", "520000"],
        "522701": ["都匀市", "522700"],
        "522702": ["福泉市", "522700"],
        "522722": ["荔波县", "522700"],
        "522723": ["贵定县", "522700"],
        "522725": ["瓮安县", "522700"],
        "522726": ["独山县", "522700"],
        "522727": ["平塘县", "522700"],
        "522728": ["罗甸县", "522700"],
        "522729": ["长顺县", "522700"],
        "522730": ["龙里县", "522700"],
        "522731": ["惠水县", "522700"],
        "522732": ["三都水族自治县", "522700"],
        "522733": ["其它区", "522700"],
        "530000": ["云南省", "1"],
        "530100": ["昆明市", "530000"],
        "530102": ["五华区", "530100"],
        "530103": ["盘龙区", "530100"],
        "530111": ["官渡区", "530100"],
        "530112": ["西山区", "530100"],
        "530113": ["东川区", "530100"],
        "530121": ["呈贡县", "530100"],
        "530122": ["晋宁县", "530100"],
        "530124": ["富民县", "530100"],
        "530125": ["宜良县", "530100"],
        "530126": ["石林彝族自治县", "530100"],
        "530127": ["嵩明县", "530100"],
        "530128": ["禄劝彝族苗族自治县", "530100"],
        "530129": ["寻甸回族彝族自治县", "530100"],
        "530181": ["安宁市", "530100"],
        "530182": ["其它区", "530100"],
        "530300": ["曲靖市", "530000"],
        "530302": ["麒麟区", "530300"],
        "530321": ["马龙县", "530300"],
        "530322": ["陆良县", "530300"],
        "530323": ["师宗县", "530300"],
        "530324": ["罗平县", "530300"],
        "530325": ["富源县", "530300"],
        "530326": ["会泽县", "530300"],
        "530328": ["沾益县", "530300"],
        "530381": ["宣威市", "530300"],
        "530382": ["其它区", "530300"],
        "530400": ["玉溪市", "530000"],
        "530402": ["红塔区", "530400"],
        "530421": ["江川县", "530400"],
        "530422": ["澄江县", "530400"],
        "530423": ["通海县", "530400"],
        "530424": ["华宁县", "530400"],
        "530425": ["易门县", "530400"],
        "530426": ["峨山彝族自治县", "530400"],
        "530427": ["新平彝族傣族自治县", "530400"],
        "530428": ["元江哈尼族彝族傣族自治县", "530400"],
        "530429": ["其它区", "530400"],
        "530500": ["保山市", "530000"],
        "530502": ["隆阳区", "530500"],
        "530521": ["施甸县", "530500"],
        "530522": ["腾冲县", "530500"],
        "530523": ["龙陵县", "530500"],
        "530524": ["昌宁县", "530500"],
        "530525": ["其它区", "530500"],
        "530600": ["昭通市", "530000"],
        "530602": ["昭阳区", "530600"],
        "530621": ["鲁甸县", "530600"],
        "530622": ["巧家县", "530600"],
        "530623": ["盐津县", "530600"],
        "530624": ["大关县", "530600"],
        "530625": ["永善县", "530600"],
        "530626": ["绥江县", "530600"],
        "530627": ["镇雄县", "530600"],
        "530628": ["彝良县", "530600"],
        "530629": ["威信县", "530600"],
        "530630": ["水富县", "530600"],
        "530631": ["其它区", "530600"],
        "530700": ["丽江市", "530000"],
        "530702": ["古城区", "530700"],
        "530721": ["玉龙纳西族自治县", "530700"],
        "530722": ["永胜县", "530700"],
        "530723": ["华坪县", "530700"],
        "530724": ["宁蒗彝族自治县", "530700"],
        "530725": ["其它区", "530700"],
        "530800": ["普洱市", "530000"],
        "530802": ["思茅区", "530800"],
        "530821": ["宁洱哈尼族彝族自治县", "530800"],
        "530822": ["墨江哈尼族自治县", "530800"],
        "530823": ["景东彝族自治县", "530800"],
        "530824": ["景谷傣族彝族自治县", "530800"],
        "530825": ["镇沅彝族哈尼族拉祜族自治县", "530800"],
        "530826": ["江城哈尼族彝族自治县", "530800"],
        "530827": ["孟连傣族拉祜族佤族自治县", "530800"],
        "530828": ["澜沧拉祜族自治县", "530800"],
        "530829": ["西盟佤族自治县", "530800"],
        "530830": ["其它区", "530800"],
        "530900": ["临沧市", "530000"],
        "530902": ["临翔区", "530900"],
        "530921": ["凤庆县", "530900"],
        "530922": ["云县", "530900"],
        "530923": ["永德县", "530900"],
        "530924": ["镇康县", "530900"],
        "530925": ["双江拉祜族佤族布朗族傣族自治县", "530900"],
        "530926": ["耿马傣族佤族自治县", "530900"],
        "530927": ["沧源佤族自治县", "530900"],
        "530928": ["其它区", "530900"],
        "532300": ["楚雄彝族自治州", "530000"],
        "532301": ["楚雄市", "532300"],
        "532322": ["双柏县", "532300"],
        "532323": ["牟定县", "532300"],
        "532324": ["南华县", "532300"],
        "532325": ["姚安县", "532300"],
        "532326": ["大姚县", "532300"],
        "532327": ["永仁县", "532300"],
        "532328": ["元谋县", "532300"],
        "532329": ["武定县", "532300"],
        "532331": ["禄丰县", "532300"],
        "532332": ["其它区", "532300"],
        "532500": ["红河哈尼族彝族自治州", "530000"],
        "532501": ["个旧市", "532500"],
        "532502": ["开远市", "532500"],
        "532522": ["蒙自县", "532500"],
        "532523": ["屏边苗族自治县", "532500"],
        "532524": ["建水县", "532500"],
        "532525": ["石屏县", "532500"],
        "532526": ["弥勒县", "532500"],
        "532527": ["泸西县", "532500"],
        "532528": ["元阳县", "532500"],
        "532529": ["红河县", "532500"],
        "532530": ["金平苗族瑶族傣族自治县", "532500"],
        "532531": ["绿春县", "532500"],
        "532532": ["河口瑶族自治县", "532500"],
        "532533": ["其它区", "532500"],
        "532600": ["文山壮族苗族自治州", "530000"],
        "532621": ["文山县", "532600"],
        "532622": ["砚山县", "532600"],
        "532623": ["西畴县", "532600"],
        "532624": ["麻栗坡县", "532600"],
        "532625": ["马关县", "532600"],
        "532626": ["丘北县", "532600"],
        "532627": ["广南县", "532600"],
        "532628": ["富宁县", "532600"],
        "532629": ["其它区", "532600"],
        "532800": ["西双版纳傣族自治州", "530000"],
        "532801": ["景洪市", "532800"],
        "532822": ["勐海县", "532800"],
        "532823": ["勐腊县", "532800"],
        "532824": ["其它区", "532800"],
        "532900": ["大理白族自治州", "530000"],
        "532901": ["大理市", "532900"],
        "532922": ["漾濞彝族自治县", "532900"],
        "532923": ["祥云县", "532900"],
        "532924": ["宾川县", "532900"],
        "532925": ["弥渡县", "532900"],
        "532926": ["南涧彝族自治县", "532900"],
        "532927": ["巍山彝族回族自治县", "532900"],
        "532928": ["永平县", "532900"],
        "532929": ["云龙县", "532900"],
        "532930": ["洱源县", "532900"],
        "532931": ["剑川县", "532900"],
        "532932": ["鹤庆县", "532900"],
        "532933": ["其它区", "532900"],
        "533100": ["德宏傣族景颇族自治州", "530000"],
        "533102": ["瑞丽市", "533100"],
        "533103": ["潞西市", "533100"],
        "533122": ["梁河县", "533100"],
        "533123": ["盈江县", "533100"],
        "533124": ["陇川县", "533100"],
        "533125": ["其它区", "533100"],
        "533300": ["怒江傈僳族自治州", "530000"],
        "533321": ["泸水县", "533300"],
        "533323": ["福贡县", "533300"],
        "533324": ["贡山独龙族怒族自治县", "533300"],
        "533325": ["兰坪白族普米族自治县", "533300"],
        "533326": ["其它区", "533300"],
        "533400": ["迪庆藏族自治州", "530000"],
        "533421": ["香格里拉县", "533400"],
        "533422": ["德钦县", "533400"],
        "533423": ["维西傈僳族自治县", "533400"],
        "533424": ["其它区", "533400"],
        "540000": ["西藏自治区", "1"],
        "540100": ["拉萨市", "540000"],
        "540102": ["城关区", "540100"],
        "540121": ["林周县", "540100"],
        "540122": ["当雄县", "540100"],
        "540123": ["尼木县", "540100"],
        "540124": ["曲水县", "540100"],
        "540125": ["堆龙德庆县", "540100"],
        "540126": ["达孜县", "540100"],
        "540127": ["墨竹工卡县", "540100"],
        "540128": ["其它区", "540100"],
        "542100": ["昌都地区", "540000"],
        "542121": ["昌都县", "542100"],
        "542122": ["江达县", "542100"],
        "542123": ["贡觉县", "542100"],
        "542124": ["类乌齐县", "542100"],
        "542125": ["丁青县", "542100"],
        "542126": ["察雅县", "542100"],
        "542127": ["八宿县", "542100"],
        "542128": ["左贡县", "542100"],
        "542129": ["芒康县", "542100"],
        "542132": ["洛隆县", "542100"],
        "542133": ["边坝县", "542100"],
        "542134": ["其它区", "542100"],
        "542200": ["山南地区", "540000"],
        "542221": ["乃东县", "542200"],
        "542222": ["扎囊县", "542200"],
        "542223": ["贡嘎县", "542200"],
        "542224": ["桑日县", "542200"],
        "542225": ["琼结县", "542200"],
        "542226": ["曲松县", "542200"],
        "542227": ["措美县", "542200"],
        "542228": ["洛扎县", "542200"],
        "542229": ["加查县", "542200"],
        "542231": ["隆子县", "542200"],
        "542232": ["错那县", "542200"],
        "542233": ["浪卡子县", "542200"],
        "542234": ["其它区", "542200"],
        "542300": ["日喀则地区", "540000"],
        "542301": ["日喀则市", "542300"],
        "542322": ["南木林县", "542300"],
        "542323": ["江孜县", "542300"],
        "542324": ["定日县", "542300"],
        "542325": ["萨迦县", "542300"],
        "542326": ["拉孜县", "542300"],
        "542327": ["昂仁县", "542300"],
        "542328": ["谢通门县", "542300"],
        "542329": ["白朗县", "542300"],
        "542330": ["仁布县", "542300"],
        "542331": ["康马县", "542300"],
        "542332": ["定结县", "542300"],
        "542333": ["仲巴县", "542300"],
        "542334": ["亚东县", "542300"],
        "542335": ["吉隆县", "542300"],
        "542336": ["聂拉木县", "542300"],
        "542337": ["萨嘎县", "542300"],
        "542338": ["岗巴县", "542300"],
        "542339": ["其它区", "542300"],
        "542400": ["那曲地区", "540000"],
        "542421": ["那曲县", "542400"],
        "542422": ["嘉黎县", "542400"],
        "542423": ["比如县", "542400"],
        "542424": ["聂荣县", "542400"],
        "542425": ["安多县", "542400"],
        "542426": ["申扎县", "542400"],
        "542427": ["索县", "542400"],
        "542428": ["班戈县", "542400"],
        "542429": ["巴青县", "542400"],
        "542430": ["尼玛县", "542400"],
        "542431": ["其它区", "542400"],
        "542500": ["阿里地区", "540000"],
        "542521": ["普兰县", "542500"],
        "542522": ["札达县", "542500"],
        "542523": ["噶尔县", "542500"],
        "542524": ["日土县", "542500"],
        "542525": ["革吉县", "542500"],
        "542526": ["改则县", "542500"],
        "542527": ["措勤县", "542500"],
        "542528": ["其它区", "542500"],
        "542600": ["林芝地区", "540000"],
        "542621": ["林芝县", "542600"],
        "542622": ["工布江达县", "542600"],
        "542623": ["米林县", "542600"],
        "542624": ["墨脱县", "542600"],
        "542625": ["波密县", "542600"],
        "542626": ["察隅县", "542600"],
        "542627": ["朗县", "542600"],
        "542628": ["其它区", "542600"],
        "610000": ["陕西省", "1"],
        "610100": ["西安市", "610000"],
        "610102": ["新城区", "610100"],
        "610103": ["碑林区", "610100"],
        "610104": ["莲湖区", "610100"],
        "610111": ["灞桥区", "610100"],
        "610112": ["未央区", "610100"],
        "610113": ["雁塔区", "610100"],
        "610114": ["阎良区", "610100"],
        "610115": ["临潼区", "610100"],
        "610116": ["长安区", "610100"],
        "610122": ["蓝田县", "610100"],
        "610124": ["周至县", "610100"],
        "610125": ["户县", "610100"],
        "610126": ["高陵县", "610100"],
        "610127": ["其它区", "610100"],
        "610200": ["铜川市", "610000"],
        "610202": ["王益区", "610200"],
        "610203": ["印台区", "610200"],
        "610204": ["耀州区", "610200"],
        "610222": ["宜君县", "610200"],
        "610223": ["其它区", "610200"],
        "610300": ["宝鸡市", "610000"],
        "610302": ["渭滨区", "610300"],
        "610303": ["金台区", "610300"],
        "610304": ["陈仓区", "610300"],
        "610322": ["凤翔县", "610300"],
        "610323": ["岐山县", "610300"],
        "610324": ["扶风县", "610300"],
        "610326": ["眉县", "610300"],
        "610327": ["陇县", "610300"],
        "610328": ["千阳县", "610300"],
        "610329": ["麟游县", "610300"],
        "610330": ["凤县", "610300"],
        "610331": ["太白县", "610300"],
        "610332": ["其它区", "610300"],
        "610400": ["咸阳市", "610000"],
        "610402": ["秦都区", "610400"],
        "610403": ["杨凌区", "610400"],
        "610404": ["渭城区", "610400"],
        "610422": ["三原县", "610400"],
        "610423": ["泾阳县", "610400"],
        "610424": ["乾县", "610400"],
        "610425": ["礼泉县", "610400"],
        "610426": ["永寿县", "610400"],
        "610427": ["彬县", "610400"],
        "610428": ["长武县", "610400"],
        "610429": ["旬邑县", "610400"],
        "610430": ["淳化县", "610400"],
        "610431": ["武功县", "610400"],
        "610481": ["兴平市", "610400"],
        "610482": ["其它区", "610400"],
        "610500": ["渭南市", "610000"],
        "610502": ["临渭区", "610500"],
        "610521": ["华县", "610500"],
        "610522": ["潼关县", "610500"],
        "610523": ["大荔县", "610500"],
        "610524": ["合阳县", "610500"],
        "610525": ["澄城县", "610500"],
        "610526": ["蒲城县", "610500"],
        "610527": ["白水县", "610500"],
        "610528": ["富平县", "610500"],
        "610581": ["韩城市", "610500"],
        "610582": ["华阴市", "610500"],
        "610583": ["其它区", "610500"],
        "610600": ["延安市", "610000"],
        "610602": ["宝塔区", "610600"],
        "610621": ["延长县", "610600"],
        "610622": ["延川县", "610600"],
        "610623": ["子长县", "610600"],
        "610624": ["安塞县", "610600"],
        "610625": ["志丹县", "610600"],
        "610626": ["吴起县", "610600"],
        "610627": ["甘泉县", "610600"],
        "610628": ["富县", "610600"],
        "610629": ["洛川县", "610600"],
        "610630": ["宜川县", "610600"],
        "610631": ["黄龙县", "610600"],
        "610632": ["黄陵县", "610600"],
        "610633": ["其它区", "610600"],
        "610700": ["汉中市", "610000"],
        "610702": ["汉台区", "610700"],
        "610721": ["南郑县", "610700"],
        "610722": ["城固县", "610700"],
        "610723": ["洋县", "610700"],
        "610724": ["西乡县", "610700"],
        "610725": ["勉县", "610700"],
        "610726": ["宁强县", "610700"],
        "610727": ["略阳县", "610700"],
        "610728": ["镇巴县", "610700"],
        "610729": ["留坝县", "610700"],
        "610730": ["佛坪县", "610700"],
        "610731": ["其它区", "610700"],
        "610800": ["榆林市", "610000"],
        "610802": ["榆阳区", "610800"],
        "610821": ["神木县", "610800"],
        "610822": ["府谷县", "610800"],
        "610823": ["横山县", "610800"],
        "610824": ["靖边县", "610800"],
        "610825": ["定边县", "610800"],
        "610826": ["绥德县", "610800"],
        "610827": ["米脂县", "610800"],
        "610828": ["佳县", "610800"],
        "610829": ["吴堡县", "610800"],
        "610830": ["清涧县", "610800"],
        "610831": ["子洲县", "610800"],
        "610832": ["其它区", "610800"],
        "610900": ["安康市", "610000"],
        "610902": ["汉滨区", "610900"],
        "610921": ["汉阴县", "610900"],
        "610922": ["石泉县", "610900"],
        "610923": ["宁陕县", "610900"],
        "610924": ["紫阳县", "610900"],
        "610925": ["岚皋县", "610900"],
        "610926": ["平利县", "610900"],
        "610927": ["镇坪县", "610900"],
        "610928": ["旬阳县", "610900"],
        "610929": ["白河县", "610900"],
        "610930": ["其它区", "610900"],
        "611000": ["商洛市", "610000"],
        "611002": ["商州区", "611000"],
        "611021": ["洛南县", "611000"],
        "611022": ["丹凤县", "611000"],
        "611023": ["商南县", "611000"],
        "611024": ["山阳县", "611000"],
        "611025": ["镇安县", "611000"],
        "611026": ["柞水县", "611000"],
        "611027": ["其它区", "611000"],
        "620000": ["甘肃省", "1"],
        "620100": ["兰州市", "620000"],
        "620102": ["城关区", "620100"],
        "620103": ["七里河区", "620100"],
        "620104": ["西固区", "620100"],
        "620105": ["安宁区", "620100"],
        "620111": ["红古区", "620100"],
        "620121": ["永登县", "620100"],
        "620122": ["皋兰县", "620100"],
        "620123": ["榆中县", "620100"],
        "620124": ["其它区", "620100"],
        "620200": ["嘉峪关市", "620000"],
        "620300": ["金昌市", "620000"],
        "620302": ["金川区", "620300"],
        "620321": ["永昌县", "620300"],
        "620322": ["其它区", "620300"],
        "620400": ["白银市", "620000"],
        "620402": ["白银区", "620400"],
        "620403": ["平川区", "620400"],
        "620421": ["靖远县", "620400"],
        "620422": ["会宁县", "620400"],
        "620423": ["景泰县", "620400"],
        "620424": ["其它区", "620400"],
        "620500": ["天水市", "620000"],
        "620502": ["秦州区", "620500"],
        "620503": ["麦积区", "620500"],
        "620521": ["清水县", "620500"],
        "620522": ["秦安县", "620500"],
        "620523": ["甘谷县", "620500"],
        "620524": ["武山县", "620500"],
        "620525": ["张家川回族自治县", "620500"],
        "620526": ["其它区", "620500"],
        "620600": ["武威市", "620000"],
        "620602": ["凉州区", "620600"],
        "620621": ["民勤县", "620600"],
        "620622": ["古浪县", "620600"],
        "620623": ["天祝藏族自治县", "620600"],
        "620624": ["其它区", "620600"],
        "620700": ["张掖市", "620000"],
        "620702": ["甘州区", "620700"],
        "620721": ["肃南裕固族自治县", "620700"],
        "620722": ["民乐县", "620700"],
        "620723": ["临泽县", "620700"],
        "620724": ["高台县", "620700"],
        "620725": ["山丹县", "620700"],
        "620726": ["其它区", "620700"],
        "620800": ["平凉市", "620000"],
        "620802": ["崆峒区", "620800"],
        "620821": ["泾川县", "620800"],
        "620822": ["灵台县", "620800"],
        "620823": ["崇信县", "620800"],
        "620824": ["华亭县", "620800"],
        "620825": ["庄浪县", "620800"],
        "620826": ["静宁县", "620800"],
        "620827": ["其它区", "620800"],
        "620900": ["酒泉市", "620000"],
        "620902": ["肃州区", "620900"],
        "620921": ["金塔县", "620900"],
        "620922": ["安西县", "620900"],
        "620923": ["肃北蒙古族自治县", "620900"],
        "620924": ["阿克塞哈萨克族自治县", "620900"],
        "620981": ["玉门市", "620900"],
        "620982": ["敦煌市", "620900"],
        "620983": ["其它区", "620900"],
        "621000": ["庆阳市", "620000"],
        "621002": ["西峰区", "621000"],
        "621021": ["庆城县", "621000"],
        "621022": ["环县", "621000"],
        "621023": ["华池县", "621000"],
        "621024": ["合水县", "621000"],
        "621025": ["正宁县", "621000"],
        "621026": ["宁县", "621000"],
        "621027": ["镇原县", "621000"],
        "621028": ["其它区", "621000"],
        "621100": ["定西市", "620000"],
        "621102": ["安定区", "621100"],
        "621121": ["通渭县", "621100"],
        "621122": ["陇西县", "621100"],
        "621123": ["渭源县", "621100"],
        "621124": ["临洮县", "621100"],
        "621125": ["漳县", "621100"],
        "621126": ["岷县", "621100"],
        "621127": ["其它区", "621100"],
        "621200": ["陇南市", "620000"],
        "621202": ["武都区", "621200"],
        "621221": ["成县", "621200"],
        "621222": ["文县", "621200"],
        "621223": ["宕昌县", "621200"],
        "621224": ["康县", "621200"],
        "621225": ["西和县", "621200"],
        "621226": ["礼县", "621200"],
        "621227": ["徽县", "621200"],
        "621228": ["两当县", "621200"],
        "621229": ["其它区", "621200"],
        "622900": ["临夏回族自治州", "620000"],
        "622901": ["临夏市", "622900"],
        "622921": ["临夏县", "622900"],
        "622922": ["康乐县", "622900"],
        "622923": ["永靖县", "622900"],
        "622924": ["广河县", "622900"],
        "622925": ["和政县", "622900"],
        "622926": ["东乡族自治县", "622900"],
        "622927": ["积石山保安族东乡族撒拉族自治县", "622900"],
        "622928": ["其它区", "622900"],
        "623000": ["甘南藏族自治州", "620000"],
        "623001": ["合作市", "623000"],
        "623021": ["临潭县", "623000"],
        "623022": ["卓尼县", "623000"],
        "623023": ["舟曲县", "623000"],
        "623024": ["迭部县", "623000"],
        "623025": ["玛曲县", "623000"],
        "623026": ["碌曲县", "623000"],
        "623027": ["夏河县", "623000"],
        "623028": ["其它区", "623000"],
        "630000": ["青海省", "1"],
        "630100": ["西宁市", "630000"],
        "630102": ["城东区", "630100"],
        "630103": ["城中区", "630100"],
        "630104": ["城西区", "630100"],
        "630105": ["城北区", "630100"],
        "630121": ["大通回族土族自治县", "630100"],
        "630122": ["湟中县", "630100"],
        "630123": ["湟源县", "630100"],
        "630124": ["其它区", "630100"],
        "632100": ["海东地区", "630000"],
        "632121": ["平安县", "632100"],
        "632122": ["民和回族土族自治县", "632100"],
        "632123": ["乐都县", "632100"],
        "632126": ["互助土族自治县", "632100"],
        "632127": ["化隆回族自治县", "632100"],
        "632128": ["循化撒拉族自治县", "632100"],
        "632129": ["其它区", "632100"],
        "632200": ["海北藏族自治州", "630000"],
        "632221": ["门源回族自治县", "632200"],
        "632222": ["祁连县", "632200"],
        "632223": ["海晏县", "632200"],
        "632224": ["刚察县", "632200"],
        "632225": ["其它区", "632200"],
        "632300": ["黄南藏族自治州", "630000"],
        "632321": ["同仁县", "632300"],
        "632322": ["尖扎县", "632300"],
        "632323": ["泽库县", "632300"],
        "632324": ["河南蒙古族自治县", "632300"],
        "632325": ["其它区", "632300"],
        "632500": ["海南藏族自治州", "630000"],
        "632521": ["共和县", "632500"],
        "632522": ["同德县", "632500"],
        "632523": ["贵德县", "632500"],
        "632524": ["兴海县", "632500"],
        "632525": ["贵南县", "632500"],
        "632526": ["其它区", "632500"],
        "632600": ["果洛藏族自治州", "630000"],
        "632621": ["玛沁县", "632600"],
        "632622": ["班玛县", "632600"],
        "632623": ["甘德县", "632600"],
        "632624": ["达日县", "632600"],
        "632625": ["久治县", "632600"],
        "632626": ["玛多县", "632600"],
        "632627": ["其它区", "632600"],
        "632700": ["玉树藏族自治州", "630000"],
        "632721": ["玉树县", "632700"],
        "632722": ["杂多县", "632700"],
        "632723": ["称多县", "632700"],
        "632724": ["治多县", "632700"],
        "632725": ["囊谦县", "632700"],
        "632726": ["曲麻莱县", "632700"],
        "632727": ["其它区", "632700"],
        "632800": ["海西蒙古族藏族自治州", "630000"],
        "632801": ["格尔木市", "632800"],
        "632802": ["德令哈市", "632800"],
        "632821": ["乌兰县", "632800"],
        "632822": ["都兰县", "632800"],
        "632823": ["天峻县", "632800"],
        "632824": ["其它区", "632800"],
        "640000": ["宁夏回族自治区", "1"],
        "640100": ["银川市", "640000"],
        "640104": ["兴庆区", "640100"],
        "640105": ["西夏区", "640100"],
        "640106": ["金凤区", "640100"],
        "640121": ["永宁县", "640100"],
        "640122": ["贺兰县", "640100"],
        "640181": ["灵武市", "640100"],
        "640182": ["其它区", "640100"],
        "640200": ["石嘴山市", "640000"],
        "640202": ["大武口区", "640200"],
        "640205": ["惠农区", "640200"],
        "640221": ["平罗县", "640200"],
        "640222": ["其它区", "640200"],
        "640300": ["吴忠市", "640000"],
        "640302": ["利通区", "640300"],
        "640303": ["红寺堡区", "640300"],
        "640323": ["盐池县", "640300"],
        "640324": ["同心县", "640300"],
        "640381": ["青铜峡市", "640300"],
        "640382": ["其它区", "640300"],
        "640400": ["固原市", "640000"],
        "640402": ["原州区", "640400"],
        "640422": ["西吉县", "640400"],
        "640423": ["隆德县", "640400"],
        "640424": ["泾源县", "640400"],
        "640425": ["彭阳县", "640400"],
        "640426": ["其它区", "640400"],
        "640500": ["中卫市", "640000"],
        "640502": ["沙坡头区", "640500"],
        "640521": ["中宁县", "640500"],
        "640522": ["海原县", "640500"],
        "640523": ["其它区", "640500"],
        "650000": ["新疆维吾尔自治区", "1"],
        "650100": ["乌鲁木齐市", "650000"],
        "650102": ["天山区", "650100"],
        "650103": ["沙依巴克区", "650100"],
        "650104": ["新市区", "650100"],
        "650105": ["水磨沟区", "650100"],
        "650106": ["头屯河区", "650100"],
        "650107": ["达坂城区", "650100"],
        "650108": ["东山区", "650100"],
        "650109": ["米东区", "650100"],
        "650121": ["乌鲁木齐县", "650100"],
        "650122": ["其它区", "650100"],
        "650200": ["克拉玛依市", "650000"],
        "650202": ["独山子区", "650200"],
        "650203": ["克拉玛依区", "650200"],
        "650204": ["白碱滩区", "650200"],
        "650205": ["乌尔禾区", "650200"],
        "650206": ["其它区", "650200"],
        "652100": ["吐鲁番地区", "650000"],
        "652101": ["吐鲁番市", "652100"],
        "652122": ["鄯善县", "652100"],
        "652123": ["托克逊县", "652100"],
        "652124": ["其它区", "652100"],
        "652200": ["哈密地区", "650000"],
        "652201": ["哈密市", "652200"],
        "652222": ["巴里坤哈萨克自治县", "652200"],
        "652223": ["伊吾县", "652200"],
        "652224": ["其它区", "652200"],
        "652300": ["昌吉回族自治州", "650000"],
        "652301": ["昌吉市", "652300"],
        "652302": ["阜康市", "652300"],
        "652303": ["米泉市", "652300"],
        "652323": ["呼图壁县", "652300"],
        "652324": ["玛纳斯县", "652300"],
        "652325": ["奇台县", "652300"],
        "652327": ["吉木萨尔县", "652300"],
        "652328": ["木垒哈萨克自治县", "652300"],
        "652329": ["其它区", "652300"],
        "652700": ["博尔塔拉蒙古自治州", "650000"],
        "652701": ["博乐市", "652700"],
        "652722": ["精河县", "652700"],
        "652723": ["温泉县", "652700"],
        "652724": ["其它区", "652700"],
        "652800": ["巴音郭楞蒙古自治州", "650000"],
        "652801": ["库尔勒市", "652800"],
        "652822": ["轮台县", "652800"],
        "652823": ["尉犁县", "652800"],
        "652824": ["若羌县", "652800"],
        "652825": ["且末县", "652800"],
        "652826": ["焉耆回族自治县", "652800"],
        "652827": ["和静县", "652800"],
        "652828": ["和硕县", "652800"],
        "652829": ["博湖县", "652800"],
        "652830": ["其它区", "652800"],
        "652900": ["阿克苏地区", "650000"],
        "652901": ["阿克苏市", "652900"],
        "652922": ["温宿县", "652900"],
        "652923": ["库车县", "652900"],
        "652924": ["沙雅县", "652900"],
        "652925": ["新和县", "652900"],
        "652926": ["拜城县", "652900"],
        "652927": ["乌什县", "652900"],
        "652928": ["阿瓦提县", "652900"],
        "652929": ["柯坪县", "652900"],
        "652930": ["其它区", "652900"],
        "653000": ["克孜勒苏柯尔克孜自治州", "650000"],
        "653001": ["阿图什市", "653000"],
        "653022": ["阿克陶县", "653000"],
        "653023": ["阿合奇县", "653000"],
        "653024": ["乌恰县", "653000"],
        "653025": ["其它区", "653000"],
        "653100": ["喀什地区", "650000"],
        "653101": ["喀什市", "653100"],
        "653121": ["疏附县", "653100"],
        "653122": ["疏勒县", "653100"],
        "653123": ["英吉沙县", "653100"],
        "653124": ["泽普县", "653100"],
        "653125": ["莎车县", "653100"],
        "653126": ["叶城县", "653100"],
        "653127": ["麦盖提县", "653100"],
        "653128": ["岳普湖县", "653100"],
        "653129": ["伽师县", "653100"],
        "653130": ["巴楚县", "653100"],
        "653131": ["塔什库尔干塔吉克自治县", "653100"],
        "653132": ["其它区", "653100"],
        "653200": ["和田地区", "650000"],
        "653201": ["和田市", "653200"],
        "653221": ["和田县", "653200"],
        "653222": ["墨玉县", "653200"],
        "653223": ["皮山县", "653200"],
        "653224": ["洛浦县", "653200"],
        "653225": ["策勒县", "653200"],
        "653226": ["于田县", "653200"],
        "653227": ["民丰县", "653200"],
        "653228": ["其它区", "653200"],
        "654000": ["伊犁哈萨克自治州", "650000"],
        "654002": ["伊宁市", "654000"],
        "654003": ["奎屯市", "654000"],
        "654021": ["伊宁县", "654000"],
        "654022": ["察布查尔锡伯自治县", "654000"],
        "654023": ["霍城县", "654000"],
        "654024": ["巩留县", "654000"],
        "654025": ["新源县", "654000"],
        "654026": ["昭苏县", "654000"],
        "654027": ["特克斯县", "654000"],
        "654028": ["尼勒克县", "654000"],
        "654029": ["其它区", "654000"],
        "654200": ["塔城地区", "650000"],
        "654201": ["塔城市", "654200"],
        "654202": ["乌苏市", "654200"],
        "654221": ["额敏县", "654200"],
        "654223": ["沙湾县", "654200"],
        "654224": ["托里县", "654200"],
        "654225": ["裕民县", "654200"],
        "654226": ["和布克赛尔蒙古自治县", "654200"],
        "654227": ["其它区", "654200"],
        "654300": ["阿勒泰地区", "650000"],
        "654301": ["阿勒泰市", "654300"],
        "654321": ["布尔津县", "654300"],
        "654322": ["富蕴县", "654300"],
        "654323": ["福海县", "654300"],
        "654324": ["哈巴河县", "654300"],
        "654325": ["青河县", "654300"],
        "654326": ["吉木乃县", "654300"],
        "654327": ["其它区", "654300"],
        "659001": ["石河子市", "650000"],
        "659002": ["阿拉尔市", "650000"],
        "659003": ["图木舒克市", "650000"],
        "659004": ["五家渠市", "650000"],
        "710000": ["台湾省", "1"],
        "710100": ["台北市", "710000"],
        "710101": ["中正区", "710100"],
        "710102": ["大同区", "710100"],
        "710103": ["中山区", "710100"],
        "710104": ["松山区", "710100"],
        "710105": ["大安区", "710100"],
        "710106": ["万华区", "710100"],
        "710107": ["信义区", "710100"],
        "710108": ["士林区", "710100"],
        "710109": ["北投区", "710100"],
        "710110": ["内湖区", "710100"],
        "710111": ["南港区", "710100"],
        "710112": ["文山区", "710100"],
        "710113": ["其它区", "710100"],
        "710200": ["高雄市", "710000"],
        "710201": ["新兴区", "710200"],
        "710202": ["前金区", "710200"],
        "710203": ["芩雅区", "710200"],
        "710204": ["盐埕区", "710200"],
        "710205": ["鼓山区", "710200"],
        "710206": ["旗津区", "710200"],
        "710207": ["前镇区", "710200"],
        "710208": ["三民区", "710200"],
        "710209": ["左营区", "710200"],
        "710210": ["楠梓区", "710200"],
        "710211": ["小港区", "710200"],
        "710212": ["其它区", "710200"],
        "710300": ["台南市", "710000"],
        "710301": ["中西区", "710300"],
        "710302": ["东区", "710300"],
        "710303": ["南区", "710300"],
        "710304": ["北区", "710300"],
        "710305": ["安平区", "710300"],
        "710306": ["安南区", "710300"],
        "710307": ["其它区", "710300"],
        "710400": ["台中市", "710000"],
        "710401": ["中区", "710400"],
        "710402": ["东区", "710400"],
        "710403": ["南区", "710400"],
        "710404": ["西区", "710400"],
        "710405": ["北区", "710400"],
        "710406": ["北屯区", "710400"],
        "710407": ["西屯区", "710400"],
        "710408": ["南屯区", "710400"],
        "710409": ["其它区", "710400"],
        "710500": ["金门县", "710000"],
        "710600": ["南投县", "710000"],
        "710700": ["基隆市", "710000"],
        "710701": ["仁爱区", "710700"],
        "710702": ["信义区", "710700"],
        "710703": ["中正区", "710700"],
        "710704": ["中山区", "710700"],
        "710705": ["安乐区", "710700"],
        "710706": ["暖暖区", "710700"],
        "710707": ["七堵区", "710700"],
        "710708": ["其它区", "710700"],
        "710800": ["新竹市", "710000"],
        "710801": ["东区", "710800"],
        "710802": ["北区", "710800"],
        "710803": ["香山区", "710800"],
        "710804": ["其它区", "710800"],
        "710900": ["嘉义市", "710000"],
        "710901": ["东区", "710900"],
        "710902": ["西区", "710900"],
        "710903": ["其它区", "710900"],
        "711100": ["新北市", "710000"],
        "711200": ["宜兰县", "710000"],
        "711300": ["新竹县", "710000"],
        "711400": ["桃园县", "710000"],
        "711500": ["苗栗县", "710000"],
        "711700": ["彰化县", "710000"],
        "711900": ["嘉义县", "710000"],
        "712100": ["云林县", "710000"],
        "712400": ["屏东县", "710000"],
        "712500": ["台东县", "710000"],
        "712600": ["花莲县", "710000"],
        "712700": ["澎湖县", "710000"],
        "810000": ["香港特别行政区", "1"],
        "810100": ["香港岛", "810000"],
        "810101": ["中西区", "810100"],
        "810102": ["湾仔", "810100"],
        "810103": ["东区", "810100"],
        "810104": ["南区", "810100"],
        "810200": ["九龙", "810000"],
        "810201": ["九龙城区", "810200"],
        "810202": ["油尖旺区", "810200"],
        "810203": ["深水埗区", "810200"],
        "810204": ["黄大仙区", "810200"],
        "810205": ["观塘区", "810200"],
        "810300": ["新界", "810000"],
        "810301": ["北区", "810300"],
        "810302": ["大埔区", "810300"],
        "810303": ["沙田区", "810300"],
        "810304": ["西贡区", "810300"],
        "810305": ["元朗区", "810300"],
        "810306": ["屯门区", "810300"],
        "810307": ["荃湾区", "810300"],
        "810308": ["葵青区", "810300"],
        "810309": ["离岛区", "810300"],
        "820000": ["澳门特别行政区", "1"],
        "820100": ["澳门半岛", "820000"],
        "820200": ["离岛", "820000"],
        "990000": ["海外", "1"],
        "990100": ["海外", "990000"]
    };
    var j = {
        "110000": ["Beijing", "1"],
        "110100": ["Beijing", "110000"],
        "110101": ["Dongcheng District", "110100"],
        "110102": ["Xicheng District", "110100"],
        "110103": ["Chongwen District", "110100"],
        "110104": ["Xuanwu District", "110100"],
        "110105": ["Chaoyang District", "110100"],
        "110106": ["Fengtai District", "110100"],
        "110107": ["Shijingshan District", "110100"],
        "110108": ["Haidian District", "110100"],
        "110109": ["Mentougou", "110100"],
        "110111": ["Fangshan District", "110100"],
        "110112": ["Tongzhou District", "110100"],
        "110113": ["Shunyi District", "110100"],
        "110114": ["Changping District", "110100"],
        "110115": ["Daxing District", "110100"],
        "110116": ["Huairou District", "110100"],
        "110117": ["Pinggu District", "110100"],
        "110228": ["Miyun County", "110100"],
        "110229": ["Yanqing County", "110100"],
        "110230": ["Other area", "110100"],
        "120000": ["Tianjin", "1"],
        "120100": ["Tianjin", "120000"],
        "120101": ["Heping District", "120100"],
        "120102": ["Hedong District", "120100"],
        "120103": ["Hexi District", "120100"],
        "120104": ["Nankai District", "120100"],
        "120105": ["Hebei District", "120100"],
        "120106": ["Hongqiao District", "120100"],
        "120107": ["Tanggu District", "120100"],
        "120108": ["Hangu", "120100"],
        "120109": ["Dagang", "120100"],
        "120110": ["Dongli District", "120100"],
        "120111": ["Xiqing District", "120100"],
        "120112": ["Jinnan District", "120100"],
        "120113": ["Beichen District", "120100"],
        "120114": ["Wuqing", "120100"],
        "120115": ["Baodi", "120100"],
        "120116": ["Binhai New Area", "120100"],
        "120221": ["Ninghe", "120100"],
        "120223": ["Jinghai County", "120100"],
        "120225": ["Jixian", "120100"],
        "120226": ["Other area", "120100"],
        "130000": ["Hebei Province", "1"],
        "130100": ["Shijiazhuang City", "130000"],
        "130102": ["Chang'an District", "130100"],
        "130103": ["East region", "130100"],
        "130104": ["West region", "130100"],
        "130105": ["Xinhua District", "130100"],
        "130107": ["Jingxing mining", "130100"],
        "130108": ["Yuhua District", "130100"],
        "130121": ["Jingxing", "130100"],
        "130123": ["Zhengding County", "130100"],
        "130124": ["Luancheng", "130100"],
        "130125": ["Xingtang", "130100"],
        "130126": ["Lingshou", "130100"],
        "130127": ["Gaoyi County", "130100"],
        "130128": ["Shenze", "130100"],
        "130129": ["Zanhuang", "130100"],
        "130130": ["Promise County", "130100"],
        "130131": ["Pingshan County", "130100"],
        "130132": ["Yuanshi County", "130100"],
        "130133": ["Zhaoxian", "130100"],
        "130181": ["Xinji", "130100"],
        "130182": ["Gaocheng", "130100"],
        "130183": ["Jinju", "130100"],
        "130184": ["Xinle City", "130100"],
        "130185": ["Luquan", "130100"],
        "130186": ["Other area", "130100"],
        "130200": ["Tangshan City", "130000"],
        "130202": ["Lunan", "130200"],
        "130203": ["Lubei", "130200"],
        "130204": ["Guye District", "130200"],
        "130205": ["Kaiping District", "130200"],
        "130207": ["Fengnan", "130200"],
        "130208": ["Fengrun", "130200"],
        "130223": ["Luan County", "130200"],
        "130224": ["Luannan", "130200"],
        "130225": ["Leting County", "130200"],
        "130227": ["Qianxi County", "130200"],
        "130229": ["Yutian County", "130200"],
        "130230": ["Tanghai County", "130200"],
        "130281": ["Zunhua", "130200"],
        "130283": ["Qian'an", "130200"],
        "130284": ["Other area", "130200"],
        "130300": ["Qinhuangdao", "130000"],
        "130302": ["Harbor area", "130300"],
        "130303": ["Shanhaiguan District", "130300"],
        "130304": ["Beidaihe District", "130300"],
        "130321": ["Qinglong Manchu Autonomous County", "130300"],
        "130322": ["Changli County", "130300"],
        "130323": ["Funing County", "130300"],
        "130324": ["Lulong County", "130300"],
        "130398": ["Other area", "130300"],
        "130399": ["Economic and Technological Development Zone", "130300"],
        "130400": ["Handan", "130000"],
        "130402": ["Hanshan", "130400"],
        "130403": ["Congtai", "130400"],
        "130404": ["Revival area", "130400"],
        "130406": ["Fengfeng Mining Area", "130400"],
        "130421": ["Handan County", "130400"],
        "130423": ["Linzhang", "130400"],
        "130424": ["Into the County", "130400"],
        "130425": ["Daming County", "130400"],
        "130426": ["Shexian", "130400"],
        "130427": ["Cixian", "130400"],
        "130428": ["Feixiang", "130400"],
        "130429": ["Yongnian County", "130400"],
        "130430": ["Qiuxian", "130400"],
        "130431": ["Jize", "130400"],
        "130432": ["Canton County", "130400"],
        "130433": ["Guantao County", "130400"],
        "130434": ["Weixian", "130400"],
        "130435": ["Quzhou County", "130400"],
        "130481": ["Wu'an", "130400"],
        "130482": ["Other area", "130400"],
        "130500": ["Xingtai City", "130000"],
        "130502": ["East region", "130500"],
        "130503": ["West region", "130500"],
        "130521": ["Xingtai County", "130500"],
        "130522": ["Lincheng County", "130500"],
        "130523": ["Neiqiu county", "130500"],
        "130524": ["Baixiang County", "130500"],
        "130525": ["Longyao", "130500"],
        "130526": ["Any county", "130500"],
        "130527": ["South County", "130500"],
        "130528": ["Ningjin", "130500"],
        "130529": ["Julu", "130500"],
        "130530": ["New River County", "130500"],
        "130531": ["Guangzong County", "130500"],
        "130532": ["Rural counties", "130500"],
        "130533": ["Granville County", "130500"],
        "130534": ["Qinghe County", "130500"],
        "130535": ["West County", "130500"],
        "130581": ["Nangong", "130500"],
        "130582": ["Shahe City", "130500"],
        "130583": ["Other area", "130500"],
        "130600": ["Baoding", "130000"],
        "130602": ["New Downtown", "130600"],
        "130603": ["Taipei District", "130600"],
        "130604": ["Nanshiqu", "130600"],
        "130621": ["Mancheng County", "130600"],
        "130622": ["Qingyuan County", "130600"],
        "130623": ["Laishui", "130600"],
        "130624": ["Fuping County", "130600"],
        "130625": ["Xushui", "130600"],
        "130626": ["Dingxing", "130600"],
        "130627": ["Tangxian", "130600"],
        "130628": ["Gaoyang", "130600"],
        "130629": ["Rongcheng County", "130600"],
        "130630": ["Laiyuan County", "130600"],
        "130631": ["Wangdu", "130600"],
        "130632": ["Anxin County", "130600"],
        "130633": ["Yixian", "130600"],
        "130634": ["Quyang County", "130600"],
        "130635": ["Lixian", "130600"],
        "130636": ["Shunping", "130600"],
        "130637": ["Boye", "130600"],
        "130638": ["Xiong", "130600"],
        "130681": ["Zhuozhou", "130600"],
        "130682": ["Dingzhou", "130600"],
        "130683": ["Yasukuni City", "130600"],
        "130684": ["Gaobeidian City", "130600"],
        "130698": ["High open area", "130600"],
        "130699": ["Other area", "130600"],
        "130700": ["Zhangjiakou City", "130000"],
        "130702": ["East region", "130700"],
        "130703": ["West region", "130700"],
        "130705": ["Xuanhua District", "130700"],
        "130706": ["The lower Garden District", "130700"],
        "130721": ["Xuanhua County", "130700"],
        "130722": ["Zhangbei County", "130700"],
        "130723": ["Kangbao County", "130700"],
        "130724": ["Guyuan County", "130700"],
        "130725": ["Shangyi County", "130700"],
        "130726": ["Yuxian", "130700"],
        "130727": ["Yangyuan County", "130700"],
        "130728": ["Huai County", "130700"],
        "130729": ["Wanquan County", "130700"],
        "130730": ["Huailai County", "130700"],
        "130731": ["Zhuolu County", "130700"],
        "130732": ["Chicheng County", "130700"],
        "130733": ["Chongli County", "130700"],
        "130734": ["Other area", "130700"],
        "130800": ["Chengde City", "130000"],
        "130802": ["Shuangqiao District", "130800"],
        "130803": ["Shuangluan", "130800"],
        "130804": ["Yingshouyingzi Mining District", "130800"],
        "130821": ["Chengde County", "130800"],
        "130822": ["Xinglong County,", "130800"],
        "130823": ["Pingquan County", "130800"],
        "130824": ["Luanping County", "130800"],
        "130825": ["Longhua", "130800"],
        "130826": ["Fengning", "130800"],
        "130827": ["Manchu Autonomous County", "130800"],
        "130828": ["Weichang Manchu and Mongolian Autonomous County", "130800"],
        "130829": ["Other area", "130800"],
        "130900": ["Cangzhou City", "130000"],
        "130902": ["Xinhua District", "130900"],
        "130903": ["Canal Zone", "130900"],
        "130921": ["Cangxian", "130900"],
        "130922": ["Qingxian", "130900"],
        "130923": ["East County", "130900"],
        "130924": ["Haixing", "130900"],
        "130925": ["Yanshan", "130900"],
        "130926": ["Suning County", "130900"],
        "130927": ["South County", "130900"],
        "130928": ["Wuqiao County", "130900"],
        "130929": ["Xianxian", "130900"],
        "130930": ["Mengcun Hui Autonomous County", "130900"],
        "130981": ["Botou", "130900"],
        "130982": ["Renqiu", "130900"],
        "130983": ["Huanghua", "130900"],
        "130984": ["Hejian City", "130900"],
        "130985": ["Other area", "130900"],
        "131000": ["Langfang", "130000"],
        "131002": ["Anci", "131000"],
        "131003": ["Guang Yang District", "131000"],
        "131022": ["Guan", "131000"],
        "131023": ["Yongqing", "131000"],
        "131024": ["Xianghe County", "131000"],
        "131025": ["Grand County", "131000"],
        "131026": ["ANALYSIS", "131000"],
        "131028": ["Dachang Hui Autonomous County", "131000"],
        "131051": ["Development", "131000"],
        "131052": ["Yanjiao Economic and Technological Development Zone", "131000"],
        "131081": ["Bazhou", "131000"],
        "131082": ["Sanhe", "131000"],
        "131083": ["Other area", "131000"],
        "131100": ["Hengshui City", "130000"],
        "131102": ["Taocheng", "131100"],
        "131121": ["ZaoQiang", "131100"],
        "131122": ["Wuyi County", "131100"],
        "131123": ["Wuqiang County", "131100"],
        "131124": ["Raoyang", "131100"],
        "131125": ["Anping", "131100"],
        "131126": ["Gucheng", "131100"],
        "131127": ["King County", "131100"],
        "131128": ["Fucheng County", "131100"],
        "131181": ["Jizhou", "131100"],
        "131182": ["Shenzhen City", "131100"],
        "131183": ["Other area", "131100"],
        "140000": ["Shanxi", "1"],
        "140100": ["Taiyuan", "140000"],
        "140105": ["Xiaodian", "140100"],
        "140106": ["Yingze District", "140100"],
        "140107": ["Xinghualingqu", "140100"],
        "140108": ["Jiancaoping", "140100"],
        "140109": ["Wanbailin", "140100"],
        "140110": ["Jinyuan District", "140100"],
        "140121": ["Qingxu County", "140100"],
        "140122": ["Yangqu County", "140100"],
        "140123": ["Loufan County", "140100"],
        "140181": ["Gujiao", "140100"],
        "140182": ["Other area", "140100"],
        "140200": ["Datong", "140000"],
        "140202": ["Town", "140200"],
        "140203": ["Mining", "140200"],
        "140211": ["South suburbs", "140200"],
        "140212": ["Xinrong District", "140200"],
        "140221": ["Yang Gao County", "140200"],
        "140222": ["Tianzhen County", "140200"],
        "140223": ["Guangling County", "140200"],
        "140224": ["Lingqiu County", "140200"],
        "140225": ["Hunyuan County", "140200"],
        "140226": ["Zuoyun", "140200"],
        "140227": ["Datong County", "140200"],
        "140228": ["Other area", "140200"],
        "140300": ["Yangquan", "140000"],
        "140302": ["Town", "140300"],
        "140303": ["Mining", "140300"],
        "140311": ["Suburbs", "140300"],
        "140321": ["Pingding County", "140300"],
        "140322": ["Yuxian", "140300"],
        "140323": ["Other area", "140300"],
        "140400": ["Changzhi", "140000"],
        "140421": ["Changzhi County", "140400"],
        "140423": ["Xiangyuan County", "140400"],
        "140424": ["Tunliu County", "140400"],
        "140425": ["Pingshun", "140400"],
        "140426": ["Lebanon County", "140400"],
        "140427": ["Huguan County", "140400"],
        "140428": ["The eldest son of the county", "140400"],
        "140429": ["Wuxiang County", "140400"],
        "140430": ["Qin County", "140400"],
        "140431": ["Qinyuan", "140400"],
        "140481": ["Lucheng", "140400"],
        "140482": ["Town", "140400"],
        "140483": ["Suburbs", "140400"],
        "140484": ["High-tech Zone", "140400"],
        "140485": ["Other area", "140400"],
        "140500": ["Jincheng", "140000"],
        "140502": ["Town", "140500"],
        "140521": ["Qinshui County", "140500"],
        "140522": ["Yangcheng County", "140500"],
        "140524": ["Lingchuan County", "140500"],
        "140525": ["Zezhou", "140500"],
        "140581": ["Gaoping City", "140500"],
        "140582": ["Other area", "140500"],
        "140600": ["Shuozhou City", "140000"],
        "140602": ["Moon City", "140600"],
        "140603": ["Ping Lu district", "140600"],
        "140621": ["Sanin County", "140600"],
        "140622": ["Ying County", "140600"],
        "140623": ["Youyu County", "140600"],
        "140624": ["Huairen", "140600"],
        "140625": ["Other area", "140600"],
        "140700": ["Jinzhong", "140000"],
        "140702": ["Yuci", "140700"],
        "140721": ["Yushe County", "140700"],
        "140722": ["Zuoquan County", "140700"],
        "140723": ["Heshun County", "140700"],
        "140724": ["Xiyang County", "140700"],
        "140725": ["Shouyang County", "140700"],
        "140726": ["Taigu County", "140700"],
        "140727": ["Qixian", "140700"],
        "140728": ["Pingyao County", "140700"],
        "140729": ["Lingshi County", "140700"],
        "140781": ["Jiexiu", "140700"],
        "140782": ["Other area", "140700"],
        "140800": ["Yuncheng", "140000"],
        "140802": ["Yanhuqu", "140800"],
        "140821": ["Linyi County", "140800"],
        "140822": ["Wanrong County", "140800"],
        "140823": ["Wenxi", "140800"],
        "140824": ["Jishan County", "140800"],
        "140825": ["Xinjiang County", "140800"],
        "140826": ["Jiangxian", "140800"],
        "140827": ["Yuanqu County", "140800"],
        "140828": ["Xiaxian", "140800"],
        "140829": ["Ping Lu County", "140800"],
        "140830": ["Ruicheng County", "140800"],
        "140881": ["Yongji City", "140800"],
        "140882": ["Kawazu City", "140800"],
        "140883": ["Other area", "140800"],
        "140900": ["Xinzhou", "140000"],
        "140902": ["Xin House District", "140900"],
        "140921": ["Dingxiang County", "140900"],
        "140922": ["Wutai County", "140900"],
        "140923": ["Dai County", "140900"],
        "140924": ["Fanzhi County", "140900"],
        "140925": ["Ningwu County", "140900"],
        "140926": ["Jingle", "140900"],
        "140927": ["Strom County", "140900"],
        "140928": ["Wuzhai County", "140900"],
        "140929": ["Kelan", "140900"],
        "140930": ["Hequ", "140900"],
        "140931": ["Baode County", "140900"],
        "140932": ["Pianguan County", "140900"],
        "140981": ["Yuanping", "140900"],
        "140982": ["Other area", "140900"],
        "141000": ["Linfen", "140000"],
        "141002": ["Yaodu", "141000"],
        "141021": ["Quwo", "141000"],
        "141022": ["Yicheng County", "141000"],
        "141023": ["Xiangfen County", "141000"],
        "141024": ["Hongdong County", "141000"],
        "141025": ["Old County", "141000"],
        "141026": ["Anze County", "141000"],
        "141027": ["Fushan", "141000"],
        "141028": ["Ji", "141000"],
        "141029": ["Xiangning County", "141000"],
        "141030": ["Grand County", "141000"],
        "141031": ["隰县", "141000"],
        "141032": ["Yonghe County", "141000"],
        "141033": ["PuXian", "141000"],
        "141034": ["Fenxi County", "141000"],
        "141081": ["Houma", "141000"],
        "141082": ["Huozhou", "141000"],
        "141083": ["Other area", "141000"],
        "141100": ["Luliang City", "140000"],
        "141102": ["Lishi", "141100"],
        "141121": ["Wenshui County", "141100"],
        "141122": ["Jiaocheng", "141100"],
        "141123": ["Xing County", "141100"],
        "141124": ["Linxian", "141100"],
        "141125": ["Liulin County", "141100"],
        "141126": ["Stone House County", "141100"],
        "141127": ["Lanxian", "141100"],
        "141128": ["Fangshan", "141100"],
        "141129": ["Zhongyang County", "141100"],
        "141130": ["Jiaokou County", "141100"],
        "141181": ["Xiaoyi City", "141100"],
        "141182": ["Fenyang City", "141100"],
        "141183": ["Other area", "141100"],
        "150000": ["Inner Mongolia Autonomous Region", "1"],
        "150100": ["Hohhot", "150000"],
        "150102": ["New Town", "150100"],
        "150103": ["Huimin District", "150100"],
        "150104": ["Yuquan District", "150100"],
        "150105": ["Saihan District", "150100"],
        "150121": ["Tumotezuoqi", "150100"],
        "150122": ["Tuoketuo County", "150100"],
        "150123": ["HeLinGe'Er", "150100"],
        "150124": ["Qingshuihe County", "150100"],
        "150125": ["Wuchuan County", "150100"],
        "150126": ["Other area", "150100"],
        "150200": ["Baotou", "150000"],
        "150202": ["Donghe District", "150200"],
        "150203": ["Hondlon District", "150200"],
        "150204": ["Peak District", "150200"],
        "150205": ["Shiguai District", "150200"],
        "150206": ["Baiyun mine", "150200"],
        "150207": ["Nine of the original District", "150200"],
        "150221": ["Mote Right Banner", "150200"],
        "150222": ["Guyang", "150200"],
        "150223": ["Darhan muminggan united banner", "150200"],
        "150224": ["Other area", "150200"],
        "150300": ["Wuhai", "150000"],
        "150302": ["Haibo Bay Area", "150300"],
        "150303": ["Hainan District", "150300"],
        "150304": ["Wuda District", "150300"],
        "150305": ["Other area", "150300"],
        "150400": ["Chifeng", "150000"],
        "150402": ["Hongshan", "150400"],
        "150403": ["Yuanbaoshan area", "150400"],
        "150404": ["Songshan District", "150400"],
        "150421": ["Alukerqinqi", "150400"],
        "150422": ["Balinzuoqi", "150400"],
        "150423": ["Balinyouqi", "150400"],
        "150424": ["Linxi", "150400"],
        "150425": ["Keshiketengqi", "150400"],
        "150426": ["Wengniute", "150400"],
        "150428": ["Harqin flag", "150400"],
        "150429": ["Ning County", "150400"],
        "150430": ["Aohanqi", "150400"],
        "150431": ["Other area", "150400"],
        "150500": ["Tongliao", "150000"],
        "150502": ["Horqin district", "150500"],
        "150521": ["Horqin Left Middle Banner", "150500"],
        "150522": ["Keerqinzuoyihou", "150500"],
        "150523": ["Repart", "150500"],
        "150524": ["Kulunqi", "150500"],
        "150525": ["Naiman", "150500"],
        "150526": ["Zhaluteqi", "150500"],
        "150581": ["Holingol", "150500"],
        "150582": ["Other area", "150500"],
        "150600": ["Ordos City", "150000"],
        "150602": ["Dongsheng District", "150600"],
        "150621": ["Dalateqi", "150600"],
        "150622": ["Jungar Banner", "150600"],
        "150623": ["Etuokeqianqi", "150600"],
        "150624": ["Etuokeqi", "150600"],
        "150625": ["Hangjinqi", "150600"],
        "150626": ["Wushenqi", "150600"],
        "150627": ["Yijinhuoluo", "150600"],
        "150628": ["Other area", "150600"],
        "150700": ["Hulunbeir", "150000"],
        "150702": ["Hailar District", "150700"],
        "150721": ["Arong", "150700"],
        "150722": ["Morin Dawa Daur Autonomous Banner", "150700"],
        "150723": ["Oroqen Autonomous Banner", "150700"],
        "150724": ["Evenk", "150700"],
        "150725": ["CHENBAERHUQI", "150700"],
        "150726": ["New Barag Left Banner", "150700"],
        "150727": ["New barag Banner", "150700"],
        "150781": ["Manzhouli", "150700"],
        "150782": ["Yakeshi", "150700"],
        "150783": ["Zhalantun", "150700"],
        "150784": ["Ergun City", "150700"],
        "150785": ["Root River City", "150700"],
        "150786": ["Other area", "150700"],
        "150800": ["Bayannao'er", "150000"],
        "150802": ["Linhe District", "150800"],
        "150821": ["Wuyuan County", "150800"],
        "150822": ["Dengkou", "150800"],
        "150823": ["Wulateqianqi", "150800"],
        "150824": ["Wulatezhongqi", "150800"],
        "150825": ["Urad Rear Banner", "150800"],
        "150826": ["Hangjinhouqi", "150800"],
        "150827": ["Other area", "150800"],
        "150900": ["Wulanchabu", "150000"],
        "150902": ["Jining District", "150900"],
        "150921": ["Zhuozi County", "150900"],
        "150922": ["Huade County", "150900"],
        "150923": ["Shangdu", "150900"],
        "150924": ["Xinghe County", "150900"],
        "150925": ["Liangcheng County", "150900"],
        "150926": ["Chahar Right Front Banner", "150900"],
        "150927": ["Chahar Right Middle Banner", "150900"],
        "150928": ["Chahar Right Back Banner", "150900"],
        "150929": ["Siziwangqi", "150900"],
        "150981": ["Fengzhen City", "150900"],
        "150982": ["Other area", "150900"],
        "152200": ["Xinganmeng", "150000"],
        "152201": ["Wulanhaote City", "152200"],
        "152202": ["Aershan", "152200"],
        "152221": ["Horqin Right Wing Front Banner", "152200"],
        "152222": ["Horqin Right Middle Banner", "152200"],
        "152223": ["Farmland back", "152200"],
        "152224": ["Tuquan", "152200"],
        "152225": ["Other area", "152200"],
        "152500": ["Xilin Gol League", "150000"],
        "152501": ["Erenhot", "152500"],
        "152502": ["Xilinhot City", "152500"],
        "152522": ["Abagaqi", "152500"],
        "152523": ["Sunitezuoqi", "152500"],
        "152524": ["Suniteyou", "152500"],
        "152525": ["DONGWUZHUMUQINQI", "152500"],
        "152526": ["Xiwuzhumuqin flag", "152500"],
        "152527": ["Taipusiqi", "152500"],
        "152528": ["Xianghuang", "152500"],
        "152529": ["Zhengxiangbaiqi", "152500"],
        "152530": ["Zhenglanqi", "152500"],
        "152531": ["Duolun", "152500"],
        "152532": ["Other area", "152500"],
        "152900": ["Alxa League", "150000"],
        "152921": ["Alxa Left Banner", "152900"],
        "152922": ["Alxa Right Banner", "152900"],
        "152923": ["Ejinaqi", "152900"],
        "152924": ["Other area", "152900"],
        "210000": ["Liaoning Province", "1"],
        "210100": ["Shenyang City", "210000"],
        "210102": ["Heping District", "210100"],
        "210103": ["沈河District", "210100"],
        "210104": ["Dadong", "210100"],
        "210105": ["Huanggu District", "210100"],
        "210106": ["Tiexi District", "210100"],
        "210111": ["Sujiatun District", "210100"],
        "210112": ["Dongling District", "210100"],
        "210113": ["Metro sub-district", "210100"],
        "210114": ["Yuhong District", "210100"],
        "210122": ["Liaoning County", "210100"],
        "210123": ["Kangping", "210100"],
        "210124": ["Faku County", "210100"],
        "210181": ["Xinmin City", "210100"],
        "210182": ["Hunnan", "210100"],
        "210183": ["Zhang Shi Zone", "210100"],
        "210184": ["沈北New District", "210100"],
        "210185": ["Other area", "210100"],
        "210200": ["Dalian", "210000"],
        "210202": ["In the mountains", "210200"],
        "210203": ["Xigang", "210200"],
        "210204": ["River mouth area", "210200"],
        "210211": ["Ganjingzi", "210200"],
        "210212": ["Lüshunkou", "210200"],
        "210213": ["Jinzhou District", "210200"],
        "210224": ["Changhai County", "210200"],
        "210251": ["Development", "210200"],
        "210281": ["Wafangdian", "210200"],
        "210282": ["Pulandian", "210200"],
        "210283": ["Zhuanghe City", "210200"],
        "210297": ["Ridge former District", "210200"],
        "210298": ["Other area", "210200"],
        "210300": ["Anshan", "210000"],
        "210302": ["Tiedong", "210300"],
        "210303": ["Tiexi District", "210300"],
        "210304": ["Li mountain", "210300"],
        "210311": ["Qianshan", "210300"],
        "210321": ["Taiwan County", "210300"],
        "210323": ["Xiuyan Manchu Autonomous County", "210300"],
        "210351": ["High-tech Zone", "210300"],
        "210381": ["Haicheng", "210300"],
        "210382": ["Other area", "210300"],
        "210400": ["Fushun", "210000"],
        "210402": ["Xinfu District", "210400"],
        "210403": ["Dongzhou District", "210400"],
        "210404": ["Wanghua area", "210400"],
        "210411": ["Shuncheng", "210400"],
        "210421": ["Fushun County", "210400"],
        "210422": ["Xinbin Manchu Autonomous County", "210400"],
        "210423": ["Qingyuan Manchu Autonomous County", "210400"],
        "210424": ["Other area", "210400"],
        "210500": ["Benxi City", "210000"],
        "210502": ["Ping mountain", "210500"],
        "210503": ["Xihu District", "210500"],
        "210504": ["Ming mountain", "210500"],
        "210505": ["Nanfen area", "210500"],
        "210521": ["Benxi Manchu Autonomous County", "210500"],
        "210522": ["Huanren Manchu Autonomous County", "210500"],
        "210523": ["Other area", "210500"],
        "210600": ["Dandong", "210000"],
        "210602": ["Ingot District", "210600"],
        "210603": ["Zhenxing District", "210600"],
        "210604": ["Zhen'an District", "210600"],
        "210624": ["Kuandian Manchu Autonomous County", "210600"],
        "210681": ["Donggang", "210600"],
        "210682": ["Fengcheng", "210600"],
        "210683": ["Other area", "210600"],
        "210700": ["Jinzhou City", "210000"],
        "210702": ["Guta District", "210700"],
        "210703": ["Linghe", "210700"],
        "210711": ["Taihe District", "210700"],
        "210726": ["Heishan", "210700"],
        "210727": ["Yixian", "210700"],
        "210781": ["Linghai", "210700"],
        "210782": ["Town North", "210700"],
        "210783": ["Other area", "210700"],
        "210800": ["Yingkou", "210000"],
        "210802": ["Zhanqian", "210800"],
        "210803": ["Downtown West", "210800"],
        "210804": ["Bayuquan District", "210800"],
        "210811": ["Laobian", "210800"],
        "210881": ["Gaizhou", "210800"],
        "210882": ["Dashiqiao", "210800"],
        "210883": ["Other area", "210800"],
        "210900": ["Fuxin City", "210000"],
        "210902": ["Haizhou District", "210900"],
        "210903": ["Xinqiu District", "210900"],
        "210904": ["Taiping", "210900"],
        "210905": ["Qinghemen", "210900"],
        "210911": ["Fine River District", "210900"],
        "210921": ["Fuxin Mongolian Autonomous County", "210900"],
        "210922": ["Zhangwu County", "210900"],
        "210923": ["Other area", "210900"],
        "211000": ["Liaoyang", "210000"],
        "211002": ["Baita District", "211000"],
        "211003": ["Wensheng District", "211000"],
        "211004": ["Hongwei", "211000"],
        "211005": ["Gongchangling area", "211000"],
        "211011": ["Prince Edward River District", "211000"],
        "211021": ["Liaoyang County", "211000"],
        "211081": ["Beacon City", "211000"],
        "211082": ["Other area", "211000"],
        "211100": ["Panjin", "210000"],
        "211102": ["Dual stage area", "211100"],
        "211103": ["Xinglongtai", "211100"],
        "211121": ["Dawa", "211100"],
        "211122": ["Panshan", "211100"],
        "211123": ["Other area", "211100"],
        "211200": ["Tieling City", "210000"],
        "211202": ["Silver District", "211200"],
        "211204": ["Qinghe District", "211200"],
        "211221": ["Tieling", "211200"],
        "211223": ["Xifeng County", "211200"],
        "211224": ["Changtu County", "211200"],
        "211281": ["Diaobingshan", "211200"],
        "211282": ["Kaiyuan", "211200"],
        "211283": ["Other area", "211200"],
        "211300": ["Chaoyang City", "210000"],
        "211302": ["Twin Towers", "211300"],
        "211303": ["Dragon City", "211300"],
        "211321": ["Chaoyang County", "211300"],
        "211322": ["Jianping County", "211300"],
        "211324": ["Left Wing Mongolian Autonomous County harqin", "211300"],
        "211381": ["Beipiao", "211300"],
        "211382": ["Lingyuan City", "211300"],
        "211383": ["Other area", "211300"],
        "211400": ["Huludao City", "210000"],
        "211402": ["Lianshan", "211400"],
        "211403": ["LongGangOu", "211400"],
        "211404": ["Nanpiao District", "211400"],
        "211421": ["Suizhong County", "211400"],
        "211422": ["Jianchang County", "211400"],
        "211481": ["Xingcheng", "211400"],
        "211482": ["Other area", "211400"],
        "220000": ["Jilin", "1"],
        "220100": ["Changchun City", "220000"],
        "220102": ["South Gate District", "220100"],
        "220103": ["Kuancheng", "220100"],
        "220104": ["Chaoyang District", "220100"],
        "220105": ["Two district", "220100"],
        "220106": ["Luyuan", "220100"],
        "220112": ["Shuangyang", "220100"],
        "220122": ["Nong'an", "220100"],
        "220181": ["Jiutai", "220100"],
        "220182": ["Yushu", "220100"],
        "220183": ["Dehui City", "220100"],
        "220184": ["High-tech Industrial Development Zone", "220100"],
        "220185": ["Automobile Industry Development Zone", "220100"],
        "220186": ["Economic and Technological Development Zone", "220100"],
        "220187": ["Net monthly Tourism Development Zone", "220100"],
        "220188": ["Other area", "220100"],
        "220200": ["Jilin", "220000"],
        "220202": ["Changyi District", "220200"],
        "220203": ["Longtanqu", "220200"],
        "220204": ["Chuanying", "220200"],
        "220211": ["Plump area", "220200"],
        "220221": ["Yongji", "220200"],
        "220281": ["Jiaohe City", "220200"],
        "220282": ["Huadian City", "220200"],
        "220283": ["Shulan", "220200"],
        "220284": ["Panshi", "220200"],
        "220285": ["Other area", "220200"],
        "220300": ["Siping City", "220000"],
        "220302": ["Tiexi District", "220300"],
        "220303": ["Tiedong", "220300"],
        "220322": ["Lishu", "220300"],
        "220323": ["Yitong Manchu Autonomous County", "220300"],
        "220381": ["Gongzhuling", "220300"],
        "220382": ["Shuangliao City", "220300"],
        "220383": ["Other area", "220300"],
        "220400": ["Liaoyuan", "220000"],
        "220402": ["Yongsan", "220400"],
        "220403": ["Xi'an area", "220400"],
        "220421": ["East County", "220400"],
        "220422": ["Dongliao", "220400"],
        "220423": ["Other area", "220400"],
        "220500": ["Tonghua City", "220000"],
        "220502": ["Dongchang District", "220500"],
        "220503": ["Erdaojiang", "220500"],
        "220521": ["Tonghua County", "220500"],
        "220523": ["Huinan County", "220500"],
        "220524": ["Liuhe County", "220500"],
        "220581": ["Meihekoushi", "220500"],
        "220582": ["Ji'an", "220500"],
        "220583": ["Other area", "220500"],
        "220600": ["Hakusan", "220000"],
        "220602": ["Eight Suminoe", "220600"],
        "220621": ["Fusong", "220600"],
        "220622": ["Jingyu County", "220600"],
        "220623": ["Changbai Korean Autonomous County", "220600"],
        "220625": ["Jiangyuan County", "220600"],
        "220681": ["Linjiang", "220600"],
        "220682": ["Other area", "220600"],
        "220700": ["Songyuan", "220000"],
        "220702": ["Ningjiang", "220700"],
        "220721": ["Melrose Qianguo Mongolian Autonomous County", "220700"],
        "220722": ["Changling County", "220700"],
        "220723": ["InuiYasu县", "220700"],
        "220724": ["Fuyu County", "220700"],
        "220725": ["Other area", "220700"],
        "220800": ["White City", "220000"],
        "220802": ["Taobei", "220800"],
        "220821": ["Zhenlai", "220800"],
        "220822": ["Tongyu County", "220800"],
        "220881": ["Taonan", "220800"],
        "220882": ["Da'an", "220800"],
        "220883": ["Other area", "220800"],
        "222400": ["Yanbian Korean Autonomous Prefecture", "220000"],
        "222401": ["Yanji", "222400"],
        "222402": ["Tumen City", "222400"],
        "222403": ["Dunhua City", "222400"],
        "222404": ["Hunchun", "222400"],
        "222405": ["Longjing", "222400"],
        "222406": ["Dragon City", "222400"],
        "222424": ["Wangqing County", "222400"],
        "222426": ["Antu County", "222400"],
        "222427": ["Other area", "222400"],
        "230000": ["Heilongjiang Province", "1"],
        "230100": ["Harbin City", "230000"],
        "230102": ["Daoli", "230100"],
        "230103": ["Nangang", "230100"],
        "230104": ["Daowai", "230100"],
        "230106": ["Xiangfang District", "230100"],
        "230107": ["Power District", "230100"],
        "230108": ["Cottage Area", "230100"],
        "230109": ["Songbei", "230100"],
        "230111": ["Hulan District", "230100"],
        "230123": ["Yilan County", "230100"],
        "230124": ["Founder County", "230100"],
        "230125": ["Bin", "230100"],
        "230126": ["Bayan", "230100"],
        "230127": ["Mulan County", "230100"],
        "230128": ["Tonghe County", "230100"],
        "230129": ["Yanshou", "230100"],
        "230181": ["A city", "230100"],
        "230182": ["Twin Cities", "230100"],
        "230183": ["Shangzhi", "230100"],
        "230184": ["Wuchang City", "230100"],
        "230185": ["A city", "230100"],
        "230186": ["Other area", "230100"],
        "230200": ["Qiqihar", "230000"],
        "230202": ["Lonza District", "230200"],
        "230203": ["Jianhua District", "230200"],
        "230204": ["Tiefeng district", "230200"],
        "230205": ["Angangxi", "230200"],
        "230206": ["Fularji District", "230200"],
        "230207": ["Nianzishan District", "230200"],
        "230208": ["Meilisi Daur District", "230200"],
        "230221": ["Longjiang", "230200"],
        "230223": ["Yian", "230200"],
        "230224": ["Taylor County", "230200"],
        "230225": ["Gannan County", "230200"],
        "230227": ["Fuyu", "230200"],
        "230229": ["Keshan", "230200"],
        "230230": ["Kedong County", "230200"],
        "230231": ["Baiquan County", "230200"],
        "230281": ["Nehe", "230200"],
        "230282": ["Other area", "230200"],
        "230300": ["Jixi", "230000"],
        "230302": ["Jiguan District", "230300"],
        "230303": ["Hengshan District", "230300"],
        "230304": ["Didao district", "230300"],
        "230305": ["Pear area", "230300"],
        "230306": ["Chengzihe area", "230300"],
        "230307": ["Ma mountain", "230300"],
        "230321": ["Jidong County", "230300"],
        "230381": ["Hulin", "230300"],
        "230382": ["Mishan", "230300"],
        "230383": ["Other area", "230300"],
        "230400": ["Hegang", "230000"],
        "230402": ["Chaoyang District", "230400"],
        "230403": ["Workers and peasants", "230400"],
        "230404": ["Nanshan District", "230400"],
        "230405": ["Xing'an District", "230400"],
        "230406": ["Dongshan District", "230400"],
        "230407": ["Xingshan District", "230400"],
        "230421": ["Luobei", "230400"],
        "230422": ["Suibin Xian", "230400"],
        "230423": ["Other area", "230400"],
        "230500": ["Shuangyashan City", "230000"],
        "230502": ["Jianshan", "230500"],
        "230503": ["Lingdong district", "230500"],
        "230505": ["Sifangtai District", "230500"],
        "230506": ["Baoshan District", "230500"],
        "230521": ["Jixian County", "230500"],
        "230522": ["Youyi County", "230500"],
        "230523": ["Baoqing", "230500"],
        "230524": ["Raohe County", "230500"],
        "230525": ["Other area", "230500"],
        "230600": ["Daqing", "230000"],
        "230602": ["Saertuqu", "230600"],
        "230603": ["Longfeng District", "230600"],
        "230604": ["Ranghulu area", "230600"],
        "230605": ["Honggang District", "230600"],
        "230606": ["Datong District", "230600"],
        "230621": ["Zhaozhou", "230600"],
        "230622": ["Zhaoyuan County", "230600"],
        "230623": ["Lindian County", "230600"],
        "230624": ["Duerbote County", "230600"],
        "230625": ["Other area", "230600"],
        "230700": ["Yichun City", "230000"],
        "230702": ["Yichun District", "230700"],
        "230703": ["Nancha district", "230700"],
        "230704": ["Friendly area", "230700"],
        "230705": ["Xilin District", "230700"],
        "230706": ["Green Crest area", "230700"],
        "230707": ["Xinqing District", "230700"],
        "230708": ["Meixi district", "230700"],
        "230709": ["Jinshantun District", "230700"],
        "230710": ["Five camps", "230700"],
        "230711": ["Uma River District", "230700"],
        "230712": ["Tangwanghe", "230700"],
        "230713": ["Dailing District", "230700"],
        "230714": ["Wuyiling area", "230700"],
        "230715": ["Hongxing District", "230700"],
        "230716": ["Shangganling District", "230700"],
        "230722": ["Jiayin County", "230700"],
        "230781": ["Iron City", "230700"],
        "230782": ["Other area", "230700"],
        "230800": ["Jiamusi City", "230000"],
        "230802": ["Yonghong District", "230800"],
        "230803": ["Chaoyang District", "230800"],
        "230804": ["Forward Area", "230800"],
        "230805": ["Dongfeng District", "230800"],
        "230811": ["Suburbs", "230800"],
        "230822": ["Huanan County", "230800"],
        "230826": ["Huachuan County", "230800"],
        "230828": ["Tangyuan County", "230800"],
        "230833": ["Fuyuan County", "230800"],
        "230881": ["River City with", "230800"],
        "230882": ["Fujin", "230800"],
        "230883": ["Other area", "230800"],
        "230900": ["Qitaihe", "230000"],
        "230902": ["Xinxing District", "230900"],
        "230903": ["Peach Mountain", "230900"],
        "230904": ["Qiezihe District", "230900"],
        "230921": ["Boli County", "230900"],
        "230922": ["Other area", "230900"],
        "231000": ["Mudanjiang City", "230000"],
        "231002": ["Dongan District", "231000"],
        "231003": ["Yangming District", "231000"],
        "231004": ["Edmonton area", "231000"],
        "231005": ["Xi'an area", "231000"],
        "231024": ["East County", "231000"],
        "231025": ["Linkou", "231000"],
        "231081": ["Suifenhe", "231000"],
        "231083": ["Hailin", "231000"],
        "231084": ["Ning'an", "231000"],
        "231085": ["Muling", "231000"],
        "231086": ["Other area", "231000"],
        "231100": ["Heihe City", "230000"],
        "231102": ["Aihui area", "231100"],
        "231121": ["Nenjiang County", "231100"],
        "231123": ["Xunke County", "231100"],
        "231124": ["Sunwu", "231100"],
        "231181": ["Beian", "231100"],
        "231182": ["Wudalianchi", "231100"],
        "231183": ["Other area", "231100"],
        "231200": ["Suihua", "230000"],
        "231202": ["North Forest", "231200"],
        "231221": ["Wangkui", "231200"],
        "231222": ["Lanxi", "231200"],
        "231223": ["Qinggang County", "231200"],
        "231224": ["Qing'an County", "231200"],
        "231225": ["Ming Shuixian", "231200"],
        "231226": ["Lengxian", "231200"],
        "231281": ["Anda", "231200"],
        "231282": ["Zhaodong", "231200"],
        "231283": ["Hailun", "231200"],
        "231284": ["Other area", "231200"],
        "232700": ["Daxinganling region", "230000"],
        "232721": ["Huma County", "232700"],
        "232722": ["Tahe County", "232700"],
        "232723": ["Mohe County", "232700"],
        "232724": ["Jiagedaqi", "232700"],
        "232725": ["Other area", "232700"],
        "310000": ["Shanghai", "1"],
        "310100": ["Shanghai", "310000"],
        "310101": ["Huangpu District", "310100"],
        "310103": ["Luwan District", "310100"],
        "310104": ["Xuhui District", "310100"],
        "310105": ["Changning District", "310100"],
        "310106": ["Jing'an District", "310100"],
        "310107": ["Putuo District", "310100"],
        "310108": ["Zhabei District", "310100"],
        "310109": ["Hongkou District", "310100"],
        "310110": ["Yangpu District", "310100"],
        "310112": ["Minhang", "310100"],
        "310113": ["Baoshan District", "310100"],
        "310114": ["Jiading District", "310100"],
        "310115": ["Pudong New Area", "310100"],
        "310116": ["Jinshan District", "310100"],
        "310117": ["Songjiang District", "310100"],
        "310118": ["Qingpu District", "310100"],
        "310119": ["Nanhui District", "310100"],
        "310120": ["Fengxian District", "310100"],
        "310152": ["Chuansha area", "310100"],
        "310230": ["Chongming County", "310100"],
        "310231": ["Other area", "310100"],
        "320000": ["Jiangsu Province", "1"],
        "320100": ["Nanjing", "320000"],
        "320102": ["Xuanwu", "320100"],
        "320103": ["Baixia", "320100"],
        "320104": ["Qinhuai District", "320100"],
        "320105": ["Jianye", "320100"],
        "320106": ["Gulou District", "320100"],
        "320107": ["Shimonoseki area", "320100"],
        "320111": ["Pukou", "320100"],
        "320113": ["Qixia District", "320100"],
        "320114": ["Yuhuatai", "320100"],
        "320115": ["Jiangning District", "320100"],
        "320116": ["Liuhe District", "320100"],
        "320124": ["Lishui County", "320100"],
        "320125": ["Gaochun County", "320100"],
        "320126": ["Other area", "320100"],
        "320200": ["Wuxi City", "320000"],
        "320202": ["Chong'an", "320200"],
        "320203": ["Southern District", "320200"],
        "320204": ["Beitang", "320200"],
        "320205": ["Xishan District", "320200"],
        "320206": ["Huishan", "320200"],
        "320211": ["Lake District", "320200"],
        "320281": ["Jiangyin", "320200"],
        "320282": ["Yixing", "320200"],
        "320296": ["New", "320200"],
        "320297": ["Other area", "320200"],
        "320300": ["Xuzhou City", "320000"],
        "320302": ["Gulou District", "320300"],
        "320303": ["Yunlong District", "320300"],
        "320304": ["Guri area", "320300"],
        "320305": ["Passes through the district", "320300"],
        "320311": ["Quanshanqu", "320300"],
        "320321": ["County", "320300"],
        "320322": ["Pei", "320300"],
        "320323": ["Tongshan County", "320300"],
        "320324": ["Suining", "320300"],
        "320381": ["Xinyi", "320300"],
        "320382": ["Pizhou", "320300"],
        "320383": ["Other area", "320300"],
        "320400": ["Changzhou City", "320000"],
        "320402": ["Tianning", "320400"],
        "320404": ["Clock Tower District", "320400"],
        "320405": ["Qishuyan", "320400"],
        "320411": ["Xinbei", "320400"],
        "320412": ["Wujin District", "320400"],
        "320481": ["Liyang", "320400"],
        "320482": ["Jintan", "320400"],
        "320483": ["Other area", "320400"],
        "320500": ["Suzhou City", "320000"],
        "320502": ["Changlang District", "320500"],
        "320503": ["Pingjiang", "320500"],
        "320504": ["Jinchang", "320500"],
        "320505": ["Huqiu District", "320500"],
        "320506": ["Wuzhong District", "320500"],
        "320507": ["Xiangcheng", "320500"],
        "320581": ["Changshu", "320500"],
        "320582": ["Zhangjiagang", "320500"],
        "320583": ["Kunshan", "320500"],
        "320584": ["Wujiang", "320500"],
        "320585": ["Taicang", "320500"],
        "320594": ["New", "320500"],
        "320595": ["Park", "320500"],
        "320596": ["Other area", "320500"],
        "320600": ["Nantong", "320000"],
        "320602": ["Chongchuan District", "320600"],
        "320611": ["Gangzha", "320600"],
        "320612": ["Tongzhou District", "320600"],
        "320621": ["Hai'an", "320600"],
        "320623": ["Rudong", "320600"],
        "320681": ["Qidong", "320600"],
        "320682": ["Rugao", "320600"],
        "320683": ["Tongzhou", "320600"],
        "320684": ["Haimen", "320600"],
        "320693": ["Development", "320600"],
        "320694": ["Other area", "320600"],
        "320700": ["Lianyungang", "320000"],
        "320703": ["Lianyun District", "320700"],
        "320705": ["Xinpu", "320700"],
        "320706": ["Haizhou District", "320700"],
        "320721": ["Ganyu", "320700"],
        "320722": ["Donghai County", "320700"],
        "320723": ["Guanyun", "320700"],
        "320724": ["GuanNaXian", "320700"],
        "320725": ["Other area", "320700"],
        "320800": ["Huai'an", "320000"],
        "320802": ["Qinghe District", "320800"],
        "320803": ["Chuzhou District", "320800"],
        "320804": ["Huaiyin District", "320800"],
        "320811": ["Qingpu District", "320800"],
        "320826": ["Lianshui", "320800"],
        "320829": ["Hongze County", "320800"],
        "320830": ["Xuyi County", "320800"],
        "320831": ["Lake County", "320800"],
        "320832": ["Other area", "320800"],
        "320900": ["Yancheng", "320000"],
        "320902": ["Pavilion Lakes", "320900"],
        "320903": ["Yandu", "320900"],
        "320921": ["Xiangshui", "320900"],
        "320922": ["Binhai County", "320900"],
        "320923": ["Funing", "320900"],
        "320924": ["Sheyang County", "320900"],
        "320925": ["Jianhu", "320900"],
        "320981": ["Dongtai", "320900"],
        "320982": ["Dafeng", "320900"],
        "320983": ["Other area", "320900"],
        "321000": ["Yangzhou City", "320000"],
        "321002": ["Guangling", "321000"],
        "321003": ["Hanjiang District", "321000"],
        "321011": ["Weiyang District", "321000"],
        "321023": ["Baoying County", "321000"],
        "321081": ["Yizheng", "321000"],
        "321084": ["Gaoyou", "321000"],
        "321088": ["Jiangdu", "321000"],
        "321092": ["economic development Zone", "321000"],
        "321093": ["Other area", "321000"],
        "321100": ["Zhenjiang", "320000"],
        "321102": ["Jingkou District", "321100"],
        "321111": ["Runzhou", "321100"],
        "321112": ["Dantu", "321100"],
        "321181": ["Danyang", "321100"],
        "321182": ["Yangzhong", "321100"],
        "321183": ["Jurong", "321100"],
        "321184": ["Other area", "321100"],
        "321200": ["Taizhou City", "320000"],
        "321202": ["Hailing", "321200"],
        "321203": ["Gaogang", "321200"],
        "321281": ["Xinghua", "321200"],
        "321282": ["Jingjiang", "321200"],
        "321283": ["Taixing", "321200"],
        "321284": ["Jiangyan", "321200"],
        "321285": ["Other area", "321200"],
        "321300": ["Suqian", "320000"],
        "321302": ["Urban places", "321300"],
        "321311": ["Suyu District", "321300"],
        "321322": ["Shuyang", "321300"],
        "321323": ["Siyang County", "321300"],
        "321324": ["Sihong", "321300"],
        "321325": ["Other area", "321300"],
        "330000": ["Zhejiang", "1"],
        "330100": ["Hangzhou", "330000"],
        "330102": ["Uptown", "330100"],
        "330103": ["Under the city", "330100"],
        "330104": ["Jianggan District", "330100"],
        "330105": ["Gongshu", "330100"],
        "330106": ["West Lake District", "330100"],
        "330108": ["Riverside area", "330100"],
        "330109": ["Xiaoshan District", "330100"],
        "330110": ["Yuhang District", "330100"],
        "330122": ["Tonglu County", "330100"],
        "330127": ["Chunan County", "330100"],
        "330182": ["Jiande", "330100"],
        "330183": ["Fuyang City", "330100"],
        "330185": ["Lin'an City", "330100"],
        "330186": ["Other area", "330100"],
        "330200": ["Ningbo", "330000"],
        "330203": ["Haishu District", "330200"],
        "330204": ["Koto-ku", "330200"],
        "330205": ["Jiangbei District", "330200"],
        "330206": ["Beilun District", "330200"],
        "330211": ["Zhenhai District", "330200"],
        "330212": ["Yinzhou District", "330200"],
        "330225": ["Xiangshan County", "330200"],
        "330226": ["Ninghai County", "330200"],
        "330281": ["Yuyao", "330200"],
        "330282": ["Cixi", "330200"],
        "330283": ["Fenghua", "330200"],
        "330284": ["Other area", "330200"],
        "330300": ["Wenzhou", "330000"],
        "330302": ["Lucheng District", "330300"],
        "330303": ["Longwan District", "330300"],
        "330304": ["Ouhai", "330300"],
        "330322": ["Dongtou", "330300"],
        "330324": ["Yongjia County", "330300"],
        "330326": ["Pingyang", "330300"],
        "330327": ["Cangnan County", "330300"],
        "330328": ["Wencheng County", "330300"],
        "330329": ["Taishun County", "330300"],
        "330381": ["Rui'an", "330300"],
        "330382": ["Yueqing", "330300"],
        "330383": ["Other area", "330300"],
        "330400": ["Jiaxing", "330000"],
        "330402": ["Nanhu District", "330400"],
        "330411": ["Xiuzhou", "330400"],
        "330421": ["Jiashan County", "330400"],
        "330424": ["Haiyan", "330400"],
        "330481": ["Haining", "330400"],
        "330482": ["Pinghu", "330400"],
        "330483": ["Tongxiang", "330400"],
        "330484": ["Other area", "330400"],
        "330500": ["Huzhou City", "330000"],
        "330502": ["Wuxing", "330500"],
        "330503": ["Nanxun", "330500"],
        "330521": ["Deqing County", "330500"],
        "330522": ["Changxing County", "330500"],
        "330523": ["Anji County", "330500"],
        "330524": ["Other area", "330500"],
        "330600": ["Shaoxing City", "330000"],
        "330602": ["Yuecheng", "330600"],
        "330621": ["Shaoxing County", "330600"],
        "330624": ["Xinchang", "330600"],
        "330681": ["Zhuji", "330600"],
        "330682": ["Shangyu", "330600"],
        "330683": ["Shengzhou", "330600"],
        "330684": ["Other area", "330600"],
        "330700": ["Jinhua", "330000"],
        "330702": ["Wucheng District", "330700"],
        "330703": ["Jindong", "330700"],
        "330723": ["Wuyi County", "330700"],
        "330726": ["Pujiang County", "330700"],
        "330727": ["Pan'an County", "330700"],
        "330781": ["Lanxi", "330700"],
        "330782": ["Yiwu", "330700"],
        "330783": ["Dongyang", "330700"],
        "330784": ["Yongkang", "330700"],
        "330785": ["Other area", "330700"],
        "330800": ["Quzhou", "330000"],
        "330802": ["Kecheng", "330800"],
        "330803": ["Qujiang District", "330800"],
        "330822": ["Changshan County", "330800"],
        "330824": ["Kaihua", "330800"],
        "330825": ["Longyou", "330800"],
        "330881": ["Jiangshan City", "330800"],
        "330882": ["Other area", "330800"],
        "330900": ["Zhoushan", "330000"],
        "330902": ["Dinghai District", "330900"],
        "330903": ["Putuo District", "330900"],
        "330921": ["Daishan County", "330900"],
        "330922": ["Shengsi", "330900"],
        "330923": ["Other area", "330900"],
        "331000": ["Taizhou", "330000"],
        "331002": ["Jiaojiang District", "331000"],
        "331003": ["Huangyan District", "331000"],
        "331004": ["Luqiao District", "331000"],
        "331021": ["Yuhuan County", "331000"],
        "331022": ["Sanmen County", "331000"],
        "331023": ["Tiantai", "331000"],
        "331024": ["Xianju County", "331000"],
        "331081": ["Wenling", "331000"],
        "331082": ["Linhai", "331000"],
        "331083": ["Other area", "331000"],
        "331100": ["Lishui", "330000"],
        "331102": ["Liandu", "331100"],
        "331121": ["Qingtian County", "331100"],
        "331122": ["Jinyun County", "331100"],
        "331123": ["Suichang", "331100"],
        "331124": ["Pine County", "331100"],
        "331125": ["Cloud County", "331100"],
        "331126": ["Qingyuan County", "331100"],
        "331127": ["Jingning She Autonomous County", "331100"],
        "331181": ["Longquan", "331100"],
        "331182": ["Other area", "331100"],
        "340000": ["Anhui Province", "1"],
        "340100": ["Hefei", "340000"],
        "340102": ["Yaohai", "340100"],
        "340103": ["Luyang District", "340100"],
        "340104": ["Shushan", "340100"],
        "340111": ["Pack River District", "340100"],
        "340121": ["Changfeng County", "340100"],
        "340122": ["Feidong", "340100"],
        "340123": ["Feixi", "340100"],
        "340151": ["High-tech Zone", "340100"],
        "340191": ["District", "340100"],
        "340192": ["Other area", "340100"],
        "340200": ["Wuhu", "340000"],
        "340202": ["Mirror Lake District", "340200"],
        "340203": ["Yijiang", "340200"],
        "340207": ["Jiujiang", "340200"],
        "340208": ["Sanshan", "340200"],
        "340221": ["Wuhu County", "340200"],
        "340222": ["Fanchang County", "340200"],
        "340223": ["Nanling County", "340200"],
        "340224": ["Other area", "340200"],
        "340300": ["Bengbu", "340000"],
        "340302": ["Longzihu", "340300"],
        "340303": ["Bengshan", "340300"],
        "340304": ["Yuhui District", "340300"],
        "340311": ["Huai District", "340300"],
        "340321": ["Huaiyuan County", "340300"],
        "340322": ["Wuhe", "340300"],
        "340323": ["Guzhen", "340300"],
        "340324": ["Other area", "340300"],
        "340400": ["Huainan City", "340000"],
        "340402": ["Datong District", "340400"],
        "340403": ["Tianjia'an District", "340400"],
        "340404": ["Xiejiaji area", "340400"],
        "340405": ["Bagongshan", "340400"],
        "340406": ["Panji District", "340400"],
        "340421": ["Fengtai County", "340400"],
        "340422": ["Other area", "340400"],
        "340500": ["Ma'anshan City", "340000"],
        "340502": ["Jinjiazhuang District", "340500"],
        "340503": ["Huashan District", "340500"],
        "340504": ["Mountain rain", "340500"],
        "340521": ["Dangtu County", "340500"],
        "340522": ["Other area", "340500"],
        "340600": ["Huaibei", "340000"],
        "340602": ["Du pool", "340600"],
        "340603": ["Xiangshan", "340600"],
        "340604": ["Lieshan", "340600"],
        "340621": ["Suixi", "340600"],
        "340622": ["Other area", "340600"],
        "340700": ["Tongling City", "340000"],
        "340702": ["Tongguanshan", "340700"],
        "340703": ["Mountain lion", "340700"],
        "340711": ["Suburbs", "340700"],
        "340721": ["Tongling County", "340700"],
        "340722": ["Other area", "340700"],
        "340800": ["Anqing City", "340000"],
        "340802": ["Yingjiang", "340800"],
        "340803": ["Daguan District", "340800"],
        "340811": ["Should show", "340800"],
        "340822": ["Huaining County", "340800"],
        "340823": ["Zongyang County", "340800"],
        "340824": ["Hill County", "340800"],
        "340825": ["Lake County", "340800"],
        "340826": ["Susong County", "340800"],
        "340827": ["Wangjiang", "340800"],
        "340828": ["Yuexi County", "340800"],
        "340881": ["Tongcheng", "340800"],
        "340882": ["Other area", "340800"],
        "341000": ["Huangshan City", "340000"],
        "341002": ["Tunxi District", "341000"],
        "341003": ["Huangshan District", "341000"],
        "341004": ["Huizhou", "341000"],
        "341021": ["Shexian", "341000"],
        "341022": ["Xiuning", "341000"],
        "341023": ["Yi Xian", "341000"],
        "341024": ["Qimen County", "341000"],
        "341025": ["Other area", "341000"],
        "341100": ["Chuzhou", "340000"],
        "341102": ["Langya District", "341100"],
        "341103": ["Nanqiao district", "341100"],
        "341122": ["Lai'an", "341100"],
        "341124": ["Quanjiao", "341100"],
        "341125": ["Dingyuan", "341100"],
        "341126": ["Fengyang County", "341100"],
        "341181": ["Tianchang", "341100"],
        "341182": ["Mingguang City", "341100"],
        "341183": ["Other area", "341100"],
        "341200": ["Fuyang City", "340000"],
        "341202": ["Yingzhou", "341200"],
        "341203": ["Ying Eastern", "341200"],
        "341204": ["Yingquan", "341200"],
        "341221": ["Linquan", "341200"],
        "341222": ["Taihe County", "341200"],
        "341225": ["Funan", "341200"],
        "341226": ["Yingshang county", "341200"],
        "341282": ["Jieshou", "341200"],
        "341283": ["Other area", "341200"],
        "341300": ["Suzhou City", "340000"],
        "341302": ["Yongqiao", "341300"],
        "341321": ["Dangshan County", "341300"],
        "341322": ["Xiaoxian", "341300"],
        "341323": ["Lingbi", "341300"],
        "341324": ["Sixian", "341300"],
        "341325": ["Other area", "341300"],
        "341400": ["Chaohu", "340100"],
        "341402": ["JuChao area", "340100"],
        "341421": ["Lujiang County", "340100"],
        "341422": ["Wuwei County", "340200"],
        "341423": ["Hanshan", "340500"],
        "341424": ["County", "340500"],
        "341500": ["Lu'an City", "340000"],
        "341502": ["Jin'an", "341500"],
        "341503": ["Yuan District", "341500"],
        "341521": ["Shou", "341500"],
        "341522": ["Huoqiu County", "341500"],
        "341523": ["Shucheng", "341500"],
        "341524": ["Jinzhai County", "341500"],
        "341525": ["Huoshan County", "341500"],
        "341526": ["Other area", "341500"],
        "341600": ["Bozhou", "340000"],
        "341602": ["Qiaocheng", "341600"],
        "341621": ["Guoyang County", "341600"],
        "341622": ["Mengcheng County", "341600"],
        "341623": ["Lixin county", "341600"],
        "341624": ["Other area", "341600"],
        "341700": ["Chizhou", "340000"],
        "341702": ["Guichi", "341700"],
        "341721": ["East County", "341700"],
        "341722": ["Shitai County", "341700"],
        "341723": ["Qingyang County", "341700"],
        "341724": ["Other area", "341700"],
        "341800": ["Xuancheng City", "340000"],
        "341802": ["Xuanzhou", "341800"],
        "341821": ["Langxi", "341800"],
        "341822": ["Guangde County", "341800"],
        "341823": ["Jing County", "341800"],
        "341824": ["Jixi County", "341800"],
        "341825": ["Jingde County", "341800"],
        "341881": ["Ningguo", "341800"],
        "341882": ["Other area", "341800"],
        "350000": ["Fujian", "1"],
        "350100": ["Fuzhou", "350000"],
        "350102": ["Gulou District", "350100"],
        "350103": ["Taijiang", "350100"],
        "350104": ["Cangshan", "350100"],
        "350105": ["Mawei District", "350100"],
        "350111": ["Jinan District", "350100"],
        "350121": ["Minhou County", "350100"],
        "350122": ["Lianjiang", "350100"],
        "350123": ["Luoyuan", "350100"],
        "350124": ["Minqing County", "350100"],
        "350125": ["Yongtai County", "350100"],
        "350128": ["Pingtan County", "350100"],
        "350181": ["Fuqing City", "350100"],
        "350182": ["Changle City", "350100"],
        "350183": ["Other area", "350100"],
        "350200": ["Xiamen", "350000"],
        "350203": ["Siming", "350200"],
        "350205": ["Haicang District", "350200"],
        "350206": ["Huli District", "350200"],
        "350211": ["Jimei District", "350200"],
        "350212": ["Tong'an", "350200"],
        "350213": ["Xiang'an District", "350200"],
        "350214": ["Other area", "350200"],
        "350300": ["Putian City", "350000"],
        "350302": ["Chengxiang District", "350300"],
        "350303": ["Hanjiang District", "350300"],
        "350304": ["Licheng", "350300"],
        "350305": ["Xiuyu", "350300"],
        "350322": ["Xianyou County", "350300"],
        "350323": ["Other area", "350300"],
        "350400": ["Sanming", "350000"],
        "350402": ["Meredov", "350400"],
        "350403": ["Sanyuan District", "350400"],
        "350421": ["Mingxi County", "350400"],
        "350423": ["Qingliu", "350400"],
        "350424": ["Ninghua", "350400"],
        "350425": ["Datian County", "350400"],
        "350426": ["Youxi", "350400"],
        "350427": ["Shaxian", "350400"],
        "350428": ["Jiangle", "350400"],
        "350429": ["Taining County", "350400"],
        "350430": ["Jianning", "350400"],
        "350481": ["Yong'an City", "350400"],
        "350482": ["Other area", "350400"],
        "350500": ["Quanzhou", "350000"],
        "350502": ["Licheng District", "350500"],
        "350503": ["Fortress District", "350500"],
        "350504": ["Luojiang District", "350500"],
        "350505": ["Quangang", "350500"],
        "350521": ["Hui'an County", "350500"],
        "350524": ["Anxi County", "350500"],
        "350525": ["Yongchun County", "350500"],
        "350526": ["Dehua", "350500"],
        "350527": ["Kinmen County", "350500"],
        "350581": ["Shishi", "350500"],
        "350582": ["Jinjiang", "350500"],
        "350583": ["Nan'an", "350500"],
        "350584": ["Other area", "350500"],
        "350600": ["Zhangzhou City", "350000"],
        "350602": ["Xiangcheng", "350600"],
        "350603": ["Longwen", "350600"],
        "350622": ["Yunxiao", "350600"],
        "350623": ["Zhangpu County", "350600"],
        "350624": ["Zhaoan County", "350600"],
        "350625": ["Changtai County", "350600"],
        "350626": ["Dongshan County", "350600"],
        "350627": ["Nanjing County", "350600"],
        "350628": ["Pinghe", "350600"],
        "350629": ["Hua'an", "350600"],
        "350681": ["Longhai", "350600"],
        "350682": ["Other area", "350600"],
        "350700": ["Nanping City", "350000"],
        "350702": ["Yanping", "350700"],
        "350721": ["Shunchang County", "350700"],
        "350722": ["Pucheng County", "350700"],
        "350723": ["WINNER", "350700"],
        "350724": ["Songxi County", "350700"],
        "350725": ["Zhenghe County", "350700"],
        "350781": ["Shaowu", "350700"],
        "350782": ["Wuyishan City", "350700"],
        "350783": ["Jian'ou", "350700"],
        "350784": ["Jianyang", "350700"],
        "350785": ["Other area", "350700"],
        "350800": ["Longyan City", "350000"],
        "350802": ["Xinluo", "350800"],
        "350821": ["Changting County", "350800"],
        "350822": ["Yongding County", "350800"],
        "350823": ["Shanghang County", "350800"],
        "350824": ["Wuping", "350800"],
        "350825": ["Liancheng County", "350800"],
        "350881": ["Zhangping", "350800"],
        "350882": ["Other area", "350800"],
        "350900": ["Ningde", "350000"],
        "350902": ["Jiaocheng", "350900"],
        "350921": ["Xiapu County", "350900"],
        "350922": ["Gutian County", "350900"],
        "350923": ["Pingnan County", "350900"],
        "350924": ["Shouning County", "350900"],
        "350925": ["Zhou County", "350900"],
        "350926": ["Zherong", "350900"],
        "350981": ["Fuan", "350900"],
        "350982": ["Fuding", "350900"],
        "350983": ["Other area", "350900"],
        "360000": ["Jiangxi", "1"],
        "360100": ["Nanchang", "360000"],
        "360102": ["Donghu District", "360100"],
        "360103": ["West Lake District", "360100"],
        "360104": ["Qingyunpu", "360100"],
        "360105": ["Wanli District", "360100"],
        "360111": ["Castle Lake", "360100"],
        "360121": ["Nanchang County", "360100"],
        "360122": ["Xinjian County", "360100"],
        "360123": ["Anyi", "360100"],
        "360124": ["JinXianXian", "360100"],
        "360125": ["Honggutan", "360100"],
        "360126": ["Economic and Technological Development Zone", "360100"],
        "360127": ["Changbei area", "360100"],
        "360128": ["Other area", "360100"],
        "360200": ["Jingdezhen", "360000"],
        "360202": ["Changjiang District", "360200"],
        "360203": ["Zhushan", "360200"],
        "360222": ["Fuliang County", "360200"],
        "360281": ["Leping", "360200"],
        "360282": ["Other area", "360200"],
        "360300": ["Pingxiang City", "360000"],
        "360302": ["Anyuan District", "360300"],
        "360313": ["Xiangdong", "360300"],
        "360321": ["Lianhua County", "360300"],
        "360322": ["Shangli", "360300"],
        "360323": ["Luxi County", "360300"],
        "360324": ["Other area", "360300"],
        "360400": ["Jiujiang City", "360000"],
        "360402": ["Lushan District", "360400"],
        "360403": ["Xunyang", "360400"],
        "360421": ["Jiujiang County", "360400"],
        "360423": ["Wuning County", "360400"],
        "360424": ["Xiushui county", "360400"],
        "360425": ["Yongxiu County", "360400"],
        "360426": ["De'an", "360400"],
        "360427": ["Xingzi County", "360400"],
        "360428": ["DUCHANG", "360400"],
        "360429": ["Hukou County", "360400"],
        "360430": ["Pengze County", "360400"],
        "360481": ["Ruichang", "360400"],
        "360482": ["Other area", "360400"],
        "360500": ["Xinyu City", "360000"],
        "360502": ["Yushui", "360500"],
        "360521": ["Fenyi County", "360500"],
        "360522": ["Other area", "360500"],
        "360600": ["Yingtan", "360000"],
        "360602": ["Lakes month", "360600"],
        "360622": ["Yujiang", "360600"],
        "360681": ["Guixi City", "360600"],
        "360682": ["Other area", "360600"],
        "360700": ["Ganzhou", "360000"],
        "360702": ["Zhanggong", "360700"],
        "360721": ["Gan County", "360700"],
        "360722": ["Xinfeng County", "360700"],
        "360723": ["Dayu County", "360700"],
        "360724": ["Shangyou", "360700"],
        "360725": ["Chongyi County", "360700"],
        "360726": ["Anyuan County", "360700"],
        "360727": ["Long County", "360700"],
        "360728": ["Dingnan County", "360700"],
        "360729": ["Quannan", "360700"],
        "360730": ["Nanjing County", "360700"],
        "360731": ["Yudu County", "360700"],
        "360732": ["Xingguo County", "360700"],
        "360733": ["Huichang County", "360700"],
        "360734": ["Xunwu County", "360700"],
        "360735": ["Shicheng", "360700"],
        "360751": ["Golden Zone", "360700"],
        "360781": ["Ruijin City", "360700"],
        "360782": ["Nankang", "360700"],
        "360783": ["Other area", "360700"],
        "360800": ["Ji'an", "360000"],
        "360802": ["Zhouqu", "360800"],
        "360803": ["Tsing district", "360800"],
        "360821": ["Ji'an County", "360800"],
        "360822": ["Jishui", "360800"],
        "360823": ["Xiajiang", "360800"],
        "360824": ["New stem County", "360800"],
        "360825": ["Yongfeng", "360800"],
        "360826": ["Taihe County", "360800"],
        "360827": ["Suichuan County", "360800"],
        "360828": ["Wanan", "360800"],
        "360829": ["Anfu County", "360800"],
        "360830": ["Yongxin County", "360800"],
        "360881": ["Jinggangshan City", "360800"],
        "360882": ["Other area", "360800"],
        "360900": ["Yichun City", "360000"],
        "360902": ["Yuanzhou", "360900"],
        "360921": ["Fengxin County", "360900"],
        "360922": ["Wanzai County", "360900"],
        "360923": ["High on the county", "360900"],
        "360924": ["Yifeng County", "360900"],
        "360925": ["Jing'an County", "360900"],
        "360926": ["Tonggu", "360900"],
        "360981": ["Feng City", "360900"],
        "360982": ["Zhangshu City", "360900"],
        "360983": ["GAOAN", "360900"],
        "360984": ["Other area", "360900"],
        "361000": ["Fuzhou City", "360000"],
        "361002": ["Linchuan", "361000"],
        "361021": ["Nancheng", "361000"],
        "361022": ["Lichuan County", "361000"],
        "361023": ["South County", "361000"],
        "361024": ["Chongren County", "361000"],
        "361025": ["Lok County", "361000"],
        "361026": ["Yihuang County", "361000"],
        "361027": ["Jinxi County", "361000"],
        "361028": ["Zixi County", "361000"],
        "361029": ["Dongxiang County", "361000"],
        "361030": ["Guangchang", "361000"],
        "361031": ["Other area", "361000"],
        "361100": ["Shangrao City", "360000"],
        "361102": ["Shinshu area", "361100"],
        "361121": ["Shangrao", "361100"],
        "361122": ["Guangfeng", "361100"],
        "361123": ["Yushan County", "361100"],
        "361124": ["Yanshan County", "361100"],
        "361125": ["Hengfeng County", "361100"],
        "361126": ["Yiyang County", "361100"],
        "361127": ["Yugan", "361100"],
        "361128": ["Poyang County", "361100"],
        "361129": ["Wannian County", "361100"],
        "361130": ["Wuyuan County", "361100"],
        "361181": ["Dexing City", "361100"],
        "361182": ["Other area", "361100"],
        "370000": ["Shandong Province", "1"],
        "370100": ["Jinan City", "370000"],
        "370102": ["Lixia District", "370100"],
        "370103": ["Central City", "370100"],
        "370104": ["Huaiyin District", "370100"],
        "370105": ["Tianqiao District", "370100"],
        "370112": ["Licheng District", "370100"],
        "370113": ["Changqing District", "370100"],
        "370124": ["Pingyin", "370100"],
        "370125": ["Jiyang County", "370100"],
        "370126": ["SHANGHE", "370100"],
        "370181": ["Zhangqiu", "370100"],
        "370182": ["Other area", "370100"],
        "370200": ["Qingdao City", "370000"],
        "370202": ["Shinan", "370200"],
        "370203": ["City North", "370200"],
        "370205": ["Sifang", "370200"],
        "370211": ["Huangdao District", "370200"],
        "370212": ["Laoshan District", "370200"],
        "370213": ["Licang", "370200"],
        "370214": ["Chengyang", "370200"],
        "370251": ["Development", "370200"],
        "370281": ["Jiaozhou", "370200"],
        "370282": ["Jimo", "370200"],
        "370283": ["Pingdu", "370200"],
        "370284": ["Jiaonan", "370200"],
        "370285": ["Lacey City", "370200"],
        "370286": ["Other area", "370200"],
        "370300": ["Zibo City", "370000"],
        "370302": ["Zichuan District", "370300"],
        "370303": ["Zhangdian District", "370300"],
        "370304": ["Boshan", "370300"],
        "370305": ["Linzi District", "370300"],
        "370306": ["ZHOUCUN", "370300"],
        "370321": ["Huantai County", "370300"],
        "370322": ["Gaoqing", "370300"],
        "370323": ["Yiyuan", "370300"],
        "370324": ["Other area", "370300"],
        "370400": ["Zaozhuang", "370000"],
        "370402": ["Central City", "370400"],
        "370403": ["Xuecheng", "370400"],
        "370404": ["Yi Town", "370400"],
        "370405": ["Taierzhuang District", "370400"],
        "370406": ["Shanting", "370400"],
        "370481": ["Tengzhou", "370400"],
        "370482": ["Other area", "370400"],
        "370500": ["Dongying City", "370000"],
        "370502": ["Dongying District", "370500"],
        "370503": ["Estuary", "370500"],
        "370521": ["Kenli County", "370500"],
        "370522": ["Lijin", "370500"],
        "370523": ["Guangrao County", "370500"],
        "370589": ["Xicheng District", "370500"],
        "370590": ["Dongcheng Area", "370500"],
        "370591": ["Other area", "370500"],
        "370600": ["Yantai", "370000"],
        "370602": ["ZHIFU", "370600"],
        "370611": ["Fushan", "370600"],
        "370612": ["MUPING", "370600"],
        "370613": ["Laishan", "370600"],
        "370634": ["Long Island County", "370600"],
        "370681": ["Longkou", "370600"],
        "370682": ["Laiyang", "370600"],
        "370683": ["Laizhou", "370600"],
        "370684": ["Penglai", "370600"],
        "370685": ["Zhaoyuan", "370600"],
        "370686": ["Qixia", "370600"],
        "370687": ["Haiyang", "370600"],
        "370688": ["Other area", "370600"],
        "370700": ["Weifang", "370000"],
        "370702": ["Weicheng district", "370700"],
        "370703": ["Hanting District", "370700"],
        "370704": ["Fangzi", "370700"],
        "370705": ["Cravens District", "370700"],
        "370724": ["Linqu", "370700"],
        "370725": ["Changle County", "370700"],
        "370751": ["Development", "370700"],
        "370781": ["Qingzhou", "370700"],
        "370782": ["Zhucheng", "370700"],
        "370783": ["Shouguang", "370700"],
        "370784": ["Anqiu", "370700"],
        "370785": ["Gaomi", "370700"],
        "370786": ["Changyi", "370700"],
        "370787": ["Other area", "370700"],
        "370800": ["Jining City", "370000"],
        "370802": ["Central City", "370800"],
        "370811": ["Any city", "370800"],
        "370826": ["Weishan", "370800"],
        "370827": ["YUTAI", "370800"],
        "370828": ["Jinxiang", "370800"],
        "370829": ["Jiaxiang County", "370800"],
        "370830": ["Wenshang County", "370800"],
        "370831": ["Surabaya", "370800"],
        "370832": ["Liangshan County", "370800"],
        "370881": ["Qufu", "370800"],
        "370882": ["Yanzhou", "370800"],
        "370883": ["Zoucheng", "370800"],
        "370884": ["Other area", "370800"],
        "370900": ["Tai'an City", "370000"],
        "370902": ["Taishan District", "370900"],
        "370903": ["Daiyue", "370900"],
        "370921": ["Ningyang", "370900"],
        "370923": ["Dongping", "370900"],
        "370982": ["Xintai", "370900"],
        "370983": ["Fat city", "370900"],
        "370984": ["Other area", "370900"],
        "371000": ["Weihai", "370000"],
        "371002": ["Huancui", "371000"],
        "371081": ["Wendeng", "371000"],
        "371082": ["Rongcheng", "371000"],
        "371083": ["Rushan", "371000"],
        "371084": ["Other area", "371000"],
        "371100": ["Rizhao", "370000"],
        "371102": ["Donggang", "371100"],
        "371103": ["Lanshan District", "371100"],
        "371121": ["Wulian County", "371100"],
        "371122": ["Juxian", "371100"],
        "371123": ["Other area", "371100"],
        "371200": ["Laiwu", "370000"],
        "371202": ["Levin", "371200"],
        "371203": ["Gangcheng", "371200"],
        "371204": ["Other area", "371200"],
        "371300": ["Linyi City", "370000"],
        "371302": ["Lanshan", "371300"],
        "371311": ["LuoZhuang", "371300"],
        "371312": ["Hedong District", "371300"],
        "371321": ["Yinan", "371300"],
        "371322": ["Tancheng", "371300"],
        "371323": ["Yishui County", "371300"],
        "371324": ["Cangshan", "371300"],
        "371325": ["Feixian", "371300"],
        "371326": ["Pingyi County", "371300"],
        "371327": ["Junan", "371300"],
        "371328": ["Mengyin", "371300"],
        "371329": ["Linshu", "371300"],
        "371330": ["Other area", "371300"],
        "371400": ["Dezhou", "370000"],
        "371402": ["German city", "371400"],
        "371421": ["Ling", "371400"],
        "371422": ["Ning County", "371400"],
        "371423": ["Qingyun", "371400"],
        "371424": ["Linyi County", "371400"],
        "371425": ["Qihe County", "371400"],
        "371426": ["Plain County", "371400"],
        "371427": ["Xiajin County", "371400"],
        "371428": ["Wu County", "371400"],
        "371451": ["Development", "371400"],
        "371481": ["Leling", "371400"],
        "371482": ["Yucheng", "371400"],
        "371483": ["Other area", "371400"],
        "371500": ["Liaocheng", "370000"],
        "371502": ["Dongchangfu", "371500"],
        "371521": ["Yanggu County", "371500"],
        "371522": ["SHENXIAN", "371500"],
        "371523": ["Chiping", "371500"],
        "371524": ["Dong'e County", "371500"],
        "371525": ["Guan County", "371500"],
        "371526": ["Gaotang", "371500"],
        "371581": ["Linqing", "371500"],
        "371582": ["Other area", "371500"],
        "371600": ["Binzhou", "370000"],
        "371602": ["Bin City", "371600"],
        "371621": ["Huimin", "371600"],
        "371622": ["Yangxin County", "371600"],
        "371623": ["Wudi County", "371600"],
        "371624": ["Zhanhua County", "371600"],
        "371625": ["Boxing County", "371600"],
        "371626": ["Zouping County", "371600"],
        "371627": ["Other area", "371600"],
        "371700": ["Heze City", "370000"],
        "371702": ["Peony District", "371700"],
        "371721": ["Cao", "371700"],
        "371722": ["Single County", "371700"],
        "371723": ["Chengwu", "371700"],
        "371724": ["Juye County", "371700"],
        "371725": ["Yuncheng", "371700"],
        "371726": ["Juancheng", "371700"],
        "371727": ["Dingtao County", "371700"],
        "371728": ["Dongming", "371700"],
        "371729": ["Other area", "371700"],
        "410000": ["Henan Province", "1"],
        "410100": ["Zhengzhou City", "410000"],
        "410102": ["Zhongyuan District", "410100"],
        "410103": ["Erqi", "410100"],
        "410104": ["Guancheng Hui District", "410100"],
        "410105": ["Jinshui", "410100"],
        "410106": ["On the street", "410100"],
        "410108": ["Huiji District", "410100"],
        "410122": ["Zhongmou County", "410100"],
        "410181": ["Gongyi City", "410100"],
        "410182": ["Xingyang", "410100"],
        "410183": ["Xinmi", "410100"],
        "410184": ["Xinzheng", "410100"],
        "410185": ["Dengfeng", "410100"],
        "410186": ["Zhengdong New District", "410100"],
        "410187": ["High-tech Zone", "410100"],
        "410188": ["Other area", "410100"],
        "410200": ["Kaifeng", "410000"],
        "410202": ["Longting", "410200"],
        "410203": ["Shunhe Hui District", "410200"],
        "410204": ["Gulou District", "410200"],
        "410205": ["Yuwangtai", "410200"],
        "410211": ["Jinming District", "410200"],
        "410221": ["Qixian", "410200"],
        "410222": ["TONGXU", "410200"],
        "410223": ["Weishi County", "410200"],
        "410224": ["Kaifeng County", "410200"],
        "410225": ["Lankao County", "410200"],
        "410226": ["Other area", "410200"],
        "410300": ["Luoyang City", "410000"],
        "410302": ["Old Town", "410300"],
        "410303": ["Xigong", "410300"],
        "410304": ["Hui Chan River area", "410300"],
        "410305": ["Jianxi District", "410300"],
        "410306": ["Geely District", "410300"],
        "410307": ["Luolong", "410300"],
        "410322": ["Mengjin County", "410300"],
        "410323": ["Xin'an County", "410300"],
        "410324": ["Luanchuan", "410300"],
        "410325": ["Song County", "410300"],
        "410326": ["Ruyang County", "410300"],
        "410327": ["Yiyang County", "410300"],
        "410328": ["Luoning County", "410300"],
        "410329": ["Yichuan County", "410300"],
        "410381": ["Yanshi", "410300"],
        "410400": ["Pingdingshan", "410000"],
        "410402": ["Xinhua District", "410400"],
        "410403": ["Weidong Qu", "410400"],
        "410404": ["Shilong District", "410400"],
        "410411": ["Zhanhe District", "410400"],
        "410421": ["Baofeng County", "410400"],
        "410422": ["Ye", "410400"],
        "410423": ["Lushan County", "410400"],
        "410425": ["Jia County", "410400"],
        "410481": ["Wugang", "410400"],
        "410482": ["Ruzhou", "410400"],
        "410483": ["Other area", "410400"],
        "410500": ["Anyang City", "410000"],
        "410502": ["Wenfeng District", "410500"],
        "410503": ["North Gate area", "410500"],
        "410505": ["Yindu District", "410500"],
        "410506": ["Long An area", "410500"],
        "410522": ["Anyang County", "410500"],
        "410523": ["Tangyin", "410500"],
        "410526": ["Huaxian", "410500"],
        "410527": ["Neihuang", "410500"],
        "410581": ["Linzhou", "410500"],
        "410582": ["Other area", "410500"],
        "410600": ["Hebi", "410000"],
        "410602": ["Heshan District", "410600"],
        "410603": ["Mountain City", "410600"],
        "410611": ["Qibin", "410600"],
        "410621": ["Xunxian", "410600"],
        "410622": ["Qi County", "410600"],
        "410623": ["Other area", "410600"],
        "410700": ["Xinxiang", "410000"],
        "410702": ["Red zone", "410700"],
        "410703": ["Weibin District", "410700"],
        "410704": ["Fung-chuen", "410700"],
        "410711": ["Makino District", "410700"],
        "410721": ["Xinxiang County", "410700"],
        "410724": ["Walker County", "410700"],
        "410725": ["Yuanyang County", "410700"],
        "410726": ["Yanjin County", "410700"],
        "410727": ["Fengqiu County", "410700"],
        "410728": ["Changyuan", "410700"],
        "410781": ["Weihui", "410700"],
        "410782": ["Huixian", "410700"],
        "410783": ["Other area", "410700"],
        "410800": ["Jiaozuo", "410000"],
        "410802": ["Liberated", "410800"],
        "410803": ["Station area", "410800"],
        "410804": ["Macun District", "410800"],
        "410811": ["Sanyo Area", "410800"],
        "410821": ["Xiuwu County", "410800"],
        "410822": ["Boai County", "410800"],
        "410823": ["Wuzhi", "410800"],
        "410825": ["Wenxian", "410800"],
        "410881": ["Jiyuan City", "410000"],
        "410882": ["Qinyang", "410800"],
        "410883": ["Mengzhou", "410800"],
        "410884": ["Other area", "410800"],
        "410900": ["Puyang", "410000"],
        "410902": ["Hualong District", "410900"],
        "410922": ["Qingfeng", "410900"],
        "410923": ["South County", "410900"],
        "410926": ["Fanxian", "410900"],
        "410927": ["Taiqian", "410900"],
        "410928": ["Puyang County", "410900"],
        "410929": ["Other area", "410900"],
        "411000": ["Xuchang", "410000"],
        "411002": ["Wei Du District", "411000"],
        "411023": ["Xuchang County", "411000"],
        "411024": ["Yanling County", "411000"],
        "411025": ["Xiangcheng County", "411000"],
        "411081": ["Yuzhou", "411000"],
        "411082": ["Changge", "411000"],
        "411083": ["Other area", "411000"],
        "411100": ["Luohe", "410000"],
        "411102": ["Yuan Huiqu", "411100"],
        "411103": ["Yancheng District", "411100"],
        "411104": ["Shaoling District", "411100"],
        "411121": ["Wuyang", "411100"],
        "411122": ["Linying", "411100"],
        "411123": ["Other area", "411100"],
        "411200": ["Sanmenxia City", "410000"],
        "411202": ["Lakeshore", "411200"],
        "411221": ["Mianchi County", "411200"],
        "411222": ["Shan County", "411200"],
        "411224": ["Lushi County", "411200"],
        "411281": ["Yima City", "411200"],
        "411282": ["Lingbao", "411200"],
        "411283": ["Other area", "411200"],
        "411300": ["Nanyang City", "410000"],
        "411302": ["Wancheng", "411300"],
        "411303": ["Wolong District", "411300"],
        "411321": ["Nanzhao", "411300"],
        "411322": ["FangChengXian", "411300"],
        "411323": ["Xixia County", "411300"],
        "411324": ["Zhenping County", "411300"],
        "411325": ["Neixiang", "411300"],
        "411326": ["Xichuan", "411300"],
        "411327": ["Sheqi", "411300"],
        "411328": ["Tanghe County", "411300"],
        "411329": ["Xinye", "411300"],
        "411330": ["Tongbai County", "411300"],
        "411381": ["Dengzhou", "411300"],
        "411382": ["Other area", "411300"],
        "411400": ["Shangqiu City", "410000"],
        "411402": ["Liangyuan", "411400"],
        "411403": ["Suiyang District", "411400"],
        "411421": ["Citizens County", "411400"],
        "411422": ["Sui", "411400"],
        "411423": ["Ningling", "411400"],
        "411424": ["Zhecheng", "411400"],
        "411425": ["Yucheng County", "411400"],
        "411426": ["Xiayi", "411400"],
        "411481": ["Wing City", "411400"],
        "411482": ["Other area", "411400"],
        "411500": ["Xinyang City", "410000"],
        "411502": ["Shihe District", "411500"],
        "411503": ["Pingqiao District", "411500"],
        "411521": ["Luoshan", "411500"],
        "411522": ["Guangshan County", "411500"],
        "411523": ["County", "411500"],
        "411524": ["Shangcheng County", "411500"],
        "411525": ["Gushi County", "411500"],
        "411526": ["Huangchuan County", "411500"],
        "411527": ["Huaibin County", "411500"],
        "411528": ["Xi County", "411500"],
        "411529": ["Other area", "411500"],
        "411600": ["Zhoukou", "410000"],
        "411602": ["Chuanhui Qu", "411600"],
        "411621": ["Fugou", "411600"],
        "411622": ["Xihua", "411600"],
        "411623": ["Shangshui", "411600"],
        "411624": ["沈丘县", "411600"],
        "411625": ["Dancheng", "411600"],
        "411626": ["Huaiyang County", "411600"],
        "411627": ["Taikang County", "411600"],
        "411628": ["Luyi County", "411600"],
        "411681": ["City of", "411600"],
        "411682": ["Other area", "411600"],
        "411700": ["Zhumadian", "410000"],
        "411702": ["Station City", "411700"],
        "411721": ["Xiping", "411700"],
        "411722": ["Shangcai County", "411700"],
        "411723": ["Pingyu County", "411700"],
        "411724": ["Zhengyang", "411700"],
        "411725": ["Queshan", "411700"],
        "411726": ["Biyang", "411700"],
        "411727": ["Runan County", "411700"],
        "411728": ["Suiping", "411700"],
        "411729": ["Xincai", "411700"],
        "411730": ["Other area", "411700"],
        "420000": ["Hubei", "1"],
        "420100": ["Wuhan", "420000"],
        "420102": ["Riverbank area", "420100"],
        "420103": ["Jianghan District", "420100"],
        "420104": ["Qiaokou", "420100"],
        "420105": ["Hanyang District", "420100"],
        "420106": ["Wuchang District", "420100"],
        "420107": ["Peak District", "420100"],
        "420111": ["Hongshan District", "420100"],
        "420112": ["East Lake", "420100"],
        "420113": ["Hannan", "420100"],
        "420114": ["Caidian", "420100"],
        "420115": ["Jiangxia", "420100"],
        "420116": ["Huangpi", "420100"],
        "420117": ["Xinzhou District", "420100"],
        "420118": ["Other area", "420100"],
        "420200": ["Huangshi", "420000"],
        "420202": ["Huangshi Port District", "420200"],
        "420203": ["Xisaishanqu", "420200"],
        "420204": ["Xialu district", "420200"],
        "420205": ["Iron mountain", "420200"],
        "420222": ["Yangxin County", "420200"],
        "420281": ["Daye City", "420200"],
        "420282": ["Other area", "420200"],
        "420300": ["Shiyan", "420000"],
        "420302": ["Maojian District", "420300"],
        "420303": ["Zhangwan", "420300"],
        "420321": ["Yun County", "420300"],
        "420322": ["YUNXI", "420300"],
        "420323": ["Zhushan", "420300"],
        "420324": ["Zhuxi County", "420300"],
        "420325": ["Housing County", "420300"],
        "420381": ["Danjiangkou City", "420300"],
        "420382": ["Town", "420300"],
        "420383": ["Other area", "420300"],
        "420500": ["Yichang City", "420000"],
        "420502": ["Xiling District", "420500"],
        "420503": ["Wujiagang area", "420500"],
        "420504": ["Point Military", "420500"],
        "420505": ["Xiao Ting", "420500"],
        "420506": ["Yiling District", "420500"],
        "420525": ["Yuan Anxian", "420500"],
        "420526": ["Xingshan County", "420500"],
        "420527": ["Zigui County", "420500"],
        "420528": ["Changyang County", "420500"],
        "420529": ["Wufeng Tujia Autonomous County", "420500"],
        "420551": ["Gezhouba Dam area", "420500"],
        "420552": ["Development", "420500"],
        "420581": ["Yidu", "420500"],
        "420582": ["Dangyang", "420500"],
        "420583": ["Zhijiang City", "420500"],
        "420584": ["Other area", "420500"],
        "420600": ["Xiangyang", "420000"],
        "420602": ["Xiangcheng District", "420600"],
        "420606": ["Fancheng", "420600"],
        "420607": ["Xiangzhou District", "420600"],
        "420624": ["Nanzhang", "420600"],
        "420625": ["Valley County", "420600"],
        "420626": ["Baokang County", "420600"],
        "420682": ["Laohekou", "420600"],
        "420683": ["Zaoyang", "420600"],
        "420684": ["Yicheng", "420600"],
        "420685": ["Other area", "420600"],
        "420700": ["Ezhou", "420000"],
        "420702": ["Liangzihu area", "420700"],
        "420703": ["Huarong District", "420700"],
        "420704": ["E Town", "420700"],
        "420705": ["Other area", "420700"],
        "420800": ["Jingmen City", "420000"],
        "420802": ["Dongbao District", "420800"],
        "420804": ["Duodao District", "420800"],
        "420821": ["Jingshan County", "420800"],
        "420822": ["Shayang County", "420800"],
        "420881": ["Zhongxiang", "420800"],
        "420882": ["Other area", "420800"],
        "420900": ["Xiaogan", "420000"],
        "420902": ["Xiaonan", "420900"],
        "420921": ["Xiaochang County", "420900"],
        "420922": ["Dawu", "420900"],
        "420923": ["Yunmeng County", "420900"],
        "420981": ["Should Cities", "420900"],
        "420982": ["Anlu", "420900"],
        "420984": ["Hanchuan", "420900"],
        "420985": ["Other area", "420900"],
        "421000": ["Jingzhou City", "420000"],
        "421002": ["Shashi District", "421000"],
        "421003": ["Jingzhou District", "421000"],
        "421022": ["Gong'an County", "421000"],
        "421023": ["Jianli County", "421000"],
        "421024": ["Jiangling County", "421000"],
        "421081": ["Shishou", "421000"],
        "421083": ["Honghu City", "421000"],
        "421087": ["Songzi", "421000"],
        "421088": ["Other area", "421000"],
        "421100": ["Huanggang City", "420000"],
        "421102": ["Huangzhou", "421100"],
        "421121": ["Tuanfeng county", "421100"],
        "421122": ["Hongan", "421100"],
        "421123": ["Luotian County,", "421100"],
        "421124": ["Yingshan", "421100"],
        "421125": ["Xishui County", "421100"],
        "421126": ["Qichun", "421100"],
        "421127": ["Huangmei", "421100"],
        "421181": ["Macheng City", "421100"],
        "421182": ["Wuxue", "421100"],
        "421183": ["Other area", "421100"],
        "421200": ["Xianning City", "420000"],
        "421202": ["Haman area", "421200"],
        "421221": ["Jiayu", "421200"],
        "421222": ["Tongcheng", "421200"],
        "421223": ["Chongyang County", "421200"],
        "421224": ["Tongshan County", "421200"],
        "421281": ["Chibi", "421200"],
        "421282": ["Spa Town", "421200"],
        "421283": ["Other area", "421200"],
        "421300": ["Suizhou", "420000"],
        "421302": ["Zengdu area", "421300"],
        "421321": ["With the county", "421300"],
        "421381": ["Guangshui", "421300"],
        "421382": ["Other area", "421300"],
        "422800": ["Enshi Tujia and Miao Autonomous Prefecture", "420000"],
        "422801": ["Enshi City", "422800"],
        "422802": ["Icheon", "422800"],
        "422822": ["Jianshi County", "422800"],
        "422823": ["Badong County", "422800"],
        "422825": ["Xuan'en", "422800"],
        "422826": ["Xianfeng", "422800"],
        "422827": ["Exemplifying", "422800"],
        "422828": ["Hefeng", "422800"],
        "422829": ["Other area", "422800"],
        "429004": ["Xiantao", "420000"],
        "429005": ["Qianjiang City", "420000"],
        "429006": ["Tianmen", "420000"],
        "429021": ["Shennongjia", "420000"],
        "430000": ["Hunan Province", "1"],
        "430100": ["Changsha City", "430000"],
        "430102": ["Furong District", "430100"],
        "430103": ["Tianxin", "430100"],
        "430104": ["Yuelu District", "430100"],
        "430105": ["Kaifu District", "430100"],
        "430111": ["Yuhua District", "430100"],
        "430121": ["Changsha County", "430100"],
        "430122": ["Wangcheng", "430100"],
        "430124": ["Ningxiang County", "430100"],
        "430181": ["Liuyang", "430100"],
        "430182": ["Other area", "430100"],
        "430200": ["Zhuzhou City", "430000"],
        "430202": ["Hetang", "430200"],
        "430203": ["Lusong", "430200"],
        "430204": ["Shifeng", "430200"],
        "430211": ["Tianyuan District", "430200"],
        "430221": ["Zhuzhou County", "430200"],
        "430223": ["Youxian", "430200"],
        "430224": ["Chaling County", "430200"],
        "430225": ["Yanling County", "430200"],
        "430281": ["Liling", "430200"],
        "430282": ["Other area", "430200"],
        "430300": ["Xiangtan City", "430000"],
        "430302": ["Yuhu District", "430300"],
        "430304": ["Yuetang", "430300"],
        "430321": ["Xiangtan County", "430300"],
        "430381": ["Xiangxiang", "430300"],
        "430382": ["Shaoshan City", "430300"],
        "430383": ["Other area", "430300"],
        "430400": ["Hengyang", "430000"],
        "430405": ["Chu Hui District", "430400"],
        "430406": ["Yanfeng District", "430400"],
        "430407": ["Shek Kwu District", "430400"],
        "430408": ["Zhengxiang District", "430400"],
        "430412": ["Nanyue District", "430400"],
        "430421": ["Hengyang County", "430400"],
        "430422": ["Hengnan", "430400"],
        "430423": ["Hengshan County", "430400"],
        "430424": ["Hengdong", "430400"],
        "430426": ["Qidong County", "430400"],
        "430481": ["Leiyang", "430400"],
        "430482": ["Changning", "430400"],
        "430483": ["Other area", "430400"],
        "430500": ["Shaoyang City", "430000"],
        "430502": ["Shuangqing District", "430500"],
        "430503": ["Daxiang district", "430500"],
        "430511": ["North Tower District", "430500"],
        "430521": ["Shaodong", "430500"],
        "430522": ["Xinshao County", "430500"],
        "430523": ["Shaoyang County", "430500"],
        "430524": ["Longhui County", "430500"],
        "430525": ["Dongkou", "430500"],
        "430527": ["Suining County", "430500"],
        "430528": ["New County", "430500"],
        "430529": ["Chengbu Miao Autonomous County", "430500"],
        "430581": ["Wugang City", "430500"],
        "430582": ["Other area", "430500"],
        "430600": ["Yueyang City", "430000"],
        "430602": ["Yueyang Tower District", "430600"],
        "430603": ["Cloud River District", "430600"],
        "430611": ["Junshan", "430600"],
        "430621": ["Yueyang County", "430600"],
        "430623": ["Huarong", "430600"],
        "430624": ["Xiangyin County", "430600"],
        "430626": ["Pingjiang", "430600"],
        "430681": ["Miluo City", "430600"],
        "430682": ["Linxiang City", "430600"],
        "430683": ["Other area", "430600"],
        "430700": ["Changde City", "430000"],
        "430702": ["Wuling", "430700"],
        "430703": ["Ding Town", "430700"],
        "430721": ["Anxiang", "430700"],
        "430722": ["Hanshou County", "430700"],
        "430723": ["Lixian", "430700"],
        "430724": ["Linli County", "430700"],
        "430725": ["Taoyuan County", "430700"],
        "430726": ["Shimen", "430700"],
        "430781": ["Tsu City", "430700"],
        "430782": ["Other area", "430700"],
        "430800": ["Zhangjiajie", "430000"],
        "430802": ["Yongding", "430800"],
        "430811": ["Wulingyuan District", "430800"],
        "430821": ["Cili County", "430800"],
        "430822": ["Sangzhi County", "430800"],
        "430823": ["Other area", "430800"],
        "430900": ["Yiyang City", "430000"],
        "430902": ["Ziyang", "430900"],
        "430903": ["Heshan", "430900"],
        "430921": ["County", "430900"],
        "430922": ["Taojiang County", "430900"],
        "430923": ["Anhua", "430900"],
        "430981": ["Yuanjiang City", "430900"],
        "430982": ["Other area", "430900"],
        "431000": ["Chenzhou City", "430000"],
        "431002": ["BeiHuOu", "431000"],
        "431003": ["Suxian District", "431000"],
        "431021": ["Guiyang County", "431000"],
        "431022": ["Yizhang County", "431000"],
        "431023": ["Yongxing County", "431000"],
        "431024": ["Jiahe County", "431000"],
        "431025": ["Linwu", "431000"],
        "431026": ["Rucheng County", "431000"],
        "431027": ["Guidong County", "431000"],
        "431028": ["Anren", "431000"],
        "431081": ["Zixing", "431000"],
        "431082": ["Other area", "431000"],
        "431100": ["Yongzhou", "430000"],
        "431102": ["Lingling District", "431100"],
        "431103": ["Lengshuitan area", "431100"],
        "431121": ["Qiyang County", "431100"],
        "431122": ["East County", "431100"],
        "431123": ["Shuangpai County", "431100"],
        "431124": ["County Road", "431100"],
        "431125": ["Jiangyong County", "431100"],
        "431126": ["Ningyuan", "431100"],
        "431127": ["Lanshan", "431100"],
        "431128": ["Xintian County", "431100"],
        "431129": ["Jianghua Yao Autonomous County", "431100"],
        "431130": ["Other area", "431100"],
        "431200": ["Huaihua", "430000"],
        "431202": ["Cape Town", "431200"],
        "431221": ["China county", "431200"],
        "431222": ["Yuanling County", "431200"],
        "431223": ["Chenxi County", "431200"],
        "431224": ["Xupu", "431200"],
        "431225": ["Huitong County", "431200"],
        "431226": ["Mayang Miao Autonomous County", "431200"],
        "431227": ["Sinko Dong Autonomous County", "431200"],
        "431228": ["Zhijiang Dong Autonomous County", "431200"],
        "431229": ["Jingzhou Miao and Dong Autonomous County", "431200"],
        "431230": ["The channel Dong Autonomous County", "431200"],
        "431281": ["Hongjiang City", "431200"],
        "431282": ["Other area", "431200"],
        "431300": ["Loudi", "430000"],
        "431302": ["Louxing", "431300"],
        "431321": ["Shuangfeng County", "431300"],
        "431322": ["Xinhua County", "431300"],
        "431381": ["Lengshuijiang", "431300"],
        "431382": ["Lianyuan", "431300"],
        "431383": ["Other area", "431300"],
        "433100": ["Xiangxi Tujia and Miao Autonomous Prefecture", "430000"],
        "433101": ["Jishou City", "433100"],
        "433122": ["Luxi County", "433100"],
        "433123": ["Fenghuang County", "433100"],
        "433124": ["Huayuan County", "433100"],
        "433125": ["Baojing County", "433100"],
        "433126": ["Guzhang County", "433100"],
        "433127": ["Yongshun County", "433100"],
        "433130": ["Longshan County", "433100"],
        "433131": ["Other area", "433100"],
        "440000": ["Guangdong Province", "1"],
        "440100": ["Guangzhou City", "440000"],
        "440103": ["Liwan District", "440100"],
        "440104": ["Yuexiu District", "440100"],
        "440105": ["Haizhu", "440100"],
        "440106": ["Tianhe District", "440100"],
        "440111": ["Baiyun District", "440100"],
        "440112": ["Huangpu District", "440100"],
        "440113": ["Panyu District", "440100"],
        "440114": ["Huadu District", "440100"],
        "440115": ["Nansha District", "440100"],
        "440116": ["Luogang District", "440100"],
        "440183": ["Zengcheng", "440100"],
        "440184": ["Conghua", "440100"],
        "440188": ["Dongshan District", "440100"],
        "440189": ["Other area", "440100"],
        "440200": ["Shaoguan", "440000"],
        "440203": ["Wujiang", "440200"],
        "440204": ["Zhenjiang", "440200"],
        "440205": ["Qujiang District", "440200"],
        "440222": ["Shixing", "440200"],
        "440224": ["Renhua County", "440200"],
        "440229": ["Wengyuan County", "440200"],
        "440232": ["Ruyuan Yao Autonomous County", "440200"],
        "440233": ["New County", "440200"],
        "440281": ["Lechang City", "440200"],
        "440282": ["Nanxiong City", "440200"],
        "440283": ["Other area", "440200"],
        "440300": ["Shenzhen", "440000"],
        "440303": ["Luohu district", "440300"],
        "440304": ["Futian district", "440300"],
        "440305": ["Nanshan District", "440300"],
        "440306": ["Bao'an District", "440300"],
        "440307": ["Longgang District", "440300"],
        "440308": ["Yantian District", "440300"],
        "440309": ["Other area", "440300"],
        "440400": ["Zhuhai City", "440000"],
        "440402": ["Xiangzhou District", "440400"],
        "440403": ["Doumen District", "440400"],
        "440404": ["Golden Bay", "440400"],
        "440486": ["Gold Down District Council", "440400"],
        "440487": ["South Bay", "440400"],
        "440488": ["Other area", "440400"],
        "440500": ["Shantou", "440000"],
        "440507": ["Lake District", "440500"],
        "440511": ["Jinping District", "440500"],
        "440512": ["Haojiang", "440500"],
        "440513": ["Chaoyang District", "440500"],
        "440514": ["Chaonan", "440500"],
        "440515": ["Chenghai", "440500"],
        "440523": ["Nan'ao County", "440500"],
        "440524": ["Other area", "440500"],
        "440600": ["Foshan City", "440000"],
        "440604": ["Chancheng", "440600"],
        "440605": ["Nanhai District", "440600"],
        "440606": ["Shunde", "440600"],
        "440607": ["Sanshui District", "440600"],
        "440608": ["Gaoming", "440600"],
        "440609": ["Other area", "440600"],
        "440700": ["Jiangmen", "440000"],
        "440703": ["Pengjiang", "440700"],
        "440704": ["Jianghaigou", "440700"],
        "440705": ["Xinhui District", "440700"],
        "440781": ["Taishan", "440700"],
        "440783": ["Kaiping", "440700"],
        "440784": ["Heshan", "440700"],
        "440785": ["Enping", "440700"],
        "440786": ["Other area", "440700"],
        "440800": ["Zhanjiang", "440000"],
        "440802": ["Chikan District", "440800"],
        "440803": ["Xiashan", "440800"],
        "440804": ["Potou", "440800"],
        "440811": ["Mazhang", "440800"],
        "440823": ["Suixi County", "440800"],
        "440825": ["Xuwen County", "440800"],
        "440881": ["Lianjiang", "440800"],
        "440882": ["Leizhou", "440800"],
        "440883": ["Wuchuan", "440800"],
        "440884": ["Other area", "440800"],
        "440900": ["Maoming City", "440000"],
        "440902": ["Maonan", "440900"],
        "440903": ["Maogang", "440900"],
        "440923": ["Dianbai", "440900"],
        "440981": ["Gaozhou", "440900"],
        "440982": ["City of", "440900"],
        "440983": ["Xinyi", "440900"],
        "440984": ["Other area", "440900"],
        "441200": ["Zhaoqing", "440000"],
        "441202": ["Duanzhou", "441200"],
        "441203": ["Dinghu District", "441200"],
        "441223": ["Guangning", "441200"],
        "441224": ["Huaiji County", "441200"],
        "441225": ["Fengkai", "441200"],
        "441226": ["Deqing County", "441200"],
        "441283": ["Gaoyao", "441200"],
        "441284": ["Sihui", "441200"],
        "441285": ["Other area", "441200"],
        "441300": ["Huizhou City", "440000"],
        "441302": ["- City", "441300"],
        "441303": ["Huiyang District", "441300"],
        "441322": ["Boluo", "441300"],
        "441323": ["Huidong County", "441300"],
        "441324": ["Longmen County", "441300"],
        "441325": ["Other area", "441300"],
        "441400": ["Meizhou", "440000"],
        "441402": ["Meijiang District", "441400"],
        "441421": ["Meixian", "441400"],
        "441422": ["Dabu", "441400"],
        "441423": ["Fengshun County", "441400"],
        "441424": ["Wuhua", "441400"],
        "441426": ["Pingyuan", "441400"],
        "441427": ["Jiaoling", "441400"],
        "441481": ["Xingning", "441400"],
        "441482": ["Other area", "441400"],
        "441500": ["Shanwei", "440000"],
        "441502": ["Town", "441500"],
        "441521": ["Haifeng", "441500"],
        "441523": ["Luhe County", "441500"],
        "441581": ["Lufeng", "441500"],
        "441582": ["Other area", "441500"],
        "441600": ["Heyuan City", "440000"],
        "441602": ["Source Town", "441600"],
        "441621": ["Zijin County", "441600"],
        "441622": ["Longchuan County", "441600"],
        "441623": ["Lianping", "441600"],
        "441624": ["Heping County", "441600"],
        "441625": ["Dongyuan County", "441600"],
        "441626": ["Other area", "441600"],
        "441700": ["Yangjiang", "440000"],
        "441702": ["Jiangcheng", "441700"],
        "441721": ["Yangxi", "441700"],
        "441723": ["Yangdong", "441700"],
        "441781": ["Yangchun City", "441700"],
        "441782": ["Other area", "441700"],
        "441800": ["Qingyuan", "440000"],
        "441802": ["Qing City", "441800"],
        "441821": ["Fogang", "441800"],
        "441823": ["Yangshan County", "441800"],
        "441825": ["Lianshan Zhuang and Yao Autonomous County", "441800"],
        "441826": ["Liannan County", "441800"],
        "441827": ["Qingxin", "441800"],
        "441881": ["Yingde", "441800"],
        "441882": ["Lianzhou", "441800"],
        "441883": ["Other area", "441800"],
        "441900": ["Dongguan", "440000"],
        "441901": ["Wanjiang District", "441900"],
        "441902": ["Guancheng District", "441900"],
        "441903": ["South District", "441900"],
        "441904": ["Dongcheng District", "441900"],
        "442000": ["Zhongshan City", "440000"],
        "442001": ["Shiqi", "442000"],
        "442002": ["Eastern", "442000"],
        "442003": ["West", "442000"],
        "442004": ["South", "442000"],
        "442005": ["Wuguishan", "442000"],
        "442006": ["Other area", "442000"],
        "445100": ["Chaozhou", "440000"],
        "445102": ["Xiangqiao", "445100"],
        "445121": ["Chao", "445100"],
        "445122": ["Raoping", "445100"],
        "445185": ["Fengxi", "445100"],
        "445186": ["Other area", "445100"],
        "445200": ["Jieyang", "440000"],
        "445202": ["Rongcheng District", "445200"],
        "445221": ["Jiedong", "445200"],
        "445222": ["JieXi", "445200"],
        "445224": ["Huilai County", "445200"],
        "445281": ["Puning", "445200"],
        "445284": ["Dongshan District", "445200"],
        "445285": ["Other area", "445200"],
        "445300": ["Yunfu", "440000"],
        "445302": ["Cloud City", "445300"],
        "445321": ["Xinxing", "445300"],
        "445322": ["Yunan", "445300"],
        "445323": ["Cloud County", "445300"],
        "445381": ["Luoding", "445300"],
        "445382": ["Other area", "445300"],
        "450000": ["Guangxi Zhuang Autonomous Region", "1"],
        "450100": ["Nanning", "450000"],
        "450102": ["Xingning", "450100"],
        "450103": ["Green show area", "450100"],
        "450105": ["Gangnam", "450100"],
        "450107": ["Xixiangtang", "450100"],
        "450108": ["Liang Qing District", "450100"],
        "450109": ["Yongning District", "450100"],
        "450122": ["Wuming", "450100"],
        "450123": ["Longan County", "450100"],
        "450124": ["Mashan", "450100"],
        "450125": ["Shanglin", "450100"],
        "450126": ["Binyang County", "450100"],
        "450127": ["Heng", "450100"],
        "450128": ["Other area", "450100"],
        "450200": ["Liuzhou", "450000"],
        "450202": ["City area", "450200"],
        "450203": ["Yufeng District", "450200"],
        "450204": ["Liunan District", "450200"],
        "450205": ["Beiqu", "450200"],
        "450221": ["Liujiang County", "450200"],
        "450222": ["Liucheng", "450200"],
        "450223": ["Luzhai County", "450200"],
        "450224": ["Rong'an", "450200"],
        "450225": ["Rongshui Miao Autonomous County", "450200"],
        "450226": ["Sanjiang Dong Autonomous County", "450200"],
        "450227": ["Other area", "450200"],
        "450300": ["Guilin", "450000"],
        "450302": ["Xiufeng District", "450300"],
        "450303": ["Diecai District", "450300"],
        "450304": ["Like the mountains", "450300"],
        "450305": ["Qixing District", "450300"],
        "450311": ["Yanshan", "450300"],
        "450321": ["Yangshuo County", "450300"],
        "450322": ["Lingui", "450300"],
        "450323": ["Lingchuan County", "450300"],
        "450324": ["Quanzhou County", "450300"],
        "450325": ["Xing'an County", "450300"],
        "450326": ["Yongfu County", "450300"],
        "450327": ["Guanyang", "450300"],
        "450328": ["Longsheng County", "450300"],
        "450329": ["Ziyuan County", "450300"],
        "450330": ["Pingle County", "450300"],
        "450331": ["Lipu County", "450300"],
        "450332": ["Gongcheng Yao Autonomous County", "450300"],
        "450333": ["Other area", "450300"],
        "450400": ["Wuzhou", "450000"],
        "450403": ["Wanxiu District", "450400"],
        "450404": ["Dieshan district", "450400"],
        "450405": ["Changzhou District", "450400"],
        "450421": ["Cangwu County", "450400"],
        "450422": ["Tengxian", "450400"],
        "450423": ["Mengshan", "450400"],
        "450481": ["Cenxi", "450400"],
        "450482": ["Other area", "450400"],
        "450500": ["Beihai", "450000"],
        "450502": ["Haicheng District", "450500"],
        "450503": ["Silversea area", "450500"],
        "450512": ["Tieshangang", "450500"],
        "450521": ["Hepu County", "450500"],
        "450522": ["Other area", "450500"],
        "450600": ["Fangchenggang City", "450000"],
        "450602": ["Port Area", "450600"],
        "450603": ["Anti- Town", "450600"],
        "450621": ["Shangsi", "450600"],
        "450681": ["Dongxing", "450600"],
        "450682": ["Other area", "450600"],
        "450700": ["Qinzhou", "450000"],
        "450702": ["Qinnan District", "450700"],
        "450703": ["Qinbei", "450700"],
        "450721": ["Lingshan", "450700"],
        "450722": ["Pubei County", "450700"],
        "450723": ["Other area", "450700"],
        "450800": ["Guigang", "450000"],
        "450802": ["North Port", "450800"],
        "450803": ["Hong Kong Southern District", "450800"],
        "450804": ["Qintang", "450800"],
        "450821": ["Pingnan", "450800"],
        "450881": ["Guiping", "450800"],
        "450882": ["Other area", "450800"],
        "450900": ["Yulin", "450000"],
        "450902": ["Yuzhou", "450900"],
        "450921": ["Rongxian", "450900"],
        "450922": ["Luchuan County", "450900"],
        "450923": ["Bobai County", "450900"],
        "450924": ["Xingyexian", "450900"],
        "450981": ["Beiliu", "450900"],
        "450982": ["Other area", "450900"],
        "451000": ["Baise City", "450000"],
        "451002": ["Youjiang District", "451000"],
        "451021": ["Tianyang", "451000"],
        "451022": ["Tiandong County", "451000"],
        "451023": ["Pingguo County", "451000"],
        "451024": ["Debao County", "451000"],
        "451025": ["Jingxi County", "451000"],
        "451026": ["Napo County", "451000"],
        "451027": ["Lingyun County", "451000"],
        "451028": ["Leye County", "451000"],
        "451029": ["Tianlin County", "451000"],
        "451030": ["Xilin", "451000"],
        "451031": ["Longlin County", "451000"],
        "451032": ["Other area", "451000"],
        "451100": ["Hezhou", "450000"],
        "451102": ["Babu District", "451100"],
        "451121": ["Zhaoping County", "451100"],
        "451122": ["Zhongshan County", "451100"],
        "451123": ["Bucheon Yao Autonomous County", "451100"],
        "451124": ["Other area", "451100"],
        "451200": ["Hechi", "450000"],
        "451202": ["Jinchengjiang", "451200"],
        "451221": ["Nandan County", "451200"],
        "451222": ["Tian'e County", "451200"],
        "451223": ["Fengshan", "451200"],
        "451224": ["Donglan", "451200"],
        "451225": ["Luocheng County", "451200"],
        "451226": ["Huanjiang County", "451200"],
        "451227": ["Bama Yao Autonomous County", "451200"],
        "451228": ["Duan county", "451200"],
        "451229": ["Dahua Yao Autonomous County", "451200"],
        "451281": ["Yizhou", "451200"],
        "451282": ["Other area", "451200"],
        "451300": ["Laibin", "450000"],
        "451302": ["Xingbin", "451300"],
        "451321": ["Xincheng County", "451300"],
        "451322": ["Xiangzhou", "451300"],
        "451323": ["Wuxuan County", "451300"],
        "451324": ["Jinxiu Yao Autonomous County", "451300"],
        "451381": ["Heshan City", "451300"],
        "451382": ["Other area", "451300"],
        "451400": ["Chongzuo", "450000"],
        "451402": ["Jiangzhou", "451400"],
        "451421": ["Fusui", "451400"],
        "451422": ["Ningming", "451400"],
        "451423": ["Longzhou", "451400"],
        "451424": ["Daxin County", "451400"],
        "451425": ["Tiandeng", "451400"],
        "451481": ["Pingxiang City", "451400"],
        "451482": ["Other area", "451400"],
        "460000": ["Hainan", "1"],
        "460100": ["Haikou", "460000"],
        "460105": ["Xiuying District", "460100"],
        "460106": ["Longhua District", "460100"],
        "460107": ["Qiongshan District", "460100"],
        "460108": ["Meilan District", "460100"],
        "460109": ["Other area", "460100"],
        "460200": ["Sanya City", "460000"],
        "469001": ["Wuzhishan", "460000"],
        "469002": ["Qionghai", "460000"],
        "469003": ["Danzhou", "460000"],
        "469005": ["Wenchang City", "460000"],
        "469006": ["Wanning City", "460000"],
        "469007": ["Dongfang City", "460000"],
        "469025": ["Ding'an", "460000"],
        "469026": ["Tunchang County", "460000"],
        "469027": ["Chengmai County", "460000"],
        "469028": ["Lingao County", "460000"],
        "469030": ["Baisha Li Autonomous County", "460000"],
        "469031": ["Changjiang Li Autonomous County", "460000"],
        "469033": ["Ledong Li Autonomous County", "460000"],
        "469034": ["Lingshui County", "460000"],
        "469035": ["Baoting Li and Miao Autonomous County", "460000"],
        "469036": ["Qiongzhong Li and Miao Autonomous County", "460000"],
        "469037": ["Paracel Islands", "460000"],
        "469038": ["Spratly Islands", "460000"],
        "469039": ["Zhongsha Islands", "460000"],
        "471004": ["High-tech Zone", "410300"],
        "471005": ["Other area", "410300"],
        "500000": ["Chongqing", "1"],
        "500100": ["Chongqing", "500000"],
        "500101": ["Wanzhou District", "500100"],
        "500102": ["Fuling District", "500100"],
        "500103": ["Yuzhong", "500100"],
        "500104": ["Dadukou", "500100"],
        "500105": ["Jiangbei District", "500100"],
        "500106": ["Shapingba District", "500100"],
        "500107": ["Jiulongpo", "500100"],
        "500108": ["South Bank area", "500100"],
        "500109": ["Beibei District", "500100"],
        "500110": ["Wansheng District", "500100"],
        "500111": ["Shuangqiao District", "500100"],
        "500112": ["Yubei", "500100"],
        "500113": ["Banan District", "500100"],
        "500114": ["Qianjiang District", "500100"],
        "500115": ["Changshou District", "500100"],
        "500222": ["Qijiang County", "500100"],
        "500223": ["Tongnan", "500100"],
        "500224": ["Tongliang", "500100"],
        "500225": ["Dazu County", "500100"],
        "500226": ["Rongchang", "500100"],
        "500227": ["Bishan County", "500100"],
        "500228": ["Liangping County", "500100"],
        "500229": ["Chengkou", "500100"],
        "500230": ["Fengdu County", "500100"],
        "500231": ["Dianjiang County", "500100"],
        "500232": ["Wulong County", "500100"],
        "500233": ["Zhongxian", "500100"],
        "500234": ["Kaixian", "500100"],
        "500235": ["Yunyang County", "500100"],
        "500236": ["Fengjie County", "500100"],
        "500237": ["Wushan County", "500100"],
        "500238": ["Wuxi County", "500100"],
        "500240": ["Shizhu Tujia Autonomous County", "500100"],
        "500241": ["Xiushan County", "500100"],
        "500242": ["Youyang Tujia and Miao Autonomous County", "500100"],
        "500243": ["Pengshui Miao and Tujia Autonomous County", "500100"],
        "500381": ["Jiangjin", "500100"],
        "500382": ["Hechuan", "500100"],
        "500383": ["Yongchuan District", "500100"],
        "500384": ["Nanchuan District", "500100"],
        "500385": ["Other area", "500100"],
        "510000": ["Sichuan", "1"],
        "510100": ["Chengdu", "510000"],
        "510104": ["Jinjiang", "510100"],
        "510105": ["Qingyang District", "510100"],
        "510106": ["Jinniu", "510100"],
        "510107": ["Wuhou", "510100"],
        "510108": ["Chenghua", "510100"],
        "510112": ["Longquanyi District", "510100"],
        "510113": ["Qingbaijiang", "510100"],
        "510114": ["Xindu District", "510100"],
        "510115": ["Wenjiang", "510100"],
        "510121": ["Jintang County", "510100"],
        "510122": ["Shuangliu County", "510100"],
        "510124": ["Pi", "510100"],
        "510129": ["Dayi County", "510100"],
        "510131": ["Pujiang County", "510100"],
        "510132": ["Xinjin County", "510100"],
        "510181": ["Dujiangyan City", "510100"],
        "510182": ["Pengzhou", "510100"],
        "510183": ["Qionglai", "510100"],
        "510184": ["Chong City", "510100"],
        "510185": ["Other area", "510100"],
        "510300": ["Zigong", "510000"],
        "510302": ["Artesian area", "510300"],
        "510303": ["Gongjing", "510300"],
        "510304": ["Da-an District", "510300"],
        "510311": ["Along the beach area", "510300"],
        "510321": ["Rongxian", "510300"],
        "510322": ["Fushun County", "510300"],
        "510323": ["Other area", "510300"],
        "510400": ["Panzhihua City", "510000"],
        "510402": ["Eastern", "510400"],
        "510403": ["West", "510400"],
        "510411": ["Renhe District", "510400"],
        "510421": ["Miyi", "510400"],
        "510422": ["Yanbian", "510400"],
        "510423": ["Other area", "510400"],
        "510500": ["Luzhou", "510000"],
        "510502": ["Jiangyang", "510500"],
        "510503": ["Naxi District", "510500"],
        "510504": ["Longmatan", "510500"],
        "510521": ["Luding County", "510500"],
        "510522": ["Jiangxian", "510500"],
        "510524": ["Xuyong County", "510500"],
        "510525": ["Gulin", "510500"],
        "510526": ["Other area", "510500"],
        "510600": ["Deyang", "510000"],
        "510603": ["Jingyang", "510600"],
        "510623": ["River County", "510600"],
        "510626": ["Luojiang", "510600"],
        "510681": ["Guanghan", "510600"],
        "510682": ["Shifang City", "510600"],
        "510683": ["Mianzhu", "510600"],
        "510684": ["Other area", "510600"],
        "510700": ["Mianyang City", "510000"],
        "510703": ["Fucheng District", "510700"],
        "510704": ["Youxian", "510700"],
        "510722": ["Santai County", "510700"],
        "510723": ["Yanting County", "510700"],
        "510724": ["County", "510700"],
        "510725": ["Zitong County", "510700"],
        "510726": ["Beichuan Qiang Autonomous County", "510700"],
        "510727": ["Pingwu", "510700"],
        "510751": ["High-tech Zone", "510700"],
        "510781": ["Jiangyou", "510700"],
        "510782": ["Other area", "510700"],
        "510800": ["Guangyuan", "510000"],
        "510802": ["Lee State District", "510800"],
        "510811": ["Guangyuan", "510800"],
        "510812": ["Overturned District", "510800"],
        "510821": ["Wangcang", "510800"],
        "510822": ["Qingchuan", "510800"],
        "510823": ["Jiange", "510800"],
        "510824": ["Cangxi", "510800"],
        "510825": ["Other area", "510800"],
        "510900": ["Suining", "510000"],
        "510903": ["Boats mountain", "510900"],
        "510904": ["Anju District", "510900"],
        "510921": ["Pengxi", "510900"],
        "510922": ["Shehong County", "510900"],
        "510923": ["Daying County", "510900"],
        "510924": ["Other area", "510900"],
        "511000": ["Neijiang", "510000"],
        "511002": ["Central City", "511000"],
        "511011": ["Dongxing District", "511000"],
        "511024": ["Weiyuan County", "511000"],
        "511025": ["Zizhong County", "511000"],
        "511028": ["Longchang County", "511000"],
        "511029": ["Other area", "511000"],
        "511100": ["Leshan", "510000"],
        "511102": ["Central City", "511100"],
        "511111": ["Bay Area", "511100"],
        "511112": ["Wutongqiao", "511100"],
        "511113": ["Jinkouhequ", "511100"],
        "511123": ["Qianwei County", "511100"],
        "511124": ["Jingyan", "511100"],
        "511126": ["Jiajiang", "511100"],
        "511129": ["Muchuan", "511100"],
        "511132": ["Ebian County", "511100"],
        "511133": ["Mabian County", "511100"],
        "511181": ["Emeishan", "511100"],
        "511182": ["Other area", "511100"],
        "511300": ["Nanchong", "510000"],
        "511302": ["ShunQingOu", "511300"],
        "511303": ["Gaoping District", "511300"],
        "511304": ["Jialing", "511300"],
        "511321": ["Nanbu County", "511300"],
        "511322": ["Yingshan", "511300"],
        "511323": ["Pengan", "511300"],
        "511324": ["Alleviation", "511300"],
        "511325": ["West County", "511300"],
        "511381": ["Langzhong", "511300"],
        "511382": ["Other area", "511300"],
        "511400": ["Meishan City", "510000"],
        "511402": ["Dongpo", "511400"],
        "511421": ["Renshou County", "511400"],
        "511422": ["Pengshan County", "511400"],
        "511423": ["Hongya County", "511400"],
        "511424": ["Danleng", "511400"],
        "511425": ["Qingshen", "511400"],
        "511426": ["Other area", "511400"],
        "511500": ["Yibin City", "510000"],
        "511502": ["Cuiping", "511500"],
        "511521": ["Yibin County", "511500"],
        "511522": ["Nanxi County", "511500"],
        "511523": ["Jiangan", "511500"],
        "511524": ["Changning County", "511500"],
        "511525": ["County", "511500"],
        "511526": ["Gong County", "511500"],
        "511527": ["Junlian", "511500"],
        "511528": ["Xingwen County", "511500"],
        "511529": ["Pingshan County", "511500"],
        "511530": ["Other area", "511500"],
        "511600": ["Guang'an", "510000"],
        "511602": ["Guang'an District", "511600"],
        "511621": ["Yuechi", "511600"],
        "511622": ["Wusheng County", "511600"],
        "511623": ["Linshui", "511600"],
        "511681": ["Huaying", "511600"],
        "511682": ["City area", "511600"],
        "511683": ["Other area", "511600"],
        "511700": ["Dazhou", "510000"],
        "511702": ["Tongchuan District", "511700"],
        "511721": ["Daxian", "511700"],
        "511722": ["Xuanhan", "511700"],
        "511723": ["Kaijiang County", "511700"],
        "511724": ["Dazhu County", "511700"],
        "511725": ["QuXian", "511700"],
        "511781": ["Wanyuan", "511700"],
        "511782": ["Other area", "511700"],
        "511800": ["Ya'an", "510000"],
        "511802": ["Yucheng District", "511800"],
        "511821": ["Mingshan", "511800"],
        "511822": ["Yingjing", "511800"],
        "511823": ["Hanyuan", "511800"],
        "511824": ["Shimian", "511800"],
        "511825": ["Tianquan County", "511800"],
        "511826": ["Lushan County", "511800"],
        "511827": ["Baoxing", "511800"],
        "511828": ["Other area", "511800"],
        "511900": ["Bazhong", "510000"],
        "511902": ["Bazhou", "511900"],
        "511921": ["Tongjiang County", "511900"],
        "511922": ["Nanjiang", "511900"],
        "511923": ["Pingchang", "511900"],
        "511924": ["Other area", "511900"],
        "512000": ["Ziyang", "510000"],
        "512002": ["Yanjiang", "512000"],
        "512021": ["Anyue County", "512000"],
        "512022": ["Lezhi", "512000"],
        "512081": ["Jianyang", "512000"],
        "512082": ["Other area", "512000"],
        "513200": ["Aba Tibetan and Qiang Autonomous Prefecture", "510000"],
        "513221": ["Wenchuan County", "513200"],
        "513222": ["Li County", "513200"],
        "513223": ["Maoxian", "513200"],
        "513224": ["Songpan County", "513200"],
        "513225": ["Jiuzhaigou County", "513200"],
        "513226": ["Jinchuan", "513200"],
        "513227": ["Xiaojin County", "513200"],
        "513228": ["Blackwater County", "513200"],
        "513229": ["Barkam County", "513200"],
        "513230": ["Zamtang County", "513200"],
        "513231": ["Aba County", "513200"],
        "513232": ["Zoige County", "513200"],
        "513233": ["Hongyuan County", "513200"],
        "513234": ["Other area", "513200"],
        "513300": ["Ganzi Tibetan Autonomous Prefecture", "510000"],
        "513321": ["Kangding County", "513300"],
        "513322": ["Luding County", "513300"],
        "513323": ["Danba County", "513300"],
        "513324": ["Jiulong County", "513300"],
        "513325": ["Yajiang county", "513300"],
        "513326": ["Tawu", "513300"],
        "513327": ["Luhuo County", "513300"],
        "513328": ["Ganzi County", "513300"],
        "513329": ["Xinlong County", "513300"],
        "513330": ["Dege County", "513300"],
        "513331": ["Baiyu County", "513300"],
        "513332": ["Shiqu County", "513300"],
        "513333": ["Seda", "513300"],
        "513334": ["Litang County", "513300"],
        "513335": ["Batang County", "513300"],
        "513336": ["Rural County", "513300"],
        "513337": ["DAOCHENG", "513300"],
        "513338": ["Derong", "513300"],
        "513339": ["Other area", "513300"],
        "513400": ["Liangshan Yi Autonomous Prefecture", "510000"],
        "513401": ["Xichang", "513400"],
        "513422": ["Muli Tibetan Autonomous County", "513400"],
        "513423": ["Yanyuan County", "513400"],
        "513424": ["Dechang", "513400"],
        "513425": ["Huili County", "513400"],
        "513426": ["Huidong County", "513400"],
        "513427": ["Ningnan", "513400"],
        "513428": ["Pugh County", "513400"],
        "513429": ["Butuo County", "513400"],
        "513430": ["Jinyang County", "513400"],
        "513431": ["Zhaojue County", "513400"],
        "513432": ["Xide County", "513400"],
        "513433": ["Mianning", "513400"],
        "513434": ["Yuexi County", "513400"],
        "513435": ["Ganluo", "513400"],
        "513436": ["Meigu", "513400"],
        "513437": ["Leibo County", "513400"],
        "513438": ["Other area", "513400"],
        "520000": ["Guizhou Province", "1"],
        "520100": ["Guiyang", "520000"],
        "520102": ["Nanming", "520100"],
        "520103": ["Yunyan District", "520100"],
        "520111": ["Huaxi District", "520100"],
        "520112": ["Wudang District", "520100"],
        "520113": ["Baiyun District", "520100"],
        "520114": ["Creek District", "520100"],
        "520121": ["Kaiyang", "520100"],
        "520122": ["Xifeng County", "520100"],
        "520123": ["Xiuwen County", "520100"],
        "520151": ["Jinyang Zone", "520100"],
        "520181": ["Qingzhen City", "520100"],
        "520182": ["Other area", "520100"],
        "520200": ["Liupanshui", "520000"],
        "520201": ["Zhongshan District", "520200"],
        "520203": ["Liuzhi", "520200"],
        "520221": ["Shuicheng County", "520200"],
        "520222": ["Panxian", "520200"],
        "520223": ["Other area", "520200"],
        "520300": ["Zunyi City", "520000"],
        "520302": ["Honghuagang", "520300"],
        "520303": ["Kymmene District", "520300"],
        "520321": ["Zunyi County", "520300"],
        "520322": ["Tongzi County", "520300"],
        "520323": ["Suiyang County", "520300"],
        "520324": ["Positive County", "520300"],
        "520325": ["True and Miao Autonomous County Road", "520300"],
        "520326": ["Wuchuan Gelao and Miao Autonomous County", "520300"],
        "520327": ["Fenggang County", "520300"],
        "520328": ["Meitan county", "520300"],
        "520329": ["Yuqing", "520300"],
        "520330": ["Xishui", "520300"],
        "520381": ["Chishui", "520300"],
        "520382": ["Renhuai", "520300"],
        "520383": ["Other area", "520300"],
        "520400": ["Anshun City", "520000"],
        "520402": ["Xixiu", "520400"],
        "520421": ["Pingba County", "520400"],
        "520422": ["Puding County", "520400"],
        "520423": ["Zhenning Buyi and Miao Autonomous County", "520400"],
        "520424": ["Guanling Buyi and Miao Autonomous County", "520400"],
        "520425": ["Buyi and Miao Autonomous County Ziyun", "520400"],
        "520426": ["Other area", "520400"],
        "522200": ["Tongren Prefecture", "520000"],
        "522201": ["Tongren City", "522200"],
        "522222": ["Eguchi County", "522200"],
        "522223": ["Yuping Dong Autonomous County", "522200"],
        "522224": ["Shiqian", "522200"],
        "522225": ["Sinan County", "522200"],
        "522226": ["Indian River Tujia and Miao Autonomous County", "522200"],
        "522227": ["Dejiang County", "522200"],
        "522228": ["Yanhe Tujia Autonomous County", "522200"],
        "522229": ["Songtao Miao Autonomous County", "522200"],
        "522230": ["Wanshan SAR", "522200"],
        "522231": ["Other area", "522200"],
        "522300": ["Southwest Guizhou", "520000"],
        "522301": ["Xingyi", "522300"],
        "522322": ["Xingren", "522300"],
        "522323": ["Puan", "522300"],
        "522324": ["Qinglong County", "522300"],
        "522325": ["Zhenfeng", "522300"],
        "522326": ["Wangmo County", "522300"],
        "522327": ["Ceheng County", "522300"],
        "522328": ["Anlong County", "522300"],
        "522329": ["Other area", "522300"],
        "522400": ["Bijie Region", "520000"],
        "522401": ["Bijie City", "522400"],
        "522422": ["Dafang County", "522400"],
        "522423": ["Qianxi County", "522400"],
        "522424": ["Jinsha County", "522400"],
        "522425": ["Zhijin County", "522400"],
        "522426": ["Nayong County", "522400"],
        "522427": ["Weining Yi Hui and Miao Autonomous County", "522400"],
        "522428": ["Hezhang County", "522400"],
        "522429": ["Other area", "522400"],
        "522600": ["Southeast Guizhou", "520000"],
        "522601": ["Kaili", "522600"],
        "522622": ["Huang County", "522600"],
        "522623": ["Shibing County", "522600"],
        "522624": ["Sansui County", "522600"],
        "522625": ["Zhenyuan County", "522600"],
        "522626": ["Cengong", "522600"],
        "522627": ["Tianzhu County", "522600"],
        "522628": ["Jinping County", "522600"],
        "522629": ["Jianhe County", "522600"],
        "522630": ["Taijiang County", "522600"],
        "522631": ["Liping county", "522600"],
        "522632": ["Rongjiang County", "522600"],
        "522633": ["Congjiang County", "522600"],
        "522634": ["Leishan", "522600"],
        "522635": ["Majiang", "522600"],
        "522636": ["Danzhai County", "522600"],
        "522637": ["Other area", "522600"],
        "522700": ["Qiannan", "520000"],
        "522701": ["Duyun", "522700"],
        "522702": ["Fuquan", "522700"],
        "522722": ["Libo County", "522700"],
        "522723": ["Guiding County", "522700"],
        "522725": ["Weng'an County", "522700"],
        "522726": ["Dushan County", "522700"],
        "522727": ["Pingtang County", "522700"],
        "522728": ["Luodian County", "522700"],
        "522729": ["Changshun County", "522700"],
        "522730": ["Long County", "522700"],
        "522731": ["Huishui County", "522700"],
        "522732": ["Sandu Shui Autonomous County", "522700"],
        "522733": ["Other area", "522700"],
        "530000": ["Yunnan Province", "1"],
        "530100": ["Kunming", "530000"],
        "530102": ["Wuhua", "530100"],
        "530103": ["Panlong", "530100"],
        "530111": ["Guandu District", "530100"],
        "530112": ["Xishan District", "530100"],
        "530113": ["Dongchuan District", "530100"],
        "530121": ["Chenggong County", "530100"],
        "530122": ["Jinning County", "530100"],
        "530124": ["Fumin", "530100"],
        "530125": ["Yiliang County", "530100"],
        "530126": ["Shilin County", "530100"],
        "530127": ["Songming County", "530100"],
        "530128": ["Luquan Yi and Miao Autonomous County", "530100"],
        "530129": ["Xundian Hui and Yi Autonomous County", "530100"],
        "530181": ["Anning City", "530100"],
        "530182": ["Other area", "530100"],
        "530300": ["Qujing", "530000"],
        "530302": ["Qilin District", "530300"],
        "530321": ["Malone County", "530300"],
        "530322": ["Luliang County", "530300"],
        "530323": ["Shizong County", "530300"],
        "530324": ["Luoping County", "530300"],
        "530325": ["Fuyuan County", "530300"],
        "530326": ["Huize", "530300"],
        "530328": ["Zhanyi County", "530300"],
        "530381": ["Xuanwei", "530300"],
        "530382": ["Other area", "530300"],
        "530400": ["Yuxi", "530000"],
        "530402": ["Hongta District", "530400"],
        "530421": ["Jiangchuan County", "530400"],
        "530422": ["Chengjiang County", "530400"],
        "530423": ["Tonghai", "530400"],
        "530424": ["Hua County", "530400"],
        "530425": ["Yimen", "530400"],
        "530426": ["Eshan Yi Autonomous County", "530400"],
        "530427": ["Xinping Yi and Dai Autonomous County", "530400"],
        "530428": ["Yuanjiang Hani, Yi and Dai Autonomous County", "530400"],
        "530429": ["Other area", "530400"],
        "530500": ["Baoshan City", "530000"],
        "530502": ["Longyang District", "530500"],
        "530521": ["Shidian County", "530500"],
        "530522": ["Tengchong County", "530500"],
        "530523": ["Longling", "530500"],
        "530524": ["Changning County", "530500"],
        "530525": ["Other area", "530500"],
        "530600": ["Zhaotong", "530000"],
        "530602": ["Zhaoyang District", "530600"],
        "530621": ["Ludian County", "530600"],
        "530622": ["Qiaojia County", "530600"],
        "530623": ["Yanjin County", "530600"],
        "530624": ["Daguan County", "530600"],
        "530625": ["Yongshan County", "530600"],
        "530626": ["Suijiang County", "530600"],
        "530627": ["Zhenxiong", "530600"],
        "530628": ["Yiliang County", "530600"],
        "530629": ["Wilson County", "530600"],
        "530630": ["Shuifu", "530600"],
        "530631": ["Other area", "530600"],
        "530700": ["Lijiang City", "530000"],
        "530702": ["Old Town", "530700"],
        "530721": ["Yulong Naxi Autonomous County", "530700"],
        "530722": ["Yongsheng County", "530700"],
        "530723": ["Huaping County", "530700"],
        "530724": ["Ninglang Yi Autonomous County", "530700"],
        "530725": ["Other area", "530700"],
        "530800": ["Pu'er", "530000"],
        "530802": ["Simao District", "530800"],
        "530821": ["Ning'er Hani and Yi Autonomous County", "530800"],
        "530822": ["Mojiang Hani Autonomous County", "530800"],
        "530823": ["Jingdong Yi Autonomous County", "530800"],
        "530824": ["Jinggu Dai and Yi Autonomous County", "530800"],
        "530825": ["Lahu Autonomous County", "530800"],
        "530826": ["Jiangcheng County", "530800"],
        "530827": ["Menglian County", "530800"],
        "530828": ["Lancang Lahu Autonomous County", "530800"],
        "530829": ["Ximeng Va Autonomous County", "530800"],
        "530830": ["Other area", "530800"],
        "530900": ["Lincang", "530000"],
        "530902": ["Linxiang District", "530900"],
        "530921": ["Fengqing", "530900"],
        "530922": ["Yun County", "530900"],
        "530923": ["Yongde County", "530900"],
        "530924": ["Zhenkang", "530900"],
        "530925": ["Double Blang and Dai Autonomous County", "530900"],
        "530926": ["Gengma Dai and Va Autonomous County", "530900"],
        "530927": ["Wa Autonomous County", "530900"],
        "530928": ["Other area", "530900"],
        "532300": ["Chuxiong Yi Autonomous Prefecture", "530000"],
        "532301": ["Chuxiong City", "532300"],
        "532322": ["Shuangbai", "532300"],
        "532323": ["Mouding County", "532300"],
        "532324": ["South County", "532300"],
        "532325": ["Yao County", "532300"],
        "532326": ["Dayao", "532300"],
        "532327": ["Yongren", "532300"],
        "532328": ["Yuanmou County", "532300"],
        "532329": ["Wuding County", "532300"],
        "532331": ["Lufeng", "532300"],
        "532332": ["Other area", "532300"],
        "532500": ["Honghe Hani and Yi Autonomous Prefecture", "530000"],
        "532501": ["Gejiu", "532500"],
        "532502": ["Kaiyuan", "532500"],
        "532522": ["Mengzi County", "532500"],
        "532523": ["Pingbian Miao Autonomous County", "532500"],
        "532524": ["Jianshui County", "532500"],
        "532525": ["Shiping County", "532500"],
        "532526": ["Mile", "532500"],
        "532527": ["Luxi County", "532500"],
        "532528": ["Yuanyang County", "532500"],
        "532529": ["Honghe County", "532500"],
        "532530": ["Jinping Miao, Yao, and Dai Autonomous County", "532500"],
        "532531": ["Lüchun County", "532500"],
        "532532": ["Hekou Yao Autonomous County", "532500"],
        "532533": ["Other area", "532500"],
        "532600": ["Wenshan Zhuang and Miao Autonomous Prefecture", "530000"],
        "532621": ["Wenshan County", "532600"],
        "532622": ["Yanshan County", "532600"],
        "532623": ["Xichou", "532600"],
        "532624": ["Malipo County", "532600"],
        "532625": ["Maguan County", "532600"],
        "532626": ["Qiubei County", "532600"],
        "532627": ["Guangnan", "532600"],
        "532628": ["Funing County", "532600"],
        "532629": ["Other area", "532600"],
        "532800": ["Xishuangbanna Dai Autonomous Prefecture", "530000"],
        "532801": ["Jinghong", "532800"],
        "532822": ["Menghai", "532800"],
        "532823": ["Mengla", "532800"],
        "532824": ["Other area", "532800"],
        "532900": ["Dali Bai Autonomous Prefecture", "530000"],
        "532901": ["Dali City", "532900"],
        "532922": ["Yangbi Yi Autonomous County", "532900"],
        "532923": ["Xiangyun", "532900"],
        "532924": ["Binchuan County", "532900"],
        "532925": ["Midu County", "532900"],
        "532926": ["Nanjian Yi Autonomous County", "532900"],
        "532927": ["Weishan Yi and Hui Autonomous County", "532900"],
        "532928": ["Yongping County", "532900"],
        "532929": ["Yunlong County", "532900"],
        "532930": ["Eryuan County", "532900"],
        "532931": ["Jianchuan County", "532900"],
        "532932": ["Heqing County", "532900"],
        "532933": ["Other area", "532900"],
        "533100": ["Dehong Dai and Jingpo Autonomous Prefecture", "530000"],
        "533102": ["Ruili City", "533100"],
        "533103": ["Luxi City", "533100"],
        "533122": ["Lianghe", "533100"],
        "533123": ["Yingjiang County", "533100"],
        "533124": ["Longchuan County", "533100"],
        "533125": ["Other area", "533100"],
        "533300": ["Nujiang Lisu Autonomous Prefecture", "530000"],
        "533321": ["Lushui", "533300"],
        "533323": ["Fugong", "533300"],
        "533324": ["Gongshan Dulong and Nu Autonomous County", "533300"],
        "533325": ["Lanping Bai Pumi Autonomous County", "533300"],
        "533326": ["Other area", "533300"],
        "533400": ["Diqing Tibetan Autonomous Prefecture", "530000"],
        "533421": ["Shangri-La County", "533400"],
        "533422": ["Deqin County", "533400"],
        "533423": ["Weixi Lisu Autonomous County", "533400"],
        "533424": ["Other area", "533400"],
        "540000": ["Tibet Autonomous Region", "1"],
        "540100": ["Lhasa", "540000"],
        "540102": ["Chengguan District", "540100"],
        "540121": ["Linzhou County", "540100"],
        "540122": ["Damxung County", "540100"],
        "540123": ["Nyêmo County", "540100"],
        "540124": ["Qushui", "540100"],
        "540125": ["Doilungdêqên County", "540100"],
        "540126": ["Dazi", "540100"],
        "540127": ["Maizhokunggar county", "540100"],
        "540128": ["Other area", "540100"],
        "542100": ["Qamdo", "540000"],
        "542121": ["Qamdo County", "542100"],
        "542122": ["Jiang Daxian", "542100"],
        "542123": ["Gongjue County", "542100"],
        "542124": ["Riwoqê County", "542100"],
        "542125": ["Dengqen", "542100"],
        "542126": ["Caya County", "542100"],
        "542127": ["Basu County", "542100"],
        "542128": ["Zogang County", "542100"],
        "542129": ["Mangkang", "542100"],
        "542132": ["Lhorong County", "542100"],
        "542133": ["Banbar County", "542100"],
        "542134": ["Other area", "542100"],
        "542200": ["Shannan Prefecture", "540000"],
        "542221": ["Nedong County", "542200"],
        "542222": ["Zhanang County", "542200"],
        "542223": ["Gonggar County", "542200"],
        "542224": ["Sangri County", "542200"],
        "542225": ["Qonggyai county", "542200"],
        "542226": ["Qusum County", "542200"],
        "542227": ["Comai County", "542200"],
        "542228": ["Luozha County", "542200"],
        "542229": ["Gyaca county", "542200"],
        "542231": ["Takako County", "542200"],
        "542232": ["Cona County", "542200"],
        "542233": ["Langkazi County", "542200"],
        "542234": ["Other area", "542200"],
        "542300": ["Xigaze", "540000"],
        "542301": ["Xigaze", "542300"],
        "542322": ["Namling County", "542300"],
        "542323": ["Gyangze County", "542300"],
        "542324": ["Tingri County", "542300"],
        "542325": ["Sakya County", "542300"],
        "542326": ["Lazi County", "542300"],
        "542327": ["Ngamring county", "542300"],
        "542328": ["Xaitongmoin county", "542300"],
        "542329": ["Panam County", "542300"],
        "542330": ["Rinbung county", "542300"],
        "542331": ["Kangmar County", "542300"],
        "542332": ["Dingjie County", "542300"],
        "542333": ["Zhongba County", "542300"],
        "542334": ["Yadong County", "542300"],
        "542335": ["Kuala County", "542300"],
        "542336": ["Nyalam County", "542300"],
        "542337": ["Saga County", "542300"],
        "542338": ["Gamba County", "542300"],
        "542339": ["Other area", "542300"],
        "542400": ["Nagqu", "540000"],
        "542421": ["Nagqu County", "542400"],
        "542422": ["Jiali County", "542400"],
        "542423": ["Biru County", "542400"],
        "542424": ["Nie Rongxian", "542400"],
        "542425": ["Amdo County", "542400"],
        "542426": ["Xainza", "542400"],
        "542427": ["Sog County", "542400"],
        "542428": ["Bangor County", "542400"],
        "542429": ["Baqên County", "542400"],
        "542430": ["Nyima County", "542400"],
        "542431": ["Other area", "542400"],
        "542500": ["Ali area", "540000"],
        "542521": ["Burang County", "542500"],
        "542522": ["Zanda County", "542500"],
        "542523": ["Gar County", "542500"],
        "542524": ["Ritu County", "542500"],
        "542525": ["Ge Ji", "542500"],
        "542526": ["Gêrzê County", "542500"],
        "542527": ["Coqên County", "542500"],
        "542528": ["Other area", "542500"],
        "542600": ["Nyingchi", "540000"],
        "542621": ["Nyingchi County", "542600"],
        "542622": ["Gongbo'gyamda", "542600"],
        "542623": ["Mainling", "542600"],
        "542624": ["Medog County", "542600"],
        "542625": ["Bomi County", "542600"],
        "542626": ["Chayu County", "542600"],
        "542627": ["Long County", "542600"],
        "542628": ["Other area", "542600"],
        "610000": ["Shaanxi Province", "1"],
        "610100": ["Xi'an", "610000"],
        "610102": ["New Town", "610100"],
        "610103": ["Beilin", "610100"],
        "610104": ["Lianhu District", "610100"],
        "610111": ["Baqiao", "610100"],
        "610112": ["Weiyang", "610100"],
        "610113": ["Yanta District", "610100"],
        "610114": ["Yanliang District", "610100"],
        "610115": ["Lintong District", "610100"],
        "610116": ["Chang'an District", "610100"],
        "610122": ["Lantian County", "610100"],
        "610124": ["Zhouzhi County", "610100"],
        "610125": ["Huxian", "610100"],
        "610126": ["Gaoling", "610100"],
        "610127": ["Other area", "610100"],
        "610200": ["Tongchuan", "610000"],
        "610202": ["Wang Yi District", "610200"],
        "610203": ["Yintai District", "610200"],
        "610204": ["Yao state area", "610200"],
        "610222": ["Yijun County", "610200"],
        "610223": ["Other area", "610200"],
        "610300": ["Baoji", "610000"],
        "610302": ["Weibin District", "610300"],
        "610303": ["Jintai", "610300"],
        "610304": ["Chencang", "610300"],
        "610322": ["Fengxiang County", "610300"],
        "610323": ["Qishan County", "610300"],
        "610324": ["Fufeng County", "610300"],
        "610326": ["Mei County", "610300"],
        "610327": ["Longxian", "610300"],
        "610328": ["Qianyang", "610300"],
        "610329": ["Linyou County", "610300"],
        "610330": ["Fengxian County", "610300"],
        "610331": ["Taibai", "610300"],
        "610332": ["Other area", "610300"],
        "610400": ["Xianyang City", "610000"],
        "610402": ["Qindu area", "610400"],
        "610403": ["Yangling District", "610400"],
        "610404": ["Weicheng", "610400"],
        "610422": ["Sanyuan County", "610400"],
        "610423": ["Jingyang", "610400"],
        "610424": ["Inui县", "610400"],
        "610425": ["Liquan", "610400"],
        "610426": ["Yongshou", "610400"],
        "610427": ["Binxian", "610400"],
        "610428": ["Changwu", "610400"],
        "610429": ["Heritage Site", "610400"],
        "610430": ["Chunhua County", "610400"],
        "610431": ["Wugong County", "610400"],
        "610481": ["Xingping City", "610400"],
        "610482": ["Other area", "610400"],
        "610500": ["Weinan", "610000"],
        "610502": ["Linwei", "610500"],
        "610521": ["Huaxian", "610500"],
        "610522": ["Tongguan County", "610500"],
        "610523": ["Dali County", "610500"],
        "610524": ["Heyang", "610500"],
        "610525": ["Chengcheng County", "610500"],
        "610526": ["Pucheng County", "610500"],
        "610527": ["Baishui", "610500"],
        "610528": ["Rich County", "610500"],
        "610581": ["Hancheng", "610500"],
        "610582": ["Huayin City", "610500"],
        "610583": ["Other area", "610500"],
        "610600": ["Yan'an City", "610000"],
        "610602": ["Baota", "610600"],
        "610621": ["Extend the county", "610600"],
        "610622": ["Yanchuan County", "610600"],
        "610623": ["Sub Long County", "610600"],
        "610624": ["Ansai County", "610600"],
        "610625": ["Zhidan", "610600"],
        "610626": ["Wuqi County", "610600"],
        "610627": ["Oasis County", "610600"],
        "610628": ["Fuxian", "610600"],
        "610629": ["Luochuan County", "610600"],
        "610630": ["Yichuan County", "610600"],
        "610631": ["Huanglong", "610600"],
        "610632": ["Huangling County", "610600"],
        "610633": ["Other area", "610600"],
        "610700": ["Hanzhong City", "610000"],
        "610702": ["Hantai District", "610700"],
        "610721": ["Nanzheng County", "610700"],
        "610722": ["Chenggu County", "610700"],
        "610723": ["Yangxian", "610700"],
        "610724": ["Xixiang County", "610700"],
        "610725": ["Mianxian", "610700"],
        "610726": ["Ningqiang County", "610700"],
        "610727": ["Lueyang", "610700"],
        "610728": ["Zhenba County", "610700"],
        "610729": ["Liuba", "610700"],
        "610730": ["Foping County", "610700"],
        "610731": ["Other area", "610700"],
        "610800": ["Yulin City", "610000"],
        "610802": ["Yuyang", "610800"],
        "610821": ["Shenmu County", "610800"],
        "610822": ["Fugu County", "610800"],
        "610823": ["Hengshan", "610800"],
        "610824": ["Jingbian County", "610800"],
        "610825": ["Dingbian", "610800"],
        "610826": ["Suide County", "610800"],
        "610827": ["Mizhi County", "610800"],
        "610828": ["JIAXIAN", "610800"],
        "610829": ["Wubao County", "610800"],
        "610830": ["Qingjian County", "610800"],
        "610831": ["Zizhou", "610800"],
        "610832": ["Other area", "610800"],
        "610900": ["Ankang City", "610000"],
        "610902": ["Hanbin", "610900"],
        "610921": ["Hanyin", "610900"],
        "610922": ["Shiquan County", "610900"],
        "610923": ["Ningshan County", "610900"],
        "610924": ["Ziyang", "610900"],
        "610925": ["Langao County", "610900"],
        "610926": ["Pingli County", "610900"],
        "610927": ["Zhenping County", "610900"],
        "610928": ["Xunyang", "610900"],
        "610929": ["Baihe", "610900"],
        "610930": ["Other area", "610900"],
        "611000": ["Shangluo", "610000"],
        "611002": ["Shangzhou District", "611000"],
        "611021": ["Luonan County", "611000"],
        "611022": ["Danfeng County", "611000"],
        "611023": ["Shangnan County", "611000"],
        "611024": ["Hill County", "611000"],
        "611025": ["County town", "611000"],
        "611026": ["Zhashui", "611000"],
        "611027": ["Other area", "611000"],
        "620000": ["Gansu province", "1"],
        "620100": ["Lanzhou City", "620000"],
        "620102": ["Chengguan District", "620100"],
        "620103": ["Seven Mile Creek area", "620100"],
        "620104": ["West solid area", "620100"],
        "620105": ["Anning District", "620100"],
        "620111": ["Honggu District", "620100"],
        "620121": ["Yongdeng County", "620100"],
        "620122": ["Gaolan County", "620100"],
        "620123": ["Yuzhong County", "620100"],
        "620124": ["Other area", "620100"],
        "620200": ["Jiayuguan", "620000"],
        "620300": ["Jinchang", "620000"],
        "620302": ["Jinchuan District", "620300"],
        "620321": ["Yongchang County", "620300"],
        "620322": ["Other area", "620300"],
        "620400": ["Silver City", "620000"],
        "620402": ["Baiyin District", "620400"],
        "620403": ["Hirakawa District", "620400"],
        "620421": ["Jingyuan County", "620400"],
        "620422": ["Huining County", "620400"],
        "620423": ["Jingtai", "620400"],
        "620424": ["Other area", "620400"],
        "620500": ["Tianshui City", "620000"],
        "620502": ["Qinzhou District", "620500"],
        "620503": ["Maiji", "620500"],
        "620521": ["Shimizu County", "620500"],
        "620522": ["Qinan", "620500"],
        "620523": ["Gangu County", "620500"],
        "620524": ["Wushan County", "620500"],
        "620525": ["Zhangjiachuan Hui Autonomous County", "620500"],
        "620526": ["Other area", "620500"],
        "620600": ["Wuwei City", "620000"],
        "620602": ["Liangzhou District", "620600"],
        "620621": ["Minqin County", "620600"],
        "620622": ["Gulang County", "620600"],
        "620623": ["Tianzhu Tibetan Autonomous County", "620600"],
        "620624": ["Other area", "620600"],
        "620700": ["Zhangye City", "620000"],
        "620702": ["Ganzhou District", "620700"],
        "620721": ["Sunan", "620700"],
        "620722": ["Minle County", "620700"],
        "620723": ["Linze County", "620700"],
        "620724": ["Gaotai County", "620700"],
        "620725": ["Shandan County", "620700"],
        "620726": ["Other area", "620700"],
        "620800": ["Pingliang", "620000"],
        "620802": ["Kongtong", "620800"],
        "620821": ["Jingchuan", "620800"],
        "620822": ["Lingtai County", "620800"],
        "620823": ["Thrall County", "620800"],
        "620824": ["Huating County", "620800"],
        "620825": ["Zhuanglang County", "620800"],
        "620826": ["Jingning County", "620800"],
        "620827": ["Other area", "620800"],
        "620900": ["Jiuquan", "620000"],
        "620902": ["Suzhou District", "620900"],
        "620921": ["Jinta County", "620900"],
        "620922": ["Anxi County", "620900"],
        "620923": ["Subei Mongolian Autonomous County", "620900"],
        "620924": ["Aksay Kazak Autonomous County", "620900"],
        "620981": ["Yumen", "620900"],
        "620982": ["Dunhuang City", "620900"],
        "620983": ["Other area", "620900"],
        "621000": ["Qingyang City", "620000"],
        "621002": ["Xifeng", "621000"],
        "621021": ["Qingcheng", "621000"],
        "621022": ["Central County", "621000"],
        "621023": ["Huachi", "621000"],
        "621024": ["Heshui County", "621000"],
        "621025": ["Zhengning County", "621000"],
        "621026": ["County", "621000"],
        "621027": ["Zhenyuan County", "621000"],
        "621028": ["Other area", "621000"],
        "621100": ["Dingxi City", "620000"],
        "621102": ["Stability District", "621100"],
        "621121": ["Tongwei", "621100"],
        "621122": ["Longxi County", "621100"],
        "621123": ["Weiyuan County", "621100"],
        "621124": ["Lintao County", "621100"],
        "621125": ["Zhangxian", "621100"],
        "621126": ["Minxian", "621100"],
        "621127": ["Other area", "621100"],
        "621200": ["Longnan City", "620000"],
        "621202": ["Wudu District", "621200"],
        "621221": ["Cheng County", "621200"],
        "621222": ["Wen County", "621200"],
        "621223": ["Tanchang County", "621200"],
        "621224": ["Kangxian", "621200"],
        "621225": ["West County", "621200"],
        "621226": ["Lixian", "621200"],
        "621227": ["Huixian", "621200"],
        "621228": ["Liangdang County", "621200"],
        "621229": ["Other area", "621200"],
        "622900": ["Linxia Hui Autonomous Prefecture", "620000"],
        "622901": ["Linxia City", "622900"],
        "622921": ["Linxia County", "622900"],
        "622922": ["Kangle", "622900"],
        "622923": ["Yongjing County", "622900"],
        "622924": ["Guanghe County", "622900"],
        "622925": ["And political County", "622900"],
        "622926": ["Dongxiang County", "622900"],
        "622927": ["Jishishan Bonan, Dongxiang and Salar Autonomous County", "622900"],
        "622928": ["Other area", "622900"],
        "623000": ["Gannan Tibetan Autonomous Prefecture", "620000"],
        "623001": ["Hezuo", "623000"],
        "623021": ["Lintan", "623000"],
        "623022": ["Zhuoni County", "623000"],
        "623023": ["Zhouqu County", "623000"],
        "623024": ["Diebu", "623000"],
        "623025": ["Maqu County", "623000"],
        "623026": ["Luqu County", "623000"],
        "623027": ["Xiahe County", "623000"],
        "623028": ["Other area", "623000"],
        "630000": ["Qinghai", "1"],
        "630100": ["Xining", "630000"],
        "630102": ["Chengdong District", "630100"],
        "630103": ["City area", "630100"],
        "630104": ["West District", "630100"],
        "630105": ["Seongbuk", "630100"],
        "630121": ["Datong Hui and Tu Autonomous County", "630100"],
        "630122": ["Huangzhong County", "630100"],
        "630123": ["Huangyuan", "630100"],
        "630124": ["Other area", "630100"],
        "632100": ["Haidong Prefecture", "630000"],
        "632121": ["Ping'an County", "632100"],
        "632122": ["Minhe Hui and Tu Autonomous County", "632100"],
        "632123": ["Ledu County", "632100"],
        "632126": ["Huzhu Tu Autonomous County", "632100"],
        "632127": ["Hualong Hui Autonomous County", "632100"],
        "632128": ["Salar Autonomous County", "632100"],
        "632129": ["Other area", "632100"],
        "632200": ["Haibei Tibetan Autonomous Prefecture", "630000"],
        "632221": ["Menyuan County", "632200"],
        "632222": ["Qilian County", "632200"],
        "632223": ["Haiyan County", "632200"],
        "632224": ["Gangcha County", "632200"],
        "632225": ["Other area", "632200"],
        "632300": ["Huangnan Tibetan Autonomous Prefecture", "630000"],
        "632321": ["Tongren County", "632300"],
        "632322": ["JIANZHA County", "632300"],
        "632323": ["Zeku County", "632300"],
        "632324": ["Henan Mongolian Autonomous County", "632300"],
        "632325": ["Other area", "632300"],
        "632500": ["Hainan Tibetan Autonomous Prefecture", "630000"],
        "632521": ["Republican County", "632500"],
        "632522": ["Tongde County", "632500"],
        "632523": ["Guide County", "632500"],
        "632524": ["Xinghai County", "632500"],
        "632525": ["Guinan County", "632500"],
        "632526": ["Other area", "632500"],
        "632600": ["Golog Tibetan Autonomous Prefecture", "630000"],
        "632621": ["Maqin County", "632600"],
        "632622": ["Banma County", "632600"],
        "632623": ["Gander County", "632600"],
        "632624": ["Dari County", "632600"],
        "632625": ["Jigzhi County", "632600"],
        "632626": ["Maduo County", "632600"],
        "632627": ["Other area", "632600"],
        "632700": ["Yushu Tibetan Autonomous Prefecture", "630000"],
        "632721": ["Yushu County", "632700"],
        "632722": ["Zaduo", "632700"],
        "632723": ["Chengdu County", "632700"],
        "632724": ["Multi-county government", "632700"],
        "632725": ["Nangqên County", "632700"],
        "632726": ["Qumalai", "632700"],
        "632727": ["Other area", "632700"],
        "632800": ["Haixi Mongolian-Tibetan Autonomous Prefecture", "630000"],
        "632801": ["Golmud City", "632800"],
        "632802": ["Delingha", "632800"],
        "632821": ["Ulan County", "632800"],
        "632822": ["Dulan County", "632800"],
        "632823": ["Tianjun County", "632800"],
        "632824": ["Other area", "632800"],
        "640000": ["Ningxia Hui Autonomous Region", "1"],
        "640100": ["Yinchuan City", "640000"],
        "640104": ["Xingqing District", "640100"],
        "640105": ["Xixia", "640100"],
        "640106": ["Jinfeng District", "640100"],
        "640121": ["Yongning County", "640100"],
        "640122": ["Helan County", "640100"],
        "640181": ["Lingwu", "640100"],
        "640182": ["Other area", "640100"],
        "640200": ["Shizuishan", "640000"],
        "640202": ["Dawukou", "640200"],
        "640205": ["Hui agricultural area", "640200"],
        "640221": ["Pingluo", "640200"],
        "640222": ["Other area", "640200"],
        "640300": ["Wuzhong", "640000"],
        "640302": ["Lee Tong District", "640300"],
        "640303": ["Hongsipu area", "640300"],
        "640323": ["Salt Lake County", "640300"],
        "640324": ["Tongxin County", "640300"],
        "640381": ["Qingtongxia", "640300"],
        "640382": ["Other area", "640300"],
        "640400": ["Guyuan", "640000"],
        "640402": ["Yuanzhou", "640400"],
        "640422": ["Xiji County", "640400"],
        "640423": ["Longde County", "640400"],
        "640424": ["Jingyuan County", "640400"],
        "640425": ["Pengyang", "640400"],
        "640426": ["Other area", "640400"],
        "640500": ["Zhongwei", "640000"],
        "640502": ["Shapotou District", "640500"],
        "640521": ["Zhongning", "640500"],
        "640522": ["Haiyuan County", "640500"],
        "640523": ["Other area", "640500"],
        "650000": ["Xinjiang Uygur Autonomous Region", "1"],
        "650100": ["Urumqi", "650000"],
        "650102": ["Tianshan District", "650100"],
        "650103": ["Shayibake area", "650100"],
        "650104": ["New Downtown", "650100"],
        "650105": ["Shuimogou area", "650100"],
        "650106": ["Toutunhe", "650100"],
        "650107": ["Dabancheng area", "650100"],
        "650108": ["Dongshan District", "650100"],
        "650109": ["Midong", "650100"],
        "650121": ["Urumqi County", "650100"],
        "650122": ["Other area", "650100"],
        "650200": ["Karamay City", "650000"],
        "650202": ["Dushanzi District", "650200"],
        "650203": ["Karamay District", "650200"],
        "650204": ["Baijiantan", "650200"],
        "650205": ["Urho District", "650200"],
        "650206": ["Other area", "650200"],
        "652100": ["Turpan area", "650000"],
        "652101": ["Turpan", "652100"],
        "652122": ["Shanshan", "652100"],
        "652123": ["Tuokexun County", "652100"],
        "652124": ["Other area", "652100"],
        "652200": ["Hami region", "650000"],
        "652201": ["Hami City", "652200"],
        "652222": ["Barkol County", "652200"],
        "652223": ["Yiwu County", "652200"],
        "652224": ["Other area", "652200"],
        "652300": ["Changji Hui Autonomous Prefecture", "650000"],
        "652301": ["Changji City", "652300"],
        "652302": ["Fukang City", "652300"],
        "652303": ["Miquan", "652300"],
        "652323": ["Hutubi County", "652300"],
        "652324": ["Manas County", "652300"],
        "652325": ["Qitai", "652300"],
        "652327": ["Jimsar County", "652300"],
        "652328": ["Mori Kazakh Autonomous County", "652300"],
        "652329": ["Other area", "652300"],
        "652700": ["Boertala Mongolian Autonomous Prefecture", "650000"],
        "652701": ["Bole", "652700"],
        "652722": ["Jinghe", "652700"],
        "652723": ["Hot Spring County", "652700"],
        "652724": ["Other area", "652700"],
        "652800": ["Bayinguoleng Mongol Autonomous Prefecture", "650000"],
        "652801": ["Korla City", "652800"],
        "652822": ["Luntai County", "652800"],
        "652823": ["Yuli", "652800"],
        "652824": ["Ruoqiang County", "652800"],
        "652825": ["Qiemo County", "652800"],
        "652826": ["Yanqi Hui Autonomous County", "652800"],
        "652827": ["Hejing County", "652800"],
        "652828": ["And Shuo County", "652800"],
        "652829": ["Bohu", "652800"],
        "652830": ["Other area", "652800"],
        "652900": ["Aksu Prefecture", "650000"],
        "652901": ["Aksu", "652900"],
        "652922": ["Wensu", "652900"],
        "652923": ["Kuqa County", "652900"],
        "652924": ["Shaya", "652900"],
        "652925": ["Xinhe County", "652900"],
        "652926": ["Baicheng", "652900"],
        "652927": ["Wushi County", "652900"],
        "652928": ["Awat County", "652900"],
        "652929": ["Kalpin county", "652900"],
        "652930": ["Other area", "652900"],
        "653000": ["Kirgiz Autonomous Prefecture", "650000"],
        "653001": ["Atushi City", "653000"],
        "653022": ["Akto County", "653000"],
        "653023": ["Akqi County", "653000"],
        "653024": ["Wuqia County", "653000"],
        "653025": ["Other area", "653000"],
        "653100": ["Kashi Region", "650000"],
        "653101": ["Kashi City", "653100"],
        "653121": ["Shufu", "653100"],
        "653122": ["Shule County,", "653100"],
        "653123": ["Yingjisha County", "653100"],
        "653124": ["Zep County", "653100"],
        "653125": ["Shache County", "653100"],
        "653126": ["Yecheng County", "653100"],
        "653127": ["Markit County", "653100"],
        "653128": ["Yuepuhuxian", "653100"],
        "653129": ["Jiashi County", "653100"],
        "653130": ["Bachu County", "653100"],
        "653131": ["Tashkurgan Tajik Autonomous County", "653100"],
        "653132": ["Other area", "653100"],
        "653200": ["Hotan Prefecture", "650000"],
        "653201": ["Wada City", "653200"],
        "653221": ["Hotan County", "653200"],
        "653222": ["Moyu County", "653200"],
        "653223": ["Pishan County", "653200"],
        "653224": ["Lop", "653200"],
        "653225": ["Cele", "653200"],
        "653226": ["Yutian County", "653200"],
        "653227": ["Minfeng County", "653200"],
        "653228": ["Other area", "653200"],
        "654000": ["Ili Kazak Autonomous Prefecture", "650000"],
        "654002": ["Yining", "654000"],
        "654003": ["Kuitun", "654000"],
        "654021": ["Yining County", "654000"],
        "654022": ["Sibo County", "654000"],
        "654023": ["Huocheng", "654000"],
        "654024": ["Gongliu", "654000"],
        "654025": ["Xinyuan County", "654000"],
        "654026": ["Zhaosu", "654000"],
        "654027": ["Turks County", "654000"],
        "654028": ["Nilka County", "654000"],
        "654029": ["Other area", "654000"],
        "654200": ["Tacheng", "650000"],
        "654201": ["Tower City", "654200"],
        "654202": ["Wusu", "654200"],
        "654221": ["Emin", "654200"],
        "654223": ["Shawan", "654200"],
        "654224": ["Toli County", "654200"],
        "654225": ["Yumin County", "654200"],
        "654226": ["Hoboksar Mongol Autonomous County", "654200"],
        "654227": ["Other area", "654200"],
        "654300": ["Altay region", "650000"],
        "654301": ["Altay", "654300"],
        "654321": ["Burqin County", "654300"],
        "654322": ["Fuyun County", "654300"],
        "654323": ["Fuhai County", "654300"],
        "654324": ["Habahe County", "654300"],
        "654325": ["Green River County", "654300"],
        "654326": ["Jimunai County", "654300"],
        "654327": ["Other area", "654300"],
        "659001": ["Shihezi City", "650000"],
        "659002": ["Alar City", "650000"],
        "659003": ["Tumxuk", "650000"],
        "659004": ["Wujiaqu", "650000"],
        "710000": ["Taiwan Province", "1"],
        "710100": ["Taipei", "710000"],
        "710101": ["Zhongzheng District", "710100"],
        "710102": ["Datong District", "710100"],
        "710103": ["In the mountains", "710100"],
        "710104": ["Songshan District", "710100"],
        "710105": ["Da-an District", "710100"],
        "710106": ["Wanhua District", "710100"],
        "710107": ["Xinyi District", "710100"],
        "710108": ["Shilin District", "710100"],
        "710109": ["Beitou District", "710100"],
        "710110": ["Neihu", "710100"],
        "710111": ["Nangang District", "710100"],
        "710112": ["Wenshan", "710100"],
        "710113": ["Other area", "710100"],
        "710200": ["Kaohsiung", "710000"],
        "710201": ["Xinxing District", "710200"],
        "710202": ["Cianjin District", "710200"],
        "710203": ["Lingya District", "710200"],
        "710204": ["Yancheng District", "710200"],
        "710205": ["Gushan District", "710200"],
        "710206": ["Cijin District", "710200"],
        "710207": ["Former township", "710200"],
        "710208": ["Sanmin District", "710200"],
        "710209": ["Zuoying District", "710200"],
        "710210": ["Nanzih District", "710200"],
        "710211": ["Little Harbor", "710200"],
        "710212": ["Other area", "710200"],
        "710300": ["Tainan", "710000"],
        "710301": ["Western", "710300"],
        "710302": ["Eastern", "710300"],
        "710303": ["South area", "710300"],
        "710304": ["North", "710300"],
        "710305": ["Anping District", "710300"],
        "710306": ["Annan District", "710300"],
        "710307": ["Other area", "710300"],
        "710400": ["Taichung", "710000"],
        "710401": ["District", "710400"],
        "710402": ["Eastern", "710400"],
        "710403": ["South area", "710400"],
        "710404": ["West", "710400"],
        "710405": ["North", "710400"],
        "710406": ["Beitun District", "710400"],
        "710407": ["Situn District", "710400"],
        "710408": ["Nam Theun area", "710400"],
        "710409": ["Other area", "710400"],
        "710500": ["Kinmen County", "710000"],
        "710600": ["Nantou County", "710000"],
        "710700": ["Keelung", "710000"],
        "710701": ["Charity District", "710700"],
        "710702": ["Xinyi District", "710700"],
        "710703": ["Zhongzheng District", "710700"],
        "710704": ["In the mountains", "710700"],
        "710705": ["Lok Area", "710700"],
        "710706": ["Warm area", "710700"],
        "710707": ["Qidu district", "710700"],
        "710708": ["Other area", "710700"],
        "710800": ["Hsinchu", "710000"],
        "710801": ["Eastern", "710800"],
        "710802": ["North", "710800"],
        "710803": ["Xiangshan District", "710800"],
        "710804": ["Other area", "710800"],
        "710900": ["Chiayi City", "710000"],
        "710901": ["Eastern", "710900"],
        "710902": ["West", "710900"],
        "710903": ["Other area", "710900"],
        "711100": ["New Taipei City", "710000"],
        "711200": ["Yilan County", "710000"],
        "711300": ["Hsinchu County", "710000"],
        "711400": ["Taoyuan County", "710000"],
        "711500": ["Miaoli County", "710000"],
        "711700": ["Changhua County", "710000"],
        "711900": ["Chiayi County", "710000"],
        "712100": ["Yunlin County", "710000"],
        "712400": ["Pingtung County", "710000"],
        "712500": ["Taitung", "710000"],
        "712600": ["Hualien County", "710000"],
        "712700": ["Penghu County", "710000"],
        "810000": ["HKSAR", "1"],
        "810100": ["Hong Kong Island", "810000"],
        "810101": ["Western", "810100"],
        "810102": ["Wanchai", "810100"],
        "810103": ["Eastern", "810100"],
        "810104": ["South area", "810100"],
        "810200": ["Kowloon", "810000"],
        "810201": ["Kowloon City", "810200"],
        "810202": ["Yau Tsim Mong District", "810200"],
        "810203": ["Sham Shui Po District", "810200"],
        "810204": ["Wong Tai Sin District", "810200"],
        "810205": ["Kwun Tong District", "810200"],
        "810300": ["New Territories", "810000"],
        "810301": ["North", "810300"],
        "810302": ["Tai Po District", "810300"],
        "810303": ["Sha Tin District", "810300"],
        "810304": ["Sai Kung District", "810300"],
        "810305": ["Yuen Long District", "810300"],
        "810306": ["Tuen Mun", "810300"],
        "810307": ["Tsuen Wan District", "810300"],
        "810308": ["Kwai Tsing District", "810300"],
        "810309": ["Islands District", "810300"],
        "820000": ["Macao Special Administrative Region", "1"],
        "820100": ["Macau Peninsula", "820000"],
        "820200": ["Islands", "820000"],
        "990000": ["Foreign countries", "1"],
        "990100": ["Foreign countries", "990000"]
    };
    var q = {
        1: ["华东", [310000, 320000, 330000, 340000, 360000]],
        2: ["华北", [110000, 120000, 140000, 370000, 130000, 150000]],
        3: ["华中", [430000, 420000, 410000]],
        4: ["华南", [440000, 450000, 350000, 460000]],
        5: ["东北", [210000, 220000, 230000]],
        6: ["西北", [610000, 650000, 620000, 640000, 630000]],
        7: ["西南", [500000, 530000, 520000, 540000, 510000]],
        8: ["港澳台", [810000, 820000, 710000]],
        9: ["海外", [990000]]
    };
    var h, k, f, c;
    var l = function(u) {
        if (typeof u !== "string") {
            u = u + ""
        }
        if (s[u] && s[u][1] === "1") {
            return true
        }
        return false
    };
    var n = function(v, u) {
        if (typeof v !== "string") {
            v = v + ""
        }
        if (u) {
            if (typeof u !== "string") {
                u = u + ""
            }
            if (s[v] && s[v][1] === u && l(u)) {
                return true
            }
        } else {
            if (s[v] && s[v][1] !== "1") {
                return true
            }
        }
        return false
    };
    var b = function(u) {
        if (!u) {
            return
        }
        if (u.length <= 3) {
            if (u.slice(u.length - 1, u.length) == "市" || u.slice(u.length - 1, u.length) == "县" || u.slice(u.length - 1, u.length) == "盟") {
                return u.slice(0, u.length - 1)
            }
        }
        var v;
        v = u.slice(u.length - 9);
        if (v == "群岛的岛礁及其海域") {
            return u.slice(0, u.length - 9)
        }
        v = u.slice(u.length - 8);
        if (v == "土家族苗族自治州" || v == "傣族景颇族自治州" || v == "哈尼族彝族自治州" || v == "布依族苗族自治州" || v == "蒙古族藏族自治州") {
            return u.slice(0, u.length - 8)
        }
        v = u.slice(u.length - 7);
        if (v == "藏族羌族自治州" || v == "壮族苗族自治州" || v == "黎族苗族自治县" || v == "苗族侗族自治州") {
            return u.slice(0, u.length - 7)
        }
        v = u.slice(u.length - 6);
        if (v == "傈僳族自治州" || v == "哈萨克自治州") {
            return u.slice(0, u.length - 6)
        }
        v = u.slice(u.length - 5);
        if (v == "彝族自治州" || v == "藏族自治州" || v == "白族自治州" || v == "傣族自治州" || v == "黎族自治县" || v == "回族自治州" || v == "蒙古自治州") {
            return u.slice(0, u.length - 5)
        }
        v = u.slice(u.length - 4);
        if (v == "") {
            return u.slice(0, u.length - 4)
        }
        v = u.slice(u.length - 3);
        if (v == "蒙古族" || v == "自治州") {
            return u.slice(0, u.length - 3)
        }
        v = u.slice(u.length - 2);
        if (v == "群岛" || v == "地区" || v == "林区") {
            return u.slice(0, u.length - 2)
        }
        if (u.slice(u.length - 1, u.length) == "市" || u.slice(u.length - 1, u.length) == "县" || u.slice(u.length - 1, u.length) == "盟") {
            return u.slice(0, u.length - 1)
        }
        return u
    };
    var i = function(w) {
        var v = [];
        var u;
        if (w) {
            var x = q[w];
            if (x) {
                u = x[1] || []
            }
        }
        if (!h) {
            h = [];
            jm.each(s, function(z, y) {
                if (y[1] != 1) {
                    return true
                }
                var A = {};
                A.name = y[0], A.parentid = y[1];
                A.id = z;
                h.push(A);
                if (u && jm.inArray(parseInt(z), u) >= 0) {
                    v.push(A)
                }
            });
            if (!u || u.length <= 0) {
                return h
            }
            return v
        }
        if (!u) {
            return h
        }
        jm.each(h, function(z, y) {
            if (u && jm.inArray(parseInt(y.id), u) >= 0) {
                v.push(y)
            }
        });
        return v
    };
    var t = function(v) {
        if (!v || isNaN(v)) {
            return
        }
        var u = [];
        if (!k) {
            k = [];
            jm.each(s, function(y, w) {
                if (w[1] == 1) {
                    return true
                }
                var x = {};
                x.name = w[0], x.parentid = w[1];
                x.id = y;
                k.push(x);
                if (w[1] == v) {
                    u.push(x)
                }
            });
            return u
        }
        jm.each(k, function(x, w) {
            if (w.parentid == v) {
                u.push(w)
            }
        });
        return u
    };
    var o = function(v) {
        if (!v) {
            return {
                id: v,
                name: "",
                parentId: 0
            }
        }
        var u = s[v];
        if (u) {
            return {
                id: v,
                name: u[0],
                parentId: u[1]
            }
        }
        return {
            id: v,
            name: "",
            parentId: 0
        }
    };
    var e = function(u) {
        if (!u) {
            return
        }
        if (u.length == 3 && u.slice(u.length - 1, u.length) == "省") {
            return u.slice(0, u.length - 1)
        }
        var v = u.slice(u.length - 6);
        if (v == "维吾尔自治区") {
            return u.slice(0, u.length - 6)
        }
        v = u.slice(u.length - 5);
        if (v == "特别行政区" || v == "壮族自治区" || v == "回族自治区") {
            return u.slice(0, u.length - 5)
        }
        v = u.slice(u.length - 3);
        if (v == "自治区") {
            return u.slice(0, u.length - 3)
        }
        if (u.slice(u.length - 1, u.length) == "省") {
            return u.slice(0, u.length - 1)
        }
        return u
    };
    var m = function(w) {
        var v = [];
        var u;
        if (w) {
            var x = q[w];
            if (x) {
                u = x[1] || []
            }
        }
        if (!f) {
            f = [];
            jm.each(j, function(z, y) {
                if (y[1] != 1) {
                    return true
                }
                var A = {};
                A.name = y[0], A.parentid = y[1];
                A.id = z;
                f.push(A);
                if (u && jm.inArray(parseInt(z), u) >= 0) {
                    v.push(A)
                }
            });
            if (!u || u.length <= 0) {
                return f
            }
            return v
        }
        if (!u) {
            return f
        }
        jm.each(f, function(z, y) {
            if (u && jm.inArray(parseInt(y.id), u) >= 0) {
                v.push(y)
            }
        });
        return v
    };
    var r = function(v) {
        if (!v || isNaN(v)) {
            return
        }
        var u = [];
        if (!c) {
            c = [];
            jm.each(j, function(y, w) {
                if (w[1] == 1) {
                    return true
                }
                var x = {};
                x.name = w[0], x.parentid = w[1];
                x.id = y;
                c.push(x);
                if (w[1] == v) {
                    u.push(x)
                }
            });
            return u
        }
        jm.each(c, function(x, w) {
            if (w.parentid == v) {
                u.push(w)
            }
        });
        return u
    };
    var d = function(v) {
        if (!v) {
            return {
                id: v,
                name: "",
                parentId: 0
            }
        }
        var u = j[v];
        if (u) {
            return {
                id: v,
                name: u[0],
                parentId: u[1]
            }
        }
        return {
            id: v,
            name: "",
            parentId: 0
        }
    };
    var a = function(u) {
        if (!u) {
            return
        }
        if (u.slice(u.length - 29, u.length) == "Special Administrative Region") {
            u = u.slice(0, u.length - 30)
        }
        if (u.slice(u.length - 17, u.length) == "Autonomous Region") {
            u = u.slice(0, u.length - 18)
        }
        if (u.slice(u.length - 8, u.length) == "Province" || u.slice(u.length - 8, u.length) == "province") {
            u = u.slice(0, u.length - 9)
        }
        if (u.slice(u.length - 6, u.length) == "Zhuang") {
            u = u.slice(0, u.length - 7)
        }
        if (u.slice(u.length - 5, u.length) == "Uygur") {
            u = u.slice(0, u.length - 6)
        }
        if (u.slice(u.length - 3, u.length) == "Hui") {
            u = u.slice(0, u.length - 4)
        }
        return u
    };
    var p = function(u) {
        if (!u) {
            return
        }
        if (u.slice(u.length - 29, u.length) == "Tibetan Autonomous Prefecture") {
            u = u.slice(0, u.length - 30)
        }
        if (u.slice(u.length - 22, u.length) == "Li and Miao Autonomous") {
            u = u.slice(0, u.length - 23)
        }
        if (u.slice(u.length - 13, u.length) == "Li Autonomous") {
            u = u.slice(0, u.length - 14)
        }
        if (u.slice(u.length - 10, u.length) == "Prefecture") {
            u = u.slice(0, u.length - 11)
        }
        if (u.slice(u.length - 9, u.length) == "Mongolian") {
            u = u.slice(0, u.length - 10)
        }
        if (u.slice(u.length - 6, u.length) == "County") {
            u = u.slice(0, u.length - 7)
        }
        if (u.slice(u.length - 4, u.length) == "City") {
            u = u.slice(0, u.length - 5)
        }
        return u
    };
    return {
        getAreaGroups: function() {
            return q
        },
        getProvince: function(u) {
            return i(u)
        },
        getCities: function(u) {
            return t(u)
        },
        getCounty: function(u) {
            return t(u)
        },
        getInfo: function(u) {
            return o(u)
        },
        simpleProvinceName: function(u) {
            jm.each(u, function(v, w) {
                u[v].name = e(u[v].name)
            })
        },
        simpleProvinceNameStr: function(u) {
            return e(u)
        },
        simpleCityName: function(u) {
            jm.each(u, function(v, w) {
                u[v].name = b(u[v].name)
            })
        },
        simpleCityNameStr: function(u) {
            return b(u)
        },
        simpleProvinceNameEn: function(u) {
            jm.each(u, function(v, w) {
                u[v].name = a(u[v].name)
            })
        },
        simpleCityNameEn: function(u) {
            jm.each(u, function(v, w) {
                u[v].name = p(u[v].name)
            })
        },
        simpleCityNameStrEn: function(u) {
            return p(u)
        },
        simpleProvinceNameStrEn: function(u) {
            return a(u)
        },
        getProvinceEn: function(u) {
            return m(u)
        },
        getCitiesEn: function(u) {
            return r(u)
        },
        getCountyEn: function(u) {
            return r(u)
        },
        getInfoEn: function(u) {
            return d(u)
        },
        simpleCityListStr: function(y) {
            if (!y || y.length <= 0) {
                return "未添加地区"
            }
            var w = {};
            jm.each(y, function(z, B) {
                var A = o(B);
                if (w[A.parentId]) {
                    w[A.parentId].count++
                } else {
                    w[A.parentId] = {
                        count: 1,
                        objs: []
                    }
                }
                w[A.parentId].objs.push(A)
            });
            var x = [];
            var v = [];
            jm.each(w, function(z, A) {
                var B = t(z);
                if (B.length == A.count) {
                    x.push(e(o(z).name));
                    x.push("、")
                } else {
                    jm.each(A.objs, function(C, D) {
                        v.push(b(D.name));
                        v.push("、")
                    })
                }
            });
            var u = x.join("") + v.join("");
            return u.slice(0, u.length - 1)
        },
        isValidProvince: function(u) {
            return l(u)
        },
        isValidCity: function(v, u) {
            return n(v, u)
        }
    }
}());
Mobi.vote = function(f, d, c, b) {
    var e = true;
    var a = new Array();
    jm(".voteItems" + f + d).each(function() {
        var j = {};
        var i = new Array();
        jm(this).find(".voteItems").find("input:checked").each(function() {
            var k = jm(this).val();
            if (!isNaN(k)) {
                i.push(parseInt(k))
            }
        });
        if (i.length == 0) {
            Mobi.ing(LS.voteNotSelect);
            e = false;
            return
        }
        j.itemList = i;
        a.push(j)
    });
    var h = parseInt(jm.getCookie("vote" + f));
    if (!e) {
        return
    }
    Mobi.ing(LS.voteBeing, -1);
    jm("#vote" + f + d).attr("disabled", true);
    jm.ajax({
        type: "post",
        url: "ajax/vote_h.jsp?cmd=voteItem",
        data: "vid=" + f + "&list=" + jm.encodeUrl(jm.toJSON(a)),
        error: function() {
            Mobi.ing(LS.voteError);
            setTimeout(function() {
                jm("#vote" + f + d).removeAttr("disabled")
            }, 3000)
        },
        success: function(j) {
            var i = jm.parseJSON(j);
            if (i.success) {
                Mobi.ing(LS.voteSuccess, 1);
                jm(".voteItems" + f + d).find(".voteItems").find("input:checked").each(function() {
                    jm(this).attr("checked", false)
                });
                if (c > 0) {
                    if (jm.getCookie("vote" + f) === "" || jm.getCookie("vote" + f) === "null") {
                        var k = new Date();
                        k.setHours(k.getHours() + c);
                        jm.setCookie("vote" + f, c, {
                            expires: k
                        })
                    }
                } else {
                    if (c == 0) {
                        jm.setCookie("vote" + f, null)
                    } else {
                        jm.setCookie("vote" + f, -1, {
                            expires: 30
                        })
                    }
                }
            } else {
                if (i.login) {
                    Mobi.ing(LS.voteErrorByNotLogin)
                } else {
                    Mobi.ing(i.msg)
                }
            }
            setTimeout(function() {
                jm("#vote" + f + d).removeAttr("disabled")
            }, 3000)
        }
    })
};
Mobi.initModuleVote = function(e) {
    var f = e.id,
        c = e.delay,
        b = e.mid,
        a = e.isVoted;
    if (c == 0) {
        jm.setCookie("vote" + f, null)
    } else {
        if (c == -1) {
            if (jm.getCookie("vote" + f) === "null") {
                jm.setCookie("vote" + f, -1, {
                    expires: 30
                })
            }
        } else {
            if (jm.getCookie("vote" + f) === "-1") {
                jm.setCookie("vote" + f, null)
            }
            if (jm.getCookie("vote" + f) !== "" && parseInt(jm.getCookie("vote" + f)) != c) {
                var h = new Date();
                h.setHours(h.getHours() + c);
                jm.setCookie("vote" + f, c, {
                    expires: h
                })
            }
        }
    }
    jm("#vote" + f + b).click(function() {
        Mobi.vote(f, b, c, a)
    })
};
Mobi.showVoteResult = function(c, a) {
    var b = new Array();
    jm("#vote" + a).find("input:checked").each(function() {
        var d = jm(this).val();
        if (!isNaN(d)) {
            b.push(parseInt(d))
        }
    });
    jm("#voteResult").addClass("showFullScreen");
    if (jm("#voteResult").length > 0) {
        jm("#voteResult").remove()
    }
    jm("#fullScreenDivCotainer").append("<div id='voteResult'  class=' webBackground webContainerBox voteResultDiv moduleContent fk-body-bg' style='overflow-y:auto;'></div>");
    jm.ajax({
        type: "post",
        url: "ajax/vote_h.jsp?cmd=voteResult",
        data: "id=" + c + "&list=" + b,
        error: function() {
            Mobi.ing(LS.systemError)
        },
        success: function(d) {
            var e = jm.parseJSON(d);
            var f = e.msg;
            if (e.success) {
                jm("#voteResult").append(e.html);
                jm("#voteResult").addClass("showVoteResult");
                if (f.length > 0) {
                    Mobi.ing(f)
                }
            }
        }
    })
};
Mobi.closeVoteResult = function() {
    jm("#voteResult").removeClass("showVoteResult");
    setTimeout(function() {
        jm("#voteResult").remove()
    }, 600)
};
Mobi.popupSearch = function(b) {
    if (!b || !typeof b.moduleType || !typeof b.moduleColor || !typeof b.hotTopic) {
        return
    }
    var j;
    if (b.searchProduct) {
        if (jm.getCookie("productSearchHistory")) {
            j = JSON.parse(jm.getCookie("productSearchHistory"))
        }
    } else {
        if (jm.getCookie("searchHistory")) {
            j = JSON.parse(jm.getCookie("searchHistory"))
        }
    }
    var h = "icon-closeSearch";
    if (b.isSysProductGroupCol) {
        h = "icon-offSearch"
    }
    var f;
    var e = [];
    e.push('<div id="searchWindow" class="searchWindow">');
    e.push('	<div class="searchInputBar">');
    e.push('		<div id="icon-closeSearch" class="' + h + '"></div>');
    e.push('		<div class="popupSearchWrap popupSearchWrap' + b.moduleType + '">');
    e.push('			<div class="icon-popupSearchIcon"></div>');
    e.push('			<form><input id="searchInput" class="popupSearchInput" type="search" placeholder="' + b.searchTip + '"></form>');
    e.push('			<div class="icon-popupSearchBtn" id="icon-searchSubmit"></div>');
    e.push("		</div>");
    e.push("	</div>");
    if (b && b.hotTopic && b.hotTopic.length) {
        e.push('	<div class="hotTopicWrap">');
        e.push("		<h3>" + LS.hostSearch + "</h3>");
        for (var d = 0, a = b.hotTopic.length; d < a; d++) {
            e.push('<span class="topicItem">' + b.hotTopic[d] + "</span>")
        }
        e.push("	</div>")
    }
    if (b.historySearch && j) {
        e.push('<div class="historyTopicWrap">');
        e.push("		<h3>" + LS.historySearch + "</h3>");
        if (j) {
            for (var d = 0, a = j.length; d < a; d++) {
                e.push('<span class="topicItem">' + j[d] + "</span>")
            }
        }
        e.push("</div>");
        e.push('<div id="clearHistoryBtn" class="clearHistoryBtn">' + LS.clearHistory + "</div>")
    }
    e.push("</div>");
    var c = jm(e.join(""));
    switch (b.moduleType) {
        case 0:
            c.find("#searchInput").css("padding-right", "1.8rem");
            break;
        case 1:
            c.find("#searchInput").css("padding-right", "2.5rem");
            break;
        case 2:
            c.find("#searchInput").css("padding-right", "2.5rem");
            break;
        case 3:
            c.find("#searchInput").css("padding-right", "1.8rem");
            break;
        case 4:
            c.find("#searchInput").css("padding-right", "3.3rem");
            break;
        case 5:
            c.find("#searchInput").css("padding-right", "1.8rem");
            break
    }
    jm("#g_web").append(c);
    jm("#icon-closeSearch").on("click", function() {
        jm("#searchWindow").on("animationend webkitAnimationEnd msAnimationEnd oAnimationEnd oanimationend", function() {
            jm("#searchWindow").remove();
            jm(this).off("animationend webkitAnimationEnd msAnimationEnd oAnimationEnd oanimationend")
        });
        jm("#searchWindow").addClass("searchWindowOff");
        jm(this).off("click")
    });
    jm("#icon-searchSubmit").on("click", function() {
        f = jm.trim(jm("#searchInput").val());
        if (f == "") {
            jm("#searchInput").get(0).focus();
            return
        }
        Mobi.searchInMobi(f, b);
        jm(this).off("click")
    });
    jm("#searchWindow").on("keypress", "#searchInput", function(i) {
        if (i.which === 13) {
            f = jm.trim(jm("#searchInput").val());
            Mobi.searchInMobi(f, b);
            return false
        }
    });
    jm("#searchWindow").on("click", ".topicItem", function() {
        f = jm(this).text();
        Mobi.searchInMobi(f, b);
        jm(".topicItem").off("click")
    });
    jm("#searchWindow").on("click", "#clearHistoryBtn", function() {
        jm(".historyTopicWrap").remove();
        jm(this).remove();
        if (b.searchProduct) {
            jm.setCookie("productSearchHistory", "", -1)
        } else {
            jm.setCookie("searchHistory", "", -1)
        }
    });
    jm("#searchInput").get(0).focus()
};
Mobi.searchInMobi = function(e, d) {
    var f = d.moduleId;
    var c = d.lanCode;
    var h = e;
    var a = d.nSL;
    var b = "searchResult.jsp?searchword=" + jm.encodeUrl(jm.trim(h)) + "&nSL=" + a;
    if (d.searchProduct == 1) {
        b = "pr.jsp?psId=" + f + "&searchword=" + jm.encodeUrl(jm.trim(h))
    }
    window.location.href = b;
    var i = [];
    if (d.searchProduct) {
        if (jm.getCookie("productSearchHistory")) {
            i = JSON.parse(jm.getCookie("productSearchHistory")) || []
        }
    } else {
        if (jm.getCookie("searchHistory")) {
            i = JSON.parse(jm.getCookie("searchHistory")) || []
        }
    }
    if (i.indexOf(h) !== -1) {
        return
    }
    i.unshift(h);
    i = i.slice(0, 10);
    if (d.searchProduct) {
        jm.setCookie("productSearchHistory", jm.toJSON(i), 7)
    } else {
        jm.setCookie("searchHistory", jm.toJSON(i), 7)
    }
};
Mobi.manageFaiscoAd = function(a) {
    var b = jm.cookie("faiscoAd", {
        path: "/"
    });
    if (b !== "true") {
        jm("#mobiAdvertisement_box").css("display", "block");
        if (a == 4 && jm("#mobiAdvertisement_adImg").length > 0 && Mobi.getStyle(Mobi.getPreviewObject("mobiAdvertisement_box"), "display") != "none") {
            jm("#header .navButton").css("bottom", (parseInt(jm("#header .navButton").css("bottom")) + 40) + "px");
            jm("#navbar").css("bottom", (parseInt(jm("#navbar").css("bottom")) + 40) + "px")
        }
        if (jm("#webCustomerServiceBox").length > 0 && jm("#webCustomerServiceBox").css("display") != "none") {
            jm("#mobiAdvertisement_adImg").css("opacity", "0.8")
        }
    }
    jm("#mobiAdClose").click(function() {
        if (Fai.top._manageMode == true) {
            jm.cookie("faiscoAd", true, {
                path: "/"
            })
        }
        jm("#mobiAdvertisement_box").remove()
    });
    jm("#mobiAdvertisement_adImg").click(function() {
        if (Fai.top._manageMode == true) {
            Mobi.logDog(200010, 1)
        } else {
            Mobi.logDog(200010, 0)
        }
    });
    var c = navigator.userAgent.toLowerCase();
    if ((c.match(/MicroMessenger/i) == "micromessenger")) {
        jm("#mobiAdvertisement_adImg").attr("href", "javascript:void(0);");
        jm("body").append("<div class='popupWXQrCode'><div class='wxQrBg'></div><img class='bgPic' src='" + Fai.top._resRoot + "/image/wx/wxQrCodeBack.png'/><div class='wxQrTip'>免费建站</div><img class='wxQrCodePic' src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFt8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL1UzWEQ3aS1sc0huSi1ZUzFmVm5hAAIEm0KHVwMEAAAAAA=='/></div>");
        jm("#mobiAdvertisement_adImg").click(function() {
            jm(".popupWXQrCode").show()
        });
        jm(".wxQrBg").click(function() {
            jm(".popupWXQrCode").hide()
        })
    }
};
Mobi.logoSizeCompressByMargin = function() {
    var k = jm("#pageLogo"),
        i = jm("#webHeader");
    if (i.css("display") == "none") {
        return
    }
    k.height(0);
    var b = parseFloat(k.css("margin-top").replace("px", "")),
        f = parseFloat(k.css("margin-bottom").replace("px", "")),
        h = parseFloat(k.height()),
        a = parseInt(k.attr("sid")),
        j = parseInt(k.attr("pw")),
        d = parseInt(k.attr("ph")),
        c = parseFloat(i.height()),
        e = 0;
    e = Math.floor(c - b - f);
    k.height(e + "px");
    if (a != 0) {
        k.width(parseInt(k.height()) + "px")
    } else {
        k.width(parseInt(k.height()) * j / d + "px")
    }
};
Mobi.titlePositionRefreshByLogo = function() {
    var e = jm("#pageLogo"),
        d = jm("#header"),
        f = jm("#pageTitle"),
        a = jm("#webHeader");
    if (a.css("display") == "none") {
        return
    }
    e.css({
        position: "",
        "float": "",
        left: "",
        right: ""
    });
    var c = "right";
    if (Fai.top._mobiSiteTitle.align == 0) {
        c = ""
    } else {
        if (Fai.top._mobiSiteTitle.align == 1) {
            c = "left"
        } else {
            if (Fai.top._mobiSiteTitle.align == 2) {
                c = "center"
            }
        }
    }
    d.css("text-align", c);
    d.css("padding", "");
    f.css("max-width", "");
    var b = parseInt(d.width());
    logoWidth = parseInt(e.width()), logoMarginLeft = parseInt(e.css("margin-left").replace("px", "")), logoMarginRight = parseInt(e.css("margin-right").replace("px", "")), headerPaddingLeft = parseInt(d.css("padding-left").replace("px", "")), headerPaddingRight = parseInt(d.css("padding-right").replace("px", "")), titlePaddingLeft = parseInt(f.css("padding-left").replace("px", "")), titlePaddingRight = parseInt(f.css("padding-right").replace("px", ""));
    if (e.css("display") != "none") {
        f.css("max-width", (b - logoWidth - logoMarginLeft - logoMarginRight - titlePaddingLeft - titlePaddingRight - 10) + "px");
        if (d.css("text-align") == "center" && (e.hasClass("left") || e.hasClass("right"))) {
            e.css({
                position: "absolute",
                "float": "none"
            });
            d.css("padding", 0);
            if (e.hasClass("left")) {
                if (headerPaddingLeft > 0) {
                    e.css("left", headerPaddingLeft + "px")
                } else {
                    e.css("left", 0)
                }
                if (f.offset().left < (e.offset().left + logoWidth)) {
                    d.css("padding", "0 0 0 " + (headerPaddingLeft + logoMarginLeft + logoMarginRight + logoWidth) + "px");
                    d.css("text-align", "left")
                }
            } else {
                if (e.hasClass("right")) {
                    if (headerPaddingRight > 0) {
                        e.css("right", headerPaddingRight + "px")
                    } else {
                        e.css("right", 0)
                    }
                    if ((f.offset().left + parseInt(f.width())) > e.offset().left) {
                        d.css("padding", "0 " + (headerPaddingRight + logoMarginLeft + logoMarginRight + logoWidth) + "px 0 0");
                        d.css("text-align", "right")
                    }
                }
            }
        } else {
            if (d.css("text-align") == "center") {
                d.css("padding", 0);
                if (headerPaddingLeft > 0) {
                    if ((e.offset().left) <= (d.offset().left + headerPaddingLeft) || (f.offset().left) <= (d.offset().left + headerPaddingLeft)) {
                        d.css("padding", "");
                        d.css("text-align", "left")
                    }
                } else {
                    if (headerPaddingRight > 0) {
                        if ((e.offset().left + logoWidth) >= (d.offset().left + b) || (f.offset().left + parseInt(f.width())) >= (d.offset().left + b)) {
                            d.css("padding", "");
                            d.css("text-align", "right")
                        }
                    }
                }
            }
        }
    } else {
        f.css("max-width", (b - titlePaddingLeft - titlePaddingRight) + "px");
        if (d.css("text-align") == "center") {
            d.css("padding", 0);
            if (headerPaddingLeft > 0 && (f.offset().left <= (d.offset().left + headerPaddingLeft))) {
                d.css("padding", "")
            } else {
                if (headerPaddingRight > 0 && (f.offset().left + parseInt(f.width()) >= (d.offset().left + b - headerPaddingRight))) {
                    d.css("padding", "")
                }
            }
        }
    }
};
Mobi.countSiteTitleBgHeiht = 0;
Mobi.changeTempCountSiteBgHeight = function() {
    var a = jm("#headerBg"),
        e = jm("#headerWhiteBg"),
        h = jm("#navButton"),
        c = jm("#webHeader"),
        k = parseFloat(c.height()),
        l = parseFloat(c.css("padding-top")),
        b = parseFloat(c.css("padding-bottom")),
        d = parseFloat(c.css("border-top-width")),
        f = parseFloat(c.css("border-bottom-width")),
        i = k + l + b + d + f,
        j = i.toString() + "px";
    a.css("height", (i / _htmlFontSize) + "rem");
    if (b > 0) {
        a.css("padding-bottom", (b / _htmlFontSize) + "rem")
    }
    e.css("height", (i / _htmlFontSize) + "rem");
    Mobi.countSiteTitleBgHeiht = j;
    if (Mobi.showSiteTitleBgGloable.bgType !== "undefined" && Mobi.showSiteTitleBgGloable.bgType != "null") {
        Mobi.changeSiteTitleBg(Mobi.showSiteTitleBgGloable.bgType, Mobi.showSiteTitleBgGloable.bgImgStyle, Mobi.showSiteTitleBgGloable.bgFontColor, Mobi.showSiteTitleBgGloable.bgFontAlpha, Mobi.showSiteTitleBgGloable.linkCoverPreViewPath)
    }
};
Mobi.showSiteTitleBgGloable = {};
Mobi.showSiteTitleBgGloable.showSiteTitleBgFlag = false;
Mobi.setShowSiteTitleBgFlag = function(a) {
    if (a == 0) {
        Mobi.showSiteTitleBgGloable.showSiteTitleBgFlag = true
    } else {
        Mobi.showSiteTitleBgGloable.showSiteTitleBgFlag = false
    }
    setTimeout(function() {
        Mobi.changeTempCountSiteBgHeight()
    }, 1000)
};
Mobi.changeSiteTitleBg = function(f, c, h, b, e) {
    Mobi.showSiteTitleBgGloable.bgType = f;
    Mobi.showSiteTitleBgGloable.bgImgStyle = c;
    Mobi.showSiteTitleBgGloable.bgFontColor = h;
    Mobi.showSiteTitleBgGloable.bgFontAlpha = b;
    Mobi.showSiteTitleBgGloable.linkCoverPreViewPath = e;
    var i = jm("#headerBg");
    var a = jm("#webHeader");
    var d = jm("#headerWhiteBg");
    window.onload = function() {
        Mobi.changeTempCountSiteBgHeight()
    };
    Mobi.countSiteTitleBgHeiht = a.height();
    i.css("height", (Mobi.countSiteTitleBgHeiht / _htmlFontSize) + "rem");
    d.css("height", (Mobi.countSiteTitleBgHeiht / _htmlFontSize) + "rem");
    if (f != null && f != "") {
        if (f == 1) {
            i.css("background", "transparent");
            i.css("background-color", "#fff");
            i.css("opacity", "1");
            i.css("filter", (opacity = "100"));
            if (Mobi.showSiteTitleBgGloable.showSiteTitleBgFlag) {
                i.css("display", "block");
                d.css("display", "block")
            } else {
                i.css("display", "none");
                d.css("display", "none")
            }
        } else {
            if (f == 2) {
                if (e != null && e != "") {
                    i.css("background-image", "url(" + e + ")")
                }
                if (c == 2) {
                    i.css("background-color", h);
                    i.css("opacity", b / 100);
                    i.css("background-size", "cover");
                    i.css("background-position", "no-repeat");
                    i.css("filter", (opacity = b))
                } else {
                    if (c == 3) {
                        i.css("background-color", h);
                        i.css("opacity", b / 100);
                        i.css("background-size", "100% 100%");
                        i.css("background-position", "no-repeat");
                        i.css("filter", (opacity = b))
                    } else {
                        if (c == 4) {
                            i.css("background-color", h);
                            i.css("opacity", b / 100);
                            i.css("background-size", "inherit");
                            i.css("background-position", "no-repeat");
                            i.css("filter", (opacity = b))
                        } else {
                            i.css("background-image", "none");
                            i.css("background-color", h);
                            i.css("filter", (opacity = b));
                            i.css("opacity", b / 100)
                        }
                    }
                }
                if (Mobi.showSiteTitleBgGloable.showSiteTitleBgFlag) {
                    i.css("display", "block");
                    d.css("display", "block")
                } else {
                    i.css("display", "none");
                    d.css("display", "none")
                }
            } else {
                i.css("display", "none");
                d.css("display", "none")
            }
        }
    }
};
Mobi.iframeToEmbed = function(b, f, a) {
    var e = jm("#" + b + " iframe");
    var c;
    if (jm.os.ie) {
        if (a == "v.youku.com" || a == "player.youku.com") {
            c = "http://player.youku.com/player.php/sid/" + f + "/v.swf"
        } else {
            if (a == "v.qq.com" || a == "static.video.qq.com") {
                c = "http://static.video.qq.com/TPout.swf?vid=" + f + "&auto=0"
            } else {
                return false
            }
        }
        var d = "<embed class='mobiVideoOnlineIframe' src='" + c + "' allowFullScreen='true' wmode='Opaque' quality='high'  align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>";
        jm(d).insertBefore(e);
        e.remove()
    }
    return
};
Mobi.videoPoster = function(f, b) {
    var a = Number(jm("#" + f).height());
    var e = Number(jm("#" + f).width());
    var c = (a) / _htmlFontSize + "rem";
    var d = e / _htmlFontSize + "rem";
    jm("#" + f).css("max-height", c);
    jm("#" + f).css("min-height", c);
    jm("#" + f).css("max-width", d);
    jm("#" + f).attr("poster", b)
};
Mobi.initBgm = function(d) {
    var b = jm("#bgmAudio"),
        e = Mobi.getPreviewWindow();
    b.attr("src", d);
    jm("#bgMusic").bind("click", function() {
        var h = jm("#bgMusic .bgm_icon_inner");
        if (h.hasClass("bgm_on")) {
            Mobi.bgmPause();
            jm.cookie("_bgmIsPause", 1)
        } else {
            Mobi.bgmPlay();
            jm.cookie("_bgmIsPause", 0)
        }
    });
    jm(e).off("beforeunload.bgMusic").on("beforeunload.bgMusic", function() {
        e.Mobi.recordLastPlayerTime("bgmAudio", "bgplayerTime")
    });
    b.off("ended.bgm").on("ended.bgm", function(i) {
        var h = jm("#bgMusic .bgm_icon_inner");
        h.removeClass("bgm_on")
    });
    b.off("durationchange.bgm").on("durationchange.bgm", function() {
        var h = Mobi.callLastPlayerTime("bgplayerTime", 0);
        if (this.duration >= h) {
            this.currentTime = h
        }
    });
    if (jm("#bgmAudio").attr("autoplay")) {
        var c = navigator.userAgent;
        if (/(iPhone|iPad|iPod|Android)/i.test(c)) {
            var a = jm("#bgMusic .bgm_icon_inner");
            jm("body").off("touchstart.bgm").on("touchstart.bgm", function(h) {
                if (!parseInt(jm.cookie("_bgmIsPause")) && !(h.target == a[0])) {
                    Mobi.bgmPlay()
                }
            });
            if (!jm("#bgmAudio").attr("loop")) {
                jm("#bgmAudio").off("playing.bgm").on("playing.bgm", function(h) {
                    jm("body").off("touchstart.bgm")
                })
            }
        }
        Mobi.bgmPlay()
    }
    if (jm.cookie("_bgmIsPause")) {
        var f = parseInt(jm.cookie("_bgmIsPause"));
        if (f == 1) {
            Mobi.bgmPause()
        } else {
            Mobi.bgmPlay()
        }
    }
    Mobi.initBgmPosition();
    Mobi.bindBodyScrollEvent()
};
Mobi.initBgmPosition = function() {
    var b = jm("#bgMusic .bgm_icon");
    if (b.length < 1) {
        return
    }
    var a = 0;
    b.css({
        top: "",
        bottom: ""
    });
    if (b.hasClass("bgm_rightUp") || b.hasClass("bgm_leftUp")) {
        Mobi.scrollBgmPosition()
    } else {
        if (b.hasClass("bgm_rightDown") || b.hasClass("bgm_leftDown")) {
            if (jm("#customerServiceDiv").length < 1 || jm("#customerServiceDiv").find(".service").length < 1) {
                a = 20
            } else {
                a = parseInt(jm("#customerServiceDiv").height()) + 20
            }
            b.css("bottom", a + "px")
        }
    }
};
Mobi.scrollBgmPosition = function() {
    var e = jm("#bgMusic .bgm_icon"),
        f = jm("#webMultilingualArea"),
        d = jm("#webHeaderBox"),
        i = jm(".loginHeader.webHeaderBg"),
        a = parseInt(d.height());
    var h = 0,
        b = 10,
        c = document.documentElement.scrollTop || document.body.scrollTop;
    if (e.hasClass("bgm_rightUp") || e.hasClass("bgm_leftUp")) {
        if (f.length > 0) {
            h = f.offset().top + parseInt(f.height()) - c
        } else {
            h = d.offset().top + a - c
        }
        if (!h) {
            if (i.length > 0) {
                h = i.offset().top + parseInt(i.height()) - c + 10
            }
            h = h > 0 ? h : 10;
            e.css("top", h + "px");
            return
        }
        if (d.css("position") == "fixed") {
            if (h >= a) {
                b = h + 10
            } else {
                b = a + 10
            }
        } else {
            if (h >= 0) {
                b = h + 10
            }
        }
        e.css("top", b + "px")
    }
};
Mobi.initBgmCookie = function() {
    jm.cookie("_bgmIsPause", null)
};
Mobi.resetBgmCookie = function() {
    var a = jm("#bgMusic .bgm_icon_inner");
    if (a.hasClass("bgm_on")) {
        jm.cookie("_bgmIsPause", 0)
    } else {
        jm.cookie("_bgmIsPause", 1)
    }
};
Mobi.bgmPause = function() {
    var b = jm("#bgMusic .bgm_icon_inner");
    var a = document.getElementById("bgmAudio");
    a.pause();
    b.removeClass("bgm_on")
};
Mobi.bgmPlay = function() {
    var b = jm("#bgMusic .bgm_icon_inner");
    var a = document.getElementById("bgmAudio");
    a.play();
    b.addClass("bgm_on")
};
Mobi.recordLastPlayerTime = function(b, d) {
    var a = Mobi.getPreviewObject(b),
        c = parseFloat(a ? a.currentTime : defaultTime);
    sessionStorage[d] = c
};
Mobi.callLastPlayerTime = function(c, a) {
    var b = parseFloat(sessionStorage[c]);
    return b >= 0 ? b : a
};
Mobi.checkBrowser = (function() {
    var c = ["animation", "MozAnimation", "webkitAnimation", "msAnimation", "OAnimation"],
        e = ["transform", "MozTransform", "webkitTransform", "msTransform", "OTransform"],
        b = ["opacity", "MozOpacity", "webkitOpacity", "msOpacity", "OOpacity"],
        d = document.createElement("div"),
        a = {};
    return function(h) {
        if (typeof a[h] == "boolean") {
            return a[h]
        }
        switch (h) {
            case "animation":
                props = c;
                break;
            case "transform":
                props = e;
                break;
            case "opacity":
                props = b;
                break;
            default:
                props = c
        }
        for (var j = 0, f = props.length; j < f; j++) {
            if (d.style[props[j]] !== undefined) {
                a[h] = true;
                return a[h]
            }
        }
        a[h] = false;
        return a[h]
    }
})();
Mobi.initBannerDefaultDom = function(p) {
    if (p.showType == 3) {
        return
    }
    var b = p.et,
        m = p.b,
        q = m.length,
        f, e;
    var h = [];
    h.push("<div id='bannerSwipe' class='swipe'>");
    h.push("<div id='bannerSwipeContainer' class='bannerSwipeContainer defaultBanner'>");
    var c, a, k, d, l, o, n;
    for (f = 0; f < q; f++) {
        c = m[f].i;
        a = m[f].lt;
        k = m[f].w;
        d = m[f].h;
        l = m[f].t;
        o = m[f].p;
        n = m[f].aj;
        h.push("<div id='bannerItem" + c + "'>");
        h.push("<a href='" + (a != 0 ? n : "javascript:;") + "' vheight='" + d + "' vwidth='" + k + "' class='bannerImageDiv " + (l == 0 ? "systemtBanner" : "customBanner") + "' style='display:block; background-image:url(" + o + ");'></a>");
        h.push("</div>")
    }
    h.push("</div>");
    h.push("<div id='bannerBullet' class='bannerBullet'>");
    h.push("<ul id='bullets' class='bullets'>");
    for (e = 0; e < q; e++) {
        if (e == 0) {
            h.push("<li class='on' " + (q == 1 ? "style='display:none;'" : "") + "></li>")
        } else {
            h.push("<li></li>")
        }
    }
    h.push("</ul>");
    h.push("</div>");
    h.push("</div>");
    jm("#webBanner").html("");
    jm("#webBanner").append(h.join(""))
};
Mobi.initSwipe = function(a, l, f) {
    var o = Mobi.getJQMobi();
    var q = Mobi.getPreviewObject(a);
    if (!q) {
        return
    }
    if (jm._swipehandle) {
        jm._swipehandle.kill()
    }
    var d = q.querySelectorAll(".bannerImageDiv.customBanner"),
        s = q.querySelectorAll(".bannerImageDiv"),
        t = d.length,
        h = s.length,
        i = q.offsetWidth,
        c = "",
        m = 0,
        n, u, v;
    for (var r = 0; r < t; r++) {
        n = parseInt(d[r].getAttribute("vwidth"));
        u = parseInt(d[r].getAttribute("vheight"));
        v = u / n;
        if (v > m) {
            m = v
        }
    }
    if (h === 0) {
        q.querySelector(".defaultBanner").style.height = Math.ceil(i * 300 / 640) + "px"
    } else {
        c = h - t > 0 ? (i * m < i * 300 / 640 ? Math.ceil(i * 300 / 640) : Math.ceil(i * m)) : Math.ceil(i * m);
        q.style.height = c + "px"
    }
    if (!f) {
        if (!Mobi.checkBrowser() || Fai.top._bannerData.et == 1) {
            jm._swipehandle = o("#" + a).swipehandle(q, {
                auto: 3000,
                continuous: true,
                bulletsClick: true,
                speed: Fai.top._bannerData.st * 100,
                callback: function(x) {
                    var w = e.length;
                    while (w--) {
                        e[w].className = " "
                    }
                    if (!e[x]) {
                        e[x - e.length].className = "on"
                    } else {
                        e[x].className = "on"
                    }
                }
            })
        } else {
            q.style.visibility = "visible";
            var j = q.getBoundingClientRect().width,
                b = q.children[0],
                p = b.children;
            var k = p.length;
            while (k--) {
                p[k].style.width = j + "px"
            }
        }
        if (!q.querySelector(".bullets")) {
            return
        }
        var e = q.querySelector(".bullets").getElementsByTagName("li");
        return
    }
};
Mobi.bannerAnimate = {};
(function(l, L, m) {
    var f = false,
        R = 1,
        i = 0,
        V = -1,
        E = -1,
        s = false,
        N = true,
        B, h = 0,
        O = {
            duration: 3000
        },
        U = {},
        C = 0,
        c = 0,
        P, S = l("#bannerSwipe"),
        F = S.find(".bannerSwipeContainer"),
        u = F.find(".billboard_item"),
        h = u.length;
    L.init = function(Y) {
        var X = Y;
        if (l("#webBanner").length < 1) {
            return
        }
        if (X.b.length < 2) {
            return
        }
        if (X.showType == 3) {
            return
        }
        var Z = Mobi.checkBrowser();
        if (!Z || X.et == 1) {
            return false
        }
        clearTimeout(B);
        i = 0;
        s = false;
        M(X);
        G(X);
        Mobi.initSwipe("bannerSwipe", X);
        D(X);
        T(X);
        W();
        return true
    };

    function M(X) {
        if (X != m) {
            P = X;
            U.effectType = X.et;
            U.switchingTime = X.st * 100;
            U.duration = O.duration;
            R = X.et
        }
        if (U.effectType == 0) {
            R = w(0, 13)
        }
    }

    function D(X) {
        S = l("#bannerSwipe");
        F = S.find(".bannerSwipeContainer");
        u = F.find(".billboard_item");
        h = u.length;
        var Y = l("#bullets"),
            Z = Y.find("li");
        Z.removeClass("on");
        Z.eq(i).addClass("on")
    }

    function G(an) {
        var am = R,
            Z = an.w,
            al = an.h,
            ak = an.b,
            aj = ak.length,
            ao = 0,
            ai, ah, ac, aa;
        switch (am) {
            case 9:
            case 10:
                ao = 4;
                break;
            case 11:
            case 12:
            case 13:
                ao = 5;
                break;
            default:
                ao = 0
        }
        var ab = [];
        ab.push("<div id='bannerSwipe' class='swipe'>");
        ab.push("<div id='bannerSwipeContainer' class='bannerSwipeContainer defaultBanner billboard billboard" + am + "'>");
        var ag, ad, ap, Y, af, X, ae, ap, ac, aa;
        for (ai = 0; ai < aj; ai++) {
            ag = ak[ai].i;
            ad = ak[ai].lt;
            ap = "";
            Y = ak[ai].w;
            af = ak[ai].h;
            X = ak[ai].t;
            ae = ak[ai].p;
            ap = ak[ai].aj;
            ac = 1;
            aa = 1;
            if (ao == 0) {
                ab.push("<div id='bannerItem" + ag + "' class='billboardAnim billboard_item " + (ao != 0 ? "billboard_item" + ai : "") + "  billboardItem_" + am + "' >");
                ab.push("<a href='" + (ad != 0 ? ap : "javascript:;") + "' vheight='" + af + "' vwidth='" + Y + "' class='bannerImageDiv " + (X == 0 ? "systemtBanner" : "customBanner") + "' style='display:block; background-image:url(" + ae + ");'></a>")
            } else {
                if (ao == 4) {
                    ab.push("<div class='billboard_item billboardItem_" + am + " billboardItem_" + am + "_" + (ai + 1) + "'>");
                    for (aa = 1; aa < ao; aa++) {
                        ab.push("<div class='billboardTile billboardTile_" + aa + " billboardAnim'>");
                        ab.push("<div class='billboardImg'>");
                        ab.push("<a class='bannerImageDiv J_bannerItem systemtBanner billboardImgInner " + (X == 0 ? "systemtBanner" : "customBanner") + "' hidefocus='true' title='' href='" + (ad != 0 ? ap : "javascript:;") + "' vheight='" + af + "' vwidth='" + Y + "' target='' style='overflow: hidden; display: block; outline: none; margin: 0px auto; position: relative; z-index: 1; background-image: url(" + ae + "); background-position: 50% 50%; background-repeat: no-repeat;'>");
                        ab.push("</a>");
                        ab.push("</div>");
                        ab.push("</div>")
                    }
                } else {
                    ab.push("<div class='billboard_item billboardItem_" + am + " billboardItem_" + am + "_" + (ai + 1) + "'>");
                    for (ac = 1; ac < ao; ac++) {
                        ab.push("<div class='billboardTile billboardTile_" + ac + "'>");
                        ab.push("<div class='billboardAnim billboardTileImg'>");
                        ab.push("<div class='billboardImg'>");
                        ab.push("<a class='bannerImageDiv J_bannerItem systemtBanner billboardImgInner " + (X == 0 ? "systemtBanner" : "customBanner") + "' hidefocus='true' title='' href='" + (ad != 0 ? ap : "javascript:;") + "' vheight='" + af + "' vwidth='" + Y + "' target='' style='overflow: hidden; display: block; outline: none; margin: 0px auto; position: relative; z-index: 1; background-image: url(" + ae + "); background-position: 50% 50%; background-repeat: no-repeat;'>");
                        ab.push("</a>");
                        ab.push("</div>");
                        ab.push("</div>");
                        ab.push("</div>")
                    }
                }
            }
            ab.push("</div>")
        }
        ab.push("</div>");
        ab.push("<div id='bannerBullet' class='bannerBullet' style='" + (aj < 2 ? "display:none;" : "") + "' >");
        ab.push("<ul id='bullets' class='bullets'>");
        for (ah = 0; ah < aj; ah++) {
            if (ah == i) {
                ab.push("<li class='on'></li>")
            } else {
                ab.push("<li></li>")
            }
        }
        ab.push("</ul>");
        ab.push("</div>");
        ab.push("</div>");
        l("#webBanner").html(ab.join(""))
    }

    function W() {
        var X = l("#webBanner").height() || 0;
        if (U.effectType == 0 && X != 0) {
            l("#webBanner").css("height", X + "px")
        } else {
            l("#webBanner").css("height", "")
        }
    }

    function b() {
        C = F.width() || 0;
        c = l("#webBanner").height() || 0;
        itemMaxHeight1 = l("#bannerSwipe").height() || 0;
        var Y = u.eq(i);
        Y.addClass("billboardItem_" + R + "_start");
        var Z, aa;
        if (U.effectIndex == 0) {
            F.addClass("billboard" + effectIndex)
        }
        for (var X = 0; X < u.length; X++) {
            Z = u.eq(X);
            x(Z, "animationDuration", U.switchingTime + "ms");
            aa = Z.find(".billboardAnim");
            switch (R) {
                case 3:
                    x(Z, "transformOrigin", "50% 50% " + (-C / 2) + "px");
                    break;
                case 4:
                    x(Z, "transformOrigin", "50% 50% " + (-c / 2) + "px");
                    break;
                case 9:
                    x(aa, "transformOrigin", "50% 50% " + (-C / 2) + "px");
                    x(aa, "animationDuration", U.switchingTime + "ms");
                    break;
                case 10:
                    x(aa, "transformOrigin", "50% 50% " + (-Z.find(".billboardAnim").height() / 2) + "px");
                    x(aa, "animationDuration", U.switchingTime + "ms");
                    Z.css("height", itemMaxHeight1);
                    break;
                case 11:
                case 12:
                case 13:
                    x(aa, "animationDuration", U.switchingTime + "ms");
                    break;
                default:
            }
        }
        u.css("display", "none");
        Y.css("display", "block")
    }

    function T() {
        b();
        r();
        J();
        y()
    }

    function y() {
        var X = O.duration;
        if (P.atOnce && P.et != 0) {
            X = 1000
        }
        P.atOnce = false;
        if (!s) {
            clearTimeout(B);
            B = setTimeout(e, X)
        }
    }

    function j() {
        N = true;
        y()
    }

    function q() {
        if (!N) {
            return
        }
        clearTimeout(B)
    }

    function r() {
        var X = l("#bannerBullet"),
            Y = X.find("li");
        Y.click(function(aa) {
            aa.stopPropagation();
            var Z = Y.index(this);
            g = Z;
            q();
            Q(Z)
        })
    }

    function v(Y) {
        var X = l("#bullets"),
            Z = X.find("li");
        Z.removeClass("on");
        Z.eq(Y).addClass("on")
    }

    function n(Z, aa) {
        var Y = u.eq(i),
            X = u.eq(Z);
        X.css("display", "block");
        Y.removeClass("billboardItem_" + R + "_on billboardItem_" + R + "_on_reverse").addClass("billboardItem_" + R + "_off");
        X.removeClass("billboardItem_" + R + "_off billboardItem_" + R + "_off_reverse").addClass("billboardItem_" + R + "_on");
        if (aa) {
            Y.addClass("billboardItem_" + R + "_off_reverse");
            X.addClass("billboardItem_" + R + "_on_reverse")
        }
    }

    function Q(Y, Z) {
        if (isNaN(Y) || Y >= h || Y < 0 || Y == i) {
            return
        }
        if (s) {
            return
        }
        if (typeof Z === "undefined") {
            var Z = (Y > i ? false : true)
        }
        var X = u.eq(Y);
        v(Y);
        n(Y, Z);
        V = i;
        i = Y;
        s = true;
        H(X[0], z)
    }

    function z() {
        if (o(u.eq(i)[0], z)) {
            s = false;
            u.eq(V).css("display", "none");
            if (N) {
                clearTimeout(B);
                if (U.effectType == 0) {
                    K()
                } else {
                    B = setTimeout(function() {
                        e()
                    }, O.duration)
                }
            } else {
                if (U.effectType == 0) {
                    K()
                }
            }
        }
    }

    function H(X, Y) {
        X.addEventListener("animationend", Y, false);
        X.addEventListener("webkitAnimationEnd", Y, false);
        X.addEventListener("oAnimationEnd", Y, false);
        X.addEventListener("oanimationend", Y, false);
        X.addEventListener("msAnimationEnd", Y, false);
        return true
    }

    function o(X, Y) {
        X.removeEventListener("animationend", Y, false);
        X.removeEventListener("webkitAnimationEnd", Y, false);
        X.removeEventListener("oAnimationEnd", Y, false);
        X.removeEventListener("oanimationend", Y, false);
        X.removeEventListener("msAnimationEnd", Y, false);
        return true
    }

    function e() {
        var X = i + 1;
        if (X >= u.length) {
            X = 0
        }
        Q(X, false)
    }

    function A() {
        var X = i - 1;
        if (X < 0) {
            X = u.length - 1
        }
        Q(X, true)
    }
    var a, d, p;

    function J() {
        var X = !!("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;
        if (X) {
            F[0].addEventListener("touchstart", I, false)
        }
    }

    function I(X) {
        var Y = X.targetTouches[0];
        a = 0;
        d = {
            x: Y.pageX,
            y: Y.pageY,
            time: +new Date
        };
        F[0].addEventListener("touchmove", k, false);
        F[0].addEventListener("touchend", t, false)
    }

    function k(X) {
        if (X.targetTouches.length > 1 || X.scale && X.scale !== 1) {
            return
        }
        var Y = X.targetTouches[0];
        p = {
            x: Y.pageX - d.x,
            y: Y.pageY - d.y,
            time: +new Date
        };
        a = Math.abs(p.x) < Math.abs(p.y) ? 1 : 0;
        if (a === 0) {}
    }

    function t(X) {
        var Y = +new Date - d.time;
        if (a === 0) {
            if (Number(p.x) > 10 && Number(p.y) < 40) {
                e()
            } else {
                if (Number(p.x) < -10 && Number(p.y) < 40) {
                    A()
                }
            }
        }
        F[0].removeEventListener("touchmove", this, false);
        F[0].removeEventListener("touchend", this, false)
    }

    function x(Z, aa, Y) {
        var X = aa.substring(0, 1).toUpperCase() + aa.substring(1);
        Z.css("Webkit" + X, Y);
        Z.css("Moz" + X, Y);
        Z.css("ms" + X, Y);
        Z.css("O" + X, Y);
        Z.css(aa, Y)
    }

    function K() {
        M(P);
        G(P);
        Mobi.initSwipe("bannerSwipe", P);
        D();
        T()
    }

    function w(aa, Y) {
        var Z = Y - aa + 1,
            X = 0;
        while (X == 0) {
            X = Math.floor(Math.random() * Z + aa)
        }
        return X
    }
})(jm, Mobi.bannerAnimate);
var couponClickLock = true;
Mobi.initMallCoupon = function(c) {
    var b = jm("#couponList" + c);
    if (Fai.top._lcid != 2052 && b.find(".couponPrice2").length > 0) {
        jm.each(b.find(".couponPrice2"), function(d, e) {
            if (jm.isInteger(d) && b.find(".couponPrice2").eq(d).html().length == 4) {
                b.find(".couponSavePrice2").eq(d).css("margin-left", "0").css("margin-right", "0.75rem");
                b.find(".couponPrice2").eq(d).css("font-size", "1.4rem")
            }
        })
    }
    if ((window.chrome || 0) != 0) {
        if (window.frames.length != parent.frames.length) {
            b.find(".couponUseCondition2up").css("-webkit-transform", "scale(0.8)");
            b.find(".couponUseCondition2low").css("-webkit-transform", "scale(0.8)");
            b.find(".off2").css("-webkit-transform", "scale(0.8)");
            b.find(".couponSavePrice2").css("margin-right", "0.45rem");
            if (b.find(".validTime2").length > 0) {
                for (var a = 0; a < b.find(".validTime2").length; a++) {
                    if (b.find(".validTime2")[a].innerHTML.indexOf("-") <= 0) {
                        continue
                    }
                    b.find(".validTime2").eq(a).css("-webkit-transform", "scale(0.8)").css("margin-left", "-0.7rem")
                }
            }
            if (Fai.top._lcid != 2052) {
                b.find(".couponSavePrice2").css("margin-right", "0.2rem");
                jm.each(b.find(".couponPrice2"), function(d, e) {
                    if (jm.isInteger(d) && b.find(".couponPrice2").eq(d).html().length == 4) {
                        b.find(".couponSavePrice2").eq(d).css("margin-left", "-0.3rem").css("margin-right", "0.6rem");
                        b.find(".couponPrice2").eq(d).css("font-size", "1.4rem")
                    }
                })
            }
        }
    }
    b.find(".coupon1, .coupon2, .coupon3").bind("click", function() {
        if (couponClickLock) {
            clickCoupon(this)
        }
    })
};

function clickCoupon(a) {
    if (!couponClickLock) {
        return
    }
    couponClickLock = false;
    if (_manageMode == "true") {
        var c = [];
        c.push('<div class="mobiCouponMsgPanl2">');
        c.push('<div class="mobiCouponMsg">');
        c.push('<div class="fTop">领取失败</div>');
        c.push('<div class="fBottom">当前为管理状态!</div>');
        c.push("</div>");
        c.push("</div>");
        popupCouponMsg(c.join(""))
    } else {
        if (_isUserLogin != "true") {
            Fai.top.location.href = "login.jsp"
        } else {
            var b = jm(a).attr("couponId");
            var d = jm(a).attr("bgId");
            receiveCoupon(b, d)
        }
    }
    window.setTimeout(function() {
        couponClickLock = true
    }, 1600)
}

function popupCouponMsg(b) {
    var a = jm(".mobiCouponMsgBox");
    a.remove();
    jm("<div class='mobiCouponMsgBox'></div>").appendTo("body");
    a = jm(".mobiCouponMsgBox");
    jm(b).appendTo(a);
    window.setTimeout(function() {
        a.css("visibility", "hidden");
        a.css("opacity", "0")
    }, 1500)
}

function receiveCoupon(a, b) {
    jm.ajax({
        type: "post",
        url: "ajax/mallCoupon_h.jsp",
        data: "cmd=receiveCoupon&bgId=" + b + "&cid=" + a,
        dataType: "json",
        success: function(c) {
            if (c.success) {
                var e = c.coupon;
                var f = [];
                f.push('<div class="mobiCouponMsgPanl">');
                f.push('<div class="mobiCouponMsg">');
                f.push('<div class="sTop">' + LS.successGet + "</div>");
                f.push('<div class="sContent1">' + LS.couponName + ":" + jm.encodeHtml(e.couponName) + "</div>");
                f.push('<div class="sContent2">' + LS.denomination + ":" + Fai.top.choiceCurrencyVal + e.orderMinPrice + "</div>");
                f.push('<div class="sContent3">' + LS.threshold + Fai.top.choiceCurrencyVal + e.orderMinPrice + "</div>");
                f.push('<div class="sContent4">' + LS.effTime + ":" + e.validity + "</div>");
                f.push("</div>");
                f.push("</div>");
                popupCouponMsg(f.join(""));
                window.setTimeout(function() {
                    location.reload(true)
                }, 1500)
            } else {
                var d = c.rt;
                if (d == -23) {
                    Fai.top.location.href = "login.jsp"
                } else {
                    if (d == -4) {
                        var f = [];
                        f.push('<div class="mobiCouponMsgPanl2">');
                        f.push('<div class="mobiCouponMsg">');
                        f.push('<div class="fTop">' + LS.failGet + "</div>");
                        f.push('<div class="fBottom">' + LS.overGet + "</div>");
                        f.push("</div>");
                        f.push("</div>");
                        popupCouponMsg(f.join(""))
                    } else {
                        var f = [];
                        f.push('<div class="mobiCouponMsgPanl2">');
                        f.push('<div class="mobiCouponMsg">');
                        f.push('<div class="fTop">' + LS.failGet + "</div>");
                        f.push('<div class="fBottom">' + LS.isNoneCoupon + "</div>");
                        f.push("</div>");
                        f.push("</div>");
                        popupCouponMsg(f.join(""))
                    }
                }
            }
        },
        error: function() {
            Mobi.ing(LS.systemError)
        }
    })
}
Mobi.initTemplate2 = function(f) {
    var e = Mobi.getJQMobi(),
        a = f.layout,
        h = f.moduleStyle,
        d = f.designType,
        c = Mobi.getPreviewObject("navbar"),
        b = Mobi.getPreviewObject("navbarList");
    if (c) {
        c.setAttribute("style", "")
    }
    if (b) {
        b.setAttribute("style", "")
    }
    jm(Mobi.getPreviewObject("webTop")).css("height", "");
    Mobi.removeAllSwipeMenuClass();
    if (a == 1) {
        jm(Mobi.getPreviewObject("webFooterBox")).append(Mobi.getPreviewObject("navbar"));
        Mobi.showNavItemContainer();
        if (d === 1) {
            Mobi.navSwipeMenu(a)
        }
    } else {
        if (a == 2 || a == 4 || a == 5 || a == 7) {
            if (a !== 5 && a !== 7) {
                Mobi.getPreviewObject("webTop").appendChild(Mobi.getPreviewObject("navbar"))
            } else {
                Mobi.getPreviewObject("webHeaderBox").appendChild(Mobi.getPreviewObject("navbar"))
            }
            Mobi.autoSetNavBarBottom(a);
            Mobi.navSwipeMenu(a)
        } else {
            if (a == 3 || a == 0 || a == 8) {
                jm(Mobi.getPreviewObject("webHeaderBox")).append(Mobi.getPreviewObject("navbar"));
                if (a == 0) {
                    Mobi.showNavItemContainer()
                } else {
                    if (a == 8) {
                        Mobi.showNavItemContainer();
                        Mobi.navSwipeMenu(a)
                    } else {
                        if (d === 1) {
                            Mobi.navSwipeMenu(a)
                        }
                    }
                }
            } else {
                if (a == 6) {
                    jm(Mobi.getPreviewObject("webBannerBox")).append(Mobi.getPreviewObject("navbar"));
                    Mobi.showNavItemContainer()
                }
            }
        }
    }
    Mobi.autoSetNavBarBottom(a);
    Mobi.autoFixGWebTop(a);
    Mobi.topTipMarquee();
    if (Mobi.getPreviewObject("webMultilingualArea")) {
        if (a == 4) {
            jm(Mobi.getPreviewObject("webHeaderBox")).append(Mobi.getPreviewObject("webMultilingualArea"))
        } else {
            jm(Mobi.getPreviewObject("webBannerBox")).prepend(Mobi.getPreviewObject("webMultilingualArea"))
        }
    }
    if (Fai.top._templateFrameId === 1005 || Fai.top._templateFrameId === 1004) {
        Mobi.scrollNavFix();
        jm(window).bind("load", function() {
            Mobi.scrollNavFix()
        })
    }
    if (Fai.top._templateFrameId === 1004) {
        jm(Mobi.getPreviewObject("navbar")).append(Mobi.getPreviewObject("navButton"))
    } else {
        jm(Mobi.getPreviewObject("webHeaderBox")).prepend(Mobi.getPreviewObject("navButton"))
    }
    Mobi.changeMorePosition(h)
};
Mobi.changeMorePosition = function(d) {
    var e = document.querySelectorAll("#webModuleContainer>.form"),
        a = e.length;
    if (d === 1) {
        for (var b = 0; b < a; b++) {
            var h = e[b],
                c = h.querySelector(".formBannerMore");
            if (!c) {
                continue
            }
            h.appendChild(c)
        }
    } else {
        for (var b = 0; b < a; b++) {
            var h = e[b],
                f = h.querySelector(".formBannerTitle>.titleCenter"),
                c = h.querySelector(".formBannerMore");
            f.appendChild(c)
        }
    }
};
Mobi.scrollNavFix = function() {
    var d = document.getElementById("navbar"),
        e = document.getElementById("g_body"),
        c = d.clientHeight,
        b = false,
        f = d.offsetTop;
    if (d.parentNode == document.getElementById("webBannerBox")) {
        f += 180
    }
    document.addEventListener("touchstart", function(h) {
        a()
    }, false);
    document.addEventListener("touchmove", function(h) {
        a()
    }, false);
    document.addEventListener("touchend", function(h) {
        a()
    }, false);
    document.addEventListener("touchcancel", function(h) {
        a()
    }, false);
    document.addEventListener("scroll", function() {
        a()
    }, false);

    function a() {
        var h = e.scrollTop;
        if (h > f && !b) {
            jm(d).addClass("scroll_fix");
            b = true
        }
        if ((h - c) < f && b) {
            jm(d).removeClass("scroll_fix");
            b = false
        }
    }
};
Mobi.initFooterHeight = function() {
    var b = Mobi.getPreviewObject("webFooter");
    b.style.height = "";
    jm("#webModuleContainer").css({
        overflow: "hidden"
    });
    var e = 0,
        a = b.clientHeight,
        c = document.documentElement.clientHeight,
        f = jm("#g_web>div");
    for (var d = 0; d < f.length; d++) {
        e += f[d].clientHeight
    }
    if (e <= c) {
        b.style.height = (c - e) + a + "px"
    } else {
        b.style.height = ""
    }
};
Mobi.autoSetNavBarHeight = function(a) {
    var f = Mobi.getPreviewObject("webHeader").offsetHeight,
        d = Mobi.getPreviewObject("webTips") ? Mobi.getPreviewObject("webTips").offsetHeight : 0,
        c = 0,
        e = 4 + parseInt(jm(Mobi.getPreviewObject("navbar")).css("bottom").replace("px", ""));
    if (jm.os.iphone) {
        if (a == 4) {
            c = Mobi.getPreviewWindow().innerHeight - e - d;
            if (c > 370) {
                c = 370
            }
        }
    } else {
        if (jm.os.android) {
            c = Mobi.getPreviewWindow().screen.height / Mobi.getPreviewWindow().devicePixelRatio - Mobi.getPreviewWindow().screenTop;
            if (a == 4) {
                c = c - e;
                if (c > 370) {
                    c = 370
                }
            }
        } else {
            if (!jm.os.supportsTouch) {
                c = Mobi.getPreviewWindow().innerHeight - d;
                if (a == 4) {
                    c = Mobi.getPreviewWindow().innerHeight - e;
                    if (c > 350) {
                        c = 350
                    }
                }
            }
        }
    }
    if (c > 0) {
        if (a == 4) {
            var b = parseInt(jm("#navbarList").height()) + parseInt(jm("#navbarList").css("padding-bottom").replace("px", ""));
            if (b > c) {
                jm("#navbar").css("height", c + "px")
            }
        } else {
            jm("#navbar").css("height", c + "px")
        }
    }
};
Mobi.autoSetNavBarBottom = function(a) {
    if (a == 4) {
        if (Fai.top._openOnlineService) {
            jm("#navButton").css("bottom", (parseInt(jm("#customerServiceDiv").height()) + 15) / _htmlFontSize + "rem");
            jm("#navbar").css("bottom", (parseInt(jm("#customerServiceDiv").height()) + 35) / _htmlFontSize + "rem")
        } else {
            jm("#navButton").removeAttr("style");
            jm("#navbar").removeAttr("style")
        }
    } else {
        jm("#navButton").removeAttr("style");
        jm("#navbar").removeAttr("style")
    }
};
Mobi.handlePirtureSize = function() {
    var b = document.getElementById("webContainerBox");
    if (!b) {
        return
    }
    var c = b.querySelectorAll("img");
    for (var a = 0; a < c.length; a++) {
        if (c[a].offsetWidth <= 0 || c[a].offsetHeight <= 0) {
            c[a].style.visibility = "hidden"
        }
        c[a].onload = function() {
            this.style.visibility = "visible"
        }
    }
};
Mobi.fixImageHeight = function(b, d) {
    if (!b) {
        return
    }
    var c = document.getElementById(b);
    if (!c) {
        return
    }
    var a = c.querySelectorAll("img"),
        f = 1,
        k = 0,
        j = a.length;
    for (var e = 0; e < j; e++) {
        (function(m) {
            var n = new Image();
            n.src = a[m].src;
            n.onload = function() {
                if (n.height > k) {
                    k = n.height
                }
                h()
            };
            if (n.height != 0) {
                if (n.height > k) {
                    k = n.height
                }
            }
            if (f % 2 === 0 || m === a.length - 1) {
                if (k > 0 && k < 160) {
                    if (f % 2 === 1 && m === a.length - 1) {
                        a[m].parentNode.style.height = (k / _htmlFontSize) + "rem"
                    }
                    if (f % 2 === 0) {
                        for (var l = 0; l < 2; l++) {
                            a[m + l - 1].parentNode.style.height = (k / _htmlFontSize) + "rem"
                        }
                    }
                }
                k = 0
            }++f
        })(e)
    }
    if (d) {
        h()
    }

    function h() {
        var m = 0,
            l = 0,
            n = jm("#" + b).find(".photoListImg"),
            i = jm("#" + b).find(".imgClass_160");
        n.each(function() {
            l = parseInt(jm(this).height());
            if (l > m) {
                m = l
            }
        });
        if (m != 0) {
            i.css("height", (m / _htmlFontSize) + "rem")
        }
    }
};
Mobi.initTemplate = function(a) {
    var b = Mobi.getJQMobi();
    if (a == 0 || a == 1 || a == 6) {
        Mobi.showNavItemContainer()
    } else {
        if (a == 2 || a == 4 || a == 5) {
            Mobi.autoSetNavBarBottom(a);
            Mobi.navSwipeMenu(a)
        }
    }
    Mobi.handlePirtureSize()
};
Mobi.fixGwebHieght = function() {
    var a = Mobi.getPreviewWindow().innerHeight,
        c = Mobi.getPreviewObject("g_web"),
        b = c.offsetHeight;
    if (a > b) {
        c.style.height = a + "px"
    }
};
Mobi.initMobiPage = function(a) {
    if (!jm.os.supportsTouch) {
        Mobi.resetHtmlFontSize()
    }
    Mobi.initTemplate2(a);
    Mobi.initLocater();
    Mobi.unloadForATag();
    Mobi.initOnlineServiceWidth();
    window.onresize = function() {
        if (!Mobi.bannerAnimate.init(Fai.top._bannerData)) {
            Mobi.initBannerDefaultDom(Fai.top._bannerData);
            Mobi.initSwipe("bannerSwipe", Fai.top._bannerData)
        }
        Mobi.resetHtmlFontSize();
        Mobi.logoSizeCompressByMargin();
        Mobi.titlePositionRefreshByLogo();
        Mobi.autoFixGWebTop(Fai.top._templateLayoutId);
        Mobi.initBgmPosition()
    };
    Mobi.initForms();
    Mobi.fixFontSizeDeviation();
    Mobi.onlineServiceInputWord();
    Mobi.closeLoading()
};
Mobi.resetHtmlFontSize = function() {
    var a = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
    if (a > 640) {
        a = 640
    }
    document.documentElement.style.fontSize = a * 1 / 16 + "px";
    _htmlFontSize = a * 1 / 16
};
Mobi.closeLoading = function() {
    var a = document.getElementById("webLoading");
    if (!a) {
        return
    }
    a.style.display = "none"
};
Mobi.showLoading = function() {
    var a = document.getElementById("webLoading");
    if (!a) {
        return
    }
    a.style.display = "block"
};
Mobi.MobiOSType = {
    UNKNOWN: 0,
    IPHONE: 1,
    IPAD: 2,
    WEBOS: 3,
    ANDROID: 4,
    ANDROIDICS: 5,
    BLACKBERRY: 6,
    WINDOW_DESKTOP: 7,
    MAC: 8,
    ANDROID_2_3: 9,
    ANDROID_4_0: 10,
    ANDROID_4_1: 11,
    ANDROID_4_2: 12,
    ANDROID_4_3: 13,
    ANDROID_4_4: 14,
    ANDROID_5_0: 15,
    IOS_5_0: 16,
    IOS_5_1: 17,
    IOS_6_0: 18,
    IOS_6_1: 19,
    IOS_7_0: 20,
    IOS_7_1: 21,
    IOS_8_0: 22,
    IOS_8_1: 23
};
Mobi.getMobiOSType = function() {
    if (jm.os.IOS_5_0) {
        return Mobi.MobiOSType.IOS_5_0
    } else {
        if (jm.os.IOS_5_1) {
            return Mobi.MobiOSType.IOS_5_1
        } else {
            if (jm.os.IOS_6_0) {
                return Mobi.MobiOSType.IOS_6_0
            } else {
                if (jm.os.IOS_6_1) {
                    return Mobi.MobiOSType.IOS_6_1
                } else {
                    if (jm.os.IOS_7_0) {
                        return Mobi.MobiOSType.IOS_7_0
                    } else {
                        if (jm.os.IOS_7_1) {
                            return Mobi.MobiOSType.IOS_7_1
                        } else {
                            if (jm.os.IOS_8_0) {
                                return Mobi.MobiOSType.IOS_8_0
                            } else {
                                if (jm.os.IOS_8_1) {
                                    return Mobi.MobiOSType.IOS_8_1
                                } else {
                                    if (jm.os.ANDROID_2_3) {
                                        return Mobi.MobiOSType.ANDROID_2_3
                                    } else {
                                        if (jm.os.ANDROID_4_0) {
                                            return Mobi.MobiOSType.ANDROID_4_0
                                        } else {
                                            if (jm.os.ANDROID_4_1) {
                                                return Mobi.MobiOSType.ANDROID_4_1
                                            } else {
                                                if (jm.os.ANDROID_4_2) {
                                                    return Mobi.MobiOSType.ANDROID_4_2
                                                } else {
                                                    if (jm.os.ANDROID_4_3) {
                                                        return Mobi.MobiOSType.ANDROID_4_3
                                                    } else {
                                                        if (jm.os.ANDROID_4_4) {
                                                            return Mobi.MobiOSType.ANDROID_4_4
                                                        } else {
                                                            if (jm.os.ANDROID_5_0) {
                                                                return Mobi.MobiOSType.ANDROID_5_0
                                                            } else {
                                                                if (jm.os.iphone) {
                                                                    return Mobi.MobiOSType.IPHONE
                                                                } else {
                                                                    if (jm.os.ipad) {
                                                                        return Mobi.MobiOSType.IPAD
                                                                    } else {
                                                                        if (jm.os.webos) {
                                                                            return Mobi.MobiOSType.WEBOS
                                                                        } else {
                                                                            if (jm.os.androidICS) {
                                                                                return Mobi.MobiOSType.ANDROIDICS
                                                                            } else {
                                                                                if (jm.os.android) {
                                                                                    return Mobi.MobiOSType.ANDROID
                                                                                } else {
                                                                                    if (jm.os.blackberry) {
                                                                                        return Mobi.MobiOSType.BLACKBERRY
                                                                                    } else {
                                                                                        if (jm.os.WINDOW_DESKTOP) {
                                                                                            return Mobi.MobiOSType.WINDOW_DESKTOP
                                                                                        } else {
                                                                                            if (jm.os.MAC) {
                                                                                                return Mobi.MobiOSType.MAC
                                                                                            } else {
                                                                                                return Mobi.MobiOSType.UNKNOWN
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
Mobi.BrowserType = {
    UNKNOWN: 0,
    CHROME: 1,
    FIREFOX: 2,
    MSIE10: 3,
    WEBKIT: 4,
    MSIE9: 5,
    MSIE11: 6,
    OPERA: 7,
    WX_BROWSER: 8,
    UC_BROWSER: 9,
    QQ_BROWSER: 10,
    B360_BROWSER: 11,
    BD_BROWSER: 12,
    SG_BROWSER: 13,
    LB_BROWSER: 14,
    SAFARI: 15
};
Mobi.getBrowserType = function() {
    if (jm.os.WXBrowser) {
        return Mobi.BrowserType.WX_BROWSER
    } else {
        if (jm.os.UCBrowser) {
            return Mobi.BrowserType.UC_BROWSER
        } else {
            if (jm.os.MQQBrowser) {
                return Mobi.BrowserType.QQ_BROWSER
            } else {
                if (jm.os.LieBaoFast) {
                    return Mobi.BrowserType.LB_BROWSER
                } else {
                    if (jm.os.BaiDuBrowser) {
                        return Mobi.BrowserType.BD_BROWSER
                    } else {
                        if (jm.os.Sougou) {
                            return Mobi.BrowserType.SG_BROWSER
                        } else {
                            if (jm.os.B360Browser) {
                                return Mobi.BrowserType.B360_BROWSER
                            } else {
                                if (jm.os.ie10) {
                                    return Mobi.BrowserType.MSIE10
                                } else {
                                    if (jm.os.chrome) {
                                        return Mobi.BrowserType.CHROME
                                    } else {
                                        if (jm.os.fennec) {
                                            return Mobi.BrowserType.FIREFOX
                                        } else {
                                            if (jm.os.safari) {
                                                return Mobi.BrowserType.SAFARI
                                            } else {
                                                if (jm.os.ie9) {
                                                    return Mobi.BrowserType.MSIE9
                                                } else {
                                                    if (jm.os.ie11) {
                                                        return Mobi.BrowserType.MSIE11
                                                    } else {
                                                        if (jm.os.opera) {
                                                            return Mobi.BrowserType.OPERA
                                                        } else {
                                                            if (jm.os.webkit) {
                                                                return Mobi.BrowserType.WEBKIT
                                                            } else {
                                                                return Mobi.BrowserType.UNKNOWN
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
Mobi.Screen = function() {
    var a = window.devicePixelRatio || 1;
    return {
        width: window.screen.width * a,
        height: window.screen.height * a
    }
};
Mobi.ScreenType = {
    OTHER: 0,
    W320H480: 1,
    W480H800: 2,
    W480H854: 3,
    W720H1280: 4,
    WINDOW_SCREEN: 5,
    W240H320: 6,
    W600H800: 7,
    W540H960: 8,
    W640H960: 9,
    W768H1024: 10,
    W640H1136: 11,
    W720H1184: 12,
    W1440H2560: 13,
    W800H1280: 14,
    W750H1334: 15,
    W1080H1776: 16,
    W1080H1920: 17,
    W1536H2048: 18,
    W1280H720: 19
};
Mobi.getScreenType = function(b, a) {
    if (b == 320 && a == 480) {
        return Mobi.ScreenType.W320H480
    } else {
        if (b == 480 && a == 800) {
            return Mobi.ScreenType.W480H800
        } else {
            if (b == 480 && a == 854) {
                return Mobi.ScreenType.W480H854
            } else {
                if (b == 720 && a == 1280) {
                    return Mobi.ScreenType.W1720H1280
                } else {
                    if (b == 240 && a == 320) {
                        return Mobi.ScreenType.W240H320
                    } else {
                        if (b == 600 && a == 800) {
                            return Mobi.ScreenType.W600H800
                        } else {
                            if (b == 540 && a == 960) {
                                return Mobi.ScreenType.W540H960
                            } else {
                                if (b == 640 && a == 960) {
                                    return Mobi.ScreenType.W640H960
                                } else {
                                    if (b == 768 && a == 1024) {
                                        return Mobi.ScreenType.W768H1024
                                    } else {
                                        if (b == 640 && a == 1136) {
                                            return Mobi.ScreenType.W640H1136
                                        } else {
                                            if (b == 720 && a == 1184) {
                                                return Mobi.ScreenType.W720H1184
                                            } else {
                                                if (b == 1440 && a == 2560) {
                                                    return Mobi.ScreenType.W1440H2560
                                                } else {
                                                    if (b == 800 && a == 1280) {
                                                        return Mobi.ScreenType.W800H1280
                                                    } else {
                                                        if (b == 750 && a == 1334) {
                                                            return Mobi.ScreenType.W750H1334
                                                        } else {
                                                            if (b == 1080 && a == 1776) {
                                                                return Mobi.ScreenType.W1080H1776
                                                            } else {
                                                                if (b == 1080 && a == 1920) {
                                                                    return Mobi.ScreenType.W1080H1920
                                                                } else {
                                                                    if (b == 1536 && a == 2048) {
                                                                        return Mobi.ScreenType.W1536H2048
                                                                    } else {
                                                                        if (b == 1280 && a == 720) {
                                                                            return Mobi.ScreenType.W1280H720
                                                                        } else {
                                                                            return Mobi.ScreenType.OTHER
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
Mobi.statisticalMobiVisitors = function(b) {
    if (!b) {
        return
    }
    var i = {
        colId: -1,
        pdId: -1,
        ndId: -1
    };
    var c = jm.extend({}, i, b);
    if (c.colId == null || c.colId == "" || c.colId < 0) {
        c.colId = -1
    }
    if (c.pdId == null || c.pdId == "" || c.pdId < 0) {
        c.pdId = -1
    }
    if (c.ndId == null || c.ndId == "" || c.ndId < 0) {
        c.ndId = -1
    }
    var f = "ajax/statistics_h.jsp?cmd=visited";
    var h = [];
    var a, e, d = false;
    if (Fai.top._manageMode) {
        a = Fai.top.Fai.getBrowserType();
        e = Fai.top.Fai.getScreenType(Fai.top.Fai.Screen().width, Fai.top.Fai.Screen().height)
    } else {
        a = Mobi.getBrowserType();
        e = Mobi.getScreenType(Mobi.Screen().width, Mobi.Screen().height);
        d = jm.os.WINDOW_DESKTOP
    }
    h.push("&colId=" + c.colId);
    h.push("&pdId=" + c.pdId);
    h.push("&ndId=" + c.ndId);
    h.push("&windowDesktop=" + d);
    h.push("&mobiOSType=" + Mobi.getMobiOSType());
    h.push("&browserType=" + a);
    h.push("&screenType=" + e);
    h.push("&rf=" + jm.encodeUrl(c.rf));
    h.push("&sc=" + c.sc);
    jm.ajax({
        type: "post",
        url: "ajax/mobistatistics_h.jsp?cmd=visited",
        data: h.join(""),
        success: function(j) {}
    })
};

Mobi.report = function(a) {
    /*
    setTimeout(function() {
        if (window.performance) {
            var d = performance.timing;
            var m = d.fetchStart - d.navigationStart;
            var h = d.redirectEnd - d.redirectStart;
            var j = d.domainLookupStart - d.fetchStart;
            var n = d.unloadEventEnd - d.unloadEventStart;
            var b = d.domainLookupEnd - d.domainLookupStart;
            var e = d.connectEnd - d.connectStart;
            var f = d.responseEnd - d.requestStart;
            var o = d.domInteractive - d.responseEnd;
            var p = d.domComplete - d.domInteractive;
            var l = d.loadEventEnd - d.loadEventStart;
            var i = d.loadEventEnd - d.navigationStart;
            var k = [];
            k.push("&dt=" + b);
            k.push("&ct=" + e);
            k.push("&rt=" + f);
            k.push("&wt=" + o);
            k.push("&pt=" + p);
            k.push("&bt=" + Mobi.getBrowserType());
            var c = "ajax/mobistatistics_h.jsp?cmd=report";
            jm.ajax({
                url: c,
                type: "post",
                cache: false,
                data: k.join(""),
                success: function(q) {}
            })
        }
    }, 500)
    */
};

Mobi.scrollToTop = function(b) {
    var c = document.getElementById("g_body"),
        e = c.scrollTop,
        d = 1500;
    var a = document.createElement("div");
    a.setAttribute("id", "scrollHideDiv");
    a.style.cssText = "position:absolute;width:100%;height:100%;top:0;z-index:9999;";
    c.style.marginTop = -e + "px";
    window.scrollTo(0, 0);
    c.appendChild(a);
    c.style[jm.feat.cssPrefix + "Transition"] = "margin-top " + d + "ms cubic-bezier(0.175, 0.885, 0.320, 1.025)";
    c.style.marginTop = 0 + "px";
    setTimeout(function() {
        c.style[jm.feat.cssPrefix + "Transition"] = "none";
        var f = document.getElementById("scrollHideDiv");
        c.removeChild(f)
    }, d);
    Mobi.scrollBgmPosition()
};
Mobi.logDog = function(b, a) {
    jm.ajax({
        type: "get",
        url: "/ajax/log_h.jsp?cmd=dog&dogId=" + jm.encodeUrl(b) + "&dogSrc=" + jm.encodeUrl(a)
    })
};
Mobi.logProf = function(b, a) {
    jm.ajax({
        type: "get",
        url: "/ajax/log_h.jsp?cmd=prof&profId=" + jm.encodeUrl(b) + "&profVal=" + jm.encodeUrl(a)
    })
};
Mobi.mobiHideScroll = function() {
    var c = document.getElementById("g_body");
    var d = document.getElementsByTagName("html")[0];
    c.style.overflowY = "hidden";
    d.style.overflowY = "hidden";
    if (Fai.top._manageMode) {
        iFrameObj = window.parent.document.getElementById("mobiReviewPageFrame");
        var b = Fai.top.Fai.getScrollWidth();
        var a = iFrameObj.clientWidth - b;
        iFrameObj.style.position = "absolute";
        iFrameObj.style.left = "0px";
        iFrameObj.setAttribute("width", a + "px")
    }
};
Mobi.mobiShowScroll = function() {
    var a = document.getElementById("g_body");
    var b = document.getElementsByTagName("html")[0];
    a.style.overflowY = "";
    b.style.overflowY = "";
    if (Fai.top._manageMode) {
        iFrameObj = window.parent.document.getElementById("mobiReviewPageFrame");
        iFrameObj.style.position = "";
        iFrameObj.style.left = "";
        iFrameObj.setAttribute("width", "100%")
    }
};
Mobi.bindBodyScrollEvent = function() {
    window.onscroll = null;
    window.onscroll = function() {
        Mobi.scrollBgmPosition()
    }
};
Mobi.isWechat = function() {
    var a = window.navigator.userAgent.toLowerCase();
    if (a.match(/MicroMessenger/i) == "micromessenger") {
        return true
    } else {
        return false
    }
};
Mobi.isMX = function() {
    var b = window.navigator.userAgent.toLowerCase();
    var c = ["mx4 pro"];

    function a(d) {
        return b.indexOf(d) > -1
    }
    return c.some(a)
};