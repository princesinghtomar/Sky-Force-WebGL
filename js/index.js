// Some Important Variables and Functions
Window_height = 943;
Window_width = 1920;

pi = Math.PI;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
player_missiles = new Array();
star_array = new Array();
var health = 100;
var score = 0;
var rockets = 5;

// var keys = {};
// ... Later task to inprove to multiple key pressing ...

// Scene + Camera + Renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, Window_width / Window_height, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(Window_width, Window_height)
// sets renderer background color
renderer.setClearColor("#000000")
document.body.appendChild(renderer.domElement)
camera.position.z = 50
camera.position.y = -3

// scene background 
var texture = new THREE.TextureLoader().load( "textures/461223110.jpg" );
scene.background = texture;

// ambient light
var ambientLight = new THREE.AmbientLight(0xff8000, 0.2)
scene.add(ambientLight)

// point light
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

const loader = new GLTFLoader();
loader.load('../models/spaceship3.glb', function (gltf1) {
	playership = gltf1;
	console.log(playership);
	gltf1.scene.position.set(0, -10, 0);
	gltf1.scene.rotation.set(pi / 2, pi / 2, 0);
	gltf1.scene.scale.set(0.3, 0.3, 0.3);
	scene.add(gltf1.scene);

}, undefined, function (error) {

	console.error(error);

});

function create_missiles() {
	const pmloader = new GLTFLoader();
	pmloader.load('../models/rocket.glb', function (gltf) {
		player_missiles.push(gltf);
		console.log("Palyer Missiles : " + String(gltf));
		gltf.scene.position.set(playership.scene.position.x, playership.scene.position.y + 0.7, 0);
		gltf.scene.rotation.set(0, 0, 0);
		gltf.scene.scale.set(0.03, 0.03, 0.03);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
}

// ... Change stars model ... 
// ... Make Stars appear after Killing of an Enemy ...
function create_stars(){
	const stloader = new GLTFLoader();
	stloader.load("../models/laser.glb",function (gltf) {
		star_array.push(gltf);
		console.log("Stars : " + String(gltf));
		gltf.scene.scale.set(0.2,0.2,0.2);
		gltf.scene.rotation.set(0,0, pi/2);
		gltf.scene.position.set(0,-2,0);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	})
}
// create_stars()


// ... Create Enemy on some Distance to each other ...
// ... 
function create_enemy(){
	const enloader = new GLTFLoader();
	enloader.load("../models/enemyspaceship2.glb",function (gltf) {
		star_array.push(gltf);
		console.log("Enemy : " + String(gltf));
		gltf.scene.scale.set(0.2,0.2,0.2);
		gltf.scene.rotation.set(pi/2,-pi/2, 0);
		gltf.scene.position.set(0,-2,0);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	})
}
// create_enemy()

function animate() {
	requestAnimationFrame(animate)
	// playership.scene.position.y -= 0.01
	// console.log(player_missiles.length)
	for(i in  player_missiles){
		// console.log("i : " + String(i))
		player_missiles[i].scene.position.y += 0.05
		// do this part later
		// if(player_missiles[i].scene.position.y >playership.scene.position.y + 10){
		// 	player_missiles.splice(i)
		// }
	}
	renderer.render(scene, camera)
}
animate()

function keyDownHandler(event) {
	let height = Window_height;
	let width = Window_width;
	if (event.keyCode == 39) {
		if (playership.scene.position.x < 14.7) {
			playership.scene.position.x += 0.2;
		}
	}
	else if (event.keyCode == 37) {
		if (playership.scene.position.x > -14.7) {
			playership.scene.position.x -= 0.2;
		}
	}
	else if (event.keyCode == 40) {
		if (playership.scene.position.y > -10) {
			playership.scene.position.y -= 0.2;
		}
	}
	else if (event.keyCode == 38) {
		if (playership.scene.position.y < 3.9) {
			playership.scene.position.y += 0.2;
			// camera.position.y += 0.1;
		}
	}
	else if (event.keyCode == 32) {
		rockets -= 1
		create_missiles()
	}
	// else if (event.keyCode == 76) {
	// 	// playership.scene.position.z = 10000;
	// }
	console.log("playership.scene.position.x : " + String(playership.scene.position.x))
	console.log("playership.scene.position.y : " + String(playership.scene.position.y))
	console.log("Window_height : " + String(Window_height))
	console.log("Window_width : " + String(Window_width))
}

function keyUpHandler(event) {
	if (event.keyCode == 39) {
	}
	else if (event.keyCode == 37) {
	}
	if (event.keyCode == 40) {
	}
	else if (event.keyCode == 38) {
	}
}
