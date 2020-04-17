import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";

class Purchasable extends Tile {
	/**
	 * All "purchasable" tiles inherit this class.
	 * 
	 * This includes:
	 *  * Rentable/Upgradable properties
	 *  * Stations
	 *  * Utilities
	 */
	constructor(game, options) {
		super(game, options);

		this.cost = options.cost;

		let string = `$${this.cost}`;

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
	 * i.e. this.cost.
	 * 
	 * @returns {Integer} The value of this property.
	 */
	getValue() {
		return this.cost;
	}
}

export default Purchasable;