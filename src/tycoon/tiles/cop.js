//import Phaser from "phaser";
import Tile from "./tile";


class Cop extends Tile {
	constructor(game, options) {
		super(game, options);
	}
    
	onLanded(player) {
		super.onLanded(player);

		// action: "Go to jail",
	}
}

export default Cop;