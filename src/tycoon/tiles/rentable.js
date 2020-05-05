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
		const value = this.cost + this.property.getValue();
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
	 * 
	 * @param {integer} value Overrides the value of this property for this sale only.
	 */
	sell(value) {
		if(this.owner !== null) {
			this.property.reset();
			super.sell(value);
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
		const monopolyOwner = this.board.getMonopolyOwner(this);
		const isMonopoly = monopolyOwner !== null;

		if(isMonopoly) {
			const colorMatchingTiles = this.board.getRentableTilesByColor(this.color);
			const upgradeCounts = colorMatchingTiles.map(tile => tile.property.getUpgradeAsNumber());
			const minUpgradeCount = Math.min(...upgradeCounts);
			const upgradable = this.property.getUpgradeAsNumber() < minUpgradeCount + 1;
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
		const upgradeCount = this.property.getUpgradeAsNumber();
		if(upgradeCount > 0) {
			const colorMatchingTiles = this.board.getRentableTilesByColor(this.color);
			const upgradeCounts = colorMatchingTiles.map(tile => tile.property.getUpgradeAsNumber());
			const maxUpgradeCount = Math.max(...upgradeCounts);
			const downgradable = this.property.getUpgradeAsNumber() > maxUpgradeCount - 1;
			return downgradable && this.property.isDowngradable();
		}
		return false;
	}

	/**
	 * Upgrades the property on this rentable tile and charges
	 * the player the amount required for the upgrade.
	 */
	upgrade() {
		this.property.upgrade();
		this.owner.withdraw(this.property.getUpgradeCost());
		this.game.bank.deposit(this.property.getUpgradeCost());
	}

	/**
	 * Downgrades the property on this rentable tile and pays
	 * the player the amount the property is valued at.
	 */
	downgrade() {
		this.property.downgrade();
		this.game.bank.withdraw(this.property.getDowngradeValue());
		this.owner.deposit(this.property.getDowngradeValue());
	}

	/**
	 * Registers the additional upgrade buttons in the 
	 * context of the player that is passed in.
	 * 
	 * @param {Player} player The player the buttons should act upon.
	 */
	registerCardButtons(player) {
		super.registerCardButtons(player);

		if(!player.isComputer) {
			this.cardInstance.sellButton.setEnabled(!this.property.isUpgraded);

			this.cardInstance.upgradeButton.setEnabled(!this.isMortgaged && player.cash > this.property.getUpgradeCost() && this.isUpgradable());
			this.cardInstance.upgradeButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.upgrade()));
	
			this.cardInstance.sellUpgradeButton.setEnabled(!this.isMortgaged && this.isDowngradable());
			this.cardInstance.sellUpgradeButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.downgrade()));
	
			this.cardInstance.auctionPlayerButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.auction()));
		}
	}

	showCard(player) {
		super.showCard(player);
		this.cardInstance.auctionPlayerButton.setVisible(!this.property.isUpgraded && !this.isMortgaged);
		this.cardInstance.upgradeButton.setVisible(!this.isMortgaged);
		this.cardInstance.sellUpgradeButton.setVisible(this.property.isUpgraded && !this.isMortgaged);
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
			const monopolyOwner = this.game.board.getMonopolyOwner(this);
			if(monopolyOwner !== null) {
				const coloredTiles = this.game.board.getRentableTilesByColor(this.color);
				const totalUpgrades = coloredTiles.reduce((upgrades, tile) => upgrades + tile.property.getUpgradeAsNumber());
				if(totalUpgrades == 0) {
					rentCharged *= 2;
				}
			}
			player.charge(rentCharged, this.owner, () => this.game.showSaleInterface(player));
		}
	}
}

export default Rentable;