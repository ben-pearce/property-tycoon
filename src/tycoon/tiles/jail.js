import Phaser from "phaser";
import Tile from "./tile";

class Jail extends Tile {
	constructor(game, options) {
		super(game, options);

		this.text.setVisible(false);

		let jailPlatform = new Phaser.GameObjects.Rectangle(
			this.board.scene, 
			this.x, this.y, 
			this.background.height * 0.70, this.background.width * 0.70,
			0xf7941d);
		jailPlatform.setOrigin(0);
		jailPlatform.setStrokeStyle(3, 0x000000);
		this.add(jailPlatform);
	}
}

export default Jail;