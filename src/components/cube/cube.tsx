import { useFrame, Vector3 } from "@react-three/fiber";
import { FC, useRef } from "react";
import type { Mesh } from "three";

import json from "./../../apis/gesture.json";

type Props = {
  position: Vector3;
  size: Vector3;
  color: string;
};

const Cube: FC<Props> = ({ position, size, color }) => {
  const cubeRef = useRef<Mesh>(null);

  useFrame(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    switch (json.value) {
      case "Right":
        cube.rotation.y += 0.01;
        break;
    }
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

export default Cube;
