import App from '../../App.js'
import * as THREE from 'three'
import { Pane } from 'tweakpane'

export default class Galaxy {
    constructor()
    {
        // Setup
        this.app = new App()
        this.shaders = this.app.shaders
        this.perScene = this.app.perScene
        this.renderer = this.app.renderer.instance
        this.delta = this.app.time.delta

        // Parameters
        this.parameters = {
            count: 200000,
            size: 20,
            radius: 5,
            branches: 3,
            spin: 1,
            randomness: 0.5,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984'
        }

        this.geometry = null
        this.material = null
        this.points = null

        // Instantiate Galaxy
        this.createDebug()
    }

    update()
    {
        this.material.uniforms.uTime.value += this.delta
        this.material.needsUpdate = true
    }

    /**
     * Callback Functions
     */

    add()
    {
        this.debug.hidden = false
        this.debug.expanded = false
        this.generateGalaxy()
    }

    remove()
    {
        this.debug.hidden = true
        this.perScene.traverse((child) => {
            if(child === this.points)
            {
                this.perScene.remove(this.points)
            }
        })
    }

    /**
     * Helper Functions
     */

    generateGalaxy()
    {
        this.clear()
        this.createGeometry()
        this.createMaterial()

        this.points = new THREE.Points(this.geometry, this.material)
        this.perScene.add(this.points)
    }

    clear()
    {
        if(this.points !== null)
        {
            this.geometry.dispose()
            this.material.dispose()
            this.perScene.traverse((child) => {
                if(child === this.points)
                {
                    this.perScene.remove(this.points)
                }
            })
        }
    }

    createGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.parameters.count * 3)
        const colors    = new Float32Array(this.parameters.count * 3)
        const scales    = new Float32Array(this.parameters.count * 1)
        const randoms   = new Float32Array(this.parameters.count * 3)

        const insideColor = new THREE.Color(this.parameters.insideColor)
        const outsideColor = new THREE.Color(this.parameters.outsideColor)

        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3

            // Position
            const radius = Math.random() * this.parameters.radius

            const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2
            
            positions[i3 + 0] = Math.cos(branchAngle) * radius
            positions[i3 + 1] = 0
            positions[i3 + 2] = Math.sin(branchAngle) * radius

            // Randomness
            randoms[i3 + 0] = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            randoms[i3 + 1] = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            randoms[i3 + 2] = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

            // Color
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / this.parameters.radius)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Scales
            scales[i] = Math.random()
        }

        // Attributes
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
        this.geometry.setAttribute('aScale',   new THREE.BufferAttribute(scales,    1))
        this.geometry.setAttribute('aRandom',  new THREE.BufferAttribute(randoms,   3))
    }

    createMaterial()
    {
        this.material = new THREE.ShaderMaterial({
            vertexShader: this.shaders.vert_galaxy,
            fragmentShader: this.shaders.frag_galaxy,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            uniforms: {
                uTime: {value: 0},
                uSize: {value: this.parameters.size * this.renderer.getPixelRatio()}
            }
        })
    }

    createDebug()
    {
        this.debug = new Pane({
            title: "GALAXY COLORS",
            expanded: true,
            container: document.querySelector('div.galaxy_colors')
        })

        this.debug.hidden = true

        this.debug.addInput(this.parameters, 'insideColor', {
            picker: 'inline',
            expanded: true,
            label: "Inner Stars"
        })
        .on('change', (event) => {
            if(event.last)
            {
                const time = this.material.uniforms.uTime.value
                this.generateGalaxy()
                this.material.uniforms.uTime.value = time
                this.material.needsUpdate = true
            }
        })

        this.debug.addInput(this.parameters, 'outsideColor', {
            picker: 'inline',
            expanded: true,
            label: "Outer Stars"
        })
        .on('change', (event) => {
            if(event.last)
            {
                const time = this.material.uniforms.uTime.value
                this.generateGalaxy()
                this.material.uniforms.uTime.value = time
                this.material.needsUpdate = true
            }
        })
    }
}