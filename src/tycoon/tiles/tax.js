import Tile from "./tile";

class Tax extends Tile {
	constructor(game, options) {
		super(game, options);

		this.cost = options.cost;
		this.text.setY(this.y + 10);
	}

	onLanded(player) {
		super.onLanded(player);

		// action: "Pay cost",
	}
}

export default Tax;