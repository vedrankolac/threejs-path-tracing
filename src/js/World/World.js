import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { Resizer } from './system/Resizer.js'
import simpleScene from './components/simpleScene.js';

class World {
  constructor() {
    console.log('World');
    this.scene = createScene();
    this.renderer = createRenderer();
    this.camera = createCamera();
    this.resizer = new Resizer(this.camera, this.renderer);
    this.lights = createLights(this.scene);
    simpleScene(this.scene);

    // call setLoop with a delay so we have a scene prepared for pathtracer
    this.intID = setInterval(this.setLoop, 500);
  }

  setLoop = () => {
    clearInterval(this.intID);
    this.intID = null;

    // path tracer needs to be defined after the scene has been created (in loop)
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.loop.start();

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControls.addEventListener( 'change', () => this.loop.pathTracer.updateCamera() );
    this.orbitControls.update();
  }

  start() {
    // this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };