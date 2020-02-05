import Phaser from "phaser";
import Property from "./property";
import GeneralConfig from "../generalConfig";


class Position extends Phaser.GameObjects.Container {
	/**
	 * This class represents a position on the board. 
	 * 
	 * This class will not be used alone, there will be classes
	 * that inherit this class to give further functionality (i.e. Jail, Station etc).
	 * 
	 * @param {Board} board The board object this belongs to
	 * @param {string} name 
	 * @param {boolean} buyable 
	 * @param {boolean} isCorner 
	 * @param {string} group 
	 */
	constructor(board, name, buyable=true, isCorner=false, group=null) {
		super(board.scene, 0, 0);

		this.board = board;
		this.game = board.game;
		this.background = new Phaser.GameObjects.Rectangle(
			board.scene, 
			this.x, this.y, 
			isCorner ? GeneralConfig.positions.height : GeneralConfig.positions.width, 
			GeneralConfig.positions.height, 
			GeneralConfig.board.color);

		const textStyle = {
			fontFamily: "Sans",
			color: "#000000", 
			fontSize: "10px", 
			align: "center", 
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width, useAdvancedWrap: true}
		};

		this.text = new Phaser.GameObjects.Text(board.scene, this.x, this.y+25, name, textStyle);
		this.background.setStrokeStyle(3, 0x000000);
		this.background.setOrigin(0);
		this.text.setOrigin(0);
		this.add([this.background, this.text]);

		if(buyable && group != "Utilities" && group != "Station") {
			const color = GeneralConfig.groups[group];
			this.property = new Property(this, color);
			this.add(this.property);
		}
	}

	/**
	 * Returns an X,Y coord for a player to be moved
	 * to.
	 */
	getPlayerXY() {
		let x = this.board.x + this.x;
		let y = this.board.y + this.y;

		if(this.angle == 0) {
			x += (this.background.width / 2);
			y += (this.background.height / 2);
		} else if(this.angle == 90) {
			x -= (this.background.height / 2);
			y += (this.background.width / 2);
		} else if(this.angle == -180) {
			x -= (this.background.width / 2);
			y -= (this.background.height / 2);
		} else if(this.angle == -90) {
			x += (this.background.height / 2);
			y -= (this.background.width / 2);
		}

		return [x, y];
	}
}

export default Position;