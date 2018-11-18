
class rubik extends THREE.Object3D{


	constructor(posX,posY,posZ,size){
		super();
		
		var bumpM = new THREE.TextureLoader().load('images/bumpMap.png');

		this.texturas = [
			"images/yellowface.png",
			"images/blueface.png",
			"images/greenface.png",
			"images/whiteface.png",
			"images/redface.png",
			"images/orangeface.png"
		]

		this.materialPhongFaces = new Array();
		this.materialBasicFaces = new Array();

		for(var i=0;i< 6;i++){
			var material = new THREE.MeshPhongMaterial({specular:0xffffff});
			var basicMaterial = new THREE.MeshBasicMaterial();
			var texture = new THREE.TextureLoader().load(this.texturas[i]);
			material.map = texture;
			basicMaterial.map = texture;
			// material.specular = 0xffffff
	
     		texture.anisotropy = renderer.getMaxAnisotropy(); //mais textures de mipmap usadas...
			
			material.bumpMap = bumpM;		
			material.shininess = 2;
			material.needsUpdate = true;
			this.materialPhongFaces[i] = material;
			this.materialBasicFaces[i] = basicMaterial;

		}

	
		var geometry = new THREE.BoxGeometry(size,size,size);
		this.mesh = new THREE.Mesh(geometry,this.materialPhongFaces);
		this.mesh.position.set(posX,posY,posZ);
		this.add(this.mesh);
	
	}

	reset(){
		for(var i=0;i< 6;i++){
			
			// reset wireframe
			this.materialPhongFaces[i].wireframe = false;
			this.materialBasicFaces[i].wireframe = false;
		}

		// reset materials
		this.mesh.material = this.materialPhongFaces;
	}


	lightOn(){
		'use strict';
		this.mesh.material = this.materialPhongFaces;

	}

	lightOff(){
		'use strict';
		this.mesh.material = this.materialBasicFaces;
	}


	switchWireframe(){
		for(var i=0;i< 6;i++){
			this.materialPhongFaces[i].wireframe = ! this.materialPhongFaces[i].wireframe;
			this.materialBasicFaces[i].wireframe = ! this.materialBasicFaces[i].wireframe;
		}
	}

}
