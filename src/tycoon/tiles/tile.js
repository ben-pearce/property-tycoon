import Phaser from "phaser";
import {Tiles} from "../../enums";
import {TileTextStyle} from "../../styles";

/**
 * @namespace Tiles
 */

/**
 * This class represents a tile on the board. 
 * 
 * Intended to be inherited by specialised tile classes.
 * 
 * @extends Phaser.GameObjects.Container
 * @memberof Tiles
 * 
 * @property {Board} board The board this tile is part of.
 * @property {GameManager} game The game manager instance.
 * @property {integer} id The unique tile ID.
 * @property {string} name The name of the tile.
 * @property {Player[]} players Players currently on the tile.
 * @property {Phaser.GameObjects.Rectangle} background The background of the tile.
 * @property {Phaser.GameObjects.Text} text The text on the tile.
 */
class Tile extends Phaser.GameObjects.Container {
	/**
	 * Creates the tile background and text and initiates 
	 * class variables.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {Board} board The board object this belongs to.
	 * @param {TileConfig} config The tile configuration to observe.
	 */
	constructor(scene, board, config) {
		super(scene, 0, 0);

		this.board = board;
		this.game = board.game;
		this.id = config.id;
		this.name = config.name;

		this.background = new Phaser.GameObjects.Rectangle(
			board.scene, 
			this.x, this.y, 
			(config.id % 10 == 0) ? Tiles.HEIGHT : Tiles.WIDTH, 
			Tiles.HEIGHT, 
			Tiles.COLOR);
		
		this.text = new Phaser.GameObjects.Text(this.scene, this.x, this.y + 25, config.name, TileTextStyle);
		this.text.setStyle({
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width - 8, useAdvancedWrap: true}
		});
		this.background.setStrokeStyle(3, 0x000000);
		this.background.setOrigin(0);
		this.text.setOrigin(0);
		this.add([this.background, this.text]);

		this.players = [];

		this.posRange = [
			[0, 0],
			[0, -0.25],
			[0, +0.25],
			[-0.25, -0.15],
			[-0.25, +0.15],
			[+0.25, 0]
		];
	}

	/**
	 * Returns an X,Y coord for a player to be moved
	 * to.
	 * 
	 * posRange indicates a variance to add or subtract from the
	 * XY coords so that player tokens don't just sit on top of
	 * eachother.
	 * 
	 * i.e. One entry in posRange is a positive or negative percentage
	 * to be added to the tile dimensions.
	 * 
	 * 	[+/-x%, +/-y%]
	 * 
	 * If there is already a player on the tile, this function also
	 * introduces some random variance in the coordiantes to make
	 * the movement seem more natural.
	 * 
	 * @returns {integer[]} The XY coordinates.
	 */
	getPlayerXY() {
		let x = this.board.x + this.x;
		let y = this.board.y + this.y;

		let [varX, varY] = this.posRange[this.players.length];

		if(this.players.length > 0) {
			varX += Math.random() * (0.1) - 0.05;
			varY += Math.random() * (0.1) - 0.05;			
		}

		if(this.angle == 0) {
			x += (this.background.width / 2) + (this.background.width * varX);
			y += (this.background.height / 2) + (this.background.height * varY);
		} else if(this.angle == 90) {
			x -= (this.background.height / 2) - (this.background.height * varY);
			y += (this.background.width / 2) + (this.background.width * varX);
		} else if(this.angle == -180) {
			x -= (this.background.width / 2) - (this.background.width * varX);
			y -= (this.background.height / 2) - (this.background.height * varY);
		} else if(this.angle == -90) {
			x += (this.background.height / 2) + (this.background.height * varY);
			y -= (this.background.width / 2) - (this.background.width * varX);
		}

		return [x, y];
	}

	/**
	 * This method is called when a player has "passed"
	 * this tile, i.e. they have rolled the dice and need
	 * to move past this tile to get to their target tile.
	 * 
	 * It is ALSO called when  the player lands on the target
	 * tile. So when a player lands both `onPassed()` and 
	 * `onLanded()` will be invoked.
	 * 
	 * @param {Player} player The player that passed the tile.
	 */
	onPassed(player) {
		return player;
	}

	/**
	 * This method is called when a player has "landed"
	 * on this tile, i.e. they have rolled the dice and this
	 * tile is their target tile and player has finished
	 * progressing to this tile.
	 * 
	 * @param {Player} player The player that landed on this tile.
	 */
	onLanded(player) {
		this.players.push(player);

		if(player.tile !== null) {
			const index = player.tile.players.indexOf(player);
			player.tile.players.splice(index, 1);
		}

		player.tile = this;
	}
}

export default Tile;