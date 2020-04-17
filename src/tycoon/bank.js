import Phaser from "phaser";

class Bank extends Phaser.Events.EventEmitter {
	/**
	 * This class is the internet representation 
	 * of the game bank.
	 * 
	 * Responsible for keeping track of amount of cash
	 * bank has spent and received.
	 * 
	 * It is also an EventEmitter, which registers two events:
	 * 
	 * 	- "deposit" - Fired when bank.deposit() is called and passes
	 * the sum deposited as the parameter to the event callback.
	 * 	- "withdraw" - Fired when bank.withdraw() is called and passed
	 * the sum withdrawn ad the parameter to the event callback.
	 * 
	 * @param {GameManager} game The game manager instance this belongs to. 
	 */
	constructor(game) {
		super();

		this.game = game;
		this.scene = game.scene;
		this.spent = 0;
		this.cash = 0;
	}

	/**
	 * Deposit cash into this bank.
	 * 
	 * @param {Integer} sum The amount to deposit.
	 */
	deposit(sum) {
		this.cash += sum;

		this.emit("deposit", sum);
	}

	/**
	 * Withdraw cash from this bank.
	 * 
	 * @param {Integer} sum The amount to withdraw.
	 */
	withdraw(sum) {
		this.spent += sum;
		this.cash -= sum;

		this.emit("withdraw", sum);
	}
}

export default Bank;
