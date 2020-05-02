import Phaser from "phaser";
import PurchasableCard from "./purchasableCard";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Button from "../ui/button";
import {CardStyle} from "../../styles";
import {Buttons} from "../../enums";

/**
 * Represents a graphical rentable tile card.
 * 
 * @extends Card
 * @memberof Cards
 */
class RentableCard extends PurchasableCard {
	/**
	 * Creates a colored box to represent rentable group,
	 * a title and price.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Tile} tile The tile instance to observe.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(scene, game, tile, player) {
		super(scene, game, tile, player);
		
		const color = new RoundRectangle(this.scene, 0, -250, 380, 80, 15, tile.color);
		color.setStrokeStyle(3, 0x000000);

		const housePrice = new Phaser.GameObjects.Text(this.scene, -187, -150, `House .......................  £${tile.upgradeCost}`, CardStyle);
		const hotelPrice = new Phaser.GameObjects.Text(this.scene, -187, -110, `Hotel   .......................  £${tile.upgradeCost * 5}`, CardStyle);

		this.upgradeButton = new Button(this.scene, -190, 0, 380, 50, `Upgrade (-£${tile.property.getUpgradeCost()})`, Buttons.GREEN);
		const upgradeCount = tile.property.getUpgradeAsNumber();
		const upgradeName = upgradeCount > 0 ? (upgradeCount > 4 ? "Hotel" : "House") : "Upgrade";

		this.sellUpgradeButton = new Button(this.scene, -190, 60, 380, 50, `Sell ${upgradeName} (+£${tile.property.getDowngradeValue()})`, Buttons.RED);
		this.title.setStyle({color: "#FFFFFF"});

		this.auctionPlayerButton = new Button(this.scene, -190, 60, 380, 50, "Auction to Player", Buttons.RED);

		this.add([color, housePrice, hotelPrice]);
		this.swap(color, this.title);

		if(tile.owner === player) {
			this.add([this.auctionPlayerButton, this.upgradeButton, this.sellUpgradeButton]);
		}
	}
}

export default RentableCard;