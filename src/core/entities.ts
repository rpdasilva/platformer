import { loadMario } from './entities/Mario';
import { loadGoomba } from './entities/Goomba';
import { loadKoopa } from './entities/Koopa';
import { loadBulletBill } from './entities/BulletBill';
import { loadCannon } from './entities/Cannon';
import { EntityFactory, EntityFactories } from './types';

const addFactoryAs = (name: string) => (factory: EntityFactory) =>
  ({ [name]: factory  });

export const loadEntities = (audioContext: AudioContext) => {
  const factoriesRef: EntityFactories = {};

  return Promise.all([
    loadMario(audioContext).then(addFactoryAs('mario')),
    loadGoomba(audioContext).then(addFactoryAs('goomba')),
    loadKoopa(audioContext).then(addFactoryAs('koopa')),
    loadBulletBill(audioContext).then(addFactoryAs('bulletBill')),
    loadCannon(audioContext, factoriesRef).then(addFactoryAs('cannon'))
  ])
  .then(factories => Object.assign(factoriesRef, ...factories));
}
