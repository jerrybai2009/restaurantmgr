if (!window.jm || typeof(jm) !== "function") {
    var jm = (function(O) {
        var r, j = O.document,
            P = [],
            v = P.slice,
            Q = {},
            q = [],
            k = 1,
            n = [],
            d = 1,
            M = /^\s*<(\w+)[^>]*>/,
            s = {},
            B = {};

        function J(Y, Z, ab) {
            var ac = j.createDocumentFragment();
            if (ab) {
                for (var aa = Y.length - 1; aa >= 0; aa--) {
                    ac.insertBefore(Y[aa], ac.firstChild)
                }
                Z.insertBefore(ac, Z.firstChild)
            } else {
                for (var aa = 0; aa < Y.length; aa++) {
                    ac.appendChild(Y[aa])
                }
                Z.appendChild(ac)
            }
            ac = null
        }

        function U(Y) {
            return Y in Q ? Q[Y] : (Q[Y] = new RegExp("(^|\\s)" + Y + "(\\s|$)"))
        }

        function f(Y) {
            for (var Z = 0; Z < Y.length; Z++) {
                if (Y.indexOf(Y[Z]) != Z) {
                    Y.splice(Z, 1);
                    Z--
                }
            }
            return Y
        }

        function S(Z, aa) {
            var Y = [];
            if (Z == r) {
                return Y
            }
            for (; Z; Z = Z.nextSibling) {
                if (Z.nodeType == 1 && Z !== aa) {
                    Y.push(Z)
                }
            }
            return Y
        }
        var D = function(Z, aa) {
            this.length = 0;
            if (!Z) {
                return this
            } else {
                if (Z instanceof D && aa == r) {
                    return Z
                } else {
                    if (p.isFunction(Z)) {
                        return p(j).ready(Z)
                    } else {
                        if (p.isArray(Z) && Z.length != r) {
                            for (var Y = 0; Y < Z.length; Y++) {
                                this[this.length++] = Z[Y]
                            }
                            return this
                        } else {
                            if (p.isObject(Z) && p.isObject(aa)) {
                                if (Z.length == r) {
                                    if (Z.parentNode == aa) {
                                        this[this.length++] = Z
                                    }
                                } else {
                                    for (var Y = 0; Y < Z.length; Y++) {
                                        if (Z[Y].parentNode == aa) {
                                            this[this.length++] = Z[Y]
                                        }
                                    }
                                }
                                return this
                            } else {
                                if (p.isObject(Z) && aa == r) {
                                    this[this.length++] = Z;
                                    return this
                                } else {
                                    if (aa !== r) {
                                        if (aa instanceof D) {
                                            return aa.find(Z)
                                        }
                                    } else {
                                        aa = j
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return this.selector(Z, aa)
        };
        var p = function(Y, Z) {
            return new D(Y, Z)
        };

        function V(Y, aa) {
            try {
                return aa.querySelectorAll(Y)
            } catch (Z) {
                return []
            }
        }

        function I(Y, aa) {
            Y = Y.trim();
            if (Y[0] === "#" && Y.indexOf(".") == -1 && Y.indexOf(" ") === -1 && Y.indexOf(">") === -1) {
                if (aa == j) {
                    T(aa.getElementById(Y.replace("#", "")), this)
                } else {
                    T(V(Y, aa), this)
                }
            } else {
                if (Y[0] === "<" && Y[Y.length - 1] === ">") {
                    var Z = j.createElement("div");
                    Z.innerHTML = Y.trim();
                    T(Z.childNodes, this)
                } else {
                    T((V(Y, aa)), this)
                }
            }
            return this
        }

        function T(Y, aa) {
            if (!Y) {
                return
            }
            if (Y.nodeType) {
                return aa[aa.length++] = Y
            }
            for (var Z = 0, ab = Y.length; Z < ab; Z++) {
                aa[aa.length++] = Y[Z]
            }
        }
        p.fkEval = function(Y) {
            return function(Z) {
                return O["eval"].call(O, Z)
            }(Y)
        };
        p.isJm = function(Y) {
            return Y instanceof D
        };
        p.map = function(ac, ad) {
            var ab, Y = [],
                aa, Z;
            if (p.isArray(ac)) {
                for (aa = 0; aa < ac.length; aa++) {
                    ab = ad(ac[aa], aa);
                    if (ab !== r) {
                        Y.push(ab)
                    }
                }
            } else {
                if (p.isObject(ac)) {
                    for (Z in ac) {
                        if (!ac.hasOwnProperty(Z)) {
                            continue
                        }
                        ab = ad(ac[Z], Z);
                        if (ab !== r) {
                            Y.push(ab)
                        }
                    }
                }
            }
            return p([Y])
        };
        p.each = function(aa, ab) {
            var Z, Y;
            if (p.isArray(aa)) {
                for (Z = 0; Z < aa.length; Z++) {
                    if (ab(Z, aa[Z]) === false) {
                        return aa
                    }
                }
            } else {
                if (p.isObject(aa)) {
                    for (Y in aa) {
                        if (!aa.hasOwnProperty(Y)) {
                            continue
                        }
                        if (ab(Y, aa[Y]) === false) {
                            return aa
                        }
                    }
                }
            }
            return aa
        };
        p.extend = function(Z) {
            if (Z == r) {
                Z = this
            }
            if (arguments.length === 1) {
                for (var Y in Z) {
                    this[Y] = Z[Y]
                }
                return this
            } else {
                v.call(arguments, 1).forEach(function(ab) {
                    for (var aa in ab) {
                        Z[aa] = ab[aa]
                    }
                })
            }
            return Z
        };
        p.isArray = function(Y) {
            return Y instanceof Array && Y.push != r
        };
        p.isFunction = function(Y) {
            return typeof Y === "function" && !(Y instanceof RegExp)
        };
        p.isObject = function(Y) {
            return typeof Y === "object"
        };
        p.fn = D.prototype = {
            constructor: D,
            forEach: P.forEach,
            reduce: P.reduce,
            push: P.push,
            indexOf: P.indexOf,
            concat: P.concat,
            selector: I,
            oldElement: r,
            slice: P.slice,
            setupOld: function(Y) {
                if (Y == r) {
                    return p()
                }
                Y.oldElement = this;
                return Y
            },
            map: function(aa) {
                var ab, Y = [],
                    Z;
                for (Z = 0; Z < this.length; Z++) {
                    ab = aa(Z, this[Z]);
                    if (ab !== r) {
                        Y.push(ab)
                    }
                }
                return p([Y])
            },
            each: function(Y) {
                this.forEach(function(aa, Z) {
                    Y.call(aa, Z, aa)
                });
                return this
            },
            ready: function(Y) {
                if (j.readyState === "complete" || j.readyState === "loaded" || (!p.os.ie10 && j.readyState === "interactive")) {
                    Y()
                } else {
                    if (O.addEventListener) {
                        j.addEventListener("DOMContentLoaded", Y, false)
                    } else {
                        if (O.attachEvent) {
                            O.attachEvent(event, Y)
                        }
                    }
                }
                return this
            },
            find: function(ab) {
                if (this.length === 0) {
                    return this
                }
                var Y = [];
                var ac;
                for (var aa = 0; aa < this.length; aa++) {
                    ac = (p(ab, this[aa]));
                    for (var Z = 0; Z < ac.length; Z++) {
                        Y.push(ac[Z])
                    }
                }
                return p(f(Y))
            },
            html: function(Z, aa) {
                if (this.length === 0) {
                    return this
                }
                if (Z === r) {
                    return this[0].innerHTML
                }
                for (var Y = 0; Y < this.length; Y++) {
                    if (aa !== false) {
                        p.cleanUpContent(this[Y], false, true)
                    }
                    this[Y].innerHTML = Z
                }
                return this
            },
            text: function(Z) {
                if (this.length === 0) {
                    return this
                }
                if (Z === r) {
                    return this[0].textContent
                }
                for (var Y = 0; Y < this.length; Y++) {
                    this[Y].textContent = Z
                }
                return this
            },
            css: function(ac, ad, af) {
                var ae = af != r ? af : this[0];
                var aa = function(ag) {
                    return ag.replace(/-([\da-z])/gi, function(ah, ai) {
                        return (ai + "").toUpperCase()
                    })
                };
                if (this.length === 0) {
                    return this
                }
                if (ad == r && typeof(ac) === "string") {
                    var ab = O.getComputedStyle(ae, null);
                    return ae.style[ac] ? ae.style[ac] : ab.getPropertyValue(ac)
                }
                for (var Z = 0; Z < this.length; Z++) {
                    if (p.isObject(ac)) {
                        for (var Y in ac) {
                            Y = aa(Y);
                            this[Z].style[Y] = ac[Y]
                        }
                    } else {
                        ac = aa(ac);
                        this[Z].style[ac] = ad
                    }
                }
                return this
            },
            vendorCss: function(Y, Z, aa) {
                return this.css("-" + p.feat.cssPrefix + "-" + Y, Z, aa)
            },
            empty: function() {
                for (var Y = 0; Y < this.length; Y++) {
                    p.cleanUpContent(this[Y], false, true);
                    this[Y].textContent = ""
                }
                return this
            },
            hide: function() {
                if (this.length === 0) {
                    return this
                }
                for (var Y = 0; Y < this.length; Y++) {
                    if (this.css("display", null, this[Y]) != "none") {
                        this[Y].setAttribute("jqmOldStyle", this.css("display", null, this[Y]));
                        this[Y].style.display = "none"
                    }
                }
                return this
            },
            show: function() {
                if (this.length === 0) {
                    return this
                }
                for (var Y = 0; Y < this.length; Y++) {
                    if (this.css("display", null, this[Y]) == "none") {
                        this[Y].style.display = this[Y].getAttribute("jqmOldStyle") ? this[Y].getAttribute("jqmOldStyle") : "block";
                        this[Y].removeAttribute("jqmOldStyle")
                    }
                }
                return this
            },
            toggle: function(Z) {
                var Y = Z === true ? true : false;
                for (var aa = 0; aa < this.length; aa++) {
                    if (O.getComputedStyle(this[aa])["display"] !== "none" || (Z !== r && Y === false)) {
                        this[aa].setAttribute("jqmOldStyle", this[aa].style.display);
                        this[aa].style.display = "none"
                    } else {
                        this[aa].style.display = this[aa].getAttribute("jqmOldStyle") != r ? this[aa].getAttribute("jqmOldStyle") : "block";
                        this[aa].removeAttribute("jqmOldStyle")
                    }
                }
                return this
            },
            val: function(Z) {
                if (this.length === 0) {
                    return (Z === r) ? r : this
                }
                if (Z == r) {
                    return this[0].value
                }
                for (var Y = 0; Y < this.length; Y++) {
                    this[Y].value = Z
                }
                return this
            },
            attr: function(Y, ab) {
                if (this.length === 0) {
                    return (ab === r) ? r : this
                }
                if (ab === r && !p.isObject(Y)) {
                    var ac = (this[0].jqmCacheId && s[this[0].jqmCacheId][Y]) ? (this[0].jqmCacheId && s[this[0].jqmCacheId][Y]) : this[0].getAttribute(Y);
                    return ac
                }
                for (var aa = 0; aa < this.length; aa++) {
                    if (p.isObject(Y)) {
                        for (var Z in Y) {
                            p(this[aa]).attr(Z, Y[Z])
                        }
                    } else {
                        if (p.isArray(ab) || p.isObject(ab) || p.isFunction(ab)) {
                            if (!this[aa].jqmCacheId) {
                                this[aa].jqmCacheId = p.uuid()
                            }
                            if (!s[this[aa].jqmCacheId]) {
                                s[this[aa].jqmCacheId] = {}
                            }
                            s[this[aa].jqmCacheId][Y] = ab
                        } else {
                            if (ab == null && ab !== r) {
                                this[aa].removeAttribute(Y);
                                if (this[aa].jqmCacheId && s[this[aa].jqmCacheId][Y]) {
                                    delete s[this[aa].jqmCacheId][Y]
                                }
                            } else {
                                this[aa].setAttribute(Y, ab)
                            }
                        }
                    }
                }
                return this
            },
            removeAttr: function(Y) {
                var aa = this;
                for (var Z = 0; Z < this.length; Z++) {
                    Y.split(/\s+/g).forEach(function(ab) {
                        aa[Z].removeAttribute(ab);
                        if (aa[Z].jqmCacheId && s[aa[Z].jqmCacheId][Y]) {
                            delete s[aa[Z].jqmCacheId][Y]
                        }
                    })
                }
                return this
            },
            prop: function(ad, ab) {
                if (this.length === 0) {
                    return (ab === r) ? r : this
                }
                if (ab === r && !p.isObject(ad)) {
                    var aa;
                    var ac = (this[0].jqmCacheId && B[this[0].jqmCacheId][ad]) ? (this[0].jqmCacheId && B[this[0].jqmCacheId][ad]) : !(aa = this[0][ad]) && ad in this[0] ? this[0][ad] : aa;
                    return ac
                }
                for (var Z = 0; Z < this.length; Z++) {
                    if (p.isObject(ad)) {
                        for (var Y in ad) {
                            p(this[Z]).prop(Y, ad[Y])
                        }
                    } else {
                        if (p.isArray(ab) || p.isObject(ab) || p.isFunction(ab)) {
                            if (!this[Z].jqmCacheId) {
                                this[Z].jqmCacheId = p.uuid()
                            }
                            if (!B[this[Z].jqmCacheId]) {
                                B[this[Z].jqmCacheId] = {}
                            }
                            B[this[Z].jqmCacheId][ad] = ab
                        } else {
                            if (ab == null && ab !== r) {
                                p(this[Z]).removeProp(ad)
                            } else {
                                this[Z][ad] = ab
                            }
                        }
                    }
                }
                return this
            },
            removeProp: function(aa) {
                var Z = this;
                for (var Y = 0; Y < this.length; Y++) {
                    aa.split(/\s+/g).forEach(function(ab) {
                        if (Z[Y][ab]) {
                            delete Z[Y][ab]
                        }
                        if (Z[Y].jqmCacheId && B[Z[Y].jqmCacheId][aa]) {
                            delete B[Z[Y].jqmCacheId][aa]
                        }
                    })
                }
                return this
            },
            remove: function(Y) {
                var Z = p(this).filter(Y);
                if (Z == r) {
                    return this
                }
                for (var aa = 0; aa < Z.length; aa++) {
                    p.cleanUpContent(Z[aa], true, true);
                    if (typeof(Z[aa].parentNode) != "undefined" && Z[aa].parentNode != null) {
                        Z[aa].parentNode.removeChild(Z[aa])
                    }
                }
                return this
            },
            addClass: function(Z) {
                for (var aa = 0; aa < this.length; aa++) {
                    var Y = this[aa].className;
                    var ac = [];
                    var ab = this;
                    Z.split(/\s+/g).forEach(function(ad) {
                        if (!ab.hasClass(ad, ab[aa])) {
                            ac.push(ad)
                        }
                    });
                    this[aa].className += (Y ? " " : "") + ac.join(" ");
                    this[aa].className = this[aa].className.trim()
                }
                return this
            },
            removeClass: function(Y) {
                for (var Z = 0; Z < this.length; Z++) {
                    if (Y == r) {
                        this[Z].className = "";
                        return this
                    }
                    var aa = this[Z].className;
                    Y.split(/\s+/g).forEach(function(ab) {
                        aa = aa.replace(U(ab), " ")
                    });
                    if (aa.length > 0) {
                        this[Z].className = aa.trim()
                    } else {
                        this[Z].className = ""
                    }
                }
                return this
            },
            replaceClass: function(Z, Y) {
                for (var aa = 0; aa < this.length; aa++) {
                    if (Z == r) {
                        this[aa].className = Y;
                        continue
                    }
                    var ab = this[aa].className;
                    Z.split(/\s+/g).concat(Y.split(/\s+/g)).forEach(function(ac) {
                        ab = ab.replace(U(ac), " ")
                    });
                    ab = ab.trim();
                    if (ab.length > 0) {
                        this[aa].className = (ab + " " + Y).trim()
                    } else {
                        this[aa].className = Y
                    }
                }
                return this
            },
            hasClass: function(Y, Z) {
                if (this.length === 0) {
                    return false
                }
                if (!Z) {
                    Z = this[0]
                }
                return U(Y).test(Z.className)
            },
            append: function(Z, aa) {
                if (Z && Z.length != r && Z.length === 0) {
                    return this
                }
                if (p.isArray(Z) || p.isObject(Z)) {
                    Z = p(Z)
                }
                var Y;
                for (Y = 0; Y < this.length; Y++) {
                    if (Z.length && typeof Z != "string") {
                        Z = p(Z);
                        J(Z, this[Y], aa)
                    } else {
                        var ab = M.test(Z) ? p(Z) : r;
                        if (ab == r || ab.length == 0) {
                            ab = j.createTextNode(Z)
                        }
                        if (ab.nodeName != r && ab.nodeName.toLowerCase() == "script" && (!ab.type || ab.type.toLowerCase() === "text/javascript")) {
                            p.fkEval.call(O, ab.innerHTML)
                        } else {
                            if (ab instanceof D) {
                                J(ab, this[Y], aa)
                            } else {
                                aa != r ? this[Y].insertBefore(ab, this[Y].firstChild) : this[Y].appendChild(ab)
                            }
                        }
                    }
                }
                return this
            },
            appendTo: function(Y, aa) {
                var Z = p(Y);
                Z.append(this);
                return this
            },
            prependTo: function(Y) {
                var Z = p(Y);
                Z.append(this, true);
                return this
            },
            prepend: function(Y) {
                return this.append(Y, 1)
            },
            insertBefore: function(Z, aa) {
                if (this.length == 0) {
                    return this
                }
                Z = p(Z).get(0);
                if (!Z) {
                    return this
                }
                for (var Y = 0; Y < this.length; Y++) {
                    aa ? Z.parentNode.insertBefore(this[Y], Z.nextSibling) : Z.parentNode.insertBefore(this[Y], Z)
                }
                return this
            },
            insertAfter: function(Y) {
                this.insertBefore(Y, true)
            },
            get: function(Y) {
                Y = Y == r ? 0 : Y;
                if (Y < 0) {
                    Y += this.length
                }
                return (this[Y]) ? this[Y] : r
            },
            offset: function() {
                if (this.length === 0) {
                    return this
                }
                if (this[0] == O) {
                    return {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: O.innerWidth,
                        height: O.innerHeight
                    }
                } else {
                    var Y = this[0].getBoundingClientRect()
                }
                return {
                    left: Y.left + O.pageXOffset,
                    top: Y.top + O.pageYOffset,
                    right: Y.right + O.pageXOffset,
                    bottom: Y.bottom + O.pageYOffset,
                    width: Y.right - Y.left,
                    height: Y.bottom - Y.top
                }
            },
            height: function(Z) {
                if (this.length === 0) {
                    return this
                }
                if (Z != r) {
                    return this.css("height", Z)
                }
                if (this[0] == this[0].window) {
                    return O.innerHeight
                }
                if (this[0].nodeType == this[0].DOCUMENT_NODE) {
                    return this[0].documentElement.offsetheight
                } else {
                    var Y = this.css("height").replace("px", "");
                    if (Y) {
                        return Y
                    } else {
                        return this.offset().height
                    }
                }
            },
            width: function(Z) {
                if (this.length === 0) {
                    return this
                }
                if (Z != r) {
                    return this.css("width", Z)
                }
                if (this[0] == this[0].window) {
                    return O.innerWidth
                }
                if (this[0].nodeType == this[0].DOCUMENT_NODE) {
                    return this[0].documentElement.offsetwidth
                } else {
                    var Y = this.css("width").replace("px", "");
                    if (Y) {
                        return Y
                    } else {
                        return this.offset().width
                    }
                }
            },
            parent: function(Y, aa) {
                if (this.length == 0) {
                    return this
                }
                var Z = [];
                for (var ac = 0; ac < this.length; ac++) {
                    var ab = this[ac];
                    while (ab.parentNode && ab.parentNode != j) {
                        Z.push(ab.parentNode);
                        if (ab.parentNode) {
                            ab = ab.parentNode
                        }
                        if (!aa) {
                            break
                        }
                    }
                }
                return this.setupOld(p(f(Z)).filter(Y))
            },
            parents: function(Y) {
                return this.parent(Y, true)
            },
            children: function(Y) {
                if (this.length == 0) {
                    return this
                }
                var Z = [];
                for (var aa = 0; aa < this.length; aa++) {
                    Z = Z.concat(S(this[aa].firstChild))
                }
                return this.setupOld(p((Z)).filter(Y))
            },
            siblings: function(Y) {
                if (this.length == 0) {
                    return this
                }
                var Z = [];
                for (var aa = 0; aa < this.length; aa++) {
                    if (this[aa].parentNode) {
                        Z = Z.concat(S(this[aa].parentNode.firstChild, this[aa]))
                    }
                }
                return this.setupOld(p(Z).filter(Y))
            },
            closest: function(Y, aa) {
                if (this.length == 0) {
                    return this
                }
                var Z = [],
                    ab = this[0];
                var ac = p(Y, aa);
                if (ac.length == 0) {
                    return p()
                }
                while (ab && ac.indexOf(ab) == -1) {
                    ab = ab !== aa && ab !== j && ab.parentNode
                }
                return p(ab)
            },
            filter: function(Y) {
                if (this.length == 0) {
                    return this
                }
                if (Y == r) {
                    return this
                }
                var Z = [];
                for (var aa = 0; aa < this.length; aa++) {
                    var ab = this[aa];
                    if (ab.parentNode && p(Y, ab.parentNode).indexOf(ab) >= 0) {
                        Z.push(ab)
                    }
                }
                return this.setupOld(p(f(Z)))
            },
            not: function(Y) {
                if (this.length == 0) {
                    return this
                }
                var Z = [];
                for (var aa = 0; aa < this.length; aa++) {
                    var ab = this[aa];
                    if (ab.parentNode && p(Y, ab.parentNode).indexOf(ab) == -1) {
                        Z.push(ab)
                    }
                }
                return this.setupOld(p(f(Z)))
            },
            data: function(Y, Z) {
                return this.attr("data-" + Y, Z)
            },
            end: function() {
                return this.oldElement != r ? this.oldElement : p()
            },
            clone: function(Y) {
                Y = Y === false ? false : true;
                if (this.length == 0) {
                    return this
                }
                var Z = [];
                for (var aa = 0; aa < this.length; aa++) {
                    Z.push(this[aa].cloneNode(Y))
                }
                return p(Z)
            },
            size: function() {
                return this.length
            },
            serialize: function() {
                if (this.length == 0) {
                    return ""
                }
                var Z = [];
                for (var Y = 0; Y < this.length; Y++) {
                    this.slice.call(this[Y].elements).forEach(function(ac) {
                        var ab = ac.getAttribute("type");
                        if (ac.nodeName.toLowerCase() != "fieldset" && !ac.disabled && ab != "submit" && ab != "reset" && ab != "button" && ((ab != "radio" && ab != "checkbox") || ac.checked)) {
                            if (ac.getAttribute("name")) {
                                if (ac.type == "select-multiple") {
                                    for (var aa = 0; aa < ac.options.length; aa++) {
                                        if (ac.options[aa].selected) {
                                            Z.push(ac.getAttribute("name") + "=" + encodeURIComponent(ac.options[aa].value))
                                        }
                                    }
                                } else {
                                    Z.push(ac.getAttribute("name") + "=" + encodeURIComponent(ac.value))
                                }
                            }
                        }
                    })
                }
                return Z.join("&")
            },
            eq: function(Y) {
                return p(this.get(Y))
            },
            index: function(Y) {
                return Y ? this.indexOf(p(Y)[0]) : this.parent().children().indexOf(this[0])
            },
            is: function(Y) {
                return !!Y && this.filter(Y).length > 0
            }
        };

        function b() {}
        p.ajaxSettings = {
            type: "GET",
            beforeSend: b,
            success: b,
            error: b,
            complete: b,
            context: r,
            timeout: 0,
            crossDomain: null
        };
        p.jsonP = function(Z) {
            var ac = "jsonp_callback" + (++d);
            var ab = "",
                aa;
            var Y = j.createElement("script");
            var ad = function() {
                p(Y).remove();
                if (O[ac]) {
                    O[ac] = b
                }
            };
            O[ac] = function(ae) {
                clearTimeout(ab);
                p(Y).remove();
                delete O[ac];
                Z.success.call(aa, ae)
            };
            Y.src = Z.url.replace(/=\?/, "=" + ac);
            if (Z.error) {
                Y.onerror = function() {
                    clearTimeout(ab);
                    Z.error.call(aa, "", "error")
                }
            }
            p("head").append(Y);
            if (Z.timeout > 0) {
                ab = setTimeout(function() {
                    Z.error.call(aa, "", "timeout")
                }, Z.timeout)
            }
            return {}
        };
        p.ajax = function(Y) {
            var af;
            try {
                var ab = Y || {};
                for (var ae in p.ajaxSettings) {
                    if (typeof(ab[ae]) == "undefined") {
                        ab[ae] = p.ajaxSettings[ae]
                    }
                }
                if (!ab.url) {
                    ab.url = O.location
                }
                if (!ab.contentType) {
                    ab.contentType = "application/x-www-form-urlencoded"
                }
                if (!ab.headers) {
                    ab.headers = {}
                }
                if (!("async" in ab) || ab.async !== false) {
                    ab.async = true
                }
                if (!ab.dataType) {
                    ab.dataType = "text/html"
                } else {
                    switch (ab.dataType) {
                        case "script":
                            ab.dataType = "text/javascript, application/javascript";
                            break;
                        case "json":
                            ab.dataType = "application/json";
                            break;
                        case "xml":
                            ab.dataType = "application/xml, text/xml";
                            break;
                        case "html":
                            ab.dataType = "text/html";
                            break;
                        case "text":
                            ab.dataType = "text/plain";
                            break;
                        default:
                            ab.dataType = "text/html";
                            break;
                        case "jsonp":
                            return p.jsonP(Y);
                            break
                    }
                }
                if (p.isObject(ab.data)) {
                    ab.data = p.param(ab.data)
                }
                ab.data = ab.data ? (ab.data + "&_TOKEN=" + p("#_TOKEN").attr("value")) : ("_TOKEN=" + p("#_TOKEN").attr("value"));
                if (ab.type.toLowerCase() === "get" && ab.data) {
                    if (ab.url.indexOf("?") === -1) {
                        ab.url += "?" + ab.data
                    } else {
                        ab.url += "&" + ab.data
                    }
                }
                if (/=\?/.test(ab.url)) {
                    return p.jsonP(ab)
                }
                if (ab.crossDomain === null) {
                    ab.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(ab.url) && RegExp.$2 != O.location.host
                }
                if (!ab.crossDomain) {
                    ab.headers = p.extend({
                        "X-Requested-With": "XMLHttpRequest"
                    }, ab.headers)
                }
                var ad;
                var aa = ab.context;
                var ag = /^([\w-]+:)\/\//.test(ab.url) ? RegExp.$1 : O.location.protocol;
                af = new O.XMLHttpRequest();
                af.onreadystatechange = function() {
                    var aj = ab.dataType;
                    if (af.readyState === 4) {
                        clearTimeout(ad);
                        var ah, ai = false;
                        if ((af.status >= 200 && af.status < 300) || af.status === 0 && ag == "file:") {
                            if (aj === "application/json" && !(/^\s*$/.test(af.responseText))) {
                                try {
                                    ah = JSON.parse(af.responseText)
                                } catch (ak) {
                                    ai = ak
                                }
                            } else {
                                if (aj === "application/xml, text/xml") {
                                    ah = af.responseXML
                                } else {
                                    if (aj == "text/html") {
                                        ah = af.responseText
                                    } else {
                                        ah = af.responseText
                                    }
                                }
                            }
                            if (af.status === 0 && ah.length === 0) {
                                ai = true
                            }
                            if (ai) {
                                ab.error.call(aa, af, "parsererror", ai)
                            } else {
                                ab.success.call(aa, ah, "success", af)
                            }
                        } else {
                            ai = true;
                            ab.error.call(aa, af, "error")
                        }
                        ab.complete.call(aa, af, ai ? "error" : "success")
                    }
                };
                af.open(ab.type, ab.url, ab.async);
                if (ab.withCredentials) {
                    af.withCredentials = true
                }
                if (ab.contentType) {
                    ab.headers["Content-Type"] = ab.contentType
                }
                for (var Z in ab.headers) {
                    af.setRequestHeader(Z, ab.headers[Z])
                }
                if (ab.beforeSend.call(aa, af, ab) === false) {
                    af.abort();
                    return false
                }
                if (ab.timeout > 0) {
                    ad = setTimeout(function() {
                        af.onreadystatechange = b;
                        af.abort();
                        ab.error.call(aa, af, "timeout")
                    }, ab.timeout)
                }
                af.send(ab.data)
            } catch (ac) {
                console.log(ac);
                ab.error.call(aa, af, "error", ac)
            }
            return af
        };
        p.get = function(Y, Z) {
            return this.ajax({
                url: Y,
                success: Z
            })
        };
        p.post = function(Z, aa, ab, Y) {
            if (typeof(aa) === "function") {
                ab = aa;
                aa = {}
            }
            if (Y === r) {
                Y = "html"
            }
            return this.ajax({
                url: Z,
                type: "POST",
                data: aa,
                dataType: Y,
                success: ab
            })
        };
        p.getJSON = function(Y, Z, aa) {
            if (typeof(Z) === "function") {
                aa = Z;
                Z = {}
            }
            return this.ajax({
                url: Y,
                data: Z,
                success: aa,
                dataType: "json"
            })
        };
        p.param = function(ac, aa) {
            var ad = [];
            if (ac instanceof D) {
                ac.each(function() {
                    var af = aa ? aa + "[]" : this.id,
                        ae = this.value;
                    ad.push((af) + "=" + encodeURIComponent(ae))
                })
            } else {
                for (var ab in ac) {
                    var Z = aa ? aa + "[" + ab + "]" : ab,
                        Y = ac[ab];
                    ad.push(p.isObject(Y) ? p.param(Y, Z) : (Z) + "=" + encodeURIComponent(Y))
                }
            }
            return ad.join("&")
        };
        p.parseJmJSON = function(Y) {
            return JSON.parse(Y)
        };
        p.parseXML = function(Y) {
            return (new DOMParser).parseFromString(Y, "text/xml")
        };

        function h(ab, ae) {
            ab.os = {};
            ab.os.MAC = ae.match(/Mac/) ? true : false;
            ab.os.WINDOW_DESKTOP = ae.match(/Windows NT/i) && !ae.match(/IEMobile/i) ? true : false;
            ab.os.webkit = ae.match(/WebKit\/([\d.]+)/) ? true : false;
            ab.os.android = ae.match(/(Android)\s+([\d.]+)/) || ae.match(/Silk-Accelerated/) ? true : false;
            ab.os.androidICS = ab.os.android && ae.match(/(Android)\s4/) ? true : false;
            ab.os.ipad = ae.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
            ab.os.iphone = !ab.os.ipad && ae.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
            ab.os.webos = ae.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
            ab.os.touchpad = ab.os.webos && ae.match(/TouchPad/) ? true : false;
            ab.os.ios = ab.os.ipad || ab.os.iphone;
            ab.os.playbook = ae.match(/PlayBook/) ? true : false;
            ab.os.blackberry = ab.os.playbook || ae.match(/BlackBerry/) ? true : false;
            ab.os.blackberry10 = ab.os.blackberry && ae.match(/Safari\/536/) ? true : false;
            ab.os.chrome = ae.match(/Chrome/) ? true : false;
            ab.os.safari = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) ? true : false;
            var ad = Y();
            ab.os.IOS_5_0 = ad[0] === 5 && ad[1] === 0 ? true : false;
            ab.os.IOS_5_1 = ad[0] === 5 && ad[1] === 1 ? true : false;
            ab.os.IOS_6_0 = ad[0] === 6 && ad[1] === 0 ? true : false;
            ab.os.IOS_6_1 = ad[0] === 6 && ad[1] === 1 ? true : false;
            ab.os.IOS_7_0 = ad[0] === 7 && ad[1] === 0 ? true : false;
            ab.os.IOS_7_1 = ad[0] === 7 && ad[1] === 1 ? true : false;
            ab.os.IOS_8_0 = ad[0] === 8 && ad[1] === 0 ? true : false;
            ab.os.IOS_8_1 = ad[0] === 8 && ad[1] === 1 ? true : false;
            var Z = aa();
            ab.os.ANDROID_2_3 = Z[0] === 2 && Z[1] === 3 ? true : false;
            ab.os.ANDROID_4_0 = Z[0] === 4 && Z[1] === 0 ? true : false;
            ab.os.ANDROID_4_1 = Z[0] === 4 && Z[1] === 1 ? true : false;
            ab.os.ANDROID_4_2 = Z[0] === 4 && Z[1] === 2 ? true : false;
            ab.os.ANDROID_4_3 = Z[0] === 4 && Z[1] === 3 ? true : false;
            ab.os.ANDROID_4_4 = Z[0] === 4 && Z[1] === 4 ? true : false;
            ab.os.ANDROID_5_0 = Z[0] === 5 && Z[1] === 0 ? true : false;
            ab.os.WXBrowser = ae.match(/micromessenger/i) ? true : false;
            ab.os.UCBrowser = ae.match(/UCBrowser/i) ? true : false;
            ab.os.MQQBrowser = ae.match(/MQQBrowser/i) ? true : false;
            ab.os.LieBaoFast = ae.match(/LieBaoFast/i) ? true : false;
            ab.os.BaiDuBrowser = ae.match(/baidubrowser|BIDUBrowser/i) ? true : false;
            ab.os.Sougou = ae.match(/Sougou/i) ? true : false;
            ab.os.B360Browser = ae.match(/360/) ? true : false;
            ab.os.opera = ae.match(/Opera/i) ? true : false;
            ab.os.fennec = ae.match(/fennec/i) ? true : ae.match(/Firefox/) ? true : false;
            ab.os.ie = (ae.match(/Trident/i) && (ae.match(/rv:11/i)) || (ae).match(/MSIE/i)) ? true : false;
            ab.os.ie9 = ae.match(/MSIE 9.0/i) ? true : false;
            ab.os.ie10 = ae.match(/MSIE 10.0/i) ? true : false;
            ab.os.ie11 = (ae.match(/Trident/i) && (ae.match(/rv:11/i)) || (ae).match(/MSIE 11.0/i)) ? true : false;
            ab.os.ieTouch = ab.os.ie && ae.toLowerCase().match(/touch/i) ? true : false;
            ab.os.supportsTouch = ((O.DocumentTouch && j instanceof O.DocumentTouch) || "ontouchstart" in j.documentElement);
            ab.feat = {};
            var ac = j.documentElement.getElementsByTagName("head")[0];
            ab.feat.nativeTouchScroll = typeof(ac.style["-webkit-overflow-scrolling"]) !== "undefined" && ab.os.ios;
            ab.feat.cssPrefix = ab.os.webkit ? "Webkit" : ab.os.fennec ? "Moz" : ab.os.ie ? "ms" : ab.os.opera ? "O" : "";
            ab.feat.cssTransformStart = !ab.os.opera ? "3d(" : "(";
            ab.feat.cssTransformEnd = !ab.os.opera ? ",0)" : ")";
            if (ab.os.android && !ab.os.webkit) {
                ab.os.android = false
            }

            function Y() {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    var af = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    return af ? [parseInt(af[1], 10), parseInt(af[2], 10), parseInt(af[3] || 0, 10)] : [0, 0]
                }
                return [0, 0]
            }

            function aa() {
                if (/Android/.test(navigator.userAgent)) {
                    var af = (navigator.userAgent).match(/Android (\d+).(\d+).?(\d+)?/);
                    return af ? [parseInt(af[1], 10), parseInt(af[2], 10), parseInt(af[3] || 0, 10)] : [0, 0]
                }
                return [0, 0]
            }
        }
        h(p, navigator.userAgent);
        p.__detectUA = h;
        if (typeof String.prototype.trim !== "function") {
            String.prototype.trim = function() {
                this.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/, "");
                return this
            }
        }
        p.getCookie = function(Y) {
            if (j.cookie.length > 0) {
                c_start = j.cookie.indexOf(Y + "=");
                if (c_start != -1) {
                    c_start = c_start + Y.length + 1;
                    c_end = j.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = j.cookie.length
                    }
                    return decodeURIComponent(j.cookie.substring(c_start, c_end))
                }
            }
            return ""
        };
        p.setCookie = function(Z, aa, Y) {
            var ab = new Date();
            ab.setDate(ab.getDate() + Y);
            j.cookie = Z + "=" + encodeURIComponent(aa) + ((Y == null) ? "" : ";expires=" + ab.toGMTString())
        };
        p.cookie = function(ab, ac, Z) {
            if (arguments.length > 1 && (ac === null || typeof ac !== "object")) {
                Z = p.extend({}, Z);
                if (ac === null) {
                    Z.expires = -1
                }
                if (typeof Z.expires === "number") {
                    var ae = Z.expires,
                        aa = Z.expires = new Date();
                    aa.setDate(aa.getDate() + ae)
                }
                return (j.cookie = [encodeURIComponent(ab), "=", Z.raw ? String(ac) : encodeURIComponent(String(ac)), Z.expires ? "; expires=" + Z.expires.toUTCString() : "", Z.path ? "; path=" + Z.path : "", Z.domain ? "; domain=" + Z.domain : "", Z.secure ? "; secure" : ""].join(""))
            }
            Z = ac || {};
            var Y, ad = Z.raw ? function(af) {
                return af
            } : decodeURIComponent;
            return (Y = new RegExp("(?:^|; )" + encodeURIComponent(ab) + "=([^;]*)").exec(j.cookie)) ? ad(Y[1]) : null
        };
        p.uuid = function() {
            var Y = function() {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return (Y() + Y() + "-" + Y() + "-" + Y() + "-" + Y() + "-" + Y() + Y() + Y())
        };
        p.getCssMatrix = function(Z) {
            if (Z == r) {
                return O.WebKitCSSMatrix || O.MSCSSMatrix || {
                        a: 0,
                        b: 0,
                        c: 0,
                        d: 0,
                        e: 0,
                        f: 0
                    }
            }
            try {
                if (O.WebKitCSSMatrix) {
                    return new WebKitCSSMatrix(O.getComputedStyle(Z).webkitTransform)
                } else {
                    if (O.MSCSSMatrix) {
                        return new MSCSSMatrix(O.getComputedStyle(Z).transform)
                    } else {
                        var Y = O.getComputedStyle(Z)[p.feat.cssPrefix + "Transform"].replace(/[^0-9\-.,]/g, "").split(",");
                        return {
                            a: +Y[0],
                            b: +Y[1],
                            c: +Y[2],
                            d: +Y[3],
                            e: +Y[4],
                            f: +Y[5]
                        }
                    }
                }
            } catch (aa) {
                return {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0,
                    e: 0,
                    f: 0
                }
            }
        };
        var c = {},
            C = 1;

        function z(Y) {
            return Y._jqmid || (Y._jqmid = C++)
        }

        function N(Z, ab, aa, Y) {
            ab = w(ab);
            if (ab.ns) {
                var ac = H(ab.ns)
            }
            return (c[z(Z)] || []).filter(function(ad) {
                return ad && (!ab.e || ad.e == ab.e) && (!ab.ns || ac.test(ad.ns)) && (!aa || ad.fn == aa || (typeof ad.fn === "function" && typeof aa === "function" && "" + ad.fn === "" + aa)) && (!Y || ad.sel == Y)
            })
        }

        function w(Y) {
            var Z = ("" + Y).split(".");
            return {
                e: Z[0],
                ns: Z.slice(1).sort().join(" ")
            }
        }

        function H(Y) {
            return new RegExp("(?:^| )" + Y.replace(" ", " .* ?") + "(?: |$)")
        }

        function u(Y, aa, Z) {
            if (p.isObject(Y)) {
                p.each(Y, Z)
            } else {
                if (typeof(Y) != "undefined" && Y != null) {
                    Y.split(/\s/).forEach(function(ab) {
                        Z(ab, aa)
                    })
                }
            }
        }

        function g(ab, aa, ac, Z, Y) {
            var ae = z(ab),
                ad = (c[ae] || (c[ae] = []));
            u(aa, ac, function(ai, ah) {
                var ag = Y && Y(ah, ai),
                    ak = ag || ah;
                var aj = function(am) {
                    var al = ak.apply(ab, [am].concat(am.data));
                    if (al === false) {
                        am.preventDefault()
                    }
                    return al
                };
                var af = p.extend(w(ai), {
                    fn: ah,
                    proxy: aj,
                    sel: Z,
                    del: ag,
                    i: ad.length
                });
                ad.push(af);
                ab.addEventListener(af.e, aj, false)
            })
        }

        function E(aa, Z, ab, Y) {
            var ac = z(aa);
            u(Z || "", ab, function(ae, ad) {
                N(aa, ae, ad, Y).forEach(function(af) {
                    delete c[ac][af.i];
                    aa.removeEventListener(af.e, af.proxy, false)
                })
            })
        }
        p.event = {
            add: g,
            remove: E
        };
        p.fn.bind = function(Z, aa) {
            for (var Y = 0; Y < this.length; Y++) {
                g(this[Y], Z, aa)
            }
            return this
        };
        p.fn.unbind = function(Z, aa) {
            for (var Y = 0; Y < this.length; Y++) {
                E(this[Y], Z, aa)
            }
            return this
        };
        p.fn.one = function(Y, Z) {
            return this.each(function(ab, aa) {
                g(this, Y, Z, null, function(ad, ac) {
                    return function() {
                        var ae = ad.apply(aa, arguments);
                        E(aa, ac, ad);
                        return ae
                    }
                })
            })
        };
        var R = function() {
                return true
            },
            X = function() {
                return false
            },
            x = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };

        function G(Z) {
            var Y = p.extend({
                originalEvent: Z
            }, Z);
            p.each(x, function(ab, aa) {
                Y[ab] = function() {
                    this[aa] = R;
                    if (ab == "stopImmediatePropagation" || ab == "stopPropagation") {
                        Z.cancelBubble = true;
                        if (!Z[ab]) {
                            return
                        }
                    }
                    return Z[ab].apply(Z, arguments)
                };
                Y[aa] = X
            });
            return Y
        }
        p.fn.delegate = function(Y, ab, ac) {
            for (var aa = 0; aa < this.length; aa++) {
                var Z = this[aa];
                g(Z, ab, ac, Y, function(ad) {
                    return function(ag) {
                        var ae, af = p(ag.target).closest(Y, Z).get(0);
                        if (af) {
                            ae = p.extend(G(ag), {
                                currentTarget: af,
                                liveFired: Z
                            });
                            return ad.apply(af, [ae].concat([].slice.call(arguments, 1)))
                        }
                    }
                })
            }
            return this
        };
        p.fn.undelegate = function(Y, aa, ab) {
            for (var Z = 0; Z < this.length; Z++) {
                E(this[Z], aa, ab, Y)
            }
            return this
        };
        p.fn.on = function(Z, Y, aa) {
            return Y === r || p.isFunction(Y) ? this.bind(Z, Y) : this.delegate(Y, Z, aa)
        };
        p.fn.off = function(Z, Y, aa) {
            return Y === r || p.isFunction(Y) ? this.unbind(Z, Y) : this.undelegate(Y, Z, aa)
        };
        p.fn.trigger = function(aa, ab, Z) {
            if (typeof aa == "string") {
                aa = p.Event(aa, Z)
            }
            aa.data = ab;
            for (var Y = 0; Y < this.length; Y++) {
                this[Y].dispatchEvent(aa)
            }
            return this
        };
        p.Event = function(ab, aa) {
            var ac = j.createEvent("Events"),
                Y = true;
            if (aa) {
                for (var Z in aa) {
                    (Z == "bubbles") ? (Y = !!aa[Z]) : (ac[Z] = aa[Z])
                }
            }
            ac.initEvent(ab, Y, true, null, null, null, null, null, null, null, null, null, null, null, null);
            return ac
        };
        p.bind = function(ab, Z, aa) {
            if (!ab.__events) {
                ab.__events = {}
            }
            if (!p.isArray(Z)) {
                Z = [Z]
            }
            for (var Y = 0; Y < Z.length; Y++) {
                if (!ab.__events[Z[Y]]) {
                    ab.__events[Z[Y]] = []
                }
                ab.__events[Z[Y]].push(aa)
            }
        };
        p.trigger = function(ae, ad, ab) {
            var aa = true;
            if (!ae.__events) {
                return aa
            }
            if (!p.isArray(ad)) {
                ad = [ad]
            }
            if (!p.isArray(ab)) {
                ab = [ab]
            }
            for (var ac = 0; ac < ad.length; ac++) {
                if (ae.__events[ad[ac]]) {
                    var Y = ae.__events[ad[ac]];
                    for (var Z = 0; Z < Y.length; Z++) {
                        if (p.isFunction(Y[Z]) && Y[Z].apply(ae, ab) === false) {
                            aa = false
                        }
                    }
                }
            }
            return aa
        };
        p.unbind = function(ad, ab, ac) {
            if (!ad.__events) {
                return
            }
            if (!p.isArray(ab)) {
                ab = [ab]
            }
            for (var aa = 0; aa < ab.length; aa++) {
                if (ad.__events[ab[aa]]) {
                    var Y = ad.__events[ab[aa]];
                    for (var Z = 0; Z < Y.length; Z++) {
                        if (ac == r) {
                            delete Y[Z]
                        }
                        if (Y[Z] == ac) {
                            Y.splice(Z, 1);
                            break
                        }
                    }
                }
            }
        };
        p.proxy = function(Z, aa, Y) {
            return function() {
                if (Y) {
                    return Z.apply(aa, Y)
                }
                return Z.apply(aa, arguments)
            }
        };

        function o(aa, Z) {
            if (Z && aa.dispatchEvent) {
                var ab = p.Event("destroy", {
                    bubbles: false
                });
                aa.dispatchEvent(ab)
            }
            var ac = z(aa);
            if (ac && c[ac]) {
                for (var Y in c[ac]) {
                    aa.removeEventListener(c[ac][Y].e, c[ac][Y].proxy, false)
                }
                delete c[ac]
            }
        }

        function K(aa, Z) {
            if (!aa) {
                return
            }
            var Y = aa.childNodes;
            if (Y && Y.length > 0) {
                for (var ab in Y) {
                    K(Y[ab], Z)
                }
            }
            o(aa, Z)
        }
        var t = function(aa, Z) {
            for (var Y = 0; Y < aa.length; Y++) {
                K(aa[Y], Z)
            }
        };
        p.cleanUpContent = function(aa, Y, Z) {
            if (!aa) {
                return
            }
            var ab = aa.childNodes;
            if (ab && ab.length > 0) {
                p.asap(t, {}, [v.apply(ab, [0]), Z])
            }
            if (Y) {
                o(aa, Z)
            }
        };
        var W = [];
        var F = [];
        var e = [];
        p.asap = function(aa, Z, Y) {
            if (!p.isFunction(aa)) {
                throw "jm.asap - argument is not a valid function"
            }
            W.push(aa);
            F.push(Z ? Z : {});
            e.push(Y ? Y : []);
            O.postMessage("jqm-asap", "*")
        };
        O.addEventListener("message", function(Y) {
            if (Y.source == O && Y.data == "jqm-asap") {
                Y.stopPropagation();
                if (W.length > 0) {
                    (W.shift()).apply(F.shift(), e.shift())
                }
            }
        }, true);
        var l = {};
        p.parseJS = function(ac) {
            if (!ac) {
                return
            }
            if (typeof(ac) == "string") {
                var aa = j.createElement("div");
                aa.innerHTML = ac;
                ac = aa
            }
            var Y = ac.getElementsByTagName("script");
            ac = null;
            for (var Z = 0; Z < Y.length; Z++) {
                if (Y[Z].src.length > 0 && !l[Y[Z].src]) {
                    var ab = j.createElement("script");
                    ab.type = Y[Z].type;
                    ab.src = Y[Z].src;
                    j.getElementsByTagName("head")[0].appendChild(ab);
                    l[Y[Z].src] = 1;
                    ab = null
                } else {
                    p.fkEval.call(O, Y[Z].innerHTML)
                }
            }
        };
        p.getUrlRoot = function(Y) {
            var Z = Y.indexOf("://");
            if (Z < 0) {
                return Y
            }
            Z = Y.indexOf("/", Z + 3);
            if (Z < 0) {
                return "/"
            }
            return Y.substring(Z)
        };
        p.isInteger = function(Y) {
            return /^-?\d+$/.test(Y)
        };
        p.isPhone = function(Y) {
            var aa = /^([^\d])+([^\d])*([^\d])$/;
            var Z = /^([\d\+\s\(\)-])+([\d\+\s\(\)-])*([\d\+\s\(\)-])$/;
            if (aa.test(Y)) {
                return false
            }
            return Z.test(Y)
        };
        p.isEmptyObject = function(Z) {
            for (var Y in Z) {
                return false
            }
            return true
        };
        p.isEmail = function(Y) {
            var Z = /^[\u4e00-\u9fa5a-zA-Z0-9_\-\.\+]+@[\u4e00-\u9fa5a-zA-Z0-9][a-zA-Z0-9_\-]*\.[\u4e00-\u9fa5a-zA-Z0-9\-][\u4e00-\u9fa5a-zA-Z0-9_\-\.]*[\u4e00-\u9fa5a-zA-Z0-9 ]$/;
            return Z.test(Y)
        };
        p.isCardNo = function(Y) {
            var Z = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return Z.test(Y)
        };
        hasOwn = Object.prototype.hasOwnProperty;
        p.toJSON = function(aa) {
            if (aa === null) {
                return "null"
            }
            var Z, ad, Y, ab, ah = p.type(aa);
            if (ah === "undefined") {
                return r
            }
            if (ah === "number" || ah === "boolean") {
                return String(aa)
            }
            if (ah === "string") {
                return p.quoteString(aa)
            }
            if (typeof aa.toJSON === "function") {
                return p.toJSON(aa.toJSON())
            }
            if (ah === "date") {
                var af = aa.getUTCMonth() + 1,
                    ai = aa.getUTCDate(),
                    ag = aa.getUTCFullYear(),
                    aj = aa.getUTCHours(),
                    ac = aa.getUTCMinutes(),
                    ak = aa.getUTCSeconds(),
                    ae = aa.getUTCMilliseconds();
                if (af < 10) {
                    af = "0" + af
                }
                if (ai < 10) {
                    ai = "0" + ai
                }
                if (aj < 10) {
                    aj = "0" + aj
                }
                if (ac < 10) {
                    ac = "0" + ac
                }
                if (ak < 10) {
                    ak = "0" + ak
                }
                if (ae < 100) {
                    ae = "0" + ae
                }
                if (ae < 10) {
                    ae = "0" + ae
                }
                return '"' + ag + "-" + af + "-" + ai + "T" + aj + ":" + ac + ":" + ak + "." + ae + 'Z"'
            }
            Z = [];
            if (p.isArray(aa)) {
                for (ad = 0; ad < aa.length; ad++) {
                    Z.push(p.toJSON(aa[ad]) || "null")
                }
                return "[" + Z.join(",") + "]"
            }
            if (typeof aa === "object") {
                for (ad in aa) {
                    if (hasOwn.call(aa, ad)) {
                        ah = typeof ad;
                        if (ah === "number") {
                            Y = '"' + ad + '"'
                        } else {
                            if (ah === "string") {
                                Y = p.quoteString(ad)
                            } else {
                                continue
                            }
                        }
                        ah = typeof aa[ad];
                        if (ah !== "function" && ah !== "undefined") {
                            ab = p.toJSON(aa[ad]);
                            Z.push(Y + ":" + ab)
                        }
                    }
                }
                return "{" + Z.join(",") + "}"
            }
        };
        var A = /["\\\x00-\x1f\x7f-\x9f]/g,
            m = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
        p.quoteString = function(Y) {
            if (Y.match(A)) {
                return '"' + Y.replace(A, function(Z) {
                        var aa = m[Z];
                        if (typeof aa === "string") {
                            return aa
                        }
                        aa = Z.charCodeAt();
                        return "\\u00" + Math.floor(aa / 16).toString(16) + (aa % 16).toString(16)
                    }) + '"'
            }
            return '"' + Y + '"'
        };
        rvalidchars = /^[\],:{}\s]*$/;
        p.parseJSON = function(Y) {
            if (typeof Y !== "string" || !Y) {
                return null
            }
            Y = p.trim(Y);
            if (O.JSON && O.JSON.parse) {
                return O.JSON.parse(Y)
            }
            if (rvalidchars.test(Y.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return (new Function("return " + Y))()
            }
        };
        var L = /^\s+/,
            y = /\s+$/,
            a = String.prototype.trim;
        p.trim = a ? function(Y) {
            return Y == null ? "" : a.call(Y)
        } : function(Y) {
            return Y == null ? "" : Y.toString().replace(L, "").replace(y, "")
        };
        p.encodeUrl = function(Y) {
            return typeof Y === "undefined" ? "" : encodeURIComponent(Y)
        };
        p.decodeUrl = function(Y) {
            return typeof Y === "undefined" ? "" : decodeURIComponent(Y)
        };
        class2type = {};
        var i = Object.prototype.toString;
        p.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(Z, Y) {
            class2type["[object " + Y + "]"] = Y.toLowerCase()
        });
        p.type = function(Y) {
            return Y == null ? String(Y) : class2type[i.call(Y)] || "object"
        };
        p.format = function() {
            var aa = arguments[0];
            for (var Y = 0; Y < arguments.length - 1; Y++) {
                var Z = new RegExp("\\{" + Y + "\\}", "gm");
                aa = aa.replace(Z, arguments[Y + 1])
            }
            return aa
        };
        p.encodeHtml = function(Y) {
            return Y && Y.replace ? (Y.replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/\b&nbsp;+/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\/g, "&#92;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\n/g, "<br/>").replace(/\r/g, "")) : Y
        };
        p.decodeHtml = function(Y) {
            return Y && Y.replace ? (Y.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/g, ">").replace(/&#92;/gi, "\\").replace(/&#39;/gi, "'").replace(/&quot;/gi, '"').replace(/\<br\/\>/gi, "\n").replace(/&amp;/gi, "&")) : Y
        };
        p.encodeHtmlJs = function(Y) {
            return Y && Y.replace ? (Y.replace(/\\/g, "\\\\").replace(/\'/g, "\\x27").replace(/\"/g, "\\x22").replace(/\n/g, "\\n")) : Y
        };
        p.encodeHtmlAttr = function(Y) {
            return Y && Y.replace ? (Y.replace(/\"/g, "&quot;")) : Y
        };
        p.inArray = function(ab, ac, Z) {
            var aa = Array.prototype.indexOf;
            var Y;
            if (ac) {
                if (aa) {
                    return aa.call(ac, ab, Z)
                }
                Y = ac.length;
                Z = Z ? Z < 0 ? Math.max(0, Y + Z) : Z : 0;
                for (; Z < Y; Z++) {
                    if (Z in ac && ac[Z] === ab) {
                        return Z
                    }
                }
            }
            return -1
        };
        ["click", "keydown", "keyup", "keypress", "submit", "load", "resize", "change", "select", "error"].forEach(function(Y) {
            p.fn[Y] = function(Z) {
                return Z ? this.bind(Y, Z) : this.trigger(Y)
            }
        });
        return p
    })(window);
    "jm" in window || (window.jm = jm);
    if (!window.numOnly) {
        window.numOnly = function numOnly(a) {
            if (a === undefined || a === "") {
                return 0
            }
            if (isNaN(parseFloat(a))) {
                if (a.replace) {
                    a = a.replace(/[^0-9.-]/, "")
                } else {
                    return 0
                }
            }
            return parseFloat(a)
        }
    }
};