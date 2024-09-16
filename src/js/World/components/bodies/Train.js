import { hslToHex } from "../utils/colorUtils";
import { canvasTextureMaterial } from "../materials/canvasTextureMaterial";
import { Cube } from "./highlevel/Cube";
import { TrainWindows } from "../canvasMaps/TrainWindows";

export class Train {
  constructor(
    roadWidth,
    xPos,
    zPos,
    yBase,
    orientation,
    hue,
    scene,
    loop,
    physicsWorld,
    envMap
  ) {
    this.roadWidth = roadWidth;
    this.xPos = xPos;
    this.zPos = zPos;
    this.yBase = yBase;
    this.orientation = orientation;
    this.hue = hue;
    this.scene = scene;
    this.loop = loop;
    this.physicsWorld = physicsWorld;
    this.envMap = envMap;

    this.makeTrack();
    this.makeTrains();
  }

  makeTrack = () => {
    const roadColor = hslToHex(0, 0.0, Math.random()*0.1 + 0.0);
    this.roadMaterial = canvasTextureMaterial({ envMap: this.envMap }, { color: roadColor, roughness: 0.9, metalness: 0.0});

    const roadWidth = this.roadWidth + 0.02;
    const roadHeight = 0.01;
    const roadLength = Math.random() * 1 + 3;

    let size;
    let translation;
    const rotation = {
      x: 0,
      y: 0,
      z: 0
    };

    if (this.orientation === 'z') {
      size = {
        width:  roadWidth,
        height: roadHeight,
        depth:  roadLength
      }
      translation = {
        x: this.xPos,
        y: -this.yBase,
        z: 0
      }
    } else if (this.orientation === 'x') {
      size = {
        width:  roadLength,
        height: roadHeight,
        depth:  roadWidth
      }
      translation = {
        x: this.xPos,
        y: -this.yBase,
        z: this.zPos
      }
    }

    this.road = new Cube(
      this.roadMaterial,
      size,
      translation,
      rotation,
      'none',
      this.physicsWorld
    );
    this.scene.add(this.road.mesh);
    // this.loop.bodies.push(road);
  }

  makeTrains = () => {
    const trainColor = hslToHex(0, 0.0, Math.random()*0.1 + 0.0); // gray
    const windowsColor = hslToHex(this.hue, 0.1, 0.00);
    this.maps = new TrainWindows(trainColor, windowsColor);
    // const maps = null;

    let trainName;
    if (this.orientation === 'z') {
      trainName = 'trainZ';
    } else if (this.orientation === 'x') {
      trainName = 'trainX';
    }

    this.trainMaterial;

    if (this.orientation === 'z') {
      this.trainMaterial = [
        canvasTextureMaterial({ ...this.maps, envMap: this.envMap }, { color: null, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ ...this.maps, envMap: this.envMap }, { color: null, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02})
      ];
    } else if (this.orientation === 'x') {
      this.trainMaterial = [
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ envMap: this.envMap }, { color: trainColor, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ ...this.maps, envMap: this.envMap }, { color: null, roughness: 0.6, metalness: 0.02}),
        canvasTextureMaterial({ ...this.maps, envMap: this.envMap }, { color: null, roughness: 0.6, metalness: 0.02})
      ];
    }

    const trainWidth = 0.06;
    const trainHeight = 0.08;
    const trainLength = 0.56;

    let size;
    let translation;
    const rotation = {
      x: 0,
      y: 0,
      z: 0
    };

    // -- A

    if (this.orientation === 'z') {
      size = {
        width:  trainWidth,
        height: trainHeight,
        depth:  trainLength
      }
      translation = {
        x: this.xPos - trainWidth/2 - 0.01,
        y: -this.yBase + trainHeight/2 + 0.02,
        z: Math.random() * 30 - 15
      }
    } else if (this.orientation === 'x') {
      size = {
        width:  trainLength,
        height: trainHeight,
        depth:  trainWidth
      }
      translation = {
        x: Math.random() * 30 - 15,
        y: -this.yBase + trainHeight/2 + 0.02,
        z: this.zPos - trainWidth/2 - 0.01
      }
    }

    this.trainA = new Cube(
      this.trainMaterial,
      size,
      translation,
      rotation,
      'dynamic',
      this.physicsWorld,
      trainName
    );
    this.scene.add(this.trainA.mesh);
    // this.loop.bodies.push(this.trainA);

    // -- B

    if (this.orientation === 'z') {
      size = {
        width:  trainWidth,
        height: trainHeight,
        depth:  trainLength
      }
      translation = {
        x: this.xPos + trainWidth/2 + 0.01,
        y: -this.yBase + trainHeight/2 + 0.02,
        z: Math.random() * 30 - 15
      }
    } else if (this.orientation === 'x') {
      size = {
        width:  trainLength,
        height: trainHeight,
        depth:  trainWidth
      }
      translation = {
        x: Math.random() * 30 - 15,
        y: -this.yBase + trainHeight/2 + 0.02,
        z: this.zPos + trainWidth/2 + 0.01,
      }
    }

    this.trainB = new Cube(
      this.trainMaterial,
      size,
      translation,
      rotation,
      'dynamic',
      this.physicsWorld,
      trainName
    );
    this.scene.add(this.trainB.mesh);
    // this.loop.bodies.push(this.trainB);

    // -- velocity

    const velocityA = Math.random() * 6 + 8;
    const velocityB = Math.random() * 6 + 8;

    // if (this.orientation === 'z') {
    //   this.trainB.rigidBody.setLinvel({
    //     x: 0,
    //     y: 0,
    //     z: velocityA * ((Math.random() > 0.5) ? 1 : -1)
    //   }, true);
    //   this.trainA.rigidBody.setLinvel({
    //     x: 0,
    //     y: 0,
    //     z: velocityB * ((Math.random() > 0.5) ? 1 : -1)
    //   }, true);
    // } else if (this.orientation === 'x') {
    //   this.trainB.rigidBody.setLinvel({
    //     x: velocityA * ((Math.random() > 0.5) ? 1 : -1),
    //     y: 0,
    //     z: 0
    //   }, true);
    //   this.trainA.rigidBody.setLinvel({
    //     x: velocityB * ((Math.random() > 0.5) ? 1 : -1),
    //     y: 0,
    //     z: 0
    //   }, true);
    // }
  }

  destroy = () => {
    // road
    this.roadMaterial.dispose();
    this.scene.remove(this.road.mesh);
    this.road.destroy();

    // trains
    this.maps.colorMap.dispose();

    for (let i = 0; i < this.trainMaterial.length; i++) {
      const material = this.trainMaterial[i];
      material.dispose(); 
    }
    this.loop.bodies = [];
    this.scene.remove(this.trainA.mesh);
    this.scene.remove(this.trainB.mesh);

    this.trainA.destroy();
    this.trainB.destroy();
  }
}