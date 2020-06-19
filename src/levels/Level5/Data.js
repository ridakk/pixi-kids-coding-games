const DATA = {
  width: 6,
  height: 3,
  tiles: [
    4, 4, 4, 4, 4, 2,
    8, 8, 8, 8, 8, 5,
    4, 4, 4, 4, 4, 3,
  ],
  points: [{
    index: 0,
    start: true,
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 5,
    allowedDirections: ['down'],
  }, {
    index: 12,
    allowedDirections: ['left'],
  }, {
    index: 7,
    end: true,
  }],
};

export default DATA;
