import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { cube } from './components/meshes/cube.js'
import { Resizer } from './system/Resizer.js'

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.resizer = new Resizer(this.camera, this.renderer);
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.lights = createLights(this.scene);

    this.orbitControls.reset();

    const nItems = 4;
    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let temp_cube = cube();
        temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5;
        temp_cube.position.z = 0;
        this.scene.add( temp_cube );
        this.loop.updatables.push(temp_cube);
      }
    }
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };