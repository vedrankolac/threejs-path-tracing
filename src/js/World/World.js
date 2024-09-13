import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { cube } from './components/meshes/cube.js'
import { Resizer } from './system/Resizer.js'
import { PlaneGeometry, Mesh, MathUtils } from 'three';
import { colorStandardMaterial } from './components/materials/color.js';

class World {
  constructor() {
    console.log('World');
    this.scene = createScene();
    this.renderer = createRenderer();
    this.camera = createCamera();
    this.resizer = new Resizer(this.camera, this.renderer);
    this.lights = createLights(this.scene);

    // comp with cubes
    const nItems = 4;
    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let temp_cube = cube();
        temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5;
        temp_cube.position.z = 0;
        this.scene.add( temp_cube );
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
    this.scene.add(floor);

    // path tracer needs to be defined after the scene has been created (in loop)
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls.addEventListener( 'change', () => this.loop.pathTracer.updateCamera() );
    this.orbitControls.update();
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };