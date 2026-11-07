"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export type CampusPlace = { id:string; name:string; subtitle:string; color:string; position:[number,number,number]; route:string };

const places:CampusPlace[] = [
  {id:"academy",name:"Main Academy",subtitle:"Your learning headquarters",color:"#e7a0dc",position:[-3.8,.06,0],route:"/academy"},
  {id:"library",name:"Grand Library",subtitle:"Books, notes and discoveries",color:"#a99aff",position:[0,.06,-3.8],route:"/library"},
  {id:"lecture",name:"Lecture Theatre",subtitle:"Live and recorded classes",color:"#82dce7",position:[3.8,.06,0],route:"/classes"},
  {id:"exam",name:"Examination Hall",subtitle:"Quizzes and mock tests",color:"#edc28c",position:[0,.06,3.8],route:"/exams"}
];

const windowXs = [-.78,-.26,.26,.78];

function Tree({position,scale=1}:{position:[number,number,number];scale?:number}) {
  return <group position={position} scale={scale}>
    <mesh position={[0,.48,0]}><cylinderGeometry args={[.09,.14,.95,7]}/><meshStandardMaterial color="#76543f"/></mesh>
    <mesh position={[0,1.12,0]} castShadow><dodecahedronGeometry args={[.58,1]}/><meshStandardMaterial color="#466f68" roughness={.92}/></mesh>
    <mesh position={[.18,1.5,0]}><dodecahedronGeometry args={[.38,1]}/><meshStandardMaterial color="#71917b" roughness={.9}/></mesh>
  </group>;
}

function BuildingWindow({x,y,z}:{x:number;y:number;z:number}) {
  return <group position={[x,y,z]}>
    <mesh><boxGeometry args={[.3,.48,.055]}/><meshStandardMaterial color="#a8dce5" emissive="#70c9d8" emissiveIntensity={.42} metalness={.2} roughness={.25}/></mesh>
    <mesh position={[0,0,-.035]}><boxGeometry args={[.38,.56,.045]}/><meshStandardMaterial color="#766b8c" metalness={.25} roughness={.4}/></mesh>
  </group>;
}

function Building({place,onSelect,active,index}:{place:CampusPlace;onSelect:(place:CampusPlace)=>void;active:boolean;index:number}) {
  const width = index===1 ? 2.65 : 2.4;
  const height = index===2 ? 1.75 : 2.05;
  const rotation = [Math.PI/2,0,-Math.PI/2,Math.PI][index];
  return <group position={place.position} rotation={[0,rotation,0]} onClick={event=>{event.stopPropagation();onSelect(place);}}>
    <mesh position={[0,height/2,0]} castShadow receiveShadow>
      <boxGeometry args={[width,height,1.9]}/>
      <meshStandardMaterial color={active?"#f0e8f6":"#d8d1e4"} roughness={.58} metalness={.08}/>
    </mesh>
    <mesh position={[0,height+.08,0]} castShadow>
      <boxGeometry args={[width+.28,.18,2.08]}/>
      <meshStandardMaterial color={place.color} roughness={.38} metalness={.22} emissive={place.color} emissiveIntensity={active ? .28 : .08}/>
    </mesh>
    <mesh position={[0,height+.32,0]} castShadow>
      <boxGeometry args={[width*.76,.42,1.52]}/>
      <meshStandardMaterial color="#827694" roughness={.5}/>
    </mesh>
    <mesh position={[0,height+.58,0]}>
      <coneGeometry args={[.92,.42,4]}/>
      <meshStandardMaterial color={place.color} roughness={.42} metalness={.2}/>
    </mesh>
    {windowXs.map(x=><BuildingWindow key={"a"+x} x={x} y={.95} z={.978}/>)}
    {windowXs.map(x=><BuildingWindow key={"b"+x} x={x} y={1.55} z={.978}/>)}
    <mesh position={[0,.57,1.0]}><boxGeometry args={[.52,1.12,.09]}/><meshStandardMaterial color="#4a4163"/></mesh>
    <mesh position={[0,.1,1.2]}><boxGeometry args={[1.18,.2,.58]}/><meshStandardMaterial color="#c2b7cf"/></mesh>
    <mesh position={[0,.23,1.08]}><boxGeometry args={[.88,.16,.28]}/><meshStandardMaterial color="#f1e8f2"/></mesh>
    {[-1,1].map(side=><mesh key={side} position={[side*(width/2+.02),.8,0]}><boxGeometry args={[.12,1.5,1.72]}/><meshStandardMaterial color="#b7accb" roughness={.6}/></mesh>)}
    <mesh position={[0,.055,0]}><boxGeometry args={[width+.52,.12,2.42]}/><meshStandardMaterial color={active?place.color:"#8e83a9"} emissive={place.color} emissiveIntensity={active ? .25 : .04}/></mesh>
    <mesh position={[0,height+.84,0]}><boxGeometry args={[.72,.08,.72]}/><meshStandardMaterial color="#d9c9e9" metalness={.25}/></mesh>
  </group>;
}

function GardenBed({position}:{position:[number,number,number]}) {
  return <group position={position}>
    <mesh position={[0,.1,0]}><boxGeometry args={[1.25,.2,.8]}/><meshStandardMaterial color="#776c82" roughness={.9}/></mesh>
    {[-.35,0,.35].map((x,i)=><group key={x} position={[x,.2,0]}>
      <mesh position={[0,.22,0]}><cylinderGeometry args={[.035,.045,.42,6]}/><meshStandardMaterial color="#63856c"/></mesh>
      <mesh position={[0,.45,0]}><dodecahedronGeometry args={[.19,0]}/><meshStandardMaterial color={i===1?"#c28ab8":"#75977b"}/></mesh>
    </group>)}
  </group>;
}

function World({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}) {
  const trees:[number,number,number][] = [[-6.3,0,-5.1],[-6.3,0,5.1],[6.3,0,-5.1],[6.3,0,5.1],[-5,0,-6.3],[5,0,-6.3],[-5,0,6.3],[5,0,6.3],[-7,0,0],[7,0,0],[0,0,-7],[0,0,7]];
  const gardens:[number,number,number][] = [[-2.8,0,-2.8],[2.8,0,-2.8],[-2.8,0,2.8],[2.8,0,2.8]];
  return <>
    <color attach="background" args={["#0b0a19"]}/>
    <fog attach="fog" args={["#0b0a19",20,36]}/>
    <ambientLight intensity={1.35}/>
    <directionalLight position={[7,12,8]} intensity={2.25}/>
    <pointLight position={[-5,5,-4]} color="#b58cff" intensity={13} distance={20}/>
    <pointLight position={[5,4,5]} color="#f18ed7" intensity={10} distance={18}/>
    <Stars radius={65} depth={28} count={420} factor={1.5} fade speed={.12}/>
    <Sparkles count={38} scale={[14,2.5,14]} size={1.2} speed={.1} color="#d6b8ff"/>
    <mesh position={[0,-.58,0]} receiveShadow><cylinderGeometry args={[8.5,8.8,1.15,96]}/><meshStandardMaterial color="#343047" roughness={.94}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.012,0]}><circleGeometry args={[8.42,96]}/><meshStandardMaterial color="#8b8293" roughness={.96}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.022,0]}><ringGeometry args={[5.25,5.43,96]}/><meshStandardMaterial color="#c4a9d7" roughness={.8}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.028,0]}><ringGeometry args={[1.95,2.08,64]}/><meshBasicMaterial color="#e6b6df" transparent opacity={.8} side={THREE.DoubleSide}/></mesh>
    <mesh position={[0,.16,0]}><cylinderGeometry args={[1.25,1.4,.28,32]}/><meshStandardMaterial color="#81769c" metalness={.22} roughness={.4}/></mesh>
    <mesh position={[0,.48,0]}><cylinderGeometry args={[.9,.9,.38,32]}/><meshStandardMaterial color="#b8a6d1" metalness={.25} roughness={.25}/></mesh>
    <mesh position={[0,.78,0]}><icosahedronGeometry args={[.24,1]}/><meshStandardMaterial color="#f1d7ff" emissive="#bb8cff" emissiveIntensity={.75}/></mesh>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,.04,0]}><ringGeometry args={[2.3,2.34,64]}/><meshBasicMaterial color="#bba6d5" transparent opacity={.6}/></mesh>
    {gardens.map((p,i)=><GardenBed key={i} position={p}/>)}
    {trees.map((p,i)=><Tree key={i} position={p} scale={.78+(i%3)*.1}/>)}
    {places.map((place,index)=><Building key={place.id} place={place} index={index} onSelect={onSelect} active={selectedId===place.id}/>)}
    <OrbitControls enablePan={false} minDistance={12} maxDistance={20} minPolarAngle={.58} maxPolarAngle={1.28} autoRotate autoRotateSpeed={.1} enableDamping dampingFactor={.08}/>
  </>;
}

export default function CampusScene({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}) {
  return <div className="h-full w-full">
    <Canvas camera={{position:[12,11,14],fov:34}} dpr={[1,1.2]} gl={{antialias:false,powerPreference:"high-performance"}} onCreated={({gl})=>{gl.setClearColor("#0b0a19");}}>
      <Suspense fallback={null}><World onSelect={onSelect} selectedId={selectedId}/></Suspense>
    </Canvas>
  </div>;
}
