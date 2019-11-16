import eventEmitter from '../../utils/eventEmitter';

export const INFO_CLICKED = 'INFO_CLICKED';
export const CANCEL_CLICKED = 'CANCEL_CLICKED';

export function emitInfoClicked() {
  eventEmitter.emit(INFO_CLICKED);
}

export function emitCancelClicked() {
  eventEmitter.emit(CANCEL_CLICKED);
}
