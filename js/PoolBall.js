class PoolBall extends THREE.Object3D{  
    constructor(radius, src){
        'use strict';

        super();
        
        this.material = this.setPhongMaterial(src);
        this.geometry = this.setGeometry(radius);

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.add(this.mesh);
    }

    setPhongMaterial(src){
        'use strict';

        var texture = new THREE.TextureLoader().load(src); 
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff, 
            specular: 0xffffff,
            shininess: 50,
            map: texture
        });

        return material;
    }

    setGeometry(radius){
        'use strict';

        var geometry = new THREE.SphereGeometry(radius, 60, 60);
        geometry.normalsNeedUpdate = true;

        return geometry;
    }
}