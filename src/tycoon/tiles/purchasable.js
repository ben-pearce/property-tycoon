import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";

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
	 */
	purchase(player) {
		if(this.owner === null && player.cash > this.cost) {
			player.withdraw(this.cost);
			this.game.bank.deposit(this.cost);

			this.owner = player;
		}
	}
}

export default Purchasable;