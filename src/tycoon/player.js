import Phaser from "phaser";
import GeneralConfig from "../general";


class Player extends Phaser.GameObjects.Sprite {
	/**
	 * This class represents a player.
	 * @param {GameManager} game The game this player belongs to.
	 */
	constructor(game, id) {
		super(game.scene, 0, 0, "tokens", GeneralConfig.player.token[id]);

		this.id = id;
		this.game = game;
		this.scene = game.scene;

		this.cash = null;
		this.tile = null;

		this.scene.add.existing(this);
	}

	/**
	 * Deposits some cash into player bank account.
	 * 
	 * @param {Integer} sum Amount of cash deposit.
	 */
	deposit(sum) {
		this.cash += sum;
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
	 * Moves and animates a player to a new tile on the board.
	 * 
	 * Once animation is complete callback is invoked.
	 * 
	 * @param {Tile} tile The tile to move to.
	 * @param {Callable} callback The callback to invoke after animation completes.
	 * @param {Integer} direction The direction to move around the board i.e. +1 = forwards 1 step, -1 = backwards 1 step.
	 */
	moveToTile(tile, callback, direction=1) {
		let timeline = this.scene.tweens.createTimeline();
		let length = this.game.board.tiles.length;

		for(let i = (this.tile.id + direction) % length; i - direction != tile.id; i = (i + direction) % length) {
			let tempTile = this.game.board.tiles[i];
			let [x, y] = tempTile.getPlayerXY();

			timeline.add({
				targets: this,
				ease: "Cubic.easeOut", 
				x: x, y: y,
				onComplete: () => tempTile.onPassed(this)
			});
		}

		timeline.setCallback("onComplete", () => {
			tile.onLanded(this);
			callback();
		});
		timeline.play();
	}

	/**
	 * Wrapper function for moving player forward n tiles.
	 * 
	 * @param {Integer} steps Steps to move forward.
	 * @param {Callable} callback The callback to invoke after animation completes.
	 */
	moveForwards(steps, callback) {
		let newTileIndex = (this.tile.id + steps) % this.game.board.tiles.length;
		let newTile = this.game.board.tiles[newTileIndex];
		this.moveToTile(newTile, callback);
	}

	/**
	 * Wrapper function for moving player backward n tiles.
	 * 
	 * @param {Integer} steps Steps to move backward.
	 * @param {Callable} callback The callback to invoke after animation completes.
	 */
	moveBackwards(steps, callback) {
		let newTileIndex = (this.tile.id - steps) % this.game.board.tiles.length;
		let newTile = this.game.board.tiles[newTileIndex];
		this.moveToTile(newTile, callback, -1);
	}
}

export default Player;