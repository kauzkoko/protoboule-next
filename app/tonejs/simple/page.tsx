"use client"
import dynamic from 'next/dynamic';

const ToneComponent = dynamic(() => import('/components/ToneComponent'), { ssr: false });

export default function TonePage() {
  return (
    <div>
      <h1>Spatial Audio with Tone.js</h1>
      <ToneComponent />
    </div>
  );
}
