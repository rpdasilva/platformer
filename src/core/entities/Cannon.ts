import { Entity } from '../Entity';
import { Level } from '../Level';
import { loadAudioBoard } from '../loaders/sound';
import { AudioBoard } from '../AudioBoard';
import { Spawner } from '../traits/Spawner';
import { findPlayers } from '../player';
import { LoadEntity, GameContext } from '../types';

const HOLD_FIRE_THRESHOLD = 30;

export class Cannon extends Entity {
  constructor(
    public audioBoard: AudioBoard
  ) {
    super();
  }
}

export const loadCannon: LoadEntity = (audioContext: AudioContext) => {
  return loadAudioBoard('cannon', audioContext)
    .then(audioBoard => createCannonFactory(audioBoard));
}

const createCannonFactory = (audioBoard: AudioBoard) => {
  const spawnBullet = (entity: Entity, gameContext: GameContext, level: Level) => {
    const players = findPlayers(level);
    const hasClosePlayer = players.some(player => (
      player.pos.x > entity.pos.x - HOLD_FIRE_THRESHOLD
      && player.pos.x < entity.pos.x + HOLD_FIRE_THRESHOLD
    ))

    if (hasClosePlayer) {
      return;
    }

    const direction = players[0].pos.x > entity.pos.x ? 1 : -1;
    const bulletBill = gameContext.entityFactory.bulletBill();
    bulletBill.pos.copy(entity.pos);
    bulletBill.vel.set(80 * direction, 0);

    entity.sounds.add('shoot');
    level.entities.add(bulletBill);
  }

  return () => {
    const cannon = new Cannon(audioBoard);
    const spawner = new Spawner();
    spawner.spawners.push(spawnBullet);

    cannon.addTrait(spawner);

    return cannon;
  };
};