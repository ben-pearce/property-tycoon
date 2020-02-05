import Phaser from "phaser";


class Player extends Phaser.GameObjects.Rectangle {
	/**
	 * This class represents a player.
	 * @param {Board} board The board this player belongs to.
	 */
	constructor(board) {
		super(board.scene, 0, 0, 20, 20, 0xFF0000);
		this.board = board;
		this.scene = board.scene;
		this.position = 0;

		this.scene.add.existing(this);
	}

	/**
	 * Moves a player to a new position on the board.
	 * 
	 * TODO:Definitely use tweening here!
	 * 
	 * @param {Integer} pos The position index to move to
	 */
	moveToPosition(pos) {
		this.position = pos;
		let position = this.board.positions[pos];
		let newPos = position.getPlayerXY();
		this.setPosition(...newPos);
	}
}

export default Player;