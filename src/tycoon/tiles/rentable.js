import Purchasable from "./purchasable";
import Property from "../property";

/**
 * Represents a Rentable tile.
 * 
 * @memberof Tiles
 * @extends Purchasable
 * 
 * @property {Color} color The color group this property belongs to.
 * @property {integer} rent The price of rent for each upgrade.
 */
class Rentable extends Purchasable {
	constructor(game, options) {
		super(game, options);

		this.property = new Property(this, options.color);
		this.add([this.property, this.property.houseGraphic]);
	}

	/**
	 * This overrides Purchasable.getValue(). It must override
	 * it because rentable properties can be upgraded, this means
	 * their value can change as the game progresses.
	 * 
	 * It calls upon Property.getValue() and adds it to the existing
	 * value (the purchase price) of the property.
	 * 
	 * @returns {Integer} The total value of this property plus
	 * any upgrade value.
	 */
	getValue() {
		return this.cost + this.property.getValue();
	}
}

export default Rentable;