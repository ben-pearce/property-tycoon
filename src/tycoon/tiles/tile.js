import Phaser from "phaser";
import Property from "../property";
import GeneralConfig from "../../general";


class Tile extends Phaser.GameObjects.Container {
	/**
	 * This class represents a tile on the board. 
	 * 
	 * This class will not be used alone, there will be classes
	 * that inherit this class to give further functionality (i.e. Jail, Station etc).
	 * 
	 * @param {Board} board The board object this belongs to.
	 * @param {Object} config Configuration options for this tile.
	 */
	constructor(board, config) {
		super(board.scene, 0, 0);

		this.board = board;
		this.game = board.game;
		this.id = config.id;

		this.background = new Phaser.GameObjects.Rectangle(
			board.scene, 
			this.x, this.y, 
			(config.id % 10 == 0) ? GeneralConfig.tiles.height : GeneralConfig.tiles.width, 
			GeneralConfig.tiles.height, 
			GeneralConfig.board.color);

		const textStyle = {
			fontFamily: "Sans",
			color: "#000000", 
			fontSize: "10px", 
			align: "center", 
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width, useAdvancedWrap: true}
		};

		this.text = new Phaser.GameObjects.Text(board.scene, this.x, this.y + 25, config.name, textStyle);
		this.background.setStrokeStyle(3, 0x000000);
		this.background.setOrigin(0);
		this.text.setOrigin(0);
		this.add([this.background, this.text]);

		if(config.buy && config.group != "Utilities" && config.group != "Station") {
			const color = GeneralConfig.groups[config.group];
			this.property = new Property(this, color);
			this.add(this.property);
		}

		this.players = [];
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
	 */
	getPlayerXY() {
		let x = this.board.x + this.x;
		let y = this.board.y + this.y;

		let posRange = [
			[0, 0],
			[0, -0.25],
			[0, +0.25],
			[-0.25, -0.15],
			[-0.25, +0.15],
			[+0.25, 0]
		];

		let [varX, varY] = posRange[this.players.length];

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

	onPassed(player) {
		console.log(player, "passed", this);
	}

	onLanded(player) {
		console.log(player, "landed", this);
		
		this.players.push(player);

		if(player.tile !== null) {
			const index = player.tile.players.indexOf(player);
			player.tile.players.splice(index, 1);
		}

		player.tile = this;
	}
}

export default Tile;