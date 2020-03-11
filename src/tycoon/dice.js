import Phaser from "phaser";


class Dice extends Phaser.Events.EventEmitter {
	/**
	 * This class represents our dice, it is an EventEmitter,
	 * meaning we can listen for events on it. The events you
	 * can listen for are as follows:
	 * 
	 * dice.on("roll", callback)
	 * 
	 * 	Fired when a the user clicks the dice to roll, does NOT
	 * 	provide any insight into the dice roll result.
	 * 
	 * dice.on("landed", callback)
	 * 
	 * 	Fired when the dice "land" and provides the result as an
	 * 	array of two integers (diceoneresult, dicetworesult).
	 * 
	 * Dice roll example:
	 * 	
	 * dice.requestRoll()
	 * 
	 * dice.result always stores the latest result but does not
	 * update until the dice have landed!
	 * 
	 * @param {GameManager} game The game manager the Dice belongs to.
	 */
	constructor(game) {
		super();

		this.game = game;
		this.scene = game.scene;

		this.result = (null, null);

		this.rollSprite = this.scene.add.sprite(0, 0, "dice", "roll");
		this.diceOneSprite = this.scene.add.sprite(0, 0, "dice", "1");
		this.diceTwoSprite = this.scene.add.sprite(0, 0, "dice", "1");

		this.rollSprite.setInteractive({useHandCursor: true});
		this.rollSprite.on("pointerdown", () => {
			this.rollSprite.setScale(0.75);
		});

		this.scene.anims.create({
			key: "roll",
			frames: this.scene.anims.generateFrameNumbers("dice", {start: 1, end: 6}),
			frameRate: 10,
			repeat: -1
		});

		this.reset();
	}

	/**
	 * Resets the die and makes the rollSprite visible.
	 * 
	 * Assigns listeners to the rollSprite so it knows
	 * what to do when it is pressed or the cursor is
	 * moved.
	 */
	requestRoll() {
		let pointer = this.scene.input.activePointer;
		this.reset();

		this.rollSprite.setVisible(true);
		this.rollSprite.setPosition(pointer.x, pointer.y);

		this.rollSprite.on("pointerup", this.clickRoll.bind(this));
		this.scene.input.on("pointermove", this.updateRollPos.bind(this));
	}

	/**
	 * This is called when the mouse cursor moves.
	 * 
	 * It just moves the rollSprite to the cursor.
	 * @param {Phaser.Input.Pointer} pointer The pointer
	 */
	updateRollPos(pointer) {
		this.rollSprite.setPosition(pointer.x, pointer.y);
	}

	/**
	 * This is called when the rollSprite is clicked.
	 * 
	 * Removes the active listeners from the sprites, and makes
	 * the two dice visible. 
	 * 
	 * Both dice are tweened to a random position and keep cylcing
	 * frames until they "land", at which point this.land() will
	 * be called.
	 * @param {Phaser.Input.Pointer} pointer The pointer
	 */
	clickRoll(pointer) {
		this.emit("rolled");

		this.rollSprite.off("pointerup");
		this.scene.input.off("pointermove");

		this.rollSprite.setVisible(false);
		this.diceOneSprite.setVisible(true);
		this.diceTwoSprite.setVisible(true);

		this.diceOneSprite.setPosition(pointer.x, pointer.y);
		this.diceTwoSprite.setPosition(pointer.x, pointer.y);

		let minx = this.game.board.x + this.game.board.background.x;
		let miny = this.game.board.y + this.game.board.background.y;
		let maxx = this.game.board.x + this.game.board.background.x + this.game.board.background.width;
		let maxy = this.game.board.y + this.game.board.background.y + this.game.board.background.height;

		this.scene.tweens.add({
			targets: this.diceOneSprite,
			ease: "Cubic.easeOut",
			x: Phaser.Math.Between(minx, maxx),
			y: Phaser.Math.Between(miny, maxy),
			angle: Phaser.Math.Between(0, 360)
		});

		this.scene.tweens.add({
			targets: this.diceTwoSprite,
			ease: "Cubic.easeOut",
			x: Phaser.Math.Between(minx, maxx),
			y: Phaser.Math.Between(miny, maxy),
			angle: Phaser.Math.Between(0, 360),
			onComplete: this.land.bind(this)
		});

		this.diceOneSprite.anims.play("roll");
		this.diceTwoSprite.anims.play("roll");
	}

	/**
	 * Called once the dice "land".
	 * 
	 * Stops animations and emits the "landed" event
	 * with the result as the parameter.
	 */
	land() {
		this.result = [Phaser.Math.Between(1, 6), Phaser.Math.Between(1, 6)];
		this.diceOneSprite.anims.stop();
		this.diceTwoSprite.anims.stop();

		this.diceOneSprite.setFrame(this.result[0]);
		this.diceTwoSprite.setFrame(this.result[1]);

		this.emit("landed", this.result);
	}

	/**
	 * Reset sprites to their initial state.
	 */
	reset() {
		this.rollSprite.setVisible(false);
		this.diceOneSprite.setVisible(false);
		this.diceTwoSprite.setVisible(false);

		this.rollSprite.setPosition(-this.rollSprite.width, -this.rollSprite.height);
		this.diceOneSprite.setPosition(0, 0);
		this.diceTwoSprite.setPosition(0, 0);

		this.rollSprite.setScale(1);
		this.scene.children.bringToTop(this.rollSprite);
	}
}

export default Dice;