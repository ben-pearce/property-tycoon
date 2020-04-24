import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";
import {getTokenNameByPlayerId} from "../utils";

/**
 * All "purchasable" tiles inherit this class.
 * 
 * @memberof Tiles
 * @extends Tile
 * 
 * @property {integer} cost The cost of the purchasable.
 * @property {?Player} owner The owner of the purchasable or null.
 */
class Purchasable extends Tile {
	/**
	 * Adds a price text to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.cost = config.cost;
		this.owner = null;

		let string = `£${this.cost}`;

		let costText = new Phaser.GameObjects.Text(this.board.scene, this.x, this.y + 80, string, CashTextStyle);
		costText.setStyle({
			fixedWidth: this.background.width,
		});
		this.add(costText);
	}

	/**
	 * Returns the total sale value of this
	 * property. Children of this call will simply
	 * have a value equal to the purchase cost.
	 * 
	 * @returns {integer} The value of this property.
	 */
	getValue() {
		return this.cost;
	}

	/**
	 * Sells this property to the player specified.
	 * 
	 * @param {Player} player The purchasing player.
	 * @param {?integer} [cost=null] Override the cost of this property for this purchase only.
	 */
	purchase(player, cost=null) {
		cost = cost == null ? this.cost : cost;
		if(this.owner === null && player.cash > cost) {
			player.withdraw(cost);
			this.game.bank.deposit(cost);

			this.owner = player;
		}
	}

	/**
	 * Auctions the property to the highest bidder.
	 */
	auction() {
		let highestBidder = null;
		let highestBid = 0;
		let duplicateBids;

		do {
			duplicateBids = false;
			for(let i = 0; i < this.game.players.length; i++) {
				let player = this.game.players[i];

				// eslint-disable-next-line no-undef
				let playerBid = Number(prompt(`${getTokenNameByPlayerId(player.id)}, enter your bid: `));

				while(playerBid !== null && !Number.isInteger(playerBid) || playerBid > player.cash) {
					// eslint-disable-next-line no-undef
					playerBid = Number(prompt(`${getTokenNameByPlayerId(player.id)}, please enter a valid bid: `));
				}
				
				if(playerBid > 0) {
					if(playerBid > highestBid) {
						duplicateBids = false;
						highestBidder = player;
						highestBid = playerBid;
					} else if(playerBid == highestBid) {
						duplicateBids = true;
					}
				}
			}
		} while(duplicateBids);

		if(highestBidder !== null) {
			this.purchase(highestBidder, highestBid);
		}
	}
}

export default Purchasable;