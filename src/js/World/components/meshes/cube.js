import { BoxGeometry, Mesh } from 'three';
import { colorStandardMaterial } from '../materials/color';

const cube = () => {
  // const material = colorStandardMaterial(0x3333ff);
  // const material = colorStandardMaterial(0xaaaff);
  const material = colorStandardMaterial(0xaaddff);
  // const material = colorStandardMaterial(0xffffff);
  // const material = colorStandardMaterial(0xaaaaaa);
  // const material = colorStandardMaterial(0x666666);
  // const material = colorStandardMaterial(0x333333);
  // const material = colorStandardMaterial(0x999999);
  const geometry = new BoxGeometry();
  const mesh = new Mesh( geometry, material );
  const speed = Math.random() + 0.4;
  
  mesh.rotation.x = Math.random() * Math.PI/6;
  mesh.rotation.y = Math.random() * Math.PI/6;
  // mesh.rotation.x = Math.random() * Math.PI/8;
  // mesh.rotation.y = Math.random() * Math.PI/8;
  
  mesh.tick = (delta) => {
    mesh.rotation.x += delta * speed;
    mesh.rotation.y += delta * speed;
  };

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export { cube };