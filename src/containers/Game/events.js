import eventEmitter from '../../utils/eventEmitter';

export const LEVEL_COMPLETED = 'LEVEL_COMPLETED';

export function emitLevelCompleted(...data) {
  eventEmitter.emit(LEVEL_COMPLETED, ...data);
}
