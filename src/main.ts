import { Camera } from './core/Camera';
import { loadEntities } from './core/entities';
import { setupKeyboard } from './core/input';
import { createLevelLoader } from './core/loaders/level';
import { loadFont } from './core/loaders/font';
import { Timer } from './core/Timer';
import { getContext } from './lib/canvas';

import { Entity } from './core/Entity';
import { PlayerController } from './core/traits/PlayerController';
import { GameContext } from './core/types';

import { createDebugCameraLayer } from './lib/debug/layers/camera';
import { createDebugCollisionLayer } from './lib/debug/layers/collision';
import { createDashboardLayer } from './core/layers/dashboard';

const createPlayerEnv = (playerEntity: Entity) => {
  class PlayerEnv extends Entity {}

  const playerEnv = new PlayerEnv();
  const playerController = new PlayerController();
  playerController.setPlayer(playerEntity);
  playerController.checkpoint.set(64, 64);
  playerEnv.addTrait(playerController);

  return playerEnv;
};



const main = async (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);
  const audioContext = new AudioContext();

  const entityFactory = await loadEntities(audioContext);
  const font = await loadFont();
  const loadLevel = createLevelLoader(entityFactory);
  const level = await loadLevel('1-1');

  const camera = new Camera();

  const mario = entityFactory.mario();
  const playerEnv = createPlayerEnv(mario);
  level.entities.add(playerEnv);

  level.comp.addLayers(
    createDebugCameraLayer(camera),
    createDebugCollisionLayer(level),
    createDashboardLayer(font, playerEnv)
  );

  const input = setupKeyboard(mario);
  input.listenTo(window);

  const gameContext: GameContext = {
    audioContext,
    deltaTime: null
  }

  const timer = new Timer(
    1/60,
    (deltaTime: number) => {
      gameContext.deltaTime = deltaTime;
      level.update(gameContext);

      camera.pos.x = Math.max(0, mario.pos.x - 150);

      level.comp.draw(context, camera);
    }
  );

  timer.start();
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;

const start = () => {
  window.removeEventListener('click', start);
  main(canvas);
};

window.addEventListener('click', start);
