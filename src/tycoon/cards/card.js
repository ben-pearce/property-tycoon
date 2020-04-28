import Phaser from "phaser";
import {Cards} from "../../enums";
import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle";
import Button from "../ui/button";

/**
 * @namespace Cards
 */

/**
 * Represents a graphical card used in game prompts.
 * 
 * Is intended to be inherited by different types of cards
 * that provide extra functionality like buttons and text.
 * 
 * @extends Phaser.GameObjects.Container
 * @property {GameManager} game The game manager instance this card belongs to.
 * @property {RoundRectangle} background The background of the card.
 */
class Card extends Phaser.GameObjects.Container {
	/**
	 * Creates a new card with white background.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {GameManager} game The game manager instance.
	 */
	constructor(scene, game) {
		super(scene);

		this.game = game;

		this.background = new RoundRectangle(this.scene, 0, 0, Cards.WIDTH, Cards.HEIGHT, 15, Cards.COLOR);
		this.add(this.background);
	}

	setEnabled(isEnabled) {
		for(let i = 0; i < this.list.length; i++) {
			if(this.list[i] instanceof Button) {
				this.list[i].setEnabled(isEnabled);
			}
		}
	}
}

export default Card;