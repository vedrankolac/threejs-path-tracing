import { Scene, Color, Fog, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GradientEquirectTexture } from '../textures/GradientEquirectTexture';


const createScene = () => {
  const scene = new Scene();
  // scene.background = new Color( 0xcccccc );
  
  // const fog = new Fog( 0x222222, 0, 60 );
  // scene.fog = fog;
  
  // const pmremGenerator = new PMREMGenerator(renderer);
  // scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.001 ).texture;

  const texture = new GradientEquirectTexture();
  texture.bottomColor.set( 0xeeddff );
  texture.bottomColor.set( 0xeeddff );
  texture.update();
  scene.environment = texture;
  scene.background = texture;

  return scene;
}

export { createScene };