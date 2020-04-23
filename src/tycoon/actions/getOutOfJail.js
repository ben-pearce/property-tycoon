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
	 */
	do(game, player) {
		// player is given Get Out Of Jail card
		console.log(player);
	}
}

export default GetOutOfJail;