import App from '../App.js'
import * as THREE from 'three'

export default class Renderer {
    constructor()
    {
        // Setup
        this.app = new App()
        this.canvas = this.app.canvas
        this.sizes = this.app.sizes
        this.input = this.app.input

        this.perScene = this.app.perScene
        this.ortScene = this.app.ortScene
        this.perCamera = this.app.cameras.perCamera
        this.ortCamera = this.app.cameras.ortCamera

        // Instantiate Renderer
        this.setInstance()

        // Events
        this.input.on('perlin', () => this.onPerlin())
        this.input.on('ripple', () => this.onRipple())
        this.input.on('polar', () => this.onPolar())
        this.input.on('sea', () => this.onSea())
        this.input.on('galaxy', () => this.onGalaxy())
    }

    // Instantiate Renderer
    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas
        })

        this.instance.setSize(Math.max(this.sizes.width, 3440), Math.max(this.sizes.height, 1440))
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    /**
     * Callback Functions
     */
    resize()
    {
        const full = document.fullscreenElement || document.webkitFullscreenElement
        if(this.input.perlinActive && !full)
        {
            this.instance.setSize(Math.max(this.sizes.width, 3440), Math.max(this.sizes.height, 1440))
        }
        else {
            this.instance.setSize(this.sizes.width, this.sizes.height)
        }
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update()
    {
        if(this.input.seaActive || this.input.galaxyActive || this.input.rippleActive)
        {
            this.instance.render(this.perScene, this.perCamera)
        }
        else {
            this.instance.render(this.ortScene, this.ortCamera)
        }
    }

    /**
     * HTML Dropdown
     */
     onPerlin()
     {
        this.resize()
        this.instance.setClearColor('#000000')
     }
     onRipple()
     {
        this.resize()
        this.instance.setClearColor('#000000')
     }
     onPolar()
     {
        this.resize()
        this.instance.setClearColor('#000000')
     }
     onSea()
     {
        this.resize()
        this.instance.setClearColor('#8080c0')
     }
     onGalaxy()
     {
        this.resize()
        this.instance.setClearColor('#000000')
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

        // Delete Renderer
        this.instance.dispose()
    }
}