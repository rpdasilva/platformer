import { MusicPlayer } from '../MusicPlayer';
import { musicSheetUrls, musicUrls } from '../constants';

export const loadMusicSheet = (name: string) =>
  musicSheetUrls[name]
    .then(Object.entries)
    .then(musicEntries => Promise.all(
      musicEntries.map(([name, track]) =>
        musicUrls[track.name].then(url => [name, url])))
    )
    .then(musicEntries => {
      const musicPlayer = new MusicPlayer();
      musicEntries
        .forEach(([name, url]) => musicPlayer.addTrack(name, url));

      return musicPlayer;
    });
