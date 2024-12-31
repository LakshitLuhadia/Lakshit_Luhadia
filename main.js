// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import TWEEN from '@tweenjs/tween.js';

// // Scene setup
// const scene = new THREE.Scene();
// // scene.background = new THREE.Color('#000000');

// const textureLoader = new THREE.TextureLoader();
// const carbonFiberTexture = textureLoader.load('./carbon_fiber.jpg');
// scene.background = carbonFiberTexture;

// carbonFiberTexture.wrapS = THREE.RepeatWrapping;
// carbonFiberTexture.wrapT = THREE.RepeatWrapping;
// carbonFiberTexture.repeat.set(10, 10);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(-6, 4, 10);
// camera.zoom = 0.68;
// camera.updateProjectionMatrix();

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// document.body.appendChild(renderer.domElement);

// // Lighting setup
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
// directionalLight.position.set(10, 10, 10);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
// scene.add(ambientLight);

// // GLTFLoader to load the .glb file
// const loader = new GLTFLoader();
// let model;

// // Load the .glb model
// loader.load(
//     './f1_2022take13.glb', // Replace with the actual path to your .glb file
//     (gltf) => {
//         model = gltf.scene;
//         model.traverse((node) => {
//             if (node.isMesh) {
//                 node.castShadow = true;
//                 node.receiveShadow = true;
//             }
//         });

//         model.scale.set(2, 2, 2); // Adjust the scale as needed
//         scene.add(model);

//         // Add interactivity
//         addCarInteractivity();
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//     },
//     (error) => {
//         console.error('An error occurred while loading the model:', error);
//     }
// );

// // Load the 3D avatar model
// let avatar;
// loader.load(
//     './race_car_driver.glb', // Replace with the actual path to your avatar model
//     (gltf) => {
//         avatar = gltf.scene;
//         avatar.traverse((node) => {
//             if (node.isMesh) {
//                 node.castShadow = true;
//                 node.receiveShadow = true;
//             }
//         });

//         avatar.scale.set(3.5, 3.5, 3.5); // Adjust the scale to match the car's size
//         avatar.position.set(9, 5.5, -7); // Position the avatar next to the car
//         avatar.rotateY(-1.57);
//         scene.add(avatar);
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded (Avatar)');
//     },
//     (error) => {
//         console.error('An error occurred while loading the avatar model:', error);
//     }
// );


// // OrbitControls for better navigation
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.05;

// // Add interactivity with raycaster
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function addCarInteractivity() {
//     window.addEventListener('click', (event) => {
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);

//         if (model) {
//             const intersects = raycaster.intersectObject(model, true);
//             if (intersects.length > 0) {
//                 const clickedPart = intersects[1].object.name; // Adjust based on your model's structure
//                 console.log(`Clicked on: ${clickedPart}`);
//                 animateCamera(intersects[0].point); // Smoothly move the camera
//             }
//         }
//     });
// }

// // Smooth camera animation
// function animateCamera(targetPosition) {
//     const start = {
//         x: camera.position.x,
//         y: camera.position.y,
//         z: camera.position.z,
//     };

//     const tween = new TWEEN.Tween(start)
//         .to(
//             {
//                 x: targetPosition.x + 5,
//                 y: targetPosition.y + 3,
//                 z: targetPosition.z + 10,
//             },
//             1000
//         )
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .onUpdate(() => {
//             camera.position.set(start.x, start.y, start.z);
//             camera.lookAt(targetPosition);
//         })
//         .start();
// }

// // Animate wheels and other parts
// function animateCarAndAvatar() {
//     if (model) {
//         // Animate the car parts, e.g., wheels
//         const wheels = model.getObjectByName('WheelName'); // Replace with the correct names
//         if (wheels) wheels.rotation.x += 0.1;

//         // Update the avatar's position relative to the car
//         if (avatar) {
//             const carPosition = model.position.clone();
//             //avatar.position.set(carPosition.x - 4, carPosition.y + 4, carPosition.z + 5); // Adjust relative offsets
//         }
//     }
// }


// // Add DOM elements for the UI
// const overlay = document.createElement('div');
// overlay.id = 'overlay';
// overlay.style.position = 'absolute';
// overlay.style.top = '0';
// overlay.style.left = '0';
// overlay.style.width = '100%';
// overlay.style.height = '100%';
// overlay.style.pointerEvents = 'none';
// document.body.appendChild(overlay);

// const aboutMeButton = document.createElement('div');
// aboutMeButton.id = 'aboutMe';
// aboutMeButton.textContent = 'About Me';
// aboutMeButton.style.display = 'none';
// aboutMeButton.style.position = 'absolute';
// aboutMeButton.style.background = 'rgba(0,0,0,0.8)';
// aboutMeButton.style.color = '#fff';
// aboutMeButton.style.padding = '10px';
// aboutMeButton.style.borderRadius = '5px';
// aboutMeButton.style.pointerEvents = 'auto';
// aboutMeButton.style.cursor = 'pointer';
// overlay.appendChild(aboutMeButton);

// const carOptions = document.createElement('div');
// carOptions.id = 'carOptions';
// carOptions.style.display = 'none';
// carOptions.style.position = 'absolute';
// carOptions.style.pointerEvents = 'auto';
// carOptions.style.cursor = 'pointer';

// const projectsButton = document.createElement('div');
// projectsButton.textContent = 'Projects';
// projectsButton.style.background = 'rgba(0,0,0,0.8)';
// projectsButton.style.color = '#fff';
// projectsButton.style.margin = '5px';
// projectsButton.style.padding = '10px';
// projectsButton.style.borderRadius = '5px';

// const experienceButton = document.createElement('div');
// experienceButton.textContent = 'Experience';
// experienceButton.style.background = 'rgba(0,0,0,0.8)';
// experienceButton.style.color = '#fff';
// experienceButton.style.margin = '5px';
// experienceButton.style.padding = '10px';
// experienceButton.style.borderRadius = '5px';

// carOptions.appendChild(projectsButton);
// carOptions.appendChild(experienceButton);
// overlay.appendChild(carOptions);

// // Add interactivity with raycaster
// const INTERSECTED = { object: null };
// window.addEventListener('mousemove', (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     // Check for intersections with avatar and car model
//     const intersectsAvatar = avatar ? raycaster.intersectObject(avatar, true) : [];
//     const intersectsCar = model ? raycaster.intersectObject(model, true) : [];

//     if (intersectsAvatar.length > 0) {
//         aboutMeButton.style.display = 'block';
//         aboutMeButton.style.left = `${event.clientX + 10}px`;
//         aboutMeButton.style.top = `${event.clientY + 10}px`;
//         carOptions.style.display = 'none';
//         INTERSECTED.object = avatar;
//     } else if (intersectsCar.length > 0) {
//         carOptions.style.display = 'block';
//         carOptions.style.left = `${event.clientX + 10}px`;
//         carOptions.style.top = `${event.clientY + 10}px`;
//         aboutMeButton.style.display = 'none';
//         INTERSECTED.object = model;
//     } else {
//         aboutMeButton.style.display = 'none';
//         carOptions.style.display = 'none';
//         INTERSECTED.object = null;
//     }
// });



// // Click actions
// aboutMeButton.addEventListener('click', () => {
//     animateScreenTo('aboutMe');
// });

// projectsButton.addEventListener('click', () => {
//     animateScreenTo('projects');
// });

// experienceButton.addEventListener('click', () => {
//     animateScreenTo('experience');
// });

// // Animate the screen to a specific section
// function animateScreenTo(section) {
//     const start = { opacity: 1 };
//     const tween = new TWEEN.Tween(start)
//         .to({ opacity: 0 }, 1000)
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .onUpdate(() => {
//             renderer.domElement.style.opacity = start.opacity;
//         })
//         .onComplete(() => {
//             renderer.domElement.style.opacity = 1;

//             // Load the appropriate section
//             switch (section) {
//                 case 'aboutMe':
//                     loadAboutMeScreen();
//                     break;
//                 case 'projects':
//                     loadProjectsScreen();
//                     break;
//                 case 'experience':
//                     loadExperienceScreen();
//                     break;
//                 default:
//                     break;
//             }
//         })
//         .start();
// }

// function loadAboutMeScreen() {
//     console.log('Navigating to About Me screen...');
//     // Implement your "About Me" section here
// }

// function loadProjectsScreen() {
//     console.log('Navigating to Projects screen...');
//     // Implement your "Projects" section here
// }

// function loadExperienceScreen() {
//     console.log('Navigating to Experience screen...');
//     // Implement your "Experience" section here
// }

// // Animation loop
// function animate() {
//     TWEEN.update(); // Update tweens

//     animateCarAndAvatar(); // Update car and avatar animations

//     renderer.render(scene, camera);
//     controls.update();

//     requestAnimationFrame(animate);
// }
// animate();

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-6, 4, 10);
camera.zoom = 0.68;
camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('landing-page').appendChild(renderer.domElement);

// Lighting setup
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// GLTFLoader to load the .glb file
const loader = new GLTFLoader();
let carModel, avatarModel;

// Load the F1 car
loader.load(
    './f1_2022take13.glb',
    (gltf) => {
        carModel = gltf.scene;
        carModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        carModel.scale.set(2, 2, 2);
        scene.add(carModel);

        // Add interactivity
        addCarInteractivity();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the car model:', error);
    }
);

// Load the 3D avatar
loader.load(
    './race_car_driver.glb',
    (gltf) => {
        avatarModel = gltf.scene;
        avatarModel.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        avatarModel.scale.set(3.5, 3.5, 3.5);
        avatarModel.position.set(9, 5.5, -7);
        avatarModel.rotateY(-1.57);
        scene.add(avatarModel);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded (Avatar)');
    },
    (error) => {
        console.error('An error occurred while loading the avatar model:', error);
    }
);

const aboutMeScene = new THREE.Scene();
const aboutMeRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('about-me-avatar'), antialias: true });
aboutMeRenderer.setSize(300, 300);
const aboutMeCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
aboutMeCamera.position.set(0, 3, 10);

// loader.load('./race_car_driver.glb', (gltf) => {
//     const avatar = gltf.scene;
//     avatar.scale.set(2, 2, 2);
//     aboutMeScene.add(avatar);
// });

// OrbitControls for better navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Add interactivity with raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function addCarInteractivity() {
    window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        if (carModel) {
            const intersects = raycaster.intersectObject(carModel, true);
            if (intersects.length > 0) {
                const clickedPart = intersects[0].object.name; // Adjust based on your model's structure
                console.log(`Clicked on: ${clickedPart}`);
                animateCamera(intersects[0].point); // Smoothly move the camera
            }
        }
    });
}

// Smooth camera animation
function animateCamera(targetPosition) {
    const start = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
    };

    const tween = new TWEEN.Tween(start)
        .to(
            {
                x: targetPosition.x + 5,
                y: targetPosition.y + 3,
                z: targetPosition.z + 10,
            },
            1000
        )
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            camera.position.set(start.x, start.y, start.z);
            camera.lookAt(targetPosition);
        })
        .start();
}

// Smooth scrolling and scene transitions
let hasTransitionedToAbout = false;

function handleScroll() {
    const aboutSection = document.getElementById('about-me');
    const aboutRect = aboutSection.getBoundingClientRect();

    if (aboutRect.top < window.innerHeight / 2 && !hasTransitionedToAbout) {
        hasTransitionedToAbout = true;

        // Rotate and transition the car model to avatar
        if (carModel && avatarModel) {
            new TWEEN.Tween(carModel.rotation)
                .to({ y: Math.PI }, 2000)
                .start();

            new TWEEN.Tween(carModel.position)
                .to({ x: -5, y: 1, z: -10 }, 2000)
                .start();

            new TWEEN.Tween(avatarModel.position)
                .to({ x: 0, y: 1, z: -5 }, 2000)
                .start();
        }
    }
}

document.addEventListener('scroll', handleScroll);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();
    renderer.render(scene, camera);
}

animate();
