import Phaser from "phaser";
import {PlayerNameStyle, PlayerCashStyle} from "../../styles";
import {getTokenNameByPlayerId, getTokenSpriteByPlayerId} from "../utils";
import {Hud} from "../../enums";
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
	 * @param {Phaser.Scene} scene The scene this HUD belongs to.
	 * @param {Hud} hud The parent hud object.
	 * @param {Player} player The player this hud represents.
	 */
	constructor(scene, hud, player) {
		super(scene);

		this.hud = hud;
		this.player = player;
		this.cash = player.cash;

		this.background = new RoundRectangle(this.scene, 0, 0, 300, 100, 10, 0x000000, 0.75);
		this.background.setOrigin(0);

		const tokenGraphic = new Phaser.GameObjects.Sprite(this.scene, 40, 40, "tokens", getTokenSpriteByPlayerId(player.id));
		const nameText = new Phaser.GameObjects.Text(this.scene, 80, 10, getTokenNameByPlayerId(player.id), PlayerNameStyle);
		nameText.setStroke(0x000000, 3);

		this.cashText = new Phaser.GameObjects.Text(this.scene, 83, 45, `Cash £${player.cash}`, PlayerCashStyle);
		this.add([this.background, tokenGraphic, nameText, this.cashText]);

		this.player.on("deposit", this._updateCash.bind(this));
		this.player.on("withdraw", this._updateCash.bind(this));
	}

	/**
	 * Sets the player HUD state as the current
	 * player.
	 * 
	 * If set to true, a while border will flash a few
	 * times before becoming solid.
	 * 
	 * If set to false, the white border will be removed.
	 * 
	 * @param {boolean} isCurrentPlayer Is this HUD the current player or not.
	 */
	setCurrentPlayer(isCurrentPlayer) {
		if(isCurrentPlayer) {
			let count = 0;
			let interval = setInterval(() => {
				this.background.setStrokeStyle((count % 2 == 0) ? 5 : 0, 0xFFFFFF);
				count++;
	
				if(count == 5) {
					clearInterval(interval);
				}
			}, 250);
		} else {
			this.background.setStrokeStyle(null);
		}
	}

	/**
	 * Update the cash value for this HUD.
	 * 
	 * Cash text will temporarily change color to
	 * reflect gain/loss. Then color will reset back
	 * to default.
	 * 
	 * A timeout will be set to call {@link reset}() after
	 * {@link Hud#CASH_UPDATE_TIMEOUT} milliseconds.
	 * 
	 * @private
	 */
	_updateCash() {
		let string = `Cash £${this.player.cash}`;
		
		this.cashText.setStyle({color: (this.player.cash > this.cash) ? Hud.POSITIVE_COLOR : Hud.NEGATIVE_COLOR});
		this.cashText.setText(string);

		this.cash = this.player.cash;
		setTimeout(this._reset.bind(this), Hud.CASH_UPDATE_TIMEOUT);
	}

	/**
	 * Resets cash text color back to default.
	 * 
	 * @private
	 */
	_reset() {
		this.cashText.setStyle({color: Hud.TEXT_COLOR});
	}
}

export default PlayerHud;