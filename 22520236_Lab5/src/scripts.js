import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
orbit.update();

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Create a background with student ID text on canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set background color and text style
context.fillStyle = '#87CEEB';  // Set background color (light sky blue)
context.fillRect(0, 0, canvas.width, canvas.height);

// Set text properties
context.font = '60px Arial';  // Set font size
context.fillStyle = '#FFFFFF'; // White text color
context.textAlign = 'center';
context.textBaseline = 'middle';

// First text line: "Vẽ vật thể trong không gian 3 chiều"
context.fillText('Vẽ vật thể trong không gian 3 chiều', canvas.width / 2, canvas.height / 3); // Adjusted position for the first line

// Second text line: "22520236 - Trần Quang Đạt"
context.fillText('22520236 - Trần Quang Đạt', canvas.width / 2, canvas.height * 2 / 4); // Adjusted position for the second line

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Add a large plane as background
const planeGeometry = new THREE.PlaneGeometry(100, 100);  // Larger size for the background
const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true
});
const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(backgroundPlane);
backgroundPlane.position.z = -50;  // Move it far back so it stays behind the objects

// Add Box (Hình hộp)
const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x800080, wireframe: true });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.set(0, 8, 0);

// Add Tetrahedron (Hình tứ diện)
const tetrahedronGeometry = new THREE.TetrahedronGeometry(5, 10);
const tetrahedronMaterial = new THREE.MeshBasicMaterial({ color: 0xEB4704, wireframe: true });
const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterial);
scene.add(tetrahedron);
tetrahedron.position.set(-12, 8, -10);

// Add Torus (Hình torus)
let torusCap = 32;
let torusRadial = 10;
const torusGeometry = new THREE.TorusGeometry(6, 3, torusCap, torusRadial);
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x60EBEA, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);
torus.position.set(12, 8, 10);

// Add Cylinder (Hình trụ) - Vị trí góc còn lại
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);
cylinder.position.set(12, 8, -10); // Đặt vị trí tại góc

// Add Cone (Hình nón) - Vị trí góc còn lại
const coneGeometry = new THREE.ConeGeometry(5, 20, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00, wireframe: true });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
scene.add(cone);
cone.position.set(-12, 8, 10); // Đặt vị trí tại góc

// Animate Objects
let isBoxRotating = true;
let isTetrahedronRotating = true;
let isTorusRotating = true;
let isCylinderRotating = true;
let isConeRotating = true;

function animate() {
    if (isBoxRotating) {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    }

    if (isTetrahedronRotating) {
        tetrahedron.rotation.x += 0.02;
        tetrahedron.rotation.y += 0.02;
    }

    if (isTorusRotating) {
        torus.rotation.x -= 0.01;
        torus.rotation.y -= 0.005;
        torus.rotation.z += 0.005;
    }

    if (isCylinderRotating) {
        cylinder.rotation.x += 0.01;
        cylinder.rotation.y += 0.01;
    }

    if (isConeRotating) {
        cone.rotation.x -= 0.01;
        cone.rotation.y -= 0.01;
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Add Plane (Mặt phẳng dưới)
const groundPlaneGeometry = new THREE.PlaneGeometry(40, 40);
const groundPlaneMaterial = new THREE.MeshBasicMaterial({
    color: 0xadbebb,
    side: THREE.DoubleSide
});
const groundPlane = new THREE.Mesh(groundPlaneGeometry, groundPlaneMaterial);
scene.add(groundPlane);
groundPlane.rotation.x = -0.5 * Math.PI;

// Add Grid (Lưới)
const gridHelper = new THREE.GridHelper(40, 20);
scene.add(gridHelper);
