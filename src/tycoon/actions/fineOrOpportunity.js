import BaseAction from "./action";

/**
 * Action class that asks player to pay a fine or
 * pick up opportunity knocks.
 * 
 * @implements BaseAction
 * @memberof Actions
 * @property {integer} fine The fine to pay if player chooses.
 */
class FineOrOpportunity extends BaseAction {
	/**
	 * Takes a single parameter and sets it as the fine that
	 * player will pay if they choose.
	 * 
	 * @param {integer} fine The amount of the fine.
	 */
	constructor(fine) {
		super();
		this.fine = fine;
	}

	/**
	 * Shows a card that asks player if they wish to pay the
	 * {@link fine} or pick up an oppporunity knocks card.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to ask.
	 */
	do(game, player) {
		// ask player to pay this.fine or pick up opportunity card
		console.log(player);
	}
}

export default FineOrOpportunity;