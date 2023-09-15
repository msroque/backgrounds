import App               from "../App.js"
import * as THREE        from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor()
    {
        // Setup
        this.app = new App()
        this.perScene = this.app.perScene
        this.ortScene = this.app.ortScene
        this.canvas   = this.app.canvas
        this.sizes    = this.app.sizes
        this.input    = this.app.input

        // Instantiate Cameras
        this.setInstance()

        // Events
        this.input.on('perlin', () => this.onPerlin())
        this.input.on('ripple', () => this.onRipple())
        this.input.on('polar', () => this.onPolar())
        this.input.on('sea', () => this.onSea())
        this.input.on('galaxy', () => this.onGalaxy())
    }

    // Instantiate Cameras
    setInstance()
    {
        // Perspective Camera
        this.perCamera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.perCamera.position.set(0, 0, 0.40)
        this.perScene.add(this.perCamera)

        this.perControls = new OrbitControls(this.perCamera, this.canvas)
        this.perControls.enableDamping = true
        this.perControls.enabled = false
        this.perControls.saveState()

        // Orthographic Camera
        this.ortCamera = new THREE.OrthographicCamera()
        this.ortCamera.position.set(0, 0, 0.40)
        this.ortScene.add(this.ortCamera)
    }

    /**
     * Callback Functions
     */

    resize()
    {
        if(this.input.seaActive || this.input.galaxyActive || this.input.rippleActive)
        {
            this.perCamera.aspect = this.sizes.width / this.sizes.height
            this.perCamera.updateProjectionMatrix()
        }
        else {
            this.ortCamera.updateProjectionMatrix()
        }
    }

    update()
    {
        if(this.input.seaActive || this.input.galaxyActive)
        {
            this.perControls.update()
        }
    }

    /**
     * HTML Dropdown
     */
    onPerlin()
    {
        this.resize()
        this.perControls.reset()
        this.perControls.enabled = false
    }
    onRipple()
    {
        this.resize()
        this.perControls.reset()
        this.perCamera.position.set(0, 0, 2)
        this.perControls.enabled = false
    }
    onPolar()
    {
        this.resize()
        this.perControls.reset()
        this.perControls.enabled = false
    }
    onSea()
    {
        this.resize()
        this.perControls.reset()
        this.perControls.enabled = true
    }
    onGalaxy()
    {
        this.resize()
        this.perControls.reset()
        this.perCamera.position.set(0, 1.2, 2)
        this.perControls.enabled = true
    }

    // Destructor
    destroy()
    {
        // Delete Events
        this.input.off('perlin')
        this.input.off('ripple')
        this.input.off('polar')
        this.input.off('sea')
        this.input.off('galaxy')

        // Delete Controls
        this.perControls.dispose()
    }
}