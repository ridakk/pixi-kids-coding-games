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

const cont = new PIXI.Container();
app.stage.addChild(cont);

const sharedLoader = PIXI.Loader.shared;

sharedLoader.add('roads', 'assets/images/city-element-top-view-set/roads_flat.json');
sharedLoader.add('cars', 'assets/images/flat-collection-different-car-models/cars_flat.json');

sharedLoader.load((loader, resources) => {
  const p1 = new PIXI.Sprite(resources.roads.textures.road1);
  p1.position.set(app.renderer.width / 2, app.renderer.height / 2);
  p1.anchor.set(0.5);

  cont.addChild(p1);

  const p2 = new PIXI.Sprite(resources.roads.textures.turn);
  p2.position.set(p1.x + p1.width - 1, p1.y);
  p2.anchor.set(0.5);
  p2.rotation = -90 * (Math.PI / 180);
  cont.addChild(p2);

  const p3 = new PIXI.Sprite(resources.roads.textures.road1);
  p3.position.set(p1.x + p1.width - 1, p2.y - p2.height);
  p3.anchor.set(0.5);
  p3.rotation = -90 * (Math.PI / 180);
  cont.addChild(p3);

  const ca1 = new PIXI.Sprite(resources.cars.textures.coupe);
  ca1.position.set(p1.x, p1.y);
  ca1.anchor.set(0.5);
  ca1.scale.set(0.7);
  cont.addChild(ca1);

  new Tween(ca1)
    .to({ x: p1.x + 300 }, 1000)
    .easing(Easing.Quadratic.Out)
    .start();
});
