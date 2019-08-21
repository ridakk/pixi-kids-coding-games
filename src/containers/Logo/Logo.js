import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { LOGO } = CONTAINERS;

export default class Logo extends Container {
  constructor() {
    super(LOGO);
  }
}
