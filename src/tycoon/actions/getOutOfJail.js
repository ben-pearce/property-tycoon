import BaseAction from "./action";

/**
 * Action class that assigns the player a get
 * out of jail free card.
 * 
 * @implements BaseAction
 * @memberof Actions
 */
class GetOutOfJail extends BaseAction {
	constructor() {
		super();
	}

	/**
	 * Assigns {@link Player#jailCard} to the card
	 * picked up and updates the HUD layer.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player who has picked up the card.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		// player is given Get Out Of Jail card
		cb();
	}
}

export default GetOutOfJail;