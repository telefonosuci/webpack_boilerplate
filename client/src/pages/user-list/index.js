
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '../../contexts/ThemeProvider';

import SimpleUserList from '../../components/simple-user-list/SimpleUserList';

import MusicPlayer from '../../components/music-player/MusicPlayer';


import Counter from '../../classes/Counter';
document.addEventListener('DOMContentLoaded', () => {

  console.log("User list loaded");

  new Counter("counter");



  const productElList = document.querySelectorAll('.js-react-user-lister');

  console.log("Element lister List: ", productElList);

  productElList.forEach((el) => {


    const root = createRoot(el);
    root.render(
      <ThemeProvider>
          <SimpleUserList />
          <MusicPlayer />
      </ThemeProvider>
    );
  });

});
