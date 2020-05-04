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
import ActionCard from "./cards/actionCard";
import GetOutOfJail from "./actions/getOutOfJail";
import {WinStyle} from "../styles";
import {getTokenNameByPlayerId} from "./utils";
import Purchasable from "./tiles/purchasable";

/**
 * This is our Game Controller, it is in charge
 * of creating all the required objects and passing 
 * them information about the progress of the game.
 *  
 * This class will initiate dice rolls, then ask for user
 * input and display prompts as appropriate.
 * 
 * @property {Board} board The board instance for this game.
 * @property {Phaser.GameObjects.Container} playerContainer The layer that player tokens sit inside of.
 * @property {Player[]} players The players in this game.
 * @property {integer} currentPlayer The players index of player whose turn it current is.
 * @property {Dice} dice The dice instance for this game.
 * @property {Bank} bank The bank instance for this game.
 * @property {Timer} timer The timer instance for this game.
 * @property {Hud} hud The HUD instance for this game.
 * @property {Prompt} prompt The prompt instance for this game.
 * @property {CardConfig[]} opportunityCards The opporunity cards configuration objects.
 * @property {CardConfig[]} potluckCards The pot luck cards configuration objects.
 */
class GameManager extends Phaser.GameObjects.Group {
	/**
	 * @param {Phaser.Scene} scene The Phaser.Scene instance.
	 * @param {GameConfig} config The options for this game instance.
	 */
	constructor(scene, config) {
		super(scene);
	
		this.board = new Board(scene, this);

		this.players = [];
		this.currentPlayer = null;

		const boardDimensions = this.board.getBounds();
		const boardX = (scene.game.config.width / 2) - boardDimensions.width / 2;
		const boardY = (scene.game.config.height / 2) - boardDimensions.height / 2;
		this.board.setPosition(boardX, boardY);

		// Create all the players and deposit 1500 cash
		this.playerContainer = new Phaser.GameObjects.Container(scene);
		for(let i = 0; i < config.playerCount + config.computerCount; i++) {
			const cash = 1500;
			const isComputer = i >= config.playerCount; 
			const p = new Player(scene, this, i, cash, isComputer);
			p.teleportToTile(this.board.tiles[0]);

			p.on("deposit", this._playerDeposit.bind(this, p));
			p.on("withdraw", this._playerWithdraw.bind(this, p));
			p.on("retire", this._playerRetire.bind(this, p));

			this.players.push(p);
		}
		this.playerContainer.add(this.players);

		this.dice = new Dice(this);
		this.bank = new Bank(this);
		this.timer = new Timer(this, config.timer);
		this.hud = new Hud(scene, this);
		this.prompt = new Prompt(scene, this);

		this.addMultiple([this.board, this.playerContainer, this.dice.rollSprite, 
			this.dice.diceOneSprite, this.dice.diceTwoSprite, this.hud, this.prompt], true);

		this.opportunityCards = this._shuffleCards(Cards.opportunity.slice());
		this.potluckCards = this._shuffleCards(Cards.potluck.slice());

		this.dice.on("landed", this.playerRolled.bind(this));
		this.dice.on("rolled", this.hud.setPlayerHudEnabled.bind(this.hud, false));

		this.nextPlayer();
	}

	/**
	 * This is called once a player has interacted with
	 * the dice and they have landed.
	 * 
	 * @param {integer[]} roll The first and second dice result as a tuple.
	 */
	playerRolled(roll) {
		const p = this.players[this.currentPlayer];
		this.playerContainer.bringToTop(p);

		const [diceOne, diceTwo] = roll;
		const isDouble = diceOne == diceTwo;

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

	/**
	 * Advances the game turn.
	 */
	nextPlayer() {
		this.hideSaleInterface();

		const lastPlayerId = this.players.map(e => e.isRetired).lastIndexOf(false);
		if(this.timer.complete && this.currentPlayer == lastPlayerId) {
			const maxNetWorth = Math.max(...this.players.map(e => e.getNetWorth()));
			const winningPlayers = this.players.filter(e => e.getNetWorth() === maxNetWorth);
			const winningPlayerNames = winningPlayers.map(e => getTokenNameByPlayerId(e.id));
			
			this.hud.setPlayerHudEnabled(false);
			this.dice.reset();

			const winText = new Phaser.GameObjects.Text(this.scene, 0, 0, `${winningPlayerNames.join(", ")} wins!`, WinStyle);
			winText.setStroke(0x000000, 10);
			this.prompt.show(winText);
			
			return;
		}
		
		if(this.currentPlayer === null) {
			this.currentPlayer = 0;
			this.hud.players[this.currentPlayer].setCurrentPlayer(true);
		} else {
			let p = this.players[this.currentPlayer];
			this.hud.players[this.currentPlayer].setCurrentPlayer(false);

			const [diceOne, diceTwo] = this.dice.result;
			const isDouble = diceOne == diceTwo;

			// So long as they have not rolled a double, advance to next player
			if((!isDouble || p.doubleRollStreak >= 3) || p.isJailed || p.isRetired) {
				// Reset their double roll streak, as they haven't rolled a double!
				p.doubleRollStreak = 0;

				this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
				p = this.players[this.currentPlayer];

				// If the next player is in jail, increment their turns missed and move to the player after
				while(p.isJailed || p.isRetired) {
					if(p.isJailed) {
						p.jailTurnsMissed++;

						// If the player has missed 2 turns already, unjail them.
						if(p.jailTurnsMissed >= 2) {
							p.unjail();
						}
					}

					this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
					p = this.players[this.currentPlayer];
				}
			}

			this.hud.players[this.currentPlayer].setCurrentPlayer(true);
		}
		this.hud.setPlayerHudEnabled(true);
		this.dice.requestRoll();
	}

	/**
	 * Shows an action card and performs action upon player
	 * once continue button has been pressed.
	 * 
	 * @param {Player} player The player to perform action on.
	 * @param {CardConfig[]} deck The deck the card was picked up from.
	 * @param {} cb The callback to invoke once action is complete.
	 * 
	 * @fires Player#jailpickup
	 */
	pickUpCard(player, deck, cb=null){
		const card = deck.shift();
		const actionCard = new ActionCard(this.scene, this, card, player);
		actionCard.continueButton.on("pointerup", () => {
			this.prompt.closeWithAnim(() => {
				card.action.do(this, player, () => {
					// Don't place the card back in the deck if it's GetOutOfJail.
					if(card.action instanceof GetOutOfJail) {
						player.getOutOfJailCard.push([card, deck]);
						player.emit("jailpickup");
					} else {
						deck.push(card);
					}
					
					if(typeof cb === "function") {
						cb();
					}
				});
			});
		});
		this.prompt.showWithAnim(actionCard);
	}

	/**
	 * Asks player if they wish to upgrade/downgrade/sell/mortgage
	 * properties before moving to next player.
	 * 
	 * If player has no owned properties, will move to next
	 * player instantly.
	 * 
	 * @param {Player} player The player to show the sale interface for.
	 */
	showSaleInterface(player) {
		const ownedTiles = this.board.getTilesOwnedByPlayer(player, Purchasable);
		if(player.debt > 0) {
			this.board.setTilesActive(ownedTiles);
			this.hud.actionText.setText(`${getTokenNameByPlayerId(player.id)}, you must raise funds of £${player.debt}.`).setVisible(true);
		} else if(ownedTiles.length > 0) {
			this.board.setTilesActive(ownedTiles);

			this.hud.actionText.setText(`${getTokenNameByPlayerId(player.id)}, you may modify properties now.`).setVisible(true);

			this.hud.doneButton.removeListener("pointerup");
			this.hud.doneButton.on("pointerup", this.nextPlayer.bind(this));
			this.hud.doneButton.setVisible(true);
		} else if(!player.isRetired) {
			this.nextPlayer();
		}
	}

	/**
	 * Hides the sale interface.
	 */
	hideSaleInterface() {
		this.hud.doneButton.setVisible(false);
		this.hud.actionText.setVisible(false);
		this.board.setTilesActive(null);
	}

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
		const c = new CashText(p, sum);
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
		const c = new CashText(p, -sum);
		this.playerContainer.add(c);
		c.play();
	}

	/**
	 * Called when a player retires from the game.
	 */
	_playerRetire() {
		const playersRemaining = this.players.reduce((remaining, player) => remaining + !player.isRetired, 0);
		if(playersRemaining === 1) {
			const winnerId = this.players.map(e => e.isRetired).indexOf(false);

			this.hud.setPlayerHudEnabled(false);
			this.dice.reset();

			const winText = new Phaser.GameObjects.Text(this.scene, 0, 0, `${getTokenNameByPlayerId(winnerId)} wins!`, WinStyle);
			winText.setStroke(0x000000, 10);
			this.prompt.show(winText);
		}
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