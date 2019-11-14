import * as PIXI from 'pixi.js';
import 'pixi-sound'; // eslint-disable-line import/no-unassigned-import
import { autoPlay } from 'es6-tween';
import Loader from './Loader';
import {
  PRELOADER_COMPLETE, LOADER_PROGRESS, FONTLOADER_COMPLETE,
} from './Loader/events';
import eventEmitter from './utils/eventEmitter';
import {
  WIDTH, HEIGHT, PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS,
} from './Config';
import Game from './containers/Game';

import 'normalize.css';
import './index.css';

autoPlay(true);

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });


const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  sharedTicker: true,
  sharedLoader: true,
  antialias: false,
  transparent: false,
  backgroundColor: 0xB1D1D4,
});

document.body.appendChild(app.view);

app.stage.addChild(new Game());
window.aa = app;

const loader = new Loader(PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS);
eventEmitter.on(PRELOADER_COMPLETE, () => {
  console.log('preloader complete');
});

eventEmitter.on(LOADER_PROGRESS, (progess) => {
  console.log(`progress: ${progess}`);
});

eventEmitter.on(FONTLOADER_COMPLETE, (isActive) => {
  console.log(`font loaded: ${isActive}`);
});

/**
 * @param {PIXI.Application} app
 * @returns {Function}
 */
function resize() {
  const vpw = window.innerWidth; // Width of the viewport
  const vph = window.innerHeight; // Height of the viewport
  console.log(`window inner width/height: ${vpw}/${vph}`);
  let nvw; // New game width
  let nvh; // New game height

  // The aspect ratio is the ratio of the screen's sizes in different dimensions.
  // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

  if (vph / vpw < HEIGHT / WIDTH) {
    // If height-to-width ratio of the viewport is less than the height-to-width ratio
    // of the game, then the height will be equal to the height of the viewport, and
    // the width will be scaled.
    nvh = vph;
    nvw = (nvh * WIDTH) / HEIGHT;
  } else {
    // In the else case, the opposite is happening.
    nvw = vpw;
    nvh = (nvw * HEIGHT) / WIDTH;
  }

  // Set the game screen size to the new values.
  // This command only makes the screen bigger --- it does not scale the contents of the game.
  // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
  console.log(`app renderer resize: ${nvw}/${nvh}`);
  app.renderer.resize(nvw, nvh);

  // This command scales the stage to fit the new size of the game.
  const scaleX = nvw / WIDTH;
  const scaleY = nvh / HEIGHT;
  console.log(`app stage scale: ${scaleX}/${scaleY}`);
  app.stage.scale.set(scaleX, scaleY);
}

// Perform initial resizing
resize();
// Add event listener so that our resize function runs every time the
// browser window is resized.
window.addEventListener('resize', resize);

loader.load();
