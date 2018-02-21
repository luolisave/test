// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// get elements
var threejsMainWindow = document.getElementById("threejs_main_window");
console.log( threejsMainWindow.clientWidth + ',' + threejsMainWindow.clientHeight);
var innerWidth_MainWindow = threejsMainWindow.clientWidth;
var innerHeight_MainWindow = threejsMainWindow.clientHeight;

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
///// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var camera = new THREE.PerspectiveCamera( 75, innerWidth_MainWindow/innerHeight_MainWindow, 0.1, 1000 );
camera.position.z = 30;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#8CF");
// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);
// add spotlight for the shadows
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-30, 60, 60);
spotLight.castShadow = true;
scene.add(spotLight);

// Configure renderer size
///// renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( innerWidth_MainWindow, innerHeight_MainWindow );

// Append Renderer to DOM
///// document.body.appendChild( renderer.domElement );
threejsMainWindow.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

var geometry, material, cube01_wireframe; 
var blocks = window['blocks'];

// Create a Block (WireFrame)
for(var i=0; i<blocks.length; i++){
  let block = blocks[i];
  // geometry = new THREE.BoxGeometry( block.size.x, block.size.y, block.size.z );
  // material = new THREE.MeshBasicMaterial( { color: "#433F81",wireframe:true,transparent:true } );
  // cube01_wireframe = new THREE.Mesh( geometry, material );
  // scene.add( cube01_wireframe );
  
  for(var j=0; j<block.records.length; j++){
    let record = block.records[j];
    geometry = new THREE.BoxGeometry( record.size.x, record.size.y, record.size.z );
    //material = new THREE.MeshBasicMaterial( { color: record.color } );
    //material = new THREE.MeshStandardMaterial( { color: record.color } );
    material = new THREE.MeshLambertMaterial( { color: record.color } );
    material.opacity = 0.5;
    material.transparent = 0.5
    cube = new THREE.Mesh( geometry, material );
    
    cube.position.x = record.position.x;
    cube.position.y = record.position.y;
    cube.position.z = record.position.z;
    
    scene.add( cube );
  }
}


// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 0.5, 32, 0.5 );
var material = new THREE.MeshLambertMaterial(  ); //{ color: "#888" }
var cube = new THREE.Mesh( geometry, material );

// position
cube.position.y = 0;

// Add cube to Scene
scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  cube.rotation.y += 0.01;
  

  // Render the scene
  renderer.render(scene, camera);
};

render();