const DATA = {
  width: 6,
  height: 1,
  tiles: [
    4, 4, 4, 4, 4, 4,
  ],
  points: [{
    index: 0,
    start: true,
    allowedDirections: ['right'],
    initialDirection: 'right',
  }, {
    index: 5,
    end: true,
  }],
};

export default DATA;
