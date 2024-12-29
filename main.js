// // This is the start of the 3-D personal website...

// import * as THREE from 'three';

// const scene = new THREE.Scene();
// scene.background = new THREE.Color('#F0F0F0');
// const camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
// //                                        Field of View, aspect ratio, near, far clipping plane
// camera.position.z = 7;

// const geometry = new THREE.BoxGeometry( 3, 3, 3 );
// const material = new THREE.MeshBasicMaterial( { color: '#eb4034', emissive: '#468585', metalness: 0.5, roughness: 0.5} );

// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true; // Enable shadow maps
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
// document.body.appendChild(renderer.domElement);

// const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true; // Enable shadow casting for the light
// directionalLight.shadow.mapSize.width = 1024; // Higher resolution for sharper shadows
// directionalLight.shadow.mapSize.height = 1024;
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight('#ff0000', 0.3);
// scene.add(ambientLight);

// function animate() {

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }
// renderer.setAnimationLoop( animate );


// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// // Scene setup
// const scene = new THREE.Scene();
// scene.background = new THREE.Color('#F0F0F0');

// const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 8;
// camera.position.y = 3;
// camera.position.x = -2;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true; // Enable shadow maps
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
// document.body.appendChild(renderer.domElement);

// // Lighting setup
// const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true; // Enable shadow casting for the light
// directionalLight.shadow.mapSize.width = 1024; // Higher resolution for sharper shadows
// directionalLight.shadow.mapSize.height = 1024;
// scene.add(directionalLight);

// const ambientLight = new THREE.AmbientLight('#ff0000', 0.3);
// scene.add(ambientLight);

// // GLTFLoader to load the .glb file
// const loader = new GLTFLoader();
// let model;

// // Load the .glb model
// loader.load(
//     './f1_2022_concept.glb', // Replace with the actual path to your .glb file
//     (gltf) => {
//         model = gltf.scene;
//         model.castShadow = true; // Allow the model to cast shadows
//         model.receiveShadow = true; // Allow the model to receive shadows
//         scene.add(model);
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     },
//     (error) => {
//         console.error('An error occurred while loading the model:', error);
//     }
// );

// // Animation loop
// function animate() {
//     if (model) {
//         model.rotation.x += 0.0;
//         model.rotation.y += 0.0;
//     }

//     renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);


import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-5, 4, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Lighting setup
const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// GLTFLoader to load the .glb file
const loader = new GLTFLoader();
let model;

// Load the .glb model
loader.load(
    './f1_2022take13.glb', // Replace with the actual path to your .glb file
    (gltf) => {
        model = gltf.scene;
        model.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        model.scale.set(2, 2, 2); // Adjust the scale as needed
        scene.add(model);

        // Add interactivity
        addCarInteractivity();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

// Load the 3D avatar model
let avatar;
loader.load(
    './race_car_driver.glb', // Replace with the actual path to your avatar model
    (gltf) => {
        avatar = gltf.scene;
        avatar.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        avatar.scale.set(3.5, 3.5, 3.5); // Adjust the scale to match the car's size
        avatar.position.set(9, 5.5, -7); // Position the avatar next to the car
        avatar.rotateY(-1.57);
        scene.add(avatar);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded (Avatar)');
    },
    (error) => {
        console.error('An error occurred while loading the avatar model:', error);
    }
);


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

        if (model) {
            const intersects = raycaster.intersectObject(model, true);
            if (intersects.length > 0) {
                const clickedPart = intersects[1].object.name; // Adjust based on your model's structure
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

// Animate wheels and other parts
function animateCarAndAvatar() {
    if (model) {
        // Animate the car parts, e.g., wheels
        const wheels = model.getObjectByName('WheelName'); // Replace with the correct names
        if (wheels) wheels.rotation.x += 0.1;

        // Update the avatar's position relative to the car
        if (avatar) {
            const carPosition = model.position.clone();
            //avatar.position.set(carPosition.x - 4, carPosition.y + 4, carPosition.z + 5); // Adjust relative offsets
        }
    }
}
// Resize event handler
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// Animation loop
// function animate() {
//     TWEEN.update(); // Update tweens

//     animateCarAndAvatar(); // Update car and avatar animations

//     renderer.render(scene, camera);
//     controls.update();

//     requestAnimationFrame(animate);
// }
// animate();


// Add DOM elements for the UI
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.position = 'absolute';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.pointerEvents = 'none';
document.body.appendChild(overlay);

const aboutMeButton = document.createElement('div');
aboutMeButton.id = 'aboutMe';
aboutMeButton.textContent = 'About Me';
aboutMeButton.style.display = 'none';
aboutMeButton.style.position = 'absolute';
aboutMeButton.style.background = 'rgba(0,0,0,0.8)';
aboutMeButton.style.color = '#fff';
aboutMeButton.style.padding = '10px';
aboutMeButton.style.borderRadius = '5px';
aboutMeButton.style.pointerEvents = 'auto';
aboutMeButton.style.cursor = 'pointer';
overlay.appendChild(aboutMeButton);

const carOptions = document.createElement('div');
carOptions.id = 'carOptions';
carOptions.style.display = 'none';
carOptions.style.position = 'absolute';
carOptions.style.pointerEvents = 'auto';
carOptions.style.cursor = 'pointer';

const projectsButton = document.createElement('div');
projectsButton.textContent = 'Projects';
projectsButton.style.background = 'rgba(0,0,0,0.8)';
projectsButton.style.color = '#fff';
projectsButton.style.margin = '5px';
projectsButton.style.padding = '10px';
projectsButton.style.borderRadius = '5px';

const experienceButton = document.createElement('div');
experienceButton.textContent = 'Experience';
experienceButton.style.background = 'rgba(0,0,0,0.8)';
experienceButton.style.color = '#fff';
experienceButton.style.margin = '5px';
experienceButton.style.padding = '10px';
experienceButton.style.borderRadius = '5px';

carOptions.appendChild(projectsButton);
carOptions.appendChild(experienceButton);
overlay.appendChild(carOptions);

// Add interactivity with raycaster
const INTERSECTED = { object: null };
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with avatar and car model
    const intersectsAvatar = avatar ? raycaster.intersectObject(avatar, true) : [];
    const intersectsCar = model ? raycaster.intersectObject(model, true) : [];

    if (intersectsAvatar.length > 0) {
        aboutMeButton.style.display = 'block';
        aboutMeButton.style.left = `${event.clientX + 10}px`;
        aboutMeButton.style.top = `${event.clientY + 10}px`;
        carOptions.style.display = 'none';
        INTERSECTED.object = avatar;
    } else if (intersectsCar.length > 0) {
        carOptions.style.display = 'block';
        carOptions.style.left = `${event.clientX + 10}px`;
        carOptions.style.top = `${event.clientY + 10}px`;
        aboutMeButton.style.display = 'none';
        INTERSECTED.object = model;
    } else {
        aboutMeButton.style.display = 'none';
        carOptions.style.display = 'none';
        INTERSECTED.object = null;
    }
});



// Click actions
aboutMeButton.addEventListener('click', () => {
    animateScreenTo('aboutMe');
});

projectsButton.addEventListener('click', () => {
    animateScreenTo('projects');
});

experienceButton.addEventListener('click', () => {
    animateScreenTo('experience');
});

// Animate the screen to a specific section
function animateScreenTo(section) {
    const start = { opacity: 1 };
    const tween = new TWEEN.Tween(start)
        .to({ opacity: 0 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            renderer.domElement.style.opacity = start.opacity;
        })
        .onComplete(() => {
            renderer.domElement.style.opacity = 1;

            // Load the appropriate section
            switch (section) {
                case 'aboutMe':
                    loadAboutMeScreen();
                    break;
                case 'projects':
                    loadProjectsScreen();
                    break;
                case 'experience':
                    loadExperienceScreen();
                    break;
                default:
                    break;
            }
        })
        .start();
}

function loadAboutMeScreen() {
    console.log('Navigating to About Me screen...');
    // Implement your "About Me" section here
}

function loadProjectsScreen() {
    console.log('Navigating to Projects screen...');
    // Implement your "Projects" section here
}

function loadExperienceScreen() {
    console.log('Navigating to Experience screen...');
    // Implement your "Experience" section here
}

// Animation loop
function animate() {
    TWEEN.update(); // Update tweens

    animateCarAndAvatar(); // Update car and avatar animations

    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(animate);
}
animate();
