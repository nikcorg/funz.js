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

    /**
     * Multiplies the input
     */
    function mul(a, b) {
        return a * b;
    }
    this.mul = mul;

    /**
     * Adds the input
     */
    function add(a, b) {
        return a + b;
    }
    this.add = add;

    /**
     * Subtracts the input
     */
    function sub(a, b) {
        return a - b;
    }
    this.sub = sub;

    /**
     * Divides the input
     */
    function div(a, b) {
        return a / b;
    }
    this.div = div;

    /**
     * Always returns the original input
     */
    function always(x) {
        return function () {
            return x;
        };
    }
    this.always = always;

    /**
     * Extracts the head from array/string
     */
    function head(a, until) {
        until = until || 1;
        return a.slice(0, until);
    }
    this.head = head;

    /**
     * Extracts the tail from an array/string
     */
    function tail(a, from) {
        from = from || 1;
        return a.slice(from);
    }
    this.tail = tail;

    /**
     * Returns the sign of input
     */
    function sign(n) {
        n = Number(n);
        return isNaN(n) || n === 0 ? 0 : Math.abs(n) / n;
    }
    this.sign = sign;

    /**
     * Inverts a boolean input
     */
    function inverse(b) {
        return !b;
    }
    this.inverse = inverse;

    /**
     * Returns true for an empty string/array
     */
    function empty(s) {
        return s.length === 0;
    }
    this.empty = empty;

    /**
     * Trim a string
     */
    function trim(s) {
        return s.replace(/^\s+|\s+$/g, "");
    }
    this.trim = trim;

    /**
     * Constrains a number within defined boundaries
     */
    function constrain(lower, upper) {
        return function (v) {
            return Math.min(upper, Math.max(lower, v));
        };
    }
    this.constrain = constrain;

    /**
     * Returns a property key from input
     */
    function prop(key) {
        return function (o) {
            return o[key];
        };
    }
    this.prop = prop;
    this.pluck = prop;

    /**
     * Invokes a function fn on input
     */
    function func(fn) {
        return function (o) {
            return o[fn]();
        };
    }
    this.func = func;

    /**
     * Shorthand for a negated matcher
     */
    function omit(value) {
        return function (v) {
            return v !== value;
        };
    }
    this.omit = omit;

    /**
     * Splits a string on a separator to limit parts
     * The sum of the returned parts is always the
     * original input.
     */
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

    /**
     * Maps an array to an object
     */
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

    /**
     * Returns a partial application
     */
    function partial(ctx, fn) {
        var rest = tail(makeArray(arguments), 2);
        return function () {
            var args = rest.concat(makeArray(arguments));
            return fn.apply(ctx, args);
        };
    }
    this.partial = partial;

    /**
     * Composes a function-stack to pass a value through.
     * Evaluates right-to-left, i.e. the final returned value
     * is returned by the first argument
     */
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
