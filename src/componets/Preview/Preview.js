import * as PIXI from 'pixi.js';
import get from 'lodash/get';
import { CONTAINERS, PREVIEW } from '../../Config';
import { emitPreviewClick } from './events';

const { resources } = PIXI.Loader.shared;

const { PLAYZONE } = CONTAINERS;
const containerWidth = PLAYZONE.width;
const containerHeight = PLAYZONE.height;
const containerQuadrantHeight = containerHeight / 4;

const { containerOffset, numberOfColoumns } = PREVIEW;
const previewContainerWidth = (containerWidth / numberOfColoumns);
const previewContainerHalfWidth = previewContainerWidth * 0.5;
const previewItemWidth = previewContainerWidth - containerOffset;

export default class Preview extends PIXI.Sprite {
  constructor({
    resource = null,
    index = 0,
    anchor = [0.5, 0.5],
  } = {}) {
    super(get(resources, `${resource}.texture`, ''));

    const xIndex = index - 1;
    const yIndex = Math.ceil(index / numberOfColoumns - 1);

    this.index = index;
    this.name = `Preview${index}`;
    this.interactive = true;
    this.buttonMode = true;
    this.anchor.set(...anchor);
    this.scale.set(previewItemWidth / this.width);
    this.position.set(previewContainerHalfWidth + previewContainerWidth * xIndex,
      containerQuadrantHeight + containerQuadrantHeight * yIndex);

    this
      .on('mouseup', this.onClickEnd.bind(this))
      .on('mouseupoutside', this.onClickEnd.bind(this))
      .on('touchend', this.onClickEnd.bind(this))
      .on('touchendoutside', this.onClickEnd.bind(this));
  }

  onClickEnd() {
    emitPreviewClick(this.index);
  }
}
