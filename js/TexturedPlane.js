/*--------------------------------------------------------------------
| Class: Chess
---------------------------------------------------------------------*/
class TexturedPlane extends	THREE.Object3D{


	constructor(posX, posY, posZ, height, width, src){
		'use strict';

		super();

		this.geometry = new THREE.PlaneGeometry(width, height, 20, 20);

		this.materialPhong = this.setPhongMaterial(src);
        this.materialBasic = this.setBasicMaterial(src);
		
		this.mesh = new THREE.Mesh(this.geometry, this.materialPhong);
		this.mesh.rotateX(Math.PI/2);
		this.mesh.position.set(posX, posY, posZ);	
		this.add(this.mesh);

	}

	setPhongMaterial(src){
        'use strict';

        var texture = new THREE.TextureLoader().load(src); 
        var material = new THREE.MeshPhongMaterial({ 
			color:0xffffff, 
			map: texture, 
			side: THREE.DoubleSide, 
			shininess: 1, 
			specular: "white"
		});

        return material;
    }

    setBasicMaterial(src){
    	'use strict';
    	var texture = new THREE.TextureLoader().load(src);
        var material = new THREE.MeshPhongMaterial({ 
			map: texture, 
			side: THREE.DoubleSide, 
		});
    	return material;
	}

	reset(){
		// reset wireframe
		this.materialPhong.wireframe = false;
		this.materialBasic.wireframe = false;

		// reset material
		this.mesh.material = this.materialPhong;
	}
	
	lightOn(){
    	this.mesh.material = this.materialPhong;
    }

    lightOff(){
    	this.mesh.material = this.materialBasic;
    }

	switchWireframe(){
		this.materialPhong.wireframe = ! this.materialPhong.wireframe;
		this.materialBasic.wireframe = ! this.materialBasic.wireframe;
	}

}