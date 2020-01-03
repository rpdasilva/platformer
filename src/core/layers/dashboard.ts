import { Entity } from '../Entity';
import { Font } from '../Font';

export const createDashboardLayer = (font: Font, playerEnv: Entity) => {
  const line = (lineNumber = 1)  => lineNumber * font.size;
  const score = (value = 0) => value.toString().padStart(6, '0');
  const time = (value = 0) => value.toFixed().toString().padStart(3, '0');
  const coins = (value = 0) => `@x${value.toString().padStart(2, '0')}`;

  return function drawDashboardLayer (context: CanvasRenderingContext2D) {
    font.print('MARIO', context, 16, line(1));
    font.print(score(24500), context, 16, line(2));

    font.print(coins(13), context, 96, line(2));

    font.print('WORLD', context, 152, line(1));
    font.print('1-1', context, 160, line(2));

    font.print('TIME', context, 208, line(1));
    font.print(time(playerEnv.playerController.time), context, 216, line(2));
  }
};
