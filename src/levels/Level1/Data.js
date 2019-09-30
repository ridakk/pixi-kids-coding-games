const DATA = {
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
  commands: [{
    name: 'left',
    pointIndexReached: 1,
  }],
};

export default DATA;
