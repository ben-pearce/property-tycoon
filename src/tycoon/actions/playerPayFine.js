import BaseAction from "./action";

/**
 * Action class for player that pays fine to the
 * free parking space.
 * 
 * @implements BaseAction
 * @memberof Actions
 * @property {number} fine The amount that the player will have to pay.
 */
class PlayerPayFine extends BaseAction {
	/**
	 * Takes a single parameter and sets it as the fine that
	 * the player will have to pay.
	 * 
	 * @param {integer} fee The fee for the player to payy.
	 */
	constructor(fine) {
		super();
		this.fine = fine;
	}

	/**
	 * Withdraws {@link fine} from {@link player} and deposits
	 * onto Free Parking tile.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to withdraw cash from.
	 */
	do(game, player) {
		// player places this.fine on free parking value
		console.log(player);
	}
}

export default PlayerPayFine;