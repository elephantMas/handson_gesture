import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";

import Cube from "@/components/cube/cube";
import TextObject from "@/components/textObject/textObject";

import styles from "../styles/home.module.css";

const DisplayCube: NextPage = () => {
  return (
    <div className={styles.fullscreen}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 10],
        }}
      >
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ambientLight args={[0xffffff]} intensity={0.2} />
        <TextObject
          text="CPS Handson"
          position={[0, 0, -3]}
          font={
            "https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          }
          fontSize={1.5}
          color={"black"}
        ></TextObject>
        <OrbitControls />
        <Cube position={[-5, 0, 0]} size={[2, 2, 2]} color="aqua" />
        <Cube
          position={[-0.5, 0, 0]}
          size={[1.5, 1.5, 1.5]}
          color="lightyellow"
        />
        <Cube position={[5, 0, 0]} size={[3, 3, 3]} color="lightgreen" />
      </Canvas>
    </div>
  );
};

export default DisplayCube;
