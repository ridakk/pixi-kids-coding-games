import eventEmitter from '../eventEmitter';

export const PRELOADER_COMPLETE = 'PRELOADER_COMPLETE';
export const LOADER_COMPLETE = 'LOADER_COMPLETE';
export const LOADER_PROGRESS = 'LOADER_PROGRESS';

export function emitPreLoaderComplete() {
  eventEmitter.emit(PRELOADER_COMPLETE);
}

export function emitLoaderComplete() {
  eventEmitter.emit(LOADER_COMPLETE);
}

export function emitLoaderProgress(data) {
  eventEmitter.emit(LOADER_PROGRESS, data.progress);
}
