import * as PIXI from 'pixi.js';

export default class Container extends PIXI.Container {
  constructor({
    name = '',
    position = [0, 0],
    scale = [1, 1],
    width = 0,
    height = 0,
    boundingBox = true,
    boundingBoxAlpha = 0,
  } = {}) {
    super();

    this.name = `${name}Container`;
    this.position.set(...position);
    this.scale.set(...scale);

    const [xScale, yScale] = scale;

    if (boundingBox) {
      const area = new PIXI.Graphics();
      area.name = 'boundingBox';
      area.beginFill(0xB1D1D4);
      area.alpha = boundingBoxAlpha;
      area.drawRect(0, 0, xScale * width, yScale * height);
      this.addChild(area);
    }


    window[this.name] = this;
  }
}
