import assign from 'lodash/assign';
import GROUND from '../../componets/Ground';

const GROUND_MAP = {
  width: 6,
  height: 1,
  tiles: [
    4, 4, 4, 4, 4, 4,
  ],
  points: [{
    index: 0,
    start: true,
  }, {
    index: 5,
    end: true,
  }],
};

export default class Level1 extends GROUND {
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
