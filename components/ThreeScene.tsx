'use client';

import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';

export default function ThreeScene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box>
        <meshStandardMaterial color='orange' />
      </Box>
    </Canvas>
  );
}
