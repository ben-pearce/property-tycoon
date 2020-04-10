import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";


/**
 * All "purchasable" tiles inherit this class.
 * 
 * This includes:
 *  * Rentable/Upgradable properties
 *  * Stations
 *  * Utilities
 */
class Purchasable extends Tile {
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
}

export default Purchasable;