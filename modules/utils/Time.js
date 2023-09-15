import EventEmitter from "./EventEmitter.js"

/**
 * CLASS: Time
 * - ticks at 60fps
 */

export default class Time extends EventEmitter {
    constructor()
    {
        // Base Class Setup
        super()

        // Setup
        this.start    = Date.now()     // in milliseconds
        this.previous = this.start
        this.elapsed  = 0
        this.delta    = 0.016

        // Tick Function
        window.requestAnimationFrame(() => this.tick())
    }

    tick()
    {
        // Update Setup
        const currentTime = Date.now()
        this.delta    = (currentTime - this.previous) * 0.001
        this.previous = currentTime
        this.elapsed  = this.previous - this.start

        // Trigger Tick Event
        this.trigger('tick')

        window.requestAnimationFrame(() => this.tick())
    }
}