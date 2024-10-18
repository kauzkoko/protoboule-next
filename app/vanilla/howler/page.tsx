'use client';

import React, { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';

const AudioPlayerWith3D = () => {
  const soundRef = useRef(null);

  useEffect(() => {
    const sound = new Howl({
      src: ['/doorbell.mp3'], // Update path to be relative to the public directory
      html5: true,
      preload: true,
      volume: 1.0,
      loop: false,
      autoplay: true,
      onplay: () => console.log('Sound started!'),
      onend: () => console.log('Sound finished!'),
    });
  }, []);

  return (
    <div>
      <h1>3D Audio Player with Howler.js</h1>
    </div>
  );
};

export default AudioPlayerWith3D;