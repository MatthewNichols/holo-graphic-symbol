# holo-graphic-symbol

I have a lot of friends at [Holo](https://holo.host/) / [Holochain](https://holochain.org/) and I saw one of the designs on their site and got inspired to practice some new skills with HTML Canvas rendering and animating it in interesting ways. Work in progress. 

The latest version is autodeployed on Netlify at https://holo-graphic-symbol.netlify.com/. It has controls that let you tweek the assorted parameters that drive the visuals.

[![Netlify Status](https://api.netlify.com/api/v1/badges/7366ae2c-0053-46a3-8d7e-92a901716f39/deploy-status)](https://app.netlify.com/sites/holo-graphic-symbol/deploys)

It is a NPM/(ParcelJS)[https://parceljs.org/] project written in Typescript. The main rendering code is talking directly to HTML Canvas and the parameters UI is in [VUE.JS](https://vuejs.org/). I have run this on both Windows and [WSL](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux "Windows Subsystem for Linux") so it should be runnable elsewhere.

## Setup to play with locally
I am assuming you have Node/NPM installed. I have tried to make it run with all other dependencies being local.

- Clone project locally
- In a command line:
    - `npm install`
    - `npm run start`
- Open a browser to http://localhost:1234/index.html

## Possible directions
- Implement an SVG renderer also. There is an SVG_Rendering branch where I took a stab at this and it renders OK, but the animation performance is horrible. Will require a different approach.
- Implement the geometry calculation in WebAssembly and see if it performs better than in TS/JS. Rough benchmarks show that the calculations currently take a lot longer (50-ish times as long) than the writing to Canvas. Very interested to see if that can be improved with WebAssembly and it is a good place for me to hone those skills.
- Make the layout responsive: I should have done this from the beginning. Bad Geek.
- Additional Animations? I have some thoughts.

Play around with it, open issues if you run into problems or if you want to coolaborate. 