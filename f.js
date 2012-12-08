/**
 * Helpers for working with map/filter/reduce
 *
 * Should play nice with Node/RequireJS/VanillaJS
 */

/*globals module:true, define:true*/
(function(root, factory) {
    "use strict";

    root.f = factory.call({});

    if (typeof define === "function" && define.amd) {
        define(root.f.always(root.f));
    } else if (typeof module === "object" && "exports" in module) {
        module.exports = root.f;
    }
}(this, function() {
    "use strict";

    function makeArray(a) {
        return Array.prototype.slice.call(a, 0);
    }

    /**
     * Multiplies the input
     */
    function mul(a, b) {
        return Number(a) * Number(b);
    }
    this.mul = mul;

    /**
     * Adds the input
     */
    function add(a, b) {
        return Number(a) + Number(b);
    }
    this.add = add;

    /**
     * Subtracts the input
     */
    function sub(a, b) {
        return Number(a) - Number(b);
    }
    this.sub = sub;

    /**
     * Divides the input
     */
    function div(a, b) {
        return Number(a) / Number(b);
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
     * Returns the first element of an array
     */
    function first(a) {
        return a[0];
    }
    this.first = first;

    /**
     * Returns the last element of an array
     */
    function last(a) {
        return a[a.length -1];
    }
    this.last = last;

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
     * Match a value against a regex
     */
    function match(re) {
        if (! (re instanceof RegExp)) {
            re = new RegExp("^" + re + "$");
        }
        return function (v) {
            return re.test(v);
        };
    }
    this.match = match;

    /**
     * Shorthand for an inverted matcher
     */
    function omit(re) {
        return compose(inverse, match(re));
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
        return function partialinner() {
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
        return function composeinner(v) {
            var r = [v];
            fstack.forEach(function (f) {
                r = [f.apply(this, r)];
            });
            return r[0];
        };
    }
    this.compose = compose;

    return this;
}));
