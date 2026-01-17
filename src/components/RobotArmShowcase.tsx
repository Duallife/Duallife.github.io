'use client';

import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

interface RobotArmShowcaseProps {
    language: 'en' | 'cn';
}

// Utility to split a single BufferGeometry into multiple disjoint parts (islands)
const splitGeometry = (geometry: THREE.BufferGeometry) => {
    const positionAttr = geometry.getAttribute('position');
    if (!positionAttr) return [];

    const vertexCount = positionAttr.count;
    const triangles = vertexCount / 3;
    const processed = new Uint8Array(triangles);
    const groups: number[][] = [];
    const posArray = positionAttr.array;
    const vertexToTriangles = new Map<string, number[]>();
    const precision = 4;

    for (let i = 0; i < triangles; i++) {
        for (let v = 0; v < 3; v++) {
            const idx = (i * 3 + v) * 3;
            const key = `${posArray[idx].toFixed(precision)},${posArray[idx + 1].toFixed(precision)},${posArray[idx + 2].toFixed(precision)}`;
            if (!vertexToTriangles.has(key)) vertexToTriangles.set(key, []);
            vertexToTriangles.get(key)!.push(i);
        }
    }

    for (let i = 0; i < triangles; i++) {
        if (processed[i]) continue;
        const group: number[] = [];
        const stack = [i];
        processed[i] = 1;

        while (stack.length > 0) {
            const triIdx = stack.pop()!;
            group.push(triIdx);
            for (let v = 0; v < 3; v++) {
                const idx = (triIdx * 3 + v) * 3;
                const key = `${posArray[idx].toFixed(precision)},${posArray[idx + 1].toFixed(precision)},${posArray[idx + 2].toFixed(precision)}`;
                const neighbors = vertexToTriangles.get(key) || [];
                for (const neighborIdx of neighbors) {
                    if (!processed[neighborIdx]) {
                        processed[neighborIdx] = 1;
                        stack.push(neighborIdx);
                    }
                }
            }
        }
        groups.push(group);
    }

    return groups.map(indices => {
        const newGeom = new THREE.BufferGeometry();
        const newPositions = new Float32Array(indices.length * 9);
        for (let i = 0; i < indices.length; i++) {
            const triIdx = indices[i];
            for (let j = 0; j < 9; j++) {
                newPositions[i * 9 + j] = posArray[triIdx * 9 + j];
            }
        }
        newGeom.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
        newGeom.computeVertexNormals();
        newGeom.computeBoundingSphere();
        const center = newGeom.boundingSphere?.center || new THREE.Vector3();
        return { geometry: newGeom, center: center.clone() };
    });
};

const Part = ({ geometry, center, explodeValue }: { geometry: THREE.BufferGeometry, center: THREE.Vector3, explodeValue: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            const direction = center.clone().normalize();
            const distance = explodeValue * 3.0;
            meshRef.current.position.set(
                direction.x * distance,
                direction.y * distance,
                direction.z * distance
            );
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} scale={0.015}>
            <meshStandardMaterial
                color="#8b5cf6"
                metalness={0.8}
                roughness={0.2}
                emissive="#2e1065"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const STLModel = ({ url, isExploded }: { url: string, isExploded: boolean }) => {
    const [error, setError] = useState(false);
    const [explodeValue, setExplodeValue] = useState(0);
    const geom = useLoader(STLLoader, url, undefined, () => setError(true));

    const parts = useMemo(() => {
        if (!geom || error) return [];
        const clonedGeom = geom.clone();
        clonedGeom.center();
        return splitGeometry(clonedGeom);
    }, [geom, error]);

    useFrame(() => {
        const target = isExploded ? 1 : 0;
        if (Math.abs(explodeValue - target) > 0.001) {
            setExplodeValue(THREE.MathUtils.lerp(explodeValue, target, 0.1));
        }
    });

    if (error) return (
        <mesh><boxGeometry args={[2, 2, 2]} /><meshStandardMaterial color="#3b82f6" wireframe /></mesh>
    );

    return (
        <group>
            {parts.map((part, i) => (
                <Part key={i} geometry={part.geometry} center={part.center} explodeValue={explodeValue} />
            ))}
        </group>
    );
};

const LoadingFallback = () => (
    <mesh><boxGeometry args={[1, 1, 1]} /><MeshDistortMaterial color="#4c1d95" speed={5} distort={0.5} /></mesh>
);

export const RobotArmShowcase: React.FC<RobotArmShowcaseProps> = ({ language }) => {
    const [isExploded, setIsExploded] = useState(false);

    const title = language === 'en' ? 'Interactive 3D Prototype' : '交互式 3D 原型';
    const subTitle = language === 'en' ? 'Low Cost 6-DOF Robot Arm' : '低成本 6 自由度机械臂';
    const instruction = language === 'en' ? 'Rotate to Explore • Scroll to Zoom' : '旋转以探索 • 滚动以缩放';
    const explodeLabel = language === 'en' ? 'Exploded View' : '爆炸视图';

    return (
        <section className="w-full py-20 bg-black-100 flex flex-col items-center">
            <div className="max-w-7xl w-full px-5 flex flex-col items-center">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-purple text-base font-bold">{subTitle}</p>
                </div>

                <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-b from-black-100 to-deepPurple/20 rounded-3xl border border-white/[0.1] relative overflow-hidden">
                    <Canvas shadows dpr={[1, 2]}>
                        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />

                        <Suspense fallback={<LoadingFallback />}>
                            <Float speed={isExploded ? 0 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <STLModel url="/robot-arm.stl" isExploded={isExploded} />
                            </Float>
                        </Suspense>

                        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                        <Environment preset="city" />
                        <OrbitControls enableZoom={true} enablePan={false} minDistance={5} maxDistance={25} makeDefault />
                    </Canvas>

                    <div className="absolute top-6 right-6 z-20">
                        <button
                            onClick={() => setIsExploded(!isExploded)}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${isExploded
                                ? 'bg-purple border-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                                : 'bg-black/40 border-white/10 text-slate-300 hover:border-white/30'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isExploded ? 'bg-white animate-pulse' : 'bg-slate-500'}`} />
                            <span className="text-sm font-medium">{explodeLabel}</span>
                        </button>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                        <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 text-[10px] md:text-xs text-slate-400 uppercase tracking-widest">
                            {instruction}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RobotArmShowcase;
