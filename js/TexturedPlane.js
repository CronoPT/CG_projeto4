/*--------------------------------------------------------------------
| Class: Chess
---------------------------------------------------------------------*/
class TexturedPlane extends	THREE.Object3D{


	constructor(posX, posY, posZ, height, width, src, textureRot){
		'use strict';

		super();

		this.geometry = new THREE.PlaneGeometry(width, height);


		var texture = new THREE.TextureLoader().load(src);
		
	    var material =  new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, shininess: 2, specular: "white"});

		var plane = new THREE.Mesh(this.geometry, material);
		plane.rotateX(Math.PI/2);
		plane.position.set(posX, posY, posZ);	
		this.add(plane);

	}













}