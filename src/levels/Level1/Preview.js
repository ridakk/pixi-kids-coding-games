import Preview from '../../containers/Preview';
import Level from './Level';

export default class LevelPreview extends Preview {
  constructor() {
    super({
      level: new Level(),
      index: 1,
    });
  }
}
