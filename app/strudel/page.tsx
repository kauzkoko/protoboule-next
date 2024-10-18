import dynamic from 'next/dynamic';

const StrudelClientNoSSR = dynamic(() => import('./StrudelClient'), {
  ssr: false,
});

export default function StrudelPage() {
  return (
    <div>
      <StrudelClientNoSSR />
    </div>
  );
}
