import BaseAction from "./action";
import Parking from "../tiles/parking";

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
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		const parking = game.board.getSingletonTileByType(Parking);
		player.charge(this.fine, parking, () => {
			game.showSaleInterface(player);
			cb();
		});
	}
}

export default PlayerPayFine;
