import BaseAction from "./action";


class GetOutOfJail extends BaseAction {
	constructor() {
		super();
	}

	do(game, player) {
		// player is given Get Out Of Jail card
		console.log(player);
	}
}

export default GetOutOfJail;