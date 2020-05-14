import Phaser from "phaser";

/**
 * This class is the internal representation of the 
 * game timer.
 * 
 * @extends Phaser.Events.EventEmitter
 * 
 * @property {GameManager} game The game manager instance this belongs to.
 * @property {integer} seconds The number of seconds remaining.
 * @property {boolean} complete Has the timer elapsed or not.
 */
class Timer extends Phaser.Events.EventEmitter {
	/**
	 * Starts the timer interval.
	 * 
	 * @example <caption>To get the current time in string representation (hh:mm:ss)</caption>
	 * // returns "00:30:00"
	 * let timer = new Timer(3600)
	 * timer.toString()
	 * 
	 * @example <caption>To register tick event</caption>
	 * let timer = new Timer(3600)
	 * timer.on("tick", callback)
	 * 
	 * @param {GameManager} game The game manager instance this timer belongs to.
	 * @param {integer} seconds The length of this timer in seconds.
	 */
	constructor(game, seconds) {
		super();

		this.game = game;
		this.seconds = seconds;
		this.complete = false;

		if(this.seconds !== null && this.seconds > 0) {
			this.interval = setInterval(this.tick.bind(this), 1000);
		}
	}

	/**
	 * Get the current string representation of the timer.
	 * 
	 * @returns {string} The string representation.
	 */
	toString() {
		this.time = new Date(0);
		this.time.setSeconds(this.seconds);
		return this.time.toISOString().substr(11, 8);
	}

	/**
	 * Advance this timer by one second. Called automatically 
	 * by the interval set in this classes constructor.
	 * 
	 * @fires Timer#complete
	 * @fires Timer#tick
	 */
	tick() {
		this.seconds--;

		if(this.seconds == 0) {
			clearInterval(this.interval);
			this.complete = true;
			this.emit("complete");
		}
		this.emit("tick", this.toString());	
	}
}

/**
 * Tick event fired on every tick (second) of the
 * timer.
 * 
 * @event Timer#tick
 * @param {string} time The timer represented in string format hh:mm:ss
 */

/**
 * Tick event fired once the timer has elapsed.
 * 
 * @event Timer#complete
 */

export default Timer;