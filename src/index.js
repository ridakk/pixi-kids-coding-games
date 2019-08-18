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
  backgroundColor: 0xB1D1D4,
});
document.body.appendChild(app.view);

const cont = new PIXI.Container();
app.stage.addChild(cont);

const sharedLoader = PIXI.Loader.shared;

sharedLoader.add('roads', 'assets/images/city-element-top-view-set/roads_flat.json');
sharedLoader.add('cars', 'assets/images/police-taxi-cars/cars_top.json');
sharedLoader.add('police', 'assets/images/police-infographic-set-with-crime-evidence-arrest-justice-jail-icons-vector-illustration/police.json');

sharedLoader.load((loader, resources) => {
  const area = new PIXI.Graphics();
  area.beginFill(0xB1D1D4);
  area.lineStyle(1, 0x000000);
  area.drawRect(30, 45, 890, 550);
  cont.addChild(area);

  const area2 = new PIXI.Graphics();
  area2.beginFill(0xB1D1D4);
  area2.lineStyle(1, 0x000000);
  area2.drawRect(30, 605, 890, 70);
  cont.addChild(area2);

  const area3 = new PIXI.Graphics();
  area3.beginFill(0xB1D1D4);
  area3.lineStyle(1, 0x000000);
  area3.drawRect(950, 45, 300, 300);
  cont.addChild(area3);

  const area4 = new PIXI.Graphics();
  area4.beginFill(0xB1D1D4);
  area4.lineStyle(1, 0x000000);
  area4.drawRect(950, 375, 300, 300);
  cont.addChild(area4);

  // const policecar = new PIXI.Sprite(resources.police.textures.policecar);
  // policecar.scale.set(1.5);
  // policecar.anchor.set(0.5);
  // policecar.position.set(app.renderer.width - policecar.width * 0.5, app.renderer.height - policecar.height * 0.5);
  // cont.addChild(policecar);

  // const policeman = new PIXI.Sprite(resources.police.textures.policeman);
  // policeman.scale.set(1.5);
  // policeman.position.set(policecar.x - 100, app.renderer.height - policeman.height * 0.5);
  // policeman.anchor.set(0.5);
  // cont.addChild(policeman);


  // const p1 = new PIXI.Sprite(resources.roads.textures.road1);
  // p1.position.set(app.renderer.width / 2, app.renderer.height / 2);
  // p1.anchor.set(0.5);

  // cont.addChild(p1);

  // const p2 = new PIXI.Sprite(resources.roads.textures.turn);
  // p2.position.set(p1.x + p1.width - 1, p1.y);
  // p2.anchor.set(0.5);
  // p2.rotation = -90 * (Math.PI / 180);
  // cont.addChild(p2);

  // const p3 = new PIXI.Sprite(resources.roads.textures.road1);
  // p3.position.set(p1.x + p1.width - 1, p2.y - p2.height);
  // p3.anchor.set(0.5);
  // p3.rotation = -90 * (Math.PI / 180);
  // cont.addChild(p3);

  // const ca1 = new PIXI.Sprite(resources.cars.textures.police);
  // ca1.anchor.set(0.5);
  // ca1.scale.set(0.3);
  // ca1.position.set(app.renderer.width / 2, app.renderer.height - 80 - ca1.height * 0.5);
  // cont.addChild(ca1);

  // new Tween(ca1)
  //   .to({ y: ca1.y - 300 }, 1000)
  //   .easing(Easing.Quadratic.Out)
  //   .start();
});
