import Road from '../Road';


export default class Ground {
  constructor({
    height = 0,
    width = 0,
    tiles = [],
    max = 0,
    xOffset = 0,
    yOffest = 0,
    parent = null,
  } = {}) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];
        if (tile < max) {
          const spr = new Road({
            textureId: tile,
            scale: [2, 2],
          });
          spr.position.set((xOffset + spr.width * 0.5) + (x * spr.width), (yOffest + spr.height * 0.5) + (y * spr.height));

          if (parent) {
            parent.addChild(spr);
          }
        }
      }
    }
  }
}
