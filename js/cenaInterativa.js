/*--------------------------------------------------------------------
| Cena Interativa
---------------------------------------------------------------------*/

var camera, scene, renderer, clock;

var upCamera;
var prespCamera;
 
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

	createPrespCamera(200);
	createUpCamera(200);

	camera = prespCamera;
	render();

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

	render();
	requestAnimationFrame(animate);
}

/*--------------------------------------------------------------------
| Function: render
---------------------------------------------------------------------*/
function render(){
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
	

}

/*--------------------------------------------------------------------
| Function: onResize - called when the window is resized, makes
| sure the scene has the same aspect ratio as the window
---------------------------------------------------------------------*/
function onResize(){
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	updatePerspectiveCamera(prespCamera);
	updateOrthographicCamera(upCamera);
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

	var viewHeight = 300;
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
function createPrespCamera(threshold){
	'use strict';
	prespCamera = new THREE.PerspectiveCamera(80,
											  window.innerWidth / window.innerHeight,
											  1,1000);

	prespCamera.position.set(1.8*threshold, threshold,
								threshold/2);
	prespCamera.lookAt(threshold/2, 0, threshold/2);
}

function createUpCamera(threshold){
	'use strict';

	var viewHeight  = 300;
	var aspectratio = window.innerWidth / window.innerHeight;

	upCamera = new THREE.OrthographicCamera(aspectratio*viewHeight/2,
										   -aspectratio*viewHeight/2,
										   -viewHeight/2,
	   									    viewHeight/2,
	   									   -1000, 1000);
	
	upCamera.position.set(threshold/2, (3/2)*threshold, 
							threshold*(3/2));
	upCamera.lookAt(threshold/2, threshold/2, threshold/2);
}

/*--------------------------------------------------------------------
| PRESS KEYS
---------------------------------------------------------------------*/
function onKeyDown(e){
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
		
		case 71:  // G
		case 103: // g
			
			break;

		case 76:  // L
		case 108: // l
			
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
