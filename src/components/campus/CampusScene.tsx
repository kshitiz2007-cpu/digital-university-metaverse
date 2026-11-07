"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export type CampusPlace = { id: string; name: string; subtitle: string; color: string; position: [number, number, number]; route: string };

const places: CampusPlace[] = [
  { id: "academy", name: "Main Academy", subtitle: "Your learning overview", color: "#e9a2e8", position: [-3.7, 0.45, 0], route: "/academy" },
  { id: "library", name: "Grand Library", subtitle: "Books, notes & discoveries", color: "#9b8cff", position: [0, 0.45, -3.3], route: "/library" },
  { id: "lecture", name: "Lecture Theatre", subtitle: "Live and recorded classes", color: "#79dce7", position: [3.7, 0.45, 0], route: "/classes" },
  { id: "exam", name: "Examination Hall", subtitle: "Quizzes and mock tests", color: "#f2bd87", position: [0, 0.45, 3.3], route: "/exams" },
];

function Building({ place, onSelect, active }: { place: CampusPlace; onSelect: (place: CampusPlace) => void; active: boolean }) {
  return (
    <Float speed={1.1} rotationIntensity={0.035} floatIntensity={0.12}>
      <group position={place.position} onClick={(event) => { event.stopPropagation(); onSelect(place); }}>
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.92, 1.12, 1.05, 8]} />
          <meshStandardMaterial color={active ? "#f2d9ff" : "#c3b6df"} metalness={0.34} roughness={0.32} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[0.78, 0.8, 8]} />
          <meshStandardMaterial color={place.color} emissive={place.color} emissiveIntensity={active ? 0.55 : 0.2} metalness={0.24} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0.48, 0.57]}>
          <boxGeometry args={[0.24, 0.48, 0.04]} />
          <meshStandardMaterial color="#24213b" />
        </mesh>
        <mesh position={[0, 1.65, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color={place.color} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.12, 32]} />
          <meshStandardMaterial color={active ? place.color : "#6c5d92"} emissive={place.color} emissiveIntensity={active ? 0.3 : 0.06} />
        </mesh>
      </group>
    </Float>
  );
}

function World({ onSelect, selectedId }: { onSelect: (place: CampusPlace) => void; selectedId: string | null }) {
  return (
    <>
      <color attach="background" args={["#0b0920"]} />
      <fog attach="fog" args={["#0b0920", 15, 34]} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[5, 9, 6]} intensity={2.1} castShadow />
      <pointLight position={[-5, 4, -4]} color="#b58cff" intensity={22} distance={18} />
      <pointLight position={[5, 3, 4]} color="#f18ed7" intensity={16} distance={14} />
      <Stars radius={80} depth={35} count={1200} factor={2.2} fade speed={0.5} />
      <Sparkles count={85} scale={[14, 5, 14]} size={2.1} speed={0.25} color="#d6b8ff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
        <cylinderGeometry args={[7.4, 8.1, 1.15, 64]} />
        <meshStandardMaterial color="#292447" roughness={0.8} metalness={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
        <ringGeometry args={[5.1, 5.22, 96]} />
        <meshBasicMaterial color="#b58cff" transparent opacity={0.72} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[2.0, 2.3, 0.18, 48]} />
        <meshStandardMaterial color="#65548d" metalness={0.35} roughness={0.42} />
      </mesh>
      <Float speed={0.7} floatIntensity={0.12}>
        <mesh position={[0, 1.25, 0]}>
          <icosahedronGeometry args={[0.78, 2]} />
          <meshStandardMaterial color="#d9c1ff" emissive="#a77cff" emissiveIntensity={1.1} roughness={0.2} metalness={0.45} />
        </mesh>
      </Float>
      {places.map((place) => <Building key={place.id} place={place} onSelect={onSelect} active={selectedId === place.id} />)}
      <OrbitControls enablePan={false} minDistance={10} maxDistance={21} minPolarAngle={0.55} maxPolarAngle={1.35} autoRotate autoRotateSpeed={0.28} />
    </>
  );
}

export default function CampusScene({ onSelect, selectedId }: { onSelect: (place: CampusPlace) => void; selectedId: string | null }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [10, 9, 12], fov: 38 }} shadows dpr={[1, 1.6]}>
        <Suspense fallback={null}><World onSelect={onSelect} selectedId={selectedId} /></Suspense>
      </Canvas>
    </div>
  );
}
