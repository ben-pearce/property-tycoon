import Tile from "./tile";

class Parking extends Tile {
	constructor(game, options) {
		super(game, options);
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Collect fines",
	}
}

export default Parking;