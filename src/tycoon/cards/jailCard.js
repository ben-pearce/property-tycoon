import Phaser from "phaser";
import Card from "./card";
import Button from "../ui/button";
import {CardStyle} from "../../styles";
import {Buttons} from "../../enums";

/**
 * Represents a graphical jail card.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} leaveButton The button instance that represents "Get out of Jail".
 * @property {Button} stayButton The button instance that represents "Stay in Jail".
 */
class JailCard extends Card {
	/**
	 * Creates two buttons, "Get out of Jail" and "Stay in Jail".
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(scene, game, player) {
		super(scene, game);

		this.player = player;

		this.title = new Phaser.GameObjects.Text(this.scene, 0, -250, "You're in Jail", CardStyle);
		this.title.setPosition(this.title.x - (this.title.width /2), this.title.y - (this.title.height / 2));
		
		this.leaveButton = new Button(this.scene, -190, 180, 380, 50, "Get out of Jail (-£50)", Buttons.GREEN);
		this.stayButton = new Button(this.scene, -190, 240, 380, 50, "Stay in Jail", Buttons.AMBER);

		this.add([this.title, this.leaveButton, this.stayButton]);
	}
}

export default JailCard;