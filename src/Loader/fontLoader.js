import forEach from 'lodash/forEach';
import fileName from '../utils/fileName';
import { emitFontLoaderComplete } from './events';


const WebFont = require('webfontloader');

const parseFont = (source) => {
  const fontFamily = source
    .split('/')
    .pop()
    .split('.')[0];
  const newStyle = document.createElement('style');
  const fontFace = `@font-face {font-family: '${fontFamily}'; src: url('${source}');}`;
  newStyle.appendChild(document.createTextNode(fontFace));
  document.head.appendChild(newStyle);
};

export default function addFonts(fonts) {
  const families = [];
  forEach(fonts, (font) => {
    parseFont(`assets/fonts/${font.path}${font.url}`);
    families.push(fileName(font.url));
  });

  WebFont.load({
    custom: {
      families,
    },
    active: () => {
      emitFontLoaderComplete(true);
    },
    inactive: () => {
      emitFontLoaderComplete(false);
    },
  });
}
