import * as PIXI from 'pixi.js';
import get from 'lodash/get';
import set from 'lodash/set';
import isNil from 'lodash/isNil';
import { Easing, Tween } from 'es6-tween';
import eventEmitter from '../../utils/eventEmitter';
import Commands from '../Commands';
import { PLAY_CLICKED } from '../Commands/events';
import Container from '../Container';
import PlayZone from '../PlayZone';
import Actions from '../Actions';
import Logo from '../Logo';
import levels from '../../levels';
import { LOADING_COMPLETE } from '../Loading/events';
import { emitLevelCompleted, emitLevelStepReached } from './events';
import { PREVIEW_CLICKED } from '../Preview/events';
import Note from '../../componets/Note';
import { INFO_CLICKED, CANCEL_CLICKED } from '../../componets/Note/events';
import FireWorks from '../FireWorks';
import Win from '../Win';
import Info from '../Info';
import { WIDTH, HEIGHT } from '../../Config';
import { WIN_DISMISSED } from '../Win/events';

const { resources } = PIXI.Loader.shared;

const ROTATION_LOOKUP = {
  up: 0,
  down: 180,
  left: 90,
  right: -90,
};

const MOVE_LOOKUP = {
  up: {
    coordinate: 'y',
    failMove: -50,
  },
  down: {
    coordinate: 'y',
    failMove: 50,
  },
  right: {
    coordinate: 'x',
    failMove: -50,
  },
  left: {
    coordinate: 'x',
    failMove: 50,
  },
};

export default class Game extends Container {
  constructor() {
    super({
      name: 'Game',
      boundingBox: false,
    });

    this.level = null;
    this.movingItem = null;

    eventEmitter.on(LOADING_COMPLETE, this.setup, this);
    eventEmitter.on(PLAY_CLICKED, this.playClicked, this);
    eventEmitter.on(PREVIEW_CLICKED, this.previewClicked, this);
    eventEmitter.on(INFO_CLICKED, this.infoClicked, this);
    eventEmitter.on(CANCEL_CLICKED, this.cancelClicked, this);
    eventEmitter.on(WIN_DISMISSED, this.winDismissed, this);
  }

  removeCurrentLevel() {
    const playZone = this.getChildByName('playzoneContainer');

    if (this.level) {
      playZone.removeChild(this.level);
    }
  }

  setLevel(index) {
    const Level = get(levels, `[${index}].Level`);

    this.removeCurrentLevel();
    this.level = new Level({
      parent: this.getChildByName('playzoneContainer'),
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
    this.movingItem.rotation = Math.PI * ROTATION_LOOKUP.left / 180;
    this.movingItem.position.set(startingPoint.x - this.movingItem.width, startingPoint.y);
    this.level.addChild(this.movingItem);
  }

  togglePreviews(visible) {
    this.getChildByName('playzoneContainer').children.map((child) => {
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

    this.getChildByName('note').changeCharacter('x');

    this.successMoveCounter = 0;
    this.stepIndex = 0;
  }

  setup() {
    const background = new PIXI.Sprite(resources['9049'].texture);
    background.anchor.set(0.5);
    background.scale.set(WIDTH / background.width, HEIGHT / background.height);
    background.position.set(WIDTH / 2, HEIGHT / 2);
    this.addChild(background);

    this.addChild(new PlayZone());
    this.addChild(new Commands());
    this.addChild(new Actions());
    this.addChild(new Logo());

    const note = new Note({
      character: '?',
    });
    this.addChild(note);

    this.addChild(new Info());

    const playZone = this.getChildByName('playzoneContainer');

    for (let i = 0, len = levels.length; i < len; i++) {
      const Preview = get(levels, `[${i}].Preview`);
      playZone.addChild(new Preview());
    }
  }

  infoClicked() {
    this.getChildByName('infoContainer').show();
  }

  cancelClicked() {
    this.removeCurrentLevel();
    this.togglePreviews(true);
    this.getChildByName('note').changeCharacter('?');
  }

  winDismissed() {
    this.removeCurrentLevel();
    this.togglePreviews(true);
    this.getChildByName('note').changeCharacter('?');

    const fireworks = this.getChildByName('FireWorksContainer');
    const win = this.getChildByName('WinContainer');

    new Tween(fireworks)
      .to({
        alpha: 0,
      }, 500)
      .easing(Easing.Exponential.Out)
      .on('complete', () => {
        fireworks.destroy();
        this.removeChild(fireworks);
      })
      .start();
    new Tween(win)
      .to({
        alpha: 0,
      }, 1000)
      .easing(Easing.Exponential.Out)
      .on('complete', () => {
        this.removeChild(win);
      })
      .start();
  }

  // TODO: failure moves continue fails
  // TODO: position based rotation

  loop() {
    if (this.successMoveCounter === this.points.length - 1) {
      resources.emergency_police_car_drive_fast_with_sirens_internal.sound.stop();

      const win = new Win();
      const fireworks = new FireWorks();
      this.addChild(win);
      this.addChild(fireworks);
      fireworks.launchParticle();
      fireworks.loop();

      emitLevelCompleted(this.level.name);
      return;
    }

    if (!this.userCommands[this.stepIndex]) {
      console.log('early stop');
      return;
    }

    const { name: direction } = this.userCommands[this.stepIndex];
    const { allowedDirections, initialDirection } = this.points[this.stepIndex];

    const isAllowed = allowedDirections.indexOf(direction) !== -1;
    const degree = ROTATION_LOOKUP[direction];

    console.log(`initial direction is ${initialDirection} moving ${direction} is allowed: ${isAllowed}, degree: ${degree} rotation: ${Math.PI * degree / 180}`);

    if (!isAllowed) {
      const failureMove = MOVE_LOOKUP[direction];
      new Tween(this.movingItem)
        .to({
          rotation: Math.PI * degree / 180,
        }, 700)
        .easing(Easing.Sinusoidal.InOut)
        .on('complete', () => {
          console.log(`rotation completed y: ${this.movingItem.y}`);

          const forward = {};
          forward[failureMove.coordinate] = this.movingItem[failureMove.coordinate] + failureMove.failMove;
          new Tween(this.movingItem)
            .to(forward, 700)
            .easing(Easing.Sinusoidal.InOut)
            .on('complete', () => {
              console.log(`moved to new position completed y: ${this.movingItem.y}`);

              const back = {};
              back[failureMove.coordinate] = this.movingItem[failureMove.coordinate] - failureMove.failMove;
              new Tween(this.movingItem)
                .to(back, 700)
                .easing(Easing.Sinusoidal.InOut)
                .on('complete', () => {
                  console.log(`moved to initial position completed y: ${this.movingItem.y}`);

                  new Tween(this.movingItem)
                    .to({
                      rotation: Math.PI * ROTATION_LOOKUP[initialDirection] / 180,
                    }, 700)
                    .easing(Easing.Sinusoidal.InOut).start();
                })
                .start();
            })
            .start();
        })
        .start();
    } else {
      // success move
      this.successMoveCounter += 1;
      const nextIndex = this.stepIndex + 1;
      const nextPoint = this.points[nextIndex];
      const successMove = MOVE_LOOKUP[direction];
      const nextPointCoordinate = this.level.getChildAt(nextPoint.index)[successMove.coordinate];

      const rotation = Math.PI * degree / 180;
      const forward = {};
      forward[successMove.coordinate] = nextPointCoordinate;

      resources.emergency_police_car_drive_fast_with_sirens_internal.sound.play();

      if (this.movingItem.rotation !== rotation) {
        new Tween(this.movingItem)
          .to({
            rotation,
          }, 700)
          .easing(Easing.Sinusoidal.InOut)
          .on('complete', () => {
            console.log(`move transition with rotation: ${rotation}`, forward);
            new Tween(this.movingItem)
              .to(forward, 1500)
              .easing(Easing.Sinusoidal.InOut)
              .on('complete', () => {
                this.stepIndex = nextIndex;
                emitLevelStepReached();
                this.loop();
              })
              .start();
          })
          .start();
      } else {
        console.log(`move transition without rotation: ${rotation}`, forward);
        new Tween(this.movingItem)
          .to(forward, 1500)
          .easing(Easing.Sinusoidal.InOut)
          .on('complete', () => {
            this.stepIndex = nextIndex;
            emitLevelStepReached();
            this.loop();
          })
          .start();
      }
    }
  }

  playClicked(userCommands) {
    this.userCommands = userCommands;
    this.loop();
  }
}
