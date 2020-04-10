import Phaser from "phaser";
import Tile from "./tile";


class Luck extends Tile {
	constructor(game, options) {
		super(game, options);

		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", "chest");
		this.add(graphic);
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Take card",
	}
}

export default Luck;