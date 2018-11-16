
class rubik extends THREE.Object3D{


	constructor(posX,posY,posZ,size){
		super();
		size = size *2;
		var bumpM = new THREE.TextureLoader().load('images/bumpMap.png');

		var materialFaces = [
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face1.png'),specular: 0xffffff } ),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face2.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face3.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face4.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face5.png'),specular: 0xffffff}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/face6.png'),specular: 0xffffff})
		]


		for(var i=0;i< 6;i++){
			materialFaces[i].bumpMap = bumpM;
			materialFaces[i].shininess = 100;
		}

		

		var geometry = new THREE.BoxGeometry(size,size,size);
		var mesh = new THREE.Mesh(geometry,materialFaces);
		mesh.position.set(posX,posY,posZ);
		this.add(mesh);
		mesh.rotateZ(Math.PI/3);
		mesh.rotateY(Math.PI/4);
		




	}






}
