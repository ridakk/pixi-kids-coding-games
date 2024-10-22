import * as PIXI from 'pixi.js';
import Container from '../Container';
import { WIDTH, HEIGHT } from '../../Config';
import { emitWinDismissed } from './events';

const { resources } = PIXI.Loader.shared;

export default class Win extends Container {
  constructor() {
    super({
      name: 'Win',
      boundingBox: false,
    });

    this.interactive = true;
    this.buttonMode = true;

    const graphic = new PIXI.Graphics();
    graphic.clear();
    graphic.beginFill(0x000000, 0.4);

    graphic.drawRect(0, 0, WIDTH, HEIGHT);
    this.addChild(graphic);

    const badge = new PIXI.Sprite(resources.badge.texture);
    badge.anchor.set(0.5);
    badge.position.set(WIDTH * 0.5, HEIGHT * 0.25);
    this.addChild(badge);

    const ribbon = new PIXI.Sprite(resources.ribbon1.texture);
    ribbon.anchor.set(0.5);
    ribbon.rotation = Math.PI * -45 / 180;
    ribbon.position.set(0 + ribbon.getBounds().width * 0.5,
      0 + ribbon.getBounds().height * 0.5);
    this.addChild(ribbon);

    const ribbon2 = new PIXI.Sprite(resources.ribbon1.texture);
    ribbon2.anchor.set(0.5);
    ribbon2.rotation = Math.PI * 45 / 180;
    ribbon2.position.set(WIDTH - ribbon2.getBounds().width * 0.5,
      0 + ribbon2.getBounds().height * 0.5);
    this.addChild(ribbon2);

    const style = new PIXI.TextStyle({
      dropShadow: true,
      fill: [
        '#0096ff',
        '#00f900',
      ],
      fontFamily: 'Christopher Done',
      fontSize: 120,
      fontWeight: 600,
      stroke: '#0433ff',
      strokeThickness: 2,
    });
    const text = new PIXI.Text('Level Completed', style);
    text.anchor.set(0.5);
    text.position.set(WIDTH * 0.5, HEIGHT * 0.5);
    this.addChild(text);

    const style2 = new PIXI.TextStyle({
      dropShadow: true,
      fill: [
        '#0096ff',
        '#00f900',
      ],
      fontFamily: 'Christopher Done',
      fontSize: 60,
      fontWeight: 500,
      stroke: '#0433ff',
      strokeThickness: 1,
    });
    const text2 = new PIXI.Text('Click Anywhere to Continue', style2);
    text2.anchor.set(0.5);
    text2.position.set(WIDTH * 0.5, HEIGHT * 0.75);
    this.addChild(text2);

    this
      .on('mouseup', emitWinDismissed)
      .on('mouseupoutside', emitWinDismissed)
      .on('touchend', emitWinDismissed)
      .on('touchendoutside', emitWinDismissed);
  }
}
