import Card from "./card";
import Button from "../ui/button";

/**
 * Represents a graphical purchasable tile card.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} buyButton The button instance that represents "Buy".
 * @property {Button} auctionButton The button instance that represents "Auction".
 * @property {Button} mortgageButton The button instance that represents "Mortgage".
 * @property {Button} sellButton The button instance that represents "Sell".
 */
class PurchasableCard extends Card {
	/**
	 * Creates four action buttons for Buy, Auction, Morgage and Sell.
	 * 
	 * The four action buttons will be shown/hidden conditionally.
	 * 
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Tile} tile The tile instance to observe.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(game, tile, player) {
		super(game, tile);

		this.player = player;
		this.tile = tile;
        
		this.buyButton = new Button(this.scene, -190, 180, 380, 50, "Purchase", 0x17B70F);
		this.auctionButton = new Button(this.scene, -190, 240, 380, 50, "Auction", 0xEBA417);
        
		this.add([this.buyButton, this.auctionButton]);
	}
}

export default PurchasableCard;