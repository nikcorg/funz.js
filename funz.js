/*globals module:true, define:true*/
(function(root, factory) {
    "use strict";

    var f = factory.call({});

    if (typeof(define) === "function" && define.amd) {
        define(f.always(f));
    } else if (typeof(require) === "function" && typeof module !== "undefined" ) {
        module.exports = f;
    } else {
        root.funz = f;
    }
}(this, function() {
    "use strict";

    /**
     * Makes an array of an array-like collection, such as the arguments object or a NodeList
     * @param  {Arguments|NodeList} a
     * @return {Array}
     */
    function toarray(a) {
        return Array.prototype.slice.call(a, 0);
    }
    this.toarray = toarray;

    /**
     * Determines if a value is less than a set upper limit
     * @param  {Number} n
     * @return {Boolean}
     */
    function lt(n) {
        return function ltinner(m) {
            return m < n;
        };
    }
    this.lt = lt;

    /**
     * Determines if a value is less than or equal to an upper limit
     * @param  {Number} n
     * @return {Boolean}
     */
    function lte(n) {
        return function lteinner(m) {
            return m <= n;
        };
    }
    this.lte = lte;

    /**
     * Determines if a value is greater than a lower limit
     * @param  {Number} n
     * @return {Boolean}
     */
    function gt(n) {
        return function gtinner(m) {
            return m > n;
        };
    }
    this.gt = gt;

    /**
     * Determines if a value is greater than or equal to a lower limit
     * @param  {Number} n
     * @return {Boolean}
     */
    function gte(n) {
        return function gteinner(m) {
            return m >= n;
        };
    }
    this.gte = gte;

    /**
     * Determines if two values are equal
     * @param  {Number} n
     * @return {Boolean}   [description]
     */
    function eq(n) {
        return function eqinner(m) {
            return m == n;
        };
    }
    this.eq = eq;

    /**
     * Determines whether a number is odd
     * @param  {Number} n
     * @return {Boolean}
     */
    function odd(n) {
        return n % 2 !== 0;
    }
    this.odd = odd;

    /**
     * Determines whether a number is even
     * @param  {Number} n
     * @return {Boolean}
     */
    function even(n) {
        return n % 2 === 0;
    }
    this.even = even;

    /**
     * Multiplies two numbers and returns their product
     * @param  {Number} a
     * @param  {Number} b
     * @return {Number}
     */
    function mul(a, b) {
        return a * b;
    }
    this.mul = mul;

    /**
     * Adds two numbers and returns their sum
     * @param {Number} a
     * @param {Number} b
     * @return {Number}
     */
    function add(a, b) {
        return a + b;
    }
    this.add = add;

    /**
     * Subtracts two numbers and returns their difference
     * @param  {Number} a
     * @param  {Number} b
     * @return {Number}
     */
    function sub(a, b) {
        return a - b;
    }
    this.sub = sub;

    /**
     * Divides two numbers and returns their quotient. Does not check for div w/ zero.
     * @param  {Number} a
     * @param  {Number} b
     * @return {Number}
     */
    function div(a, b) {
        return a / b;
    }
    this.div = div;

    /**
     * Always returns the original input
     * @param  {*} x The value to return
     * @return {*}
     */
    function always(x) {
        return function alwaysinner() {
            return x;
        };
    }
    this.always = always;

    /**
     * Extracts a head portion from an array
     * @param  {Array} a
     * @param  {Number} [until=1] Exclusive
     * @return {Array}
     */
    function head(a, until) {
        until = Math.max(1, until) || 1;
        return a.slice(0, until);
    }
    this.head = head;

    /**
     * Extracts a tail portion from an array
     * @param  {Array} a
     * @param  {Array} [from=1] Inclusive
     * @return {Array}
     */
    function tail(a, from) {
        from = Math.max(1, from) || 1;
        return a.slice(from);
    }
    this.tail = tail;

    /**
     * Returns the first element of an array
     * @param  {Array} a
     * @return {*}
     */
    function first(a) {
        return a[0];
    }
    this.first = first;

    /**
     * Returns the last element of an array
     * @param  {Array} a
     * @return {*}
     */
    function last(a) {
        return a[a.length -1];
    }
    this.last = last;

    /**
     * Determines the sign of a number
     * @param  {Number} n
     * @return {Number} Always one of -1, 0 or 1
     */
    function sign(n) {
        n = Number(n);
        return isNaN(n) || n === 0 ? 0 : Math.abs(n) / n;
    }
    this.sign = sign;

    /**
     * Returns the inverse value of a boolean
     * @param  {Boolean} b
     * @return {Boolean}
     */
    function inverse(b) {
        return !b;
    }
    this.inverse = inverse;

    /**
     * Determines whether the input is of zero length
     * @param  {String|Array} s
     * @return {Boolean}
     */
    function empty(s) {
        return s.length === 0;
    }
    this.empty = empty;

    /**
     * Trims leading and trailing whitespace characters from a string
     * @param  {String} s
     * @return {String}
     */
    function trim(s) {
        return s.replace(/^\s+|\s+$/g, "");
    }
    this.trim = trim;

    /**
     * Constrains a number within defined boundaries. Inclusive.
     * @param  {Number} lower
     * @param  {Number} upper
     * @return {Number}
     */
    function constrain(lower, upper) {
        return function constraininner(v) {
            return Math.min(upper, Math.max(lower, v));
        };
    }
    this.constrain = constrain;

    /**
     * Determines whether a number is between defined boundaries. Inclusive.
     * @param  {Number} lower
     * @param  {Number} upper
     * @return {Boolean}
     */
    function between(lower, upper) {
        var c = constrain(lower, upper);
        return function betweeninner(v) {
            return c(v) === v;
        };
    }
    this.between = between;

    /**
     * Determines whether a property exists
     * @param  {String}  pname
     * @return {Boolean}
     */
    function has(pname) {
        return function hasinner(o) {
            return Object.hasOwnProperty.call(o, pname);
        };
    }
    this.has = has;

    /**
     * Returns a property from an input object
     * @param  {String} pname
     * @return {*}
     */
    function prop(pname) {
        return function propinner(o) {
            return o[pname];
        };
    }
    this.prop = prop;
    this.pluck = prop;

    /**
     * Invokes a function on input and returns the result
     * @param  {String} fn
     * @return {*}
     */
    function func(fn) {
        return function funcinner(o) {
            return o[fn]();
        };
    }
    this.func = func;

    /**
     * Matches input against a regular expression
     * @param  {String|RegExp} re
     * @return {Boolean}
     */
    function match(re) {
        if (! (re instanceof RegExp)) {
            re = new RegExp("^" + re + "$");
        }
        return function matchinner(v) {
            return re.test(v);
        };
    }
    this.match = match;

    /**
     * A shorthand for an inverted match
     * @param  {String|RegExp} re
     * @return {Boolean}
     */
    function omit(re) {
        return compose(inverse, match(re));
    }
    this.omit = omit;

    /**
     * Splits a string using a separator.
     * Can limit the number of pieces input is split into,
     * without truncating the returned result.
     * @param  {String} sep
     * @param  {Number} [limit=1]
     * @return {Array}
     * @example split(" ")("foo bar baz") => ["foo", "bar", "baz"]
     * @example split(" ", 2)("foo bar baz") => ["foo", "bar baz"]
     */
    function split(sep, limit) {
        limit = limit && Math.max(limit, 1) || false;
        return function splitinner(s) {
            var p = s.split(sep);
            var r;
            if (!!limit) {
                r = p.splice(limit);
                r.unshift(p.pop());
                p.push(r.join(sep));
            }
            return p;
        };
    }
    this.split = split;

    /**
     * Extracts the keys from an object
     * @param  {Object} o
     * @return {Array}
     */
    function keys(o) {
        var ret = [];
        var k;
        for (k in o) {
            if (has(k)(o)) {
                ret.push(k);
            }
        }
        return ret;
    }
    this.keys = keys;

    /**
     * Extracts the values from an object
     * @param  {Object} o
     * @return {Array}
     */
    function values(o) {
        var ret = [];
        keys(o).forEach(function (k) {
            ret.push(o[k]);
        });
        return ret;
    }
    this.values = values;

    /**
     * Flips the keys and the values of an object
     * @param  {Object} o
     * @return {Object}
     */
    function flip(o) {
        return dict(values(o))(keys(o));
    }
    this.flip = flip;

    /**
     * Maps an array to a dictionary-like object
     * @param  {Array} keys
     * @return {Object}
     * @example object(["name", "value"])(["foo", "bar"]) => { name: "foo", value: "bar" }
     */
    function dict(keys) {
        return function objectinner(a) {
            var ret = {};
            var k = keys.slice(0);
            while (k.length > 0) {
                ret[k.shift()] = a.shift();
            }
            return ret;
        };
    }
    this.dict = dict;

    /**
     * Creates a partial application of a function
     * @param {Object} [thisp] Specify a bound context
     * @param {Function} [func] The function to bind params to
     * @return {*}
     * @example add2 = partial(add, 2)(2) => 2 + 2
     * @example ua = partial(window, function () { return this.navigator })() => get window.navigator
     */
    function partial(thisp, func /*, fixed arguments */) {
        var outerargs = toarray(arguments);

        func = outerargs.shift();

        /* Check for a context param */
        if (typeof(func) !== "function") {
            thisp = func;
            func = outerargs.shift();
        }

        return function partialinner() {
            var args = outerargs.concat(toarray(arguments));
            return func.apply(thisp || this, args);
        };
    }
    this.partial = partial;

    /**
     * Creates a partial application of a function where params are bound from the right to left
     * @param {Object} [thisp] Specify a bound context
     * @param {Function} [func] The function to bind params to
     * @return {*}
     * @example pow2 = partial(Math.pow, 4)(3) => 3^4 => 81
     */
    function partialr(thisp, func) {
        var outerargs = toarray(arguments);

        func = outerargs.shift();

        /* Check for a context param */
        if (typeof(func) !== "function") {
            thisp = func;
            func = outerargs.shift();
        }

        return function () {
            var args = toarray(arguments).concat(outerargs);
            return func.apply(thisp || this, args);
        };
    }
    this.partialr = partialr;

    /**
     * Will wrap a function and continue to return new functions
     * until all arguments have a value, after which the original
     * function is invoked with the accumulated arguments
     * @param  {function} func
     * @return {*}
     * @example curry(add)(1)(2) => 3
     * @example curry(add)(1)()()()()(2) => 3
     */
    function curry(func) {
        var args = tail(toarray(arguments));
        var nreq = func.length;
        var thisp;

        return function () {
            args = args.concat(toarray(arguments));

            if (args.length < nreq) {
                return curry.apply(thisp, [func].concat(args));
            }

            return func.apply(thisp, args);
        };
    }
    this.curry = curry;

    /**
     * Composes a function stack which is input is piped through.
     * The stack is evaluated from right-to-left, i.e. the first
     * param returns the final result.
     * Optionally a context can be given as the last parameter.
     * @param {Function} fn
     * @param {Object} thisp
     * @return {*}
     * @example splitrim = compose(trim, prop("foo"))({foo: "  yay   "}) => trim(prop("foo")) => "yay"
     * @example randint4 = compose(Math.round, partial(mul, 4), Math.random)() => Math.round(mul(4, Math.random()))
     */
    function compose(/* function1, function2, function3, functionN, thisp */) {
        var fstack = toarray(arguments).reverse();
        var thisp;

        /* Check for a context param */
        if (typeof(first(fstack)) !== "function") {
            thisp = fstack.shift();
        }

        return function composeinner() {
            var r = arguments;
            fstack.forEach(function composeexec(f) {
                r = [f.apply(thisp || this, r)];
            });
            return r[0];
        };
    }
    this.compose = compose;

    return this;
}));
