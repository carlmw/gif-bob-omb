## Gif-Bob-omb
A reaction gif previewer

Point it to a directory and it will generate previews and links to the images within.

Requires node, redis and imagemagick

To install:

    cp config.example.json config.json
    npm install
    node app.js

To run the tests:

    make
    make test-acceptance
