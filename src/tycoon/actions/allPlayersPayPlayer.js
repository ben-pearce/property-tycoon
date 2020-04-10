import BaseAction from "./action";


class AllPlayersPayPlayer extends BaseAction {
	constructor(cash) {
		super();
		this.cash = cash;
	}

	do(game, player) {
		// iterate player.board.players and pay player
		console.log(player);
	}
}

export default AllPlayersPayPlayer;