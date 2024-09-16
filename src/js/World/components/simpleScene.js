import { cube } from './meshes/cube.js'
import { PlaneGeometry, Mesh, MathUtils } from 'three';
import { colorStandardMaterial } from './materials/color.js';

const simpleScene = scene => {
  // comp with cubes
  const nItems = 4;
  for (let i = 0; i < nItems; i++) {
    for (let j = 0; j < nItems; j++) {
      let temp_cube = cube();
      temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
      temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5;
      temp_cube.position.z = 0;
      scene.add( temp_cube );
      // this.loop.updatables.push(temp_cube);
    }
  }

  // floor
  const geometryPlane = new PlaneGeometry(300, 300, 4, 4);
  const materialFloor = colorStandardMaterial(0xeeddff);
  const floor = new Mesh(geometryPlane, materialFloor);
  floor.receiveShadow = true;
  floor.rotation.x = MathUtils.degToRad(270);
  floor.position.y = -3;
  scene.add(floor);
}

export default simpleScene;