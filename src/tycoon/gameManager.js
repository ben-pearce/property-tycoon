import Board from "./board";
import GameHud from "./gameHud";
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

		this.hud = new GameHud(this);
		this.scene.add.existing(this.hud);

		this.dice.requestRoll();
		this.dice.on("landed", this.playerRolled.bind(this));
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