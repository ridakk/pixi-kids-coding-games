import * as PIXI from 'pixi.js';
import get from 'lodash/get';
import set from 'lodash/set';
import isNil from 'lodash/isNil';
import { Easing, Tween } from 'es6-tween';
import eventEmitter from '../../utils/eventEmitter';
import Commands from '../Commands';
import { PLAY_CLICKED } from '../Commands/events';
import PlayZone from '../PlayZone';
import Actions from '../Actions';
import Logo from '../Logo';
import { Level1, Level1Preview } from '../../levels/Level1';
import { Level2, Level2Preview } from '../../levels/Level2';
import { Level3, Level3Preview } from '../../levels/Level3';
import { LOADER_COMPLETE } from '../../Loader/events';
import { emitLevelCompleted } from './events';
import { PREVIEW_CLICKED } from '../../componets/Preview/events';

const { resources } = PIXI.Loader.shared;

export default class Game extends PIXI.Container {
  constructor() {
    super();
    this.name = 'game';
    this.levels = [Level1, Level2, Level3];
    // this.index = 0;
    this.level = null;
    this.movingItem = null;

    eventEmitter.on(LOADER_COMPLETE, this.setup, this);
    eventEmitter.on(PLAY_CLICKED, this.playClicked, this);
    eventEmitter.on(PREVIEW_CLICKED, this.previewClicked, this);
  }

  removeCurrentLevel() {
    const playZone = this.getChildAt(0);

    if (this.level) {
      playZone.removeChild(this.level);
    }
  }

  setLevel(index) {
    const Level = get(this.levels, `[${index}]`);

    this.removeCurrentLevel();
    this.level = new Level({
      parent: this.getChildAt(0),
    });

    this.points = get(this.level, 'data.points');
    this.commands = get(this.level, 'data.commands');
    this.start = get(this.level, 'data.points[0]');
    this.loopFrom = 0;
    this.loopTo = 0;
    this.completed = false;
  }

  setMovingItem() {
    const startingPoint = this.level.getChildAt(this.start.index);

    if (this.movingItem) {
      this.removeChild(this.movingItem);
    }

    this.movingItem = new PIXI.Sprite(resources.cars_top.textures.police);
    this.movingItem.scale.set(0.4);
    this.movingItem.anchor.set(0.5);
    this.movingItem.rotation = Math.PI * 90 / 180;
    this.movingItem.position.set(startingPoint.x - this.movingItem.width, startingPoint.y);
    this.level.addChild(this.movingItem);
  }

  togglePreviews(visible) {
    this.getChildAt(0).children.map((child) => {
      const childName = get(child, 'name', '');
      if (childName && childName.indexOf('Preview') === 0) {
        set(child, 'visible', visible);
      }

      return child;
    });
  }

  previewClicked(previewIndex) {
    this.togglePreviews(false);

    this.setLevel(previewIndex - 1);
    this.setMovingItem();
  }

  setup() {
    this.addChild(new PlayZone());
    this.addChild(new Commands());
    this.addChild(new Actions());
    this.addChild(new Logo());

    const playZone = this.getChildAt(0);

    playZone.addChild(new Level1Preview());
    playZone.addChild(new Level2Preview());
    playZone.addChild(new Level3Preview());
  }

  loop() {
    if (this.loopFrom >= this.points.length || this.loopFrom > this.loopTo) {
      resources.emergency_police_car_drive_fast_with_sirens_internal.sound.stop();

      if (this.completed) {
        this.removeCurrentLevel();
        this.togglePreviews(true);

        emitLevelCompleted();
      }
      return;
    }

    const point = this.points[this.loopFrom];

    if (!isNil(point.index) && point.start !== true) {
      const nextChild = this.level.getChildAt(point.index);
      new Tween(this.movingItem)
        .to({
          x: point.end ? nextChild.x + this.movingItem.width : nextChild.x,
          y: nextChild.y,
        }, 1500)
        .easing(Easing.Quadratic.In)
        .on('complete', () => {
          this.loopFrom += 1;
          this.loop(this.loopFrom, this.loopTo);
        })
        .start();
    } else if (!isNil(point.rotate)) {
      new Tween(this.movingItem)
        .to({
          rotation: this.movingItem.rotation + Math.PI * point.rotate / 180,
        }, 700)
        .easing(Easing.Sinusoidal.InOut)
        .on('complete', () => {
          this.loopFrom += 1;
          this.loop(this.loopFrom, this.loopTo);
        })
        .start();
    } else {
      this.loopFrom += 1;
      this.loop(this.loopFrom, this.loopTo);
    }
  }

  playClicked(userCommands) {
    for (let i = 0, len = userCommands.length; i < len; i++) {
      const userCommand = get(userCommands, `[${i}]`);
      const command = get(this.commands, `[${i}]`);

      if (command.name === userCommand.name) {
        this.loopTo = command.pointIndexReached;

        this.completed = get(this.points, `[${this.loopTo}].end`, false);
      }
    }

    resources.emergency_police_car_drive_fast_with_sirens_internal.sound.play();
    this.loop();
  }
}
