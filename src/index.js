import * as PIXI from 'pixi.js';
import 'pixi-sound'; // eslint-disable-line import/no-unassigned-import
import isNil from 'lodash/isNil';
import { Easing, Tween, autoPlay } from 'es6-tween';

import Loader from './Loader';
import {
  PRELOADER_COMPLETE, LOADER_COMPLETE, LOADER_PROGRESS, FONTLOADER_COMPLETE,
} from './Loader/events';
import eventEmitter from './utils/eventEmitter';
import {
  PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS,
} from './Config';
import Commands from './containers/Commands';
import PlayZone from './containers/PlayZone';
import Actions from './containers/Actions';
import Logo from './containers/Logo';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';

import { PLAY_CLICKED } from './containers/Commands/events';

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

function setup() {
  const { resources } = PIXI.Loader.shared;

  const playZone = new PlayZone();
  cont.addChild(playZone);

  const commandsContainer = new Commands();
  cont.addChild(commandsContainer);

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

  const level = new Level3({
    parent: playZone,
  });

  // TODO: test code to chain tweens
  const { points } = level.data;
  const { commands } = level.data;
  const [start] = level.data.points;
  const child = level.getChildAt(start.index);

  const car = new PIXI.Sprite(resources.cars_top.textures.police);
  car.scale.set(0.4);
  car.anchor.set(0.5);
  car.rotation = Math.PI * 90 / 180;
  car.position.set(child.x - car.width, child.y);
  level.addChild(car);

  let loopFrom = 0;
  let loopTo = 0;


  function loop() {
    if (loopFrom >= points.length || loopFrom > loopTo) {
      resources.emergency_police_car_drive_fast_with_sirens_internal.sound.stop();
      return;
    }

    const point = points[loopFrom];

    if (!isNil(point.index) && point.start !== true) {
      const nextChild = level.getChildAt(point.index);
      new Tween(car)
        .to({
          x: point.end ? nextChild.x + car.width : nextChild.x,
          y: nextChild.y,
        }, 1500)
        .easing(Easing.Quadratic.In)
        .on('complete', () => {
          loop(loopFrom++, loopTo);
        })
        .start();
    } else if (!isNil(point.rotate)) {
      new Tween(car)
        .to({
          rotation: car.rotation + Math.PI * point.rotate / 180,
        }, 700)
        .easing(Easing.Sinusoidal.InOut)
        .on('complete', () => {
          loop(loopFrom++, loopTo);
        })
        .start();
    } else {
      loop(loopFrom++, loopTo);
    }
  }

  eventEmitter.on(PLAY_CLICKED, (userCommands) => {
    for (let i = 0, len = userCommands.length; i < len; i++) {
      const userCommand = userCommands[i];
      const command = commands[i];

      if (command.name === userCommand.name) {
        loopTo = command.pointIndexReached;
      }
    }

    resources.emergency_police_car_drive_fast_with_sirens_internal.sound.play();
    loop(loopFrom, loopTo);
  });
}
