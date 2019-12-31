export const createAnimation = (frames: string[], frameLength: number) => {
  return function resolveFrame(distance: number) {
    const currentFrame = Math.floor(distance / frameLength) % frames.length;
    return frames[currentFrame];
  }
};
