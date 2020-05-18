import { loadEntities } from './core/entities';
import { setupKeyboard } from './core/input';
import { createLevelLoader } from './core/loaders/level';
import { loadFont } from './core/loaders/font';
import { makePlayer, createPlayerEnv, findPlayers } from './core/player';
import { Scene } from './core/Scene';
import { TimedScene } from './core/TimedScene';
import { SceneRunner } from './core/SceneRunner';
import { Level } from './core/Level';
import { Timer } from './core/Timer';
import { Player } from './core/traits/Player';
import { GameContext } from './core/types';
import { getContext } from './lib/canvas';

import { createDebugCameraLayer } from './lib/debug/layers/camera';
import { createDebugCollisionLayer } from './lib/debug/layers/collision';
import { createColourLayer } from './core/layers/colour';
import { createDashboardLayer } from './core/layers/dashboard';
import { createTextLayer } from './core/layers/text';
import { createProgressScreenLayer } from './core/layers/progress-screen';

const main = async (canvas: HTMLCanvasElement, win: Window) => {
  const videoContext = getContext(canvas);
  const audioContext = new AudioContext();

  const entityFactory = await loadEntities(audioContext);
  const font = await loadFont();
  const loadLevel = createLevelLoader(entityFactory);
  const sceneRunner = new SceneRunner();

  const mario = entityFactory.mario();
  makePlayer(mario, 'MARIO');

  const runLevel = async (name: string) => {
    const loadScene = new Scene();
    loadScene.comp.addLayer(createColourLayer('#000'));
    loadScene.comp.addLayer(createTextLayer(font, `Loading ${name}...`));
    sceneRunner.addScene(loadScene);
    sceneRunner.runNext();


    const level = await loadLevel(name);
    const progressScene = new TimedScene();

    const dashboardLayer = createDashboardLayer(font, level);
    const progressScreenLayer = createProgressScreenLayer(font, level);
    const playerEnv = createPlayerEnv(mario);

    level.events.listen(
      Level.EVENT_TRIGGER,
      (triggerSpec, trigger, collisions) => {
        if (triggerSpec.type === 'goto') {
          const [gotoTrigger] = findPlayers(collisions);

          if (gotoTrigger) {
            runLevel(triggerSpec.name);
          }
        }
      });

    mario.pos.set(0, 0);
    mario.vel.set(0, 0);
    level.entities.add(mario); // Hack to work around entity removal on kill
    level.entities.add(playerEnv);

    level.comp.addLayers(
      createDebugCameraLayer(level.camera),
      createDebugCollisionLayer(level),
      dashboardLayer
    );

    progressScene.comp.addLayers(
      createColourLayer('#000'),
      dashboardLayer,
      progressScreenLayer
    );

    sceneRunner.addScene(progressScene);
    sceneRunner.addScene(level);

    sceneRunner.runNext();
  };

  const inputRouter = setupKeyboard(win);
  inputRouter.addReceiver(mario);


  const gameContext: GameContext = {
    audioContext,
    videoContext,
    entityFactory,
    deltaTime: null
  }

  const timer = new Timer(
    1/60,
    (deltaTime: number) => {
      gameContext.deltaTime = deltaTime;
      sceneRunner.update(gameContext);
    }
  );

  timer.start();

  runLevel('1-1');
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;

const start = () => {
  window.removeEventListener('click', start);
  main(canvas, window);
};

window.addEventListener('click', start);
