import get from 'lodash/get';
import * as PIXI from 'pixi.js';
import { Easing, Tween } from 'es6-tween';
import Container from '../Container';
import { CONTAINERS } from '../../Config';
import eventEmitter from '../../utils/eventEmitter';
import Draggable from '../../componets/Draggable';
import { DRAG_END } from '../../componets/Draggable/events';
import { emitPlayClick } from './events';

const { COMMANDS } = CONTAINERS;

export default class Commands extends Container {
  constructor() {
    super(COMMANDS);

    const globalPosition = this.getGlobalPosition();
    this.dropZone = {
      xStart: globalPosition.x - 30,
      yStart: globalPosition.y - 30,
      xEnd: globalPosition.x + this.width + 30,
      yEnd: globalPosition.y + this.height + 30,
    };

    const [xScale, yScale] = COMMANDS.scale;
    const playWidth = xScale * this.height;
    const playHeight = yScale * this.height;
    this.play = new PIXI.Graphics();
    this.play.name = 'playBox';
    this.play.interactive = true;
    this.play.buttonMode = true;
    this.play.beginFill(0x6acd75);
    this.play.lineStyle(1.2, 0x000000);
    this.play.drawRect(this.width - playWidth, 0, playWidth, playHeight);
    this.addChild(this.play);

    this.play
      .on('mouseup', this.onPlayClickEnd.bind(this))
      .on('mouseupoutside', this.onPlayClickEnd.bind(this))
      .on('touchend', this.onPlayClickEnd.bind(this))
      .on('touchendoutside', this.onPlayClickEnd.bind(this));

    this.items = [];

    eventEmitter.on(DRAG_END, this.onDragEnd, this);
  }

  onPlayClickEnd() {
    emitPlayClick(this.items);
  }

  onDragEnd(data) {
    const {
      xStart, xEnd, yStart, yEnd,
    } = this.dropZone;
    const { x, y } = data;

    if (x >= xStart && x <= xEnd
      && y >= yStart && y <= yEnd) {
      const draggable = new Draggable({
        name: data.name,
        resource: data.resource,
        texture: data.texture,
        scale: [0.7, 0.7],
        degree: data.degree,
      });
      const previousItemsX = get(this.items, `[${this.items.length - 1}].x`, 0);
      const previousItemsWidth = get(this.items, `[${this.items.length - 1}].width`, 0);
      const initialX = previousItemsX + previousItemsWidth * 0.5 + (draggable.width * 0.5) + 20;
      const initialY = this.height * 0.5;
      draggable.position.set(initialX, initialY);
      draggable.original.x = initialX;
      draggable.original.y = initialY;

      draggable.scale.set(0);
      new Tween(draggable.scale)
        .to({
          x: 0.7,
          y: 0.7,
        }, 750)
        .easing(Easing.Bounce.Out)
        .start();

      this.items.push(draggable);
      this.addChild(draggable);
    }
  }
}
