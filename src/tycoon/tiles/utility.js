import Phaser from "phaser";
import Purchasable from "./purchasable";

/**
 * This represents a Utility tile like Water or Eletricity.
 * 
 * @memberof Tiles
 * @extends Purchasable
 */
class Utility extends Purchasable {
	/**
	 * Adds a utility graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.cost = config.cost;

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", config.graphic);

		this.text.setY(this.y + 10);
		this.add(graphic);
	}
}
}

export default Utility;