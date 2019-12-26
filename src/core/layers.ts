import { range } from 'ramda';

import { createBuffer, getContext } from '../lib/canvas';
import { Entity } from './Entity';
import { Level } from './Level';
import { Spritesheet } from './Spritesheet';
import { Camera } from './Camera';

export const createBackgroundLayer = (level: Level, sprites: Spritesheet) => {
  const tiles = level.tiles;
  const resolver = level.tileCollider.tiles;
  const tileSize = resolver.tileSize;

  const buffer = createBuffer(256 + tileSize, 240);
  const backgroundContext = getContext(buffer);

  let startIndex;
  let endIndex;

  const redraw = (drawFrom, drawTo) => {
    if (drawFrom === startIndex && drawTo === endIndex) {
      return;
    }

    startIndex = drawFrom;
    endIndex = drawTo;

    range(startIndex, endIndex + 1).forEach(x => {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) =>
          sprites.drawTile(
            tile.name,
            backgroundContext,
            x - startIndex,
            y
          ))
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

export const createCollisionLayer = (level: Level) => {
  const resolvedTiles = [];
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;
  const _getByIndex = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndex_CollisionLayer(x: number, y: number) {
    resolvedTiles.push({ x, y });
    return _getByIndex.call(tileResolver, x, y);
  }

  return (
    context: CanvasRenderingContext2D,
    camera: Camera
  ) => {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      );
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach(({ pos, size }) => {
      context.beginPath();
      context.rect(
        pos.x - camera.pos.x,
        pos.y - camera.pos.y,
        size.x,
        size.y
      );
      context.stroke();
    })

    resolvedTiles.length = 0;
  };
};

export const createCameraLayer = (cameraToDraw: Camera) =>
  (
    context: CanvasRenderingContext2D,
    fromCamera: Camera
  ) => {
    context.strokeStyle = 'purple';
    context.beginPath();
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    );
    context.stroke();
  };
