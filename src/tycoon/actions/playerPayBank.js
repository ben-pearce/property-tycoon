import BaseAction from "./action";


class PlayerPayBank extends BaseAction {
	constructor(cash) {
		super();
		this.cash = cash;
	}

	do(game, player) {
		// player pays bank this.cash amount
		console.log(player);
	}
}

export default PlayerPayBank;