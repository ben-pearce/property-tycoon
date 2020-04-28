import Purchasable from "./purchasable";
import Property from "../property";
import RentableCard from "../cards/rentableCard";

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
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.color = config.color;
		this.upgradeCost = config.upgrade;
		this.rent = config.rent;

		this.cardType = RentableCard;

		this.property = new Property(this.scene, this, config.color);
		this.add([this.property, this.property.houseGraphic]);
	}

	/**
	 * Value can change as the game progresses.
	 * 
	 * Calls upon Property.getValue() and adds it to the existing
	 * value (the purchase price) of the property.
	 * 
	 * @returns {integer} The total value of this property plus
	 * any upgrade value.
	 * @override
	 */
	getValue() {
		let value = this.cost + this.property.getValue();
		if(this.isMortgaged) {
			return value / 2;
		}
		return value;
	}

	/**
	 * Returns the mortgage value of this property. 
	 * 
	 * If this property has been upgraded, this will return 0.
	 * 
	 * @returns {integer} The mortgage value of this property.
	 * @override
	 */
	getMortgageValue() {
		if(this.property.isUpgraded) {
			return 0;
		}
		return super.getMortgageValue();
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

	/**
	 * Calls property sell and resets the upgradable property
	 * state.
	 */
	sell() {
		if(this.owner !== null) {
			super.sell();
			this.property.reset();
		}
	}

	/**
	 * Returns whether or not this tile is upgradable but subject to
	 * the constraint that it may only be upgraded if the owner owns
	 * all the properies in the same colored group as this one and that
	 * there must never be a difference of one house per group.s
	 * 
	 * @returns {boolean} Can the property be upgraded or not.
	 */
	isUpgradable() {
		let monopolyOwner = this.board.getMonopolyOwner(this);
		let isMonopoly = monopolyOwner !== null;

		if(isMonopoly) {
			let colorMatchingTiles = this.board.getRentableTilesByColor(this.color);
			let upgradeCounts = colorMatchingTiles.map(tile => tile.property.getUpgradeAsNumber());
			let minUpgradeCount = Math.min(...upgradeCounts);
			let upgradable = this.property.getUpgradeAsNumber() < minUpgradeCount + 1;
			return upgradable && this.property.isUpgradable();
		}
		return false;
	}

	/**
	 * Returns whether or not this tile is downgradable but subject to the 
	 * same constraints that isUpgradable() is subject to.
	 * 
	 * @returns {boolean} Can the property be downgraded or not.
	 */
	isDowngradable() {
		let upgradeCount = this.property.getUpgradeAsNumber();
		if(upgradeCount > 0) {
			let colorMatchingTiles = this.board.getRentableTilesByColor(this.color);
			let upgradeCounts = colorMatchingTiles.map(tile => tile.property.getUpgradeAsNumber());
			let maxUpgradeCount = Math.max(...upgradeCounts);
			let downgradable = this.property.getUpgradeAsNumber() > maxUpgradeCount - 1;
			return downgradable && this.property.isDowngradable();
		}
		return false;
	}

	/**
	 * Upgrades the property on this rentable tile and charges
	 * the player the amount required for the upgrade.
	 */
	upgrade() {
		this.owner.withdraw(this.property.getUpgradeCost());
		this.game.bank.deposit(this.property.getUpgradeCost());
		this.property.upgrade();
	}

	/**
	 * Downgrades the property on this rentable tile and pays
	 * the player the amount the property is valued at.
	 */
	downgrade() {
		this.game.bank.withdraw(this.property.getDowngradeValue());
		this.owner.deposit(this.property.getDowngradeValue());
		this.property.downgrade();
	}

	/**
	 * Registers the additional upgrade buttons in the 
	 * context of the player that is passed in.
	 * 
	 * @param {Player} player The player the buttons should act upon.
	 */
	registerCardButtons(player) {
		super.registerCardButtons(player);
		this.cardInstance.sellButton.setEnabled(!this.property.isUpgraded);
		this.cardInstance.upgradeButton.setEnabled(!this.isMortgaged && player.cash > this.property.getUpgradeCost() && this.isUpgradable());
		this.cardInstance.upgradeButton.on("pointerup", () => {
			this.game.prompt.closeWithAnim(() => {
				this.upgrade();
				this.game.nextPlayer();
			});
		});

		this.cardInstance.sellUpgradeButton.setEnabled(!this.isMortgaged && this.isDowngradable());
		this.cardInstance.sellUpgradeButton.on("pointerup", () => {
			this.game.prompt.closeWithAnim(() => {
				this.downgrade();
				this.game.nextPlayer();
			});
		});
	}

	/**
	 * If the property is owned and player is not the owner,
	 * charge rent.
	 * 
	 * If the property is owned and player is the owner, offer
	 * upgrade, sale or mortgage procedure.
	 * 
	 * @param {Player} player The player to charge or offer sale.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);
		if(this.owner !== null && player !== this.owner && !this.isMortgaged && !this.owner.isJailed) {
			let rentCharged = this.getRent();
			let monopolyOwner = this.game.board.getMonopolyOwner(this);
			if(monopolyOwner !== null) {
				let coloredTiles = this.game.board.getRentableTilesByColor(this.color);
				let totalUpgrades = coloredTiles.reduce((upgrades, tile) => upgrades + tile.property.getUpgradeAsNumber());
				if(totalUpgrades == 0) {
					rentCharged *= 2;
				}
			}
			player.withdraw(rentCharged);
			this.owner.deposit(rentCharged);
			this.game.nextPlayer();
		}
	}
}

export default Rentable;