import Phaser from "phaser";
import Card from "./card";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Button from "../ui/button";
import {CardStyle} from "../../styles";

/**
 * Represents a graphical rentable tile card. Provides
 * Purchase, Auction, Mortgage and Sell buttons. These
 * buttons will show conditionally depending on the state
 * of the tile they belong to.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} buyButton The button instance that represents "Buy".
 * @property {Button} auctionButton The button instance that represents "Auction".
 * @property {Button} mortgageButton The button instance that represents "Mortgage".
 * @property {Button} sellButton The button instance that represents "Sell".
 */
class RentableCard extends Card {
	/**
	 * Creates a colored box to represent rentable group,
	 * a title, price and four action buttons.
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

		let color = new RoundRectangle(this.scene, 0, -250, 380, 80, 15, tile.color);
		color.setStrokeStyle(3, 0x000000);

		let title = new Phaser.GameObjects.Text(this.scene, 0, -250, tile.name, CardStyle);
		title.setPosition(title.x - (title.width /2), title.y - (title.height / 2)).setStyle({color: "#FFFFFF"});

		let price = new Phaser.GameObjects.Text(this.scene, -190, -190, `Price £${tile.cost}`, CardStyle);
		
		this.buyButton = new Button(this.scene, -190, 180, 380, 50, "Purchase", 0x17B70F);
		this.auctionButton = new Button(this.scene, -190, 240, 380, 50, "Auction", 0xEBA417);
        
		this.add([color, title, price, this.buyButton, this.auctionButton]);
	}
}

export default RentableCard;