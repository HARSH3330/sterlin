"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";

function ProceduralRing() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh receiveShadow castShadow rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.25, 64, 128]} />
        <meshPhysicalMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <octahedronGeometry args={[0.4]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          opacity={1}
          metalness={0}
          roughness={0}
          ior={2.4}
          thickness={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#f5f0e8" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#c9a84c" />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <ProceduralRing />
      </PresentationControls>

      <Environment preset="city" />
    </Canvas>
  );
}
