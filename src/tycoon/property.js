import Phaser from "phaser";

/**
 * This class represents an upgradable property. Rentable
 * tiles will reference this class to give players a visual
 * representation and record of the property associated with 
 * the tile.
 */
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

		this.houseGraphic = new Phaser.GameObjects.Sprite(
			tile.scene, 
			tile.background.x + (tile.background.width / 2), 
			tile.background.y, 
			"upgrades");
		this.houseGraphic.setVisible(false);

		this.houses = 0;
		this.isHotel = false;
		this.isUpgraded = false;
	}

	/**
	 * Returns true if property can still be upgraded further.
	 * 
	 * @returns {boolean} Can this property be upgraded?
	 */
	isUpgradable() {
		return !this.isHotel;
	}

	/**
	 * This returns the upgrade value of the property.
	 * 
	 * Needed to calculate the total value of a property
	 * after upgrades.
	 * 
	 * The value of the upgrades is calculated by multiplying
	 * the original cost of the property it belongs to by the
	 * number of upgrades made.
	 * 
	 * i.e.
	 * Property original cost = £300
	 * Upgraded to 2 houses = 2 * £300 = £600
	 * Upgraded to hotel = 5 * £300 = £1500
	 * 
	 * (note this does NOT return the total value of the 
	 * property, use Rentable.getValue() for that.)
	 * 
	 * @returns {Integer} The value of all the upgrades.
	 */
	getValue() {
		let value = this.houses * this.tile.cost;
		if(this.isHotel) {
			return value + this.tile.cost;
		}
		return value;
	}

	/**
	 * Called to upgrade the property to the next stage.
	 * 
	 * i.e. 
	 * * 1 house -> 2 houses
	 * * 4 houses -> hotel
	 * 
	 * Creates a easing effect on the graphic when a property is
	 * upgraded and invokes a callback if supplied.
	 * 
	 * Will not do anything after property is upgraded to hotel
	 * but will still perform tween so it is best to check
	 * this.isUpgradable() before calling this.
	 * 
	 * @param {Function} callback This will be called after any 
	 * animation has completed.
	 */
	upgrade(callback=null) {
		let timeline = this.scene.tweens.createTimeline();

		let hideTween = {
			targets: this.houseGraphic,
			ease: "Back.easeIn",
			scale: 0
		};

		if(this.houses < 4) {
			this.houses++;
			this.isUpgraded = true;
		}
		let frame = `house${this.houses}`;
		
		if(this.houses == 4 && !this.isHotel) {
			this.isHotel = true;
			frame = "hotel";
		}

		if(this.houses > 1) {
			Object.assign(hideTween, {
				onComplete: () => this.houseGraphic.setFrame(frame)
			});
			
			timeline.add(hideTween);
		} else {
			this.houseGraphic.setFrame(frame);
			this.houseGraphic.setScale(0);
			this.houseGraphic.setVisible(true);
		}

		timeline.add({
			targets: this.houseGraphic,
			ease: "Back.easeOut",
			scale: 1
		});

		if(callback !== null) {
			timeline.setCallback("onComplete", callback);
		}
		timeline.play();
	}
}

export default Property;