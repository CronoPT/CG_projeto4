/*--------------------------------------------------------------------
| Cena Interativa
---------------------------------------------------------------------*/
var camera, scene, renderer, clock, controls;

var orthoCamera;
var prespCamera;

var poolBall;
var chess;
var cube;

var directLight;
var pointLight;

var paused;
var pausedScene;
var pauseScreen;

var light = true;

/*--------------------------------------------------------------------
| Function: init
---------------------------------------------------------------------*/
function init(){
	'use strict';


	clock = new THREE.Clock(true);

	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;
	document.body.appendChild(renderer.domElement);

	createScene();
	createPausedScene();

	createPrespCamera(100);
	createOrthoCamera(pauseScreen);

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
}

/*--------------------------------------------------------------------
| Function: animate - onde toda a magia acontece - todas as 
| atualizações de posições acontecem nesta funcao
---------------------------------------------------------------------*/
function animate(){
	'use strict';

	renderer.clear();

	var delta = clock.getDelta();
	if(paused){
		renderer.setViewport(window.innerWidth/4, window.innerHeight/4, window.innerWidth/2, window.innerHeight/2);
		renderer.render(pausedScene, orthoCamera);
	}	
	else{
		poolBall.move(delta);
	}
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	renderer.render(scene, prespCamera);
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

	cube = new Rubik(0,25,0,50);
	scene.add(poolBall);
	scene.add(chess);
	scene.add(cube);

	directLight = new THREE.DirectionalLight(0xaaaaaa,1);
	directLight.position.set(50, 50, 50);
	scene.add(directLight);

	pointLight= new THREE.PointLight(0xaaaaaa, 1, 2000, 10);
	pointLight.position.set(-40, 100, -40);
	scene.add(pointLight);
	

}

/*--------------------------------------------------------------------
| Function: createPausedScene
---------------------------------------------------------------------*/
function createPausedScene(){
	'use strict';

	pausedScene = new THREE.Scene();

	pauseScreen = new TexturedPlane(0, 0, 0, 100, 100, "images/pause_0.gif");
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
	//updateOrthographicCamera(orthoCamera);
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


	// var razao = initwh/(window.innerWidth * window.innerHeight);
    	
	// if(lastheight !=  window.innerHeight){
	// 	razao = lastheight/window.innerHeight;
	// 	camera.left   =  camera.left * razao;
	// 	camera.right  = camera.right * razao; 
	// 	lastheight = window.innerHeight;
	// }
	// if(lastwidth != window.innerWidth){
	// 	razao = lastwidth/window.innerWidth;
	// 	camera.top    = camera.top * razao;
	// 	camera.bottom =  camera.bottom * razao; 
	// 	lastwidth = window.innerWidth;
	// }

	camera.updateProjectionMatrix();
	var viewHeight = pauseScreen.height;
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
| CAMERAS
---------------------------------------------------------------------*/
function createPrespCamera(){
	'use strict';
	prespCamera = new THREE.PerspectiveCamera(80,
											  window.innerWidth / window.innerHeight,
											  1,1000);

	prespCamera.position.set(180, 100, 50);
	prespCamera.lookAt(0, 0, 0);
}

function createOrthoCamera(plane){
	'use strict';

	var viewHeight = plane.height;
	var aspect = window.innerWidth / window.innerHeight;

	orthoCamera = new THREE.OrthographicCamera(aspect*viewHeight/2,
										      -aspect*viewHeight/2,
										      -viewHeight/2,
										       viewHeight/2,
		   								      -1000, 1000);
	orthoCamera.position.set(0, 100, 0);
	orthoCamera.lookAt(0, 0, 0);
	orthoCamera.rotation.z = Math.PI;
}

/*--------------------------------------------------------------------
| Function: reset
---------------------------------------------------------------------*/
function reset(){
	poolBall.reset();
	cube.reset();
	chess.reset();
	prespCamera.position.set(180, 100, 50); //initial position
	prespCamera.lookAt(0, 0, 0);
}

/*--------------------------------------------------------------------
| PRESS KEYS
---------------------------------------------------------------------*/
function onKeyDown(e){
	'use strict';
	console.log(e);
	switch(e.keyCode){

		case 66://B
		case 98://b
			poolBall.toggleAcceleration();
			break;

		case 68: //D
		case 100: //d
			if( ! paused){
				directLight.intensity = (directLight.intensity + 1)%2;
			}
			break;

		case 76:  // L
		case 108: // l
			if( ! paused){
				if(light == true){
					cube.lightOff();
					poolBall.lightOff();
				}
				else{
					cube.lightOn();
					poolBall.lightOn();
				}
				light = !light;
			}
			break;

		case 80: //P
		case 112: //p
			if( ! paused){
				pointLight.intensity = (pointLight.intensity +1) %2;
			}
			break;

		case 82:  //R
		case 114: //r
			if(paused){
				reset();
				paused = false;
			}
			break;
		
		
		case 83:  //S
		case 115: //s
			paused = !paused;
			break;

		case 87://W
		case 119://w
			if( ! paused){
				poolBall.switchWireframe();
				chess.switchWireframe();
				cube.switchWireframe();
			}
			break;

	}


}
