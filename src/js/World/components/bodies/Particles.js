import {
  Mesh,
  Group,
  Vector3,
  MathUtils,
  TubeGeometry,
  LineCurve3
} from 'three';
import { hslToHex } from '../utils/colorUtils';
import { canvasTextureMaterial } from '../materials/canvasTextureMaterial';

export class Particles {
  constructor(
    width,
    depth,
    y,
    maxHeight,
    scene,
    loop,
    envMap
  ) {
    this.width = width;
    this.depth = depth;
    this.y = y;
    this.maxHeight = maxHeight;
    this.scene = scene;
    this.loop = loop;
    this.envMap = envMap;

    this.items = [];
    this.draw();
  }

  draw = () => {
    const maxNum = Math.random()*64 + 32;
    for (let i = 0; i < maxNum; i++) {
      const g = new Group();
      g.position.x = -this.width*2 + Math.random() * this.width*4;
      g.position.y = - this.y + Math.random() * (this.maxHeight + this.maxHeight/2);
      g.position.z = -this.depth*2 + Math.random() * this.depth*4;
      g.speedTranslationY = Math.random()*0.12 + 0.06;
      g.speedRotationX    = Math.random()*0.8;
      g.speedRotationY    = Math.random()*0.8;
      g.speedRotationZ    = Math.random()*0.8;
      g.maxY  = - this.y + (this.maxHeight + this.maxHeight/2);
      g.initY = - this.y;

      const startPoint = new Vector3(
        0,
        0,
        0,
      );
  
      const r = Math.random()*0.014 + 0.04;
      const p = MathUtils.degToRad(Math.random() * 360);
      const e = MathUtils.degToRad(Math.random() * 360);
  
      const endPoint = new Vector3();
      endPoint.setFromSphericalCoords(r, p, e).add(startPoint);
  
      const color = hslToHex(0.0, 0.0, 0.0);
      const material = canvasTextureMaterial({ envMap: null }, { color: color, roughness: 0.9, metalness: 0.0}, 0.00);
  
      const path = new LineCurve3(startPoint, endPoint)
      const geometry = new TubeGeometry(path, 1, 0.006, 6, false);
      const mesh = new Mesh( geometry, material );
      mesh.name = 'particle';

      g.add(mesh);

      this.items.push({
        material,
        geometry,
        mesh,
        path,
        g
      })

      this.scene.add(g);
      // this.loop.noPhysicsUpdatables.push(g);
    }
  }

  destroy = () => {
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];

      element.material.dispose();
      element.geometry.dispose();
      this.scene.remove(element.g);
      element.geometry = null;
      element.mesh = null;
      element.path = null;
      element.g = null;
    }
    this.loop.noPhysicsUpdatables = [];
  }
}