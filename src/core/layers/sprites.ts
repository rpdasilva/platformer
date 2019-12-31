import { createBuffer, getContext } from '../../lib/canvas';
import { Entity } from '../Entity';
import { Camera } from '../Camera';

export const createSpriteLayer = (
  entities: Set<Entity>,
  width = 64,
  height = 64
) => {
  const spriteBuffer = createBuffer(width, height);
  const spriteContext = getContext(spriteBuffer);

  return function drawSpriteLayer (context: CanvasRenderingContext2D, camera: Camera) {
    entities.forEach(entity => {
      spriteContext.clearRect(0, 0, width, height);

      entity.draw(spriteContext);

      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
  }
};
