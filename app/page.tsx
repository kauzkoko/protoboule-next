import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Main Page</h1>
      <Link href='/threejs'>Go to Three.js Page</Link>
      <Link href='/strudel'>Go to Strudel Page</Link>
      <Link href='/tonejs'>Go to Tone.js Page</Link>
    </main>
  );
}
