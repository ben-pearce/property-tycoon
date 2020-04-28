import Phaser from "phaser";
import Card from "./card";
import Button from "../ui/button";
import {CardStyle} from "../../styles";
import {Buttons} from "../../enums";

/**
 * Represents a graphical purchasable tile card.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} buyButton The button instance that represents "Buy".
 * @property {Button} auctionButton The button instance that represents "Auction".
 * 
 * @property {Button} upgradeButton The button instance that represents "Upgrade".
 * @property {Button} mortgageButton The button instance that represents "Mortgage".
 * @property {Button} unmortgageButton The button instance that represents "Unmortgage".
 * @property {Button} sellButton The button instance that represents "Sell".
 * @property {Button} sellUpgradeButton The button instance that represents "Sell House".
 * @property {Button} continueButton The button instance that represents "Continue".
 */
class PurchasableCard extends Card {
	/**
	 * Creates four action buttons for Buy, Auction, Morgage and Sell.
	 * 
	 * The four action buttons will be shown/hidden conditionally.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Tile} tile The tile instance to observe.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(scene, game, tile, player) {
		super(scene, game);

		this.player = player;
		this.tile = tile;
		let price = new Phaser.GameObjects.Text(this.scene, -187, -190, `Price   .......................  £${tile.cost}`, CardStyle);

		this.title = new Phaser.GameObjects.Text(this.scene, 0, -250, tile.name, CardStyle);
		this.title.setPosition(this.title.x - (this.title.width /2), this.title.y - (this.title.height / 2));
		
		this.buyButton = new Button(this.scene, -190, 180, 380, 50, "Purchase", Buttons.GREEN);
		this.auctionButton = new Button(this.scene, -190, 240, 380, 50, "Auction", Buttons.AMBER);

		this.mortgageButton = new Button(this.scene, -190, 120, 380, 50, `Mortgage (+£${tile.getMortgageValue()})`, Buttons.RED);
		this.unmortgageButton = new Button(this.scene, -190, 120, 380, 50, `Unmortgage (-£${tile.getValue()})`, Buttons.GREEN);
		this.mortgageButton.setVisible(!tile.isMortgaged);
		this.unmortgageButton.setVisible(tile.isMortgaged);

		this.sellButton = new Button(this.scene, -190, 180, 380, 50, `Sell (+£${tile.getValue()})`, Buttons.RED);
		this.continueButton = new Button(this.scene, -190, 240, 380, 50, "Continue", Buttons.AMBER);

		this.buyButton.setEnabled(false);
		this.auctionButton.setEnabled(false);

		this.mortgageButton.setEnabled(false);
		this.unmortgageButton.setEnabled(false);
		this.sellButton.setEnabled(false);
		this.continueButton.setEnabled(false);

		this.add([this.title, price]);
		if(tile.owner === null) {
			this.add([this.buyButton, this.auctionButton]);	
		} else {
			this.add([this.mortgageButton, this.unmortgageButton, this.sellButton, this.continueButton]);
		}
	}
}

export default PurchasableCard;