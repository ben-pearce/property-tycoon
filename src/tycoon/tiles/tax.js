import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";

class Tax extends Tile {
	constructor(game, options) {
		super(game, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", options.graphic);

		this.cost = options.cost;
		this.text.setY(this.y + 10);

		let string = `Pay $${this.cost}`;

		let costText = new Phaser.GameObjects.Text(this.board.scene, this.x, this.y + 80, string, CashTextStyle);
		costText.setStyle({
			fixedWidth: this.background.width,
		});

		this.add([graphic, costText]);
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Pay cost",
	}
}

export default Tax;