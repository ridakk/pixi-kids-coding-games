import * as EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();
eventEmitter.idd = Math.random(1);

export default eventEmitter;
