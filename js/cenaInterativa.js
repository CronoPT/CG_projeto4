/*--------------------------------------------------------------------
| Cena Interativa
---------------------------------------------------------------------*/
var camera, scene, renderer, clock, controls;

var orthoCamera;
var prespCamera;

var poolBall;
var chess;

var paused;
var pausedScene;
var pauseScreen;

/*--------------------------------------------------------------------
| Function: init
---------------------------------------------------------------------*/
function init(){
	'use strict';


	clock = new THREE.Clock(true);

	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();
	createPausedScene();

	createPrespCamera(100);
	createOrthoCamera(100);

	camera = prespCamera;

	controls = new THREE.OrbitControls(prespCamera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.screenSpacePanning = false;
	controls.minDistance = 100;
	controls.maxDistance = 500;
	controls.maxPolarAngle = Math.PI / 2;
	paused = false;

	render(scene, prespCamera);
			
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

/*--------------------------------------------------------------------
| Function: animate - onde toda a magia acontece - todas as 
| atualizações de posições acontecem nesta funcao
---------------------------------------------------------------------*/
function animate(){
	'use strict';

	var delta = clock.getDelta();
	if(paused){

		render(pausedScene, orthoCamera);
	}
	else{
		poolBall.move(delta);
		render(scene, prespCamera);
	}
	requestAnimationFrame(animate);
}

/*--------------------------------------------------------------------
| Function: render
---------------------------------------------------------------------*/
function render(scene, camera){
	'use strict';

	renderer.render(scene,camera);
}

/*--------------------------------------------------------------------
| Function: createScene
---------------------------------------------------------------------*/
function createScene(){
	'use strict';	

	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(210));
	
	poolBall = new PoolBall(10, "images/poolBall.png", 90);

	chess = new TexturedPlane(0, 0, 0, 200, 200, "images/Chess.jpg");

	scene.add(poolBall);
	scene.add(chess);
	scene.add(new THREE.DirectionalLight(0xffffff));
}

/*--------------------------------------------------------------------
| Function: createPausedScene
---------------------------------------------------------------------*/
function createPausedScene(){
	'use strict';

	pausedScene = new THREE.Scene();

	var aspect = window.innerWidth / window.innerHeight; 

	pauseScreen = new TexturedPlane(0, 0, 0, 100, 100, "images/p2.gif");
	pauseScreen.rotation.x = Math.PI;

	pausedScene.add(new THREE.AmbientLight(0xffffff));
	pausedScene.add(pauseScreen);
}

/*--------------------------------------------------------------------
| Function: onResize - called when the window is resized, makes
| sure the scene has the same aspect ratio as the window
---------------------------------------------------------------------*/
function onResize(){
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	updatePerspectiveCamera(prespCamera);
	updateOrthographicCamera(orthoCamera);
}

/*--------------------------------------------------------------------
| Function: updatePerspectiveCamera
---------------------------------------------------------------------*/
function updatePerspectiveCamera(camera){
	'use strict';

	if(window.innerHeight>0 && window.innerWidth>0){
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}	

/*--------------------------------------------------------------------
| Function: updateOrthographicCamera
---------------------------------------------------------------------*/
function updateOrthographicCamera(camera){
	'use strict';

	var viewHeight = 100;
	var aspect = window.innerWidth / window.innerHeight;

	if(window.innerHeight>0 && window.innerWidth>0){
		camera.left   =  aspect*viewHeight/2;
		camera.right  = -aspect*viewHeight/2;
		camera.top    = -viewHeight/2;
		camera.bottom =  viewHeight/2;

		camera.updateProjectionMatrix();
	}
}	

/*--------------------------------------------------------------------
| Function: reset
---------------------------------------------------------------------*/
function reset(){

}

/*--------------------------------------------------------------------
| CAMERAS
---------------------------------------------------------------------*/
function createPrespCamera(threshold){
	'use strict';
	prespCamera = new THREE.PerspectiveCamera(80,
											  window.innerWidth / window.innerHeight,
											  1,1000);

	prespCamera.position.set(1.8*threshold, threshold,
								threshold/2);
	prespCamera.lookAt(0, 0, 0);
}

function createOrthoCamera(threshold){
	'use strict';

	var viewHeight  = threshold;
	var aspectratio = window.innerWidth / window.innerHeight;

	orthoCamera = new THREE.OrthographicCamera(50, -50, -50, 50,
	   									   	   -1000, 1000);
	orthoCamera.position.set(0, 100, 0);
	orthoCamera.lookAt(0, 0, 0);
	orthoCamera.rotation.z = Math.PI;
}

/*--------------------------------------------------------------------
| PRESS KEYS
---------------------------------------------------------------------*/
function onKeyDown(e){
	'use strict';

	switch(e.keyCode){

		case 49: //1
			
			break;

		case 50: //2
			
			break;

		case 51: //3
			
			break;

		case 52: //4
			
			break;

		case 78: //n
			
			break;
	
		case 65://A
		case 97://a
			scene.traverse(function(node){
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		
		case 66://B
		case 98://b
			poolBall.toggleAcceleration();
			break;

		case 71:  // G
		case 103: // g
			
			break;

		case 76:  // L
		case 108: // l
	
			break;

		case 80:  // P
		case 112: //p
			paused = !paused;
			break;
		case 82:  //R
		case 114: //r
			if(paused)
				poolBall.reset();
			break;

	}


}


function onKeyUp(e){
	'use strict';
	switch(e.keyCode){
		case 37: //left arrow
			
			break;

		case 39: //right arrow

			break;

		case 38: //up arrow

			break;

		case 40: //down arrow
	
			break;
	}


}
