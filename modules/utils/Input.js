import EventEmitter from "./EventEmitter.js"
import App from '../../App.js'

export default class Input extends EventEmitter {
    constructor()
    {
        // Construct Base Class
        super()

        // Setup
        this.app = new App()
        this.canvas = this.app.canvas

        // Outputs
        this.seaActive = false
        this.galaxyActive = false
        this.perlinActive = true
        this.rippleActive = false

        // Header Buttons
        this.fullscreen = document.querySelector('li.full')

        // Dropdown Menu
        this.perlin = document.querySelector('a.perlin')
        this.ripple = document.querySelector('a.ripple')
        this.polar = document.querySelector('a.polar')
        this.sea    = document.querySelector('a.sea')
        this.galaxy = document.querySelector('a.galaxy')

        // Events
        this.fullscreen.addEventListener('click', () => this.onFullscreen())

        this.perlin.addEventListener('click', () => this.onPerlin())
        this.ripple.addEventListener('click', () => this.onRipple())
        this.polar.addEventListener('click', () => this.onPolar())
        this.sea.addEventListener('click', () => this.onSea())
        this.galaxy.addEventListener('click', () => this.onGalaxy())
    }

    /**
     * Callback Functions
     */

    onFullscreen()
    {
        const full = document.fullscreenElement || document.webkitFullscreenElement
        const desc = document.querySelector('div.description')
        if(!full && this.canvas.requestFullscreen)
        {
            this.canvas.requestFullscreen()
        }
        else  {
            if(window.getComputedStyle(desc).visibility === "hidden")
            {
                desc.style.visibility = "visible"
            }
            else {
                desc.style.visibility = "hidden"
            }
        }
    }

    /**
     * HTML Dropdown
     */
    onPerlin()
    {
        this.seaActive = false
        this.galaxyActive = false
        this.perlinActive = true
        this.rippleActive = false
        this.trigger('perlin')
    }

    onRipple()
    {
        this.seaActive = false
        this.galaxyActive = false
        this.perlinActive = false
        this.rippleActive = true
        this.trigger('ripple')
    }

    onPolar()
    {
        this.seaActive = false
        this.galaxyActive = false
        this.perlinActive = false
        this.rippleActive = false
        this.trigger('polar')
    }

    onSea()
    {
        this.seaActive = true
        this.galaxyActive = false
        this.perlinActive = false
        this.rippleActive = false
        this.trigger('sea')
    }

    onGalaxy()
    {
        this.seaActive = false
        this.galaxyActive = true
        this.perlinActive = false
        this.rippleActive = false
        this.trigger('galaxy')
    }
}