const DATA = {
  width: 6,
  height: 5,
  tiles: [
    1, 4, 4, 4, 4, 2,
    5, 1, 4, 4, 2, 5,
    5, 0, 4, 8, 5, 5,
    0, 4, 4, 4, 3, 5,
    4, 4, 4, 4, 4, 3,
  ],
  points: [{
    index: 23,
    start: true,
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 28,
    allowedDirections: ['up'],
  }, {
    index: 5,
    allowedDirections: ['left'],
  }, {
    index: 0,
    allowedDirections: ['down'],
  }, {
    index: 17,
    allowedDirections: ['right'],
  }, {
    index: 21,
    allowedDirections: ['up'],
  }, {
    index: 10,
    allowedDirections: ['left'],
  }, {
    index: 7,
    allowedDirections: ['down'],
  }, {
    index: 13,
    allowedDirections: ['right'],
  }, {
    index: 14,
    end: true,
  }],
};

export default DATA;
