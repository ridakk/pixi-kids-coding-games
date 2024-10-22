const DATA = {
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
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 7,
    allowedDirections: ['up'],
  }, {
    index: 0,
    allowedDirections: ['right'],
  }, {
    index: 3,
    allowedDirections: ['down'],
  }, {
    index: 8,
    allowedDirections: ['right'],
  }, {
    index: 9,
    end: true,
  }],

};

export default DATA;
