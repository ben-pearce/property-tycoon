import BaseAction from "./action";
import FineCard from "../cards/fineCard";
//import ActionCard from "../cards/actionCard";
import Parking from "../tiles/parking";

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
		let fineCard = new FineCard(game.scene, game, this.fine);

		let takeCard = () => {
			game.pickUpCard(player, game.opportunityCards, cb);
		};

		fineCard.fineButton.on("pointerup", () => {
			game.prompt.closeWithAnim(() => {
				let parking = game.board.getSingletonTileByType(Parking);
				player.withdraw(this.fine);
				parking.pay(this.fine);
				game.nextPlayer();
				cb();
			});
		});

		fineCard.opportunityButton.on("pointerup", () => {
			game.prompt.closeWithAnim(takeCard);
		});

		game.prompt.showWithAnim(fineCard);
	}
}

export default FineOrOpportunity;