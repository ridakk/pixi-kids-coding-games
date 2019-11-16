import * as PIXI from 'pixi.js';
import { emitCancelClicked, emitInfoClicked } from './events';

const { resources } = PIXI.Loader.shared;

export default class Note extends PIXI.Sprite {
  constructor({
    character = '?',
  } = {}) {
    super(resources.sticky_note1.texture);

    this.name = 'note';
    this.anchor.set(0);
    this.position.set(1095, 45);
    this.interactive = true;
    this.buttonMode = true;
    this.character = character;

    const style = new PIXI.TextStyle({
      dropShadow: true,
      fill: [
        '#0096ff',
        '#00f900',
      ],
      fontFamily: 'Christopher Done',
      fontSize: 120,
      fontWeight: 600,
      stroke: '#0433ff',
      strokeThickness: 2,
    });
    this.text = new PIXI.Text(character, style);
    this.text.anchor.set(0.5);
    this.text.position.set(this.width * 0.5, this.height * 0.5);
    this.addChild(this.text);

    this
      .on('mouseup', this.handleClick.bind(this))
      .on('mouseupoutside', this.handleClick.bind(this))
      .on('touchend', this.handleClick.bind(this))
      .on('touchendoutside', this.handleClick.bind(this));
  }

  handleClick() {
    switch (this.character) {
    case '?':
      emitInfoClicked();
      break;
    case 'x':
      emitCancelClicked();
      break;
    default:
    }
  }

  changeCharacter(character) {
    this.character = character;
    this.text.text = character;
  }
}
