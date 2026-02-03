import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const meshRef = useRef()
  const count = 3000

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 4

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Colors: mix of primary, accent, and secondary
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        // Primary - indigo
        colors[i * 3] = 0.39
        colors[i * 3 + 1] = 0.4
        colors[i * 3 + 2] = 0.95
      } else if (colorChoice < 0.66) {
        // Accent - pink
        colors[i * 3] = 0.93
        colors[i * 3 + 1] = 0.28
        colors[i * 3 + 2] = 0.6
      } else {
        // Secondary - emerald
        colors[i * 3] = 0.06
        colors[i * 3 + 1] = 0.73
        colors[i * 3 + 2] = 0.51
      }
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShape({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.008
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function GlassOrb({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshPhysicalMaterial
        color="#6366f1"
        metalness={0.1}
        roughness={0}
        transmission={0.9}
        thickness={0.5}
        ior={1.5}
      />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />

      <ParticleField />

      <FloatingShape position={[-4, 2, -2]} color="#6366f1" scale={0.8} />
      <FloatingShape position={[4, -1, -3]} color="#ec4899" scale={0.6} />
      <FloatingShape position={[0, 3, -4]} color="#10b981" scale={0.5} />
      <FloatingShape position={[-3, -2, -2]} color="#8b5cf6" scale={0.4} />
      <FloatingShape position={[3, 2, -5]} color="#3b82f6" scale={0.7} />

      <GlassOrb position={[2, 0, -1]} />
      <GlassOrb position={[-2, 1, -2]} />
    </Canvas>
  )
}
