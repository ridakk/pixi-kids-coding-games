import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import emitter from './emitter';

const gravity = 0.03;
const height = window.innerHeight;
const { resources } = PIXI.Loader.shared;

class Particle {
  constructor(scale, explodeFn) {
    this.container = new PIXI.Container();
    this.emitter = new particles.Emitter(this.container, [resources.particle.texture], Object.assign({}, emitter, {
      color: {
        start: Math.floor(Math.random() * 16777215).toString(16),
        end: Math.floor(Math.random() * 16777215).toString(16),
      },
    }));
    this.emitter.emit = true;
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
    this.emitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
    this.container.position.x += this.velocity.x;
    this.container.position.y += this.velocity.y;
    this.velocity.y += gravity;
    if (this.toExplode && !this.exploded) {
      // explode
      if (this.container.position.y < height * this.explodeHeight) {
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
