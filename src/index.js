import Phaser from "phaser";
import Board from "./tycoon/board";
import Dice from "./tycoon/dice";
import Player from "./tycoon/player";


// phaser setup stuff
const config = {
	type: Phaser.AUTO,
	parent: "tycoon",
	width: 1500,
	height: 900,
	transparent: true,
	scene: {
		preload: preload,
		create: create
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	}
};

const game = new Phaser.Game(config);

/**
 * Preload assets (images, spritesheets, sounds, etc).
 */
function preload() {
	this.load.multiatlas("dice", "assets/dice.json", "assets");
	this.load.multiatlas("tokens", "assets/tokens.json", "assets");
	this.load.image("wallpaper", "assets/wall.png");
}

/**
 * Entrypoint for program.
 * 
 * Create the board and move it to the middle of the screen.
 * 
 * Create dice and players and game management.
 * 
 * TODO: Move all this logic to its own class?
 */
function create() {
	let scene = game.scene.add("board", {}, true);
	
	let board = new Board(game, scene, 0, 0);
	scene.add.existing(board);

	let boardDimensions = board.getBounds();
	board.setPosition(
		(game.config.width / 2) - boardDimensions.width / 2, 
		(game.config.height / 2) - boardDimensions.height / 2
	);

	let dice = new Dice(board);
	dice.requestRoll();

	let p = new Player(board);
	p.moveToPosition(0);

	dice.on("landed", (result) => {
		let roll = result[0] + result[1];
		let newPos = (p.position + roll) % 39;
		p.moveToPosition(newPos);
		dice.requestRoll();
	});

	let hud = scene.add.existing(new Phaser.GameObjects.Rectangle(scene, 1300, 100, 300, 100, 0x000000, 0.5));
	scene.add.existing(new Phaser.GameObjects.Sprite(scene, 1190, 90, "tokens", "cat"));
	const textStyle = {
		fontFamily: "Arial",
		color: "#FFFFFF", 
		fontSize: "30px"
	};

	const cashStyle = {
		fontFamily: "Arial",
		color: "#FFFFFF", 
		fontSize: "10px"
	};

	let text = scene.add.existing(new Phaser.GameObjects.Text(scene, 1230, 60, "Player 1", textStyle));
	let cash = scene.add.existing(new Phaser.GameObjects.Text(scene, 1230, 100, "Cash: $1500", cashStyle));
	text.setStroke(0x000000, 3);
}

