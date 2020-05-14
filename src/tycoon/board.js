import Phaser from "phaser";
import BoardConfig from "../tiles";
import {Tiles} from "../enums";
import Rentable from "./tiles/rentable";
import Tile from "./tiles/tile";

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
		
		const wallpaper = new Phaser.GameObjects.Sprite(
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
		for(const tile in BoardConfig) {
			const tileConfig = BoardConfig[tile];
			const tileClass = tileConfig.type;
			const t = new tileClass(this.scene, this, tileConfig);
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
			const t = this.tiles[i];
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
			const t = this.tiles[i];
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
			const t = this.tiles[i];
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
			const t = this.tiles[i];
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
	 * @param {Type} [tileType=Tile] The type of tile to find.
	 */
	getTilesOwnedByPlayer(player, tileType=Tile) {
		const ownedTiles = [];
		for(let i = 0; i < this.tiles.length; i++) {
			const t = this.tiles[i];
			if(t.owner === player && t instanceof tileType) {
				ownedTiles.push(t);
			}
		}
		return ownedTiles;
	}

	/**
	 * Makes all tiles except the ones passed in half
	 * alpha, highlighting the tiles specified.
	 * 
	 * If null is passed in then all tiles will be reset
	 * to full alpha.
	 * 
	 * @param {?Tile[]} tiles The tiles to highlight.
	 */
	highlightTiles(tiles=null) {
		for(let i = 0; i < this.tiles.length; i++) {
			const tile = this.tiles[i];
			tile.setAlpha(tiles === null ? 1 : 0.5);
		}
		if(tiles !== null) {
			for(let i = 0; i < tiles.length; i++) {
				const tile = tiles[i];
				tile.setAlpha(1);
			}
		}
	}

	/**
	 * Highlights tiles passed in and makes them interactive
	 * so that current player can interact with their properties.
	 * 
	 * If null is passed in then all tiles will be reset.
	 * 
	 * @param {?Tiles} tiles The tiles to make interactive.
	 */
	setTilesActive(tiles=null) {
		this.highlightTiles(tiles);

		for(let i = 0; i < this.tiles.length; i++) {
			const tile = this.tiles[i];
			tile.removeInteractive();
		}
		if(tiles !== null ){
			for(let i = 0; i < tiles.length; i++) {
				const tile = tiles[i];
				tile.setInteractive({
					hitArea: tile.background, 
					hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
					useHandCursor: true
				});
			}
		}
	}
}

export default Board;