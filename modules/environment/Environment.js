import App from '../../App.js'

import Bg2D   from './Bg2D.js'
import Ripple from './Ripple.js'
import Sea    from './Sea.js'
import Galaxy from './Galaxy.js'

export default class Environment {
    constructor()
    {
        // Setup
        this.app = new App()
        this.input = this.app.input
        this.shaders = this.app.shaders
        this.perScene = this.app.perScene

        // Instantiate Backgrounds
        this.createBackgrounds()

        // Events
        this.input.on('perlin', () => this.onPerlin())
        this.input.on('ripple', () => this.onRipple())
        this.input.on('polar', () => this.onPolar())
        this.input.on('sea', () => this.onSea())
        this.input.on('galaxy', () => this.onGalaxy())
    }

    // Instantiate Backgrounds
    createBackgrounds()
    {
        this.bg2D     = new Bg2D()
        this.bgRipple = new Ripple()
        this.bgSea    = new Sea()
        this.bgGalaxy = new Galaxy()
    }

    update()
    {
        if(this.input.seaActive)
        {
            this.bgSea.update()
        }
        else if(this.input.galaxyActive)
        {
            this.bgGalaxy.update()
        }
        else if(this.input.rippleActive)
        {
            this.bgRipple.update()
        }
        else {
            this.bg2D.update()
        }
    }

    /**
     * HTML Dropdown
     */
    onPerlin()
    {
        this.clear()
        this.bg2D.updateMaterial(this.shaders.frag_01)
    }
    onRipple()
    {
        this.clear()
        this.bgRipple.add()
    }
    onPolar()
    {
        this.clear()
        this.bg2D.updateMaterial(this.shaders.frag_03)
    }
    onSea()
    {
        this.clear()
        this.bgSea.add()
    }
    onGalaxy()
    {
        this.clear()
        this.bgGalaxy.add()
    }

    /**
     * Helper Functions
     */
    clear()
    {
        this.bgRipple.remove()
        this.bgSea.remove()
        this.bgGalaxy.remove()
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
        this.bgGalaxy.debug.dispose()
    }
}