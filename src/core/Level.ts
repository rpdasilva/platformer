import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { EntityCollider } from './EntityCollider';
import { TileCollider } from './TileCollider';
import { MusicController } from './MusicController';
import { GameContext } from './types';

export class Level {
  gravity = 1500;
  totalTime = 0;
  comp = new Compositor();
  entities = new Set<Entity>();
  entityCollider = new EntityCollider(this.entities);
  tileCollider = new TileCollider();
  music = new MusicController();

  update(gameContext: GameContext) {
    this.entities.forEach(entity => entity.update(gameContext, this));
    this.entities.forEach(entity => this.entityCollider.check(entity));
    this.entities.forEach(entity => entity.finalize());

    this.totalTime += gameContext.deltaTime;
  }
}