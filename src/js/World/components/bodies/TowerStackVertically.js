import { hslToHex } from "../utils/colorUtils";
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";
import { Cube } from "./highlevel/Cube";

export class TowerStackVertically {
  constructor(
    height,
    yDownShift,
    hue,
    rectangle,
    envMap,
    physicsWorld,
    scene
  ) {
    this.height = height;
    this.yDownShift = yDownShift;
    this.hue = hue;
    this.rectangle = rectangle;
    this.envMap = envMap;
    this.physicsWorld = physicsWorld;
    this.scene = scene;

    this.cubes = [];
    this.create();
  }

  create = () => {
    const cIndex = Math.random();
    let color;

    // color = hslToHex(0, 0.0, 0.6); // black

    if (cIndex < 0.4) {
      // color = (Math.random() > 0.5) ? hslToHex(0, 0.0, 0.6) : hslToHex(this.hue, Math.random()*0.6 + 0.3, 0.4); // white or color
      this.color = (Math.random() > 0.5) ? hslToHex(0, 0.0, 0.6) : hslToHex(0, 0.0, Math.random()*0.6); // white or gray
    } else if (cIndex >= 0.40 && cIndex < 0.70) {
      this.color = hslToHex(0, 0.0, 0.0); // black
    } else if (cIndex >= 0.70 && cIndex < 1.0) {
      this.color = hslToHex(0, 0.0, Math.random()*0.6); // gray
    }

    const width = this.rectangle.width() - 0.02;
    const depth = this.rectangle.height() - 0.02;

    this.material = canvasTextureMaterial({ envMap: this.envMap }, { color: this.color, roughness: 0.9, metalness: 0});

    const nBlocks = Math.round(Math.random() * (this.height * 4) + (this.height * 4) + 12);
    const blockHeight = this.height/nBlocks;

    const blockHI = 0.5;
    const initY = -this.yDownShift + blockHeight/2*blockHI - Math.random()*(this.height/6);

    for (let i = 0; i < nBlocks; i++) {
      const cube = new Cube(
        this.material,
        {
          width,
          height: blockHeight * blockHI,
          depth
        },
        {
          x: this.rectangle.center().x,
          y: initY + i * blockHeight,
          z: this.rectangle.center().y
        },
        {
          x: 0,
          y: 0,
          z: 0
        },
        'none',
        this.physicsWorld
      );

      this.cubes.push(cube);
      this.scene.add(cube.mesh);
    }
  }

  destroy = () => {
    this.material.dispose();

    for (let i = 0; i < this.cubes.length; i++) {
      const cube = this.cubes[i];
      this.scene.remove(cube.mesh);
      cube.destroy(); 
    }
  }
}