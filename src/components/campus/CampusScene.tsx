"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

export type CampusPlace = { id:string; name:string; subtitle:string; color:string; position:[number,number,number]; route:string };
const places:CampusPlace[]=[
{id:"academy",name:"Main Academy",subtitle:"Your learning overview",color:"#e9a2e8",position:[-3.8,.04,0],route:"/academy"},
{id:"library",name:"Grand Library",subtitle:"Books, notes & discoveries",color:"#9b8cff",position:[0,.04,-3.8],route:"/library"},
{id:"lecture",name:"Lecture Theatre",subtitle:"Live and recorded classes",color:"#79dce7",position:[3.8,.04,0],route:"/classes"},
{id:"exam",name:"Examination Hall",subtitle:"Quizzes and mock tests",color:"#f2bd87",position:[0,.04,3.8],route:"/exams"}
];
function Tree({position,scale=1}:{position:[number,number,number];scale?:number}){
return <group position={position} scale={scale}>
<mesh position={[0,.48,0]}><cylinderGeometry args={[.09,.14,.95,7]}/><meshStandardMaterial color="#71543f"/></mesh>
<mesh position={[0,1.12,0]} castShadow><sphereGeometry args={[.58,8,7]}/><meshStandardMaterial color="#456b69" roughness={.92}/></mesh>
<mesh position={[.18,1.48,0]}><sphereGeometry args={[.38,7,6]}/><meshStandardMaterial color="#668b79" roughness={.9}/></mesh>
</group>;
}
function Window({position}:{position:[number,number,number]}){
return <mesh position={position}><boxGeometry args={[.28,.48,.055]}/><meshStandardMaterial color="#bce8ed" emissive="#79cbd8" emissiveIntensity={.32} metalness={.15} roughness={.24}/></mesh>;
}
function Building({place,onSelect,active,index}:{place:CampusPlace;onSelect:(place:CampusPlace)=>void;active:boolean;index:number}){
const width=index===1?2.15:2.35;
const height=index===2?1.65:2.05;
return <group position={place.position} onClick={event=>{event.stopPropagation();onSelect(place);}}>
<mesh position={[0,height/2,0]} castShadow receiveShadow><boxGeometry args={[width,height,1.85]}/><meshStandardMaterial color={active?"#eee5ff":"#d4cce5"} roughness={.55} metalness={.08}/></mesh>
<mesh position={[0,height+.08,0]} castShadow><boxGeometry args={[width+.24,.16,2.02]}/><meshStandardMaterial color={place.color} roughness={.38} metalness={.25} emissive={place.color} emissiveIntensity={active?.24:.08}/></mesh>
<mesh position={[0,height+.34,0]} castShadow><boxGeometry args={[width*.7,.42,1.45]}/><meshStandardMaterial color={index===1?"#665c84":"#7d7197"} roughness={.45}/></mesh>
<mesh position={[0,height+.58,0]}><coneGeometry args={[.9,.42,4]}/><meshStandardMaterial color={place.color} roughness={.42} metalness={.18}/></mesh>
{[-.78,-.26,.26,.78].map(x=><Window key={x} position={[x,.98,.955]}/>)}
{[-.78,-.26,.26,.78].map(x=><Window key={x} position={[x,1.58,.955]}/>)}
<mesh position={[0,.55,.96]}><boxGeometry args={[.48,1.08,.08]}/><meshStandardMaterial color="#493e65"/></mesh>
<mesh position={[0,.1,1.16]}><boxGeometry args={[1.15,.2,.58]}/><meshStandardMaterial color="#b9afc9"/></mesh>
<mesh position={[0,.22,1.04]}><boxGeometry args={[.85,.16,.28]}/><meshStandardMaterial color="#e9dfef"/></mesh>
<mesh position={[0,.055,0]}><boxGeometry args={[width+.5,.11,2.35]}/><meshStandardMaterial color={active?place.color:"#8e83a9"} emissive={place.color} emissiveIntensity={active?.25:.04}/></mesh>
</group>;
}
function World({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}){
const trees:[number,number,number][]=[[-6.2,0,-4.8],[-6.2,0,4.8],[6.2,0,-4.8],[6.2,0,4.8],[-4.8,0,-6.2],[4.8,0,-6.2],[-4.8,0,6.2],[4.8,0,6.2],[-7,0,0],[7,0,0],[0,0,-7],[0,0,7]];
return <>
<color attach="background" args={["#0b0a19"]}/><fog attach="fog" args={["#0b0a19",19,34]}/>
<ambientLight intensity={1.25}/><directionalLight position={[6,12,7]} intensity={2.4}/><pointLight position={[-5,5,-4]} color="#b58cff" intensity={16} distance={20}/><pointLight position={[5,4,5]} color="#f18ed7" intensity={12} distance={18}/>
<Stars radius={65} depth={28} count={450} factor={1.6} fade speed={.15}/><Sparkles count={45} scale={[14,2.5,14]} size={1.3} speed={.12} color="#d6b8ff"/>
<mesh position={[0,-.58,0]} receiveShadow><cylinderGeometry args={[8.4,8.8,1.15,96]}/><meshStandardMaterial color="#333047" roughness={.92}/></mesh>
<mesh rotation={[-Math.PI/2,0,0]} position={[0,.012,0]}><circleGeometry args={[8.35,96]}/><meshStandardMaterial color="#777184" roughness={.95}/></mesh>
<mesh rotation={[-Math.PI/2,0,0]} position={[0,.025,0]}><ringGeometry args={[5.2,5.42,96]}/><meshStandardMaterial color="#c0a8d6" roughness={.8}/></mesh>
<mesh rotation={[-Math.PI/2,0,0]} position={[0,.035,0]}><ringGeometry args={[2.05,2.2,64]}/><meshBasicMaterial color="#e2b5df" transparent opacity={.75} side={THREE.DoubleSide}/></mesh>
<mesh position={[0,.16,0]}><cylinderGeometry args={[1.25,1.4,.28,32]}/><meshStandardMaterial color="#81769c" metalness={.22} roughness={.4}/></mesh>
<mesh position={[0,.48,0]}><cylinderGeometry args={[.9,.9,.38,32]}/><meshStandardMaterial color="#b8a6d1" metalness={.25} roughness={.25}/></mesh>
<mesh position={[0,.78,0]}><sphereGeometry args={[.22,16,12]}/><meshStandardMaterial color="#f1d7ff" emissive="#bb8cff" emissiveIntensity={.7}/></mesh>
{trees.map((position,i)=><Tree key={i} position={position} scale={.78+(i%3)*.1}/>)}
{places.map((place,index)=><Building key={place.id} place={place} index={index} onSelect={onSelect} active={selectedId===place.id}/>)}
<OrbitControls enablePan={false} minDistance={12} maxDistance={20} minPolarAngle={.58} maxPolarAngle={1.28} autoRotate autoRotateSpeed={.12}/>
</>;
}
export default function CampusScene({onSelect,selectedId}:{onSelect:(place:CampusPlace)=>void;selectedId:string|null}){
return <div className="h-full w-full"><Canvas camera={{position:[12,11,14],fov:34}} dpr={[1,1.2]} gl={{antialias:false,powerPreference:"high-performance"}}><Suspense fallback={null}><World onSelect={onSelect} selectedId={selectedId}/></Suspense></Canvas></div>;
}
