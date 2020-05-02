import Phaser from "phaser";

/**
 * This class represents an upgradable property. Rentable
 * tiles will reference this class to give players a visual
 * representation and record of the property associated with 
 * the tile.
 * 
 * @extends Phaser.GameObjects.Rectangle
 * 
 * @property {Phaser.GameObjects.Sprite} houseGraphic The upgrade sprite.
 * @property {integer} houses The number of houses on the property.
 * @property {boolean} isHotel Is this property a hotel or not.
 * @property {boolean} isUpgraded Has this property been upgraded.
 */
class Property extends Phaser.GameObjects.Rectangle {
	/**
	 * Creates a colored rectangle and house graphic to
	 * indicate the upgrade level.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Tile} tile The tile this property belongs to
	 * @param {string} color The background color hex code
	 */
	constructor(scene, tile, color) {
		super(scene, tile.background.x, tile.background.y, tile.background.width, 20, color);
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
	 * Returns true if property can be downgraded further.
	 * 
	 * @returns {boolean} Can this property be downgraded?
	 */
	isDowngradable() {
		return this.houses > 0;
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
	 * (note this does NOT return the total value of the 
	 * property, use Rentable.getValue() for that.)
	 * 
	 * @returns {integer} The value of all the upgrades.
	 */
	getValue() {
		const value = this.houses * this.tile.upgradeCost;
		if(this.isHotel) {
			return value + (this.tile.upgradeCost * 4);
		}
		return value;
	}

	/**
	 * Gets the cost of upgrading this property to
	 * the next level.
	 * 
	 * @returns {integer} The cost of upgrading.
	 */
	getUpgradeCost() {
		if(this.houses < 4) {
			return this.tile.upgradeCost;
		} else if(!this.isHotel) {
			return this.tile.upgradeCost * 4;
		}
		return 0;
	}

	/**
	 * Gets the value for the property level currently on the
	 * tile.
	 * 
	 * If property cannot be downgraded will return 0.
	 */
	getDowngradeValue() {
		if(this.houses <= 4 && !this.isHotel && this.houses > 0) {
			return this.tile.upgradeCost;
		} else if (this.isHotel) {
			return this.tile.upgradeCost * 4;
		}
		return 0;
	}

	/**
	 * This returns the "upgrade level" of this
	 * property as a number. AKA the number of times
	 * upgrade() has been used successfully.
	 * 
	 * No upgrades -> 0
	 * 1 House -> 1
	 * ...
	 * Hotel -> 5
	 * 
	 * @returns {integer} The upgrade level of this property as a number.
	 */
	getUpgradeAsNumber() {
		return this.houses + (this.isHotel ? 1 : 0);
	}

	/**
	 * Downgrades this property to the previous stage.
	 * 
	 * @param {?Property~animationCallback} [cb=null] This will be called after any 
	 * animation has completed.
	 */
	downgrade(cb=null) {
		if(this.houses === 4 && this.isHotel) {
			this.isHotel = false;
		} else if(this.houses <= 4 && this.houses > 0) {
			this.houses--;
			if(this.houses === 0) {
				this.isUpgraded = false;
			}
		}
		this._update(cb);
	}

	/**
	 * Called to upgrade the property to the next stage.
	 * 
	 * @param {?Property~animationCallback} [cb=null] This will be called after any 
	 * animation has completed.
	 */
	upgrade(cb=null) {
		if(this.houses < 4) {
			this.houses++;
		} else if(this.houses === 4 && !this.isHotel) {
			this.isHotel = true;
		}

		this.isUpgraded = true;
		this._update(cb);
	}

	/**
	 * Resets a property back to it original state without
	 * any upgrades. Used when selling property.
	 * 
	 * @param {?Property~animationCallback} [cb=null] This will be called after any 
	 * animation has completed.
	 */
	reset(cb=null) {
		this.houses = 0;
		this.isHotel = false;

		this.isUpgraded = false;
		this._update(cb);
	}

	/**
	 * Creates a easing effect on the graphic when a property is
	 * upgraded and invokes a callback if supplied.
	 * 
	 * Will not do anything after property is upgraded to hotel
	 * but will still perform tween so it is best to check
	 * this.isUpgradable() before calling this.
	 * 
	 * @param {?Property~animationCallback} [cb=null] This will be called after any 
	 * animation has completed.
	 * @private
	 */
	_update(cb=null) {
		const frame = this.houses <= 4 && !this.isHotel ? `house${this.houses}` : "hotel";
		const timeline = this.scene.tweens.createTimeline();

		if(this.houseGraphic.visible) {
			const hideTween = {
				targets: this.houseGraphic,
				ease: "Back.easeIn",
				scale: 0,
				onComplete: () => {
					if(this.houses > 0) {
						this.houseGraphic.setFrame(frame);
					} else {
						this.houseGraphic.setVisible(false);
						if(typeof cb === "function") {
							cb();
						}
					}
				}
			};
			timeline.add(hideTween);
		}

		if(!this.houseGraphic.visible && this.houses > 0) {
			this.houseGraphic.setScale(0);
			this.houseGraphic.setVisible(true);
			this.houseGraphic.setFrame(frame);
		}

		if(this.houses > 0) {
			const showTween = {
				targets: this.houseGraphic,
				ease: "Back.easeOut",
				scale: 1
			};
			timeline.add(showTween);
	
			if(typeof cb === "function") {
				timeline.setCallback("onComplete", cb);
			}
		}

		timeline.play();
	}
}

/**
 * This callback is invoked once animations complete.
 * @callback Property~animationCallback
 */

export default Property;