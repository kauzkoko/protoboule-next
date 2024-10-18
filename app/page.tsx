import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Main Page</h1>
      <nav>
        <ul>
          <li><Link href='/howler'>Howler.js Page</Link></li>
          <li><Link href='/roboflow'>Roboflow Page</Link></li>
          <li><Link href='/roboflow/vanilla'>Roboflow Vanilla Page</Link></li>
          <li><Link href='/strudel'>Strudel Page</Link></li>
          <li><Link href='/threejs'>Three.js Page</Link></li>
          <li><Link href='/tonejs'>Tone.js Page</Link></li>
          <li><Link href='/tonejs/moveAroundMouse'>Tone.js Move Around Mouse Page</Link></li>
          <li><Link href='/tonejs/simple'>Tone.js Simple Page</Link></li>
          <li><Link href='/vanilla'>Vanilla Page</Link></li>
        </ul>
      </nav>
    </main>
  );
}
