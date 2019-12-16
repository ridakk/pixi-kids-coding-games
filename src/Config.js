export const PRELOADER_ASSETS = [];
export const IMAGES = [
  'city-element-top-view-set/roads_flat.json',
  'police-infographic/police.json',
  'police-taxi-cars/cars_top.json',
  'arrows/arrows.json',
  'particle.png',
  '9049.jpg',
  'win/badge.png',
  'ribbons/ribbon1.png',
  'sticky-notes/sticky_note1.png',
  'envelope/square.png',
  'envelope/circle.png',
];
export const SOUNDS = [
  'emergency_police_car_drive_fast_with_sirens_internal.mp3',
  '394174__morganpurkis__single-firework.wav',
];
export const FONTS = [
  {
    path: 'christopher_done/',
    name: 'Christopher Done',
    url: 'Christopher Done.ttf',
  },
];
export const PREVIEW = {
  numberOfItem: 8,
  numberOfColoumns: 4,
};
export const WIDTH = 1280;
export const HEIGHT = 720;
export const CONTAINERS = {
  ACTIONS: {
    name: 'actions',
    position: [950, 225],
    scale: [1, 1],
    width: 300,
    height: 220,
  },
  COMMANDS: {
    name: 'commands',
    position: [30, 605],
    scale: [1, 1],
    width: 890,
    height: 70,
    numberOfButtons: 10,
  },
  LOGO: {
    name: 'logo',
    position: [950, 475],
    scale: [1, 1],
    width: 300,
    height: 200,
  },
  PLAYZONE: {
    name: 'playzone',
    position: [30, 45],
    scale: [1, 1],
    width: 890,
    height: 550,
  },
};
export const ROADS = {
  texture: 'roads_flat',
  PARTS: [{
    texture: 'turn',
    degree: 0,
  }, {
    texture: 'turn',
    degree: 90,
  }, {
    texture: 'turn',
    degree: 180,
  }, {
    texture: 'turn',
    degree: 270,
  }, {
    texture: 'road1',
    degree: 0,
  }, {
    texture: 'road1',
    degree: 90,
  }],
};
