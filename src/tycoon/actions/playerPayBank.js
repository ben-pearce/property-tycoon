import BaseAction from "./action";

/**
 * Action class for player that pays bank.
 * 
 * @implements BaseAction
 * @memberof Actions
 * @property {number} cash The amount that the player will pay.
 */
class PlayerPayBank extends BaseAction {
	/**
	 * Takes a single parameter and sets it as the amount
	 * that the player will pay the bank.
	 * 
	 * @param {integer} cash The amount that player will pay.
	 */
	constructor(cash) {
		super();
		this.cash = cash;
	}

	/**
	 * Withdraws {@link cash} from the player and
	 * deposits the same amount into {@link bank}.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to withdraw cash from.
	 */
	do(game, player) {
		// player pays bank this.cash amount
		game.player.withdraw(this.cash);
		bank.deposit(this.cash);
		console.log(player);
	
	}
}

export default PlayerPayBank;
