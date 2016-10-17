import Controller from "../objects/controller"

class CamMovement {
  pos:THREE.Vector3 = new THREE.Vector3(0,0,0)
  spd:THREE.Vector3 = new THREE.Vector3(0,0,0)
  view:THREE.Vector3 = new THREE.Vector3(0,0,-100)
  xMouseVal = 0;
  yMouseVal = 0;
  constructor(public controller:Controller){

  }
  move(){
    var mouseSpd = 1/700
    var xChange =  this.xMouseVal - this.controller.getValue("rotX")* mouseSpd;
    this.xMouseVal = this.controller.getValue("rotX")* mouseSpd
    var yChange = this.yMouseVal - this.controller.getValue("rotY")* mouseSpd
    this.yMouseVal = this.controller.getValue("rotY")* mouseSpd

    this.view.x = Math.sin(this.xMouseVal)
    this.view.z = -Math.cos(this.xMouseVal)
    this.view.y = - this.yMouseVal
    this.view.normalize()
    var spd = 1
    this.view.multiplyScalar(spd)

    if(this.controller.isDown("up")){
      this.pos.add(this.view)
    }
    if(this.controller.isDown("down")){
      this.pos.sub(this.view)
    }
    if(this.controller.isDown("left")){
      var mappedToYPlane = this.view.clone()
      mappedToYPlane.y = 0;
      var side = mappedToYPlane.cross(new THREE.Vector3(0,1,0)).normalize().multiplyScalar(spd)
      this.pos.sub(side)
    }
    if(this.controller.isDown("right")){
      var mappedToYPlane = this.view.clone()
      mappedToYPlane.y = 0;
      var side = mappedToYPlane.cross(new THREE.Vector3(0,1,0)).normalize().multiplyScalar(spd)
      this.pos.add(side)
    }
  }
}
export default CamMovement
