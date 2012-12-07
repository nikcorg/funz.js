f.js
====

Ever since I watched the talk [Pure Javascript](https://vimeo.com/49384334), I've been near obsessed with (ab)using map/filter/reduce and friends as much as possible. Striving for the ultimately concise solution - like polishing a piece of poetry.

As a result of this enlightenment, I've been writing and borrowing itty bitty functions from here and there which help me approach Javascript Nirvana.

Finally, I got around to compiling what I have found to be the most useful ones into one place. This is that place.

Examples
========

Parse `document.cookie`

    function parseCookies() {
        return document.cookie.split(";")
            .filter(f.compose(f.inverse, f.empty, f.trim))
            .map(f.compose(f.object(["name","value"]), f.split("=", 2)));
    }
