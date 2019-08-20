import * as PIXI from 'pixi.js';

export default class Logo extends PIXI.Container {
  constructor({
    position = [950, 375],
    scale = [1, 1],
  } = {}) {
    super();

    this.name = 'Logo';
    this.position.set(...position);
    this.scale.set(...scale);

    const area = new PIXI.Graphics();
    area.beginFill(0xB1D1D4);
    area.lineStyle(1, 0x000000);
    area.drawRect(0, 0, 300, 300);
    this.addChild(area);
  }
}
