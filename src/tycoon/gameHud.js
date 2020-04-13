import Phaser from "phaser";
import GeneralConfig from "../general";
import {PlayerNameStyle, PlayerCashStyle} from "../styles";

class PlayerHud extends Phaser.GameObjects.Container {
	constructor(hud, player) {
		super(hud.scene);
		this.hud = hud;
		this.player = player;

		let graphics = new Phaser.GameObjects.Graphics(hud.scene);
		graphics.fillStyle(0x000000, 0.75);
		graphics.fillRoundedRect(0, 0, 300, 100, 10);

		let cashString = `Cash $${player.cash}`;

		let tokenGraphic = new Phaser.GameObjects.Sprite(this.scene, 40, 40, "tokens", GeneralConfig.player.token[player.id]);
		let nameText = new Phaser.GameObjects.Text(this.scene, 80, 10, GeneralConfig.player.titles[player.id], PlayerNameStyle);
		let cashText = new Phaser.GameObjects.Text(this.scene, 83, 45, cashString, PlayerCashStyle);
		nameText.setStroke(0x000000, 3);
		
		this.add([graphics, tokenGraphic, nameText, cashText]);
	}
}

class GameHud extends Phaser.GameObjects.Container {
	constructor(game) {
		super(game.scene);
		this.game = game;

		this.playerHuds = [];

		for(let i = 0; i < game.players.length; i++) {
			let player = game.players[i];
			let playerHud = new PlayerHud(game, player);
			let x = 1150;
			let y = (playerHud.getBounds().height * i) + (50 * i) + 50;
			console.log(y);
			playerHud.setPosition(x, y);

			this.playerHuds.push(playerHud);
		}

		this.add(this.playerHuds);
	}
}

export default GameHud;