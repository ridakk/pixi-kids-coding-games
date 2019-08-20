import * as PIXI from 'pixi.js';

export default class PlayZone extends PIXI.Container {
  constructor({
    position = [30, 45],
    scale = [1, 1],
  } = {}) {
    super();

    this.name = 'PlayZone';
    this.position.set(...position);
    this.scale.set(...scale);

    const area = new PIXI.Graphics();
    area.beginFill(0xB1D1D4);
    area.lineStyle(1, 0x000000);
    area.drawRect(0, 0, 890, 550);
    this.addChild(area);
  }
}
