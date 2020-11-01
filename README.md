### IndiorTours installation

This repository goes hand in hand with the updated tutorial found at:

In order to use:

a) Run `grunt serve` in the `client` directory to up the clientside Angular server
b) Run `grunt test` in the `client` directory to run the Karma test server
c) Create a .env file in server directory with the following values:
<TODO>
c) Run `npm run dev` in the `server` directory to startup the Express API
d) Run `grunt build` in the `client` directory to build down the Angular app into the `server`'s `dist` directory
e) Run `npm start` in the `server` directory after a `grunt build` to have the entire app brought together under the `server`
