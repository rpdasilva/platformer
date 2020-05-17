export class Timer {
  updateProxy: (time: number) => void;
  debugFps = 0;

  constructor(
    deltaTime: number,
    update: (time: number) => void
  ) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time: number) => {
      if (lastTime) {
        accumulatedTime += (time - lastTime) / 1000;

        if (accumulatedTime > 1) {
          accumulatedTime = 1;
        }

        while (accumulatedTime > deltaTime) {
          update(deltaTime);
          accumulatedTime -= deltaTime;
        }
      }

      lastTime = time;

      this.enqueue();
    };
  }

  enqueue() {
    this.debugFps
      ? setTimeout(this.updateProxy, 1000 / this.debugFps, performance.now())
      : requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }
}
