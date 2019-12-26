import { getContext } from '../lib/canvas';
import { Entity } from './Entity';
import { Level } from './Level';
import { Spritesheet } from './Spritesheet';

export const createBackgroundLayer = (level: Level, sprites: Spritesheet) => {
  const buffer = document.createElement('canvas');
  const backgroundContext = getContext(buffer);
  buffer.width = 256;
  buffer.height = 240;

  level.tiles.forEach((tile, x, y) =>
    sprites.drawTile(tile.name, backgroundContext, x, y));

  return (context: CanvasRenderingContext2D) =>
    context.drawImage(buffer, 0, 0);
};

export const createSpriteLayer = (entities: Set<Entity>) =>
  (context: CanvasRenderingContext2D) =>
    entities.forEach(entity => entity.draw(context));

export const createCollisionLayer = (level: Level) => {
  const resolvedTiles = [];
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;
  const _getByIndex = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndex_CollisionLayer(x: number, y: number) {
    resolvedTiles.push({ x, y });
    return _getByIndex.call(tileResolver, x, y);
  }

  return (context: CanvasRenderingContext2D) => {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach(({ pos, size }) => {
      context.beginPath();
      context.rect(pos.x, pos.y, size.x, size.y);
      context.stroke();
    })

    resolvedTiles.length = 0;
  };
};
