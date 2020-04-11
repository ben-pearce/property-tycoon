import Phaser from "phaser";
import Tile from "./tile";

class Jail extends Tile {
	constructor(game, options) {
		super(game, options);

		this.text.setVisible(false);

		this.jailPlatform = new Phaser.GameObjects.Rectangle(
			this.board.scene, 
			this.x, this.y, 
			this.background.height * 0.70, this.background.width * 0.70,
			0xf7941d
		);
		this.jailPlatform.setOrigin(0);
		this.jailPlatform.setStrokeStyle(3, 0x000000);
		this.add(this.jailPlatform);
	}

	getPlayerJailXY() {
		this.posRange = [
			[-0.3, 0.4],
			[0, 0],
			[0, 0.4],
			[0, 0.2],
			[-0.3, 0],
			[-0.3, 0.2]
		];

		return super.getPlayerXY();
	}

	getPlayerVisitingXY() {
		this.posRange = [
			[-0.3, -0.3],
			[0.3, -0.3],
			[0.3, 0.3],
			[-0.1, -0.3],
			[0.1, -0.3],
			[0.3, 0],
			
		];

		return super.getPlayerXY();
	}

	getPlayerXY() {
		return this.getPlayerVisitingXY();
	}
}

export default Jail;