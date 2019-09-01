import get from 'lodash/get';
import { Easing, Tween } from 'es6-tween';
import Container from '../Container';
import { CONTAINERS } from '../../Config';
import eventEmitter from '../../utils/eventEmitter';
import Draggable from '../../componets/Draggable';
import { DRAG_END } from '../../componets/Draggable/events';

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

    this.items = [];

    eventEmitter.on(DRAG_END, this.onDragEnd, this);
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
      draggable.position.set(
        previousItemsX + previousItemsWidth * 0.5 + (draggable.width * 0.5) + 20,
        this.height * 0.5
      );

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
