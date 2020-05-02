import { audioSheetUrls, soundEffectUrls } from '../constants';
import { AudioBoard } from '../AudioBoard';

export const loadAudioBoard = (name: string, audioContext: AudioContext) => {
  const loadSoundEffect = createSoundEffectLoader(audioContext);

  return audioSheetUrls[name]
    .then(({ fx }) => Object.keys(fx))
    .then(fx => Promise.all(
      fx.map(name =>
        loadSoundEffect(name).then(buffer => ({ name, buffer })))
    ))
    .then(soundEffects => {
      const audioBoard = new AudioBoard(audioContext);
      soundEffects.forEach(({ name, buffer}) => {
        audioBoard.addAudio(name, buffer);
      });
      return audioBoard;
    });
}

export const createSoundEffectLoader = (context: AudioContext) =>
  (name: string): Promise<any> =>
    soundEffectUrls[name]
      .then(fetch)
      .then(res => res.arrayBuffer())
      .then(buffer => context.decodeAudioData(buffer));
