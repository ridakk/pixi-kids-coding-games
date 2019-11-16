import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { PLAYZONE } = CONTAINERS;

export default class PlayZone extends Container {
  constructor() {
    super(PLAYZONE);
  }
}
