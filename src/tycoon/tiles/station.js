import Phaser from "phaser";
import Purchasable from "./purchasable";


class Station extends Purchasable {
	constructor(game, options) {
		super(game, options);

		this.text.setY(this.y + 10);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2) + 10, 
			"tiles", "station");
		
		this.add(graphic);
	}
}

export default Station;