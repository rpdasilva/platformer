import { KeyMap } from './constants';
import { Mario } from './entities/Mario';
import { Keyboard } from './Keyboard';
import { InputRouter } from './InputRouter';
import { Jump } from './traits/Jump';
import { Move } from './traits/Move';

export const setupKeyboard = (win: Window) => {
  const input = new Keyboard();
  const inputRouter = new InputRouter();

  input.listenTo(win);

  input.addMapping(KeyMap.P, keyState => {
    keyState
      ? inputRouter.route(entity => entity.getTrait(Jump).start())
      : inputRouter.route(entity => entity.getTrait(Jump).cancel());
  });

  input.addMapping(KeyMap.O, keyState =>
    inputRouter.route((entity: Mario) => entity.turbo(keyState)));

  input.addMapping(KeyMap.D, keyState =>
    inputRouter.route(entity => entity.getTrait(Move).dir += keyState ? 1 : -1));

  input.addMapping(KeyMap.A, keyState =>
    inputRouter.route(entity => entity.getTrait(Move).dir += keyState ? -1 : 1));

  return inputRouter;
}