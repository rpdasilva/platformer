import { range } from 'ramda';

import { getContext } from '../lib/canvas';
import { Entity } from './entity';
import { Spritesheet } from './spritesheet';

const drawBackground = (
  background: any,
  context: CanvasRenderingContext2D,
  sprites: Spritesheet
) => {
  background.ranges.forEach(([x1, x2, y1, y2]) =>
    range(x1, x2).forEach(x =>
      range(y1, y2).forEach(y =>
        sprites.drawTile(background.tile, context, x, y)))
  );
}

export const createBackgroundLayer = (backgrounds: any, sprites: Spritesheet) => {
  const buffer = document.createElement('canvas');
  const backgroundContext = getContext(buffer);
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach(background =>
    drawBackground(
      background,
      backgroundContext,
      sprites
    )
  );

  return context => context.drawImage(buffer, 0, 0);
};

export const createSpriteLayer = (entity: Entity) =>
  context => entity.draw(context);