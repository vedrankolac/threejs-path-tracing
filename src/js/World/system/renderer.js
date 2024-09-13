import { WebGLRenderer, sRGBEncoding, ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true });
  // renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  // renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping    = ACESFilmicToneMapping;
  document.body.appendChild( renderer.domElement );

  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = PCFSoftShadowMap;

  // renderer.xr.enabled = true;
  // document.body.appendChild( VRButton.createButton( renderer ) );

  return renderer;
}

export { createRenderer };