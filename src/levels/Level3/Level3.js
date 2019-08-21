import * as _ from 'lodash';
import GROUND from '../../componets/Ground';


// tiles: [
//   4, 2, 8, 8, 1, 4,
//   8, 5, 8, 8, 5, 8,
//   8, 0, 4, 4, 3, 8,
// ],
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
};

export default class Level2 extends GROUND {
  constructor({
    parent = null,
  } = {}) {
    super(_.assign({}, {
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
