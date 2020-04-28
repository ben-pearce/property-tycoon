import Phaser from "phaser";
import Board from "./board";
import Hud from "./hud/hud";
import Dice from "./dice";
import Player from "./player";
import Bank from "./bank";
import Timer from "./timer";
import CashText from "./ui/cashText";
import Prompt from "./ui/prompt";
import Cards from "../cards";

/**
 * This is our Game Controller, it is in charge
 * of creating all the required objects and passing 
 * them information about the progress of the game.
 *  
 * This class will initiate dice rolls, then ask for user
 * input and display prompts as appropriate.
 */
class GameManager {
	/**
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

			p.on("deposit", this._playerDeposit.bind(this, p));
			p.on("withdraw", this._playerWithdraw.bind(this, p));

			this.players.push(p);
		}
		this.playerContainer.add(this.players);

		this.dice = new Dice(this);
		this.bank = new Bank(this);
		this.timer = new Timer(this, config.timer);
		this.hud = new Hud(this);
		this.prompt = new Prompt(this);

		this.scene.add.existing(this.board);
		this.scene.add.existing(this.playerContainer);
		this.scene.add.existing(this.dice.rollSprite);
		this.scene.add.existing(this.dice.diceOneSprite);
		this.scene.add.existing(this.dice.diceTwoSprite);
		this.scene.add.existing(this.hud);
		this.scene.add.existing(this.prompt);

		this.opportunityCards = this._shuffleCards(Cards.opportunity.slice());
		this.potluckCards = this._shuffleCards(Cards.potluck.slice());

		this.dice.requestRoll();
		this.dice.on("landed", this.playerRolled.bind(this));
	}

	/**
	 * This is called once a player has interacted with
	 * the dice and they have landed.
	 * 
	 * @param {integer[]} roll The first and second dice result as a tuple.
	 */
	playerRolled(roll) {
		let p = this.players[this.currentPlayer];
		this.playerContainer.bringToTop(p);

		let [diceOne, diceTwo] = roll;
		let isDouble = diceOne == diceTwo;

		if (isDouble) {
			p.doubleRollStreak++;
		} else {
			p.doubleRollStreak = 0;
		}

		if (p.doubleRollStreak >= 3) {
			p.jail(this.nextPlayer.bind(this));
		} else {
			p.moveForwards(diceOne + diceTwo);
		}
	}

	playerDeposit(p, sum) {
	/**
	 * Called when a player deposits money into their account.
	 * 
	 * Displays cash text animation above the player token.
	 * 
	 * @param {Player} p The player who deposited cash.
	 * @param {integer} sum The sum of the deposit.
	 * 
	 * @private
	 */
	_playerDeposit(p, sum) {
		let c = new CashText(p, sum);
		this.playerContainer.add(c);
		c.play();
	}

	/**
	 * Called when a player withdraws money from their account.
	 * 
	 * Displays cash text animation above the player token.
	 * 
	 * @param {Player} p The player who withdrew cash.
	 * @param {integer} sum The sum of the withdrawal.
	 * 
	 * @private
	 */
	_playerWithdraw(p, sum) {
		let c = new CashText(p, -sum);
		this.playerContainer.add(c);
		c.play();
	}

	/**
	 * Shuffles a deck of cards.
	 * 
	 * @param {CardConfig[]} cards The cards to shuffle.
	 * @private
	 */
	_shuffleCards(cards) {
		for (let i = cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return cards;
	}

}

export default GameManager;