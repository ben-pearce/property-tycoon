import Phaser from "phaser";
import Tile from "./tile";

/**
 * This class represents an Opportunity Knocks tile.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Opportunity extends Tile {
	/**
	 * Adds the opportunity graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.text.setStyle({fontSize: "8px"});
		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 15, 
			"tiles", config.graphic);
		this.add(graphic);
		
	}

	/**
	 * Shows the card and performs action once player
	 * has pressed continue button.
	 * 
	 * @param {Player} player The player to perform the action upon.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);

		// action: "Take card",
		console.log(this.game.opportunityCards);
	}
}

export default Opportunity;