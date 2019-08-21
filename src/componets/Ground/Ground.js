import * as PIXI from 'pixi.js';
import Road from '../Road';

export default class Ground extends PIXI.Container {
  constructor({
    name = '',
    height = 0,
    width = 0,
    tiles = [],
    max = 0,
    xOffset = 0,
    yOffest = 0,
    parent = null,
  } = {}) {
    super();

    this.name = `${name}Ground`;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];
        if (tile < max) {
          const spr = new Road({
            textureId: tile,
            scale: [2.5, 2.5],
          });
          spr.position.set((xOffset + spr.width * 0.5) + (x * spr.width),
            (yOffest + spr.height * 0.5) + (y * spr.height));

          this.addChild(spr);
        }
      }
    }

    if (parent) {
      parent.addChild(this);


      this.position.set(parent.width * 0.5 - this.width * 0.5,
        parent.height * 0.5 - this.height * 0.5);
    }
  }
}
