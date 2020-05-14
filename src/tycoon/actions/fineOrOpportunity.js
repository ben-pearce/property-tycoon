import BaseAction from "./action";
import FineCard from "../cards/fineCard";
import Parking from "../tiles/parking";
import {Computer} from "../../enums";
import {getFineDecision} from "../computer";

/**
 * Action class that asks player to pay a fine or
 * pick up opportunity knocks.
 * 
 * @implements BaseAction
 * @memberof Actions
 * @property {integer} fine The fine to pay if player chooses.
 */
class FineOrOpportunity extends BaseAction {
	/**
	 * Takes a single parameter and sets it as the fine that
	 * player will pay if they choose.
	 * 
	 * @param {integer} fine The amount of the fine.
	 */
	constructor(fine) {
		super();
		this.fine = fine;
	}

	/**
	 * Shows a card that asks player if they wish to pay the
	 * {@link fine} or pick up an oppporunity knocks card.
	 * 
	 * @override
	 * @param {GameManager} game The game manager instance.
	 * @param {Player} player The player to ask.
	 * @param {BaseAction~actionCompleteCallback} cb The callback to be invoked once action is complete.
	 */
	do(game, player, cb) {
		const fineCard = new FineCard(game.scene, game, this.fine);

		const takeCard = () => game.pickUpCard(player, game.opportunityCards, cb);

		const payFine = () => {
			const parking = game.board.getSingletonTileByType(Parking);
			player.charge(this.fine, parking, () => {
				game.showSaleInterface(player);
				cb();
			});
		};

		if(player.isComputer) {
			const fineDecision = getFineDecision(player, this.fine, payFine, takeCard);
			game.prompt.showWithAnim(fineCard, () => {
				fineCard.setEnabled(false);
				setTimeout(() => game.prompt.closeWithAnim(fineDecision), Computer.THINKING_TIMEOUT_MS);
			});
			
		} else {
			fineCard.fineButton.on("pointerup", () => game.prompt.closeWithAnim(payFine));
			fineCard.opportunityButton.on("pointerup", () => game.prompt.closeWithAnim(takeCard));
			
			game.prompt.showWithAnim(fineCard);
		}

	}
}

export default FineOrOpportunity;