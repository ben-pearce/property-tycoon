import BaseAction from "./action";


class BankPayPlayer extends BaseAction {
	constructor(cash) {
		super();
		this.cash = cash;
	}

	do(game, player) {
		// bank pays play this.cash amount
		console.log(player);
	}
}

export default BankPayPlayer;