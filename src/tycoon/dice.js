import Phaser from "phaser";

/**
 * This class represents our dice.
 * 
 * @extends Phaser.Events.EventEmitter
 * 
 * @property {integer[]} result Stores the result for most recent dice roll.
 * @property {Phaser.GameObjects.Sprite} rollSprite The hand roll sprite.
 * @property {Phaser.GameObjects.Sprite} diceOneSprite 
 * @property {Phaser.GameObjects.Sprite} diceTwoSprite
 */
class Dice extends Phaser.Events.EventEmitter {
	/**
	 * Creates three dice sprites, the hand roll sprite,
	 * dice one and two sprites for rolling animation.
	 * 
	 * dice.result always stores the latest result but does not
	 * update until the dice have landed!
	 * 
	 * @example <caption>Example usage of events</caption>
	 * let dice = new Dice(game);
	 * dice.on("rolled", callback);
	 * dice.on("landed", callback);
	 * 
	 * @example <caption>Example of requesting roll</caption>
	 * dice.requestRoll();
	 * 
	 * @param {GameManager} game The game manager the Dice belongs to.
	 */
	constructor(game) {
		super();

		this.game = game;
		this.scene = game.scene;

		this.result = [null, null];

		this.rollSprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, "dice", "roll");
		this.diceOneSprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, "dice", "1");
		this.diceTwoSprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, "dice", "1");

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
		const pointer = this.scene.input.activePointer;
		this.reset();

		this.rollSprite.setVisible(true);
		this.rollSprite.setPosition(pointer.x, pointer.y);

		this.rollSprite.on("pointerup", this.clickRoll.bind(this));
		this.scene.input.on("pointermove", this.updateRollPos.bind(this));
	}

	/**
	 * Moves the die to the centre of the board and
	 * then auto-clicks to start the dice roll.
	 */
	computerRoll() {
		const x = this.game.board.x + this.game.board.background.x + (this.game.board.background.width / 2);
		const y = this.game.board.y + this.game.board.background.y + (this.game.board.background.height / 2);
		const fakePointer = {x: x, y: y};

		this.reset();
		this.clickRoll(fakePointer);
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
	 * @fires Dice#rolled
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

		const minx = this.game.board.x + this.game.board.background.x;
		const miny = this.game.board.y + this.game.board.background.y;
		const maxx = this.game.board.x + this.game.board.background.x + this.game.board.background.width;
		const maxy = this.game.board.y + this.game.board.background.y + this.game.board.background.height;

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
	 * 
	 * @fires Dice#landed
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
		this.rollSprite.off("pointerup");
		this.scene.input.off("pointermove");
		
		this.rollSprite.setVisible(false);
		this.diceOneSprite.setVisible(false);
		this.diceTwoSprite.setVisible(false);

		this.rollSprite.setPosition(-this.rollSprite.width, -this.rollSprite.height);
		this.diceOneSprite.setPosition(0, 0);
		this.diceTwoSprite.setPosition(0, 0);

		this.rollSprite.setScale(1);
	}
}

/**
 * Event fired when dice have landed.
 * 
 * @event Dice#landed
 * @param {integer[]} result The dice result.
 */


/**
 * Event fired when dice have been rolled.
 * 
 * @event Dice#rolled
 */

export default Dice;