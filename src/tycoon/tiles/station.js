import Phaser from "phaser";
import Purchasable from "./purchasable";

/**
 * Represents a station tile.
 * 
 * @memberof Tiles
 * @extends Purchasable
 */
class Station extends Purchasable {
	/**
	 * Adds the station graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", "station");
		
		this.add(graphic);
	}

	/**
	 * Offer player purchase or charge rent.
	 * 
	 * @param {Player} player The player to charge or offer sale.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);

		// owner has 1 station, rent = £25
		// owner has 2 station, rent = £50
		// owner has 3 station, rent = £100
		// owner has 4 station, rent = £200
	}
}

export default Station;