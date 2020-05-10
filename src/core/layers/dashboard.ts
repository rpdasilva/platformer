import { Level } from '../Level';
import { Font } from '../Font';
import { findPlayers } from '../player';
import { LevelTimer } from '../traits/LevelTimer';
import { Player } from '../traits/Player';

const getPlayerTraits = (level: Level) =>
  findPlayers(level).map(entity => entity[Player.NAME]);

const getTimerTraits = (level: Level) =>
  [...level.entities.values()]
    .filter(entity => entity.hasTrait(LevelTimer.NAME))
    .map(entity => entity[LevelTimer.NAME]);

export const createDashboardLayer = (font: Font, level: Level) => {
  const line = (lineNumber = 1)  => lineNumber * font.size;
  const score = (value = 0) => value.toString().padStart(6, '0');
  const time = (value = 0) => value.toFixed().toString().padStart(3, '0');
  const coins = (value = 0) => `@x${value.toString().padStart(2, '0')}`;

  const [playerTrait] = getPlayerTraits(level);
  const [timerTrait] = getTimerTraits(level);

  return function drawDashboardLayer (context: CanvasRenderingContext2D) {

    font.print(playerTrait.name, context, 16, line(1));
    font.print(score(playerTrait.score), context, 16, line(2));

    font.print(coins(playerTrait.coins), context, 96, line(2));

    font.print('WORLD', context, 152, line(1));
    font.print('1-1', context, 160, line(2));

    font.print('TIME', context, 208, line(1));
    font.print(time(timerTrait.currentTime), context, 216, line(2));
  }
};
