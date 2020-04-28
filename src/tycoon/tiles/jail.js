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
			let jailCard = new JailCard(this.game, player);
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