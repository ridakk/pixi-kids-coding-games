import eventEmitter from '../utils/eventEmitter';

export const PRELOADER_COMPLETE = 'PRELOADER_COMPLETE';
export const LOADER_COMPLETE = 'LOADER_COMPLETE';
export const LOADER_PROGRESS = 'LOADER_PROGRESS';
export const FONTLOADER_COMPLETE = 'FONTLOADER_COMPLETE';

export function emitPreLoaderComplete() {
  eventEmitter.emit(PRELOADER_COMPLETE);
}

export function emitLoaderComplete() {
  eventEmitter.emit(LOADER_COMPLETE);
}

export function emitLoaderProgress(data) {
  eventEmitter.emit(LOADER_PROGRESS, data.progress);
}

export function emitFontLoaderComplete(isActive) {
  eventEmitter.emit(FONTLOADER_COMPLETE, isActive);
}
