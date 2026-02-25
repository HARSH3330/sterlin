"use client";

import { Canvas } from "@react-three/fiber";
import { Float, PresentationControls } from "@react-three/drei";

// Removed Environment preset="city" – it downloads a heavy HDR image
// Reduced geometry segments dramatically (was 64x128, now 32x64)
function ProceduralRing() {
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh receiveShadow castShadow rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.25, 32, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#e8f4ff"
          metalness={0}
          roughness={0.05}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop="demand"   // only render when state changes – saves huge CPU
      dpr={[1, 1.5]}       // cap pixel ratio (was uncapped, could hit 3x on retina)
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#f5f0e8" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#c9a84c" />

      <PresentationControls
        global
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 1200 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <ProceduralRing />
      </PresentationControls>
    </Canvas>
  );
}
