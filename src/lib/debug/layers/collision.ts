import { Camera } from '../../../core/Camera';
import { Entity } from '../../../core/Entity';
import { Level } from '../../../core/Level';
import { TileCollider } from '../../../core/TileCollider';

const createDrawBox = (
  color: string,
  context: CanvasRenderingContext2D
) => (x: number, y: number, w: number, h: number) => {
  context.strokeStyle = color;
  context.beginPath();
  context.rect(x, y, w, h);
  context.stroke();
}

const createEntityCollisionLayer = (entities: Set<Entity>) => {
  return function drawEntityBoundingBoxes (
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    const drawBox = createDrawBox('red', context);

    entities.forEach(({ size, bounds }) => {
      drawBox(
        bounds.left - camera.pos.x,
        bounds.top - camera.pos.y,
        size.x,
        size.y
      );
    });
  }
}

const createTileCandidateLayer = (tileCollider: TileCollider) => {
  const resolvedTiles = new Set();
  const tileResolver = tileCollider.tiles;
  const tileSize = tileResolver.tileSize;
  const _getByIndex = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndex_CollisionLayer(x: number, y: number) {
    resolvedTiles.add({ x, y });
    return _getByIndex.call(tileResolver, x, y);
  }

  return function drawTileCandidates (
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    const drawBox = createDrawBox('blue', context);
    resolvedTiles.forEach(({ x, y }) => {
      drawBox(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      );
    });
    resolvedTiles.clear();
  }
}

export const createDebugCollisionLayer = (level: Level) => {
  const drawTileCandidateBoxes = createTileCandidateLayer(level.tileCollider)
  const drawEntityBoundingBoxes = createEntityCollisionLayer(level.entities);

  return function drawCollisionLayer (
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    drawTileCandidateBoxes(context, camera);
    drawEntityBoundingBoxes(context, camera);
  }
};
