import Phaser from "phaser";
import Purchasable from "./purchasable";
import StationCard from "../cards/stationCard";

/**
 * Represents a station tile.
 * 
 * @memberof Tiles
 * @extends Purchasable
 */
class Station extends Purchasable {
	/**
	 * Adds the station graphic to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", "station");
		
		this.add(graphic);
	}

	/**
	 * Offer player purchase or charge rent.
	 * 
	 * @param {Player} player The player to charge or offer sale.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);
		if(this.owner !== null && player !== this.owner) {
			let ownedStations = this.board.getTilesOwnedByPlayer(this.owner, Station);
			let rentCharged = [25, 50, 100, 200][ownedStations.length - 1];

			player.withdraw(rentCharged);
			this.owner.deposit(rentCharged);
			this.game.nextPlayer();
		} else if(this.owner === null && player.hasPassedGo) {
			let stationCard = new StationCard(this.game, this, player);
			stationCard.buyButton.setEnabled(player.cash > this.cost);
			stationCard.buyButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(() => {
					this.purchase(player);
					this.game.nextPlayer();
				});
			});
			stationCard.auctionButton.on("pointerup", () => {
				this.game.prompt.closeWithAnim(() => {
					this.auction();
					this.game.nextPlayer();
				});
			});
			this.game.prompt.showWithAnim(stationCard);
		} else {
			this.game.nextPlayer();
		}
	}
}

export default Station;