import Phaser from "phaser";
import Tile from "./tile";


class Opportunity extends Tile {
	constructor(game, options) {
		super(game, options);

		this.text.setStyle({fontSize: "8px"});
		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 15, 
			"tiles", options.graphic);
		this.add(graphic);
		
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Take card",
	}
}

export default Opportunity;