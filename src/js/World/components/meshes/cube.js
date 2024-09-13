import { BoxGeometry, Mesh } from 'three';
import { colorStandardMaterial } from '../materials/color';

const cube = () => {
  const material = colorStandardMaterial(0x3333ff);
  const geometry = new BoxGeometry();
  const mesh = new Mesh( geometry, material );
  const speed = Math.random() + 0.4;
  
  mesh.rotation.x = Math.random() * Math.PI/2;
  mesh.rotation.y = Math.random() * Math.PI/2;
  
  mesh.tick = (delta) => {
    mesh.rotation.x += delta * speed;
    mesh.rotation.y += delta * speed;
  };

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export { cube };