/**
 * @file Contains all the functions that will be used to make all
 * computer decisions.
 */

import Rentable from "./tiles/rentable";
import Purchasable from "./tiles/purchasable";

/**
 * Determines whether or not a computer should
 * purchase a property.
 * 
 * @param {Purchasable} purchasable The purchasable item.
 * @param {Player} player The player who can purchase.
 * @param {Object} purchaseVal The value to return if decision is made to purchase.
 * @param {Object} auctionVal The value to return if decision is made auction.
 * 
 * @returns {Object} Either purchaseVal or auctionVal depending on the decision made.
 */
function getPurchaseDecision(purchasable, player, purchaseVal, auctionVal) {
	const shouldPurchase = Math.random() > 0.5 && player.cash > purchasable.cost;
	return shouldPurchase? purchaseVal : auctionVal;
}

/**
 * Determines how much, if at all, a computer player should 
 * bid for a property.
 * 
 * @param {Purchasable} purchasable The purchasable item.
 * @param {Player} player The player who can bid.
 * 
 * @returns {integer} How much the player should bid.
 */
function getBidDecision(purchasable, player) {
	const maxBid = Math.random() > 0.5 ? Math.min(player.cash, purchasable.cost) : 0;
	return Math.floor(Math.random() * maxBid);
}

/**
 * Determines whether or not a computer player should
 * bail themselves out of Jail.
 * 
 * @param {Player} player The player who has been jailed.
 * @param {Object} bailVal The value to return if decision is made to pay bail.
 * @param {Object} stayVal The value to return if decision is made to stay.
 * 
 * @returns {Object} Either bailVal or stayVal depending on the decision made.
 */
function getJailDecision(player, bailVal, stayVal) {
	const shouldBail = Math.random() > 0.5 && player.cash >= 50;
	return shouldBail? bailVal : stayVal;
}

/**
 * Determines whether or not a computer player should 
 * pay a fine or pick up a card, when given the option.
 * 
 * @param {Player} player The player who has been given a fine card.
 * @param {integer} fine The fine amount.
 * @param {Object} fineVal The value to return if decision is made to pay the fine.
 * @param {Object} cardVal The value to return if decision is made to take a card.
 * 
 * @returns {Object} Either fineVal or cardVal depending on the decision made.
 */
function getFineDecision(player, fine, fineVal, cardVal) {
	const shouldPay = Math.random() > 0.5 && player.cash >= fine;
	return shouldPay? fineVal : cardVal;
}

/**
 * Gets the tiles the computer player should upgrade
 * when given the option.
 * 
 * @param {Player} player The player who has been given the chance to upgrade.
 * 
 * @returns {Tile[]} The list of tiles to upgrade.
 */
function getTilesToUpgrade(player) {
	// get all player owned tiles
	const ownedTiles = player.game.board.getTilesOwnedByPlayer(player, Rentable);
	// from player owned tiles, get the ones that can be upgraded
	let upgradableTiles = ownedTiles.filter(tile => tile.isUpgradable());
	// order the upgradable tiles from highest value to lowest
	upgradableTiles = upgradableTiles.sort((firstTile, secondTile) => firstTile.getValue() - secondTile.getValue());
	// from upgradable tiles, get the ones where upgrade cost is less than 10% of the players cash
	const affordableTiles = upgradableTiles.filter(tile => tile.property.getUpgradeCost() <= player.cash * 0.1);
	// return the top 3 affordable tiles
	return affordableTiles.slice(0, 3);
}

/**
 * Gets the tiles that should be sold in the event that
 * a player has a debt to pay off.
 * 
 * @param {Player} player The player who is in debt.
 * 
 * @returns {Tile[]} The list of tiles to sell.
 */
function getTilesToSell(player) {
	// get all player owned tiles
	const ownedTiles = player.game.board.getTilesOwnedByPlayer(player, Purchasable);
	// sort tiles by their upgrade level
	const upgradeSorted = ownedTiles.sort((firstTile, secondTile) => {
		if(firstTile.property === undefined) {
			return 1;
		} else if(secondTile.property === undefined) {
			return -1;
		} else {
			return firstTile.property.getUpgradeAsNumber() - secondTile.property.getUpgradeAsNumber();
		}
	});

	return upgradeSorted;
}

export {
	getPurchaseDecision,
	getBidDecision,
	getJailDecision,
	getFineDecision,
	getTilesToUpgrade,
	getTilesToSell
};