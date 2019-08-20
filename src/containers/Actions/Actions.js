import * as PIXI from 'pixi.js';

export default class Actions extends PIXI.Container {
  constructor({
    position = [950, 45],
    scale = [1, 1],
  } = {}) {
    super();

    this.name = 'Actions';
    this.position.set(...position);
    this.scale.set(...scale);

    const area = new PIXI.Graphics();
    area.beginFill(0xB1D1D4);
    area.lineStyle(1, 0x000000);
    area.drawRect(0, 0, 300, 300);
    this.addChild(area);
  }
}
