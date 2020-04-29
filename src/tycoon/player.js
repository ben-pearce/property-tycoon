import Phaser from "phaser";
import {getTokenSpriteByPlayerId} from "./utils";
import Jail from "./tiles/jail";

/**
 * This class represents a player.
 * 
 * @extends Phaser.GameObjects.Sprite
 * 
 * @property {integer} id The player unique ID.
 * @property {GameManager} game The game instance this player belongs to.
 * @property {integer} cash The cash held by this player.
 * @property {Tile} tile The tile this player is current on.
 * @property {boolean} isJailed Is player in jail or not.
 * @property {boolean} hasPassedGo Has the player passed Go tile or not.
 * @property {boolean} isComputer Is this player a computer or not.
 * @property {?(CardConfig|Array)} getOutOfJailCard The get out of jail card this player holds and the deck.
 * @property {integer} jailTurnsMissed Number of turns missed due to jail.
 * @property {integer} doubleRollStreak Number of times player has rolled double.
 */
class Player extends Phaser.GameObjects.Sprite {
	/**
	 * @param {Phaser.Scene} scene The scene this player belongs to.
	 * @param {GameManager} game The game this player belongs to.
	 * @param {integer} id The unique player ID.
	 */
	constructor(scene, game, id) {
		super(scene, 0, 0, "tokens", getTokenSpriteByPlayerId(id));

		this.id = id;
		this.game = game;

		this.cash = 0;
		this.tile = null;
		this.isJailed = false;
		this.hasPassedGo = false;
		this.isComputer = false;
		this.getOutOfJailCard = null;
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
		let jailTile = this.game.board.getSingletonTileByType(Jail);
		this.isJailed = true;
		this.jumpToTile(jailTile, cb);
	}

	/**
	 * Unjails this player.
	 * 
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 */
	unjail(cb=null) {
		let jailTile = this.game.board.getSingletonTileByType(Jail);
		this.isJailed = false;
		this.jumpToTile(jailTile, cb);
	}

	/**
	 * Moves and animates a player to a new tile on the board.
	 * 
	 * Once animation is complete callback is invoked.
	 * 
	 * @param {Tile} tile The tile to move to.
	 * @param {?Player~animationCallback} [cb=null] The callback to invoke after animation completes.
	 * @param {integer} direction The direction to move around the board i.e. +1 = forwards 1 step, -1 = backwards 1 step.
	 */
	moveToTile(tile, cb=null, direction=1) {
		let timeline = this.scene.tweens.createTimeline();
		let l = this.game.board.tiles.length;

		let duration = 5000;
		let distance = (((tile.id - this.tile.id) % l) + l) % l;

		for(let i = (this.tile.id + direction + l) % l; i != (tile.id + direction + l) % l; i = (i + direction + l) % l) {
			let tempTile = this.game.board.tiles[i];
			let [x, y] = tempTile.getPlayerXY();

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
		let newTileIndex = (this.tile.id + steps) % this.game.board.tiles.length;
		let newTile = this.game.board.tiles[newTileIndex];
		this.moveToTile(newTile, cb);
	}

	/**
	 * Wrapper function for moving player backward n tiles.
	 * 
	 * @param {integer} steps Steps to move backward.
	 * @param {Player~animationCallback} cb The callback to invoke after animation completes.
	 */
	moveBackwards(steps, cb) {
		let l = this.game.board.tiles.length;
		let newTileIndex = (this.tile.id - steps + l) % l;
		let newTile = this.game.board.tiles[newTileIndex];
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
 * This callback is invoked once animations complete.
 * @callback Player~animationCallback
 */

export default Player;