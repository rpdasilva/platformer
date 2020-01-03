import { Entity } from '../../core/Entity';
import { Camera } from '../../core/Camera';

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