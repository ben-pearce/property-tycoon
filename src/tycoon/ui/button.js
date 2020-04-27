import Phaser from "phaser";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

/**
 * Creates a visually appealing and scalable button.
 * 
 * @memberof UI
 * @extends Phaser.GameObjects.Container
 * 
 * @property {integer} color The button color.
 * @property {RoundRectangle} background The button background.
 * @property {Phaser.GameObjects.Text} text The text on the button.
 */
class Button extends Phaser.GameObjects.Container {
	/**
	 * Creates button background and text.
	 * 
	 * @param {Phaser.Scene} scene Button phaser scene.
	 * @param {integer} x Button x-axis.
	 * @param {integer} y Button y-axis.
	 * @param {integer} width Button width
	 * @param {integer} height Button height
	 * @param {string} text Button text
	 * @param {integer} color Button color
	 * @param {boolean} isEnabled Is button enabled or not.
	 */
	constructor(scene, x, y, width, height, text, color) {
		super(scene, x, y);

		this.isEnabled = null;
		this.color = color;

		this.background = new RoundRectangle(this.scene, 0, 0, width, height, 15, color);
		this.background.setAlpha(0.5).setStrokeStyle(3, color).setOrigin(0);

		this.text = new Phaser.GameObjects.Text(this.scene, 0, 0, text, {
			fontFamily: "Arial",
			color: "#000000",
			fontSize: height / 2 + "px",
			align: "center",
			fixedWidth: this.background.width
		});
		this.text.setY((this.background.height / 2) - (this.text.height / 2));

		this.on("pointerover", this._buttonPointerOver.bind(this));
		this.on("pointerout", this._buttonPointerOut.bind(this));

		this.add([this.background, this.text]);
		this.setEnabled(true);
	}

	/**
	 * Called on pointer hover.
	 * 
	 * @private
	 */
	_buttonPointerOut() {
		this.background.setAlpha(0.5);
		this.text.setColor("#000000");
	}

	/**
	 * Called on pointer rollout.
	 * 
	 * @private
	 */
	_buttonPointerOver() {
		this.background.setAlpha(1);
		this.text.setColor("#FFFFFF");
	}

	/**
	 * Sets interactivity of this button.
	 * 
	 * @param {boolean} enabled Button enabled?
	 */
	setEnabled(enabled) {
		this.isEnabled = enabled;
		if(enabled) {
			this.setInteractive({hitArea: this.background, 
				hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
				useHandCursor: true});
			this.setAlpha(1);
		} else {
			this._buttonPointerOut();
			this.disableInteractive();
			this.setAlpha(0.5);
		}
	}
}

export default Button;