import * as THREE from "three";

// Takes the character scene and the Typing AnimationClip loaded from Typing.fbx.
// Returns the mixer so Scene.tsx can call mixer.update(delta) each frame.
const setAnimations = (
  character: THREE.Object3D,
  typingClip: THREE.AnimationClip
) => {
  const mixer = new THREE.AnimationMixer(character);

  // Rename clip to "Typing" in case Mixamo exported it with a different name
  typingClip.name = "Typing";

  // CRITICAL FIX: Mixamo FBX animations usually prefix bone names with "mixamorig" or "mixamorig:"
  // But Avaturn models use clean bone names like "Spine", "Head".
  // We must strip this prefix from the track names so the mixer can map them to the character.
  typingClip.tracks.forEach((track) => {
    track.name = track.name.replace(/mixamorig:?/g, "");
  });

  const typingAction = mixer.clipAction(typingClip);
  typingAction.setLoop(THREE.LoopRepeat, Infinity);
  typingAction.play();

  return { mixer };
};

export default setAnimations;
