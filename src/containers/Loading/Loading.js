import * as PIXI from 'pixi.js';
import Loader from '../../Loader';
import {
  LOADER_COMPLETE, LOADER_PROGRESS,
} from '../../Loader/events';
import eventEmitter from '../../utils/eventEmitter';
import {
  WIDTH, HEIGHT, PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS,
} from '../../Config';
import Container from '../Container';

export default class Loading extends Container {
  constructor() {
    super({
      name: 'loading',
      boundingBox: false,
    });

    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x0096ff);
    this.graphics.drawRect(0, 0, 0, HEIGHT);
    this.addChild(this.graphics);

    const style = new PIXI.TextStyle({
      dropShadow: true,
      fill: [
        '#0096ff',
        '#00f900',
      ],
      fontFamily: 'Christopher Done',
      fontSize: 60,
      fontWeight: 600,
      stroke: '#0433ff',
      strokeThickness: 2,
      align: 'center',
    });
    const text = new PIXI.Text('PIXI GAMES', style);
    text.anchor.set(0.5);
    text.position.set(WIDTH * 0.5, HEIGHT * 0.5);
    this.addChild(text);

    const loader = new Loader(PRELOADER_ASSETS, IMAGES, SOUNDS, FONTS);
    eventEmitter.on(LOADER_PROGRESS, this.handleLoaderProgress, this);
    eventEmitter.on(LOADER_COMPLETE, this.handleLoaderComplete, this);
    loader.load();
  }

  handleLoaderComplete() {
    console.log('loader complete');
    this.visible = false;
  }

  handleLoaderProgress(progess) {
    console.log(`progress: ${progess} = ${WIDTH * progess}`);

    this.graphics.clear();
    this.graphics.beginFill(0x0096ff);
    this.graphics.drawRect(0, 0, WIDTH * progess, HEIGHT);
  }
}
