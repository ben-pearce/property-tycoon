import Phaser from "phaser";

class Property extends Phaser.GameObjects.Rectangle {
	/**
	 * This class represents a property. 
	 * 
	 * Properties have several ranks:
	 * 	- unimproved
	 * 	- 1 house
	 * 	- 2 houses
	 * 	- 3 houses
	 * 	- 4 houses
	 * 	- hotel
	 * @param {Tile} tile The tile this property belongs to
	 * @param {string} color The background color hex code
	 */
	constructor(tile, color) {
		super(tile.scene, 
			tile.background.x, 
			tile.background.y, 
			tile.background.width, 
			20, color);
		this.tile = tile;

		this.setStrokeStyle(3, 0x00000);
		this.setOrigin(0);
	}
}

export default Property;