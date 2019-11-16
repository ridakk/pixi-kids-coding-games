import eventEmitter from '../../utils/eventEmitter';

export const LOADING_COMPLETE = 'LOADING_COMPLETE';

export function emitLoadingComplete() {
  eventEmitter.emit(LOADING_COMPLETE);
}
