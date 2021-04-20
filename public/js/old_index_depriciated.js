// import * as THREE from './three.js';
// import * as THREE from "./node_modules/three/build/three.module.js"
// import * as THREE from '../../../build/three.module.js';

let camera, scene, renderer, cube, obj;

function init() {
    // Init scene
    scene = new THREE.Scene();
    // scene.background({ color: 0xffffff })

    // const loader = new THREE.TextureLoader();
    // const bgTexture = loader.load(
    //     "https://threejsfundamentals.org/threejs/resources/images/daikanyama.jpg"
    // );
    scene.background = new THREE.Color(0xffffff);

    // Init camera (PerspectiveCamera)
    // console.log(window.innerHeight, (window.innerWidth))
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const light = new THREE.AmbientLight(0x404040); // soft white light
    light.position.set(0, 0, 100);
    scene.add(light);
    // Init renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set size (whole window)
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Render to canvas element
    document.body.appendChild(renderer.domElement);
    // const objloader = new THREE.OBJLoader();
    // objloader.setPath("./blender-file/");

    // const mtlloader = new THREE.OBJLoader();
    // mtlloader.setPath("./blender-file/");
    // new Promise((resolve) => {
    //     mtlloader.load("./untitled.mtl", (materials) => {
    //         resolve(materials);
    //     });
    // }).then((materials) => {
    //     // materials.preload();
    //     objloader.setMaterials(materials);
    //     objloader.load("./untitled.obj", (object) => {
    //         scene.add(object);
    //     });
    // });
    // var loader = new THREE.GLTFLoader();
    // loader.load(
    //     "/blender-file/untitled.glb",
    //     function(gltf) {
    //         var scale = 5.6;
    //         bus.body = gltf.scene.children[0];
    //         // bus.body.name = “body”;
    //         bus.body.rotation.set(0, -1.5708, 0);
    //         bus.body.scale.set(scale, scale, scale);
    //         bus.body.position.set(0, 3.6, 0);
    //         bus.body.castShadow = true;
    //         bus.frame.add(bus.body);
    //     },
    // );
    // scene.add(bus.frame)
    const loader = new THREE.GLTFLoader();

    loader.load(
        "./blender-file/untitled.glb",
        function(gltf) {
            scene.add(gltf.scene);
            obj = gltf.scene;
            console.log(obj.children);
            console.log(obj);
            console.log(gltf.scene);
            gltf.scene.position.x = 0;
            gltf.scene.position.y = 0;
            gltf.scene.position.z = 10;
            gltf.scene.rotation.x = Math.PI / 2;
            obj.children[4].rotateOnWorldAxis(
                new THREE.Vector3(0, 1, 0),
                obj.children[4].position.angleTo(new THREE.Vector3(0, 1, 0))
            );

            // gltf.scene.scale.x += 1;
            // gltf.scene.scale.y += 2;
            // gltf.scene.scale.z += 3;

            // gltf.scene.rotation.z = Math.PI / 2;

            console.log("right");
        },
        undefined,
        function(error) {
            console.error(error);
        }
    );
    // // camera.target(0, 0, 0);
    camera.lookAt(0, 0, 0);

    // Init BoxGeometry object (rectangular cuboid)
    var geometry = new THREE.BoxGeometry(3, 3, 3);
    // // geometry.translate(-1, -1, -1);
    // // console.log(geometry.position())
    // // geometry.position((100, 100, 1))

    // // // Create material with color
    // // // geometry.colorsNeedUpdate = true
    // // // for (var i = 0; i < geometry.faces.length; i++) {
    // // //     geometry.faces[i].color.setHex(Math.random() * 0x0000ff)
    // // // }
    // // // red = new THREE.Color(1, 0, 0);
    // // // green = new THREE.Color(0, 1, 0);
    // // // blue = new THREE.Color(0, 0, 1);
    // // // var colors = [red, green, blue];

    // // // for (var i = 0; i < 3; i++) {
    // // //     geometry.faces[4 * i].color = colors[i];
    // // //     geometry.faces[4 * i + 1].color = colors[i];
    // // //     geometry.faces[4 * i + 2].color = colors[i];
    // // //     geometry.faces[4 * i + 3].color = colors[i];
    // // // }
    var cubeMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0x800000 }),
        new THREE.MeshBasicMaterial({ color: 0x800000 }),
    ];
    // // // const material = new THREE.MeshFaceMaterial({
    // // //     cubeMaterial
    // // // });

    // // // Add texture -
    // // // const texture = new THREE.TextureLoader().load('textures/crate.gif');

    // // // Create material with texture
    // // // const material = new THREE.MeshBasicMaterial({ map: texture });

    // // // Create mesh with geo and material
    cube = new THREE.Mesh(geometry, cubeMaterial);
    // // // Add to scene
    // cube.position.x += 1

    scene.add(cube);
    // var position = new THREE.Vector3();
    // position.getPositionFromMatrix(cube.matrixWorld);
    // alert(position.x + "," + position.y + "," + position.z);
    // cube.position((1, 0, 0))
    // Position camera
    // cube.position.x -= 2

    camera.position.z = 100;
    camera.position.y = -10;
    camera.lookAt(0, 0, 0);
}

// Draw the scene every time the screen is refreshed
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube (Change values to change speed)
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;0.01
    // obj.children[4].rotation.y += 0.01
    // obj.children[4].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), obj.children[4].position.angleTo(new THREE.Vector3(0, 1, 0)))
    renderer.render(scene, camera);
}

function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    console.log(event.which);
    console.log("enter");
    // console.log(KeyCode);
    if (event.which == 38) {
        console.log(obj.children[4].rotation);
        console.log(obj.children[4].position);
        axis = new THREE.Vector3(camera.position);
        console.log(axis.x)
        var angle = obj.children[4].position.angleTo(camera.position);
        console.log(angle);
        obj.children[4].rotateOnAxis(axis.y, 0.001);
        console.log(obj.children[4].rotation);
    }
    animate();
}

init();
animate();
// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';

// function main() {
//     renderer = new THREE.WebGLRenderer({ antialias: true });

//     const fov = 75;
//     const aspect = 2; // the canvas default
//     const near = 0.1;
//     const far = 5;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.z = 2;
//     document.body.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();

//     {
//         const color = 0xffffff;
//         const intensity = 1;
//         const light = new THREE.DirectionalLight(color, intensity);
//         light.position.set(-1, 2, 4);
//         scene.add(light);
//     }

//     const boxWidth = 1;
//     const boxHeight = 1;
//     const boxDepth = 1;
//     const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

//     function makeInstance(geometry, color, x) {
//         const material = new THREE.MeshPhongMaterial({ color });

//         const cube = new THREE.Mesh(geometry, material);
//         scene.add(cube);

//         cube.position.x = x;

//         return cube;
//     }

//     const cubes = [
//         makeInstance(geometry, 0x44aa88, 0),
//         makeInstance(geometry, 0x8844aa, -2),
//         makeInstance(geometry, 0xaa8844, 2),
//     ];

//     const loader = new THREE.TextureLoader();
//     const bgTexture = loader.load(
//         "https://threejsfundamentals.org/threejs/resources/images/daikanyama.jpg"
//     );
//     scene.background = bgTexture;
//     console.log(bgTexture);

//     function resizeRendererToDisplaySize(renderer) {
//         const canvas = renderer.domElement;
//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const needResize = canvas.width !== width || canvas.height !== height;
//         if (needResize) {
//             renderer.setSize(width, height, false);
//         }
//         return needResize;
//     }

//     function render(time) {
//         time *= 0.001;

//         if (resizeRendererToDisplaySize(renderer)) {
//             const canvas = renderer.domElement;
//             camera.aspect = canvas.clientWidth / canvas.clientHeight;
//             camera.updateProjectionMatrix();
//         }

//         cubes.forEach((cube, ndx) => {
//             const speed = 1 + ndx * 0.1;
//             const rot = time * speed;
//             cube.rotation.x = rot;
//             cube.rotation.y = rot;
//         });

//         renderer.render(scene, camera);

//         requestAnimationFrame(render);
//     }

// requestAnimationFrame(render);
// }

// main();