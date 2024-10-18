"use client"
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { useMouse } from 'react-use';

export default function SpatialAudioPage() {
  const [audio, setAudio] = useState<{ synth: Tone.Synth, panner: Tone.Panner3D } | null>(null);
  const ref = React.useRef(null);
  const mouse = useMouse(ref);

  useEffect(() => {
    const panner = new Tone.Panner3D({
      positionX: 0,
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

  useEffect(() => {
    if (audio && mouse.elX !== null && ref.current) {
      // Map mouse.elX (0 to element width) to audio position (-1 to 1)
      const mappedX = (mouse.elX / ref.current.clientWidth) * 2 - 1;
      audio.panner.positionX.setValueAtTime(mappedX, Tone.now());
      console.log('Updated panner position:', mappedX);
    }
  }, [audio, mouse.elX]);

  const playSound = async () => {
    if (audio) {
      await Tone.start();
      audio.synth.triggerAttackRelease("C4", "20");
    }
  };

  return (
    <div ref={ref} style={{ width: '100%', height: '100vh' }}>
      <h1>Spatial Audio Demo</h1>
      <button onClick={playSound}>Play Spatial Sound</button>
      <p>Move your mouse horizontally to change the sound position.</p>
      {mouse.elX !== null && (
        <p>Mouse X: {mouse.elX.toFixed(2)}</p>
      )}
    </div>
  );
}
