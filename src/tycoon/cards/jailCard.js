import Phaser from "phaser";
import Card from "./card";
import Button from "../ui/button";
import {CardStyle} from "../../styles";

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
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {Player} player The player instance to act upon.
	 */
	constructor(game, player) {
		super(game);

		this.player = player;

		this.title = new Phaser.GameObjects.Text(this.scene, 0, -250, "You're in Jail", CardStyle);
		this.title.setPosition(this.title.x - (this.title.width /2), this.title.y - (this.title.height / 2));
		
		this.leaveButton = new Button(this.scene, -190, 180, 380, 50, "Get out of Jail (-£50)", 0x17B70F);
		this.stayButton = new Button(this.scene, -190, 240, 380, 50, "Stay in Jail", 0xEBA417);

		this.add([this.title, this.leaveButton, this.stayButton]);
	}
}

export default JailCard;