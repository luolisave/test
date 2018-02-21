var zoomStep = 1;
var camPositionStep = 2;

function cameraLookAt(x, y, z){
    camera.lookAt(new THREE.Vector3(x, y, z));
}

function zoomIn(){
    camera.position.z = camera.position.z - zoomStep;
    cameraLookAt(0,0,0);
    console.log("camera.position.z = ", camera.position.z);
}

function zoomOut(){
    camera.position.z = camera.position.z + zoomStep;
    cameraLookAt(0,0,0);
    console.log("camera.position.z = ", camera.position.z);
}

function camXPlus(){
    camera.position.x += camPositionStep;
    // camera.position.y = 30;
    // camera.position.z = 40;
    cameraLookAt(0,0,0);
}

function camXMinus(){
    camera.position.x -= camPositionStep;
    cameraLookAt(0,0,0);
}

function camYPlus(){
    camera.position.y += camPositionStep;
    cameraLookAt(0,0,0);
}

function camYMinus(){
    camera.position.y -= camPositionStep;
    cameraLookAt(0,0,0);
}

function camZPlus(){
    camera.position.z += camPositionStep;
    cameraLookAt(0,0,0);
}

function camZMinus(){
    camera.position.z -= camPositionStep;
    cameraLookAt(0,0,0);
}