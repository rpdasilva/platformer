import { KEY_MAP } from './constants';
// import { Entity } from './entity';
import { Mario } from './entities';
import { Keyboard } from './Keyboard';

export const setupKeyboard = (entity: Mario) => {
  const input = new Keyboard();

  input.addMapping(KEY_MAP.SPACE, keyState => {
    keyState
      ? entity.jump.start()
      : entity.jump.cancel();
  });

  input.addMapping(KEY_MAP.RIGHT, keyState =>
    entity.move.dir = keyState);

  input.addMapping(KEY_MAP.LEFT, keyState =>
    entity.move.dir = -keyState);

  return input
}