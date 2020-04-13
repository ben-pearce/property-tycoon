import Phaser from "phaser";

import GameManager from "./tycoon/gameManager";


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
	this.load.multiatlas("tiles", "assets/tiles.json", "assets");
	this.load.multiatlas("upgrades", "assets/upgrades.json", "assets");
	this.load.image("wallpaper", "assets/wall.png");
	this.load.image("watson", "assets/watson.png");
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
	new GameManager(game, 2);
}

