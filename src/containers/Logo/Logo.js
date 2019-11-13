
import * as PIXI from 'pixi.js';
import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { LOGO } = CONTAINERS;
const { resources } = PIXI.Loader.shared;

export default class Logo extends Container {
  constructor() {
    super(LOGO);

    const { width, height } = LOGO;

    const policecar = new PIXI.Sprite(resources.police.textures.policecar);
    policecar.scale.set(-1, 1);
    policecar.anchor.set(0.5);
    policecar.position.set(width - policecar.width * 0.5, height - policecar.height * 0.5);
    this.addChild(policecar);

    const policeman = new PIXI.Sprite(resources.police.textures.policeman);
    policeman.scale.set(1, 1);
    policeman.anchor.set(0.5);
    policeman.position.set(width - 100, height - policeman.height * 0.5);
    this.addChild(policeman);
  }
}
