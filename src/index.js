import Phaser from "phaser";

const config = {
	type: Phaser.AUTO,
	parent: "tycoon",
	width: 1200,
	height: 900,
	transparent: true,
	scene: {
		preload: preload,
		create: create
	}
};

const game = new Phaser.Game(config);


class Property extends Phaser.GameObjects.Rectangle {
	constructor(position, background) {
		super(position.scene, background.x, background.y, background.width, 20, 0xFF0000);
		this.setStrokeStyle(3, 0x00000);
		this.setOrigin(0);
		this.position = position;

		position.add(this);
	}
}


class Position extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		
		scene.add.existing(this);

		let background = new Phaser.GameObjects.Rectangle(scene, x, y, 60, 100, 0xCDE6D0);
		let text = new Phaser.GameObjects.Text(scene, x, y+25, "PROP", {"color": "#000000"});

		text.setOrigin(0);
		background.setOrigin(0);

		background.setStrokeStyle(3, 0x00000);
		this.add(background);
		this.propertyHolder = new Property(this, background);
		this.add(text);
		
	}
}


function preload() {

}

function create() {
	let scene = game.scene.add("board", {}, true);
	let pos1 = new Position(scene, 0, 0);
	pos1.setAngle(90);
	pos1.setPosition(50, 500);
	new Position(scene, 60, 0);
}

