import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { autoPlay } from 'es6-tween';
import Loader from './Loader';
import {
  PRELOADER_COMPLETE, LOADER_COMPLETE, LOADER_PROGRESS, FONTLOADER_COMPLETE,
} from './Loader/events';
import eventEmitter from './eventEmitter';
import {
  PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS,
} from './Config';
import Commands from './containers/Commands';
import PlayZone from './containers/PlayZone';
import Actions from './containers/Actions';
import Logo from './containers/Logo';
import Road from './componets/Road';

import 'normalize.css';
import './index.css';

autoPlay(true);

PIXI.WebGLRenderer = PIXI.Renderer;
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });

// groundMap
const groundMap = {
  width: 4,
  height: 4,
  tiles: [
    1, 4, 4, 2,
    5, 8, 8, 7,
    5, 8, 8, 7,
    0, 6, 6, 3,
  ],
};

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

const loader = new Loader(PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS);
eventEmitter.on(PRELOADER_COMPLETE, () => {
  console.log('preloader complete');
});

eventEmitter.on(LOADER_COMPLETE, () => {
  console.log('loader complete');
  setup();
});

eventEmitter.on(LOADER_PROGRESS, (progess) => {
  console.log(`progress: ${progess}`);
});

eventEmitter.on(FONTLOADER_COMPLETE, (isActive) => {
  console.log(`font loaded: ${isActive}`);
});

loader.load();

/**
 * generate roads map or another map
 * @param  {} xOffset
 * @param  {} yOffest
 * @param  {} max
 * @param  {} map
 */
function addGround(xOffset, yOffest, max, map, container) {
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tile = map.tiles[y * map.width + x];
      if (tile < max) {
        const spr = new Road({
          textureId: tile,
          scale: [2, 2],
        });
        spr.position.set((xOffset + spr.width * 0.5) + (x * spr.width), (yOffest + spr.height * 0.5) + (y * spr.height));

        container.addChild(spr);
      }
    }
  }
}

function setup() {
  const { resources } = PIXI.Loader.shared;

  const playZone = new PlayZone();
  cont.addChild(playZone);

  const commands = new Commands();
  cont.addChild(commands);

  const actions = new Actions();
  cont.addChild(actions);

  const logo = new Logo();
  cont.addChild(logo);

  const policecar = new PIXI.Sprite(resources.police.textures.policecar);
  policecar.scale.set(-1, 1);
  policecar.anchor.set(0.5);
  policecar.position.set(300 - policecar.width * 0.5, 300 - policecar.height * 0.5);
  logo.addChild(policecar);

  const policeman = new PIXI.Sprite(resources.police.textures.policeman);
  policeman.scale.set(1, 1);
  policeman.anchor.set(0.5);
  policeman.position.set(300 - 100, 300 - policeman.height * 0.5);
  logo.addChild(policeman);

  addGround(0, 0, 8, groundMap, playZone);
}
