import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import fileName from '../utils/fileName';

const sharedLoader = PIXI.Loader.shared;

export default function addSounds(sounds) {
  _.forEach(sounds, (sound) => {
    const name = fileName(sound);

    console.log(`${name} - ${sound}`);
    sharedLoader.add(name, `/assets/sounds/${sound}`);
  });
}
