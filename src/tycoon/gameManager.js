import Phaser from "phaser";
import Board from "./board";
import Hud from "./hud/hud";
import Dice from "./dice";
import Player from "./player";
import Bank from "./bank";
import Timer from "./timer";
import CashText from "./cashText";


class GameManager {
	/**
	 * This is our "Game Controller" it is in charge
	 * of creating all the required objects and passing 
	 * them information about the progress of the game.
	 * 
	 * This class will initiate dice rolls, then ask for user
	 * input and display prompts as appropriate.
	 * 
	 * @param {Phaser.Game} game The Phaser.Game instance.
	 * @param {Object} config The options for this game instance.
	 */
	constructor(game, config) {
		this.game = game;
		this.scene = game.scene.getScene("board");
	
		this.board = new Board(this);

		this.players = [];
		this.currentPlayer = 0;

		let boardDimensions = this.board.getBounds();
		this.board.setPosition(
			(game.config.width / 2) - boardDimensions.width / 2, 
			(game.config.height / 2) - boardDimensions.height / 2
		);

		this.playerContainer = new Phaser.GameObjects.Container(this.scene);
		for(let i = 0; i < config.playerCount; i++) {
			let p = new Player(this, i);
			p.deposit(1500);
			p.teleportToTile(this.board.tiles[0]);

			p.on("deposit", this.playerDeposited, p);

			this.players.push(p);
		}
		this.playerContainer.add(this.players);

		this.dice = new Dice(this);
		this.bank = new Bank(this);
		this.timer = new Timer(this, config.timer);
		
		this.hud = new Hud(this);

		this.scene.add.existing(this.board);
		this.scene.add.existing(this.playerContainer);
		this.scene.add.existing(this.dice.rollSprite);
		this.scene.add.existing(this.dice.diceOneSprite);
		this.scene.add.existing(this.dice.diceTwoSprite);
		this.scene.add.existing(this.hud);

		this.dice.requestRoll();
		this.dice.on("landed", this.playerRolled.bind(this));
	}

	/**
	 * This is called once a player has interacted with
	 * the dice and they have landed.
	 * 
	 * @param {Tuple(Integer,Integer)} roll The first and second dice result as a tuple.
	 */
	playerRolled(roll) {
		let p = this.players[this.currentPlayer];
		this.playerContainer.bringToTop(p);

		let [diceOne, diceTwo] = roll;
		p.moveForwards(diceOne + diceTwo, () => {
			p.deposit(500);

			this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
			this.dice.requestRoll();
		});
	}

	playerDeposited(sum) {
		let c = new CashText(this, sum);
		this.scene.add.existing(c);
		c.play();
	}

	playerWithdraw(sum) {
		let c = new CashText(this, -sum);
		this.scene.add.existing(c);
		c.play();
	}
}

export default GameManager;