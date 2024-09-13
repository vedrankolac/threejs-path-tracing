import { PerspectiveCamera } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
  camera.position.z = 10;
  return camera;
}

export { createCamera };