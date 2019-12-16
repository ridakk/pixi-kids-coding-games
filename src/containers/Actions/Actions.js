import * as PIXI from 'pixi.js';
import Container from '../Container';
import { CONTAINERS } from '../../Config';
import Draggable from '../../componets/Draggable';
import eventEmitter from '../../utils/eventEmitter';
import { CANCEL_CLICKED } from '../../componets/Note/events';
import { PREVIEW_CLICKED } from '../Preview/events';
import { WIN_DISMISSED } from '../Win/events';

const { ACTIONS } = CONTAINERS;
const { resources } = PIXI.Loader.shared;

export default class Actions extends Container {
  constructor() {
    super(ACTIONS);

    this.visible = false;

    this.addArrow('left', 0, 0, 0);
    this.addArrow('right', 1, 0, 180);
    this.addArrow('up', 0, 1, -90);
    this.addArrow('down', 1, 1, 90);

    eventEmitter.on(WIN_DISMISSED, this.winDismissed, this);
    eventEmitter.on(CANCEL_CLICKED, this.cancelClicked, this);
    eventEmitter.on(PREVIEW_CLICKED, this.previewClicked, this);
  }

  addArrow(name, xIndex, yIndex, degree) {
    const [xScale, yScale] = ACTIONS.scale;
    const width = xScale * ACTIONS.width / 2;
    const height = yScale * ACTIONS.height / 2;

    const envelope = new PIXI.Sprite(resources.square.texture);
    envelope.name = `${name}Envelope`;
    envelope.anchor.set(0.5);
    envelope.scale.set(0.8);
    envelope.position.set((xIndex * width) + (width * 0.5),
      (yIndex * height) + (height * 0.5));

    const arrow = new Draggable({
      name,
      resource: 'arrows',
      texture: 'arrow1',
      degree,
      position: [0, -5],
    });
    envelope.addChild(arrow);
    this.addChild(envelope);
  }

  cancelClicked() {
    this.visible = false;
  }

  previewClicked() {
    this.visible = true;
  }

  winDismissed() {
    this.visible = false;
  }
}
