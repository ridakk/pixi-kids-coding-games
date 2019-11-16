import * as PIXI from 'pixi.js';
import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { PLAYZONE } = CONTAINERS;
const { resources } = PIXI.Loader.shared;

export default class PlayZone extends Container {
  constructor() {
    super(PLAYZONE);


    const background = new PIXI.Sprite(resources['9049'].texture);
    background.anchor.set(0.5);
    background.scale.set(this.width / background.width, this.height / background.height);
    background.position.set(this.width / 2, this.height / 2);
    this.addChild(background);
  }
}
