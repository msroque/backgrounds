import App from '../../App.js'
import * as THREE from 'three'

export default class Bg2D {
    constructor()
    {
        // Setup
        this.app = new App()
        this.shaders = this.app.shaders
        this.perScene = this.app.perScene
        this.delta = this.app.time.delta

        // Instantiate 2D Background
        this.create()
    }

    // Instantiate 2D Background
    create()
    {
        this.geometry = new THREE.PlaneGeometry(2, 2)

        this.material = new THREE.ShaderMaterial({
            vertexShader: this.shaders.vertex_01,
            fragmentShader: this.shaders.frag_02,
            uniforms: {
                uTime: { value: 0 },
                uCenter: { value: new THREE.Vector2(0.5, 0.5)}  // Optional
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.perScene.add(this.mesh)
    }

    /**
     * Callback Functions
     */
    update()
    {
        this.material.uniforms.uTime.value += this.delta
        this.material.needsUpdate = true
    }

    add()
    {
        this.perScene.add(this.mesh)
    }

    remove()
    {
        this.perScene.traverse((child) => {
            if(child === this.mesh)
            {
                this.perScene.remove(this.mesh)
            }
        })
    }
}