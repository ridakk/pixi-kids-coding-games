import * as PIXI from 'pixi.js';
import get from 'lodash/get';
import { CONTAINERS, PREVIEW } from '../../Config';
import { emitPreviewClick } from './events';
import eventEmitter from '../../utils/eventEmitter';
import { LEVEL_COMPLETED } from '../../containers/Game/events';

const { resources } = PIXI.Loader.shared;

const { PLAYZONE } = CONTAINERS;
const containerWidth = PLAYZONE.width;
const containerHeight = PLAYZONE.height;
const containerQuadrantHeight = containerHeight / 4;
const containerHalfHeight = containerHeight / 2;

const { containerOffset, numberOfColoumns } = PREVIEW;
const previewContainerWidth = (containerWidth / numberOfColoumns);
const previewContainerHalfWidth = previewContainerWidth * 0.5;
const previewItemWidth = previewContainerWidth - containerOffset;

export default class Preview extends PIXI.Container {
  constructor({
    resource = null,
    index = 0,
    anchor = [0.5, 0.5],
  } = {}) {
    super();

    const background = new PIXI.Sprite(get(resources, `${resource}.texture`, ''));
    background.anchor.set(...anchor);
    background.scale.set(previewItemWidth / background.width);

    const yIndex = Math.ceil(index / numberOfColoumns - 1);
    const xIndex = index - (yIndex * numberOfColoumns) - 1;

    this.index = index;
    this.name = `Preview${index}`;
    this.interactive = true;
    this.buttonMode = true;
    this.position.set(previewContainerHalfWidth + previewContainerWidth * xIndex,
      containerQuadrantHeight + containerHalfHeight * yIndex);
    this.addChild(background);


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
