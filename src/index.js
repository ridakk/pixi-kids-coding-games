import * as PIXI from 'pixi.js';
import { Easing, Tween, autoPlay } from 'es6-tween';

import 'normalize.css';
import './index.css';

autoPlay(true);

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__
  && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });

const app = new PIXI.Application({
  width: 1280,
  height: 720,
  sharedTicker: true,
  sharedLoader: true,
  backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

const sharedLoader = PIXI.Loader.shared;

sharedLoader.add('roads', 'assets/images/roads.json');
sharedLoader.add('cars', 'assets/images/cars.json');

sharedLoader.load((loader, resources) => {
  const png1 = new PIXI.Sprite(resources.roads.textures.road1);
  png1.position.set(app.renderer.width / 2, app.renderer.height / 2);
  png1.anchor.set(0.5);

  app.stage.addChild(png1);

  const png5 = new PIXI.Sprite(resources.roads.textures.road5);
  png5.position.set(676, 339);
  png5.anchor.set(0.5);
  app.stage.addChild(png5);

  const ca1 = new PIXI.Sprite(resources.cars.textures.car11);
  ca1.position.set(717, 304);
  ca1.anchor.set(0.5);
  ca1.scale.set(0.7);
  app.stage.addChild(ca1);

  new Tween(ca1)
    .to({ x: 624, y: 357 }, 1000)
    .easing(Easing.Quadratic.Out)
    .start();
});
