import * as PIXI from 'pixi.js';
import { Easing, Tween } from 'es6-tween';
import Container from '../Container';
import { CONTAINERS } from '../../Config';
import eventEmitter from '../../utils/eventEmitter';
import Draggable from '../../componets/Draggable';
import { DRAG_END } from '../../componets/Draggable/events';
import { LEVEL_COMPLETED } from '../Game/events';
import { CANCEL_CLICKED } from '../../componets/Note/events';
import { PREVIEW_CLICKED } from '../../componets/Preview/events';
import { emitPlayClick } from './events';

const { COMMANDS } = CONTAINERS;
const { resources } = PIXI.Loader.shared;

export default class Commands extends Container {
  constructor() {
    super(COMMANDS);

    const { numberOfButtons } = COMMANDS;
    for (let i = 0; i < numberOfButtons; i++) {
      const envelope = new PIXI.Sprite(resources.square.texture);
      envelope.name = `envelope${i}`;
      envelope.anchor.set(0.5);
      envelope.scale.set(0.6);
      envelope.position.set((i * envelope.width) + (envelope.width * 0.5), envelope.height * 0.5);
      this.addChild(envelope);
    }

    const lastEnvelope = this.getChildByName('envelope9');
    this.play = new PIXI.Sprite(resources.circle.texture);
    this.play.name = 'playBox';
    this.play.interactive = true;
    this.play.buttonMode = true;
    this.play.tint = 0x6acd75;
    this.play.anchor.set(0.5);
    this.play.scale.set(0.8);
    this.play.position.set((numberOfButtons * lastEnvelope.width) + (this.play.width * 0.5),
      lastEnvelope.height * 0.5);
    this.addChild(this.play);

    this.play
      .on('mouseup', this.onPlayClickEnd.bind(this))
      .on('mouseupoutside', this.onPlayClickEnd.bind(this))
      .on('touchend', this.onPlayClickEnd.bind(this))
      .on('touchendoutside', this.onPlayClickEnd.bind(this));

    this.items = [];
    this.itemIndex = 0;

    eventEmitter.on(DRAG_END, this.onDragEnd, this);
    eventEmitter.on(LEVEL_COMPLETED, this.clearArrows, this);
    eventEmitter.on(CANCEL_CLICKED, this.clearArrows, this);
    eventEmitter.on(PREVIEW_CLICKED, this.clearArrows, this);
  }

  onPlayClickEnd() {
    emitPlayClick(this.items);
  }

  onDragEnd(data) {
    if (this.itemIndex === 10) {
      return;
    }

    const globalPosition = this.getGlobalPosition();

    const xStart = globalPosition.x - 30;
    const yStart = globalPosition.y - 30;
    const xEnd = globalPosition.x + this.width + 30;
    const yEnd = globalPosition.y + this.height + 30;
    const { x, y } = data;

    console.log(`x: ${x} is between ${xStart} - ${xEnd}`);
    console.log(`y: ${y} is between ${yStart} - ${yEnd}`);

    if (x >= xStart && x <= xEnd
      && y >= yStart && y <= yEnd) {
      const draggable = new Draggable({
        name: data.name,
        resource: data.resource,
        texture: data.texture,
        scale: [1, 1],
        degree: data.degree,
      });
      draggable.position.set(0, -5);

      draggable.scale.set(0);
      new Tween(draggable.scale)
        .to({
          x: 1,
          y: 1,
        }, 750)
        .easing(Easing.Bounce.Out)
        .start();

      this.items.push(draggable);
      this.getChildByName(`envelope${this.itemIndex}`).addChild(draggable);
      this.itemIndex += 1;
    }
  }

  clearArrows() {
    const { numberOfButtons } = COMMANDS;
    for (let i = 0; i < numberOfButtons; i++) {
      this.getChildByName(`envelope${i}`).removeChildren();
    }

    this.items.splice(0, this.items.length);
  }
}
