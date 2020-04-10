import Purchasable from "./purchasable";

class Utility extends Purchasable {
	constructor(game, options) {
		super(game, options);

		this.text.setY(this.y + 10);
	}
}

export default Utility;