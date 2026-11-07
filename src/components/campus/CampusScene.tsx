"use client";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export type CampusPlace = { id:string; name:string; subtitle:string; color:string; position:[number,number,number]; route:string };
const places:CampusPlace[]=[
{id:"academy",name:"Main Academy",subtitle:"Your learning overview",color:"#e9a2e8",position:[-3.7,.45,0],route:"/academy"},
{id:"library",name:"Grand Library",subtitle:"Books, notes & discoveries",color:"#9b8cff",position:[0,.45,-3.3],route:"/library"},
{id:"lecture",name:"Lecture Theatre",subtitle:"Live and recorded classes",color:"#79dce7",position:[3.7,.45,0],route:"/classes"},
{id:"exam",name:"Examination Hall",subtitle:"Quizzes and mock tests",color:"#f2bd87",position:[0,.45,3.3],route:"/exams"}
];
function Tree({position,scale=1}:{position:[number,number,number];scale?:number}){
return <group position={position} scale={scale}><mesh position={[0,.35,0]} castShadow><cylinderGeometry args={[.07,.11,.7,7]}/><meshStandardMaterial color="#604b70"/></mesh><mesh position={[0,.9,0]} castShadow><coneGeometry args={[.48,.95,7]}/><meshStandardMaterial color="#536f76" roughness={.85}/></mesh><mesh position={[0,1.35,0]} castShadow><coneGeometry args={[.32,.72,7]}/><meshStandardMaterial color="#7e789d" roughness={.8}/></mesh></group>;
}
function Building({place,onSelect,active}:{place:CampusPlace;onSelect:(place:CampusPlace)=>void;active:boolean}){
return <Float speed={1.1} rotationIntensity={.025} floatIntensity={.08}><group position={place.position} onClick={event=>{event.stopPropagation();onSelect(place);}}>
<mesh position={[0,.52,0]} castShadow receiveShadow><cylinderGeometry args={[.92,1.12,1.05,8]}/><meshStandardMaterial color={active?"#f2d9ff":"#c3b6df"} metalness={.34} roughness={.32}/></mesh>
<mesh position={[0,1.2,0]} castShadow><coneGeometry args={[.78,.8,8]}/><meshStandardMaterial color={place.color} emissive={place.color} emissiveIntensity={active ? .55 : .2} metalness={.24} roughness={.28}/></mesh>
<mesh position={[0,.48,.57]}><boxGeometry args={[.24,.48,.04]}/><meshStandardMaterial color="#24213b"/></mesh>
{[-.48,-.16,.16,.48].map(x=><mesh key={x} position={[x,.72,.61]}><boxGeometry args={[.1,.16,.025]}/><meshBasicMaterial color="#ffe8b2"/></mesh>)}
<mesh position={[0,1.65,0]}><sphereGeometry args={[.13,16,16]}/><meshBasicMaterial color={place.color}/></mesh>
<mesh position={[0,.04,0]}><cylinderGeometry args={[1.3,1.3,.12,32]}/><meshStandardMaterial color={active?place.color:"#6c5d92"} emissive={place.color} emissiveIntensity={active ? .3 : .06}/></mesh>
</group></Float>;
}
function World({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}){
const trees:[number,number,number][]=[[-6,0,-4],[-6,0,4],[6,0,-4],[6,0,4],[-4,0,-6],[4,0,-6],[-4,0,6],[4,0,6],[-7,0,0],[7,0,0],[0,0,-7],[0,0,7]];
return <>
<color attach="background" args={["#0b0920"]}/><fog attach="fog" args={["#0b0920",16,36]}/>
<ambientLight intensity={1.15}/><directionalLight position={[5,9,6]} intensity={2.3} castShadow/><pointLight position={[-5,4,-4]} color="#b58cff" intensity={24} distance={18}/><pointLight position={[5,3,4]} color="#f18ed7" intensity={18} distance={14}/>
<Stars radius={70} depth={30} count={650} factor={1.8} fade speed={.25}/><Sparkles count={55} scale={[14,3,14]} size={1.5} speed={.15} color="#d6b8ff"/>
<mesh position={[0,-.55,0]} receiveShadow><cylinderGeometry args={[8.2,8.7,1.15,96]}/><meshStandardMaterial color="#292447" roughness={.8} metalness={.12}/></mesh>
<mesh rotation={[-Math.PI/2,0,0]} position={[0,.035,0]}><ringGeometry args={[5.1,5.22,96]}/><meshBasicMaterial color="#b58cff" transparent opacity={.72} side={THREE.DoubleSide}/></mesh>
{[0,1,2].map(i=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,.045+i*.002,0]}><ringGeometry args={[2.5+i*.65,2.53+i*.65,96]}/><meshBasicMaterial color={i===1?"#e9a2e8":"#8e83c8"} transparent opacity={.35}/></mesh>)}
<mesh position={[0,.04,0]}><cylinderGeometry args={[2,2.3,.18,48]}/><meshStandardMaterial color="#65548d" metalness={.35} roughness={.42}/></mesh>
<Float speed={.7} floatIntensity={.12}><mesh position={[0,1.25,0]}><icosahedronGeometry args={[.78,2]}/><meshStandardMaterial color="#d9c1ff" emissive="#a77cff" emissiveIntensity={1.1} roughness={.2} metalness={.45}/></mesh></Float>
{trees.map((position,i)=><Tree key={i} position={position} scale={.75+(i%3)*.12}/>)}
{places.map(place=><Building key={place.id} place={place} onSelect={onSelect} active={selectedId===place.id}/>)}
<OrbitControls enablePan={false} minDistance={10} maxDistance={21} minPolarAngle={.55} maxPolarAngle={1.35} autoRotate autoRotateSpeed={.22}/>
</>;
}
export default function CampusScene({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}){
return <div className="h-full w-full"><Canvas camera={{position:[11,10,13],fov:36}} dpr={[1,1.25]} gl={{antialias:false,powerPreference:"high-performance"}}><Suspense fallback={null}><World onSelect={onSelect} selectedId={selectedId}/></Suspense></Canvas></div>;
}
