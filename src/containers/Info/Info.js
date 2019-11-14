import * as PIXI from 'pixi.js';
import Container from '../Container';
import { WIDTH, HEIGHT } from '../../Config';

const { resources } = PIXI.Loader.shared;

export default class Info extends Container {
  constructor() {
    super({
      name: 'info',
      boundingBox: false,
    });

    this.visible = false;
    this.interactive = true;
    this.buttonMode = true;

    const graphic = new PIXI.Graphics();
    graphic.clear();
    graphic.beginFill(0x000000, 0.4);

    graphic.drawRect(0, 0, WIDTH, HEIGHT);
    this.addChild(graphic);

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
      fontSize: 60,
      fontWeight: 600,
      stroke: '#0433ff',
      strokeThickness: 2,
      align: 'center',
    });
    const text = new PIXI.Text('Made with PIXI.js and ♥\n\n\nCredits\n[Images created by macrovector / Freepik]\n(http://www.freepik.com)', style);

    text.anchor.set(0.5);
    text.position.set(WIDTH * 0.5, HEIGHT * 0.5);
    this.addChild(text);

    this
      .on('mouseup', this.onClickEnd.bind(this))
      .on('mouseupoutside', this.onClickEnd.bind(this))
      .on('touchend', this.onClickEnd.bind(this))
      .on('touchendoutside', this.onClickEnd.bind(this));
  }

  onClickEnd() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
