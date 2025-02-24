
import React from 'react';
import { createRoot } from 'react-dom/client';
import MusicPlayer from '../../components/music-player/MusicPlayer';

document.addEventListener('DOMContentLoaded', () => {

  const musicPlayerList = document.querySelectorAll('.js-react-music-player');

  musicPlayerList.forEach((el) => {


    const root = createRoot(el);
    root.render(
      <MusicPlayer />
    );
  });

});
