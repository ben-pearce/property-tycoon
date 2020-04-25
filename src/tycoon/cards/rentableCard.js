import Phaser from "phaser";
import PurchasableCard from "./purchasableCard";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import {CardStyle} from "../../styles";

/**
 * Represents a graphical rentable tile card.
 * 
 * @extends Card
 * @memberof Cards
 */
class RentableCard extends PurchasableCard {
	/**
	 * Creates a colored box to represent rentable group,
	 * a title and price.
	 * 
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Tile} tile The tile instance to observe.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(game, tile, player) {
		super(game, tile, player);
		
		let color = new RoundRectangle(this.scene, 0, -250, 380, 80, 15, tile.color);
		color.setStrokeStyle(3, 0x000000);

		let title = new Phaser.GameObjects.Text(this.scene, 0, -250, tile.name, CardStyle);
		title.setPosition(title.x - (title.width /2), title.y - (title.height / 2)).setStyle({color: "#FFFFFF"});

		let price = new Phaser.GameObjects.Text(this.scene, -190, -190, `Price £${tile.cost}`, CardStyle);
        
		this.add([color, title, price]);
	}
}

export default RentableCard;