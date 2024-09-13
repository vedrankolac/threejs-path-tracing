import {MeshStandardMaterial} from 'three';

const colorStandardMaterial = color => {
  const parameters = {
    color: color,
    roughness: 0.25,
    metalness: 0.25
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export { colorStandardMaterial };