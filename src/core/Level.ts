import { Camera } from './Camera';
import { Compositor } from './Compositor';
import { Entity } from './Entity';
import { EntityCollider } from './EntityCollider';
import { TileCollider } from './TileCollider';
import { MusicController } from './MusicController';
import { EventEmitter } from './EventEmitter';
import { Scene } from './Scene';
import { GameContext } from './types';
import { findPlayers } from './player';

const focusPlayer = (level: Level) => {
  findPlayers(level).forEach(entity => {
    level.camera.pos.x = Math.max(0, entity.pos.x - 150);
  });
}

export class Level extends Scene {
  static readonly EVENT_TRIGGER = Symbol('Trigger');

  gravity = 1500;
  totalTime = 0;
  camera = new Camera();
  comp = new Compositor();
  entities = new Set<Entity>();
  entityCollider = new EntityCollider(this.entities);
  tileCollider = new TileCollider();
  music = new MusicController();
  events = new EventEmitter();
  name: string;

  draw({ videoContext }: GameContext) {
    this.comp.draw(videoContext, this.camera);
  }

  update(gameContext: GameContext) {
    this.entities.forEach(entity => entity.update(gameContext, this));
    this.entities.forEach(entity => this.entityCollider.check(entity));
    this.entities.forEach(entity => entity.finalize());

    focusPlayer(this);

    this.totalTime += gameContext.deltaTime;
  }

  pause() {
    this.music.pause();
  }
}