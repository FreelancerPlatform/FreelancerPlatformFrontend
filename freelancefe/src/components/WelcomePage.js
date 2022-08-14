import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./WelcomePage.css";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      {/* <textGeometry></textGeometry> */}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <Canvas>
          <OrbitControls />
          <Stars />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          {/* <Box position={[1.2, 0, 0]} /> */}
        </Canvas>
        <div className="footer" onClick={this.props.onClick}>
          <div>
            <span className="name">FreeLaunch</span>
          </div>
          <div>
            <span className="name team">Team 3</span>
          </div>
        </div>
      </div>
    );
  }
}
// createRoot(document.getElementById("root")).render(
//   <div>
//     <Canvas>
//       <OrbitControls />
//       <Stars />
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Box position={[-1.2, 0, 0]} />
//       {/* <Box position={[1.2, 0, 0]} /> */}
//     </Canvas>
//     <div className="footer">
//       <div>
//         <span className="name">FreeLaunch</span>
//       </div>
//       <div>
//         <span className="name team">Team 3</span>
//       </div>
//     </div>
//   </div>
// );

export default WelcomePage;
