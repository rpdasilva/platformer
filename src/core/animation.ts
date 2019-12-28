export const createAnimation = (frames: string[], frameLength: number) => {
  return (distance: number) => {
    const currentFrame = Math.floor(distance / frameLength) % frames.length;
    return frames[currentFrame];
  };
};
