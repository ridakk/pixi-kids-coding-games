import eventEmitter from '../../utils/eventEmitter';

export const PREVIEW_CLICKED = 'PREVIEW_CLICKED';

export function emitPreviewClick(...data) {
  eventEmitter.emit(PREVIEW_CLICKED, ...data);
}
