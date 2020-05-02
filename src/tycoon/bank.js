import Phaser from "phaser";

/**
 * This class is the internal representation 
 * of the game bank.
 * 
 * Responsible for keeping track of amount of cash
 * bank has spent and received.
 * 
 * @extends Phaser.Events.EventEmitter
 * 
 * @property {GameManager} game The game manager this instance belongs to.
 * @property {integer} spent Amount of cash spent so far.
 * @property {integer} cash Amount of cash being held.
 */
class Bank extends Phaser.Events.EventEmitter {
	/**
	 * @param {GameManager} game The game manager instance this belongs to. 
	 */
	constructor(game) {
		super();

		this.game = game;
		this.spent = 0;
		this.cash = 0;
	}

	/**
	 * Deposit cash into this bank.
	 * 
	 * @param {integer} sum The amount to deposit.
	 * @fires Bank#deposit
	 */
	deposit(sum) {
		this.cash += sum;

		this.emit("deposit", sum);
	}

	/**
	 * Withdraw cash from this bank.
	 * 
	 * @param {integer} sum The amount to withdraw.
	 * @fires Bank#withdraw
	 */
	withdraw(sum) {
		this.spent += sum;
		this.cash -= sum;

		this.emit("withdraw", sum);
	}
}

/**
 * Event fired when cash is deposited into the 
 * bank.
 * 
 * @event Bank#deposit
 * @param {integer} sum The amount deposited.
 */

/**
 * Event fired when cash is withdrawn from the
 * bank.
 * 
 * @event Bank#withdraw
 * @param {integer} sum The amount withdrawn.
 */

export default Bank;
