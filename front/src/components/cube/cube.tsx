import { useFrame, Vector3 } from "@react-three/fiber";
import * as mqtt from "mqtt";
import { FC, useRef } from "react";
import type { Mesh } from "three";

type Props = {
  position: Vector3;
  size: Vector3;
  color: string;
};

const Cube: FC<Props> = ({ position, size, color }) => {
  const cubeRef = useRef<Mesh>(null);

  const sub = mqtt.connect("wss://test.mosquitto.org:1883");
  const topic = "/gesture";
  sub.subscribe(topic);

  useFrame(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    sub.on("message", function (topic, message) {
      console.log("gesture type: " + message.toString());
      switch (message.toString()) {
        case "None":
          break;
        case "Right":
          cube.rotation.y += 0.01;
          break;
        case "Left":
          cube.rotation.y -= 0.01;
          break;
        case "Up":
          cube.rotation.x += 0.01;
          break;
        case "Down":
          cube.rotation.x -= 0.01;
          break;
      }
    });
  });

  return (
    <mesh ref={cubeRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

export default Cube;
