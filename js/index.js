// We need 3 things everytime we use Three.js
// Scene + Camera + Renderer
pi = Math.PI
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight)
// sets renderer background color
renderer.setClearColor("#000000")
document.body.appendChild(renderer.domElement)
camera.position.z = 5

// resize canvas on resize window
window.addEventListener('resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	renderer.setSize(width, height)
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})

// ambient light
var ambientLight = new THREE.AmbientLight(0xff8000, 0.2)
scene.add(ambientLight)

// point light
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

const loader = new GLTFLoader();
loader.load( '../models/spaceship3.glb', function ( gltf1 ) {
	playership = gltf1
	console.log(playership)
	gltf1.scene.position.set(0,-3,0)
	gltf1.scene.rotation.set(pi/2,pi/2,-pi/2)
	gltf1.scene.scale.set(0.3,0.3,0.3)
	scene.add( gltf1.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
	requestAnimationFrame(animate)
	// playership.scene.position.y -= 0.01
	renderer.render(scene, camera)
}
animate()
