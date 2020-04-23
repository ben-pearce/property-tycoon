import BaseAction from "./action";

/**
 * Action class for bank that pays a player.
 * 
 * @implements BaseAction
 * @memberof Actions
 * @property {number} cash The amount this instance will pay the player.
 */
class BankPayPlayer extends BaseAction {
	/**
	 * Takes a single parameter and sets it as the amount
	 * that the bank will pay the player.
	 * 
	 * @param {integer} cash The amount that the bank will pay.
	 */
	constructor(cash) {
		super();
		this.cash = cash;
	}

	/**
	 * Withdraws {@link cash} from the bank and
	 * deposits the same amount into {@link player}.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to deposit cash into.
	 */
	do(game, player) {
		// bank pays play this.cash amount
		console.log(player);
	}
}

export default BankPayPlayer;