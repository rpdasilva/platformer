import { loadMario } from './entities/Mario';
import { loadGoomba } from './entities/Goomba';
import { loadKoopa } from './entities/Koopa';
import { Entity } from './Entity';

const addFactoryAs = (name: string) => (factory: () => Entity) =>
  ({ [name]: factory  });

export const loadEntities = (audioContext: AudioContext) =>
  Promise.all([
    loadMario(audioContext).then(addFactoryAs('mario')),
    loadGoomba(audioContext).then(addFactoryAs('goomba')),
    loadKoopa(audioContext).then(addFactoryAs('koopa'))
  ])
  .then(factories => Object.assign(...factories));
