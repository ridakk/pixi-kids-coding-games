import assign from 'lodash/assign';
import GROUND from '../../componets/Ground';

const GROUND_MAP = {
  width: 6,
  height: 3,
  tiles: [
    4, 2, 8, 8, 1, 4,
    8, 5, 8, 8, 5, 8,
    8, 0, 4, 4, 3, 8,
  ],
  points: [{
    index: 0,
    start: true,
  }, {
    index: 1,
  }, {
    rotate: 90,
  }, {
    index: 6,
  }, {
    rotate: -90,
  }, {
    index: 9,
  }, {
    rotate: -90,
  }, {
    index: 2,
  }, {
    rotate: 90,
  }, {
    index: 3,
    end: true,
  }],
  commands: [{
    name: 'left',
    pointIndexReached: 1,
  }, {
    name: 'down',
    pointIndexReached: 3,
  }, {
    name: 'left',
    pointIndexReached: 5,
  }, {
    name: 'up',
    pointIndexReached: 7,
  }, {
    name: 'left',
    pointIndexReached: 9,
  }],
};

export default class Level2 extends GROUND {
  constructor({
    parent = null,
  } = {}) {
    super(assign({}, {
      name: 'Level1',
    }, GROUND_MAP, {
      max: 8,
      xOffset: 0,
      yOffest: 0,
      parent,
    }));

    this.data = GROUND_MAP;
  }
}