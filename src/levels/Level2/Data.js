const DATA = {
  width: 6,
  height: 3,
  tiles: [
    4, 4, 2, 8, 8, 8,
    8, 8, 5, 8, 8, 8,
    8, 8, 0, 4, 4, 4,
  ],
  points: [{
    index: 0,
    start: true,
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 2,
    allowedDirections: ['down'],
  }, {
    index: 4,
    allowedDirections: ['right'],
  }, {
    index: 7,
    end: true,
  }],

};

export default DATA;
