import Phaser from "phaser";
import BoardConfig from "../positions";
import GeneralConfig from "../general";
import Position from "./positions/position";


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
			GeneralConfig.positions.height,
			GeneralConfig.positions.height, 
			GeneralConfig.positions.width*(this.dimension-1), 
			GeneralConfig.positions.width*(this.dimension-1), 
			GeneralConfig.board.color);
		this.background.setOrigin(0);
		
		this.wallpaper = new Phaser.GameObjects.Sprite(
			this.scene, 
			this.background.x + (this.background.width / 2), 
			this.background.y + (this.background.height / 2), 
			"wallpaper");
		this.positions = this.drawPositions();

		this.add([this.background, this.wallpaper, ...this.positions]);
		this.movePositions();
	}

	/**
	 * This methods creates an array of positions
	 * and returns them.
	 * 
	 * It will also pass in the configuration for that
	 * position (i.e. what type of position is it? is it a corner peice? etc).
	 * 
	 * @returns {Position[]} The new array of position instances
	 */
	drawPositions() {
		const positions = [];
		for(let pos in BoardConfig) {
			let positionConfig = BoardConfig[pos];
			let position = new Position(this, 
				positionConfig.name,
				positionConfig.buy,
				pos % this.dimension == 0,
				positionConfig.group);
			positions.push(position);
		}
		return positions;
	}

	/**
	 * This method moves and rotates all the positions to construct
	 * the board.
	 * 
	 * It works around the board from bottom right anti-clockwise.
	 */
	movePositions() { 
		const posHeight = GeneralConfig.positions.height;
		const posWidth = GeneralConfig.positions.width;
		for(let i = 0; i < this.dimension; i++) {
			this.positions[i].setPosition(posWidth*(9-i) + posHeight, posWidth*(this.dimension-1) + posHeight);
			this.positions[i+this.dimension].setAngle(90);
			this.positions[i+this.dimension].setPosition(posHeight, posWidth*((this.dimension-1)-i) + posHeight);
			this.positions[i+this.dimension*2].setAngle(180);
			this.positions[i+this.dimension*2].setPosition(posHeight + posWidth*i, posHeight);
			this.positions[i+this.dimension*3].setAngle(270);
			this.positions[i+this.dimension*3].setPosition(posHeight + posWidth*(this.dimension-1), posHeight + posWidth*i);
		}
	}
}

export default Board;