import { Entity } from './entity';
import { loadMarioSprite } from './loaders';

class Mario extends Entity {
  constructor(private sprite) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw('idle', context, this.position.x, this.position.y);
  }

  update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }
}

export const createMario = () =>
  loadMarioSprite().then(sprite => new Mario(sprite));
