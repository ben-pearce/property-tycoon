import Phaser from "phaser";
import BoardConfig from "../tiles";
import {Tiles} from "../constants";

/**
 * This class represents our game board.
 * 
 * @extends Phaser.GameObjects.Container
 * 
 * @property {Phaser.GameObjects.Rectangle} background The board background.
 * @property {Tile[]} tiles The tiles around the board.
 * 
 */
class Board extends Phaser.GameObjects.Container {
	/**
	 * Creates board background, tiles and adds logo.
	 * 
	 * @param {GameManager} game Game manager this board belongs to.
	 */
	constructor(game) {
		super(game.scene, 0, 0);

		this.game = game;
		this.dimension = BoardConfig.length / 4;

		this.background = new Phaser.GameObjects.Rectangle(
			this.scene, 
			Tiles.HEIGHT,
			Tiles.HEIGHT, 
			Tiles.WIDTH*(this.dimension-1), 
			Tiles.WIDTH*(this.dimension-1), 
			Tiles.COLOR);
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
			let tileClass = tileConfig.type;
			let t = new tileClass(this, tileConfig);
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
		const tileHeight = Tiles.HEIGHT;
		const tileWidth = Tiles.WIDTH;
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