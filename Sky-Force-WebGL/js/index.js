// Some Important Variables and Functions
Window_height = 943;
Window_width = 1920;

game_length = 31 - (-10)
// ptime = [new Date().getTime()]
pi = Math.PI;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
player_missiles = new Array();
star_array = new Array();
enemy1_array = new Array();
enemy2_array = new Array();
healthArr = new Array();
enemy_laser = new Array();
var health = 10;
var score = 0;
var rockets = 15;
var game_speed = 0.02;
var run = new Array()
run.push(1)

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
var texture = new THREE.TextureLoader().load("textures/wp3493594.webp");
// const video = new THREE.VideoTexture( texture );
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

function create_laser(x, y) {
	const pmloader = new GLTFLoader();
	pmloader.load('../models/laser.glb', function (gltf) {
		enemy_laser.push(gltf);
		console.log("Palyer Laser : ", gltf);
		gltf.scene.position.set(x, y - 0.2, 0);
		gltf.scene.rotation.set(0, 0, pi / 2);
		gltf.scene.scale.set(0.2, 0.2, 0.2);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	});
}
// create_laser(0,-2.2)

// ... Change stars model ... 
// ... Make Stars appear after Killing of an Enemy ...
function create_stars(x, y) {
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
function stars_func() {
	var number_of_stars = Math.round(Math.random() * 5) + 1;
	var val = game_length / number_of_stars
	for (var i = 0; i < number_of_stars - 1; i++) {
		var put_star = Math.random() * 12 - 6
		create_stars(put_star, (i + 1) * val)
	}
}
stars_func()
// console.log(star_array)

// ... Create Enemy on some Distance to each other ...
// ... 
function create_enemy(type, x, y) {
	const enloader = new GLTFLoader();
	var address_is = ""
	if (type == 1) {
		address_is = "../models/enemyspaceship.glb"
	} else {
		address_is = "../models/enemyspaceship2.glb"
	}
	enloader.load(address_is, function (gltf) {
		if (type == 1) {
			enemy1_array.push(gltf);
		} else {
			enemy2_array.push(gltf);
		}
		// console.log("Enemy : " + String(gltf));
		gltf.scene.scale.set(0.2, 0.2, 0.2);
		gltf.scene.rotation.set(pi / 2, -pi / 2, 0);
		gltf.scene.position.set(x, y, 0);
		scene.add(gltf.scene);
	}, undefined, function (error) {
		console.error(error);
	})
}
// enemies
create_enemy(0, 0, 0);
create_enemy(1, -8.2, 3.9);
create_enemy(0, -2.3, 11);
create_enemy(1, 3.2, 19);
create_enemy(1, -1.4, 26);
enemy1movearray = new Array([0.2, -0.2, 0.2, -0.2]);
enemy2movearray = new Array([0.05]);

function textload() {
	var instance = new THREE.TextSprite({
		alignment: 'left',
		color: '#00ff00',
		fontFamily: '"Times New Roman", Times, serif',
		fontSize: 0.4,
		fontStyle: 'bold',
		text: [
			'Life :'
		].join('\n'),
	});
	scene.add(instance);
	return instance;
}

text1 = textload()
text1.position.x = -8.8
text1.position.y = -1.45

text2 = textload()
text2.text = "Score : " + String(score)
text2.position.x = 0
text2.position.y = -1.45

text3 = textload()
text3.text = "Missiles : " + String(rockets)
text3.position.x = 8
text3.position.y = -1.45

function addCube() {
	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);

	cube.scale.set(0.1, 0.1, 0.1)
	if (healthArr.length == 0) {
		cube.position.set(-8.1, -1.6, 0)
	}
	else {
		cube.position.x += healthArr[healthArr.length - 1].position.x + 0.2
		cube.position.y = -1.6
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

function calculate_dist(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}


function animate() {
	if (run[0]) {
		requestAnimationFrame(animate)
		for (i in player_missiles) {
			player_missiles[i].scene.position.y += 0.05
			if (player_missiles[i].scene.position.y > playership.scene.position.y + 10 - 1.4) {
				player_missiles[i].scene.position.z = 100
			}
		}
		if (camera.position.y < 30 + 1.4) {
			playership.scene.position.y += game_speed;
			camera.position.y += game_speed;
			text1.position.y += game_speed;
			text2.position.y += game_speed;
			text3.position.y += game_speed;
			for (i in healthArr) {
				healthArr[i].position.y += game_speed;
			}
		}
		text3.text = "Missiles : " + String(rockets)
		text2.text = "Score : " + String(score)
		for (i in star_array) {
			if (star_array[i].scene.position.z < 99) {
				var dist = calculate_dist(
					star_array[i].scene.position.x,
					star_array[i].scene.position.y,
					playership.scene.position.x,
					playership.scene.position.y
				)
				if (dist < 1) {
					star_array[i].scene.position.z = 100;
					score += 100;
				}
			}
		}
		for (i in player_missiles) {
			if (player_missiles[i].scene.position.z < 99) {
				for (j in enemy1_array) {
					if (enemy1_array[j].scene.position.z < 99) {
						var dist = calculate_dist(
							player_missiles[i].scene.position.x,
							player_missiles[i].scene.position.y,
							enemy1_array[j].scene.position.x,
							enemy1_array[j].scene.position.y
						);
						if (dist < 0.5) {
							enemy1_array[j].scene.position.z = 100;
							player_missiles[i].scene.position.z = 100;
							score += 50;
						}
					}
				}
				for (j in enemy2_array) {
					if (enemy2_array[j].scene.position.z < 99) {
						var dist = calculate_dist(
							player_missiles[i].scene.position.x,
							player_missiles[i].scene.position.y,
							enemy2_array[j].scene.position.x,
							enemy2_array[j].scene.position.y
						);
						if (dist < 0.5) {
							enemy2_array[j].scene.position.z = 100;
							player_missiles[i].scene.position.z = 100;
							score += 50;
						}
					}
				}
			}
		}
		for (j in enemy1_array) {
			if (enemy1_array[j].scene.position.z < 99) {
				var dist = calculate_dist(
					enemy1_array[j].scene.position.x,
					enemy1_array[j].scene.position.y,
					playership.scene.position.x,
					playership.scene.position.y
				);
				if (dist < 1) {
					if (health > 0) {
						health -= 1;
						removeCube(healthArr.length - 1);
						enemy1_array[j].scene.position.z = 100;
						score -= 20;
					}
				}
			}
		}
		for (j in enemy2_array) {
			ptime = new Date().getTime()
			if (enemy2_array[j].scene.position.z < 99) {
				var dist = calculate_dist(
					enemy2_array[j].scene.position.x,
					enemy2_array[j].scene.position.y,
					playership.scene.position.x,
					playership.scene.position.y
				);
				if (dist < 1) {
					if (health > 0) {
						health -= 1;
						removeCube(healthArr.length - 1);
						enemy2_array[j].scene.position.z = 100;
						score -= 20;
					}
				}
				if (dist < 100) {
					console.log(enemy2_array[j].scene.position.x)
					enemy2_array[j].scene.position.x += parseFloat(enemy2movearray[0]);
					console.log(enemy2_array[j].scene.position.x)
					console.log(parseInt(enemy2movearray[0]))
					if (enemy2_array[j].scene.position.x > 8 || enemy2_array[j].scene.position.x < -8) {
						enemy2movearray[0] = -enemy2movearray[0];
					}
					var d = new Date();
					var time = d.getTime();
					if (parseFloat(time - ptime) > 1) {
						create_laser(enemy2_array[j].scene.position.x, enemy2_array[j].scene.position.y)
						console.log(time)
						console.log(ptime)
						ptime = time;
							console.log(time)
							console.log(ptime)
					}
				}
			}
		}
		for (j in enemy_laser) {
			if(enemy_laser[j].scene.position.z < 99){
			var dist = calculate_dist(
				enemy_laser[j].scene.position.x,
				enemy_laser[j].scene.position.y,
				playership.scene.position.x,
				playership.scene.position.y
			);
			if (dist < 1) {
				// enemy_laser[j].scene.position.z = 100;
				if (health > 0) {
					health -= 1;
					removeCube(healthArr.length - 1);
					enemy_laser[j].scene.position.z = 100;
					score -= 20;
				}
			}
		}
	}
		// console.log(health)
		if (health <= 0) {
			// Game Over
			text5 = textload();
			text5.text = [
				"Game Over You lost",
				"Press F5 to Restart Game"
			].join('\n');
			text5.position.x = -4;
			text5.position.y = playership.scene.position.y + 1;
			playership.scene.position.y = 100;
			run[0] = 0;
		}
		else if (playership.scene.position.y >= 30 && health > 0) {
			// player Win
			text5 = textload();
			text5.text = [
				"You Saved the Human Empire,",
				"From distruction, Your heroic",
				"deeds will be remembered for Eternity"
			].join('\n');
			text5.position.x = -4;
			text5.position.y = playership.scene.position.y + 1;
			playership.scene.position.y = 100
			run[0] = 0;
		}
	}
	else {
		text5 = textload();
		text5.text = [
			"Game Over You lost",
			"Press F5 to Restart Game"
		].join('\n')
		text5.position.x = -4;
		text5.position.y = playership.scene.position.y + 1;
		playership.scene.position.y = 100
		run[0] = 0;
	}
	renderer.render(scene, camera);
	// console.log(run)
}
animate();
console.log(run)

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
		if (playership.scene.position.y < -2.2 + camera.position.y + 6) {
			playership.scene.position.y += 0.2;
		}
	}
	else if (event.keyCode == 32) {
		if (rockets > 0) {
			create_missiles();
			rockets -= 1;
		}
	}
	else if (event.keyCode == 70) {
		if (health > 0) {
			health -= 1;
			removeCube(healthArr.length - 1);
		}
	}
	else if (event.keyCode == 71) {
		health += 1;
		addCube();
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
