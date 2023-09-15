import App from '../../App.js'
import * as THREE from 'three'

export default class Sea {
    constructor()
    {
        // Setup
        this.app = new App()
        this.shaders = this.app.shaders
        this.perScene = this.app.perScene
        this.delta = this.app.time.delta

        // Instantiate Sea
        this.create()
    }

    // Instantiate Sea
    create()
    {
        // Colors
        const depthColor   = '#218bc5'
        const surfaceColor = '#9bd8ff'
        const foamColor    = '#e6e6f2'
        const skyColor     = '#8080c0'

        // Geometry
        this.geometry = new THREE.PlaneGeometry(50, 50, 512, 512)

        // Material
        this.material = new THREE.ShaderMaterial({
            vertexShader: this.shaders.vert_water,
            fragmentShader: this.shaders.frag_water,
            side: THREE.DoubleSide,
            fog: true,
            uniforms: {
                uTime: {value: 0},
                uFrequency: {value: new THREE.Vector3(0.2, 1.13, 0.3)},

                uDepthColor: {value: new THREE.Color(depthColor)},
                uSurfaceColor: {value: new THREE.Color(surfaceColor)},
                uFoamColor: {value: new THREE.Color(foamColor)},

                fogColor: {value: new THREE.Color(skyColor)},
                fogNear: {value: 1},
                fogFar: {value: 20}
            }
        })

        // Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.position.y = -1.5

        // Fog
        this.fog = new THREE.Fog(skyColor, 1, 20)
    }

    update()
    {
        this.material.uniforms.uTime.value += this.delta
        this.material.needsUpdate = true
    }

    add()
    {
        this.perScene.fog = this.fog
        this.perScene.add(this.mesh)
    }

    remove()
    {
        this.perScene.fog = null
        this.perScene.traverse((child) => {
            if(child === this.mesh)
            {
                this.perScene.remove(this.mesh)
            }
        })
    }
}