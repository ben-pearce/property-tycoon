import Phaser from "phaser";
import Tile from "./tile";


class Go extends Tile {
	constructor(game, options) {
		super(game, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", "go");

		this.text.setVisible(false);
		this.add(graphic);
	}

	onPassed(player) {
		super.onPassed(player);

		// action: "Collect £200",
	}

	onLanded(player) {
		super.onLanded(player);

	}
}

export default Go;