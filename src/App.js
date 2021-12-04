import React, { useRef, useState } from "react";
import "./App.scss";
import { Canvas, useFrame } from "react-three-fiber";
import {
  MeshWobbleMaterial,
  OrbitControls,
  softShadows,
} from "@react-three/drei";

import { useSpring, a } from "@react-spring/three";

softShadows();
const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //
  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial attach="material" color={!expand ? color : `red`} />
    </a.mesh>
  );
};
function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          {/* This mesh is the plane (The floor) */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            color="lightblue"
            args={[3, 2, 1]}
            speed={2}
          />
          <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="pink" speed={6} />
        </group>
        {/* <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -1, 0]}
          opacity={0.75}
          width={10}
          height={10}
          blur={2.6}
          far={2}
          args={[10, 10, 10]}
        /> */}

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
