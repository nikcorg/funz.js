/**
 * Helpers for working with map/filter/reduce
 *
 * Should play nice with Node/RequireJS/VanillaJS
 */

/*globals module:true, window:true*/
(function () {
    "use strict";

    function makeArray(a) {
        return Array.prototype.slice.call(a, 0);
    }

    function mul(a, b) {
        return a * b;
    }
    this.mul = mul;

    function add(a, b) {
        return a + b;
    }
    this.add = add;

    function sub(a, b) {
        return a - b;
    }
    this.sub = sub;

    function div(a, b) {
        return a / b;
    }
    this.div = div;

    function always(x) {
        return function () {
            return x;
        };
    }
    this.always = always;

    function head(a, until) {
        until = until || 1;
        return a.slice(0, until);
    }
    this.head = head;

    function tail(a, from) {
        from = from || 1;
        return a.slice(from);
    }
    this.tail = tail;

    function sign(n) {
        n = Number(n);
        return isNaN(n) || n === 0 ? 0 : Math.abs(n) / n;
    }
    this.sign = sign;

    function inverse(b) {
        return !b;
    }
    this.inverse = inverse;

    function empty(s) {
        return s.length === 0;
    }
    this.empty = empty;

    function trim(s) {
        return s.replace(/^\s+|\s+$/g, "");
    }
    this.trim = trim;

    function constrain(lower, upper) {
        return function (v) {
            return Math.min(upper, Math.max(lower, v));
        };
    }
    this.constrain = constrain;

    function prop(key) {
        return function (o) {
            return o[key];
        };
    }
    this.prop = prop;
    this.pluck = prop;

    function func(fn) {
        return function (o) {
            return o[fn]();
        };
    }
    this.func = func;

    function omit(value) {
        return function (v) {
            return v !== value;
        };
    }
    this.omit = omit;

    function split(sep, limit) {
        limit = limit && Math.max(limit, 1) || false;
        return function (s) {
            var p = s.split(sep);
            var r = p.splice(limit);
            if (limit && r.length) {
                r.unshift(p.pop());
                p.push(r.join(sep));
            }
            return p;
        };
    }
    this.split = split;

    function object(keys) {
        return function (a) {
            var ret = {};
            var k = keys.slice(0);
            while (k.length > 0) {
                ret[k.shift()] = a.shift();
            }
            return ret;
        };
    }
    this.object = object;

    function partial(ctx, fn) {
        var rest = tail(makeArray(arguments), 2);
        return function () {
            var args = rest.concat(makeArray(arguments));
            return fn.apply(ctx, args);
        };
    }
    this.partial = partial;

    function compose() {
        var fstack = Array.prototype.slice.call(arguments, 0).reverse();
        return function (v) {
            var r = v;
            fstack.forEach(function (f) {
                r = f(r);
            });
            return r;
        };
    }
    this.compose = compose;

    // AMD export
    if (typeof(define) === "function") {
        define([], always(this));
    }

    return this;
}.call(
    typeof(module) !== "undefined" && ("exports" in module && module.exports || module) ||
    typeof(window) !== "undefined" && (window.f = {}) ||
    {}
));
