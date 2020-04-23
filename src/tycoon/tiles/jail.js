import Phaser from "phaser";
import Tile from "./tile";

/**
 * This class represents the Jail tile.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Jail extends Tile {
	/**
	 * Adds the Jail graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.text.setVisible(false);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 3), 
			this.background.y + (this.background.height / 3), 
			"tiles", "jail");

		this.jailPlatform = new Phaser.GameObjects.Rectangle(
			this.board.scene, 
			this.x, this.y, 
			this.background.height * 0.70, this.background.width * 0.70,
			0xf7941d
		);
		this.jailPlatform.setOrigin(0);
		this.jailPlatform.setStrokeStyle(3, 0x000000);
		this.add([this.jailPlatform, graphic]);
	}

	/**
	 * Gets XY coordinates for the player to move to if 
	 * they have been jailed.
	 * 
	 * @returns {integer[]} The coordinates for player to move to.
	 */
	getPlayerJailXY() {
		this.posRange = [
			[-0.3, 0.4],
			[0, 0],
			[0, 0.4],
			[0, 0.2],
			[-0.3, 0],
			[-0.3, 0.2]
		];

		return super.getPlayerXY();
	}

	/**
	 * Gets XY coordinates for the player to move to if
	 * they are just visiting jail.
	 * 
	 * @returns {integer[]} The coordinates for player to move to.
	 */
	getPlayerVisitingXY() {
		this.posRange = [
			[-0.3, -0.3],
			[0.3, -0.3],
			[0.3, 0.3],
			[-0.1, -0.3],
			[0.1, -0.3],
			[0.3, 0],
			
		];

		return super.getPlayerXY();
	}

	/**
	 * Wraps {@link Jail#getPlayerVisitingXY}.
	 * 
	 * @override
	 * @returns {integer[]} The coordinates for player to move to.
	 */
	getPlayerXY() {
		return this.getPlayerVisitingXY();
	}
}

export default Jail;