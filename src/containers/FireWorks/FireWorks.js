import random from 'lodash/random';
import Container from '../Container';
import Particle from '../../componets/Particle';
import { HEIGHT } from '../../Config';

export default class FireWorks extends Container {
  constructor() {
    super({
      name: 'FireWorks',
      boundingBox: false,
    });

    this.particles = [];
    this.animationFrameId = null;
    this.launchParticleTimer = null;

    this.loop = this.loop.bind(this);
    this.getParticle = this.getParticle.bind(this);
    this.explode = this.explode.bind(this);
    this.launchParticle = this.launchParticle.bind(this);
  }

  explode(position, scale) {
    const steps = random(8, 12);
    const radius = 2 + Math.random() * 4;
    for (let i = 0; i < steps; i++) {
      // get velocity
      const x = radius * Math.cos(2 * Math.PI * i / steps);
      const y = radius * Math.sin(2 * Math.PI * i / steps);
      // add particle
      const particle = this.getParticle(scale);
      if (!particle) {
        return;
      }

      particle.fade = true;
      particle.setPosition(position);
      particle.setVelocity({ x, y });
    }
  }

  getParticle(scale) {
    // get the first particle that has been used
    let particle;
    // check for a used particle (alpha <= 0)
    for (let i = 0, l = this.particles.length; i < l; i++) {
      if (this.particles[i].container.alpha <= 0) {
        particle = this.particles[i];
        break;
      }
    }
    // update characteristics of particle
    if (particle) {
      particle.reset(scale);
      return particle;
    }


    // otherwise create a new particle
    particle = new Particle(1, this.explode);
    this.particles.push(particle);
    this.addChild(particle.container);
    return particle;
  }

  launchParticle() {
    const particle = this.getParticle(random(0.5, 0.8));
    if (!particle) {
      clearTimeout(this.launchParticleTimer);
      this.launchParticleTimer = setTimeout(this.launchParticle, 200 + Math.random() * 600);
      return;
    }

    particle.setPosition({ x: Math.random() * window.innerWidth, y: HEIGHT });
    const speed = HEIGHT * 0.01;
    particle.setVelocity({ x: -speed / 2 + Math.random() * speed, y: -speed + Math.random() * -1 });
    particle.toExplode = true;

    // launch a new particle
    clearTimeout(this.launchParticleTimer);
    this.launchParticleTimer = setTimeout(this.launchParticle, 200 + Math.random() * 600);
  }

  loop() {
    this.animationFrameId = requestAnimationFrame(this.loop);
    for (let i = 0, l = this.particles.length; i < l; i++) {
      this.particles[i].update();
    }
  }

  destroy() {
    for (let i = 0, l = this.particles.length; i < l; i++) {
      this.particles[i].container.destroy();
    }

    clearTimeout(this.launchParticleTimer);
    cancelAnimationFrame(this.animationFrameId);
    this.particles.splice(0, this.particles.length);
  }
}
