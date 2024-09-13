import {MeshPhysicalMaterial} from 'three';

const colorStandardMaterial = color => {
  const parameters = {
    color: color,
    roughness: 0.0,
    metalness: 0.0
  } 
  const material = new MeshPhysicalMaterial(parameters);
  return material;
}

export { colorStandardMaterial };