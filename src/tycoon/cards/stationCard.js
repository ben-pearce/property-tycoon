import Phaser from "phaser";
import PurchasableCard from "./purchasableCard";
import {CardStyle} from "../../styles";

/**
 * Represents a graphical station tile card,
 * 
 * @extends Card
 * @memberof Cards
 */
class StationCard extends PurchasableCard {
	/**
	 * Creates a title and price.
	 * 
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Tile} tile The tile instance to observe.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(game, tile, player) {
		super(game, tile, player);

		let title = new Phaser.GameObjects.Text(this.scene, 0, -250, tile.name, CardStyle);
		title.setPosition(title.x - (title.width /2), title.y - (title.height / 2));

		let price = new Phaser.GameObjects.Text(this.scene, -190, -190, `Price £${tile.cost}`, CardStyle);
        
		this.add([title, price]);
	}
}

export default StationCard;