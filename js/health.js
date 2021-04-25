pi = Math.PI;
document.addEventListener('keydown', keyDownHandler, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

health = 5
healthArr = new Array()

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

function addCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.scale.set(0.1,0.1,0.1)
    if (healthArr.length == 0) {
        cube.position.set(0, 0, 0)
    }
    else {
        cube.position.x += healthArr[healthArr.length-1].position.x + 0.1
    }
    healthArr.push(cube)
    scene.add(cube);
}
function makecube() {
    for (let i = 0; i < health; i++) {
        addCube()
    }
}
makecube()

function removeCube() {

}

function keyDownHandler(event) {
    if (event.keyCode == 70) {
        if (health > 0) {
            health -= 1
            healthArr[healthArr.length-1].position.z = 100
            healthArr.splice(healthArr.length-1)
        }
    }
    if(event.keyCode == 71){
        health += 1
        addCube()
        // healthArr[healthArr.length-1].position.z = 100
    }
    console.log(healthArr)
    console.log(health)
}
