import Phaser from "phaser";

class Timer extends Phaser.Events.EventEmitter {
	/**
	 * This class is the internal representation of the
	 * game timer. It takes a game manager instance and a
	 * integer number of seconds.
	 * 
	 * This class inherits "EventEmitter" and so it can fire
	 * and register events to add more functionality.
	 * 
	 * It registers two events which are as follows:
	 * 
	 *  - "tick" - Fires every second with one argument passed
	 * to the event callback which will be a string representation
	 * in the form hh:mm::ss.
	 *  - "complete" - Fires once the timer is up.
	 * 
	 * Ex usage:
	 * 
	 * 	timer.on("tick", callback)
	 * 
	 * 	timer.on("complete", callback)
	 * 
	 * To get the current time in string representation (hh:mm:ss):
	 * 
	 * 	timer.toString()
	 * 
	 * @param {GameManager} game The game manager instance this timer belongs to.
	 * @param {Integer} seconds The length of this timer in seconds.
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
	 * @returns {String} The string representation.
	 */
	toString() {
		this.time = new Date(0);
		this.time.setSeconds(this.seconds);
		return this.time.toISOString().substr(11, 8);
	}

	/**
	 * Advance this timer by one second. Called automatically 
	 * by the interval set in this classes constructor.
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

export default Timer;