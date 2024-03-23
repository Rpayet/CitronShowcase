import { Canvas } from "@react-three/fiber";

export default function WheelFiber() {

    return (
        <Canvas>
            <directionalLight position={[0, 0, 5]} intensity={1} />
            <ambientLight intensity={0.5} />
            <mesh>
                <cylinderGeometry attach="geometry" args={[1, 1, 1, 32]} />
            </mesh>
        </Canvas>
    )
}