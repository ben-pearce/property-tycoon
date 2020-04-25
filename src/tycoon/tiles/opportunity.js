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

		let opportunityCard = this.game.opportunityCards.shift();
		let actionCard = new ActionCard(this.game, opportunityCard, player);
		actionCard.continueButton.on("pointerup", () => {
			this.game.prompt.closeWithAnim(() => {
				opportunityCard.action.do(this.game, player);
				this.game.nextPlayer();
				this.game.opportunityCards.push(opportunityCard);
			});
		});
		this.game.prompt.showWithAnim(actionCard);
	}
}

export default Opportunity;