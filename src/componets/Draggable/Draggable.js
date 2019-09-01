import * as PIXI from 'pixi.js';
import get from 'lodash/get';
import { Easing, Tween } from 'es6-tween';
import { emitDragEnd } from './events';

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
    super(get(resources, `${resource}.textures.${texture}`, null));

    this.name = name;
    this.resourceName = resource;
    this.textureName = texture;
    this.degree = degree;
    this.scale.set(...scale);
    this.anchor.set(...anchor);
    this.rotation = Math.PI * degree / 180;
    this.position.set(...position);
    this.original = {
      x: position[0],
      y: position[1],
    };

    this.interactive = interactive;
    this.buttonMode = buttonMode;

    window[this.name] = this;

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

    this.scale.set(0.5);
    this.alpha = 0.1;
    new Tween(this)
      .to({
        x: this.original.x,
        y: this.original.y,
        alpha: 1,
      }, 0)
      .easing(Easing.Linear.None)
      .start();
    new Tween(this.scale)
      .to({
        x: 1,
        y: 1,
      }, 1500)
      .easing(Easing.Bounce.Out)
      .start();

    const globalPosition = this.getGlobalPosition();

    emitDragEnd({
      name: this.name,
      resource: this.resourceName,
      texture: this.textureName,
      degree: this.degree,
      x: globalPosition.x,
      y: globalPosition.y,
    });

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
