
class rubik extends THREE.Object3D{


	constructor(posX,posY,posZ,size){
		super();
		
		var bumpM = new THREE.TextureLoader().load('images/bumpMap.png');

		this.texturas = [
			"images/face1.png",
			"images/face2.png",
			"images/face3.png",
			"images/face4.png",
			"images/face5.png",
			"images/face6.png"
		]

		this.materialPhongFaces = new Array();
		this.materialBasicFaces = new Array();

	/*	var materialFaces = [
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face2.png'),specular: 0xffffff} ),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face3.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face4.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face5.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face6.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face1.png'),specular: 0xffffff})
		]
*/

		for(var i=0;i< 6;i++){
			var material = new THREE.MeshPhongMaterial({specular:0xffffff});
			var basicMaterial = new THREE.MeshBasicMaterial();
			var texture = new THREE.TextureLoader().load(this.texturas[i]);
			material.map = texture;
			basicMaterial.map = texture;
			//material.specular = 0xffffff;
	
     		texture.anisotropy = renderer.getMaxAnisotropy(); //mais textures de mipmap usadas...
			
			material.bumpMap = bumpM;		
			material.shininess = 2;
			material.needsUpdate = true;
			this.materialPhongFaces[i] = material;
			this.materialBasicFaces[i] = basicMaterial;

		}

		


		var teste = new THREE.MeshBasicMaterial({color:"red"});
		var geometry = new THREE.BoxGeometry(size,size,size);
		this.mesh = new THREE.Mesh(geometry,this.materialPhongFaces);
		this.mesh.position.set(posX,posY,posZ);
		this.add(this.mesh);
	




	}


	lightOn(){
		'use strict';
		this.mesh.material = this.materialPhongFaces;

	}

	lightOff(){
		'use strict';
		this.mesh.material = this.materialBasicFaces;
	}




}
