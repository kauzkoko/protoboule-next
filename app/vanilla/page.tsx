'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const AudioPlayerWith3D: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const pannerRef = useRef<PannerNode | null>(null);

  const initializeAudio = useCallback(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioElement);

    const panner = audioContext.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';

    panner.positionX.setValueAtTime(10, audioContext.currentTime);
    panner.positionY.setValueAtTime(0, audioContext.currentTime);
    panner.positionZ.setValueAtTime(2, audioContext.currentTime);

    source.connect(panner);
    panner.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    pannerRef.current = panner;
  }, []);

  const handlePlayPause = useCallback(() => {
    const audioElement = audioRef.current;
    const audioContext = audioContextRef.current;

    if (audioElement && audioContext) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  useEffect(() => {
    initializeAudio();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [initializeAudio]);

  return (
    <div>
      <h1>3D Audio Player</h1>
      <audio
        ref={audioRef}
        src="/doorbell.mp3"
        preload="auto"
        crossOrigin="anonymous"
      />
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayerWith3D;
