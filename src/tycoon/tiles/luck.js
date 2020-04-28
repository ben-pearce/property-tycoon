import Phaser from "phaser";
import Tile from "./tile";
import ActionCard from "../cards/actionCard";

/**
 * This class represents a Pot Luck tile.
 * 
 * @extends Tile
 * @memberof Tiles
 */
class Luck extends Tile {
	/**
	 * Adds the chest graphic to the tile.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.text.setY(this.y + 10);

		let x = this.background.x + (this.background.width / 2);
		let y = this.background.y + (this.background.height / 2) + 10;
		let graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", "chest");
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

		let potluckCard = this.game.potluckCards.shift();
		let actionCard = new ActionCard(this.scene, this.game, potluckCard, player);
		actionCard.continueButton.on("pointerup", () => {
			this.game.prompt.closeWithAnim(() => {
				potluckCard.action.do(this.game, player);
				this.game.nextPlayer();
				this.game.potluckCards.push(potluckCard);
			});
		});
		this.game.prompt.showWithAnim(actionCard);
	}
}

export default Luck;