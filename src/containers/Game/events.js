import eventEmitter from '../../utils/eventEmitter';

export const LEVEL_COMPLETED = 'LEVEL_COMPLETED';
export const LEVEL_STEP_REACHED = 'LEVEL_STEP_REACHED';

export function emitLevelCompleted(...data) {
  eventEmitter.emit(LEVEL_COMPLETED, ...data);
}

export function emitLevelStepReached(...data) {
  eventEmitter.emit(LEVEL_STEP_REACHED, ...data);
}
