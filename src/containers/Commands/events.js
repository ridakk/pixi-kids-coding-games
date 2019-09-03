import eventEmitter from '../../utils/eventEmitter';

export const PLAY_CLICKED = 'PLAY_CLICKED';

export function emitPlayClick(...data) {
  eventEmitter.emit(PLAY_CLICKED, ...data);
}
