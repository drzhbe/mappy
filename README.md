It's hosted here https://drzhbe.github.io/mappy/src/

I'm using modules, so to avoid CORS you need to run the code in a server.
`python -m SimpleHTTPServer` would suffice.

To zoom in/out press +/- on the keyboard.

I went with pure js and no frameworks in order to:
1. Keep app size low
2. Keep it fast and simple to build (no build is the fastest build)
3. I just work faster on small project with pure js

Downsides:
1. The biggest downside is that I manage view updates myself – it's not scalable (on the other hand it's more performant)
2. No types – it's not scalable

What I focused on:
1. Keep memory allocations as low as possible
2. Zoom in/out to the same part of the image

What I'd like to improve:
1. On closer zoom levels make dragging faster
2. Try to use canvas instead of DOM elements
