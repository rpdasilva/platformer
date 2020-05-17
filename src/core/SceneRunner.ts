import { Scene } from './Scene';
import { GameContext } from "./types";

export class SceneRunner {
  scenes: Scene[] = [];
  sceneIndex = -1;

  update(gameContext: GameContext) {
    const currentScene = this.scenes[this.sceneIndex];
    if (currentScene) {
      currentScene.update(gameContext);
      currentScene.draw(gameContext);
    }
  }

  addScene(scene: Scene) {
    scene.events.listen(Scene.EVENT_COMPLETE, () => this.runNext());
    this.scenes.push(scene);
  }

  runNext() {
    const currentScene = this.scenes[this.sceneIndex];
    if (currentScene) {
        currentScene.pause();
    }
    this.sceneIndex++;
  }
}