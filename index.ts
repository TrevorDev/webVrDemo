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
  light.position.set( 0, 1000, 0 );
  stage.scene.add( light );

  //meshes
  var geometry = new THREE.BoxGeometry( 200, 200, 200 );
  var mesh = new THREE.Mesh( geometry, MATERIALS.DEFAULT )
  stage.scene.add( mesh );

  var planeGeom = new THREE.PlaneGeometry(1000, 1000, 10, 10)
  var planeMesh = new THREE.Mesh( planeGeom, MATERIALS.DEFAULT )
  planeMesh.position.y = -500;
  planeMesh.rotateX(-Math.PI/2)
  stage.scene.add( planeMesh );

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

  stage.startRender((delta)=>{
    MATERIALS.update(delta)

    camMove.move()
    stage.camera.position.copy(camMove.pos)
    stage.camera.lookAt(camMove.pos.clone().add(camMove.view))
	})
}
main();
