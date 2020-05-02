import Phaser from "phaser";
import Tile from "./tile";
import JailCard from "../cards/jailCard";
import Parking from "./parking";

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
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.text.setVisible(false);

		const x = this.background.x + (this.background.width / 3);
		const y = this.background.y + (this.background.height / 3);
		const graphic = new Phaser.GameObjects.Sprite(this.scene, x, y, "tiles", "jail");

		const jailHeight = this.background.height * 0.70;
		const jailWidth = this.background.width * 0.70;
		const jailPlatform = new Phaser.GameObjects.Rectangle(this.scene, this.x, this.y, jailHeight, jailWidth, 0xF7941D);
		jailPlatform.setOrigin(0).setStrokeStyle(3, 0x000000);

		this.add([jailPlatform, graphic]);
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

	/**
	 * Landing on the Jail tile does nothing unless
	 * the player is set to be jailed, in which case, ask them
	 * to pay fee or go to jail and miss rounds.
	 * 
	 * @param {Player} player The player to charge or Jail.
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 * @override
	 */
	onLanded(player, cb=null) {
		if(player.isJailed) {
			const jailCard = new JailCard(this.scene, this.game, player);
			jailCard.stayButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(cb);
			});
	
			jailCard.leaveButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(() => {
					let parkingTile = this.game.board.getSingletonTileByType(Parking);
					player.withdraw(50);
					parkingTile.pay(50);
					player.unjail(cb);
				});
			});
	
			if(player.getOutOfJailCard !== null) {
				let [getOutOfJailCard, cardDeck] = player.getOutOfJailCard;
				cardDeck.push(getOutOfJailCard);
				player.getOutOfJailCard = null;
				player.unjail(cb);
			} else {
				this.game.prompt.showWithAnim(jailCard);
			}
		} else if(this.players.indexOf(player) == -1) {
			this.game.nextPlayer();
		}
		super.onLanded(player);
	}
}

export default Jail;