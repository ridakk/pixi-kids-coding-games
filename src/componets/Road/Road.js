import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { ROADS } from '../../Config';

const { resources } = PIXI.Loader.shared;
const { PARTS } = ROADS;

export default class Road extends PIXI.Sprite {
  constructor({
    textureId = null,
    position = [0, 0],
    scale = [1, 1],
    anchor = [0.5, 0.5],
  } = {}) {
    const { textures } = _.get(resources, ROADS.texture);
    const part = _.get(PARTS, `${textureId}`, null);

    super(_.get(textures, part.texture, ''));

    this.anchor.set(...anchor);
    this.scale.set(...scale);
    this.rotation = Math.PI * part.degree / 180;
    this.position.set(...position);
  }
}
