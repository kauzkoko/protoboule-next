'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    initStrudel: any;
    evaluate: any;
    s: any;
    hush: any;
    samples: any;
  }
}

export default function StrudelClient() {
  const strudelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (strudelRef.current && window.initStrudel) {
      window.initStrudel({
        prebake: () => window.samples('github:tidalcycles/dirt-samples'),
        target: strudelRef.current,
      });
    }
  }, []);

  const handleClick = (action: () => void) => () => {
    if (window.evaluate && window.s && window.hush) {
      action();
    }
  };

  return (
    <>
      <Script
        src="https://unpkg.com/@strudel/web@1.0.3"
        onLoad={() => {
          if (strudelRef.current && window.initStrudel) {
            window.initStrudel({
              prebake: () => window.samples('github:tidalcycles/dirt-samples'),
              target: strudelRef.current,
            });
          }
        }}
      />
      <div style={{ background: '#222' }}>
        <h1>Strudel REPL Example</h1>
        <div ref={strudelRef}></div>
        <button onClick={handleClick(() => window.evaluate(`s('bd,jvbass(3,8)').jux(rev)`))}>A</button>
        <button onClick={handleClick(() => window.s('bd*2,hh(3,4),jvbass(5,8,1)').jux(rev).play())}>B</button>
        <button onClick={handleClick(() => window.s('bd*2,hh(3,4),jvbass:[0 4](5,8,1)').jux(rev).stack(window.s('~ sd')).play())}>C</button>
        <button onClick={handleClick(() => window.hush())}>stop</button>
      </div>
    </>
  );
}
