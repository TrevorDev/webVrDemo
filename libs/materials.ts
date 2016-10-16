import THREE = require("three")

var globalUniforms = {
  time: { value: 0 }
}

export default {
  update: function(delta){
    globalUniforms.time.value += delta
    //console.log(globalUniforms.time.value)
  },
  DEFAULT: new THREE.ShaderMaterial( {

	uniforms: {
		time: globalUniforms.time
	},
	vertexShader: `
  	varying vec3 vPositionW;
  	varying vec3 vNormalW;
    void main() {
      //regular vertex shader
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      //position and normal without projectionMatrix
  		vPositionW = vec3(modelViewMatrix * vec4(position, 1.0));
      vNormalW = normalize(vec3(modelViewMatrix * vec4(normal, 0.0)));
    }
    `,
	fragmentShader: `
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    uniform float time;
    void main() {
      float g = mod(time,6000.0);
      if(g > 3000.0){
        g = 3000.0 - (g - 3000.0);
      }
      gl_FragColor = vec4(1.0, g / 3000.0, 0.0, 1.0);
    }
    `

} )
}
