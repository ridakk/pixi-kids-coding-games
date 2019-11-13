import { Easing, Tween } from 'es6-tween';
import { GlowFilter } from '@pixi/filter-glow';
import Container from '../Container';
import { CONTAINERS } from '../../Config';
import Draggable from '../../componets/Draggable';

const { ACTIONS } = CONTAINERS;

function fadeIn(item) {
  item.alpha = 0;
  item.scale.set(0);

  new Tween(item)
    .to({
      alpha: 1,
    }, 1500)
    .easing(Easing.Quartic.Out)
    .start();
  new Tween(item.scale)
    .to({
      x: 1,
      y: 1,
    }, 1500)
    .easing(Easing.Bounce.Out)
    .start();
}

export default class Actions extends Container {
  constructor() {
    super(ACTIONS);

    const [xScale, yScale] = ACTIONS.scale;
    const width = xScale * ACTIONS.width / 2;
    const height = yScale * ACTIONS.height / 2;

    const left = new Draggable({
      name: 'left',
      resource: 'arrows',
      texture: 'arrow1',
      degree: 0,
      position: [
        (0 * width) + (width * 0.5),
        (0 * height) + (height * 0.5),
      ],
    });
    // left.filters = [new GlowFilter(15, 2, 1, 0x4bec13, 0.5)];
    // new Tween(left.scale)
    //   .to({
    //     x: 1.1,
    //     y: 1.1,
    //   }, 1500)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .easing(Easing.Bounce.In)
    //   .start();

    // new Tween(left.filters[0])
    //   .to({
    //     // distance: 50,
    //     outerStrength: 4,
    //   }, 1500)
    //   .repeat(Infinity)
    //   .yoyo(true)
    //   .easing(Easing.Exponential.InOut)
    //   .start();
    this.addChild(left);

    const right = new Draggable({
      name: 'right',
      resource: 'arrows',
      texture: 'arrow1',
      degree: 180,
      position: [
        (1 * width) + (width * 0.5),
        (0 * height) + (height * 0.5),
      ],
    });
    this.addChild(right);

    const up = new Draggable({
      name: 'up',
      resource: 'arrows',
      texture: 'arrow1',
      degree: -90,
      position: [
        (0 * width) + (width * 0.5),
        (1 * height) + (height * 0.5),
      ],
    });
    this.addChild(up);

    const down = new Draggable({
      name: 'down',
      resource: 'arrows',
      texture: 'arrow1',
      degree: 90,
      position: [
        (1 * width) + (width * 0.5),
        (1 * height) + (height * 0.5),
      ],
    });
    this.addChild(down);

    fadeIn(left);
    fadeIn(right);
    fadeIn(up);
    fadeIn(down);
  }
}
