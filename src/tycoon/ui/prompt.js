import Phaser from "phaser";
import Card from "../cards/card";

/**
 * Game prompt layer.
 * 
 * Allows for creating prompts in a "lightbox" style
 * pop-up window.
 * 
 * Used primarily for displaying game cards like property
 * cards and opportunity cards.
 * 
 * @memberof UI
 * @extends Phaser.GameObjects.Container
 * 
 * @property {?Phaser.GameObject} promptGameObject The game object to show in the window.
 * @property {Phaser.GameObjects.Rectangle} background The prompt layer background.
 * @property {boolean} isShowing Is the prompt in shown state or not.
 */
class Prompt extends Phaser.GameObjects.Container {
	/**
	 * Creates prompt background.
	 * 
	 * @param {GameManager} game The game manager instance this belongs to.
	 */
	constructor(game) {
		super(game.scene);
		this.game = game;

		this.promptGameObject = null;

		this.background = new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.game.game.config.width, this.game.game.config.height, 0x000000, 0.5);
		this.background.setOrigin(0);
		this.background.setVisible(false);

		this.isShowing = false;

		this.add([this.background]);
	}

	/**
	 * Shows the game object in this prompt window and
	 * applys a tween bounce effect as it flys in from
	 * the bottom.
	 * 
	 * @param {Phaser.GameObject} promptGameObject The game object to show in the prompt window.
	 * @param {?Prompt~animationCallback} [cb=null] Callback invoked when animation completes.
	 */
	showWithAnim(promptGameObject, cb=null) {
		this.show(promptGameObject);
		this.promptGameObject.setPosition(this.game.game.config.width / 2, this.game.game.config.height * 2);

		const onComplete = () => {
			if(this.promptGameObject instanceof Card) {
				this.promptGameObject.setEnabled(true);
			}
			if(typeof cb === "function") {
				cb();
			}
		};

		if(this.promptGameObject instanceof Card) {
			this.promptGameObject.setEnabled(false);
		}

		this.scene.tweens.add({
			targets: this.promptGameObject,
			ease: "Back.easeOut",
			y: this.game.game.config.height / 2,
			onComplete: onComplete
		});
	}

	/**
	 * Tweens the prompt object out of view and then
	 * closes this prompt view.
	 * 
	 * @param {?Prompt~animationCallback} [cb=null] Callback invoked when animation completes.
	 */
	closeWithAnim(cb=null) {
		const onComplete = () => {
			this.close();
			if(typeof cb === "function") {
				cb();
			}
		};

		if(this.promptGameObject instanceof Card) {
			this.promptGameObject.setEnabled(false);
		}

		this.scene.tweens.add({
			targets: this.promptGameObject,
			ease: "Back.easeIn",
			y: this.game.game.config.height * 2,
			onComplete: onComplete
		});
	}

	/**
	 * Adds the game object passed in to this container
	 * and shows it instantly.
	 * 
	 * Calling this will close the prompt first.
	 * 
	 * @param {Phaser.GameObjects} promptGameObject The game object to show.
	 */
	show(promptGameObject) {
		if(this.isShowing) {
			this.close();
		}

		this.promptGameObject = promptGameObject;
		this.add(this.promptGameObject);

		this.background.setVisible(true);
		this.isShowing = true;
	}

	/**
	 * Hides the game object and this prompt and
	 * then removes the game object from the container.
	 */
	close() {
		this.remove(this.promptGameObject);
		this.promptGameObject = null;
		
		this.background.setVisible(false);
		this.isShowing = false;
	}
}

/**
 * This callback is invoked once animations complete.
 * @callback Prompt~animationCallback
 */

export default Prompt;