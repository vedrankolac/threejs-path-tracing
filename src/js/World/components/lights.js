import { AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three';
import GUI from 'lil-gui';

const createLights = scene => {
  const lightAmbient = new AmbientLight({ color: 0xffffff, intensity: 0.5 })
  scene.add(lightAmbient)

  const light = new DirectionalLight('white', 4);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.position.set(6, 6, 6);
  scene.add(light)

  const helper = new DirectionalLightHelper(light);
  scene.add(helper);

  const gui = new GUI();
  const ambientLightGui = {
    intensity: 1
  };
  const directionalLightGui = {
    intensity: 1
  };
  
  gui.add( ambientLightGui, 'intensity', 0, 10 ).onChange(v => lightAmbient.intensity = v);
  gui.add( directionalLightGui, 'intensity', 0, 10 ).onChange(v => light.intensity = v);
}

export { createLights };