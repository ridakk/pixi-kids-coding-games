import Container from '../Container';
import { CONTAINERS } from '../../Config';

const { ACTIONS } = CONTAINERS;

export default class Actions extends Container {
  constructor() {
    super(ACTIONS);
  }
}
