Window_height = 943;
Window_width = 1920;

pi = Math.PI;
document.addEventListener('keydown', keyDownHandler, false);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, Window_width / Window_height, 0.1, 1000);

health = 10
healthArr = new Array()

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(Window_width, Window_height);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
function textload() {
    var instance = new THREE.TextSprite({
        alignment: 'left',
        color: '#00ff00',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: 0.3,
        fontStyle: 'italic',
        text: [
            'Hello'
        ].join('\n'),
    });
    scene.add(instance);
    return instance;
}
textinstance = textload()
textinstance.text = 'hello'
textinstance.position.x = -1
console.log(textinstance)
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

    cube.scale.set(0.1, 0.1, 0.1)
    if (healthArr.length == 0) {
        cube.position.set(0, 0, 0)
    }
    else {
        cube.position.x += healthArr[healthArr.length - 1].position.x + 0.1
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

function removeCube(index) {
    healthArr[index].position.z = 100
    healthArr.splice(index)
}

function keyDownHandler(event) {
    if (event.keyCode == 70) {
        if (health > 0) {
            health -= 1
            removeCube(healthArr.length - 1)
        }
    }
    if (event.keyCode == 71) {
        health += 1
        addCube()
        // healthArr[healthArr.length-1].position.z = 100
    }
    console.log(healthArr)
    console.log(health)
}
