import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";

/**
 * This represents a Tax or Super Tax tile.
 * 
 * @memberof Tiles
 * @extends Tile
 * 
 * @property {integer} cost The amount of tax to be paid.
 */
class Tax extends Tile {
	/**
	 * Adds tax graphic and price text to the tile.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		const x = this.background.x + (this.background.width / 2);
		const y = this.background.y + (this.background.height / 2);
		const graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", config.graphic);

		this.cost = config.cost;
		this.text.setY(this.y + 10);

		const string = `Pay £${this.cost}`;

		const costText = new Phaser.GameObjects.Text(this.board.scene, this.x, this.y + 80, string, CashTextStyle);
		costText.setStyle({
			fixedWidth: this.background.width,
		});

		this.add([graphic, costText]);
	}

	/**
	 * Withdraws tax fee from player and deposits fee
	 * onto the Free Parking tile.
	 * 
	 * @param {Player} player The player to charge tax on.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);

		player.withdraw(this.cost);
		this.game.bank.deposit(this.cost);

		this.game.nextPlayer();
	}
}

export default Tax;