import Phaser from "phaser";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";

class Button extends Phaser.GameObjects.Container {
	/**
	 * A game button.
	 * 
	 * Creates a visually appealing and scalable button.
	 * 
	 * @param {Phaser.Scene} scene 
	 * @param {Integer} x 
	 * @param {Integer} y 
	 * @param {Integer} width 
	 * @param {Integer} height 
	 * @param {String} text 
	 * @param {Integer} color 
	 */
	constructor(scene, x, y, width, height, text, color) {
		super(scene, x, y);

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
	 */
	_buttonPointerOut() {
		this.background.setAlpha(0.5);
		this.text.setColor("#000000");
	}

	/**
	 * Called on pointer rollout.
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
		if(enabled) {
			this.setInteractive({hitArea: this.background, 
				hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
				useHandCursor: true});
			this.setAlpha(1);
		} else {
			this.disableInteractive();
			this.setAlpha(0.5);
		}
	}
}

export default Button;