import Phaser from "phaser";
import {TimerStyle} from "../../styles";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

/**
 * This class represents a timer HUD in the HUD layer.
 * 
 * @extends Phaser.GameObjects.Container
 * @memberof Hud
 * 
 * @property {Phaser.GameObjects.Text} timerText The text object 
 * showing the remaining time.
 */
class TimerHud extends Phaser.GameObjects.Container {
	/**
	 * Creates a background and a text object to
	 * show the remaining time.
	 * 
	 * @param {Phaser.Scene} scene The scene this HUD belongs to.
	 * @param {Hud} hud The parent hud object.
	 * @param {Player} timer The timer object to represent.
	 */
	constructor(scene, hud, timer) {
		super(scene);

		this.hud = hud;
		this.timer = timer;

		const background = new RoundRectangle(this.scene, 0, 0, 300, 60, 10, 0x000000, 0.75);
		background.setOrigin(0);

		this.timerText = new Phaser.GameObjects.Text(this.scene, 0, 0, timer.toString(), TimerStyle);
		this.timerText.setStroke(0x000000, 3);
		this.timerText.setStyle({
			fixedWidth: 300,
			wordWrap: {width: 300, useAdvancedWrap: true}
		});
		
		this.add([background, this.timerText]);

		this.timer.on("tick", this._update.bind(this));
		this.timer.on("complete", this._complete.bind(this));
	}

	/**
	 * Updates the timer text.
	 * 
	 * @param {string} text Text to update to.
	 * 
	 * @private
	 */
	_update(text) {
		this.timerText.setText(text);
	}

	/**
	 * Calling this will make the timer text flash to
	 * indicate to the user the timer has now elapsed.
	 * 
	 * @private
	 */
	_complete() {
		setInterval(() => {
			this.timerText.setVisible(!this.timerText.visible);
		}, 500);
	}
}

export default TimerHud;