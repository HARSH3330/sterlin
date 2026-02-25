"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Simplified geometry, no Environment HDR, frameloop="demand"
export default function ModelViewer({ category }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      frameloop="demand"
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <spotLight position={[5, 10, 5]} intensity={2} angle={0.3} penumbra={1} color="#f5f0e8" />
      <pointLight position={[-3, -3, -3]} intensity={0.6} color="#c9a84c" />

      <mesh receiveShadow castShadow>
        {category === "Rings" ? (
          <torusGeometry args={[1, 0.2, 32, 64]} />
        ) : category === "Bracelets" ? (
          <torusGeometry args={[1.5, 0.1, 24, 80]} />
        ) : category === "Earrings" ? (
          <torusGeometry args={[0.5, 0.1, 24, 48]} />
        ) : (
          <octahedronGeometry args={[1, 0]} />
        )}
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={10}
        minDistance={2}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}
