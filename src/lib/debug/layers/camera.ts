import { Camera } from '../../../core/Camera';

export const createDebugCameraLayer = (cameraToDraw: Camera) =>
  function drawCameraLayer (
    context: CanvasRenderingContext2D,
    fromCamera: Camera
  ) {
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
