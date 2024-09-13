import { Clock } from 'three';
import { WebGLPathTracer } from 'three-gpu-pathtracer';
import { getScaledSettings } from '../textures/getScaledSettings';

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.clock = new Clock();

    const settings = getScaledSettings();
    this.pathTracer = new WebGLPathTracer( this.renderer );
    this.pathTracer.renderScale = settings.renderScale;
    this.pathTracer.tiles.setScalar( settings.tiles );
    this.pathTracer.setScene( this.scene, this.camera );
    this.pathTracer.renderSample();
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      // this.renderer.render(this.scene, this.camera);
      this.pathTracer.renderSample();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = this.clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
