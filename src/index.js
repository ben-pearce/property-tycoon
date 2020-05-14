import Phaser from "phaser";
import Board from "./tycoon/board";
import Dice from "./tycoon/dice";
import Player from "./tycoon/player";


// phaser setup stuff
const config = {
	type: Phaser.AUTO,
	parent: "tycoon",
	width: 1200,
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
}

