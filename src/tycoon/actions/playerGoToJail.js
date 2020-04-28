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
	 */
	do(game, player) {
		// player is sent to jail and is given usual restrictions for jailed players
		game.jail.getPlayerJailXY();
		player.jail();
		console.log(player);
	}
}

export default PlayerGoToJail;
