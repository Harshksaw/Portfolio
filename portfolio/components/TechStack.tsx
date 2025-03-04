"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Billboard, Text, Image } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Define the tech stack logos
const techStack = [
  { name: "Next.js", logo: "/nextjs.svg" },
  { name: "React", logo: "/react-icon.svg" },
  { name: "Node.js", logo: "/nodejs.svg" },
  { name: "AWS", logo: "/aws.png" },
  { name: "PostgreSQL", logo: "/postgres.svg" },
  { name: "TailwindCSS", logo: "/tailwindcss.svg" },
  { name: "GraphQL", logo: "/graphql.png" },
  { name: "Docker", logo: "/docker.svg" },
  { name: "TypeScript", logo: "/typescript-48.png" },
  { name: "Python", logo: "/python-188.png" },
  { name: "MongoDB", logo: "/mongodb.svg" },
  { name: "NestJs", logo: "/nestjs.svg" },
  { name: "Kubernetes", logo: "/kubernetes-144.png" },
  { name: "Grafana", logo: "/grafana.svg" },
];

// Function to position logos in 3D space
const getSpherePosition = (index: number, total: number) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  return [Math.cos(theta) * Math.sin(phi) * 2, Math.sin(theta) * Math.sin(phi) * 2, Math.cos(phi) * 2];
};

const RotatingGlobe = () => {
  const globeRef = useRef<any>();

  // Rotate the globe continuously
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={globeRef}>
      {techStack.map((tech, index) => {
        const [x, y, z] = getSpherePosition(index, techStack.length);
        return (
          <Billboard key={tech.name} position={[x, y, z]}>
            <Image url={tech.logo} scale={[0.4, 0.4]}  transparent />
            <Text position={[0, -0.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
              {tech.name}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
};

const TechStack = () => {
  return (
    <div className="h-96 w-full flex justify-center items-center bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingGlobe />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default TechStack;
