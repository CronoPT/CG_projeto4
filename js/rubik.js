
class RUBIK extends THREE.Object3D{


	constructor(posX,posY,posZ,size){
		super();
		size = size *2;
		var bumpM = new THREE.TextureLoader().load('js/bumpMap.png');
		var materialFaces = [
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face1.png'), bumpMap: bumpM}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face2.png'), bumpMap: bumpM}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face3.png'), bumpMap: bumpM}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face4.png'), bumpMap: bumpM}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face5.png'), bumpMap: bumpM}),
			new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('js/face6.png'), bumpMap: bumpM})
		]

		//var texture = new THREE.TextureLoader().load("js/CHESS.jpg");
		//var material =  new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, shininess:2, specular:"white"});
	 	
		var geometry = new THREE.BoxGeometry(size,size,size);
	   // var material = new THREE.MeshFaceMaterial(materialFaces);
		//var material = new THREE.MeshFaceMaterial(materialFaces);
		var mesh = new THREE.Mesh(geometry,materialFaces);
		mesh.position.set(posX,posY,posZ);
		this.add(mesh);
		




	}






}
