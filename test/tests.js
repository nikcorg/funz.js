/*globals test:true, ok:true, equal:true, deepEqual:true, throws:true, funz:true*/
test("funz is a property of window", function () {
    ok(window.funz);
});

test("toarray returns array", function () {
    equal(true, funz.toarray(arguments) instanceof Array);

    var f = new function (a, b) {
        equal(true, funz.toarray(arguments).length === 2);
    }("foo", "bar");
});

test("lt", function () {
    equal("function", typeof funz.lt(2));
    equal(true, funz.lt(2)(-2));
    equal(true, funz.lt(2)(1));
    equal(false, funz.lt(2)(2));
    equal(false, funz.lt(2)(3));
});

test("lte", function () {
    equal("function", typeof funz.lte(2));
   equal(true, funz.lte(2)(-2));
   equal(true, funz.lte(2)(1));
   equal(true, funz.lte(2)(2));
   equal(false, funz.lte(2)(3));
});

test("gt", function () {
    equal("function", typeof funz.gt(2));
    equal(false, funz.gt(2)(-2));
    equal(false, funz.gt(2)(1));
    equal(false, funz.gt(2)(2));
    equal(true, funz.gt(2)(3));
});

test("gte", function () {
    equal("function", typeof funz.gte(2));
    equal(false, funz.gte(2)(-2));
    equal(false, funz.gte(2)(1));
    equal(true, funz.gte(2)(2));
    equal(true, funz.gte(2)(3));
});

test("eq", function () {
    equal("function", typeof funz.eq(2));
    equal(true, funz.eq(2)(2));
    equal(false, funz.eq(2)(1));
    equal(false, funz.eq(2)(3));
});

test("odd", function () {
    equal(true, funz.odd(3));
    equal(false, funz.odd(2));
});

test("even", function () {
    equal(true, funz.even(2));
    equal(false, funz.even(3));
});

test("mul", function () {
    equal(8, funz.mul(2, 4));
    equal(8, funz.mul(4, 2));
});

test("add", function () {
    equal(4, funz.add(3, 1));
    equal(4, funz.add(1, 3));
});

test("sub", function () {
    equal(1, funz.sub(4, 3));
    equal(-1, funz.sub(3, 4));
});

test("always", function () {
    var monadic = funz.always("foo");
    equal("function", typeof monadic);
    equal("foo", monadic("bar"));
    equal("foo", monadic("baz"));
});

test("head", function () {
    deepEqual(["foo"], funz.head(["foo","bar","baz"]));
    deepEqual(["foo","bar"], funz.head(["foo","bar","baz"], 2));
    deepEqual(["foo"], funz.head(["foo","bar","baz"], -1));
});

test("tail", function () {
    deepEqual(["bar", "baz"], funz.tail(["foo","bar","baz"]));
    deepEqual(["baz"], funz.tail(["foo","bar","baz"], 2));
    deepEqual(["bar", "baz"], funz.tail(["foo","bar","baz"], -1));
});

test("first", function () {
    equal("foo", funz.first(["foo", "bar", "baz"]));
    equal(undefined, funz.first([]));
});

test("last", function () {
    equal("baz", funz.last(["foo", "bar", "baz"]));
    equal(undefined, funz.last([]));
});

test("sign", function () {
    equal(-1, funz.sign(-123));
    equal(-1, funz.sign(-1));
    equal(1, funz.sign(982174));
    equal(1, funz.sign(1));
    equal(0, funz.sign(0));
    equal(0, funz.sign("foo"));
});

test("inverse", function () {
    equal(true, funz.inverse(false));
    equal(false, funz.inverse(true));
});

test("empty", function () {
    equal(true, funz.empty(""));
    equal(true, funz.empty([]));
    equal(false, funz.empty("foo"));
    equal(false, funz.empty(["foo"]));
});

test("trim", function () {
    equal("", funz.trim("   "));
    equal("a", funz.trim("    a    "));
    equal("a", funz.trim("a    "));
    equal("a", funz.trim("    a"));
});

test("constrain", function () {
    equal("function", typeof funz.constrain(1, 10));
    equal(3, funz.constrain(1, 10)(3));
    equal(1, funz.constrain(1, 10)(0));
    equal(1, funz.constrain(1, 10)(-10));
    equal(10, funz.constrain(1, 10)(10));
    equal(10, funz.constrain(1, 10)(11));
    equal(10, funz.constrain(1, 10)(231));
});

test("between", function () {
    equal("function", typeof funz.between(1, 10));
    equal(true, funz.between(1, 10)(3));
    equal(false, funz.between(1, 10)(0));
    equal(false, funz.between(1, 10)(-10));
    equal(true, funz.between(1, 10)(10));
    equal(false, funz.between(1, 10)(11));
    equal(false, funz.between(1, 10)(231));
});

test("has", function () {
    equal("function", typeof funz.has("foo"));
    equal(true, funz.has("foo")({foo: "bar"}));
    equal(false, funz.has("foo")({baz: "bar"}));
});

test("prop", function () {
    equal("function", typeof funz.prop("foo"));
    equal("bar", funz.prop("foo")({foo:"bar"}));
    equal(undefined, funz.prop("foo")({baz:"bar"}));
});

test("func", function () {
    equal("function", typeof funz.func("foo"));
    equal("foo", funz.func("foo")({foo:function(){return "foo";}}));
    throws(funz.func("foo")({foo:function(){return "foo";}}), Error);
});

test("match", function () {
    equal("function", typeof funz.match("foo"));
    equal(true, funz.match("foo")("foo"));
    equal(false, funz.match("foo")("foos"));
    equal(false, funz.match("foo")("fo"));
    equal(true, funz.match(/^fo/)("foo"));
    equal(true, funz.match(/^fo/)("foos"));
    equal(true, funz.match(/^fo/)("fo"));
});

test("omit", function () {
   equal("function", typeof funz.omit("foo"));
   equal(false, funz.omit("foo")("foo"));
   equal(true, funz.omit("foo")("foos"));
   equal(true, funz.omit("foo")("fo"));
   equal(false, funz.omit(/^fo/)("foo"));
   equal(false, funz.omit(/^fo/)("foos"));
   equal(false, funz.omit(/^fo/)("fo"));
});

test("split", function () {
    equal("function", typeof funz.split(" "));
    equal(true, funz.split(" ", 2)("foo bar baz") instanceof Array);
    equal(3, funz.split(" ")("foo bar baz").length);console.log(funz.split(" ")("foo bar baz"));
    equal(2, funz.split(" ", 2)("foo bar baz").length);
    equal("foo bar baz", funz.split(" ", 2)("foo bar baz").join(" "));
});

test("keys", function () {
    deepEqual(["foo", "bar"], funz.keys({foo:"bar",bar:"baz"}));
    deepEqual([], funz.keys({}));
});

test("values", function () {
   deepEqual(["bar", "baz"], funz.values({foo:"bar",bar:"baz"}));
   deepEqual([], funz.values({}));
});

test("flip", function () {
    deepEqual({bar:"foo", baz:"bar"}, funz.flip({foo:"bar",bar:"baz"}));
});

test("dict", function () {
    equal("function", typeof funz.dict(["foo", "bar"]));
    deepEqual({foo:"baz", bar:"quux"}, funz.dict(["foo", "bar"])(["baz", "quux"]));
});

test("partial", function () {
    var ob = {
        num: 3,
        add: function (n, m) {
            return this.num + n + (isNaN(m) ? 0 : m);
        }
    };

    equal("function", typeof funz.partial(funz.add));
    equal(9, funz.partial(funz.add, 3)(6));
    equal(9, funz.partial(ob, ob.add)(6));
    equal(8, funz.partial(ob, ob.add, -1)(6));
});

test("partialr", function () {
    var ob = {
        num: 3,
        sub: function (n, m) {
            return this.num - n - (isNaN(m) ? 0 : m);
        }
    };

    equal("function", typeof funz.partialr(Math.pow));
    equal(0, funz.partial(ob, ob.sub, -3)(6));
    equal(81, funz.partialr(Math.pow, 4)(3));
    equal(0, funz.partialr(funz.div, 1)(0));
    equal("barfoo", funz.partialr(funz.add, "foo")("bar"));
});

test("compose", function () {
    var ob = {
        suffix: "overload!",
        sofun: function (a) {
            return this.suffix + a;
        },
        toofun: function (a) {
            return this.suffix + a;
        }
    };
    function fun1(a) {
        return "fun1" + a;
    }

    function fun2(a) {
        return "fun2" + a;
    }

    function fun3(a) {
        return "fun3" + a;
    }

    equal("function", typeof funz.compose(fun1));
    equal("fun3fun2fun1fun!", funz.compose(fun3, fun2, fun1)("fun!"));
    equal("overload!overload!fun", funz.compose(ob.toofun, ob.sofun, ob)("fun"));
});
