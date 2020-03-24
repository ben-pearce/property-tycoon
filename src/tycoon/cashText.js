import Phaser from "phaser";

class CashText extends Phaser.GameObjects.Text{

	constructor(target, cash) {
		let sign = (cash > 0) ? "+" : "-";
		let amount = Math.abs(cash);
		let string = `Cash: ${sign}$${amount}`;

		super(target.scene, target.x - target.width, target.y - target.height, string, {
			fontFamily: "Arial",
			fontStyle: "bold",
			color: (cash > 0) ? "#008C00" : "#FF0000",
			fontSize: "15px",
			align: "center"
		});

		this.target = target;
		this.cash = cash;
	}

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