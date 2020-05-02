import Phaser from "phaser";
import Tile from "./tile";

/**
 * This class represents Cop or "Go To Jail" tile on
 * the board.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Cop extends Tile {
	/**
	 * Adds the cop graphic to the tile.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile is part of.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		const x = this.background.x + (this.background.width / 2);
		const y = this.background.y + (this.background.height / 2);
		const graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", "cop");
		
		this.text.setVisible(false);
		this.add(graphic);
	}
	
	/**
	 * Sends a player to jail and sets their state
	 * to jail.
	 * 
	 * @param {Player} player The player to send to jail.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);
		player.jail(() => this.game.nextPlayer());
	}
}

export default Cop;