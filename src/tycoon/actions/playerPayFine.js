import BaseAction from "./action";


class PlayerPayFine extends BaseAction {
	constructor(fine) {
		super();
		this.fine = fine;
	}

	do(game, player) {
		// player places this.fine on free parking value
		console.log(player);
	}
}

export default PlayerPayFine;