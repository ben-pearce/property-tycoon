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
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.cost = config.cost;

		const x = this.background.x + (this.background.width / 2);
		const y = this.background.y + (this.background.height / 2) + 10;
		const graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", config.graphic);

		this.text.setY(this.y + 10);
		this.add(graphic);
	}

	/**
	 * Offer player purchase or charge rent.
	 * 
	 * If one utility owned, rent is 4 times dice result.
	 * If both utilities owned, rent is 10 times dice result.
	 * 
	 * @param {Player} player The player to charge or offer sale.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);

		if(this.owner !== null && player !== this.owner && !this.isMortgaged && !this.owner.isJailed) {
			const ownedUtilities = this.board.getTilesOwnedByPlayer(this.owner, Utility);
			if(ownedUtilities.length > 0) {
				const [diceOne, diceTwo] = this.game.dice.result;
				const rentCharged = [(diceOne + diceTwo) * 4, (diceOne + diceTwo) * 10][ownedUtilities.length - 1];

				player.charge(rentCharged, this.owner, () => this.game.showSaleInterface(player));
			} else {
				this.game.showSaleInterface(player);
			}
		} else if(this.owner !== null && player !== this.owner && this.isMortgaged) {
			this.game.showSaleInterface(player);
		}
	}
}

export default Utility;