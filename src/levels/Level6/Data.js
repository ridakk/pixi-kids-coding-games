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
    allowedDirections: ['left'],
    initialDirection: 'left',
  }, {
    index: 28,
    allowedDirections: ['up'],
  }, {
    index: 5,
    allowedDirections: ['right'],
  }, {
    index: 0,
    allowedDirections: ['down'],
  }, {
    index: 17,
    allowedDirections: ['left'],
  }, {
    index: 21,
    allowedDirections: ['up'],
  }, {
    index: 10,
    allowedDirections: ['right'],
  }, {
    index: 7,
    allowedDirections: ['down'],
  }, {
    index: 13,
    allowedDirections: ['left'],
  }, {
    index: 14,
    end: true,
  }],
};

export default DATA;
