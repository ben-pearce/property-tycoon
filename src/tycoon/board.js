import Phaser from "phaser";
import BoardConfig from "../tiles";
import {Tiles} from "../enums";
import Rentable from "./tiles/rentable";

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
	 * @param {Phaser.Scene} scene The scene this board belongs to.
	 * @param {GameManager} game Game manager this board belongs to.
	 */
	constructor(scene, game) {
		super(scene, 0, 0);

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
		
		let wallpaper = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"wallpaper");

		this.tiles = this._drawTiles();

		this.add([this.background, wallpaper, ...this.tiles]);
		this._moveTiles();
	}

	/**
	 * This methods creates an array of tiles
	 * and returns them.
	 * 
	 * It will also pass in the configuration for that
	 * tile (i.e. what type of tile is it? is it a corner peice? etc).
	 * 
	 * @returns {Tile[]} The new array of tile instances
	 * @private
	 */
	_drawTiles() {
		const tiles = [];
		for(let tile in BoardConfig) {
			let tileConfig = BoardConfig[tile];
			let tileClass = tileConfig.type;
			let t = new tileClass(this.scene, this, tileConfig);
			tiles.push(t);
		}
		return tiles;
	}

	/**
	 * This method moves and rotates all the tiles to construct
	 * the board.
	 * 
	 * It works around the board from bottom right anti-clockwise.
	 * 
	 * @private
	 */
	_moveTiles() { 
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


	/**
	 * Gets all the rentable tiles matching a specified
	 * property color.
	 * 
	 * @param {Color} color The color to returns the tiles for.
	 * @returns {Rentable[]} The matching rentable tiles.
	 */
	getRentableTilesByColor(color) {
		const rentableTiles = [];
		for(let i = 0; i < this.tiles.length; i++) {
			let t = this.tiles[i];
			if(t instanceof Rentable && t.color == color) {
				rentableTiles.push(t);
			}
		}
		return rentableTiles;
	}

	/**
	 * Gets all the tiles matching a specified tile
	 * type.
	 * 
	 * Used for fetching tiles that can have multiple
	 * instances such as Rentable or Utility.
	 * 
	 * @param {Type} type The type of tiles to return.
	 * @returns {Tile[]} The matching tiles.
	 */
	getTilesByType(type) {
		const tiles = [];
		for(let i = 0; i < this.tiles.length; i++) {
			let t = this.tiles[i];
			if(t instanceof type) {
				tiles.push(t);
			}
		}
		return tiles;
	}

	/**
	 * Gets a singleton (the only) tile that matches
	 * the specified tile type.
	 * 
	 * Used for fetching tiles that only have a single
	 * instance such as Jail or Free Parking.
	 * 
	 * @param {Type} type The type of tile to return.
	 * @returns {Tile} The matching tile.
	 */
	getSingletonTileByType(type) {
		for(let i = 0; i < this.tiles.length; i++) {
			let t = this.tiles[i];
			if(t instanceof type) {
				return t;
			}
		}
		return null;
	}

	/**
	 * Get the owner of a Monopoly which the tile
	 * passed in takes part in.
	 * 
	 * Returns the owners Player instance if they own
	 * all properties belonging to the same color-group.
	 * 
	 * Will return null if there is no monopoly.
	 * 
	 * Only works for tiles of type Rentable.
	 * 
	 * @param {Rentable} tile The rentable tile to get the monopoly owner for.
	 */
	getMonopolyOwner(tile) {
		let monopolyOwner = null;
		for(let i = 0; i < this.tiles.length; i++) {
			let t = this.tiles[i];
			if(t.color === tile.color) {
				if(t.owner === null || (monopolyOwner !== null && monopolyOwner !== t.owner)) {
					return null;
				} else {
					monopolyOwner = t.owner;
				}
			}
		}
		return monopolyOwner;
	}

	/**
	 * Returns a list of tiles owned by a particular player
	 * with the option to filter by the type of tile.
	 * 
	 * @example <caption>Getting Rentable tiles owned by player</caption>
	 * board.getTilesOwnedByPlayer(player, Rentable)
	 * 
	 * @example <caption>Getting all tiles owned by player</caption>
	 * board.getTilesOwnedByPlayer(player)
	 * 
	 * @param {Player} player The player to find owned tiles for.
	 * @param {?Type} [tileType=null] The type of tile to find.
	 */
	getTilesOwnedByPlayer(player, tileType=null) {
		let ownedTiles = [];
		for(let i = 0; i < this.tiles.length; i++) {
			let t = this.tiles[i];
			if(t.owner === player && t instanceof tileType) {
				ownedTiles.push(t);
			}
		}
		return ownedTiles;
	}
}

export default Board;