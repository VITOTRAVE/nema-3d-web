// nema.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, model;

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('nema-canvas'), alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Luce
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // Controlli
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1.4, 0);
  controls.update();

  // Loader
  const loader = new GLTFLoader();
  loader.load('nema.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5, 1.5, 1.5);
    model.position.set(0, 0, 0);
    scene.add(model);
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();

// Chat dummy function
window.sendMessage = function () {
  const input = document.getElementById('userInput');
  const message = input.value;
  if (!message) return;
  alert("NEMA dice: 'Funzione in costruzione. Hai scritto: " + message + "'");
  input.value = '';
};

