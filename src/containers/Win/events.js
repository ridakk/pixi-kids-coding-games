import eventEmitter from '../../utils/eventEmitter';

export const WIN_DISMISSED = 'WIN_DISMISSED';

export function emitWinDismissed() {
  eventEmitter.emit(WIN_DISMISSED);
}
