import { Entity } from '../core/Entity';
import { Camera } from '../core/Camera';
import { Level } from '../core/Level';

export const debugMouseControls = (
  canvas: HTMLCanvasElement,
  entity: Entity,
  camera: Camera
) => {
  let lastMouseEvent;

  canvas.addEventListener('contextmenu', event => event.preventDefault());

  ['mousedown', 'mousemove'].forEach(type => {
    canvas.addEventListener(type, (event: MouseEvent) => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(
          event.offsetX + camera.pos.x,
          event.offsetY + camera.pos.y
        );
      }

      if (
        event.buttons === 2
        && lastMouseEvent
        && lastMouseEvent.buttons === 2
        && lastMouseEvent.type === 'mousemove') {
          camera.pos.x -= event.offsetX - lastMouseEvent.offsetX;
      }

      lastMouseEvent = event;
    });
  });
}

export const createDebugCollisionLayer = (level: Level) => {
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
    level.entities.forEach(({ size, bounds }) => {
      context.beginPath();
      context.rect(
        bounds.left - camera.pos.x,
        bounds.top - camera.pos.y,
        size.x,
        size.y
      );
      context.stroke();
    })

    resolvedTiles.length = 0;
  };
};

export const createDebugCameraLayer = (cameraToDraw: Camera) =>
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
