import Phaser from "phaser";
import Tile from "./tile";
import ActionCard from "../cards/actionCard";

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
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.text.setStyle({fontSize: "8px"});
		this.text.setY(this.y + 10);

		let x = this.background.x + (this.background.width / 2);
		let y = this.background.y + (this.background.height / 2) + 15;
		let graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", config.graphic);
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

		let opportunityCard = this.game.opportunityCards.shift();
		let actionCard = new ActionCard(this.scene, this.game, opportunityCard, player);
		actionCard.continueButton.on("pointerup", () => {
			this.game.prompt.closeWithAnim(() => {
				opportunityCard.action.do(this.game, player, this.game.nextPlayer.bind(this.game));
				this.game.opportunityCards.push(opportunityCard);
			});
		});
		this.game.prompt.showWithAnim(actionCard);
	}
}

export default Opportunity;