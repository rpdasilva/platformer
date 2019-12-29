import { loadMario } from './entities/Mario';
import { loadGoomba } from './entities/Goomba';
import { loadKoopa } from './entities/Koopa';
import { Entity } from './Entity';

const addFactoryAs = (name: string) => (factory: () => Entity) =>
  ({ [name]: factory  });

export const loadEntities = () =>
  Promise.all([
    loadMario().then(addFactoryAs('mario')),
    loadGoomba().then(addFactoryAs('goomba')),
    loadKoopa().then(addFactoryAs('koopa'))
  ])
  .then(factories => Object.assign(...factories));
