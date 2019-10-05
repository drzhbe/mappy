Propeller Front End Coding Challenge
====================================

Background
----------

Commonly large datasets like maps (2D or 3D) are broken down into chunks with varying levels of detail.  You will already be familiar with this concept in e.g. Google Maps, where you can zoom out to see the whole world in low detail.  Zoom in and you can see your house.  [This blog post](https://www.mapbox.com/help/how-web-maps-work/) provides a good overview.

The Challenge
-------------

We've tiled a high res image into a set of tiles in the 'tiled' folder (un-tiled.jpg is just for reference).  Create a simple frontend app in your framework of choice that displays them in the style of a 2D map view.  The app should be self contained and simple for us to build and run (e.g. provide npm install/build/start).

Tasks
-----

All these are optional, just pick ones that you think will best demonstrate your current strengths.

* Basic functionality: Allow zooming using +/- buttons, allow scrolling when the content doesn't fit in the browser viewport.
* More advanced functionality: Panning rather than scrolling, only load what's visible in the viewport, smooth zooming, styling etc.
* Consider how your app is built.
* Consider coding style (e.g. robustness and maintainability).
* Block in some simple tests.
* Any other extensions you think would demonstrate your ninja coding skills and how you will be an awesome addition to the Propeller team.

That is a long list of things, and we are aware of the fact that your time is limited. Therefore, please let us know some of the tradeoffs that you have made, what you have focussed on and what you have ignored for now.

Solution
--------

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
3. No bundling – not scalable again :)

What I focused on:
1. Keep memory allocations as low as possible
2. Zoom in/out to the same part of the image

What I'd like to improve:
1. On closer zoom levels make dragging faster
2. Try to use canvas instead of DOM elements

