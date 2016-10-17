import Stage from "./objects/stage"
import CamMovement from "./objects/camMovement";
import Controller from "./objects/controller";
import MATERIALS from "./libs/materials"
import THREE = require("three")


var main = async ()=>{
  var container = document.getElementById('container')
  var stage = Stage.create(container)



  //lighting
  var ambiant = new THREE.AmbientLight(0xFFFFFF);
  stage.scene.add(ambiant);

  var light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
  light.position.set( 0, 10000, 0 );
  light.castShadow = true;
  stage.scene.add( light );

  //meshes
  var skyGeo = new THREE.SphereBufferGeometry( 450000, 32, 15 );
	var skyMesh = new THREE.Mesh( skyGeo, MATERIALS.SKY );
	stage.scene.add( skyMesh );

  var geometry = new THREE.BoxGeometry( 200, 200, 200 );
  var mesh = new THREE.Mesh( geometry, MATERIALS.DEFAULT )
  stage.scene.add( mesh );

  var planeGeom = new THREE.PlaneGeometry(100000, 100000, 20, 20)
  var planeMesh = new THREE.Mesh( planeGeom, MATERIALS.WATER )
  planeMesh.position.y = 0;
  // var geom:any = planeMesh.geometry
  // console.log(geom.vertices[3])
  // geom.vertices[20].z += 3000
  planeMesh.rotateX(-Math.PI/2)
  stage.scene.add( planeMesh );

  //island
  var islandGeo = new THREE.SphereGeometry( 1000,16,16, 0, Math.PI*2, 0, Math.PI );
  var island = new THREE.Mesh( islandGeo, MATERIALS.DEFAULT );
  island.position.x += 1000;
  island.castShadow = true;
  stage.scene.add( island );

  var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
	var floorMesh = new THREE.Mesh( floorGeometry, MATERIALS.DEFAULT );
	floorMesh.receiveShadow = true;
	floorMesh.rotation.x = -Math.PI / 2.0;
	stage.scene.add( floorMesh );

  //camera
  var controller = new Controller({
		up: "w",
		down: "s",
		left: "a",
		right: "d",
		jump: " ",
		rotX: "mouseX",
		rotY: "mouseY",
		click: "mouseLeft"
	})
  var camMove = new CamMovement(controller)
  camMove.pos.y = 1000;

var test = 0;
  stage.startRender((delta)=>{
    MATERIALS.update(delta)

    camMove.move()
    stage.camera.position.copy(camMove.pos)
    stage.camera.lookAt(camMove.pos.clone().add(camMove.view))

    MATERIALS.WATER.uniforms.inverseCameraView.value = stage.camera.matrixWorld
    if(test == 0){
      console.log(stage.camera.matrixWorld)
      test = 1
    }


    //light.position.copy(camMove.pos)
	})
}
main();
