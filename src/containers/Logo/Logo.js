
import * as PIXI from 'pixi.js';
import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { LOGO } = CONTAINERS;
const { resources } = PIXI.Loader.shared;

export default class Logo extends Container {
  constructor() {
    super(LOGO);

    const policecar = new PIXI.Sprite(resources.police.textures.policecar);
    policecar.scale.set(-1, 1);
    policecar.anchor.set(0.5);
    policecar.position.set(300 - policecar.width * 0.5, 300 - policecar.height * 0.5);
    this.addChild(policecar);

    const policeman = new PIXI.Sprite(resources.police.textures.policeman);
    policeman.scale.set(1, 1);
    policeman.anchor.set(0.5);
    policeman.position.set(300 - 100, 300 - policeman.height * 0.5);
    this.addChild(policeman);
  }
}
