import Phaser from "phaser";
import Purchasable from "./purchasable";

class Utility extends Purchasable {
	constructor(game, options) {
		super(game, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", options.graphic);

		this.text.setY(this.y + 10);
		this.add(graphic);
	}
}

export default Utility;