/*!
 * VERSION: 0.10.7
 * DATE: 2014-10-14
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * Requires TweenLite and CSSPlugin version 1.11.0 or later (TweenMax contains both TweenLite and CSSPlugin). ThrowPropsPlugin is required for momentum-based continuation of movement after the mouse/touch is released (ThrowPropsPlugin is a membership benefit of Club GreenSock - http://www.greensock.com/club/).
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite"], function (t, e) {
        var i, s, r, n, a, o = {css: {}}, h = {css: {}}, l = {css: {}}, u = {css: {}}, _ = {}, c = document,
            f = c.documentElement || {}, p = [], d = function () {
                return !1
            }, m = 180 / Math.PI, g = 999999999999999, v = Date.now || function () {
                return (new Date).getTime()
            }, y = !c.addEventListener && c.all, T = [], w = {}, x = 0, b = /^(?:a|input|textarea|button|select)$/i, P = 0,
            S = 0, C = function (t) {
                if ("string" == typeof t && (t = e.selector(t)), !t || t.nodeType) return [t];
                var i, s = [], r = t.length;
                for (i = 0; i !== r; s.push(t[i++])) ;
                return s
            }, k = function () {
                for (var t = T.length; --t > -1;) T[t]()
            }, R = function (t) {
                T.push(t), 1 === T.length && e.ticker.addEventListener("tick", k, this, !1, 1)
            }, A = function (t) {
                for (var i = T.length; --i > -1;) T[i] === t && T.splice(i, 1);
                e.to(O, 0, {overwrite: "all", delay: 15, onComplete: O})
            }, O = function () {
                T.length || e.ticker.removeEventListener("tick", k)
            }, D = function (t, e) {
                var i;
                for (i in e) void 0 === t[i] && (t[i] = e[i]);
                return t
            }, M = function () {
                return null != window.pageYOffset ? window.pageYOffset : null != c.scrollTop ? c.scrollTop : f.scrollTop || c.body.scrollTop || 0
            }, L = function () {
                return null != window.pageXOffset ? window.pageXOffset : null != c.scrollLeft ? c.scrollLeft : f.scrollLeft || c.body.scrollLeft || 0
            }, N = function (t, e) {
                return t = t || window.event, _.pageX = t.clientX + c.body.scrollLeft + f.scrollLeft, _.pageY = t.clientY + c.body.scrollTop + f.scrollTop, e && (t.returnValue = !1), _
            }, E = function (t) {
                return t ? ("string" == typeof t && (t = e.selector(t)), t.length && t !== window && t[0] && t[0].style && !t.nodeType && (t = t[0]), t === window || t.nodeType && t.style ? t : null) : t
            }, I = function (t, e) {
                var s, r, n, a = t.style;
                if (void 0 === a[e]) {
                    for (n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5, s = e.charAt(0).toUpperCase() + e.substr(1); --r > -1 && void 0 === a[n[r] + s];) ;
                    if (0 > r) return "";
                    i = 3 === r ? "ms" : n[r], e = i + s
                }
                return e
            }, z = function (t, e, i) {
                var s = t.style;
                s && (void 0 === s[e] && (e = I(t, e)), null == i ? s.removeProperty ? s.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : s.removeAttribute(e) : void 0 !== s[e] && (s[e] = i))
            }, X = c.defaultView ? c.defaultView.getComputedStyle : d, F = /(?:Left|Right|Width)/i,
            Y = /(?:\d|\-|\+|=|#|\.)*/g, U = function (t, e, i, s, r) {
                if ("px" === s || !s) return i;
                if ("auto" === s || !i) return 0;
                var n, a = F.test(e), o = t, h = V.style, l = 0 > i;
                return l && (i = -i), "%" === s && -1 !== e.indexOf("border") ? n = i / 100 * (a ? t.clientWidth : t.clientHeight) : (h.cssText = "border:0 solid red;position:" + j(t, "position", !0) + ";line-height:0;", "%" !== s && o.appendChild ? h[a ? "borderLeftWidth" : "borderTopWidth"] = i + s : (o = t.parentNode || c.body, h[a ? "width" : "height"] = i + s), o.appendChild(V), n = parseFloat(V[a ? "offsetWidth" : "offsetHeight"]), o.removeChild(V), 0 !== n || r || (n = U(t, e, i, s, !0))), l ? -n : n
            }, B = function (t, e) {
                if ("absolute" !== j(t, "position", !0)) return 0;
                var i = "left" === e ? "Left" : "Top", s = j(t, "margin" + i, !0);
                return t["offset" + i] - (U(t, e, parseFloat(s), s.replace(Y, "")) || 0)
            }, j = function (t, e, i) {
                var s, r = (t._gsTransform || {})[e];
                return r || 0 === r ? r : (t.style[e] ? r = t.style[e] : (s = X(t)) ? (r = s.getPropertyValue(e.replace(/([A-Z])/g, "-$1").toLowerCase()), r = r || s.length ? r : s[e]) : t.currentStyle && (r = t.currentStyle[e]), "auto" !== r || "top" !== e && "left" !== e || (r = B(t, e)), i ? r : parseFloat(r) || 0)
            }, W = function (t, e, i) {
                var s = t.vars, r = s[i], n = t._listeners[e];
                "function" == typeof r && r.apply(s[i + "Scope"] || t, s[i + "Params"] || [t.pointerEvent]), n && t.dispatchEvent(e)
            }, q = function (t, e) {
                var i, s, r, n = E(t);
                return n ? ae(n, e) : void 0 !== t.left ? (r = ee(e), {
                    left: t.left - r.x,
                    top: t.top - r.y,
                    width: t.width,
                    height: t.height
                }) : (s = t.min || t.minX || t.minRotation || 0, i = t.min || t.minY || 0, {
                    left: s,
                    top: i,
                    width: (t.max || t.maxX || t.maxRotation || 0) - s,
                    height: (t.max || t.maxY || 0) - i
                })
            }, V = c.createElement("div"), H = "" !== I(V, "perspective"),
            G = I(V, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
            Q = I(V, "transform"), Z = Q.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(), $ = {}, K = {},
            J = function () {
                if (!y) {
                    var t = "http://www.w3.org/2000/svg", e = c.createElementNS(t, "svg"),
                        i = c.createElementNS(t, "rect");
                    return i.setAttributeNS(null, "width", "10"), i.setAttributeNS(null, "height", "10"), e.appendChild(i), e
                }
            }(), te = function (t) {
                if (!t.getBoundingClientRect || !t.parentNode) return {offsetTop: 0, offsetLeft: 0, offsetParent: f};
                for (var e, i, s, r = t, n = t.style.cssText; !r.offsetParent && r.parentNode;) r = r.parentNode;
                return t.parentNode.insertBefore(J, t), t.parentNode.removeChild(t), J.style.cssText = n, J.style[Q] = "none", J.setAttribute("class", t.getAttribute("class")), e = J.getBoundingClientRect(), s = r.offsetParent, s ? (s === c.body && f && (s = f), i = s.getBoundingClientRect()) : i = {
                    top: -M(),
                    left: -L()
                }, J.parentNode.insertBefore(t, J), t.parentNode.removeChild(J), {
                    offsetLeft: e.left - i.left,
                    offsetTop: e.top - i.top,
                    offsetParent: r.offsetParent || f
                }
            }, ee = function (t, e) {
                if (e = e || {}, !t || t === f || !t.parentNode) return {x: 0, y: 0};
                var i = X(t), s = G && i ? i.getPropertyValue(G) : "50% 50%", r = s.split(" "),
                    n = -1 !== s.indexOf("left") ? "0%" : -1 !== s.indexOf("right") ? "100%" : r[0],
                    a = -1 !== s.indexOf("top") ? "0%" : -1 !== s.indexOf("bottom") ? "100%" : r[1];
                return ("center" === a || null == a) && (a = "50%"), ("center" === n || isNaN(parseFloat(n))) && (n = "50%"), e.x = -1 !== n.indexOf("%") ? t.offsetWidth * parseFloat(n) / 100 : parseFloat(n), e.y = -1 !== a.indexOf("%") ? t.offsetHeight * parseFloat(a) / 100 : parseFloat(a), e
            }, ie = function (t, e, i) {
                var s, r, a, o, h, l;
                return t !== window && t && t.parentNode ? (s = X(t), r = s ? s.getPropertyValue(Z) : t.currentStyle ? t.currentStyle[Q] : "1,0,0,1,0,0", r = (r + "").match(/(?:\-|\b)[\d\-\.e]+\b/g) || [1, 0, 0, 1, 0, 0], r.length > 6 && (r = [r[0], r[1], r[4], r[5], r[12], r[13]]), e && (a = t.parentNode, l = void 0 === t.offsetLeft && "svg" === t.nodeName.toLowerCase() ? te(t) : t, o = l.offsetParent, h = a === f || a === c.body, void 0 === n && c.body && Q && (n = function () {
                    var t, e, i = c.createElement("div"), s = c.createElement("div");
                    return s.style.position = "absolute", c.body.appendChild(i), i.appendChild(s), t = s.offsetParent, i.style[Q] = "rotate(1deg)", e = s.offsetParent === t, c.body.removeChild(i), e
                }()), r[4] = Number(r[4]) + e.x + (l.offsetLeft || 0) - i.x - (h ? 0 : a.scrollLeft) + (o ? parseInt(j(o, "borderLeftWidth"), 10) || 0 : 0), r[5] = Number(r[5]) + e.y + (l.offsetTop || 0) - i.y - (h ? 0 : a.scrollTop) + (o ? parseInt(j(o, "borderTopWidth"), 10) || 0 : 0), !a || a.offsetParent !== o || n && "100100" !== ie(a).join("") || (r[4] -= a.offsetLeft || 0, r[5] -= a.offsetTop || 0), a && "fixed" === j(t, "position", !0) && (r[4] += L(), r[5] += M())), r) : [1, 0, 0, 1, 0, 0]
            }, se = function (t, e) {
                if (!t || t === window || !t.parentNode) return [1, 0, 0, 1, 0, 0];
                for (var i, s, r, n, a, o, h, l, u = ee(t, $), _ = ee(t.parentNode, K), c = ie(t, u, _); (t = t.parentNode) && t.parentNode && t !== f;) u = _, _ = ee(t.parentNode, u === $ ? K : $), h = ie(t, u, _), i = c[0], s = c[1], r = c[2], n = c[3], a = c[4], o = c[5], c[0] = i * h[0] + s * h[2], c[1] = i * h[1] + s * h[3], c[2] = r * h[0] + n * h[2], c[3] = r * h[1] + n * h[3], c[4] = a * h[0] + o * h[2] + h[4], c[5] = a * h[1] + o * h[3] + h[5];
                return e && (i = c[0], s = c[1], r = c[2], n = c[3], a = c[4], o = c[5], l = i * n - s * r, c[0] = n / l, c[1] = -s / l, c[2] = -r / l, c[3] = i / l, c[4] = (r * o - n * a) / l, c[5] = -(i * o - s * a) / l), c
            }, re = function (t, e, i) {
                var s = se(t), r = e.x, n = e.y;
                return i = i === !0 ? e : i || {}, i.x = r * s[0] + n * s[2] + s[4], i.y = r * s[1] + n * s[3] + s[5], i
            }, ne = function (t, e, i) {
                var s = t.x * e[0] + t.y * e[2] + e[4], r = t.x * e[1] + t.y * e[3] + e[5];
                return t.x = s * i[0] + r * i[2] + i[4], t.y = s * i[1] + r * i[3] + i[5], t
            }, ae = function (t, e) {
                var i, s, r, n, a, o, h, l, u, _, p;
                return t === window ? (n = M(), s = L(), r = s + (f.clientWidth || t.innerWidth || c.body.clientWidth || 0), a = n + ((t.innerHeight || 0) - 20 < f.clientHeight ? f.clientHeight : t.innerHeight || c.body.clientHeight || 0)) : (i = ee(t), s = -i.x, r = s + t.offsetWidth, n = -i.y, a = n + t.offsetHeight), t === e ? {
                    left: s,
                    top: n,
                    width: r - s,
                    height: a - n
                } : (o = se(t), h = se(e, !0), l = ne({x: s, y: n}, o, h), u = ne({x: r, y: n}, o, h), _ = ne({
                    x: r,
                    y: a
                }, o, h), p = ne({
                    x: s,
                    y: a
                }, o, h), s = Math.min(l.x, u.x, _.x, p.x), n = Math.min(l.y, u.y, _.y, p.y), {
                    left: s,
                    top: n,
                    width: Math.max(l.x, u.x, _.x, p.x) - s,
                    height: Math.max(l.y, u.y, _.y, p.y) - n
                })
            }, oe = function (t) {
                return t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
            }, he = function (t) {
                var e, i, s, r = [], n = t.length;
                for (e = 0; n > e; e++) if (i = t[e], oe(i)) for (s = i.length, s = 0; i.length > s; s++) r.push(i[s]); else r.push(i);
                return r
            }, le = "ontouchstart" in f && "orientation" in window, ue = function (t) {
                for (var e = t.split(","), i = (void 0 !== V.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== V.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : t).split(","), s = {}, r = 8; --r > -1;) s[e[r]] = i[r], s[i[r]] = e[r];
                return s
            }("touchstart,touchmove,touchend,touchcancel"), _e = function (t, e, i) {
                t.addEventListener ? t.addEventListener(ue[e] || e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i)
            }, ce = function (t, e, i) {
                t.removeEventListener ? t.removeEventListener(ue[e] || e, i) : t.detachEvent && t.detachEvent("on" + e, i)
            }, fe = function (t) {
                s = t.touches && t.touches.length > P, ce(t.target, "touchend", fe)
            }, pe = function (t) {
                s = t.touches && t.touches.length > P, _e(t.target, "touchend", fe)
            }, de = function (t, e, i, s, r, n) {
                var a, o, h, l = {};
                if (e) if (1 !== r && e instanceof Array) for (l.end = a = [], h = e.length, o = 0; h > o; o++) a[o] = e[o] * r; else l.end = "function" == typeof e ? function (i) {
                    return e.call(t, i) * r
                } : e;
                return (i || 0 === i) && (l.max = i), (s || 0 === s) && (l.min = s), n && (l.velocity = 0), l
            }, me = function (t) {
                var e;
                return t && t.getAttribute && "BODY" !== t.nodeName ? "true" === (e = t.getAttribute("data-clickable")) || "false" !== e && (t.onclick || b.test(t.nodeName + "")) ? !0 : me(t.parentNode) : !1
            }, ge = function () {
                var t, e = c.createElement("div"), i = c.createElement("div"), s = i.style, r = c.body || V;
                return s.display = "inline-block", s.position = "relative", e.style.cssText = i.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden", e.appendChild(i), r.appendChild(e), a = i.offsetHeight + 18 > e.scrollHeight, s.width = "100%", Q || (s.paddingRight = "500px", t = e.scrollLeft = e.scrollWidth - e.clientWidth, s.left = "-90px", t = t !== e.scrollLeft), r.removeChild(e), t
            }(), ve = function (t, i) {
                t = E(t), i = i || {};
                var s, r, n, o, h, l, u = c.createElement("div"), _ = u.style, f = t.firstChild, p = 0, d = 0,
                    m = t.scrollTop, g = t.scrollLeft, v = t.scrollWidth, T = t.scrollHeight, w = 0, x = 0, b = 0;
                H && i.force3D !== !1 ? (h = "translate3d(", l = "px,0px)") : Q && (h = "translate(", l = "px)"), this.scrollTop = function (t, e) {
                    return arguments.length ? (this.top(-t, e), void 0) : -this.top()
                }, this.scrollLeft = function (t, e) {
                    return arguments.length ? (this.left(-t, e), void 0) : -this.left()
                }, this.left = function (s, r) {
                    if (!arguments.length) return -(t.scrollLeft + d);
                    var n = t.scrollLeft - g, a = d;
                    return (n > 2 || -2 > n) && !r ? (g = t.scrollLeft, e.killTweensOf(this, !0, {
                        left: 1,
                        scrollLeft: 1
                    }), this.left(-g), i.onKill && i.onKill(), void 0) : (s = -s, 0 > s ? (d = 0 | s - .5, s = 0) : s > x ? (d = 0 | s - x, s = x) : d = 0, (d || a) && (h ? this._suspendTransforms || (_[Q] = h + -d + "px," + -p + l) : _.left = -d + "px", ge && d + w >= 0 && (_.paddingRight = d + w + "px")), t.scrollLeft = 0 | s, g = t.scrollLeft, void 0)
                }, this.top = function (s, r) {
                    if (!arguments.length) return -(t.scrollTop + p);
                    var n = t.scrollTop - m, a = p;
                    return (n > 2 || -2 > n) && !r ? (m = t.scrollTop, e.killTweensOf(this, !0, {
                        top: 1,
                        scrollTop: 1
                    }), this.top(-m), i.onKill && i.onKill(), void 0) : (s = -s, 0 > s ? (p = 0 | s - .5, s = 0) : s > b ? (p = 0 | s - b, s = b) : p = 0, (p || a) && (h ? this._suspendTransforms || (_[Q] = h + -d + "px," + -p + l) : _.top = -p + "px"), t.scrollTop = 0 | s, m = t.scrollTop, void 0)
                }, this.maxScrollTop = function () {
                    return b
                }, this.maxScrollLeft = function () {
                    return x
                }, this.disable = function () {
                    for (f = u.firstChild; f;) o = f.nextSibling, t.appendChild(f), f = o;
                    t === u.parentNode && t.removeChild(u)
                }, this.enable = function () {
                    if (f = t.firstChild, f !== u) {
                        for (; f;) o = f.nextSibling, u.appendChild(f), f = o;
                        t.appendChild(u), this.calibrate()
                    }
                }, this.calibrate = function (e) {
                    var i, o, h = t.clientWidth === s;
                    m = t.scrollTop, g = t.scrollLeft, (!h || t.clientHeight !== r || u.offsetHeight !== n || v !== t.scrollWidth || T !== t.scrollHeight || e) && ((p || d) && (i = this.left(), o = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), (!h || e) && (_.display = "block", _.width = "auto", _.paddingRight = "0px", w = Math.max(0, t.scrollWidth - t.clientWidth), w && (w += j(t, "paddingLeft") + (a ? j(t, "paddingRight") : 0))), _.display = "inline-block", _.position = "relative", _.overflow = "visible", _.width = "100%", _.paddingRight = w + "px", a && (_.paddingBottom = j(t, "paddingBottom", !0)), y && (_.zoom = "1"), s = t.clientWidth, r = t.clientHeight, v = t.scrollWidth, T = t.scrollHeight, x = t.scrollWidth - s, b = t.scrollHeight - r, n = u.offsetHeight, (i || o) && (this.left(i), this.top(o)))
                }, this.content = u, this.element = t, this._suspendTransforms = !1, this.enable()
            }, ye = function (i, n) {
                t.call(this, i), i = E(i), r || (r = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins.ThrowPropsPlugin), this.vars = n = n || {}, this.target = i, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(n.dragResistance) || 0, this.edgeResistance = isNaN(n.edgeResistance) ? 1 : parseFloat(n.edgeResistance) || 0, this.lockAxis = n.lockAxis;
                var a, _, f, T, b, k, O, M, L, I, X, F, Y, U, B, V, H, G, Q, Z, $, K, J, te, ee, ie,
                    ne = (n.type || (y ? "top,left" : "x,y")).toLowerCase(),
                    ae = -1 !== ne.indexOf("x") || -1 !== ne.indexOf("y"), oe = -1 !== ne.indexOf("rotation"),
                    he = ae ? "x" : "left", fe = ae ? "y" : "top",
                    ge = -1 !== ne.indexOf("x") || -1 !== ne.indexOf("left") || "scroll" === ne,
                    Te = -1 !== ne.indexOf("y") || -1 !== ne.indexOf("top") || "scroll" === ne, we = this,
                    xe = C(n.trigger || n.handle || i), be = {}, Pe = 0, Se = function (t) {
                        if (G) {
                            var s = we.x, r = we.y, n = 1e-6;
                            n > s && s > -n && (s = 0), n > r && r > -n && (r = 0), oe ? (U.rotation = we.rotation = we.x, e.set(i, Y)) : _ ? (Te && _.top(r), ge && _.left(s)) : ae ? (Te && (U.y = r), ge && (U.x = s), e.set(i, Y)) : (Te && (i.style.top = r + "px"), ge && (i.style.left = s + "px")), M && !t && W(we, "drag", "onDrag")
                        }
                        G = !1
                    }, Ce = function (t, s) {
                        var r;
                        ae ? (i._gsTransform || e.set(i, {x: "+=0"}), we.y = i._gsTransform.y, we.x = i._gsTransform.x) : oe ? (i._gsTransform || e.set(i, {x: "+=0"}), we.x = we.rotation = i._gsTransform.rotation) : _ ? (we.y = _.top(), we.x = _.left()) : (we.y = parseInt(i.style.top, 10) || 0, we.x = parseInt(i.style.left, 10) || 0), !Z && !$ || s || (Z && (r = Z(we.x), r !== we.x && (we.x = r, oe && (we.rotation = r), G = !0)), $ && (r = $(we.y), r !== we.y && (we.y = r, G = !0)), G && Se(!0)), n.onThrowUpdate && !t && n.onThrowUpdate.apply(n.onThrowUpdateScope || we, n.onThrowUpdateParams || p)
                    }, ke = function () {
                        var t, e, s, r;
                        O = !1, _ ? (_.calibrate(), we.minX = I = -_.maxScrollLeft(), we.minY = F = -_.maxScrollTop(), we.maxX = L = we.maxY = X = 0, O = !0) : n.bounds && (t = q(n.bounds, i.parentNode), oe ? (we.minX = I = t.left, we.maxX = L = t.left + t.width, we.minY = F = we.maxY = X = 0) : void 0 !== n.bounds.maxX || void 0 !== n.bounds.maxY ? (t = n.bounds, we.minX = I = t.minX, we.minY = F = t.minY, we.maxX = L = t.maxX, we.maxY = X = t.maxY) : (e = q(i, i.parentNode), we.minX = I = j(i, he) + t.left - e.left, we.minY = F = j(i, fe) + t.top - e.top, we.maxX = L = I + (t.width - e.width), we.maxY = X = F + (t.height - e.height)), I > L && (we.minX = L, we.maxX = L = I, I = we.minX), F > X && (we.minY = X, we.maxY = X = F, F = we.minY), oe && (we.minRotation = I, we.maxRotation = L), O = !0), n.liveSnap && (s = n.liveSnap === !0 ? n.snap || {} : n.liveSnap, r = s instanceof Array || "function" == typeof s, oe ? (Z = Me(r ? s : s.rotation, I, L, 1), $ = null) : (ge && (Z = Me(r ? s : s.x || s.left || s.scrollLeft, I, L, _ ? -1 : 1)), Te && ($ = Me(r ? s : s.y || s.top || s.scrollTop, F, X, _ ? -1 : 1))))
                    }, Re = function (t, e) {
                        var s, a, o;
                        t && r ? (t === !0 && (s = n.snap || {}, a = s instanceof Array || "function" == typeof s, t = {resistance: (n.throwResistance || n.resistance || 1e3) / (oe ? 10 : 1)}, oe ? t.rotation = de(we, a ? s : s.rotation, L, I, 1, e) : (ge && (t[he] = de(we, a ? s : s.x || s.left || s.scrollLeft, L, I, _ ? -1 : 1, e || we.lockAxis && "x" === te)), Te && (t[fe] = de(we, a ? s : s.y || s.top || s.scrollTop, X, F, _ ? -1 : 1, e || we.lockAxis && "y" === te)))), we.tween = o = r.to(_ || i, {
                            throwProps: t,
                            ease: n.ease || Power3.easeOut,
                            onComplete: n.onThrowComplete,
                            onCompleteParams: n.onThrowCompleteParams,
                            onCompleteScope: n.onThrowCompleteScope || we,
                            onUpdate: n.fastMode ? n.onThrowUpdate : Ce,
                            onUpdateParams: n.fastMode ? n.onThrowUpdateParams : null,
                            onUpdateScope: n.onThrowUpdateScope || we
                        }, isNaN(n.maxDuration) ? 2 : n.maxDuration, isNaN(n.minDuration) ? .5 : n.minDuration, isNaN(n.overshootTolerance) ? 1 - we.edgeResistance + .2 : n.overshootTolerance), n.fastMode || (_ && (_._suspendTransforms = !0), o.render(o.duration(), !0, !0), Ce(!0, !0), we.endX = we.x, we.endY = we.y, oe && (we.endRotation = we.x), o.play(0), Ce(!0, !0), _ && (_._suspendTransforms = !1))) : O && we.applyBounds()
                    }, Ae = function () {
                        ee = se(i.parentNode, !0), ee[1] || ee[2] || 1 != ee[0] || 1 != ee[3] || 0 != ee[4] || 0 != ee[5] || (ee = null)
                    }, Oe = function () {
                        var t = 1 - we.edgeResistance;
                        Ae(), _ ? (ke(), k = _.top(), b = _.left()) : (De() ? (Ce(!0, !0), ke()) : we.applyBounds(), oe ? (H = re(i, {
                            x: 0,
                            y: 0
                        }), Ce(!0, !0), b = we.x, k = we.y = Math.atan2(H.y - T, f - H.x) * m) : (k = j(i, fe), b = j(i, he))), O && t && (b > L ? b = L + (b - L) / t : I > b && (b = I - (I - b) / t), oe || (k > X ? k = X + (k - X) / t : F > k && (k = F - (F - k) / t)))
                    }, De = function () {
                        return we.tween && we.tween.isActive()
                    }, Me = function (t, e, i, s) {
                        return "function" == typeof t ? function (r) {
                            var n = we.isPressed ? 1 - we.edgeResistance : 1;
                            return t.call(we, r > i ? i + (r - i) * n : e > r ? e + (r - e) * n : r) * s
                        } : t instanceof Array ? function (s) {
                            for (var r, n, a = t.length, o = 0, h = g; --a > -1;) r = t[a], n = r - s, 0 > n && (n = -n), h > n && r >= e && i >= r && (o = a, h = n);
                            return t[o]
                        } : isNaN(t) ? function (t) {
                            return t
                        } : function () {
                            return t * s
                        }
                    }, Le = function (t) {
                        var s, r;
                        if (a && !we.isPressed && t) {
                            if (ie = De(), we.pointerEvent = t, ue[t.type] ? (J = -1 !== t.type.indexOf("touch") ? t.currentTarget : c, _e(J, "touchend", Ee), _e(J, "touchmove", Ne), _e(J, "touchcancel", Ee), _e(c, "touchstart", pe)) : (J = null, _e(c, "mousemove", Ne)), _e(c, "mouseup", Ee), K = me(t.target) && !n.dragClickables) return _e(t.target, "change", Ee), void 0;
                            if (y ? t = N(t, !0) : !_ || t.touches && t.touches.length > P + 1 || (t.preventDefault(), t.preventManipulation && t.preventManipulation()), t.changedTouches ? (t = B = t.changedTouches[0], V = t.identifier) : t.pointerId ? V = t.pointerId : B = null, P++, R(Se), T = we.pointerY = t.pageY, f = we.pointerX = t.pageX, Oe(), ee && (s = f * ee[0] + T * ee[2] + ee[4], T = f * ee[1] + T * ee[3] + ee[5], f = s), we.tween && we.tween.kill(), e.killTweensOf(_ || i, !0, be), _ && e.killTweensOf(i, !0, {scrollTo: 1}), we.tween = te = null, (n.zIndexBoost || !oe && !_ && n.zIndexBoost !== !1) && (i.style.zIndex = ye.zIndex++), we.isPressed = !0, M = !(!n.onDrag && !we._listeners.drag), !oe) for (r = xe.length; --r > -1;) z(xe[r], "cursor", n.cursor || "move");
                            W(we, "press", "onPress")
                        }
                    }, Ne = function (t) {
                        if (a && !s && we.isPressed) {
                            y ? t = N(t, !0) : (t.preventDefault(), t.preventManipulation && t.preventManipulation()), we.pointerEvent = t;
                            var e, i, r, n, o, h, l, u, _, c = t.changedTouches, p = 1 - we.dragResistance,
                                d = 1 - we.edgeResistance;
                            if (c) {
                                if (t = c[0], t !== B && t.identifier !== V) {
                                    for (o = c.length; --o > -1 && (t = c[o]).identifier !== V;) ;
                                    if (0 > o) return
                                }
                            } else if (t.pointerId && V && t.pointerId !== V) return;
                            l = we.pointerX = t.pageX, u = we.pointerY = t.pageY, oe ? (n = Math.atan2(H.y - t.pageY, t.pageX - H.x) * m, h = we.y - n, we.y = n, h > 180 ? k -= 360 : -180 > h && (k += 360), r = b + (k - n) * p) : (ee && (_ = l * ee[0] + u * ee[2] + ee[4], u = l * ee[1] + u * ee[3] + ee[5], l = _), i = u - T, e = l - f, 2 > i && i > -2 && (i = 0), 2 > e && e > -2 && (e = 0), we.lockAxis && (e || i) && ("y" === te || !te && Math.abs(e) > Math.abs(i) && ge ? (i = 0, te = "y") : Te && (e = 0, te = "x")), r = b + e * p, n = k + i * p), Z || $ ? (Z && (r = Z(r)), $ && (n = $(n))) : O && (r > L ? r = L + (r - L) * d : I > r && (r = I + (r - I) * d), oe || (n > X ? n = X + (n - X) * d : F > n && (n = F + (n - F) * d))), oe || (r = Math.round(r), n = Math.round(n)), (we.x !== r || we.y !== n && !oe) && (we.x = we.endX = r, oe ? we.endRotation = r : we.y = we.endY = n, G = !0, we.isDragging || (we.isDragging = !0, W(we, "dragstart", "onDragStart")))
                        }
                    }, Ee = function (t, e) {
                        if (!(!a || t && V && !e && t.pointerId && t.pointerId !== V)) {
                            we.isPressed = !1;
                            var i, s, r = t, o = we.isDragging;
                            if (J ? (ce(J, "touchend", Ee), ce(J, "touchmove", Ne), ce(J, "touchcancel", Ee), ce(c, "touchstart", pe)) : ce(c, "mousemove", Ne), ce(c, "mouseup", Ee), G = !1, K) return t && ce(t.target, "change", Ee), W(we, "release", "onRelease"), W(we, "click", "onClick"), K = !1, void 0;
                            if (A(Se), !oe) for (s = xe.length; --s > -1;) z(xe[s], "cursor", n.cursor || "move");
                            if (o && (Pe = S = v(), we.isDragging = !1), P--, t) {
                                if (y && (t = N(t, !1)), i = t.changedTouches, i && (t = i[0], t !== B && t.identifier !== V)) {
                                    for (s = i.length; --s > -1 && (t = i[s]).identifier !== V;) ;
                                    if (0 > s) return
                                }
                                we.pointerEvent = r, we.pointerX = t.pageX, we.pointerY = t.pageY
                            }
                            return r && !o ? (ie && (n.snap || n.bounds) && Re(n.throwProps), W(we, "release", "onRelease"), W(we, "click", "onClick")) : (Re(n.throwProps), y || !r || !n.dragClickables && me(r.target) || !o || (r.preventDefault(), r.preventManipulation && r.preventManipulation()), W(we, "release", "onRelease")), o && W(we, "dragend", "onDragEnd"), !0
                        }
                    }, Ie = function (t) {
                        (we.isPressed || 20 > v() - Pe) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.preventManipulation && t.preventManipulation())
                    };
                Q = ye.get(this.target), Q && Q.kill(), this.startDrag = function (t) {
                    Le(t), we.isDragging || (we.isDragging = !0, W(we, "dragstart", "onDragStart"))
                }, this.drag = Ne, this.endDrag = function (t) {
                    Ee(t, !0)
                }, this.timeSinceDrag = function () {
                    return we.isDragging ? 0 : (v() - Pe) / 1e3
                }, this.hitTest = function (t, e) {
                    return ye.hitTest(we.target, t, e)
                }, this.applyBounds = function (t) {
                    var e, i;
                    return t && n.bounds !== t ? (n.bounds = t, we.update(!0)) : (Ce(!0), ke(), O && (e = we.x, i = we.y, O && (e > L ? e = L : I > e && (e = I), i > X ? i = X : F > i && (i = F)), (we.x !== e || we.y !== i) && (we.x = we.endX = e, oe ? we.endRotation = e : we.y = we.endY = i, G = !0, Se())), we)
                }, this.update = function (t) {
                    var e = we.x, i = we.y;
                    return Ae(), t ? we.applyBounds() : Ce(!0), we.isPressed && (Math.abs(e - we.x) > .01 || Math.abs(i - we.y) > .01 && !oe) && Oe(), we
                }, this.enable = function (t) {
                    var s, o, h;
                    if ("soft" !== t) for (o = xe.length; --o > -1;) h = xe[o], _e(h, "mousedown", Le), _e(h, "touchstart", Le), _e(h, "click", Ie), oe || z(h, "cursor", n.cursor || "move"), h.ondragstart = h.onselectstart = d, z(h, "userSelect", "none"), z(h, "touchCallout", "none"), z(h, "touchAction", "none");
                    return a = !0, r && "soft" !== t && r.track(_ || i, ae ? "x,y" : oe ? "rotation" : "top,left"), _ && _.enable(), i._gsDragID = s = "d" + x++, w[s] = this, _ && (_.element._gsDragID = s), e.set(i, {x: "+=0"}), this.update(!0), we
                }, this.disable = function (t) {
                    var e, s, n = this.isDragging;
                    if (!oe) for (e = xe.length; --e > -1;) z(xe[e], "cursor", null);
                    if ("soft" !== t) {
                        for (e = xe.length; --e > -1;) s = xe[e], s.ondragstart = s.onselectstart = null, z(s, "userSelect", "text"), z(s, "touchCallout", "default"), z(s, "MSTouchAction", "auto"), ce(s, "mousedown", Le), ce(s, "touchstart", Le), ce(s, "click", Ie);
                        J && (ce(J, "touchcancel", Ee), ce(J, "touchend", Ee), ce(J, "touchmove", Ne)), ce(c, "mouseup", Ee), ce(c, "mousemove", Ne)
                    }
                    return a = !1, r && "soft" !== t && r.untrack(_ || i, ae ? "x,y" : oe ? "rotation" : "top,left"), _ && _.disable(), A(Se), this.isDragging = this.isPressed = K = !1, n && W(this, "dragend", "onDragEnd"), we
                }, this.enabled = function (t, e) {
                    return arguments.length ? t ? this.enable(e) : this.disable(e) : a
                }, this.kill = function () {
                    return e.killTweensOf(_ || i, !0, be), we.disable(), delete w[i._gsDragID], we
                }, -1 !== ne.indexOf("scroll") && (_ = this.scrollProxy = new ve(i, D({
                    onKill: function () {
                        we.isPressed && Ee(null)
                    }
                }, n)), i.style.overflowY = Te && !le ? "auto" : "hidden", i.style.overflowX = ge && !le ? "auto" : "hidden", i = _.content), n.force3D !== !1 && e.set(i, {force3D: !0}), oe ? be.rotation = 1 : (ge && (be[he] = 1), Te && (be[fe] = 1)), oe ? (Y = u, U = Y.css, Y.overwrite = !1) : ae && (Y = ge && Te ? o : ge ? h : l, U = Y.css, Y.overwrite = !1), this.enable()
            }, Te = ye.prototype = new t;
        Te.constructor = ye, Te.pointerX = Te.pointerY = 0, Te.isDragging = Te.isPressed = !1, ye.version = "0.10.7", ye.zIndex = 1e3, _e(c, "touchcancel", function () {
        }), _e(c, "contextmenu", function () {
            var t;
            for (t in w) w[t].isPressed && w[t].endDrag()
        }), ye.create = function (t, i) {
            "string" == typeof t && (t = e.selector(t));
            for (var s = oe(t) ? he(t) : [t], r = s.length; --r > -1;) s[r] = new ye(s[r], i);
            return s
        }, ye.get = function (t) {
            return w[(E(t) || {})._gsDragID]
        }, ye.timeSinceDrag = function () {
            return (v() - S) / 1e3
        };
        var we = function (t, e) {
            var i = t.pageX !== e ? {
                left: t.pageX,
                top: t.pageY,
                right: t.pageX + 1,
                bottom: t.pageY + 1
            } : t.nodeType || t.left === e || t.top === e ? E(t).getBoundingClientRect() : t;
            return i.right === e && i.width !== e ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : i.width === e && (i = {
                width: i.right - i.left,
                height: i.bottom - i.top,
                right: i.right,
                left: i.left,
                bottom: i.bottom,
                top: i.top
            }), i
        };
        return ye.hitTest = function (t, e, i) {
            if (t === e) return !1;
            var s, r, n, a = we(t), o = we(e),
                h = o.left > a.right || o.right < a.left || o.top > a.bottom || o.bottom < a.top;
            return h || !i ? !h : (n = -1 !== (i + "").indexOf("%"), i = parseFloat(i) || 0, s = {
                left: Math.max(a.left, o.left),
                top: Math.max(a.top, o.top)
            }, s.width = Math.min(a.right, o.right) - s.left, s.height = Math.min(a.bottom, o.bottom) - s.top, 0 > s.width || 0 > s.height ? !1 : n ? (i *= .01, r = s.width * s.height, r >= a.width * a.height * i || r >= o.width * o.height * i) : s.width > i && s.height > i)
        }, ye
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t) {
    "use strict";
    var e = function () {
        return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), require("../plugins/CSSPlugin.js"), module.exports = e())
}("Draggable");
