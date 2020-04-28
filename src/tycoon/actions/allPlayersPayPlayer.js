import BaseAction from "./action";

/**
 * Action class for player that pays all other players.
 * 
 * @implements BaseAction
 * @memberof Actions
 */
class AllPlayersPayPlayer extends BaseAction {
	/**
	 * Takes a single cash parameter and sets it as the amount 
	 * that will be paid to each player.
	 * 
	 * @param {integer} cash The amount of cash to pay.
	 */
	constructor(cash) {
		super();
		this.cash = cash;
	}

	/**
	 * Iterates all other players and pays them the amount
	 * specified by this instance.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The paying player.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		// iterate player.board.players and pay player
		cb();
	}
}

export default AllPlayersPayPlayer;