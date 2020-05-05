import Phaser from "phaser";
import {MenuStyle} from "../../styles";
import {getTokenSpriteByPlayerId, getTimerSecondsByOption} from "../utils";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Button from "./button";
import {Buttons} from "../../enums";

/**
 * This class represents the game menu.
 */
class Menu extends Phaser.GameObjects.Container {
	/**
	 * @param {Phaser.Scene} scene The phaser scene.
	 */
	constructor(scene) {
		super(scene);

		const background = new RoundRectangle(this.scene, 0, 0, 600, 650, 10, 0xffffff);
		const topOfMenu = background.x - background.height / 2;
		const leftOfMenu = background.y - background.width / 2;

		const logo = new Phaser.GameObjects.Sprite(this.scene, 0, topOfMenu + 80, "logo");
		const playerText = new Phaser.GameObjects.Text(this.scene, leftOfMenu + 25, logo.y + 60, "Players", MenuStyle);
		const computerText = new Phaser.GameObjects.Text(this.scene, leftOfMenu + 25, playerText.y + 150, "Computer", MenuStyle);
		const timerText = new Phaser.GameObjects.Text(this.scene, leftOfMenu + 25, computerText.y + 150, "Timer", MenuStyle);
		const playerBackground = new RoundRectangle(this.scene, 0, playerText.y + 90, 550, 90, 10, 0xD7D7D7);
		const computerBackground = new RoundRectangle(this.scene, 0, computerText.y + 90, 550, 90, 10, 0xD7D7D7);

		this.button = new Button(this.scene, leftOfMenu + 25, computerBackground.y + 180, 550, 70, "Play", Buttons.AMBER);

		this.timerOption = 0;
		this.playerCount = 0;
		this.computerCount = 0;

		this._setupPlayerOptions(leftOfMenu, playerBackground.y, computerBackground.y);
		this._setupTimerOptions(leftOfMenu, timerText.y + 50);

		this.reset();
		this.add([background, logo, playerText, computerText, timerText, playerBackground, computerBackground, this.button]);
		this.add([this.slider, ...this.timerOptions]);
		this.add([this.playerSlider, this.computerSlider, ...this.playerTokens, ...this.computerTokens]);

		this.button.on("pointerup", this.playButtonPressed.bind(this));
	}

	/**
	 * Create the timer option UI elements.
	 * 
	 * @param {integer} x The X position.
	 * @param {integer} y The Y position.
	 * 
	 * @private
	 */
	_setupTimerOptions(x, y) {
		this.slider = new RoundRectangle(this.scene, 0, 0, 0, 0, 10, Buttons.AMBER, 0.5);
		this.slider.setStrokeStyle(3, Buttons.AMBER).setOrigin(0).setInteractive();

		const timerOptionText = ["Off", "30min", "1hr", "1hr 30min", "2hr"];
		this.timerOptions = [];
		let timerMargin = 40;
		for(let i = 0; i < timerOptionText.length; i++) {
			const option = timerOptionText[i];
			const text = new Phaser.GameObjects.Text(this.scene, x + timerMargin, y, option, MenuStyle);
			text.setInteractive({useHandCursor: true});
			text.on("pointerover", this.moveTimerSlider.bind(this, i));
			text.on("pointerup", this.setTimerOption.bind(this, i));
			text.on("pointerout", this.resetTimerSlider.bind(this));
	
			timerMargin += text.width + 40;
			this.timerOptions.push(text);
		}
	}

	/**
	 * Create player option UI elements.
	 * 
	 * @param {integer} x The X position.
	 * @param {integer} y The Y position for player.
	 * @param {integer} y2 The Y position for computer.
	 * 
	 * @private
	 */
	_setupPlayerOptions(x, y, y2) {
		this.playerSlider = new RoundRectangle(this.scene, 0, 0, 0, 0, 10, Buttons.AMBER, 0.5);
		this.playerSlider.setStrokeStyle(3, Buttons.AMBER).setOrigin(0).setInteractive();

		this.computerSlider = new RoundRectangle(this.scene, 0, 0, 0, 0, 10, Buttons.AMBER, 0.5);
		this.computerSlider.setStrokeStyle(3, Buttons.AMBER).setOrigin(0).setInteractive();

		this.playerTokens = [];
		this.computerTokens = [];
		let tokenMargin = 80;
		for(let i = 0; i < 6; i++) {
			const playerToken = new Phaser.GameObjects.Sprite(this.scene, x + tokenMargin, y, "tokens", getTokenSpriteByPlayerId(i));
			const computerToken = new Phaser.GameObjects.Sprite(this.scene, x + tokenMargin, y2, "tokens", getTokenSpriteByPlayerId(i));

			playerToken.setInteractive({useHandCursor: true});
			computerToken.setInteractive({useHandCursor: true});

			playerToken.on("pointerover", this.movePlayerSlider.bind(this, i + 1));
			playerToken.on("pointerup", this.setPlayerCount.bind(this, i + 1));
			playerToken.on("pointerout", this.resetPlayerSlider.bind(this));

			computerToken.on("pointerover", () => { 
				this.moveComputerSlider(i - this.playerCount + 1);
			});
			computerToken.on("pointerup", () => {
				this.setComputerCount(i - this.playerCount + 1);
			});
			computerToken.on("pointerout", this.resetComputerSlider.bind(this));

			this.playerTokens.push(playerToken);
			this.computerTokens.push(computerToken);

			tokenMargin += 85;
		}
	}

	/**
	 * This function is invoked after play button has been
	 * pressed in the menu.
	 * 
	 * Emits the "start" event to let the outside know the
	 * user is now finished with the menu.
	 * 
	 * @fires Menu#start
	 */
	playButtonPressed() {
		this.button.setEnabled(false);
		this.emit("start", {
			playerCount: this.playerCount,
			computerCount: this.computerCount,
			timer: getTimerSecondsByOption(this.timerOption)
		});
	}

	/**
	 * Makes the unusable computer tokens non-interactive so
	 * that user cannot select overlapping regular and computer
	 * player tokens.
	 * 
	 * Also sets token alpha to 0.5 to give visual indication to
	 * user that these tokens are not available.
	 */
	disableComputerTokens() {
		for(let i = 0; i < this.playerCount; i++) {
			const computerToken = this.computerTokens[i];
			computerToken.setAlpha(0.5);
			computerToken.disableInteractive();
		}
	}

	/**
	 * Re-enables all computer token options.
	 */
	enableComputerTokens() {
		for(let i = 0; i < 6; i++) {
			const computerToken = this.computerTokens[i];
			computerToken.setAlpha(1);
			computerToken.setInteractive();
		}
	}

	/**
	 * Sets the player count based on count passed in.
	 * 
	 * This also moves the slider but does not tween. So
	 * this function basically makes the choice "permanent".
	 * 
	 * @param {integer} count The player count.
	 */
	setPlayerCount(count) {
		const firstPlayer = this.playerTokens[0];
		this.playerSlider.setVisible(count > 0);
		this.playerSlider.setPosition((firstPlayer.x - firstPlayer.width / 2) - 20, (firstPlayer.y - firstPlayer.height / 2) - 10);
		this.playerSlider.setSize((firstPlayer.width * count) + 38 * count, firstPlayer.height + 20);

		this.playerCount = count;

		this.enableComputerTokens();
		this.disableComputerTokens();
		this.setComputerCount(0);

		this.button.setEnabled(this.playerCount + this.computerCount >= 2);
	}

	/**
	 * Sets the computer player count based on count passed in.
	 * 
	 * This also moves the slider but does not tween. So
	 * this function basically makes the choice "permanent".
	 * 
	 * @param {integer} count The computer player count.
	 */
	setComputerCount(count) {
		if(this.playerCount < this.computerTokens.length) {
			const firstPlayer = this.computerTokens[this.playerCount];
		
			this.computerSlider.setPosition((firstPlayer.x - firstPlayer.width / 2) - 20, (firstPlayer.y - firstPlayer.height / 2) - 10);
			this.computerSlider.setSize((firstPlayer.width * count) + 38 * count, firstPlayer.height + 20);
		}

		this.computerSlider.setVisible(count > 0);
		this.computerCount = count;

		this.button.setEnabled(this.playerCount + this.computerCount >= 2);
	}

	/**
	 * Sets the timer option based on option passed in.
	 * 
	 * This also moves the slider but does not tween. So
	 * this function basically makes the choice "permanent".
	 * 
	 * @param {integer} option The timer option.
	 */
	setTimerOption(option) {
		const oldOptionText = this.timerOptions[this.timerOption];
		oldOptionText.setColor("#000000");
		const newOptionText = this.timerOptions[option];
		newOptionText.setColor("#E5AE19");
		this.slider.setPosition(newOptionText.x - 10, newOptionText.y - 10);
		this.slider.setSize(newOptionText.width + 20, newOptionText.height + 20);
		this.timerOption = option;
	}

	/**
	 * Moves & tweens the player slider to the correct 
	 * state based on the player count passed in.
	 * 
	 * @param {integer} count The player count.
	 */
	movePlayerSlider(count) {
		const firstPlayer = this.playerTokens[0];
		this.playerSlider.setVisible(count > 0);
		this.scene.tweens.add({
			targets: this.playerSlider,
			ease: "Cubic.easeOut",
			width: (firstPlayer.width * count) + 38 * count
		});
	}

	/**
	 * Moves & tweens the computer player slider to the correct 
	 * state based on the player count passed in.
	 * 
	 * @param {integer} count The computer player count.
	 */
	moveComputerSlider(count) {
		this.computerSlider.setVisible(count > 0);
		if(this.playerCount < this.computerTokens.length) {
			const firstPlayer = this.computerTokens[this.playerCount];
			this.scene.tweens.add({
				targets: this.computerSlider,
				ease: "Cubic.easeOut",
				x: (firstPlayer.x - firstPlayer.width / 2) - 20,
				width: (firstPlayer.width * count) + 38 * count
			});
		}
	}

	/**
	 * Moves & tweens the timer slider to the correct state based
	 * on the timer option passed in.
	 * 
	 * @param {integer} option The timer option.
	 */
	moveTimerSlider(option) {
		const text = this.timerOptions[option];
		this.scene.tweens.add({
			targets: this.slider,
			ease: "Cubic.easeOut",
			x: text.x - 10,
			y: text.y - 10,
			width: text.width + 20,
			height: text.height + 20
		});
	}

	/**
	 * Move the player slider back to state relative
	 * to this.playerCount.
	 * 
	 * If the player option has been interactive with  but
	 * not changed then this will move the slider back to its
	 * previous position.
	 */
	resetPlayerSlider() {
		this.movePlayerSlider(this.playerCount);
	}

	/**
	 * Move the computer slider back to state relative
	 * to this.computerCount.
	 * 
	 * If the computer option has been interactive with  but
	 * not changed then this will move the slider back to its
	 * previous position.
	 */
	resetComputerSlider() {
		this.moveComputerSlider(this.computerCount);
	}

	/**
	 * Move timer slider back to state relative to
	 * this.timerOption.
	 * 
	 * If timer has been interacted with but not changed
	 * then this will move the slider back to its previous
	 * position.
	 */
	resetTimerSlider() {
		this.moveTimerSlider(this.timerOption);
	}

	/**
	 * Resets the menu back to its starting state.
	 */
	reset() {
		this.enableComputerTokens();
		this.setPlayerCount(0);
		this.setComputerCount(0);
		this.setTimerOption(0);
	}
}

/**
 * @typedef {Object} GameConfig
 * @property {integer} playerCount Number of human players.
 * @property {integer} computerCount Number of computer players.
 * @property {?integer} timer The length of timer in seconds.
 */

/**
 * Event fires once the player has finished with the
 * menu and clicked play.
 * 
 * @event Menu#start
 * @type {GameConfig}
 */

export default Menu;