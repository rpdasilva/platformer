import { KeyMap } from './constants';
import { Mario } from './entities';
import { Keyboard } from './Keyboard';

export const setupKeyboard = (mario: Mario) => {
  const input = new Keyboard();

  input.addMapping(KeyMap.P, keyState => {
    keyState
      ? mario.jump.start()
      : mario.jump.cancel();
  });

  input.addMapping(KeyMap.O, keyState => mario.turbo(keyState));

  input.addMapping(KeyMap.D, keyState =>
    mario.move.dir += keyState ? 1 : -1);

  input.addMapping(KeyMap.A, keyState =>
    mario.move.dir += keyState ? -1 : 1);

  return input
}