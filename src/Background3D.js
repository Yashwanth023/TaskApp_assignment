import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'

function AnimatedSphere({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t + position[0] * 100) * 0.2
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.z = t * 0.2
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.1, 16, 16]}>
      <meshStandardMaterial color="#8b5cf6" emissive="#4c1d95" emissiveIntensity={0.5} roughness={0.5} metalness={0.8} />
    </Sphere>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        {Array.from({ length: 50 }).map((_, i) => (
          <AnimatedSphere
            key={i}
            position={[
              Math.random() * 10 - 5,
              Math.random() * 10 - 5,
              Math.random() * 10 - 5
            ]}
          />
        ))}
      </Canvas>
    </div>
  )
}