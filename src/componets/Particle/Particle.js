import * as PIXI from 'pixi.js';
import { HEIGHT } from '../../Config';

const gravity = 0.03;
const { resources } = PIXI.Loader.shared;

class Particle {
  constructor(scale, explodeFn = () => {}) {
    this.container = new PIXI.Container();
    this.particle = new PIXI.Sprite(resources.particle.texture);
    this.particle.tint = Math.random() * 0xFFFFFF;
    this.container.addChild(this.particle);
    this.scale = scale;
    this.container.scale.x = this.scale;
    this.container.scale.y = this.scale;
    this.velocity = { x: 0, y: 0 };
    this.explodeHeight = 0.4 + Math.random() * 0.5;
    this.explodeFn = explodeFn;
    this.elapsed = Date.now();
  }

  reset(scale) {
    this.container.alpha = 1;
    this.container.scale.x = scale;
    this.container.scale.y = scale;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.toExplode = false;
    this.exploded = false;
    this.fade = false;
  }

  setPosition(pos) {
    this.container.position.x = pos.x;
    this.container.position.y = pos.y;
  }

  setVelocity(vel) {
    this.velocity = vel;
  }

  update() {
    const now = Date.now();
    this.elapsed = now;
    this.container.position.x += this.velocity.x;
    this.container.position.y += this.velocity.y;
    this.velocity.y += gravity;
    if (this.toExplode && !this.exploded) {
      // explode
      if (this.container.position.y < HEIGHT * this.explodeHeight) {
        this.container.alpha = 0;
        this.exploded = true;

        resources['394174__morganpurkis__single-firework'].sound.play();
        this.explodeFn(this.container.position, this.container.scale.x);
      }
    }

    if (this.fade) {
      this.container.alpha -= 0.01;
    }
  }
}

export default Particle;
