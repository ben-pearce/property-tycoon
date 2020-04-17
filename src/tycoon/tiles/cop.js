import Phaser from "phaser";
import Tile from "./tile";


class Cop extends Tile {
	constructor(game, options) {
		super(game, options);

		let graphic = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"tiles", "cop");
		
		this.text.setVisible(false);
		this.add(graphic);
	}
    
	onLanded(player) {
		super.onLanded(player);

		// action: "Go to jail",
	}
}

export default Cop;