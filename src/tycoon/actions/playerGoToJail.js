import BaseAction from "./action";

/**
 * Action class for sending player to jail.
 * 
 * @implements BaseAction
 * @memberof Actions
 */
class PlayerGoToJail extends BaseAction {
	constructor() {
		super();
	}

	/**
	 * Sends the player to the Jail tile and sets their
	 * state as jailed.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player instance.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		// player is sent to jail and is given usual restrictions for jailed players
		cb();
	}
}

export default PlayerGoToJail;