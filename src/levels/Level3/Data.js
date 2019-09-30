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
  commands: [{
    name: 'left',
    pointIndexReached: 1,
  }, {
    name: 'up',
    pointIndexReached: 3,
  }, {
    name: 'left',
    pointIndexReached: 5,
  }, {
    name: 'down',
    pointIndexReached: 7,
  }, {
    name: 'left',
    pointIndexReached: 9,
  }],
};

export default DATA;
