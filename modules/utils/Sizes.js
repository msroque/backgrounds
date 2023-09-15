import EventEmitter from "./EventEmitter.js"

export default class Sizes extends EventEmitter
{
    constructor(canvas)
    {
        // Base Class Setup
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.canvas = canvas

        // Events
        window.addEventListener('resize', () => this.onResize())
    }

    onResize() {
        // Update sizes
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        this.trigger('resize')
    }
}