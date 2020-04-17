import Phaser from "phaser";
import Tile from "./tile";

class Parking extends Tile {
	constructor(game, options) {
		super(game, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", "parking");
		
		this.text.setVisible(false);
		this.add(graphic);

		this.cash = 0;
	}

	pay(fee) {
		this.cash += fee;

		this.emit("fee", fee);
	}

	collect() {
		this.cash = 0;

		this.emit("collect");
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Collect fines",
	}
}

export default Parking;