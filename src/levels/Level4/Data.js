const DATA = {
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
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 1,
    allowedDirections: ['down'],
  }, {
    index: 6,
    allowedDirections: ['right'],
  }, {
    index: 9,
    allowedDirections: ['up'],
  }, {
    index: 2,
    allowedDirections: ['right'],
  }, {
    index: 3,
    end: true,
  }],
};

export default DATA;
