import Purchasable from "./purchasable";
import Property from "../property";
import GeneralConfig from "../../general";

class Rentable extends Purchasable {
	constructor(game, options) {
		super(game, options);

		const color = GeneralConfig.groups[options.group];
		this.property = new Property(this, color);
		this.add([this.property, this.property.houseGraphic]);
	}

	onLanded(player) {
		super.onLanded(player);

		this.property.upgrade();
	}
}

export default Rentable;