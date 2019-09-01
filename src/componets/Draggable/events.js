import eventEmitter from '../../utils/eventEmitter';

export const DRAG_END = 'DRAG_END';

export function emitDragEnd(...data) {
  eventEmitter.emit(DRAG_END, ...data);
}
