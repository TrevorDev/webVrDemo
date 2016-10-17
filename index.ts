import Stage from "./objects/stage"
import CamMovement from "./objects/camMovement";
import Controller from "./objects/controller";
import MATERIALS from "./libs/materials"
import THREE = require("three")


var main = async ()=>{
  var container = document.getElementById('container')
  var stage = Stage.create(container)

  //lighting
  var ambiant = new THREE.AmbientLight(0xFFFFFF, 15);
  stage.scene.add(ambiant);

  var light = new THREE.PointLight( 0xFFFFFF, 10, 10000 );
  light.position.set( 20, 50, -200 );
  var lightGeo = new THREE.SphereBufferGeometry( 20, 32, 15 );
  var lightMesh = new THREE.Mesh( lightGeo, MATERIALS.MOON )
  light.add( lightMesh );
  light.castShadow = true;
  stage.scene.add( light );

  //meshes
  var skyGeo = new THREE.SphereBufferGeometry( 450000, 32, 15 );
	var skyMesh = new THREE.Mesh( skyGeo, MATERIALS.SKY );
	stage.scene.add( skyMesh );

  // var geometry = new THREE.BoxGeometry( 200, 200, 200 );
  // var mesh = new THREE.Mesh( geometry, MATERIALS.DEFAULT )
  // stage.scene.add( mesh );
  //
  var planeGeom = new THREE.PlaneGeometry(1000, 1000, 50, 50)
  var planeMesh = new THREE.Mesh( planeGeom, MATERIALS.WATER )
  planeMesh.position.y = 0;
  // var geom:any = planeMesh.geometry
  // console.log(geom.vertices[3])
  // geom.vertices[20].z += 3000
  planeMesh.rotateX(-Math.PI/2)
  stage.scene.add( planeMesh );

  //island
  var island = new THREE.Object3D()

  var islandGroundGeo = new THREE.SphereGeometry( 5,5,5, 0, Math.PI, 0, Math.PI );
  var islandGround = new THREE.Mesh( islandGroundGeo, MATERIALS.DEFAULT );
  islandGround.rotation.x = -Math.PI/2
  islandGround.scale.z = 0.5
  //island.position.x += 1000;
  island.castShadow = true;


  var treeGeo = new THREE.BoxGeometry( 0.3, 6, 0.3 );
  var treeMesh = new THREE.Mesh( treeGeo, MATERIALS.DEFAULT )
  treeMesh.position.y = 3

  var leafGeo = new THREE.BoxGeometry( 2, 2, 2 );
  var leafMesh = new THREE.Mesh( leafGeo, MATERIALS.LEAF )
  leafMesh.position.y = 3
  //leafMesh.position.x = 1
  treeMesh.add(leafMesh)
  island.add(treeMesh)
  island.add(islandGround)
  island.position.y = -1;
  stage.scene.add( island );

  // var floorGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
	// var floorMesh = new THREE.Mesh( floorGeometry, MATERIALS.DEFAULT );
	// floorMesh.receiveShadow = true;
	// floorMesh.rotation.x = -Math.PI / 2.0;
	// stage.scene.add( floorMesh );

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
  camMove.pos.z = 100;
  camMove.pos.y = 10;

  stage.startRender((delta, time)=>{
    MATERIALS.update(delta)
    stage.renderer.toneMappingExposure = Math.pow( 0.5, 5.0 );
    camMove.move()
    stage.camera.position.copy(camMove.pos)
    stage.camera.lookAt(camMove.pos.clone().add(camMove.view))
    island.rotation.x = Math.sin(time/3000)*0.1
    island.rotation.z = Math.sin(time/5000)*0.05
    //
    MATERIALS.WATER.uniforms.inverseCameraView.value = stage.camera.matrixWorld


    //light.position.copy(camMove.pos)
	})
}
main();
