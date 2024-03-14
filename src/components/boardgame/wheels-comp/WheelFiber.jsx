import { Canvas } from '@react-three/fiber';
import { Cylinder, OrbitControls, AmbientLight, PointLight } from '@react-three/drei';

export default function WheelFiber() {

    return (
        <Canvas>
            <AmbientLight intensity={0.5} />
            <PointLight position={[10, 10, 10]} />
            <OrbitControls />
            {/* args=[radiusTop, radiusBottom, height, radialSegments] */}
            <Cylinder args={[5, 5, 5, 8]} position={[0, 0, 0]} />
        </Canvas>
    )
}