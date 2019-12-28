import { range } from 'ramda';

import { createBuffer, getContext } from '../lib/canvas';
import { Entity } from './Entity';
import { Level } from './Level';
import { Matrix } from './math';
import { Spritesheet } from './Spritesheet';
import { TileResolver } from './TileResolver';
import { Camera } from './Camera';

export const createBackgroundLayer = (
  level: Level,
  tiles: Matrix,
  sprites: Spritesheet
) => {
  const resolver = new TileResolver(tiles);
  const tileSize = resolver.tileSize;

  const buffer = createBuffer(256 + tileSize, 240);
  const backgroundContext = getContext(buffer);

  const redraw = (startIndex, endIndex) => {
    backgroundContext.clearRect(0, 0, buffer.width, buffer.height);

    range(startIndex, endIndex + 1).forEach(x => {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) => {
          if (sprites.animations.has(tile.name)) {
            sprites.drawAnimation(
              tile.name,
              backgroundContext,
              x - startIndex,
              y,
              level.totalTime
            );
          } else {
            sprites.drawTile(
              tile.name,
              backgroundContext,
              x - startIndex,
              y
            );
          }
        });
      }
    });
  }

  return (
    context: CanvasRenderingContext2D,
    camera: Camera
  ) => {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);

    context.drawImage(
      buffer,
      -camera.pos.x % tileSize,
      -camera.pos.y
    );
  }
};

export const createSpriteLayer = (
  entities: Set<Entity>,
  width = 64,
  height = 64
) => {
  const spriteBuffer = createBuffer(width, height);
  const spriteContext = getContext(spriteBuffer);

  return (context: CanvasRenderingContext2D, camera: Camera) =>
    entities.forEach(entity => {
      spriteContext.clearRect(0, 0, width, height);

      entity.draw(spriteContext);

      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
};
