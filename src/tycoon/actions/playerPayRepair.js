import BaseAction from "./action";
import Rentable from "../tiles/rentable";

/**
 * Action class for player that pays repair fees that
 * vary depending on property upgrades.
 * 
 * @extends PlayerPayBank
 * @memberof Actions
 * @property {number} houseCost The amount the player will pay per house.
 * @property {number} hotelCost The amount the player will pay per hotel.
 */
class PlayerPayRepair extends BaseAction {
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
	 * Withdraws {@link houseCost} from player for each house.
	 * withdraws {@link hotelCost} from player for each hotel.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to withdraw cash from.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		const rentableOwnedTiles = game.board.getTilesOwnedByPlayer(player, Rentable);
		const repairBill = rentableOwnedTiles.reduce(
			(bill, tile) => bill + (tile.property.isHotel ? this.hotelCost : (this.houseCost * tile.property.houses)), 0
		);
		if(repairBill > 0) {
			player.charge(repairBill, game.bank, () => {
				game.showSaleInterface(player);
				cb();
			});
		} else {
			game.showSaleInterface(player);
			cb();
		}
	}
}

export default PlayerPayRepair;
