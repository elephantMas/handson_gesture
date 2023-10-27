import { Text } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React, { FC } from "react";

type Props = {
  text: string;
  position: Vector3;
  font: string;
  fontSize: number;
  color: string;
};

const TextObject: FC<Props> = ({ text, position, font, fontSize, color }) => {
  return (
    <Text position={position} font={font} fontSize={fontSize} color={color}>
      {text}
    </Text>
  );
};

export default TextObject;
