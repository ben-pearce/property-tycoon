import Phaser from "phaser";
import {getTokenSpriteByPlayerId} from "./utils";
import Jail from "./tiles/jail";
import Purchasable from "./tiles/purchasable";
import {Direction} from "../enums";

/**
 * This class represents a player.
 * 
 * @extends Phaser.GameObjects.Sprite
 * 
 * @property {integer} id The player unique ID.
 * @property {GameManager} game The game instance this player belongs to.
 * @property {integer} cash The cash held by this player.
 * @property {integer} debt The amount that the player is in debt.
 * @property {Tile} tile The tile this player is current on.
 * @property {boolean} isJailed Is player in jail or not.
 * @property {boolean} hasPassedGo Has the player passed Go tile or not.
 * @property {Enums.Direction} direction The direction that the player is moving in.
 * @property {boolean} isComputer Is this player a computer or not.
 * @property {boolean} isRetired Has this player retired from the game.
 * @property {CardConfig[]} getOutOfJailCard The get out of jail card this player holds and the deck.
 * @property {integer} jailTurnsMissed Number of turns missed due to jail.
 * @property {integer} doubleRollStreak Number of times player has rolled double.
 */
class Player extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene The scene this player belongs to.
	 * @param {GameManager} game The game this player belongs to.
	 * @param {integer} id The unique player ID.
	 * @param {integer} cash The cash the player will start with.
	 * @param {boolean} isComputer Is this player a computer or not.
	 */
	constructor(scene, game, id, cash, isComputer) {
		super(scene, 0, 0, "tokens", getTokenSpriteByPlayerId(id));

		this.id = id;
		this.game = game;

		this.cash = cash;
		this.debt = 0;
		this.tile = null;
		this.isJailed = false;
		this.hasPassedGo = false;
		this.direction = Direction.FORWARDS;
		this.isComputer = isComputer;
		this.isRetired = false;
		this.getOutOfJailCard = [];
		this.jailTurnsMissed = 0;
		this.doubleRollStreak = 0;
	}

	/**
	 * Deposits some cash into player bank account.
	 * 
	 * @param {integer} sum Amount of cash deposit.
	 * @fires Player#deposit
	 */
	deposit(sum) {
		this.cash += sum;

		this.emit("deposit", sum);
	}

	/**
	 * Withdraws some cash from player bank account.
	 * 
	 * @param {integer} sum Amount of cash withdrawal.
	 * @fires Player#withdraw
	 */
	withdraw(sum) {
		this.cash -= sum;

		this.emit("withdraw", sum);
	}

	/**
	 * Charges a player a specified amount of money and deposits
	 * into a specified location.
	 * 
	 * If player can afford to pay the amount will be withdrawn
	 * from their account and callback will be invoked.
	 * 
	 * If a player cannot afford to pay an amount this function
	 * will ask them to sell off assets until they can.
	 * 
	 * If a player still cannot afford to pay an amount after
	 * selling assets they will be forced to retire.
	 * 
	 * @param {integer} amount The amount the player must pay.
	 * @param {Player|Bank|Parking} depositInto Where the amount must be deposited into.
	 * @param {?Player~debtPaidCallback} cb The callback to invoke after any payment and sale of assets.
	 */
	charge(amount, depositInto, cb=null) {
		if(this.cash >= amount) {
			this.withdraw(amount);
			depositInto.deposit(amount);
			if(typeof cb === "function") {
				cb();
			}
		} else if(this.getNetWorth() >= amount) {
			this.debt = amount - this.cash;
			this.game.showSaleInterface(this);

			const playerCanMakeDeposit = () => {
				if(this.cash >= amount) {
					this.debt = 0;
					
					this.game.hideSaleInterface();
					this.game.prompt.off("close");

					this.withdraw(amount);
					depositInto.deposit(amount);
					this.off("deposit", playerCanMakeDeposit);

					if(typeof cb === "function") {
						cb();
					}
				}
			};

			this.on("deposit", playerCanMakeDeposit);
		} else {
			this.retire(depositInto);

			if(typeof cb === "function") {
				cb();
			}
		}
	}

	/**
	 * Instantly (without tweening) moves a player to a tile on the board.
	 * 
	 * @param {Tile} tile The tile to move to.
	 */
	teleportToTile(tile) {
		this.setPosition(...tile.getPlayerXY());
		tile.onLanded(this);
	}


	/**
	 * Jails this player.
	 * 
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 */
	jail(cb=null) {
		const jailTile = this.game.board.getSingletonTileByType(Jail);
		this.isJailed = true;
		this.jumpToTile(jailTile, cb);
	}

	/**
	 * Unjails this player.
	 * 
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 */
	unjail(cb=null) {
		const jailTile = this.game.board.getSingletonTileByType(Jail);
		this.isJailed = false;
		this.jailTurnsMissed = 0;
		this.jumpToTile(jailTile, cb);
	}

	/**
	 * Retires this player from the game. 
	 * 
	 * All player assets will be returned to the bank
	 * and funds raised from the sale will be deposited into
	 * the location specified.
	 * 
	 * @param {Player|Bank|Parking} depositInto The location to deposit to.
	 * @fires Player#retire
	 */
	retire(depositInto) {
		const netWorth = this.getNetWorth();

		this.isRetired = true;
		const ownedTiles = this.game.board.getTilesOwnedByPlayer(this, Purchasable);
		for(let i = 0; i < ownedTiles.length; i++) {
			const tile = ownedTiles[i];
			tile.sell(0);
		}
		
		const index = this.tile.players.indexOf(this);
		this.tile.players.splice(index, 1);
		this.tile = null;

		this.game.playerContainer.remove(this);

		this.withdraw(this.cash);
		depositInto.deposit(netWorth);

		if(this.game.currentPlayer == this.id) {
			this.game.nextPlayer();
		}

		this.emit("retire", this);
	}

	/**
	 * Gets the net worth of this player. 
	 * 
	 * The net worth is the players cash plus the value
	 * of all of their assets.
	 * 
	 * @returns {integer} The players net worth.
	 */
	getNetWorth() {
		const ownedTiles = this.game.board.getTilesOwnedByPlayer(this, Purchasable);
		const propertyValue = ownedTiles.reduce((value, tile) => value + tile.getValue(), 0);
		return this.cash + propertyValue;
	}
 
	/**
	 * Moves and animates a player to a new tile on the board.
	 * 
	 * Once animation is complete callback is invoked.
	 * 
	 * @param {Tile} tile The tile to move to.
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 * @param {Enums.Direction} direction The direction to move around the board.
	 */
	moveToTile(tile, cb=null, direction=Direction.FORWARDS) {
		this.direction = direction;

		const timeline = this.scene.tweens.createTimeline();
		const l = this.game.board.tiles.length;

		const duration = 4000;
		let distance = (((tile.id - this.tile.id) % l) + l) % l;
		distance = direction == Direction.FORWARDS ? distance : l - distance;

		for(let i = (this.tile.id + direction + l) % l; i != (tile.id + direction + l) % l; i = (i + direction + l) % l) {
			const tempTile = this.game.board.tiles[i];
			const [x, y] = tempTile.getPlayerXY();

			timeline.add({
				targets: this,
				ease: "Cubic.easeOut", 
				x: x, y: y,
				duration: Math.min(750, duration / distance),
				onComplete: () => tempTile.onPassed(this)
			});
		}

		timeline.setCallback("onComplete", () => {
			tile.onLanded(this);
			if(typeof cb === "function") {
				cb();
			}
		});
		timeline.play();
	}

	/**
	 * Moves a player to a tile without tweening each
	 * tile in-between. Does not move in any particular direction,
	 * player will move to the tile from wherever they are
	 * on the board at present.
	 * 
	 * @param {Tile} tile The tile to move to.
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 */
	jumpToTile(tile, cb) {
		let [x, y] = tile.getPlayerXY();

		if(this.isJailed && tile instanceof Jail) {
			[x, y] = tile.getPlayerJailXY();
		}

		this.scene.tweens.add({
			targets: this,
			ease: "Cubic.easeOut",
			x: x, y: y,
			onComplete: () => {
				if(this.isJailed && tile instanceof Jail) {
					tile.onLanded(this, cb);
				} else {
					tile.onLanded(this);
					if(typeof cb === "function") {
						cb();
					}
				}
			}
		});
	}

	/**
	 * Wrapper function for moving player forward n tiles.
	 * 
	 * @param {integer} steps Steps to move forward.
	 * @param {Player~animationCallback} cb The callback to invoke after animation completes.
	 */
	moveForwards(steps, cb) {
		const newTileIndex = (this.tile.id + steps) % this.game.board.tiles.length;
		const newTile = this.game.board.tiles[newTileIndex];
		this.moveToTile(newTile, cb);
	}

	/**
	 * Wrapper function for moving player backward n tiles.
	 * 
	 * @param {integer} steps Steps to move backward.
	 * @param {Player~animationCallback} cb The callback to invoke after animation completes.
	 */
	moveBackwards(steps, cb) {
		const l = this.game.board.tiles.length;
		const newTileIndex = (this.tile.id - steps + l) % l;
		const newTile = this.game.board.tiles[newTileIndex];
		this.moveToTile(newTile, cb, -1);
	}
}

/**
 * Event fired when cash is deposited into the 
 * player.
 * 
 * @event Player#deposit
 * @param {integer} sum The amount deposited.
 */

/**
 * Event fired when cash is withdrawn from the
 * player.
 * 
 * @event Player#withdraw
 * @param {integer} sum The amount withdrawn.
 */

/**
 * Event fired when player picks up a Get Out
 * of Jail Free card.
 * 
 * @event Player#jailpickup
 */

/**
 * Event fired when player replaces a Get Out
 * of Jail Free card.
 * 
 * @event Player#jaildrop
 */

/**
 * Event fired when player retires from the game.
 * 
 * @event Player#retire
 */

/**
 * This callback is invoked once animations complete.
 * @callback Player~animationCallback
 */

/**
 * This callback is invoked once player can pay a debt.
 * @callback Player~debtPaidCallback
 */

export default Player;