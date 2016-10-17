import THREE = require("three")

class Stage {
  scene:THREE.Scene;
  camera:THREE.PerspectiveCamera;
  renderer:THREE.WebGLRenderer;
  constructor(){

  }

  startRender(renderLoop){
    var render = ()=>{
      //TODO, may want to add composer
      this.renderer.render( this.scene, this.camera );
    }
    var last = Date.now()
    var animate = ()=>{
      var now = Date.now()
      var delta = now - last
      last = now
			requestAnimationFrame( animate );
      renderLoop(delta);
			render();
    }
    animate()
  }

  static create(container){
    var ret = new Stage();
    ret.camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 5, 3500000 );
  	//ret.camera.position.z = 2750;

    ret.scene = new THREE.Scene();
  	ret.scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

    ret.renderer = new THREE.WebGLRenderer( { antialias: false } );
  	ret.renderer.setClearColor( ret.scene.fog.color );
  	ret.renderer.setPixelRatio( window.devicePixelRatio );
  	ret.renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( ret.renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {

    	ret.camera.aspect = window.innerWidth / window.innerHeight;
    	ret.camera.updateProjectionMatrix();

    	ret.renderer.setSize( window.innerWidth, window.innerHeight );

    }

    return ret;
  }

}

export default Stage
