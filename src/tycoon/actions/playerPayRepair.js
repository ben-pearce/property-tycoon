import PlayerPayBank from "./playerPayBank";

/**
 * Action class for player that pays repair fees that
 * vary depending on property upgrades.
 * 
 * @extends PlayerPayBank
 * @memberof Actions
 * @property {number} houseCost The amount the player will 
 * pay if they have houses on the property.
 * @property {number} hotelCost The amount the player will 
 * pay if they have a hotel on the property.
 */
class PlayerPayRepair extends PlayerPayBank {
	/**
	 * Takes the repair cost fees to pay for both 
	 * houses and hotels that will be charged to the player.
	 * 
	 * @param {integer} houseCost The house repair cost.
	 * @param {integer} hotelCost The hotel repair cost.
	 */
	constructor(houseCost, hotelCost) {
		super(null);

		this.houseCost = houseCost;
		this.hotelCost = hotelCost;
	}

	/**
	 * Withdraws {@link houseCost} if player owns only houses,
	 * withdraws {@link hotelCost} if player owns hotels.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to withdraw cash from.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		// conditionally update cost
		super.do(game, player);

		this.cash = null;
		cb();
	}
}

export default PlayerPayRepair;