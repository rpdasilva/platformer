import { KeyMap } from './constants';
import { Mario } from './entities/Mario';
import { Keyboard } from './Keyboard';
import { InputRouter } from './InputRouter';

export const setupKeyboard = (win: Window) => {
  const input = new Keyboard();
  const inputRouter = new InputRouter();

  input.listenTo(win);

  input.addMapping(KeyMap.P, keyState => {
    keyState
      ? inputRouter.route(entity => entity.jump.start())
      : inputRouter.route(entity => entity.jump.cancel());
  });

  input.addMapping(KeyMap.O, keyState =>
    inputRouter.route((entity: Mario) => entity.turbo(keyState)));

  input.addMapping(KeyMap.D, keyState =>
    inputRouter.route(entity => entity.move.dir += keyState ? 1 : -1));

  input.addMapping(KeyMap.A, keyState =>
    inputRouter.route(entity => entity.move.dir += keyState ? -1 : 1));

  return inputRouter;
}