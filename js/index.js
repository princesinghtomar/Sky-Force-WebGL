// Some Important Variables and Functions
Window_height = 943;
Window_width = 1920;

game_length = 31 - (-10)

pi = Math.PI;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
player_missiles = new Array();
star_array = new Array();
enemy1_array = new Array();
enemy2_array = new Array();
healthArr = new Array()
var health = 10;
var score = 0;
var rockets = 5;
var game_speed = 0.02;

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
camera.position.z = 6 // after make it 6
camera.position.y = -6

// scene background 
var texture = new THREE.TextureLoader().load("textures/461223110.jpg");
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
	// console.log(playership);
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
		console.log("Palyer Missiles : ", gltf);
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
function create_stars(x,y) {
	const stloader = new GLTFLoader();
	stloader.load("../models/star.glb", function (gltf) {
		star_array.push(gltf);
		// console.log("Stars : " + String(gltf));
		gltf.scene.scale.set(0.2, 0.2, 0.2);
		gltf.scene.rotation.set(pi / 2, pi / 2, 0);
		gltf.scene.position.set(x, y, 0);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	})
}
function stars_func(){
	var number_of_stars = Math.round(Math.random()*5) + 1;
	var val = game_length/number_of_stars
	for (var i=0; i < number_of_stars-1;i++){
		var put_star = Math.random()*12 - 6
		create_stars(put_star,(i+1)*val)
	}
}
stars_func()
// console.log(star_array)

// ... Create Enemy on some Distance to each other ...
// ... 
function create_enemy(type,x,y) {
	const enloader = new GLTFLoader();
	var address_is = ""
	if(type){
		address_is = "../models/enemyspaceship.glb"
	} else {
		address_is = "../models/enemyspaceship2.glb"
	}
	enloader.load(address_is, function (gltf) {
		if(type){
			enemy1_array.push(gltf);
		} else{
			enemy2_array.push(gltf);
		}
		// console.log("Enemy : " + String(gltf));
		gltf.scene.scale.set(0.2, 0.2, 0.2);
		gltf.scene.rotation.set(pi / 2, -pi / 2, 0);
		gltf.scene.position.set(0, -2, 0);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	})
}
// enemies
create_enemy(1)

function addCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.scale.set(0.1,0.1,0.1)
    if (healthArr.length == 0) {
        cube.position.set(-8.6, -1.5, 0)
    }
    else {
        cube.position.x += healthArr[healthArr.length-1].position.x + 0.2
		cube.position.y = -1.5
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

function animate() {
	requestAnimationFrame(animate)
	for (i in player_missiles) {
		player_missiles[i].scene.position.y += 0.05
		if (player_missiles[i].scene.position.y > playership.scene.position.y + 10 - 1.4) {
			player_missiles[i].scene.position.z = 100
		}
	}
	if(camera.position.y < 30 + 1.4){
		playership.scene.position.y += game_speed;
		camera.position.y += game_speed;
		for( i in healthArr){
			healthArr[i].position.y += game_speed;
		}
	}
	// if(health < 0){
	// 	// Game Over
	// 	return
	// }
	// if(playership.scene.position.y >= 30 && health > 0){
	// 	// player Win
	// 	return
	// }
	renderer.render(scene, camera)
}
animate()

function keyDownHandler(event) {
	let height = Window_height;
	let width = Window_width;
	if (event.keyCode == 39) {
		if (playership.scene.position.x < 8.5) {
			playership.scene.position.x += 0.2;
		}
	}
	else if (event.keyCode == 37) {
		if (playership.scene.position.x > -8.5) {
			playership.scene.position.x -= 0.2;
		}
	}
	else if (event.keyCode == 40) {
		if (playership.scene.position.y > -10 + camera.position.y + 6) {
			playership.scene.position.y -= 0.2;
		}
	}
	else if (event.keyCode == 38) {
		if (playership.scene.position.y < -2.4 + camera.position.y + 6) {
			playership.scene.position.y += 0.2;
			// camera.position.y += 0.1;
		}
	}
	else if (event.keyCode == 32) {
		if (rockets > 0) {
			create_missiles()
			rockets -= 1
		}
	}
	else if (event.keyCode == 70) {
        if (health > 0) {
            health -= 1
            removeCube(healthArr.length-1)
        }
    }
    else if(event.keyCode == 71){
        health += 1
        addCube()
        // healthArr[healthArr.length-1].position.z = 100
    }
	console.log("playership.scene.position.y : " + String(playership.scene.position.y))
	console.log("playership.scene.position.x : " + String(playership.scene.position.x))
	console.log("camera.position.y : " + String(camera.position.y))
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
