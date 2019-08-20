import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import fileName from '../utils/fileName';

const sharedLoader = PIXI.Loader.shared;

export default function addImages(images) {
  _.forEach(images, (image) => {
    const name = fileName(image);

    sharedLoader.add(name, `/assets/images/${image}`);
  });
}
