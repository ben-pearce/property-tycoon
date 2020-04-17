import Phaser from "phaser";
import PlayerHud from "./playerHud";
import BankHud from "./bankHud";
import ParkingHud from "./parkingHud";
import TimerHud from "./timerHud";


class Hud extends Phaser.GameObjects.Container {
	/**
	 * This class represents our game HUD (heads-up-display)
	 * which is used to display all information about current
	 * progression of the game and player status.
	 * 
	 * Constructor will create all components of the HUD
	 * including player, bank, free parking and timer HUDs.
	 * 
	 * @param {GameManager} game The game manager instance associated
	 * with this hud.
	 */
	constructor(game) {
		super(game.scene);
		this.game = game;

		this.players = [];

		let leftX = 40;
		let rightX = 1160;

		let bankY = 35;
		let timerY = 805;
		let parkingY = 253;

		for(let i = 0; i < game.players.length; i++) {
			let player = game.players[i];
			let playerHud = new PlayerHud(this, player);
			
			let playerY = (playerHud.getBounds().height * i) + (50 * i) + 35;
			playerHud.setPosition(rightX, playerY);

			this.players.push(playerHud);
		}
		
		this.bank = new BankHud(this, game.bank);
		this.bank.setPosition(leftX, bankY);
		
		this.parking = new ParkingHud(this, game.board.tiles[20]);
		this.parking.setPosition(leftX, parkingY);

		this.timer = new TimerHud(this, game.timer);
		this.timer.setPosition(leftX, timerY);

		if(game.timer.seconds === null) {
			this.timer.setVisible(false);
		}

		this.add([this.bank, this.parking, this.timer, ...this.players]);
	}
}

export default Hud;