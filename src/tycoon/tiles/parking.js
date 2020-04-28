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
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", "parking");
		
		this.text.setVisible(false);
		this.add(graphic);

		this.cash = 0;
	}

	/**
	 * This pays a fee (deposits) cash onto this
	 * Free Parking tile.
	 * 
	 * @param {integer} fee The fee total being deposited.
	 * @fires Tiles.Parking#fee
	 */
	pay(fee) {
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

		this.game.nextPlayer();
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