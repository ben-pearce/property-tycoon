import Phaser from "phaser";
import {CashUpdateStyle} from "../../styles";

/**
 * A special animated text for when players earn
 * and lose cash.
 * 
 * Text "floats up" from the target movieclip and then
 * quickly fades away.
 * 
 * This will destroy itself after animation completes.
 * 
 * @memberof UI
 * @extends Phaser.GameObjects.Text
 * 
 * @param {Phaser.GameObjects.Sprite} target The target movieclip to float from.
 * @param {integer} cash The cash value.
 */
class CashText extends Phaser.GameObjects.Text {
	/**
	 * Takes a target movieclip and integer cash value.
	 * 
	 * @param {Phaser.GameObjects.Sprite} target The target movieclip to float from.
	 * @param {integer} cash The cash value.
	 */
	constructor(target, cash) {
		let sign = (cash > 0) ? "+" : "-";
		let amount = Math.abs(cash);
		let string = `Cash: ${sign}£${amount}`;
		let style = Object.assign({
			color: (cash > 0) ? "#008C00" : "#FF0000",
		}, CashUpdateStyle);
		super(target.scene, target.x - target.width, target.y - target.height, string, style);

		this.target = target;
		this.cash = cash;
	}

	/**
	 * Call to start animation.
	 */
	play() {
		let timeline = this.scene.tweens.createTimeline();

		timeline.add({
			targets: this,
			ease: "Quint.easeOut",
			y: this.y - 20
		}).add({
			targets: this,
			ease: "Cubic.easeOut", 
			alpha: 0
		});

		timeline.setCallback("onComplete", this.destroy);
		timeline.play();
	}
}

export default CashText;