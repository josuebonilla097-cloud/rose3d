
// rose.js
// Muestra un modelo 3D realista de una rosa usando Three.js y GLTFLoader

const canvas = document.getElementById('rose-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight * 0.8), 0.1, 100);
camera.position.set(0, 2, 8);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xf8bbd0, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Suelo (tierra)
const soilGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
const soilMaterial = new THREE.MeshPhongMaterial({ color: 0x8d6e63 });
const soil = new THREE.Mesh(soilGeometry, soilMaterial);
soil.position.y = -1.2;
scene.add(soil);

// Cargar el modelo 3D de la rosa
const loaderScript = document.createElement('script');
loaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.154.0/examples/js/loaders/GLTFLoader.js';
document.body.appendChild(loaderScript);

loaderScript.onload = () => {
  const loader = new THREE.GLTFLoader();
  loader.load('rose.glb', function (gltf) {
    const rose = gltf.scene;
    rose.position.set(0, 0.2, 0);
    rose.scale.set(2, 2, 2); // Ajusta el tamaño según el modelo
    scene.add(rose);

    // Animación de crecimiento
    let growStep = 0;
    function animate() {
      requestAnimationFrame(animate);
      growStep += 0.012;
      // Animar la escala de la rosa para simular crecimiento
      const scale = Math.min(growStep * 0.7, 1);
      rose.scale.set(2 * scale, 2 * scale, 2 * scale);
      renderer.render(scene, camera);
    }
    animate();
  }, undefined, function (error) {
    console.error('Error al cargar el modelo:', error);
  });
};

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
  camera.aspect = window.innerWidth / (window.innerHeight * 0.8);
  camera.updateProjectionMatrix();
});
