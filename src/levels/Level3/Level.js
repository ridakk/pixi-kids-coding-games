import assign from 'lodash/assign';
import GROUND from '../../componets/Ground';
import Data from './Data';

export default class Level extends GROUND {
  constructor({
    parent = null,
  } = {}) {
    super(assign({}, {
      name: 'Level3',
    }, Data, {
      max: 8,
      xOffset: 0,
      yOffest: 0,
      parent,
    }));

    this.data = Data;
  }
}
