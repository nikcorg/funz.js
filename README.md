funz.js
====

Ever since I watched the talk [Pure, Functional Javascript](https://vimeo.com/49384334) by Christian Johansen, I've been near obsessed with (ab)using map/filter/reduce and friends as much as possible. Striving for the ultimately concise solution is like polishing a piece of poetry.

As a result of this enlightenment, I've been writing and borrowing itty bitty functions from here and there which help me approach Javascript Nirvana.

Finally, I got around to compiling what I have found to be the most useful ones into one place. This is that place.

This collection will grow organically as the need for new functionality arises. If you're looking for a complete solution, this is not the place. This is more an academic exercise than a real project.

Examples
========

Parse `document.cookie`

    function parseCookies() {
        return document.cookie.split(";")
            .map(funz.trim)
            .filter(funz.compose(funz.inverse, funz.empty))
            .map(funz.compose(funz.dict(["name","value"]), funz.split("=", 2)));
    }

Find a single cookie

    function findCookie(name) {
        return parseCookies().filter(funz.compose(funz.match(name), funz.prop("name"))).pop();
    }

Get a random integer between 1 and 3

    var getRandInt = funz.compose(
        funz.partial(funz.add, 1),
        Math.round,
        funz.partial(funz.mul, 2),
        Math.random
        );

LICENSE
=======

`funz.js` is open source distributed under the MIT License. See `LICENSE`.
