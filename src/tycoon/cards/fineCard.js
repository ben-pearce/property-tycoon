import Phaser from "phaser";
import Card from "./card";
import {CardStyle} from "../../styles";
import Button from "../ui/button";
import {Buttons} from "../../enums";

/**
 * Represents a graphical action card which has a "fine"
 * button and a "opportunity knocks" button.
 * 
 * @extends Card
 * @memberof Cards
 * 
 * @property {Button} fineButton The button instance that represents "Pay fine".
 * @property {Button} opportunityButton The button instance that represents "Take Opportunity Knocks".
 */
class FineCard extends Card {
	/**
	 * Creates a title asking if player wants to pay fine or pick
	 * up opportunity knocks.
	 * 
	 * Creates two buttons one for each option.
	 * 
	 * @param {Phaser.Scene} scene The scene this belongs to.
	 * @param {GameManager} game The game instance this belongs to.
	 * @param {integer} fine The fine amount.
	 */
	constructor(scene, game, fine) {
		super(scene, game);

		const text = `Pay a £${fine} or take Opportunity Knocks.`;
		const title = new Phaser.GameObjects.Text(this.scene, 0, -250, text, CardStyle);
		title.setStyle({
			fixedWidth: this.background.width,
			wordWrap: {width: this.background.width - 50, useAdvancedWrap: true}
		});
		title.setX(title.x - (title.width /2));

		this.fineButton = new Button(this.scene, -190, 180, 380, 50, `Pay fine (-£${fine})`, Buttons.AMBER);
		this.opportunityButton = new Button(this.scene, -190, 240, 380, 50, "Take Opportunity Knocks", Buttons.GREEN);

		this.add([title, this.fineButton, this.opportunityButton]);
	}
}

export default FineCard;