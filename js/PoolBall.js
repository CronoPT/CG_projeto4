/*--------------------------------------------------------------------
| Class: PoolBall
---------------------------------------------------------------------*/

const ACCEL = 0.5;
const MAXSPEED = 3;

class PoolBall extends THREE.Object3D{  
    constructor(radius, src, trajRadius){
        'use strict';

        super();
        
        this.materialPhong = this.setPhongMaterial(src);
        this.materialBasic = this.setBasicMaterial(src);
        this.geometry = this.setGeometry(radius);

        this.mesh = new THREE.Mesh(this.geometry, this.materialPhong)

        this.add(new THREE.AxesHelper(radius*3));
        this.add(this.mesh);

        this.radius = radius;
        this.speed = 0;
        this.accel = 0;
        this.angle = -Math.PI/2;
        this.trajectoryRadius = trajRadius;

        this.accelerating = false;

        this.position.set(-this.trajectoryRadius, radius, 0);
    }

    setPhongMaterial(src){
        'use strict';

        var texture = new THREE.TextureLoader().load(src); 
        var material = new THREE.MeshPhongMaterial({
            color: 0xffffff, 
            specular: 0xffffff,
            shininess: 50,
            map: texture,
        });

        return material;
    }

    setBasicMaterial(src){
    	'use strict';
    	var texture = new THREE.TextureLoader().load(src);
    	var material = new THREE.MeshBasicMaterial();
    	material.map = texture;
    	return material;

    }

    setGeometry(radius){
        'use strict';

        var geometry = new THREE.SphereGeometry(radius, 60, 60);
        geometry.normalsNeedUpdate = true;

        return geometry;
    }

    toggleAcceleration(){
        'use strict';

        this.accelerating = !this.accelerating;
        this.accel = ACCEL;
    }

    move(delta){
        'use strict';
        console.log(this.speed);
        if(this.accelerating){
        	if(this.speed < MAXSPEED)
            	this.speed += this.accel * delta;
        }
        else if(this.accel != 0){   
            this.speed -= this.accel * delta;

            if(this.speed < 0){ 
                this.accel = 0; 
                this.speed = 0;
            }
        }

        this.angle += this.speed * delta;
        this.position.x = Math.sin(this.angle) * this.trajectoryRadius;
        this.position.z = Math.cos(this.angle) * this.trajectoryRadius;

        this.rotateY(this.speed * delta);

        this.mesh.rotateX(this.speed / this.radius);
    }

    reset(){
        console.table(this.rotation);
        this.rotation.set(0, 0, 0);
        this.mesh.rotation.x = 0;
        this.speed = 0;
        this.accel = 0;
        this.angle = -Math.PI/2;
        this.accelerating = false;
        this.position.set(-this.trajectoryRadius, this.radius, 0);
        console.table(this.rotation);
    }


    lightOn(){
    	this.mesh.material = this.materialPhong;
    }

    lightOff(){
    	this.mesh.material = this.materialBasic;
    }
}