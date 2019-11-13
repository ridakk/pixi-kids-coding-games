import * as PIXI from 'pixi.js';
import 'pixi-sound'; // eslint-disable-line import/no-unassigned-import
import { autoPlay } from 'es6-tween';
import Loader from './Loader';
import {
  PRELOADER_COMPLETE, LOADER_PROGRESS, FONTLOADER_COMPLETE,
} from './Loader/events';
import eventEmitter from './utils/eventEmitter';
import {
  PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS,
} from './Config';
import Game from './containers/Game';

import 'normalize.css';
import './index.css';

autoPlay(true);

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });

const app = new PIXI.Application({
  width: 1280,
  height: 720,
  sharedTicker: true,
  sharedLoader: true,
  antialias: false,
  transparent: false,
  backgroundColor: 0xB1D1D4,
});

document.body.appendChild(app.view);

app.stage.addChild(new Game());

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

loader.load();
