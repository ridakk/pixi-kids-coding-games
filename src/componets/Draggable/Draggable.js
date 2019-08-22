import * as PIXI from 'pixi.js';
import * as _ from 'lodash';

const { resources } = PIXI.Loader.shared;

export default class Draggable extends PIXI.Sprite {
  constructor({
    name = 'draggable',
    resource = null,
    texture = null,
    position = [0, 0],
    scale = [1, 1],
    anchor = [0.5, 0.5],
    degree = 0,
    interactive = true,
    buttonMode = true,
  } = {}) {
    super(_.get(resources, `${resource}.textures.${texture}`, null));

    this.name = name;
    this.scale.set(...scale);
    this.anchor.set(...anchor);
    this.rotation = Math.PI * degree / 180;
    this.position.set(...position);

    this.interactive = interactive;
    this.buttonMode = buttonMode;

    this
      // events for drag start
      .on('mousedown', this.onDragStart.bind(this))
      .on('touchstart', this.onDragStart.bind(this))
      // events for drag end
      .on('mouseup', this.onDragEnd.bind(this))
      .on('mouseupoutside', this.onDragEnd.bind(this))
      .on('touchend', this.onDragEnd.bind(this))
      .on('touchendoutside', this.onDragEnd.bind(this))
      // events for drag move
      .on('mousemove', this.onDragMove.bind(this))
      .on('touchmove', this.onDragMove.bind(this));
  }

  onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.dragging = true;
  }

  onDragEnd() {
    this.dragging = false;

    // set the interaction data to null
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }
}
