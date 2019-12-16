import * as PIXI from 'pixi.js';
import { CONTAINERS, PREVIEW } from '../../Config';
import { emitPreviewClick } from './events';
import eventEmitter from '../../utils/eventEmitter';
import Container from '../Container';
import { LEVEL_COMPLETED } from '../Game/events';

const { resources } = PIXI.Loader.shared;

const { PLAYZONE } = CONTAINERS;
const containerWidth = PLAYZONE.width;
const containerHeight = PLAYZONE.height;
const containerHalfHeight = containerHeight / 2;

const { numberOfColoumns } = PREVIEW;
const previewContainerWidth = (containerWidth / numberOfColoumns);
const previewItemWidth = previewContainerWidth - (previewContainerWidth * 0.1);

export default class Preview extends Container {
  constructor({
    level = null,
    index = 0,
  } = {}) {
    super({
      name: `Preview${index}`,
      position: [0, 0],
      scale: [1, 1],
      width: containerWidth - (containerWidth * 0.2),
      height: containerHeight,
      boundingBox: true,
      boundingBoxAlpha: 1,
    });

    const yIndex = Math.ceil(index / numberOfColoumns - 1);
    const xIndex = index - (yIndex * numberOfColoumns) - 1;

    this.index = index;
    this.name = `Preview${index}`;
    this.interactive = true;
    this.buttonMode = true;
    this.position.set(0 + (previewContainerWidth + (previewContainerWidth * 0.2)) * xIndex,
      0 + containerHalfHeight * yIndex);

    level.position.set((this.width - level.width) * 0.5,
      (this.height * 0.5) - (level.height * 0.5));
    this.addChild(level);

    this.scale.set(previewItemWidth / level.width);

    this
      .on('mouseup', this.onClickEnd.bind(this))
      .on('mouseupoutside', this.onClickEnd.bind(this))
      .on('touchend', this.onClickEnd.bind(this))
      .on('touchendoutside', this.onClickEnd.bind(this));

    eventEmitter.on(LEVEL_COMPLETED, this.onLevelCompleted, this);
  }

  onClickEnd() {
    emitPreviewClick(this.index);
  }

  onLevelCompleted(name) {
    if (name === `Level${this.index}Ground`) {
      const badge = new PIXI.Sprite(resources.badge.texture);
      badge.anchor.set(0.5);
      this.addChild(badge);
    }
  }
}
