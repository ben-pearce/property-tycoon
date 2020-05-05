import Phaser from "phaser";

import GameManager from "./tycoon/gameManager";
import Menu from "./tycoon/ui/menu";

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
	this.load.multiatlas("hud", "assets/hud.json", "assets");
	this.load.image("wallpaper", "assets/wall.png");
	this.load.image("logo", "assets/logo.png");
}

/**
 * Entrypoint for program.
 * 
 * Sets up GameManager instance.
 */
function create() {
	const menuScene = this.scene.add("menu", {}, true);
	const gameScene = this.scene.add("game", {});
	
	const menu = new Menu(menuScene);
	
	menu.setPosition(
		(game.config.width / 2),
		(game.config.height / 2)
	);

	menuScene.add.existing(menu);

	menu.setScale(0);
	menuScene.tweens.add({
		targets: menu,
		ease: "Back.easeOut",
		scale: 1
	});

	menu.on("start", (config) => {
		menuScene.tweens.add({
			targets: menu,
			ease: "Back.easeIn",
			y: game.config.height * 2,
			onComplete: () => {
				const gameManager = new GameManager(gameScene, config);
				gameScene.add.existing(gameManager);

				this.scene.switch("menu", "game");
				this.scene.run("game");

				menu.setY(game.config.height / 2);
			}
		});
	});
}

