import { GLTFLoader } from "three-stdlib";
// NOTE: import MeshoptDecoder from three's own module — three-stdlib's export is
// a stub function without the .ready/.decodeGltfBuffer interface GLTFLoader needs.
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// Shared GLTF loader factory. All our .glb models are gltfpack-compressed
// (Meshopt), so every loader MUST have the Meshopt decoder set or the meshes
// come through empty/garbled. Using one factory keeps that guaranteed in every
// call site (hero / about / desk / laptop).
export function createGLTFLoader(): GLTFLoader {
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  return loader;
}
