"use client"
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

export default function SpatialAudioPage() {
  const [audio, setAudio] = useState<{ synth: Tone.Synth, panner: Tone.Panner3D } | null>(null);

  useEffect(() => {
    const panner = new Tone.Panner3D({
      positionX: -10, // Far left
      positionY: 0,
      positionZ: 0,
    }).toDestination();

    const synth = new Tone.Synth().connect(panner);

    setAudio({ synth, panner });

    return () => {
      synth.dispose();
      panner.dispose();
    };
  }, []);

  const playSound = async () => {
    if (audio) {
      await Tone.start();
      audio.synth.triggerAttackRelease("C4", "8n");
    }
  };

  return (
    <div>
      <h1>Spatial Audio Demo</h1>
      <button onClick={playSound}>Play Spatial Sound</button>
      <p>The sound should come from the far left.</p>
    </div>
  );
}