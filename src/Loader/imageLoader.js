import * as PIXI from 'pixi.js';
import forEach from 'lodash/forEach';
import fileName from '../utils/fileName';

const sharedLoader = PIXI.Loader.shared;

export default function addImages(images) {
  forEach(images, (image) => {
    const name = fileName(image);

    sharedLoader.add(name, `/assets/images/${image}`);
  });
}
