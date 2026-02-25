"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, PresentationControls } from "@react-three/drei";

export default function ModelViewer({ category }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#f5f0e8" />

      <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }}>
        <mesh receiveShadow castShadow>
          {category === "Rings" ? (
            <torusGeometry args={[1, 0.2, 64, 128]} />
          ) : category === "Bracelets" ? (
            <torusGeometry args={[1.5, 0.1, 64, 200]} />
          ) : category === "Earrings" ? (
            <torusGeometry args={[0.5, 0.1, 32, 64]} />
          ) : (
            <octahedronGeometry args={[1]} />
          )}
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            envMapIntensity={2}
          />
        </mesh>
      </PresentationControls>

      <Environment preset="city" />
      <OrbitControls enableZoom={true} enablePan={false} maxDistance={10} minDistance={2} />
    </Canvas>
  );
}
