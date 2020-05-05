import { Entity } from './Entity';
import { Level } from './Level';
import { Player } from './traits/Player';
import { PlayerController } from './traits/PlayerController';

export const createPlayerEnv = (playerEntity: Entity) => {
  class PlayerEnv extends Entity {}

  const playerEnv = new PlayerEnv();
  const playerController = new PlayerController();
  playerController.setPlayer(playerEntity);
  playerController.checkpoint.set(64, 64);
  playerEnv.addTrait(playerController);

  return playerEnv;
};

export const createPlayer = (entity: Entity) => {
  entity.addTrait(new Player());
  return entity;
};

export const findPlayers = (level: Level) =>
  [...level.entities].filter(entity => entity.hasTrait(Player.NAME));
