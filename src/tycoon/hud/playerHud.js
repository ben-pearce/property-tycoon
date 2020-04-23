import Phaser from "phaser";
import {PlayerNameStyle, PlayerCashStyle} from "../../styles";
import {getTokenNameByPlayerId, getTokenSpriteByPlayerId} from "../utils";
import {Hud} from "../../constants";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

/**
 * This class represents a player HUD object in the 
 * HUD layer.
 * 
 * @extends Phaser.GameObjects.Container
 * @memberof Hud
 * 
 * @property {Hud} hud The hud layer this belongs to.
 * @property {Player} player The player instance this observes.
 * @property {integer} cash The cash held.
 */
class PlayerHud extends Phaser.GameObjects.Container {
	/**
	 * Creates the player token, their cash and 
	 * allows the user to see owned properties.
	 * 
	 * @param {Hud} hud The parent hud object.
	 * @param {Player} player The player this hud represents.
	 */
	constructor(hud, player) {
		super(hud.scene);
		this.hud = hud;
		this.player = player;
		this.cash = player.cash;

		let background = new RoundRectangle(hud.scene, 0, 0, 300, 100, 10, 0x000000, 0.75);
		background.setOrigin(0);

		let tokenGraphic = new Phaser.GameObjects.Sprite(this.scene, 40, 40, "tokens", getTokenSpriteByPlayerId(player.id));
		let nameText = new Phaser.GameObjects.Text(this.scene, 80, 10, getTokenNameByPlayerId(player.id), PlayerNameStyle);
		nameText.setStroke(0x000000, 3);

		this.cashText = new Phaser.GameObjects.Text(this.scene, 83, 45, `Cash $${player.cash}`, PlayerCashStyle);
		this.add([background, tokenGraphic, nameText, this.cashText]);

		this.player.on("deposit", this.updateCash.bind(this));
		this.player.on("withdraw", this.updateCash.bind(this));
	}

	/**
	 * Update the cash value for this HUD.
	 * 
	 * Cash text will temporarily change color to
	 * reflect gain/loss. Then color will reset back
	 * to default.
	 * 
	 * Timeout will be set to call this.reset() after
	 * Hud.CASH_UPDATE_TIMEOUT milliseconds.
	 */
	updateCash() {
		let string = `Cash $${this.player.cash}`;
		
		this.cashText.setStyle({color: (this.player.cash > this.cash) ? Hud.POSITIVE_COLOR : Hud.NEGATIVE_COLOR});
		this.cashText.setText(string);

		this.cash = this.player.cash;
		setTimeout(this.reset.bind(this), Hud.CASH_UPDATE_TIMEOUT);
	}

	/**
	 * Resets cash text color back to default.
	 */
	reset() {
		this.cashText.setStyle({color: Hud.TEXT_COLOR});
	}
}

export default PlayerHud;