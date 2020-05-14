import Phaser from "phaser";
import Tile from "./tile";

/**
 * This class represents the Free Parking tile.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Parking extends Tile {
	/**
	 * Adds the Parking graphic to the tile.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.cash = 0;

		const x = this.background.x + (this.background.width / 2);
		const y = this.background.y + (this.background.height / 2);
		const graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", "parking");
		
		this.text.setVisible(false);
		this.add(graphic);
	}

	/**
	 * This pays a fee (deposits) cash onto this
	 * Free Parking tile.
	 * 
	 * @param {integer} fee The fee total being deposited.
	 * @fires Tiles.Parking#fee
	 */
	deposit(fee) {
		this.cash += fee;

		this.emit("fee", fee);
	}

	/**
	 * Sets the cash deposited on this Free Parking
	 * tile back to 0.
	 * 
	 * @fires Tiles.Parking#collect
	 */
	collect() {
		this.cash = 0;

		this.emit("collect");
	}

	/**
	 * Deposits the cash deposited onto this tile into
	 * the player and calls collect().
	 * 
	 * @param {Player} player The player collecting the cash.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);
		
		if(this.cash > 0) {
			player.deposit(this.cash);
			this.collect();
		}

		this.game.showSaleInterface(player);
	}
}

/**
 * Event fired when a player pays a fee on the
 * Free Parking tile.
 * 
 * @event Tiles.Parking#fee
 * @param {integer} fee The fee paid.
 */

/**
 * Event fired when a player pays a fee on the
 * Free Parking tile.
 * 
 * @event Tiles.Parking#collect
 */

export default Parking;