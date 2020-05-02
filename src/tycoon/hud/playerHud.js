import Phaser from "phaser";
import {PlayerNameStyle, PlayerCashStyle} from "../../styles";
import {getTokenNameByPlayerId, getTokenSpriteByPlayerId} from "../utils";
import {Hud} from "../../enums";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Purchasable from "../tiles/purchasable";

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

		this.background = new RoundRectangle(this.scene, 0, 0, 300, 110, 10, 0x000000, 0.75);
		this.background.setOrigin(0);

		const tokenGraphic = new Phaser.GameObjects.Sprite(this.scene, 40, 40, "tokens", getTokenSpriteByPlayerId(player.id));
		const nameText = new Phaser.GameObjects.Text(this.scene, 80, 10, getTokenNameByPlayerId(player.id), PlayerNameStyle);
		nameText.setStroke(0x000000, 3);

		const computerGraphic = new Phaser.GameObjects.Sprite(this.scene, 270, 20, "hud", "computer");
		const copGraphic = new Phaser.GameObjects.Sprite(this.scene, 270, 20, "hud", "cop");

		computerGraphic.setVisible(player.isComputer);
		copGraphic.setY(player.isComputer ? 55 : 20).setVisible(false);

		this.propertiesButton = new Phaser.GameObjects.Text(this.scene, 20, 85, "Properties", PlayerCashStyle);
		this.forfeitButton = new Phaser.GameObjects.Text(this.scene, 240, 85, "Forfeit", PlayerCashStyle);

		this.propertiesButton.on("pointerover", () => {
			this.hud.game.dice.rollSprite.setVisible(false);

			const ownedTiles = this.hud.game.board.getTilesOwnedByPlayer(this.player, Purchasable);
			this.hud.game.board.highlightTiles(ownedTiles);
		});

		this.propertiesButton.on("pointerout", () => {
			this.hud.game.dice.rollSprite.setVisible(true);

			this.hud.game.board.highlightTiles(null);
		});

		this.forfeitButton.on("pointerover", () => this.hud.game.dice.rollSprite.setVisible(false));
		this.forfeitButton.on("pointerout", () => this.hud.game.dice.rollSprite.setVisible(true));

		this.forfeitButton.on("pointerup", () => {
			// eslint-disable-next-line no-undef
			const wantsRetirement = confirm(`${getTokenNameByPlayerId(player.id)}, do you want to retire from this game?`);
			if(wantsRetirement) {
				this.player.retire(this.hud.game.bank);
			}
		});

		const cashString =  `Cash £${player.cash.toLocaleString()}`;
		this.cashText = new Phaser.GameObjects.Text(this.scene, 83, 45, cashString, PlayerCashStyle);

		const netString = `Net worth £${player.getNetWorth().toLocaleString()}`;
		this.netText = new Phaser.GameObjects.Text(this.scene, 83, 65, netString, PlayerCashStyle);

		this.add([this.background, tokenGraphic, nameText, computerGraphic, copGraphic, this.cashText, this.netText, 
			this.propertiesButton, this.forfeitButton]);

		this.player.on("deposit", this._updateCash.bind(this));
		this.player.on("withdraw", this._updateCash.bind(this));

		this.player.on("jailpickup", copGraphic.setVisible.bind(copGraphic, true));
		this.player.on("jaildrop",   copGraphic.setVisible.bind(copGraphic, false));

		this.player.on("retire", this.setAlpha.bind(this, 0.5));
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
		clearInterval(this.flashInterval);
		if(isCurrentPlayer) {
			let count = 0;
			this.flashInterval = setInterval(() => {
				this.background.setStrokeStyle((count % 2 == 0) ? 5 : 0, 0xFFFFFF);
				count++;
	
				if(count == 5) {
					clearInterval(this.flashInterval);
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
		const cashString = `Cash £${this.player.cash.toLocaleString()}`;
		const netString = `Net worth £${this.player.getNetWorth().toLocaleString()}`;
		
		this.cashText.setStyle({color: (this.player.cash > this.cash) ? Hud.POSITIVE_COLOR : Hud.NEGATIVE_COLOR}).setText(cashString);
		this.netText.setStyle({color: this.cashText.style.color}).setText(netString);

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
		this.netText.setStyle({color: Hud.TEXT_COLOR});
	}
}

export default PlayerHud;