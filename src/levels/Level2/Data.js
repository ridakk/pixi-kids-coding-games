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
  }, {
    index: 2,
  }, {
    rotate: 90,
  }, {
    index: 4,
  }, {
    rotate: -90,
  }, {
    index: 7,
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
  }],
};

export default DATA;