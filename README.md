f.js
====

Ever since I watched the talk [Pure Javascript](https://vimeo.com/49384334), I've been near obsessed with (ab)using map/filter/reduce and friends as much as possible. Striving for the ultimately concise solution is like polishing a piece of poetry.

As a result of this enlightenment, I've been writing and borrowing itty bitty functions from here and there which help me approach Javascript Nirvana.

Finally, I got around to compiling what I have found to be the most useful ones into one place. This is that place.

Examples
========

Parse `document.cookie`

    function parseCookies() {
        return document.cookie.split(";")
            .map(f.trim)
            .filter(f.compose(f.inverse, f.empty))
            .map(f.compose(f.object(["name","value"]), f.split("=", 2)));
    }

Get a single cookie

    function getCookie(name) {
        return parseCookies().filter(f.compose(f.match(name), f.prop("name"))).pop();
    }

Get a random integer between 1 and 3

    var getRandInt = f.compose(
        f.partial(null, f.add, 1),
        Math.round,
        f.partial(null, f.mul, 2),
        Math.random
        );
