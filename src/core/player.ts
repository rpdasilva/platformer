import { Entity } from './Entity';
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

export const makePlayer = (entity: Entity, name: string) => {
  const player = new Player();
  player.name = name;
  entity.addTrait(player);
};

export const findPlayers = (entities: Entity[] | Set<Entity>) =>
  [...entities].filter(entity => entity.hasTrait(Player));
