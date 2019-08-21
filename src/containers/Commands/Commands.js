import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { COMMANDS } = CONTAINERS;

export default class Commands extends Container {
  constructor() {
    super(COMMANDS);
  }
}
