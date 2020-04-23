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
	/**
	 * Adds a property to the tile.
	 * 
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(board, config) {
		super(board, config);

		this.color = config.color;
		this.rent = config.rent;

		this.property = new Property(this, config.color);
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

	/**
	 * This returns the cost of rent for a property. If the
	 * property is not owned by anyone this will return 0.
	 * 
	 * Cost will depend on the number of times the property has
	 * been upgraded.
	 * 
	 * @returns {integer} The cost of rent.
	 */
	getRent() {
		if(this.owner !== null) {
			return this.rent[this.property.getUpgradeAsNumber()];
		}
		return 0;
	}

}

export default Rentable;