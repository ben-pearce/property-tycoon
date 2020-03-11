import Phaser from "phaser";
import BoardConfig from "../tiles";
import GeneralConfig from "../general";
import Tile from "./tiles/tile";


class Board extends Phaser.GameObjects.Container {
	/**
	 * This class represents our game "board". It will contain
	 * all of the player tokens, positions, dice and cards.
	 * 
	 * @param {Phaser.Game} game Phaser game engine
	 * @param {Phaser.Scene} scene Phaser scene to draw board onto
	 * @param {integer} x 
	 * @param {integer} y 
	 */
	constructor(game, scene, x, y) {
		super(scene, x, y);

		this.game = game;
		this.dimension = BoardConfig.length / 4;

		this.background = new Phaser.GameObjects.Rectangle(
			this.scene, 
			GeneralConfig.tiles.height,
			GeneralConfig.tiles.height, 
			GeneralConfig.tiles.width*(this.dimension-1), 
			GeneralConfig.tiles.width*(this.dimension-1), 
			GeneralConfig.board.color);
		this.background.setOrigin(0);
		
		this.wallpaper = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"wallpaper");
		this.tiles = this.drawTiles();

		this.add([this.background, this.wallpaper, ...this.tiles]);
		this.moveTiles();
	}

	/**
	 * This methods creates an array of tiles
	 * and returns them.
	 * 
	 * It will also pass in the configuration for that
	 * tile (i.e. what type of tile is it? is it a corner peice? etc).
	 * 
	 * @returns {Tile[]} The new array of tile instances
	 */
	drawTiles() {
		const tiles = [];
		for(let tile in BoardConfig) {
			let tileConfig = BoardConfig[tile];
			let t = new Tile(this, tileConfig);
			tiles.push(t);
		}
		return tiles;
	}

	/**
	 * This method moves and rotates all the tiles to construct
	 * the board.
	 * 
	 * It works around the board from bottom right anti-clockwise.
	 */
	moveTiles() { 
		const tileHeight = GeneralConfig.tiles.height;
		const tileWidth = GeneralConfig.tiles.width;
		for(let i = 0; i < this.dimension; i++) {
			this.tiles[i].setPosition(tileWidth*(9-i) + tileHeight, tileWidth*(this.dimension-1) + tileHeight);
			this.tiles[i+this.dimension].setAngle(90);
			this.tiles[i+this.dimension].setPosition(tileHeight, tileWidth*((this.dimension-1)-i) + tileHeight);
			this.tiles[i+this.dimension*2].setAngle(180);
			this.tiles[i+this.dimension*2].setPosition(tileHeight + tileWidth*i, tileHeight);
			this.tiles[i+this.dimension*3].setAngle(270);
			this.tiles[i+this.dimension*3].setPosition(tileHeight + tileWidth*(this.dimension-1), tileHeight + tileWidth*i);
		}
	}
}

export default Board;