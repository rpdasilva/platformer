import { Entity } from '../Entity';
import { Level } from '../Level';
import { Font } from '../Font';
import { findPlayers } from '../player';
import { LevelTimer } from '../traits/LevelTimer';
import { Player } from '../traits/Player';

const getPlayerTraits = (entities: Set<Entity>) =>
  findPlayers(entities).map(entity => entity.getTrait(Player));

const getTimerTraits = (entities: Set<Entity>) =>
  [...entities]
    .filter(entity => entity.hasTrait(LevelTimer))
    .map(entity => entity.getTrait(LevelTimer));

export const createDashboardLayer = (font: Font, level: Level) => {
  const score = (value = 0) => value.toString().padStart(6, '0');
  const time = (value = 0) => value.toFixed().toString().padStart(3, '0');
  const coins = (value = 0) => `@x${value.toString().padStart(2, '0')}`;

  const [timerTrait] = getTimerTraits(level.entities);

  return function drawDashboardLayer (context: CanvasRenderingContext2D) {
    const [playerTrait] = getPlayerTraits(level.entities);

    if (!playerTrait) {
      debugger;
    }

    font.print(playerTrait.name, context, font.em(2), font.em(1));
    font.print(score(playerTrait.score), context, font.em(2), font.em(2));

    // DEBUG
    // font.print('+'+playerTrait.lives.toString().padStart(3, '0'), context, 96, font.em(1));

    font.print(coins(playerTrait.coins), context, font.em(12), font.em(2));

    font.print('WORLD', context, font.em(19), font.em(1));

    level.name.match(/.{1,6}/g).forEach((chunk, i) => {
      font.print(chunk, context, font.em(20), font.em(2 + i));
    });

    font.print('TIME', context, font.em(26), font.em(1));
    font.print(time(timerTrait.currentTime), context, font.em(27), font.em(2));
  }
};
