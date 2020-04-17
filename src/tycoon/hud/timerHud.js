import Phaser from "phaser";
import {TimerStyle} from "../../styles";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

class TimerHud extends Phaser.GameObjects.Container {
	/**
	 * This class represents a timer HUD in the HUD layer.
	 * 
	 * Shows the time remaining on the game timer.
	 * 
	 * @param {Hud} hud The parent hud object.
	 * @param {Player} timer The timer object to represent.
	 */
	constructor(hud, timer) {
		super(hud.scene);
		this.hud = hud;
		this.timer = timer;

		let background = new RoundRectangle(hud.scene, 0, 0, 300, 60, 10, 0x000000, 0.75);
		background.setOrigin(0);

		this.timerText = new Phaser.GameObjects.Text(this.scene, 0, 0, timer.toString(), TimerStyle);
		this.timerText.setStroke(0x000000, 3);
		this.timerText.setStyle({
			fixedWidth: 300,
			wordWrap: {width: 300, useAdvancedWrap: true}
		});
		
		this.add([background, this.timerText]);

		this.timer.on("tick", this.update.bind(this));
		this.timer.on("complete", this.complete.bind(this));
	}

	/**
	 * Updates the timer text.
	 * 
	 * @param {String} text Text to update to.
	 */
	update(text) {
		this.timerText.setText(text);
	}

	/**
	 * Calling this will make the timer text flash to
	 * indicate to the user the timer has now elapsed.
	 */
	complete() {
		setInterval(() => {
			this.timerText.setVisible(!this.timerText.visible);
		}, 500);
	}
}

export default TimerHud;