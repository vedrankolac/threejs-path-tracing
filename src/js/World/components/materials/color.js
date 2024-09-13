import {MeshStandardMaterial} from 'three';

const colorStandardMaterial = color => {
  const parameters = {
    color: color,
    roughness: 0.99,
    metalness: 0.6
  } 
  const material = new MeshStandardMaterial(parameters);
  return material;
}

export { colorStandardMaterial };