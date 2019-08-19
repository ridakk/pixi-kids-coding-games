import * as PIXI from 'pixi.js';
import addImages from './imageLoader';
import addSounds from './soundLoader';
import addFonts from './fontLoader';
import { emitPreLoaderComplete, emitLoaderComplete, emitLoaderProgress } from './events';


export default class Loader {
  constructor(preloader = [], images = [], sounds = [], fonts = []) {
    this.loader = new PIXI.Loader();
    this.loader.add(preloader);
    this.loader.onComplete.add(emitPreLoaderComplete);

    this.sharedLoader = PIXI.Loader.shared;
    addImages(images);
    addSounds(sounds);
    addFonts(fonts);
    this.sharedLoader.onProgress.add(emitLoaderProgress);
    this.sharedLoader.onComplete.add(emitLoaderComplete);
  }

  load() {
    this.loader.load();
    this.sharedLoader.load();
  }
}
