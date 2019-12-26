import { KEY_PRESSED, KEY_RELEASED } from './constants';
import { KeyState } from './types';

export class Keyboard {
  // Holds current state of a given key
  keyStates = new Map<KeyboardEvent['code'], KeyState>();

  // Holds callback handlers for a key code
  keyMap = new Map<KeyboardEvent['code'], (keyState: KeyState) => void>();

  addMapping(
    code: KeyboardEvent['code'],
    callback: (keyState: KeyState) => void
  ) {
    this.keyMap.set(code, callback);
  }

  handleEvent = (event: KeyboardEvent) => {
    const { code } = event;

    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown'
      ? KEY_PRESSED
      : KEY_RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
  }

  listenTo(window: Window) {
    ['keydown', 'keyup']
      .forEach(type => window.addEventListener(type, this.handleEvent));
  }
}