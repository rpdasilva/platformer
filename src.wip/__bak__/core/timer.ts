export const timer = (update: Function, deltaTime: number) => {
  let isStopped = false;
  let accumulatedTime = 0;
  let lastTime = 0;

  const updateProxy = (time: number) => {
      accumulatedTime += (time - lastTime) / 1000;

      if (accumulatedTime > 1) {
          accumulatedTime = 1;
      }

      while (accumulatedTime > deltaTime) {
          update(deltaTime);
          accumulatedTime -= deltaTime;
      }

      lastTime = time;

     !isStopped && window.requestAnimationFrame(updateProxy);
  };

  window.requestAnimationFrame(updateProxy);

  return () => isStopped = true;
};