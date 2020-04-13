import Phaser from "phaser";

import Board from "./board";
import Dice from "./dice";
import Player from "./player";

import CashText from "./cashText";


class GameManager {
	constructor(game, playerCount) {
		this.game = game;
		this.scene = game.scene.add("board", {}, true);
	
		this.board = new Board(this);
		this.scene.add.existing(this.board);
	
		let boardDimensions = this.board.getBounds();
		this.board.setPosition(
			(game.config.width / 2) - boardDimensions.width / 2, 
			(game.config.height / 2) - boardDimensions.height / 2
		);

		this.dice = new Dice(this);

		this.players = [];
		this.currentPlayer = 0;

		for(let i = 0; i < playerCount; i++) {
			let p = new Player(this, i);
			p.deposit(1500);
			p.teleportToTile(this.board.tiles[0]);

			this.players.push(p);
		}

		this.dice.requestRoll();
		this.dice.on("landed", this.playerRolled.bind(this));
	
		this.scene.add.existing(new Phaser.GameObjects.Rectangle(this.scene, 1300, 100, 300, 100, 0x000000, 0.5)); // hud
		this.scene.add.existing(new Phaser.GameObjects.Sprite(this.scene, 1190, 90, "tokens", "cat"));
		const textStyle = {
			fontFamily: "Arial",
			color: "#FFFFFF", 
			fontSize: "30px"
		};
	
		const cashStyle = {
			fontFamily: "Arial",
			color: "#FFFFFF", 
			fontSize: "10px"
		};
	
		let text = this.scene.add.existing(new Phaser.GameObjects.Text(this.scene, 1230, 60, "Player 1", textStyle));
		this.scene.add.existing(new Phaser.GameObjects.Text(this.scene, 1230, 100, "Cash: $1500", cashStyle)); // cash
		text.setStroke(0x000000, 3);
	}

	playerRolled(roll) {
		let p = this.players[this.currentPlayer];

		let [diceOne, diceTwo] = roll;
		p.moveForwards(diceOne + diceTwo, () => {
			this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
			this.dice.requestRoll();

			let c = new CashText(p, -500);
			this.scene.add.existing(c);
			c.play();
		});
	}
}

export default GameManager;