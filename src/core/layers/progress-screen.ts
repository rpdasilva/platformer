import { createBuffer, getContext } from '../../lib/canvas';
import { Level } from '../Level';
import { Font } from '../Font';
import { findPlayers } from '../player';
import { Player } from '../traits/Player';

export const createProgressScreenLayer = (font: Font, level: Level) => {
  const spriteBuffer = createBuffer(32, 32);
  const spriteContext = getContext(spriteBuffer);

  const lives = (value = 0) => `x${value.toString().padStart(3, ' ')}`;

  return function drawProgressScreenLayer (context: CanvasRenderingContext2D) {
    const [entity] = findPlayers(level.entities);
    const playerTrait = entity.getTrait(Player);

    `WORLD ${level.name}`.match(/.{1,9}/g).forEach((chunk, i) => {
      font.print(chunk, context, font.em(12), font.em(12 + i));
    });

    font.print(lives(playerTrait.lives), context, font.em(16), font.em(16));

    spriteContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);
    entity.draw(spriteContext);
    context.drawImage(spriteBuffer, font.em(13), font.em(15))
  }
};
