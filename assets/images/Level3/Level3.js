import assign from 'lodash/assign';
import GROUND from '../../componets/Ground';

const GROUND_MAP = {
  width: 6,
  height: 3,
  tiles: [
    8, 1, 4, 4, 2, 8,
    8, 5, 8, 8, 5, 8,
    4, 3, 8, 8, 0, 4,
  ],
  points: [{
    index: 6,
    start: true,
  }, {
    index: 7,
  }, {
    rotate: -90,
  }, {
    index: 0,
  }, {
    rotate: 90,
  }, {
    index: 3,
  }, {
    rotate: 90,
  }, {
    index: 8,
  }, {
    rotate: -90,
  }, {
    index: 9,
    end: true,
  }],
  commands: [{
    name: 'left',
    pointIndexReached: 1,
  }, {
    name: 'up',
    pointIndexReached: 3,
  }, {
    name: 'left',
    pointIndexReached: 5,
  }, {
    name: 'down',
    pointIndexReached: 7,
  }, {
    name: 'left',
    pointIndexReached: 9,
  }],
};

export default class Level3 extends GROUND {
  constructor({
    parent = null,
  } = {}) {
    super(assign({}, {
      name: 'Level3',
    }, GROUND_MAP, {
      max: 8,
      xOffset: 0,
      yOffest: 0,
      parent,
    }));

    this.data = GROUND_MAP;
  }
}
