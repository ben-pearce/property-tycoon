import Phaser from "phaser";
import Tile from "./tile";
import {CashTextStyle} from "../../styles";
import {getTokenNameByPlayerId} from "../utils";
import PurchasableCard from "../cards/purchasableCard";
import {Computer} from "../../enums";
import {getPurchaseDecision, getBidDecision} from "../computer";

/**
 * All "purchasable" tiles inherit this class.
 * 
 * @memberof Tiles
 * @extends Tile
 * 
 * @property {integer} cost The cost of the purchasable.
 * @property {?Player} owner The owner of the purchasable or null.
 * @property {boolean} isMortgaged Is the property mortgaged or not.
 * @property {Type} cardType The type of card to show when landed on.
 * @property {?Card} cardInstance The card instance shown to player.
 */
class Purchasable extends Tile {
	/**
	 * Adds a price text to the tile.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board this tile belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, board, config);

		this.cost = config.cost;
		this.owner = null;
		this.isMortgaged = false;

		this.cardType = PurchasableCard;
		this.cardInstance = null;

		const string = `£${this.cost}`;

		const costText = new Phaser.GameObjects.Text(this.scene, this.x, this.y + 80, string, CashTextStyle);
		costText.setStyle({
			fixedWidth: this.background.width,
		});

		this.mortgagedBox = new Phaser.GameObjects.Rectangle(
			this.scene, 
			this.background.x, 
			this.background.x, 
			this.background.width, 
			this.background.height, 
			0xFF0000, 0.5
		);
		this.mortgagedBox.setOrigin(0).setVisible(false);

		this.add([costText, this.mortgagedBox]);

		this.on("pointerup", () => {
			this.game.board.setTilesActive([]);
			this.showCard(this.owner);
		});
	}

	/**
	 * Returns the total sale value of this
	 * property. Children of this call will simply
	 * have a value equal to the purchase cost.
	 * 
	 * @returns {integer} The value of this property.
	 */
	getValue() {
		if(this.isMortgaged) {
			return this.cost / 2;
		}
		return this.cost;
	}

	/**
	 * Returns the mortgage value of this property. Value with be
	 * half of what the total sale value of this property is, assuming it
	 * is not already mortgaged.
	 * 
	 * If this function is called on a mortgaged property, it will return 0.
	 * 
	 * @returns {integer} The mortgage value of this property.
	 */
	getMortgageValue() {
		return this.isMortgaged ? 0 : this.getValue() / 2;
	}

	/**
	 * Sells this property to the player specified.
	 * 
	 * @param {Player} player The purchasing player.
	 * @param {?integer} [cost=null] Override the cost of this property for this purchase only.
	 */
	purchase(player, cost=null) {
		cost = cost == null ? this.cost : cost;
		if(this.owner === null && player.cash > cost) {
			this.owner = player;

			player.withdraw(cost);
			this.game.bank.deposit(cost);
		} else if(this.owner !== null && player.cash > cost) {
			this.owner = player;

			player.withdraw(cost);
			this.owner.deposit(cost);
		}
	}

	/**
	 * Mortgages this property with the bank. Player
	 * will receive one half the value of the property.
	 */
	mortgage() {
		if(this.owner !== null && !this.isMortgaged) {
			this.isMortgaged = true;
			this.mortgagedBox.setVisible(true);

			this.game.bank.withdraw(this.getValue());
			this.owner.deposit(this.getValue());
		}
	}

	/**
	 * Umortgages this property with the bank. Player
	 * will pay the current value of the property.
	 */
	unmortgage() {
		if(this.owner !== null && this.isMortgaged && this.owner.cash > this.getValue()) {
			this.isMortgaged = false;
			this.mortgagedBox.setVisible(false);

			this.owner.withdraw(this.getMortgageValue());
			this.game.bank.deposit(this.getMortgageValue());
		}
	}

	/**
	 * Sells this property back to the bank for its current
	 * valuation.
	 * 
	 * @param {integer} value Overrides the value of this property for this sale only.
	 */
	sell(value=null) {
		value = value === null ? this.getValue() : value;
		if(this.owner !== null) {
			this.isMortgaged = false;
			this.mortgagedBox.setVisible(false);

			const oldOwner = this.owner;
			this.owner = null;

			if(value > 0) {
				this.game.bank.withdraw(value);
				oldOwner.deposit(value);
			}
		}
	}

	/**
	 * Auctions the property to the highest bidder.
	 */
	auction() {
		let highestBidder = null;
		let highestBid = 0;
		let duplicateBids;

		do {
			duplicateBids = false;
			for(let i = 0; i < this.game.players.length; i++) {
				const player = this.game.players[i];

				if(!player.isJailed && !player.isRetired && this.owner !== player) {
					let playerBid = 0;
					if(player.isComputer) {
						playerBid = getBidDecision(this, player);
					} else {
						// eslint-disable-next-line no-undef
						let playerBid = Number(prompt(`${getTokenNameByPlayerId(player.id)}, enter your bid: `));

						while(playerBid !== null && !Number.isInteger(playerBid) || playerBid > player.cash) {
							// eslint-disable-next-line no-undef
							playerBid = Number(prompt(`${getTokenNameByPlayerId(player.id)}, please enter a valid bid: `));
						}
					}
					
					if(playerBid > 0) {
						if(playerBid > highestBid) {
							duplicateBids = false;
							highestBidder = player;
							highestBid = playerBid;
						} else if(playerBid == highestBid) {
							duplicateBids = true;
						}
					}	
				}
			}
		} while(duplicateBids);

		if(highestBidder !== null) {
			this.purchase(highestBidder, highestBid);
		}
	}

	/**
	 * Registers all the card buttons when a card is
	 * shown for this tile in the context of the player
	 * that is passed in.
	 * 
	 * @param {Player} player The player the buttons should act upon.
	 */
	registerCardButtons(player) {
		if(player.isComputer) {
			this.cardInstance.setEnabled(false);
			if(player === this.owner) {
				setTimeout(() => this.game.prompt.closeWithAnim(), Computer.THINKING_TIMEOUT_MS);
			} else {
				const purchaseDecision = getPurchaseDecision(this, player, () => this.purchase(player), () => this.auction());
				setTimeout(() => this.game.prompt.closeWithAnim(purchaseDecision), Computer.THINKING_TIMEOUT_MS);
			}
		} else {
			this.cardInstance.buyButton.setEnabled(player.cash > this.cost);
			this.cardInstance.buyButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.purchase(player)));
			this.cardInstance.auctionButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.auction()));
	
			this.cardInstance.unmortgageButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.unmortgage()));
			this.cardInstance.mortgageButton.setEnabled(this.getMortgageValue() > 0);
			this.cardInstance.mortgageButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.mortgage()));
	
			this.cardInstance.sellButton.on("pointerup", () => this.game.prompt.closeWithAnim(() => this.sell()));
			this.cardInstance.continueButton.on("pointerup", () => this.game.prompt.closeWithAnim());
		}

	}

	/**
	 * Shows the purchase card for this property
	 * in the context for the player passed in.
	 * 
	 * @param {Player} player The player to show the card to.
	 */
	showCard(player) {
		this.cardInstance = new this.cardType(this.scene, this.game, this, player);
		this.game.prompt.showWithAnim(this.cardInstance, this.registerCardButtons.bind(this, player));

		this.game.prompt.once("close", () => this.game.showSaleInterface(player));
	}

	/**
	 * Sets up a card in the event this tile is not owned or
	 * is owned but the owner has landed on it.
	 * 
	 * @param {Player} player The player to setup card for.
	 * @override
	 */
	onLanded(player) {
		super.onLanded(player);

		if((this.owner == null && player.hasPassedGo) || this.owner == player) {
			const ownedTiles = this.game.board.getTilesOwnedByPlayer(player, Purchasable);
			this.game.board.highlightTiles(ownedTiles);

			setTimeout(this.showCard.bind(this, player), 150);
		} else if((this.owner == null && !player.hasPassedGo) || this.isMortgaged || this.owner.isJailed) {
			this.game.showSaleInterface(player);
		}
	}
}

export default Purchasable;