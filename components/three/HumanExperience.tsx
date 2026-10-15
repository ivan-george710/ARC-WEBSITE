"use client";
import { Canvas } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Component, type ReactNode, useMemo } from "react";
type Part = {
    position: [
        number,
        number,
        number
    ];
    scale: [
        number,
        number,
        number
    ];
    joint?: number;
};
const parts: Part[] = [
    { position: [0, 1.62, 0], scale: [.25, .33, .24] },
    { position: [0, .74, 0], scale: [.56, .74, .28], joint: 2 },
    { position: [0, -.07, 0], scale: [.43, .35, .29] },
    { position: [-.69, .73, 0], scale: [.17, .55, .18], joint: 0 },
    { position: [.69, .73, 0], scale: [.17, .55, .18], joint: 0 },
    { position: [-.83, -.12, .07], scale: [.13, .43, .14] },
    { position: [.83, -.12, .07], scale: [.13, .43, .14] },
    { position: [-.26, -.88, 0], scale: [.22, .65, .24], joint: 3 },
    { position: [.26, -.88, 0], scale: [.22, .65, .24], joint: 3 },
    { position: [-.28, -1.91, 0], scale: [.15, .51, .17], joint: 1 },
    { position: [.28, -1.91, 0], scale: [.15, .51, .17], joint: 1 },
    { position: [-.28, -2.4, .12], scale: [.16, .12, .3] },
    { position: [.28, -2.4, .12], scale: [.16, .12, .3] },
];
class WebGLBoundary extends Component<{
    children: ReactNode;
    fallback: ReactNode;
}, {
    failed: boolean;
}> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function HumanExperience({ active }: {
    active: number;
}) {
    const points = useMemo(() => Array.from({ length: 100 }, (_, i): [
        number,
        number,
        number
    ] => {
        const a = i / 99 * Math.PI * 2;
        return [Math.cos(a) * 1.55, Math.sin(a) * .5 - .1, Math.sin(a) * .9];
    }), []);
    return <WebGLBoundary fallback={<div className="body-fallback" aria-label="Abstract human silhouette"/>}><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }} fallback={<div className="body-fallback"/>}><ambientLight intensity={.7}/><directionalLight position={[-3, 4, 3]} intensity={4} color="#bbc7cf"/><directionalLight position={[3, 0, -2]} intensity={3} color="#c7823a"/><group position={[0, .2, 0]} rotation={[0, -.2 + active * .12, 0]}>{parts.map((part, i) => <mesh key={i} position={part.position} scale={part.scale}><sphereGeometry args={[1, 40, 32]}/><meshStandardMaterial color={part.joint === active ? "#796044" : "#343d42"} metalness={.8} roughness={.3} emissive={part.joint === active ? "#b4793a" : "#000"} emissiveIntensity={.14}/></mesh>)}<Line points={points} color="#b7bfc0" lineWidth={.7}/></group></Canvas></WebGLBoundary>;
}
