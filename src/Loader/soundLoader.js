import * as PIXI from 'pixi.js';
import forEach from 'lodash/forEach';
import fileName from '../utils/fileName';

const sharedLoader = PIXI.Loader.shared;

export default function addSounds(sounds) {
  forEach(sounds, (sound) => {
    const name = fileName(sound);

    sharedLoader.add(name, `/assets/sounds/${sound}`);
  });
}
